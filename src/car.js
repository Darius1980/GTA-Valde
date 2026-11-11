import * as THREE from 'three';
import { makeVehicle } from './models.js';

// punto (x, z) del mundo en coordenadas locales del coche, sin escala
function localHit(car, x, z) {
  const dx = (x - car.pos.x) / car.s, dz = (z - car.pos.z) / car.s, fx = Math.sin(car.heading), fz = Math.cos(car.heading);
  return [dx * fz - dz * fx, dx * fx + dz * fz];
}
let _smoke;
function smokeTex() {
  if (_smoke) return _smoke;
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return (_smoke = new THREE.CanvasTexture(c));
}

// características de cada vehículo: tirón y velocidad punta (m/s) de cada marcha, círculos de choque,
// radio, batalla, cuánto le frena la cuesta y autonomía (m con el depósito lleno)
export const SPEC = {
  sedan:   { g1: [5.5, 13.5], g2: [3.6, 29], circ: [-1.4, 0, 1.4], r: 0.95, wb: 2.65, slope: 1, range: 14000, name: 'Turismo' },
  suv:     { g1: [5.2, 13.5], g2: [3.4, 28], circ: [-1.4, 0, 1.4], r: 0.95, wb: 2.65, slope: 0.7, range: 12000, name: 'Todoterreno' },
  police:  { g1: [6.0, 14.5], g2: [4.2, 32], circ: [-1.4, 0, 1.4], r: 0.95, wb: 2.65, slope: 0.7, range: 1e9, name: 'Guardia Civil' },
  '4x4':   { g1: [6.0, 14], g2: [3.8, 30], circ: [-1.4, 0, 1.4], r: 1.0, wb: 2.65, slope: 0.3, range: 11000, name: '4x4' },
  tractor: { g1: [3.4, 6.5], g2: [2.4, 11.5], circ: [-1.1, 0, 1.1], r: 1.05, wb: 2.1, slope: 0.15, range: 20000, name: 'Tractor' },
  moto:    { g1: [7.5, 16], g2: [4.8, 33], circ: [-0.55, 0.55], r: 0.45, wb: 1.4, slope: 0.8, range: 16000, name: 'Moto' },
};
export class Car {
  constructor(world, color, kind, scale = 1) {
    this.kind = SPEC[kind] ? kind : 'sedan'; this.color = color; this.spec = SPEC[this.kind];
    this.world = world; this.mesh = makeVehicle(this.kind, color); this.s = scale; this.mesh.scale.setScalar(scale);
    this.fuel = 1; this.wipe = 0;
    this.pos = new THREE.Vector3(); this.heading = 0; this.speed = 0; this.steer = 0; this.driver = false;
    this.settled = false; this.quat = new THREE.Quaternion();
    this.health = 100; this.smoke = []; this.gear = 1;
  }
  get wrecked() { return this.health <= 0; }
  get R() { return this.spec.r * this.s; }
  // taller: carrocería nueva (sin abolladuras) y motor como nuevo
  repair() {
    const old = this.mesh, m = makeVehicle(this.kind, this.color); m.scale.setScalar(this.s);
    m.position.copy(old.position); m.quaternion.copy(old.quaternion);
    const parent = old.parent; for (const c of [...old.children]) if (c.isLight || c.userData.keep) m.add(c);
    if (parent) { parent.remove(old); parent.add(m); }
    this.mesh = m; this.health = 100; for (const sp of this.smoke) sp.material.opacity = 0;
  }
  // limpiaparabrisas (lluvia/nieve: 0..1)
  wipers(dt, on) {
    const w = this.mesh.userData.wipers; if (!w?.length) return;
    if (on) this.wipe += dt * 2.6; else if (this.wipe % (Math.PI * 2) > 0.05) this.wipe += dt * 2.6; else this.wipe = 0;
    const a = (1 - Math.cos(this.wipe)) / 2 * 1.45;
    for (const arm of w) arm.rotation.y = a;
  }
  // golpe: abolla la carrocería cerca del punto de impacto (coordenadas locales sin escalar) y resta vida
  damage(amount, lx, lz) {
    // un mismo golpe toca varios puntos de contacto durante unos fotogramas: solo cuenta una vez
    const now = performance.now(); if (amount <= 0 || now - (this.lastHit || 0) < 500) return;
    this.lastHit = now;
    this.health = Math.max(0, this.health - amount);
    const dent = Math.min(0.25, amount * 0.012), body = this.mesh.userData.body, v = new THREE.Vector3();
    body.traverse(m => {
      if (!m.isMesh || m.userData.noDent) return;
      const p = m.geometry.attributes.position; if (!p) return;
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i); m.localToWorld(v); this.mesh.worldToLocal(v); v.divideScalar(1);
        const d = Math.hypot(v.x - lx, v.z - lz); if (d > 1.1) continue;
        const k = dent * (1 - d / 1.1) * (0.6 + 0.4 * Math.sin(i * 12.9898) ** 2);
        const lx0 = p.getX(i), ly0 = p.getY(i), lz0 = p.getZ(i);
        // empuja hacia el centro del coche en el sistema local de la pieza
        const c = new THREE.Vector3(0, 0.6, 0); this.mesh.localToWorld(c); m.worldToLocal(c);
        const dx = c.x - lx0, dy = (c.y - ly0) * 0.3, dz = c.z - lz0, L = Math.hypot(dx, dy, dz) || 1;
        p.setXYZ(i, lx0 + dx / L * k, ly0 + dy / L * k - k * 0.3, lz0 + dz / L * k);
      }
      p.needsUpdate = true; m.geometry.computeVertexNormals();
    });
    const paint = this.mesh.userData.paint;
    if (paint) { paint.roughness = 0.32 + (100 - this.health) / 100 * 0.5; paint.clearcoat = this.health / 100; }
    if (this.wrecked) { this.mesh.userData.lightMat.color.set(0x222222); }
  }
  // humo del motor cuando está tocado (gris) o muy tocado (negro)
  #fx(dt) {
    if (this.health > 55 && !this.smoke.length) return;
    if (!this.smoke.length) {
      for (let i = 0; i < 10; i++) {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex(), transparent: true, depthWrite: false, opacity: 0 }));
        sp.userData.t = i / 10; this.world.scene.add(sp); this.smoke.push(sp);
      }
    }
    const dark = this.health < 25, hood = new THREE.Vector3(0, 1.0, 1.5).applyMatrix4(this.mesh.matrixWorld);
    for (const sp of this.smoke) {
      sp.userData.t += dt * 0.6;
      if (sp.userData.t >= 1 || !sp.userData.v) { sp.userData.t %= 1; sp.position.copy(hood); sp.userData.v = new THREE.Vector3((Math.random() - .5) * .4, 1 + Math.random() * .5, (Math.random() - .5) * .4); }
      const t = sp.userData.t; if (sp.userData.v) sp.position.addScaledVector(sp.userData.v, dt);
      sp.scale.setScalar((0.4 + t * 2) * this.s);
      sp.material.opacity = this.health > 55 ? 0 : (1 - t) * (dark ? 0.75 : 0.4);
      sp.material.color.setHex(dark ? 0x222222 : 0x9a9a9a);
    }
  }
  // aparca en (x, z); si ahí hay una casa o una tapia, lo deja justo fuera
  place(x, z, h) {
    this.pos.set(x, 0, z); this.heading = h;
    const col = this.world.colliders; if (col) for (let i = 0; i < 4 && this.#walls(col); i++);
    this.pos.y = this.world.terrain.height(this.pos.x, this.pos.z); this.#orient(1);
  }
  circles() {
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    return this.spec.circ.map(o => [this.pos.x + fx * o * this.s, this.pos.z + fz * o * this.s]);
  }
  pushOut(p, r) {
    for (const [cx, cz] of this.circles()) {
      const dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz), R = this.R + r;
      if (d < R && d > 1e-6) { p.x = cx + dx / d * R; p.z = cz + dz / d * R; }
    }
  }
  // faros: n = cuánto es de noche (0..1)
  setLights(n, braking = false) {
    const u = this.mesh.userData;
    u.lightMat.emissiveIntensity = 0.5 + 4 * n;
    u.rearMat.emissiveIntensity = (braking ? 3 : 0.6) + 1.5 * n;
  }
  update(dt, input) {
    const { colliders, terrain, cars } = this.world;
    if (this.ai && !this.driver) { // conducido por la IA del tráfico
      this.ai.update(dt, this.world.obstacles || []);
      // si la calle roza una casa, que el coche no se meta dentro (solo las casas: las tapias del plano lo dejarían atascado)
      const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
      for (const o0 of this.spec.circ) {
        const o = o0 * this.s, p = { x: this.pos.x + fx * o, z: this.pos.z + fz * o };
        if (colliders.expel(p, this.R)) { this.pos.x = p.x - fx * o; this.pos.z = p.z - fz * o; }
      }
      this.#orient(dt); this.#spin(dt); this.#fx(dt); return;
    }
    if (input) {
      // el motor pierde fuerza poco a poco con los daños; solo deja de tirar del todo al 100 %
      const dry = this.fuel <= 0, dead = this.wrecked || dry;
      const a0 = input.axes(), power = dead ? 0 : 0.45 + 0.55 * this.health / 100, a = { x: a0.x, y: a0.y > 0 ? a0.y * power : a0.y * (dead ? 0 : 1) };
      const grip = this.world.grip ?? 1; // lluvia y nieve: frena peor y gira menos
      const maxSteer = 0.6 / (1 + Math.abs(this.speed) / 12) * (0.6 + 0.4 * grip);
      this.steer += (a.x * maxSteer - this.steer) * Math.min(1, dt * 6 * (0.5 + 0.5 * grip));
      const throttle = a.y;
      if (input.brake) this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 14 * grip * dt);
      else if (throttle > 0) { // dos marchas: corta (más tirón) y larga (más punta); cada vehículo tiene las suyas
        const [F0, V] = this.gear === 2 ? this.spec.g2 : this.spec.g1, v = Math.max(0, this.speed), F = F0 * (1 - (v / V) ** 2);
        this.speed += (this.speed < 0 ? 8 * grip : Math.max(-1.5, F * (0.7 + 0.3 * grip))) * throttle * dt;
      }
      else if (throttle < 0) this.speed += (this.speed > 0 ? 9 * grip : 2.5 * (1 + this.speed / 8)) * throttle * dt;
      if (this.driver && !dead) this.fuel = Math.max(0, this.fuel - Math.abs(this.speed) * dt / this.spec.range - (throttle ? 0.000004 : 0));
    } else this.steer *= 0.9;
    // rozamiento y resistencia
    this.speed -= (0.0007 * this.speed * Math.abs(this.speed) + 0.01 * this.speed) * dt + Math.sign(this.speed) * Math.min(Math.abs(this.speed), (input && input.axes().y ? 0.2 : 1.6) * dt);
    // pendiente
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    const slope = terrain.height(this.pos.x + fx, this.pos.z + fz) - terrain.height(this.pos.x - fx, this.pos.z - fz);
    this.speed -= slope / 2 * 9.8 * dt * 0.6 * this.spec.slope;
    if (Math.abs(this.speed) < 0.02 && !(input && input.axes().y)) this.speed = 0;

    // avance en pasos cortos (menos de medio radio): a 100 km/h y pocos fotogramas por segundo un solo paso
    // saltaba por encima de una tapia o de la pared de una casa
    const v0 = Math.abs(this.speed), dh = -this.speed * Math.tan(this.steer) / (this.spec.wb * this.s) * dt;
    const n = Math.min(12, Math.max(1, Math.ceil(v0 * dt / (this.R * 0.45))));
    let wallN = null, hitAt = null, carHit = null;
    for (let k = 0; k < n; k++) {
      this.heading += dh / n;
      this.pos.x += Math.sin(this.heading) * this.speed * dt / n; this.pos.z += Math.cos(this.heading) * this.speed * dt / n;
      if (this.speed === 0 && this.settled) break;
      const hit = this.#walls(colliders);
      if (hit) { wallN = wallN || hit.n; hitAt = hitAt || hit.at; }
    }

    if (this.speed !== 0 || !this.settled) {
      // colisiones con otros coches; las paredes ya se han resuelto en cada paso
      const f2x = Math.sin(this.heading), f2z = Math.cos(this.heading);
      if (hitAt && v0 > 3 && this.driver) this.damage((v0 - 3) * 1.6, hitAt[0], hitAt[1]);
      for (const c of cars) if (c !== this) {
        // par de círculos con más solape entre los dos coches
        let best = null;
        for (const [cx, cz] of this.circles()) for (const [ox, oz] of c.circles()) {
          const dx = cx - ox, dz = cz - oz, d = Math.hypot(dx, dz), D = this.R + c.R;
          if (d < D && d > 1e-6 && (!best || D - d > best.pen)) best = { dx, dz, d, pen: D - d, cx, cz, ox, oz };
        }
        if (!best) continue;
        const nx = best.dx / best.d, nz = best.dz / best.d; // de c hacia este coche
        this.pos.x += nx * best.pen / 2; this.pos.z += nz * best.pen / 2; c.pos.x -= nx * best.pen / 2; c.pos.z -= nz * best.pen / 2;
        // choque con transferencia de impulso (masas iguales): un golpe por detrás empuja hacia delante,
        // uno lateral desvía la trayectoria
        const gx = Math.sin(c.heading), gz = Math.cos(c.heading);
        let ax = f2x * this.speed, az = f2z * this.speed, bx = gx * c.speed, bz = gz * c.speed;
        const vrel = (ax - bx) * nx + (az - bz) * nz;
        if (vrel < 0) {
          const j = -(1 + 0.25) * vrel / 2;
          ax += nx * j; az += nz * j; bx -= nx * j; bz -= nz * j;
          this.#takeVelocity(ax, az, 0.55); c.#takeVelocity(bx, bz, c.ai ? 0.3 : 0.55);
          const hitV = -vrel;
          if (hitV > 3 && !carHit) { const dmg = (hitV - 3) * 1.6; this.damage(dmg, ...localHit(this, best.ox, best.oz)); c.damage(dmg, ...localHit(c, best.cx, best.cz)); }
          if (c.ai?.bump && hitV > 1.5) c.ai.bump(hitV); else if (c.ai) c.ai.wait = -3;
        }
        carHit = carHit || c;
      }
      if (carHit) this.#walls(colliders); // que un empujón de otro coche no lo meta en una pared
      if (wallN && Math.abs(this.speed) > 1) {
        // contra una pared: el coche se desvía y resbala a lo largo de ella en vez de pararse en seco
        const dir = Math.sign(this.speed), fx = f2x * dir, fz = f2z * dir, dot = fx * wallN.x + fz * wallN.z;
        if (dot < 0) {
          let tx = fx - wallN.x * dot, tz = fz - wallN.z * dot, tl = Math.hypot(tx, tz);
          if (tl < 0.25) { const side = (fx * wallN.z - fz * wallN.x) >= 0 ? 1 : -1; tx = wallN.z * side; tz = -wallN.x * side; tl = 1; } // de frente: hacia un lado
          tx = tx / tl + wallN.x * 0.35; tz = tz / tl + wallN.z * 0.35; // y un poco hacia fuera
          const h = Math.atan2(tx * dir, tz * dir); let dh = h - this.heading; dh = Math.atan2(Math.sin(dh), Math.cos(dh));
          this.heading += dh * 0.6;
          this.speed *= 0.55 + 0.4 * (1 - Math.abs(dot)); // de refilón casi no frena; de frente pierde la mitad
          this.pos.x += wallN.x * 0.05; this.pos.z += wallN.z * 0.05;
          this.#walls(colliders); // el giro puede meter el morro en la pared
        }
      }
      this.#orient(dt);
      this.settled = true;
    }
    this.#spin(dt); this.#fx(dt);
  }
  // saca los círculos de choque de muros y edificios; si alguno ha quedado dentro de una casa, lo saca por la
  // pared más cercana. Devuelve la normal del primer contacto y el punto tocado (local) o null
  #walls(colliders) {
    let res = null;
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    for (const o0 of this.spec.circ) {
      const o = o0 * this.s, p = { x: this.pos.x + fx * o, z: this.pos.z + fz * o };
      const hit = colliders.expel(p, this.R) || colliders.resolve(p, this.R);
      if (hit) {
        colliders.resolve(p, this.R);
        this.pos.x = p.x - fx * o; this.pos.z = p.z - fz * o;
        res = res || { n: hit, at: localHit(this, p.x - hit.x * this.R, p.z - hit.z * this.R) }; // la normal apunta desde la pared hacia el coche
      }
    }
    return res;
  }
  // adopta una velocidad (vector en planta) tras un golpe: la parte hacia delante pasa a la marcha y el coche
  // gira parcialmente hacia la nueva dirección, porque las ruedas no dejan ir de lado
  #takeVelocity(vx, vz, turn) {
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading), along = vx * fx + vz * fz, v = Math.hypot(vx, vz);
    if (v > 0.5) {
      const dir = along >= 0 ? 1 : -1;
      let dh = Math.atan2(vx * dir, vz * dir) - this.heading; dh = Math.atan2(Math.sin(dh), Math.cos(dh));
      this.heading += THREE.MathUtils.clamp(dh, -0.6, 0.6) * turn;
    }
    const side = vx * fz - vz * fx;
    this.speed = along + Math.sign(along || 1) * Math.abs(side) * 0.25 * turn; // parte del empuje lateral se conserva
    if (this.ai && !this.ai.bump) this.speed = Math.max(0, this.speed);
  }
  #spin(dt) {
    for (const w of this.mesh.userData.wheels) {
      w.spin.rotation.x += this.speed * dt / (w.R * this.s);
      if (w.front) w.pivot.rotation.y = -this.steer;
    }
  }
  #orient(dt) {
    const t = this.world.terrain, h = this.heading;
    const fx = Math.sin(h), fz = Math.cos(h), rx = -fz, rz = fx;
    const S = this.s, H = (f, r) => t.height(this.pos.x + (fx * f + rx * r) * S, this.pos.z + (fz * f + rz * r) * S);
    const fl = H(1.35, -0.8), fr = H(1.35, 0.8), bl = H(-1.3, -0.8), br = H(-1.3, 0.8);
    const y = (fl + fr + bl + br) / 4;
    const pitch = Math.atan2((fl + fr) / 2 - (bl + br) / 2, 2.65 * S);
    const roll = -Math.atan2((fr + br) / 2 - (fl + bl) / 2, 1.6 * S);
    this.pos.y = y;
    const e = new THREE.Euler(-pitch, h, roll, 'YXZ');
    this.quat.setFromEuler(e);
    this.mesh.position.copy(this.pos);
    this.mesh.quaternion.slerp(this.quat, Math.min(1, dt * 10));
    // balanceo de la carrocería al girar
    if (this.kind === 'moto') { // la moto se inclina en las curvas
      const lean = THREE.MathUtils.clamp(this.steer * Math.abs(this.speed) * 0.07, -0.6, 0.6);
      this.lean = (this.lean || 0) + (lean - (this.lean || 0)) * Math.min(1, dt * 5);
      this.mesh.userData.body.rotation.z = this.lean; for (const w of this.mesh.userData.wheels) w.pivot.rotation.z = this.lean;
    } else this.mesh.userData.body.rotation.z = THREE.MathUtils.clamp(-this.steer * this.speed * 0.006, -0.06, 0.06);
  }
}
