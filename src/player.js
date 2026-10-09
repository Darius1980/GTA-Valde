import * as THREE from 'three';
import { makeCharacter, animateCharacter } from './models.js';

export class Player {
  constructor(world) {
    this.world = world;
    this.mesh = makeCharacter();
    this.pos = new THREE.Vector3(); this.vy = 0; this.heading = 0; this.speed = 0; this.grounded = true;
    this.inCar = null;
  }
  update(dt, input, camYaw) {
    const { terrain, colliders, cars } = this.world;
    const a = input.axes();
    const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw), rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
    let mx = fx * a.y + rx * a.x, mz = fz * a.y + rz * a.x;
    const mag = Math.min(1, Math.hypot(mx, mz));
    const target = mag > 0.05 ? (input.run ? 6.0 : 2.0) * mag : 0;
    this.speed += (target - this.speed) * Math.min(1, dt * 8);
    if (mag > 0.05) {
      const h = Math.atan2(mx, mz); let d = h - this.heading; d = Math.atan2(Math.sin(d), Math.cos(d));
      this.heading += d * Math.min(1, dt * 12);
    }
    this.pos.x += Math.sin(this.heading) * this.speed * dt; this.pos.z += Math.cos(this.heading) * this.speed * dt;
    colliders.resolve(this.pos, 0.35);
    for (const c of cars) c.pushOut(this.pos, 0.35);

    const gy = terrain.height(this.pos.x, this.pos.z);
    if (this.grounded && (input.wasPressed('Space', 'btn:jump'))) { this.vy = 4.8; this.grounded = false; }
    this.vy -= 15 * dt; this.pos.y += this.vy * dt;
    if (this.pos.y <= gy) { this.pos.y = gy; this.vy = 0; this.grounded = true; }
    else if (this.grounded && this.pos.y - gy < 0.4) this.pos.y = gy; // pegado a la pendiente al bajar
    else this.grounded = false;

    this.mesh.position.copy(this.pos); this.mesh.rotation.y = this.heading;
    animateCharacter(this.mesh, this.speed, dt, !this.grounded);
  }
  enterCar(car) { this.inCar = car; this.mesh.visible = false; }
  exitCar(car) {
    this.inCar = null; this.mesh.visible = true;
    const lx = Math.cos(car.heading), lz = -Math.sin(car.heading);
    this.pos.set(car.pos.x + lx * 1.6, 0, car.pos.z + lz * 1.6);
    this.world.colliders.resolve(this.pos, 0.35);
    this.pos.y = this.world.terrain.height(this.pos.x, this.pos.z);
    this.heading = car.heading; this.speed = 0;
  }
}
