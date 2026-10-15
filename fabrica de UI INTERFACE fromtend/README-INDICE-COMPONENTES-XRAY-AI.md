# README — Índice X-Ray de componentes · Fábrica UI INTERFACE FROMTED

**Snapshot auditado:** `7b302d6f1f78ba3a0e431deec483009a625a0e5a`  
**Raíz auditada:** `fabrica de UI INTERFACE fromtend/`

Este archivo es únicamente un índice de componentes y su utilidad para una IA.

**Estados**
- `SOURCE_XRAY`: árbol de código presente y verificado contra manifiesto/README y código representativo.
- `SOURCE_PARTIAL`: hay fuente física, pero el snapshot materializado no contiene el árbol principal completo esperado.
- `ZIP_STAGING`: existe ZIP/staging dentro de la raíz, pero no un árbol fuente extraído verificable como componente instalado.
- `CATALOG_ONLY`: aparece en los catálogos de la raíz, pero no hay árbol fuente físico de ese componente en este snapshot.
- `SKILL_SOURCE`: capacidad materializada como `SKILL.md`.
- `STAGING_ONLY`: ficha/evidencia de staging; todavía no es código integrado.

1. **GrapesJS** — `SOURCE_XRAY` — Framework de web builder con editor, canvas, bloques, componentes, assets, comandos y storage. **Utilidad IA:** componer visualmente una interfaz en la Fábrica F1 y serializar la estructura; no usar como runtime del usuario.

2. **Puck** — `ZIP_STAGING` — Editor visual React basado en componentes registrados y configuración declarativa. **Utilidad IA:** convertir componentes React propios en bloques editables y producir una composición declarativa.

3. **Craft.js** — `SOURCE_XRAY` — Toolkit React para construir un editor visual propio; el código expone contexto de `Editor`, nodos, eventos y estado. **Utilidad IA:** construir el canvas F1 conservando el chrome visual propio de YAIWES.

4. **Plasmic** — `ZIP_STAGING` — Plataforma/editor visual para componentes React. **Utilidad IA:** referencia para registrar componentes reales del producto dentro de un editor visual.

5. **Onlook** — `ZIP_STAGING` — Editor visual orientado a código React/Next. **Utilidad IA:** referencia para traducir cambios visuales a cambios sobre código fuente existente.

6. **Webstudio** — `ZIP_STAGING` — Builder visual CSS-first. **Utilidad IA:** donor de mecanismos de layout, estilos y edición visual; no asumirlo como host YAIWES.

7. **Office-Ribbon-2010** — `SOURCE_XRAY` — Implementación HTML/CSS/JS de Ribbon con tabs, backstage y botones; `ribbon.js` gestiona tabs y estados. **Utilidad IA:** donor del patrón visual Ribbon para organizar acciones del host.

8. **Fluent.Ribbon** — `SOURCE_XRAY` — Biblioteca WPF de Ribbon; el código contiene `Ribbon`, tabs, grupos, backstage, QAT, galerías y automation peers. **Utilidad IA:** donor del contrato de controles Ribbon, no código para portar directamente al runtime web.

9. **Fluent UI** — `SOURCE_XRAY` — Monorepo de componentes React; el código expone Button, CompoundButton, MenuButton, SplitButton, ToggleButton y otros controles. **Utilidad IA:** reutilizar patrones accesibles de componentes e iconografía manteniendo los tokens FROMTED.

10. **VS Code Contribution Points Docs** — `SOURCE_XRAY` — Documentación de extensibilidad y una extensión real incluida en el repo que registra tools y soporte Markdown mediante la API de VS Code. **Utilidad IA:** modelo para que un módulo declare comandos/views/tools y el host los materialice.

11. **Appsmith** — `SOURCE_XRAY` — Plataforma low-code para herramientas internas; el árbol contiene cliente, AST y lógica de evaluación JS. **Utilidad IA:** donor de widgets, bindings, datasources y patrones de aplicaciones internas; no sustituir F2.

12. **ToolJet** — `SOURCE_XRAY` — Plataforma de herramientas internas con builder, integraciones y plugins; su CLI crea plugins de database/API/cloud-storage. **Utilidad IA:** donor de catálogo de componentes, queries, conectores y sistema de plugins.

13. **Budibase** — `SOURCE_PARTIAL` — Plataforma de operaciones/apps/automations; el snapshot contiene README, charts/deployment y ejemplo microfrontend, pero no el árbol principal completo de aplicación. **Utilidad IA:** referencia de apps, automatizaciones y embedding; no asumir integración completa desde este snapshot.

14. **Lowcoder** — `SOURCE_XRAY` — Plataforma low-code con componentes extensibles; el código de plantilla usa `lowcoder-sdk`, controles, eventos y estilos. **Utilidad IA:** donor de módulos/componentes configurables y patrón “componente como capacidad”.

15. **NocoBase** — `CATALOG_ONLY` — Plataforma basada en plugins, datos y páginas. **Utilidad IA:** referencia para representar una capacidad como plugin/manifiesto.

16. **Node-RED** — `CATALOG_ONLY` — Editor de flujos basado en nodos y conexiones. **Utilidad IA:** donor para construir conexiones F1 `acción → nodo → wire → handler`.

17. **n8n** — `CATALOG_ONLY` — Motor/editor de workflows y conectores. **Utilidad IA:** referencia de orquestación visual de acciones; revisar licencia antes de incrustar.

18. **Blockly** — `CATALOG_ONLY` — Editor visual de lógica basado en bloques. **Utilidad IA:** permitir que F1 genere handlers/lógica sin escribir código manualmente.

19. **JSONForms** — `CATALOG_ONLY` — Renderer de formularios desde JSON Schema + UI Schema. **Utilidad IA:** generar paneles de configuración declarativos.

20. **React JSON Schema Form (RJSF)** — `CATALOG_ONLY` — Generador React de formularios desde JSON Schema. **Utilidad IA:** alternativa React para settings declarativos.

21. **Form.io / formio.js** — `CATALOG_ONLY` — Builder + renderer de formularios. **Utilidad IA:** separar edición F1 de render F2 usando un schema común.

22. **Pyodide** — `CATALOG_ONLY` — Python compilado a WebAssembly para navegador. **Utilidad IA:** ejecutar funciones Python locales dentro de un sandbox web.

23. **QuickJS** — `CATALOG_ONLY` — Motor JavaScript embebible. **Utilidad IA:** ejecutar handlers JS aislados sin usar `eval` dentro de una ventana.

24. **WebContainers** — `CATALOG_ONLY` — Runtime Node dentro del navegador. **Utilidad IA:** prototipar/ejecutar proyectos web en sandbox browser cuando se necesite Node.

25. **Deno** — `CATALOG_ONLY` — Runtime JS/TS con modelo explícito de permisos. **Utilidad IA:** ejecutar scripts locales bajo allow-list de filesystem/red.

26. **Directus** — `CATALOG_ONLY` — API/admin sobre bases SQL. **Utilidad IA:** donor de backend local de datos; nunca pintarlo como ventana FROMTED.

27. **NocoDB** — `CATALOG_ONLY` — Capa tipo spreadsheet/Airtable sobre bases de datos. **Utilidad IA:** exponer datos locales mediante API/tablas sin convertirlo en UI principal.

28. **Payload CMS** — `CATALOG_ONLY` — Backend TypeScript con API y administración. **Utilidad IA:** donor de backend/schema para datos y contenido.

29. **Penpot** — `CATALOG_ONLY` — Herramienta OSS de diseño, SVG y tokens. **Utilidad IA:** referencia de diseño/tokens y activos vectoriales.

30. **Silex** — `CATALOG_ONLY` — Builder web basado en GrapesJS con enfoque de edición visual. **Utilidad IA:** donor de integración entre canvas, proyecto y empaquetado.

31. **OpenUI** — `CATALOG_ONLY` — Builder/generador de UI local-first. **Utilidad IA:** referencia para convertir especificaciones en componentes y previews.

32. **Open Builder** — `CATALOG_ONLY` — Builder con preview de código. **Utilidad IA:** referencia para ciclo `código → preview → corrección`.

33. **Adaptive Cards** — `CATALOG_ONLY` — Modelo declarativo `JSON → renderer → tarjeta`. **Utilidad IA:** patrón para que la IA genere manifests UI sin escribir la vista final directamente.

34. **Lowdefy** — `CATALOG_ONLY` — Framework declarativo de aplicaciones basado en YAML. **Utilidad IA:** referencia para convertir una definición estructurada en interfaz ejecutable.

35. **Refine.dev** — `CATALOG_ONLY` — Framework headless para apps de datos/admin. **Utilidad IA:** donor de recursos, providers y separación lógica/UI.

36. **Saltcorn** — `CATALOG_ONLY` — Plataforma que combina datos, builder y lógica visual. **Utilidad IA:** estudiar cómo separar y unir canvas, bloques y modelo de datos.

37. **ILLA Builder** — `CATALOG_ONLY` — Builder de herramientas internas. **Utilidad IA:** donor de widgets, datasources y acciones.

38. **Windmill** — `CATALOG_ONLY` — Plataforma de scripts, flows y UIs generadas. **Utilidad IA:** referencia para transformar scripts en acciones/workflows con interfaz.

39. **Corteza** — `CATALOG_ONLY` — Plataforma low-code/BPM. **Utilidad IA:** donor de módulos, procesos y automatización empresarial.

40. **Joget** — `CATALOG_ONLY` — Plataforma de formularios, procesos y aplicaciones. **Utilidad IA:** referencia para componer `form → workflow → app`.

41. **Baserow** — `CATALOG_ONLY` — Base de datos visual/autohospedada. **Utilidad IA:** donor de tabla/API para datos locales.

42. **Teable** — `CATALOG_ONLY` — Capa app/spreadsheet sobre Postgres. **Utilidad IA:** referencia para vistas de datos conectadas a almacenamiento estructurado.

43. **Grist** — `CATALOG_ONLY` — Spreadsheet programable con modelo de datos. **Utilidad IA:** donor para tablas, fórmulas y vistas calculadas.

44. **Sandpack** — `CATALOG_ONLY` — Bundler y preview de código dentro del navegador. **Utilidad IA:** ejecutar/previsualizar componentes web en un iframe aislado.

45. **Extism** — `CATALOG_ONLY` — Runtime de plugins WebAssembly multilenguaje. **Utilidad IA:** convertir capacidades externas en plugins WASM con frontera estable.

46. **SES / Endo Lockdown** — `CATALOG_ONLY` — Aislamiento JavaScript por compartments/endowments. **Utilidad IA:** ejecutar JS con capacidades explícitamente concedidas.

47. **Monaco Editor** — `CATALOG_ONLY` — Editor de código web. **Utilidad IA:** editor de código dentro de F1; no necesario en el runtime del usuario.

48. **Eclipse Theia** — `CATALOG_ONLY` — Plataforma/IDE modular basada en contribuciones. **Utilidad IA:** donor de arquitectura host-extensión.

49. **Home Assistant Frontend** — `CATALOG_ONLY` — Dashboard basado en tarjetas/configuración. **Utilidad IA:** referencia de `config → card registry → dashboard`.

50. **Grafana Plugin System** — `CATALOG_ONLY` — Arquitectura de plugins/paneles declarados por manifiesto. **Utilidad IA:** donor de `plugin manifest → registry → panel`.

51. **Office.js Samples** — `CATALOG_ONLY` — Ejemplos de add-ins para extender Office. **Utilidad IA:** referencia para añadir capacidades a un host sin reemplazarlo.

52. **Tauri 2** — `SOURCE_XRAY` — Framework Rust para aplicaciones con webview, IPC, plugins, recursos y bundling; el código contiene runtime, app manager e invoke handlers. **Utilidad IA:** empaquetar el mismo core web de YAIWES como aplicación desktop/móvil sin rehacer la UI.

53. **Capacitor** — `SOURCE_XRAY` — Runtime/CLI para llevar una aplicación web a plataformas nativas; el código Android ejecuta Gradle y produce AAB/APK. **Utilidad IA:** empaquetar el core web en Android/iOS y acceder a plugins nativos.

54. **PWABuilder** — `SOURCE_XRAY` — Herramientas y CLI para construir/procesar PWAs; el código incluye comandos `build/create/start`. **Utilidad IA:** convertir el core web en una PWA distribuible y preparar paquetes derivados.

55. **Workbox** — `SOURCE_XRAY` — Conjunto de módulos de service worker; el código de routing procesa `FetchEvent` y selecciona handlers/rutas. **Utilidad IA:** precache, routing y funcionamiento offline de la PWA.

56. **Neutralino** — `SOURCE_XRAY` — Runtime desktop ligero en C++ con APIs nativas como filesystem/events/extensions. **Utilidad IA:** alternativa ligera para empaquetar HTML/CSS/JS como desktop.

57. **Wails** — `SOURCE_XRAY + MANIFEST_GAP` — Framework que une Go con frontend web; hay código físico v2/v3, pero el manifiesto de empaque registra `SOURCE_REF_GAP ... ref=v3-alpha`. **Utilidad IA:** alternativa a Tauri para shell nativo con backend Go, sin declararlo cerrado mientras exista ese gap.

58. **Bubblewrap TWA** — `SOURCE_XRAY` — CLI/core para generar Trusted Web Activity desde un Web Manifest; el código construye y firma APK/AAB con herramientas Android. **Utilidad IA:** envolver una PWA como aplicación Android TWA.

59. **Dexie** — `SOURCE_XRAY` — Wrapper de IndexedDB con tablas, colecciones, transacciones y versionado. **Utilidad IA:** persistir manifests, estado y configuración local estructurada.

60. **localForage** — `SOURCE_XRAY` — Abstracción de almacenamiento offline con drivers IndexedDB/WebSQL/localStorage. **Utilidad IA:** persistencia local simple con fallback automático.

61. **PouchDB** — `SOURCE_XRAY` — Base local con adapters y replicación; el código incluye adapter IndexedDB, revisiones y cambios. **Utilidad IA:** almacenamiento local con sincronización/replicación opcional.

62. **browser-fs-access** — `SOURCE_XRAY` — API unificada para abrir directorios/archivos y guardar, con implementación moderna y fallback legacy. **Utilidad IA:** implementar Cargar/Guardar desde navegador sin acoplarse a una sola API.

63. **Capacitor Filesystem** — `SOURCE_XRAY` — Plugin Capacitor que registra una API de filesystem nativa/web. **Utilidad IA:** leer/escribir archivos del dispositivo desde el mismo frontend.

64. **Capacitor Plugins / Share** — `SOURCE_XRAY` — Monorepo de plugins nativos; el módulo Share registra una capacidad común con fallback web. **Utilidad IA:** exponer acciones nativas del dispositivo mediante una interfaz uniforme.

65. **Capacitor File Sharer** — `SOURCE_XRAY` — Plugin dedicado a compartir/guardar archivos en Android, iOS y Web. **Utilidad IA:** entregar artefactos del runtime al share sheet o almacenamiento del dispositivo.

66. **Meta Model API Cookbook** — `SOURCE_XRAY` — Recetas y código para API fundamentals, tool calling, structured output, agentes, Muse Code y casos end-to-end. **Utilidad IA:** biblioteca de patrones de agentes/código que la Fábrica puede reutilizar y validar.

67. **Meta OSS Cookbook / Muse Glimmer** — `SOURCE_XRAY` — Cookbook local-first; `agent_loop.py` implementa registro de tools, llamada, resultado y autocorrección alrededor de Muse Glimmer. **Utilidad IA:** patrón ejecutable de agente local `plan → tool → result → self-correct`.

68. **Muse Code SDK** — `SOURCE_XRAY` — SDK TypeScript para sesiones Muse Code sobre Muse Session Protocol; el código expone cliente, sesiones, turns, handshake y tipos MSP. **Utilidad IA:** controlar sesiones de un agente de código desde un cliente/host tipado.

69. **frontend-design** — `SKILL_SOURCE` — Skill de dirección visual con reglas sobre identidad, tipografía, layout y decisiones estéticas. **Utilidad IA:** guiar creación/rediseño de interfaces con una intención visual específica.

70. **Impeccable** — `SKILL_SOURCE` — Skill de frontend para shape, audit, critique, polish, responsive, accesibilidad, performance, motion, i18n y design systems. **Utilidad IA:** checklist/proceso especializado para diseñar y verificar calidad de UI.

71. **skill-creator** — `SKILL_SOURCE` — Skill para crear, probar, evaluar y mejorar otros skills. **Utilidad IA:** convertir un procedimiento repetible de la Fábrica en un `SKILL.md` evaluable y reutilizable.

72. **Caret** — `STAGING_ONLY` — Ficha de staging para `precious112/caret-desktop`; declara rol de canvas/editor F1 y evidencia local verificada, pero el propio archivo indica `LOCAL_VERIFIED_PENDING_BLOB_PUBLISH`. **Utilidad IA:** candidato de editor visual; no tratarlo todavía como componente fuente integrado.
