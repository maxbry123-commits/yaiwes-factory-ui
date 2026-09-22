/** In-memory store for API stubs (server process lifetime). */

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
  const record: FactoryRunRecord = {
    id,
    step,
    createdAt: new Date().toISOString(),
    status: "completed",
    payload,
    result: {
      ok: true,
      message: "Stub — FE Pasos owns steps 1–3; FE Fusión uses step 4+",
      echo: payload,
      step,
    },
  };
  runs.set(id, record);
  lastRunId = id;
  return record;
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
    wouldDeploy: ["app/","lib/","components/","public/","package.json"],
    files: ["app/step-1/page.tsx","app/step-2/page.tsx","app/step-3/page.tsx","app/step-4/page.tsx","app/step-5/page.tsx"],
    checks: [{ id: "routes", label: "Routes /step-1..5", ok: true }],
    ready: true,
    notes: "Stub only",
    receivedAt: new Date().toISOString(),
    body: body ?? null,
  };
}
