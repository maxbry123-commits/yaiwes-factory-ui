# Plan de construcción y cableado

## Advertencia (repetida a propósito)

Dos funciones:
1. Fábrica interna — crear interfaces (clave). Usuario no entra.
2. Runtime plantilla — el usuario solo usa lo publicado.

Cero fricción en F1: plantilla + añadir botón / módulo / ventana / conexión.
Al cerrar plantilla: backend interno + sandboxes locales. Todo local.

## Qué fusionar (no instalar 28 plataformas)

Núcleo YAIWES (ya existe):
- lote-01 kernel Ribbon (slots, action-bus, manifiesto, clave)
- lote-02 tokens FROMTED
- skills 01-04
- ventanas 1 archivo = 1 ventana

Se toma de OSS solo el *mecanismo*, no el producto entero:

| Capa | Mecanismo que copiamos | De dónde | Dónde vive |
|---|---|---|---|
| Host pinta, módulo declara | RibbonX + VS Code contributes | 7, 8, 10 | lote-01 |
| Canvas F1 | JSON de página / bloques | GrapesJS o Puck (1 o 2) | fábrica, nunca F2 |
| Form config | schema → UI | JSONForms (19) | panel clave |
| Conexiones | nodos + wires | Node-RED o Blockly (16, 18) | F1; F2 solo action id |
| Sandbox JS | motor aislado | QuickJS (23) | S |
| Sandbox Python | WASM local | Pyodide (22) | S |
| Backend | API local | lo que ya está en YAIWES-BRIDGES + Directus si hace falta | lote-BACKEND |
| Look | tokens | skill 01 / lote-02 | obligatorio |

No fusionar Appsmith/ToolJet/Budibase como runtime. Son referencia de widgets.

## Orden de construcción (0 fricción)

Fase 0 — ya hecha a medias: kernel + tokens + advertencia + destino ZIP.
Fase 1 — slots en p01-p10. Host carga 1 HTML. Clave abre F1.
Fase 2 — añadir botón a slot sin editar la ventana. Plantilla persistida.
Fase 3 — canvas F1 (Puck o GrapesJS) genera manifiesto, no HTML suelto.
Fase 4 — conexiones: action-bus → flow Node-RED local o handler archivo.
Fase 5 — sandbox JS (QuickJS o iframe sandbox) + sandbox Python (Pyodide).
Fase 6 — cablear bridges existentes. IDENTIFICADO BACKEND.
Fase 7 — skill markdown final (skill-creator), no monolito.

## Cableado skill ↔ fábrica ↔ bibliotecas

```
Función 1 FÁBRICA (clave YAIWES-CONFIG)
  fabrica de UI INTERFACE fromtend/
    componentes para fabrica de interface/   ← DESTINO ZIP
  Skills arquitectura frontend Yaiwes/
    lote-01 wire + slots + manifiestos
    lote-02 tokens
  skills 01-04 FROMTED
        ↓ publica plantilla
Función 2 RUNTIME
  windows/*.html  1 ventana = 1 archivo
  functions/*.js  1 función = 1 archivo
  usuario NO ve fábrica
        ↓ action-bus
BACKEND local
  lote-BACKEND + YAIWES-BRIDGES
        ↓
SANDBOX local
  JS aislado | Python Pyodide | Deno allow-list
```

Fail-closed: sin clave no hay F1. Sin slot no hay botón. Sin action no hay click. Sandbox sin permiso no corre.

## Licencias a vigilar

AGPL/GPL (ToolJet, Budibase, Webstudio): estudiar, no embeber a ciegas.
n8n fair-code: igual.
Preferir MIT/Apache/BSD para piezas que entren en producto: GrapesJS, Puck, JSONForms, Node-RED, Blockly, Fluent UI, Pyodide.
