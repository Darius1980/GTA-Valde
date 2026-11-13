"""Descarga los datos del entorno lejano (radio de 10 km) de un mapa.

Uso: python tools/fetch_outer.py <mapa>      (usa "outer_half" de tools/maps.json)

- OpenStreetMap: carreteras y caminos, edificios y nombres de los pueblos.
- IGN MDT 25 m: relieve.
- IGN PNOA: ortofoto de todo el cuadrado.
- Catastro: edificios de los pueblos de alrededor (1,5 km en torno a cada uno).
Se guarda en data/<mapa>/outer/; lo ya descargado no se repite (salvo con --force).
"""
import glob, json, math, os, sys, time, urllib.parse, urllib.request
from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = sys.argv[1]
CFG = json.load(open(os.path.join(ROOT, "tools", "maps.json")))[NAME]
OUT = os.path.join(ROOT, "data", NAME, "outer")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "GTA-Valde/0.1 (github.com/Darius1980/GTA-Valde)"}
HALF = CFG.get("outer_half", 10000); INNER = CFG.get("half", 1800)
have = lambda f: os.path.exists(os.path.join(OUT, f)) and "--force" not in sys.argv  # lo ya descargado no se repite


def get(url, data=None, timeout=300):
    req = urllib.request.Request(url, data=data, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def save(name, blob):
    with open(os.path.join(OUT, name), "wb") as f:
        f.write(blob)
    print(f"{name}: {len(blob)} bytes", flush=True)


to_utm = Transformer.from_crs(4326, 25830, always_xy=True)
to_geo = Transformer.from_crs(25830, 4326, always_xy=True)
cx, cy = to_utm.transform(CFG["lon"], CFG["lat"])
x0, y0, x1, y1 = cx - HALF, cy - HALF, cx + HALF, cy + HALF
lon0, lat0 = to_geo.transform(x0, y0)
lon1, lat1 = to_geo.transform(x1, y1)
save("meta.json", json.dumps({"utm": [cx, cy], "half": HALF, "bbox_geo": [lat0, lon0, lat1, lon1]}, indent=1).encode())

# --- OpenStreetMap: vías, edificios y lugares
bb = f"{lat0},{lon0},{lat1},{lon1}"
q = (f"[out:json][timeout:600];(way({bb})[highway];way({bb})[building];way({bb})[waterway~\"^(river|stream)$\"];"
     f"node({bb})[place~\"^(village|town|hamlet|isolated_dwelling|locality)$\"];);out body;>;out skel qt;")
def overpass(q, fname):
    for attempt in range(4):
      ok = False
      for ep in ["https://overpass-api.de/api/interpreter",
                 "https://overpass.private.coffee/api/interpreter",
                 "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
                 "https://overpass.kumi.systems/api/interpreter"]:
          try:
              blob = get(ep, urllib.parse.urlencode({"data": q}).encode(), timeout=600)
              json.loads(blob)
              save(fname, blob); ok = True; break
          except Exception as e:
              print("overpass fail", ep, e, flush=True)
      if ok: break
      time.sleep(30)
if not have("osm.json"): overpass(q, "osm.json")
# agua: embalses, lagunas y cauces (con su anchura de orilla a orilla cuando está mapeada)
qw = (f"[out:json][timeout:600];(way({bb})[natural=water];relation({bb})[natural=water];way({bb})[waterway=riverbank];"
      f"relation({bb})[waterway=riverbank];way({bb})[landuse=reservoir];relation({bb})[landuse=reservoir];"
      f"way({bb})[waterway~\"^(river|stream|canal)$\"];);out body;>;out skel qt;")
if not have("water.json"): overpass(qw, "water.json")

# --- MDT 25 m
for cov in ([] if have("mdt.tif") else ["Elevacion25830_25", "Elevacion25830_5"]):
    wcs = "https://servicios.idee.es/wcs-inspire/mdt?" + urllib.parse.urlencode({
        "SERVICE": "WCS", "VERSION": "2.0.1", "REQUEST": "GetCoverage",
        "CoverageId": cov, "FORMAT": "image/tiff",
        "SUBSET": [f"x({x0},{x1})", f"y({y0},{y1})"],
        **({"SCALESIZE": "x(800),y(800)"} if cov.endswith("_5") else {})}, doseq=True)
    try:
        blob = get(wcs, timeout=600)
        if blob[:2] in (b"II", b"MM"): save("mdt.tif", blob); break
        print("mdt not tiff", cov, blob[:400], flush=True)
    except Exception as e:
        print("mdt fail", cov, e, flush=True)

# --- Ortofoto (4 teselas de 2048 px: 4096 px en total, ~5 m/px)
for i in range(2):
    for j in range(2):
        bx0, by0 = x0 + i * HALF, y0 + j * HALF
        url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
            "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
            "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{bx0},{by0},{bx0 + HALF},{by0 + HALF}",
            "WIDTH": 2048, "HEIGHT": 2048, "FORMAT": "image/jpeg"})
        for k in range(0 if have(f"ortho_{i}_{j}.jpg") else 3):
            try:
                save(f"ortho_{i}_{j}.jpg", get(url)); break
            except Exception as e:
                print("pnoa fail", i, j, e, flush=True); time.sleep(10)

# --- Ortofoto del plano editable (radio de 4 km, ~2 m/px): 4 teselas de 4 km y 2048 px
PH = 4000
for i in range(2):
    for j in range(2):
        f = f"ortho_p_{i}_{j}.jpg"
        if have(f): continue
        bx0, by0 = cx - PH + i * PH, cy - PH + j * PH
        url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
            "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
            "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{bx0},{by0},{bx0 + PH},{by0 + PH}",
            "WIDTH": 2048, "HEIGHT": 2048, "FORMAT": "image/jpeg"})
        for k in range(3):
            try: save(f, get(url)); break
            except Exception as e: print("pnoa plano fail", i, j, e, flush=True); time.sleep(10)

# --- Ortofoto de detalle (0,8 m/px) de 1,6 km alrededor de cada pueblo, para verlo bien de cerca
try:
    _osm = json.load(open(os.path.join(OUT, "osm.json")))["elements"]
except Exception:
    _osm = []
vill = []
for e in _osm:
    if e["type"] == "node" and e.get("tags", {}).get("place") in ("village", "town", "hamlet"):
        e_, n_ = to_utm.transform(e["lon"], e["lat"])
        if abs(e_ - cx) < HALF and abs(n_ - cy) < HALF and math.hypot(e_ - cx, n_ - cy) > 1200: vill.append((e["id"], e_, n_))
for vid, e_, n_ in vill:
    f = f"ortho_v_{vid}.jpg"
    if have(f): continue
    url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
        "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
        "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{e_ - 800},{n_ - 800},{e_ + 800},{n_ + 800}",
        "WIDTH": 2048, "HEIGHT": 2048, "FORMAT": "image/jpeg"})
    for k in range(3):
        try: save(f, get(url)); break
        except Exception as ex: print("pnoa village fail", vid, ex, flush=True); time.sleep(10)

# --- Ortofoto media (~2 m/px) de todo el entorno: 10 x 10 teselas de 2 km a 1024 px, se cargan por zonas
MT = 2000
for i in range(int(2 * HALF // MT)):
    for j in range(int(2 * HALF // MT)):
        f = f"ortho_m_{i}_{j}.jpg"
        if have(f): continue
        bx0, by0 = x0 + i * MT, y0 + j * MT
        url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
            "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
            "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{bx0},{by0},{bx0 + MT},{by0 + MT}",
            "WIDTH": 1024, "HEIGHT": 1024, "FORMAT": "image/jpeg"})
        for k in range(3):
            try: save(f, get(url)); break
            except Exception as e: print("pnoa media fail", i, j, e, flush=True); time.sleep(10)

# --- Ortofoto fina (~0,5 m/px) del casco de cada pueblo: 1 km a 2048 px
for vid, e_, n_ in vill:
    f = f"ortho_w_{vid}.jpg"
    if have(f): continue
    url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
        "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
        "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{e_ - 500},{n_ - 500},{e_ + 500},{n_ + 500}",
        "WIDTH": 2048, "HEIGHT": 2048, "FORMAT": "image/jpeg"})
    for k in range(3):
        try: save(f, get(url)); break
        except Exception as ex: print("pnoa casco fail", vid, ex, flush=True); time.sleep(10)

# --- Catastro en torno a cada pueblo
if CFG.get("catastro") and not glob.glob(os.path.join(OUT, "cbp_*.gml")):
    try:
        osm = json.load(open(os.path.join(OUT, "osm.json")))["elements"]
    except Exception:
        osm = []
    places = []
    for e in osm:
        if e["type"] != "node" or e.get("tags", {}).get("place") not in ("village", "town", "hamlet"): continue
        e_, n_ = to_utm.transform(e["lon"], e["lat"])
        if abs(e_ - cx) < INNER and abs(n_ - cy) < INNER: continue
        if abs(e_ - cx) > HALF or abs(n_ - cy) > HALF: continue
        places.append((e.get("tags", {}).get("name", "?"), e_, n_))
    print("pueblos:", places, flush=True)
    base = "https://ovc.catastro.meh.es/INSPIRE/wfsBU.aspx?"
    T, R = 750, 750
    for name, pe, pn in places:
        for i in range(2):
            for j in range(2):
                bx, by = pe - R + i * T, pn - R + j * T
                key = f"{int(bx // 10)}_{int(by // 10)}"
                for tname, prefix in [("BU.BUILDING", "cb"), ("BU.BUILDINGPART", "cbp")]:
                    params = {"service": "WFS", "version": "2.0.0", "request": "GetFeature", "typeNames": tname,
                              "srsName": "EPSG::25830", "bbox": f"{bx:.1f},{by:.1f},{bx + T:.1f},{by + T:.1f}"}
                    try:
                        save(f"{prefix}_{key}.gml", get(base + urllib.parse.urlencode(params), timeout=180))
                    except Exception as e:
                        print("catastro fail", name, tname, e, flush=True)
