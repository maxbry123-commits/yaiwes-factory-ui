# Aprobado — fábrica que se descarga y corre en cualquier lugar

Estado: APROBADO por el Director 2026-09-08.

## Objetivo de entrega

Una sola fábrica + runtime FROMTED que funcione en:

- Web (navegador / PWA)
- Linux (AppImage / deb / desktop)
- Windows (exe / msi)
- Android (APK / Play o sideload)
- iOS (PWA en Safari + wrapper Capacitor cuando haya cuenta Apple)
- Smartphone en general (mismo core web, viewport 390 ya es ley FROMTED)

El usuario final descarga y usa. Sin servidor cloud obligatorio. Local first.

## Cómo se logra sin 6 codebases

Núcleo = HTML/CSS/JS + manifiestos + tokens + service worker.
Eso YA es web + PWA instalable en Android Chrome e iOS Safari.

Capas de empaque (no reescriben la UI):

1. PWA (Workbox + manifest.webmanifest) → web, Android add-to-home, iOS add-to-home, Windows Edge.
2. Capacitor → APK Android + IPA iOS usando el MISMO core.
3. Tauri 2 → Linux, Windows, macOS, y móvil Tauri 2 si se necesita binario nativo chico.
4. PWABuilder / Bubblewrap TWA → APK que envuelve la PWA si no quieres Capacitor aún.

Fábrica (F1) viaja DENTRO del mismo paquete pero oculta sin clave.
Runtime (F2) es lo que se abre al lanzar.

## Lo que NO hacemos

No Electron como default (pesa 150MB). Tauri o PWA primero.
No Flutter/MAUI (otro lenguaje, tira el HTML FROMTED).
No 6 diseños distintos. Phone 390 + desktop host. Mismos tokens.
