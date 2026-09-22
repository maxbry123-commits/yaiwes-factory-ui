"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { PLUGIN_CATALOG } from "@/lib/factory-state";

export function PluginCarousel() {
  const [index, setIndex] = useState(0);
  const total = PLUGIN_CATALOG.length;
  const slot = PLUGIN_CATALOG[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div className="space-y-3" role="region" aria-roledescription="carrusel">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-white/55">
          Ranura {index + 1} / {total} · flechas ← →
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={prev} aria-label="Anterior">
            ← Anterior
          </Button>
          <Button variant="secondary" onClick={next} aria-label="Siguiente">
            Siguiente →
          </Button>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 p-5">
        <p className="text-xs uppercase tracking-wider text-white/40">Plugin slot</p>
        <h3 className="mt-1 text-xl font-semibold text-white">{slot.label}</h3>
        <p className="mt-2 text-sm text-white/60">{slot.description}</p>
        <p className="mt-3 font-mono text-xs text-white/35">id: {slot.id}</p>
      </div>
      <div className="flex justify-center gap-1.5">
        {PLUGIN_CATALOG.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Ir a ${s.label}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-selection" : "bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
