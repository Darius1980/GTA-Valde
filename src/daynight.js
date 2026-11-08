// Ciclo de día y noche: sol, cielo, niebla, estrellas, farolas y ventanas encendidas.
import * as THREE from 'three';
import { night } from './world.js';

const DAY_FOG = new THREE.Color(0xc9d6e2), DUSK_FOG = new THREE.Color(0xd9a77f), NIGHT_FOG = new THREE.Color(0x0b1220);
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export class DayNight {
  constructor({ scene, sky, sun, hemi, renderer, isMobile }) {
    Object.assign(this, { scene, sky, sun, hemi, renderer });
    this.hour = 12;                // empieza a mediodía
    this.minutesPerHour = 50 / 60; // 1 hora de juego = 50 s reales (de noche, el doble de rápido)
    this.sunDir = new THREE.Vector3();
    this.n = 0;                    // 0 = día, 1 = noche cerrada
    // estrellas
    const N = 1600, p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = Math.random(), v = Math.random() * 0.95, th = u * Math.PI * 2, ph = Math.acos(v);
      p.set([Math.sin(ph) * Math.cos(th) * 3000, Math.cos(ph) * 3000, Math.sin(ph) * Math.sin(th) * 3000], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    this.starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false });
    this.stars = new THREE.Points(g, this.starMat); this.stars.renderOrder = -1; scene.add(this.stars);
    // luces de farola: unas pocas luces puntuales que se mueven a las farolas más cercanas
    this.lampLights = [];
    for (let i = 0; i < (isMobile ? 4 : 6); i++) {
      const l = new THREE.PointLight(0xffc77a, 0, 22, 1.6); scene.add(l); this.lampLights.push(l);
    }
    this.lamps = []; this.lastLampPick = -1;
  }
  setLamps(lamps) { this.lamps = lamps || []; }
  skip(h = 1) { this.hour = (this.hour + h) % 24; }
  get clock() { const h = Math.floor(this.hour), m = Math.floor((this.hour - h) * 60); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }

  update(dt, focus) {
    this.hour = (this.hour + dt / 60 / this.minutesPerHour * (this.n > 0.6 ? 2 : 1)) % 24;
    // sol: sale a las 6 por el este, mediodía al sur a 62°, se pone a las 20 por el oeste
    const f = (this.hour - 6) / 14; // 0..1 durante el día
    const elev = Math.sin(f * Math.PI) * 62 * (f >= 0 && f <= 1 ? 1 : 0) + (f < 0 || f > 1 ? -20 : 0);
    const az = THREE.MathUtils.degToRad(80 + f * 200); // desde el norte, sentido horario
    const el = THREE.MathUtils.degToRad(Math.max(elev, -10));
    this.sunDir.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
    const day = smooth(-4, 8, elev), dusk = (1 - smooth(4, 18, elev)) * smooth(-8, 2, elev);
    this.n = 1 - smooth(-6, 3, elev);
    const su = this.sky.material.uniforms; su.sunPosition.value.copy(this.sunDir);
    su.rayleigh.value = 1.2 + dusk * 1.5; su.turbidity.value = 4 + dusk * 4;

    // de noche la luz direccional hace de luna (azulada, débil y alta)
    if (day > 0.02) {
      this.sun.color.setRGB(1, 0.94 - dusk * 0.25, 0.86 - dusk * 0.45);
      this.sun.intensity = 2.6 * day;
      this.light = this.sunDir;
    } else {
      this.sun.color.setRGB(0.55, 0.65, 1); this.sun.intensity = 0.45;
      this.light = this._moon || (this._moon = new THREE.Vector3(-0.4, 0.8, 0.45).normalize());
    }
    this.hemi.intensity = 0.22 + 0.68 * day;
    this.hemi.color.setRGB(0.75 - 0.4 * this.n, 0.83 - 0.35 * this.n, 0.93 - 0.2 * this.n);
    const fog = this.scene.fog;
    fog.color.copy(DAY_FOG).lerp(DUSK_FOG, dusk * 0.7).lerp(NIGHT_FOG, this.n);
    fog.near = 250 - 170 * this.n; fog.far = 1600 - 1000 * this.n;
    this.renderer.toneMappingExposure = 0.9 - 0.15 * this.n;
    this.starMat.opacity = smooth(0.5, 1, this.n);
    this.stars.position.copy(focus);

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
    for (const L of this.lampLights) L.intensity = L.userData.ok ? 9 * on : 0;
  }
}
