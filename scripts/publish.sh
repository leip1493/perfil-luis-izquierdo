#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

MESSAGE="${1:-Actualizar portfolio}"
BRANCH="main"
URL="https://leip1493.github.io/perfil-luis-izquierdo/"

echo "1/3 · Regenerando versión portable…"
python3 scripts/build_standalone.py

echo "2/3 · Preparando commit…"
git add --all

if git diff --cached --quiet; then
  echo "No hay cambios para publicar."
  echo "Sitio: $URL"
  exit 0
fi

git commit -m "$MESSAGE"

echo "3/3 · Subiendo a GitHub Pages…"
git push origin "$BRANCH"

echo
echo "Publicado: $URL"
echo "GitHub Pages puede tardar entre 30 y 90 segundos en reflejar los cambios."
