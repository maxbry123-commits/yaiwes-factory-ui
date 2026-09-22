/**
 * Typed fetch wrappers for factory API contracts.
 * Paths are fixed — do not invent alternate endpoints.
 */

export type FactoryRunRequest = {
  step: number;
  payload: unknown;
};

export type FactoryRunResponse = {
  ok: boolean;
  runId: string;
  result: unknown;
};

export type FactoryStatusResponse = {
  status: string;
  step: number;
  updatedAt: string;
};

export type DeployPrepCheck = {
  id: string;
  label: string;
  ok: boolean;
  detail?: string;
};

export type DeployPrepResponse = {
  ready: boolean;
  files: string[];
  checks: DeployPrepCheck[];
};

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API ${res.status} ${res.statusText}${text ? `: ${text.slice(0, 200)}` : ""}`,
    );
  }
  return (await res.json()) as T;
}

export async function postFactoryRun(
  body: FactoryRunRequest,
): Promise<FactoryRunResponse> {
  const res = await fetch("/api/factory/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<FactoryRunResponse>(res);
}

export async function getFactoryStatus(
  runId: string,
): Promise<FactoryStatusResponse> {
  const url = `/api/factory/status?runId=${encodeURIComponent(runId)}`;
  const res = await fetch(url, { method: "GET" });
  return parseJson<FactoryStatusResponse>(res);
}

export async function postDeployPrep(
  body?: unknown,
): Promise<DeployPrepResponse> {
  const res = await fetch("/api/factory/deploy-prep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return parseJson<DeployPrepResponse>(res);
}
