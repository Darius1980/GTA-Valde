// Construye el mundo 3D a partir de public/world/world.json (generado por tools/build_world.py).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class Terrain {
  constructor(meta, heights) {
    this.n = meta.n; this.cell = meta.cell; this.ox = meta.origin[0]; this.oz = meta.origin[1]; this.h = heights;
  }
  // entorno lejano (radio de 10 km): rejilla gruesa cuyas líneas caen justo en el borde de esta
  setOuter(meta, h) { this.o = { n: meta.n, cell: meta.cell, ox: meta.origin[0], oz: meta.origin[1], h }; this.E = -this.ox; }
  outerHeight(x, z) {
    const o = this.o, n = o.n, h = o.h;
    const fx = Math.max(0, Math.min(n - 1.0001, (x - o.ox) / o.cell)), fz = Math.max(0, Math.min(n - 1.0001, (z - o.oz) / o.cell));
    const i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j;
    const a = h[j * n + i], b = h[j * n + i + 1], c = h[(j + 1) * n + i], d = h[(j + 1) * n + i + 1];
    // mismos triángulos que la malla (diagonal b-c): el coche y las carreteras pisan justo el suelo dibujado
    return u + v <= 1 ? a + (b - a) * u + (c - a) * v : d + (c - d) * (1 - u) + (b - d) * (1 - v);
  }
  // tableros de los puentes: el suelo transitable pasa por encima del cauce
  addDeck(ax, az, bx, bz, ya, yb, hw) {
    const s = { ax, az, bx, bz, ya, yb, hw }, C = 32; this.decks = this.decks || new Map();
    for (let i = Math.floor((Math.min(ax, bx) - hw) / C); i <= Math.floor((Math.max(ax, bx) + hw) / C); i++)
      for (let j = Math.floor((Math.min(az, bz) - hw) / C); j <= Math.floor((Math.max(az, bz) + hw) / C); j++) {
        const k = i * 100003 + j; if (!this.decks.has(k)) this.decks.set(k, []); this.decks.get(k).push(s);
      }
  }
  height(x, z) {
    const g = this.ground(x, z); if (!this.decks) return g;
    const list = this.decks.get(Math.floor(x / 32) * 100003 + Math.floor(z / 32)); if (!list) return g;
    let best = g;
    for (const s of list) {
      const dx = s.bx - s.ax, dz = s.bz - s.az, L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - s.ax) * dx + (z - s.az) * dz) / L));
      if (Math.hypot(x - s.ax - dx * t, z - s.az - dz * t) < s.hw) best = Math.max(best, s.ya + (s.yb - s.ya) * t);
    }
    return best;
  }
  ground(x, z) {
    if (!this.o) return this.innerHeight(x, z);
    const m = Math.max(Math.abs(x), Math.abs(z)), E = this.E;
    if (m <= E - 150) return this.innerHeight(x, z);
    const ho = this.outerHeight(x, z); if (m >= E) return ho;
    const t = (m - (E - 150)) / 150, k = t * t * (3 - 2 * t), hi = this.innerHeight(x, z);
    return hi + (ho - hi) * k;
  }
  // rejilla fina (1-2 m) donde Darío dibujó desniveles: la de 8 m no da para un talud
  setFine(x0, z0, x1, z1, cell) {
    const nx = Math.round((x1 - x0) / cell) + 1, nz = Math.round((z1 - z0) / cell) + 1, h = new Float32Array(nx * nz);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) h[j * nx + i] = this.innerHeight(x0 + i * cell, z0 + j * cell);
    this.f = { x0, z0, x1, z1, nx, nz, cell, h };
  }
  innerHeight(x, z) {
    const f = this.f;
    if (f && x >= f.x0 && x <= f.x1 && z >= f.z0 && z <= f.z1) {
      const fx = (x - f.x0) / f.cell, fz = (z - f.z0) / f.cell, i = Math.min(f.nx - 2, Math.floor(fx)), j = Math.min(f.nz - 2, Math.floor(fz)), u = fx - i, v = fz - j, h = f.h, n = f.nx;
      return (h[j * n + i] * (1 - u) + h[j * n + i + 1] * u) * (1 - v) + (h[(j + 1) * n + i] * (1 - u) + h[(j + 1) * n + i + 1] * u) * v;
    }
    const fx = (x - this.ox) / this.cell, fz = (z - this.oz) / this.cell;
    const i = Math.max(0, Math.min(this.n - 2, Math.floor(fx))), j = Math.max(0, Math.min(this.n - 2, Math.floor(fz)));
    const u = Math.max(0, Math.min(1, fx - i)), v = Math.max(0, Math.min(1, fz - j)), n = this.n, h = this.h;
    const a = h[j * n + i], b = h[j * n + i + 1], c = h[(j + 1) * n + i], d = h[(j + 1) * n + i + 1];
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }
}

// Rejilla espacial de segmentos para colisiones 2D (planta)
export class Colliders {
  constructor(cell = 8) { this.cell = cell; this.map = new Map(); }
  key(i, j) { return i * 100003 + j; }
  addSegment(ax, az, bx, bz, kind = 'wall') {
    const seg = { ax, az, bx, bz, kind };
    const c = this.cell;
    const i0 = Math.floor(Math.min(ax, bx) / c), i1 = Math.floor(Math.max(ax, bx) / c);
    const j0 = Math.floor(Math.min(az, bz) / c), j1 = Math.floor(Math.max(az, bz) / c);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const k = this.key(i, j); if (!this.map.has(k)) this.map.set(k, []); this.map.get(k).push(seg);
    }
  }
  // planta de un edificio, para saber si un punto ha quedado dentro (los muros son solo segmentos finos)
  addArea(pts) {
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (const [x, z] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
    const a = { pts, x0, x1, z0, z1 }, c = this.cell; this.areas = this.areas || new Map();
    for (let i = Math.floor(x0 / c); i <= Math.floor(x1 / c); i++) for (let j = Math.floor(z0 / c); j <= Math.floor(z1 / c); j++) {
      const k = this.key(i, j); if (!this.areas.has(k)) this.areas.set(k, []); this.areas.get(k).push(a);
    }
  }
  inside(x, z) {
    const list = this.areas?.get(this.key(Math.floor(x / this.cell), Math.floor(z / this.cell))); if (!list) return null;
    for (const a of list) {
      if (x < a.x0 || x > a.x1 || z < a.z0 || z > a.z1) continue;
      let o = false; const P = a.pts;
      for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
        const [xi, zi] = P[i], [xj, zj] = P[j];
        if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) o = !o;
      }
      if (o) return a;
    }
    return null;
  }
  // si (pos) está dentro de un edificio, lo saca por la pared más cercana, a r de ella; devuelve la normal hacia fuera
  expel(pos, r, depth = 0) {
    const a = this.inside(pos.x, pos.z); if (!a) return null;
    const P = a.pts; let best = null, bd = Infinity;
    for (let i = 0; i < P.length; i++) {
      const [ax, az] = P[i], [bx, bz] = P[(i + 1) % P.length], dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz || 1e-9;
      const t = Math.max(0, Math.min(1, ((pos.x - ax) * dx + (pos.z - az) * dz) / L)), qx = ax + dx * t, qz = az + dz * t, d = Math.hypot(pos.x - qx, pos.z - qz);
      if (d < bd) { bd = d; best = { qx, qz }; }
    }
    let nx = best.qx - pos.x, nz = best.qz - pos.z; const l = Math.hypot(nx, nz) || 1; nx /= l; nz /= l;
    pos.x = best.qx + nx * (r + 0.05); pos.z = best.qz + nz * (r + 0.05);
    if (depth < 3 && this.inside(pos.x, pos.z)) return this.expel(pos, r, depth + 1); // salió a otro edificio pegado
    return { x: nx, z: nz };
  }
  addPolygon(pts, kind) { for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; this.addSegment(a[0], a[1], b[0], b[1], kind); } }
  // Primera intersección del segmento a→b con edificios (fracción 0..1), para que la cámara no atraviese paredes
  raycast(ax, az, bx, bz) {
    const c = this.cell; let best = 1; const seen = new Set();
    const i0 = Math.floor(Math.min(ax, bx) / c), i1 = Math.floor(Math.max(ax, bx) / c), j0 = Math.floor(Math.min(az, bz) / c), j1 = Math.floor(Math.max(az, bz) / c);
    const rx = bx - ax, rz = bz - az;
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const list = this.map.get(this.key(i, j)); if (!list) continue;
      for (const s of list) {
        if (s.kind !== 'building' || seen.has(s)) continue; seen.add(s);
        const sx = s.bx - s.ax, sz = s.bz - s.az, den = rx * sz - rz * sx; if (Math.abs(den) < 1e-9) continue;
        const t = ((s.ax - ax) * sz - (s.az - az) * sx) / den, u = ((s.ax - ax) * rz - (s.az - az) * rx) / den;
        if (t > 0 && t < best && u >= 0 && u <= 1) best = t;
      }
    }
    return best;
  }
  // Punto más cercano de una pared de edificio a (x, z), con la normal que apunta hacia (x, z)
  nearest(x, z, maxD, kind = 'building') {
    const c = this.cell; let best = null, bd = maxD;
    for (let i = Math.floor((x - maxD) / c); i <= Math.floor((x + maxD) / c); i++) for (let j = Math.floor((z - maxD) / c); j <= Math.floor((z + maxD) / c); j++) {
      for (const s of this.map.get(this.key(i, j)) || []) {
        if (s.kind !== kind) continue;
        const dx = s.bx - s.ax, dz = s.bz - s.az, L = dx * dx + dz * dz || 1e-9;
        const t = Math.max(0.15, Math.min(0.85, ((x - s.ax) * dx + (z - s.az) * dz) / L)), qx = s.ax + dx * t, qz = s.az + dz * t, d = Math.hypot(x - qx, z - qz);
        if (d < bd && d > 0.05) { bd = d; best = { x: qx, z: qz, nx: (x - qx) / d, nz: (z - qz) / d }; }
      }
    }
    return best;
  }
  // Empuja un círculo fuera de los segmentos cercanos. Devuelve la normal acumulada (o null).
  resolve(pos, r) {
    const c = this.cell, seen = new Set(); let hit = null;
    for (let it = 0; it < 3; it++) {
      const i0 = Math.floor((pos.x - r) / c), i1 = Math.floor((pos.x + r) / c), j0 = Math.floor((pos.z - r) / c), j1 = Math.floor((pos.z + r) / c);
      let moved = false; seen.clear();
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
        const list = this.map.get(this.key(i, j)); if (!list) continue;
        for (const s of list) {
          if (seen.has(s)) continue; seen.add(s);
          const dx = s.bx - s.ax, dz = s.bz - s.az, L = dx * dx + dz * dz || 1e-9;
          let t = ((pos.x - s.ax) * dx + (pos.z - s.az) * dz) / L; t = Math.max(0, Math.min(1, t));
          const qx = s.ax + dx * t, qz = s.az + dz * t; let nx = pos.x - qx, nz = pos.z - qz;
          const d = Math.hypot(nx, nz);
          if (d < r) {
            if (d < 1e-6) { nx = -dz; nz = dx; } const nl = Math.hypot(nx, nz) || 1; nx /= nl; nz /= nl;
            pos.x += nx * (r - d); pos.z += nz * (r - d); moved = true;
            hit = hit || { x: 0, z: 0 }; hit.x += nx; hit.z += nz;
          }
        }
      }
      if (!moved) break;
    }
    if (hit) { const l = Math.hypot(hit.x, hit.z) || 1; hit.x /= l; hit.z /= l; }
    return hit;
  }
}

// Materiales que se encienden de noche (los controla daynight.js)
export const night = { windows: [], lamps: [] };
function litWindows(mat, emap) {
  mat.emissive = new THREE.Color(0xffffff); mat.emissiveMap = emap; mat.emissiveIntensity = 0;
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vLitPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvLitPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    // cada ventana (celda de 2 m x 3 m) se enciende o no según un hash de su posición
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vLitPos;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      { vec3 cell = floor(vec3(vLitPos.x / 2.0, vLitPos.y / 3.0, vLitPos.z / 2.0));
        totalEmissiveRadiance *= step(0.62, fract(sin(dot(cell, vec3(12.9898, 78.233, 37.719))) * 43758.5453)); }`);
  };
  mat.customProgramCacheKey = () => 'litwindows';
  night.windows.push(mat); return mat;
}

// ---------- utilidades de geometría ----------
function signedArea(p) { let a = 0; for (let i = 0; i < p.length; i++) { const q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; } return a / 2; }

// Rectángulo orientado mínimo (por aristas)
function obb(pts) {
  let best = null;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 0.5) continue;
    const ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
    let mnu = Infinity, mxu = -Infinity, mnv = Infinity, mxv = -Infinity;
    for (const p of pts) { const u = p[0] * ux + p[1] * uz, v = -p[0] * uz + p[1] * ux; mnu = Math.min(mnu, u); mxu = Math.max(mxu, u); mnv = Math.min(mnv, v); mxv = Math.max(mxv, v); }
    const area = (mxu - mnu) * (mxv - mnv);
    if (!best || area < best.area) best = { area, ux, uz, mnu, mxu, mnv, mxv };
  }
  return best;
}

// Recorta un polígono por un semiplano (n·p <= c)
function clipHalf(pts, nx, nz, c) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const da = a[0] * nx + a[1] * nz - c, db = b[0] * nx + b[1] * nz - c;
    if (da <= 0) out.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) { const t = da / (da - db); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
  }
  return out;
}

class GeoBuilder {
  constructor() { this.pos = []; this.uv = []; this.idx = []; this.col = []; this.tint = [1, 1, 1]; }
  quad(a, b, c, d, uva, uvb, uvc, uvd) { // a,b,c,d en sentido antihorario visto desde fuera
    const o = this.pos.length / 3; this.pos.push(...a, ...b, ...c, ...d); this.uv.push(...uva, ...uvb, ...uvc, ...uvd);
    for (let i = 0; i < 4; i++) this.col.push(...this.tint);
    this.idx.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  tri(a, b, c, uva, uvb, uvc) { const o = this.pos.length / 3; this.pos.push(...a, ...b, ...c); this.uv.push(...uva, ...uvb, ...uvc); for (let i = 0; i < 3; i++) this.col.push(...this.tint); this.idx.push(o, o + 1, o + 2); }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setIndex(this.idx); g.computeVertexNormals(); return g;
  }
}

// ---------- edificios ----------
// style 'rural': piedra y teja (Valde). style 'urban': bloques revocados con lonjas en planta baja (Beraun).
export function buildBuildings(data, terrain, tex, colliders) {
  const urban = data.style === 'urban';
  const facade = new GeoBuilder(), plaster = new GeoBuilder(), facadeGround = new GeoBuilder(), plasterGround = new GeoBuilder(), stone = new GeoBuilder(), roof = new GeoBuilder(), eaves = new GeoBuilder(), flat = new GeoBuilder();
  const urbanB = (tex.urban || []).map(() => new GeoBuilder()), groundB = (tex.urbanGround || []).map(() => new GeoBuilder());
  const ashlar = new GeoBuilder(), brick = new GeoBuilder(); let church = null; const chimneys = [];
  let seed = 1; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const b of data.buildings) {
    let pts = b.p.slice(); if (signedArea(pts) > 0) pts.reverse(); // orden que deja la normal de los muros hacia fuera
    if (pts.length < 3) continue;
    if (colliders) colliders.addArea(pts);
    let base = Infinity, top = -Infinity;
    for (const p of pts) { const h = terrain.height(p[0], p[1]); base = Math.min(base, h); top = Math.max(top, h); }
    const floors = Math.max(1, b.f || 1);
    const floorH = urban ? 2.85 : 2.9;
    const isChurch = data.church && b.id === data.church && Math.abs(signedArea(pts)) > 100;
    let eave = isChurch ? top + 5.6 : b.eave != null ? Math.max(b.eave, top + 2.4) : top + (b.use === 'agr' ? 3.2 + 0.6 * rnd() : floors * floorH + (urban ? 1.2 : 0.3));
    const y0 = base - 0.6;
    const ob = obb(pts); if (!ob) continue;
    const width = ob.mxv - ob.mnv, length = ob.mxu - ob.mnu;
    let rx = ob.ux, rz = ob.uz, mid = (ob.mnv + ob.mxv) / 2, half = width / 2;
    if (width > length) { rx = -ob.uz; rz = ob.ux; mid = -(ob.mnu + ob.mxu) / 2; half = length / 2; } // la normal (-rz, rx) es -u
    const nx = -rz, nz = rx;
    const isFlat = b.flat === true;
    let slope = 0.32;
    if (b.top != null && !isFlat) slope = THREE.MathUtils.clamp((b.top - eave) / Math.max(1, half), 0.12, 0.42);
    const roofY = isFlat ? () => eave : (x, z) => eave + slope * (half - Math.abs(x * nx + z * nz - mid));
    // materiales de este edificio
    let wallB, gB = null, tileW = 4, tileH = 3;
    if (isChurch) wallB = ashlar;
    else if (urban && b.use !== 'agr') {
      const k = Math.floor(rnd() * urbanB.length); wallB = urbanB[k]; tileW = 3; tileH = floorH;
      if (b.use !== 'ind' && floors >= 3) gB = groundB[Math.floor(rnd() * groundB.length)];
    } else if (b.use === 'agr') wallB = stone;
    else { const k = rnd() < 0.35 ? 1 : 0; wallB = k ? plaster : facade; gB = k ? (floors > 1 && rnd() < 0.7 ? facadeGround : plasterGround) : facadeGround; } // revocadas arriba y de piedra abajo, como en la calle del Río
    const t = 0.82 + rnd() * 0.25;
    for (const gb of [facade, plaster, facadeGround, plasterGround, stone, ashlar, ...urbanB, ...groundB]) gb.tint = [t, t * (0.97 + rnd() * 0.05), t * (0.95 + rnd() * 0.05)];
    if (isChurch) ashlar.tint = [1, 1, 1];
    const age = rnd(); roof.tint = [0.75 + 0.3 * (1 - age), 0.72 + 0.25 * (1 - age) + 0.08 * age, 0.7 + 0.2 * age];
    const gH = urban ? 3.6 : 3.0, gTop = top + gH; // planta baja
    const u0 = rnd(); // la puerta cae en un sitio distinto en cada casa
    const cornice = rnd() < 0.5; let ccx = 0, ccz = 0; for (const p of pts) { ccx += p[0] / pts.length; ccz += p[1] / pts.length; }
    const parapet = isFlat ? 0.9 : 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], c = pts[(i + 1) % pts.length];
      const L = Math.hypot(c[0] - a[0], c[1] - a[1]); if (L < 0.05) continue;
      const nTiles = wallB === stone ? L / tileW : Math.max(1, Math.round(L / tileW));
      const uScale = nTiles / L;
      const da = a[0] * nx + a[1] * nz - mid, dc = c[0] * nx + c[1] * nz - mid;
      const segs = [[a, 0], [c, L]];
      if (!isFlat && da * dc < 0) { const tt = da / (da - dc); segs.splice(1, 0, [[a[0] + (c[0] - a[0]) * tt, a[1] + (c[1] - a[1]) * tt], L * tt]); }
      for (let s = 0; s < segs.length - 1; s++) {
        const [p, lp] = segs[s], [q, lq] = segs[s + 1];
        const wTop = eave + parapet;
        if (!urban && gB) {
          // casa de pueblo: las plantas se cuentan desde el alero hacia abajo (la de abajo con puerta);
          // donde la calle baja en cuesta, queda un zócalo de mampostería sin ventanas
          const rows = Math.max(1, Math.min(floors, Math.floor((wTop - top + 0.4) / tileH)));
          const rBot = wTop - rows * tileH;
          if (rBot > y0) stone.quad([p[0], y0, p[1]], [q[0], y0, q[1]], [q[0], rBot, q[1]], [p[0], rBot, p[1]],
            [lp / 4, 0], [lq / 4, 0], [lq / 4, (rBot - y0) / 3], [lp / 4, (rBot - y0) / 3]);
          gB.quad([p[0], rBot, p[1]], [q[0], rBot, q[1]], [q[0], rBot + tileH, q[1]], [p[0], rBot + tileH, p[1]],
            [u0 + lp / 8, 0], [u0 + lq / 8, 0], [u0 + lq / 8, 1], [u0 + lp / 8, 1]);
          if (rows > 1) wallB.quad([p[0], rBot + tileH, p[1]], [q[0], rBot + tileH, q[1]], [q[0], wTop, q[1]], [p[0], wTop, p[1]],
            [lp * uScale, 0], [lq * uScale, 0], [lq * uScale, rows - 1], [lp * uScale, rows - 1]);
          // cornisa de ladrillo bajo el alero (en la mitad de las casas), un pelín salida del muro
          if (cornice) {
          const ex = q[0] - p[0], ez = q[1] - p[1], el = Math.hypot(ex, ez) || 1; let ox = ez / el, oz = -ex / el;
          if ((p[0] - ccx) * ox + (p[1] - ccz) * oz < 0) { ox = -ox; oz = -oz; }
          const o = 0.04, P0 = [p[0] + ox * o, p[1] + oz * o], Q0 = [q[0] + ox * o, q[1] + oz * o];
          brick.quad([P0[0], wTop - 0.36, P0[1]], [Q0[0], wTop - 0.36, Q0[1]], [Q0[0], wTop, Q0[1]], [P0[0], wTop, P0[1]], [lp / 2, 0], [lq / 2, 0], [lq / 2, 0.75], [lp / 2, 0.75]);
          }
        } else if (gB && gTop < wTop - (urban ? 2 : 0.4)) {
          // planta baja con su textura; encima, las plantas de viviendas alineadas desde arriba
          const gu = (urban ? Math.max(1, Math.round(L / 4)) : nTiles) / L;
          const gBot = gTop - gH;
          gB.quad([p[0], gBot, p[1]], [q[0], gBot, q[1]], [q[0], gTop, q[1]], [p[0], gTop, p[1]],
            [lp * gu, 0], [lq * gu, 0], [lq * gu, 1], [lp * gu, 1]);
          if (gBot > y0) // zócalo liso donde la calle baja en pendiente
            gB.quad([p[0], y0, p[1]], [q[0], y0, q[1]], [q[0], gBot, q[1]], [p[0], gBot, p[1]], [0.01, 0.9], [0.06, 0.9], [0.06, 0.95], [0.01, 0.95]);
          const v0 = (gTop - wTop) / tileH;
          wallB.quad([p[0], gTop, p[1]], [q[0], gTop, q[1]], [q[0], wTop, q[1]], [p[0], wTop, p[1]],
            [lp * uScale, v0], [lq * uScale, v0], [lq * uScale, 0], [lp * uScale, 0]);
        } else {
          const vTop = (wTop - y0) / tileH;
          wallB.quad([p[0], y0, p[1]], [q[0], y0, q[1]], [q[0], wTop, q[1]], [p[0], wTop, p[1]],
            [lp * uScale, 0], [lq * uScale, 0], [lq * uScale, vTop], [lp * uScale, vTop]);
        }
        if (isFlat) { // cara interior del peto
          flat.quad([q[0], eave, q[1]], [p[0], eave, p[1]], [p[0], wTop, p[1]], [q[0], wTop, q[1]], [0, 0], [L / 3, 0], [L / 3, 0.3], [0, 0.3]);
          flat.quad([p[0], wTop, p[1]], [q[0], wTop, q[1]], [q[0], wTop, q[1]], [p[0], wTop, p[1]], [0, 0], [0, 0], [0, 0], [0, 0]);
          continue;
        }
        const hp = roofY(p[0], p[1]), hq = roofY(q[0], q[1]);
        const gable = urban || isChurch ? wallB : stone;
        if (hp - eave > 0.05 || hq - eave > 0.05) {
          if (urban && !isChurch) gable.quad([p[0], eave, p[1]], [q[0], eave, q[1]], [q[0], hq, q[1]], [p[0], hp, p[1]],
            [0.02, 0.02], [0.03, 0.02], [0.03, 0.03], [0.02, 0.03]); // revoco liso (esquina sin ventana)
          else gable.quad([p[0], eave, p[1]], [q[0], eave, q[1]], [q[0], hq, q[1]], [p[0], hp, p[1]],
            [lp / 4, 0], [lq / 4, 0], [lq / 4, (hq - eave) / 3], [lp / 4, (hp - eave) / 3]);
        }
      }
      colliders.addSegment(a[0], a[1], c[0], c[1], 'building');
    }
    if (isFlat) {
      const shape = pts.map(p => new THREE.Vector2(p[0], p[1]));
      for (const tr of THREE.ShapeUtils.triangulateShape(shape, [])) {
        const V = tr.map(k => [pts[k][0], eave + 0.05, pts[k][1]]), U = tr.map(k => [pts[k][0] / 3, pts[k][1] / 3]);
        const ux = V[1][0] - V[0][0], uz = V[1][2] - V[0][2], wx = V[2][0] - V[0][0], wz = V[2][2] - V[0][2];
        if (uz * wx - ux * wz < 0) flat.tri(V[0], V[2], V[1], U[0], U[2], U[1]); else flat.tri(V[0], V[1], V[2], U[0], U[1], U[2]);
      }
      continue;
    }
    if (isChurch) church = { pts, base, top, y0, eave, slope, half, mid, rx, rz, nx, nz };
    const ov = 0.35;
    const grown = offsetPolygon(pts, ov);
    for (const side of [1, -1]) {
      const half_ = clipHalf(grown, side * nx, side * nz, side * mid);
      if (half_.length < 3) continue;
      const shape = half_.map(p => new THREE.Vector2(p[0], p[1]));
      const tris = THREE.ShapeUtils.triangulateShape(shape, []);
      for (const tr of tris) {
        const P = tr.map(k => half_[k]);
        const V = P.map(p => [p[0], roofY(p[0], p[1]) + 0.05, p[1]]);
        const U = P.map(p => [(p[0] * rx + p[1] * rz) / 2.2, (p[0] * nx + p[1] * nz) / 2.2]);
        const ux = V[1][0] - V[0][0], uz = V[1][2] - V[0][2], wx = V[2][0] - V[0][0], wz = V[2][2] - V[0][2];
        if (uz * wx - ux * wz < 0) roof.tri(V[0], V[2], V[1], U[0], U[2], U[1]); else roof.tri(V[0], V[1], V[2], U[0], U[1], U[2]);
      }
    }
    if (!urban && !isChurch && b.use === 'res' && rnd() < 0.75) { // chimenea encalada con sombrerete, a un lado de la cumbrera
      const along = (rnd() - 0.5) * length * 0.6, side = (rnd() - 0.5) * half * 0.8;
      const hx = ccx + rx * along + nx * side, hz = ccz + rz * along + nz * side;
      chimneys.push([hx, roofY(hx, hz), hz, rnd() < 0.6]);
    }
    for (let i = 0; i < grown.length; i++) {
      const a = grown[i], c = grown[(i + 1) % grown.length];
      const ha = roofY(a[0], a[1]) + 0.05, hc = roofY(c[0], c[1]) + 0.05;
      eaves.quad([a[0], ha - 0.18, a[1]], [c[0], hc - 0.18, c[1]], [c[0], hc, c[1]], [a[0], ha, a[1]], [0, 0], [1, 0], [1, 1], [0, 1]);
    }
  }
  const group = new THREE.Group();
  const add = (gb, mat) => { if (!gb.pos.length) return; const m = new THREE.Mesh(gb.build(), mat); m.castShadow = m.receiveShadow = true; group.add(m); };
  add(facade, litWindows(new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facade, roughness: 0.92 }), tex.facadeNight));
  add(plaster, litWindows(new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadePlaster, roughness: 0.95 }), tex.facadePlasterNight));
  add(stone, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.stone, roughness: 0.95 }));
  add(ashlar, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.churchStone, roughness: 0.95 }));
  add(facadeGround, litWindows(new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadeGround, roughness: 0.92 }), tex.facadeGroundNight));
  add(plasterGround, litWindows(new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadePlasterGround, roughness: 0.95 }), tex.facadePlasterGroundNight));
  if (church) group.add(buildChurchDetails(church, terrain, tex, colliders));
  urbanB.forEach((gb, k) => add(gb, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.urban[k], roughness: 0.9 })));
  groundB.forEach((gb, k) => add(gb, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.urbanGround[k], roughness: 0.85 })));
  add(flat, new THREE.MeshStandardMaterial({ map: tex.flatRoof, roughness: 1, vertexColors: true }));
  add(roof, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.roof, roughness: 0.8, side: THREE.DoubleSide }));
  add(eaves, new THREE.MeshStandardMaterial({ color: 0x5a2c1c, roughness: 0.9, side: THREE.DoubleSide }));
  add(brick, new THREE.MeshStandardMaterial({ map: tex.brick, roughness: 0.9 }));
  if (chimneys.length) group.add(roofExtras(chimneys));
  return group;
}
// chimeneas blancas con sombrerete y antenas de televisión en los tejados
function roofExtras(list) {
  const g = new THREE.Group(), M = new THREE.Matrix4(), one = new THREE.Vector3(1, 1, 1), q = new THREE.Quaternion();
  const stack = new THREE.BoxGeometry(0.55, 1.4, 0.55); stack.translate(0, 0.55, 0);
  const cap = new THREE.BoxGeometry(0.75, 0.08, 0.75); cap.translate(0, 1.55, 0);
  const pipe = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 6); pipe.translate(0, 1.6, 0);
  const white = new THREE.InstancedMesh(stack, new THREE.MeshStandardMaterial({ color: 0xeeeae2, roughness: 0.9 }), list.length);
  const caps = new THREE.InstancedMesh(mergeGeometries([cap, pipe]), new THREE.MeshStandardMaterial({ color: 0x9a9da0, metalness: 0.6, roughness: 0.4 }), list.length);
  const ants = list.filter(c => c[3]);
  const mast = new THREE.CylinderGeometry(0.025, 0.025, 2.6, 4); mast.translate(0.9, 1.3, 0);
  const boom = new THREE.BoxGeometry(0.03, 0.03, 1.2); boom.translate(0.9, 2.4, 0);
  const els = [0, 1, 2, 3].map(k => { const e = new THREE.BoxGeometry(0.5 - k * 0.07, 0.02, 0.02); e.translate(0.9, 2.42, -0.5 + k * 0.33); return e; });
  const ant = new THREE.InstancedMesh(mergeGeometries([mast, boom, ...els]), new THREE.MeshStandardMaterial({ color: 0x777b80, metalness: 0.7, roughness: 0.4 }), ants.length);
  list.forEach(([x, y, z], i) => { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (x * 7 + z * 3) % 6.28); M.compose(new THREE.Vector3(x, y - 0.2, z), q, one); white.setMatrixAt(i, M); caps.setMatrixAt(i, M); });
  ants.forEach(([x, y, z], i) => { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (x * 5 + z) % 6.28); M.compose(new THREE.Vector3(x, y - 0.2, z), q, one); ant.setMatrixAt(i, M); });
  white.castShadow = true; g.add(white, caps, ant); return g;
}

// Espadaña (campanario de muro típico de Zamora), portada y campanas
function buildChurchDetails(c, terrain, tex, colliders) {
  const group = new THREE.Group();
  const stoneTex = tex.churchStone.clone(); stoneTex.needsUpdate = true; stoneTex.repeat.set(0.25, 1 / 3);
  const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTex, roughness: 0.95, color: 0xeeeae2 });
  const graniteTex = tex.ashlar.clone(); graniteTex.needsUpdate = true; graniteTex.repeat.set(0.5, 1);
  const granite = new THREE.MeshStandardMaterial({ map: graniteTex, roughness: 0.9, color: 0xc8c4bc });
  // extremos del eje largo: la espadaña va en el hastial de poniente (x menor)
  let mn = Infinity, mx = -Infinity;
  for (const p of c.pts) { const u = p[0] * c.rx + p[1] * c.rz; mn = Math.min(mn, u); mx = Math.max(mx, u); }
  const west = c.rx > 0 ? mn : mx, dirOut = c.rx > 0 ? -1 : 1; // hacia fuera del templo
  const cx = c.rx * west + c.nx * c.mid, cz = c.rz * west + c.nz * c.mid;
  const ridge = c.eave + c.slope * c.half, H = ridge + 6.2 - c.y0, W = 4.4, T = 1.0;
  const yb = ridge - c.y0 + 0.5, yTop = yb + 2.3; // vanos de las campanas y arranque del remate apuntado
  const sh = new THREE.Shape();
  sh.moveTo(-W / 2 - 0.5, 0); sh.lineTo(W / 2 + 0.5, 0); sh.lineTo(W / 2 + 0.5, yb - 2.2); sh.lineTo(W / 2, yb - 1.4); // contrafuerte que se estrecha
  sh.lineTo(W / 2, yTop); sh.quadraticCurveTo(W / 2 - 0.2, H - 1.2, 0.08, H); sh.lineTo(-0.08, H); sh.quadraticCurveTo(-W / 2 + 0.2, H - 1.2, -W / 2, yTop);
  sh.lineTo(-W / 2, yb - 1.4); sh.lineTo(-W / 2 - 0.5, yb - 2.2); sh.closePath();
  const arch = (x, y, w, h) => { const a = new THREE.Path(); a.moveTo(x - w / 2, y); a.lineTo(x + w / 2, y); a.lineTo(x + w / 2, y + h - w / 2); a.absarc(x, y + h - w / 2, w / 2, 0, Math.PI, false); a.closePath(); return a; };
  const bells = [[-1.0, yb, 1.05, 2.0], [1.0, yb, 1.05, 2.0]];
  for (const b of bells) sh.holes.push(arch(...b));
  const g = new THREE.ExtrudeGeometry(sh, { depth: T, bevelEnabled: false, curveSegments: 8 });
  g.translate(0, 0, -T / 2);
  const esp = new THREE.Mesh(g, stoneMat); esp.castShadow = esp.receiveShadow = true;
  // el plano del muro es perpendicular a la cumbrera
  esp.position.set(cx + c.rx * dirOut * (T / 2 - 0.2), c.y0, cz + c.rz * dirOut * (T / 2 - 0.2));
  esp.rotation.y = Math.atan2(c.rx, c.rz);
  group.add(esp);
  group.userData.bellTower = { x: cx, z: cz, bells: null };
  // campanas de bronce
  const bellG = new THREE.LatheGeometry([[0, 0.62], [0.12, 0.6], [0.2, 0.5], [0.24, 0.25], [0.34, 0.02], [0.36, 0], [0, 0.04]].map(([x, y]) => new THREE.Vector2(x, y)), 16);
  const bronze = new THREE.MeshStandardMaterial({ color: 0x6b5330, metalness: 0.8, roughness: 0.35 });
  const swing = [];
  for (const [bx, by, bw, bh] of bells) {
    const pivot = new THREE.Group(); pivot.position.set(bx, by + bh - bw / 2, 0); esp.add(pivot); swing.push(pivot);
    const m = new THREE.Mesh(bellG, bronze); m.scale.setScalar(bw * 0.85);
    m.position.set(0, -0.62 * bw * 0.85, 0); pivot.add(m);
    const yoke = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.12, 0.14), new THREE.MeshStandardMaterial({ color: 0x3a2a1a })); yoke.position.set(bx, by + bh - bw / 2 + 0.06, 0); esp.add(yoke);
  }
  group.userData.bellTower.bells = swing;
  const ledge = new THREE.Mesh(new THREE.BoxGeometry(W + 0.3, 0.18, T + 0.25), granite); ledge.position.set(0, yb - 0.09, 0); esp.add(ledge);
  // poyo de granito al pie de los muros y pórtico con pilares de ladrillo y rejas en la fachada sur
  const P = c.pts, n = P.length; let best = null;
  for (let i = 0; i < n; i++) {
    const a = P[i], b = P[(i + 1) % n], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1) continue;
    let ox = -(b[1] - a[1]) / L, oz = (b[0] - a[0]) / L; // normal hacia fuera
    let cx0 = 0, cz0 = 0; for (const p of P) { cx0 += p[0] / n; cz0 += p[1] / n; }
    if (((a[0] + b[0]) / 2 - cx0) * ox + ((a[1] + b[1]) / 2 - cz0) * oz < 0) { ox = -ox; oz = -oz; }
    const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, ya = terrain.height(mx, mz);
    const pt = tex.ashlar.clone(); pt.needsUpdate = true; pt.repeat.set(L / 2, 0.3);
    const poyo = new THREE.Mesh(new THREE.BoxGeometry(L, 0.6, 0.5), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.9, color: 0xb8b4ac }));
    poyo.position.set(mx + ox * 0.25, ya + 0.1, mz + oz * 0.25); poyo.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]) - Math.PI / 2; poyo.castShadow = true; group.add(poyo);
    if (oz > 0.85 && L > 4 && (!best || mz > best.mz)) best = { a, b, L, ox, oz, mz };
  }
  if (best) {
    const { a, b, L, ox, oz } = best, rot = Math.atan2(b[0] - a[0], b[1] - a[1]) - Math.PI / 2;
    const bt = tex.brick.clone(); bt.needsUpdate = true; bt.repeat.set(0.25, 6);
    const brickMat = new THREE.MeshStandardMaterial({ map: bt, roughness: 0.9 }), dark = new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: 1 }), bars = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, metalness: 0.5, roughness: 0.5 });
    const k = 4, yb0 = Math.min(terrain.height(a[0], a[1]), terrain.height(b[0], b[1]));
    const beam = new THREE.Mesh(new THREE.BoxGeometry(L, 0.25, 0.3), new THREE.MeshStandardMaterial({ color: 0x6a4428, roughness: 0.9 }));
    beam.position.set((a[0] + b[0]) / 2 + ox * 0.2, yb0 + 3.1, (a[1] + b[1]) / 2 + oz * 0.2); beam.rotation.y = rot; group.add(beam);
    for (let i = 0; i < k; i++) {
      const t = (i + 0.5) / k, x = a[0] + (b[0] - a[0]) * t + ox * 0.2, z = a[1] + (b[1] - a[1]) * t + oz * 0.2;
      if (i < k - 1) { const tp = (i + 1) / k, px = a[0] + (b[0] - a[0]) * tp + ox * 0.2, pz = a[1] + (b[1] - a[1]) * tp + oz * 0.2;
        const pil = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.0, 0.45), brickMat); pil.position.set(px, yb0 + 1.5, pz); pil.rotation.y = rot; pil.castShadow = true; group.add(pil); }
      // reja de barrotes con su puerta de chapa abajo
      const w = L / k - 0.5, gr = new THREE.Group(); gr.position.set(x, yb0 + 0.6, z); gr.rotation.y = rot; group.add(gr);
      const back = new THREE.Mesh(new THREE.PlaneGeometry(L / k - 0.45, 2.4), dark); back.position.set(0, 0.9, -0.12); gr.add(back);
      for (let j = 0; j <= w / 0.14; j++) { const bar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 2.2, 0.025), bars); bar.position.set(-w / 2 + j * 0.14, 1.1, 0); gr.add(bar); }
      for (const yy of [0.05, 1.0, 2.2]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.05, 0.04), bars); rail.position.set(0, yy, 0); gr.add(rail); }
    }
  }
  // cruz de forja en lo alto
  const iron = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, metalness: 0.7, roughness: 0.5 });
  const cv = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), iron); cv.position.set(0, H + 0.55, 0); esp.add(cv);
  const ch = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.08), iron); ch.position.set(0, H + 0.75, 0); esp.add(ch);
  // (la iglesia de Valde no tiene puerta en el hastial de la espadaña: se entra por el pórtico del sur)
  return group;
}

// Bancos de la plaza (madera sobre patas de hierro). data.plaza.benches = [[x, z, rumbo°], ...]: rumbo = hacia dónde mira quien se sienta
export function buildPlaza(data, terrain, colliders) {
  const group = new THREE.Group(), P = data.plaza; if (!P) return group;
  const wood = new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: 0.85 }), iron = new THREE.MeshStandardMaterial({ color: 0x232323, metalness: 0.6, roughness: 0.5 });
  for (const [x, z, deg] of P.benches || []) {
    const a = THREE.MathUtils.degToRad(deg), bench = new THREE.Group();
    bench.position.set(x, terrain.height(x, z), z); bench.rotation.y = Math.atan2(Math.sin(a), -Math.cos(a)); // 0° = norte
    for (let k = 0; k < 3; k++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.12), wood); s.position.set(0, 0.45, 0.16 - k * 0.15); s.castShadow = true; bench.add(s); }
    for (let k = 0; k < 2; k++) { const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.11, 0.035), wood); s.position.set(0, 0.62 + k * 0.16, -0.2); s.rotation.x = -0.15; s.castShadow = true; bench.add(s); }
    for (const sx of [-0.75, 0.75]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.45), iron); leg.position.set(sx, 0.22, 0); bench.add(leg);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.05), iron); back.position.set(sx, 0.68, -0.21); bench.add(back);
    }
    group.add(bench);
    const fx = Math.sin(a), fz = -Math.cos(a), rx = -fz, rz = fx; // frente y lado (en planta)
    colliders.addSegment(x - rx * 0.9, z - rz * 0.9, x + rx * 0.9, z + rz * 0.9, 'wall');
  }
  return group;
}

function offsetPolygon(pts, d) {
  // desplaza cada arista hacia fuera (polígono antihorario en x,z => fuera es a la derecha)
  const n = pts.length, out = [];
  const sgn = signedArea(pts) > 0 ? 1 : -1;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const e1 = norm([p1[0] - p0[0], p1[1] - p0[1]]), e2 = norm([p2[0] - p1[0], p2[1] - p1[1]]);
    const n1 = [e1[1] * sgn, -e1[0] * sgn], n2 = [e2[1] * sgn, -e2[0] * sgn];
    let bx = n1[0] + n2[0], bz = n1[1] + n2[1]; const bl = Math.hypot(bx, bz) || 1; bx /= bl; bz /= bl;
    const cos = Math.max(0.35, bx * n1[0] + bz * n1[1]);
    out.push([p1[0] + bx * d / cos, p1[1] + bz * d / cos]);
  }
  return out;
}
function norm(v) { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; }

// ---------- carreteras y calles: cintas sobre el terreno ----------
export function buildRoads(data, terrain, tex, colliders) {
  const byMat = { asphalt: new GeoBuilder(), concrete: new GeoBuilder(), dirt: new GeoBuilder(), sidewalk: new GeoBuilder() };
  const urban = data.style === 'urban', lamps = []; let lampsExtra = [];
  const STREET = new Set(['residential', 'tertiary', 'secondary', 'primary', 'unclassified', 'living_street', 'tertiary_link', 'secondary_link']);
  // aceras de baldosa a ambos lados de las calles (solo en ciudad)
  if (urban) for (const r of data.roads) {
    if (!STREET.has(r.k) || r.bridge) continue;
    const P = densify(r.p, 2.5), hw = r.w / 2 + 2.3; let dist = 0;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1], na = sideNormal(P, i), nb = sideNormal(P, i + 1), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const y = (p) => terrain.height(p[0], p[1]) + 0.05;
      const pa = [a[0] + na[0] * hw, a[1] + na[1] * hw], qa = [a[0] - na[0] * hw, a[1] - na[1] * hw];
      const pb = [b[0] + nb[0] * hw, b[1] + nb[1] * hw], qb = [b[0] - nb[0] * hw, b[1] - nb[1] * hw];
      byMat.sidewalk.quad([qa[0], y(qa), qa[1]], [pa[0], y(pa), pa[1]], [pb[0], y(pb), pb[1]], [qb[0], y(qb), qb[1]],
        [0, dist / 2], [hw, dist / 2], [hw, (dist + L) / 2], [0, (dist + L) / 2]);
      // farolas cada ~28 m, alternando lados
      if (Math.floor((dist + L) / 28) > Math.floor(dist / 28)) {
        const side = Math.floor(dist / 28) % 2 ? 1 : -1, o = r.w / 2 + 1.2;
        lamps.push([a[0] + na[0] * o * side, a[1] + na[1] * o * side, Math.atan2(-na[0] * side, -na[1] * side)]);
      }
      dist += L;
    }
  }
  // pueblo: faroles colgados de las fachadas, casi todos en el centro (alrededor de la plaza)
  if (!urban && colliders) {
    const [cx, cz] = data.plaza?.start || data.spawn;
    for (const r of data.roads) {
      if (!STREET.has(r.k) || r.k === 'trunk') continue;
      const P = densify(r.p, 2.5); let dist = 0, next = 0;
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i], b = P[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), dc = Math.hypot(a[0] - cx, a[1] - cz);
        if (dist >= next && dc < 320) {
          const w = colliders.nearest(a[0], a[1], r.w / 2 + 4);
          if (w && !lamps.some(l => Math.hypot(l[0] - w.x, l[1] - w.z) < (dc < 140 ? 22 : 60))) {
            lamps.push([w.x + w.nx * 0.03, w.z + w.nz * 0.03, Math.atan2(w.nx, w.nz)]); next = dist + (dc < 140 ? 30 : 75);
          }
        }
        dist += L;
      }
    }
  }
  const step = data.step || 2.5, lift = data.lift ?? 0.08;
  for (const r of data.roads) {
    const gb = byMat[r.s] || byMat.asphalt; const hw = r.w / 2;
    const P = densify(r.p, step); let dist = 0;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1];
      const na = sideNormal(P, i), nb = sideNormal(P, i + 1);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const pa = [a[0] + na[0] * hw, a[1] + na[1] * hw], qa = [a[0] - na[0] * hw, a[1] - na[1] * hw];
      const pb = [b[0] + nb[0] * hw, b[1] + nb[1] * hw], qb = [b[0] - nb[0] * hw, b[1] - nb[1] * hw];
      const y = (p) => terrain.height(p[0], p[1]) + lift;
      const us = r.w / 4;
      gb.quad([qa[0], y(qa), qa[1]], [pa[0], y(pa), pa[1]], [pb[0], y(pb), pb[1]], [qb[0], y(qb), qb[1]],
        [0, dist / 4], [us, dist / 4], [us, (dist + L) / 4], [0, (dist + L) / 4]);
      dist += L;
    }
  }
  const group = new THREE.Group();
  const mats = {
    asphalt: new THREE.MeshStandardMaterial({ map: tex.asphalt, roughness: 1, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2 }), // mate: con 0,95 brillaba al sol como plástico
    concrete: new THREE.MeshStandardMaterial({ map: tex.concrete, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -2 }),
    dirt: new THREE.MeshStandardMaterial({ map: tex.dirt, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, transparent: true, opacity: 0.85 }),
    sidewalk: new THREE.MeshStandardMaterial({ map: tex.sidewalk, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -1 }),
  };
  for (const [k, gb] of Object.entries(byMat)) if (gb.pos.length) { const m = new THREE.Mesh(gb.build(), mats[k]); m.receiveShadow = true; group.add(m); }
  // líneas de la carretera nacional
  const lines = new GeoBuilder();
  for (const r of data.roads) if (r.lines) {
    const P = densify(r.p, step);
    for (let i = 0; i < P.length - 1; i++) {
      for (const off of [-r.w / 2 + 0.3, r.w / 2 - 0.3]) {
        const a = P[i], b = P[i + 1], na = sideNormal(P, i), nb = sideNormal(P, i + 1);
        const A = [a[0] + na[0] * off, a[1] + na[1] * off], B = [b[0] + nb[0] * off, b[1] + nb[1] * off];
        const w = 0.07, y = (p) => terrain.height(p[0], p[1]) + lift + 0.02;
        lines.quad([A[0] - na[0] * w, y(A), A[1] - na[1] * w], [A[0] + na[0] * w, y(A), A[1] + na[1] * w], [B[0] + nb[0] * w, y(B), B[1] + nb[1] * w], [B[0] - nb[0] * w, y(B), B[1] - nb[1] * w], [0, 0], [1, 0], [1, 1], [0, 1]);
      }
    }
  }
  if (lamps.length) {
    let H, g, head, reach;
    if (urban) {
      H = 6; reach = 1.1;
      const pole = new THREE.CylinderGeometry(0.06, 0.09, H, 6); pole.translate(0, H / 2, 0);
      const arm = new THREE.BoxGeometry(0.08, 0.08, 1.2); arm.translate(0, H - 0.05, 0.55);
      g = mergeGeometries([pole, arm]);
      head = new THREE.BoxGeometry(0.3, 0.12, 0.55); head.translate(0, H - 0.25, 1.1);
    } else { // farol de brazo de forja anclado a la pared, con tejadillo
      H = 3.9; reach = 0.7;
      const plate = new THREE.BoxGeometry(0.16, 0.3, 0.04); plate.translate(0, H - 0.1, 0.02);
      const arm = new THREE.BoxGeometry(0.04, 0.04, 0.72); arm.translate(0, H, 0.36);
      const brace = new THREE.BoxGeometry(0.03, 0.03, 0.5); brace.rotateX(0.75); brace.translate(0, H - 0.18, 0.2);
      const cap = new THREE.ConeGeometry(0.2, 0.18, 4); cap.rotateY(Math.PI / 4); cap.translate(0, H - 0.12, reach);
      g = mergeGeometries([plate, arm, brace, cap].map(x => x.index ? x.toNonIndexed() : x));
      head = new THREE.CylinderGeometry(0.15, 0.1, 0.32, 4); head.rotateY(Math.PI / 4); head.translate(0, H - 0.37, reach);
    }
    const im = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: urban ? 0x4a5056 : 0x26282a, roughness: 0.5, metalness: 0.6 }), lamps.length);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff4d8, emissive: 0xffc870, emissiveIntensity: 0, roughness: 0.3 });
    night.lamps.push(lampMat);
    const ih = new THREE.InstancedMesh(head, lampMat, lamps.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3();
    lamps.forEach(([x, z, rot], i) => {
      q.setFromAxisAngle(up, rot); const y = terrain.height(x, z); m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1)); im.setMatrixAt(i, m); ih.setMatrixAt(i, m);
      v.set(0, 0, reach).applyQuaternion(q); lamps[i] = [x, z, rot, x + v.x, y + H - 0.5, z + v.z]; // posición de la bombilla
      if (colliders && urban) colliders.addSegment(x - 0.12, z, x + 0.12, z, 'tree');
    });
    im.castShadow = true; group.add(im, ih); group.userData.lamps = lamps;
  }
  if (!urban && colliders) { const up = utilityPoles(data, terrain, colliders); group.add(up); lampsExtra = up.userData.lamps || []; }
  if (lines.pos.length) group.add(new THREE.Mesh(lines.build(), new THREE.MeshStandardMaterial({ color: 0xe8e8e0, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -4 })));
  if (lampsExtra.length) group.userData.lamps = [...(group.userData.lamps || []), ...lampsExtra];
  return group;
}
// postes de madera del tendido eléctrico con su farola de brazo y los cables combados entre poste y poste
function utilityPoles(data, terrain, colliders) {
  const [cx, cz] = data.plaza?.start || data.spawn, H = 7.2, poles = [], wires = [];
  for (const r of data.roads) {
    if (!['residential', 'living_street', 'tertiary', 'unclassified'].includes(r.k)) continue;
    const P = densify(r.p, 2); let dist = 0, next = 6, prev = null; const conc = Math.abs(Math.round(r.p[0][0] * 13 + r.p[0][1] * 7)) % 2;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]); dist += L;
      if (dist < next || Math.hypot(a[0] - cx, a[1] - cz) > 300) continue;
      const n = sideNormal(P, i); let spot = null;
      for (const side of [1, -1]) {
        const o = r.w / 2 + 0.45, x = a[0] + n[0] * o * side, z = a[1] + n[1] * o * side;
        if (!colliders.nearest(x, z, 0.6) && !poles.some(p => Math.hypot(p[0] - x, p[1] - z) < 12)) { spot = [x, z, Math.atan2(-n[0] * side, -n[1] * side), conc]; break; }
      }
      if (!spot) { next = dist + 4; continue; }
      poles.push(spot); next = dist + 30 + (poles.length % 3) * 4;
      if (prev && Math.hypot(prev[0] - spot[0], prev[1] - spot[1]) < 45) wires.push([prev, spot]);
      prev = spot;
    }
  }
  const g = new THREE.Group(); if (!poles.length) return g;
  const pole = new THREE.CylinderGeometry(0.09, 0.13, H, 6); pole.translate(0, H / 2, 0);
  const cross = new THREE.BoxGeometry(0.9, 0.08, 0.08); cross.translate(0, H - 0.3, 0);
  const arm = new THREE.CylinderGeometry(0.035, 0.035, 1.5, 5); arm.rotateX(Math.PI / 2 - 0.25); arm.translate(0, H - 1.6, 0.7);
  const head = new THREE.BoxGeometry(0.22, 0.1, 0.5); head.translate(0, H - 1.42, 1.45);
  const wood = new THREE.MeshStandardMaterial({ color: 0x4d3b2a, roughness: 1 }), metal = new THREE.MeshStandardMaterial({ color: 0x8a8d90, roughness: 0.5, metalness: 0.5 });
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff4d8, emissive: 0xffd8a0, emissiveIntensity: 0, roughness: 0.3 }); night.lamps.push(lampMat);
  // unos de madera y otros de hormigón (los más nuevos), por calles
  const concrete = new THREE.MeshStandardMaterial({ color: 0xb4b2ac, roughness: 0.95 });
  const kind = poles.map(p => p[3]), nW = kind.filter(k => !k).length;
  const sq = new THREE.BoxGeometry(0.2, H, 0.16); sq.translate(0, H / 2, 0);
  const ipW = new THREE.InstancedMesh(mergeGeometries([pole, cross]), wood, Math.max(1, nW)), ipC = new THREE.InstancedMesh(mergeGeometries([sq, cross.clone()]), concrete, Math.max(1, poles.length - nW));
  ipW.count = nW; ipC.count = poles.length - nW; 
  let iW = 0, iC = 0; const lampsOut = [];
  const ia = new THREE.InstancedMesh(arm, metal, poles.length), ih = new THREE.InstancedMesh(head, lampMat, poles.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), one = new THREE.Vector3(1, 1, 1);
  poles.forEach(([x, z, rot], i) => {
    q.setFromAxisAngle(up, rot); m.compose(new THREE.Vector3(x, terrain.height(x, z), z), q, one);
    (kind[i] ? ipC : ipW).setMatrixAt(kind[i] ? iC++ : iW++, m); ia.setMatrixAt(i, m); ih.setMatrixAt(i, m);
    colliders.addSegment(x - 0.12, z, x + 0.12, z, 'tree');
    const y = terrain.height(x, z); lampsOut.push([x, z, rot, x + Math.sin(rot) * 1.45, y + H - 1.5, z + Math.cos(rot) * 1.45]);
  });
  g.userData.lamps = lampsOut;
  ipW.castShadow = ipC.castShadow = true; g.add(ipW, ipC, ia, ih);
  // dos cables por vano, a los extremos de la cruceta, con su catenaria
  const pts = [];
  for (const [a, b] of wires) for (const off of [-0.4, 0.4]) {
    const ya = terrain.height(a[0], a[1]) + H - 0.25, yb = terrain.height(b[0], b[1]) + H - 0.25;
    const ax = a[0] + Math.cos(a[2]) * off, az = a[1] - Math.sin(a[2]) * off, bx = b[0] + Math.cos(b[2]) * off, bz = b[1] - Math.sin(b[2]) * off;
    const L = Math.hypot(bx - ax, bz - az), sag = 0.012 * L * L / 10 + 0.3;
    for (let k = 0; k < 8; k++) for (const t of [k / 8, (k + 1) / 8]) pts.push(ax + (bx - ax) * t, ya + (yb - ya) * t - Math.sin(t * Math.PI) * sag, az + (bz - az) * t);
  }
  const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  g.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0x1a1a1a })));
  return g;
}
function densify(p, step) {
  const out = [p[0]];
  for (let i = 1; i < p.length; i++) {
    const a = p[i - 1], b = p[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / step));
    for (let k = 1; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  }
  return out;
}
function sideNormal(P, i) {
  const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
  const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1; return [-dz / l, dx / l];
}

// ---------- muros de piedra seca ----------
// tapias de piedra de huertos y corrales y ruinas de casas caídas: donde la calle del pueblo no tiene
// fachada al lado, un muro continuo a 0,6 m del borde que cierra el paso (en Valde no hay huecos abiertos
// a la calle; lo dijo Darío). No vienen en el Catastro.
export function yardWalls(data, colliders, avoid = []) {
  const [cx, cz] = data.plaza?.start || data.spawn, out = [];
  const pave = data.roads.filter(r => r.k !== 'path');
  const grid = new Map(), C = 8, key = (x, z) => `${Math.floor(x / C)},${Math.floor(z / C)}`;
  for (const r of pave) { const P = densify(r.p, 1.5); for (const p of P) { const k = key(p[0], p[1]); if (!grid.has(k)) grid.set(k, []); grid.get(k).push([p[0], p[1], r.w / 2, r]); } }
  // ¿cae encima de otra calle? (la propia no cuenta: el muro va pegado a ella)
  const onRoad = (x, z, own) => { const i = Math.floor(x / C), j = Math.floor(z / C); for (let a = i - 1; a <= i + 1; a++) for (let b = j - 1; b <= j + 1; b++) for (const [px, pz, hw, rr] of grid.get(`${a},${b}`) || []) if (Math.hypot(px - x, pz - z) < hw + (rr === own ? 0.3 : 1.0)) return true; return false; };
  let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const STREETS = new Set(['residential', 'living_street', 'tertiary', 'unclassified', 'secondary']);
  // Las tapias siguen la línea de fachadas: en cada lado de la calle se mide (con un rayo perpendicular) a qué
  // distancia está la casa, y los huecos entre una casa y la siguiente se cierran a esa misma distancia.
  const REACH = 18, MAXGAP = 60;
  for (const r of data.roads) {
    if (!STREETS.has(r.k)) continue;
    const P = densify(r.p, 2);
    for (const side of [1, -1]) {
      const N = P.map((p, i) => sideNormal(P, Math.min(i, P.length - 2)));
      const d0 = r.w / 2 + 0.3;
      const F = P.map((p, i) => { // distancia del eje a la fachada en este punto (o null si no hay casa)
        const n = N[i], ax = p[0] + n[0] * d0 * side, az = p[1] + n[1] * d0 * side;
        const t = colliders.raycast(ax, az, ax + n[0] * REACH * side, az + n[1] * REACH * side);
        return t < 1 ? d0 + t * REACH : null;
      });
      let i = 0;
      while (i < P.length) {
        if (F[i] == null || (i + 1 < P.length && F[i + 1] != null)) { i++; continue; }
        // i = última muestra con casa; buscar la siguiente con casa
        let j = i + 1; while (j < P.length && F[j] == null) j++;
        if (j >= P.length || (j - i) * 2 > MAXGAP || j - i < 2) { i = j; continue; }
        const pts = [], ok = [];
        for (let k = i; k <= j; k++) {
          const f = F[i] + (F[j] - F[i]) * (k - i) / (j - i) + 0.15, n = N[k], x = P[k][0] + n[0] * f * side, z = P[k][1] + n[1] * f * side;
          const dc = Math.hypot(x - cx, z - cz);
          pts.push([x, z]); ok.push(dc > 30 && dc < 300 && !onRoad(x, z, r) && !avoid.some(s_ => Math.hypot(s_.x - x, s_.z - z) < 20));
        }
        // trozos seguidos sin calles cruzando; empiezan y acaban pegados a la casa
        let run = [];
        const emit = () => {
          if (run.length >= 2) {
            const ruin = rnd() < 0.25, base = ruin ? 2.2 + rnd() * 1.2 : 1.0 + rnd() * 0.6;
            out.push({ p: run, hs: run.map(() => ruin ? base * (0.55 + rnd() * 0.6) : base + (rnd() - 0.5) * 0.15), ruin });
          }
          run = [];
        };
        pts.forEach((q, k) => { if (ok[k]) run.push(q); else emit(); }); emit();
        i = j;
      }
    }
  }
  return out;
}
export function buildWalls(data, terrain, tex, colliders) {
  const gStone = new GeoBuilder(), gBlock = new GeoBuilder();
  for (const w of data.walls) {
    const gb = w.mat === 'bloque' ? gBlock : gStone;
    const P = w.hs ? w.p : densify(w.p, 2), t = w.ruin ? 0.3 : 0.25; let dist = 0;
    const H = (i) => w.hs ? w.hs[i] : w.h || 1.2;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1], n = sideNormal(P, i), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const ya = terrain.height(a[0], a[1]) - 0.2, yb = terrain.height(b[0], b[1]) - 0.2, ha = H(i), hb = H(i + 1), h = Math.max(ha, hb);
      for (const s of [1, -1]) {
        const A = [a[0] + n[0] * t * s, a[1] + n[1] * t * s], B = [b[0] + n[0] * t * s, b[1] + n[1] * t * s];
        const q = [[A[0], ya, A[1]], [B[0], yb, B[1]], [B[0], yb + hb, B[1]], [A[0], ya + ha, A[1]]];
        const uv = [[dist / 3, 0], [(dist + L) / 3, 0], [(dist + L) / 3, hb / 3], [dist / 3, ha / 3]];
        if (s > 0) gb.quad(q[1], q[0], q[3], q[2], uv[1], uv[0], uv[3], uv[2]); else gb.quad(...q, ...uv);
      }
      const A = [a[0] + n[0] * t, a[1] + n[1] * t], B = [b[0] + n[0] * t, b[1] + n[1] * t], C = [b[0] - n[0] * t, b[1] - n[1] * t], D = [a[0] - n[0] * t, a[1] - n[1] * t];
      gb.quad([D[0], ya + ha, D[1]], [C[0], yb + hb, C[1]], [B[0], yb + hb, B[1]], [A[0], ya + ha, A[1]], [0, 0], [L / 3, 0], [L / 3, 0.15], [0, 0.15]);
      if (i === 0 || i === P.length - 2) { // remate del extremo del muro
        const e = i === 0 ? a : b, ye = i === 0 ? ya : yb, he = i === 0 ? ha : hb, E1 = [e[0] + n[0] * t, e[1] + n[1] * t], E2 = [e[0] - n[0] * t, e[1] - n[1] * t];
        gb.quad([E1[0], ye, E1[1]], [E2[0], ye, E2[1]], [E2[0], ye + he, E2[1]], [E1[0], ye + he, E1[1]], [0, 0], [0.17, 0], [0.17, he / 3], [0, he / 3]);
      }
      colliders.addSegment(a[0], a[1], b[0], b[1], 'wall');
      dist += L;
    }
  }
  const out = new THREE.Group();
  for (const [gb, map] of [[gStone, tex.stone], [gBlock, tex.block || tex.stone]]) {
    if (!gb.pos.length) continue;
    const m = new THREE.Mesh(gb.build(), new THREE.MeshStandardMaterial({ map, roughness: 1, side: THREE.DoubleSide }));
    m.castShadow = m.receiveShadow = true; out.add(m);
  }
  return out;
}

// ---------- árboles (encinas y robles) instanciados con dos niveles de detalle ----------
export function crownGeometry(detail, lobes) {
  const g = mergeGeometries(Array.from({ length: lobes }, (_, k) => {
    const g = new THREE.IcosahedronGeometry(1, detail); const p = g.attributes.position;
    let s = k * 97 + 3; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < p.count; i++) { const f = 0.82 + r() * 0.3; p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * 0.8, p.getZ(i) * f); }
    const a = k * 2.1; g.scale(0.78, 0.78, 0.78);
    if (k) g.translate(Math.cos(a) * 0.5, 0.12 * k - 0.15, Math.sin(a) * 0.5);
    return g.index ? g.toNonIndexed() : g;
  }));
  g.computeVertexNormals(); return g;
}
export class Trees {
  constructor(data, terrain, tex, colliders) {
    this.list = data.trees; this.terrain = terrain;
    const leafMat = new THREE.MeshStandardMaterial({ map: tex.leaves, color: 0x9aa884, roughness: 0.95, flatShading: true });
    const barkMat = new THREE.MeshStandardMaterial({ map: tex.bark, roughness: 1 });
    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.2, 2, 6); trunkGeo.translate(0, 1, 0);
    const N = this.list.length, NEAR = 600;
    this.lowCrown = new THREE.InstancedMesh(crownGeometry(0, 3), leafMat, N);
    this.lowTrunk = new THREE.InstancedMesh(trunkGeo, barkMat, N);
    this.hiCrown = new THREE.InstancedMesh(crownGeometry(1, 4), leafMat, NEAR);
    this.hiTrunk = new THREE.InstancedMesh(trunkGeo, barkMat, NEAR);
    this.hiCrown.castShadow = this.hiTrunk.castShadow = true; this.hiCrown.receiveShadow = true;
    // Los árboles cercanos cambian de instancias al moverse: la esfera de recorte calculada al principio
    // (con 0 instancias) los dejaba fuera de cámara y desaparecían. Sin recorte por frustum siempre se dibujan.
    for (const im of [this.lowCrown, this.lowTrunk, this.hiCrown, this.hiTrunk]) im.frustumCulled = false;
    this.mats = []; this.colors = [];
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
    this.list.forEach(([x, z, sc], i) => {
      const y = terrain.height(x, z); q.setFromAxisAngle(up, (x * 13.37 + z * 7.1) % 6.28);
      s.set(sc, sc, sc); p.set(x, y - 0.1, z); const mt = new THREE.Matrix4().compose(p, q, s);
      s.set(sc * 2.2, sc * 1.8, sc * 2.2); p.set(x, y + sc * 2.6, z); const mc = new THREE.Matrix4().compose(p, q, s);
      this.mats.push([mt, mc]);
      col.setHSL(0.2 + (((x * 3.1 + z) % 1) + 1) % 1 * 0.07, 0.22, 0.4 + (((x + z * 2.3) % 1) + 1) % 1 * 0.14);
      this.colors.push(col.clone());
      this.lowTrunk.setMatrixAt(i, mt); this.lowCrown.setMatrixAt(i, mc); this.lowCrown.setColorAt(i, col);
      const r = 0.3 * sc; colliders.addSegment(x - r, z, x + r, z, 'tree'); colliders.addSegment(x, z - r, x, z + r, 'tree');
    });
    this.zero = new THREE.Matrix4().makeScale(0, 0, 0); this.near = []; this.last = null;
    this.group = new THREE.Group(); this.group.add(this.lowTrunk, this.lowCrown, this.hiTrunk, this.hiCrown);
    this.hiCrown.count = this.hiTrunk.count = 0;
  }
  // Los árboles cercanos usan el modelo detallado y proyectan sombra
  update(pos) {
    if (this.last && Math.hypot(pos.x - this.last.x, pos.z - this.last.z) < 15) return;
    this.last = { x: pos.x, z: pos.z };
    for (const i of this.near) { this.lowTrunk.setMatrixAt(i, this.mats[i][0]); this.lowCrown.setMatrixAt(i, this.mats[i][1]); }
    this.near = [];
    const R2 = 140 * 140;
    for (let i = 0; i < this.list.length && this.near.length < 600; i++) {
      const [x, z] = this.list[i]; const dx = x - pos.x, dz = z - pos.z;
      if (dx * dx + dz * dz < R2) this.near.push(i);
    }
    this.near.forEach((i, k) => {
      this.hiTrunk.setMatrixAt(k, this.mats[i][0]); this.hiCrown.setMatrixAt(k, this.mats[i][1]); this.hiCrown.setColorAt(k, this.colors[i]);
      this.lowTrunk.setMatrixAt(i, this.zero); this.lowCrown.setMatrixAt(i, this.zero);
    });
    this.hiCrown.count = this.hiTrunk.count = this.near.length;
    for (const im of [this.lowTrunk, this.lowCrown, this.hiTrunk, this.hiCrown]) im.instanceMatrix.needsUpdate = true;
    if (this.hiCrown.instanceColor) this.hiCrown.instanceColor.needsUpdate = true;
  }
}

// ---------- terreno con ortofoto PNOA + textura de detalle ----------
export function buildTerrain(meta, terrain, orthoFull, orthoCenter, tex, mask = null, paint = null) {
  const n = meta.n, size = (n - 1) * meta.cell;
  const geo = new THREE.PlaneGeometry(size, size, n - 1, n - 1); geo.rotateX(-Math.PI / 2);
  geo.translate(meta.origin[0] + size / 2, 0, meta.origin[1] + size / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, terrain.ground(p.getX(i), p.getZ(i)));
  const f = terrain.f;
  if (f) { // fuera el trozo que cubre la malla fina
    const idx = geo.index.array, keep = [];
    for (let t = 0; t < idx.length; t += 3) {
      const cx = (p.getX(idx[t]) + p.getX(idx[t + 1]) + p.getX(idx[t + 2])) / 3, cz = (p.getZ(idx[t]) + p.getZ(idx[t + 1]) + p.getZ(idx[t + 2])) / 3;
      if (!(cx > f.x0 && cx < f.x1 && cz > f.z0 && cz < f.z1)) keep.push(idx[t], idx[t + 1], idx[t + 2]);
    }
    geo.setIndex(keep);
  }
  geo.computeVertexNormals();
  const mat = terrainMaterial(orthoFull, orthoCenter, meta.ortho.full, meta.ortho.center, tex, mask, paint);
  const mesh = new THREE.Mesh(geo, mat); mesh.receiveShadow = true;
  if (f) {
    const fg = new THREE.PlaneGeometry(f.x1 - f.x0, f.z1 - f.z0, f.nx - 1, f.nz - 1); fg.rotateX(-Math.PI / 2); fg.translate((f.x0 + f.x1) / 2, 0, (f.z0 + f.z1) / 2);
    const q = fg.attributes.position; for (let i = 0; i < q.count; i++) q.setY(i, terrain.ground(q.getX(i), q.getZ(i)));
    fg.computeVertexNormals(); const fm = new THREE.Mesh(fg, mat); fm.receiveShadow = true; mesh.add(fm);
  }
  return mesh;
}
export function terrainMaterial(orthoFull, orthoCenter, fb, cb, tex, mask = null, paint = null) {
  const mat = new THREE.MeshStandardMaterial({ map: orthoFull, roughness: 1 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.tCenter = mat.userData.tC || (mat.userData.tC = { value: orthoCenter }); sh.uniforms.tDetail = { value: tex.detail };
    sh.uniforms.tMask = { value: mask?.tex || null }; sh.uniforms.maskB = { value: mask?.bounds || new THREE.Vector4(0, 0, 1, 1) }; sh.uniforms.tAsph = { value: tex.asphalt }; sh.uniforms.tConc = { value: tex.concrete }; sh.uniforms.tDirt = { value: tex.dirt }; sh.uniforms.tGrass = { value: tex.grass }; sh.uniforms.tGravel = { value: tex.gravel }; sh.uniforms.tPaint = { value: paint?.tex || null }; sh.uniforms.paintB = { value: paint?.bounds || new THREE.Vector4(0, 0, 1, 1) };
    sh.uniforms.fullB = { value: new THREE.Vector4(...fb) }; sh.uniforms.centerB = mat.userData.cB || (mat.userData.cB = { value: new THREE.Vector4(...cb) });
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vWPos; uniform sampler2D tCenter; uniform sampler2D tDetail; uniform vec4 fullB; uniform vec4 centerB;
      uniform sampler2D tMask; uniform sampler2D tAsph; uniform sampler2D tConc; uniform sampler2D tDirt; uniform vec4 maskB; uniform sampler2D tGrass; uniform sampler2D tGravel; uniform sampler2D tPaint; uniform vec4 paintB;`)
      .replace('#include <map_fragment>', `
      vec2 uvF = vec2((vWPos.x - fullB.x) / (fullB.z - fullB.x), (vWPos.z - fullB.y) / (fullB.w - fullB.y));
      vec4 col = texture2D(map, uvF);
      vec2 uvC = vec2((vWPos.x - centerB.x) / (centerB.z - centerB.x), (vWPos.z - centerB.y) / (centerB.w - centerB.y));
      if (uvC.x > 0.0 && uvC.x < 1.0 && uvC.y > 0.0 && uvC.y < 1.0) {
        vec2 e = min(uvC, 1.0 - uvC); float k = smoothstep(0.0, 0.05, min(e.x, e.y));
        col = mix(col, texture2D(tCenter, uvC), k);
      }
      float d = texture2D(tDetail, vWPos.xz / 3.0).r * 0.6 + texture2D(tDetail, vWPos.xz / 17.0).r * 0.4;
      col.rgb *= mix(1.0, d * 1.9, 0.55);
      col.rgb = pow(col.rgb, vec3(1.08)) * 1.08; // la ortofoto es plana; algo de contraste
      ${mask ? `vec2 uvM = (vWPos.xz - maskB.xy) / maskB.zw;
      if (uvM.x > 0.0 && uvM.x < 1.0 && uvM.y > 0.0 && uvM.y < 1.0) {
        vec4 mk = texture2D(tMask, uvM); float a = smoothstep(0.3, 0.7, mk.a); // alfa: el rojo vale 255 hasta en el borde difuminado y ensanchaba el asfalto
        vec3 asph = mix(texture2D(tConc, vWPos.xz / 4.0).rgb, texture2D(tAsph, vWPos.xz / 4.0).rgb, smoothstep(0.3, 0.7, mk.g / max(mk.r, 0.01))) * (0.92 + 0.16 * d);
        // fuera de la calle, dentro del pueblo: tierra (la ortofoto de cerca es una mancha)
        float vf = 1.0 - smoothstep(200.0, 290.0, length(vWPos.xz - maskB.xy - maskB.zw * 0.5));
        vec3 dirt = texture2D(tDirt, vWPos.xz / 3.0).rgb;
        col.rgb = mix(col.rgb, mix(col.rgb, dirt, 0.8) * (0.8 + 0.25 * d), 0.95 * vf * (1.0 - a)); // todo lo que no es calle, tierra (lo pidió Darío: el gris de la foto confundía)
        ${paint ? `vec2 uvP = (vWPos.xz - paintB.xy) / paintB.zw;
        if (uvP.x > 0.0 && uvP.x < 1.0 && uvP.y > 0.0 && uvP.y < 1.0) { // suelo pintado por Darío en el plano
          vec4 pk = texture2D(tPaint, uvP); float sw = pk.r + pk.g + pk.b + 0.001;
          vec3 pc = (texture2D(tDirt, vWPos.xz / 3.0).rgb * pk.r + texture2D(tGrass, vWPos.xz / 2.5).rgb * pk.g + texture2D(tGravel, vWPos.xz / 2.0).rgb * pk.b) / sw;
          col.rgb = mix(col.rgb, pc * (0.82 + 0.3 * d), smoothstep(0.15, 0.6, pk.a));
        }` : ''}
        col.rgb = mix(col.rgb, asph, a);
      }` : ''}
      diffuseColor *= col;`);
  };
  mat.customProgramCacheKey = () => 'terrain' + (mask ? 'm' : '') + (paint ? 'p' : '');
  return mat;
}

// ---------- curvas redondeadas: recorte de esquinas (Chaikin) sin mover cruces ni extremos ----------
export function smoothRoads(roads, iters = 2) {
  const key = (p) => `${Math.round(p[0] * 2)},${Math.round(p[1] * 2)}`, count = new Map();
  for (const r of roads) for (const p of r.p) count.set(key(p), (count.get(key(p)) || 0) + 1);
  for (const r of roads) {
    const cap = r.k === 'residential' || r.k === 'living_street' ? 5 : 14;
    let P = r.p;
    for (let it = 0; it < iters; it++) {
      const fixed = (p, i) => i === 0 || i === P.length - 1 || count.get(key(p)) > 1;
      const out = [P[0]];
      for (let i = 1; i < P.length - 1; i++) {
        const p = P[i];
        if (fixed(p, i)) { out.push(p); continue; }
        const a = P[i - 1], b = P[i + 1];
        const la = Math.hypot(p[0] - a[0], p[1] - a[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
        const ca = Math.min(la * 0.25, cap) / (la || 1), cb = Math.min(lb * 0.25, cap) / (lb || 1);
        out.push([p[0] + (a[0] - p[0]) * ca, p[1] + (a[1] - p[1]) * ca], [p[0] + (b[0] - p[0]) * cb, p[1] + (b[1] - p[1]) * cb]);
      }
      out.push(P[P.length - 1]);
      P = out;
    }
    r.p = P.map(p => [p[0], p[1]]);
  }
  return roads;
}

// ---------- máscara del suelo del pueblo: asfalto de fachada a fachada alrededor de las calles ----------
export function villageMask(data, center, R = 320, size = 1024) {
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
  const s = size / (2 * R), X = (x) => (x - center[0] + R) * s, Y = (z) => (z - center[1] + R) * s;
  // rojo: suelo pavimentado; verde: de asfalto. Hoy todo es asfalto, el canal queda por si alguna calle es de hormigón.
  g.lineCap = 'round'; g.lineJoin = 'round'; g.filter = 'blur(2px)';
  const conc = () => false; // todo asfalto (hormigón descartado tras verlo Darío)
  for (const pass of [0, 1]) for (const r of data.roads) {
    if (r.k === 'track' || r.k === 'path' || r.k === 'trunk') continue;
    if (pass !== (conc(r) ? 0 : 1)) continue;
    g.strokeStyle = pass ? '#ff0' : '#f00'; g.lineWidth = (r.w + 0.3) * s; g.beginPath(); // solo la calle: lo de al lado es tierra (Darío)
    r.p.forEach((p, i) => i ? g.lineTo(X(p[0]), Y(p[1])) : g.moveTo(X(p[0]), Y(p[1]))); g.stroke();
  }
  // solo dentro del casco urbano: se desvanece hacia las afueras
  g.filter = 'none'; g.globalCompositeOperation = 'destination-in';
  const grad = g.createRadialGradient(size / 2, size / 2, 220 * s, size / 2, size / 2, 290 * s);
  grad.addColorStop(0, '#fff'); grad.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = grad; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c); t.flipY = false; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
  return { tex: t, bounds: new THREE.Vector4(center[0] - R, center[1] - R, 2 * R, 2 * R) };
}

// ---------- puentes: tablero recto de orilla a orilla, pretiles de piedra y pilas ----------
export function buildBridges(roads, terrain, tex, colliders) {
  const deck = new GeoBuilder(), wall = new GeoBuilder();
  for (const r of roads) {
    if (!r.bridge || r.p.length < 2) continue;
    const P = r.p, hw = r.w / 2 + 0.5;
    let L = 0; const acc = [0]; for (let i = 1; i < P.length; i++) acc.push(L += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    if (L < 3) continue;
    const ha = terrain.ground(P[0][0], P[0][1]), hb = terrain.ground(P[P.length - 1][0], P[P.length - 1][1]);
    const D = densify(P, 3), Y = [];
    let a2 = 0; for (let i = 0; i < D.length; i++) { if (i) a2 += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); Y.push(Math.max(ha + (hb - ha) * a2 / L, terrain.ground(D[i][0], D[i][1])) + 0.1); }
    for (let i = 0; i < D.length - 1; i++) terrain.addDeck(D[i][0], D[i][1], D[i + 1][0], D[i + 1][1], Y[i], Y[i + 1], hw);
    let dist = 0;
    for (let i = 0; i < D.length - 1; i++) {
      const a = D[i], b = D[i + 1], na = sideNormal(D, i), nb = sideNormal(D, i + 1), l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (const side of [1, -1]) {
        const o = side * hw, A = [a[0] + na[0] * o, a[1] + na[1] * o], B = [b[0] + nb[0] * o, b[1] + nb[1] * o];
        const ya = Y[i], yb = Y[i + 1], bot = 0.9;
        // pretil (0,8 m) y canto del tablero
        const q = (y0a, y1a, y0b, y1b) => side > 0
          ? wall.quad([A[0], y0a, A[1]], [B[0], y0b, B[1]], [B[0], y1b, B[1]], [A[0], y1a, A[1]], [dist / 2, y0a / 2], [(dist + l) / 2, y0b / 2], [(dist + l) / 2, y1b / 2], [dist / 2, y1a / 2])
          : wall.quad([B[0], y0b, B[1]], [A[0], y0a, A[1]], [A[0], y1a, A[1]], [B[0], y1b, B[1]], [(dist + l) / 2, y0b / 2], [dist / 2, y0a / 2], [dist / 2, y1a / 2], [(dist + l) / 2, y1b / 2]);
        q(ya - bot, ya + 0.8, yb - bot, yb + 0.8);
        const In = [a[0] + na[0] * (o - side * 0.35), a[1] + na[1] * (o - side * 0.35)], Ib = [b[0] + nb[0] * (o - side * 0.35), b[1] + nb[1] * (o - side * 0.35)];
        wall.quad([In[0], ya + 0.8, In[1]], [A[0], ya + 0.8, A[1]], [B[0], yb + 0.8, B[1]], [Ib[0], yb + 0.8, Ib[1]], [0, 0], [0.2, 0], [0.2, 1], [0, 1]);
        if (side < 0) wall.quad([B[0], yb + 0.8, B[1]], [A[0], ya + 0.8, A[1]], [In[0], ya + 0.8, In[1]], [Ib[0], yb + 0.8, Ib[1]], [0, 0], [0.2, 0], [0.2, 1], [0, 1]);
        if (colliders) colliders.addSegment(A[0], A[1], B[0], B[1]);
      }
      // panza del tablero
      const pa = [a[0] + na[0] * hw, a[1] + na[1] * hw], qa = [a[0] - na[0] * hw, a[1] - na[1] * hw], pb = [b[0] + nb[0] * hw, b[1] + nb[1] * hw], qb = [b[0] - nb[0] * hw, b[1] - nb[1] * hw];
      deck.quad([pa[0], Y[i] - 0.9, pa[1]], [qa[0], Y[i] - 0.9, qa[1]], [qb[0], Y[i + 1] - 0.9, qb[1]], [pb[0], Y[i + 1] - 0.9, pb[1]], [0, 0], [1, 0], [1, 1], [0, 1]);
      // pilas donde el tablero va alto
      const gap = Y[i] - terrain.ground(a[0], a[1]);
      if (gap > 2 && Math.floor((dist + l) / 14) > Math.floor(dist / 14)) {
        const g0 = terrain.ground(a[0], a[1]) - 1, w = hw * 0.8, t = 0.8, ux = (b[0] - a[0]) / l, uz = (b[1] - a[1]) / l;
        const c = [[-w, -t], [w, -t], [w, t], [-w, t]].map(([s1, s2]) => [a[0] + na[0] * s1 + ux * s2, a[1] + na[1] * s1 + uz * s2]);
        for (let k = 0; k < 4; k++) { const p0 = c[k], p1 = c[(k + 1) % 4]; wall.quad([p1[0], g0, p1[1]], [p0[0], g0, p0[1]], [p0[0], Y[i] - 0.9, p0[1]], [p1[0], Y[i] - 0.9, p1[1]], [0, 0], [1, 0], [1, gap / 2], [0, gap / 2]); }
      }
      dist += l;
    }
  }
  const g = new THREE.Group();
  if (wall.pos.length) { const m = new THREE.Mesh(wall.build(), new THREE.MeshStandardMaterial({ map: tex.stone, roughness: 0.95, vertexColors: true, side: THREE.DoubleSide })); m.castShadow = m.receiveShadow = true; g.add(m); }
  if (deck.pos.length) g.add(new THREE.Mesh(deck.build(), new THREE.MeshStandardMaterial({ color: 0x7d7568, roughness: 1, side: THREE.DoubleSide })));
  return g;
}

// ---------- lo que Darío dibujó en el plano (public/world/<mapa>/plano.json) ----------
const ptInPoly = (x, z, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, zi] = P[i], [xj, zj] = P[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) c = !c; } return c; };
const pairs = (xy) => { const P = []; for (let i = 0; i + 1 < xy.length; i += 2) P.push([xy[i], xy[i + 1]]); return P; };
// suelo pintado en el plano: tierra (rojo), hierba (verde), grava (azul); la goma recorta. Cubre la foto de cerca (±300 m)
export function groundPaint(strokes, R = 0, size = 0) {
  if (!strokes?.length) return null;
  // el lienzo cubre todo lo pintado (al menos 300 m, como mucho el terreno del pueblo, 1800 m) con hasta 4096 px
  if (!R) { R = 300; for (const st of strokes) { const P = pairs(st.xy); for (const [x, z] of P) R = Math.max(R, Math.abs(x) + (st.r || 2) + 4, Math.abs(z) + (st.r || 2) + 4); } R = Math.min(1800, Math.ceil(R / 50) * 50); }
  if (!size) size = R <= 300 ? 2048 : 4096;
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d'), s = size / (2 * R);
  g.lineCap = 'round'; g.lineJoin = 'round'; g.filter = 'blur(1px)';
  const COL = { tierra: '#f00', hierba: '#0f0', grava: '#00f' };
  for (const st of strokes) {
    const P = pairs(st.xy); if (!P.length) continue;
    g.globalCompositeOperation = st.mat === 'borrar' ? 'destination-out' : 'source-over'; g.strokeStyle = COL[st.mat] || '#000'; g.lineWidth = Math.max(1, 2 * st.r * s);
    g.beginPath(); P.forEach((p, i) => i ? g.lineTo((p[0] + R) * s, (p[1] + R) * s) : g.moveTo((p[0] + R) * s, (p[1] + R) * s)); if (P.length === 1) g.lineTo((P[0][0] + R) * s + 0.01, (P[0][1] + R) * s); g.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.flipY = false; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
  return { tex: t, bounds: new THREE.Vector4(-R, -R, 2 * R, 2 * R) };
}
// desniveles del plano: la zona queda llana a su altura media + dh, y un talud de w metros la une con lo de alrededor
const TALUD = { suave: 12, medio: 6, fuerte: 3, muro: 1 };
export function applyLevels(terrain, niveles) {
  const L = (niveles || []).map(n => ({ p: pairs(n.xy), dh: +n.dh || 0, w: TALUD[n.talud] ?? 6 })).filter(n => n.p.length >= 3);
  if (!L.length) return;
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const n of L) for (const [x, z] of n.p) { x0 = Math.min(x0, x - n.w - 8); x1 = Math.max(x1, x + n.w + 8); z0 = Math.min(z0, z - n.w - 8); z1 = Math.max(z1, z + n.w + 8); }
  const C = terrain.cell, snap = (v, up) => terrain.ox + (up ? Math.ceil : Math.floor)((v - terrain.ox) / C) * C; // a líneas de la malla de 8 m: sin grietas en la costura
  x0 = snap(x0); z0 = snap(z0); x1 = snap(x1, true); z1 = snap(z1, true);
  const cell = (x1 - x0) * (z1 - z0) > 260 * 260 ? 2 : 1;
  terrain.setFine(x0, z0, x1, z1, cell);
  const f = terrain.f, h = f.h;
  for (const n of L) {
    let a0 = Infinity, a1 = -Infinity, b0 = Infinity, b1 = -Infinity; for (const [x, z] of n.p) { a0 = Math.min(a0, x); a1 = Math.max(a1, x); b0 = Math.min(b0, z); b1 = Math.max(b1, z); }
    let sum = 0, cnt = 0; // altura media dentro de la zona
    for (let z = b0; z <= b1; z += 1) for (let x = a0; x <= a1; x += 1) if (ptInPoly(x, z, n.p)) { sum += terrain.innerHeight(x, z); cnt++; }
    const target = (cnt ? sum / cnt : terrain.innerHeight(n.p[0][0], n.p[0][1])) + n.dh;
    const i0 = Math.max(0, Math.floor((a0 - n.w - f.x0) / cell)), i1 = Math.min(f.nx - 1, Math.ceil((a1 + n.w - f.x0) / cell));
    const j0 = Math.max(0, Math.floor((b0 - n.w - f.z0) / cell)), j1 = Math.min(f.nz - 1, Math.ceil((b1 + n.w - f.z0) / cell));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const x = f.x0 + i * cell, z = f.z0 + j * cell;
      let k = 1;
      if (!ptInPoly(x, z, n.p)) { let d = Infinity; for (let e = 0; e < n.p.length; e++) d = Math.min(d, segDist(x, z, n.p[e], n.p[(e + 1) % n.p.length])); if (d >= n.w) continue; k = 1 - d / n.w; k = k * k * (3 - 2 * k); }
      h[j * f.nx + i] += (target - h[j * f.nx + i]) * k;
    }
  }
}
const segDist = (x, z, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)); return Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t); };
// Casas quitadas y añadidas, arboledas y claros, y el ajuste de la foto. Va antes de construir nada.
export function applyPlano(data, plano) {
  const f = plano.foto || {}, s = f.scale || 1, dx = f.dx || 0, dz = f.dz || 0;
  // la foto se corrió (dx, dz) y se escaló respecto al centro del pueblo para cuadrar con el Catastro
  for (const o of [data.ortho.full, data.ortho.center]) { const b = o.bounds; o.bounds = [dx + b[0] * s, dz + b[1] * s, dx + b[2] * s, dz + b[3] * s]; }
  const cen = (p) => [p.reduce((a, q) => a + q[0], 0) / p.length, p.reduce((a, q) => a + q[1], 0) / p.length];
  data.buildings = data.buildings.filter(b => !(plano.quitar || []).some(q => q.id === b.id && Math.hypot(...cen(b.p).map((v, i) => v - q.c[i])) < 1.5));
  // casas del Catastro a las que Darío les cambió la forma tirando de sus esquinas
  for (const fm of plano.formas || []) { const b = data.buildings.find(b => b.id === fm.id && Math.hypot(...cen(b.p).map((v, i) => v - fm.c[i])) < 1.5); if (b) { const p = pairs(fm.xy); if (p.length >= 3) b.p = p; } }
  const nuevos = (plano.edificios || []).map((e, i) => ({ p: pairs(e.xy), f: e.f || 1, id: 'plano' + i })).filter(b => b.p.length >= 3);
  data.buildings.push(...nuevos);
  // árboles: fuera de los claros, de las casas nuevas y de las tapias dibujadas
  const lines = (plano.lineas || []).map(l => pairs(l.xy)), claros = [...(plano.claros || []), ...(plano.rocas || []).map(r => r.xy)].map(pairs);
  const blocked = (x, z) => claros.some(P => ptInPoly(x, z, P)) || nuevos.some(b => ptInPoly(x, z, b.p)) || lines.some(P => P.some((a, i) => i && segDist(x, z, P[i - 1], a) < 1.2));
  data.trees = data.trees.filter(([x, z]) => !blocked(x, z));
  // arboledas: se rellenan con encinas cada 5 m, sin pisar casas ni calles
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const onRoad = (x, z) => data.roads.some(r => r.p.some((a, i) => i && segDist(x, z, r.p[i - 1], a) < r.w / 2 + 1.5));
  const inHouse = (x, z) => data.buildings.some(b => ptInPoly(x, z, b.p));
  for (const xy of plano.arboledas || []) {
    const P = pairs(xy); if (P.length < 3) continue;
    const xs = P.map(p => p[0]), zs = P.map(p => p[1]), SP = 5;
    for (let x = Math.min(...xs); x <= Math.max(...xs); x += SP) for (let z = Math.min(...zs); z <= Math.max(...zs); z += SP) {
      const tx = x + (rnd() - 0.5) * SP * 0.8, tz = z + (rnd() - 0.5) * SP * 0.8;
      if (ptInPoly(tx, tz, P) && !blocked(tx, tz) && !inHouse(tx, tz) && !onRoad(tx, tz)) data.trees.push([tx, tz, 0.9 + rnd() * 0.45]);
    }
  }
}
// Tapias (bajas, de altura pareja) y ruinas (más altas, con el remate desigual) en el formato de buildWalls
export function planoWalls(plano) {
  let seed = 23; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return (plano.lineas || []).map(l => {
    const P = pairs(l.xy); if (P.length < 2) return null;
    const ruin = l.kind === 'ruin', bloque = l.mat === 'bloque', irr = l.mat === 'irregular', p = densify(P, ruin || irr ? 1 : 2);
    // altura elegida en el plano: baja, media (la de antes) o alta
    const H = ruin ? { baja: 1.4, media: 2.6, alta: 3.8 } : { baja: 0.8, media: 1.3, alta: 2.1 }, h0 = H[l.alto] || H.media;
    const base = h0 * (ruin ? 0.85 + rnd() * 0.3 : 0.92 + rnd() * 0.16);
    // regular: remate recto; irregular: piedra seca amontonada, con el remate desigual
    return { p, hs: p.map(() => ruin ? base * (0.45 + rnd() * 0.65) : irr ? base * (0.72 + rnd() * 0.5) : base), ruin: ruin || irr, mat: bloque ? 'bloque' : 'piedra' };
  }).filter(Boolean);
}

// Rocas naturales (berrocales de granito) en las zonas que Darío dibujó: bolos redondeados medio enterrados
export function buildRocks(plano, terrain, tex, colliders) {
  const zones = plano.rocas || [], group = new THREE.Group(); if (!zones.length) return group;
  let seed = 31; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const list = [];
  for (const z of zones) {
    const P = pairs(z.xy); if (P.length < 3) continue;
    const [r0, r1] = { baja: [0.5, 1.1], media: [0.9, 2.0], alta: [1.6, 3.4] }[z.alto] || [0.9, 2.0];
    const xs = P.map(p => p[0]), zs = P.map(p => p[1]), SP = (r0 + r1) * 0.9;
    for (let x = Math.min(...xs); x <= Math.max(...xs); x += SP) for (let y = Math.min(...zs); y <= Math.max(...zs); y += SP) {
      const tx = x + (rnd() - 0.5) * SP, tz = y + (rnd() - 0.5) * SP;
      if (!ptInPoly(tx, tz, P) || rnd() < 0.15) continue;
      const r = r0 + (r1 - r0) * rnd() ** 1.5; list.push([tx, tz, r]);
      if (rnd() < 0.35) { const a = rnd() * 6.28, rr = r * (0.35 + rnd() * 0.3); list.push([tx + Math.cos(a) * r * 0.9, tz + Math.sin(a) * r * 0.9, rr]); } // piedra pequeña al lado
    }
  }
  // un bolo: icosaedro deformado, aplastado y con caras planas, como el granito erosionado
  const geo = new THREE.IcosahedronGeometry(1, 2), pa = geo.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i); const n = 0.82 + 0.18 * Math.sin(v.x * 3.1 + v.z * 2.3) * Math.cos(v.y * 2.7 - v.x); v.multiplyScalar(n); pa.setXYZ(i, v.x, v.y * 0.72, v.z); }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: tex.granite || tex.stone, color: 0xffffff, roughness: 1, flatShading: true });
  const im = new THREE.InstancedMesh(geo, mat, list.length); im.castShadow = im.receiveShadow = true;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color();
  list.forEach(([x, z, r], i) => {
    e.set((rnd() - 0.5) * 0.5, rnd() * 6.28, (rnd() - 0.5) * 0.5); q.setFromEuler(e);
    sc.set(r * (0.9 + rnd() * 0.4), r * (0.7 + rnd() * 0.4), r * (0.9 + rnd() * 0.4));
    p.set(x, terrain.height(x, z) - r * 0.25, z); m.compose(p, q, sc); im.setMatrixAt(i, m);
    const k = 0.62 + rnd() * 0.22; col.setRGB(k, k, k * (0.97 + rnd() * 0.04)); im.setColorAt(i, col); // gris, cada bolo un poco distinto
    const cr = r * 0.85; colliders.addSegment(x - cr, z, x + cr, z, 'wall'); colliders.addSegment(x, z - cr, x, z + cr, 'wall');
  });
  group.add(im); return group;
}
