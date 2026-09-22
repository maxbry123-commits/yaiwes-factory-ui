"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  postDeployPrep,
  type DeployPrepCheck,
  type DeployPrepResponse,
} from "@/lib/factory-api";
import {
  getFactoryTheme,
  getSelectedPlugins,
  getFactoryRunId,
} from "@/lib/factory-state";
import { ReviewPanel } from "@/components/step-5/ReviewPanel";

export function DeployPrepAction() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<DeployPrepResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onPrep() {
    setBusy(true);
    setError(null);
    try {
      setResult(
        await postDeployPrep({
          theme: getFactoryTheme(),
          plugins: getSelectedPlugins(),
          runId: getFactoryRunId(),
        }),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error en deploy-prep");
    } finally {
      setBusy(false);
    }
  }

  const ready = result?.ready === true;
  const blockers: DeployPrepCheck[] = result?.checks.filter((c) => !c.ok) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={() => void onPrep()} disabled={busy}>
          {busy ? "Preparando…" : "Preparar despliegue"}
        </Button>
        {result ? (
          <span
            className={`text-sm font-medium ${
              ready ? "text-emerald-400" : "text-[#ff5500]"
            }`}
          >
            {ready ? "Listo para desplegar" : "Bloqueadores pendientes"}
          </span>
        ) : null}
      </div>
      {error ? <p className="text-sm text-[#ff5500]">{error}</p> : null}
      {blockers.length > 0 ? (
        <div className="rounded-lg border border-[#ff5500]/30 bg-[#ff5500]/5 px-3 py-2 text-sm text-white/80">
          <p className="font-medium text-[#ff5500]">Bloqueadores</p>
          <ul className="mt-1 list-disc pl-5 text-white/60">
            {blockers.map((b) => (
              <li key={b.id}>
                {b.label}
                {b.detail ? ` — ${b.detail}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <ReviewPanel checks={result?.checks ?? []} files={result?.files ?? []} />
      <Button
        variant="accent"
        disabled={!ready}
        onClick={() => {
          if (!ready) return;
          console.log("[deploy] ready — stub FE Fusión");
        }}
      >
        {ready ? "Continuar despliegue" : "Despliegue deshabilitado"}
      </Button>
    </div>
  );
}
