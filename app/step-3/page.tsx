"use client";

import { useCallback, useState } from "react";

export default function Step3Page() {
  const [log, setLog] = useState<string>("(sin llamadas aun)");
  const [status, setStatus] = useState("APIs stub listas.");

  const callRun = useCallback(async () => {
    setStatus("POST /api/factory/run …");
    const res = await fetch("/api/factory/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        step: 3,
        payload: {
          input: localStorage.getItem("FROMTED_factory_input"),
          windows: localStorage.getItem("FROMTED_factory_windows"),
        },
      }),
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
    setStatus(`Run ok · status ${res.status}`);
    console.log("[step-3] run", json);
  }, []);

  const callStatus = useCallback(async () => {
    setStatus("GET /api/factory/status …");
    const res = await fetch("/api/factory/status");
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
    setStatus(`Status ok · ${res.status}`);
    console.log("[step-3] status", json);
  }, []);

  return (
    <main style={{ display: "grid", gap: "1rem" }}>
      <div>
        <h1 className="title" style={{ fontSize: 20, margin: 0 }}>
          Paso 3 — Backend stub
        </h1>
        <p className="meta" style={{ marginTop: 4 }}>
          Llama POST /api/factory/run y GET /api/factory/status. Respuesta en vivo.
        </p>
      </div>
      <div className="status-line">{status}</div>
      <section className="panel" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" className="btn-primary" onClick={callRun}>
          POST /api/factory/run
        </button>
        <button type="button" className="btn-primary" onClick={callStatus}>
          GET /api/factory/status
        </button>
      </section>
      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Respuesta live
        </div>
        <pre className="log-panel">{log}</pre>
      </section>
    </main>
  );
}
