// Guardia Civil: si atropellas a alguien o corres demasiado por el pueblo, te busca un coche patrulla
// con sirena. Te detiene si te para; si le das esquinazo un rato, se olvida de ti.
import * as THREE from 'three';
import { Car } from './car.js';

// grafo de la red de calles para buscar el camino más corto hasta el jugador
class Graph {
  constructor(net) {
    this.net = net; this.nodes = new Map(); // clave -> { p, nb: [clave, dist] }
    for (const r of net.roads) for (let i = 0; i < r.p.length; i++) {
      const k = net.key(r.p[i]); if (!this.nodes.has(k)) this.nodes.set(k, { p: r.p[i], nb: [] });
      if (i > 0) {
        const a = net.key(r.p[i - 1]), d = Math.hypot(r.p[i][0] - r.p[i - 1][0], r.p[i][1] - r.p[i - 1][1]);
        this.nodes.get(k).nb.push([a, d]); this.nodes.get(a).nb.push([k, d]);
      }
    }
    this.list = [...this.nodes.entries()];
  }
  nearest(x, z) {
    let best = null, bd = Infinity;
    for (const [k, n] of this.list) { const d = (n.p[0] - x) ** 2 + (n.p[1] - z) ** 2; if (d < bd) { bd = d; best = k; } }
    return best;
  }
  path(from, to) {
    const dist = new Map([[from, 0]]), prev = new Map(), heap = [[0, from]], goal = this.nodes.get(to).p;
    const push = (e) => { heap.push(e); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
    const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
    let n = 0;
    while (heap.length && n++ < 20000) {
      const [, k] = pop(); if (k === to) break;
      const dk = dist.get(k);
      for (const [j, d] of this.nodes.get(k).nb) {
        const nd = dk + d; if (nd < (dist.get(j) ?? Infinity)) {
          dist.set(j, nd); prev.set(j, k);
          const p = this.nodes.get(j).p; push([nd + Math.hypot(p[0] - goal[0], p[1] - goal[1]), j]);
        }
      }
    }
    if (!prev.has(to) && from !== to) return null;
    const out = []; let k = to; while (k !== undefined) { out.unshift(this.nodes.get(k).p); k = prev.get(k); }
    return out;
  }
}

// conductor de la patrulla: sigue el camino por las calles y, cuando ya te ve cerca, va directo
class Pursuer {
  constructor(unit, graph) { this.unit = unit; this.graph = graph; this.path = null; this.wp = 0; this.repath = 0; this.stuck = 0; this.reverse = 0; this._a = { x: 0, y: 0 }; this.brake = false; }
  axes() { return this._a; }
  update(dt, target, leaving) {
    const c = this.unit, a = this._a;
    let tx = target.x, tz = target.z;
    const dT = Math.hypot(tx - c.pos.x, tz - c.pos.z);
    this.repath -= dt;
    if (leaving) { tx = c.pos.x + Math.sin(c.heading) * 50; tz = c.pos.z + Math.cos(c.heading) * 50; }
    else if (dT > 35) {
      if (this.repath <= 0 || !this.path) {
        this.repath = 1.5;
        const from = this.graph.nearest(c.pos.x, c.pos.z), to = this.graph.nearest(target.x, target.z);
        this.path = from && to ? this.graph.path(from, to) : null; this.wp = 0;
      }
      if (this.path) {
        while (this.wp < this.path.length - 1 && Math.hypot(this.path[this.wp][0] - c.pos.x, this.path[this.wp][1] - c.pos.z) < 7) this.wp++;
        [tx, tz] = this.path[Math.min(this.wp, this.path.length - 1)];
      }
    }
    let e = Math.atan2(tx - c.pos.x, tz - c.pos.z) - c.heading; e = Math.atan2(Math.sin(e), Math.cos(e));
    // atascado contra algo: marcha atrás un momento girando al revés
    if (this.reverse > 0) { this.reverse -= dt; a.x = Math.sign(e) || 1; a.y = -1; this.brake = false; c.gear = 1; return; }
    if (Math.abs(c.speed) < 0.8 && !leaving && dT > 7) { this.stuck += dt; if (this.stuck > 1.6) { this.stuck = 0; this.reverse = 1.3; } } else this.stuck = 0;
    a.x = THREE.MathUtils.clamp(-e * 2.2, -1, 1);
    const close = dT < 5 && !leaving, slow = dT < 20 && !leaving, sharp = Math.abs(e) > 1.2 && c.speed > 7;
    a.y = close ? (c.speed > 1 ? -1 : 0) : slow ? (c.speed > 4 + dT * 0.3 ? -0.6 : 0.6) : sharp ? 0.2 : 1;
    this.brake = close && c.speed > 3;
    c.gear = c.speed > 12.5 ? 2 : c.speed < 10 ? 1 : c.gear;
  }
}

export class Police {
  constructor({ scene, world, net, cars, scale, isMobile, ui, toast, sound, wallet }) {
    Object.assign(this, { scene, world, cars, scale, ui, toast, sound, wallet });
    this.graph = new Graph(net); this.net = net;
    this.wanted = 0; this.units = []; this.maxUnits = isMobile ? 2 : 3;
    this.speedT = 0; this.lostT = 0; this.bustT = 0; this.cool = 0; this.flash = 0;
  }
  get active() { return this.wanted > 0; }
  // delitos: atropello, exceso de velocidad, golpear a la patrulla
  report(what) {
    if (this.cool > 0) return;
    const before = this.wanted;
    if (what === 'atropello') this.wanted = Math.min(3, this.wanted + 1);
    else if (what === 'velocidad') this.wanted = Math.max(this.wanted, 1);
    else if (what === 'golpe') this.wanted = Math.min(3, Math.max(1, this.wanted + (this.wanted >= 2 ? 0 : 1)));
    if (this.wanted !== before) {
      this.lostT = 0;
      this.toast('🚨 Guardia Civil', what === 'atropello' ? 'Has atropellado a un vecino: te buscan' : what === 'velocidad' ? 'Vas demasiado rápido por el pueblo' : 'Has embestido a la patrulla');
    }
  }
  spawnUnit(target) {
    // aparece por una calle a 110-220 m, fuera de la vista inmediata
    let best = null;
    for (let k = 0; k < 60; k++) {
      const sp = this.net.randomSpot(), p = this.net.roads[sp.ri].p[sp.i], d = Math.hypot(p[0] - target.x, p[1] - target.z);
      if (d > 110 && d < 220) { best = { sp, p }; break; }
      if (!best || Math.abs(d - 160) < Math.abs(Math.hypot(best.p[0] - target.x, best.p[1] - target.z) - 160)) best = { sp, p };
    }
    const r = this.net.roads[best.sp.ri], q = r.p[Math.min(r.p.length - 1, best.sp.i + 1)];
    const c = new Car(this.world, 0xf4f4f2, 'police', this.scale);
    c.place(best.p[0], best.p[1], Math.atan2(q[0] - best.p[0], q[1] - best.p[1]));
    c.police = true; c.driver = true; c.pursuer = new Pursuer(c, this.graph); c.leaveT = 0;
    this.scene.add(c.mesh); this.cars.push(c); this.units.push(c);
  }
  removeUnit(c) {
    this.scene.remove(c.mesh); for (const sp of c.smoke) this.scene.remove(sp);
    const i = this.cars.indexOf(c); if (i >= 0) this.cars.splice(i, 1);
    this.units.splice(this.units.indexOf(c), 1);
  }
  update(dt, target, driving, center, inside) {
    if (this.cool > 0) this.cool -= dt;
    // exceso de velocidad en el casco urbano (más de 60 km/h)
    if (driving && Math.abs(driving.speed) > 16.7 && Math.hypot(target.x - center[0], target.z - center[1]) < 260) {
      this.speedT += dt; if (this.speedT > 2.5) { this.report('velocidad'); this.speedT = 0; }
    } else this.speedT = Math.max(0, this.speedT - dt);

    const want = inside ? 0 : Math.min(this.maxUnits, this.wanted);
    const chasing = this.units.filter(u => !u.leaving);
    if (chasing.length < want && (this._spawnT = (this._spawnT || 0) - dt) <= 0) { this.spawnUnit(target); this._spawnT = 4; }
    let nearest = Infinity;
    this.flash += dt;
    for (const u of [...this.units]) {
      if (u.wrecked && !u.leaving) { u.leaving = true; }
      u.pursuer.update(dt, target, u.leaving);
      u.update(dt, u.pursuer);
      const d = Math.hypot(u.pos.x - target.x, u.pos.z - target.z);
      if (!u.leaving) nearest = Math.min(nearest, d);
      // luces azules alternas
      const s = u.mesh.userData.siren; if (s) { const on = !u.leaving && (this.flash * 6 | 0) % 2; s[0].emissiveIntensity = on ? 6 : 0.2; s[1].emissiveIntensity = on ? 0.2 : 6; }
      if (u.leaving) { u.leaveT += dt; if (u.leaveT > 8 && d > 60 || u.leaveT > 30) this.removeUnit(u); }
      // embestir a la patrulla
      if (driving && !u.leaving && d < 2.6 * u.s + 1 && Math.abs(driving.speed - u.speed) > 6 && (this._hitT = (this._hitT || 0) - dt) <= 0) { this.report('golpe'); this._hitT = 3; }
    }
    this.nearest = nearest;
    if (this.wanted > 0) {
      // detenido: la patrulla está a tu lado y tú parado
      const still = driving ? Math.abs(driving.speed) < 1.5 : true;
      if (nearest < (driving ? 8 : 7) && still) this.bustT += dt; else this.bustT = Math.max(0, this.bustT - dt * 0.5);
      if (this.bustT > 2.5) {
        const fine = 40 * this.wanted, paid = Math.min(this.wallet.money, fine); this.wallet.money -= paid;
        this.toast('🚓 Te ha detenido la Guardia Civil', `Multa de ${fine} €${paid < fine ? ` (solo tenías ${paid} €)` : ''}`); this.sound?.('fail');
        this.clear(); this.cool = 20;
      }
      // despistarlos: lejos de todas las patrullas un buen rato
      if (nearest > 140) { this.lostT += dt; if (this.lostT > 14) { this.wanted--; this.lostT = 0; if (!this.wanted) { this.toast('😮‍💨 Les has dado esquinazo', 'La Guardia Civil deja de buscarte'); this.clear(); } } }
      else this.lostT = 0;
    }
    const stars = '★'.repeat(this.wanted) + '☆'.repeat(3 - this.wanted);
    const t = this.wanted ? stars : ''; if (this.ui.wanted.textContent !== t) this.ui.wanted.textContent = t;
    this.ui.wanted.classList.toggle('busted', this.bustT > 0.5);
  }
  clear() { this.wanted = 0; this.bustT = 0; this.lostT = 0; for (const u of this.units) { u.leaving = true; u.leaveT = 0; } }
  // volumen de la sirena según la patrulla más cercana
  get siren() { return this.units.some(u => !u.leaving) ? Math.max(0, 1 - this.nearest / 250) : 0; }
}
