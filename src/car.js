import * as THREE from 'three';
import { makeCar } from './models.js';

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

const WB = 2.65; // batalla
export class Car {
  constructor(world, color, kind, scale = 1) {
    this.world = world; this.mesh = makeCar(color, kind); this.s = scale; this.mesh.scale.setScalar(scale);
    this.pos = new THREE.Vector3(); this.heading = 0; this.speed = 0; this.steer = 0; this.driver = false;
    this.settled = false; this.quat = new THREE.Quaternion();
    this.health = 100; this.smoke = [];
  }
  get wrecked() { return this.health <= 0; }
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
  place(x, z, h) { this.pos.set(x, this.world.terrain.height(x, z), z); this.heading = h; this.#orient(1); }
  circles() {
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    return [-1.4, 0, 1.4].map(o => [this.pos.x + fx * o * this.s, this.pos.z + fz * o * this.s]);
  }
  pushOut(p, r) {
    for (const [cx, cz] of this.circles()) {
      const dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz), R = 0.95 * this.s + r;
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
      this.#orient(dt); this.#spin(dt); this.#fx(dt); return;
    }
    if (input) {
      // el motor pierde fuerza poco a poco con los daños; solo deja de tirar del todo al 100 %
      const a0 = input.axes(), power = this.wrecked ? 0 : 0.45 + 0.55 * this.health / 100, a = { x: a0.x, y: a0.y > 0 ? a0.y * power : a0.y * (this.wrecked ? 0 : 1) };
      const maxSteer = 0.6 / (1 + Math.abs(this.speed) / 12);
      this.steer += (a.x * maxSteer - this.steer) * Math.min(1, dt * 6);
      const throttle = a.y;
      if (input.brake) this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 14 * dt);
      else if (throttle > 0) this.speed += (this.speed < 0 ? 8 : 4.2 * (1 - this.speed / 34)) * throttle * dt; // 0-50 km/h en unos 4 s
      else if (throttle < 0) this.speed += (this.speed > 0 ? 9 : 2.5 * (1 + this.speed / 8)) * throttle * dt;
    } else this.steer *= 0.9;
    // rozamiento y resistencia
    this.speed -= this.speed * 0.25 * dt + Math.sign(this.speed) * Math.min(Math.abs(this.speed), (input && input.axes().y ? 0.3 : 1.6) * dt);
    // pendiente
    const fx = Math.sin(this.heading), fz = Math.cos(this.heading);
    const slope = terrain.height(this.pos.x + fx, this.pos.z + fz) - terrain.height(this.pos.x - fx, this.pos.z - fz);
    this.speed -= slope / 2 * 9.8 * dt * 0.6;
    if (Math.abs(this.speed) < 0.02 && !(input && input.axes().y)) this.speed = 0;

    this.heading -= this.speed * Math.tan(this.steer) / (WB * this.s) * dt;
    this.pos.x += Math.sin(this.heading) * this.speed * dt; this.pos.z += Math.cos(this.heading) * this.speed * dt;

    if (this.speed !== 0 || !this.settled) {
      // colisiones con edificios, muros y otros coches
      let bumped = false, hitAt = null;
      const f2x = Math.sin(this.heading), f2z = Math.cos(this.heading), v0 = Math.abs(this.speed);
      for (const o0 of [-1.4, 0, 1.4]) {
        const o = o0 * this.s, p = { x: this.pos.x + f2x * o, z: this.pos.z + f2z * o };
        const hit = colliders.resolve(p, 0.95 * this.s);
        if (hit) {
          this.pos.x = p.x - f2x * o; this.pos.z = p.z - f2z * o; bumped = true;
          // punto de impacto en coordenadas locales del coche (la normal apunta desde la pared hacia el coche)
          hitAt = hitAt || localHit(this, p.x - hit.x * 0.95 * this.s, p.z - hit.z * 0.95 * this.s);
        }
      }
      if (hitAt && v0 > 3 && this.driver) this.damage((v0 - 3) * 1.6, hitAt[0], hitAt[1]);
      for (const c of cars) if (c !== this) {
        for (const [cx, cz] of this.circles()) for (const [ox, oz] of c.circles()) {
          const dx = cx - ox, dz = cz - oz, d = Math.hypot(dx, dz);
          const D = 0.95 * (this.s + c.s); if (d < D && d > 1e-6) {
            const rel = Math.abs(this.speed - c.speed * (f2x * Math.sin(c.heading) + f2z * Math.cos(c.heading)));
            if (rel > 3 && !bumped) { const dmg = (rel - 3) * 1.6; this.damage(dmg, ...localHit(this, ox, oz)); c.damage(dmg, ...localHit(c, cx, cz)); if (c.ai) c.ai.wait = -3; }
            const push = (D - d) / 2; this.pos.x += dx / d * push; this.pos.z += dz / d * push; c.pos.x -= dx / d * push; c.pos.z -= dz / d * push; c.speed += this.speed * 0.1; bumped = true; }
        }
      }
      if (bumped && Math.abs(this.speed) > 1) this.speed *= -0.25;
      this.#orient(dt);
      this.settled = true;
    }
    this.#spin(dt); this.#fx(dt);
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
    this.mesh.userData.body.rotation.z = THREE.MathUtils.clamp(-this.steer * this.speed * 0.006, -0.06, 0.06);
  }
}
