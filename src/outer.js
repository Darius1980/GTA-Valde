// Entorno lejano (radio de 10 km): relieve con ortofoto, carreteras y caminos, pueblos de alrededor y encinas.
// Todo va por teselas que se construyen al acercarse y se ocultan más allá de la niebla.
import * as THREE from 'three';
import { buildBuildings, buildRoads, terrainMaterial, crownGeometry, smoothRoads, buildBridges } from './world.js';
import { weatherize } from './weather.js';

const TILE = 2000; // teselas de carreteras, edificios y árboles

export class Outer {
  constructor({ data, terrain, tex, colliders, ortho, scene, base }) {
    Object.assign(this, { data, terrain, tex, colliders, scene, base, ortho });
    this.group = new THREE.Group(); scene.add(this.group);
    this.shared = new Map(); this.surfaces = []; this.U = null;
    this.places = data.places || [];
    // ---- relieve por trozos de 32 x 32 celdas
    const t = data.terrain, n = t.n, cell = t.cell, o = t.origin[0], E = t.edge, h = terrain.o.h, C = 32;
    const mat = terrainMaterial(ortho, ortho, data.ortho.bounds, [9e5, 9e5, 9e5 + 1, 9e5 + 1], tex);
    this.terrainMat = mat; this.surfaces.push(mat);
    this.chunks = [];
    const H = (i, j) => h[Math.min(n - 1, Math.max(0, j)) * n + Math.min(n - 1, Math.max(0, i))];
    for (let cj = 0; cj < n - 1; cj += C) for (let ci = 0; ci < n - 1; ci += C) {
      const W = Math.min(C, n - 1 - ci) + 1, D = Math.min(C, n - 1 - cj) + 1;
      const pos = new Float32Array(W * D * 3), nor = new Float32Array(W * D * 3), idx = [];
      for (let b = 0; b < D; b++) for (let a = 0; a < W; a++) {
        const i = ci + a, j = cj + b, k = (b * W + a) * 3;
        pos[k] = o + i * cell; pos[k + 1] = H(i, j); pos[k + 2] = o + j * cell;
        const nx = H(i - 1, j) - H(i + 1, j), nz = H(i, j - 1) - H(i, j + 1), ny = 2 * cell, L = Math.hypot(nx, ny, nz);
        nor[k] = nx / L; nor[k + 1] = ny / L; nor[k + 2] = nz / L;
      }
      for (let b = 0; b < D - 1; b++) for (let a = 0; a < W - 1; a++) {
        const xc = o + (ci + a + 0.5) * cell, zc = o + (cj + b + 0.5) * cell;
        if (Math.abs(xc) < E && Math.abs(zc) < E) continue; // ahí está el terreno detallado del pueblo
        const A = b * W + a, B = A + 1, Cc = A + W, Dd = Cc + 1;
        idx.push(A, Cc, B, B, Cc, Dd);
      }
      if (!idx.length) continue;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(W * D * 2), 2));
      g.setIndex(idx); g.computeBoundingSphere(); g.computeBoundingBox();
      const m = new THREE.Mesh(g, mat); m.receiveShadow = true; this.group.add(m);
      this.chunks.push({ obj: m, box: g.boundingBox });
    }
    // ---- teselas de 2 km: carreteras, edificios y encinas, construidas al acercarse
    this.tiles = new Map();
    const tile = (x, z) => { const k = `${Math.floor(x / TILE)},${Math.floor(z / TILE)}`; if (!this.tiles.has(k)) this.tiles.set(k, { k, roads: [], b: [], trees: [], built: false, obj: null, cx: (Math.floor(x / TILE) + 0.5) * TILE, cz: (Math.floor(z / TILE) + 0.5) * TILE }); return this.tiles.get(k); };
    smoothRoads(data.roads);
    this.group.add(buildBridges(data.roads, terrain, tex, colliders));
    // ---- agua: láminas de embalses y lagunas a la altura de su orilla, y ríos y arroyos como cintas
    this.waterMat = new THREE.MeshStandardMaterial({ color: 0x35525a, roughness: 0.12, metalness: 0.25, transparent: true, opacity: 0.9, polygonOffset: true, polygonOffsetFactor: -3 });
    this.ponds = [];
    const W = data.water || { polys: [], rivers: [] }, pondGeo = [];
    for (const w of W.polys) {
      const hs = [];
      for (let i = 0; i < w.p.length; i++) { const a = w.p[i], b = w.p[(i + 1) % w.p.length], k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 10)); for (let t = 0; t < k; t++) hs.push(terrain.ground(a[0] + (b[0] - a[0]) * t / k, a[1] + (b[1] - a[1]) * t / k)); }
      hs.sort((a, b) => a - b); const y = hs[Math.floor(hs.length * 0.1)] + 0.35;
      const shape = new THREE.Shape(w.p.map(q => new THREE.Vector2(q[0], -q[1])));
      for (const hl of w.h || []) shape.holes.push(new THREE.Path(hl.map(q => new THREE.Vector2(q[0], -q[1]))));
      const g = new THREE.ShapeGeometry(shape); g.rotateX(-Math.PI / 2); g.translate(0, y, 0); pondGeo.push(g);
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity; for (const [x, z] of w.p) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); }
      this.ponds.push({ p: w.p, y, x0, x1, z0, z1 });
    }
    for (const g of pondGeo) { const m = new THREE.Mesh(g, this.waterMat); m.receiveShadow = true; this.group.add(m); }
    for (const r of data.roads) { // cada carretera se trocea por teselas
      let cur = null, curT = null;
      for (let i = 0; i < r.p.length - 1; i++) {
        const a = r.p[i], b = r.p[i + 1], T = tile((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
        if (T !== curT) { cur = { ...r, p: [a] }; curT = T; T.roads.push(cur); }
        cur.p.push(b);
      }
    }
    for (const r of W.rivers) {
      let cur = null, curT = null;
      for (let i = 0; i < r.p.length - 1; i++) {
        const a = r.p[i], b = r.p[i + 1], T = tile((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
        if (T !== curT) { cur = { ...r, p: [a] }; curT = T; (T.rivers = T.rivers || []).push(cur); }
        cur.p.push(b);
      }
    }
    for (const g of data.groups) for (const b of g.b) { const c = b.p[0]; tile(c[0], c[1]).b.push(b); }
    for (const tr of data.trees) tile(tr[0], tr[1]).trees.push(tr);
    // encina: copa ancha y achaparrada, tronco corto
    this.crown = crownGeometry(0, 3); this.trunk = new THREE.CylinderGeometry(0.16, 0.26, 1.6, 5); this.trunk.translate(0, 0.8, 0);
    this.leafMat = new THREE.MeshStandardMaterial({ map: tex.leaves, color: 0x9aa884, roughness: 0.95, flatShading: true });
    this.barkMat = new THREE.MeshStandardMaterial({ map: tex.bark, roughness: 1 });
    this.queue = [];
  }
  // cauces: cinta de agua siguiendo el fondo del valle
  riverMesh(list) {
    const pos = [], idx = [];
    for (const r of list) {
      const P = []; for (let i = 0; i < r.p.length - 1; i++) { const a = r.p[i], b = r.p[i + 1], k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 8)); for (let t = 0; t < k; t++) P.push([a[0] + (b[0] - a[0]) * t / k, a[1] + (b[1] - a[1]) * t / k]); }
      P.push(r.p[r.p.length - 1]);
      const hw = r.w / 2;
      P.forEach((p, i) => {
        const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L, nz = dx / L;
        const y = Math.min(this.terrain.ground(p[0] + nx * hw, p[1] + nz * hw), this.terrain.ground(p[0] - nx * hw, p[1] - nz * hw), this.terrain.ground(p[0], p[1])) + 0.25;
        const o = pos.length / 3; pos.push(p[0] + nx * hw, y, p[1] + nz * hw, p[0] - nx * hw, y, p[1] - nz * hw);
        if (i) idx.push(o - 2, o, o - 1, o - 1, o, o + 1);
      });
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    // la orientación de cada cinta depende del sentido del cauce: normales siempre hacia arriba
    const nr = g.attributes.normal; for (let i = 0; i < nr.count; i++) nr.setXYZ(i, 0, 1, 0);
    const m = new THREE.Mesh(g, this.riverMat || (this.riverMat = this.waterMat.clone())); this.riverMat.side = THREE.DoubleSide; return m;
  }
  // ¿hay agua aquí? (embalses y lagunas): el coche se frena
  waterAt(x, z) {
    for (const w of this.ponds) {
      if (x < w.x0 || x > w.x1 || z < w.z0 || z > w.z1) continue;
      let c = false; const p = w.p;
      for (let i = 0, j = p.length - 1; i < p.length; j = i++) if ((p[i][1] > z) !== (p[j][1] > z) && x < (p[j][0] - p[i][0]) * (z - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
      if (c) return w.y;
    }
    return null;
  }
  // ortofoto de detalle del pueblo más cercano (se carga al acercarse)
  detail(pos) {
    const list = this.data.detail || []; let best = null, bd = 1600;
    for (const d of list) { const k = Math.hypot(d.c[0] - pos.x, d.c[1] - pos.z); if (k < bd) { bd = k; best = d; } }
    if (!best || best === this.curDetail || this.loadingDetail) return;
    this.loadingDetail = true;
    new THREE.TextureLoader().load(this.base + best.file, t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; this.loadingDetail = false;
      const u = this.terrainMat.userData; if (!u.tC) { t.dispose(); this.curDetail = null; return; } // aún sin compilar: se reintenta
      const old = this.curDetail && u.tC.value; u.tC.value = t; u.cB.value.set(...best.bounds);
      if (old && old !== this.ortho) old.dispose(); this.curDetail = best;
    }, undefined, () => { this.loadingDetail = false; this.curDetail = best; });
  }
  setWeather(U) { this.U = U; for (const m of this.surfaces) weatherize(m, U); }
  // un material por textura para todas las teselas (menos programas y cambios de estado)
  share(obj) {
    obj.traverse(o => {
      if (!o.isMesh) return; const m = o.material;
      const key = `${m.type}|${m.map?.uuid || ''}|${m.color?.getHex()}|${m.side}|${m.transparent}|${o.isInstancedMesh}`;
      if (this.shared.has(key)) { if (m !== this.shared.get(key)) m.dispose(); o.material = this.shared.get(key); return; }
      this.shared.set(key, m);
      const t = this.tex, surf = m.map && (m.map === t.roof || m.map === t.flatRoof || m.map === t.asphalt || m.map === t.concrete || m.map === t.dirt);
      if (surf) { this.surfaces.push(m); if (this.U) weatherize(m, this.U); }
    });
  }
  build(T) {
    const g = new THREE.Group();
    if (T.roads.length) g.add(buildRoads({ roads: T.roads, style: 'rural', step: 6, lift: 0.14 }, this.terrain, this.tex, null));
    if (T.rivers) g.add(this.riverMesh(T.rivers));
    if (T.b.length) g.add(buildBuildings({ buildings: T.b, style: 'rural' }, this.terrain, this.tex, this.colliders));
    if (T.trees.length) {
      const N = T.trees.length, crowns = new THREE.InstancedMesh(this.crown, this.leafMat, N), trunks = new THREE.InstancedMesh(this.trunk, this.barkMat, N);
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
      T.trees.forEach(([x, z, sc], i) => {
        const y = this.terrain.height(x, z); q.setFromAxisAngle(up, (x * 13.37 + z * 7.1) % 6.28);
        s.set(sc * 1.2, sc, sc * 1.2); p.set(x, y - 0.1, z); m.compose(p, q, s); trunks.setMatrixAt(i, m);
        s.set(sc * 2.9, sc * 1.7, sc * 2.9); p.set(x, y + sc * 2.3, z); m.compose(p, q, s); crowns.setMatrixAt(i, m);
        col.setHSL(0.2 + (((x * 3.1 + z) % 1) + 1) % 1 * 0.06, 0.22, 0.4 + (((x + z * 2.3) % 1) + 1) % 1 * 0.12); crowns.setColorAt(i, col);
        const r = 0.35 * sc; this.colliders.addSegment(x - r, z, x + r, z, 'tree'); this.colliders.addSegment(x, z - r, x, z + r, 'tree');
      });
      crowns.computeBoundingSphere(); trunks.computeBoundingSphere();
      crowns.castShadow = true; g.add(trunks, crowns);
    }
    this.share(g);
    T.obj = g; T.built = true; this.group.add(g);
  }
  // visibilidad por distancia (la niebla tapa lo de más allá) y construcción progresiva
  update(pos, far) {
    const R = far + 150;
    for (const c of this.chunks) {
      const b = c.box, dx = Math.max(b.min.x - pos.x, 0, pos.x - b.max.x), dz = Math.max(b.min.z - pos.z, 0, pos.z - b.max.z);
      c.obj.visible = dx * dx + dz * dz < R * R;
    }
    if ((this._t = (this._t || 0) + 1) % 10) { if (this.queue.length) this.build(this.queue.shift()); return; }
    this.scan(pos, R); this.detail(pos);
    if (this.queue.length) this.build(this.queue.shift());
  }
  scan(pos, R) {
    const want = [];
    for (const T of this.tiles.values()) {
      const dx = Math.max(Math.abs(pos.x - T.cx) - TILE / 2, 0), dz = Math.max(Math.abs(pos.z - T.cz) - TILE / 2, 0), d = Math.hypot(dx, dz);
      if (T.built) T.obj.visible = d < R;
      else if (d < R + 300 && !this.queue.includes(T)) want.push([d, T]);
    }
    want.sort((a, b) => a[0] - b[0]); for (const [, T] of want) this.queue.push(T);
  }
  // construir ya lo que rodea al jugador (al cargar una partida lejos del pueblo)
  prime(pos, far) { this.update(pos, far); this.scan(pos, far + 150); while (this.queue.length) this.build(this.queue.shift()); }
  placeName(x, z) {
    let best = null, bd = 1400;
    for (const p of this.places) { const d = Math.hypot(p.c[0] - x, p.c[1] - z); if (d < bd && p.kind !== 'locality' && p.kind !== 'isolated_dwelling') { bd = d; best = p; } }
    return best?.name;
  }
}
