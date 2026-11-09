// Tiempo: despejado, nubes, niebla, lluvia y nieve, con cambios graduales.
// La lluvia moja el suelo (brilla y se oscurece) y la nieve lo cubre poco a poco.
import * as THREE from 'three';

const KINDS = {
  clear:  { icon: '☀️', name: 'Despejado', cloud: 0,   fog: 0,    rain: 0, snow: 0 },
  cloudy: { icon: '☁️', name: 'Nublado',   cloud: 0.7, fog: 0.1,  rain: 0, snow: 0 },
  fog:    { icon: '🌫️', name: 'Niebla',    cloud: 0.6, fog: 1,    rain: 0, snow: 0 },
  rain:   { icon: '🌧️', name: 'Lluvia',    cloud: 0.9, fog: 0.35, rain: 1, snow: 0 },
  snow:   { icon: '❄️', name: 'Nieve',     cloud: 0.8, fog: 0.45, rain: 0, snow: 1 },
};
const ORDER = ['clear', 'cloudy', 'fog', 'rain', 'snow'];

// suelo mojado y nevado en cualquier material: se inyecta en el shader
export function weatherize(mat, U) {
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    prev?.call(mat, sh, r);
    sh.uniforms.uWet = U.wet; sh.uniforms.uSnowCover = U.snow;
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uWet; uniform float uSnowCover;')
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      {
        float upW = clamp(dot(normal, normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz)), 0.0, 1.0);
        float flatK = smoothstep(0.55, 0.85, upW);
        diffuseColor.rgb *= 1.0 - 0.38 * uWet * flatK;
        roughnessFactor = mix(roughnessFactor, 0.18, uWet * flatK * 0.85);
        float sn = uSnowCover * smoothstep(0.35, 0.75, upW);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.9, 0.92, 0.96), sn);
        roughnessFactor = mix(roughnessFactor, 0.75, sn);
      }`);
  };
  mat.customProgramCacheKey = () => (mat.uuid + 'w');
  mat.needsUpdate = true;
}

export class Weather {
  constructor({ scene, isMobile }) {
    this.scene = scene;
    this.U = { wet: { value: 0 }, snow: { value: 0 } };
    this.kind = 'clear'; this.cur = { ...KINDS.clear }; this.timer = 140 + Math.random() * 120;
    this.grip = 1;
    // lluvia: segmentos que caen
    const N = isMobile ? 900 : 1800; this.N = N;
    const rp = new Float32Array(N * 6); this.drops = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) this.drops.set([(Math.random() - 0.5) * 70, Math.random() * 30, (Math.random() - 0.5) * 70], i * 3);
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
    this.rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xaabbcc, transparent: true, opacity: 0, depthWrite: false }));
    this.rain.frustumCulled = false; scene.add(this.rain);
    // nieve: copos que bajan despacio y se mecen
    const sp = new Float32Array(N * 3); this.flakes = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) this.flakes.set([(Math.random() - 0.5) * 70, Math.random() * 30, (Math.random() - 0.5) * 70], i * 3);
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d');
    const gr = g.createRadialGradient(16, 16, 1, 16, 16, 15); gr.addColorStop(0, '#fff'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
    this.snow = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.22, map: new THREE.CanvasTexture(c), transparent: true, opacity: 0, depthWrite: false }));
    this.snow.frustumCulled = false; scene.add(this.snow);
  }
  get info() { return KINDS[this.kind]; }
  set(kind) { if (KINDS[kind]) { this.kind = kind; this.timer = 160 + Math.random() * 160; } }
  next() { this.set(ORDER[(ORDER.indexOf(this.kind) + 1) % ORDER.length]); }
  pick(hour) {
    // la niebla, sobre todo de madrugada y por la mañana; la nieve es rara
    const w = { clear: 40, cloudy: 22, fog: hour > 4 && hour < 11 ? 22 : 5, rain: 20, snow: 6 };
    let r = Math.random() * Object.values(w).reduce((a, b) => a + b);
    for (const k of ORDER) { r -= w[k]; if (r <= 0) return this.set(k); }
  }
  update(dt, focus, dayNight, sun, hemi, sky) {
    this.timer -= dt; if (this.timer <= 0) this.pick(dayNight.hour);
    const T = KINDS[this.kind], k = Math.min(1, dt / 12);
    for (const key of ['cloud', 'fog', 'rain', 'snow']) this.cur[key] += (T[key] - this.cur[key]) * k;
    const { cloud, fog, rain, snow } = this.cur;
    // suelo: se moja rápido y se seca despacio; la nieve cuaja poco a poco
    this.U.wet.value += ((rain > 0.3 ? 1 : 0) - this.U.wet.value) * dt * (rain > 0.3 ? 0.08 : 0.02);
    this.U.snow.value += ((snow > 0.4 ? 0.85 : 0) - this.U.snow.value) * dt * (snow > 0.4 ? 0.03 : 0.015);
    this.grip = 1 - 0.28 * this.U.wet.value - 0.45 * this.U.snow.value;
    // luz y visibilidad
    sun.intensity *= 1 - 0.65 * cloud; hemi.intensity *= 1 - 0.25 * cloud;
    const su = sky.material.uniforms; su.turbidity.value += cloud * 8; su.rayleigh.value *= 1 - 0.5 * cloud;
    const f = this.scene.fog, gray = new THREE.Color(0xa9b0b6).multiplyScalar(1 - 0.85 * dayNight.n);
    f.color.lerp(gray, Math.max(cloud * 0.6, fog));
    f.near *= 1 - 0.9 * fog; f.far = THREE.MathUtils.lerp(f.far, 120, fog * 0.9);
    // partículas alrededor de la cámara
    const ra = this.rain.geometry.attributes.position, sa = this.snow.geometry.attributes.position;
    this.rain.visible = rain > 0.02; this.snow.visible = snow > 0.02;
    this.rain.material.opacity = 0.55 * rain * (1 - 0.5 * dayNight.n); this.snow.material.opacity = 0.9 * snow;
    const wrap = (v, c, h) => v - c > h ? v - 2 * h : v - c < -h ? v + 2 * h : v;
    if (this.rain.visible) {
      const n = Math.floor(this.N * Math.min(1, rain * 1.2));
      for (let i = 0; i < this.N; i++) {
        const d = this.drops; let y = d[i * 3 + 1] - dt * 19; if (y < -2) y += 32; d[i * 3 + 1] = y;
        const x = wrap(d[i * 3] + focus.x, focus.x, 35), z = wrap(d[i * 3 + 2] + focus.z, focus.z, 35);
        d[i * 3] = x - focus.x; d[i * 3 + 2] = z - focus.z;
        const Y = i < n ? focus.y + y : -9999;
        ra.setXYZ(i * 2, x, Y, z); ra.setXYZ(i * 2 + 1, x + 0.03, Y + 0.55, z + 0.02);
      }
      ra.needsUpdate = true;
    }
    if (this.snow.visible) {
      const n = Math.floor(this.N * Math.min(1, snow * 1.2)), t = performance.now() / 1000;
      for (let i = 0; i < this.N; i++) {
        const d = this.flakes; let y = d[i * 3 + 1] - dt * 1.3; if (y < -2) y += 32; d[i * 3 + 1] = y;
        d[i * 3] += Math.sin(t * 0.8 + i) * dt * 0.4;
        const x = wrap(d[i * 3] + focus.x, focus.x, 35), z = wrap(d[i * 3 + 2] + focus.z, focus.z, 35);
        d[i * 3] = x - focus.x; d[i * 3 + 2] = z - focus.z;
        sa.setXYZ(i, x, i < n ? focus.y + y : -9999, z);
      }
      sa.needsUpdate = true;
    }
  }
  get raining() { return this.cur.rain > 0.25 || this.cur.snow > 0.3; }
}
