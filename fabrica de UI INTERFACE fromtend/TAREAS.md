# Tareas vivas — fábrica UI FROMTED

Estado 2026-09-08: MODELO APROBADO.
Objetivo extra aprobado: web + Linux + Android + iOS + Windows + smartphone. Descargar y funciona en cualquier lugar. Local first.

Hecho:
- Raíz fábrica + destino ZIP
- Advertencia dos funciones
- Catálogos 1-51 + empaque 52-65
- Kernel lote-01 + tokens lote-02
- 8 simulaciones documentadas
- Aprobado multiplataforma en 01-APROBADO-MULTIPLATAFORMA.md

NO hecho:
- Core PWA (manifest + Workbox)
- Slots reales en p01-p10
- Host 1 ventana = 1 archivo
- F1 oculta en ruta distinta
- Empaque Capacitor / Tauri
- lote-BACKEND fiel
- Sandbox cableado
- Skill markdown final

Orden:
1. Director sube ZIP al destino (prioridad Puck o GrapesJS, JSONForms, Dexie, Workbox, Capacitor, Tauri)
2. Partir 1 función = 1 archivo, restyle FROMTED
3. PWA core portable (zip que abre con servidor local o Tauri)
4. Slots + wire lote-01/02
5. Capacitor APK / Tauri exe-AppImage
6. Backend + sandbox
7. Retoque visual al final
