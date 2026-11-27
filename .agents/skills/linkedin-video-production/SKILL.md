---
name: linkedin-video-production
description: >-
  Use this skill when producing, editing, voicing, rendering, or publishing a
  technical demo video for Luis Izquierdo's LinkedIn series using HyperFrames,
  including screen recording setup, audio normalization, thumbnail extraction,
  SRT captions, and portfolio Activity sync.
---

# Producción y publicación de videos técnicos (HyperFrames + LinkedIn)

Runbook reutilizable y agnóstico al agente para producir videos técnicos de la serie.
Usa como plantilla y referencia base el proyecto ya validado en:
`content/published/2026-11-app-super-sheets-parte-2/assets/video-proyecto/`

## 1. Grabación y proporción de lienzo
- Graba una pestaña limpia del navegador sin barras innecesarias y guarda las tomas brutas en `assets/recordings/` (ignorado por Git).
- Define el lienzo de HyperFrames con la **misma relación de aspecto exacta** que la grabación (formato *full-bleed*, sin marcos ni padding artificial) para maximizar la legibilidad en teléfono.
- Si el video principal es didáctico, conserva también un corte rápido opcional (45–60 s) para Reels/Shorts desde la misma grabación.

## 2. Ritmo, foco visual y scripts reproducibles
- Prioriza ritmo pausado y didáctico con **lupas (`lupa-*.png`)** en los puntos clave y badges oscuros semitransparentes (*dark-glass*), manteniendo la paleta **verde grafito** del portfolio (`#0f1211`, `#214a36`, `#6d987b`, `#8db89a`, `#d8b374`).
- Codifica siempre `assets/base.mp4` con keyframes cada 1 segundo (`-g 30` a `30 fps`) para scrubbing y renders limpios.
- Mantén el ensamblado en scripts reproducibles (`scripts/build-base.py`, `scripts/build-voiceover.py`, `scripts/build-intro-outro.py`) para poder regenerar el video si cambia un texto o una toma.

## 3. Voz y mezcla de audio
- Divide el voiceover en clips por bloque y normalízalos con `ffmpeg` a `-16 LUFS` aplicando filtro pasa-altos a `70 Hz` (`highpass=f=70`).
- Todo elemento `<audio>` en HyperFrames debe tener atributo `id` y **nunca** `crossorigin`.

## 4. Guardrails técnicos de HyperFrames
- **Nunca uses CSS `filter` sobre `<video>`:** si necesitas un fondo difuminado para intro/outro, genera un PNG estático pre-difuminado con `ffmpeg`.
- Mantén **≤ 3 elementos con tiempo por sub-composición** para evitar la advertencia `timeline_track_too_dense`.
- Levanta la vista previa siempre en primer plano en una terminal o panel visible (`npx hyperframes preview <dir> --port=<puerto> --foreground`), nunca como proceso oculto en segundo plano.
- Antes de renderizar, valida siempre con:
  ```bash
  npx hyperframes check . --json
  ```
  El resultado debe ser `ok: true` con `0` errores y `0` advertencias.

## 5. Entregables para LinkedIn
1. Render final (`assets/video-<slug>.mp4`, ignorado en Git).
2. **Thumbnail limpio** (`assets/video-<slug>-thumbnail.jpg`, versionado en Git): extrae un frame donde la tarjeta principal ya sea visible y **entre cues de subtítulos** (sin barra de subtítulos encima).
3. **Subtítulos sincronizados** (`assets/video-<slug>.srt`, versionado en Git).
4. **Copy dedicado** (`video-post.md`): texto plano corto enfocado al demo (sin sintaxis Markdown dentro del bloque copiable), hashtags y enlaces del primer comentario (carrusel, demo en vivo, entregas previas).

## 6. Cierre editorial y sincronización del portfolio
1. Marca `status: published` y `published_at: "YYYY-MM-DD"` en `video-script.md` y `video-post.md`.
2. Agrega la entrada en `data/activity.json` con `url`, `publishedAt` (`YYYY-MM-DD`), `thumbnail` (ruta relativa al JPG) y `mediaBadge` (ej. `"Video demo"`).
3. Ejecuta la validación y el build del portfolio:
   ```bash
   node --check assets/panel.js && node --check assets/app.js && python3 scripts/build_standalone.py
   ```
4. Verifica visualmente el portfolio en un servidor local en primer plano antes de pedir confirmación para commit y push.
