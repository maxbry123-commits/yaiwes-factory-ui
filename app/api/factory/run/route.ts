import { NextResponse } from "next/server";
import { createRun, storeRun } from "@/lib/factory-memory";
import { buildStep3RunResult } from "@/lib/donor-manifests";

function parseStep(body: unknown): number {
  if (
    body &&
    typeof body === "object" &&
    "step" in body &&
    typeof (body as { step?: unknown }).step === "number"
  ) {
    return (body as { step: number }).step;
  }
  return 0;
}

function parsePayload(body: unknown): unknown {
  if (body && typeof body === "object" && "payload" in body) {
    return (body as { payload?: unknown }).payload;
  }
  return body;
}

function payloadHasBackendFeatures(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as Record<string, unknown>;
  const features = p.features ?? p.backendFeatures;
  return Array.isArray(features) && features.length > 0;
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const step = parseStep(body);
  const payload = parsePayload(body);

  // Backend feature plan (factory UI step 3 with toggles)
  if (payloadHasBackendFeatures(payload) || payloadHasBackendFeatures(body)) {
    const record = createRun(body);
    return NextResponse.json({
      ok: Boolean((record.result as { ok?: boolean } | undefined)?.ok ?? true),
      runId: record.id,
      status: record.status,
      result: record.result,
      createdAt: record.createdAt,
    });
  }

  // Legacy step 3: donor staging read
  if (step === 3) {
    const result = await buildStep3RunResult(payload);
    const id = `run_${Date.now()}_3`;
    const createdAt = new Date().toISOString();
    const status =
      result.mapped > 0 ? ("completed" as const) : ("error" as const);

    storeRun({
      id,
      step: 3,
      createdAt,
      status,
      payload,
      result,
    });

    return NextResponse.json({
      ok: status !== "error",
      runId: id,
      result,
      status,
      createdAt,
    });
  }

  const record = createRun(body);
  return NextResponse.json({
    ok: Boolean((record.result as { ok?: boolean } | undefined)?.ok ?? true),
    runId: record.id,
    status: record.status,
    result: record.result,
    createdAt: record.createdAt,
  });
}
