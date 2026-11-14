// Comarca: red de carreteras completa (pueblo + entorno de 10 km) para ir de un pueblo a otro,
// y tráfico que circula por el pueblo o la carretera más cercana al jugador.
import { RoadNet, Driver } from './traffic.js';

const DRIVE = { motorway: 0.8, motorway_link: 1, trunk: 0.85, trunk_link: 1, primary: 0.9, primary_link: 1, secondary: 0.95, secondary_link: 1,
  tertiary: 1, tertiary_link: 1, unclassified: 1.15, residential: 1.25, living_street: 1.5, service: 1.6, track: 1.7 };

// cola de prioridad mínima (montículo binario)
class Heap {
  constructor() { this.a = []; }
  push(k, v) { const a = this.a; a.push([k, v]); let i = a.length - 1; while (i) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } }
  pop() {
    const a = this.a, top = a[0], last = a.pop();
    if (a.length) { a[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } }
    return top;
  }
  get size() { return this.a.length; }
}

export class Region {
  constructor({ roads, outerRoads, places, center, title }) {
    this.all = [...roads, ...outerRoads].filter(r => DRIVE[r.k] && r.p.length > 1);
    // nodos: vértices de las vías (unidos si coinciden a medio metro)
    const id = new Map(), X = [], Z = [], adj = [], key = (p) => `${Math.round(p[0] * 2)},${Math.round(p[1] * 2)}`;
    const node = (p) => { const k = key(p); let n = id.get(k); if (n === undefined) { n = X.length; id.set(k, n); X.push(p[0]); Z.push(p[1]); adj.push([]); } return n; };
    const link = (a, b, w) => { if (a === b) return; adj[a].push([b, w]); adj[b].push([a, w]); };
    this.kindOf = [];
    for (const r of this.all) {
      let prev = node(r.p[0]);
      for (let i = 1; i < r.p.length; i++) { const n = node(r.p[i]); link(prev, n, Math.hypot(X[n] - X[prev], Z[n] - Z[prev]) * DRIVE[r.k]); prev = n; }
      for (const p of r.p) { const n = id.get(key(p)); const c = DRIVE[this.kindOf[n]] ?? 9; if (DRIVE[r.k] < c) this.kindOf[n] = r.k; }
    }
    // la simplificación de las vías a veces quita el vértice del cruce: los extremos sueltos se unen al vértice más cercano
    const G = 20, grid = new Map(), gk = (x, z) => `${Math.floor(x / G)},${Math.floor(z / G)}`;
    for (let n = 0; n < X.length; n++) { const k = gk(X[n], Z[n]); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(n); }
    for (let n = 0; n < X.length; n++) {
      if (adj[n].length !== 1) continue;
      const gx = Math.floor(X[n] / G), gz = Math.floor(Z[n] / G), nb = adj[n][0][0]; let best = -1, bd = 14;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const m of grid.get(`${gx + a},${gz + b}`) || []) {
        if (m === n || m === nb) continue; const d = Math.hypot(X[m] - X[n], Z[m] - Z[n]); if (d < bd) { bd = d; best = m; }
      }
      if (best >= 0) link(n, best, bd * 1.2 + 2);
    }
    Object.assign(this, { X, Z, adj, grid, G });
    // pueblos: el principal y los de alrededor (con su punto de llegada en una calle asfaltada cerca del centro)
    this.villages = [{ name: title, short: 'Valde', c: center, main: true, big: true }, ...places.filter(p => p.kind === 'village' || p.kind === 'hamlet' || p.kind === 'town').map(p => ({ name: p.name, c: p.c, big: p.kind !== 'hamlet' }))];
    for (const v of this.villages) v.node = this.nearest(v.c[0], v.c[1], 400, k => k !== 'track' && k !== 'service' && k !== 'motorway' && k !== 'motorway_link');
    this.villages = this.villages.filter(v => v.node >= 0);
    this.cache = new Map();
  }
  nearest(x, z, maxD = 400, ok = () => true) {
    let best = -1, bd = maxD;
    const R = Math.ceil(maxD / this.G), gx = Math.floor(x / this.G), gz = Math.floor(z / this.G);
    for (let a = -R; a <= R; a++) for (let b = -R; b <= R; b++) for (const m of this.grid.get(`${gx + a},${gz + b}`) || []) {
      if (!ok(this.kindOf[m])) continue; const d = Math.hypot(this.X[m] - x, this.Z[m] - z); if (d < bd) { bd = d; best = m; }
    }
    return best;
  }
  // camino más corto (Dijkstra) entre dos nodos: lista de puntos [x, z]
  path(a, b) {
    const k = `${a}>${b}`; if (this.cache.has(k)) return this.cache.get(k);
    const N = this.X.length, dist = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1), h = new Heap();
    dist[a] = 0; h.push(0, a);
    while (h.size) {
      const [d, n] = h.pop(); if (n === b) break; if (d > dist[n]) continue;
      for (const [m, w] of this.adj[n]) { const nd = d + w; if (nd < dist[m]) { dist[m] = nd; prev[m] = n; h.push(nd, m); } }
    }
    if (!isFinite(dist[b])) { this.cache.set(k, null); return null; }
    const pts = []; for (let n = b; n >= 0; n = prev[n]) pts.push([this.X[n], this.Z[n]]);
    pts.reverse(); this.cache.set(k, pts); return pts;
  }
  // caminos desde un punto a todos los pueblos con un solo Dijkstra: [[pueblo, puntos, metros]]
  toVillages(from) {
    const a = this.nearest(from[0], from[1], 300, k => k !== 'track'); if (a < 0) return [];
    const N = this.X.length, dist = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1), h = new Heap();
    dist[a] = 0; h.push(0, a);
    while (h.size) { const [d, n] = h.pop(); if (d > dist[n]) continue; for (const [m, w] of this.adj[n]) { const nd = d + w; if (nd < dist[m]) { dist[m] = nd; prev[m] = n; h.push(nd, m); } } }
    const out = [];
    for (const v of this.villages) {
      if (!isFinite(dist[v.node])) continue;
      const pts = []; for (let n = v.node; n >= 0; n = prev[n]) pts.push([this.X[n], this.Z[n]]);
      pts.reverse(); out.push([v, pts, Region.length(pts)]);
    }
    return out;
  }
  route(from, to) {
    const a = this.nearest(from[0], from[1], 300, k => k !== 'track'), b = typeof to === 'number' ? to : this.nearest(to[0], to[1], 300, k => k !== 'track');
    return a >= 0 && b >= 0 ? this.path(a, b) : null;
  }
  static length(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
  villageAt(x, z, maxD = 900) { let best = null, bd = maxD; for (const v of this.villages) { const d = Math.hypot(v.c[0] - x, v.c[1] - z); if (d < bd) { bd = d; best = v; } } return best; }
  // puntos de calle (vértices de vías de pueblo) entre rmin y rmax metros de (x, z)
  spotsNear(x, z, rmin, rmax) {
    const out = [], R = Math.ceil(rmax / this.G), gx = Math.floor(x / this.G), gz = Math.floor(z / this.G), ok = new Set(['residential', 'living_street', 'unclassified', 'tertiary']);
    for (let a = -R; a <= R; a++) for (let b = -R; b <= R; b++) for (const m of this.grid.get(`${gx + a},${gz + b}`) || []) {
      if (!ok.has(this.kindOf[m])) continue; const d = Math.hypot(this.X[m] - x, this.Z[m] - z); if (d > rmin && d < rmax) out.push([this.X[m], this.Z[m]]);
    }
    return out;
  }
  nodePos(n) { return [this.X[n], this.Z[n]]; }
}

// Tráfico de la comarca: unos coches que circulan por el pueblo de alrededor o la carretera por la que va el jugador.
// Fuera del pueblo principal (que ya tiene su tráfico) se recolocan al cambiar de zona, siempre lejos de la vista.
const LOCAL = new Set(['residential', 'living_street', 'unclassified', 'tertiary', 'service', 'secondary', 'trunk']);
const OPEN = new Set(['trunk', 'primary', 'secondary', 'tertiary', 'unclassified']);
export class RegionTraffic {
  constructor({ region, outerRoads, inner, makeCar, count }) {
    Object.assign(this, { region, roads: outerRoads, inner, makeCar });
    this.cars = []; this.area = null; this.nets = new Map();
    for (let i = 0; i < count; i++) {
      const c = makeCar(i); c.aiKind = 'region'; c.aiRespawn = () => this.spawn(c, this.focus || c.pos); this.sleep(c); this.cars.push(c);
    }
  }
  sleep(c) { c.ai = null; c.speed = 0; c.place(1e5 + Math.random() * 1e3, 1e5, 0); c.mesh.visible = false; c.asleep = true; }
  net(area) {
    const k = area.join(','); if (this.nets.has(k)) return this.nets.get(k);
    const [cx, cz, R] = area, kinds = area[3] ? LOCAL : OPEN;
    const roads = this.roads.filter(r => kinds.has(r.k) && r.p.some(p => Math.hypot(p[0] - cx, p[1] - cz) < R));
    const net = roads.length ? new RoadNet(roads, kinds, [cx, cz, R]) : null;
    this.nets.set(k, net); if (this.nets.size > 20) this.nets.delete(this.nets.keys().next().value);
    return net;
  }
  // zona de tráfico según dónde está el jugador: el pueblo cercano o un tramo de carretera de 1,5 km
  pickArea(pos) {
    if (Math.abs(pos.x) < this.inner && Math.abs(pos.z) < this.inner) return null;
    const v = this.region.villageAt(pos.x, pos.z, 1000);
    if (v && !v.main) return [Math.round(v.c[0]), Math.round(v.c[1]), 450, 1];
    if (this.area && !this.area[3] && Math.hypot(pos.x - this.area[0], pos.z - this.area[1]) < 900) return this.area;
    return [Math.round(pos.x / 50) * 50, Math.round(pos.z / 50) * 50, 1500, 0];
  }
  spawn(c, pos) {
    const net = this.area && this.net(this.area);
    if (!net || !net.roads.length) return this.sleep(c);
    // en campo abierto todas las calles pueden quedar lejos: con -Infinity siempre se elige alguna
    let spot = null, best = -Infinity; const want = this.area[3] ? 80 + Math.random() * 300 : 200 + Math.random() * 700;
    for (let k = 0; k < 12; k++) { // lejos del jugador, pero no tanto que no se vea nunca
      const s = net.randomSpot(), p = net.roads[s.ri].p[s.i], d = Math.hypot(p[0] - pos.x, p[1] - pos.z);
      const score = d > 70 ? 1000 - Math.abs(d - want) : d;
      if (score > best) { best = score; spot = s; }
    }
    const open = !this.area[3], r = net.roads[spot.ri];
    c.ai = new Driver(net, c, spot, open ? (r.k === 'trunk' || r.k === 'secondary' ? 18 : 13) : 6.5);
    c.mesh.visible = true; c.asleep = false; c.speed = 0;
  }
  update(focus, driving) {
    this.focus = focus;
    if ((this._t = (this._t || 0) + 1) % 30) return;
    const a = this.pickArea(focus), same = a && this.area && a.join(',') === this.area.join(',');
    if (!same) this.area = a;
    for (const c of this.cars) {
      if (c === driving || c.driver) continue;
      if (!c.ai && !c.asleep) continue; // el jugador lo ha dejado aparcado: se queda donde está
      const d = Math.hypot(c.pos.x - focus.x, c.pos.z - focus.z);
      if (!this.area) { if (!c.asleep && d > 250) this.sleep(c); continue; }
      if (c.asleep || (!same && d > 250) || d > 2200 || !c.ai.f.net.inArea(c.pos.x, c.pos.z)) this.spawn(c, focus);
    }
  }
}
