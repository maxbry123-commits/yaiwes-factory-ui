"use client";

import { Button } from "@/components/Button";

type NumberStepperProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
};

export function NumberStepper({
  id,
  label,
  value,
  min = 1,
  max = 20,
  onChange,
}: NumberStepperProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="!px-3"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Disminuir ${label}`}
        >
          −
        </Button>
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange(n);
          }}
          className="w-20 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-center text-sm text-white focus:border-selection focus:outline-none focus:ring-1 focus:ring-selection"
        />
        <Button
          variant="secondary"
          className="!px-3"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Aumentar ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  );
}
