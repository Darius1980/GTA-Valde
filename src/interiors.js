// Interiores: la iglesia y el bar. Están construidos lejos del mapa (más allá del borde) y se entra
// por una puerta marcada en la fachada; al cruzarla, el jugador aparece dentro.
import * as THREE from 'three';
import { beam } from './missions.js';
import { makeCharacter, animateCharacter, textTex } from './models.js';

const std = (c, r = 0.85, m = 0, e = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, emissive: c, emissiveIntensity: e });
function box(g, w, h, d, m, x, y, z, ry = 0) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.y = ry; o.receiveShadow = true; g.add(o); return o; }
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }

// habitación: suelo, cuatro paredes, techo y colisiones
function room(g, colliders, ox, oz, W, D, H, wallM, floorM, ceilM) {
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorM); fl.rotation.x = -Math.PI / 2; fl.position.set(ox, 0.01, oz); fl.receiveShadow = true; g.add(fl);
  const ce = new THREE.Mesh(new THREE.PlaneGeometry(W, D), ceilM); ce.rotation.x = Math.PI / 2; ce.position.set(ox, H, oz); g.add(ce);
  for (const [x, z, w, ry] of [[ox, oz - D / 2, W, 0], [ox, oz + D / 2, W, Math.PI], [ox - W / 2, oz, D, Math.PI / 2], [ox + W / 2, oz, D, -Math.PI / 2]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, H), wallM); m.position.set(x, H / 2, z); m.rotation.y = ry; g.add(m);
  }
  colliders.addSegment(ox - W / 2, oz - D / 2, ox + W / 2, oz - D / 2, 'wall'); colliders.addSegment(ox - W / 2, oz + D / 2, ox + W / 2, oz + D / 2, 'wall');
  colliders.addSegment(ox - W / 2, oz - D / 2, ox - W / 2, oz + D / 2, 'wall'); colliders.addSegment(ox + W / 2, oz - D / 2, ox + W / 2, oz + D / 2, 'wall');
}
function npc(opts, scale, sitting = false) {
  const m = makeCharacter(opts); m.scale.setScalar(scale);
  if (sitting) { const p = m.userData.parts; p.hips.position.y = 0.48; p.lHip.rotation.x = p.rHip.rotation.x = -1.45; p.lKnee.rotation.x = p.rKnee.rotation.x = 1.45; p.lElbow.rotation.x = p.rElbow.rotation.x = -1; }
  return m;
}

export class Interiors {
  constructor({ scene, world, data, center, tex, bellTower }) {
    Object.assign(this, { scene, world });
    const colliders = world.colliders, S = world.personScale, base = (data.half || 1000) + 600;
    this.rooms = []; this.inside = null; this.cool = 0;
    const g = new THREE.Group(); scene.add(g); this.group = g;
    const cen = (b) => { let x = 0, z = 0; for (const p of b.p) { x += p[0]; z += p[1]; } return [x / b.p.length, z / b.p.length]; };
    // puerta exterior: punto de la fachada más cercano a la calle
    const doorOf = (b) => {
      const [cx, cz] = cen(b); let best = null, bd = Infinity;
      for (const r of data.roads) if (r.k !== 'track' && r.k !== 'path') for (const p of r.p) { const d = Math.hypot(p[0] - cx, p[1] - cz); if (d < bd) { bd = d; best = p; } }
      if (!best) return null;
      const w = colliders.nearest(best[0] + (cx - best[0]) * 0.5, best[1] + (cz - best[1]) * 0.5, 30);
      return w ? [w.x + w.nx * 1.3, w.z + w.nz * 1.3, Math.atan2(w.nx, w.nz)] : null;
    };

    // --- iglesia: nave de piedra con bancos, retablo dorado y velas
    const church = data.buildings.find(b => b.id === data.church);
    const cDoor = church && doorOf(church);
    if (cDoor) {
      const ox = base, oz = 0, W = 10, D = 24, H = 9;
      const stone = new THREE.MeshStandardMaterial({ map: tex.ashlar, color: 0xd8cfc0, roughness: 0.95, emissive: 0x2a2620, emissiveIntensity: 0.6 });
      tex.ashlar.wrapS = tex.ashlar.wrapT = THREE.RepeatWrapping;
      room(g, colliders, ox, oz, W, D, H, stone, std(0x6e6257, 0.9, 0, 0.25), std(0x4a3626, 0.9, 0, 0.3));
      const wood = std(0x5a3a22, 0.7, 0, 0.25);
      for (let r = 0; r < 7; r++) for (const sx of [-1, 1]) {
        const z = oz - 6 + r * 2.1, x = ox + sx * 2.4;
        box(g, 3.2, 0.1, 0.5, wood, x, 0.48, z); box(g, 3.2, 0.6, 0.08, wood, x, 0.8, z + 0.28); box(g, 0.08, 0.5, 0.5, wood, x - 1.55, 0.25, z); box(g, 0.08, 0.5, 0.5, wood, x + 1.55, 0.25, z);
        colliders.addSegment(x - 1.6, z, x + 1.6, z, 'wall');
      }
      // presbiterio, altar y retablo
      box(g, W, 0.4, 5, std(0x8a7a68, 0.8, 0, 0.3), ox, 0.2, oz - D / 2 + 2.5);
      box(g, 2.4, 1.0, 1, std(0xe8e0d0, 0.6, 0, 0.3), ox, 0.9, oz - D / 2 + 3.2);
      const ret = canvasTex(512, 640, (c, w, h) => {
        const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#b88a2a'); gr.addColorStop(0.5, '#f0cc60'); gr.addColorStop(1, '#a07020'); c.fillStyle = gr; c.fillRect(0, 0, w, h);
        c.strokeStyle = '#5a3a10'; c.lineWidth = 8; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { c.strokeRect(20 + i * 160, 20 + j * 200, 150, 190); c.fillStyle = ['#3a5a8a', '#8a2a2a', '#2a5a3a'][(i + j) % 3]; c.fillRect(45 + i * 160, 50 + j * 200, 100, 130); }
      });
      const retablo = new THREE.Mesh(new THREE.PlaneGeometry(6, 7.5), new THREE.MeshStandardMaterial({ map: ret, metalness: 0.6, roughness: 0.35, emissive: 0x806020, emissiveIntensity: 0.35 }));
      retablo.position.set(ox, 4.4, oz - D / 2 + 0.05); g.add(retablo);
      const flame = new THREE.MeshBasicMaterial({ color: 0xffd070 });
      for (const sx of [-0.9, -0.5, 0.5, 0.9]) { box(g, 0.06, 0.4, 0.06, std(0xf4f0e0, 0.5, 0, 0.4), ox + sx, 1.6, oz - D / 2 + 3.2); const f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), flame); f.position.set(ox + sx, 1.84, oz - D / 2 + 3.2); g.add(f); }
      // vidrieras que brillan
      const glass = canvasTex(64, 128, (c, w, h) => { for (let i = 0; i < 24; i++) { c.fillStyle = ['#c03030', '#3050c0', '#e0c040', '#30a050'][i % 4]; c.fillRect((i % 4) * 16, (i / 4 | 0) * 22, 16, 22); } });
      for (const sx of [-1, 1]) for (const z of [-4, 3]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.6), new THREE.MeshBasicMaterial({ map: glass })); w.position.set(ox + sx * (W / 2 - 0.02), 5.5, oz + z); w.rotation.y = -sx * Math.PI / 2; g.add(w); }
      // alguna vecina rezando
      for (const [x, z] of [[ox - 2, oz - 6], [ox + 2.6, oz - 1.8]]) { const m = npc({ shirt: 0x1a1a1a, pants: 0x1a1a1a, hair: 0xb0b0b0 }, S, true); m.position.set(x, 0.02, z - 0.1); m.rotation.y = Math.PI; g.add(m); }
      this.#addRoom('Iglesia', '⛪', cDoor, [ox, oz + D / 2 - 1.5, Math.PI], [ox - W / 2, oz - D / 2, ox + W / 2, oz + D / 2], null);
    }

    // --- bar del pueblo: barra, botellas, mesas y tele
    const bar = data.buildings.filter(b => b.use === 'res' && b.id !== data.church).map(b => [b, Math.hypot(cen(b)[0] - center[0], cen(b)[1] - center[1])]).sort((a, b) => a[1] - b[1])[0]?.[0];
    const bDoor = bar && doorOf(bar);
    if (bDoor) {
      const ox = base + 60, oz = 0, W = 9, D = 12, H = 3.4;
      const tiles = canvasTex(256, 256, (c, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { c.fillStyle = (i + j) % 2 ? '#b8a890' : '#7a6650'; c.fillRect(i * 32, j * 32, 32, 32); } });
      tiles.wrapS = tiles.wrapT = THREE.RepeatWrapping; tiles.repeat.set(4, 5);
      const wall = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#e8dcc0'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f6a4a'; c.fillRect(0, h * 0.62, w, h * 0.38); c.fillStyle = '#1e4a32'; c.fillRect(0, h * 0.6, w, 6); });
      room(g, colliders, ox, oz, W, D, H, new THREE.MeshStandardMaterial({ map: wall, roughness: 0.9, emissive: 0x302a20, emissiveIntensity: 0.6 }),
        new THREE.MeshStandardMaterial({ map: tiles, roughness: 0.6, emissive: 0x201a14, emissiveIntensity: 0.6 }), std(0xd8d0c0, 0.9, 0, 0.5));
      const wood = std(0x6a4022, 0.6, 0, 0.3), steel = std(0xaab0b5, 0.3, 0.8, 0.2);
      // barra a lo largo del fondo
      box(g, 6, 1.05, 0.7, wood, ox, 0.52, oz - D / 2 + 2.2); box(g, 6.1, 0.06, 0.8, std(0x2a2a2a, 0.3, 0.2, 0.2), ox, 1.07, oz - D / 2 + 2.2);
      colliders.addSegment(ox - 3, oz - D / 2 + 2.2, ox + 3, oz - D / 2 + 2.2, 'wall');
      box(g, 6, 2.2, 0.35, wood, ox, 1.5, oz - D / 2 + 0.2);
      const cols = [0x2a6a2a, 0x8a5a1a, 0xd8d0b0, 0x5a1a1a, 0x1a3a6a, 0xc0a040];
      for (let i = 0; i < 30; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.28, 8), std(cols[i % 6], 0.15, 0.2, 0.3)); b.position.set(ox - 2.7 + (i % 15) * 0.38, 1.2 + (i / 15 | 0) * 0.55, oz - D / 2 + 0.3); g.add(b); }
      for (let k = 0; k < 4; k++) { const x = ox - 2.2 + k * 1.45, z = oz - D / 2 + 2.9; box(g, 0.05, 0.75, 0.05, steel, x, 0.38, z); const s = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 12), std(0x8a1c1c, 0.6, 0, 0.3)); s.position.set(x, 0.78, z); g.add(s); }
      // mesas con sillas
      for (const [x, z] of [[ox - 2.5, oz + 1.5], [ox + 2.5, oz + 1.5], [ox - 2.5, oz + 4.2], [ox + 2.5, oz + 4.2]]) {
        box(g, 1.0, 0.05, 1.0, wood, x, 0.75, z); box(g, 0.08, 0.75, 0.08, steel, x, 0.37, z);
        for (const s of [-1, 1]) { box(g, 0.42, 0.05, 0.42, wood, x + s * 0.75, 0.45, z); box(g, 0.42, 0.5, 0.05, wood, x + s * 0.95, 0.7, z); }
        colliders.addSegment(x - 0.55, z, x + 0.55, z, 'wall');
      }
      // tele con el partido
      const tv = canvasTex(256, 144, (c, w, h) => { c.fillStyle = '#2a8a3a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#fff'; c.lineWidth = 3; c.strokeRect(10, 10, w - 20, h - 20); c.beginPath(); c.moveTo(w / 2, 10); c.lineTo(w / 2, h - 10); c.stroke(); c.beginPath(); c.arc(w / 2, h / 2, 20, 0, 7); c.stroke(); c.fillStyle = '#000'; c.fillRect(0, 0, 90, 22); c.fillStyle = '#fff'; c.font = 'bold 15px sans-serif'; c.fillText('ZAM 1 - 0', 6, 16); });
      const tvm = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), new THREE.MeshBasicMaterial({ map: tv })); tvm.position.set(ox + W / 2 - 0.05, 2.4, oz); tvm.rotation.y = -Math.PI / 2; g.add(tvm);
      const name = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.5), new THREE.MeshBasicMaterial({ map: textTex('BAR LA PLAZA', '#1e4a32', '#f5c542') })); name.position.set(ox, 2.95, oz - D / 2 + 0.4); g.add(name);
      // camarero y parroquianos
      this.barman = npc({ shirt: 0xf0f0f0, pants: 0x1a1a1a, hair: 0x2a1e16 }, S); this.barman.position.set(ox + 0.5, 0.02, oz - D / 2 + 1.3); g.add(this.barman);
      for (const [x, z, r] of [[ox - 3.25, oz + 1.5, Math.PI / 2], [ox + 1.75, oz + 4.2, Math.PI / 2], [ox + 3.25, oz + 4.2, -Math.PI / 2]]) { const m = npc({ shirt: [0x6a2e2e, 0x2f4f6f, 0x4a6a3a][Math.random() * 3 | 0], hair: 0x8a8a8a }, S, true); m.position.set(x, 0.02, z); m.rotation.y = r; g.add(m); }
      this.counter = [ox, oz - D / 2 + 3.1];
      // rótulo en la fachada de fuera
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.45), new THREE.MeshStandardMaterial({ map: textTex('BAR', '#1e4a32', '#f5c542', 256, 52), emissive: 0xffffff, emissiveIntensity: 0.1 }));
      const [dx, dz, dr] = bDoor; sign.position.set(dx - Math.sin(dr) * 1.25, world.terrain.height(dx, dz) + 3.1, dz - Math.cos(dr) * 1.25); sign.rotation.y = dr; scene.add(sign);
      this.#addRoom('Bar', '🍷', bDoor, [ox, oz + D / 2 - 1.2, Math.PI], [ox - W / 2, oz - D / 2, ox + W / 2, oz + D / 2], 'bar');
    }
    // el terreno de los interiores es plano a cota 0
    const T = world.terrain, h0 = T.height.bind(T);
    T.height = (x, z) => { for (const r of this.rooms) { const b = r.box; if (x > b[0] - 2 && x < b[2] + 2 && z > b[1] - 2 && z < b[3] + 2) return 0; } return h0(x, z); };
  }
  #addRoom(name, icon, door, spawn, box, kind) {
    const out = beam(0xffffff); out.scale.set(0.55, 0.08, 0.55); out.position.set(door[0], this.world.terrain.height(door[0], door[1]), door[1]); out.visible = true; this.scene.add(out);
    const inn = beam(0xffffff); inn.scale.set(0.55, 0.08, 0.55); inn.position.set(spawn[0], 0, spawn[1] + 0.6); inn.visible = true; this.scene.add(inn);
    this.rooms.push({ name, icon, door, spawn, box, kind, out, inn });
  }
  // devuelve { enter | exit } cuando el jugador cruza una puerta a pie
  update(dt, player, driving, input) {
    if (this.cool > 0) this.cool -= dt;
    this.hint = '';
    if (this.barman) animateCharacter(this.barman, 0, dt);
    if (driving || this.cool > 0) return null;
    const p = player.pos;
    for (const r of this.rooms) {
      if (!this.inside && Math.hypot(p.x - r.door[0], p.z - r.door[1]) < 1.3) { this.inside = r; this.cool = 1.5; return { enter: r }; }
      if (this.inside === r && Math.hypot(p.x - r.spawn[0], p.z - (r.spawn[1] + 0.6)) < 1.0) { this.inside = null; this.cool = 1.5; return { exit: r }; }
    }
    if (this.inside?.kind === 'bar' && Math.hypot(p.x - this.counter[0], p.z - this.counter[1]) < 1.6) this.hint = 'Pide algo en la barra (E / 🚪)';
    return null;
  }
  get flags() { return this.rooms.map(r => [r.door[0], r.door[1], r.kind || 'church']); }
}
