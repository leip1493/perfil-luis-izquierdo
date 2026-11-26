---
title: "Guión de Video Corto — Apps Script con flujo de ingeniería + IA en 60s (Parte 3)"
series: "App del súper con Google Sheets + IA"
part: 3
status: draft
format: "short-video-60s"
---

# Guión de video corto (50–60 segundos)

> Enfoque: grabación de pantalla ágil mostrando el flujo real sin tocar el editor web de Apps Script, con subtítulos grandes y zoom en cada paso clave (`git diff`, `npm test`, `/dev` → `/exec`).

## Escena 1 — Gancho (0:00 – 0:07)
- **Pantalla:** Muestras rápido un archivo gigante de `index.html` scrolleando y luego cambias a tu repo modular limpio en el editor (`src/server/`, `src/client/`, `dev/`).
- **Voz / Subtítulo:** *"Copiar y pegar código en Apps Script sirve para arrancar en 5 minutos. Pero cuando tu app crece, así la llevas a un flujo de ingeniería real, sin pagar un dólar."*

## Escena 2 — Estructura modular con `clasp` (0:07 – 0:16)
- **Pantalla:** Zoom al árbol de carpetas: `src/server/`, `src/client/`, `dev/` y `AGENTS.md` / `CLAUDE.md`.
- **Voz / Subtítulo:** *"Con clasp, la herramienta oficial de Google, sacas el proyecto a tu computadora: separas servidor, vistas y estilos, y dejas de tocar el editor web."*

## Escena 3 — Vista previa local + TDD en 1 segundo (0:16 – 0:26)
- **Pantalla:** Terminal corriendo `npm test` (todo en verde en ~1 segundo) + vista rápida de la app corriendo en local.
- **Voz / Subtítulo:** *"En una carpeta local que no se sube a Google tienes vista previa y tests automáticos con TDD. Si algo se rompe, te enteras en un segundo."*

## Escena 4 — El agente + `/dev` y `/exec` (0:26 – 0:42)
- **Pantalla:** Le pides un cambio corto al agente → muestra el `git diff` puntual → `clasp push` → abres la URL `/dev` y verificas el cambio → *"pasemos a producción"* → actualiza `/exec` manteniendo la misma URL.
- **Voz / Subtítulo:** *"Ya ni copio ni pego: le pido el cambio al agente con reglas claras, aplica TDD, lo sube al entorno /dev para probar y, cuando cuadra, actualiza /exec sin cambiar el enlace del teléfono."*

## Escena 5 — Conservas todo + Para no-devs + CTA (0:42 – 0:58)
- **Pantalla:** Split rápido: Google Sheet de fondo + README del repositorio plantilla.
- **Voz / Subtítulo:** *"Sigues sin servidores y con tus datos en Google Sheets. Y aunque no programes, tu agente puede guiarte paso a paso con el repositorio plantilla que te dejo en los comentarios."*
