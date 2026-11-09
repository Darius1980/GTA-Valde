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
  chirp() { // trino de pájaro: dos o tres notas rápidas que suben
    const t = this.ctx.currentTime, f0 = 2600 + Math.random() * 1800, n = 2 + (Math.random() * 3 | 0);
    for (let i = 0; i < n; i++) this.tone(f0 * (1 + i * 0.08), t + i * 0.09, 0.07, 0.025, 'sine', null, 1.25);
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
  update(dt, { day, night, rain, wind, siren, music, inside }) {
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
    this.t.bird -= dt; if (this.t.bird <= 0) { this.t.bird = 1.5 + Math.random() * 5; if (day > 0.5 && rain < 0.3 && !inside) this.chirp(); }
    this.t.bark -= dt; if (this.t.bark <= 0) { this.t.bark = 12 + Math.random() * 30; if (night > 0.5 && !inside) this.bark(0.06 + Math.random() * 0.06); }
    // música de verbena en bucle mientras dure la fiesta
    this.musicG.gain.setTargetAtTime(music * 0.9, now, 0.4);
    if (music > 0.01) { this.t.music -= dt; if (this.t.music <= 0.2) { this.t.music += this.music(now + Math.max(0, this.t.music)); } } else this.t.music = 0;
  }
}
