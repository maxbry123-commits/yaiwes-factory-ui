"use client";

import { MATTE_TOKENS } from "@/lib/factory-state";

const ROWS = [
  { name: "bg", value: MATTE_TOKENS.bg, note: "Fondo matte bloqueado" },
  { name: "selection", value: MATTE_TOKENS.selection, note: "Selección / primary" },
  {
    name: "Cargar / Descargar",
    value: MATTE_TOKENS.cargarDescargarText,
    note: "Solo texto, no fill",
  },
];

export function TokenPanel() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-white/55">
        Tokens matte bloqueados. Nunca Operator lime{" "}
        <code className="text-white/40">#d9ff43</code>.
      </p>
      <ul className="space-y-2">
        {ROWS.map((row) => (
          <li
            key={row.name}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2"
          >
            <span
              className="h-8 w-8 shrink-0 rounded-md border border-white/15"
              style={{ backgroundColor: row.value }}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-white">{row.name}</span>
              <span className="block font-mono text-xs text-white/45">{row.value}</span>
            </span>
            <span className="text-xs text-white/40">{row.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
