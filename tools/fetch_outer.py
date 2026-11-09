"""Descarga los datos del entorno lejano (radio de 10 km) de un mapa.

Uso: python tools/fetch_outer.py <mapa>      (usa "outer_half" de tools/maps.json)

- OpenStreetMap: carreteras y caminos, edificios y nombres de los pueblos.
- IGN MDT 25 m: relieve.
- IGN PNOA: ortofoto de todo el cuadrado.
- Catastro: edificios de los pueblos de alrededor (1,5 km en torno a cada uno).
Se guarda en data/<mapa>/outer/.
"""
import json, math, os, sys, time, urllib.parse, urllib.request
from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = sys.argv[1]
CFG = json.load(open(os.path.join(ROOT, "tools", "maps.json")))[NAME]
OUT = os.path.join(ROOT, "data", NAME, "outer")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "GTA-Valde/0.1 (github.com/Darius1980/GTA-Valde)"}
HALF = CFG.get("outer_half", 10000); INNER = CFG.get("half", 1800)


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
for attempt in range(4):
    ok = False
    for ep in ["https://overpass-api.de/api/interpreter",
               "https://overpass.private.coffee/api/interpreter",
               "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
               "https://overpass.kumi.systems/api/interpreter"]:
        try:
            blob = get(ep, urllib.parse.urlencode({"data": q}).encode(), timeout=600)
            json.loads(blob)
            save("osm.json", blob); ok = True; break
        except Exception as e:
            print("overpass fail", ep, e, flush=True)
    if ok: break
    time.sleep(30)

# --- MDT 25 m
for cov in ["Elevacion25830_25", "Elevacion25830_5"]:
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
        for k in range(3):
            try:
                save(f"ortho_{i}_{j}.jpg", get(url)); break
            except Exception as e:
                print("pnoa fail", i, j, e, flush=True); time.sleep(10)

# --- Catastro en torno a cada pueblo
if CFG.get("catastro"):
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
