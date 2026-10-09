"""Descarga datos abiertos de Val de Santa María (Zamora) para construir el mapa.

- OpenStreetMap (Overpass): calles, caminos, arroyos, usos del suelo.
- Catastro INSPIRE: huellas de edificios con número de plantas.
- IGN PNOA: ortofoto (CC BY 4.0, scne.es) para el suelo.
Se ejecuta en GitHub Actions (ver .github/workflows/fetch-osm.yml).
"""
import json, os, sys, urllib.parse, urllib.request
from pyproj import Transformer

OUT = sys.argv[1] if len(sys.argv) > 1 else "data"
os.makedirs(OUT, exist_ok=True)
LAT, LON = 41.9660505, -6.2120333   # nodo OSM 349244044 (INE 49139000201)
HALF = 1000                          # metros a cada lado del centro

to_utm = Transformer.from_crs(4326, 25830, always_xy=True)
to_geo = Transformer.from_crs(25830, 4326, always_xy=True)
cx, cy = to_utm.transform(LON, LAT)
x0, y0, x1, y1 = cx - HALF, cy - HALF, cx + HALF, cy + HALF
lon0, lat0 = to_geo.transform(x0, y0)
lon1, lat1 = to_geo.transform(x1, y1)
UA = {"User-Agent": "GTA-Valde/0.1 (github.com/Darius1980/GTA-Valde)"}


def get(url, data=None, timeout=180):
    req = urllib.request.Request(url, data=data, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def save(name, blob):
    with open(os.path.join(OUT, name), "wb") as f:
        f.write(blob)
    print(f"{name}: {len(blob)} bytes")


meta = {"center": [LAT, LON], "utm": [cx, cy], "half": HALF,
        "bbox_geo": [lat0, lon0, lat1, lon1]}
save("meta.json", json.dumps(meta, indent=1).encode())

# --- OpenStreetMap
q = f"[out:json][timeout:120];(nwr({lat0},{lon0},{lat1},{lon1}););out body;>;out skel qt;"
for ep in ["https://overpass-api.de/api/interpreter",
           "https://overpass.kumi.systems/api/interpreter"]:
    try:
        save("osm.json", get(ep, urllib.parse.urlencode({"data": q}).encode()))
        break
    except Exception as e:
        print("overpass fail", ep, e)

# --- Catastro INSPIRE (edificios y partes de edificio con plantas)
base = "https://ovc.catastro.meh.es/INSPIRE/wfsBU.aspx?"
for tname, fname in [("BU.BUILDING", "catastro_building.gml"),
                     ("BU.BUILDINGPART", "catastro_buildingpart.gml")]:
    params = {"service": "WFS", "version": "2.0.0", "request": "GetFeature",
              "typeNames": tname, "srsName": "EPSG::25830",
              "bbox": f"{x0:.1f},{y0:.1f},{x1:.1f},{y1:.1f}"}
    try:
        save(fname, get(base + urllib.parse.urlencode(params)))
    except Exception as e:
        print("catastro fail", tname, e)

# --- Ortofoto PNOA (IGN), 2048 px para 2 km => ~1 m/px
wms = "https://www.ign.es/wms-inspire/pnoa-ma?" + urllib.parse.urlencode({
    "SERVICE": "WMS", "VERSION": "1.3.0", "REQUEST": "GetMap", "LAYERS": "OI.OrthoimageCoverage",
    "STYLES": "", "CRS": "EPSG:25830", "BBOX": f"{x0},{y0},{x1},{y1}",
    "WIDTH": 2048, "HEIGHT": 2048, "FORMAT": "image/jpeg"})
try:
    save("ortho.jpg", get(wms))
except Exception as e:
    print("pnoa fail", e)

# --- Modelo digital del terreno (IGN MDT, WCS) 5 m
wcs = "https://servicios.idee.es/wcs-inspire/mdt?" + urllib.parse.urlencode({
    "SERVICE": "WCS", "VERSION": "2.0.1", "REQUEST": "GetCoverage",
    "CoverageId": "Elevacion25830_5", "FORMAT": "image/tiff",
    "SUBSET": [f"x({x0},{x1})", f"y({y0},{y1})"]}, doseq=True)
try:
    save("mdt.tif", get(wcs))
except Exception as e:
    print("mdt fail", e)
