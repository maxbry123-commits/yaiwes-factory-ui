"use client";

type ToggleSwitchProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ToggleSwitch({
  id,
  label,
  description,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-3 py-3 transition ${
        checked
          ? "border-selection/60 bg-selection/15"
          : "border-white/10 bg-black/20 hover:border-white/20"
      }`}
    >
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        {description ? (
          <span className="block text-xs text-white/45">{description}</span>
        ) : null}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-selection" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}
