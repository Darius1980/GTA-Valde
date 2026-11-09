// Carrera contra otros coches: recorrido fijo por el pueblo y la N-631, con puntos de control.
import * as THREE from 'three';
import { beam } from './missions.js';

// Recorrido: paseo por la red de calles sin repetir cruces, con semilla fija (siempre el mismo trazado)
function buildRoute(net, start, length) {
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let best = null, bestD = Infinity;
  net.roads.forEach((r, ri) => r.p.forEach((p, i) => { const d = Math.hypot(p[0] - start[0], p[1] - start[1]); if (d < bestD) { bestD = d; best = [ri, i]; } }));
  for (let attempt = 0; attempt < 40; attempt++) {
    let [ri, i] = best, dir = attempt % 2 ? -1 : 1;
    if (i + dir < 0 || i + dir >= net.roads[ri].p.length) dir = -dir;
    const pts = [net.roads[ri].p[i]], seen = new Set([net.key(net.roads[ri].p[i])]); let L = 0;
    for (let k = 0; k < 400 && L < length; k++) {
      const P = net.roads[ri].p; let ni = i + dir;
      if (ni < 0 || ni >= P.length || (net.at.get(net.key(P[i])) || []).length > 1) {
        const opts = [];
        for (const [rj, j] of net.at.get(net.key(P[i])) || []) for (const d of [1, -1]) {
          const q = net.roads[rj].p[j + d]; if (q && !seen.has(net.key(q))) opts.push([rj, j, d]);
        }
        if (!opts.length) break;
        [ri, i, dir] = opts[Math.floor(rnd() * opts.length)]; ni = i + dir;
      }
      const q = net.roads[ri].p[ni], last = pts[pts.length - 1];
      if (Math.abs(q[0]) > 900 || Math.abs(q[1]) > 900) break;
      L += Math.hypot(q[0] - last[0], q[1] - last[1]); pts.push(q); seen.add(net.key(q)); i = ni;
    }
    if (L >= length * 0.8) return pts;
  }
  return null;
}

// polilínea con longitudes acumuladas y muestreo por distancia
class Path {
  constructor(pts) {
    this.p = pts; this.cum = [0];
    for (let i = 1; i < pts.length; i++) this.cum.push(this.cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    this.length = this.cum[this.cum.length - 1];
  }
  at(s, lane = 0) {
    s = Math.max(0, Math.min(this.length - 0.01, s));
    let i = 1; while (this.cum[i] < s) i++;
    const a = this.p[i - 1], b = this.p[i], L = this.cum[i] - this.cum[i - 1] || 1, t = (s - this.cum[i - 1]) / L;
    const dx = (b[0] - a[0]) / L, dz = (b[1] - a[1]) / L;
    return { x: a[0] + (b[0] - a[0]) * t - dz * lane, z: a[1] + (b[1] - a[1]) * t + dx * lane, dx, dz };
  }
  // curvatura aproximada por delante (para frenar antes de las curvas)
  turn(s, ahead) {
    const a = this.at(s), b = this.at(s + ahead);
    return Math.abs(Math.atan2(a.dx * b.dz - a.dz * b.dx, a.dx * b.dx + a.dz * b.dz));
  }
}

// Rival: avanza por el recorrido a su ritmo (cinemático)
class RaceDriver {
  constructor(car, path, lane, pace, s0) {
    Object.assign(this, { car, path, lane, pace, s: s0, go: false, done: false, stun: 0, slip: 0, slipDir: 1 });
    this.baseLane = lane; this.nextMistake = 6 + Math.random() * 10; this.nextLane = 3 + Math.random() * 4;
    car.speed = 0; this.place();
  }
  place() {
    const p = this.path.at(this.s, this.lane), q = this.path.at(this.s + 3, this.lane);
    this.car.pos.x = p.x; this.car.pos.z = p.z; this.car.heading = Math.atan2(q.x - p.x, q.z - p.z);
  }
  // le han dado un golpe: pierde velocidad y tarda en recuperarse
  bump(rel) { this.car.speed *= 0.35; this.stun = Math.max(this.stun, 0.8 + Math.min(1.5, rel * 0.1)); this.slip = Math.max(this.slip, 0.6); this.slipDir = Math.random() < 0.5 ? -1 : 1; }
  update(dt) {
    const c = this.car;
    if (this.go && !this.done) {
      // errores: a veces se va largo en una curva o se distrae
      this.nextMistake -= dt;
      if (this.nextMistake <= 0) { this.nextMistake = 8 + Math.random() * 14; this.slip = 1.2 + Math.random(); this.slipDir = Math.random() < 0.5 ? -1 : 1; }
      this.nextLane -= dt;
      if (this.nextLane <= 0) { this.nextLane = 3 + Math.random() * 5; this.baseLane = (Math.random() * 2 - 1) * 1.1; }
    }
    this.stun = Math.max(0, this.stun - dt); this.slip = Math.max(0, this.slip - dt);
    const health = 0.55 + 0.45 * c.health / 100;
    let target = !this.go || this.done || c.wrecked ? 0 : this.pace * health * (1 - Math.min(0.6, this.path.turn(this.s, 10 + c.speed) * 0.55));
    if (this.stun > 0) target *= 0.3;
    if (this.slip > 0) target *= 0.55;
    c.speed += THREE.MathUtils.clamp(target - c.speed, -8 * dt, 3.6 * dt);
    this.s += c.speed * dt;
    // carril: cambia de vez en cuando y, al equivocarse, se abre hacia fuera
    const laneT = this.baseLane + (this.slip > 0 ? this.slipDir * 1.4 : 0);
    this.lane += (laneT - this.lane) * Math.min(1, dt * 1.5);
    const p = this.path.at(this.s, this.lane), q = this.path.at(this.s + 2 + c.speed * 0.3, this.lane);
    c.pos.x += (p.x - c.pos.x) * Math.min(1, dt * 4); c.pos.z += (p.z - c.pos.z) * Math.min(1, dt * 4);
    let e = Math.atan2(q.x - c.pos.x, q.z - c.pos.z) - c.heading; e = Math.atan2(Math.sin(e), Math.cos(e));
    c.heading += e * Math.min(1, dt * 6); c.steer = THREE.MathUtils.clamp(-e * 2, -0.6, 0.6);
    if (this.s >= this.path.length - 1) this.done = true;
  }
}

export class Race {
  constructor({ scene, world, net, start, makeCar, ui, sound, toast }) {
    Object.assign(this, { scene, world, net, start, makeCar, ui, sound, toast });
    this.marker = beam(0xe2403a); this.cp = beam(0x3aa0e2); scene.add(this.marker, this.cp);
    this.state = 'idle'; this.cool = 0; this.rivals = [];
    this.path = (() => { const pts = buildRoute(net, start, 1100); return pts && new Path(pts); })();
    const m = this.path ? this.path.at(24) : { x: start[0], z: start[1] };
    this.marker.position.set(m.x, world.terrain.height(m.x, m.z), m.z); this.marker.visible = !!this.path;
    this.SP = 45; // distancia entre puntos de control
  }
  get active() { return this.state !== 'idle'; }
  get target() { return this.state === 'running' ? [this.cp.position.x, this.cp.position.z] : null; }
  begin(car) {
    this.state = 'countdown'; this.t = 3.5; this.car = car; this.marker.visible = false;
    // parrilla: el jugador delante a la derecha, tres rivales
    const lanes = [-0.9, 0.9];
    const place = (c, s, lane) => { const p = this.path.at(s, lane), q = this.path.at(s + 3, lane); c.pos.x = p.x; c.pos.z = p.z; c.heading = Math.atan2(q.x - p.x, q.z - p.z); c.speed = 0; };
    place(car, 14, lanes[1]);
    const cols = [0xf2c200, 0x1b7f3a, 0xe8e8e8];
    this.rivals = [[14, lanes[0], 12.5], [6, lanes[1], 13.5], [6, lanes[0], 11.5]].map(([s, lane, pace], k) => {
      const c = this.makeCar(cols[k]); c.ai = new RaceDriver(c, this.path, lane, pace, s); c.racer = true; return c;
    });
    this.onStart?.(car);
    this.next = 1; this.ncp = Math.floor(this.path.length / this.SP); this.placeCp();
    this.toast('🏁 Carrera', 'Sigue los círculos azules y llega el primero');
  }
  placeCp() {
    const s = Math.min(this.path.length - 1, this.next * this.SP), p = this.path.at(s);
    this.cp.position.set(p.x, this.world.terrain.height(p.x, p.z), p.z); this.cp.visible = this.state === 'running' || this.state === 'countdown';
  }
  playerS() { return Math.min(this.next, this.ncp) * this.SP - Math.hypot(this.car.pos.x - this.cp.position.x, this.car.pos.z - this.cp.position.z); }
  update(dt, driving, pos) {
    if (this.cool > 0) { this.cool -= dt; if (this.cool <= 0 && this.path) this.marker.visible = true; }
    if (this.state === 'idle') {
      this.marker.visible = !!this.path && this.cool <= 0 && !this.busy?.();
      const near = this.marker.visible && Math.hypot(pos.x - this.marker.position.x, pos.z - this.marker.position.z) < 4;
      if (near && driving && !driving.wrecked) this.begin(driving);
      this.nearOnFoot = near && !driving;
      return;
    }
    if (this.state === 'countdown') {
      this.t -= dt; this.car.speed = 0;
      const n = Math.ceil(this.t - 0.5); this.write(n > 0 ? `🏁 <b>${n}</b>` : '🏁 <b>¡YA!</b>');
      if (this.t <= 0.5) { this.state = 'running'; this.rivals.forEach(r => (r.ai.go = true)); this.sound?.('ok'); this.time = 0; }
      return;
    }
    this.time += dt;
    // los rivales también se tocan entre ellos
    for (let i = 0; i < this.rivals.length; i++) for (let j = i + 1; j < this.rivals.length; j++) {
      const A = this.rivals[i], B = this.rivals[j], d = Math.hypot(A.pos.x - B.pos.x, A.pos.z - B.pos.z);
      if (d < 2.1 * A.s && !A.ai.done && !B.ai.done) {
        const rel = Math.abs(A.speed - B.speed) + 2;
        const back = A.ai.s < B.ai.s ? A : B, front = back === A ? B : A; back.ai.bump(rel); back.ai.baseLane = front.ai.lane > 0 ? -1 : 1; back.ai.nextLane = 4; (back === A ? B : A).ai.slip = Math.max((back === A ? B : A).ai.slip, 0.4);
        A.damage(rel, 0, A.ai.s < B.ai.s ? 1.8 : -1.8); B.damage(rel, 0, A.ai.s < B.ai.s ? -1.8 : 1.8);
      }
    }
    if (driving !== this.car) return this.end('Has abandonado la carrera', 'Bájate del coche y pierdes', false);
    if (Math.hypot(pos.x - this.cp.position.x, pos.z - this.cp.position.z) < 9) {
      this.next++; this.sound?.('ok');
      if (this.next > this.ncp) {
        const place = 1 + this.rivals.filter(r => r.ai.done).length, prize = [0, 150, 75, 30, 0][place];
        return this.end(place === 1 ? '¡Has ganado la carrera!' : `Has llegado ${place}º`, `${this.time.toFixed(1)} s${prize ? ` · +${prize} €` : ''}`, true, prize);
      }
      this.placeCp();
    }
    if (this.rivals.every(r => r.ai.done) && this.time > 0) { this.waitLast = (this.waitLast || 0) + dt; if (this.waitLast > 25) return this.end('Has llegado el último', 'Los rivales ya han cruzado la meta', false); }
    const ps = this.playerS(), pos1 = 1 + this.rivals.filter(r => r.ai.s > ps).length;
    this.write(`🏁 Punto <b>${Math.min(this.next, this.ncp)}/${this.ncp}</b> · ${pos1}º de 4 · ${this.time.toFixed(0)} s`);
  }
  write(t) { if (this.ui.mission.innerHTML !== t) this.ui.mission.innerHTML = t; }
  end(title, sub, ok, prize = 0) {
    this.toast(title, sub); this.sound?.(ok && prize ? 'ok' : 'fail'); if (prize) this.onPrize?.(prize);
    this.state = 'idle'; this.cp.visible = false; this.cool = 6; this.waitLast = 0; this.write('');
    // los rivales se van al acabar
    const rivals = this.rivals; this.rivals = [];
    setTimeout(() => rivals.forEach(c => this.onRemove?.(c)), 4000);
  }
}
