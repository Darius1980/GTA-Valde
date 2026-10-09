"""Descarga datos abiertos de un mapa del juego.

Uso: python tools/fetch_data.py <mapa>     (mapas definidos en tools/maps.json)

- OpenStreetMap (Overpass): calles, edificios, usos del suelo.
- Catastro INSPIRE (solo territorio común): huellas de edificios con número de plantas.
- IGN PNOA: ortofoto (CC BY 4.0, scne.es) para el suelo.
- IGN MDT 5 m: relieve.
Se ejecuta en GitHub Actions (ver .github/workflows/fetch-osm.yml).
"""
import json, os, sys, time, urllib.parse, urllib.request
from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = sys.argv[1]
CFG = json.load(open(os.path.join(ROOT, "tools", "maps.json")))[NAME]
OUT = os.path.join(ROOT, "data", NAME)
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "GTA-Valde/0.1 (github.com/Darius1980/GTA-Valde)"}


def get(url, data=None, timeout=180):
    req = urllib.request.Request(url, data=data, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def save(name, blob):
    with open(os.path.join(OUT, name), "wb") as f:
        f.write(blob)
    print(f"{name}: {len(blob)} bytes")


if "lat" in CFG:
    LAT, LON = CFG["lat"], CFG["lon"]
else:  # geocodificar por nombre
    res = json.loads(get("https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"q": CFG["query"], "format": "json", "limit": 5})))
    print("nominatim:", json.dumps(res, ensure_ascii=False)[:2000])
    LAT, LON = float(res[0]["lat"]), float(res[0]["lon"])
HALF = CFG.get("half", 1000)

to_utm = Transformer.from_crs(4326, 25830, always_xy=True)
to_geo = Transformer.from_crs(25830, 4326, always_xy=True)
cx, cy = to_utm.transform(LON, LAT)
x0, y0, x1, y1 = cx - HALF, cy - HALF, cx + HALF, cy + HALF
lon0, lat0 = to_geo.transform(x0, y0)
lon1, lat1 = to_geo.transform(x1, y1)
save("meta.json", json.dumps({"center": [LAT, LON], "utm": [cx, cy], "half": HALF,
                              "bbox_geo": [lat0, lon0, lat1, lon1]}, indent=1).encode())

# --- OpenStreetMap
bb = f"{lat0},{lon0},{lat1},{lon1}"
q = f"[out:json][timeout:120];(way({bb});relation({bb})[building];relation({bb})[type=multipolygon];node({bb}););out body;>;out skel qt;"
for attempt in range(4):
    ok = False
    for ep in ["https://overpass-api.de/api/interpreter",
               "https://overpass.private.coffee/api/interpreter",
               "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
               "https://overpass.kumi.systems/api/interpreter"]:
        try:
            save("osm.json", get(ep, urllib.parse.urlencode({"data": q}).encode()))
            ok = True
            break
        except Exception as e:
            print("overpass fail", ep, e)
    if ok:
        break
    time.sleep(20)

# --- Catastro INSPIRE (no cubre País Vasco ni Navarra). Teselas de 500 m.
if CFG.get("catastro"):
    base = "https://ovc.catastro.meh.es/INSPIRE/wfsBU.aspx?"
    T = 500
    for tname, prefix in [("BU.BUILDING", "catastro_building"), ("BU.BUILDINGPART", "catastro_buildingpart")]:
        for i in range(int(2 * HALF / T)):
            for j in range(int(2 * HALF / T)):
                bx, by = x0 + i * T, y0 + j * T
                params = {"service": "WFS", "version": "2.0.0", "request": "GetFeature", "typeNames": tname,
                          "srsName": "EPSG::25830", "bbox": f"{bx:.1f},{by:.1f},{bx + T:.1f},{by + T:.1f}"}
                try:
                    save(f"{prefix}_{i}_{j}.gml", get(base + urllib.parse.urlencode(params)))
                except Exception as e:
                    print("catastro fail", tname, e)


def ortho(name, x0, y0, x1, y1, px):
    url = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
        "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
        "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{x0},{y0},{x1},{y1}",
        "WIDTH": px, "HEIGHT": px, "FORMAT": "image/jpeg"})
    try:
        save(name, get(url))
    except Exception as e:
        print("pnoa fail", name, e)


ortho("ortho.jpg", x0, y0, x1, y1, 2048)
D = CFG.get("detail_half", 300)
ortho("ortho_center.jpg", cx - D, cy - D, cx + D, cy + D, 2400)

# --- MDT 5 m (IGN, WCS)
wcs = "https://servicios.idee.es/wcs-inspire/mdt?" + urllib.parse.urlencode({
    "SERVICE": "WCS", "VERSION": "2.0.1", "REQUEST": "GetCoverage",
    "CoverageId": "Elevacion25830_5", "FORMAT": "image/tiff",
    "SUBSET": [f"x({x0},{x1})", f"y({y0},{y1})"]}, doseq=True)
try:
    save("mdt.tif", get(wcs))
except Exception as e:
    print("mdt fail", e)

# --- LiDAR del Gobierno Vasco (MDS y MDT a 1 m): altura real de los edificios
if CFG.get("euskadi_lidar"):
    wcsb = "https://www.geo.euskadi.eus/geoeuskadi/services/U11/WCS_KARTOGRAFIA/MapServer/WCSServer?"
    n = int(2 * HALF)
    for cov, fname in [("MDS_LIDAR_1M_EGUNERATUENA_MAS_ACTUALIZADA", "mds1.tif"), ("MDT_LIDAR_1M_EGUNERATUENA_MAS_ACTUALIZADA", "mdt1.tif")]:
        variants = [
            {"SERVICE": "WCS", "VERSION": "1.0.0", "REQUEST": "GetCoverage", "COVERAGE": cov, "CRS": "EPSG:25830",
             "BBOX": f"{x0},{y0},{x1},{y1}", "WIDTH": n, "HEIGHT": n, "FORMAT": "GeoTIFF"},
            {"SERVICE": "WCS", "VERSION": "1.1.1", "REQUEST": "GetCoverage", "IDENTIFIER": cov,
             "BOUNDINGBOX": f"{x0},{y0},{x1},{y1},urn:ogc:def:crs:EPSG::25830", "GRIDBASECRS": "urn:ogc:def:crs:EPSG::25830",
             "GRIDOFFSETS": "1,-1", "FORMAT": "image/GeoTIFF", "STORE": "false"},
        ]
        for k, v in enumerate(variants):
            try:
                blob = get(wcsb + urllib.parse.urlencode(v), timeout=300)
                print(fname, "variant", k, len(blob), blob[:120])
                if blob[:2] in (b"II", b"MM"):
                    save(fname, blob); break
                # WCS 1.1 devuelve multipart: extraer el TIFF
                i = blob.find(b"II*\x00")
                if i < 0: i = blob.find(b"MM\x00*")
                if i >= 0:
                    save(fname, blob[i:]); break
                save(fname + f".err{k}.txt", blob[:5000])
            except Exception as e:
                print("lidar fail", fname, k, e)
