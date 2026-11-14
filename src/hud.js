// Minimapa circular a partir de la ortofoto y sonido de motor sintetizado.
export class Minimap {
  constructor(el, image, bounds, streets) {
    this.el = el; this.g = el.getContext('2d'); this.img = image; this.b = bounds; this.streets = streets;
    this.radius = 140; // metros visibles desde el centro
    const dpr = Math.min(2, devicePixelRatio); this.size = el.clientWidth || 150;
    el.width = el.height = this.size * dpr; this.g.scale(dpr, dpr);
  }
  draw(px, pz, heading, camYaw, cars, driving, extra = {}) {
    // con una ruta larga (taxi a otro pueblo o carrera) el mapa se aleja al ir en coche
    const want = extra.route && driving ? 420 : 140; this.radius += (want - this.radius) * 0.08;
    const g = this.g, S = this.size, r = S / 2, k = r / this.radius;
    const [x0, , x1] = this.b, iw = this.img.width, mpp = (x1 - x0) / iw;
    g.save(); g.clearRect(0, 0, S, S);
    g.beginPath(); g.arc(r, r, r - 2, 0, Math.PI * 2); g.clip();
    g.fillStyle = '#28301f'; g.fillRect(0, 0, S, S);
    g.translate(r, r); g.rotate(camYaw); // "arriba" del mapa = hacia donde mira la cámara
    g.globalAlpha = 0.9;
    // la imagen va de norte (fila 0, z=-HALF) a sur
    const R = this.radius * 1.5;
    const layer = (img, X0, X1) => { // recorte de la imagen alrededor del jugador (fuera de la imagen no se dibuja nada)
      const m = (X1 - X0) / img.width, sx = (px - X0) / m, sz = (pz - X0) / m, src = R / m;
      const a0 = Math.max(0, sx - src), b0 = Math.max(0, sz - src), a1 = Math.min(img.width, sx + src), b1 = Math.min(img.height, sz + src);
      if (a1 <= a0 || b1 <= b0) return;
      g.drawImage(img, a0, b0, a1 - a0, b1 - b0, (a0 * m + X0 - px) * k, (b0 * m + X0 - pz) * k, (a1 - a0) * m * k, (b1 - b0) * m * k);
    };
    if (this.outer && (Math.abs(px) > x1 - R || Math.abs(pz) > x1 - R)) layer(this.outer.img, this.outer.b[0], this.outer.b[2]);
    layer(this.img, x0, x1); void mpp;
    g.globalAlpha = 1;
    // calles con nombre
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 2.2; g.lineCap = 'round';
    for (const s of this.streets) { g.beginPath(); s.forEach(([x, z], i) => i ? g.lineTo((x - px) * k, (z - pz) * k) : g.moveTo((x - px) * k, (z - pz) * k)); g.stroke(); }
    for (const c of cars) if (c !== driving) {
      g.fillStyle = '#4fb3ff'; g.beginPath(); g.arc((c.pos.x - px) * k, (c.pos.z - pz) * k, 3.5, 0, 7); g.fill();
    }
    g.fillStyle = 'rgba(255,255,255,0.85)';
    for (const w of extra.walkers || []) { const x = (w.pos.x - px) * k, y = (w.pos.z - pz) * k; if (x * x + y * y < r * r) g.fillRect(x - 1.5, y - 1.5, 3, 3); }
    // salidas de las carreras: banderitas rojas (en el borde si están lejos)
    for (const f of extra.flags || []) {
      let x = (f[0] - px) * k, y = (f[1] - pz) * k; const d = Math.hypot(x, y), lim = r - 7;
      if (d > lim) { x *= lim / d; y *= lim / d; }
      g.fillStyle = FLAG[f[2]] || '#e2403a'; g.strokeStyle = '#000'; g.lineWidth = 1;
      g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); g.stroke();
    }
    // ruta por carretera hasta el destino (como un GPS)
    if (extra.route && extra.route.length > 1) {
      g.strokeStyle = 'rgba(0,0,0,0.6)'; g.lineWidth = 6; g.lineJoin = 'round';
      const path = () => { g.beginPath(); g.moveTo(0, 0); extra.route.forEach(([x, z]) => g.lineTo((x - px) * k, (z - pz) * k)); };
      path(); g.stroke(); g.strokeStyle = '#d64fd8'; g.lineWidth = 3.5; path(); g.stroke();
    }
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

// colores de los puntos del minimapa
const FLAG = { leche: '#f2f2f2', correo: '#f0a020', taxi: '#2ed1ff', gas: '#ff8c1a', taller: '#2ec4c4', shop: '#d84fd8', bar: '#8b5a2b', church: '#c9b48a', air: '#ffffff', neg: '#ffb300' };

export class EngineSound {
  constructor() { this.ctx = null; }
  start() {
    if (this.ctx) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext, ctx = this.ctx = new C();
      // motor de 4 cilindros: onda con armónicos que caen deprisa (sin el zumbido de la sierra y la cuadrada),
      // dos osciladores algo desafinados, un grave por debajo, saturación suave y agudos recortados
      const re = new Float32Array(24), im = new Float32Array(24);
      for (let n = 1; n < 24; n++) im[n] = (n === 2 ? 1.4 : n === 4 ? 0.7 : 1) / Math.pow(n, 1.5);
      const wave = ctx.createPeriodicWave(re, im);
      const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), sub = ctx.createOscillator();
      o1.setPeriodicWave(wave); o2.setPeriodicWave(wave); sub.type = 'sine';
      const mix = ctx.createGain(); mix.gain.value = 0.5;
      const subG = ctx.createGain(); subG.gain.value = 0.6;
      const sh = ctx.createWaveShaper(), curve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) { const x = i / 511.5 - 1; curve[i] = Math.tanh(1.8 * x) / Math.tanh(1.8); }
      sh.curve = curve;
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 300; f.Q.value = 0.6;
      const shelf = ctx.createBiquadFilter(); shelf.type = 'highshelf'; shelf.frequency.value = 1800; shelf.gain.value = -14;
      const gn = ctx.createGain(); gn.gain.value = 0;
      o1.connect(mix); o2.connect(mix); sub.connect(subG); subG.connect(f); mix.connect(sh); sh.connect(f); f.connect(shelf); shelf.connect(gn); gn.connect(ctx.destination);
      // rodadura y aire: ruido grave que crece con la velocidad
      const nb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = nb.getChannelData(0); let last = 0;
      for (let i = 0; i < d.length; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
      const ns = ctx.createBufferSource(); ns.buffer = nb; ns.loop = true;
      const nf = ctx.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 500;
      const roadG = ctx.createGain(); roadG.gain.value = 0; ns.connect(nf); nf.connect(roadG); roadG.connect(ctx.destination);
      o1.start(); o2.start(); sub.start(); ns.start();
      Object.assign(this, { o1, o2, sub, f, gn, roadG, nf });
    } catch (e) { this.ctx = null; }
  }
  // reverberación sencilla (eco de la plaza y del valle) para las campanas
  reverb() {
    if (this.rev) return this.rev;
    const ctx = this.ctx, L = ctx.sampleRate * 3.2 | 0, ir = ctx.createBuffer(2, L, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < L; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / L, 3.2) * (i < 900 ? i / 900 : 1); }
    const cv = ctx.createConvolver(); cv.buffer = ir; const wet = ctx.createGain(); wet.gain.value = 0.35;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
    cv.connect(wet); wet.connect(lp); lp.connect(ctx.destination);
    return (this.rev = cv);
  }
  // campanada de bronce: parciales de campana de iglesia (hum, fundamental, tercera menor, quinta, nominal...),
  // cada uno en dos osciladores casi iguales para el batido, golpe del badajo y eco
  bell(freq, vol = 0.25) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime + 0.01, out = ctx.createGain(); out.gain.value = vol;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
    out.connect(lp); lp.connect(ctx.destination); lp.connect(this.reverb());
    for (const [r, a, d] of [[0.5, 0.55, 9], [1, 0.75, 6], [1.2, 0.5, 4.5], [1.5, 0.22, 3], [2, 0.6, 3.5], [2.5, 0.12, 1.8], [3, 0.14, 1.6], [4.1, 0.05, 0.9]]) {
      for (const det of [-0.0012, 0.0012]) {
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = freq * r * (1 + det);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(a * 0.09, t + 0.004); g.gain.setTargetAtTime(0, t + 0.004, d / 5);
        o.connect(g); g.connect(out); o.start(t); o.stop(t + d + 0.2);
      }
    }
    if (!this.clang) { // golpe metálico corto del badajo
      const b = ctx.createBuffer(1, ctx.sampleRate * 0.08 | 0, ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
      this.clang = b;
    }
    const s = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = this.clang;
    bp.type = 'bandpass'; bp.frequency.value = freq * 5; bp.Q.value = 2; g.gain.value = 0.12;
    s.connect(bp); bp.connect(g); g.connect(out); s.start(t);
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
    const v = Math.abs(speed), rpm = 0.2 + Math.min(1.05, v / (gear === 2 ? 29 : 13.5)) * 0.7 + Math.abs(throttle) * 0.06;
    const base = 30 + rpm * 85; // frecuencia de explosiones: ralentí ~45 Hz, alto de vueltas ~120 Hz
    this.o1.frequency.setTargetAtTime(base, t, 0.08); this.o2.frequency.setTargetAtTime(base * 1.007, t, 0.08); this.sub.frequency.setTargetAtTime(base * 0.5, t, 0.08);
    this.f.frequency.setTargetAtTime(180 + rpm * 520 + Math.abs(throttle) * 260, t, 0.08);
    this.gn.gain.setTargetAtTime(on ? 0.06 + 0.05 * Math.abs(throttle) : 0, t, 0.2);
    this.roadG.gain.setTargetAtTime(on ? Math.min(0.09, v * 0.0035) : 0, t, 0.3);
    this.nf.frequency.setTargetAtTime(300 + v * 25, t, 0.3);
  }
}
