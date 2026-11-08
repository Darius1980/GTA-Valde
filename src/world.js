// Construye el mundo 3D a partir de public/world/world.json (generado por tools/build_world.py).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class Terrain {
  constructor(meta, heights) {
    this.n = meta.n; this.cell = meta.cell; this.ox = meta.origin[0]; this.oz = meta.origin[1]; this.h = heights;
  }
  height(x, z) {
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
  let seed = 1; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const b of data.buildings) {
    let pts = b.p.slice(); if (signedArea(pts) > 0) pts.reverse(); // orden que deja la normal de los muros hacia fuera
    if (pts.length < 3) continue;
    let base = Infinity, top = -Infinity;
    for (const p of pts) { const h = terrain.height(p[0], p[1]); base = Math.min(base, h); top = Math.max(top, h); }
    const floors = Math.max(1, b.f || 1);
    const floorH = urban ? 2.85 : 2.9;
    let eave = b.eave != null ? Math.max(b.eave, top + 2.4) : top + (b.use === 'agr' ? 3.2 + 0.6 * rnd() : floors * floorH + (urban ? 1.2 : 0.3));
    const y0 = base - 0.6;
    const ob = obb(pts); if (!ob) continue;
    const width = ob.mxv - ob.mnv, length = ob.mxu - ob.mnu;
    let rx = ob.ux, rz = ob.uz, mid = (ob.mnv + ob.mxv) / 2, half = width / 2;
    if (width > length) { rx = -ob.uz; rz = ob.ux; mid = (ob.mnu + ob.mxu) / 2; half = length / 2; }
    const nx = -rz, nz = rx;
    const isFlat = b.flat === true;
    let slope = 0.32;
    if (b.top != null && !isFlat) slope = THREE.MathUtils.clamp((b.top - eave) / Math.max(1, half), 0.12, 0.42);
    const roofY = isFlat ? () => eave : (x, z) => eave + slope * (half - Math.abs(x * nx + z * nz - mid));
    // materiales de este edificio
    let wallB, gB = null, tileW = 4, tileH = 3;
    if (urban && b.use !== 'agr') {
      const k = Math.floor(rnd() * urbanB.length); wallB = urbanB[k]; tileW = 3; tileH = floorH;
      if (b.use !== 'ind' && floors >= 3) gB = groundB[Math.floor(rnd() * groundB.length)];
    } else if (b.use === 'agr') wallB = stone;
    else { const k = rnd() < 0.3 ? 1 : 0; wallB = k ? plaster : facade; gB = k ? plasterGround : facadeGround; }
    const t = 0.82 + rnd() * 0.25;
    for (const gb of [facade, plaster, facadeGround, plasterGround, stone, ...urbanB, ...groundB]) gb.tint = [t, t * (0.97 + rnd() * 0.05), t * (0.95 + rnd() * 0.05)];
    const age = rnd(); roof.tint = [0.75 + 0.3 * (1 - age), 0.72 + 0.25 * (1 - age) + 0.08 * age, 0.7 + 0.2 * age];
    const gH = urban ? 3.6 : 3.0, gTop = top + gH; // planta baja
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
        if (gB && gTop < wTop - (urban ? 2 : 0.4)) {
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
        const gable = urban ? wallB : stone;
        if (hp - eave > 0.05 || hq - eave > 0.05) {
          if (urban) gable.quad([p[0], eave, p[1]], [q[0], eave, q[1]], [q[0], hq, q[1]], [p[0], hp, p[1]],
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
    for (let i = 0; i < grown.length; i++) {
      const a = grown[i], c = grown[(i + 1) % grown.length];
      const ha = roofY(a[0], a[1]) + 0.05, hc = roofY(c[0], c[1]) + 0.05;
      eaves.quad([a[0], ha - 0.18, a[1]], [c[0], hc - 0.18, c[1]], [c[0], hc, c[1]], [a[0], ha, a[1]], [0, 0], [1, 0], [1, 1], [0, 1]);
    }
  }
  const group = new THREE.Group();
  const add = (gb, mat) => { if (!gb.pos.length) return; const m = new THREE.Mesh(gb.build(), mat); m.castShadow = m.receiveShadow = true; group.add(m); };
  add(facade, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facade, roughness: 0.92 }));
  add(plaster, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadePlaster, roughness: 0.95 }));
  add(stone, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.stone, roughness: 0.95 }));
  add(facadeGround, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadeGround, roughness: 0.92 }));
  add(plasterGround, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.facadePlasterGround, roughness: 0.95 }));
  urbanB.forEach((gb, k) => add(gb, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.urban[k], roughness: 0.9 })));
  groundB.forEach((gb, k) => add(gb, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.urbanGround[k], roughness: 0.85 })));
  add(flat, new THREE.MeshStandardMaterial({ map: tex.flatRoof, roughness: 1, vertexColors: true }));
  add(roof, new THREE.MeshStandardMaterial({ vertexColors: true, map: tex.roof, roughness: 0.8, side: THREE.DoubleSide }));
  add(eaves, new THREE.MeshStandardMaterial({ color: 0x5a2c1c, roughness: 0.9, side: THREE.DoubleSide }));
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
export function buildRoads(data, terrain, tex) {
  const byMat = { asphalt: new GeoBuilder(), concrete: new GeoBuilder(), dirt: new GeoBuilder(), sidewalk: new GeoBuilder() };
  const urban = data.style === 'urban', lamps = [];
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
  for (const r of data.roads) {
    const gb = byMat[r.s] || byMat.asphalt; const hw = r.w / 2;
    const P = densify(r.p, 2.5); let dist = 0;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1];
      const na = sideNormal(P, i), nb = sideNormal(P, i + 1);
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const pa = [a[0] + na[0] * hw, a[1] + na[1] * hw], qa = [a[0] - na[0] * hw, a[1] - na[1] * hw];
      const pb = [b[0] + nb[0] * hw, b[1] + nb[1] * hw], qb = [b[0] - nb[0] * hw, b[1] - nb[1] * hw];
      const y = (p) => terrain.height(p[0], p[1]) + 0.08;
      const us = r.w / 4;
      gb.quad([qa[0], y(qa), qa[1]], [pa[0], y(pa), pa[1]], [pb[0], y(pb), pb[1]], [qb[0], y(qb), qb[1]],
        [0, dist / 4], [us, dist / 4], [us, (dist + L) / 4], [0, (dist + L) / 4]);
      dist += L;
    }
  }
  const group = new THREE.Group();
  const mats = {
    asphalt: new THREE.MeshStandardMaterial({ map: tex.asphalt, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -2 }),
    concrete: new THREE.MeshStandardMaterial({ map: tex.concrete, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -2 }),
    dirt: new THREE.MeshStandardMaterial({ map: tex.dirt, roughness: 1, polygonOffset: true, polygonOffsetFactor: -1, transparent: true, opacity: 0.85 }),
    sidewalk: new THREE.MeshStandardMaterial({ map: tex.sidewalk, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -1 }),
  };
  for (const [k, gb] of Object.entries(byMat)) if (gb.pos.length) { const m = new THREE.Mesh(gb.build(), mats[k]); m.receiveShadow = true; group.add(m); }
  // líneas de la carretera nacional
  const lines = new GeoBuilder();
  for (const r of data.roads) if (r.lines) {
    const P = densify(r.p, 2.5);
    for (let i = 0; i < P.length - 1; i++) {
      for (const off of [-r.w / 2 + 0.3, r.w / 2 - 0.3]) {
        const a = P[i], b = P[i + 1], na = sideNormal(P, i), nb = sideNormal(P, i + 1);
        const A = [a[0] + na[0] * off, a[1] + na[1] * off], B = [b[0] + nb[0] * off, b[1] + nb[1] * off];
        const w = 0.07, y = (p) => terrain.height(p[0], p[1]) + 0.1;
        lines.quad([A[0] - na[0] * w, y(A), A[1] - na[1] * w], [A[0] + na[0] * w, y(A), A[1] + na[1] * w], [B[0] + nb[0] * w, y(B), B[1] + nb[1] * w], [B[0] - nb[0] * w, y(B), B[1] - nb[1] * w], [0, 0], [1, 0], [1, 1], [0, 1]);
      }
    }
  }
  if (lamps.length) {
    const pole = new THREE.CylinderGeometry(0.06, 0.09, 6, 6); pole.translate(0, 3, 0);
    const arm = new THREE.BoxGeometry(0.08, 0.08, 1.2); arm.translate(0, 5.95, 0.55);
    const head = new THREE.BoxGeometry(0.3, 0.12, 0.55); head.translate(0, 5.9, 1.1);
    const g = mergeGeometries([pole, arm, head]);
    const im = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: 0x4a5056, roughness: 0.5, metalness: 0.6 }), lamps.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    lamps.forEach(([x, z, rot], i) => { q.setFromAxisAngle(up, rot); m.compose(new THREE.Vector3(x, terrain.height(x, z), z), q, new THREE.Vector3(1, 1, 1)); im.setMatrixAt(i, m); });
    im.castShadow = true; group.add(im); group.userData.lamps = lamps;
  }
  if (lines.pos.length) group.add(new THREE.Mesh(lines.build(), new THREE.MeshStandardMaterial({ color: 0xe8e8e0, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -4 })));
  return group;
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
export function buildWalls(data, terrain, tex, colliders) {
  const gb = new GeoBuilder();
  for (const w of data.walls) {
    const P = densify(w.p, 2); const h = w.h || 1.2, t = 0.25; let dist = 0;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1], n = sideNormal(P, i), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const ya = terrain.height(a[0], a[1]) - 0.2, yb = terrain.height(b[0], b[1]) - 0.2;
      for (const s of [1, -1]) {
        const A = [a[0] + n[0] * t * s, a[1] + n[1] * t * s], B = [b[0] + n[0] * t * s, b[1] + n[1] * t * s];
        const q = [[A[0], ya, A[1]], [B[0], yb, B[1]], [B[0], yb + h, B[1]], [A[0], ya + h, A[1]]];
        const uv = [[dist / 3, 0], [(dist + L) / 3, 0], [(dist + L) / 3, h / 3], [dist / 3, h / 3]];
        if (s > 0) gb.quad(q[1], q[0], q[3], q[2], uv[1], uv[0], uv[3], uv[2]); else gb.quad(...q, ...uv);
      }
      const A = [a[0] + n[0] * t, a[1] + n[1] * t], B = [b[0] + n[0] * t, b[1] + n[1] * t], C = [b[0] - n[0] * t, b[1] - n[1] * t], D = [a[0] - n[0] * t, a[1] - n[1] * t];
      gb.quad([D[0], ya + h, D[1]], [C[0], yb + h, C[1]], [B[0], yb + h, B[1]], [A[0], ya + h, A[1]], [0, 0], [L / 3, 0], [L / 3, 0.15], [0, 0.15]);
      colliders.addSegment(a[0], a[1], b[0], b[1], 'wall');
      dist += L;
    }
  }
  const m = new THREE.Mesh(gb.build(), new THREE.MeshStandardMaterial({ map: tex.stone, roughness: 1, side: THREE.DoubleSide }));
  m.castShadow = m.receiveShadow = true; return m;
}

// ---------- árboles (encinas y robles) instanciados con dos niveles de detalle ----------
function crownGeometry(detail, lobes) {
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
export function buildTerrain(meta, terrain, orthoFull, orthoCenter, tex) {
  const n = meta.n, size = (n - 1) * meta.cell;
  const geo = new THREE.PlaneGeometry(size, size, n - 1, n - 1); geo.rotateX(-Math.PI / 2);
  geo.translate(meta.origin[0] + size / 2, 0, meta.origin[1] + size / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, terrain.height(p.getX(i), p.getZ(i)));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ map: orthoFull, roughness: 1 });
  const fb = meta.ortho.full, cb = meta.ortho.center;
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.tCenter = { value: orthoCenter }; sh.uniforms.tDetail = { value: tex.detail };
    sh.uniforms.fullB = { value: new THREE.Vector4(...fb) }; sh.uniforms.centerB = { value: new THREE.Vector4(...cb) };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vWPos; uniform sampler2D tCenter; uniform sampler2D tDetail; uniform vec4 fullB; uniform vec4 centerB;`)
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
      diffuseColor *= col;`);
  };
  const mesh = new THREE.Mesh(geo, mat); mesh.receiveShadow = true;
  return mesh;
}
