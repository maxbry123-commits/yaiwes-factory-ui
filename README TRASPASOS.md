# README TRASPASOS — Tarea 2 (frontend → yaiwes-factory-ui)

- **Qué:** copia (no movimiento) de 2 raíces. Origen intacto, nada borrado.
- **Origen:** `maxbry123-commits/frontend` @ `eff1bfe0ab5b47ed1f70506b2c49cca6fd6f0ecb`
- **Destino:** `maxbry123-commits/yaiwes-factory-ui` / `main` (mismas rutas). Contenido previo (80 archivos) sin tocar.
- **Motor:** solo `motor_3_copy_batches.py` (blob `3689924361ce4a1a9fde4ae2b6f6009c37a6042d`), una corrida por carpeta, rutas absolutas, `COLLISION_POLICY=fail`, `BATCH_SIZE=100`, STATE_FILE fuera de origen/destino. Sin HF, sin LFS, sin GitHub Actions, sin force push.

| Raíz | Archivos | Lotes motor | Veredicto motor | sha256 JSON salida motor |
|---|---|---|---|---|
| `fabrica de UI INTERFACE fromtend` | 72168 | 722 | VERIFIED_CLOSED (failed 0, pending 0) | `e0be5ac4f6d1292203400c4adeb88f7a1018782a08554672ae6b408a18088e54` |
| `T-3000 MOTOR AUTOEVOLUTION 👾/00-ENTRADA` | 1 | 1 | VERIFIED_CLOSED (failed 0, pending 0) | `a0ddb129cadeb8cd3b9067e99f3e62b5dd5b6172341ce49ec9bb7a6267e63ec5` |

## Commits en main (push por lotes < 1,5 GB)
1. `0043b38772` · 2. `b4ebd47cd3` · 3. `0c5c268cb5` · 4. `45733428ef` · 5. `03e229eb36` (29 archivos con CRLF original: git los normalizaba; reescritos con bytes exactos del origen) · 6. este README.

## Verificación read-back (main remoto vs frontend@eff1bfe, blob por blob)
- `00-ENTRADA`: tree SHA idéntico `58aed8feeef149258acc41d13c551fc505beb735`.
- `fabrica…`: 72168 = 72168 rutas; 72144 blobs idénticos. 24 diferencias = symlinks del origen que motor 3 copia como archivo real (sigue el enlace; contenido = destino del enlace). Sin `.partial`.
- Fuera de las 2 rutas: 0 archivos cambiados.

## Estado: 100% PASS ✅ (con nota de 24 symlinks materializados por el motor)
