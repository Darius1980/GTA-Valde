// Aeródromo con una avioneta para sobrevolar el pueblo. La pista la busca tools/find_airfield.py
// (el sitio más llano cerca del pueblo, sin casas, calles ni agua) y va en plano.json como 'aerodromo'.
import * as THREE from 'three';
import { textTex } from './models.js';

const mat = (c, r = 0.7, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
function box(g, w, h, d, m, x, y, z) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; g.add(o); return o; }

// geometría de la pista: eje a→b, ancho w
export function airfieldFrame(af) {
  const [ax, az] = af.a, [bx, bz] = af.b, L = Math.hypot(bx - ax, bz - az), ux = (bx - ax) / L, uz = (bz - az) / L;
  return { ax, az, bx, bz, L, ux, uz, nx: -uz, nz: ux, w: af.w || 24 };
}
// allana el terreno bajo la pista (rampa recta de punta a punta) y lo funde con el de alrededor
export function flattenAirfield(terrain, af) {
  const f = airfieldFrame(af), n = terrain.n, h = terrain.h, side = f.w / 2 + 40;
  const ha = terrain.innerHeight(f.ax, f.az), hb = terrain.innerHeight(f.bx, f.bz);
  f.ha = ha; f.hb = hb;
  const apron = f.w / 2 + 34; // la explanada del hangar, junto al primer tercio
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const x = terrain.ox + i * terrain.cell, z = terrain.oz + j * terrain.cell, dx = x - f.ax, dz = z - f.az;
    const u = dx * f.ux + dz * f.uz, v = dx * f.nx + dz * f.nz;
    if (u < -60 || u > f.L + 60 || Math.abs(v) > side + 30) continue;
    const t = Math.max(0, Math.min(1, u / f.L)), target = ha + (hb - ha) * t;
    const inV = v > 0 && u > 30 && u < 140 ? apron : f.w / 2 + 6; // a un lado, sitio para el hangar
    const dv = Math.max(0, Math.abs(v) - inV), du = Math.max(0, -u - 15, u - f.L - 15);
    const k = Math.max(0, 1 - Math.hypot(dv, du) / 30), s = k * k * (3 - 2 * k);
    h[j * n + i] += (target - h[j * n + i]) * s;
  }
  return f;
}
export function onAirfield(f, x, z, pad = 8) {
  const dx = x - f.ax, dz = z - f.az, u = dx * f.ux + dz * f.uz, v = dx * f.nx + dz * f.nz;
  return (u > -pad && u < f.L + pad && Math.abs(v) < f.w / 2 + pad) || (u > 25 && u < 145 && v > 0 && v < f.w / 2 + 36);
}

// pista, hangar, manga de viento y cartel
export function buildAirfield(f, terrain, colliders) {
  const g = new THREE.Group();
  const P = (u, v, lift = 0.09) => { const x = f.ax + f.ux * u + f.nx * v, z = f.az + f.uz * u + f.nz * v; return [x, terrain.height(x, z) + lift, z]; };
  const strip = (u0, u1, v0, v1, m, lift) => {
    const pos = [], idx = [], N = Math.max(1, Math.ceil((u1 - u0) / 10));
    for (let k = 0; k <= N; k++) { const u = u0 + (u1 - u0) * k / N; pos.push(...P(u, v0, lift), ...P(u, v1, lift)); if (k) { const a = (k - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
    // el orden de los vértices depende del lado: dibujar las dos caras
    const mesh = new THREE.Mesh(geo, m); mesh.receiveShadow = true; g.add(mesh); return mesh;
  };
  const asphalt = new THREE.MeshStandardMaterial({ color: 0x3d4044, roughness: 0.95, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
  const white = new THREE.MeshStandardMaterial({ color: 0xeeeeea, roughness: 0.8, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -4 });
  const apronM = new THREE.MeshStandardMaterial({ color: 0x6b6d6e, roughness: 0.95, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1 });
  strip(0, f.L, -f.w / 2, f.w / 2, asphalt, 0.09);
  strip(40, 130, f.w / 2, f.w / 2 + 30, apronM, 0.07); // explanada del hangar
  for (let u = 30; u < f.L - 30; u += 30) strip(u, u + 15, -0.4, 0.4, white, 0.11); // eje
  for (const v of [-f.w / 2 + 0.6, f.w / 2 - 0.6]) strip(0, f.L, v - 0.25, v + 0.25, white, 0.11); // bordes
  for (const [u0, u1] of [[4, 22], [f.L - 22, f.L - 4]]) for (let k = -4; k <= 4; k++) if (k) strip(u0, u1, k * 1.25 - 0.4, k * 1.25 + 0.4, white, 0.11); // cebra de cabecera
  // hangar de chapa abierto hacia la pista
  const hx = f.ax + f.ux * 85 + f.nx * (f.w / 2 + 44), hz = f.az + f.uz * 85 + f.nz * (f.w / 2 + 44);
  const hg = new THREE.Group(); hg.position.set(hx, terrain.height(hx, hz), hz); hg.rotation.y = Math.atan2(f.ux, f.uz);
  const tin = mat(0x9aa3a8, 0.5, 0.5), dark = mat(0x2a2d30, 0.9), red = mat(0xb02a22, 0.6);
  // local: +x mira a la pista (ahí está la puerta abierta), z = a lo largo de la pista
  box(hg, 0.3, 6, 22, tin, -9, 3, 0); box(hg, 18, 6, 0.3, tin, 0, 3, -11); box(hg, 18, 6, 0.3, tin, 0, 3, 11);
  box(hg, 19, 0.3, 23, red, 0, 6.2, 0); box(hg, 0.2, 1.2, 22, tin, 9, 5.4, 0); box(hg, 17.6, 0.05, 21.6, dark, 0, 0.03, 0);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 1.4), new THREE.MeshStandardMaterial({ map: textTex('✈ AERÓDROMO VALDE', '#13324d', '#f5c542', 1024, 144), roughness: 0.6, side: THREE.DoubleSide }));
  sign.position.set(9.15, 5.4, 0); sign.rotation.y = Math.PI / 2; hg.add(sign);
  g.add(hg);
  const loc = (lx, lz) => { const c = Math.cos(hg.rotation.y), s = Math.sin(hg.rotation.y); return [hx + lx * c + lz * s, hz - lx * s + lz * c]; };
  for (const [a, b] of [[[-9, -11], [-9, 11]], [[-9, -11], [9, -11]], [[-9, 11], [9, 11]]]) colliders.addSegment(...loc(...a), ...loc(...b), 'building');
  // manga de viento en la otra orilla
  const wx = f.ax + f.ux * 60 - f.nx * (f.w / 2 + 14), wz = f.az + f.uz * 60 - f.nz * (f.w / 2 + 14), wy = terrain.height(wx, wz);
  const pole = box(g, 0.15, 6, 0.15, mat(0xdddddd), wx, wy + 3, wz); void pole;
  const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.5, 3, 10, 1, true), new THREE.MeshStandardMaterial({ color: 0xff6a00, roughness: 0.8, side: THREE.DoubleSide }));
  sock.rotation.z = Math.PI / 2; sock.position.set(wx + 1.5, wy + 5.6, wz); g.add(sock); g.userData.sock = sock;
  colliders.addSegment(wx - 0.2, wz, wx + 0.2, wz, 'wall');
  // dónde aparca la avioneta: en la explanada, mirando a la pista
  const px = f.ax + f.ux * 85 + f.nx * (f.w / 2 + 22), pz = f.az + f.uz * 85 + f.nz * (f.w / 2 + 22);
  f.park = { x: px, z: pz, h: Math.atan2(-f.nx, -f.nz) };
  f.exit = { x: f.ax + f.ux * 70 + f.nx * (f.w / 2 + 22), z: f.az + f.uz * 70 + f.nz * (f.w / 2 + 22) };
  return g;
}

// avioneta de ala alta (tipo escuela), unos 8 m de largo; +z es el morro
function makePlane() {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  const white = mat(0xf4f4f0, 0.4, 0.1), red = mat(0xc0261e, 0.45, 0.1), glass = new THREE.MeshStandardMaterial({ color: 0x223040, roughness: 0.1, metalness: 0.6 }), black = mat(0x151515, 0.9), gray = mat(0x777777, 0.4, 0.6);
  box(body, 1.2, 1.3, 3.2, white, 0, 1.55, 0.7); // cabina
  box(body, 1.22, 0.75, 1.4, glass, 0, 1.95, 1.15);
  box(body, 1.0, 0.9, 1.2, white, 0, 1.45, 2.8); // capó
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.6, 12), gray); nose.rotation.x = Math.PI / 2; nose.position.set(0, 1.45, 3.65); body.add(nose);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.6, 4.2, 10), white); tail.rotation.x = Math.PI / 2; tail.position.set(0, 1.65, -3); tail.castShadow = true; body.add(tail);
  box(body, 11, 0.14, 1.5, white, 0, 2.3, 0.9); box(body, 11.02, 0.15, 0.3, red, 0, 2.3, 0.2); // ala alta
  for (const s of [-1, 1]) { const st = box(body, 0.08, 1.2, 0.08, gray, s * 1.6, 1.7, 0.9); st.rotation.z = s * 0.9; }
  box(body, 3.6, 0.1, 1.0, white, 0, 1.75, -4.7); // estabilizador
  box(body, 0.1, 1.5, 1.2, red, 0, 2.45, -4.8); // deriva
  box(body, 1.24, 0.18, 3.3, red, 0, 1.2, 0.6); // franja
  for (const [x, z] of [[-1, 0.4], [1, 0.4], [0, 2.9]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 12), black); w.rotation.z = Math.PI / 2; w.position.set(x, 0.3, z); body.add(w); box(body, 0.08, 0.7, 0.08, gray, x * 0.85, 0.65, z); }
  const prop = new THREE.Group(); prop.position.set(0, 1.45, 3.75); box(prop, 0.15, 1.9, 0.05, black, 0, 0, 0); body.add(prop);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.95, 20), new THREE.MeshBasicMaterial({ color: 0x222222, transparent: true, opacity: 0, depthWrite: false })); disc.position.set(0, 1.45, 3.8); body.add(disc);
  g.userData = { body, prop, disc };
  return g;
}

const GEAR = 0.0; // el modelo ya tiene las ruedas debajo de y = 0
export class Plane {
  constructor({ world, f, scale = 0.85 }) {
    this.world = world; this.f = f; this.s = scale;
    this.mesh = makePlane(); this.mesh.scale.setScalar(scale);
    this.pos = new THREE.Vector3(); this.vel = new THREE.Vector3();
    this.reset();
  }
  reset() {
    const p = this.f.park; this.pos.set(p.x, this.world.terrain.height(p.x, p.z) + GEAR, p.z);
    this.heading = p.h; this.pitch = 0; this.roll = 0; this.speed = 0; this.vy = 0; this.throttle = 0; this.onGround = true; this.engine = false;
    this.#pose(0);
  }
  get canExit() { return this.onGround && Math.abs(this.speed) < 3; }
  get altitude() { return this.pos.y - this.world.terrain.height(this.pos.x, this.pos.z); }
  // controles: arriba/abajo (W/S, joystick) = subir/bajar el morro; izquierda/derecha = girar;
  // en tierra, arriba acelera y abajo/espacio frena; en el aire, espacio quita gas
  update(dt, input, toast) {
    const T = this.world.terrain, a = input ? input.axes() : { x: 0, y: 0 }, brake = input?.brake;
    const VR = 24, STALL = 17, MAXV = 62;
    if (this.onGround) {
      this.throttle += ((a.y > 0 ? 1 : 0) - this.throttle) * Math.min(1, dt * 1.5);
      this.speed += (this.throttle * 7.5 - 0.004 * this.speed * this.speed - (a.y < 0 || brake ? 9 : 0.6) * Math.sign(this.speed)) * dt;
      if (Math.abs(this.speed) < 0.15 && !(a.y > 0)) this.speed = 0;
      this.speed = Math.max(-1, this.speed);
      const turn = a.x * (this.speed < 12 ? 0.7 : 0.25) * Math.min(1, Math.abs(this.speed) / 2 + 0.3);
      this.heading -= turn * dt;
      this.pitch += ((this.speed > VR && a.y > 0 ? 0.16 : 0) - this.pitch) * Math.min(1, dt * 3);
      this.roll *= 0.8;
      // fuera del asfalto el campo frena y traquetea
      if (!onAirfield(this.f, this.pos.x, this.pos.z, 2) && this.speed > 6) this.speed -= 4 * dt;
      if (this.speed > VR && a.y > 0) { this.onGround = false; this.vy = 1.5; toast?.('✈ ¡Despegando!', 'Arriba/abajo sube o baja el morro, izquierda/derecha gira. Espacio quita gas.'); }
      this.pos.x += Math.sin(this.heading) * this.speed * dt; this.pos.z += Math.cos(this.heading) * this.speed * dt;
      this.pos.y = T.height(this.pos.x, this.pos.z) + GEAR; this.vy = this.onGround ? 0 : this.vy;
      const hit = this.speed > 4 && this.world.colliders.nearest(this.pos.x, this.pos.z, 3 * this.s);
      if (hit) return this.#crash(toast, 'Te has chocado rodando por tierra');
    } else {
      this.throttle += ((brake ? 0.15 : 1) - this.throttle) * Math.min(1, dt * 1.2);
      const stall = this.speed < STALL;
      const tp = stall ? -0.35 : THREE.MathUtils.clamp(a.y * 0.38, -0.45, 0.4);
      this.pitch += (tp - this.pitch) * Math.min(1, dt * 1.6);
      this.roll += (a.x * 0.65 - this.roll) * Math.min(1, dt * 2);
      this.heading -= Math.tan(this.roll) * 9.8 / Math.max(15, this.speed) * dt * 1.4;
      this.speed += (this.throttle * 9 - 0.0028 * this.speed * this.speed - 9.8 * Math.sin(this.pitch)) * dt;
      this.speed = THREE.MathUtils.clamp(this.speed, 5, MAXV);
      const lift = Math.min(1, this.speed / 30);
      const vyT = Math.sin(this.pitch) * this.speed - (1 - lift) * 6;
      this.vy += (vyT - this.vy) * Math.min(1, dt * 2.5);
      const fh = Math.cos(this.pitch) * this.speed;
      this.pos.x += Math.sin(this.heading) * fh * dt; this.pos.z += Math.cos(this.heading) * fh * dt; this.pos.y += this.vy * dt;
      const gy = T.height(this.pos.x, this.pos.z);
      // techo: 700 m sobre el suelo
      if (this.pos.y - gy > 700) { this.pos.y = gy + 700; this.vy = Math.min(0, this.vy); }
      // borde del mundo: da la vuelta
      const lim = (this.world.edge || 9000);
      if (Math.max(Math.abs(this.pos.x), Math.abs(this.pos.z)) > lim) {
        const want = Math.atan2(-this.pos.x, -this.pos.z); let d = want - this.heading; d = Math.atan2(Math.sin(d), Math.cos(d));
        this.heading += Math.sign(d) * Math.min(Math.abs(d), dt * 0.8); this.roll = -Math.sign(d) * 0.5; // d > 0 gira a la izquierda: ala derecha arriba
        if (!this.edgeWarn) { this.edgeWarn = true; toast?.('Fin del mapa', 'La avioneta da la vuelta hacia Val de Santa María'); }
      } else this.edgeWarn = false;
      if (this.pos.y - gy < 12 && this.world.colliders.nearest(this.pos.x, this.pos.z, 3, 'building')) return this.#crash(toast, 'Has chocado contra una casa');
      if (this.pos.y <= gy + GEAR) {
        const soft = this.vy > -4.5 && Math.abs(this.roll) < 0.3 && this.pitch > -0.15 && this.speed < 45;
        if (!soft) return this.#crash(toast, this.speed >= 45 ? 'Demasiado rápido: aterriza por debajo de 160 km/h' : 'Has bajado muy de golpe');
        this.onGround = true; this.pos.y = gy + GEAR; this.vy = 0; this.roll = 0; this.pitch = 0; this.throttle = 0;
        toast?.('🛬 Aterrizaje', onAirfield(this.f, this.pos.x, this.pos.z) ? '¡Bien hecho! Frena con abajo o espacio' : 'En pleno campo… frena con abajo o espacio');
      }
    }
    this.#pose(dt);
  }
  #crash(toast, why) {
    toast?.('💥 Te has estrellado', why + '. La avioneta vuelve al aeródromo.');
    this.crashed = true; this.reset(); return 'crash';
  }
  #pose(dt) {
    const m = this.mesh, T = this.world.terrain;
    m.position.copy(this.pos);
    let gp = 0;
    if (this.onGround) { // en tierra sigue la pendiente
      const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
      gp = -Math.atan2(T.height(this.pos.x + fx * 2, this.pos.z + fz * 2) - T.height(this.pos.x - fx * 2, this.pos.z - fz * 2), 4);
    }
    m.rotation.set(0, 0, 0); m.rotation.order = 'YXZ';
    m.rotation.y = this.heading; m.rotation.x = -this.pitch + gp; m.rotation.z = this.roll;
    const u = m.userData; const spin = this.engine ? 8 + this.throttle * 60 : 0;
    u.prop.rotation.z += spin * dt; u.disc.material.opacity = this.engine ? 0.12 + this.throttle * 0.2 : 0; u.prop.visible = spin < 30;
  }
  forward(v = new THREE.Vector3()) { return v.set(Math.sin(this.heading) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.heading) * Math.cos(this.pitch)); }
}
