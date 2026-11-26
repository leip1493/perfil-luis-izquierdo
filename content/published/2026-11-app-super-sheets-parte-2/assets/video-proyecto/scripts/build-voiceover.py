#!/usr/bin/env python3
"""Corta assets/voiceover.wav en clips por escena y los coloca en el timeline.

Uso:  python3 scripts/build-voiceover.py

Lee la toma original (assets/voiceover.wav, intacta), la normaliza una sola vez
(highpass 70 Hz + loudnorm a -16 LUFS / -1.5 dBTP en modo lineal, para que todos
los clips compartan el mismo nivel) y escribe assets/vo-01.wav .. vo-15.wav.

Cada entrada de SEGMENTS es:
  (id, inicio_en_la_toma, fin_en_la_toma, data-start_en_el_video)

Los cortes caen en los silencios medidos con ffmpeg silencedetect (-45 dB RMS),
así que ningún clip empieza o termina a mitad de palabra. Los data-start están
alineados con los anclajes visuales de assets/base.mp4 (menú Extensiones,
pestañas Code.gs / index.html, menú Implementar, modal de permisos, URL y
dashboard final).
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "voiceover.wav"
OUT_DIR = ROOT / "assets"

# (id, src_in, src_out, video_start)
SEGMENTS = [
    ("vo-01", 0.00, 6.99, 0.08),   # gancho: dashboard sobre Sheets + "mira qué rápido"
    ("vo-02", 7.82, 12.82, 7.88),  # la hoja de cálculo / tabla de prueba
    ("vo-03", 13.55, 18.34, 13.44),  # Extensiones → Apps Script
    ("vo-04", 19.06, 23.34, 19.24),  # Code.gs
    ("vo-05", 23.95, 28.34, 24.36),  # index.html
    ("vo-06", 29.00, 31.86, 30.34),  # Implementar → Nueva implementación
    ("vo-07", 32.44, 35.14, 33.34),  # Aplicación web / quién puede abrirla
    ("vo-08", 35.70, 38.48, 37.34),  # descripción + acceso "Cualquier usuario"
    ("vo-09", 39.44, 43.14, 44.48),  # clic en Implementar + autorizar acceso
    ("vo-10", 42.96, 47.42, 48.70),  # "Solo aceptas…" + URL (frase continua)
    ("vo-11", 48.26, 49.76, 56.50),  # abres el enlace: en vivo
    ("vo-12", 50.48, 52.94, 59.42),  # editas el dato en el Sheet
    ("vo-13", 53.52, 55.92, 62.85),  # recargas: el total se actualiza
    ("vo-14", 56.46, 58.20, 66.00),  # filtras: todo se recalcula
    ("vo-15", 58.96, 62.68, 67.82),  # cierre: Parte 3 (modular, TDD, agentes)
]

MASTER_FILTER = "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11:linear=true"


def run(cmd: list[str]) -> None:
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr[-2000:])
        raise SystemExit(f"ffmpeg falló: {' '.join(cmd[:6])}…")


def main() -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg no está instalado")
    if not SRC.exists():
        raise SystemExit(f"no existe {SRC}")

    if len(SEGMENTS) != 15:
        raise SystemExit("SEGMENTS debe tener 15 entradas (vo-01 … vo-15)")

    with tempfile.TemporaryDirectory(prefix="vo-master-") as tmp:
        master = Path(tmp) / "voiceover-master.wav"
        print(f"master: {SRC.name} → loudnorm -16 LUFS")
        run([
            "ffmpeg", "-y", "-v", "error", "-i", str(SRC),
            "-af", MASTER_FILTER, "-ar", "24000", "-ac", "1",
            "-c:a", "pcm_s16le", str(master),
        ])

        for clip_id, src_in, src_out, start in SEGMENTS:
            length = round(src_out - src_in, 3)
            dest = OUT_DIR / f"{clip_id}.wav"
            run([
                "ffmpeg", "-y", "-v", "error",
                "-ss", f"{src_in:.3f}", "-to", f"{src_out:.3f}",
                "-i", str(master),
                "-c:a", "pcm_s16le", str(dest),
            ])
            print(
                f"{clip_id}: {src_in:6.2f}–{src_out:6.2f} "
                f"({length:4.2f}s) → data-start=\"{start}\" data-duration=\"{length}\""
            )


if __name__ == "__main__":
    main()
