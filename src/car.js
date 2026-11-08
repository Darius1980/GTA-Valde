import * as THREE from 'three';
import { makeCar } from './models.js';

const WB = 2.65; // batalla
export class Car {
  constructor(world, color, kind, scale = 1) {
    this.world = world; this.mesh = makeCar(color, kind); this.s = scale; this.mesh.scale.setScalar(scale);
    this.pos = new THREE.Vector3(); this.heading = 0; this.speed = 0; this.steer = 0; this.driver = false;
    this.settled = false; this.quat = new THREE.Quaternion();
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
  update(dt, input) {
    const { colliders, terrain, cars } = this.world;
    if (input) {
      const a = input.axes();
      const maxSteer = 0.6 / (1 + Math.abs(this.speed) / 12);
      this.steer += (a.x * maxSteer - this.steer) * Math.min(1, dt * 6);
      const throttle = a.y;
      if (input.brake) this.speed -= Math.sign(this.speed) * Math.min(Math.abs(this.speed), 14 * dt);
      else if (throttle > 0) this.speed += (this.speed < 0 ? 12 : 11 * (1 - this.speed / 50)) * throttle * dt;
      else if (throttle < 0) this.speed += (this.speed > 0 ? 12 : 4 * (1 + this.speed / 12)) * throttle * dt;
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
      let bumped = false;
      const f2x = Math.sin(this.heading), f2z = Math.cos(this.heading);
      for (const o0 of [-1.4, 0, 1.4]) {
        const o = o0 * this.s, p = { x: this.pos.x + f2x * o, z: this.pos.z + f2z * o };
        const hit = colliders.resolve(p, 0.95 * this.s);
        if (hit) { this.pos.x = p.x - f2x * o; this.pos.z = p.z - f2z * o; bumped = true; }
      }
      for (const c of cars) if (c !== this) {
        for (const [cx, cz] of this.circles()) for (const [ox, oz] of c.circles()) {
          const dx = cx - ox, dz = cz - oz, d = Math.hypot(dx, dz);
          const D = 0.95 * (this.s + c.s); if (d < D && d > 1e-6) { const push = (D - d) / 2; this.pos.x += dx / d * push; this.pos.z += dz / d * push; c.pos.x -= dx / d * push; c.pos.z -= dz / d * push; c.speed += this.speed * 0.1; bumped = true; }
        }
      }
      if (bumped && Math.abs(this.speed) > 1) this.speed *= -0.25;
      this.#orient(dt);
      this.settled = true;
    }
    // ruedas
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
