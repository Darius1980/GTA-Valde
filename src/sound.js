// Sonido ambiente sintetizado: pájaros de día, grillos y perros de noche, lluvia, sirena
// de la Guardia Civil, música de verbena y petardos. Todo con Web Audio, sin ficheros.
export class Ambient {
  constructor(engine) { this.engine = engine; this.t = { bird: 3, bark: 20, music: 0 }; this.ready = false; }
  init() {
    const ctx = this.engine.ctx; if (!ctx || this.ready) return !!this.ready;
    this.ctx = ctx; this.ready = true;
    // ruido blanco reutilizable
    const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.noise = b;
    const loop = (type, freq, q) => {
      const s = ctx.createBufferSource(); s.buffer = b; s.loop = true;
      const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
      const g = ctx.createGain(); g.gain.value = 0; s.connect(f); f.connect(g); g.connect(ctx.destination); s.start(); return g;
    };
    this.rainG = loop('lowpass', 1800, 0.3);   // lluvia
    this.windG = loop('lowpass', 300, 0.5);    // viento con nieve y niebla
    this.crickG = loop('bandpass', 4800, 25);  // grillos (se pulsa la ganancia)
    // sirena: dos tonos alternos
    const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 680;
    const sf = ctx.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.value = 2200;
    this.sirenG = ctx.createGain(); this.sirenG.gain.value = 0; o.connect(sf); sf.connect(this.sirenG); this.sirenG.connect(ctx.destination); o.start();
    this.sirenO = o;
    this.musicG = ctx.createGain(); this.musicG.gain.value = 0; this.musicG.connect(ctx.destination);
    return true;
  }
  tone(freq, t, dur, vol, type = 'sine', out = null, glide = 0) {
    const ctx = this.ctx, o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(freq, t);
    if (glide) o.frequency.exponentialRampToValueAtTime(freq * glide, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.02, dur / 4)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out || ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  burst(t, dur, vol, freq, type = 'bandpass', out = null) {
    const ctx = this.ctx, s = ctx.createBufferSource(); s.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = 1.2;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out || ctx.destination); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  // ---- pájaros: varias especies de la zona, cada una con su canto, repartidas a izquierda y derecha y a distinta distancia
  birdOut(pan, dist) {
    const ctx = this.ctx, g = ctx.createGain(); g.gain.value = 1 / (1 + dist * 1.5);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 9000 - dist * 5500; // los lejanos, más apagados
    let node = g; if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); node = p; }
    node.connect(lp); lp.connect(ctx.destination); if (this.engine.reverb && dist > 0.4) lp.connect(this.engine.reverb());
    setTimeout(() => { try { g.disconnect(); lp.disconnect(); } catch (_) {} }, 6000);
    return g;
  }
  // nota con barrido de frecuencia (curva) y vibrato rápido opcional
  note(out, t, dur, f0, f1, vol, vib = 0, vibHz = 0, type = 'sine') {
    const ctx = this.ctx, o = ctx.createOscillator(), g = ctx.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    if (vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = vibHz; lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + 0.05); }
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.012, dur / 3)); g.gain.setValueAtTime(vol, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.05);
  }
  sparrow(out, t) { // gorrión: chip-chip-chip, notas cortas que bajan y suben
    const n = 3 + (Math.random() * 5 | 0), f = 3200 + Math.random() * 900;
    for (let i = 0; i < n; i++) { const a = t + i * (0.13 + Math.random() * 0.05), ff = f * (0.92 + Math.random() * 0.16); this.note(out, a, 0.05, ff * 1.15, ff * 0.8, 0.05); this.note(out, a + 0.045, 0.035, ff * 0.85, ff * 1.1, 0.03); }
    return n * 0.16;
  }
  blackbird(out, t) { // mirlo: frase aflautada y melodiosa, con un remate chirriante
    const base = 1500 + Math.random() * 700, n = 4 + (Math.random() * 4 | 0); let a = t;
    for (let i = 0; i < n; i++) {
      const d = 0.09 + Math.random() * 0.16, f0 = base * (0.8 + Math.random() * 0.8), f1 = f0 * (0.85 + Math.random() * 0.35);
      this.note(out, a, d, f0, f1, 0.06, f0 * 0.015, 22); this.note(out, a, d, f0 * 2, f1 * 2, 0.008); a += d + 0.03;
    }
    for (let i = 0; i < 3; i++) this.note(out, a + i * 0.035, 0.03, 5200 + Math.random() * 1500, 4200, 0.02);
    return a - t + 0.2;
  }
  goldfinch(out, t) { // jilguero: trino alegre y muy rápido
    const n = 8 + (Math.random() * 10 | 0); let a = t;
    for (let i = 0; i < n; i++) { const f = 3800 + Math.random() * 2600, d = 0.03 + Math.random() * 0.05; this.note(out, a, d, f, f * (Math.random() < 0.5 ? 1.3 : 0.75), 0.03, f * 0.04, 45); a += d + 0.012; }
    return a - t;
  }
  lark(out, t) { // alondra en el campo: gorjeo largo y continuo, en lo alto
    let a = t; const end = t + 2 + Math.random() * 2;
    while (a < end) { const f = 2600 + Math.random() * 2400, d = 0.04 + Math.random() * 0.07; this.note(out, a, d, f, f * (0.8 + Math.random() * 0.5), 0.022, f * 0.03, 35); a += d + 0.008; }
    return a - t;
  }
  cuckoo(out, t) { // cuco a lo lejos: cu-cú
    for (let i = 0; i < 2 + (Math.random() * 3 | 0); i++) { const a = t + i * 0.9; this.note(out, a, 0.22, 700, 680, 0.07); this.note(out, a + 0.3, 0.32, 575, 555, 0.07); }
    return 3;
  }
  hoopoe(out, t) { // abubilla: up-up-up grave
    for (let r = 0; r < 2 + (Math.random() * 2 | 0); r++) for (let i = 0; i < 3; i++) { const a = t + r * 1.1 + i * 0.16; this.note(out, a, 0.09, 420, 380, 0.08, 0, 0, 'triangle'); }
    return 3;
  }
  chirp(hour = 12, open = false) {
    const t = this.ctx.currentTime + 0.02, dist = Math.random(), out = this.birdOut(Math.random() * 1.6 - 0.8, dist), r = Math.random();
    if (open) return r < 0.45 ? this.lark(out, t) : r < 0.6 ? this.hoopoe(out, t) : r < 0.75 ? this.cuckoo(this.birdOut(Math.random() * 1.6 - 0.8, 0.9), t) : this.goldfinch(out, t);
    return r < 0.45 ? this.sparrow(out, t) : r < 0.7 ? this.blackbird(out, t) : r < 0.85 ? this.goldfinch(out, t) : r < 0.93 ? this.hoopoe(out, t) : this.cuckoo(this.birdOut(Math.random() * 1.6 - 0.8, 0.9), t);
  }
  bark(vol) { // ladrido: golpe de ruido grave con un poco de tono
    const t = this.ctx.currentTime;
    for (let i = 0; i < 1 + (Math.random() * 3 | 0); i++) { const s = t + i * 0.32; this.burst(s, 0.16, vol, 700); this.tone(380, s, 0.14, vol * 0.5, 'sawtooth', null, 0.7); }
  }
  pop(vol) { const t = this.ctx.currentTime; this.burst(t, 0.5, vol, 400, 'lowpass'); this.tone(90, t, 0.4, vol * 0.6, 'sine', null, 0.5); }
  whistle(vol) { const t = this.ctx.currentTime; this.tone(900, t, 1.1, vol * 0.3, 'sine', null, 2.2); }
  // pasodoble de verbena: acordeón (sierra + cuadrada), bajo y caja
  music(t0) {
    const out = this.musicG, beat = 0.42;
    const mel = [69, 71, 72, 74, 76, 76, 74, 72, 71, 72, 74, 71, 69, 0, 64, 0, 69, 71, 72, 74, 76, 77, 76, 74, 72, 71, 69, 68, 69, 0, 0, 0];
    const bass = [45, 52, 45, 52, 50, 57, 52, 56, 45, 52, 45, 52, 50, 52, 45, 45];
    const hz = (m) => 440 * 2 ** ((m - 69) / 12);
    mel.forEach((m, i) => { if (m) { const t = t0 + i * beat / 2; this.tone(hz(m), t, beat * 0.48, 0.05, 'sawtooth', out); this.tone(hz(m) * 1.004, t, beat * 0.48, 0.03, 'square', out); } });
    bass.forEach((m, i) => { const t = t0 + i * beat; this.tone(hz(m), t, beat * 0.4, 0.09, 'triangle', out); if (i % 2) this.burst(t, 0.08, 0.06, 2500, 'highpass', out); });
    return mel.length * beat / 2;
  }
  update(dt, { day, night, rain, wind, siren, music, inside, hour = 12, open = false }) {
    if (!this.init()) return;
    const ctx = this.ctx, now = ctx.currentTime, mute = inside ? 0.15 : 1;
    this.rainG.gain.setTargetAtTime(rain * 0.16 * mute, now, 0.5);
    this.windG.gain.setTargetAtTime(wind * 0.08 * mute, now, 0.8);
    // grillos: cri-cri a pulsos
    const cr = night * (1 - rain) * 0.035 * mute * (Math.sin(now * 40) > 0.3 && Math.sin(now * 2.1) > -0.2 ? 1 : 0);
    this.crickG.gain.setTargetAtTime(cr, now, 0.01);
    // sirena: alterna dos tonos
    this.sirenO.frequency.setTargetAtTime((now % 1.1) < 0.55 ? 680 : 900, now, 0.02);
    this.sirenG.gain.setTargetAtTime(siren * 0.06, now, 0.1);
    // pájaros y perros de vez en cuando
    // pájaros: más al amanecer (el coro del alba) y a media tarde; casi nada en las horas de calor
    this.t.bird -= dt;
    if (this.t.bird <= 0) {
      const busy = hour > 5.5 && hour < 9.5 ? 1 : hour > 17 && hour < 20.5 ? 0.7 : 0.35;
      this.t.bird = (0.8 + Math.random() * 4) / busy;
      if (day > 0.4 && rain < 0.3 && wind < 0.4 && !inside) this.t.bird += Math.min(3, this.chirp(hour, open) * 0.5);
    }
    this.t.bark -= dt; if (this.t.bark <= 0) { this.t.bark = 12 + Math.random() * 30; if (night > 0.5 && !inside) this.bark(0.06 + Math.random() * 0.06); }
    // música de verbena en bucle mientras dure la fiesta
    this.musicG.gain.setTargetAtTime(music * 0.9, now, 0.4);
    if (music > 0.01) { this.t.music -= dt; if (this.t.music <= 0.2) { this.t.music += this.music(now + Math.max(0, this.t.music)); } } else this.t.music = 0;
  }
}

// Avioneta: motor de 4 cilindros a pistón con hélice bipala. El zumbido de la hélice (paso de pala) late
// contra el escape, más el aire que crece con la velocidad.
export class PlaneSound {
  constructor(engine) { this.engine = engine; }
  init() {
    const ctx = this.engine.ctx; if (!ctx) return false; if (this.ctx) return true; this.ctx = ctx;
    const out = this.out = ctx.createGain(); out.gain.value = 0; out.connect(ctx.destination);
    // escape: pulsos de explosión (onda rica en armónicos), saturada y filtrada
    const re = new Float32Array(32), im = new Float32Array(32);
    for (let n = 1; n < 32; n++) im[n] = (n % 2 ? 1 : 0.6) / Math.pow(n, 1.1);
    const exh = this.exh = ctx.createOscillator(); exh.setPeriodicWave(ctx.createPeriodicWave(re, im));
    const eg = ctx.createGain(); eg.gain.value = 0.35;
    const elp = this.elp = ctx.createBiquadFilter(); elp.type = 'lowpass'; elp.frequency.value = 900; elp.Q.value = 0.8;
    exh.connect(eg); eg.connect(elp);
    // hélice: zumbido grave del paso de pala, que modula (late) el volumen del escape
    const prop = this.prop = ctx.createOscillator(); prop.type = 'sawtooth';
    const pg = ctx.createGain(); pg.gain.value = 0.25; const plp = ctx.createBiquadFilter(); plp.type = 'lowpass'; plp.frequency.value = 260;
    prop.connect(plp); plp.connect(pg);
    const am = ctx.createGain(); am.gain.value = 0.7; const lfo = this.lfo = ctx.createOscillator(); lfo.type = 'sine';
    const lg = ctx.createGain(); lg.gain.value = 0.3; lfo.connect(lg); lg.connect(am.gain);
    elp.connect(am); pg.connect(am); am.connect(out);
    // aire y cabina: ruido filtrado
    const nb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = nb.getChannelData(0); let last = 0;
    for (let i = 0; i < d.length; i++) { last = (last + 0.05 * (Math.random() * 2 - 1)) / 1.05; d[i] = last * 3; }
    const ns = ctx.createBufferSource(); ns.buffer = nb; ns.loop = true;
    const nf = this.nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = 600; nf.Q.value = 0.5;
    const ng = this.ng = ctx.createGain(); ng.gain.value = 0; ns.connect(nf); nf.connect(ng); ng.connect(ctx.destination);
    for (const o of [exh, prop, lfo, ns]) o.start();
    return true;
  }
  // on: motor encendido; throttle 0..1; speed m/s
  update(on, throttle, speed) {
    if (!this.init()) return;
    const t = this.ctx.currentTime, rpm = 900 + throttle * 1800 + Math.min(300, speed * 4); // ralentí ~900, despegue ~2700 rpm
    const fire = rpm / 60 * 2, blade = rpm / 60 * 2; // 4 cilindros (2 explosiones por vuelta) y hélice de 2 palas
    this.exh.frequency.setTargetAtTime(fire, t, 0.15); this.prop.frequency.setTargetAtTime(blade * 0.5, t, 0.15);
    this.lfo.frequency.setTargetAtTime(blade * 0.25 + 1.3, t, 0.2); // batido lento entre hélice y escape
    this.elp.frequency.setTargetAtTime(500 + throttle * 1500, t, 0.2);
    this.out.gain.setTargetAtTime(on ? 0.09 + throttle * 0.1 : 0, t, on ? 0.3 : 0.6);
    this.nf.frequency.setTargetAtTime(400 + speed * 18, t, 0.3);
    this.ng.gain.setTargetAtTime(on ? Math.min(0.12, speed * 0.0025) : 0, t, 0.4);
  }
}
