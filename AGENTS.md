# AGENTS.md — Perfil y centro de contenido de Luis Izquierdo

Repositorio único del portfolio público (GitHub Pages en `main` / raíz) y del espacio editorial de contenido profesional (LinkedIn, artículos y slides).

## Estructura

- `index.html`, `portfolio.html`, `assets/`: sitio web estático publicado en GitHub Pages.
- `perfil-luis-izquierdo.html`: versión todo-en-uno generada por script (no editar a mano).
- `data/profile.json` y `data/activity.json`: **fuente única de verdad** de los datos del portfolio.
- `assets/profile-data.js` y `assets/activity-data.js`: generados automáticamente desde `data/*.json` al ejecutar el build (no editar a mano).
- `content/`: fábrica de contenido editorial.
  - `content/IDEAS.md`: backlog de temas y series.
  - `content/drafts/<slug>/`: borradores en progreso (`post.md`, `slides.md`, `assets/`).
  - `content/published/YYYY-MM-<slug>/`: archivo de publicaciones ya lanzadas.
- `scripts/build_standalone.py`: valida `data/*.json`, regenera `assets/*-data.js` y construye `perfil-luis-izquierdo.html`.
- `scripts/publish.sh`: ejecuta el build, hace commit y sube a `main`.

## Flujo de contenido

1. Capturar la idea en `content/IDEAS.md`.
2. Crear carpeta en `content/drafts/<slug>/` con `post.md` (y `slides.md`, `video-script.md`, `video-post.md` o `assets/` según aplique).
   - Si hay video complementario al carrusel, mantener su copy separado en `video-post.md` (texto plano corto enfocado al demo + enlaces en el primer comentario).
   - Para grabar, editar, renderizar y publicar videos técnicos con HyperFrames, seguir el runbook en `.agents/skills/linkedin-video-production/SKILL.md`.
3. Al publicar en LinkedIn:
   - Mover la carpeta a `content/published/YYYY-MM-<slug>/`.
   - Marcar `status: published` y `published_at: "YYYY-MM-DD"` en `video-script.md` y `video-post.md` (cuando aplique).
   - Agregar la publicación en `data/activity.json` con el link directo al post, `publishedAt` (`YYYY-MM-DD` para fechas relativas dinámicas), `thumbnail` (ruta relativa a imagen 16:9) y `mediaBadge` (ej. `"Video demo"`, `"Carrusel"`).
   - Ejecutar `python3 scripts/build_standalone.py` para sincronizar `assets/activity-data.js` y `perfil-luis-izquierdo.html`.

## Tono y estilo editorial

- **Idioma y variante:** español neutro latinoamericano con **tuteo** (*tú*: *pides, abres, pegas, tienes, puedes, haces*), acorde a la voz de Luis (Venezuela).
- **Evitar estrictamente:**
  - Voseo rioplatense/argentino (*vos*, *pedís, abrís, pegás, tenés, podés, hacés, querés, usás, armás, sabés, sos*) y modismos argentinos (*laburo, posta, che, etc.*).
  - Español de España (*vosotros, hacéis, ordenador, coger*). Para dispositivos, usar *teléfono* o *celular* (no *móvil* como sustantivo principal, aunque *mobile-first* como término técnico está bien).
- Estilo claro, directo, en primera persona, sin humo ni buzzwords vacíos.
- Enfoque práctico basado en experiencia real (arquitectura, TDD, backend, IA agéntica con criterio de ingeniería).
- Estructurar posts con gancho inicial concreto, puntos escaneables y cierre con aprendizaje real o pregunta abierta.
- En `post.md`, incluir el copy final listo para LinkedIn en texto plano (sin sintaxis Markdown como `**` o backticks, idealmente dentro de un bloque `text`) para preservar saltos de línea al copiar y pegar.

## Estilo de presentaciones y carruseles (LinkedIn)

- **Identidad visual consistente:** mantener el estilo **verde grafito** del portfolio (`assets/panel.css`) y tomar `content/published/2026-11-app-super-sheets-parte-2/assets/slides.html` como plantilla/referencia base.
- **Formato:** vertical 4:5 (`1080×1350px` por slide) exportable a PDF con `@page`, pie con `Luis Izquierdo · Senior Software Engineer` y numeración (`01/0N`).
- **Legibilidad en teléfono (prioritario):** diseñar pensando primero en lectura desde el celular. Usar **tipografía más grande** que en la Parte 2:
  - Evitar textos pequeños en tarjetas, notas al pie, etiquetas o callouts (apuntar a mínimo `24–28px` en cuerpo/tarjetas y `18–20px` en badges/etiquetas sobre lienzo `1080×1350px`).
  - Priorizar menos texto por slide y mayor tamaño de letra + capturas con zoom en lo importante.

## Reglas de build y repositorio

- Editar siempre `data/*.json`, nunca `assets/*-data.js` ni `perfil-luis-izquierdo.html`.
- Ejecutar `python3 scripts/build_standalone.py` tras cualquier cambio en `data/`, `portfolio.html` o `assets/`.
- Este repositorio es público: no guardar secretos, credenciales ni datos privados sensibles.
- No versionar binarios pesados de video/audio (`.mp4`, `.wav`, `recordings/`); conservar en Git solo el proyecto editable de HyperFrames, scripts reproducibles, miniaturas (`.jpg`/`.png`) y subtítulos (`.srt`).
