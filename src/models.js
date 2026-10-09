// Modelos procedurales: personaje y coche.
import * as THREE from 'three';

const std = (color, rough = 0.8, metal = 0) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

function box(w, h, d, mat, x = 0, y = 0, z = 0, r = 0.02) {
  const g = r > 0 ? roundedBox(w, h, d, r) : new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Mesh(g, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m;
}
function roundedBox(w, h, d, r) {
  // caja con cantos suavizados empujando vértices hacia una esfera interior
  const g = new THREE.BoxGeometry(w, h, d, 4, 4, 4), p = g.attributes.position, v = new THREE.Vector3();
  const hx = w / 2 - r, hy = h / 2 - r, hz = d / 2 - r;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const c = new THREE.Vector3(Math.max(-hx, Math.min(hx, v.x)), Math.max(-hy, Math.min(hy, v.y)), Math.max(-hz, Math.min(hz, v.z)));
    const n = v.clone().sub(c); if (n.lengthSq() > 0) { n.setLength(r); v.copy(c).add(n); }
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals(); return g;
}
function limb(len, r0, r1, mat) {
  // cilindro con el pivote arriba
  const g = new THREE.CapsuleGeometry((r0 + r1) / 2, len - (r0 + r1), 4, 10); g.translate(0, -len / 2, 0);
  const m = new THREE.Mesh(g, mat); m.castShadow = true; return m;
}

export function makeCharacter(opts = {}) {
  const skin = std(opts.skin ?? 0xc89a7a, 0.7), shirt = std(opts.shirt ?? 0x2f4f6f, 0.9), pants = std(opts.pants ?? 0x2b3140, 0.95);
  const shoe = std(0x1c1a18, 0.6), hair = std(opts.hair ?? 0x2a1e16, 1);
  const root = new THREE.Group();
  const hips = new THREE.Group(); hips.position.y = 0.95; root.add(hips);
  const torso = new THREE.Group(); hips.add(torso);
  torso.add(box(0.36, 0.52, 0.22, shirt, 0, 0.28, 0, 0.07));
  torso.add(box(0.34, 0.16, 0.2, pants, 0, 0.0, 0, 0.05));
  const neck = limb(0.12, 0.05, 0.05, skin); neck.position.y = 0.62; neck.rotation.x = Math.PI; torso.add(neck);
  const head = new THREE.Group(); head.position.y = 0.66; torso.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 16), skin); skull.scale.set(1, 1.15, 1.05); skull.position.y = 0.12; skull.castShadow = true; head.add(skull);
  const hairM = new THREE.Mesh(new THREE.SphereGeometry(0.118, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), hair); hairM.position.y = 0.14; hairM.scale.set(1, 1.1, 1.08); head.add(hairM);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.05, 6), skin); nose.rotation.x = Math.PI / 2; nose.position.set(0, 0.11, 0.115); head.add(nose);
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), std(0x111111, 0.3)); e.position.set(0.04 * s, 0.14, 0.105); head.add(e); }

  const parts = { hips, torso, head };
  for (const s of [-1, 1]) {
    const sh = new THREE.Group(); sh.position.set(0.22 * s, 0.5, 0); torso.add(sh);
    const up = limb(0.3, 0.055, 0.05, shirt); sh.add(up);
    const el = new THREE.Group(); el.position.y = -0.3; sh.add(el);
    el.add(limb(0.27, 0.045, 0.04, skin));
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), skin); hand.position.y = -0.29; el.add(hand);
    const hip = new THREE.Group(); hip.position.set(0.1 * s, -0.04, 0); hips.add(hip);
    hip.add(limb(0.45, 0.08, 0.065, pants));
    const kn = new THREE.Group(); kn.position.y = -0.45; hip.add(kn);
    kn.add(limb(0.44, 0.06, 0.05, pants));
    const foot = box(0.1, 0.07, 0.24, shoe, 0, -0.46, 0.05, 0.03); kn.add(foot);
    parts[s < 0 ? 'lShoulder' : 'rShoulder'] = sh; parts[s < 0 ? 'lElbow' : 'rElbow'] = el;
    parts[s < 0 ? 'lHip' : 'rHip'] = hip; parts[s < 0 ? 'lKnee' : 'rKnee'] = kn;
  }
  root.userData.parts = parts;
  root.userData.phase = 0;
  return root;
}

// Animación de paso: speed en m/s
export function animateCharacter(ch, speed, dt, airborne = false) {
  const p = ch.userData.parts;
  const amt = Math.min(1, speed / 2.2), run = Math.max(0, Math.min(1, (speed - 2.5) / 3));
  ch.userData.phase += dt * (2.2 + speed * 1.55);
  const ph = ch.userData.phase, s = Math.sin(ph), c = Math.cos(ph);
  const swing = (0.5 + 0.35 * run) * amt;
  p.lHip.rotation.x = s * swing; p.rHip.rotation.x = -s * swing;
  p.lKnee.rotation.x = Math.max(0, -c) * (0.4 + 0.9 * run) * amt + 0.05;
  p.rKnee.rotation.x = Math.max(0, c) * (0.4 + 0.9 * run) * amt + 0.05;
  p.lShoulder.rotation.x = -s * swing * 0.9; p.rShoulder.rotation.x = s * swing * 0.9;
  p.lElbow.rotation.x = -(0.15 + 0.9 * run) * Math.max(amt, 0.2); p.rElbow.rotation.x = p.lElbow.rotation.x;
  p.lShoulder.rotation.z = -0.08; p.rShoulder.rotation.z = 0.08;
  p.hips.position.y = 0.95 + Math.abs(c) * 0.05 * amt - 0.03 * run;
  p.torso.rotation.x = 0.12 * run; p.torso.rotation.y = s * 0.08 * amt;
  if (airborne) { p.lHip.rotation.x = -0.5; p.rHip.rotation.x = 0.3; p.lKnee.rotation.x = 0.8; p.rKnee.rotation.x = 0.4; }
  if (amt < 0.05 && !airborne) { // respiración en reposo
    const b = Math.sin(performance.now() / 700) * 0.01;
    p.torso.rotation.x = b; for (const k of ['lHip', 'rHip', 'lKnee', 'rKnee', 'lShoulder', 'rShoulder']) p[k].rotation.x *= 0.8;
  }
}

// Coche tipo turismo / todoterreno compacto. Dimensiones aprox. 4.2 x 1.8 m.
export function makeCar(color = 0xb7beca, kind = 'sedan') {
  const root = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, metalness: 0.6, clearcoat: 1, clearcoatRoughness: 0.15 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x1a2530, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.75 });
  const black = std(0x151515, 0.6), chrome = std(0xdddddd, 0.2, 1), tyre = std(0x1a1a1a, 0.95), rim = std(0x9a9ea5, 0.3, 0.9);
  const light = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xfff2c0, emissiveIntensity: 0.6 });
  const rear = new THREE.MeshStandardMaterial({ color: 0x880000, emissive: 0x550000, emissiveIntensity: 0.5 });
  const tall = kind === 'suv' ? 0.18 : 0;
  const body = new THREE.Group(); root.add(body);
  body.add(box(1.78, 0.55, 4.2, paint, 0, 0.62 + tall, 0, 0.12));
  const cabin = box(1.58, 0.52 + tall * 0.6, kind === 'suv' ? 2.5 : 2.1, glass, 0, 1.15 + tall * 1.2, kind === 'suv' ? -0.35 : -0.15, 0.14); body.add(cabin);
  body.add(box(1.6, 0.06, kind === 'suv' ? 2.4 : 1.9, paint, 0, 1.43 + tall * 1.5, kind === 'suv' ? -0.35 : -0.2, 0.03)); // techo
  for (const s of [-1, 1]) body.add(box(0.06, 0.48 + tall * 0.6, 0.08, paint, 0.78 * s, 1.15 + tall * 1.2, 0.78 - (kind === 'suv' ? 0.2 : 0), 0.02)); // pilar A
  body.add(box(1.7, 0.14, 0.12, black, 0, 0.42 + tall, 2.1, 0.04)); body.add(box(1.7, 0.14, 0.12, black, 0, 0.42 + tall, -2.1, 0.04));
  body.add(box(1.2, 0.18, 0.04, black, 0, 0.7 + tall, 2.11, 0.02)); // rejilla
  for (const s of [-1, 1]) {
    body.add(box(0.36, 0.12, 0.05, light, 0.62 * s, 0.76 + tall, 2.1, 0.02));
    body.add(box(0.34, 0.12, 0.05, rear, 0.64 * s, 0.78 + tall, -2.1, 0.02));
    body.add(box(0.08, 0.06, 0.16, black, 0.92 * s, 1.0 + tall, 0.75, 0.02)); // retrovisor
    body.add(box(0.02, 0.03, 0.18, chrome, 0.9 * s, 0.82 + tall, 0.2, 0.01)); // maneta
  }
  const wheels = [];
  const wg = new THREE.CylinderGeometry(0.34, 0.34, 0.24, 20); wg.rotateZ(Math.PI / 2);
  const rg = new THREE.CylinderGeometry(0.22, 0.22, 0.25, 12); rg.rotateZ(Math.PI / 2);
  for (const [x, z] of [[-0.82, 1.35], [0.82, 1.35], [-0.82, -1.3], [0.82, -1.3]]) {
    const pivot = new THREE.Group(); pivot.position.set(x, 0.34, z);
    const spin = new THREE.Group(); pivot.add(spin);
    const t = new THREE.Mesh(wg, tyre); t.castShadow = true; spin.add(t);
    const r = new THREE.Mesh(rg, rim); spin.add(r);
    for (let k = 0; k < 5; k++) { const sp = box(0.26, 0.04, 0.06, rim, 0, 0, 0, 0); sp.rotation.x = k * Math.PI * 2 / 5; sp.scale.x = 0.9; spin.add(sp); }
    root.add(pivot); wheels.push({ pivot, spin, front: z > 0 });
  }
  root.userData = { wheels, body };
  return root;
}
