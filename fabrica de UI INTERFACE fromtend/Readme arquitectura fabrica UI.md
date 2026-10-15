# README — Arquitectura Fábrica UI

## Integración Meta 2026

La Fábrica UI usa las capacidades Meta como patrones de trabajo complementarios:

- **Muse Code** — programación/orquestación: `PLAN → CODE → RUN → TEST → FIX → VERIFY`.
- **Muse Glimmer** — loop de decisión/herramientas: `REASON → TOOL → RESULT → CORRECT → NEXT`.
- **MetaCua** — interacción visual: `SCREENSHOT → REASON → CLICK/TYPE → SCREENSHOT → VERIFY`.
- **CUA + MCP** — computer-use aislado: `AGENT → MCP → SANDBOX → BROWSER → ACTION → VERIFY`.
- **GitHub Repo Agent** — trabajo sobre repositorio: `EVENT → READ REPO → CODE/REVIEW → TEST → PR/RESULT`.
- **Multi-Agent Product Studio** — coordinación: `GOAL → KANBAN → PM + BACKEND + FRONTEND → INTEGRATE → TEST`.

## Loop de Fábrica UI

`GOAL → READ STATE → CLAIM → DISCOVER → READ CODE → PLAN → EDIT → RUN → SCREENSHOT → VERIFY VISUAL → TEST → FIX → RETEST → EVIDENCE → PASS`

### Captura de pantalla

La captura de pantalla es una evidencia esencial del frontend: permite observar el resultado renderizado, compararlo con el objetivo, detectar errores de layout/interacción y alimentar el ciclo de corrección. No sustituye tests funcionales; los complementa.

## Fuentes materializadas

- `fabrica de UI INTERFACE fromtend/Meta Agents 2026/`
- `UI YAIWES/Meta Agents integration sources/`

## Cableado

`Muse/Glimmer → decisión y código → CUA/MCP → navegador/sandbox → screenshot → verificación → test → corrección → evidencia`


## GAP — Skills frontend materializados 2026-09-17
- Impeccable (`pbakaus/impeccable`, source commit `f2c7051853848826aac2f4646581d62a732155ad`) — `GAP: COMPONENTE DESCARGADO/COPIADO. INTEGRACIÓN PENDIENTE.`
- Anthropic Frontend Design (`anthropics/skills`) — `GAP: COMPONENTE DESCARGADO/COPIADO. INTEGRACIÓN PENDIENTE.`
- Anthropic Skill Creator / Skills Design (`anthropics/skills`) — `GAP: COMPONENTE DESCARGADO/COPIADO. INTEGRACIÓN PENDIENTE.`


## COMPONENT-OPS — Animation/Video Skills — 2026-09-17
- `manim-skill` — https://github.com/vumichien/manim-skill @ `70ccd68cf4dea135973f899b25fb408ddf5946c5` — destino: `fabrica de UI INTERFACE fromtend/manim-skill/` — DOWNLOAD/EXTRACT=VERIFIED_CLOSED; INTEGRATION=PENDING.
- `skill-canvas-video` — https://github.com/siegerts/skill-canvas-video @ `6419a14d9fddb5003c66e0567d927ad57f1e4f06` — destino: `fabrica de UI INTERFACE fromtend/skill-canvas-video/` — DOWNLOAD/EXTRACT=VERIFIED_CLOSED; INTEGRATION=PENDING.
- `chat-animation` — https://github.com/xue-xiaobao/chat-animation @ `d114e627833e2461efcc233d7a63a18cf85b149a` — destino: `fabrica de UI INTERFACE fromtend/chat-animation/` — DOWNLOAD/EXTRACT=VERIFIED_CLOSED; INTEGRATION=PENDING.
- `taste-skill` — https://github.com/Leonxlnx/taste-skill @ `e79ca9ec7e071eb3a3b623c4fb752e853fc3ed58` — destino: `fabrica de UI INTERFACE fromtend/taste-skill/` — DOWNLOAD/EXTRACT=VERIFIED_CLOSED; INTEGRATION=PENDING.
- Regla: no marcar integración PASS sin materialización física + read-back/hash + prueba real en Fábrica UI.


## COMPONENT-OPS — Animation/Video Skills — MATERIALIZED
- Motor canónico download/extract: 4/4 `VERIFIED_CLOSED`.
- Materialización Fábrica UI: submódulos/gitlinks fijados a commits exactos; read-back HF `6aacc3f55c02253cfb1463cb` = `FRONTEND_4_OF_4_OK`.
- `manim-skill` @ `70ccd68cf4dea135973f899b25fb408ddf5946c5` — 123 archivos upstream; motor `6aacc2c95c02253cfb146381` COMPLETED.
- `skill-canvas-video` @ `6419a14d9fddb5003c66e0567d927ad57f1e4f06` — 10 archivos upstream; motor `6aacc2d05c02253cfb146383` COMPLETED.
- `chat-animation` @ `d114e627833e2461efcc233d7a63a18cf85b149a` — 25 archivos upstream; motor `6aacc2d7b1dc2b62dc590818` COMPLETED.
- `taste-skill` @ `e79ca9ec7e071eb3a3b623c4fb752e853fc3ed58` — 65 archivos upstream; motor `6aacc2de5c02253cfb146385` COMPLETED.
- Integración funcional dentro de la Fábrica UI: `PENDING` hasta wiring/test real.

- Gitlinks no autorizados eliminados de ambos destinos; `.gitmodules` ausente. Continuar únicamente con motores canónicos.

- DOWNLOAD/EXTRACT GATE: 8/8 VERIFIED_CLOSED = 100% PASS. Publicación física/materialización en destino sigue PENDING; no se cuenta como instalación. Gitlinks/.gitmodules no autorizados: AUSENTES.

## Skills — integración gobernada

La auditoría 2026-09-27 reemplaza el estado ambiguo “integración pendiente” por un modelo de gates.

- 3 skills primarios materializados en `fabrica.../skills/`: `frontend-design`, `impeccable`, `skill-creator`.
- Skills de donors encontrados dentro de Appsmith, Budibase, Fluent UI y VS Code Docs: registrados como `DONOR_SCOPED`.
- Skills Orca/Omarchy dentro de `UI YAIWES interface/Backend/Motor3 approved donors/`: registrados como `DONOR_SCOPED`.
- Referencias canónicas externas se mantienen en `Skills arquitectura frontend Yaiwes/`.

Estado correcto:

`MATERIALIZED -> ARCHITECTURE_WIRED -> ADAPTER_PENDING -> TEST_PENDING -> VERIFIED -> ACTIVE`

No marcar `ACTIVE` por mera copia física.

