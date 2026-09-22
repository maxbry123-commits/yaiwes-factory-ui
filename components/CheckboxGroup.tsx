"use client";

export type CheckboxOption = {
  id: string;
  label: string;
  description?: string;
};

type CheckboxGroupProps = {
  legend: string;
  options: CheckboxOption[];
  selected: string[];
  onToggle: (id: string) => void;
};

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
}: CheckboxGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-white/90">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const checked = selected.includes(opt.id);
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
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#2563eb]"
                checked={checked}
                onChange={() => onToggle(opt.id)}
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
