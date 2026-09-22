/**
 * Stub: FE Pasos owns real step 1–3 run logic.
 * Contract: POST { step, payload } → { ok, runId, result }
 */
import { NextResponse } from "next/server";
import { createRun } from "@/lib/factory-memory";

export async function POST(request: Request) {
  let body: { step?: number; payload?: unknown } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }
  const record = createRun(body);
  return NextResponse.json({
    ok: true,
    runId: record.id,
    result: record.result,
  });
}
