"""Busca el sitio más llano cerca del pueblo para una pista de avionetas (sin casas, calles asfaltadas ni agua)
y lo guarda en public/world/<mapa>/plano.json como 'aerodromo'."""
import json, math, sys
m = sys.argv[1] if len(sys.argv) > 1 else 'valde'
W = json.load(open(f'public/world/{m}/world.json')); T = json.load(open(f'public/world/{m}/terrain.json'))
O = json.load(open(f'public/world/{m}/outer.json'))
n, cell, (ox, oz) = W['terrain']['n'], W['terrain']['cell'], W['terrain']['origin']
H = [v * T['scale'] for v in T['h']]
def hgt(x, z):
    fx, fz = (x - ox) / cell, (z - oz) / cell; i, j = min(n - 2, max(0, int(fx))), min(n - 2, max(0, int(fz))); u, v = fx - i, fz - j
    a, b, c, d = H[j*n+i], H[j*n+i+1], H[(j+1)*n+i], H[(j+1)*n+i+1]
    return (a*(1-u)+b*u)*(1-v)+(c*(1-u)+d*u)*v
cx, cz = W.get('plaza', {}).get('start') or W['spawn']
G = {}
def add(x, z, k):
    G.setdefault((int(x // 20), int(z // 20)), []).append((x, z, k))
for b in W['buildings']:
    for p in b['p']: add(p[0], p[1], 'b')
for r in W['roads']:
    if r['k'] in ('path', 'track'): continue
    P = r['p']
    for a, c in zip(P, P[1:]):
        L = math.dist(a, c); k = max(1, int(L / 5))
        for t in range(k + 1): add(a[0] + (c[0]-a[0])*t/k, a[1] + (c[1]-a[1])*t/k, 'r')
def inpoly(x, z, p):
    c = False; j = len(p) - 1
    for i in range(len(p)):
        if (p[i][1] > z) != (p[j][1] > z) and x < (p[j][0]-p[i][0])*(z-p[i][1])/(p[j][1]-p[i][1])+p[i][0]: c = not c
        j = i
    return c
ponds = [w['p'] for w in O['water']['polys'] if any(abs(x) < 2500 and abs(z) < 2500 for x, z in w['p'])]
rivers = [r['p'] if isinstance(r, dict) else r for r in O['water']['rivers']]
for r in rivers:
    for a, c in zip(r, r[1:]):
        L = math.dist(a, c); k = max(1, int(L / 10))
        for t in range(k + 1): add(a[0] + (c[0]-a[0])*t/k, a[1] + (c[1]-a[1])*t/k, 'w')
def clear(x, z, rb, rr):
    for i in range(int((x - 60)//20), int((x + 60)//20) + 1):
        for j in range(int((z - 60)//20), int((z + 60)//20) + 1):
            for px, pz, k in G.get((i, j), ()):
                d = math.hypot(px - x, pz - z)
                if (k == 'b' and d < rb) or (k in 'rw' and d < rr): return False
    return True
L, HW = 420, 12
best = None
for R in range(350, 1300, 25):
    for deg in range(0, 360, 6):
        a = math.radians(deg); mx, mz = cx + R*math.cos(a), cz + R*math.sin(a)
        if max(abs(mx), abs(mz)) > 1450: continue
        for hd in range(0, 180, 10):
            ux, uz = math.cos(math.radians(hd)), math.sin(math.radians(hd))
            ax, az, bx, bz = mx - ux*L/2, mz - uz*L/2, mx + ux*L/2, mz + uz*L/2
            ha, hb = hgt(ax, az), hgt(bx, bz)
            if abs(hb - ha) / L > 0.025: continue
            dev = 0
            for t in range(0, 43):
                s = t / 42; x, z = ax + (bx-ax)*s, az + (bz-az)*s; base = ha + (hb-ha)*s
                for o in (-HW - 6, 0, HW + 6):
                    dev = max(dev, abs(hgt(x - uz*o, z + ux*o) - base))
            score = dev + R * 0.002
            if best and score >= best[0]: continue
            if any(inpoly(mx, mz, p) for p in ponds): continue
            if not all(clear(ax + (bx-ax)*t/14, az + (bz-az)*t/14, 50, HW + 10) for t in range(15)): continue
            best = (score, dev, R, [round(ax, 1), round(az, 1)], [round(bx, 1), round(bz, 1)], ha, hb)
print(best)
p = json.load(open(f'public/world/{m}/plano.json')); p['aerodromo'] = {'a': best[3], 'b': best[4], 'w': 2 * HW}
json.dump(p, open(f'public/world/{m}/plano.json', 'w'), separators=(',', ':'))
