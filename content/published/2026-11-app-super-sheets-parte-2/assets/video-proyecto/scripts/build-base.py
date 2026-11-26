#!/usr/bin/env python3
"""Reconstruye assets/base.mp4 desde recordings/toma-final.mp4.

Corte con más respiro (~72 s) que el anterior (48,9 s):
pausas largas en cada paso clave, cámara lenta en los tramos donde
hay que leer un menú (Extensiones, Implementar) y saltos sobre las
esperas de carga.

Uso:
    python3 scripts/build-base.py

No toca toma-final.mp4 ni toma-compacta-60s.mp4.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PROJECT = HERE.parent
SRC = PROJECT.parent / "recordings" / "toma-final.mp4"
OUT = PROJECT / "assets" / "base.mp4"

FPS = 30

# (in, out, speed, nota)
SEGMENTS = [
    # 1. Gancho: dashboard con 57,15 y cambios de filtro
    (0.0, 1.8, 1.0, "hook · dashboard 57,15"),
    (17.0, 19.0, 1.0, "hook · filtro 16,65"),
    (20.3, 22.3, 1.0, "hook · filtro 8,35"),
    (24.6, 26.6, 1.0, "hook · vuelve 57,15"),
    # 2. Hoja de cálculo lista
    (33.0, 36.2, 1.0, "hoja · datos + guardado en Drive"),
    (39.5, 42.0, 1.0, "hoja · tabla de compras"),
    # 3. Extensiones -> Apps Script (cámara lenta para leer el menú)
    (46.9, 49.3, 0.7, "extensiones · menú abierto"),
    (49.3, 49.8, 0.7, "extensiones · clic Apps Script"),
    (78.6, 81.0, 1.5, "apps script · carga del editor"),
    # 4. Código pegado
    (84.0, 86.5, 1.5, "editor vacío"),
    (96.0, 106.0, 2.5, "Code.gs · pegado"),
    (116.0, 126.0, 2.5, "index.html · pegado y guardado"),
    (142.6, 144.4, 1.0, "editor · guardado en Drive"),
    # 5. Implementar
    (144.9, 146.4, 0.5, "implementar · menú abierto"),
    (147.7, 148.5, 0.5, "implementar · clic Nueva implementación"),
    (155.0, 160.0, 2.5, "implementar · cargando modal"),
    (160.0, 166.6, 2.2, "implementar · tipo Aplicación web"),
    (166.6, 173.4, 2.2, "implementar · acceso Cualquier persona"),
    (175.4, 179.4, 2.0, "implementar · clic y en curso"),
    (179.6, 183.6, 1.0, "permisos · autorizar acceso"),
    (226.4, 231.2, 2.0, "permisos · autorizando"),
    (231.4, 236.0, 1.0, "implementar · URL generada"),
    # 6. En vivo: edición y total nuevo
    (256.6, 259.6, 1.0, "app publicada · 57,15"),
    (281.0, 285.4, 1.0, "hoja · edición E2 = 24,5"),
    (293.0, 296.6, 1.0, "dashboard · 79,80"),
    (300.9, 305.3, 1.0, "dashboard · filtro Alimentos"),
]


def main() -> int:
    if not SRC.exists():
        print(f"Falta el material original: {SRC}", file=sys.stderr)
        return 1

    filters: list[str] = []
    labels: list[str] = []
    total = 0

    for i, (t_in, t_out, speed, note) in enumerate(SEGMENTS):
        frames = round((t_out - t_in) / speed * FPS)
        filters.append(
            f"[{i}:v]setpts=(PTS-STARTPTS)/{speed},"
            f"fps={FPS},scale=1504:716,setsar=1,"
            f"trim=end_frame={frames},setpts=PTS-STARTPTS[v{i}]"
        )
        labels.append(f"[v{i}]")
        total += frames
        print(f"{i:02d}  {t_in:7.2f} -> {t_out:7.2f}  x{speed:<4} {frames:4d}f  {note}")

    duration = total / FPS
    print(f"\nTotal: {total} frames = {duration:.3f} s")

    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "warning", "-y"]
    for t_in, t_out, _speed, _note in SEGMENTS:
        cmd += ["-ss", f"{t_in}", "-t", f"{t_out - t_in}", "-i", str(SRC)]
    cmd += [
        "-filter_complex",
        ";".join(filters) + ";" + "".join(labels) + f"concat=n={len(SEGMENTS)}:v=1:a=0[out]",
        "-map", "[out]",
        "-an",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-profile:v", "high",
        "-g", "30",
        "-keyint_min", "30",
        "-sc_threshold", "0",
        "-r", str(FPS),
        "-movflags", "+faststart",
        str(OUT),
    ]
    subprocess.run(cmd, check=True)

    probe = subprocess.run(
        [
            "ffprobe", "-v", "error", "-select_streams", "v:0",
            "-show_entries", "stream=width,height,nb_frames,r_frame_rate",
            "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1",
            str(OUT),
        ],
        check=True, capture_output=True, text=True,
    )
    print(probe.stdout.strip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
