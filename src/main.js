import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Input } from './input.js';
import { makeTextures } from './textures.js';
import { Terrain, Colliders, buildTerrain, buildBuildings, buildRoads, buildWalls, Trees } from './world.js';
import { Player } from './player.js';
import { Car } from './car.js';

const isMobile = matchMedia('(pointer: coarse)').matches;
const canvas = document.getElementById('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.3, 4000);
scene.fog = new THREE.Fog(0xc9d6e2, 250, 1600);

// Cielo y sol (tarde de verano en la meseta)
const sky = new Sky(); sky.scale.setScalar(10000); scene.add(sky);
const su = sky.material.uniforms; su.turbidity.value = 4; su.rayleigh.value = 1.2; su.mieCoefficient.value = 0.004; su.mieDirectionalG.value = 0.8;
const sunDir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(50), THREE.MathUtils.degToRad(215));
su.sunPosition.value.copy(sunDir);
const sun = new THREE.DirectionalLight(0xfff1dc, 2.6);
sun.castShadow = true; sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
const sc = sun.shadow.camera; sc.left = sc.bottom = -70; sc.right = sc.top = 70; sc.near = 1; sc.far = 400; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight(0xbfd4ee, 0x6b5a40, 0.9));

const loading = document.getElementById('loading'), bar = document.getElementById('bar');
const progress = (f, msg) => { bar.style.width = `${Math.round(f * 100)}%`; if (msg) document.getElementById('lmsg').textContent = msg; };

async function load() {
  const base = import.meta.env.BASE_URL + 'world/';
  progress(0.05, 'Cargando mapa…');
  const [data, hbuf] = await Promise.all([fetch(base + 'world.json').then(r => r.json()), fetch(base + 'terrain.json').then(r => r.json())]);
  progress(0.3, 'Cargando ortofoto…');
  const tl = new THREE.TextureLoader();
  const loadTex = (f) => new Promise(res => tl.load(base + f, t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); res(t); }));
  const [oFull, oCenter] = await Promise.all([loadTex(data.ortho.full.file), loadTex(data.ortho.center.file)]);
  progress(0.6, 'Construyendo el pueblo…');
  await new Promise(r => setTimeout(r, 20));
  const tex = makeTextures(renderer);
  const terrain = new Terrain(data.terrain, Float32Array.from(hbuf.h, v => v * hbuf.scale));
  data.terrain.ortho = data.ortho; // límites para el shader
  const meta = { ...data.terrain, ortho: { full: data.ortho.full.bounds, center: data.ortho.center.bounds } };
  scene.add(buildTerrain(meta, terrain, oFull, oCenter, tex));
  const colliders = new Colliders();
  scene.add(buildRoads(data, terrain, tex));
  scene.add(buildBuildings(data, terrain, tex, colliders));
  scene.add(buildWalls(data, terrain, tex, colliders));
  const trees = new Trees(data, terrain, tex, colliders); scene.add(trees.group);
  progress(0.95, 'Últimos detalles…');
  return { data, terrain, colliders, trees };
}

const input = new Input(canvas);
const hud = { mode: document.getElementById('mode'), speed: document.getElementById('speed'), hint: document.getElementById('hint'), place: document.getElementById('place') };

load().then(({ data, terrain, colliders, trees }) => {
  const world = { terrain, colliders, scene };
  const player = new Player(world); scene.add(player.mesh);
  player.pos.set(data.spawn[0], terrain.height(data.spawn[0], data.spawn[1]), data.spawn[1]);
  const palette = [0xb7beca, 0x8a1c1c, 0xf2f2f0, 0x1f3550, 0x2a2a2a, 0x6d6f5a, 0xc8b28a];
  const cars = data.cars.map(([x, z, h], i) => { const c = new Car(world, palette[i % palette.length], i % 3 === 1 ? 'suv' : 'sedan'); c.place(x, z, h); scene.add(c.mesh); return c; });
  world.cars = cars;
  let driving = null;
  const camState = { yaw: player.heading + Math.PI, pitch: 0.25, dist: 5.5, pos: new THREE.Vector3() };
  camera.position.copy(player.pos).add(new THREE.Vector3(0, 3, -6));

  loading.classList.add('done');
  document.getElementById('help').classList.add('show');
  setTimeout(() => document.getElementById('help').classList.remove('show'), 9000);

  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    const look = input.consumeLook();
    camState.yaw -= look.dx * 0.0035; camState.pitch = THREE.MathUtils.clamp(camState.pitch + look.dy * 0.0025, -0.25, 1.2);

    // subir/bajar del coche
    if (input.wasPressed('KeyE', 'KeyF', 'Enter', 'btn:action')) {
      if (driving) { driving.driver = false; player.exitCar(driving); driving = null; }
      else {
        let best = null, bd = 4.5;
        for (const c of cars) { const d = c.pos.distanceTo(player.pos); if (d < bd) { bd = d; best = c; } }
        if (best) { driving = best; best.driver = true; player.enterCar(best); }
      }
    }
    if (driving) driving.update(dt, input, camState.yaw); else player.update(dt, input, camState.yaw);
    for (const c of cars) if (c !== driving) c.update(dt, null);

    // cámara en tercera persona con seguimiento suave
    const target = driving ? driving.pos : player.pos;
    const dist = driving ? 8.5 : camState.dist, height = driving ? 1.6 : 1.55;
    if (driving && Math.abs(look.dx) < 0.5) { // la cámara vuelve detrás del coche
      let d = (driving.heading + Math.PI) - camState.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      camState.yaw += d * Math.min(1, dt * 2.5 * Math.min(1, Math.abs(driving.speed) / 3));
    }
    const cp = Math.cos(camState.pitch);
    tmp.set(Math.sin(camState.yaw) * cp * dist, Math.sin(camState.pitch) * dist + height, Math.cos(camState.yaw) * cp * dist).add(target);
    const gy = terrain.height(tmp.x, tmp.z) + 0.6; if (tmp.y < gy) tmp.y = gy;
    camera.position.lerp(tmp, 1 - Math.exp(-dt * 12));
    camera.lookAt(target.x, target.y + height, target.z);
    const fc = window.__game?.freeCam; if (fc) { camera.position.set(...fc.pos); camera.lookAt(...fc.look); }

    trees.update(target);
    // la sombra sigue al jugador
    sun.position.copy(target).addScaledVector(sunDir, 200); sun.target.position.copy(target);

    hud.mode.textContent = driving ? 'Conduciendo' : 'A pie';
    hud.speed.textContent = driving ? `${Math.round(Math.abs(driving.speed) * 3.6)} km/h` : '';
    const near = !driving && cars.some(c => c.pos.distanceTo(player.pos) < 4.5);
    hud.hint.textContent = driving ? (input.touch ? 'Pulsa 🚪 para bajar' : 'E para bajar') : near ? (input.touch ? 'Pulsa 🚪 para subir al coche' : 'E para subir al coche') : '';
    document.body.classList.toggle('driving', !!driving);
    input.endFrame();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  window.__game = { player, cars, camera, scene, renderer, terrain, get driving() { return driving; } };
  frame();
}).catch(e => { console.error(e); document.getElementById('lmsg').textContent = 'Error cargando: ' + e.message; });

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
