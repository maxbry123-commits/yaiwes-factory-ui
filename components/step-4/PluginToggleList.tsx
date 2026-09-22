"use client";

import { useEffect, useState } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import {
  PLUGIN_CATALOG,
  getSelectedPlugins,
  onWindowsChanged,
  toggleSelectedPlugin,
} from "@/lib/factory-state";

export function PluginToggleList() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(getSelectedPlugins());
    return onWindowsChanged((detail) => setSelected(detail.plugins ?? []));
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/55">
        Plugins activos se guardan en{" "}
        <code className="text-white/40">FROMTED_factory_windows.plugins</code>
      </p>
      {PLUGIN_CATALOG.map((plugin) => (
        <ToggleSwitch
          key={plugin.id}
          id={`plugin-${plugin.id}`}
          label={plugin.label}
          description={plugin.description}
          checked={selected.includes(plugin.id)}
          onChange={() => setSelected(toggleSelectedPlugin(plugin.id))}
        />
      ))}
    </div>
  );
}
