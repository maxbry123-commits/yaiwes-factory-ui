"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { getFactoryStatus, type FactoryStatusResponse } from "@/lib/factory-api";
import { getFactoryRunId } from "@/lib/factory-state";

export function StatusChecklist() {
  const [runId, setRunId] = useState<string | null>(null);
  const [status, setStatus] = useState<FactoryStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const id = getFactoryRunId();
    setRunId(id);
    if (!id) {
      setStatus(null);
      setError(null);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setStatus(await getFactoryStatus(id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de estado");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-white/55">
          runId:{" "}
          <code className="text-white/70">
            {runId ?? "— (aplica diseño en paso 4)"}
          </code>
        </p>
        <Button variant="secondary" onClick={() => void refresh()} disabled={busy}>
          {busy ? "Consultando…" : "Actualizar estado"}
        </Button>
      </div>
      {error ? <p className="text-sm text-[#ff5500]">{error}</p> : null}
      {status ? (
        <ul className="space-y-2">
          <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
            <span className="text-white/45">Estado · </span>
            <span className="font-medium text-white">{status.status}</span>
          </li>
          <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
            <span className="text-white/45">Paso · </span>
            <span className="font-medium text-white">{status.step}</span>
          </li>
          <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm">
            <span className="text-white/45">Actualizado · </span>
            <span className="font-mono text-xs text-white/70">{status.updatedAt}</span>
          </li>
        </ul>
      ) : (
        <p className="text-sm text-white/40">
          Sin estado todavía. Ejecuta «Aplicar diseño» en el paso 4.
        </p>
      )}
    </div>
  );
}
