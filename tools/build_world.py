"""Convierte los datos descargados (data/) en el mundo del juego (public/world/).

Uso: python3 tools/build_world.py <mapa>
Sistema local: x = Este - cx, z = -(Norte - cy) (metros), centro en el nodo OSM del pueblo.
"""
import glob, json, math, os, re, shutil, sys
import numpy as np
import tifffile
from PIL import Image
from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = sys.argv[1] if len(sys.argv) > 1 else "valde"
CFG = json.load(open(os.path.join(ROOT, "tools", "maps.json")))[NAME]
D = os.path.join(ROOT, "data", NAME); OUT = os.path.join(ROOT, "public", "world", NAME)
os.makedirs(OUT, exist_ok=True)
meta = json.load(open(os.path.join(D, "meta.json")))
cx, cy = meta["utm"]; HALF = meta["half"]
to_utm = Transformer.from_crs(4326, 25830, always_xy=True)

def loc(e, n): return [round(e - cx, 2), round(-(n - cy), 2)]

# ---------------- terreno ----------------
dem = tifffile.imread(os.path.join(D, "mdt.tif")).astype(np.float32)
def blur(a, s):
    r = int(s * 3); k = np.exp(-0.5 * (np.arange(-r, r + 1) / s) ** 2); k /= k.sum()
    a = np.pad(a, r, mode="edge")
    a = np.apply_along_axis(lambda v: np.convolve(v, k, "valid"), 0, a)
    return np.apply_along_axis(lambda v: np.convolve(v, k, "valid"), 1, a)
dem = blur(dem, 1.3)
n = dem.shape[0]; cell = 2 * HALF / n
y0 = float(np.round(dem[n // 2, n // 2]))
heights = (dem - y0).astype(np.float32)          # alturas relativas al centro del pueblo
# alturas en pasos de 5 cm, como JSON (servible en cualquier hosting estático)
json.dump({"scale": 0.05, "h": np.round(heights / 0.05).astype(int).ravel().tolist()}, open(os.path.join(OUT, "terrain.json"), "w"), separators=(",", ":"))
terrain = {"n": n, "cell": cell, "origin": [-HALF + cell / 2, -HALF + cell / 2], "base": y0}
def H(x, z):
    fx = (x - terrain["origin"][0]) / cell; fz = (z - terrain["origin"][1]) / cell
    i = min(n - 2, max(0, int(fx))); j = min(n - 2, max(0, int(fz)))
    u = min(1, max(0, fx - i)); v = min(1, max(0, fz - j))
    h = heights
    return (h[j, i] * (1 - u) + h[j, i + 1] * u) * (1 - v) + (h[j + 1, i] * (1 - u) + h[j + 1, i + 1] * u) * v

# ---------------- ortofotos ----------------
Image.open(os.path.join(D, "ortho.jpg")).convert("RGB").save(os.path.join(OUT, "ortho.jpg"), quality=86)
Image.open(os.path.join(D, "ortho_center.jpg")).convert("RGB").save(os.path.join(OUT, "ortho_center.jpg"), quality=88)
# límites [xmin, z(v=0), xmax, z(v=1)]; v=0 es el borde inferior (sur) de la imagen
ortho = {"full": {"file": "ortho.jpg", "bounds": [-HALF, HALF, HALF, -HALF]},
         "center": {"file": "ortho_center.jpg", "bounds": [-CFG.get("detail_half", 300), CFG.get("detail_half", 300), CFG.get("detail_half", 300), -CFG.get("detail_half", 300)]}}

# ---------------- edificios (Catastro) ----------------
def parse_gml(path):
    txt = open(path, encoding="latin-1").read()
    for m in re.finditer(r"<gml:featureMember>(.*?)</gml:featureMember>", txt, re.S):
        f = m.group(1)
        gid = re.search(r'gml:id="([^"]+)"', f).group(1)
        rings = re.findall(r"<gml:exterior>.*?<gml:posList[^>]*>([^<]+)</gml:posList>", f, re.S)
        floors = re.search(r"numberOfFloorsAboveGround>(\d+)<", f)
        use = re.search(r"currentUse>([^<]+)<", f)
        yield gid, rings, int(floors.group(1)) if floors else None, use.group(1) if use else None

uses = {}
for p in glob.glob(os.path.join(D, "catastro_building_*.gml")):
    for gid, rings, fl, use in parse_gml(p):
        uses[gid.replace("ES.SDGC.BU.", "")] = use

def area(pts):
    return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2

buildings, seen = [], set()
for p in glob.glob(os.path.join(D, "catastro_buildingpart_*.gml")):
    for gid, rings, fl, _ in parse_gml(p):
        if gid in seen or not fl: continue
        seen.add(gid)
        ref = gid.replace("ES.SDGC.BU.", "").split("_part")[0]
        use = uses.get(ref) or ""
        for ring in rings:
            v = list(map(float, ring.split()))
            pts = [loc(v[i], v[i + 1]) for i in range(0, len(v), 2)]
            if pts[0] == pts[-1]: pts = pts[:-1]
            # quitar vértices casi duplicados
            clean = []
            for q in pts:
                if not clean or math.dist(clean[-1], q) > 0.15: clean.append(q)
            if len(clean) >= 3 and math.dist(clean[0], clean[-1]) < 0.15: clean.pop()
            if len(clean) < 3 or abs(area(clean)) < 4: continue
            kind = "res" if use.startswith("1_") else "pub" if use.startswith("4_") else "agr"
            buildings.append({"p": clean, "f": fl, "use": kind, "id": ref})
print("edificios:", len(buildings))

# ---------------- OSM ----------------
osm = json.load(open(os.path.join(D, "osm.json")))["elements"]
nodes = {e["id"]: e for e in osm if e["type"] == "node"}
def way_pts(w):
    out = []
    for nid in w["nodes"]:
        nd = nodes.get(nid)
        if nd: out.append(loc(*to_utm.transform(nd["lon"], nd["lat"])))
    return out

ROADS = {"trunk": (7.5, "asphalt"), "primary": (7, "asphalt"), "secondary": (6.5, "asphalt"), "tertiary": (6, "asphalt"),
         "unclassified": (5, "asphalt"), "residential": (5, "asphalt"), "living_street": (4, "concrete"),
         "service": (3.5, "concrete"), "pedestrian": (4, "concrete"), "track": (3, "dirt"), "path": (1.2, "dirt"), "footway": (2, "concrete"), "steps": (2, "concrete"),
         "primary_link": (5, "asphalt"), "secondary_link": (5, "asphalt"), "tertiary_link": (5, "asphalt"), "motorway": (11, "asphalt"), "motorway_link": (6, "asphalt"), "trunk_link": (6, "asphalt")}
roads, walls, names = [], [], []
for w in (e for e in osm if e["type"] == "way"):
    t = w.get("tags", {}); pts = way_pts(w)
    if len(pts) < 2: continue
    hw = t.get("highway")
    if t.get("tunnel") in ("yes", "building_passage") or t.get("indoor") == "yes": hw = None
    if hw in ROADS:
        wd, s = ROADS[hw]
        surf = t.get("surface")
        if surf in ("asphalt",): s = "asphalt"
        elif surf in ("concrete", "paving_stones", "sett", "paved"): s = "concrete"
        elif surf in ("unpaved", "gravel", "dirt", "ground", "compacted"): s = "dirt"
        if hw == "residential" and not surf: s = "asphalt"
        if hw not in ("trunk", "primary", "secondary", "motorway"): wd = round(wd * CFG.get("road_scale", 1), 2)
        r = {"k": hw, "w": wd, "s": s, "p": pts}
        if hw in ("trunk", "primary", "secondary", "motorway"): r["lines"] = True
        if t.get("bridge") == "yes": r["bridge"] = True
        if t.get("name"): r["name"] = t["name"]
        roads.append(r)
    elif t.get("barrier") == "wall":
        walls.append({"p": pts, "h": 1.3})
print("vias:", len(roads), "muros:", len(walls))

# Edificios de OSM cuando no hay Catastro (País Vasco, Navarra)
def parse_levels(t):
    for k in ("building:levels",):
        try: return max(1, int(float(t[k].split(";")[0])))
        except Exception: pass
    try: return max(1, round(float(t["height"].replace("m", "").strip()) / 3.0))
    except Exception: pass
    return None
DEFAULT_LEVELS = {"house": 2, "detached": 2, "semidetached_house": 2, "terrace": 3, "garage": 1, "garages": 1, "shed": 1, "roof": 1,
                  "industrial": 2, "warehouse": 2, "school": 3, "church": 3, "commercial": 3, "retail": 2, "apartments": 7, "residential": 6}
def add_osm_building(pts, t):
    if len(pts) < 3: return
    if pts[0] == pts[-1]: pts = pts[:-1]
    if len(pts) < 3 or abs(area(pts)) < 6: return
    if t.get("building") in ("roof", "construction") or t.get("location") == "underground" or t.get("layer", "0").startswith("-"): return
    lv = parse_levels(t) or DEFAULT_LEVELS.get(t.get("building"), 4 if abs(area(pts)) > 250 else 2)
    b = t.get("building")
    kind = "pub" if (b in ("church", "chapel", "school", "public", "civic") or t.get("amenity") in ("place_of_worship", "school", "townhall")) else \
           "agr" if b in ("garage", "garages", "shed", "barn", "farm_auxiliary") else "ind" if b in ("industrial", "warehouse") else "res"
    flat = abs(area(pts)) > 260 or t.get("roof:shape") == "flat"
    buildings.append({"p": pts, "f": lv, "use": kind, "flat": flat, "min": parse_min(t), "name": t.get("name")})
def parse_min(t):
    try: return int(t.get("building:min_level", 0))
    except Exception: return 0
if not CFG.get("catastro"):
    ways = {e["id"]: e for e in osm if e["type"] == "way"}
    for w in ways.values():
        t = w.get("tags", {})
        if "building" in t or "building:part" in t and "building" not in t:
            if "building:part" in t and "building" not in t: continue  # partes: se usa el contorno del edificio
            add_osm_building(way_pts(w), t)
    for r in (e for e in osm if e["type"] == "relation" and "building" in e.get("tags", {})):
        for m in r.get("members", []):
            if m["type"] == "way" and m.get("role") == "outer" and m["ref"] in ways:
                add_osm_building(way_pts(ways[m["ref"]]), r["tags"])
    print("edificios OSM:", len(buildings))

# ---------------- alturas reales con LiDAR (MDS - MDT) ----------------
mds_p = os.path.join(D, "mds1.tif")
if os.path.exists(mds_p):
    from PIL import ImageDraw as _ID
    mds = tifffile.imread(mds_p).astype(np.float32)
    if mds.ndim == 3: mds = mds[..., 0]
    N = mds.shape[0]; res = 2 * HALF / N
    mds[(mds < -100) | (mds > 5000)] = np.nan
    print("MDS", mds.shape, np.nanmin(mds), np.nanmax(mds))
    done = 0
    for b in buildings:
        poly = [((q[0] + HALF) / res, (q[1] + HALF) / res) for q in b["p"]]
        ci0 = max(0, int(min(p[0] for p in poly)) - 1); cj0 = max(0, int(min(p[1] for p in poly)) - 1)
        ci1 = min(N, int(max(p[0] for p in poly)) + 2); cj1 = min(N, int(max(p[1] for p in poly)) + 2)
        if ci1 - ci0 < 2 or cj1 - cj0 < 2: continue
        img = Image.new("L", (ci1 - ci0, cj1 - cj0), 0)
        _ID.Draw(img).polygon([(x - ci0, y - cj0) for x, y in poly], fill=1)
        m = np.asarray(img).astype(bool)
        sub = mds[cj0:cj1, ci0:ci1]
        # erosión de 1 px para no coger el suelo del borde
        e = m.copy(); e[1:, :] &= m[:-1, :]; e[:-1, :] &= m[1:, :]; e[:, 1:] &= m[:, :-1]; e[:, :-1] &= m[:, 1:]
        v = sub[e if e.sum() >= 6 else m]; v = v[~np.isnan(v)]
        if len(v) < 4: continue
        p95, p50, p20 = np.percentile(v, 95), np.percentile(v, 50), np.percentile(v, 20)
        gnd = min(H(q[0], q[1]) for q in b["p"]) + y0
        if p95 - gnd < 2: continue  # derribado o mal casado
        b["top"] = round(float(p95 - y0), 2)
        flat_roof = (p95 - p20) < 1.3
        b["flat"] = bool(flat_roof)
        b["eave"] = round(float((p50 if flat_roof else p20) - y0), 2)
        b["f"] = max(1, int(round((p50 - gnd) / 2.9)))
        done += 1
    print("alturas LiDAR:", done, "de", len(buildings))

# ---------------- árboles a partir de la ortofoto ----------------
img = np.asarray(Image.open(os.path.join(D, "ortho.jpg")).convert("RGB")).astype(np.float32)
S = img.shape[0]; mpp = 2 * HALF / S
R, G, B = img[..., 0], img[..., 1], img[..., 2]
lum = (R + G + B) / 3
mask = (lum < 72) & (G >= R * 0.95) & (G > B * 1.02)
# suavizado para quedarse con copas (no píxeles sueltos)
def box(a, r):
    c = np.cumsum(np.cumsum(np.pad(a, ((r + 1, r), (r + 1, r))), 0), 1)
    return (c[2 * r + 1:, 2 * r + 1:] - c[:-2 * r - 1, 2 * r + 1:] - c[2 * r + 1:, :-2 * r - 1] + c[:-2 * r - 1, :-2 * r - 1]) / (2 * r + 1) ** 2
dens = box(mask.astype(np.float32), 2)
if os.path.exists(mds_p):
    # con LiDAR: árbol = superficie > 3 m sobre el suelo, verde en la ortofoto y fuera de edificios
    from PIL import Image as _I
    nd = np.asarray(_I.fromarray(np.nan_to_num(mds, nan=0)).resize((S, S), _I.BILINEAR))
    gx = (np.arange(S) + 0.5) * mpp - HALF
    tg = np.asarray(_I.fromarray(heights + y0).resize((S, S), _I.BILINEAR))
    veg = ((nd - tg) > 3) & (G > R * 1.02) & (G > B * 1.05)
    dens = box(veg.astype(np.float32), 2)

# zonas sin árboles: edificios y vías
from PIL import ImageDraw
block = Image.new("L", (S, S), 0); dr = ImageDraw.Draw(block)
px = lambda q: ((q[0] + HALF) / mpp, (q[1] + HALF) / mpp)
for b in buildings: dr.polygon([px(q) for q in b["p"]], fill=255)
for r in roads: dr.line([px(q) for q in r["p"]], fill=255, width=max(2, int((r["w"] + 3) / mpp)))
block = np.asarray(block) > 0

rng = np.random.default_rng(42)
trees, spacing = [], 4.5
occ = {}
cand = np.argwhere((dens > 0.45) & ~block)
rng.shuffle(cand)
for j, i in cand:
    x = (i + 0.5) * mpp - HALF + rng.uniform(-0.4, 0.4); z = (j + 0.5) * mpp - HALF + rng.uniform(-0.4, 0.4)
    d = math.hypot(x, z)
    if d > 900: continue
    sp = spacing if d < 450 else spacing * 1.6
    gi, gj = int(x // sp), int(z // sp)
    if any((gi + a, gj + b) in occ for a in (-1, 0, 1) for b in (-1, 0, 1)
           if math.dist(occ.get((gi + a, gj + b), (1e9, 1e9)), (x, z)) < sp): continue
    occ[(gi, gj)] = (x, z)
    sc = float(np.clip(0.75 + dens[j, i] * 0.6 + rng.normal(0, 0.12), 0.6, 1.5))
    trees.append([round(x, 1), round(z, 1), round(sc, 2)])
print("arboles:", len(trees))

# ---------------- coches aparcados y punto de salida ----------------
def inside(pt, poly):
    x, z = pt; c = False
    for i in range(len(poly)):
        a, b = poly[i], poly[i - 1]
        if (a[1] > z) != (b[1] > z) and x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]: c = not c
    return c
def clear(pt, r=2.6):
    for b in buildings:
        if min(abs(pt[0] - q[0]) for q in b["p"]) > 40: continue
        if inside(pt, b["p"]): return False
        for k in range(len(b["p"])):
            a, c = b["p"][k], b["p"][k - 1]
            dx, dz = c[0] - a[0], c[1] - a[1]; L = dx * dx + dz * dz or 1e-9
            t = max(0, min(1, ((pt[0] - a[0]) * dx + (pt[1] - a[1]) * dz) / L))
            if math.dist(pt, (a[0] + dx * t, a[1] + dz * t)) < r: return False
    return True

cars = []
village = [r for r in roads if r["k"] in ("residential", "unclassified", "tertiary", "living_street", "secondary")]
MAXCARS = CFG.get("cars", 9); RADIUS = CFG.get("car_radius", 220)
for r in village:
    P = r["p"]
    for k in range(len(P) - 1):
        a, b = P[k], P[k + 1]; L = math.dist(a, b)
        m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
        if L < 10 or len(cars) >= MAXCARS or math.hypot(*m) > RADIUS: continue
        ux, uz = (b[0] - a[0]) / L, (b[1] - a[1]) / L
        for side in (1, -1):
            p = [m[0] - uz * side * (r["w"] / 2 + 1.0), m[1] + ux * side * (r["w"] / 2 + 1.0)]
            if clear(p) and all(math.dist(p, c[:2]) > 18 for c in cars):
                cars.append([round(p[0], 2), round(p[1], 2), round(math.atan2(ux, uz), 3)]); break
print("coches:", len(cars))

spawn = [0, 0]
plaza = [r for r in roads if r.get("name") == "Plaza Mayor"]
if plaza: spawn = plaza[0]["p"][len(plaza[0]["p"]) // 2]
if not clear(spawn, 1): 
    for k in range(1, 40):
        cand = [spawn[0] + k, spawn[1]]
        if clear(cand, 1): spawn = cand; break

world = {"name": NAME, "title": CFG["title"], "style": CFG.get("style", "rural"), "carScale": CFG.get("car_scale", 1), "personScale": CFG.get("person_scale", 1), "terrain": terrain, "ortho": ortho, "buildings": buildings, "roads": roads, "walls": walls,
         "trees": trees, "cars": cars, "spawn": spawn, "church": CFG.get("church"), "plaza": CFG.get("plaza"), "race_start": CFG.get("race_start")}
json.dump(world, open(os.path.join(OUT, "world.json"), "w"), separators=(",", ":"))
print("world.json", os.path.getsize(os.path.join(OUT, "world.json")) // 1024, "KB")
