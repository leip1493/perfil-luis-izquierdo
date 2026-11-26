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
2. Crear carpeta en `content/drafts/<slug>/` con `post.md` (y `slides.md` / `assets/` si aplica).
3. Al publicar en LinkedIn:
   - Mover la carpeta a `content/published/YYYY-MM-<slug>/`.
   - Agregar la publicación en `data/activity.json` (preferiblemente con el link directo al post).
   - Ejecutar `python3 scripts/build_standalone.py` para sincronizar `assets/activity-data.js` y `perfil-luis-izquierdo.html`.

## Tono y estilo editorial

- Español claro, directo, en primera persona, sin humo ni buzzwords vacíos.
- Enfoque práctico basado en experiencia real (arquitectura, TDD, backend, IA agéntica con criterio de ingeniería).
- Estructurar posts con gancho inicial concreto, puntos escaneables y cierre con aprendizaje real o pregunta abierta.

## Reglas de build y repositorio

- Editar siempre `data/*.json`, nunca `assets/*-data.js` ni `perfil-luis-izquierdo.html`.
- Ejecutar `python3 scripts/build_standalone.py` tras cualquier cambio en `data/`, `portfolio.html` o `assets/`.
- Este repositorio es público: no guardar secretos, credenciales ni datos privados sensibles.
