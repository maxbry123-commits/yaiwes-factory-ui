"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import InfoTip from "@/components/InfoTip";
import { STEPS, LS_INPUT, LS_WINDOWS, LS_BACKEND } from "@/lib/factory-state";

type GuidedFooterProps = {
  current: 1 | 2 | 3 | 4 | 5;
};

type FactoryInputLike = {
  text?: string;
  descNote?: string;
  webUrl?: string;
  appUrl?: string;
  uiOssUrl?: string;
  skillsNote?: string;
  files?: unknown[];
};

function isValidInput(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const o = JSON.parse(raw) as FactoryInputLike;
    if (!o || typeof o !== "object") return false;
    if (typeof o.text === "string" && o.text.trim()) return true;
    if (typeof o.descNote === "string" && o.descNote.trim()) return true;
    if (typeof o.webUrl === "string" && o.webUrl.trim()) return true;
    if (typeof o.appUrl === "string" && o.appUrl.trim()) return true;
    if (typeof o.uiOssUrl === "string" && o.uiOssUrl.trim()) return true;
    if (typeof o.skillsNote === "string" && o.skillsNote.trim()) return true;
    if (Array.isArray(o.files) && o.files.length > 0) return true;
    return false;
  } catch {
    return false;
  }
}

function hasEnabledWindow(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.some(
        (w) =>
          w &&
          typeof w === "object" &&
          (w as { enabled?: boolean }).enabled !== false,
      );
    }
    if (parsed && typeof parsed === "object") {
      const windows = (parsed as { windows?: unknown }).windows;
      if (Array.isArray(windows) && windows.length > 0) {
        // object {windows: string[]} — non-empty counts as enabled
        if (windows.every((x) => typeof x === "string")) return true;
        return windows.some(
          (w) =>
            w &&
            typeof w === "object" &&
            (w as { enabled?: boolean }).enabled !== false,
        );
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
}

function hasBackendFeatures(raw: string | null): boolean {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.length > 0;
    if (parsed && typeof parsed === "object") {
      const features = (parsed as { features?: unknown }).features;
      return Array.isArray(features) && features.length > 0;
    }
    return false;
  } catch {
    return false;
  }
}

const NEXT_TIPS: Record<1 | 2 | 3 | 4, string> = {
  1: "Siguiente: añade al menos una ventana/componente habilitado en el paso 2.",
  2: "Siguiente: elige ≥1 feature de backend en el paso 3 y ejecuta el plan.",
  3: "Siguiente: configura tokens, tema y plugins en el paso 4 (Diseño).",
  4: "Siguiente: revisa el checklist y prepara el despliegue en el paso 5.",
};

export default function GuidedFooter({ current }: GuidedFooterProps) {
  const [canGoNext, setCanGoNext] = useState(true);
  const [blockMsg, setBlockMsg] = useState("");

  const evaluate = useCallback(() => {
    if (typeof window === "undefined") return;
    const inputOk = isValidInput(localStorage.getItem(LS_INPUT));
    const windowsOk = hasEnabledWindow(localStorage.getItem(LS_WINDOWS));
    const backendOk = hasBackendFeatures(localStorage.getItem(LS_BACKEND));

    if (current === 1) {
      setCanGoNext(inputOk);
      setBlockMsg(
        inputOk
          ? ""
          : "Carga al menos un input (texto, URL, skills, desc o archivos) para continuar.",
      );
      return;
    }
    if (current === 2) {
      setCanGoNext(windowsOk);
      setBlockMsg(
        windowsOk
          ? ""
          : "Añade y activa al menos una ventana/componente para continuar.",
      );
      return;
    }
    if (current === 3) {
      setCanGoNext(backendOk);
      setBlockMsg(
        backendOk
          ? ""
          : "Selecciona al menos una feature de backend para continuar.",
      );
      return;
    }
    // 4→5 and 5: always
    setCanGoNext(true);
    setBlockMsg("");
  }, [current]);

  useEffect(() => {
    evaluate();
    const onStorage = () => evaluate();
    window.addEventListener("storage", onStorage);
    window.addEventListener("fromted:input-ready", onStorage);
    window.addEventListener("fromted:windows-changed", onStorage);
    window.addEventListener("fromted:backend-changed", onStorage);
    const id = window.setInterval(evaluate, 800);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("fromted:input-ready", onStorage);
      window.removeEventListener("fromted:windows-changed", onStorage);
      window.removeEventListener("fromted:backend-changed", onStorage);
      window.clearInterval(id);
    };
  }, [evaluate]);

  const prev = useMemo(() => STEPS.find((s) => s.id === current - 1), [current]);
  const next = useMemo(() => STEPS.find((s) => s.id === current + 1), [current]);
  const tip =
    current < 5 ? NEXT_TIPS[current as 1 | 2 | 3 | 4] : "Fin del asistente.";

  return (
    <footer className="guided-footer">
      <p className="guided-footer__tip meta">{tip}</p>
      {!canGoNext && blockMsg ? (
        <p className="guided-footer__block" role="alert">
          {blockMsg}
        </p>
      ) : null}
      <div className="guided-footer__nav">
        {prev ? (
          <Link href={prev.href} className="btn-primary">
            ← Anterior: {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <span className="guided-footer__next-wrap">
            {canGoNext ? (
              <Link href={next.href} className="btn-primary">
                Siguiente: {next.label} →
              </Link>
            ) : (
              <button type="button" className="btn-primary" disabled>
                Siguiente: {next.label} →
              </button>
            )}
            <InfoTip
              text={
                canGoNext
                  ? tip
                  : blockMsg || "Completa los requisitos del paso actual."
              }
              label="Ayuda sobre el siguiente paso"
            />
          </span>
        ) : (
          <span className="meta">Fin del asistente</span>
        )}
      </div>
    </footer>
  );
}
