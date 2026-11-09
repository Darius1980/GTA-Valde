// Entorno lejano (radio de 10 km): relieve con ortofoto, carreteras y caminos, pueblos de alrededor y encinas.
// Todo va por teselas que se construyen al acercarse y se ocultan más allá de la niebla.
import * as THREE from 'three';
import { buildBuildings, buildRoads, terrainMaterial, crownGeometry, smoothRoads } from './world.js';
import { weatherize } from './weather.js';

const TILE = 2000; // teselas de carreteras, edificios y árboles

export class Outer {
  constructor({ data, terrain, tex, colliders, ortho, scene }) {
    Object.assign(this, { data, terrain, tex, colliders, scene });
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
    for (const r of data.roads) { // cada carretera se trocea por teselas
      let cur = null, curT = null;
      for (let i = 0; i < r.p.length - 1; i++) {
        const a = r.p[i], b = r.p[i + 1], T = tile((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
        if (T !== curT) { cur = { ...r, p: [a] }; curT = T; T.roads.push(cur); }
        cur.p.push(b);
      }
    }
    for (const g of data.groups) for (const b of g.b) { const c = b.p[0]; tile(c[0], c[1]).b.push(b); }
    for (const tr of data.trees) tile(tr[0], tr[1]).trees.push(tr);
    // encina: copa ancha y achaparrada, tronco corto
    this.crown = crownGeometry(0, 3); this.trunk = new THREE.CylinderGeometry(0.16, 0.26, 1.6, 5); this.trunk.translate(0, 0.8, 0);
    this.leafMat = new THREE.MeshStandardMaterial({ map: tex.leaves, color: 0x7d8c66, roughness: 0.95, flatShading: true });
    this.barkMat = new THREE.MeshStandardMaterial({ map: tex.bark, roughness: 1 });
    this.queue = [];
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
    if (T.b.length) g.add(buildBuildings({ buildings: T.b, style: 'rural' }, this.terrain, this.tex, this.colliders));
    if (T.trees.length) {
      const N = T.trees.length, crowns = new THREE.InstancedMesh(this.crown, this.leafMat, N), trunks = new THREE.InstancedMesh(this.trunk, this.barkMat, N);
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
      T.trees.forEach(([x, z, sc], i) => {
        const y = this.terrain.height(x, z); q.setFromAxisAngle(up, (x * 13.37 + z * 7.1) % 6.28);
        s.set(sc * 1.2, sc, sc * 1.2); p.set(x, y - 0.1, z); m.compose(p, q, s); trunks.setMatrixAt(i, m);
        s.set(sc * 2.9, sc * 1.7, sc * 2.9); p.set(x, y + sc * 2.3, z); m.compose(p, q, s); crowns.setMatrixAt(i, m);
        col.setHSL(0.21 + (((x * 3.1 + z) % 1) + 1) % 1 * 0.05, 0.2, 0.3 + (((x + z * 2.3) % 1) + 1) % 1 * 0.1); crowns.setColorAt(i, col);
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
    const want = [];
    for (const T of this.tiles.values()) {
      const dx = Math.max(Math.abs(pos.x - T.cx) - TILE / 2, 0), dz = Math.max(Math.abs(pos.z - T.cz) - TILE / 2, 0), d = Math.hypot(dx, dz);
      if (T.built) T.obj.visible = d < R;
      else if (d < R + 300 && !this.queue.includes(T)) want.push([d, T]);
    }
    want.sort((a, b) => a[0] - b[0]); for (const [, T] of want) this.queue.push(T);
    if (this.queue.length) this.build(this.queue.shift());
  }
  // construir ya lo que rodea al jugador (al cargar una partida lejos del pueblo)
  prime(pos, far) { this.update(pos, far); while (this.queue.length) this.build(this.queue.shift()); }
  placeName(x, z) {
    let best = null, bd = 1400;
    for (const p of this.places) { const d = Math.hypot(p.c[0] - x, p.c[1] - z); if (d < bd && p.kind !== 'locality' && p.kind !== 'isolated_dwelling') { bd = d; best = p; } }
    return best?.name;
  }
}
