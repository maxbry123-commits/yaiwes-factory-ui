"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "FROMTED_factory_input";

type InputKind =
  | "skills"
  | "archivos"
  | "fotos"
  | "video"
  | "desc"
  | "docs"
  | "web"
  | "app"
  | "ui-oss";

type FileMeta = {
  id: string;
  kind: InputKind;
  name: string;
  size: number;
  type: string;
  preview?: string;
};

type FactoryInput = {
  text: string;
  webUrl: string;
  appUrl: string;
  uiOssUrl: string;
  skillsNote: string;
  descNote: string;
  activeKinds: InputKind[];
  files: FileMeta[];
  updatedAt: string;
};

const EMPTY: FactoryInput = {
  text: "",
  webUrl: "",
  appUrl: "",
  uiOssUrl: "",
  skillsNote: "",
  descNote: "",
  activeKinds: [],
  files: [],
  updatedAt: "",
};

const KINDS: { id: InputKind; label: string; hint: string }[] = [
  { id: "skills", label: "Skills", hint: "Notas / rutas de skills FROMTED" },
  { id: "archivos", label: "Archivos", hint: "Cargar archivos genericos" },
  { id: "fotos", label: "Fotos", hint: "Imagenes (preview)" },
  { id: "video", label: "Video", hint: "Video (meta + nombre)" },
  { id: "desc", label: "Desc", hint: "Descripcion corta del producto" },
  { id: "docs", label: "Docs", hint: "Documentos (.md .pdf .txt)" },
  { id: "web", label: "Web", hint: "URL web de referencia" },
  { id: "app", label: "App", hint: "URL / id de app" },
  { id: "ui-oss", label: "UI OSS", hint: "Repo / demo UI open-source" },
];

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadStored(): FactoryInput {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) } as FactoryInput;
  } catch {
    return EMPTY;
  }
}

function persist(next: FactoryInput) {
  const withTs = { ...next, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(withTs));
  console.log("[step-1] persisted", STORAGE_KEY, withTs);
  return withTs;
}

export default function Step1Page() {
  const [state, setState] = useState<FactoryInput>(EMPTY);
  const [status, setStatus] = useState("Listo. Carga o escribe input.");
  const [hydrated, setHydrated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingKind = useRef<InputKind>("archivos");

  useEffect(() => {
    const stored = loadStored();
    setState(stored);
    setHydrated(true);
    if (stored.updatedAt) {
      setStatus(`Restaurado desde ${STORAGE_KEY} (${stored.updatedAt})`);
    }
  }, []);

  const toggleKind = useCallback((id: InputKind) => {
    setState((prev) => {
      const active: InputKind[] = prev.activeKinds.includes(id)
        ? prev.activeKinds.filter((k) => k !== id)
        : [...prev.activeKinds, id];
      const next = persist({ ...prev, activeKinds: active });
      setStatus(active.includes(id) ? `Activado: ${id}` : `Desactivado: ${id}`);
      return next;
    });
  }, []);

  const openCargar = useCallback((kind: InputKind) => {
    pendingKind.current = kind;
    const acceptMap: Partial<Record<InputKind, string>> = {
      fotos: "image/*",
      video: "video/*",
      docs: ".md,.txt,.pdf,.doc,.docx",
      archivos: "*/*",
      skills: ".md,.json,.txt",
    };
    if (fileRef.current) {
      fileRef.current.accept = acceptMap[kind] ?? "*/*";
      fileRef.current.value = "";
      fileRef.current.click();
    }
    setStatus(`Cargar abierto para: ${kind}`);
    console.log("[step-1] Cargar", kind);
  }, []);

  const onFilesPicked = useCallback(async (list: FileList | null) => {
    if (!list || list.length === 0) {
      setStatus("Cargar cancelado (sin archivos).");
      return;
    }
    const kind = pendingKind.current;
    const metas: FileMeta[] = [];
    for (const file of Array.from(list)) {
      const meta: FileMeta = {
        id: uid(),
        kind,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
      };
      if (file.type.startsWith("image/") && file.size < 2_000_000) {
        meta.preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => resolve("");
          reader.readAsDataURL(file);
        });
      } else if (
        file.type.startsWith("text/") ||
        /\.(md|txt|json|csv)$/i.test(file.name)
      ) {
        const text = await file.text();
        meta.preview = text.slice(0, 400);
      } else {
        meta.preview = `(binario ${file.type || "unknown"}, ${file.size} bytes)`;
      }
      metas.push(meta);
    }
    setState((prev) => {
      const next = persist({
        ...prev,
        files: [...prev.files, ...metas],
        activeKinds: (prev.activeKinds.includes(kind)
          ? prev.activeKinds
          : [...prev.activeKinds, kind]) as InputKind[],
      });
      setStatus(
        `Cargados ${metas.length} archivo(s) como ${kind}. Persistido en ${STORAGE_KEY}.`,
      );
      return next;
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setState((prev) => {
      const next = persist({
        ...prev,
        files: prev.files.filter((f) => f.id !== id),
      });
      setStatus(`Archivo eliminado: ${id}`);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(EMPTY);
    setStatus(`Limpiado. Clave ${STORAGE_KEY} eliminada.`);
    console.log("[step-1] clearAll");
  }, []);

  const onDescargar = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fromted-factory-input-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Descargar: JSON exportado al navegador.");
    console.log("[step-1] Descargar", state);
  }, [state]);

  const previewText = useMemo(() => {
    const lines: string[] = [];
    if (state.text) lines.push(`TEXT: ${state.text.slice(0, 200)}`);
    if (state.descNote) lines.push(`DESC: ${state.descNote.slice(0, 200)}`);
    if (state.skillsNote) lines.push(`SKILLS: ${state.skillsNote.slice(0, 200)}`);
    if (state.webUrl) lines.push(`WEB: ${state.webUrl}`);
    if (state.appUrl) lines.push(`APP: ${state.appUrl}`);
    if (state.uiOssUrl) lines.push(`UI OSS: ${state.uiOssUrl}`);
    lines.push(`KINDS: ${state.activeKinds.join(", ") || "(ninguno)"}`);
    lines.push(`FILES: ${state.files.length}`);
    state.files.forEach((f) => {
      lines.push(`  - [${f.kind}] ${f.name} (${f.size}b)`);
    });
    return lines.join("\n") || "(vacio — anade input)";
  }, [state]);

  if (!hydrated) {
    return <p className="meta">Cargando estado local…</p>;
  }

  return (
    <main style={{ display: "grid", gap: "1rem" }}>
      <div>
        <h1 className="title" style={{ fontSize: 20, margin: 0 }}>
          Paso 1 — Input multimodal
        </h1>
        <p className="meta" style={{ marginTop: 4 }}>
          skills · archivos · fotos · video · desc · docs · web · app · UI OSS.
          Persistencia: <code>{STORAGE_KEY}</code>
        </p>
      </div>

      <div className="status-line" role="status">
        {status}
      </div>

      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Tipos de entrada (toggle)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              className="chip"
              data-selected={state.activeKinds.includes(k.id) ? "true" : "false"}
              title={k.hint}
              onClick={() => toggleKind(k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
      </section>

      <section className="panel" style={{ display: "grid", gap: 12 }}>
        <label className="name">
          Texto libre
          <textarea
            className="textarea"
            rows={3}
            style={{ marginTop: 6 }}
            value={state.text}
            placeholder="Describe lo que la fabrica debe construir…"
            onChange={(e) => {
              const text = e.target.value;
              setState((prev) => persist({ ...prev, text }));
              setStatus("Texto actualizado y persistido.");
            }}
          />
        </label>

        <label className="name">
          Desc (descripcion corta)
          <input
            className="input"
            style={{ marginTop: 6 }}
            value={state.descNote}
            placeholder="Una linea de producto"
            onChange={(e) => {
              const descNote = e.target.value;
              setState((prev) => {
                const active: InputKind[] = prev.activeKinds.includes("desc")
                  ? prev.activeKinds
                  : [...prev.activeKinds, "desc"];
                return persist({ ...prev, descNote, activeKinds: active });
              });
              setStatus("Desc actualizada.");
            }}
          />
        </label>

        <label className="name">
          Skills (notas / rutas)
          <input
            className="input"
            style={{ marginTop: 6 }}
            value={state.skillsNote}
            placeholder="/workspace/yaiwes-skills/fromted/…"
            onChange={(e) => {
              const skillsNote = e.target.value;
              setState((prev) => {
                const active: InputKind[] = prev.activeKinds.includes("skills")
                  ? prev.activeKinds
                  : [...prev.activeKinds, "skills"];
                return persist({ ...prev, skillsNote, activeKinds: active });
              });
              setStatus("Skills note persistida.");
            }}
          />
        </label>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <label className="name">
            Web URL
            <input
              className="input"
              style={{ marginTop: 6 }}
              value={state.webUrl}
              placeholder="https://…"
              onChange={(e) => {
                const webUrl = e.target.value;
                setState((prev) => {
                  const active: InputKind[] = prev.activeKinds.includes("web")
                    ? prev.activeKinds
                    : [...prev.activeKinds, "web"];
                  return persist({ ...prev, webUrl, activeKinds: active });
                });
                setStatus("Web URL persistida.");
              }}
            />
          </label>
          <label className="name">
            App URL / id
            <input
              className="input"
              style={{ marginTop: 6 }}
              value={state.appUrl}
              placeholder="app://… o https://…"
              onChange={(e) => {
                const appUrl = e.target.value;
                setState((prev) => {
                  const active: InputKind[] = prev.activeKinds.includes("app")
                    ? prev.activeKinds
                    : [...prev.activeKinds, "app"];
                  return persist({ ...prev, appUrl, activeKinds: active });
                });
                setStatus("App URL persistida.");
              }}
            />
          </label>
          <label className="name">
            UI OSS
            <input
              className="input"
              style={{ marginTop: 6 }}
              value={state.uiOssUrl}
              placeholder="github.com/… o demo URL"
              onChange={(e) => {
                const uiOssUrl = e.target.value;
                setState((prev) => {
                  const active: InputKind[] = prev.activeKinds.includes("ui-oss")
                    ? prev.activeKinds
                    : [...prev.activeKinds, "ui-oss"];
                  return persist({ ...prev, uiOssUrl, activeKinds: active });
                });
                setStatus("UI OSS persistido.");
              }}
            />
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Cargar por tipo (naranja solo en Cargar/Descargar)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(
            ["archivos", "fotos", "video", "docs", "skills"] as InputKind[]
          ).map((kind) => (
            <button
              key={kind}
              type="button"
              className="btn-cargar"
              onClick={() => openCargar(kind)}
            >
              Cargar · {kind}
            </button>
          ))}
          <button type="button" className="btn-descargar" onClick={onDescargar}>
            Descargar
          </button>
          <button type="button" className="btn-primary" onClick={clearAll}>
            Limpiar todo
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          multiple
          hidden
          onChange={(e) => onFilesPicked(e.target.files)}
        />
      </section>

      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Archivos cargados ({state.files.length})
        </div>
        {state.files.length === 0 ? (
          <p className="meta">Ningun archivo aun.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: 8,
            }}
          >
            {state.files.map((f) => (
              <li
                key={f.id}
                className="card"
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="name">
                    [{f.kind}] {f.name}
                  </div>
                  <div className="sub">
                    {f.type} · {f.size} bytes
                  </div>
                  {f.preview?.startsWith("data:image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.preview}
                      alt={f.name}
                      style={{
                        marginTop: 8,
                        maxHeight: 96,
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                      }}
                    />
                  ) : f.preview ? (
                    <div className="preview-box" style={{ marginTop: 8 }}>
                      {f.preview}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => removeFile(f.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <div className="name" style={{ marginBottom: 8 }}>
          Preview del input aceptado
        </div>
        <pre className="preview-box">{previewText}</pre>
        {state.updatedAt ? (
          <p className="meta" style={{ marginTop: 8 }}>
            Ultima persistencia: {state.updatedAt}
          </p>
        ) : null}
      </section>
    </main>
  );
}
