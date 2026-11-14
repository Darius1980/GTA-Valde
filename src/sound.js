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
    this.dropG = loop('highpass', 3500, 0.5);  // gotas que golpean (tejados, hojas)
    // sirena: dos tonos alternos
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 680;
    const sf = ctx.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.value = 1500; sf.Q.value = 2;
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
  // ---- sonido en el mundo: cada fuente tiene su sitio; el volumen, el lado (izquierda/derecha) y lo apagado
  // dependen de dónde esté respecto a ti, y si la fuente se mueve (un pájaro que pasa) se va recalculando
  spot(x, z) {
    const L = this.lis || { x: 0, z: 0, fx: 0, fz: 1 }, dx = x - L.x, dz = z - L.z, d = Math.hypot(dx, dz) || 0.01;
    return { g: 1 / (1 + d / 10) ** 1.3, pan: Math.max(-0.9, Math.min(0.9, (dx * -L.fz + dz * L.fx) / d)), lp: 600 + 11000 * Math.exp(-d / 90), d };
  }
  srcOut(x0, z0, x1 = x0, z1 = z0, dur = 0, life = 6) {
    const ctx = this.ctx, t = ctx.currentTime, g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null, a = this.spot(x0, z0);
    g.gain.setValueAtTime(a.g, t); lp.frequency.setValueAtTime(a.lp, t); p?.pan.setValueAtTime(a.pan, t);
    if (dur > 0) for (let k = 1; k <= 8; k++) { const f = k / 8, b = this.spot(x0 + (x1 - x0) * f, z0 + (z1 - z0) * f), tk = t + dur * f; g.gain.linearRampToValueAtTime(b.g, tk); lp.frequency.linearRampToValueAtTime(b.lp, tk); p?.pan.linearRampToValueAtTime(b.pan, tk); }
    if (p) { g.connect(p); p.connect(lp); } else g.connect(lp);
    lp.connect(ctx.destination); if (this.engine.reverb && a.d > 25) { const w = ctx.createGain(); w.gain.value = Math.min(0.8, a.d / 200); lp.connect(w); w.connect(this.engine.reverb()); }
    setTimeout(() => { try { g.disconnect(); lp.disconnect(); p?.disconnect(); } catch (_) {} }, (life + dur) * 1000);
    return g;
  }
  around(rmin, rmax) { const L = this.lis || { x: 0, z: 0 }, a = Math.random() * 6.283, r = rmin + Math.random() * (rmax - rmin); return [L.x + Math.cos(a) * r, L.z + Math.sin(a) * r]; }
  // un pájaro en un árbol cercano o lejano; a veces pasa volando por encima mientras canta
  birdOut() {
    const [x, z] = this.around(6, 120);
    if (Math.random() < 0.35) { const a = Math.random() * 6.283, v = 8 + Math.random() * 6; return this.srcOut(x, z, x + Math.cos(a) * v * 3, z + Math.sin(a) * v * 3, 3); }
    return this.srcOut(x, z);
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
  swallow(out, t) { // golondrina: gorjeo rápido y chirriante, con un "trrr" al final; suele pasar volando
    let a = t; const n = 10 + (Math.random() * 12 | 0);
    for (let i = 0; i < n; i++) { const f = 2800 + Math.random() * 3200, d = 0.025 + Math.random() * 0.06; this.note(out, a, d, f, f * (0.7 + Math.random() * 0.6), 0.03, f * 0.05, 60); a += d + 0.01 + Math.random() * 0.03; }
    for (let i = 0; i < 12; i++) this.note(out, a + i * 0.018, 0.012, 4200, 3900, 0.02); // el carraspeo final
    return a - t + 0.3;
  }
  swift(out, t) { // vencejos: chillidos agudos en grupo, a media tarde
    for (let i = 0; i < 2 + (Math.random() * 3 | 0); i++) { const a = t + i * (0.2 + Math.random() * 0.3), f = 6000 + Math.random() * 1500; this.note(out, a, 0.35, f, f * 0.85, 0.025, 400, 70, 'sawtooth'); }
    return 1.5;
  }
  // aves nocturnas
  scops(out, t) { // autillo: "tiú" aflautado, siempre igual, cada dos o tres segundos
    const f = 1150 + Math.random() * 120; for (let i = 0; i < 3 + (Math.random() * 4 | 0); i++) this.note(out, t + i * 2.6, 0.22, f * 1.03, f * 0.97, 0.07); return 9;
  }
  tawny(out, t) { // cárabo: "uuu ... u-u-uuuuu" grave y trémulo
    this.note(out, t, 0.7, 520, 480, 0.08, 6, 6); this.note(out, t + 1.6, 0.18, 470, 450, 0.06); this.note(out, t + 1.85, 0.18, 480, 460, 0.06); this.note(out, t + 2.1, 1.4, 500, 440, 0.08, 14, 8);
    return 6;
  }
  littleOwl(out, t) { // mochuelo: "kiuu" maullado que sube y baja
    for (let i = 0; i < 1 + (Math.random() * 3 | 0); i++) { const a = t + i * 1.8; this.note(out, a, 0.18, 1100, 1500, 0.05); this.note(out, a + 0.17, 0.3, 1500, 1050, 0.05); }
    return 6;
  }
  nightjar(out, t) { // chotacabras: ronroneo mecánico largo
    const o = this.ctx.createOscillator(), g = this.ctx.createGain(), lfo = this.ctx.createOscillator(), lg = this.ctx.createGain(), d = 3 + Math.random() * 4;
    o.frequency.value = 1300 + Math.random() * 200; lfo.frequency.value = 38 + Math.random() * 6; lg.gain.value = 0.5; lfo.connect(lg); lg.connect(g.gain);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.3); g.gain.setValueAtTime(0.5, t + d - 0.3); g.gain.linearRampToValueAtTime(0, t + d);
    const v = this.ctx.createGain(); v.gain.value = 0.05; o.connect(g); g.connect(v); v.connect(out); o.start(t); lfo.start(t); o.stop(t + d + 0.1); lfo.stop(t + d + 0.1);
    return d + 2;
  }
  nightBird() {
    const t = this.ctx.currentTime + 0.02, [x, z] = this.around(40, 300), out = this.srcOut(x, z, x, z, 0, 12), r = Math.random(); out.gain.value *= 3;
    return r < 0.4 ? this.scops(out, t) : r < 0.65 ? this.tawny(out, t) : r < 0.85 ? this.littleOwl(out, t) : this.nightjar(out, t);
  }
  // animales de la granja y del pueblo, desde donde están
  cluck(x, z) { // gallina: co-co-co... y a veces el cacareo largo
    const out = this.srcOut(x, z), t = this.ctx.currentTime + 0.02; out.gain.value *= 3;
    const n = 2 + (Math.random() * 4 | 0);
    for (let i = 0; i < n; i++) { const a = t + i * (0.18 + Math.random() * 0.1), f = 480 + Math.random() * 120; this.note(out, a, 0.07, f * 1.2, f, 0.06, 0, 0, 'sawtooth'); }
    if (Math.random() < 0.25) this.note(out, t + n * 0.25, 0.5, 700, 900, 0.05, 30, 9, 'sawtooth');
  }
  bleat(x, z) { // oveja: "beee" con el temblor de la voz
    const ctx = this.ctx, out = this.srcOut(x, z), t = ctx.currentTime + 0.02, f = 260 + Math.random() * 160, d = 0.5 + Math.random() * 0.5; out.gain.value *= 3;
    const o = ctx.createOscillator(), g = ctx.createGain(), am = ctx.createOscillator(), ag = ctx.createGain(), f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(f, t); o.frequency.linearRampToValueAtTime(f * 1.06, t + d * 0.3); o.frequency.linearRampToValueAtTime(f * 0.92, t + d);
    am.frequency.value = 6.5 + Math.random() * 2; ag.gain.value = 0.35; am.connect(ag); ag.connect(g.gain);
    f1.type = 'bandpass'; f1.frequency.value = 900; f1.Q.value = 3; f2.type = 'bandpass'; f2.frequency.value = 2400; f2.Q.value = 4;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.05); g.gain.setValueAtTime(0.5, t + d * 0.7); g.gain.linearRampToValueAtTime(0, t + d);
    const v = ctx.createGain(); v.gain.value = 0.16; o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(v); v.connect(out);
    o.start(t); am.start(t); o.stop(t + d + 0.1); am.stop(t + d + 0.1);
  }
  cowbell(x, z) { // cencerro de oveja: chapa de hierro, golpe hueco e inarmónico
    const out = this.srcOut(x, z, x, z, 0, 3), t = this.ctx.currentTime + Math.random() * 0.05, f = 900 + Math.random() * 500; out.gain.value *= 2;
    for (const [r, a, d] of [[1, 0.05, 0.25], [1.48, 0.035, 0.18], [2.3, 0.03, 0.12], [3.7, 0.015, 0.07]]) this.note(out, t, d, f * r, f * r * 0.995, a);
  }
  meow(x, z) { // gato de noche
    const out = this.srcOut(x, z), t = this.ctx.currentTime + 0.02, f = 600 + Math.random() * 200; out.gain.value *= 3;
    this.note(out, t, 0.6, f, f * 0.7, 0.05, 20, 5, 'sawtooth');
  }
  chirp(hour = 12, open = false) {
    const t = this.ctx.currentTime + 0.02, out = this.birdOut(), r = Math.random(); out.gain.value *= 3; const far = () => { const [x, z] = this.around(150, 400); return this.srcOut(x, z); };
    if (open) return r < 0.4 ? this.lark(out, t) : r < 0.55 ? this.hoopoe(out, t) : r < 0.7 ? this.cuckoo(far(), t) : r < 0.85 ? this.swallow(out, t) : this.goldfinch(out, t);
    if (hour > 18 && hour < 21.5 && r < 0.15) return this.swift(out, t);
    return r < 0.35 ? this.sparrow(out, t) : r < 0.55 ? this.swallow(out, t) : r < 0.72 ? this.blackbird(out, t) : r < 0.86 ? this.goldfinch(out, t) : r < 0.94 ? this.hoopoe(out, t) : this.cuckoo(far(), t);
  }
  // ladrido: "guau" con la voz que cae de tono, pasada por los formantes de la boca del perro, y algo de aire
  barkAt(vol, x, z) {
    const ctx = this.ctx, t0 = ctx.currentTime + 0.02, out = this.srcOut(x, z), f0 = 380 + Math.random() * 220;
    out.gain.value *= 4;
    for (let i = 0; i < 1 + (Math.random() * 3 | 0); i++) {
      const t = t0 + i * (0.28 + Math.random() * 0.12), o = ctx.createOscillator(), g = ctx.createGain(), f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(f0 * 0.8, t); o.frequency.linearRampToValueAtTime(f0 * 1.15, t + 0.03); o.frequency.exponentialRampToValueAtTime(f0 * 0.6, t + 0.16);
      f1.type = 'bandpass'; f1.frequency.value = 900; f1.Q.value = 2.5; f2.type = 'bandpass'; f2.frequency.value = 2300; f2.Q.value = 3;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol * 1.6, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0005, t + 0.2);
      o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(out); o.start(t); o.stop(t + 0.25);
      this.burst(t, 0.09, vol * 0.25, 1400, 'bandpass', out);
    }
  }
  // ruido con envolvente propia, hacia un nodo
  hiss(t, dur, vol, f0, f1, out, q = 1.5, type = 'bandpass') {
    const ctx = this.ctx, s = ctx.createBufferSource(); s.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur); f.Q.value = q;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.05, dur / 5)); g.gain.setValueAtTime(vol, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  fwOut(vol, pan = 0) { // salida de los fuegos: un poco de lado, con el eco del valle
    const ctx = this.ctx, g = ctx.createGain(); g.gain.value = vol; let n = g;
    if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); n = p; }
    n.connect(ctx.destination); if (this.engine.reverb) { const w = ctx.createGain(); w.gain.value = 1.6; n.connect(w); w.connect(this.engine.reverb()); }
    setTimeout(() => { try { g.disconnect(); } catch (_) {} }, 9000);
    return g;
  }
  // subida del cohete: siseo de la pólvora que se aleja; algunos llevan silbato
  whistle(vol) {
    const t = this.ctx.currentTime + 0.01, out = this.fwOut(vol * 2, Math.random() * 0.8 - 0.4);
    this.hiss(t, 1.3, 0.5, 2500, 5200, out, 0.8);
    this.hiss(t, 0.25, 0.8, 800, 400, out, 0.7, 'lowpass'); // el ¡fsh! de la salida
    if (Math.random() < 0.35) this.note(out, t + 0.1, 1.2, 1100, 2600, 0.12, 40, 18);
  }
  // estallido: golpe seco, retumbo grave que llega un poco después, eco y chisporroteo de las chispas
  pop(vol) {
    const ctx = this.ctx, t = ctx.currentTime + 0.25, out = this.fwOut(vol * 2.2, Math.random() * 0.8 - 0.4);
    this.hiss(t, 0.18, 1, 3000, 900, out, 0.6, 'lowpass');
    this.hiss(t, 1.6, 0.9, 700, 90, out, 0.7, 'lowpass');
    const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(32, t + 0.9);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.9, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1); o.connect(g); g.connect(out); o.start(t); o.stop(t + 1.2);
    if (Math.random() < 0.6) for (let i = 0; i < 26 + Math.random() * 30; i++) { // chispas que crepitan
      const a = t + 0.35 + Math.random() * 1.6; this.hiss(a, 0.012 + Math.random() * 0.02, 0.15 + Math.random() * 0.25, 3000 + Math.random() * 4000, 2000, out, 2);
    }
  }
  // ---- verbena: pasodoble para acordeón con bajo y acordes ("chunda" de bajo y acorde), en sol mayor
  reed(out, f, t, dur, vol) { // acordeón: tres lengüetas algo desafinadas (el trémolo de musette) y fuelle suave
    const ctx = this.ctx, g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = Math.min(3200, f * 4.5); lp.Q.value = 0.4;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.035); g.gain.setValueAtTime(vol * 0.9, t + Math.max(0.04, dur - 0.06)); g.gain.linearRampToValueAtTime(0, t + dur + 0.05);
    g.connect(lp); lp.connect(out);
    for (const c of [-9, 0, 9]) { const o = ctx.createOscillator(); o.type = c ? 'sawtooth' : 'square'; o.frequency.value = f * 2 ** (c / 1200); const og = ctx.createGain(); og.gain.value = c ? 0.33 : 0.22; o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.1); }
  }
  music(t0) {
    const out = this.musicBus || (() => {
      const b = this.ctx.createGain(); b.gain.value = 1; b.connect(this.musicG);
      if (this.engine.reverb) { const w = this.ctx.createGain(); w.gain.value = 0.5; b.connect(w); w.connect(this.engine.reverb()); }
      return (this.musicBus = b);
    })();
    const e = 0.27, hz = (m) => 440 * 2 ** ((m - 69) / 12);
    const A = [[67,1],[71,1],[74,2], [79,1],[78,1],[76,1],[74,1], [72,1],[71,1],[69,2], [66,1],[69,1],[74,2], [78,1],[76,1],[74,1],[72,1], [71,1],[72,1],[74,1],[78,1], [79,2],[74,2], [71,2],[67,2],
      [72,1],[76,1],[79,2], [76,1],[74,1],[72,1],[76,1], [74,2],[71,2], [67,1],[71,1],[74,2], [78,2],[76,1],[74,1], [72,1],[71,1],[69,1],[66,1], [67,2],[71,2], [67,4]];
    const B = [[71,1],[76,1],[79,2], [78,1],[76,1],[74,1],[71,1], [72,1],[76,1],[81,2], [81,1],[79,1],[76,1],[72,1], [74,1],[78,1],[81,2], [79,1],[78,1],[76,1],[74,1], [71,2],[74,2], [79,4],
      [76,1],[79,1],[84,2], [83,1],[81,1],[79,1],[76,1], [74,2],[79,2], [76,1],[74,1],[71,1],[67,1], [69,1],[72,1],[76,2], [74,1],[72,1],[71,1],[69,1], [67,2],[71,1],[74,1], [79,4]];
    const CH = { G: [43, [59, 62, 67]], D: [38, [57, 60, 66]], C: [36, [60, 64, 67]], E: [40, [59, 64, 67]], A: [45, [57, 60, 64]] }; // bajo y acorde (re lleva la séptima)
    const harmA = 'GGDDDDGGCCGGDDGG', harmB = 'EEAADDGGCCGEADGG';
    this.part = ((this.part || 0) + 1) % 4; const useB = this.part === 2, mel = useB ? B : A, harm = useB ? harmB : harmA;
    let t = t0; for (const [m, n] of mel) { this.reed(out, hz(m), t, n * e * 0.92, 0.05); this.reed(out, hz(m - 12), t, n * e * 0.92, 0.012); t += n * e; }
    for (let bar = 0; bar < 16; bar++) {
      const [root, chord] = CH[harm[bar]], tb = t0 + bar * 4 * e, alt = bar % 2 ? 7 : 0;
      this.reed(out, hz(root + alt - (alt ? 12 : 0) + 12), tb, e * 1.4, 0.06);   // bajo en la parte fuerte
      for (const c of chord) this.reed(out, hz(c), tb + 2 * e, e * 0.8, 0.018); // acorde en la débil
      this.burst(tb + 2 * e, 0.05, 0.02, 6000, 'highpass', out); this.burst(tb + 2 * e + e, 0.03, 0.01, 6000, 'highpass', out); // escobillas suaves
    }
    return 64 * e;
  }
  update(dt, { day, night, rain, wind, siren, music, inside, hour = 12, open = false, lis = null, animals = null }) {
    if (lis) this.lis = lis;
    if (!this.init()) return;
    const ctx = this.ctx, now = ctx.currentTime, mute = inside ? 0.15 : 1;
    this.rainG.gain.setTargetAtTime(rain * 0.16 * mute, now, 0.5);
    this.windG.gain.setTargetAtTime(wind * 0.08 * mute, now, 0.8);
    // grillos: cri-cri a pulsos
    this.dropG.gain.setTargetAtTime(rain * 0.035 * mute * (0.6 + Math.random() * 0.8), now, 0.05);
    // grillos: cada uno con su tono, cri-cri de 3 o 4 golpecitos
    this.t.crick = (this.t.crick ?? 0) - dt;
    if (this.t.crick <= 0) {
      this.t.crick = 0.25 + Math.random() * 0.5;
      if (night > 0.5 && rain < 0.2 && !inside) {
        this.crickets = this.crickets || Array.from({ length: 6 }, () => [4200 + Math.random() * 900, ...this.around(3, 40)]);
        const c = this.crickets[Math.random() * 6 | 0]; if (this.spot(c[1], c[2]).d > 60) { const [x, z] = this.around(4, 40); c[1] = x; c[2] = z; } // te alejas: canta otro más cerca
        const f = c[0], out = this.srcOut(c[1], c[2], c[1], c[2], 0, 2), t = now + 0.02; out.gain.value *= 2.5;
        for (let i = 0; i < 3 + (Math.random() * 2 | 0); i++) this.note(out, t + i * 0.032, 0.018, f, f * 0.98, 0.03 * night);
      }
    }
    // sirena: alterna dos tonos
    this.sirenO.frequency.setTargetAtTime((now % 1.1) < 0.55 ? 680 : 900, now, 0.035);
    this.sirenG.gain.setTargetAtTime(siren * 0.06, now, 0.1);
    // pájaros y perros de vez en cuando
    // pájaros: más al amanecer (el coro del alba) y a media tarde; casi nada en las horas de calor
    this.t.bird -= dt;
    if (this.t.bird <= 0) {
      const busy = hour > 5.5 && hour < 9.5 ? 1 : hour > 17 && hour < 20.5 ? 0.7 : 0.35;
      this.t.bird = (0.8 + Math.random() * 4) / busy;
      if (day > 0.4 && rain < 0.3 && wind < 0.4 && !inside) this.t.bird += Math.min(3, this.chirp(hour, open) * 0.5);
      else if (night > 0.6 && rain < 0.3 && !inside && Math.random() < 0.5) this.t.bird += this.nightBird();
    }
    // animales del pueblo y del campo, cada uno desde su sitio
    if (animals && !inside && this.lis) {
      const L = this.lis, near = (list, r) => list.filter(a => a.mesh.visible && Math.hypot(a.pos.x - L.x, a.pos.z - L.z) < r);
      this.t.hen = (this.t.hen ?? 3) - dt;
      if (this.t.hen <= 0) { this.t.hen = 2 + Math.random() * 6; const h = near(animals.hens || [], 90); if (h.length && day > 0.3) { const a = h[Math.random() * h.length | 0]; this.cluck(a.pos.x, a.pos.z); } }
      const sh = near(animals.sheep || [], 300);
      this.t.bleat = (this.t.bleat ?? 4) - dt;
      if (this.t.bleat <= 0) { this.t.bleat = 3 + Math.random() * 7; if (sh.length) { const a = sh[Math.random() * sh.length | 0]; this.bleat(a.pos.x, a.pos.z); } }
      this.t.bell = (this.t.bell ?? 1) - dt;
      if (this.t.bell <= 0) { this.t.bell = 0.15 + Math.random() * 0.5; if (sh.length) { const a = sh[Math.random() * sh.length | 0]; if (a.speed > 0.1 || Math.random() < 0.35) this.cowbell(a.pos.x, a.pos.z); } }
      this.t.dog = (this.t.dog ?? 15) - dt;
      if (this.t.dog <= 0) { this.t.dog = (night > 0.5 ? 8 : 25) + Math.random() * 25; const d = near((animals.list || []).filter(a => a.kind === 'dog'), 160); if (d.length) { const a = d[Math.random() * d.length | 0]; this.barkAt(0.08, a.pos.x, a.pos.z); } }
      this.t.cat = (this.t.cat ?? 30) - dt;
      if (this.t.cat <= 0) { this.t.cat = 25 + Math.random() * 40; const c = near((animals.list || []).filter(a => a.kind === 'cat'), 100); if (c.length && night > 0.5) { const a = c[Math.random() * c.length | 0]; this.meow(a.pos.x, a.pos.z); } }
    }
    this.t.bark -= dt; if (this.t.bark <= 0) { this.t.bark = 12 + Math.random() * 30; if (night > 0.5 && !inside) { const [x, z] = this.around(120, 450); this.barkAt(0.08, x, z); } } // perros lejanos de otras casas
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
