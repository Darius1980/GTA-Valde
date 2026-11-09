// Minimapa circular a partir de la ortofoto y sonido de motor sintetizado.
export class Minimap {
  constructor(el, image, bounds, streets) {
    this.el = el; this.g = el.getContext('2d'); this.img = image; this.b = bounds; this.streets = streets;
    this.radius = 140; // metros visibles desde el centro
    const dpr = Math.min(2, devicePixelRatio); this.size = el.clientWidth || 150;
    el.width = el.height = this.size * dpr; this.g.scale(dpr, dpr);
  }
  draw(px, pz, heading, camYaw, cars, driving, extra = {}) {
    const g = this.g, S = this.size, r = S / 2, k = r / this.radius;
    const [x0, , x1] = this.b, iw = this.img.width, mpp = (x1 - x0) / iw;
    g.save(); g.clearRect(0, 0, S, S);
    g.beginPath(); g.arc(r, r, r - 2, 0, Math.PI * 2); g.clip();
    g.fillStyle = '#28301f'; g.fillRect(0, 0, S, S);
    g.translate(r, r); g.rotate(camYaw); // "arriba" del mapa = hacia donde mira la cámara
    g.globalAlpha = 0.9;
    // la imagen va de norte (fila 0, z=-HALF) a sur
    const sx = (px - x0) / mpp, sz = (pz - x0) / mpp, src = this.radius * 1.5 / mpp;
    g.drawImage(this.img, sx - src, sz - src, src * 2, src * 2, -this.radius * 1.5 * k, -this.radius * 1.5 * k, this.radius * 3 * k, this.radius * 3 * k);
    g.globalAlpha = 1;
    // calles con nombre
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 2.2; g.lineCap = 'round';
    for (const s of this.streets) { g.beginPath(); s.forEach(([x, z], i) => i ? g.lineTo((x - px) * k, (z - pz) * k) : g.moveTo((x - px) * k, (z - pz) * k)); g.stroke(); }
    for (const c of cars) if (c !== driving) {
      g.fillStyle = '#4fb3ff'; g.beginPath(); g.arc((c.pos.x - px) * k, (c.pos.z - pz) * k, 3.5, 0, 7); g.fill();
    }
    g.fillStyle = 'rgba(255,255,255,0.85)';
    for (const w of extra.walkers || []) { const x = (w.pos.x - px) * k, y = (w.pos.z - pz) * k; if (x * x + y * y < r * r) g.fillRect(x - 1.5, y - 1.5, 3, 3); }
    // objetivo de la misión (en el borde si está lejos)
    if (extra.target) {
      let x = (extra.target[0] - px) * k, y = (extra.target[1] - pz) * k; const d = Math.hypot(x, y), lim = r - 9;
      if (d > lim) { x *= lim / d; y *= lim / d; }
      g.fillStyle = extra.targetColor || '#f5c542'; g.strokeStyle = '#000'; g.lineWidth = 1.5;
      g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); g.stroke();
    }
    // jugador
    g.rotate(Math.PI - heading); // el lienzo ya está girado con la cámara
    g.fillStyle = '#f5c542'; g.strokeStyle = '#000'; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(0, -8); g.lineTo(6, 6); g.lineTo(0, 3); g.lineTo(-6, 6); g.closePath(); g.fill(); g.stroke();
    g.restore();
    // marco y norte
    g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 3; g.beginPath(); g.arc(r, r, r - 2, 0, Math.PI * 2); g.stroke();
    const nx = r + Math.sin(camYaw) * (r - 11), ny = r - Math.cos(camYaw) * (r - 11);
    g.fillStyle = '#fff'; g.font = 'bold 12px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('N', nx, ny);
  }
}

export class EngineSound {
  constructor() { this.ctx = null; }
  start() {
    if (this.ctx) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext; this.ctx = new C();
      const o1 = this.ctx.createOscillator(), o2 = this.ctx.createOscillator(), f = this.ctx.createBiquadFilter(), gn = this.ctx.createGain();
      o1.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.frequency.value = 400; gn.gain.value = 0;
      o1.connect(f); o2.connect(f); f.connect(gn); gn.connect(this.ctx.destination); o1.start(); o2.start();
      Object.assign(this, { o1, o2, f, gn });
    } catch (e) { this.ctx = null; }
  }
  // tañido de campana: parciales inarmónicos con caída larga
  bell(freq, vol = 0.25) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, out = this.ctx.createGain(); out.gain.value = vol; out.connect(this.ctx.destination);
    for (const [r, a, d] of [[0.5, 0.5, 5], [1, 1, 3.5], [1.19, 0.6, 2.5], [1.5, 0.45, 2], [2, 0.35, 1.6], [2.52, 0.25, 1.1], [3.01, 0.15, 0.8]]) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = 'sine'; o.frequency.value = freq * r;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(a * 0.2, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + d + 0.1);
    }
  }
  blip(kind) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, notes = kind === 'ok' ? [660, 880, 1320] : [440, 330, 220];
    notes.forEach((f, i) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.1); g.gain.linearRampToValueAtTime(0.12, t + i * 0.1 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.25);
      o.connect(g); g.connect(this.ctx.destination); o.start(t + i * 0.1); o.stop(t + i * 0.1 + 0.3);
    });
  }
  update(on, speed, throttle, gear = 1) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // rpm según la marcha: la corta llega arriba a ~13,5 m/s y la larga a ~29 m/s
    const v = Math.abs(speed), rpm = 0.22 + Math.min(1.1, v / (gear === 2 ? 29 : 13.5)) * 0.75;
    const base = 38 + rpm * 90;
    this.o1.frequency.setTargetAtTime(base, t, 0.05); this.o2.frequency.setTargetAtTime(base * 0.5, t, 0.05);
    this.f.frequency.setTargetAtTime(250 + rpm * 900 + throttle * 400, t, 0.05);
    this.gn.gain.setTargetAtTime(on ? 0.05 + 0.05 * Math.abs(throttle) : 0, t, 0.15);
  }
}
