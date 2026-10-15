# Advertencia + modelo real de la fábrica

## Las dos funciones (ley de producto)

### Función 1 — FÁBRICA INTERNA (Director)
No es un constructor público. Es una planta.
Con clave `YAIWES-CONFIG` entras a un cuarto que el usuario no conoce.
Ahí:
- creas o clonas una plantilla de interface
- añades ventana, grupo, botón, módulo
- publicas un slot en una ventana ya existente
- dibujas una conexión (botón → acción → backend o sandbox)
- aplicas tokens FROMTED (Matte / Little / Blanco)
- guardas un manifiesto, no un HTML monolítico

Cero fricción = no abrir un IDE, no reescribir p01, no pelear CSS.
Elige destino → elige pieza → Aplicar. El host pinta.

### Función 2 — RUNTIME PLANTILLA (usuario)
El usuario abre FROMTED ya armado: chat, docs, sheets, bottom-nav.
No hay botón Config. No hay canvas. No hay lista de manifiestos.
Si pulsa Descargar, corre el handler que la fábrica cableó. Punto.

Cuando la plantilla se da por cerrada:
se enchufa backend interno (bridges YAIWES, IDENTIFICADO BACKEND)
y sandboxes locales (JS aislado, Python WASM, Deno allow-list).
Nada de eso es cloud. Nada de eso se muestra como “editor”.

## Por qué Ribbon + VS Code + Adaptive Cards + Node-RED

Office no deja al lector de Word rediseñar Word. El XML lo carga IT.
VS Code no deja al usuario final editar `package.json` de las extensiones; el host lee `contributes` y pinta menús.
Adaptive Cards: JSON de tarjeta + renderer. Quien escribe el JSON no es quien ve la tarjeta.
Node-RED: el flow se edita en :1880 (taller). El dispositivo final solo recibe el evento.

Esa separación editor ≠ runtime es la fábrica.

## Ejemplo concreto (0 fricción)

Ventana p01 ya existe, archivo único, markup original.
En el header hay un hueco:

    data-slot-id="window.p01.header"

En la fábrica añades:

    id: fn.exportar-md
    kind: button
    label: Exportar
    targetSlot: window.p01.header
    action: fn.exportar-md

El host pinta el botón con tokens skill 01.
El click no vive en p01.html. Vive en action-bus → archivo de función.
Si más tarde conectas un flow Node-RED, el action id es el mismo.
El usuario de p01 solo ve “Exportar”.

## Qué no es esta fábrica

No es Appsmith/ToolJet/Retool como producto.
No es Webflow público.
No es redibujar MiniMax en index.html.
No es mezclar lime Operator en chrome FROMTED.
No es un ZIP de 28 repos metidos en el runtime.
