import { NextResponse } from "next/server";
import { getLatestStatus, getRun } from "@/lib/factory-memory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId");

  if (runId) {
    const run = getRun(runId);
    if (!run) {
      return NextResponse.json(
        {
          status: "not_found",
          step: 0,
          updatedAt: new Date().toISOString(),
          runId,
        },
        { status: 404 },
      );
    }
    return NextResponse.json({
      status: run.status,
      step: run.step,
      updatedAt: run.createdAt,
      runId: run.id,
      result: run.result,
    });
  }

  const latest = getLatestStatus();
  return NextResponse.json({
    status: latest.latest?.status ?? "idle",
    step: latest.latest?.step ?? 0,
    updatedAt: new Date().toISOString(),
    lastRunId: latest.lastRunId,
    count: latest.count,
  });
}
