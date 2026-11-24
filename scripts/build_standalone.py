#!/usr/bin/env python3
"""Genera una versión todo-en-uno del portfolio."""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "assets" / "styles.css").read_text(encoding="utf-8")
profile_js = (ROOT / "assets" / "profile-data.js").read_text(encoding="utf-8")
activity_js = (ROOT / "assets" / "activity-data.js").read_text(encoding="utf-8")
app_js = (ROOT / "assets" / "app.js").read_text(encoding="utf-8")

photo = ROOT / "assets" / "images" / "profile.jpg"
photo_data = base64.b64encode(photo.read_bytes()).decode("ascii")
html = html.replace("assets/images/profile.jpg", f"data:image/jpeg;base64,{photo_data}")

favicon = ROOT / "assets" / "images" / "favicon.png"
favicon_data = base64.b64encode(favicon.read_bytes()).decode("ascii")
html = html.replace("assets/images/favicon.png", f"data:image/png;base64,{favicon_data}")

html = html.replace(
    '  <link rel="stylesheet" href="assets/styles.css">\n',
    f'  <style>\n{css}\n  </style>\n',
)
html = html.replace(
    '  <script defer src="assets/profile-data.js"></script>\n'
    '  <script defer src="assets/activity-data.js"></script>\n'
    '  <script defer src="assets/app.js"></script>\n',
    f'  <script>\n{profile_js}\n  </script>\n'
    f'  <script>\n{activity_js}\n  </script>\n'
    f'  <script>\n{app_js}\n  </script>\n',
)

out = ROOT / "perfil-luis-izquierdo.html"
out.write_text(html, encoding="utf-8")
print(f"HTML portable: {out} ({out.stat().st_size / 1024:.0f} KB)")
