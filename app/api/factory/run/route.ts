import { NextResponse } from "next/server";
import { createRun } from "@/lib/factory-memory";

export async function POST(request: Request) {
  let body: unknown = {};
  try { body = await request.json(); } catch { body = {}; }
  const record = createRun(body);
  return NextResponse.json({
    ok: true,
    runId: record.id,
    status: record.status,
    result: record.result,
    createdAt: record.createdAt,
  });
}
