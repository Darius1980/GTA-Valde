// Gasolinera y concesionario (el taller lo quitó Darío): en qué gastar lo que ganas.
import * as THREE from 'three';
import { beam } from './missions.js';
import { textTex } from './models.js';
import { SPEC } from './car.js';

export const FOR_SALE = [
  { kind: 'tractor', color: 0x2f7d32, price: 300 },
  { kind: 'moto', color: 0xc0392b, price: 450 },
  { kind: '4x4', color: 0x55606a, price: 650 },
];

const mat = (c, r = 0.8, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
function boxAt(g, w, h, d, m, x, y, z) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); return o; }
function sign(text, bg, fg, w, h) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: textTex(text, bg, fg, 512, Math.round(512 * h / w)), roughness: 0.6, side: THREE.DoubleSide }));
  m.castShadow = true; return m;
}

// sitios de la gasolinera, el taller y el concesionario (antes de plantar los árboles, para dejarlos libres)
export function findShopSites(data, center, colliders) {
  const lim = (data.half || 1000) - 120;
  const roads = data.roads, inMap = (p) => Math.abs(p[0]) < lim && Math.abs(p[1]) < lim;
  const along = (kinds, minC, maxC, avoid = []) => {
    let best = null, bd = Infinity;
    for (const r of roads) if (kinds.includes(r.k)) for (let i = 0; i < r.p.length - 1; i++) {
      const p = r.p[i], q = r.p[i + 1], dc = Math.hypot(p[0] - center[0], p[1] - center[1]);
      if (dc < minC || dc > maxC || !inMap(p) || Math.hypot(q[0] - p[0], q[1] - p[1]) < 8) continue;
      if (avoid.some(a => Math.hypot(a[0] - p[0], a[1] - p[1]) < 150)) continue;
      if (dc < bd) { bd = dc; best = { p, q, w: r.w }; }
    }
    return best;
  };
  const beside = (s, off) => {
    const dx = s.q[0] - s.p[0], dz = s.q[1] - s.p[1], L = Math.hypot(dx, dz), nx = -dz / L, nz = dx / L, h = Math.atan2(dx, dz);
    for (const side of [1, -1]) {
      const x = s.p[0] + dx / L * 4 + nx * off * side, z = s.p[1] + dz / L * 4 + nz * off * side;
      if (!colliders.nearest(x, z, off * 0.8)) return { x, z, h, nx: nx * side, nz: nz * side, ux: dx / L, uz: dz / L };
    }
    return { x: s.p[0] + nx * off, z: s.p[1] + nz * off, h, nx, nz, ux: dx / L, uz: dz / L };
  };
  const out = {};
  const gs = along(['trunk'], 0, lim * 1.4) || along(['tertiary'], 100, lim * 1.4);
  if (gs) out.gas = beside(gs, gs.w / 2 + 8);
  const cs = along(['trunk', 'tertiary'], 220, lim * 1.4, out.gas ? [[out.gas.x, out.gas.z]] : []);
  if (cs) out.shop = beside(cs, cs.w / 2 + 11);
  return out;
}

export class Shops {
  constructor({ scene, world, data, center, colliders, spawnVehicle, wallet, toast, sound, owned, sites }) {
    Object.assign(this, { scene, world, wallet, toast, sound, spawnVehicle });
    const T = world.terrain;
    this.places = [];
    // --- gasolinera junto a la nacional (o la carretera de entrada)
    sites = sites || findShopSites(data, center, colliders);
    if (sites.gas) {
      const b = sites.gas, g = new THREE.Group(); g.position.set(b.x, T.height(b.x, b.z), b.z); g.rotation.y = b.h;
      const white = mat(0xf2f2f0, 0.6), red = mat(0xc8261e, 0.5), gray = mat(0x7d8288, 0.5, 0.4);
      boxAt(g, 7, 0.35, 11, white, 0, 4.6, 0); boxAt(g, 7.1, 0.25, 11.1, red, 0, 4.35, 0);
      for (const [x, z] of [[-3, -4.5], [3, -4.5], [-3, 4.5], [3, 4.5]]) { boxAt(g, 0.3, 4.4, 0.3, white, x, 2.2, z); }
      for (const z of [-2, 2]) { boxAt(g, 0.7, 1.6, 0.5, gray, 0, 0.8, z); boxAt(g, 0.5, 0.3, 0.52, mat(0x103020, 0.2), 0, 1.3, z); }
      const pole = boxAt(g, 0.25, 6, 0.25, gray, -4.5, 3, 6); const s = sign('⛽ GASOLINERA', '#c8261e', '#ffffff', 3, 0.8); s.position.set(-4.5, 5.6, 6); s.rotation.y = Math.PI / 2; g.add(s);
      scene.add(g);
      for (const [x, z] of [[-3, -4.5], [3, -4.5], [-3, 4.5], [3, 4.5], [0, -2], [0, 2]]) {
        const wx = b.x + Math.cos(b.h) * x + Math.sin(b.h) * z, wz = b.z - Math.sin(b.h) * x + Math.cos(b.h) * z;
        colliders.addSegment(wx - 0.25, wz, wx + 0.25, wz, 'wall');
      }
      const mx = b.x + Math.cos(b.h) * 2, mz = b.z - Math.sin(b.h) * 2;
      this.places.push({ kind: 'gas', name: 'Gasolinera', x: mx, z: mz, marker: this.#marker(0xff8c1a, mx, mz) });
      this.gasAt = [mx, mz];
    }
    // --- concesionario a las afueras, con los vehículos a la venta
    this.forSale = [];
    if (sites.shop) {
      const b = sites.shop, g = new THREE.Group(); g.position.set(b.x, T.height(b.x, b.z), b.z); g.rotation.y = b.h;
      const gray = mat(0x8a8f95, 0.5, 0.4);
      boxAt(g, 0.3, 5, 0.3, gray, -6, 2.5, -8); boxAt(g, 0.3, 5, 0.3, gray, 6, 2.5, -8);
      const s = sign('CONCESIONARIO VALDE', '#13324d', '#f5c542', 12, 1.4); s.position.set(0, 4.3, -8); g.add(s);
      const pg = new THREE.PlaneGeometry(16, 20, 8, 10); pg.rotateX(-Math.PI / 2);
      const pa = pg.attributes.position;
      for (let i = 0; i < pa.count; i++) { const lx = pa.getX(i), lz = pa.getZ(i); pa.setY(i, T.height(b.x + Math.cos(b.h) * lx + Math.sin(b.h) * lz, b.z - Math.sin(b.h) * lx + Math.cos(b.h) * lz) - g.position.y + 0.07); }
      pg.computeVertexNormals();
      const ground = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ color: 0x5c5f63, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -2 })); ground.receiveShadow = true; g.add(ground);
      scene.add(g);
      FOR_SALE.forEach((v, i) => {
        if (owned.includes(v.kind)) return;
        const lx = -5 + i * 5, lz = 0;
        const x = b.x + Math.cos(b.h) * lx + Math.sin(b.h) * lz, z = b.z - Math.sin(b.h) * lx + Math.cos(b.h) * lz;
        const car = spawnVehicle(v.kind, v.color, x, z, b.h + Math.PI / 2); car.forSale = v;
        const board = sign(`${SPEC[v.kind].name} · ${v.price} €`, '#ffffff', '#13324d', 2.4, 0.5);
        board.position.set(x - Math.sin(b.h + Math.PI / 2) * 2.6, T.height(x, z) + 1.1, z - Math.cos(b.h + Math.PI / 2) * 2.6); board.rotation.y = b.h + Math.PI / 2;
        scene.add(board); car.board = board;
        this.forSale.push(car);
      });
      this.places.push({ kind: 'shop', name: 'Concesionario', x: b.x, z: b.z, marker: null });
    }
    this.cool = 0;
  }
  #marker(color, x, z) {
    const m = beam(color); m.scale.set(0.9, 0.35, 0.9); m.position.set(x, this.world.terrain.height(x, z), z); m.visible = true; this.scene.add(m); return m;
  }
  get flags() { return this.places.map(p => [p.x, p.z, p.kind]); }
  // al pulsar E/🚪 a pie junto a un vehículo en venta: comprarlo
  tryBuy(player) {
    for (const c of this.forSale) {
      if (!c.forSale || c.pos.distanceTo(player.pos) > 3.2 * c.s + 1.5) continue;
      const v = c.forSale;
      if (this.wallet.money < v.price) { this.toast('No te llega', `${SPEC[v.kind].name}: ${v.price} € · tienes ${this.wallet.money} €`); this.sound?.('fail'); return true; }
      this.wallet.money -= v.price; c.forSale = null; c.owned = true; this.scene.remove(c.board);
      this.toast(`🎉 ¡${SPEC[v.kind].name} comprado!`, `-${v.price} € · ya es tuyo, súbete con E / 🚪`); this.sound?.('ok');
      this.onBuy?.(c);
      return true;
    }
    return false;
  }
  update(dt, driving, player) {
    const t = performance.now() / 1000; let hint = ''; this.offer = null;
    for (const p of this.places) if (p.marker) { p.marker.userData.col.material.opacity = 0.22 + 0.1 * Math.sin(t * 3); }
    const pos = driving ? driving.pos : player.pos;
    for (const c of this.forSale) if (c.forSale && !driving && c.pos.distanceTo(player.pos) < 3.2 * c.s + 1.5) hint = `Comprar ${SPEC[c.forSale.kind].name.toLowerCase()} por ${c.forSale.price} € (E / 🚪)`;
    if (this.cool > 0) this.cool -= dt;
    for (const p of this.places) {
      if (!p.marker) continue;
      const d = Math.hypot(pos.x - p.x, pos.z - p.z);
      if (d > 5) continue;
      if (!driving) { hint = 'Ven en coche para repostar'; continue; }
      if (Math.abs(driving.speed) > 1.5) { hint = 'Para aquí'; continue; }
      if (p.kind === 'gas') {
        if (driving.fuel > 0.97) { hint = '⛽ El depósito ya está lleno'; continue; }
        const cost = Math.max(1, Math.ceil((1 - driving.fuel) * 35));
        this.offer = { id: 'shop:gas', text: `⛽ Llenar el depósito por ${cost} €`, go: () => {
          if (this.wallet.money < cost) { this.toast('⛽ No te llega', `Llenar cuesta ${cost} €`); this.sound?.('fail'); return; }
          this.wallet.money -= cost; driving.fuel = 1; this.toast('⛽ Depósito lleno', `-${cost} €`); this.sound?.('ok'); } };
      }
    }
    return hint;
  }
}
