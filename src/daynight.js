// Ciclo de día y noche: sol, cielo, crepúsculos graduales, estrellas por magnitud, luna con fases,
// estrellas fugaces, farolas y ventanas encendidas.
import * as THREE from 'three';
import { night } from './world.js';

const DAY_FOG = new THREE.Color(0xc9d6e2), DUSK_FOG = new THREE.Color(0xd9a77f), NIGHT_FOG = new THREE.Color(0x070b14);
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const SYNODIC = 29.530588, NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14); // luna nueva de referencia

// elevación y azimut (grados) de un astro que sale a las `rise` y se pone a las `set`, con `peak` grados al sur
function arc(hour, rise = 6, set = 20, peak = 62, low = 28) {
  const day = set - rise, h = ((hour - rise) % 24 + 24) % 24;
  if (h <= day) { const f = h / day; return { elev: Math.sin(f * Math.PI) * peak, az: 80 + f * 200 }; }
  const f = (h - day) / (24 - day); // por debajo del horizonte, continuo
  return { elev: -Math.sin(f * Math.PI) * low, az: 280 + f * 160 };
}
const dirFrom = (v, { elev, az }) => {
  const e = THREE.MathUtils.degToRad(elev), a = THREE.MathUtils.degToRad(az);
  return v.set(Math.sin(a) * Math.cos(e), Math.sin(e), -Math.cos(a) * Math.cos(e));
};

function moonTexture(phase) {
  // fase 0 = nueva, 0.5 = llena. Se dibuja la parte iluminada con el terminador como elipse.
  const S = 128, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d'), r = S / 2 - 4;
  g.translate(S / 2, S / 2);
  const glow = g.createRadialGradient(0, 0, r * 0.9, 0, 0, S / 2); glow.addColorStop(0, 'rgba(220,225,255,0.25)'); glow.addColorStop(1, 'rgba(220,225,255,0)');
  g.fillStyle = glow; g.fillRect(-S / 2, -S / 2, S, S);
  g.fillStyle = 'rgba(40,45,60,0.35)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill(); // cara oscura apenas visible
  const k = Math.cos(phase * Math.PI * 2), waxing = phase < 0.5;
  g.fillStyle = '#f2f0e6'; g.beginPath();
  g.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, !waxing);           // borde iluminado
  g.ellipse(0, 0, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) === waxing); // terminador
  g.fill();
  g.fillStyle = 'rgba(120,120,130,0.25)'; // mares
  for (const [x, y, rr] of [[-12, -14, 12], [10, -4, 9], [-4, 14, 10], [16, 18, 6]]) { g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export class DayNight {
  constructor({ scene, sky, sun, hemi, renderer, isMobile }) {
    Object.assign(this, { scene, sky, sun, hemi, renderer });
    this.hour = 12;                // empieza a mediodía
    this.minutesPerHour = 50 / 60; // 1 hora de juego = 50 s reales (la noche cerrada pasa el doble de rápido)
    this.day = 0;
    this.sunDir = new THREE.Vector3(); this.moonDir = new THREE.Vector3(); this.light = this.sunDir;
    this.n = 0;                    // 0 = día, 1 = noche cerrada

    // cúpula que oscurece el cielo poco a poco (el shader del cielo no llega al negro)
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(3500, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, transparent: true, depthWrite: false, fog: false,
      uniforms: { uN: { value: 0 }, uTop: { value: new THREE.Color(0x02040b) }, uHor: { value: new THREE.Color(0x0d1626) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform float uN; uniform vec3 uTop; uniform vec3 uHor; varying vec3 vP; void main(){ float h = clamp(vP.y, 0.0, 1.0); gl_FragColor = vec4(mix(uHor, uTop, sqrt(h)), uN); }',
    }));
    this.dome.renderOrder = -2; scene.add(this.dome);

    // estrellas con magnitud: las brillantes salen primero, las débiles solo con noche cerrada
    const N = isMobile ? 1400 : 2600, p = new Float32Array(N * 3), mag = new Float32Array(N), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 0.97);
      p.set([Math.sin(ph) * Math.cos(th) * 3000, Math.cos(ph) * 3000, Math.sin(ph) * Math.sin(th) * 3000], i * 3);
      mag[i] = Math.pow(Math.random(), 0.45); // muchas más débiles que brillantes
      const t = Math.random(); col.set(t < 0.15 ? [1, 0.85, 0.7] : t < 0.3 ? [0.75, 0.85, 1] : [1, 1, 1], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('aMag', new THREE.BufferAttribute(mag, 1)); g.setAttribute('aCol', new THREE.BufferAttribute(col, 3));
    this.starMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending,
      uniforms: { uN: { value: 0 }, uTime: { value: 0 }, uPx: { value: Math.min(2, devicePixelRatio) } },
      vertexShader: `attribute float aMag; attribute vec3 aCol; uniform float uN; uniform float uTime; uniform float uPx; varying float vA; varying vec3 vC;
        void main(){
          float appear = 0.15 + aMag * 0.8;            // umbral de oscuridad a partir del que se ve
          vA = clamp((uN - appear) * 6.0, 0.0, 1.0) * (1.0 - aMag * 0.55);
          vA *= 0.8 + 0.2 * sin(uTime * (2.0 + aMag * 5.0) + position.x); // centelleo
          vC = aCol;
          gl_PointSize = (3.2 - aMag * 2.2) * uPx;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `varying float vA; varying vec3 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vC, a * vA); }`,
    });
    this.stars = new THREE.Points(g, this.starMat); this.stars.renderOrder = -1; this.stars.frustumCulled = false; scene.add(this.stars);

    // luna con la fase real de hoy, que avanza un poco cada día de juego
    this.phase0 = ((Date.now() - NEW_MOON_REF) / 86400000 / SYNODIC) % 1;
    this.moon = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, fog: false }));
    this.moon.scale.setScalar(160); this.moon.renderOrder = -1; scene.add(this.moon);
    this.setPhase(this.phase0);

    // estrella fugaz
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    sg.setAttribute('color', new THREE.BufferAttribute(new Float32Array([1, 1, 1, 0, 0, 0]), 3));
    this.meteor = new THREE.Line(sg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, fog: false, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.meteor.frustumCulled = false; scene.add(this.meteor); this.nextMeteor = 8; this.m = null;

    // luces de farola: unas pocas luces puntuales que se mueven a las farolas más cercanas
    this.lampLights = [];
    for (let i = 0; i < (isMobile ? 6 : 10); i++) {
      const l = new THREE.PointLight(0xffd29a, 0, 36, 1.5); scene.add(l); this.lampLights.push(l);
    }
    this.lamps = []; this.lastLampPick = -1;
  }
  setPhase(ph) {
    this.phase = ph; const key = Math.round(ph * 28);
    if (key === this._phaseKey) return; this._phaseKey = key;
    this.moon.material.map?.dispose(); this.moon.material.map = moonTexture(ph); this.moon.material.needsUpdate = true;
  }
  setLamps(lamps) { this.lamps = lamps || []; }
  skip(h = 1) { this.advance(h); }
  advance(h) { this.hour += h; while (this.hour >= 24) { this.hour -= 24; this.day++; } }
  get clock() { const h = Math.floor(this.hour), m = Math.floor((this.hour - h) * 60); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }
  get isDusk() { return this.hour > 18.5 && this.hour < 22.5; }

  update(dt, focus) {
    this.advance(dt / 60 / this.minutesPerHour * (this.n > 0.97 ? 2 : 1));
    const s = arc(this.hour); dirFrom(this.sunDir, s);
    const elev = s.elev;
    // luna: sale unas 24·fase horas más tarde que el sol
    const ph = (this.phase0 + this.day / SYNODIC + this.hour / 24 / SYNODIC) % 1; this.setPhase(ph);
    const mo = arc(this.hour - ph * 24, 6, 20, 55, 28); dirFrom(this.moonDir, mo);
    const illum = 0.5 - 0.5 * Math.cos(ph * Math.PI * 2); // 0 nueva, 1 llena

    // crepúsculo gradual: civil (0..-6°), náutico (-6..-12°)
    const day = smooth(-3, 10, elev), dusk = (1 - smooth(2, 16, elev)) * smooth(-10, 1, elev);
    this.n = 1 - smooth(-12, 1, elev);
    const su = this.sky.material.uniforms; su.sunPosition.value.copy(this.sunDir);
    su.rayleigh.value = 1.2 + dusk * 1.6; su.turbidity.value = 4 + dusk * 5;
    this.dome.material.uniforms.uN.value = Math.pow(this.n, 1.3) * 0.97;
    this.dome.position.copy(focus);

    // luz direccional: sol de día; de noche, la luna si está alta (según su fase)
    if (day > 0.02) {
      this.sun.color.setRGB(1, 0.94 - dusk * 0.25, 0.86 - dusk * 0.45);
      this.sun.intensity = 2.6 * day;
      this.light = this.sunDir;
    } else {
      const up = mo.elev > 3;
      this.sun.color.setRGB(0.55, 0.65, 1);
      this.sun.intensity = up ? 0.15 + 0.4 * illum : 0.12;
      this.light = up ? this.moonDir : (this._zen || (this._zen = new THREE.Vector3(-0.3, 0.9, 0.3).normalize()));
    }
    this.hemi.intensity = 0.45 + 0.45 * day + 0.15 * illum * this.n;
    this.hemi.color.setRGB(0.75 - 0.27 * this.n, 0.83 - 0.22 * this.n, 0.93 - 0.08 * this.n);
    const fog = this.scene.fog;
    fog.color.copy(DAY_FOG).lerp(DUSK_FOG, dusk * 0.7).lerp(NIGHT_FOG, this.n);
    fog.near = 250 - 110 * this.n; fog.far = 1600 - 650 * this.n;
    this.renderer.toneMappingExposure = 0.9 + 0.05 * this.n;

    // estrellas y luna
    const t = performance.now() / 1000;
    this.starMat.uniforms.uN.value = this.n; this.starMat.uniforms.uTime.value = t;
    this.stars.position.copy(focus);
    this.moon.position.copy(focus).addScaledVector(this.moonDir, 3000);
    this.moon.visible = mo.elev > -3 && illum > 0.03;
    this.moon.material.opacity = 0.35 + 0.65 * smooth(0.1, 0.6, this.n);

    // estrella fugaz de vez en cuando
    if (this.n > 0.85) {
      this.nextMeteor -= dt;
      if (this.nextMeteor <= 0 && !this.m) {
        this.nextMeteor = 12 + Math.random() * 30;
        const th = Math.random() * Math.PI * 2, el = 0.5 + Math.random() * 0.6, d = new THREE.Vector3(Math.cos(th) * Math.cos(el), Math.sin(el), Math.sin(th) * Math.cos(el));
        const dir = new THREE.Vector3(-Math.sin(th), -0.35, Math.cos(th)).normalize();
        this.m = { p: d.multiplyScalar(2800), dir, t: 0, life: 0.6 + Math.random() * 0.5 };
      }
    }
    if (this.m) {
      const m = this.m; m.t += dt; const k = m.t / m.life;
      const head = m.p.clone().addScaledVector(m.dir, k * 900), tail = head.clone().addScaledVector(m.dir, -140);
      const a = this.meteor.geometry.attributes.position; a.setXYZ(0, head.x, head.y, head.z); a.setXYZ(1, tail.x, tail.y, tail.z); a.needsUpdate = true;
      this.meteor.position.copy(focus); this.meteor.material.opacity = Math.sin(Math.min(1, k) * Math.PI);
      if (k >= 1) { this.m = null; this.meteor.material.opacity = 0; }
    }

    // farolas y ventanas
    const on = smooth(0.25, 0.6, this.n);
    for (const m of night.lamps) m.emissiveIntensity = 4 * on;
    for (const m of night.windows) m.emissiveIntensity = 0.9 * on;
    const now = performance.now();
    if (now - this.lastLampPick > 400) {
      this.lastLampPick = now;
      const near = this.lamps.map(l => [l, (l[3] - focus.x) ** 2 + (l[5] - focus.z) ** 2]).sort((a, b) => a[1] - b[1]);
      this.lampLights.forEach((L, i) => { const l = near[i]?.[0]; if (l) L.position.set(l[3], l[4] - 0.3, l[5]); L.userData.ok = !!l; });
    }
    for (const L of this.lampLights) L.intensity = L.userData.ok ? 22 * on : 0;
  }
}
