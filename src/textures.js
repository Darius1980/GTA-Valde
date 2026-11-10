// Texturas procedurales dibujadas en canvas (sin imágenes externas).
import * as THREE from 'three';

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function tex(c, repeat = true, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Mampostería de piedra típica de la Carballeda: lajas de cuarcita y pizarra ocres y rojizas,
// planas y alargadas, con mucho mortero claro entre ellas (según las capturas de Street View de Valde).
function drawStone(g, w, h, r, palette, k = 1, mortar = '#a99d8a') {
  g.fillStyle = mortar; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 2500; i++) { const v = r() < 0.5 ? 'rgba(70,60,50,0.10)' : 'rgba(235,228,214,0.12)'; g.fillStyle = v; g.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3); }
  let y = -4;
  while (y < h) {
    const rowH = (9 + r() * 14) * k; let x = -r() * 40 * k;
    while (x < w) {
      const sw = (22 + r() * 52) * k, sh = rowH * (0.7 + r() * 0.35);
      const c = palette[Math.floor(r() * palette.length)];
      const v = (r() - 0.5) * 26;
      g.fillStyle = `rgb(${c[0] + v | 0},${c[1] + v | 0},${c[2] + v | 0})`;
      const j = () => (r() - 0.5) * 5, x0 = x + 2.5, x1 = x + sw - 2.5, y0 = y + 2 + r() * 2, y1 = y0 + sh - 3;
      g.beginPath();
      g.moveTo(x0 + j(), y0 + 2 + j()); g.lineTo(x0 + sw * 0.3 + j(), y0 + j()); g.lineTo(x1 - 2 + j(), y0 + 1 + j());
      g.lineTo(x1 + j(), (y0 + y1) / 2 + j()); g.lineTo(x1 - 3 + j(), y1 + j()); g.lineTo(x0 + sw * 0.5 + j(), y1 + 1 + j()); g.lineTo(x0 + 1 + j(), y1 - 1 + j());
      g.closePath(); g.fill();
      // vetas y manchas de óxido de la cuarcita
      for (let k = 0; k < 3; k++) { g.fillStyle = r() < 0.5 ? 'rgba(120,60,30,0.18)' : 'rgba(240,220,190,0.12)'; g.fillRect(x0 + r() * (sw - 8), y0 + r() * (sh - 5), 4 + r() * 14, 1 + r() * 3); }
      g.fillStyle = 'rgba(0,0,0,0.16)'; g.fillRect(x0 + 2, y1 - 2, sw - 9, 2);
      g.fillStyle = 'rgba(255,240,220,0.10)'; g.fillRect(x0 + 3, y0 + 1, sw - 10, 2);
      x += sw;
    }
    y += rowH;
  }
}

const STONE = [[184, 128, 88], [166, 112, 76], [156, 124, 96], [134, 112, 92], [182, 150, 116], [118, 102, 88], [160, 100, 66], [196, 162, 126], [146, 136, 122], [128, 120, 110]];

// recercado de ladrillo macizo rojo alrededor de puertas y ventanas (como en la calle Arriba)
// fachadas: piedra más grande, granito pardo y cuarcita, con mortero ancho
const GRANITE = [[150, 130, 110], [132, 116, 98], [170, 140, 104], [118, 106, 94], [176, 150, 120], [108, 96, 86], [160, 120, 84], [140, 122, 100]];
function brickFrame(g, x, y, w, h, r, t = 30) {
  g.fillStyle = '#c9b49a'; g.fillRect(x - t, y - t, w + 2 * t, h + t + 6);
  for (let yy = y - t, row = 0; yy < y + h + 6; yy += 9, row++) for (let xx = x - t - (row % 2) * 14; xx < x + w + t; xx += 28) {
    const inside = xx + 26 > x && xx < x + w && yy + 8 > y && yy < y + h; if (inside) continue;
    const v = (r() - 0.5) * 34; g.fillStyle = `rgb(${182 + v | 0},${96 + v * 0.5 | 0},${66 + v * 0.4 | 0})`;
    g.fillRect(Math.max(x - t, xx) + 1, yy + 1, Math.min(26, x + w + t - xx - 1), 7);
  }
}
function drawWindow(g, x, y, w, h, r, grille = false) {
  brickFrame(g, x, y, w, h, r);
  g.fillStyle = '#b8b2a6'; g.fillRect(x - 6, y + h, w + 12, 8); // alféizar
  if (r() < 0.45) { // persiana enrollable blanca medio bajada
    g.fillStyle = '#1d1f22'; g.fillRect(x, y, w, h);
    const d = h * (0.45 + r() * 0.5); g.fillStyle = '#e9e7e1'; g.fillRect(x, y, w, d);
    g.fillStyle = 'rgba(0,0,0,0.12)'; for (let i = 4; i < d; i += 5) g.fillRect(x, y + i, w, 1);
    g.fillStyle = '#6b4223'; g.fillRect(x, y + d, w, 3);
  } else { // ventana de madera de dos hojas
    g.fillStyle = '#6b4223'; g.fillRect(x, y, w, h);
    for (const gx of [x + 6, x + w / 2 + 3]) { const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#6f8798'); gr.addColorStop(0.5, '#34414c'); gr.addColorStop(1, '#262d33'); g.fillStyle = gr; g.fillRect(gx, y + 6, w / 2 - 9, h - 12); }
    
    g.fillStyle = '#6b4223'; g.fillRect(x + 6, y + h / 2 - 2, w - 12, 4);
  }
  if (grille) { g.fillStyle = '#2a2420'; for (let i = 8; i < w; i += 13) g.fillRect(x + i, y - 2, 3, h + 4); g.fillRect(x, y + 10, w, 3); g.fillRect(x, y + h - 12, w, 3); }
}

function drawDoor(g, x, y, w, h, r) {
  brickFrame(g, x, y, w, h, r);
  const c = ['#8a5a30', '#6e4526', '#7a4a2a', '#5e3d22'][Math.floor(r() * 4)];
  g.fillStyle = '#20262c'; g.fillRect(x, y, w, 26); // montante acristalado
  g.fillStyle = c; g.fillRect(x, y + 26, w, h - 26);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(x + w / 2 - 1, y + 26, 2, h - 26);
  for (const ox of [8, w / 2 + 8]) for (let k = 0; k < 3; k++) { g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 2; g.strokeRect(x + ox, y + 40 + k * ((h - 50) / 3), w / 2 - 16, (h - 50) / 3 - 10); }
  g.fillStyle = '#c9a640'; g.fillRect(x + w / 2 + 6, y + h * 0.55, 10, 4);
}

export function makeTextures(renderer) {
  const max = renderer.capabilities.getMaxAnisotropy();
  const out = {};

  // Fachadas a escala real: cada textura es una planta de 4 m x 3 m (128 px por metro).
  // Ventanas de 0,9 x 1,2 m con alféizar a 0,9 m; puertas de 1 x 2,2 m.
  const upper = (g, r) => { drawWindow(g, 200, 110, 110, 160, r); };
  // la planta baja mide 8 m: una puerta y dos ventanas pequeñas (las casas del pueblo tienen pocos huecos)
  const ground = (g, r) => { drawDoor(g, 120, 102, 150, 282, r); drawWindow(g, 470, 120, 105, 150, r, true); drawWindow(g, 830, 120, 105, 150, r, true); };
  const stoneBase = (g, r, w) => drawStone(g, w, 384, r, GRANITE, 1.7, '#bfae92');
  const plasterBase = (g, r, w) => {
    g.fillStyle = '#d9cfbd'; g.fillRect(0, 0, w, 384);
    for (let i = 0; i < 8000; i++) { g.fillStyle = `rgba(${r() < .5 ? 0 : 255},${r() < .5 ? 0 : 240},200,0.05)`; g.fillRect(r() * w, r() * 384, 2 + r() * 5, 2 + r() * 5); }
  };
  for (const [name, baseFn, openFn, seed] of [['facade', stoneBase, upper, 7], ['facadeGround', stoneBase, ground, 8],
    ['facadePlaster', plasterBase, upper, 11], ['facadePlasterGround', plasterBase, ground, 12]]) {
    const W = openFn === ground ? 1024 : 512;
    const [c, g] = canvas(W, 384); const r = rng(seed);
    baseFn(g, r, W);
    if (name === 'facadePlasterGround') { g.fillStyle = 'rgba(80,60,40,0.25)'; g.fillRect(0, 330, W, 54); } // zócalo manchado
    openFn(g, r);
    out[name] = tex(c);
    // mapa de luz nocturna: solo el cristal de las ventanas (el shader enciende unas sí y otras no)
    const [ce, ge] = canvas(W / 4, 96); ge.fillStyle = '#000'; ge.fillRect(0, 0, W / 4, 96);
    const glow = (x, y, w, h) => { const gr = ge.createRadialGradient((x + w / 2) / 4, (y + h / 2) / 4, 2, (x + w / 2) / 4, (y + h / 2) / 4, h / 5);
      gr.addColorStop(0, '#ffd890'); gr.addColorStop(1, '#c87a30'); ge.fillStyle = gr; ge.fillRect(x / 4, y / 4, w / 4, h / 4); };
    if (openFn === upper) glow(200, 110, 110, 160); else { glow(470, 120, 105, 150); glow(830, 120, 105, 150); }
    out[name + 'Night'] = tex(ce);
  }
  // ladrillo macizo (cornisa bajo el alero y recercados)
  {
    const [c, g] = canvas(256, 64); const r = rng(77);
    g.fillStyle = '#cdb89c'; g.fillRect(0, 0, 256, 64);
    for (let y = 0, row = 0; y < 64; y += 9, row++) for (let x = -(row % 2) * 14; x < 256; x += 28) { const v = (r() - 0.5) * 34; g.fillStyle = `rgb(${182 + v | 0},${96 + v * 0.5 | 0},${66 + v * 0.4 | 0})`; g.fillRect(x + 1, y + 1, 26, 7); }
    out.brick = tex(c);
  }
  // mampostería de la iglesia: granito pardo y cuarcita ocre con mucho mortero de cal y líquenes
  {
    const [c, g] = canvas(512, 384); const r = rng(61);
    drawStone(g, 512, 384, r, [[196, 170, 136], [182, 150, 112], [204, 178, 142], [168, 140, 108], [150, 136, 118], [190, 140, 100], [210, 188, 156], [140, 126, 110]], 1.45, '#d4cab6');
    for (let i = 0; i < 60; i++) { g.fillStyle = r() < 0.5 ? 'rgba(220,214,200,0.25)' : 'rgba(70,74,60,0.12)'; g.beginPath(); g.arc(r() * 512, r() * 384, 3 + r() * 16, 0, 7); g.fill(); }
    out.churchStone = tex(c);
  }
  // Sillería de granito (iglesia)
  {
    const [c, g] = canvas(512, 384); const r = rng(51);
    g.fillStyle = '#8e8573'; g.fillRect(0, 0, 512, 384);
    for (let y = 0; y < 384; y += 48) for (let x = (y / 48) % 2 ? -50 : 0; x < 512; x += 100) {
      const v = (r() - 0.5) * 26, w = 96;
      g.fillStyle = `rgb(${172 + v | 0},${160 + v | 0},${138 + v | 0})`; g.fillRect(x + 2, y + 2, w, 44);
      for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(${r() < .5 ? 60 : 230},${r() < .5 ? 60 : 220},${r() < .5 ? 50 : 200},0.12)`; g.fillRect(x + 2 + r() * w, y + 2 + r() * 42, 2 + r() * 4, 2 + r() * 3); }
      g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(x + 2, y + 40, w, 6);
      if (r() < 0.2) { g.fillStyle = 'rgba(70,80,50,0.18)'; g.fillRect(x + 2, y + 2, w, 44); } // líquenes
    }
    out.ashlar = tex(c);
  }
  // Piedra lisa (pajares, corrales, muros)
  {
    const [c, g] = canvas(512, 512); const r = rng(3);
    drawStone(g, 512, 512, r, STONE);
    out.stone = tex(c);
  }
  // Bloques de hormigón gris (tapias nuevas): 40 × 20 cm, la textura cubre 3 m
  {
    const [c, g] = canvas(512, 512); const r = rng(13), bw = 512 / 7.5, bh = bw / 2;
    g.fillStyle = '#8d8c87'; g.fillRect(0, 0, 512, 512);
    for (let y = 0, row = 0; y < 512; y += bh, row++) for (let x = (row % 2) * -bw / 2; x < 512; x += bw) {
      const v = 150 + (r() - 0.5) * 24; g.fillStyle = `rgb(${v},${v - 2},${v - 6})`; g.fillRect(x + 2, y + 2, bw - 3, bh - 3);
      for (let i = 0; i < 25; i++) { g.fillStyle = r() < 0.5 ? 'rgba(60,60,60,0.12)' : 'rgba(230,230,225,0.12)'; g.fillRect(x + 2 + r() * (bw - 4), y + 2 + r() * (bh - 4), 1 + r() * 2, 1 + r() * 2); }
    }
    out.block = tex(c);
  }
  // Teja árabe
  {
    const [c, g] = canvas(256, 256); const r = rng(5);
    g.fillStyle = '#6e3422'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 16) for (let x = 0; x < 256; x += 16) {
      const v = (r() - 0.5) * 40, off = (y / 16) % 2 ? 8 : 0;
      const gr = g.createLinearGradient(x + off, 0, x + off + 16, 0);
      gr.addColorStop(0, `rgb(${132 + v},${64 + v / 2},${42 + v / 3})`);
      gr.addColorStop(0.5, `rgb(${192 + v},${106 + v / 2},${70 + v / 3})`);
      gr.addColorStop(1, `rgb(${110 + v},${48 + v / 2},${30 + v / 3})`);
      g.fillStyle = gr; g.fillRect(x + off, y, 15, 15);
      g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(x + off, y + 14, 16, 2);
      if (r() < 0.08) { g.fillStyle = 'rgba(60,70,40,0.35)'; g.fillRect(x + off, y, 15, 15); } // líquenes
    }
    out.roof = tex(c);
  }
  // Asfalto
  {
    const [c, g] = canvas(256, 256); const r = rng(9);
    // asfalto viejo de pueblo: gris claro, con árido a la vista y parches más oscuros (Street View)
    g.fillStyle = '#6f6e6a'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 5; i++) { g.fillStyle = r() < 0.5 ? 'rgba(40,40,42,0.18)' : 'rgba(160,150,135,0.12)'; const x = r() * 256, y = r() * 256; g.fillRect(x, y, 30 + r() * 80, 20 + r() * 60); }
    for (let i = 0; i < 11000; i++) { const v = 70 + r() * 90 | 0; g.fillStyle = `rgba(${v + 4},${v},${v - 4},0.5)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 2, 1 + r() * 2); }
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(25,25,25,0.4)'; g.lineWidth = 1; g.beginPath(); let x = r() * 256, y = r() * 256; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - .5) * 40; y += (r() - .5) * 40; g.lineTo(x, y); } g.stroke(); }
    out.asphalt = tex(c);
  }
  // Hormigón de calle de pueblo
  {
    const [c, g] = canvas(256, 256); const r = rng(13);
    g.fillStyle = '#a6a196'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 7000; i++) { const v = 120 + r() * 60 | 0; g.fillStyle = `rgba(${v},${v - 4},${v - 12},0.35)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3); }
    g.fillStyle = 'rgba(40,35,30,0.35)'; g.fillRect(0, 0, 256, 2); // junta
    for (let i = 0; i < 10; i++) { g.fillStyle = 'rgba(70,60,50,0.06)'; g.beginPath(); g.arc(r() * 256, r() * 256, 4 + r() * 14, 0, 7); g.fill(); }
    out.concrete = tex(c);
  }
  // Tierra de camino
  {
    const [c, g] = canvas(256, 256); const r = rng(17);
    g.fillStyle = '#b08c62'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 8000; i++) { const v = (r() - .5) * 60; g.fillStyle = `rgba(${170 + v | 0},${135 + v | 0},${95 + v | 0},0.5)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3); }
    out.dirt = tex(c);
  }
  // Detalle de suelo (se multiplica sobre la ortofoto de cerca)
  {
    const [c, g] = canvas(256, 256); const r = rng(21);
    g.fillStyle = '#808080'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 14000; i++) { const v = 100 + r() * 60 | 0; g.fillStyle = `rgba(${v},${v},${v},0.45)`; g.fillRect(r() * 256, r() * 256, 1, 1 + r() * 4); }
    out.detail = tex(c, true, false);
  }
  // Copa de árbol (sprite de hojas)
  {
    const [c, g] = canvas(128, 128); const r = rng(23);
    g.fillStyle = '#2f3d22'; g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 1500; i++) { const v = (r() - .4) * 50; g.fillStyle = `rgb(${55 + v | 0},${75 + v | 0},${38 + v / 2 | 0})`; g.beginPath(); g.ellipse(r() * 128, r() * 128, 2 + r() * 3, 1 + r() * 2, r() * 3, 0, 7); g.fill(); }
    out.leaves = tex(c);
  }
  // Corteza
  {
    const [c, g] = canvas(64, 128); const r = rng(29);
    g.fillStyle = '#4a3b2e'; g.fillRect(0, 0, 64, 128);
    for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(20,15,10,${0.2 + r() * 0.3})`; g.fillRect(r() * 64, 0, 1 + r() * 3, 128); }
    out.bark = tex(c);
  }
  // Fachadas urbanas (bloques de viviendas de los años 60-80): 256 px = 3 m x 2,8 m (una planta)
  const WALLS = ['#e9e1cf', '#d9c9a8', '#cfd2cc', '#e4d2bd', '#c7a98a', '#bfc4c9', '#efe9de', '#d8b79a'];
  out.urban = WALLS.map((wc, k) => {
    const [c, g] = canvas(256, 256); const r = rng(100 + k);
    const brick = k === 4 || k === 7;
    g.fillStyle = wc; g.fillRect(0, 0, 256, 256);
    if (brick) for (let y = 0; y < 256; y += 8) for (let x = (y / 8) % 2 ? -10 : 0; x < 256; x += 20) {
      const v = (r() - 0.5) * 30; g.fillStyle = `rgb(${165 + v | 0},${90 + v / 2 | 0},${65 + v / 3 | 0})`; g.fillRect(x + 1, y + 1, 18, 6);
    }
    for (let i = 0; i < 1500; i++) { g.fillStyle = `rgba(0,0,0,${r() * 0.05})`; g.fillRect(r() * 256, r() * 256, 2 + r() * 6, 2 + r() * 6); }
    // manchas de humedad bajo el alféizar (clima húmedo)
    const grd = g.createLinearGradient(0, 200, 0, 256); grd.addColorStop(0, 'rgba(60,60,50,0.18)'); grd.addColorStop(1, 'rgba(60,60,50,0)');
    g.fillStyle = grd; g.fillRect(70, 200, 116, 56);
    const balcony = k % 3 === 0;
    const wx = 68, wy = 48, ww = 120, wh = balcony ? 170 : 140;
    g.fillStyle = '#f4f4f2'; g.fillRect(wx - 6, wy - 6, ww + 12, wh + 12); // marco de PVC / aluminio
    g.fillStyle = '#26323a'; g.fillRect(wx, wy, ww, wh);
    g.fillStyle = 'rgba(150,180,200,0.35)'; g.fillRect(wx + 4, wy + 4, ww / 2 - 6, wh - 8);
    g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.moveTo(wx + 8, wy + 8); g.lineTo(wx + 40, wy + 8); g.lineTo(wx + 8, wy + 60); g.fill();
    g.fillStyle = '#f4f4f2'; g.fillRect(wx + ww / 2 - 2, wy, 4, wh);
    // persiana enrollable a media altura
    const sh = 20 + r() * 70; g.fillStyle = ['#e8e4dc', '#b9a27f', '#6c5a48', '#d6d8d6'][k % 4]; g.fillRect(wx, wy, ww, sh);
    g.fillStyle = 'rgba(0,0,0,0.12)'; for (let y = wy; y < wy + sh; y += 4) g.fillRect(wx, y, ww, 1);
    g.fillStyle = '#c9c4ba'; g.fillRect(wx - 10, wy + wh + 6, ww + 20, 8); // alféizar
    if (balcony) { // barandilla de balcón
      g.fillStyle = 'rgba(40,40,40,0.9)'; g.fillRect(wx - 20, wy + wh - 70, ww + 40, 5);
      for (let x = wx - 20; x <= wx + ww + 20; x += 9) g.fillRect(x, wy + wh - 70, 3, 76);
      g.fillStyle = '#b8b2a6'; g.fillRect(wx - 24, wy + wh + 4, ww + 48, 10);
    }
    if (r() < 0.3) { g.fillStyle = '#5d6b77'; g.fillRect(200, 20, 30, 24); } // aire acondicionado / tendedero
    return tex(c);
  });
  // Planta baja: lonjas y portales
  out.urbanGround = [0, 1].map(k => {
    const [c, g] = canvas(256, 256); const r = rng(300 + k);
    g.fillStyle = k ? '#8d8a84' : '#a39c8f'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 32) { g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(0, y, 256, 2); }
    if (k === 0) { // persiana metálica de lonja con pintadas
      g.fillStyle = '#9ea3a6'; g.fillRect(24, 50, 208, 206);
      g.fillStyle = 'rgba(0,0,0,0.15)'; for (let y = 50; y < 256; y += 6) g.fillRect(24, y, 208, 2);
      const cols = ['#d23', '#26b', '#2a4', '#fb2', '#000'];
      for (let i = 0; i < 6; i++) { g.strokeStyle = cols[Math.floor(r() * 5)]; g.lineWidth = 3 + r() * 4; g.beginPath(); g.moveTo(40 + r() * 170, 100 + r() * 120); for (let k2 = 0; k2 < 4; k2++) g.lineTo(40 + r() * 170, 100 + r() * 120); g.stroke(); }
    } else { // portal de cristal
      g.fillStyle = '#3b3f42'; g.fillRect(70, 40, 116, 216);
      g.fillStyle = 'rgba(170,200,220,0.5)'; g.fillRect(78, 48, 46, 200); g.fillRect(132, 48, 46, 200);
      g.fillStyle = '#d4af37'; g.fillRect(120, 150, 4, 20);
      g.fillStyle = '#ddd'; g.fillRect(60, 20, 136, 14);
    }
    return tex(c);
  });
  // Cubierta plana (tela asfáltica / grava)
  {
    const [c, g] = canvas(256, 256); const r = rng(41);
    g.fillStyle = '#6f6e6a'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 9000; i++) { const v = 80 + r() * 70 | 0; g.fillStyle = `rgba(${v},${v},${v - 4},0.5)`; g.fillRect(r() * 256, r() * 256, 2, 2); }
    out.flatRoof = tex(c);
  }
  // Acera de baldosas
  {
    const [c, g] = canvas(256, 256); const r = rng(43);
    g.fillStyle = '#b3aea5'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 32) for (let x = 0; x < 256; x += 32) {
      const v = (r() - 0.5) * 18; g.fillStyle = `rgb(${178 + v | 0},${173 + v | 0},${164 + v | 0})`; g.fillRect(x + 1, y + 1, 30, 30);
      for (let k = 0; k < 9; k++) { g.fillStyle = 'rgba(0,0,0,0.07)'; g.fillRect(x + 4 + (k % 3) * 9, y + 4 + Math.floor(k / 3) * 9, 6, 6); } // pastilla
    }
    out.sidewalk = tex(c);
  }
  for (const t of [...Object.values(out)].flat()) t.anisotropy = max;
  return out;
}
