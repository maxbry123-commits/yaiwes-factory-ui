/** In-memory factory runs (server process lifetime). */

export type FactoryRunRecord = {
  id: string;
  step: number;
  createdAt: string;
  status: "queued" | "running" | "done" | "error" | "completed";
  payload: unknown;
  result?: unknown;
};

const runs = new Map<string, FactoryRunRecord>();
let lastRunId: string | null = null;

function asObj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
}

function parseMaybeJson(v: unknown): unknown {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
}

function extractFeatures(payload: unknown): string[] {
  const p = asObj(payload);
  const direct = p.features ?? p.backendFeatures ?? p.backend;
  if (Array.isArray(direct)) return direct.map(String);
  const nested = asObj(p.payload).features;
  if (Array.isArray(nested)) return nested.map(String);
  return [];
}

function extractWindows(
  payload: unknown,
): { id?: string; type?: string; label?: string; enabled?: boolean }[] {
  const p = asObj(payload);
  let w = parseMaybeJson(p.windows);
  if (typeof w === "string") w = parseMaybeJson(w);
  if (Array.isArray(w)) {
    return w as {
      id?: string;
      type?: string;
      label?: string;
      enabled?: boolean;
    }[];
  }
  if (
    w &&
    typeof w === "object" &&
    Array.isArray((w as { windows?: unknown }).windows)
  ) {
    return (
      w as {
        windows: {
          id?: string;
          type?: string;
          label?: string;
          enabled?: boolean;
        }[];
      }
    ).windows;
  }
  return [];
}

function extractInput(payload: unknown): Record<string, unknown> {
  const p = asObj(payload);
  let input = parseMaybeJson(p.input);
  if (typeof input === "string") input = parseMaybeJson(input);
  return asObj(input);
}

export function buildBackendPlan(payload: unknown) {
  const features = extractFeatures(payload);
  const windows = extractWindows(payload).filter((w) => w.enabled !== false);
  const input = extractInput(payload);
  const endpoints: { method: string; path: string; from: string }[] = [];
  const schema: { name: string; fields: string[]; from: string }[] = [];
  const integrations: string[] = [];

  const add = (method: string, path: string, from: string) => {
    if (!endpoints.some((e) => e.method === method && e.path === path)) {
      endpoints.push({ method, path, from });
    }
  };

  for (const f of features) {
    switch (f) {
      case "auth-session":
        add("POST", "/api/auth/session", f);
        add("DELETE", "/api/auth/session", f);
        add("GET", "/api/auth/me", f);
        schema.push({
          name: "users",
          fields: ["id", "email", "sessionToken", "createdAt"],
          from: f,
        });
        integrations.push("Auth session store");
        break;
      case "file-storage":
        add("POST", "/api/files/upload", f);
        add("GET", "/api/files/:id", f);
        add("DELETE", "/api/files/:id", f);
        schema.push({
          name: "files",
          fields: ["id", "name", "mime", "size", "url", "kind"],
          from: f,
        });
        integrations.push("Object storage");
        break;
      case "rest-api":
        for (const w of windows) {
          const slug = (w.type || w.label || "resource")
            .toLowerCase()
            .replace(/\s+/g, "-");
          add("GET", `/api/${slug}`, f);
          add("POST", `/api/${slug}`, f);
          add("PATCH", `/api/${slug}/:id`, f);
          add("DELETE", `/api/${slug}/:id`, f);
        }
        if (windows.length === 0) {
          add("GET", "/api/resources", f);
          add("POST", "/api/resources", f);
        }
        integrations.push("REST CRUD");
        break;
      case "webhooks":
        add("POST", "/api/webhooks/inbound", f);
        add("GET", "/api/webhooks", f);
        schema.push({
          name: "webhooks",
          fields: ["id", "url", "event", "secret"],
          from: f,
        });
        integrations.push("Outbound webhooks");
        break;
      case "db-schema":
        for (const w of windows) {
          schema.push({
            name: `${w.type || "window"}_entity`,
            fields: ["id", "label", "windowId", "payload", "updatedAt"],
            from: f,
          });
        }
        if (windows.length === 0) {
          schema.push({
            name: "entities",
            fields: ["id", "type", "data"],
            from: f,
          });
        }
        integrations.push("Database schema");
        break;
      case "download-motor-hook":
        add("POST", "/api/motor/download", f);
        add("GET", "/api/motor/jobs/:id", f);
        integrations.push("Motor de descarga OSS");
        break;
      case "skills-to-schema":
        add("POST", "/api/skills/compile", f);
        add("GET", "/api/skills/schema", f);
        schema.push({
          name: "skill_schemas",
          fields: ["id", "skillId", "schemaJson"],
          from: f,
        });
        integrations.push("Skills compiler");
        break;
      case "deploy-hooks":
        add("POST", "/api/deploy/prep", f);
        add("POST", "/api/deploy/vercel", f);
        integrations.push("Vercel deploy hooks");
        break;
      default:
        add("POST", `/api/features/${f}`, f);
    }
  }

  const fileCount = Array.isArray(input.files) ? input.files.length : 0;
  const hasText =
    typeof input.text === "string" && input.text.trim().length > 0;

  return {
    ok: features.length > 0,
    message:
      features.length === 0
        ? "Sin features activas: activa al menos una función de backend."
        : `Plan generado: ${endpoints.length} endpoints, ${schema.length} tablas, ${integrations.length} integraciones.`,
    summary: {
      features,
      windows: windows.length,
      inputFiles: fileCount,
      hasText,
    },
    endpoints,
    schema,
    integrations,
  };
}

export function storeRun(record: FactoryRunRecord): FactoryRunRecord {
  runs.set(record.id, record);
  lastRunId = record.id;
  return record;
}

export function createRun(
  body: { step?: number; payload?: unknown } | unknown,
): FactoryRunRecord {
  const step =
    body &&
    typeof body === "object" &&
    "step" in body &&
    typeof (body as { step?: unknown }).step === "number"
      ? (body as { step: number }).step
      : 0;
  const payload =
    body && typeof body === "object" && "payload" in body
      ? (body as { payload?: unknown }).payload
      : body;
  const id = `run_${Date.now()}_${step}`;
  const plan = buildBackendPlan(payload);
  const record: FactoryRunRecord = {
    id,
    step,
    createdAt: new Date().toISOString(),
    status: plan.ok ? "completed" : "done",
    payload,
    result: plan,
  };
  return storeRun(record);
}

export function getRun(id: string): FactoryRunRecord | undefined {
  return runs.get(id);
}

export function getLatestStatus(): {
  lastRunId: string | null;
  count: number;
  latest: FactoryRunRecord | null;
} {
  return {
    lastRunId,
    count: runs.size,
    latest: lastRunId ? runs.get(lastRunId) ?? null : null,
  };
}

export function listDeployPrep(body?: unknown) {
  return {
    projectName: "yaiwes-factory-ui",
    wouldDeploy: ["app/", "lib/", "components/", "public/", "package.json"],
    files: [
      "app/step-1/page.tsx",
      "app/step-2/page.tsx",
      "app/step-3/page.tsx",
      "app/step-4/page.tsx",
      "app/step-5/page.tsx",
    ],
    checks: [
      { id: "routes", label: "Routes /step-1..5", ok: true },
      { id: "hf", label: "Hugging Face no tocado", ok: true },
    ],
    ready: true,
    notes: "Deploy prep — Vercel only",
    receivedAt: new Date().toISOString(),
    body: body ?? null,
  };
}
