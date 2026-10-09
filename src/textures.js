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

// Mampostería de piedra típica de la Carballeda: lajas de pizarra y cuarcita irregulares.
function drawStone(g, w, h, r, palette) {
  g.fillStyle = '#5a5248'; g.fillRect(0, 0, w, h);
  let y = 0;
  while (y < h) {
    const rowH = 10 + r() * 16; let x = -r() * 30;
    while (x < w) {
      const sw = 18 + r() * 42;
      const c = palette[Math.floor(r() * palette.length)];
      const v = (r() - 0.5) * 30;
      g.fillStyle = `rgb(${c[0] + v | 0},${c[1] + v | 0},${c[2] + v | 0})`;
      g.beginPath();
      const j = () => (r() - 0.5) * 4;
      g.moveTo(x + 2 + j(), y + 2 + j()); g.lineTo(x + sw - 2 + j(), y + 2 + j());
      g.lineTo(x + sw - 2 + j(), y + rowH - 2 + j()); g.lineTo(x + 2 + j(), y + rowH - 2 + j());
      g.closePath(); g.fill();
      // sombreado en la parte baja de cada piedra
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(x + 2, y + rowH - 5, sw - 4, 3);
      g.fillStyle = 'rgba(255,255,255,0.07)'; g.fillRect(x + 3, y + 3, sw - 6, 2);
      x += sw;
    }
    y += rowH;
  }
}

const STONE = [[122, 112, 98], [104, 98, 90], [138, 124, 104], [92, 86, 80], [150, 132, 108], [116, 104, 86]];

function drawWindow(g, x, y, w, h, r) {
  // dintel y jambas de piedra, contraventanas de madera
  g.fillStyle = '#8f8576'; g.fillRect(x - 6, y - 8, w + 12, h + 14);
  g.fillStyle = '#1d1f22'; g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(120,150,170,0.35)'; g.fillRect(x + 3, y + 3, w / 2 - 4, h - 6); g.fillRect(x + w / 2 + 1, y + 3, w / 2 - 4, h - 6);
  g.fillStyle = '#e8e2d4'; g.fillRect(x + w / 2 - 1, y, 2, h); g.fillRect(x, y + h / 2 - 1, w, 2);
  const wood = r() < 0.5 ? '#5b3b22' : '#3f5a3a';
  g.fillStyle = wood; g.fillRect(x - 16, y, 12, h); g.fillRect(x + w + 4, y, 12, h);
  g.fillStyle = 'rgba(0,0,0,0.25)';
  for (let i = 0; i < h; i += 6) { g.fillRect(x - 16, y + i, 12, 1); g.fillRect(x + w + 4, y + i, 12, 1); }
}

function drawDoor(g, x, y, w, h, r) {
  g.fillStyle = '#8f8576'; g.fillRect(x - 7, y - 8, w + 14, h + 8);
  const c = ['#4a2f1c', '#5e3d22', '#2f3f2c', '#6b4a2b'][Math.floor(r() * 4)];
  g.fillStyle = c; g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(0,0,0,0.3)';
  for (let i = 8; i < w; i += 10) g.fillRect(x + i, y, 2, h);
  g.fillStyle = '#222'; g.fillRect(x + w - 10, y + h * 0.55, 4, 4);
}

export function makeTextures(renderer) {
  const max = renderer.capabilities.getMaxAnisotropy();
  const out = {};

  // Fachada con ventanas: 256 px = 4 m de ancho, 192 px = 3 m (una planta)
  {
    const [c, g] = canvas(512, 384); const r = rng(7);
    drawStone(g, 512, 384, r, STONE);
    drawWindow(g, 92, 60, 72, 92, r); drawWindow(g, 348, 60, 72, 92, r);
    drawDoor(g, 96, 230, 64, 154, r); drawWindow(g, 348, 250, 72, 86, r);
    out.facade = tex(c);
  }
  // Fachada encalada / revocada (algunas casas rehabilitadas)
  {
    const [c, g] = canvas(512, 384); const r = rng(11);
    g.fillStyle = '#d9cfbd'; g.fillRect(0, 0, 512, 384);
    for (let i = 0; i < 4000; i++) { g.fillStyle = `rgba(${r() < .5 ? 0 : 255},${r() < .5 ? 0 : 240},200,0.05)`; g.fillRect(r() * 512, r() * 384, 2 + r() * 5, 2 + r() * 5); }
    g.fillStyle = 'rgba(80,60,40,0.25)'; g.fillRect(0, 352, 512, 32); // zócalo manchado
    drawWindow(g, 92, 60, 72, 92, r); drawWindow(g, 348, 60, 72, 92, r);
    drawDoor(g, 96, 230, 64, 154, r); drawWindow(g, 348, 250, 72, 86, r);
    out.facadePlaster = tex(c);
  }
  // Piedra lisa (pajares, corrales, muros)
  {
    const [c, g] = canvas(512, 512); const r = rng(3);
    drawStone(g, 512, 512, r, STONE);
    out.stone = tex(c);
  }
  // Teja árabe
  {
    const [c, g] = canvas(256, 256); const r = rng(5);
    g.fillStyle = '#6e3422'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 16) for (let x = 0; x < 256; x += 16) {
      const v = (r() - 0.5) * 40, off = (y / 16) % 2 ? 8 : 0;
      const gr = g.createLinearGradient(x + off, 0, x + off + 16, 0);
      gr.addColorStop(0, `rgb(${120 + v},${52 + v / 2},${34 + v / 3})`);
      gr.addColorStop(0.5, `rgb(${178 + v},${88 + v / 2},${58 + v / 3})`);
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
    g.fillStyle = '#55575a'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 9000; i++) { const v = 60 + r() * 70 | 0; g.fillStyle = `rgba(${v},${v},${v + 3},0.5)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 2, 1 + r() * 2); }
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(25,25,25,0.4)'; g.lineWidth = 1; g.beginPath(); let x = r() * 256, y = r() * 256; g.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (r() - .5) * 40; y += (r() - .5) * 40; g.lineTo(x, y); } g.stroke(); }
    out.asphalt = tex(c);
  }
  // Hormigón de calle de pueblo
  {
    const [c, g] = canvas(256, 256); const r = rng(13);
    g.fillStyle = '#9a958a'; g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 7000; i++) { const v = 120 + r() * 60 | 0; g.fillStyle = `rgba(${v},${v - 4},${v - 12},0.35)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3); }
    g.fillStyle = 'rgba(40,35,30,0.35)'; g.fillRect(0, 0, 256, 2); // junta
    for (let i = 0; i < 30; i++) { g.fillStyle = 'rgba(70,60,50,0.12)'; g.beginPath(); g.arc(r() * 256, r() * 256, 4 + r() * 18, 0, 7); g.fill(); }
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
  for (const t of Object.values(out)) t.anisotropy = max;
  return out;
}
