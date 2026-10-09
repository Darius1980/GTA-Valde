// Minimapa circular a partir de la ortofoto y sonido de motor sintetizado.
export class Minimap {
  constructor(el, image, bounds, streets) {
    this.el = el; this.g = el.getContext('2d'); this.img = image; this.b = bounds; this.streets = streets;
    this.radius = 140; // metros visibles desde el centro
    const dpr = Math.min(2, devicePixelRatio); this.size = el.clientWidth || 150;
    el.width = el.height = this.size * dpr; this.g.scale(dpr, dpr);
  }
  draw(px, pz, heading, camYaw, cars, driving) {
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
    // jugador
    g.rotate(Math.PI - heading - camYaw);
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
  update(on, speed, throttle) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // marchas simuladas: las rpm suben y caen en cada cambio
    const v = Math.abs(speed), gear = Math.min(5, Math.floor(v / 9)), rpm = 0.25 + (v - gear * 9) / 9 * 0.6 + gear * 0.04;
    const base = 38 + rpm * 90;
    this.o1.frequency.setTargetAtTime(base, t, 0.05); this.o2.frequency.setTargetAtTime(base * 0.5, t, 0.05);
    this.f.frequency.setTargetAtTime(250 + rpm * 900 + throttle * 400, t, 0.05);
    this.gn.gain.setTargetAtTime(on ? 0.05 + 0.05 * Math.abs(throttle) : 0, t, 0.15);
  }
}
