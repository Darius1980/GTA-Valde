// La plaza: vecinos sentados en los bancos de día y, cada tres días, verbena por la noche
// con guirnaldas de bombillas, músicos, gente bailando y fuegos artificiales a medianoche.
import * as THREE from 'three';
import { makeCharacter, animateCharacter } from './models.js';

const CLOTHES = [[0x6a2e2e, 0x2b3140], [0x2f4f6f, 0x3a3a3a], [0x4a6a3a, 0x2a2a30], [0x8a6a3a, 0x30343a], [0x553366, 0x222222], [0xaa8844, 0x3a3226]];
function person(i, scale, hair) {
  const [shirt, pants] = CLOTHES[i % CLOTHES.length];
  const m = makeCharacter({ shirt, pants, hair: hair ?? [0x9a9a9a, 0x2a1e16, 0xd8d8d8, 0x5a3a20][i % 4] }); m.scale.setScalar(scale); return m;
}
function sit(m) {
  const p = m.userData.parts;
  p.hips.position.y = 0.5; p.lHip.rotation.x = p.rHip.rotation.x = -1.45; p.lKnee.rotation.x = p.rKnee.rotation.x = 1.45;
  p.lShoulder.rotation.x = p.rShoulder.rotation.x = -0.35; p.lElbow.rotation.x = p.rElbow.rotation.x = -0.9; p.torso.rotation.x = -0.05;
}

export class Plaza {
  constructor({ scene, world, data, center, isMobile, ambient }) {
    Object.assign(this, { scene, world, ambient });
    const T = world.terrain, S = world.personScale, P = data.plaza || {};
    this.center = center;
    // vecinos en los bancos (de día)
    this.sitters = [];
    (P.benches || []).slice(0, isMobile ? 3 : 5).forEach(([x, z, deg], i) => {
      const a = THREE.MathUtils.degToRad(deg), rot = Math.atan2(Math.sin(a), -Math.cos(a));
      const m = person(i, S); sit(m);
      // el banco mira hacia su "frente": se sienta encima, un poco adelantado
      const fx = Math.sin(rot), fz = Math.cos(rot), side = (i % 2 ? 0.45 : -0.45);
      m.position.set(x + fx * 0.05 + Math.cos(rot) * side, T.height(x, z) - 0.08, z + fz * 0.05 - Math.sin(rot) * side); m.rotation.y = rot;
      scene.add(m); this.sitters.push(m);
    });
    // verbena
    this.party = new THREE.Group(); this.party.visible = false; scene.add(this.party);
    const [cx, cz] = center, cy = T.height(cx, cz);
    // poste central y guirnaldas de bombillas hasta las fachadas
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 6.5, 8), new THREE.MeshStandardMaterial({ color: 0x5a3d26 })); pole.position.set(cx, cy + 3.25, cz); this.party.add(pole);
    const bulbs = []; const ends = [];
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * Math.PI * 2 + 0.3;
      const w = world.colliders.nearest(cx + Math.cos(a) * 12, cz + Math.sin(a) * 12, 14);
      ends.push(w ? [w.x, w.z] : [cx + Math.cos(a) * 14, cz + Math.sin(a) * 14]);
    }
    const line = new THREE.LineBasicMaterial({ color: 0x222222 });
    for (const [ex, ez] of ends) {
      const pts = []; const L = Math.hypot(ex - cx, ez - cz), n = Math.max(6, Math.round(L / 1.2));
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = cx + (ex - cx) * t, z = cz + (ez - cz) * t, y = cy + 6.3 - (6.3 - 4.2) * t - Math.sin(t * Math.PI) * 0.9;
        pts.push(new THREE.Vector3(x, y, z)); if (i > 0 && i < n) bulbs.push([x, y - 0.12, z]);
      }
      this.party.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), line));
    }
    const cols = [0xff4040, 0xffd040, 0x40ff60, 0x40a0ff, 0xff60ff];
    const bm = new THREE.InstancedMesh(new THREE.SphereGeometry(0.09, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }), bulbs.length);
    const M = new THREE.Matrix4(), C = new THREE.Color();
    bulbs.forEach((b, i) => { M.makeTranslation(...b); bm.setMatrixAt(i, M); bm.setColorAt(i, C.setHex(cols[i % cols.length])); });
    this.party.add(bm); this.bulbs = bm;
    this.glow = new THREE.PointLight(0xffc080, 0, 45, 1.2); this.glow.position.set(cx, cy + 5, cz); this.party.add(this.glow);
    // tablado con tres músicos
    const ex0 = ends[0], sx = cx + (ex0[0] - cx) * 0.7, sz = cz + (ex0[1] - cz) * 0.7, face = Math.atan2(cx - sx, cz - sz);
    const stage = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 2.5), new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 0.9 }));
    stage.position.set(sx, T.height(sx, sz) + 0.25, sz); stage.rotation.y = face; this.party.add(stage);
    this.musicians = [];
    for (let k = 0; k < 3; k++) {
      const m = person(k + 2, S, 0x1a1a1a), o = (k - 1) * 1.1;
      m.position.set(sx + Math.cos(face) * o, T.height(sx, sz) + 0.5, sz - Math.sin(face) * o); m.rotation.y = face;
      const inst = new THREE.Mesh(k === 1 ? new THREE.BoxGeometry(0.4, 0.3, 0.2) : new THREE.CylinderGeometry(0.15, 0.15, 0.3, 10), new THREE.MeshStandardMaterial({ color: k === 1 ? 0x8a1c1c : 0xd8c070, metalness: 0.4 }));
      inst.position.set(0, 1.0, 0.2); m.add(inst);
      this.party.add(m); this.musicians.push(m);
    }
    // bailarines en parejas alrededor del poste
    this.dancers = [];
    for (let k = 0; k < (isMobile ? 6 : 12); k++) {
      const m = person(k, S); this.party.add(m);
      this.dancers.push({ m, a: k / (isMobile ? 6 : 12) * Math.PI * 2, r: 4 + (k % 3) * 1.5, ph: Math.random() * 6 });
    }
    // fuegos artificiales
    this.fw = []; this.fwT = 0;
    this.on = false; this.announced = -1;
  }
  isParty(dayNight) { const h = dayNight.hour; return dayNight.day % 3 === 0 && h >= 20.5 || (dayNight.day - 1) % 3 === 0 && h < 3; }
  update(dt, dayNight, focus, toast) {
    const party = this.isParty(dayNight), h = dayNight.hour;
    if (party && this.announced !== dayNight.day && h >= 20.5) { this.announced = dayNight.day; toast?.('🎉 ¡Hoy hay verbena!', 'Música y baile en la plaza, y fuegos artificiales a medianoche'); }
    const near = Math.hypot(focus.x - this.center[0], focus.z - this.center[1]);
    this.party.visible = party && near < 400;
    for (const s of this.sitters) s.visible = !party && h > 9 && h < 21 && near < 250;
    this.musicLevel = party ? Math.max(0, 1 - near / 180) : 0;
    if (this.party.visible) {
      const t = performance.now() / 1000;
      this.glow.intensity = 30 * dayNight.n;
      for (const [k, m] of this.musicians.entries()) { m.rotation.z = Math.sin(t * 3 + k) * 0.05; animateCharacter(m, 0, dt); m.userData.parts.lShoulder.rotation.x = -1.2 + Math.sin(t * 8 + k) * 0.2; m.userData.parts.rShoulder.rotation.x = -1.2 - Math.sin(t * 8 + k) * 0.2; }
      const T = this.world.terrain;
      for (const d of this.dancers) {
        d.a += dt * 0.35; const x = this.center[0] + Math.cos(d.a) * d.r, z = this.center[1] + Math.sin(d.a) * d.r;
        d.m.position.set(x, T.height(x, z) + Math.abs(Math.sin(t * 4.7 + d.ph)) * 0.08, z);
        d.m.rotation.y = d.a + Math.PI + Math.sin(t * 2 + d.ph) * 0.6;
        animateCharacter(d.m, 1.1, dt);
        const p = d.m.userData.parts; p.lShoulder.rotation.z = -1.2 - Math.sin(t * 4 + d.ph) * 0.4; p.rShoulder.rotation.z = 1.2 + Math.sin(t * 4 + d.ph) * 0.4;
      }
      // fuegos de 0:00 a 0:20
      if (h < 0.34 && h >= 0) { this.fwT -= dt; if (this.fwT <= 0) { this.fwT = 0.6 + Math.random() * 1.2; this.launch(); } }
    }
    for (const f of [...this.fw]) {
      f.t += dt;
      if (!f.burst) { f.p.addScaledVector(f.v, dt); f.v.y -= 9.8 * dt; f.trail.position.copy(f.p); if (f.v.y < 2) this.explode(f); }
      else {
        const a = f.pts.geometry.attributes.position;
        for (let i = 0; i < a.count; i++) { f.vel[i * 3 + 1] -= 3 * dt; a.setXYZ(i, a.getX(i) + f.vel[i * 3] * dt, a.getY(i) + f.vel[i * 3 + 1] * dt, a.getZ(i) + f.vel[i * 3 + 2] * dt); }
        a.needsUpdate = true; f.pts.material.opacity = Math.max(0, 1 - f.t / 2.2);
        if (f.t > 2.2) { this.scene.remove(f.pts); f.pts.geometry.dispose(); this.fw.splice(this.fw.indexOf(f), 1); }
      }
    }
  }
  launch() {
    const [cx, cz] = this.center, y = this.world.terrain.height(cx, cz);
    const trail = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffe0a0 }));
    const p = new THREE.Vector3(cx + (Math.random() - 0.5) * 30, y + 2, cz - 40 + (Math.random() - 0.5) * 30);
    this.scene.add(trail); this.fw.push({ p, v: new THREE.Vector3((Math.random() - 0.5) * 4, 30 + Math.random() * 8, (Math.random() - 0.5) * 4), trail, t: 0 });
    this.ambient?.ready && this.ambient.whistle(0.15);
  }
  explode(f) {
    this.scene.remove(f.trail); f.burst = true; f.t = 0;
    const n = 140, pos = new Float32Array(n * 3); f.vel = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos.set([f.p.x, f.p.y, f.p.z], i * 3);
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u), sp = 9 + Math.random() * 3;
      f.vel.set([r * Math.cos(a) * sp, u * sp, r * Math.sin(a) * sp], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const col = [0xff4040, 0xffd040, 0x40ff80, 0x60a0ff, 0xff60ff, 0xffffff][Math.random() * 6 | 0];
    f.pts = new THREE.Points(g, new THREE.PointsMaterial({ color: col, size: 0.7, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    f.pts.frustumCulled = false; this.scene.add(f.pts);
    this.ambient?.ready && this.ambient.pop(0.3);
  }
}
