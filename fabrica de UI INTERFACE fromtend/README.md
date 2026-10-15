# Fábrica de UI INTERFACE FROMTED

**DESTINO DE COMPONENTES:** esta carpeta y `componentes para fabrica de interface/`.

Enlace de esta raíz:

https://github.com/maxbry123-commits/frontend/tree/main/fabrica%20de%20UI%20INTERFACE%20fromtend

Enlace destino de componentes (sube aquí los ZIP):

https://github.com/maxbry123-commits/frontend/tree/main/fabrica%20de%20UI%20INTERFACE%20fromtend/componentes%20para%20fabrica%20de%20interface

Bitácora arquitectura:

https://github.com/maxbry123-commits/frontend/blob/main/Skills%20arquitectura%20frontend%20Yaiwes/Readme%20arquitectura%20frontend%20yaiwes.md

Biblioteca kernel + tokens:

https://github.com/maxbry123-commits/frontend/tree/main/Skills%20arquitectura%20frontend%20Yaiwes/biblioteca%20code%20frontend%20Maxbry%20Yaiwes

---

## ADVERTENCIA — DOS FUNCIONES, NO UNA SOLA APP

Esta interfaz no es un constructor público tipo Webflow para el usuario final.

### Función 1 — Fábrica (solo Director / interno)

Puedes crear tus propias interfaces: ventanas, botones, módulos, plantillas y conexiones.
Se abre con clave (`YAIWES-CONFIG`). Cero fricción: arrastrar / declarar / aplicar plantilla.
El usuario final **no entra aquí**.

### Función 2 — Runtime plantilla (lo que ve el usuario)

El usuario solo usa la plantilla ya publicada: chat, docs, sheets, botones.
No ve Configuración, no ve el canvas, no añade módulos.

Cuando la plantilla esté cerrada: se cablea backend interno + sandboxes locales para correr code. Todo local.

Si un componente OSS asume que el editor es público, se usa **solo en Función 1** y se apaga en runtime.
