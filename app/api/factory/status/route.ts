import { NextResponse } from "next/server";
import { getLatestStatus, getRun } from "@/lib/factory-memory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId");
  if (runId) {
    const run = getRun(runId);
    if (!run) {
      return NextResponse.json(
        { status: "not_found", runId, updatedAt: new Date().toISOString() },
        { status: 404 },
      );
    }
    return NextResponse.json({
      status: run.status,
      runId: run.id,
      result: run.result,
      updatedAt: run.createdAt,
    });
  }
  const latest = getLatestStatus();
  return NextResponse.json({
    status: latest.latest?.status ?? "idle",
    ...latest,
    updatedAt: new Date().toISOString(),
  });
}
