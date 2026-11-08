import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Input } from './input.js';
import { makeTextures } from './textures.js';
import { Terrain, Colliders, buildTerrain, buildBuildings, buildRoads, buildWalls, buildPlaza, Trees } from './world.js';
import { Player } from './player.js';
import { Car } from './car.js';
import { Minimap, EngineSound } from './hud.js';
import { DayNight } from './daynight.js';
import { RoadNet, Driver, Walker } from './traffic.js';
import { Missions, deliveryPoints } from './missions.js';
import { Race } from './race.js';

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
const hemi = new THREE.HemisphereLight(0xbfd4ee, 0x6b5a40, 0.9); scene.add(hemi);

const loading = document.getElementById('loading'), bar = document.getElementById('bar');
const progress = (f, msg) => { bar.style.width = `${Math.round(f * 100)}%`; if (msg) document.getElementById('lmsg').textContent = msg; };

async function load(map) {
  const base = import.meta.env.BASE_URL + 'world/' + map + '/';
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
  const buildings = buildBuildings(data, terrain, tex, colliders); scene.add(buildings);
  scene.add(buildPlaza(data, terrain, colliders));
  const roads = buildRoads(data, terrain, tex, colliders); scene.add(roads);
  scene.add(buildWalls(data, terrain, tex, colliders));
  const trees = new Trees(data, terrain, tex, colliders); scene.add(trees.group);
  progress(0.95, 'Últimos detalles…');
  return { data, terrain, colliders, trees, oFull, lamps: roads.userData.lamps };
}

const input = new Input(canvas);

// Selección de mapa: por enlace (#valde) o con los botones de la portada (si hay varios)
function waitForMap() {
  const maps = ['valde'];
  const h = location.hash.replace('#', '');
  if (maps.includes(h)) return Promise.resolve(h);
  if (maps.length === 1) return Promise.resolve(maps[0]);
  const menu = document.getElementById('maps'); menu.hidden = false;
  document.getElementById('lmsg').textContent = 'Elige dónde jugar';
  return new Promise(res => menu.addEventListener('click', e => {
    const b = e.target.closest('[data-map]'); if (!b) return;
    menu.hidden = true; try { history.replaceState(null, '', '#' + b.dataset.map); } catch (_) {}
    res(b.dataset.map);
  }));
}
const hud = { mode: document.getElementById('mode'), speed: document.getElementById('speed'), hint: document.getElementById('hint'), place: document.getElementById('place') };

waitForMap().then(map => load(map)).then(({ data, terrain, colliders, trees, oFull, lamps }) => {
  const world = { terrain, colliders, scene, personScale: data.personScale || 1 };
  const player = new Player(world); scene.add(player.mesh);
  player.pos.set(data.spawn[0], terrain.height(data.spawn[0], data.spawn[1]), data.spawn[1]);
  const palette = [0xb7beca, 0x8a1c1c, 0xf2f2f0, 0x1f3550, 0x2a2a2a, 0x6d6f5a, 0xc8b28a];
  const cars = data.cars.map(([x, z, h], i) => { const c = new Car(world, palette[i % palette.length], i % 3 === 1 ? 'suv' : 'sedan', data.carScale || 1); c.place(x, z, h); scene.add(c.mesh); return c; });
  world.cars = cars;
  let driving = null;

  // tráfico: unos pocos coches por el pueblo y otros de paso por la N-631
  const net = new RoadNet(data.roads, new Set(['residential', 'tertiary', 'unclassified', 'living_street', 'trunk']));
  const villageNet = new RoadNet(data.roads, new Set(['residential', 'tertiary', 'living_street']));
  const isTrunk = r => r.k === 'trunk', isVillage = r => r.k !== 'trunk';
  const aiSpawn = (c) => { const trunk = c.aiKind === 'trunk'; c.ai = new Driver(net, c, net.randomSpot(trunk ? isTrunk : isVillage), trunk ? 19 : 6.5); };
  const aiColors = [0xd8d8d0, 0x2c4a6e, 0x6e1f1f, 0x3a3f3a, 0xb59a5a, 0x1d1d1d];
  for (let i = 0; i < (isMobile ? 4 : 6); i++) {
    const c = new Car(world, aiColors[i % aiColors.length], i % 3 === 2 ? 'suv' : 'sedan', data.carScale || 1);
    c.aiKind = i % 2 ? 'trunk' : 'village'; aiSpawn(c); scene.add(c.mesh); cars.push(c);
  }
  // vecinos paseando
  const walkers = [];
  for (let i = 0; i < (isMobile ? 6 : 10); i++) { const w = new Walker(villageNet, world, villageNet.randomSpot(), i); scene.add(w.mesh); walkers.push(w); }
  // ciclo de día y noche
  const dayNight = new DayNight({ scene, sky, sun, hemi, renderer, isMobile });
  dayNight.setLamps(lamps);
  const headlight = new THREE.SpotLight(0xfff2d0, 0, 55, 0.55, 0.5, 1.2); headlight.position.set(0, 0.8, 2.2); headlight.target.position.set(0, 0, 14);
  headlight.add(headlight.target); scene.add(headlight);
  // misiones de reparto
  const start = data.plaza?.start || [data.spawn[0] + 4, data.spawn[1]];
  const ui = { mission: document.getElementById('mission'), money: document.getElementById('money'), toast: document.getElementById('toast') };
  const streets = data.roads.filter(r => r.k !== 'track' && r.k !== 'path').map(r => r.p);
  const minimap = new Minimap(document.getElementById('minimap'), oFull.image, data.ortho.full.bounds, streets);
  const engine = new EngineSound();
  const missions = new Missions({ scene, terrain, start, drops: deliveryPoints(data), ui, sound: k => engine.blip(k) });
  const clockEl = document.getElementById('clock');
  const race = new Race({
    scene, world, net, start: data.race_start || [data.spawn[0] + 20, data.spawn[1] + 10], ui, sound: k => engine.blip(k), toast: (a, b) => missions.toast(a, b),
    makeCar: (col) => { const c = new Car(world, col, 'sedan', data.carScale || 1); scene.add(c.mesh); cars.push(c); return c; },
  });
  race.onRemove = (c) => { scene.remove(c.mesh); for (const sp of c.smoke) scene.remove(sp); const i = cars.indexOf(c); if (i >= 0 && c !== driving) cars.splice(i, 1); };
  race.onPrize = (p) => { missions.money += p; };
  race.onStart = (c) => { camState.yaw = c.heading + Math.PI; camState.pitch = 0.18; camera.position.set(c.pos.x - Math.sin(c.heading) * 7, c.pos.y + 3, c.pos.z - Math.cos(c.heading) * 7); };
  missions.busy = () => race.active; race.busy = () => missions.state === 'deliver';
  clockEl.textContent = '☀️ ' + dayNight.clock;
  clockEl.addEventListener('click', () => dayNight.skip(1)); clockEl.addEventListener('touchstart', e => { dayNight.skip(1); e.stopPropagation(); }, { passive: true });
  for (const ev of ['keydown', 'touchstart', 'mousedown']) addEventListener(ev, () => engine.start(), { once: true });
  const camState = { yaw: player.heading + Math.PI, pitch: 0.25, dist: 4.6, pos: new THREE.Vector3() };
  camera.position.copy(player.pos).add(new THREE.Vector3(0, 3, -6));

  loading.classList.add('done');
  document.getElementById('place').textContent = data.title;
  if (data.style === 'urban') { scene.fog.color.set(0xc4ccd4); su.turbidity.value = 7; sun.intensity = 2.2; }
  document.getElementById('help').classList.add('show');
  setTimeout(() => document.getElementById('help').classList.remove('show'), 9000);

  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3(); let frameNo = 0;
  function frame() {
    const dt = Math.min(0.05, clock.getDelta());
    const look = input.consumeLook();
    camState.yaw -= look.dx * 0.0035; camState.pitch = THREE.MathUtils.clamp(camState.pitch + look.dy * 0.0025, -0.25, 1.2);

    // subir/bajar del coche
    if (input.wasPressed('KeyE', 'KeyF', 'Enter', 'btn:action')) {
      if (driving) { driving.driver = false; player.exitCar(driving); driving = null; scene.add(headlight); }
      else {
        let best = null, bd = 4.5;
        for (const c of cars) { if (c.racer) continue; const d = c.pos.distanceTo(player.pos) - 2.2 * (1 - c.s); if (d < bd) { bd = d; best = c; } }
        if (best) { driving = best; best.driver = true; best.ai = null; best.mesh.add(headlight); player.enterCar(best); camState.yaw = best.heading + Math.PI; camState.pitch = 0.18; }
      }
    }
    if (input.wasPressed('KeyT')) dayNight.skip(1);
    world.obstacles = driving ? [...cars, ...walkers] : [...cars, ...walkers, player];
    if (driving) driving.update(dt, input, camState.yaw); else player.update(dt, input, camState.yaw);
    for (const c of cars) if (c !== driving) {
      c.update(dt, null);
      // los coches que llegan a un callejón sin salida o al borde del mapa reaparecen lejos del jugador
      if (c.ai?.f?.deadEnd && c.pos.distanceTo(player.inCar ? driving.pos : player.pos) > 90) aiSpawn(c);
    }
    const focus = driving ? driving.pos : player.pos;
    for (const w of walkers) w.update(dt, cars, player, focus);

    // cámara en tercera persona con seguimiento suave
    const target = driving ? driving.pos : player.pos;
    const dist = driving ? 3 + 5.5 * driving.s : camState.dist, height = driving ? 0.6 + driving.s : 1.55 * world.personScale;
    if (driving && Math.abs(look.dx) < 0.5) { // la cámara vuelve detrás del coche
      let d = (driving.heading + Math.PI) - camState.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      camState.yaw += d * Math.min(1, dt * 2.5 * Math.min(1, Math.abs(driving.speed) / 3));
    }
    const cp = Math.cos(camState.pitch);
    tmp.set(Math.sin(camState.yaw) * cp * dist, Math.sin(camState.pitch) * dist + height, Math.cos(camState.yaw) * cp * dist).add(target);
    const hitT = colliders.raycast(target.x, target.z, tmp.x, tmp.z);
    if (hitT < 1) { const k = Math.max(0.05, hitT - 0.4 / dist); tmp.x = target.x + (tmp.x - target.x) * k; tmp.z = target.z + (tmp.z - target.z) * k; }
    const gy = terrain.height(tmp.x, tmp.z) + 0.6; if (tmp.y < gy) tmp.y = gy;
    camera.position.lerp(tmp, hitT < 1 ? 1 - Math.exp(-dt * 30) : 1 - Math.exp(-dt * 12));
    camera.lookAt(target.x, target.y + height, target.z);
    const fc = window.__game?.freeCam; if (fc) { camera.position.set(...fc.pos); camera.lookAt(...fc.look); }

    trees.update(target);
    dayNight.update(dt, target);
    const nf = dayNight.n;
    for (const c of cars) c.setLights(c.ai || c === driving ? nf : 0, c === driving ? input.brake || (input.axes().y < 0 && driving.speed > 0.5) : c.ai && c.speed < 1);
    headlight.intensity = driving ? 60 * nf : 0;
    missions.update(dt, target);
    race.update(dt, driving, target);
    // la sombra sigue al jugador
    sun.position.copy(target).addScaledVector(dayNight.light, 200); sun.target.position.copy(target);

    engine.update(!!driving, driving ? driving.speed : 0, driving ? input.axes().y : 0);
    if ((frameNo++ & 1) === 0) minimap.draw(target.x, target.z, driving ? driving.heading : player.heading, camState.yaw, cars, driving, { walkers, target: race.target || missions.target, targetColor: race.target ? '#3aa0e2' : missions.state === 'deliver' ? '#47d16c' : '#f5c542' });
    camera.fov += ((driving ? 60 + Math.min(15, Math.abs(driving.speed) * 0.5) : 60) - camera.fov) * Math.min(1, dt * 3); camera.updateProjectionMatrix();
    hud.mode.textContent = driving ? `Conduciendo · ${driving.wrecked ? 'averiado' : `daños ${Math.round(100 - driving.health)} %`}` : 'A pie';
    if ((frameNo & 15) === 0) clockEl.textContent = (dayNight.n > 0.5 ? '🌙 ' : '☀️ ') + dayNight.clock;
    hud.speed.textContent = driving ? `${Math.round(Math.abs(driving.speed) * 3.6)} km/h` : '';
    const near = !driving && cars.some(c => c.pos.distanceTo(player.pos) < 4.5);
    hud.hint.textContent = race.nearOnFoot ? 'Necesitas un coche para la carrera' : driving?.wrecked ? 'Coche averiado: bájate y coge otro' : driving ? (input.touch ? 'Pulsa 🚪 para bajar' : 'E para bajar') : near ? (input.touch ? 'Pulsa 🚪 para subir al coche' : 'E para subir al coche') : '';
    document.body.classList.toggle('driving', !!driving);
    input.endFrame();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  window.__game = { player, cars, walkers, race, camera, scene, renderer, terrain, dayNight, missions, get driving() { return driving; } };
  frame();
}).catch(e => { console.error(e); document.getElementById('lmsg').textContent = 'Error cargando: ' + e.message; });

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
