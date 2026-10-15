# 8 simulaciones — qué nos ahorra no programar desde 0

S1. Director en Linux añade botón Exportar a p01 con clave. Cierra. Copia la carpeta a un USB. En Windows abre el exe Tauri. El botón sigue ahí.
Ahorro: Dexie/localForage + manifiestos versionados. No inventar sync de config.

S2. Usuario Android instala PWA. Sin red. Abre chat p01, descarga un md al storage del teléfono.
Ahorro: Workbox cache + Capacitor Filesystem + Share. No escribir I/O nativo.

S3. iPhone: Safari → Añadir a inicio. Fábrica no aparece. Descargar usa share sheet.
Ahorro: Web Share API + @capacitor/share. No App Store el día 1.

S4. Fábrica genera plantilla nueva (docs + sheet). Se publica. Tres dispositivos la ven igual.
Ahorro: Puck/GrapesJS para F1 + Adaptive Cards/JSONForms para settings. No un editor WYSIWYG propio.

S5. Botón dispara un script Python local (bridge YAIWES) dentro de sandbox.
Ahorro: Pyodide en web; Deno/Tauri sidecar en desktop. No un runtime Python nuestro.

S6. Botón dispara JS de usuario. No puede tocar el DOM de p01 ni leer la clave.
Ahorro: SES/Endo o iframe sandbox + QuickJS. No un interpreter.

S7. Conexión: Cargar archivo → action-bus → backend local → card de resultado.
Ahorro: Node-RED o Windmill solo en F1; runtime solo action id. No un motor de flows en cada ventana.

S8. Paquete “FROMTED.zip”: index.html + sw + manifiestos + ventanas. Se abre con python -m http.server o se instala como PWA. Mañana se envuelve en Capacitor sin tocar ventanas.
Ahorro: PWABuilder + Capacitor + Tauri como pieles. El producto es el core web.

Fallos que las simulaciones exigen cubrir ya:
- iOS Safari no tiene File System Access API completa → fallback share/download.
- Android WebView ≠ Chrome → probar Capacitor WebView.
- Linux WebKitGTK ≠ Chromium → no usar APIs solo Chrome en el host.
- Service worker no corre en file:// → el zip portable debe documentar servidor local o Tauri.
- Clave F1 no puede ir en localStorage plano en teléfono compartido → hash + no pintar UI F1 si falla.
