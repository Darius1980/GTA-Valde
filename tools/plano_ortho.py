"""Fotos del plano editable: ortho_plano.jpg (radio de 4 km, ~2 m/px) y ortho_mid.jpg / ortho_far.jpg.

Uso: python tools/plano_ortho.py <mapa> <carpeta de salida>
"""
import os, sys
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME, OUT = sys.argv[1], sys.argv[2]
DO, PW = os.path.join(ROOT, "data", NAME, "outer"), os.path.join(ROOT, "public", "world", NAME)
T = 2048
img = Image.new("RGB", (2 * T, 2 * T), (58, 58, 54))
for i in range(2):
    for j in range(2):  # j = 1 es el norte (arriba)
        img.paste(Image.open(os.path.join(DO, f"ortho_p_{i}_{j}.jpg")).convert("RGB").resize((T, T)), (i * T, (1 - j) * T))
img.save(os.path.join(OUT, "ortho_plano.jpg"), quality=78)
Image.open(os.path.join(PW, "ortho.jpg")).save(os.path.join(OUT, "ortho_mid.jpg"), quality=80)
Image.open(os.path.join(PW, "ortho_outer.jpg")).resize((T, T), Image.LANCZOS).save(os.path.join(OUT, "ortho_far.jpg"), quality=80)
