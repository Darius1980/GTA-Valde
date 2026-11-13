import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Input } from './input.js';
import { makeTextures } from './textures.js';
import { Plane, flattenAirfield, buildAirfield, onAirfield } from './plane.js';
import { Terrain, Colliders, buildTerrain, buildBuildings, buildRoads, buildWalls, buildPlaza, Trees, smoothRoads, villageMask, yardWalls, buildBridges, applyPlano, planoWalls, buildRocks, applyLevels, groundPaint } from './world.js';
import { Animals } from './animals.js';
import { Player } from './player.js';
import { Car } from './car.js';
import { Minimap, EngineSound } from './hud.js';
import { DayNight } from './daynight.js';
import { RoadNet, Driver, Walker } from './traffic.js';
import { Missions, deliveryPoints } from './missions.js';
import { Race } from './race.js';
import { Police } from './police.js';
import { Weather, weatherize } from './weather.js';
import { Ambient } from './sound.js';
import { loadSave, writeSave } from './save.js';
import { Shops, findShopSites } from './shops.js';
import { Jobs } from './jobs.js';
import { Plaza } from './fiesta.js';
import { Interiors } from './interiors.js';
import { Outer } from './outer.js';
import { Region, RegionTraffic } from './region.js';
import { Molinos } from './molinos.js';

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
  const [data, hbuf, plano] = await Promise.all([fetch(base + 'world.json').then(r => r.json()), fetch(base + 'terrain.json').then(r => r.json()),
    fetch(base + 'plano.json').then(r => r.ok ? r.json() : null).catch(() => null)]); // lo que Darío dibujó en el plano
  if (plano) applyPlano(data, plano);
  progress(0.3, 'Cargando ortofoto…');
  const tl = new THREE.TextureLoader();
  const loadTex = (f) => new Promise(res => tl.load(base + f, t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); res(t); }));
  // entorno lejano (radio de 10 km), si el mapa lo tiene
  const outerP = Promise.all([fetch(base + 'outer.json').then(r => r.ok ? r.json() : null), fetch(base + 'terrain_outer.json').then(r => r.ok ? r.json() : null)]).catch(() => [null, null]);
  const [oFull, oCenter] = await Promise.all([loadTex(data.ortho.full.file), loadTex(data.ortho.center.file)]);
  const [odata, ohbuf] = await outerP;
  const oOuter = odata && ohbuf ? await loadTex(odata.ortho.file) : null;
  progress(0.6, 'Construyendo el pueblo…');
  await new Promise(r => setTimeout(r, 20));
  const tex = makeTextures(renderer);
  const terrain = new Terrain(data.terrain, Float32Array.from(hbuf.h, v => v * hbuf.scale));
  if (oOuter) terrain.setOuter(odata.terrain, Float32Array.from(ohbuf.h, v => v * ohbuf.scale));
  const airfield = plano?.aerodromo ? flattenAirfield(terrain, plano.aerodromo) : null; // pista de la avioneta (antes de dibujar el suelo)
  data.terrain.ortho = data.ortho; // límites para el shader
  const meta = { ...data.terrain, ortho: { full: data.ortho.full.bounds, center: data.ortho.center.bounds } };
  smoothRoads(data.roads); // curvas redondeadas
  const center = data.plaza?.start || data.spawn;
  if (plano?.niveles?.length) applyLevels(terrain, plano.niveles); // desniveles y taludes del plano
  const ground = buildTerrain(meta, terrain, oFull, oCenter, tex, data.style === 'urban' ? null : villageMask(data, center), data.style === 'urban' ? null : groundPaint(plano?.suelo)); scene.add(ground);
  const colliders = new Colliders();
  if (airfield) scene.add(buildAirfield(airfield, terrain, colliders));
  scene.add(buildBridges(data.roads, terrain, tex, colliders)); // antes que las calles: su altura pasa por el tablero
  const buildings = buildBuildings(data, terrain, tex, colliders); scene.add(buildings);
  scene.add(buildPlaza(data, terrain, colliders));
  let bellTower = null; buildings.traverse(o => { if (o.userData.bellTower) bellTower = o.userData.bellTower; });
  const roads = buildRoads(data, terrain, tex, colliders); scene.add(roads);
  // la gasolinera y el concesionario necesitan el terreno libre de árboles
  const sites = findShopSites(data, data.plaza?.start || data.spawn, colliders);
  if (plano) data.walls = planoWalls(plano); // las tapias y ruinas reales sustituyen a las automáticas
  else if (data.style !== 'urban' && !data.walls.length) data.walls = yardWalls(data, colliders, [sites.gas, sites.shop, sites.taller?.b].filter(Boolean));
  scene.add(buildWalls(data, terrain, tex, colliders));
  if (plano) scene.add(buildRocks(plano, terrain, tex, colliders)); // berrocales dibujados en el plano
  const molinos = new Molinos(plano?.molinos, terrain, colliders); scene.add(molinos.group); // molinos eólicos del plano
  const clearR = [[sites.gas, 13], [sites.shop, 15]].filter(([s]) => s);
  data.trees = data.trees.filter(([x, z]) => !clearR.some(([s, r]) => Math.hypot(x - s.x, z - s.z) < r) && !(airfield && onAirfield(airfield, x, z, 14)));
  const trees = new Trees(data, terrain, tex, colliders); scene.add(trees.group);
  const outer = oOuter ? new Outer({ data: odata, terrain, tex, colliders, ortho: oOuter, scene, base }) : null;
  progress(0.95, 'Últimos detalles…');
  // superficies que se mojan con la lluvia y se cubren de nieve
  const surfaces = [ground.material];
  roads.traverse(o => { if (o.isMesh && o.material?.map && !surfaces.includes(o.material)) surfaces.push(o.material); });
  buildings.traverse(o => { if (o.isMesh && (o.material?.map === tex.roof || o.material?.map === tex.flatRoof) && !surfaces.includes(o.material)) surfaces.push(o.material); });
  return { data, terrain, colliders, trees, oFull, lamps: roads.userData.lamps, bellTower, tex, surfaces, sites, outer, oOuter, airfield, molinos };
}

const input = new Input(canvas);

// Pantalla completa (y horizontal en móvil) con el botón ⛶
{
  const fs = document.getElementById('fs'), el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (!req || !(document.fullscreenEnabled || document.webkitFullscreenEnabled)) fs.hidden = true;
  const toggle = async (e) => {
    e.preventDefault(); e.stopPropagation();
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else { await req.call(el, { navigationUI: 'hide' }); await screen.orientation?.lock?.('landscape').catch(() => {}); }
    } catch (_) {}
  };
  fs.addEventListener('click', toggle); fs.addEventListener('touchend', toggle);
  const upd = () => { fs.textContent = document.fullscreenElement || document.webkitFullscreenElement ? '✕' : '⛶'; };
  document.addEventListener('fullscreenchange', upd); document.addEventListener('webkitfullscreenchange', upd);
}

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

waitForMap().then(map => load(map)).then(({ data, terrain, colliders, trees, oFull, lamps, bellTower, tex, surfaces, sites, outer, oOuter, airfield, molinos }) => {
  const world = { terrain, colliders, scene, personScale: data.personScale || 1 };
  const player = new Player(world); scene.add(player.mesh);
  if (outer) world.edge = outer.data.half - 250;
  world.molinos = molinos; if (molinos.list.length) { camera.far = 9000; camera.updateProjectionMatrix(); } // los molinos se ven desde lejos
  const plane = airfield ? new Plane({ world, f: airfield }) : null; if (plane) scene.add(plane.mesh);
  let flying = null;
  player.pos.set(data.spawn[0], terrain.height(data.spawn[0], data.spawn[1]), data.spawn[1]);
  const palette = [0xb7beca, 0x8a1c1c, 0xf2f2f0, 0x1f3550, 0x2a2a2a, 0x6d6f5a, 0xc8b28a];
  const cars = data.cars.map(([x, z, h], i) => { const c = new Car(world, palette[i % palette.length], i % 3 === 1 ? 'suv' : 'sedan', data.carScale || 1); c.place(x, z, h); c.home = [x, z, h]; scene.add(c.mesh); return c; });
  world.cars = cars;
  let driving = null;

  RoadNet.limit = (data.half || 1000) - 100;
  // tráfico: unos pocos coches por el pueblo y otros de paso por la N-631
  const net = new RoadNet(data.roads, new Set(['residential', 'tertiary', 'unclassified', 'living_street', 'trunk']));
  const villageNet = new RoadNet(data.roads, new Set(['residential', 'tertiary', 'living_street']));
  const isTrunk = r => r.k === 'trunk', isVillage = r => r.k !== 'trunk';
  const aiSpawn = (c) => { if (c.aiRespawn) return c.aiRespawn(); const trunk = c.aiKind === 'trunk'; c.ai = new Driver(net, c, net.randomSpot(trunk ? isTrunk : isVillage), trunk ? 19 : 6.5); };
  const aiColors = [0xd8d8d0, 0x2c4a6e, 0x6e1f1f, 0x3a3f3a, 0xb59a5a, 0x1d1d1d];
  for (let i = 0; i < (isMobile ? 4 : 6); i++) {
    const c = new Car(world, aiColors[i % aiColors.length], i % 3 === 2 ? 'suv' : 'sedan', data.carScale || 1);
    c.aiKind = i % 2 ? 'trunk' : 'village'; aiSpawn(c); scene.add(c.mesh); cars.push(c);
  }
  { // un tractor despacio por la nacional
    const c = new Car(world, 0xb8321e, 'tractor', data.carScale || 1); c.aiKind = 'trunk';
    c.ai = new Driver(net, c, net.randomSpot(isTrunk), 7.5); scene.add(c.mesh); cars.push(c);
    const sp = c.ai; c.aiRespawn = () => { c.ai = new Driver(net, c, net.randomSpot(isTrunk), 7.5); }; void sp;
  }
  // red de carreteras de toda la comarca y tráfico en los otros pueblos y carreteras
  const region = outer ? new Region({ roads: data.roads, outerRoads: outer.data.roads, places: outer.places, center: data.plaza?.start || data.spawn, title: data.title }) : null;
  const regionTraffic = region ? new RegionTraffic({
    region, outerRoads: outer.data.roads, inner: 1500, count: isMobile ? 4 : 7,
    makeCar: (i) => { const c = new Car(world, aiColors[(i + 2) % aiColors.length], i % 4 === 3 ? 'suv' : 'sedan', data.carScale || 1); scene.add(c.mesh); cars.push(c); return c; },
  }) : null;
  // vecinos paseando
  const walkers = [];
  for (let i = 0; i < (isMobile ? 6 : 10); i++) { const w = new Walker(villageNet, world, villageNet.randomSpot(), i); scene.add(w.mesh); walkers.push(w); }
  // gatos y perros por las calles; ciervos al atardecer en la carretera de entrada
  const center = data.plaza?.start || data.spawn;
  const animals = new Animals({ scene, world, net: villageNet, roads: data.roads, center, buildings: data.buildings, half: data.half || 1000, isMobile });
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
  if (outer) minimap.outer = { img: oOuter.image, b: outer.data.ortho.bounds };
  const engine = new EngineSound();
  const missions = new Missions({ scene, terrain, start, drops: deliveryPoints(data), ui, sound: k => engine.blip(k) });
  let bellTimer = 0, bellRing = null;
  const clockEl = document.getElementById('clock'), gearBtn = document.querySelector('[data-btn=gear]');
  const race = new Race({
    scene, world, roads: data.roads, center: data.plaza?.start || data.spawn, start: data.race_start || [data.spawn[0] + 20, data.spawn[1] + 10], ui, sound: k => engine.blip(k), toast: (a, b) => missions.toast(a, b),
    makeCar: (col) => { const c = new Car(world, col, 'sedan', data.carScale || 1); scene.add(c.mesh); cars.push(c); return c; },
  });
  race.onRemove = (c) => { scene.remove(c.mesh); for (const sp of c.smoke) scene.remove(sp); const i = cars.indexOf(c); if (i >= 0 && c !== driving) cars.splice(i, 1); };
  race.onPrize = (p) => { missions.money += p; };
  if (region) race.addInterVillage(region);
  const toast = (a, b) => missions.toast(a, b), sound = k => engine.blip(k);
  // vehículos: los que compras se guardan con la partida
  const spawnVehicle = (kind, color, x, z, h) => { const c = new Car(world, color, kind, data.carScale || 1); c.place(x, z, h); scene.add(c.mesh); cars.push(c); return c; };
  const saved = loadSave();
  if (saved) {
    missions.money = saved.money | 0; if (saved.best) missions.best = saved.best;
    if (saved.hour >= 0) dayNight.hour = saved.hour; if (saved.day >= 0) dayNight.day = saved.day;
    if (saved.records) race.records = saved.records;
    for (const v of saved.owned || []) { const c = spawnVehicle(v.kind, v.color, v.x, v.z, v.h); c.owned = true; c.fuel = v.fuel ?? 1; if (v.health < 100) c.damage(100 - v.health, 0, 1.8); }
  }
  const weather = new Weather({ scene, isMobile }); for (const m of surfaces) weatherize(m, weather.U); outer?.setWeather(weather.U);
  if (saved?.weather) weather.set(saved.weather);
  const shops = new Shops({ scene, world, data, center, colliders, spawnVehicle, wallet: missions, toast, sound, sites, owned: (saved?.owned || []).map(v => v.kind) });
  const jobs = new Jobs({ scene, world, data, center, drops: deliveryPoints(data), ui, toast, sound, wallet: missions, personScale: world.personScale });
  jobs.extraDest = [shops.gasAt, jobs.farm].filter(Boolean); jobs.region = region;
  const police = new Police({ scene, world, net, cars, scale: data.carScale || 1, isMobile, ui: { wanted: document.getElementById('wanted') }, toast, sound, wallet: missions });
  world.onHit = (w, c) => { if (c === driving) police.report('atropello'); };
  const ambient = new Ambient(engine);
  const plaza = new Plaza({ scene, world, data, center, isMobile, ambient });
  const interiors = new Interiors({ scene, world, data, center, tex, bellTower });
  const offerEl = document.getElementById('offer'), offerUI = { id: null, declined: false, accept: false, reject: false, txt: null }; let curOffer = null;
  for (const [sel, k] of [['.yes', 'accept'], ['.no', 'reject']]) { const b = offerEl.querySelector(sel); const f = (e) => { e.preventDefault(); e.stopPropagation(); offerUI[k] = true; }; b.addEventListener('click', f); b.addEventListener('touchstart', f, { passive: false }); }
  const fade = document.getElementById('fade'), wxEl = document.getElementById('wx'), minimapEl = document.getElementById('minimap');
  wxEl.addEventListener('click', () => weather.next()); wxEl.addEventListener('touchstart', e => { weather.next(); e.stopPropagation(); }, { passive: true });
  wxEl.textContent = weather.info.icon;
  const save = () => writeSave({
    money: missions.money, best: missions.best, hour: dayNight.hour, day: dayNight.day, weather: weather.kind, records: race.records,
    owned: cars.filter(c => c.owned).map(c => ({ kind: c.kind, color: c.color, x: +c.pos.x.toFixed(1), z: +c.pos.z.toFixed(1), h: +c.heading.toFixed(2), fuel: +c.fuel.toFixed(3), health: Math.round(c.health) })),
  });
  race.onRecord = save; shops.onBuy = save;
  shops.onRepair = (c) => { if (c === driving) { c.mesh.add(headlight); } };
  addEventListener('pagehide', save); document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
  let saveT = 10, lastHour = Math.floor(dayNight.hour), toll = null;
  race.onStart = (c) => { camState.yaw = c.heading + Math.PI; camState.pitch = 0.18; camera.position.set(c.pos.x - Math.sin(c.heading) * 7, c.pos.y + 3, c.pos.z - Math.cos(c.heading) * 7); };
  missions.busy = () => race.active || jobs.active || !!interiors.inside;
  race.busy = () => missions.state === 'deliver' || jobs.active || !!interiors.inside;
  jobs.busy = () => race.active || missions.state === 'deliver' || !!interiors.inside;
  clockEl.textContent = dayNight.clock;
  clockEl.addEventListener('click', () => dayNight.skip(1)); clockEl.addEventListener('touchstart', e => { dayNight.skip(1); e.stopPropagation(); }, { passive: true });
  for (const ev of ['keydown', 'touchstart', 'mousedown']) addEventListener(ev, () => engine.start(), { once: true });
  const camState = { yaw: player.heading + Math.PI, pitch: 0.25, dist: 4.6, pos: new THREE.Vector3() };
  camera.position.copy(player.pos).add(new THREE.Vector3(0, 3, -6));

  loading.classList.add('done');
  const placeEl = document.getElementById('place'); placeEl.textContent = data.title;
  if (outer && Math.max(Math.abs(player.pos.x), Math.abs(player.pos.z)) > 1500) outer.prime(player.pos, dayNight.far);
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
    // tareas: al llegar a un círculo se ofrece y hay que aceptarla (E / Intro / botón Sí) o rechazarla (N / Esc / No)
    const pressE = input.wasPressed('KeyE', 'KeyF', 'Enter', 'btn:action');
    if (curOffer && (offerUI.accept || pressE && !offerUI.declined)) { const o = curOffer; offerUI.declined = true; o.go(); }
    else if (curOffer && (offerUI.reject || input.wasPressed('KeyN', 'Escape'))) offerUI.declined = true;
    else if (pressE) {
      if (flying) {
        if (flying.canExit) { flying.engine = false; player.exitCar(flying); flying = null; camState.yaw = player.heading + Math.PI; }
        else toast('✈ En marcha', 'Para la avioneta en tierra para bajarte');
      }
      else if (!driving && plane && plane.pos.distanceTo(player.pos) < 6) {
        flying = plane; plane.engine = true; player.enterCar(plane);
        toast('✈ Avioneta', input.touch ? 'Joystick arriba para acelerar por la pista y despegar' : 'W o ↑ para acelerar por la pista y despegar');
      }
      else if (driving) {
        if (driving.mesh.userData.rider) driving.mesh.userData.rider.visible = false;
        driving.driver = false; player.exitCar(driving); driving = null; scene.add(headlight);
      }
      else if (interiors.inside?.kind === 'bar' && interiors.hint) {
        const drinks = [['un café con leche', 1], ['un vino de la tierra', 2], ['una caña', 2], ['un pincho de tortilla', 3]], [what, cost] = drinks[Math.random() * drinks.length | 0];
        if (missions.money >= cost) { missions.money -= cost; toast('🍷 Bar La Plaza', `Te tomas ${what}: -${cost} €`); sound('ok'); } else toast('🍷 Bar La Plaza', 'No te llega ni para un café');
      }
      else if (!shops.tryBuy(player)) {
        let best = null, bd = 4.5;
        for (const c of cars) { if (c.racer || c.police || c.forSale) continue; const d = c.pos.distanceTo(player.pos) - 2.2 * (1 - c.s); if (d < bd) { bd = d; best = c; } }
        if (best) {
          driving = best; best.driver = true; best.ai = null; best.mesh.add(headlight); player.enterCar(best); camState.yaw = best.heading + Math.PI; camState.pitch = 0.18;
          if (best.mesh.userData.rider) best.mesh.userData.rider.visible = true;
        }
      }
    }
    offerUI.accept = offerUI.reject = false;
    if (input.wasPressed('KeyY')) weather.next();
    if (input.wasPressed('KeyT')) dayNight.skip(1);
    if (driving && input.wasPressed('KeyQ', 'btn:gear')) driving.gear = driving.gear === 1 ? 2 : 1;
    world.obstacles = driving ? [...cars, ...walkers] : [...cars, ...walkers, player];
    if (flying) {
      if (flying.update(dt, input, toast) === 'crash') { flying.engine = false; player.exitCar(flying); player.pos.set(airfield.exit.x, terrain.height(airfield.exit.x, airfield.exit.z), airfield.exit.z); flying = null; sound('fail'); }
      else player.pos.copy(flying.pos);
    }
    else if (driving) driving.update(dt, input, camState.yaw); else player.update(dt, input, camState.yaw);
    molinos.update(dt, dayNight.n, camera);
    if (!flying) plane?.update(0, null); // la hélice y la postura cuando está aparcada
    for (const c of cars) if (c !== driving && !c.police) {
      c.update(dt, null);
      // los coches que llegan a un callejón sin salida o al borde del mapa reaparecen lejos del jugador
      if (c.ai?.f?.deadEnd && c.pos.distanceTo(player.inCar ? player.inCar.pos : player.pos) > 90) aiSpawn(c);
    }
    const focus = flying ? flying.pos : driving ? driving.pos : player.pos;
    // coches dañados abandonados: a los 5 minutos sin nadie al volante desaparecen y sale uno nuevo
    // (en su sitio si estaba aparcado, o en otra calle si era del tráfico), siempre lejos de la vista
    if ((frameNo & 15) === 0) for (const c of cars) {
      if (c === driving || c.police || c.forSale || c.racer || c.health >= 100) { c.idleT = 0; continue; }
      c.idleT = (c.idleT || 0) + dt * 16;
      if (c.idleT < 300 || c.pos.distanceTo(focus) < 70 || (c.home && Math.hypot(c.home[0] - focus.x, c.home[1] - focus.z) < 70)) continue;
      c.idleT = 0; if (!c.owned) c.color = palette[Math.random() * palette.length | 0];
      c.repair(); c.fuel = 1; c.speed = 0;
      if (c.home) c.place(...c.home); else if (c.aiRespawn) c.aiRespawn(); else if (c.aiKind) aiSpawn(c);
    }
    regionTraffic?.update(focus, driving);
    for (const w of walkers) w.update(dt, cars, player, focus);

    // cámara en tercera persona con seguimiento suave
    const target = flying ? flying.pos : driving ? driving.pos : player.pos;
    const dist = driving ? 3 + 5.5 * driving.s : interiors.inside ? 2.6 : camState.dist, height = driving ? 0.6 + driving.s : 1.55 * world.personScale;
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
    if (flying) { // cámara de persecución detrás y por encima de la avioneta
      const fw = flying.forward(new THREE.Vector3()); fw.y *= 0.5;
      tmp.copy(flying.pos).addScaledVector(fw, -15).add(new THREE.Vector3(0, 4.5, 0));
      const gy2 = terrain.height(tmp.x, tmp.z) + 1.5; if (tmp.y < gy2) tmp.y = gy2;
      camera.position.lerp(tmp, 1 - Math.exp(-dt * 6)); camera.lookAt(flying.pos.x + fw.x * 20, flying.pos.y + 2 + fw.y * 20, flying.pos.z + fw.z * 20);
    }
    const fc = window.__game?.freeCam; if (fc) { camera.position.set(...fc.pos); camera.lookAt(...fc.look); }
    sky.position.copy(camera.position); // el cielo va con la cámara (el mapa mide 20 km)

    trees.update(target);
    if (outer) {
      outer.update(target, dayNight.far);
      // borde del mundo: 10 km desde el pueblo
      const lim = outer.data.half - 60, mover = driving || player, p = mover.pos;
      if (!flying)
      if (Math.abs(p.x) > lim || Math.abs(p.z) > lim) {
        p.x = THREE.MathUtils.clamp(p.x, -lim, lim); p.z = THREE.MathUtils.clamp(p.z, -lim, lim);
        if (driving) driving.speed *= -0.3;
        if ((frameNo & 63) === 0) toast('Fin del mapa', 'Hasta aquí llegan los 10 km alrededor de Val de Santa María');
      }
      // en el agua el coche se hunde y frena
      if (driving && (frameNo & 3) === 0) { const wy = outer.waterAt(p.x, p.z); if (wy != null && p.y < wy + 0.3) { driving.speed *= 0.7; if (Math.abs(driving.speed) < 0.5 && (frameNo & 127) === 0) toast('¡Al agua!', 'Los coches no flotan: sal marcha atrás'); } }
      if ((frameNo & 31) === 0) { const nm = outer.placeName(target.x, target.z) || data.title; if (placeEl.textContent !== nm) placeEl.textContent = nm; }
    }
    dayNight.update(dt, target);
    weather.inside = !!interiors.inside;
    weather.update(dt, interiors.inside ? new THREE.Vector3(0, -999, 0) : camera.position, dayNight, sun, hemi, sky);
    world.grip = weather.grip;
    for (const c of cars) if (c === driving || (c.ai && c.pos.distanceToSquared(target) < 3600)) c.wipers(dt, weather.raining);
    animals.update(dt, target, cars, dayNight);
    const nf = dayNight.n;
    for (const c of cars) c.setLights(c.ai || c === driving ? nf : 0, c === driving ? input.brake || (input.axes().y < 0 && driving.speed > 0.5) : c.ai && c.speed < 1);
    headlight.intensity = driving ? 60 * nf : 0;
    missions.update(dt, target);
    race.update(dt, driving, target);
    jobs.update(dt, target, driving); jobs.tick(dt);
    police.update(dt, target, driving, center, !!interiors.inside);
    const shopHint = shops.update(dt, driving, player);
    plaza.update(dt, dayNight, target, toast);
    // puertas del bar y de la iglesia
    const door = interiors.update(dt, player, driving, input);
    if (door) {
      fade.classList.add('on');
      setTimeout(() => {
        if (door.enter) { const r = door.enter; player.pos.set(r.spawn[0], 0, r.spawn[1] - 2); player.heading = Math.PI; toast(`${r.icon} ${r.name}`, 'Sal por la puerta del fondo (círculo blanco)'); }
        else { const r = door.exit, [x, z, a] = r.door; player.pos.set(x + Math.sin(a) * 1.6, 0, z + Math.cos(a) * 1.6); player.pos.y = terrain.height(player.pos.x, player.pos.z); player.heading = a; }
        camState.yaw = player.heading + Math.PI; camera.position.set(player.pos.x - Math.sin(player.heading) * 3, player.pos.y + 2, player.pos.z - Math.cos(player.heading) * 3);
        minimapEl.style.visibility = interiors.inside ? 'hidden' : 'visible';
        setTimeout(() => fade.classList.remove('on'), 150);
      }, 360);
    }
    // campanadas a las horas en punto: tantas como la hora (de 1 a 12)
    const hNow = Math.floor(dayNight.hour);
    if (hNow !== lastHour) { lastHour = hNow; if (bellTower && engine.ctx) toll = { n: hNow % 12 || 12, k: 0, t: 0 }; }
    if (toll && bellTower) {
      toll.t -= dt;
      if (toll.t <= 0 && toll.k < toll.n) { const d = Math.hypot(target.x - bellTower.x, target.z - bellTower.z); if (d < 1200) engine.bell(294, (interiors.inside ? 0.1 : 0.32) / (1 + d / 70)); toll.k++; toll.t = 2.1; }
      if (toll.k >= toll.n) toll = null;
    }
    ambient.update(dt, { day: 1 - dayNight.n, night: dayNight.n, rain: interiors.inside ? 0 : weather.cur.rain, wind: interiors.inside ? 0 : Math.max(weather.cur.snow, weather.cur.fog * 0.5), siren: police.siren, music: plaza.musicLevel, inside: !!interiors.inside });
    if ((saveT -= dt) <= 0) { saveT = 10; save(); }
    // campanas: repican al pasar junto a la iglesia (como mucho una vez cada minuto y medio)
    if (bellTower) {
      const bd = Math.hypot(target.x - bellTower.x, target.z - bellTower.z);
      bellTimer -= dt;
      if (bd < 32 && bellTimer <= 0 && !bellRing && engine.ctx) { bellRing = { t: 0, next: 0, k: 0 }; bellTimer = 90; }
      if (bellRing) {
        bellRing.t += dt;
        if (bellRing.t >= bellRing.next && bellRing.k < 12) {
          const i = bellRing.k % 2, vol = 0.35 / (1 + bd / 25);
          engine.bell(i ? 392 : 330, vol); if (bellRing.k % 4 === 3) engine.bell(523, vol * 0.6);
          bellRing.k++; bellRing.next += 0.85;
        }
        bellTower.bells.forEach((b, i) => { b.rotation.x = Math.sin(bellRing.t * 3.7 + i * 1.3) * 0.9 * Math.min(1, (11 - bellRing.t) / 2); });
        if (bellRing.t > 11) { bellRing = null; bellTower.bells.forEach(b => (b.rotation.x = 0)); }
      }
    }
    // la sombra sigue al jugador
    sun.position.copy(target).addScaledVector(dayNight.light, 200); sun.target.position.copy(target);

    if (flying) engine.update(true, 6 + flying.throttle * 12, flying.throttle, 1);
    else engine.update(!!driving, driving ? driving.speed : 0, driving ? input.axes().y : 0, driving ? driving.gear : 1);
    const offer = race.offer || jobs.offer || missions.offer || shops.offer || null;
    if ((offer?.id || null) !== offerUI.id) { offerUI.id = offer?.id || null; offerUI.declined = false; }
    curOffer = offer && !offerUI.declined ? offer : null;
    const oTxt = curOffer ? curOffer.text : '';
    if (offerUI.txt !== oTxt) { offerUI.txt = oTxt; offerEl.classList.toggle('on', !!curOffer); offerEl.querySelector('span').textContent = oTxt; }
    if ((frameNo++ & 1) === 0) minimap.draw(target.x, target.z, flying ? flying.heading : driving ? driving.heading : player.heading, camState.yaw, cars, driving, { walkers, flags: [...race.starts, ...jobs.flags, ...shops.flags, ...interiors.flags, ...(plane ? [[plane.f.park.x, plane.f.park.z, 'air']] : [])], target: race.target || jobs.target || missions.target, route: race.route || jobs.route, targetColor: race.target ? '#3aa0e2' : jobs.active || missions.state === 'deliver' ? '#47d16c' : '#f5c542' });
    camera.fov += ((driving ? 60 + Math.min(15, Math.abs(driving.speed) * 0.5) : 60) - camera.fov) * Math.min(1, dt * 3); camera.updateProjectionMatrix();
    if (driving && gearBtn.dataset.g !== String(driving.gear)) { gearBtn.dataset.g = driving.gear; gearBtn.textContent = driving.gear === 1 ? 'C' : 'L'; }
    const modeTxt = flying ? `✈ ${Math.round(flying.altitude)} m · gas ${Math.round(flying.throttle * 100)} %` : driving ? `${driving.gear === 1 ? 'Corta' : 'Larga'} · ${driving.wrecked ? 'averiado' : `daños ${Math.round(100 - driving.health)} %`} <span id="fuel"><i style="width:${Math.round(driving.fuel * 100)}%"></i></span>` : interiors.inside ? interiors.inside.name : 'A pie';
    if (hud.mode.innerHTML !== modeTxt) hud.mode.innerHTML = modeTxt;
    if ((frameNo & 15) === 0) { const w = weather.info.icon; if (wxEl.textContent !== w) wxEl.textContent = w; }
    if ((frameNo & 15) === 0) clockEl.textContent = (dayNight.n > 0.5 ? '🌙 ' : '') + dayNight.clock;
    hud.speed.textContent = flying ? `${Math.round(Math.abs(flying.speed) * 3.6)} km/h` : driving ? `${Math.round(Math.abs(driving.speed) * 3.6)} km/h` : '';
    const near = !driving && cars.some(c => !c.police && !c.forSale && c.pos.distanceTo(player.pos) < 4.5);
    hud.hint.textContent = police.bustT > 0.3 ? '🚓 ¡Te están deteniendo! Escapa'
      : interiors.hint || shopHint || jobs.hint
      || (driving && driving.fuel <= 0 ? 'Sin gasolina: bájate y busca otro vehículo' : '')
      || (race.nearOnFoot ? 'Necesitas un coche para la carrera' : race.nearName && !race.active ? `🏁 ${race.nearName}` : '')
      || (flying ? (flying.onGround ? (flying.canExit ? (input.touch ? 'Pulsa 🚪 para bajar · arriba para despegar' : 'E para bajar · W para despegar') : 'Rodando…') : '') : '')
      || (!driving && plane && plane.pos.distanceTo(player.pos) < 6 ? (input.touch ? 'Pulsa 🚪 para subir a la avioneta' : 'E para subir a la avioneta') : '')
      || (driving?.wrecked ? 'Coche averiado: bájate y coge otro' : driving ? (input.touch ? 'Pulsa 🚪 para bajar' : 'E para bajar') : near ? (input.touch ? 'Pulsa 🚪 para subir' : 'E para subir') : '');
    document.body.classList.toggle('driving', !!driving || !!flying);
    input.driving = !!driving;
    input.endFrame();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  window.__game = { region, regionTraffic, plane, get flying() { return flying; }, data, outer, weather, police, shops, jobs, plaza, interiors, save, animals, player, cars, walkers, race, camera, scene, renderer, terrain, dayNight, missions, get driving() { return driving; } };
  frame();
}).catch(e => { console.error(e); document.getElementById('lmsg').textContent = 'Error cargando: ' + e.message; });

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
