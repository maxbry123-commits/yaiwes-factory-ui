"use client";

import { useEffect, useState } from "react";
import {
  type FactoryTheme,
  getFactoryTheme,
  onThemeChanged,
  setFactoryTheme,
  MATTE_TOKENS,
} from "@/lib/factory-state";

const THEMES: { id: FactoryTheme; label: string; hint: string }[] = [
  { id: "matte", label: "Matte", hint: "Fondo #0a0a0d" },
  { id: "little", label: "Little", hint: `CTA ${MATTE_TOKENS.littleCtaFill}` },
  { id: "blanco", label: "Blanco", hint: "Claro" },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<FactoryTheme>("matte");

  useEffect(() => {
    setTheme(getFactoryTheme());
    return onThemeChanged(setTheme);
  }, []);

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-white/90">Tema</legend>
      <div className="flex flex-wrap gap-2">
        {THEMES.map((t) => {
          const active = theme === t.id;
          const littleActive = t.id === "little" && active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFactoryTheme(t.id)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                active
                  ? littleActive
                    ? "border-transparent text-white"
                    : "border-selection/60 bg-selection/20 text-white"
                  : "border-white/10 bg-black/20 text-white/70 hover:border-white/25"
              }`}
              style={
                littleActive
                  ? { backgroundColor: MATTE_TOKENS.littleCtaFill }
                  : undefined
              }
              aria-pressed={active}
            >
              <span className="block font-medium">{t.label}</span>
              <span className="block text-xs opacity-60">{t.hint}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
