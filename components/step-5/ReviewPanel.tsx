"use client";

import type { DeployPrepCheck } from "@/lib/factory-api";

type ReviewPanelProps = {
  checks: DeployPrepCheck[];
  files: string[];
};

export function ReviewPanel({ checks, files }: ReviewPanelProps) {
  if (checks.length === 0 && files.length === 0) {
    return (
      <p className="text-sm text-white/45">
        Aún no hay resultados de deploy-prep. Pulsa «Preparar despliegue».
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-medium text-white/80">Checks</h3>
        <ul className="space-y-2">
          {checks.map((c) => (
            <li
              key={c.id}
              className={`rounded-lg border px-3 py-2 text-sm ${
                c.ok
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-[#ff5500]/40 bg-[#ff5500]/10"
              }`}
            >
              <span className="font-medium text-white">
                {c.ok ? "✓" : "✗"} {c.label}
              </span>
              {c.detail ? (
                <span className="mt-0.5 block text-xs text-white/50">{c.detail}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      {files.length > 0 ? (
        <div>
          <h3 className="mb-2 text-sm font-medium text-white/80">Archivos</h3>
          <ul className="space-y-1 font-mono text-xs text-white/55">
            {files.map((f) => (
              <li key={f} className="rounded bg-black/20 px-2 py-1">
                {f}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
