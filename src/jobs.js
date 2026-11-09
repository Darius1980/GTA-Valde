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
  place(m, [x, z]) { m.position.set(x, this.world.terrain.height(x, z), z); m.userData.at = [x, z]; }
  get active() { return this.state !== 'idle'; }
  get target() { return this.state === 'go' ? this.dropM.userData.at : this.state === 'pickup' ? this.job.at : null; }
  get flags() { return this.state === 'idle' ? this.defs.filter(d => d.marker.visible).map(d => [...d.marker.userData.at, d.id]) : []; }
  newFare(from) {
    const d = this.defs.find(x => x.id === 'taxi');
    const cand = this.drops.filter(p => { const k = Math.hypot(p[0] - from.x, p[1] - from.z); return k > 40 && k < 220; });
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
    } else {
      this.left = 1; this.fare.visible = false;
      // destino: la granja, la gasolinera, la otra punta del pueblo o una casa lejana
      const far = this.drops.filter(p => Math.hypot(p[0] - pos.x, p[1] - pos.z) > 150);
      const opts = [...far.slice(0, 40), ...(this.extraDest || [])];
      const dest = opts[Math.floor(Math.random() * opts.length)] || this.drops[0];
      this.toast('🚕 ¡Sube!', 'Llévame a la marca verde, que tengo prisa');
      this.setDrop(dest, pos, 4.2); this.fareDist = Math.hypot(dest[0] - pos.x, dest[1] - pos.z);
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
        d.marker.visible = !!d.at && this.cool <= 0 && !busy;
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
      if (driving.health < this._h0 - 2) { this.hits++; this._h0 = driving.health; if (d.id === 'leche') this.toast('🥛 ¡Cuidado!', 'Se ha derramado algo de leche: -10 €'); if (d.id === 'taxi') this.toast('🚕 ¡Ay!', 'Al pasajero no le ha gustado el golpe'); }
    }
    if (d.needsCar && !driving) { this.fail(d.id === 'taxi' ? 'El pasajero se ha bajado enfadado' : 'Has dejado la leche tirada'); return; }
    if (Math.hypot(pos.x - this.dropM.userData.at[0], pos.z - this.dropM.userData.at[1]) < 3.6 && (!driving || Math.abs(driving.speed) < 4)) {
      let pay;
      if (d.id === 'leche') pay = Math.max(15, 70 + Math.round(Math.max(0, this.time)) - this.hits * 10);
      else if (d.id === 'correo') pay = 12 + Math.max(0, Math.round(this.time / 2));
      else pay = Math.round(15 + this.fareDist * 0.06 + Math.max(0, this.time) * 0.6 - this.hits * 5);
      pay = Math.max(5, pay); this.wallet.money += pay; this.earned += pay; this.left--; this.sound?.('ok');
      if (this.left > 0) { this.toast(`+${pay} €`, `Quedan ${this.left} cartas`); this.nextLetter(pos); }
      else {
        if (d.id === 'taxi') { const [x, z] = this.dropM.userData.at; this.fare.position.set(x + 1.5, this.world.terrain.height(x, z), z); this.fare.visible = true; this.fareWalk = 5; }
        this.toast(d.id === 'taxi' ? '🚕 Carrera completada' : '¡Trabajo hecho!', `Has ganado ${this.earned} €`); this.finish();
      }
    } else if (this.time <= 0) this.fail(d.id === 'leche' ? 'La leche se ha calentado' : d.id === 'taxi' ? 'El pasajero ha llegado tarde y no te paga' : 'Se acabó el tiempo del reparto');
    const label = d.id === 'correo' ? `✉️ Carta ${5 - this.left}/4` : `${d.icon} ${d.id === 'taxi' ? 'Lleva al pasajero' : 'A la cooperativa'}`;
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
    const d = this.job; this.state = 'idle'; this.dropM.visible = false; this.cool = 5; this._h0 = undefined; this.ui.mission.innerHTML = '';
    if (d.id === 'taxi') { d.at = null; this.taxiT = 8; }
    this.job = null;
  }
}
