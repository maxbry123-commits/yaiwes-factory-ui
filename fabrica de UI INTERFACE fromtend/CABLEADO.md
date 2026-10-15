# Cableado fábrica ↔ skills ↔ bibliotecas ↔ backend ↔ sandbox

## Enlaces canónicos

Fábrica:
https://github.com/maxbry123-commits/frontend/tree/main/fabrica%20de%20UI%20INTERFACE%20fromtend

DESTINO componentes (subir ZIP aquí):
https://github.com/maxbry123-commits/frontend/tree/main/fabrica%20de%20UI%20INTERFACE%20fromtend/componentes%20para%20fabrica%20de%20interface

Skill arquitectura + bitácora:
https://github.com/maxbry123-commits/frontend/tree/main/Skills%20arquitectura%20frontend%20Yaiwes
https://github.com/maxbry123-commits/frontend/blob/main/Skills%20arquitectura%20frontend%20Yaiwes/Readme%20arquitectura%20frontend%20yaiwes.md

Biblioteca kernel / tokens / ventanas / backend marker:
https://github.com/maxbry123-commits/frontend/tree/main/Skills%20arquitectura%20frontend%20Yaiwes/biblioteca%20code%20frontend%20Maxbry%20Yaiwes

UI producto ya existente (no borrar):
https://github.com/maxbry123-commits/frontend/tree/main/UI%20YAIWES

## Mapa de archivos → rol

Función 1 FÁBRICA
  fabrica de UI INTERFACE fromtend/
    00-ADVERTENCIA-Y-MODELO.md
    TAREAS.md
    CABLEADO.md
    PLAN-FUSION-Y-CABLEADO.md
    componentes para fabrica de interface/   ← ZIP crudos
      00-CATALOGO-20-PLUS.md
      01-CATALOGO-AMPLIADO.md
      DESTINO.md

Función 2 RUNTIME (plantilla)
  Skills.../windows/          1 ventana = 1 archivo
  Skills.../functions/        1 función = 1 archivo
  biblioteca.../lote-03-ventanas-FROMTED-review/
  UI YAIWES/

Host / ribbon
  biblioteca.../lote-01-nucleo-host/
    02-slot-registry.js
    03-action-bus.js
    04-manifest-schema.js
    05-manifest-store.js
    06-access-key.js          clave YAIWES-CONFIG
    07-chrome-button.js
    08-chrome-window.js
    09-config-panel.js        SOLO F1
    10-wire.js

Look
  biblioteca.../lote-02-tokens-FROMTED/
  attachments skill 01-04

Backend IDENTIFICADO
  biblioteca.../lote-BACKEND/
  YAIWES-BRIDGES-REAL-CONNECTIONS.md (fuente, a partir)

Sandbox (aún no extraído)
  destino ZIP → Pyodide, QuickJS, Deno, Sandpack

## Regla de cable

Runtime nunca importa el canvas GrapesJS/Puck.
Fábrica nunca pinta lime Operator como chrome producto.
Backend nunca vive dentro de yaiwes-button.
Si mueves una carpeta, cambias BASE en 10-wire.js. El resto no se reescribe.

## Cableado skills 2026-09-27

Registro autoritativo del proyecto:

- `UI YAIWES interface/readme arquitectura UI YAIWES interface beta/actualizaciones arquitectura/SKILL-REGISTRY-UI-YAIWES-2026-09-27.json`
- `.../HANDOFF-SKILLS-UI-YAIWES-2026-09-27.md`
- `.../PLAN-ACCION-SKILLS-UI-YAIWES-2026-09-27.md`

Inventario: 51 `SKILL.md` físicos en UI interface + fábrica; 39 familias lógicas.

Cable:

```text
GOAL
→ SkillResolver
→ FROMTED policy
→ skill de diseño/build/QA
→ Capability Registry
→ componente/tool
→ browser/device
→ screenshot/test
→ evidencia
```

Los skills de donors permanecen aislados. Para reutilizarlos:

`DONOR SKILL -> EXTRACT GENERIC METHOD -> skill-creator -> YAIWES ADAPTER -> TEST -> APPROVAL`

No cablear directamente comandos específicos de Fluent UI, VS Code, Appsmith, Budibase, Orca u Omarchy a una tarea YAIWES si su runtime no existe.

