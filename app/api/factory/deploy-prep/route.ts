import { NextResponse } from "next/server";
import { listDeployPrep } from "@/lib/factory-memory";

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const prep = listDeployPrep(body);
  return NextResponse.json({ ok: true, ...prep });
}
