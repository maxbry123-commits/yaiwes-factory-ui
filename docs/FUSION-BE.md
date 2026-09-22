# Fusión FE/BE — puntos de acoplamiento (FE Fusión)

Target: `/workspace/yaiwes-factory-ui` (Next App Router).  
No tocar HF. No usar fromted.vercel.app como target de esta fábrica.

## Contratos FE ya cableados

| Superficie | Path / key | Owner |
|---|---|---|
| Step 4 UI | `/step-4` | FE Fusión |
| Step 5 UI | `/step-5` | FE Fusión |
| Run | `POST /api/factory/run` `{ step, payload }` → `{ ok, runId, result }` | stub hoy; BE/Pasos real |
| Status | `GET /api/factory/status?runId=` → `{ status, step, updatedAt }` | stub hoy |
| Deploy prep | `POST /api/factory/deploy-prep` → `{ ready, files[], checks[] }` | stub hoy |
| LS | `FROMTED_factory_input`, `FROMTED_factory_windows`, `FROMTED_factory_theme` | compartido |
| Events | `fromted:input-ready`, `fromted:windows-changed`, `fromted:theme-changed` | compartido |

Tipados en `lib/factory-api.ts` y `lib/factory-state.ts`.

## Qué necesita FE de Backend

### BE Integración (5000307)
1. Componentes OSS reutilizables (REUSE>GENERATE) para slots de plugins: marketing, 3D, video, selectores avanzados — exportables como módulos, no monólitos.
2. Manifest de plugin: `{ id, label, entry, deps[] }` alineado con `PLUGIN_CATALOG` / `FROMTED_factory_windows.plugins`.
3. Sin inventar paletas; respetar Matte/Little/Blanco.

### BE Fábrica (5000309)
1. Schema skills→factory: mapear skill donors a `payload` de `POST /api/factory/run` (step 4/5).
2. Checks de deploy: lista semántica para `deploy-prep.checks[]` (build, env, assets, plugins).
3. No tocar HF.

## Fricción 0 (reglas)
- Paths API inmutables sin avisar a FE Pasos + FE Fusión.
- 1 ventana = 1 archivo.
- Botones con evento real (Apply → run; Deploy prep → checks).
- Stubs tipados hasta contrato BE publicado; luego swap de implementación detrás de `lib/factory-api.ts`.

## Hito 1 (entregado)
- step-4: tema, tokens, carrusel, toggles, Apply → run
- step-5: status, plugin summary, review checks, deploy-prep gated
- Placeholders step-1..3 para nav (FE Pasos)

## Siguiente
- Sustituir stubs API cuando Backend publique contratos reales (vía Manager Frontend).
- Ampliar plugins marketing/3D/video con donors BE Integración.
