"use client";

import { useEffect, useState } from "react";
import {
  PLUGIN_CATALOG,
  getSelectedPlugins,
  onWindowsChanged,
} from "@/lib/factory-state";

export function PluginSummary() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(getSelectedPlugins());
    return onWindowsChanged((d) => setSelected(d.plugins ?? []));
  }, []);

  const items = PLUGIN_CATALOG.filter((p) => selected.includes(p.id));

  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <p className="text-sm text-white/45">
          Ningún plugin seleccionado. Ve al paso 4 para activar.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-selection/40 bg-selection/10 px-3 py-2 text-sm text-white"
            >
              <span className="font-medium">{p.label}</span>
              <span className="ml-2 text-white/45">{p.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
