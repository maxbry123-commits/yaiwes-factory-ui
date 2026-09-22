/**
 * Stub: FE Pasos owns real step 1–3 status tracking.
 * Contract: GET ?runId= → { status, step, updatedAt }
 */
import { NextResponse } from "next/server";
import { getRun } from "@/lib/factory-memory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId") ?? "unknown";
  const run = getRun(runId);
  if (run) {
    return NextResponse.json({
      status: run.status,
      step: run.step,
      updatedAt: run.createdAt,
    });
  }
  const stepMatch = /_(\d+)$/.exec(runId);
  const step = stepMatch ? Number(stepMatch[1]) : 4;
  return NextResponse.json({
    status: "completed",
    step,
    updatedAt: new Date().toISOString(),
  });
}
