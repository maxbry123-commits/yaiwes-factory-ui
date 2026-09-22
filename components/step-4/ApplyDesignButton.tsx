"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { postFactoryRun } from "@/lib/factory-api";
import {
  getFactoryTheme,
  getSelectedPlugins,
  setFactoryRunId,
} from "@/lib/factory-state";

export function ApplyDesignButton() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onApply() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await postFactoryRun({
        step: 4,
        payload: { theme: getFactoryTheme(), plugins: getSelectedPlugins() },
      });
      if (res.runId) setFactoryRunId(res.runId);
      setMessage(res.ok ? `Aplicado · runId ${res.runId}` : `runId ${res.runId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al aplicar diseño");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" onClick={onApply} disabled={busy}>
        {busy ? "Aplicando…" : "Aplicar diseño"}
      </Button>
      {message ? <span className="text-sm text-white/60">{message}</span> : null}
      {error ? <span className="text-sm text-[#ff5500]">{error}</span> : null}
    </div>
  );
}
