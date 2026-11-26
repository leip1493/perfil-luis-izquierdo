#!/usr/bin/env python3
"""Prepara la intro y el cierre: voz normalizada + fondos fijos.

Uso:  python3 scripts/build-intro-outro.py

1. Recorta el silencio muerto de los bordes de assets/vo-intro.wav y
   assets/vo-outro.wav y los normaliza con la misma cadena que el cuerpo
   (highpass 70 Hz + loudnorm a -16 LUFS / -1.5 dBTP + limitador) para que
   suenen al mismo nivel que vo-01..vo-15 (-16,6 LUFS aprox.).
   Los originales quedan intactos.
2. Extrae dos fondos fijos de assets/base.mp4 (sin usar filtros CSS sobre
   video): el primer frame para la intro y el último frame con el total
   79,80 para el cierre. Ambos van desenfocados y oscurecidos con gblur/eq.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

# (origen, destino, fin del recorte, ganancia de ajuste al nivel del cuerpo)
VOICE = [
    ("vo-intro.wav", "vo-intro-norm.wav", 13.63, "0.4dB"),
    ("vo-outro.wav", "vo-outro-norm.wav", 9.96, "1.3dB"),
]

# (tiempo en base.mp4, destino) — el último frame con el total 79,80
FRAMES = [
    ("0", "bg-intro.png"),
    ("68.0", "bg-outro.png"),
]

BG_FILTER = "gblur=sigma=22,eq=brightness=-0.22:contrast=1.06:saturation=0.62"


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr[-2000:])
        raise SystemExit(f"ffmpeg falló: {' '.join(cmd[:8])}…")


def main() -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg no está instalado")

    for src_name, dest_name, end, gain in VOICE:
        src = ASSETS / src_name
        if not src.exists():
            raise SystemExit(f"no existe {src}")
        chain = (
            "highpass=f=70,"
            "loudnorm=I=-16:TP=-1.5:LRA=11:linear=true,"
            f"volume={gain},"
            "alimiter=limit=0.841:level=false"
        )
        run([
            "ffmpeg", "-y", "-v", "error", "-ss", "0", "-to", f"{end}",
            "-i", str(src), "-af", chain,
            "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le",
            str(ASSETS / dest_name),
        ])
        print(f"{dest_name}: 0.00–{end:.2f} s (nivel cuerpo)")

    for at, dest_name in FRAMES:
        run([
            "ffmpeg", "-y", "-v", "error", "-ss", at,
            "-i", str(ASSETS / "base.mp4"), "-frames:v", "1",
            "-vf", BG_FILTER, str(ASSETS / dest_name),
        ])
        print(f"{dest_name}: frame {at}s de base.mp4 (blur + oscurecido)")


if __name__ == "__main__":
    main()
