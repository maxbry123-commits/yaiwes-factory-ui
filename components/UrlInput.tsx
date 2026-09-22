"use client";

import { Button } from "@/components/Button";

type UrlInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function UrlInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: UrlInputProps) {
  function handleValidate() {
    const trimmed = value.trim();
    if (!trimmed) {
      console.log("[url] vacío — nada que validar");
      return;
    }
    try {
      const u = new URL(trimmed);
      console.log("[url] válida", u.href);
      alert(`URL válida: ${u.href}`);
    } catch {
      console.log("[url] inválida", trimmed);
      alert("URL inválida. Usa un formato como https://ejemplo.com");
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={id}
          type="url"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-selection focus:outline-none focus:ring-1 focus:ring-selection"
        />
        <Button variant="secondary" onClick={handleValidate}>
          Validar URL
        </Button>
      </div>
    </div>
  );
}
