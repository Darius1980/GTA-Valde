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

function extrudeProfile(points, width, mat, bevel = 0.06) {
  // perfil lateral (z, y) extruido a lo ancho (x)
  const shape = new THREE.Shape(points.map(([z, y]) => new THREE.Vector2(-z, y)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: width - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * 0.8, bevelSegments: 3, curveSegments: 6 });
  g.rotateY(Math.PI / 2); g.translate(-(width - bevel * 2) / 2, 0, 0); g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true; return m;
}

// Coches: turismo compacto o todoterreno. Medidas aprox. 4,2 x 1,8 m.
export function makeCar(color = 0xb7beca, kind = 'sedan') {
  const root = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color, roughness: 0.32, metalness: 0.55, clearcoat: 1, clearcoatRoughness: 0.12 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0d151c, roughness: 0.04, metalness: 0.4, clearcoat: 1 });
  const black = std(0x141414, 0.65), chrome = std(0xdddddd, 0.2, 1), tyre = std(0x1a1a1a, 0.95), rim = std(0xa9adb3, 0.3, 0.9);
  const light = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xfff2c0, emissiveIntensity: 0.5, roughness: 0.1 });
  const rear = new THREE.MeshStandardMaterial({ color: 0x8a0a0a, emissive: 0x500000, emissiveIntensity: 0.6, roughness: 0.2 });
  const plate = std(0xf2f2f2, 0.5);
  const suv = kind === 'suv' || kind === 'police' || kind === '4x4', lift = suv ? 0.16 : 0, belt = 1.0 + lift;
  const body = new THREE.Group(); root.add(body);
  const lower = suv
    ? [[-2.05, 0.38], [-2.1, 0.7], [-2.08, belt], [1.25, belt], [1.95, belt - 0.1], [2.12, belt - 0.32], [2.1, 0.42], [1.9, 0.36]]
    : [[-2.08, 0.32], [-2.14, 0.72], [-1.98, belt - 0.02], [1.2, belt], [1.98, belt - 0.15], [2.14, belt - 0.42], [2.08, 0.34], [1.9, 0.3]];
  body.add(extrudeProfile(lower.map(([z, y]) => [z, y + (y < 0.5 ? lift * 0.5 : 0)]), 1.78, paint, 0.09));
  const top = belt + (suv ? 0.62 : 0.46);
  const cabin = suv
    ? [[-2.0, belt - 0.02], [-1.98, top - 0.04], [0.55, top], [1.25, belt - 0.02]]
    : [[-1.92, belt - 0.02], [-1.5, top - 0.03], [0.35, top], [1.2, belt - 0.02]];
  body.add(extrudeProfile(cabin, 1.6, glass, 0.07));
  // techo y pilares en el color de la carrocería
  const roofP = suv ? [[-1.98, top - 0.06], [-1.96, top + 0.03], [0.5, top + 0.05], [0.58, top - 0.02]] : [[-1.5, top - 0.06], [-1.46, top + 0.03], [0.3, top + 0.04], [0.4, top - 0.02]];
  body.add(extrudeProfile(roofP, 1.56, paint, 0.04));
  const pil = (a, b) => { // pilar entre dos puntos del perfil, a ambos lados
    for (const s of [-1, 1]) {
      const dz = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dz, dy);
      const m = box(0.05, L, 0.09, paint, 0.79 * s, (a[1] + b[1]) / 2, (a[0] + b[0]) / 2, 0); m.rotation.x = -Math.atan2(dz, dy); body.add(m);
    }
  };
  pil([suv ? -0.6 : -0.45, belt], [suv ? -0.6 : -0.45, top]);
  if (suv && kind !== 'police') { body.add(box(1.3, 0.04, 1.8, black, 0, top + 0.1, -0.7, 0.01)); } // baca
  if (kind === '4x4') { body.add(box(0.7, 0.7, 0.25, tyre, 0, belt - 0.1, -2.25, 0.2)); body.add(box(1.9, 0.12, 0.2, black, 0, 0.55, 2.25, 0.04)); } // rueda de repuesto y defensa
  body.add(box(1.82, 0.16, 0.16, black, 0, 0.45 + lift * 0.5, 2.06, 0.05)); body.add(box(1.82, 0.16, 0.16, black, 0, 0.45 + lift * 0.5, -2.04, 0.05));
  body.add(box(1.82, 0.08, 3.0, black, 0, 0.38 + lift * 0.5, 0.05, 0.03)); // faldones
  body.add(box(0.9, 0.16, 0.04, black, 0, belt - 0.33, 2.16, 0.02)); // rejilla
  body.add(box(0.52, 0.11, 0.02, plate, 0, 0.47 + lift * 0.5, 2.17, 0.01)); body.add(box(0.52, 0.11, 0.02, plate, 0, belt - 0.32, -2.19, 0.01));
  for (const s of [-1, 1]) {
    body.add(box(0.34, 0.11, 0.06, light, 0.62 * s, belt - 0.25, 2.16, 0.03));
    body.add(box(0.3, 0.13, 0.06, rear, 0.66 * s, belt - 0.2, -2.17, 0.03));
    body.add(box(0.07, 0.07, 0.17, paint, 0.93 * s, belt + 0.06, 1.05, 0.03)); // retrovisor
    body.add(box(0.02, 0.03, 0.17, chrome, 0.9 * s, belt - 0.12, 0.15, 0.01)); // maneta
    body.add(box(0.02, 0.03, 0.17, chrome, 0.9 * s, belt - 0.12, -0.9, 0.01));
  }
  const wheels = [];
  const R = kind === '4x4' ? 0.43 : suv ? 0.38 : 0.33;
  const wg = new THREE.CylinderGeometry(R, R, 0.23, 24); wg.rotateZ(Math.PI / 2);
  const tg = new THREE.TorusGeometry(R - 0.06, 0.06, 8, 24); tg.rotateY(Math.PI / 2);
  const rg = new THREE.CylinderGeometry(R * 0.62, R * 0.62, 0.24, 16); rg.rotateZ(Math.PI / 2);
  for (const [x, z] of [[-0.8, 1.32], [0.8, 1.32], [-0.8, -1.3], [0.8, -1.3]]) {
    const pivot = new THREE.Group(); pivot.position.set(x, R, z);
    const spin = new THREE.Group(); pivot.add(spin);
    const t = new THREE.Mesh(wg, tyre); t.castShadow = true; spin.add(t);
    for (const sx of [-0.1, 0.1]) { const tt = new THREE.Mesh(tg, tyre); tt.position.x = sx; spin.add(tt); }
    spin.add(new THREE.Mesh(rg, rim));
    for (let k = 0; k < 5; k++) { const sp = box(0.25, 0.05, R * 1.1, rim, 0, 0, 0, 0); sp.rotation.x = k * Math.PI * 2 / 5; spin.add(sp); }
    root.add(pivot); wheels.push({ pivot, spin, front: z > 0, R });
  }
  // limpiaparabrisas: pivotan en la base del parabrisas
  const wipers = [];
  {
    const fz = suv ? 1.25 : 1.2, rz = suv ? 0.55 : 0.35, slope = Math.atan2(top - belt, fz - rz);
    for (const x of [-0.42, 0.28]) {
      const piv = new THREE.Group(); piv.position.set(x, belt + 0.03, fz - 0.04); piv.rotation.x = slope; body.add(piv); // eje Y = normal del cristal
      const arm = new THREE.Group(); piv.add(arm);
      const blade = box(0.58, 0.018, 0.022, black, 0.29, 0.015, 0, 0); blade.userData.noDent = true; arm.add(blade);
      wipers.push(arm);
    }
  }
  if (kind === 'police') { // Guardia Civil: franja verde, rótulo y puente de luces
    const green = std(0x1f6b3a, 0.5, 0.2);
    for (const s of [-1, 1]) { const st = box(0.02, 0.16, 3.4, green, 0.9 * s, belt - 0.2, -0.05, 0); st.userData.noDent = true; body.add(st); }
    const bar = box(1.1, 0.1, 0.28, black, 0, top + 0.08, -0.4, 0.03); body.add(bar);
    const blueA = new THREE.MeshStandardMaterial({ color: 0x1030ff, emissive: 0x1a40ff, emissiveIntensity: 0, roughness: 0.2 });
    const blueB = new THREE.MeshStandardMaterial({ color: 0x1030ff, emissive: 0x1a40ff, emissiveIntensity: 0, roughness: 0.2 });
    body.add(box(0.42, 0.12, 0.24, blueA, -0.3, top + 0.16, -0.4, 0.03)); body.add(box(0.42, 0.12, 0.24, blueB, 0.3, top + 0.16, -0.4, 0.03));
    root.userData.siren = [blueA, blueB];
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.2), new THREE.MeshBasicMaterial({ map: textTex('GUARDIA CIVIL', '#1f6b3a', '#ffffff'), transparent: true }));
    for (const s of [-1, 1]) { const l = label.clone(); l.position.set(0.915 * s, belt - 0.42, -0.2); l.rotation.y = s * Math.PI / 2; body.add(l); }
  }
  // sombra de contacto suave
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 4.6), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false, alphaMap: contactShadow() }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = 0.03; root.add(sh);
  root.userData = { ...root.userData, wheels, body, lightMat: light, rearMat: rear, paint, wipers };
  return root;
}

let _cs;
function contactShadow() {
  if (_cs) return _cs;
  const c = document.createElement('canvas'); c.width = 64; c.height = 128; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 64, 4, 32, 64, 62); gr.addColorStop(0, '#fff'); gr.addColorStop(1, '#000');
  g.fillStyle = gr; g.save(); g.scale(1, 2); g.fillRect(0, 0, 64, 64); g.restore();
  return (_cs = new THREE.CanvasTexture(c));
}

export function textTex(text, bg, fg, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.fillStyle = fg; g.font = `bold ${Math.round(h * 0.62)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function wheel(R, width, tyre, rim, spokes = 5) {
  const spin = new THREE.Group();
  const wg = new THREE.CylinderGeometry(R, R, width, 24); wg.rotateZ(Math.PI / 2);
  const t = new THREE.Mesh(wg, tyre); t.castShadow = true; spin.add(t);
  const rg = new THREE.CylinderGeometry(R * 0.6, R * 0.6, width + 0.01, 16); rg.rotateZ(Math.PI / 2); spin.add(new THREE.Mesh(rg, rim));
  for (let k = 0; k < spokes; k++) { const sp = box(width + 0.02, 0.05, R * 1.1, rim, 0, 0, 0, 0); sp.rotation.x = k * Math.PI * 2 / spokes; spin.add(sp); }
  // tacos del neumático (se ve girar)
  for (let k = 0; k < 10; k++) { const lug = box(width, 0.04, 0.08, tyre, 0, 0, 0, 0); const a = k * Math.PI / 5; lug.position.set(0, Math.cos(a) * R, Math.sin(a) * R); lug.rotation.x = -a; spin.add(lug); }
  return spin;
}
function lightsMats() {
  return {
    light: new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xfff2c0, emissiveIntensity: 0.5, roughness: 0.1 }),
    rear: new THREE.MeshStandardMaterial({ color: 0x8a0a0a, emissive: 0x500000, emissiveIntensity: 0.6, roughness: 0.2 }),
  };
}

// Tractor: ruedas traseras grandes, capó largo y cabina acristalada
export function makeTractor(color = 0x2f7d32) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const paint = new THREE.MeshPhysicalMaterial({ color, roughness: 0.45, metalness: 0.3, clearcoat: 0.5 });
  const black = std(0x161616, 0.7), tyre = std(0x1a1a1a, 0.95), rim = std(0xe8c22a, 0.5, 0.3), glass = new THREE.MeshPhysicalMaterial({ color: 0x15232c, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.55 });
  const { light, rear } = lightsMats();
  body.add(box(0.9, 0.7, 2.0, paint, 0, 1.05, 0.75, 0.06));          // capó
  body.add(box(0.5, 0.18, 0.1, black, 0, 1.0, 1.77, 0.02));            // rejilla
  body.add(box(1.0, 0.25, 1.4, black, 0, 0.75, -0.5, 0.03));           // chasis
  body.add(box(1.5, 0.1, 1.2, paint, 0, 1.35, -0.75, 0.03));           // guardabarros
  // cabina
  for (const [x, z] of [[-0.68, -0.2], [0.68, -0.2], [-0.68, -1.3], [0.68, -1.3]]) body.add(box(0.06, 1.35, 0.06, black, x, 2.05, z, 0));
  body.add(box(1.5, 0.08, 1.3, paint, 0, 2.75, -0.75, 0.03));
  const g1 = box(1.36, 1.2, 0.02, glass, 0, 2.05, -0.2, 0); g1.userData.noDent = true; body.add(g1);
  for (const s of [-1, 1]) { const g = box(0.02, 1.2, 1.05, glass, 0.68 * s, 2.05, -0.75, 0); g.userData.noDent = true; body.add(g); }
  body.add(box(0.5, 0.08, 0.5, black, 0, 1.55, -0.85, 0.03)); // asiento
  body.add(box(0.08, 0.7, 0.08, black, 0.25, 1.9, 1.35, 0)); // escape
  for (const s of [-1, 1]) { body.add(box(0.16, 0.12, 0.06, light, 0.3 * s, 1.25, 1.78, 0.02)); body.add(box(0.12, 0.1, 0.05, rear, 0.7 * s, 1.5, -1.37, 0.02)); }
  const wheels = [];
  for (const [x, z, R, wdt] of [[-0.6, 1.35, 0.45, 0.25], [0.6, 1.35, 0.45, 0.25], [-0.92, -0.75, 0.78, 0.42], [0.92, -0.75, 0.78, 0.42]]) {
    const pivot = new THREE.Group(); pivot.position.set(x, R, z); const spin = wheel(R, wdt, tyre, rim, 6); pivot.add(spin); root.add(pivot);
    wheels.push({ pivot, spin, front: z > 0, R });
  }
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 4.0), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.35, depthWrite: false, alphaMap: contactShadow() }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = 0.03; root.add(sh);
  root.userData = { wheels, body, lightMat: light, rearMat: rear, paint, wipers: [] };
  return root;
}

// Moto de carretera con su piloto (el piloto solo se ve cuando la conduces)
export function makeMoto(color = 0xc0392b) {
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const paint = new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0.5, clearcoat: 1 });
  const black = std(0x141414, 0.6), chrome = std(0xdddddd, 0.2, 1), tyre = std(0x1a1a1a, 0.95), rim = std(0x333333, 0.4, 0.6);
  const { light, rear } = lightsMats();
  body.add(box(0.12, 0.22, 1.0, black, 0, 0.55, 0, 0.04));            // cuadro
  body.add(box(0.34, 0.24, 0.5, paint, 0, 0.82, 0.2, 0.1));            // depósito
  body.add(box(0.28, 0.1, 0.55, black, 0, 0.8, -0.3, 0.04));           // asiento
  body.add(box(0.3, 0.3, 0.42, paint, 0, 0.68, 0.62, 0.1));            // carenado
  body.add(box(0.26, 0.2, 0.05, std(0x223344, 0.05, 0.3), 0, 0.92, 0.82, 0.02)); // cúpula
  body.add(box(0.36, 0.28, 0.3, std(0x444444, 0.5, 0.6), 0, 0.45, 0.1, 0.06)); // motor
  const ex = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.7, 10), chrome); ex.rotation.x = Math.PI / 2 - 0.15; ex.position.set(0.16, 0.42, -0.45); body.add(ex);
  body.add(box(0.62, 0.03, 0.03, black, 0, 0.95, 0.58, 0)); // manillar
  body.add(box(0.12, 0.1, 0.05, light, 0, 0.72, 0.86, 0.02)); body.add(box(0.12, 0.06, 0.05, rear, 0, 0.82, -0.6, 0.02));
  for (const z of [0.6, -0.65]) { const fork = box(0.05, 0.5, 0.05, chrome, 0.07, 0.5, z * 0.98, 0); body.add(fork); const fork2 = fork.clone(); fork2.position.x = -0.07; body.add(fork2); }
  const wheels = [];
  for (const z of [0.68, -0.68]) {
    const R = 0.31, pivot = new THREE.Group(); pivot.position.set(0, R, z); const spin = wheel(R, 0.13, tyre, rim, 5); pivot.add(spin); root.add(pivot);
    wheels.push({ pivot, spin, front: z > 0, R });
  }
  // piloto con casco
  const rider = makeCharacter({ shirt: 0x202020, pants: 0x1b2533 }); const p = rider.userData.parts;
  rider.position.set(0, -0.15, -0.28);
  p.lHip.rotation.x = p.rHip.rotation.x = -1.25; p.lKnee.rotation.x = p.rKnee.rotation.x = 1.6; p.lHip.rotation.z = -0.25; p.rHip.rotation.z = 0.25;
  p.torso.rotation.x = 0.55; p.lShoulder.rotation.x = p.rShoulder.rotation.x = -1.1; p.lElbow.rotation.x = p.rElbow.rotation.x = -0.3;
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), paint); helmet.position.y = 0.13; p.head.add(helmet);
  rider.visible = false; body.add(rider);
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 2.0), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.35, depthWrite: false, alphaMap: contactShadow() }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = 0.03; root.add(sh);
  root.userData = { wheels, body, lightMat: light, rearMat: rear, paint, wipers: [], rider };
  return root;
}

export function makeVehicle(kind, color) {
  if (kind === 'tractor') return makeTractor(color);
  if (kind === 'moto') return makeMoto(color);
  return makeCar(color, kind);
}
