/**
 * Stub: FE Pasos owns real step 1–3 artifact assembly.
 * Contract: POST → { ready, files[], checks[] }
 */
import { NextResponse } from "next/server";

export async function POST() {
  const checks = [
    { id: "theme", label: "Tema factory configurado", ok: true, detail: "FROMTED_factory_theme" },
    { id: "windows", label: "Ventanas (1 = 1 archivo)", ok: true, detail: "FROMTED_factory_windows" },
    { id: "plugins", label: "Plugins de diseño", ok: true, detail: "Stub siempre ok" },
    { id: "run", label: "Último run de fábrica", ok: true, detail: "Stub sin validación real" },
  ];
  return NextResponse.json({
    ready: checks.every((c) => c.ok),
    files: ["app/layout.tsx", "app/globals.css", "lib/factory-state.ts", "lib/factory-api.ts"],
    checks,
  });
}
