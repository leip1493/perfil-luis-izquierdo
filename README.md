# Perfil · Luis Izquierdo

Portfolio profesional interactivo de **Luis Enrique Izquierdo Peña**, publicado con GitHub Pages.

- **Sitio:** https://leip1493.github.io/perfil-luis-izquierdo/
- **Repositorio:** https://github.com/leip1493/perfil-luis-izquierdo

Este repositorio es la fuente única del proyecto. No hay carpetas de publicación duplicadas.

## Abrir en local

- Panel principal: abre `index.html` con doble clic.
- Portfolio largo: abre `portfolio.html`.
- Versión de un solo archivo: abre `perfil-luis-izquierdo.html`.
- No requiere servidor, instalación ni dependencias externas.

## Contenido

- Panel principal (`index.html`): resumen ejecutivo, métricas, lo esencial, caso BOMA, experiencia reciente y pestañas de detalle para móvil y escritorio.
- Portfolio completo (`portfolio.html`): hero animado, foto de perfil y visualización orbital.
- Métricas de impacto con contexto de BOMA, Nucleus, multi-tenant, squad y BFF.
- Perfil, principios de ingeniería y filosofía de trabajo.
- 6 experiencias con detalle expandible.
- 49 tecnologías filtrables y buscables.
- Diagrama de arquitectura hexagonal con recorrido guiado de 6 pasos.
- 6 proyectos con ficha ampliada.
- Educación, certificaciones e idiomas.
- 8 publicaciones propias de LinkedIn con búsqueda y texto completo.
- Navegación por secciones con barra lateral.
- Flechas ↑/↓: avanzan pantalla por pantalla para no omitir contenido interno.
- Enlaces del menú y puntos laterales: saltan a la sección elegida.
- Diseño responsive, accesibilidad y opción para pausar animaciones.

## Estructura

```text
perfil-luis-izquierdo/
├── index.html                    # Panel principal
├── portfolio.html                # Portfolio completo
├── perfil-luis-izquierdo.html    # Página todo-en-uno del portfolio
├── README.md
├── robots.txt
├── .nojekyll                     # Evita el procesado de Jekyll en GitHub Pages
├── .gitignore
├── assets/
│   ├── styles.css
│   ├── app.js
│   ├── panel.css                 # Estilos del panel
│   ├── panel.js                  # Pestañas y renderizado del panel
│   ├── profile-data.js
│   ├── activity-data.js
│   └── images/
│       ├── profile.jpg
│       └── favicon.png
├── data/
│   ├── profile.json              # Perfil público curado (fuente de verdad)
│   └── activity.json             # Publicaciones propias (fuente de verdad)
├── content/
│   ├── IDEAS.md                  # Backlog de ideas y series
│   ├── drafts/                   # Borradores de posts, slides y assets
│   └── published/                # Archivo de contenido ya publicado
├── AGENTS.md                     # Convenciones del repo y flujo editorial
└── scripts/
    ├── build_standalone.py       # Sincroniza data/*.json -> assets/*-data.js y regenera la versión todo-en-uno
    └── publish.sh                # Genera, hace commit y sube a GitHub Pages
```

## Publicar un cambio

Edita siempre los archivos fuente de la raíz del proyecto. Después ejecuta:

```bash
cd /Users/leip1493/repositorios/perfil-luis-izquierdo
bash scripts/publish.sh "Descripción breve del cambio"
```

Ejemplo:

```bash
bash scripts/publish.sh "Ajustar navegación por pantallas"
```

El script:

1. Regenera `perfil-luis-izquierdo.html`.
2. Hace commit de los cambios.
3. Sube a `main` en GitHub.
4. GitHub Pages publica automáticamente en 30–90 segundos.

### Publicación manual

```bash
cd /Users/leip1493/repositorios/perfil-luis-izquierdo
python3 scripts/build_standalone.py
git status
git add .
git commit -m "Descripción breve del cambio"
git push origin main
```

## GitHub Pages

El repositorio ya está configurado con:

- Rama: `main`
- Directorio: `/ (root)`
- HTTPS: activado

Si alguna vez hay que reconfigurarlo:

1. Abre **Settings → Pages**.
2. Selecciona **Deploy from a branch**.
3. Elige `main` y `/ (root)`.
4. Guarda los cambios.

## Datos y privacidad

- Fuente original: perfil de LinkedIn de Luis Izquierdo.
- Foto: retrato recortado para uso público.
- La web publica solo contenido profesional y el correo que aparece en el perfil.
- No se publican cumpleaños, dirección exacta ni métricas privadas.
- Los JSON raw de LinkedIn no forman parte de este repositorio.
- `.gitignore` bloquea futuros archivos raw y capturas internas si se vuelven a generar.
