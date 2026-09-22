/**
 * Shared factory client state — localStorage + custom events.
 * Contract keys must not be renamed. FE Pasos owns steps 1–3 payload details.
 */

export type FactoryTheme = "matte" | "little" | "blanco";

export const LS_INPUT = "FROMTED_factory_input";
export const LS_WINDOWS = "FROMTED_factory_windows";
export const LS_THEME = "FROMTED_factory_theme";
export const LS_RUN_ID = "FROMTED_factory_runId";

export const EVENT_INPUT_READY = "fromted:input-ready";
export const EVENT_WINDOWS_CHANGED = "fromted:windows-changed";
export const EVENT_THEME_CHANGED = "fromted:theme-changed";

export type FactoryWindowsState = {
  windows: string[];
  plugins?: string[];
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getFactoryInput<T = unknown>(): T | null {
  if (!isBrowser()) return null;
  return safeParse<T | null>(localStorage.getItem(LS_INPUT), null);
}

export function setFactoryInput(value: unknown): void {
  if (!isBrowser()) return;
  localStorage.setItem(LS_INPUT, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT_INPUT_READY, { detail: value }));
}

export function getFactoryWindows(): FactoryWindowsState {
  if (!isBrowser()) return { windows: [], plugins: [] };
  const parsed = safeParse<FactoryWindowsState | string[] | null>(
    localStorage.getItem(LS_WINDOWS),
    { windows: [], plugins: [] },
  );
  if (Array.isArray(parsed)) return { windows: parsed, plugins: [] };
  return {
    windows: parsed?.windows ?? [],
    plugins: parsed?.plugins ?? [],
  };
}

export function setFactoryWindows(value: FactoryWindowsState): void {
  if (!isBrowser()) return;
  const next: FactoryWindowsState = {
    windows: value.windows ?? [],
    plugins: value.plugins ?? [],
  };
  localStorage.setItem(LS_WINDOWS, JSON.stringify(next));
  window.dispatchEvent(
    new CustomEvent(EVENT_WINDOWS_CHANGED, { detail: next }),
  );
}

export function getSelectedPlugins(): string[] {
  return getFactoryWindows().plugins ?? [];
}

export function setSelectedPlugins(pluginIds: string[]): void {
  const current = getFactoryWindows();
  setFactoryWindows({ ...current, plugins: pluginIds });
}

export function toggleSelectedPlugin(pluginId: string): string[] {
  const current = getSelectedPlugins();
  const next = current.includes(pluginId)
    ? current.filter((id) => id !== pluginId)
    : [...current, pluginId];
  setSelectedPlugins(next);
  return next;
}

export function getFactoryTheme(): FactoryTheme {
  if (!isBrowser()) return "matte";
  const raw = localStorage.getItem(LS_THEME);
  if (raw === "little" || raw === "blanco" || raw === "matte") return raw;
  return "matte";
}

export function setFactoryTheme(theme: FactoryTheme): void {
  if (!isBrowser()) return;
  localStorage.setItem(LS_THEME, theme);
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
  window.dispatchEvent(new CustomEvent(EVENT_THEME_CHANGED, { detail: theme }));
}

export function getFactoryRunId(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(LS_RUN_ID);
}

export function setFactoryRunId(runId: string | null): void {
  if (!isBrowser()) return;
  if (runId) localStorage.setItem(LS_RUN_ID, runId);
  else localStorage.removeItem(LS_RUN_ID);
}

export function onFactoryEvent(
  eventName:
    | typeof EVENT_INPUT_READY
    | typeof EVENT_WINDOWS_CHANGED
    | typeof EVENT_THEME_CHANGED,
  handler: (event: Event) => void,
): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export function onInputReady(handler: (detail: unknown) => void): () => void {
  return onFactoryEvent(EVENT_INPUT_READY, (e) => {
    handler((e as CustomEvent).detail);
  });
}

export function onWindowsChanged(
  handler: (detail: FactoryWindowsState) => void,
): () => void {
  return onFactoryEvent(EVENT_WINDOWS_CHANGED, (e) => {
    handler((e as CustomEvent).detail as FactoryWindowsState);
  });
}

export function onThemeChanged(
  handler: (theme: FactoryTheme) => void,
): () => void {
  return onFactoryEvent(EVENT_THEME_CHANGED, (e) => {
    handler((e as CustomEvent).detail as FactoryTheme);
  });
}

export const MATTE_TOKENS = {
  bg: "#0a0a0d",
  selection: "#2563eb",
  cargarDescargarText: "#ff5500",
  littleCtaFill: "#C65D3B",
} as const;

export const STEPS = [
  {
    id: 1,
    href: "/step-1",
    label: "Entrada",
    title: "Entrada multimodal",
    owner: "pasos" as const,
  },
  {
    id: 2,
    href: "/step-2",
    label: "Componentes",
    title: "Componentes y ventanas",
    owner: "pasos" as const,
  },
  {
    id: 3,
    href: "/step-3",
    label: "Backend",
    title: "Backend e integraciones",
    owner: "pasos" as const,
  },
  {
    id: 4,
    href: "/step-4",
    label: "Diseño",
    title: "Tokens y plugins",
    owner: "fusion" as const,
  },
  {
    id: 5,
    href: "/step-5",
    label: "Revisión",
    title: "Revisión y despliegue",
    owner: "fusion" as const,
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export const PLUGIN_CATALOG = [
  {
    id: "theme",
    label: "Tema",
    description: "Switcher matte / little / blanco",
  },
  {
    id: "windows",
    label: "Ventanas",
    description: "1 ventana = 1 archivo",
  },
  {
    id: "backend-hook",
    label: "Backend hook",
    description: "Enlace a hooks de fábrica",
  },
  {
    id: "deploy-prep",
    label: "Deploy prep",
    description: "Preparación de despliegue",
  },
] as const;


export const LS_BACKEND = "FROMTED_factory_backend";
export const EVENT_BACKEND_CHANGED = "fromted:backend-changed";

export const BACKEND_FEATURES = [
  { id: "auth-session", label: "Auth / sesión", info: "Login y sesión de usuario para la app generada." },
  { id: "file-storage", label: "Almacenamiento de archivos", info: "Subida y guardado de docs/fotos/videos del paso 1." },
  { id: "rest-api", label: "API REST", info: "Endpoints CRUD derivados de ventanas y componentes." },
  { id: "webhooks", label: "Webhooks", info: "Hooks de entrada/salida para integraciones." },
  { id: "db-schema", label: "Schema DB", info: "Tablas/colecciones según segmentos del paso 2." },
  { id: "download-motor-hook", label: "Hook motor descarga", info: "Conecta con el motor de descarga OSS (REUSE>GENERATE)." },
  { id: "skills-to-schema", label: "Skills → schema", info: "Convierte skills cargados en schema usable." },
  { id: "deploy-hooks", label: "Deploy hooks", info: "Prepara hooks de despliegue Vercel (sin HF)." },
] as const;

export type BackendFeatureId = (typeof BACKEND_FEATURES)[number]["id"];

export function getFactoryBackend(): string[] {
  if (!isBrowser()) return [];
  const parsed = safeParse<string[] | { features?: string[] } | null>(
    localStorage.getItem(LS_BACKEND),
    [],
  );
  if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
  if (parsed && typeof parsed === "object" && Array.isArray(parsed.features)) {
    return parsed.features.filter((x) => typeof x === "string");
  }
  return [];
}

export function setFactoryBackend(ids: string[]): void {
  if (!isBrowser()) return;
  const unique = Array.from(new Set(ids));
  localStorage.setItem(LS_BACKEND, JSON.stringify(unique));
  window.dispatchEvent(
    new CustomEvent(EVENT_BACKEND_CHANGED, { detail: unique }),
  );
}

export function toggleFactoryBackend(id: string): string[] {
  const current = getFactoryBackend();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  setFactoryBackend(next);
  return next;
}

export {
  FactoryProvider,
  useFactory,
  type UploadedFileMeta,
  type FactoryState,
  type FactoryActions,
} from "@/lib/factory-context";
