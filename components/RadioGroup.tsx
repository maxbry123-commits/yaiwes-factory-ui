"use client";

export type RadioOption = {
  id: string;
  label: string;
  description?: string;
};

type RadioGroupProps = {
  name: string;
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (id: string) => void;
};

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-white/90">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = value === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition ${
                checked
                  ? "border-selection/60 bg-selection/15"
                  : "border-white/10 bg-black/20 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name={name}
                className="mt-1 h-4 w-4 accent-[#2563eb]"
                checked={checked}
                onChange={() => onChange(opt.id)}
              />
              <span>
                <span className="block text-sm text-white">{opt.label}</span>
                {opt.description ? (
                  <span className="block text-xs text-white/45">
                    {opt.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
