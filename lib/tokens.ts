/** FROMTED theme tokens — immutable. Source: 01-tokens-themes.md */
export type ThemeId = "matte" | "little" | "blanco";

export const matte = {
  pure: "#000000",
  bg: "#0a0a0d",
  surface: "#141417",
  panel: "#1a1a1e",
  card: "#202025",
  cardHover: "#282830",
  border: "#2a2a33",
  borderLight: "#3f3f4e",
  textBright: "#ffffff",
  textPrimary: "#e4e4e7",
  textSecondary: "#a1a1aa",
  textTertiary: "#71717a",
  textMuted: "#52525b",
  blue: "#2563eb",
  orange: "#ff5500",
} as const;

export const little = {
  bg: "#1C1B1A",
  surface: "#2A2927",
  card: "#2A2927",
  cardHover: "#353330",
  border: "rgba(255,255,255,0.1)",
  borderStrong: "rgba(255,255,255,0.18)",
  textBright: "#F5F4F0",
  textPrimary: "#F5F4F0",
  textSecondary: "#A8A29E",
  textTertiary: "#9C9590",
  accent: "#C65D3B",
  accentHover: "#b05031",
  accentLight: "rgba(198,93,59,0.15)",
} as const;

export const blanco = {
  bg: "#f4f4f5",
  surface: "#ffffff",
  card: "#ffffff",
  cardHover: "#f8f8f9",
  border: "#e4e4e7",
  borderStrong: "#d4d4d8",
  textBright: "#18181b",
  textPrimary: "#3f3f46",
  textSecondary: "#71717a",
  textTertiary: "#a1a1aa",
  blue: "#2563eb",
  blueSoft: "rgba(37,99,235,0.08)",
} as const;

export function themeToCssVars(id: ThemeId): Record<string, string> {
  if (id === "little") {
    return {
      "--pure": little.bg,
      "--bg": little.bg,
      "--surface": little.surface,
      "--panel": little.surface,
      "--card": little.card,
      "--card-hover": little.cardHover,
      "--border": little.border,
      "--border-light": little.borderStrong,
      "--text-bright": little.textBright,
      "--text-primary": little.textPrimary,
      "--text-secondary": little.textSecondary,
      "--text-tertiary": little.textTertiary,
      "--text-muted": little.textTertiary,
      "--blue": little.accent,
      "--orange": little.accent,
      "--accent": little.accent,
      "--accent-hover": little.accentHover,
      "--accent-light": little.accentLight,
      "--background": little.bg,
      "--foreground": little.textBright,
      "--selection": little.accent,
      "--cargar": little.accent,
    };
  }
  if (id === "blanco") {
    return {
      "--pure": "#ffffff",
      "--bg": blanco.bg,
      "--surface": blanco.surface,
      "--panel": blanco.surface,
      "--card": blanco.card,
      "--card-hover": blanco.cardHover,
      "--border": blanco.border,
      "--border-light": blanco.borderStrong,
      "--text-bright": blanco.textBright,
      "--text-primary": blanco.textPrimary,
      "--text-secondary": blanco.textSecondary,
      "--text-tertiary": blanco.textTertiary,
      "--text-muted": blanco.textTertiary,
      "--blue": blanco.blue,
      "--orange": blanco.blue,
      "--accent": blanco.blue,
      "--accent-hover": blanco.blue,
      "--accent-light": blanco.blueSoft,
      "--background": blanco.bg,
      "--foreground": blanco.textBright,
      "--selection": blanco.blue,
      "--cargar": blanco.blue,
    };
  }
  return {
    "--pure": matte.pure,
    "--bg": matte.bg,
    "--surface": matte.surface,
    "--panel": matte.panel,
    "--card": matte.card,
    "--card-hover": matte.cardHover,
    "--border": matte.border,
    "--border-light": matte.borderLight,
    "--text-bright": matte.textBright,
    "--text-primary": matte.textPrimary,
    "--text-secondary": matte.textSecondary,
    "--text-tertiary": matte.textTertiary,
    "--text-muted": matte.textMuted,
    "--blue": matte.blue,
    "--orange": matte.orange,
    "--accent": matte.blue,
    "--accent-hover": matte.blue,
    "--accent-light": "rgba(37,99,235,0.15)",
    "--background": matte.bg,
    "--foreground": matte.textBright,
    "--selection": matte.blue,
    "--cargar": matte.orange,
  };
}

export function applyTheme(
  id: ThemeId,
  el: HTMLElement = document.documentElement,
) {
  el.dataset.theme = id;
  for (const [k, v] of Object.entries(themeToCssVars(id))) {
    el.style.setProperty(k, v);
  }
}

export const THEME_IDS: ThemeId[] = ["matte", "little", "blanco"];
