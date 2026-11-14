// Trabajos además del pan: la leche de la granja, el correo y el taxi.
import * as THREE from 'three';
import { beam } from './missions.js';
import { makeCharacter, animateCharacter } from './models.js';

const centroid = (b) => { let x = 0, z = 0; for (const p of b.p) { x += p[0]; z += p[1]; } return [x / b.p.length, z / b.p.length]; };
// punto de la calle más cercano a un edificio
function frontOf(b, roads, maxD = 40) {
  const [cx, cz] = centroid(b); let best = null, bd = maxD;
  for (const r of roads) for (let i = 0; i < r.p.length - 1; i++) {
    const a = r.p[i], c = r.p[i + 1], dx = c[0] - a[0], dz = c[1] - a[1], L = dx * dx + dz * dz || 1;
    const t = Math.max(0, Math.min(1, ((cx - a[0]) * dx + (cz - a[1]) * dz) / L)), qx = a[0] + dx * t, qz = a[1] + dz * t, d = Math.hypot(cx - qx, cz - qz);
    if (d < bd) { bd = d; best = [qx, qz]; }
  }
  return best;
}

export class Jobs {
  constructor({ scene, world, data, center, drops, ui, toast, sound, wallet, personScale }) {
    Object.assign(this, { scene, world, ui, toast, sound, wallet, drops, center });
    const roads = data.roads.filter(r => r.k !== 'path');
    const dc = (b) => { const [x, z] = centroid(b); return Math.hypot(x - center[0], z - center[1]); };
    // granja: una nave agrícola a las afueras
    const farms = data.buildings.filter(b => b.use === 'agr' && dc(b) > 220 && dc(b) < (data.half || 1000) - 150).sort((a, b) => dc(a) - dc(b));
    const farm = farms[Math.min(farms.length - 1, 2)];
    this.farm = farm && frontOf(farm, roads, 60);
    // correos: un edificio público del centro que no sea la iglesia (si no, una casa junto a la plaza)
    const pubs = data.buildings.filter(b => (b.use === 'pub' || b.use === 'res') && b.id !== data.church && dc(b) < 120).sort((a, b) => (a.use === 'pub' ? 0 : 1) - (b.use === 'pub' ? 0 : 1) || dc(a) - dc(b));
    this.post = pubs[0] && frontOf(pubs[0], roads);
    this.dairy = [center[0] + 6, center[1] - 4]; // la leche se lleva a la cooperativa de la plaza
    this.defs = [];
    if (this.farm) this.defs.push({ id: 'leche', icon: '🥛', name: 'La leche de la granja', at: this.farm, color: 0xf2f2f2, needsCar: true });
    if (this.post) this.defs.push({ id: 'correo', icon: '✉️', name: 'El correo', at: this.post, color: 0xf0a020, needsCar: false });
    this.defs.push({ id: 'taxi', icon: '🚕', name: 'Taxi', at: null, color: 0x2ed1ff, needsCar: true });
    for (const d of this.defs) { d.marker = beam(d.color); d.marker.scale.set(1, 0.55, 1); scene.add(d.marker); if (d.at) this.place(d.marker, d.at); }
    this.dropM = beam(0x47d16c, true); scene.add(this.dropM);
    // el vecino que pide el taxi
    this.fare = makeCharacter({ shirt: 0x8a3a6a, pants: 0x30343a, hair: 0x9a9a9a }); this.fare.scale.setScalar(personScale); this.fare.visible = false; scene.add(this.fare);
    this.state = 'idle'; this.cool = 0; this.taxiT = 3; this.job = null;
  }
  // negocios del plano: cada uno ofrece repartos y es destino del taxi
  addNegocios(list) {
    this.negocios = list || [];
    for (const n of this.negocios) {
      const d = { id: 'neg', neg: n, icon: '📦', name: `Reparto de ${n.name}`, at: n.at, color: 0xffb300, needsCar: true };
      d.marker = beam(d.color); d.marker.scale.set(1, 0.55, 1); this.scene.add(d.marker); this.place(d.marker, d.at); this.defs.push(d);
    }
  }
  // un destino lejano: ruta por carretera para el minimapa y tiempo según los kilómetros
  goFar(dest, name, pos) {
    const pts = this.region?.route([pos.x, pos.z], dest), L = pts ? pts.reduce((a, q, i) => i ? a + Math.hypot(q[0] - pts[i - 1][0], q[1] - pts[i - 1][1]) : 0, 0) : Math.hypot(dest[0] - pos.x, dest[1] - pos.z) * 1.3;
    if (pts) this.route = [...pts, dest];
    this.destName = name; this.place(this.dropM, dest); this.dropM.visible = true; this.time = Math.round(45 + L / 11); this.fareDist = L; return L;
  }
  place(m, [x, z]) { m.position.set(x, this.world.terrain.height(x, z), z); m.userData.at = [x, z]; }
  get active() { return this.state !== 'idle'; }
  get target() { return this.state === 'go' ? this.dropM.userData.at : this.state === 'pickup' ? this.job.at : null; }
  get flags() { return this.state === 'idle' ? this.defs.filter(d => d.marker.visible).map(d => [...d.marker.userData.at, d.id]) : []; }
  newFare(from) {
    const d = this.defs.find(x => x.id === 'taxi');
    // fuera del pueblo principal, el pasajero espera en una calle del pueblo en el que estás
    const away = this.region && Math.hypot(from.x - this.center[0], from.z - this.center[1]) > 1500;
    const pool = away ? this.region.spotsNear(from.x, from.z, 40, 260) : this.drops;
    if (away && !pool.length) { this.taxiT = 6; return; }
    const cand = pool.filter(p => { const k = Math.hypot(p[0] - from.x, p[1] - from.z); return k > 40 && k < 260; });
    const p = cand.length ? cand[Math.floor(Math.random() * cand.length)] : this.drops[0];
    d.at = p; this.place(d.marker, p);
    this.fare.position.set(p[0] + 1.6, this.world.terrain.height(p[0], p[1]), p[1]); this.fare.rotation.y = Math.random() * 6;
  }
  begin(d, pos) {
    this.job = d; this.state = 'go'; this.earned = 0; this.hits = 0;
    if (d.id === 'leche') {
      this.left = 1; this.toast('🥛 La leche de la granja', 'Lleva las cántaras a la cooperativa de la plaza sin darte golpes');
      this.setDrop(this.dairy, pos, 3.5);
    } else if (d.id === 'correo') {
      this.left = 4; this.toast('✉️ El correo', 'Reparte 4 cartas por las casas, a pie o en coche');
      this.nextLetter(pos);
    } else if (d.id === 'neg') {
      // reparto: a otro negocio (si hay) o a una casa del pueblo
      this.left = 1; this.destName = null; this.route = null; const n = d.neg;
      const others = (this.negocios || []).filter(o => o !== n && Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z) > 80 && Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z) < 9000);
      if (others.length && Math.random() < 0.6) {
        const o = others[Math.floor(Math.random() * others.length)], far = Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z) > 700;
        if (far) this.goFar(o.at, o.name, pos); else { this.destName = o.name; this.setDrop(o.at, pos, 5); this.fareDist = Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z); }
        this.toast(`📦 ${n.name}`, `Lleva este pedido a ${o.name} sin darte golpes`);
      } else {
        const away = this.region && Math.hypot(pos.x - this.center[0], pos.z - this.center[1]) > 1500;
        const pool = (away ? this.region.spotsNear(pos.x, pos.z, 100, 450) : this.drops).filter(p => { const k = Math.hypot(p[0] - pos.x, p[1] - pos.z); return k > 100 && k < 500; });
        const dest = pool[Math.floor(Math.random() * pool.length)] || this.drops[0];
        this.toast(`📦 ${n.name}`, 'Lleva el pedido a la casa de la marca verde sin darte golpes');
        this.setDrop(dest, pos, 5); this.fareDist = Math.hypot(dest[0] - pos.x, dest[1] - pos.z);
      }
    } else {
      this.left = 1; this.fare.visible = false; this.destName = null; this.route = null;
      // a veces el pasajero quiere ir a un negocio del plano
      const negs = (this.negocios || []).filter(o => { const k = Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z); return k > 200 && k < 12000; });
      if (negs.length && Math.random() < 0.45) {
        const o = negs[Math.floor(Math.random() * negs.length)], k = Math.hypot(o.at[0] - pos.x, o.at[1] - pos.z);
        const L = k > 700 ? this.goFar(o.at, o.name, pos) : (this.destName = o.name, this.setDrop(o.at, pos, 4.2), this.fareDist = k);
        this.toast('🚕 ¡Sube!', `Lléveme a ${o.icon} ${o.name}, por favor` + (L > 1000 ? ` · ${(L / 1000).toFixed(1)} km` : ''));
        d.marker.visible = false; return;
      }
      // destino: otro pueblo de la comarca (casi siempre) o, a veces, la otra punta del pueblo
      const R = this.region, here = R?.villageAt(pos.x, pos.z, 1500);
      const away = here && !here.main, trips = [];
      if (R && (away || Math.random() < 0.7)) for (const [v, pts, L] of R.toVillages([pos.x, pos.z])) {
        if (v !== here && Math.hypot(v.c[0] - pos.x, v.c[1] - pos.z) > 900 && L > 1000 && L < 12000) trips.push([v, pts, L]);
      }
      if (trips.length) {
        // más a menudo a los pueblos grandes y al principal
        const w = trips.map(([v]) => v.main ? 4 : v.big ? 2 : 1), tot = w.reduce((a, b) => a + b, 0); let r = Math.random() * tot, k = 0;
        while (r > w[k]) r -= w[k++];
        const [v, pts, L] = trips[Math.min(k, trips.length - 1)], dest = R.nodePos(v.node);
        this.destName = v.name; this.route = pts.slice();
        this.toast('🚕 ¡Sube!', `Lléveme a ${v.name}, por favor, que tengo prisa · ${(L / 1000).toFixed(1)} km`);
        this.place(this.dropM, dest); this.dropM.visible = true; this.time = Math.round(45 + L / 11); this.fareDist = L;
      } else {
        const far = this.drops.filter(p => Math.hypot(p[0] - pos.x, p[1] - pos.z) > 150);
        const opts = away ? R.spotsNear(pos.x, pos.z, 150, 450) : [...far.slice(0, 40), ...(this.extraDest || [])];
        const dest = opts[Math.floor(Math.random() * opts.length)] || this.drops[0];
        this.toast('🚕 ¡Sube!', 'Llévame a la marca verde, que tengo prisa');
        this.setDrop(dest, pos, 4.2); this.fareDist = Math.hypot(dest[0] - pos.x, dest[1] - pos.z);
      }
    }
    d.marker.visible = false;
  }
  setDrop(p, pos, speed) { this.place(this.dropM, p); this.dropM.visible = true; this.time = Math.round(20 + Math.hypot(p[0] - pos.x, p[1] - pos.z) / speed); }
  nextLetter(pos) {
    const cand = this.drops.filter(([x, z]) => { const d = Math.hypot(x - pos.x, z - pos.z); return d > 25 && d < 160; });
    const list = cand.length ? cand : this.drops; this.setDrop(list[Math.floor(Math.random() * list.length)], pos, 3.2);
  }
  update(dt, pos, driving) {
    const t = performance.now() / 1000;
    for (const m of [...this.defs.map(d => d.marker), this.dropM]) if (m.visible) { m.userData.col.material.opacity = 0.22 + 0.1 * Math.sin(t * 3); }
    if (this.cool > 0) this.cool -= dt;
    const busy = this.busy?.(); this.hint = ''; this.offer = null;
    if (this.state === 'idle') {
      const taxi = this.defs.find(d => d.id === 'taxi');
      if (!taxi.at) { this.taxiT -= dt; if (this.taxiT <= 0) this.newFare(pos); }
      for (const d of this.defs) {
        d.marker.visible = !!d.at && this.cool <= 0 && !busy && (d.id !== 'neg' || Math.hypot(pos.x - d.at[0], pos.z - d.at[1]) < 700);
        if (d.id === 'taxi' && !(this.fareWalk > 0)) { this.fare.visible = d.marker.visible; if (this.fare.visible) { this.fare.lookAt(pos.x, this.fare.position.y, pos.z); animateCharacter(this.fare, 0, dt); } }
        if (!d.marker.visible) continue;
        const near = Math.hypot(pos.x - d.at[0], pos.z - d.at[1]) < 3.5;
        if (near && d.needsCar && !driving) { this.hint = `${d.icon} ${d.name}: necesitas un vehículo`; continue; }
        if (near && (!driving || Math.abs(driving.speed) < 3)) { const at = { x: pos.x, z: pos.z }; this.offer = { id: `job:${d.id}`, text: `${d.icon} ${d.name}`, go: () => this.begin(d, at) }; break; }
      }
      return;
    }
    const d = this.job; this.time -= dt;
    if (d.needsCar && driving) { // golpes con la carga
      if (this._h0 === undefined) this._h0 = driving.health;
      if (driving.health < this._h0 - 2) { this.hits++; this._h0 = driving.health; if (d.id === 'leche') this.toast('🥛 ¡Cuidado!', 'Se ha derramado algo de leche: -10 €'); if (d.id === 'taxi') this.toast('🚕 ¡Ay!', 'Al pasajero no le ha gustado el golpe'); if (d.id === 'neg') this.toast('📦 ¡Cuidado!', 'Se ha roto algo del pedido: -5 €'); }
    }
    if (d.needsCar && !driving) { this.fail(d.id === 'taxi' ? 'El pasajero se ha bajado enfadado' : d.id === 'neg' ? 'Has dejado el pedido tirado' : 'Has dejado la leche tirada'); return; }
    if (Math.hypot(pos.x - this.dropM.userData.at[0], pos.z - this.dropM.userData.at[1]) < 3.6 && (!driving || Math.abs(driving.speed) < 4)) {
      let pay;
      if (d.id === 'leche') pay = Math.max(15, 70 + Math.round(Math.max(0, this.time)) - this.hits * 10);
      else if (d.id === 'correo') pay = 12 + Math.max(0, Math.round(this.time / 2));
      else if (d.id === 'neg') pay = Math.round(18 + Math.min(this.fareDist, 1500) * 0.05 + Math.max(0, this.fareDist - 1500) * 0.025 + Math.max(0, this.time) * 0.5 - this.hits * 5);
      else pay = Math.round(15 + Math.min(this.fareDist, 1500) * 0.06 + Math.max(0, this.fareDist - 1500) * 0.03 + Math.max(0, this.time) * 0.6 - this.hits * 5);
      pay = Math.max(5, pay); this.wallet.money += pay; this.earned += pay; this.left--; this.sound?.('ok');
      if (this.left > 0) { this.toast(`+${pay} €`, `Quedan ${this.left} cartas`); this.nextLetter(pos); }
      else {
        if (d.id === 'taxi') { const [x, z] = this.dropM.userData.at; this.fare.position.set(x + 1.5, this.world.terrain.height(x, z), z); this.fare.visible = true; this.fareWalk = 5; }
        this.toast(d.id === 'taxi' ? (this.destName ? `🚕 ¡Ya estamos en ${this.destName}!` : '🚕 Carrera completada') : d.id === 'neg' ? (this.destName ? `📦 Pedido entregado en ${this.destName}` : '📦 Pedido entregado') : '¡Trabajo hecho!', `Has ganado ${this.earned} €`); this.finish();
      }
    } else if (this.time <= 0) this.fail(d.id === 'leche' ? 'La leche se ha calentado' : d.id === 'taxi' ? 'El pasajero ha llegado tarde y no te paga' : d.id === 'neg' ? 'El pedido ha llegado tarde' : 'Se acabó el tiempo del reparto');
    if (this.route) { // la ruta del minimapa se va recortando según avanzas
      const rt = this.route; let cut = 0;
      for (let i = 0; i < Math.min(rt.length, 30); i++) if (Math.hypot(rt[i][0] - pos.x, rt[i][1] - pos.z) < 30) cut = i;
      if (cut) rt.splice(0, cut);
    }
    const left = this.destName ? ` a ${this.destName} · ${(Math.hypot(this.dropM.userData.at[0] - pos.x, this.dropM.userData.at[1] - pos.z) / 1000).toFixed(1)} km` : '';
    const label = d.id === 'correo' ? `✉️ Carta ${5 - this.left}/4` : `${d.icon} ${d.id === 'taxi' ? 'Lleva al pasajero' + left : d.id === 'neg' ? 'Lleva el pedido' + left : 'A la cooperativa'}`;
    const txt = `${label} · <b class="${this.time < 10 ? 'late' : ''}">${Math.max(0, Math.ceil(this.time))} s</b>`;
    if (this.ui.mission.innerHTML !== txt) this.ui.mission.innerHTML = txt;
  }
  // el pasajero se va andando tras bajarse
  tick(dt) {
    if (this.fareWalk > 0) {
      this.fareWalk -= dt; const f = this.fare; f.position.x += Math.sin(f.rotation.y) * dt * 1.2; f.position.z += Math.cos(f.rotation.y) * dt * 1.2;
      f.position.y = this.world.terrain.height(f.position.x, f.position.z); animateCharacter(f, 1.2, dt);
      if (this.fareWalk <= 0) f.visible = false;
    }
  }
  fail(msg) { this.toast('Trabajo fallido', msg); this.sound?.('fail'); this.finish(); }
  finish() {
    const d = this.job; this.state = 'idle'; this.dropM.visible = false; this.route = null; this.destName = null; this.cool = 5; this._h0 = undefined; this.ui.mission.innerHTML = '';
    if (d.id === 'taxi') { d.at = null; this.taxiT = 8; }
    this.job = null;
  }
}
