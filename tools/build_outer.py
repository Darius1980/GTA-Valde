"""Entorno lejano (radio de 10 km) del mapa: public/world/<mapa>/outer.json y ortho_outer.jpg.

Uso: python3 tools/build_outer.py <mapa>     (después de tools/build_world.py)
Mismo sistema local que world.json; las alturas son relativas a la misma base.
"""
import glob, json, math, os, re, sys
import numpy as np
import tifffile
from PIL import Image, ImageDraw
from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = sys.argv[1] if len(sys.argv) > 1 else "valde"
CFG = json.load(open(os.path.join(ROOT, "tools", "maps.json")))[NAME]
D = os.path.join(ROOT, "data", NAME); DO = os.path.join(D, "outer"); OUT = os.path.join(ROOT, "public", "world", NAME)
meta = json.load(open(os.path.join(D, "meta.json")))
cx, cy = meta["utm"]; INNER = meta["half"]
om = json.load(open(os.path.join(DO, "meta.json"))); HALF = om["half"]
world = json.load(open(os.path.join(OUT, "world.json")))
BASE = world["terrain"]["base"]
to_utm = Transformer.from_crs(4326, 25830, always_xy=True)
def loc(e, n): return [round(e - cx, 1), round(-(n - cy), 1)]

# ---------------- relieve: rejilla de 40 m ----------------
dem = tifffile.imread(os.path.join(DO, "mdt.tif")).astype(np.float32)
if dem.ndim == 3: dem = dem[..., 0]
dem[dem < -100] = np.nan
if np.isnan(dem).any(): dem = np.where(np.isnan(dem), np.nanmean(dem), dem)
print("mdt", dem.shape, float(dem.min()), float(dem.max()))
# La rejilla lejana tiene líneas justo en el borde del terreno del pueblo (±E), así los dos encajan sin grietas
E = -world["terrain"]["origin"][0]; M = 90; CELL = 2 * E / M
k = math.ceil((HALF - E) / CELL); n = M + 2 * k + 1; o = -E - k * CELL
xs = o + np.arange(n) * CELL
r_, c_ = dem.shape  # cubre [-HALF, HALF]; fila 0 = norte = z negativa, igual que el juego
fi = np.clip((xs + HALF) / (2 * HALF) * c_ - 0.5, 0, c_ - 1.001); fj = np.clip((xs + HALF) / (2 * HALF) * r_ - 0.5, 0, r_ - 1.001)
i0 = fi.astype(int); j0 = fj.astype(int); u = (fi - i0)[None, :]; v = (fj - j0)[:, None]
g = (dem[np.ix_(j0, i0)] * (1 - u) + dem[np.ix_(j0, i0 + 1)] * u) * (1 - v) + (dem[np.ix_(j0 + 1, i0)] * (1 - u) + dem[np.ix_(j0 + 1, i0 + 1)] * u) * v
heights = g - BASE
json.dump({"scale": 0.1, "h": np.round(heights / 0.1).astype(int).ravel().tolist()},
          open(os.path.join(OUT, "terrain_outer.json"), "w"), separators=(",", ":"))
terrain = {"n": n, "cell": CELL, "origin": [o, o], "edge": E}
print("rejilla lejana", n, "x", n, "celda", round(CELL, 2), "m")

# ---------------- ortofoto 4096 px ----------------
T = 2048; img = Image.new("RGB", (2 * T, 2 * T), (120, 110, 90))
for i in range(2):
    for j in range(2):
        p = os.path.join(DO, f"ortho_{i}_{j}.jpg")
        if os.path.exists(p):
            try: img.paste(Image.open(p).convert("RGB").resize((T, T)), (i * T, (1 - j) * T))
            except Exception as e: print("ortho", p, e)
img.save(os.path.join(OUT, "ortho_outer.jpg"), quality=84)
ortho = {"file": "ortho_outer.jpg", "bounds": [-HALF, HALF, HALF, -HALF]}

# ---------------- OSM ----------------
inner_ids = {e["id"] for e in json.load(open(os.path.join(D, "osm.json")))["elements"] if e["type"] == "way"}
osm = json.load(open(os.path.join(DO, "osm.json")))["elements"]
nodes = {e["id"]: e for e in osm if e["type"] == "node"}
def way_pts(w):
    return [loc(*to_utm.transform(nodes[i]["lon"], nodes[i]["lat"])) for i in w["nodes"] if i in nodes]

def simplify(P, eps):
    if len(P) < 3: return P
    a, b = np.array(P[0]), np.array(P[-1]); ab = b - a; L = np.hypot(*ab) or 1e-9
    d = [abs(ab[0] * (p[1] - a[1]) - ab[1] * (p[0] - a[0])) / L for p in P[1:-1]]
    k = int(np.argmax(d)) + 1
    if d[k - 1] < eps: return [P[0], P[-1]]
    return simplify(P[:k + 1], eps)[:-1] + simplify(P[k:], eps)

def simplify_ring(P, eps):
    # anillo cerrado: se simplifica en dos mitades (con primer y último punto iguales la recta base no existe)
    if P and P[0] == P[-1]: P = P[:-1]
    if len(P) < 6: return P
    m = len(P) // 2
    return simplify(P[:m + 1], eps)[:-1] + simplify(P[m:] + [P[0]], eps)[:-1]

ROADS = {"trunk": (7.5, "asphalt"), "primary": (7, "asphalt"), "secondary": (6.5, "asphalt"), "tertiary": (6, "asphalt"),
         "unclassified": (5, "asphalt"), "residential": (5, "asphalt"), "living_street": (4, "asphalt"), "service": (3.5, "dirt"),
         "track": (3, "dirt"), "primary_link": (5, "asphalt"), "secondary_link": (5, "asphalt"), "tertiary_link": (5, "asphalt"),
         "motorway": (11, "asphalt"), "motorway_link": (6, "asphalt"), "trunk_link": (6, "asphalt")}
rs = CFG.get("road_scale", 1)
roads, places, rivers = [], [], []
inside_inner = lambda p: abs(p[0]) < INNER - 5 and abs(p[1]) < INNER - 5
for w in (e for e in osm if e["type"] == "way"):
    t = w.get("tags", {})
    if t.get("waterway"): continue
    hw = t.get("highway")
    if hw not in ROADS or w["id"] in inner_ids or t.get("tunnel") == "yes": continue
    P = way_pts(w)
    if len(P) < 2 or all(inside_inner(p) for p in P): continue
    wd, s = ROADS[hw]; surf = t.get("surface")
    if surf == "asphalt": s = "asphalt"
    elif surf in ("concrete", "paving_stones", "sett", "paved"): s = "concrete"
    elif surf in ("unpaved", "gravel", "dirt", "ground", "compacted", "grass"): s = "dirt"
    if hw == "track" and t.get("tracktype") == "grade5": continue
    if hw not in ("trunk", "primary", "secondary", "motorway"): wd = round(wd * rs, 2)
    r = {"k": hw, "w": wd, "s": s, "p": simplify(P, 0.6 if s != "dirt" else 1.5)}
    if hw in ("trunk", "primary", "secondary", "motorway"): r["lines"] = True
    if t.get("name"): r["name"] = t["name"]
    if t.get("bridge") in ("yes", "viaduct"): r["bridge"] = True
    roads.append(r)
for e in osm:
    if e["type"] == "node" and e.get("tags", {}).get("place") and e["tags"].get("name"):
        x, z = loc(*to_utm.transform(e["lon"], e["lat"]))
        if abs(x) < HALF and abs(z) < HALF and math.hypot(x, z) > 600:
            places.append({"name": e["tags"]["name"], "kind": e["tags"]["place"], "c": [x, z]})
print("vias:", len(roads), "km:", round(sum(sum(math.dist(r["p"][i], r["p"][i + 1]) for i in range(len(r["p"]) - 1)) for r in roads) / 1000), "pueblos:", [p["name"] for p in places])

# ---------------- agua: embalses y lagunas (polígonos) y cauces (cintas) ----------------
def Hg(x, z):  # altura del relieve lejano (rejilla) en coordenadas del juego
    fx = min(n - 1.001, max(0, (x - o) / CELL)); fz = min(n - 1.001, max(0, (z - o) / CELL))
    i, j = int(fx), int(fz); u, v = fx - i, fz - j
    return float((heights[j, i] * (1 - u) + heights[j, i + 1] * u) * (1 - v) + (heights[j + 1, i] * (1 - u) + heights[j + 1, i + 1] * u) * v)
def area(pts): return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2
water = {"polys": [], "rivers": []}
wp = os.path.join(DO, "water.json")
if os.path.exists(wp):
    wel = json.load(open(wp))["elements"]
    nodes.update({e["id"]: e for e in wel if e["type"] == "node"})
    ways = {e["id"]: e for e in wel if e["type"] == "way"}
    def rings_of(rel, role):
        segs = [way_pts(ways[m["ref"]]) for m in rel.get("members", []) if m["type"] == "way" and m.get("role", "outer") == role and m["ref"] in ways]
        segs = [s_ for s_ in segs if len(s_) > 1]; out = []
        while segs:
            ring = segs.pop(0)
            while math.dist(ring[0], ring[-1]) > 0.5:
                for k, s_ in enumerate(segs):
                    if math.dist(s_[0], ring[-1]) < 0.5: ring += s_[1:]; break
                    if math.dist(s_[-1], ring[-1]) < 0.5: ring += s_[::-1][1:]; break
                else: break
                segs.pop(k)
            out.append(ring)
        return out
    def add_poly(outer, holes):
        P = simplify_ring(outer, 1.0)
        if len(P) < 3 or abs(area(P)) < 150: return
        # el nivel del agua: lo más bajo de la orilla según el relieve
        hs = sorted(Hg(*q) for q in densify(P + [P[0]], 20))
        y = hs[max(0, len(hs) // 10)]
        water["polys"].append({"p": P, "h": [simplify_ring(hh, 1.0) for hh in holes if len(hh) > 3], "y": round(y, 2)})
    def densify(P, st):
        out = []
        for a_, b_ in zip(P, P[1:]):
            k = max(1, int(math.dist(a_, b_) / st))
            out += [[a_[0] + (b_[0] - a_[0]) * t / k, a_[1] + (b_[1] - a_[1]) * t / k] for t in range(k)]
        return out + [P[-1]]
    in_rel = set()
    for e in wel:
        t = e.get("tags", {})
        if e["type"] == "relation" and (t.get("natural") == "water" or t.get("waterway") == "riverbank" or t.get("landuse") == "reservoir"):
            for m in e.get("members", []): in_rel.add(m["ref"])
            for r_ in rings_of(e, "outer"): add_poly(r_, rings_of(e, "inner"))
    for e in ways.values():
        t = e.get("tags", {})
        if e["id"] in in_rel and not t.get("natural"): continue
        if t.get("natural") == "water" or t.get("waterway") == "riverbank" or t.get("landuse") == "reservoir":
            P = way_pts(e)
            if len(P) > 3 and math.dist(P[0], P[-1]) < 1: add_poly(P, [])
        elif t.get("waterway") in ("river", "stream", "canal") and t.get("tunnel") != "culvert":
            P = simplify(way_pts(e), 2)
            if len(P) < 2: continue
            wd = t.get("width", "")
            try: wd = float(wd.replace(",", ".").split()[0])
            except Exception: wd = {"river": 9, "canal": 4, "stream": 2.2}[t["waterway"]]
            water["rivers"].append({"p": P, "w": round(min(max(wd, 1.5), 40), 1), "k": t["waterway"]})
print("agua:", len(water["polys"]), "laminas,", len(water["rivers"]), "cauces")

# ---------------- edificios: Catastro de los pueblos + OSM ----------------
def parse_gml(path):
    txt = open(path, encoding="latin-1").read()
    for m in re.finditer(r"<gml:featureMember>(.*?)</gml:featureMember>", txt, re.S):
        f = m.group(1)
        gid = re.search(r'gml:id="([^"]+)"', f).group(1)
        rings = re.findall(r"<gml:exterior>.*?<gml:posList[^>]*>([^<]+)</gml:posList>", f, re.S)
        floors = re.search(r"numberOfFloorsAboveGround>(\d+)<", f)
        use = re.search(r"currentUse>([^<]+)<", f)
        yield gid, rings, int(floors.group(1)) if floors else None, use.group(1) if use else None
def area(pts): return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2
def clean(pts):
    if pts and pts[0] == pts[-1]: pts = pts[:-1]
    out = []
    for q in pts:
        if not out or math.dist(out[-1], q) > 0.3: out.append(q)
    if len(out) >= 3 and math.dist(out[0], out[-1]) < 0.3: out.pop()
    out = simplify_ring(out, 0.25)
    return out if len(out) >= 3 and abs(area(out)) >= 6 else None
uses = {}
for p in glob.glob(os.path.join(DO, "cb_*.gml")):
    for gid, _, _, use in parse_gml(p): uses[gid.replace("ES.SDGC.BU.", "")] = use
blds, seen, rej = [], set(), {"forma": 0, "pueblo": 0}
for p in glob.glob(os.path.join(DO, "cbp_*.gml")):
    for gid, rings, fl, _ in parse_gml(p):
        if gid in seen or not fl: continue
        seen.add(gid)
        ref = gid.replace("ES.SDGC.BU.", "").split("_part")[0]; use = uses.get(ref) or ""
        for ring in rings[:1]:
            v = list(map(float, ring.split()))
            pts = clean([loc(v[i], v[i + 1]) for i in range(0, len(v), 2)])
            if not pts: rej["forma"] += 1; continue
            if any(inside_inner(q) for q in pts): rej["pueblo"] += 1; continue
            blds.append({"p": pts, "f": min(fl, 3), "use": "res" if use.startswith("1_") else "pub" if use.startswith("4_") else "agr"})
cat = len(blds)
cgrid = {}
for b in blds:
    c = np.mean(b["p"], axis=0); cgrid.setdefault((int(c[0] // 30), int(c[1] // 30)), []).append(c)
for w in (e for e in osm if e["type"] == "way" and "building" in e.get("tags", {})):
    pts = clean(way_pts(w))
    if not pts or any(inside_inner(q) for q in pts): continue
    c = np.mean(pts, axis=0); gi, gj = int(c[0] // 30), int(c[1] // 30)
    if any(math.dist(c, q) < 12 for a in (-1, 0, 1) for b in (-1, 0, 1) for q in cgrid.get((gi + a, gj + b), [])): continue
    t = w["tags"]; lv = t.get("building:levels", "")
    blds.append({"p": pts, "f": int(lv) if lv.isdigit() else 1, "use": "res" if t["building"] in ("house", "residential", "detached") else "agr"})
print("edificios:", cat, "catastro +", len(blds) - cat, "osm; descartados", rej)
# agrupados en teselas de 1 km para recortarlos por distancia en el juego
groups = {}
for b in blds:
    c = np.mean(b["p"], axis=0); groups.setdefault((int(c[0] // 1000), int(c[1] // 1000)), []).append(b)
bgroups = [{"c": [k[0] * 1000 + 500, k[1] * 1000 + 500], "b": v} for k, v in groups.items()]

# ---------------- encinas a partir de la ortofoto ----------------
a = np.asarray(img).astype(np.float32); S = a.shape[0]; mpp = 2 * HALF / S
R, G, B = a[..., 0], a[..., 1], a[..., 2]; lum = (R + G + B) / 3
mask = (lum < 80) & (G >= R * 0.92) & (G > B * 1.0)
def box(x, r):
    c = np.cumsum(np.cumsum(np.pad(x, ((r + 1, r), (r + 1, r))), 0), 1)
    return (c[2 * r + 1:, 2 * r + 1:] - c[:-2 * r - 1, 2 * r + 1:] - c[2 * r + 1:, :-2 * r - 1] + c[:-2 * r - 1, :-2 * r - 1]) / (2 * r + 1) ** 2
dens = box(mask.astype(np.float32), 1)
blk = Image.new("L", (S, S), 0); dr = ImageDraw.Draw(blk)
px = lambda q: ((q[0] + HALF) / mpp, (q[1] + HALF) / mpp)
for b in blds: dr.polygon([px(q) for q in b["p"]], fill=255)
for wpoly in water["polys"]: dr.polygon([px(q) for q in wpoly["p"]], fill=255)
for rv in water["rivers"]: dr.line([px(q) for q in rv["p"]], fill=255, width=max(1, int((rv["w"] + 2) / mpp)))
for r in roads: dr.line([px(q) for q in r["p"]], fill=255, width=max(2, int((r["w"] + 4) / mpp)))
blk = np.asarray(blk) > 0
rng = np.random.default_rng(7)
cand = np.argwhere((dens > 0.5) & ~blk); rng.shuffle(cand)
trees, occ, SP, MAXT = [], set(), 8.0, CFG.get("outer_trees", 150000)
for j, i in cand:
    x = (i + 0.5) * mpp - HALF + rng.uniform(-2, 2); z = (j + 0.5) * mpp - HALF + rng.uniform(-2, 2)
    if math.hypot(x, z) < INNER - 100 and abs(x) < INNER and abs(z) < INNER: continue
    k = (int(x // SP), int(z // SP))
    if k in occ: continue
    occ.add(k); trees.append([round(x, 1), round(z, 1), round(float(np.clip(0.9 + dens[j, i] * 0.5 + rng.normal(0, 0.15), 0.7, 1.6)), 2)])
    if len(trees) >= MAXT: break
print("encinas:", len(trees))

# ortofotos de detalle de cada pueblo: casco a 0,5 m/px (1 km) si está; si no, 1,6 km a 0,8 m/px
detail = []
for f in sorted(glob.glob(os.path.join(DO, "ortho_v_*.jpg"))):
    nid = int(re.search(r"ortho_v_(\d+)", f).group(1)); nd = nodes.get(nid)
    if not nd: continue
    fw, R = os.path.join(DO, f"ortho_w_{nid}.jpg"), 800
    if os.path.exists(fw): f, R = fw, 500
    try: im = Image.open(f).convert("RGB")
    except Exception as e: print("detalle", f, e); continue
    name = os.path.basename(f); im.save(os.path.join(OUT, name), quality=80)
    x, z = loc(*to_utm.transform(nd["lon"], nd["lat"]))
    detail.append({"file": name, "bounds": [x - R, z + R, x + R, z - R], "c": [x, z]})
print("ortofotos de detalle:", len(detail))
# ortofoto media (~2 m/px): teselas de 2 km; en el juego, i hacia el este y j hacia el sur desde (-HALF, -HALF)
mid = None
MT = 2000; NM = int(2 * HALF // MT); have_m = 0
for i in range(NM):
    for j in range(NM):
        f = os.path.join(DO, f"ortho_m_{i}_{j}.jpg")
        if not os.path.exists(f): continue
        try: im = Image.open(f).convert("RGB")
        except Exception as e: print("media", f, e); continue
        im.save(os.path.join(OUT, f"ortho_m_{i}_{NM - 1 - j}.jpg"), quality=78); have_m += 1
if have_m: mid = {"tile": MT, "n": NM, "x0": -HALF, "z0": -HALF, "file": "ortho_m_{i}_{j}.jpg"}
print("ortofoto media:", have_m, "teselas")
out = {"half": HALF, "detail": detail, "mid": mid, "terrain": terrain, "ortho": ortho, "roads": roads, "water": water, "groups": bgroups, "trees": trees, "places": places}
json.dump(out, open(os.path.join(OUT, "outer.json"), "w"), separators=(",", ":"))
for f in ("outer.json", "terrain_outer.json", "ortho_outer.jpg"):
    print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, "KB")
