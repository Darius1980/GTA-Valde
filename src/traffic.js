// Tráfico y vecinos: coches que circulan por las calles y gente que pasea por los bordes.
import * as THREE from 'three';
import { makeCharacter, animateCharacter } from './models.js';

// Red de calles: polilíneas de OSM unidas en los vértices que comparten.
export class RoadNet {
  constructor(roads, kinds) {
    this.roads = roads.filter(r => kinds.has(r.k) && r.p.length > 1);
    this.at = new Map();
    this.roads.forEach((r, ri) => r.p.forEach((p, i) => {
      const k = this.key(p); if (!this.at.has(k)) this.at.set(k, []); this.at.get(k).push([ri, i]);
    }));
  }
  key(p) { return `${Math.round(p[0] * 2)},${Math.round(p[1] * 2)}`; }
  // al llegar al vértice i de la calle ri (yendo en sentido dir), elige por dónde seguir
  next(ri, i, dir, rnd = Math.random) {
    const opts = [];
    for (const [rj, j] of this.at.get(this.key(this.roads[ri].p[i])) || []) {
      const n = this.roads[rj].p.length;
      for (const d of [1, -1]) {
        if (j + d < 0 || j + d >= n) continue;
        if (rj === ri && d === -dir) continue; // no dar la vuelta
        opts.push([rj, j, d]);
      }
    }
    if (!opts.length) return [ri, i, -dir]; // calle sin salida: media vuelta
    // preferir seguir recto por la misma calle
    const same = opts.find(o => o[0] === ri);
    if (same && rnd() < 0.55) return same;
    return opts[Math.floor(rnd() * opts.length)];
  }
  randomSpot(filter = () => true) {
    const list = this.roads.map((r, i) => [r, i]).filter(([r]) => filter(r));
    for (let k = 0; k < 50; k++) { // dentro del mapa
      const [r, ri] = list[Math.floor(Math.random() * list.length)];
      const i = Math.floor(Math.random() * (r.p.length - 1)), p = r.p[i];
      if (Math.abs(p[0]) < 900 && Math.abs(p[1]) < 900) return { ri, i, dir: Math.random() < 0.5 && i > 0 ? -1 : 1 };
    }
    return { ri: 0, i: 0, dir: 1 };
  }
}

// Sigue una "zanahoria" que avanza por la calle con un desplazamiento lateral (carril o acera).
class Follower {
  constructor(net, spot, lane, look) {
    this.net = net; this.lane = lane; this.look = look;
    this.ri = spot.ri; this.i = spot.i; this.dir = spot.dir; this.target = this.i + this.dir;
    const p = net.roads[this.ri].p[this.i];
    this.carrot = new THREE.Vector2(p[0], p[1]);
  }
  laneTarget(out) {
    const P = this.net.roads[this.ri].p, a = P[this.target - this.dir] || P[this.target], b = P[this.target];
    const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
    // a la derecha del sentido de la marcha
    return out.set(b[0] - dz / l * this.lane, b[1] + dx / l * this.lane);
  }
  // avanza la zanahoria hasta mantenerla a "look" metros por delante de pos
  advance(pos) {
    const t = new THREE.Vector2();
    for (let k = 0; k < 8 && this.carrot.distanceTo(pos) < this.look; k++) {
      this.laneTarget(t);
      const d = this.carrot.distanceTo(t), step = this.look - this.carrot.distanceTo(pos) + 0.5;
      if (d > step) { this.carrot.lerp(t, step / d); break; }
      this.carrot.copy(t);
      const n = this.net.roads[this.ri].p.length, ni = this.target + this.dir;
      if (ni >= 0 && ni < n && Math.random() < 0.6) this.target = ni;
      else {
        const [rj, j, d2] = this.net.next(this.ri, this.target, this.dir);
        if (rj === this.ri && d2 === -this.dir) this.deadEnd = true;
        this.ri = rj; this.dir = d2; this.target = j + d2;
      }
    }
  }
}

const tmp2 = new THREE.Vector2();

// Conductor automático para un Car: sigue la calle, frena ante obstáculos y respeta su velocidad.
export class Driver {
  constructor(net, car, spot, cruise) {
    const r = net.roads[spot.ri];
    this.car = car; this.cruise = cruise; this.wait = 0;
    this.f = new Follower(net, spot, r.w >= 6 ? r.w / 4 : Math.min(1, r.w / 4), 6 * car.s + 3);
    const a = r.p[spot.i], b = r.p[spot.i + spot.dir];
    car.place(a[0], a[1], Math.atan2(b[0] - a[0], b[1] - a[1]));
  }
  update(dt, obstacles) {
    const c = this.car, pos = tmp2.set(c.pos.x, c.pos.z);
    if (Math.abs(c.pos.x) > 960 || Math.abs(c.pos.z) > 960) this.f.deadEnd = true; // se sale del mapa
    this.f.advance(pos);
    const dx = this.f.carrot.x - c.pos.x, dz = this.f.carrot.y - c.pos.z;
    let err = Math.atan2(dx, dz) - c.heading; err = Math.atan2(Math.sin(err), Math.cos(err));
    // velocidad objetivo: más despacio en curvas y parado si hay algo delante
    let target = this.cruise * (1 - Math.min(0.75, Math.abs(err) * 1.2));
    const fx = Math.sin(c.heading), fz = Math.cos(c.heading), reach = 4 + Math.abs(c.speed) * 1.2;
    let blocked = false;
    for (const o of obstacles) {
      if (o === c) continue;
      const ox = o.pos.x - c.pos.x, oz = o.pos.z - c.pos.z, ahead = ox * fx + oz * fz, side = Math.abs(ox * fz - oz * fx);
      if (ahead > 0 && ahead < reach + 2.5 * c.s && side < 1.6) { blocked = true; break; }
    }
    if (blocked) { this.wait += dt; if (this.wait < 5) target = 0; } else this.wait = 0;
    const acc = target > c.speed ? 3 : 7;
    c.speed += THREE.MathUtils.clamp(target - c.speed, -acc * dt, acc * dt);
    c.steer = THREE.MathUtils.clamp(-err * 1.5, -0.6, 0.6);
    c.heading += THREE.MathUtils.clamp(err, -1, 1) * Math.min(1, dt * (1 + Math.abs(c.speed) * 0.6));
    c.pos.x += Math.sin(c.heading) * c.speed * dt; c.pos.z += Math.cos(c.heading) * c.speed * dt;
  }
}

// Vecino que pasea por el borde de la calle
const SHIRTS = [0x7a2e2e, 0x2e4a7a, 0x3d6b3a, 0x8a7a5a, 0x555555, 0xa86b2d, 0x6a4c7a, 0xdddddd, 0x1f2f3f];
const PANTS = [0x2b3140, 0x3a3226, 0x1c1c1c, 0x4a4f5a, 0x5b4a3a];
const HAIR = [0x2a1e16, 0x8a8a8a, 0xcfcfcf, 0x4a3020, 0x1a1a1a];
const SKIN = [0xc89a7a, 0xd8ae8e, 0xb98564, 0xe2bc9e];
export class Walker {
  constructor(net, world, spot, i) {
    const pick = (a) => a[(i * 7 + Math.floor(Math.random() * 100)) % a.length];
    this.mesh = makeCharacter({ shirt: pick(SHIRTS), pants: pick(PANTS), hair: pick(HAIR), skin: pick(SKIN) });
    this.scale = world.personScale * (0.94 + Math.random() * 0.1); this.mesh.scale.setScalar(this.scale);
    const r = net.roads[spot.ri], side = Math.random() < 0.5 ? 1 : -1;
    this.f = new Follower(net, spot, side * (r.w / 2 + 0.5), 1.6);
    this.world = world; this.pos = new THREE.Vector3(r.p[spot.i][0], 0, r.p[spot.i][1]);
    this.heading = 0; this.speed = 0; this.cruise = 0.9 + Math.random() * 0.6; this.fly = null; this.getUp = 0; this.pause = 0;
  }
  update(dt, cars, player, focus) {
    const far = (this.pos.x - focus.x) ** 2 + (this.pos.z - focus.z) ** 2 > 200 * 200;
    this.mesh.visible = !far;
    const T = this.world.terrain;
    if (this.fly) { // atropello: sale despedido, rueda por el suelo y se queda tendido
      const f = this.fly; f.vy -= 15 * dt;
      this.pos.x += f.vx * dt; this.pos.z += f.vz * dt; this.pos.y += f.vy * dt;
      const gy = T.height(this.pos.x, this.pos.z);
      if (!far) this.world.colliders.resolve(this.pos, 0.3);
      f.rot += f.spin * dt;
      if (this.pos.y <= gy) {
        this.pos.y = gy;
        if (Math.abs(f.vy) > 2) { f.vy = -f.vy * 0.25; f.vx *= 0.5; f.vz *= 0.5; f.spin *= 0.5; } // rebota
        else { f.vy = 0; f.vx *= Math.max(0, 1 - dt * 6); f.vz *= Math.max(0, 1 - dt * 6); const tr = -Math.PI / 2 + Math.round((f.rot + Math.PI / 2) / (Math.PI * 2)) * Math.PI * 2; f.rot += (tr - f.rot) * Math.min(1, dt * 8); f.spin = 0; f.ground += dt; }
      }
      this.mesh.position.copy(this.pos); this.mesh.rotation.set(f.rot, this.heading, 0, 'YXZ');
      if (f.ground > 6) { this.fly = null; this.getUp = 1.2; }
      return;
    }
    if (this.getUp > 0) { // se levanta despacio
      this.getUp -= dt; this.mesh.rotation.set(-Math.PI / 2 * Math.max(0, this.getUp) / 1.2, this.heading, 0, 'YXZ');
      this.pos.y = T.height(this.pos.x, this.pos.z); this.mesh.position.copy(this.pos);
      animateCharacter(this.mesh, 0, dt); return;
    }
    this.mesh.rotation.set(0, this.heading, 0);
    const pos = tmp2.set(this.pos.x, this.pos.z);
    this.f.advance(pos);
    const dx = this.f.carrot.x - this.pos.x, dz = this.f.carrot.y - this.pos.z;
    let err = Math.atan2(dx, dz) - this.heading; err = Math.atan2(Math.sin(err), Math.cos(err));
    // de vez en cuando se para a mirar
    if (this.pause > 0) this.pause -= dt; else if (Math.random() < dt * 0.02) this.pause = 2 + Math.random() * 4;
    let target = this.pause > 0 ? 0 : this.cruise, dodge = null;
    for (const c of cars) {
      const ox = this.pos.x - c.pos.x, oz = this.pos.z - c.pos.z, d = Math.hypot(ox, oz), v = Math.abs(c.speed);
      // atropello: solo si de verdad le toca la carrocería
      if (v > 2.5) for (const [cx, cz] of c.circles()) {
        if (Math.hypot(this.pos.x - cx, this.pos.z - cz) < 0.95 * c.s + 0.25) {
          const sgn = Math.sign(c.speed), fx = Math.sin(c.heading) * sgn, fz = Math.cos(c.heading) * sgn;
          this.fly = { vx: fx * v * 0.75 + ox / (d || 1) * 1.5, vz: fz * v * 0.75 + oz / (d || 1) * 1.5, vy: 1.5 + v * 0.18, rot: 0, spin: -(3 + v * 0.3), ground: 0 };
          this.pause = 0; this.world.onHit?.(this); return;
        }
      }
      // un coche se acerca hacia él: se aparta hacia un lado de su trayectoria
      if (d < 4 + v * 1.1 && v > 1) {
        const sgn = Math.sign(c.speed), fx = Math.sin(c.heading) * sgn, fz = Math.cos(c.heading) * sgn;
        const ahead = ox * fx + oz * fz, lat = ox * fz - oz * fx;
        if (ahead > -1 && Math.abs(lat) < 2.6) { const side = lat >= 0 ? 1 : -1; dodge = [fz * side, -fx * side]; }
      }
    }
    if (dodge) { // corre hacia el lado contrario
      const h = Math.atan2(dodge[0], dodge[1]); let e2 = h - this.heading; e2 = Math.atan2(Math.sin(e2), Math.cos(e2));
      this.heading += e2 * Math.min(1, dt * 10); target = 3.2; this.pause = 0;
    } else this.heading += err * Math.min(1, dt * 4);
    this.speed += (target - this.speed) * Math.min(1, dt * 3);
    this.pos.x += Math.sin(this.heading) * this.speed * dt; this.pos.z += Math.cos(this.heading) * this.speed * dt;
    // apartarse del jugador y de las paredes
    const px = this.pos.x - player.pos.x, pz = this.pos.z - player.pos.z, pd = Math.hypot(px, pz);
    if (player.mesh.visible && pd < 0.7 && pd > 1e-3) { this.pos.x += px / pd * (0.7 - pd); this.pos.z += pz / pd * (0.7 - pd); }
    if (!far) this.world.colliders.resolve(this.pos, 0.3);
    for (const c of cars) c.pushOut(this.pos, 0.3);
    this.pos.y = this.world.terrain.height(this.pos.x, this.pos.z);
    this.mesh.position.copy(this.pos); this.mesh.rotation.y = this.heading;
    if (!far) animateCharacter(this.mesh, this.speed / this.scale, dt);
  }
}
