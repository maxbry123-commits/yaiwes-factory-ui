# Catálogo 22 sistemas — cómo funcionan, cómo fusionarlos, ZIP para descargar

Regla: descargar el ZIP, subirlo a esta carpeta. No clonar 22 monorepos dentro del producto.

Leyenda de fusión:

- F1 = fábrica interna (Director)
- F2 = runtime plantilla (usuario)
- C = conexiones / flows
- S = sandbox local de code
- B = backend local (lote-BACKEND)

---

## A. Canvas / editor visual (F1 solamente)

### 1. GrapesJS — motor de page builder embebible
Cómo: canvas + bloques + JSON de página. Tú pones load/store.
Fusión: el canvas vive solo detras de la clave. El JSON publicado se vuelve plantilla F2. No se sirve el editor al usuario.
- https://github.com/GrapesJS/grapesjs
- ZIP: https://github.com/GrapesJS/grapesjs/archive/refs/heads/master.zip

### 2. Puck — editor visual React embebible
Cómo: página = JSON de componentes React propios.
Fusión: registrar componentes FROMTED (card, sheet, header) como bloques Puck. Publish → manifiesto YAIWES.
- https://github.com/measuredco/puck
- ZIP: https://github.com/measuredco/puck/archive/refs/heads/main.zip

### 3. Craft.js — toolkit para construir el editor
Cómo: no trae UI de editor completa; tú armas el chrome.
Fusión: útil si el canvas debe parecer FROMTED, no Craft.
- https://github.com/prevwong/craft.js
- ZIP: https://github.com/prevwong/craft.js/archive/refs/heads/master.zip

### 4. Plasmic — visual + React real
Cómo: registras componentes del repo; el canvas los usa.
Fusión: F1. No sustituye tokens skill 01.
- https://github.com/plasmicapp/plasmic
- ZIP: https://github.com/plasmicapp/plasmic/archive/refs/heads/master.zip

### 5. Onlook — editor visual sobre código React/Next
Cómo: edita JSX real.
Fusión: solo F1 local. No es runtime de usuario.
- https://github.com/onlook-dev/onlook
- ZIP: https://github.com/onlook-dev/onlook/archive/refs/heads/main.zip

### 6. Webstudio — Webflow OSS
Cómo: builder de sitios, CSS-first.
Fusión: referencia de canvas, no host YAIWES.
- https://github.com/webstudio-is/webstudio
- ZIP: https://github.com/webstudio-is/webstudio/archive/refs/heads/main.zip

---

## B. Ribbon / host extensible (F1 declara, F2 pinta)

### 7. Office-Ribbon-2010 web
Cómo: tabs / groups / large-small buttons / backstage en HTML.
Fusión: modelo visual del host. Tokens → lote-02 FROMTED, no tema Office azul.
- https://github.com/OkGoDoIt/Office-Ribbon-2010
- ZIP: https://github.com/OkGoDoIt/Office-Ribbon-2010/archive/refs/heads/master.zip

### 8. Fluent.Ribbon (WPF)
Cómo: RibbonTab, QAT, Backstage, ScreenTip.
Fusión: contrato de controles, no portar WPF.
- https://github.com/fluentribbon/Fluent.Ribbon
- ZIP: https://github.com/fluentribbon/Fluent.Ribbon/archive/refs/heads/develop.zip

### 9. Fluent UI (Microsoft)
Cómo: componentes + tema. Office Add-in = task pane.
Fusión: iconos/accesibilidad. Color = skill 01, no Fluent brand.
- https://github.com/microsoft/fluentui
- ZIP: https://github.com/microsoft/fluentui/archive/refs/heads/master.zip

### 10. VS Code contribution points
Cómo: `package.json` → `contributes.menus` / `views` / `commands`. Host pinta. Extensión no redibuja VS Code.
Fusión: es el gemelo moderno del RibbonX. Manifiesto YAIWES = contributes.
- Docs: https://code.visualstudio.com/api/references/contribution-points
- ZIP vscode-docs: https://github.com/microsoft/vscode-docs/archive/refs/heads/main.zip
- ZIP samples: https://github.com/microsoft/vscode-extension-samples/archive/refs/heads/main.zip

---

## C. Fábricas de tools internos (estudiar widgets; no tragar la plataforma)

### 11. Appsmith
Cómo: drag widgets + JS + datasources.
Fusión: catálogo de widgets. Runtime propio no reemplaza F2 FROMTED.
- https://github.com/appsmithorg/appsmith
- ZIP: https://github.com/appsmithorg/appsmith/archive/refs/heads/release.zip

### 12. ToolJet
Cómo: 60+ componentes, JS/Python, 80+ connectors.
Fusión: lista de componentes + idea de query. Queries → action-bus + backend local.
- https://github.com/ToolJet/ToolJet
- ZIP: https://github.com/ToolJet/ToolJet/archive/refs/heads/develop.zip

### 13. Budibase
Cómo: data + automations + UI.
Fusión: CRUD rápido interno. GPL: no mezclar en producto sin revisar licencia.
- https://github.com/Budibase/budibase
- ZIP: https://github.com/Budibase/budibase/archive/refs/heads/master.zip

### 14. Lowcoder (ex Openblocks)
Cómo: 120+ componentes, módulos reutilizables.
Fusión: idea de módulo embebible = 1 función = 1 archivo.
- https://github.com/lowcoder-org/lowcoder
- ZIP: https://github.com/lowcoder-org/lowcoder/archive/refs/heads/main.zip

### 15. NocoBase
Cómo: plugins + modelo de datos + páginas.
Fusión: plugin = manifiesto. No sustituye chrome FROMTED.
- https://github.com/nocobase/nocobase
- ZIP: https://github.com/nocobase/nocobase/archive/refs/heads/main.zip

---

## D. Conexiones (C) — fácil, 0 fricción

### 16. Node-RED
Cómo: nodos + wires. UI de flows en localhost:1880.
Fusión: F1 dibuja el flow. F2 solo dispara `action id`. El flow no se muestra al usuario.
- https://github.com/node-red/node-red
- ZIP: https://github.com/node-red/node-red/archive/refs/heads/master.zip

### 17. n8n
Cómo: workflows + credenciales. Self-host.
Fusión: igual que Node-RED; licencia fair-code, revisar antes de incrustar.
- https://github.com/n8n-io/n8n
- ZIP: https://github.com/n8n-io/n8n/archive/refs/heads/master.zip

### 18. Blockly
Cómo: bloques → JS/Python.
Fusión: editor de lógica F1 para quien no quiere JSON. Output = handler registrado en action-bus.
- https://github.com/RaspberryPiFoundation/blockly
- ZIP: https://github.com/RaspberryPiFoundation/blockly/archive/refs/heads/develop.zip

---

## E. Formularios / schema (plantilla sin fricción)

### 19. JSONForms
Cómo: JSON Schema + UI Schema → form.
Fusión: panel Config y settings v2-03 se declaran, no se dibujan.
- https://github.com/eclipsesource/jsonforms
- ZIP: https://github.com/eclipsesource/jsonforms/archive/refs/heads/master.zip

### 20. react-jsonschema-form (RJSF)
Cómo: schema → form React.
Fusión: alternativa a JSONForms si el stack es React.
- https://github.com/rjsf-team/react-jsonschema-form
- ZIP: https://github.com/rjsf-team/react-jsonschema-form/archive/refs/heads/main.zip

### 21. formio.js
Cómo: form builder + renderer.
Fusión: builder = F1. Renderer = F2.
- https://github.com/formio/formio.js
- ZIP: https://github.com/formio/formio.js/archive/refs/heads/master.zip

---

## F. Sandbox local (S) — correr code en máquina, no cloud

### 22. Pyodide
Cómo: Python WASM en el navegador.
Fusión: sandbox Python local para módulos que ya tienes en bridges.
- https://github.com/pyodide/pyodide
- ZIP: https://github.com/pyodide/pyodide/archive/refs/heads/main.zip

### 23. QuickJS
Cómo: motor JS embebible, aislable.
Fusión: sandbox JS de handlers de plantilla, no `eval` en ventana.
- https://github.com/bellard/quickjs
- ZIP: https://github.com/bellard/quickjs/archive/refs/heads/master.zip

### 24. WebContainers (StackBlitz)
Cómo: Node en el browser. Local-ish, no es 100% offline puro.
Fusión: sandbox Node para prototipar. No obligatorio día 1.
- https://github.com/stackblitz/webcontainer-core
- ZIP: https://github.com/stackblitz/webcontainer-core/archive/refs/heads/main.zip

### 25. Deno
Cómo: runtime local con permisos explícitos.
Fusión: sandbox de scripts locales con allow-list.
- https://github.com/denoland/deno
- ZIP: https://github.com/denoland/deno/archive/refs/heads/main.zip

---

## G. Backend local (B) — IDENTIFICADO BACKEND

### 26. Directus
Cómo: API + admin sobre SQL local.
- https://github.com/directus/directus
- ZIP: https://github.com/directus/directus/archive/refs/heads/main.zip

### 27. NocoDB
Cómo: Airtable sobre DB local.
- https://github.com/nocodb/nocodb
- ZIP: https://github.com/nocodb/nocodb/archive/refs/heads/develop.zip

### 28. Payload CMS
Cómo: backend TS + admin.
- https://github.com/payloadcms/payload
- ZIP: https://github.com/payloadcms/payload/archive/refs/heads/main.zip

Estos tres no se pintan como ventanas FROMTED. Van a `lote-BACKEND/`.
