// Misiones de reparto: recoge el pan en la plaza y llévalo a las casas antes de que se acabe el tiempo.
import * as THREE from 'three';

export function beam(color, tall = false) {
  const g = new THREE.Group(), H = tall ? 30 : 14;
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide, fog: false, blending: THREE.AdditiveBlending });
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, H, 20, 1, true), mat); col.position.y = H / 2; g.add(col);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.9, 28), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.15; g.add(ring);
  g.userData = { col, ring }; g.visible = false;
  return g;
}

export class Missions {
  constructor({ scene, terrain, start, drops, ui, sound }) {
    Object.assign(this, { scene, terrain, start, drops, ui, sound });
    this.startMarker = beam(0xf5c542); this.dropMarker = beam(0x47d16c, true);
    scene.add(this.startMarker, this.dropMarker);
    this.state = 'idle'; this.cool = 0; this.money = 0;
    try { this.best = +localStorage.getItem('valde.best') || 0; } catch (_) { this.best = 0; }
    this.place(this.startMarker, start);
    this.startMarker.visible = true;
    this.renderUI();
  }
  place(m, [x, z]) { m.position.set(x, this.terrain.height(x, z), z); m.userData.at = [x, z]; }
  get target() { return this.state === 'deliver' ? this.dropMarker.userData.at : this.state === 'idle' ? this.start : null; }

  begin(from) {
    this.state = 'deliver'; this.left = 3; this.earned = 0; this.startMarker.visible = false;
    this.toast('🥖 Reparto del pan', 'Lleva el pan a 3 casas antes de que se acabe el tiempo');
    this.nextDrop(from);
  }
  nextDrop(from) {
    // una casa ni muy cerca ni muy lejos
    const cand = this.drops.filter(([x, z]) => { const d = Math.hypot(x - from[0], z - from[1]); return d > 45 && d < 260; });
    const list = cand.length ? cand : this.drops;
    const p = list[Math.floor(Math.random() * list.length)];
    this.place(this.dropMarker, p); this.dropMarker.visible = true;
    this.time = Math.round(18 + Math.hypot(p[0] - from[0], p[1] - from[1]) / 4.5);
  }
  update(dt, pos) {
    const t = performance.now() / 1000;
    for (const m of [this.startMarker, this.dropMarker]) if (m.visible) {
      m.userData.col.material.opacity = 0.22 + 0.1 * Math.sin(t * 3); m.userData.ring.scale.setScalar(1 + 0.15 * Math.sin(t * 4));
    }
    if (this.cool > 0) this.cool -= dt;
    if (this.state === 'idle') this.startMarker.visible = this.cool <= 0 && !this.busy?.();
    const near = (m) => m.visible && Math.hypot(pos.x - m.userData.at[0], pos.z - m.userData.at[1]) < 3.2;
    this.startMarker.visible = this.startMarker.visible && !this.busy?.();
    // no empieza solo: ofrece la tarea y el jugador dice sí o no
    this.offer = this.state === 'idle' && this.cool <= 0 && !this.busy?.() && near(this.startMarker) ? { id: 'pan', text: '🥖 Repartir el pan por el pueblo', go: (at => () => this.begin(at))([pos.x, pos.z]) } : null;
    if (this.state === 'deliver') {
      this.time -= dt;
      if (near(this.dropMarker)) {
        const pay = 10 + Math.max(0, Math.round(this.time));
        this.money += pay; this.earned += pay; this.left--; this.sound?.('ok');
        if (this.left > 0) { this.toast(`+${pay} €`, `Quedan ${this.left} entregas`); this.nextDrop([pos.x, pos.z]); }
        else {
          const bonus = 25; this.money += bonus; this.earned += bonus;
          this.toast('¡Reparto completado!', `Has ganado ${this.earned} € (incluye ${bonus} € de propina)`);
          this.finish();
        }
      } else if (this.time <= 0) { this.toast('Se acabó el tiempo', 'El pan ha llegado frío. Vuelve a la plaza para intentarlo otra vez'); this.sound?.('fail'); this.finish(); }
    }
    this.renderUI();
  }
  finish() {
    this.state = 'idle'; this.dropMarker.visible = false; this.cool = 4;
    if (this.money > this.best) { this.best = this.money; try { localStorage.setItem('valde.best', String(this.best)); } catch (_) {} }
  }
  toast(title, sub) {
    const el = this.ui.toast; el.innerHTML = `<b>${title}</b><span>${sub}</span>`;
    el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
    clearTimeout(this._tt); this._tt = setTimeout(() => el.classList.remove('show'), 3500);
  }
  renderUI() {
    const u = this.ui;
    const txt = this.state === 'deliver' ? `🥖 Entrega ${4 - this.left}/3 · <b class="${this.time < 10 ? 'late' : ''}">${Math.max(0, Math.ceil(this.time))} s</b>`
      : this.startMarker.visible ? '🥖 Ve al <b>círculo amarillo</b> de la plaza para repartir pan' : '';
    if (txt !== this._last) { u.mission.innerHTML = txt; this._last = txt; }
    const m = `${this.money} €`; if (m !== this._lm) { u.money.textContent = m; this._lm = m; }
  }
}

// Puntos de entrega: la calle frente a cada casa
export function deliveryPoints(data) {
  const streets = data.roads.filter(r => r.k === 'residential' || r.k === 'tertiary' || r.k === 'living_street');
  const out = [];
  for (const b of data.buildings) {
    if (b.use !== 'res') continue;
    let cx = 0, cz = 0; for (const p of b.p) { cx += p[0]; cz += p[1]; } cx /= b.p.length; cz /= b.p.length;
    let best = null, bd = 22;
    for (const r of streets) for (let i = 0; i < r.p.length - 1; i++) {
      const a = r.p[i], c = r.p[i + 1], dx = c[0] - a[0], dz = c[1] - a[1], L = dx * dx + dz * dz || 1;
      const t = Math.max(0, Math.min(1, ((cx - a[0]) * dx + (cz - a[1]) * dz) / L)), qx = a[0] + dx * t, qz = a[1] + dz * t, d = Math.hypot(cx - qx, cz - qz);
      if (d < bd) { bd = d; best = [qx, qz]; }
    }
    if (best && !out.some(p => Math.hypot(p[0] - best[0], p[1] - best[1]) < 18)) out.push(best);
  }
  return out;
}
