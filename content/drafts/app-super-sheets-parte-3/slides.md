---
title: "Guión de Slides — De copiar y pegar en Apps Script a un flujo de ingeniería real (Parte 3)"
series: "App del súper con Google Sheets + IA"
part: 3
status: draft
format: "linkedin-carousel"
---

# Estructura de carrusel (9 slides — mobile-first, escaneable)

> Regla de diseño (ver `AGENTS.md`): estilo **verde grafito** del portfolio (`1080×1350px`), tipografía grande pensada para lectura en teléfono (mínimo `24–28px` en cuerpo y tarjetas), 1 idea fuerte por slide y poco texto.

## Slide 1 — Portada
- **Badge:** `SERIE GOOGLE SHEETS + IA · PARTE 3`
- **Titular:** De copiar y pegar en Apps Script a una web app en regla con IA
- **Subtítulo:** Código modular, TDD, entornos `/dev` → `/exec` y flujo agéntico — sin perder el costo $0 de Google.
- **Visual:** Esquema minimalista de transformación: `2 archivos gigantes` → `Repo modular + Tests + Agente`.

## Slide 2 — El punto de quiebre
- **Titular:** Cuando copiar y pegar deja de escalar
- **Texto:** En la Parte 1 y 2 pegar `Code.gs` e `index.html` te saca una app en 5 minutos. Cuando crece, todo se frena:
  - Estilos, vistas y lógica mezclados en 2 archivos enormes.
  - Para ajustar un detalle, tocas y pegas el archivo completo.
  - Sin `git diff` claro y con miedo a romper lo que ya usas a diario.
- **Visual:** Tarjeta de contraste visual ("Prototipo día 1" vs "App usada todos los días").

## Slide 3 — El puente: `clasp` + repo modular
- **Titular:** Adiós al editor web con `clasp`
- **Texto:** Con la CLI oficial de Google llevas Apps Script a tu computadora y separas lo que se sube de lo local:
  - `src/server/` → servicios por módulo (leyendo columnas por encabezado, no por letra fija).
  - `src/client/` → vistas, lógica y estilos separados.
  - `dev/` → vista previa local y tests (no se sube a Google).
- **Visual:** Árbol de carpetas limpio y grande (`src/`, `dev/`, `AGENTS.md`).

## Slide 4 — Red de seguridad ligera (DX en regla)
- **Titular:** Ingeniería ligera, sin sobreingeniería
- **Texto:** La misma experiencia de desarrollo de cualquier web app, pero simple:
  - **Vista previa local** con simulador de Apps Script (sin tocar tu hoja real).
  - **TDD + `node:test`** en ~1 segundo, sin dependencias pesadas.
  - **Linter + Prettier + Husky + GitHub Actions** para que nada roto pase al repo.
- **Visual:** 4 bloques/tarjetas limpias con check verde.

## Slide 5 — Entornos `/dev` y `/exec`
- **Titular:** Prueba en vivo antes de tocar producción
- **Texto:** Apps Script ya trae dos entornos sobre la misma URL:
  - **`/dev`** → entorno de prueba (recibe cada `clasp push`).
  - **`/exec`** → versión productiva que usas en el teléfono.
- **Dato clave:** Con `clasp version` + `clasp update-deployment` actualizas producción **sin cambiar el enlace** que ya guardaste.
- **Visual:** Diagrama simple `Local → /dev (prueba) → main → /exec (producción)`.

## Slide 6 — El flujo agéntico real
- **Titular:** Ya no copio ni pego: trabajo con un agente con reglas
- **Texto:** Un archivo de reglas (`AGENTS.md` / `CLAUDE.md`) le indica arquitectura, convenciones y TDD:
  1. Le pido el cambio al agente.
  2. Escribe tests, edita solo el módulo necesario y sube a `/dev`.
  3. Reviso el `git diff` y valido en el enlace de prueba.
  4. Le digo *"pasemos a producción"* y actualiza `/exec`.
- **Visual:** Flujo vertical de 4 pasos numerados.

## Slide 7 — Lo que conservas + lo que ganas
- **Titular:** Todo el poder de Google, ahora con control real
- **Columna 1 — Sigues conservando:**
  - Cero servidores y costo $0.
  - Google Sheets como base de datos gestionada (y portátil si cambias el frontend).
  - Auth/autorización de Google y secretos fuera del repo (`PropertiesService`).
- **Columna 2 — Ahora sumas:**
  - Git, historial, `diff` exacto y documentación.
  - Tests automáticos y despliegues sin copiar ni pegar.
- **Visual:** Comparativa en 2 tarjetas limpias (verde grafito).

## Slide 8 — ¿No eres developer? Esto también te sirve
- **Titular:** No hace falta programar para aprovechar este flujo
- **Texto:**
  - Con un agente en tu computadora (Claude, Gemini, Codex o ChatGPT), él ejecuta los comandos, sigue las reglas y te guía paso a paso.
  - Tú te enfocas en cómo funciona tu herramienta, no en cada línea de código.
  - **El plus:** si tu prototipo crece y mañana se lo entregas a un developer, ya le das una base modular, documentada y con tests.
- **Visual:** Callout destacado orientado a PMs, negocio y creadores con IA.

## Slide 9 — Cierre + Repo plantilla (CTA)
- **Titular:** Arranca desde cero con el repositorio plantilla
- **Texto:** Te dejé un repo plantilla con la estructura modular, tests, `clasp` y las reglas para tu agente, con guía paso a paso *(enlace en el primer comentario)*.
- **Pregunta abierta (CTA):** ¿En qué punto decides pasar un prototipo hecho con IA a un flujo con Git, tests y despliegue controlado?
- **Pie:** `Luis Izquierdo · Senior Software Engineer · 09/09`
