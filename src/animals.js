// Animales: gatos y perros por las calles, gallinas junto a las casas de las afueras, un rebaño de ovejas
// con su pastor en el monte y ciervos que salen al atardecer junto a la carretera.
import * as THREE from 'three';
import { makeCharacter, animateCharacter } from './models.js';

const mat = (c, r = 0.9) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
function part(geo, m, x, y, z, parent) { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; parent.add(o); return o; }

// cuadrúpedo genérico: cuerpo, cuello, cabeza, cuatro patas articuladas y cola
function quadruped({ len, h, w, legLen, color, belly, head, neck = 0, tail = 0.3, ears = 'cat', antlers = false }) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const m = mat(color), mb = mat(belly ?? color);
  const torso = part(new THREE.CapsuleGeometry(h / 2, len - h, 4, 8), m, 0, legLen + h / 2, 0, body); torso.rotation.x = Math.PI / 2; torso.scale.x = w / h;
  const neckG = new THREE.Group(); neckG.position.set(0, legLen + h * 0.75, len / 2 - h * 0.2); body.add(neckG);
  if (neck) { const n = part(new THREE.CapsuleGeometry(h * 0.22, neck, 4, 6), m, 0, neck / 2, 0.05, neckG); n.rotation.x = 0.5; }
  const headG = new THREE.Group(); headG.position.set(0, neck * 0.9, neck * 0.45 + 0.02); neckG.add(headG);
  part(new THREE.SphereGeometry(head, 10, 8), m, 0, 0, 0, headG).scale.set(0.9, 0.85, 1.1);
  const snout = part(new THREE.SphereGeometry(head * 0.55, 8, 6), mb, 0, -head * 0.25, head * 0.85, headG); snout.scale.set(0.8, 0.7, 1.2);
  part(new THREE.SphereGeometry(head * 0.14, 6, 4), mat(0x111111, 0.3), 0, -head * 0.15, head * 1.45, headG); // nariz
  for (const s of [-1, 1]) {
    part(new THREE.SphereGeometry(head * 0.12, 6, 4), mat(ears === 'cat' ? 0x9acd32 : 0x111111, 0.2), s * head * 0.4, head * 0.25, head * 0.85, headG);
    const e = part(ears === 'cat' ? new THREE.ConeGeometry(head * 0.35, head * 0.7, 4) : new THREE.SphereGeometry(head * 0.38, 6, 4), m,
      s * head * 0.55, head * (ears === 'cat' ? 0.85 : ears === 'deer' ? 0.7 : 0.1), -head * 0.1, headG);
    if (ears === 'dog') { e.scale.set(0.45, 1.2, 0.8); e.position.y = -head * 0.1; e.position.x = s * head * 0.85; }
    if (ears === 'deer') { e.scale.set(0.5, 1.1, 0.25); e.rotation.z = -s * 0.7; }
    if (antlers) for (let k = 0; k < 3; k++) {
      const a = part(new THREE.CylinderGeometry(0.015, 0.03, 0.35 - k * 0.07, 4), mat(0x6b5a40), s * (0.06 + k * 0.08), head + 0.15 + k * 0.12, -0.02 - k * 0.04, headG);
      a.rotation.z = -s * (0.4 + k * 0.25); a.rotation.x = -0.3;
    }
  }
  const legs = [];
  for (const [x, z] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    const hip = new THREE.Group(); hip.position.set(x * w * 0.32, legLen, z * (len / 2 - h * 0.35)); body.add(hip);
    const leg = part(new THREE.CylinderGeometry(legLen * 0.12, legLen * 0.08, legLen, 6), m, 0, -legLen / 2, 0, hip); leg.castShadow = true;
    legs.push({ hip, front: z > 0, side: x });
  }
  const tailG = new THREE.Group(); tailG.position.set(0, legLen + h * 0.7, -len / 2 + h * 0.1); body.add(tailG);
  if (tail) { const t = part(new THREE.CylinderGeometry(0.02, h * 0.1, tail, 5), m, 0, tail / 2, 0, tailG); t.rotation.x = 0; tailG.rotation.x = -0.9; }
  root.userData = { legs, headG, neckG, tailG, body, phase: Math.random() * 6, legLen };
  return root;
}

function animate(a, speed, dt, graze = 0) {
  const u = a.userData; u.phase += dt * (3 + speed * 6 / u.legLen);
  const amp = Math.min(0.7, speed * 0.5);
  for (const l of u.legs) l.hip.rotation.x = Math.sin(u.phase + (l.front ? 0 : Math.PI) + (l.side > 0 ? Math.PI / 2 : 0)) * amp;
  u.tailG.rotation.z = Math.sin(u.phase * 0.7) * 0.4;
  u.neckG.rotation.x += ((graze ? 1.1 : 0) - u.neckG.rotation.x) * Math.min(1, dt * 3);
  u.body.position.y = Math.abs(Math.sin(u.phase)) * amp * 0.03;
}

// gallina: cuerpo redondo, cola, cresta y patas
function hen(color) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const m = mat(color), red = mat(0xc0201a), yel = mat(0xe0a020);
  part(new THREE.SphereGeometry(0.13, 10, 8), m, 0, 0.22, 0, body).scale.set(0.85, 0.9, 1.2);
  const tail = part(new THREE.ConeGeometry(0.07, 0.16, 5), m, 0, 0.3, -0.14, body); tail.rotation.x = -0.9;
  const head = new THREE.Group(); head.position.set(0, 0.34, 0.12); body.add(head);
  part(new THREE.SphereGeometry(0.06, 8, 6), m, 0, 0, 0, head);
  part(new THREE.ConeGeometry(0.02, 0.05, 4), yel, 0, -0.005, 0.07, head).rotation.x = Math.PI / 2;
  part(new THREE.BoxGeometry(0.015, 0.05, 0.06), red, 0, 0.06, 0, head);
  const legs = [];
  for (const sx of [-1, 1]) { const hip = new THREE.Group(); hip.position.set(sx * 0.05, 0.14, 0); body.add(hip); part(new THREE.CylinderGeometry(0.008, 0.008, 0.14, 4), yel, 0, -0.07, 0, hip); legs.push({ hip, front: sx > 0, side: sx }); }
  root.userData = { legs, headG: head, neckG: head, tailG: new THREE.Group(), body, phase: Math.random() * 6, legLen: 0.14 };
  return root;
}

const FUR = [0x2a2a2a, 0xd08b3e, 0x8c8c8c, 0xf0ead8, 0x5a3d26];

export class Animals {
  constructor({ scene, world, net, roads, center, buildings = [], half = 1000, isMobile = false }) {
    Object.assign(this, { scene, world, net });
    this.list = [];
    // gatos y perros por las calles del pueblo
    for (let i = 0; i < 5; i++) {
      const cat = i < 2, color = FUR[(i * 3 + 1) % FUR.length];
      const mesh = cat
        ? quadruped({ len: 0.42, h: 0.17, w: 0.15, legLen: 0.2, color, head: 0.075, neck: 0.04, tail: 0.32, ears: 'cat' })
        : quadruped({ len: 0.7 + Math.random() * 0.2, h: 0.28, w: 0.24, legLen: 0.36, color, belly: 0xc8b8a0, head: 0.12, neck: 0.12, tail: 0.28, ears: 'dog' });
      mesh.scale.setScalar(world.personScale / 0.88 * (cat ? 1 : 0.95));
      scene.add(mesh);
      const sp = net.randomSpot();
      const p = net.roads[sp.ri].p[sp.i];
      this.list.push({ kind: cat ? 'cat' : 'dog', mesh, pos: new THREE.Vector3(p[0], 0, p[1]), heading: Math.random() * 6, speed: 0, target: null, wait: Math.random() * 3, flee: 0, sp });
    }
    // ciervos al atardecer: en un margen de la carretera de entrada, fuera del pueblo
    const entry = roads.filter(r => r.k === 'tertiary' || r.k === 'trunk');
    let spot = null, best = -1;
    for (const r of entry) for (let i = 0; i < r.p.length - 1; i++) {
      const p = r.p[i], d = Math.hypot(p[0] - center[0], p[1] - center[1]);
      if (d > 180 && d < 420 && d > best) { const q = r.p[i + 1]; best = d; spot = { p, q, w: r.w }; }
    }
    this.deer = [];
    if (spot) {
      const dx = spot.q[0] - spot.p[0], dz = spot.q[1] - spot.p[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L, nz = dx / L;
      for (let k = 0; k < 3; k++) {
        const mesh = quadruped({ len: 1.2, h: 0.5, w: 0.42, legLen: 0.85, color: 0x8a5a34, belly: 0xd8c3a0, head: 0.16, neck: 0.55, tail: 0.15, ears: 'deer', antlers: k === 0 });
        mesh.scale.setScalar(world.personScale / 0.88 * (k === 0 ? 1.05 : 0.9)); mesh.visible = false; scene.add(mesh);
        const off = spot.w / 2 + 4 + k * 2.2, along = k * 3 - 3;
        const home = new THREE.Vector3(spot.p[0] + nx * off + dx / L * along, 0, spot.p[1] + nz * off + dz / L * along);
        this.deer.push({ mesh, home, pos: home.clone(), heading: Math.random() * 6, speed: 0, flee: 0, away: [nx, nz] });
      }
    }
    const S = world.personScale / 0.88, T = world.terrain;
    // gallinas: junto a dos corrales de las afueras del pueblo
    this.hens = [];
    const cen = (b) => { let x = 0, z = 0; for (const p of b.p) { x += p[0]; z += p[1]; } return [x / b.p.length, z / b.p.length]; };
    const yards = buildings.filter(b => b.use === 'agr').map(cen).filter(([x, z]) => { const d = Math.hypot(x - center[0], z - center[1]); return d > 80 && d < 260; }).slice(0, 2);
    for (const [bx, bz] of yards) {
      // a un lado del corral, donde no haya pared
      let hx = bx, hz = bz;
      for (let a = 0; a < 8; a++) { const x = bx + Math.cos(a) * 9, z = bz + Math.sin(a) * 9; if (!world.colliders.nearest(x, z, 2.5)) { hx = x; hz = z; break; } }
      for (let k = 0; k < (isMobile ? 3 : 5); k++) {
        const mesh = hen([0xf0e8d8, 0x8a4a1c, 0x2a2a2a, 0xb06a2a][k % 4]); mesh.scale.setScalar(S * 1.1); scene.add(mesh);
        this.hens.push({ mesh, home: [hx, hz], pos: new THREE.Vector3(hx + Math.random() * 3, 0, hz + Math.random() * 3), heading: Math.random() * 6, speed: 0, peck: 0, t: Math.random() * 3, flee: 0 });
      }
    }
    // rebaño de ovejas con su pastor, en una ladera lejos de calles y casas
    this.sheep = []; this.shepherd = null;
    let fold = null, bs = -1;
    for (let k = 0; k < 120; k++) {
      const a = Math.random() * Math.PI * 2, r = 330 + Math.random() * Math.min(500, half - 450), x = center[0] + Math.cos(a) * r, z = center[1] + Math.sin(a) * r;
      let dRoad = Infinity; for (const rd of roads) for (const p of rd.p) dRoad = Math.min(dRoad, Math.hypot(p[0] - x, p[1] - z));
      if (world.colliders.nearest(x, z, 25)) continue;
      const score = Math.min(dRoad, 80); if (score > bs) { bs = score; fold = [x, z]; }
    }
    if (fold) {
      const [fx, fz] = fold;
      for (let k = 0; k < (isMobile ? 8 : 14); k++) {
        const mesh = quadruped({ len: 0.95, h: 0.5, w: 0.5, legLen: 0.42, color: k === 3 ? 0x2a2420 : 0xe8e2d2, belly: 0xd8d0bc, head: 0.13, neck: 0.1, tail: 0.12, ears: 'deer' });
        mesh.userData.headG.children[0].material = mat(0x3a2f28); // cara oscura
        mesh.scale.setScalar(S); scene.add(mesh);
        const p = new THREE.Vector3(fx + (Math.random() - 0.5) * 14, 0, fz + (Math.random() - 0.5) * 14);
        this.sheep.push({ mesh, pos: p, heading: Math.random() * 6, speed: 0, flee: 0, t: Math.random() * 5 });
      }
      const sh = makeCharacter({ shirt: 0x5a4a32, pants: 0x3a3226, hair: 0x6a6a6a }); sh.scale.setScalar(world.personScale);
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 1.5, 5), mat(0x5a3d26)); staff.position.set(0, -0.55, 0.05); sh.userData.parts.rShoulder.children[1].add(staff);
      scene.add(sh); this.shepherd = { mesh: sh, pos: new THREE.Vector3(fx + 8, 0, fz + 4), heading: 0, t: 0 };
      this.flock = [fx, fz];
      const dog = quadruped({ len: 0.8, h: 0.3, w: 0.26, legLen: 0.38, color: 0x1e1a18, belly: 0xf0f0f0, head: 0.13, neck: 0.12, tail: 0.3, ears: 'dog' });
      dog.scale.setScalar(S); scene.add(dog); this.sheepdog = { mesh: dog, pos: new THREE.Vector3(fx - 10, 0, fz), a: 0 };
    }
  }
  update(dt, focus, cars, dayNight) {
    const T = this.world.terrain;
    for (const a of this.list) {
      const far = (a.pos.x - focus.x) ** 2 + (a.pos.z - focus.z) ** 2 > 160 * 160; a.mesh.visible = !far; if (far) continue;
      // huyen de los coches que se acercan
      for (const c of cars) {
        const ox = a.pos.x - c.pos.x, oz = a.pos.z - c.pos.z, d = Math.hypot(ox, oz);
        if (d < 3 + Math.abs(c.speed) * 0.9 && Math.abs(c.speed) > 1) { a.flee = 1.5; a.heading = Math.atan2(ox, oz) + (Math.random() - 0.5); }
      }
      if (a.flee > 0) { a.flee -= dt; a.speed += ((a.kind === 'cat' ? 4.5 : 4) - a.speed) * Math.min(1, dt * 6); }
      else if (a.wait > 0) { a.wait -= dt; a.speed *= Math.max(0, 1 - dt * 4); }
      else {
        if (!a.target || Math.hypot(a.target[0] - a.pos.x, a.target[1] - a.pos.z) < 1) {
          // siguiente punto: un vértice de calle cercano, a un lado
          const r = this.net.roads[a.sp.ri]; a.sp.i = Math.max(0, Math.min(r.p.length - 1, a.sp.i + (Math.random() < 0.5 ? 1 : -1)));
          const p = r.p[a.sp.i], side = (Math.random() - 0.5) * r.w; a.target = [p[0] + side, p[1] + side * 0.5];
          if (Math.random() < 0.35) a.wait = 2 + Math.random() * 5;
          if (Math.random() < 0.2) { const o = this.net.next(a.sp.ri, a.sp.i, 1); a.sp = { ri: o[0], i: o[1] }; }
        }
        const h = Math.atan2(a.target[0] - a.pos.x, a.target[1] - a.pos.z); let e = h - a.heading; e = Math.atan2(Math.sin(e), Math.cos(e));
        a.heading += e * Math.min(1, dt * 3); a.speed += ((a.kind === 'cat' ? 0.7 : 1.1) - a.speed) * Math.min(1, dt * 2);
      }
      a.pos.x += Math.sin(a.heading) * a.speed * dt; a.pos.z += Math.cos(a.heading) * a.speed * dt;
      this.world.colliders.resolve(a.pos, 0.25);
      for (const c of cars) c.pushOut(a.pos, 0.25);
      a.pos.y = T.height(a.pos.x, a.pos.z);
      a.mesh.position.copy(a.pos); a.mesh.rotation.y = a.heading;
      animate(a.mesh, a.speed, dt, a.kind === 'dog' && a.wait > 0 ? 1 : 0);
    }
    // gallinas: picotean, dan saltitos y huyen aleteando si pasas cerca
    for (const h of this.hens) {
      const far = (h.pos.x - focus.x) ** 2 + (h.pos.z - focus.z) ** 2 > 140 * 140; h.mesh.visible = !far; if (far) continue;
      const fd = Math.hypot(h.pos.x - focus.x, h.pos.z - focus.z);
      if (fd < 3.5 && h.flee <= 0) { h.flee = 1.2; h.heading = Math.atan2(h.pos.x - focus.x, h.pos.z - focus.z) + (Math.random() - 0.5); }
      h.t -= dt;
      if (h.flee > 0) { h.flee -= dt; h.speed = 3; }
      else if (h.t <= 0) { h.t = 1 + Math.random() * 3; h.peck = Math.random() < 0.5 ? 1.2 : 0; const dh = Math.hypot(h.pos.x - h.home[0], h.pos.z - h.home[1]); h.heading = dh > 6 ? Math.atan2(h.home[0] - h.pos.x, h.home[1] - h.pos.z) : h.heading + (Math.random() - 0.5) * 2.5; h.speed = h.peck ? 0 : 0.5; }
      if (h.peck > 0) { h.peck -= dt; h.mesh.userData.headG.rotation.x = Math.max(0, Math.sin(h.peck * 14)) * 0.9; } else h.mesh.userData.headG.rotation.x = 0;
      h.pos.x += Math.sin(h.heading) * h.speed * dt; h.pos.z += Math.cos(h.heading) * h.speed * dt;
      this.world.colliders.resolve(h.pos, 0.15);
      h.pos.y = T.height(h.pos.x, h.pos.z) + (h.flee > 0 ? Math.abs(Math.sin(h.flee * 12)) * 0.25 : 0);
      h.mesh.position.copy(h.pos); h.mesh.rotation.y = h.heading;
      for (const l of h.mesh.userData.legs) l.hip.rotation.x = Math.sin(performance.now() / 60 + l.side) * Math.min(0.8, h.speed);
    }
    // ovejas: pastan juntas y se apartan si te acercas; el pastor y el perro las vigilan
    if (this.flock) {
      const fd = Math.hypot(this.flock[0] - focus.x, this.flock[1] - focus.z), show = fd < 260;
      for (const sh of this.sheep) {
        sh.mesh.visible = show; if (!show) continue;
        const pd = Math.hypot(sh.pos.x - focus.x, sh.pos.z - focus.z);
        if (pd < 12) { sh.flee = 2; sh.heading = Math.atan2(sh.pos.x - focus.x, sh.pos.z - focus.z) + (Math.random() - 0.5) * 0.6; }
        sh.t -= dt;
        const cx = sh.pos.x - this.flock[0], cz = sh.pos.z - this.flock[1];
        if (sh.flee > 0) { sh.flee -= dt; sh.speed += (3.2 - sh.speed) * Math.min(1, dt * 4); }
        else {
          if (sh.t <= 0) { sh.t = 3 + Math.random() * 6; sh.heading = Math.hypot(cx, cz) > 14 ? Math.atan2(-cx, -cz) : sh.heading + (Math.random() - 0.5) * 2; sh.walk = Math.random() < 0.35; }
          sh.speed += ((sh.walk ? 0.4 : 0) - sh.speed) * Math.min(1, dt * 2);
        }
        sh.pos.x += Math.sin(sh.heading) * sh.speed * dt; sh.pos.z += Math.cos(sh.heading) * sh.speed * dt;
        for (const c of cars) c.pushOut(sh.pos, 0.35);
        sh.pos.y = T.height(sh.pos.x, sh.pos.z); sh.mesh.position.copy(sh.pos); sh.mesh.rotation.y = sh.heading;
        animate(sh.mesh, sh.speed, dt, sh.flee > 0 || sh.walk ? 0 : 1);
      }
      // el rebaño se desplaza despacio por la ladera
      const ox = this.flock[0], oz = this.flock[1], tt = performance.now() / 1000;
      this.flock[0] += Math.sin(tt / 90) * dt * 0.15; this.flock[1] += Math.cos(tt / 110) * dt * 0.15;
      if (this.shepherd) {
        const s = this.shepherd; s.mesh.visible = show;
        const tx = this.flock[0] + 9, tz = this.flock[1] + 5, d = Math.hypot(tx - s.pos.x, tz - s.pos.z), v = d > 1.5 ? 0.9 : 0;
        if (v) s.heading = Math.atan2(tx - s.pos.x, tz - s.pos.z); else s.heading = Math.atan2(this.flock[0] - s.pos.x, this.flock[1] - s.pos.z);
        s.pos.x += Math.sin(s.heading) * v * dt; s.pos.z += Math.cos(s.heading) * v * dt; s.pos.y = T.height(s.pos.x, s.pos.z);
        s.mesh.position.copy(s.pos); s.mesh.rotation.y = s.heading; animateCharacter(s.mesh, v / this.world.personScale, dt);
      }
      if (this.sheepdog) {
        const g = this.sheepdog; g.mesh.visible = show; g.a += dt * 0.45;
        const tx = this.flock[0] + Math.cos(g.a) * 17, tz = this.flock[1] + Math.sin(g.a) * 17, h = Math.atan2(tx - g.pos.x, tz - g.pos.z), d = Math.hypot(tx - g.pos.x, tz - g.pos.z), v = Math.min(5, d * 1.5);
        g.pos.x += Math.sin(h) * v * dt; g.pos.z += Math.cos(h) * v * dt; g.pos.y = T.height(g.pos.x, g.pos.z);
        g.mesh.position.copy(g.pos); g.mesh.rotation.y = h; animate(g.mesh, v, dt);
      }
    }
    // ciervos: aparecen con la luz del atardecer y se van si te acercas
    const show = dayNight.isDusk;
    for (const d of this.deer) {
      if (!show && d.mesh.visible && d.flee <= 0) { d.mesh.visible = false; d.pos.copy(d.home); }
      if (show && !d.mesh.visible) { d.mesh.visible = true; d.pos.copy(d.home); d.flee = 0; }
      if (!d.mesh.visible) continue;
      const near = Math.hypot(focus.x - d.pos.x, focus.z - d.pos.z);
      if (near < 22 && d.flee <= 0) { d.flee = 6; d.heading = Math.atan2(d.away[0], d.away[1]) + (Math.random() - 0.5) * 0.6; }
      if (d.flee > 0) {
        d.flee -= dt; d.speed += (9 - d.speed) * Math.min(1, dt * 4);
        if (d.flee <= 0) { d.mesh.visible = false; d.speed = 0; }
      } else { // pastando, con algún paso suelto
        d.speed += ((Math.sin(performance.now() / 3000 + d.home.x) > 0.8 ? 0.4 : 0) - d.speed) * Math.min(1, dt * 2);
        d.heading += Math.sin(performance.now() / 5000 + d.home.z) * dt * 0.2;
      }
      d.pos.x += Math.sin(d.heading) * d.speed * dt; d.pos.z += Math.cos(d.heading) * d.speed * dt;
      d.pos.y = T.height(d.pos.x, d.pos.z);
      d.mesh.position.copy(d.pos); d.mesh.rotation.y = d.heading;
      animate(d.mesh, d.speed, dt, d.flee > 0 ? 0 : 1);
    }
  }
}
