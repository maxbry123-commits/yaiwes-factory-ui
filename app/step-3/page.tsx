"use client";

import { useCallback, useEffect, useState } from "react";
import GuidedFooter from "@/components/GuidedFooter";
import InfoTip from "@/components/InfoTip";
import {
  BACKEND_FEATURES,
  LS_INPUT,
  LS_WINDOWS,
  getFactoryBackend,
  toggleFactoryBackend,
} from "@/lib/factory-state";

export default function Step3Page() {
  const [features, setFeatures] = useState<string[]>([]);
  const [status, setStatus] = useState("Elige funciones de backend y ejecuta el plan.");
  const [log, setLog] = useState<string>("(sin llamadas aún)");
  const [endpoints, setEndpoints] = useState<
    { method: string; path: string; from: string }[]
  >([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFeatures(getFactoryBackend());
    setHydrated(true);
  }, []);

  const onToggle = useCallback((id: string) => {
    const next = toggleFactoryBackend(id);
    setFeatures(next);
    setStatus(
      next.includes(id)
        ? `Activada: ${id}`
        : `Desactivada: ${id}`,
    );
  }, []);

  const callRun = useCallback(async () => {
    setStatus("POST /api/factory/run …");
    const payload = {
      features: getFactoryBackend(),
      input: localStorage.getItem(LS_INPUT),
      windows: localStorage.getItem(LS_WINDOWS),
    };
    const res = await fetch("/api/factory/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: 3, payload }),
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
    const eps = json?.result?.endpoints;
    setEndpoints(Array.isArray(eps) ? eps : []);
    setStatus(
      json?.result?.message
        ? String(json.result.message)
        : `Run · HTTP ${res.status}`,
    );
  }, []);

  const callStatus = useCallback(async () => {
    setStatus("GET /api/factory/status …");
    const res = await fetch("/api/factory/status");
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
    setStatus(`Estado · HTTP ${res.status}`);
  }, []);

  if (!hydrated) {
    return <p className="meta">Cargando backend…</p>;
  }

  return (
    <main style={{ display: "grid", gap: "1rem" }}>
      <div className="guide-banner">
        <h1 className="title" style={{ fontSize: 20, margin: 0 }}>
          Paso 3 — Backend e integraciones
        </h1>
        <p className="meta" style={{ marginTop: 4 }}>
          Activa funciones reales, genera el plan de endpoints/schema y avanza.
          Cada control tiene info (i).
        </p>
      </div>

      <div className="status-line" role="status">
        {status}
      </div>

      <section className="panel">
        <div
          className="name"
          style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}
        >
          Funciones de backend
          <InfoTip text="Cada interruptor añade capacidad al plan: auth, archivos, API, webhooks, DB, motor de descarga, skills y deploy." />
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
          {BACKEND_FEATURES.map((f) => {
            const on = features.includes(f.id);
            return (
              <li
                key={f.id}
                className="card"
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: on ? "var(--blue)" : "var(--border)",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="name" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {f.label}
                    <InfoTip text={f.info} label={`Info: ${f.label}`} />
                  </div>
                  <div className="sub">{f.id}</div>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  data-selected={on ? "true" : "false"}
                  aria-pressed={on}
                  onClick={() => onToggle(f.id)}
                >
                  {on ? "On" : "Off"}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="meta" style={{ marginTop: 10 }}>
          Activas: {features.length ? features.join(", ") : "(ninguna)"}
        </p>
      </section>

      <section className="panel" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button type="button" className="btn-cargar" onClick={callRun}>
          Ejecutar plan
        </button>
        <InfoTip text="Llama POST /api/factory/run con tu input, ventanas y features. Devuelve endpoints, schema e integraciones derivados." />
        <button type="button" className="btn-primary" onClick={callStatus}>
          Consultar estado
        </button>
        <InfoTip text="Llama GET /api/factory/status para ver el último run en memoria del servidor." />
      </section>

      {endpoints.length > 0 ? (
        <section className="panel">
          <div className="name" style={{ marginBottom: 8 }}>
            Endpoints del plan ({endpoints.length})
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
            {endpoints.map((e) => (
              <li key={`${e.method}-${e.path}`} className="card" style={{ padding: "0.5rem 0.75rem" }}>
                <code>
                  {e.method} {e.path}
                </code>
                <span className="sub" style={{ marginLeft: 8 }}>
                  ← {e.from}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Respuesta en vivo
        </div>
        <pre className="log-panel">{log}</pre>
      </section>

      <GuidedFooter current={3} />
    </main>
  );
}
