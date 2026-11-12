const B = 300; // la foto cubre de -300 a 300 m en x y en z (norte arriba)
const cv = document.getElementById('cv'), g = cv.getContext('2d'), map = document.getElementById('map');
const img = new Image(); img.src = 'ortho_center.jpg'; img.onload = draw;
// fotos de alrededor (más bastas) para poner molinos en los montes: 3,6 km y 20 km de lado
const FAR = 10000, PLANO = 4000, MID = 1800, EDIT = 4000, imgMid = new Image(), imgFar = new Image(), imgPlano = new Image(); imgMid.src = 'ortho_mid.jpg'; imgFar.src = 'ortho_far.jpg'; imgPlano.src = 'ortho_plano.jpg'; imgMid.onload = imgFar.onload = imgPlano.onload = () => draw();
const ROTOR = 86; // palas de 86 m, buje a 150 m
let view = { cx: -10, cz: 10, s: 2 }; // centro (m) y píxeles por metro
// mode: wall | ruin | bld (dibujar) · gone (quitar casa del Catastro) · del (borrar algo mío)
let shaped = new Map(), colShape = null, wallGone = new Map(), noAuto = false, colWallGone = null, trees = [], treeGone = new Map(), colTree = null, colTreeGone = null, off = [0, 0], offSaved = [0, 0], fz = 1, frot = 0, mode = 'wall', cur = [], items = [], gone = new Map(), sel = null, showGame = true, db = null, col = null, colGone = null;
const hist = []; // pasos para deshacer: { undo(): void|Promise, alive?(): bool }
const redoSt = []; // lo deshecho, para rehacer (Ctrl+Y)
const push = (undo, alive, redo) => { hist.push({ undo, alive, redo }); if (hist.length > 200) hist.shift(); redoSt.length = 0; };
const newId = () => Array.from({ length: 20 }, () => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random() * 36 | 0]).join('');
const editPts = () => sel?.item && sel.item.kind !== 'suelo' && (!$('edit').hidden || !$('shapeBar').hidden);
const $ = id => document.getElementById(id), status = t => { $('status').textContent = t; };
const drawing = () => ['wall', 'ruin', 'bld', 'tree', 'untree', 'rock', 'nivel'].includes(mode), area = () => ['bld', 'tree', 'untree', 'rock', 'nivel'].includes(mode);
// pincel de suelo: cada trazo es un documento { kind: 'suelo', mat, r, xy }; la goma ('borrar') devuelve el suelo de la foto
let paintMat = 'tierra', stroke = null, hover = null;
const PAINT = { tierra: [176, 140, 98], hierba: [96, 150, 60], grava: [205, 200, 188] };
const TALUD = { suave: 12, medio: 6, fuerte: 3, muro: 1 }, TALUD_TXT = { suave: 'talud suave', medio: 'talud medio', fuerte: 'talud fuerte', muro: 'corte vertical' };
const dhTxt = v => v > 0 ? 'Subir ' + v + ' m' : v < 0 ? 'Bajar ' + (-v) + ' m' : 'Aplanar';
const layer = document.createElement('canvas'), lg = layer.getContext('2d');
const TOOL = { wall: 'Tapia', ruin: 'Ruina', rock: 'Rocas naturales', bld: 'Edificio nuevo', shape: 'Ajustar casa', gone: 'Quitar casa', tree: 'Poner árboles', untree: 'Quitar árboles', paint: 'Pincel de suelo', nivel: 'Desnivel', del: 'Editar lo mío', unwall: 'Quitar tapia del juego', photo: 'Mover foto', molino: 'Molino eólico' };
const HINT = { wall: 'Toca punto a punto y pulsa Guardar', ruin: 'Toca punto a punto y pulsa Guardar', rock: 'Dibuja el contorno de las rocas', bld: 'Toca las esquinas del edificio', shape: 'Toca una casa y arrastra sus esquinas', gone: 'Toca la casa que sobra', tree: 'Dibuja el contorno de la zona', untree: 'Dibuja el contorno de la zona', paint: 'Arrastra para pintar; dos dedos o botón derecho para moverte', nivel: 'Dibuja el contorno de la zona que sube o baja', del: 'Toca algo tuyo para cambiarlo o borrarlo', unwall: 'Toca una tapia blanca discontinua', photo: 'Arrastra la foto o usa las flechas', molino: 'Toca el sitio del molino; aleja el plano para ver los montes' };
function resize() { const r = map.getBoundingClientRect(), d = devicePixelRatio || 1; cv.width = r.width * d; cv.height = r.height * d; g.setTransform(d, 0, 0, d, 0, 0); draw(); }
const W = () => cv.width / (devicePixelRatio || 1), H = () => cv.height / (devicePixelRatio || 1);
const toS = (x, z) => [(x - view.cx) * view.s + W() / 2, (z - view.cz) * view.s + H() / 2];
const toW = (px, py) => [(px - W() / 2) / view.s + view.cx, (py - H() / 2) / view.s + view.cz];
function path(p, close) { g.beginPath(); p.forEach((q, i) => { const [a, b] = toS(q[0], q[1]); i ? g.lineTo(a, b) : g.moveTo(a, b); }); if (close) g.closePath(); }
const keyOf = b => b.id + '@' + b.c[0] + ',' + b.c[1];
const docId = k => k.replace(/[^A-Za-z0-9_\-.~:@+]/g, '_');
function inside([x, z], p) { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) if ((p[i][1] > z) !== (p[j][1] > z) && x < (p[j][0] - p[i][0]) * (z - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) c = !c; return c; }
const wkey = w => 'w' + Math.round(w.p[0][0] * 10) + '_' + Math.round(w.p[0][1] * 10) + '_' + Math.round(w.p[w.p.length - 1][0] * 10) + '_' + Math.round(w.p[w.p.length - 1][1] * 10);
const tkey = (x, z) => 't' + Math.round(x * 10) + '_' + Math.round(z * 10);
function draw() {
  const parts0 = [];
  const css = getComputedStyle(document.documentElement), C = k => css.getPropertyValue(k).trim();
  g.fillStyle = '#3a3a36'; g.fillRect(0, 0, W(), H());
  for (const [im, h] of [[imgFar, FAR], [imgPlano, PLANO], [imgMid, MID]]) if (im.complete && im.naturalWidth) { const [a, b] = toS(-h, -h); g.drawImage(im, a, b, 2 * h * view.s, 2 * h * view.s); }
  if (img.complete && img.naturalWidth) { const [a, b] = toS(off[0], off[1]); g.save(); g.translate(a, b); g.rotate(frot * Math.PI / 180); const L = B * fz * view.s; g.drawImage(img, -L, -L, 2 * L, 2 * L); g.restore(); }
  g.lineCap = 'round'; g.lineJoin = 'round';
  drawPaint();
  // desniveles: el talud como banda clara y la zona llena (azul si sube, naranja si baja, gris si se aplana)
  for (const it of items) if (it.kind === 'nivel') {
    const hi = sel && sel.item === it, w = TALUD[it.talud] ?? 6, rgb = it.dh > 0 ? '79,163,224' : it.dh < 0 ? '232,140,58' : '200,200,200';
    path(it.p, true); g.lineWidth = Math.max(2, 2 * w * view.s); g.strokeStyle = `rgba(${rgb},0.25)`; g.stroke();
    path(it.p, true); g.fillStyle = `rgba(${rgb},0.4)`; g.fill(); g.lineWidth = hi ? 5 : 2.5; g.strokeStyle = hi ? '#4fc3f7' : `rgb(${rgb})`; g.stroke();
    const c = it.p.reduce((a, q) => [a[0] + q[0] / it.p.length, a[1] + q[1] / it.p.length], [0, 0]), [a, b] = toS(c[0], c[1]);
    g.font = '700 12px system-ui'; g.textAlign = 'center'; g.lineWidth = 3; g.strokeStyle = 'rgba(0,0,0,0.6)'; const t = (it.dh > 0 ? '+' : '') + (it.dh ? it.dh + ' m' : 'llano'); g.strokeText(t, a, b + 4); g.fillStyle = '#fff'; g.fillText(t, a, b + 4); g.textAlign = 'start';
  }
  // casas del Catastro (las que se quitan, en rojo y tachadas)
  for (const b of DATA.b) {
    const k = docId(keyOf(b)), off = gone.has(k), editing = sel?.cat === b && sel.item, bp = editing ? sel.item.p : shaped.get(k)?.p || b.p;
    path(bp, true);
    if (off) { if (mode === 'gone') { g.setLineDash([4, 4]); g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,59,48,0.7)'; g.stroke(); g.setLineDash([]); } } // quitada: no se ve (en Quitar casa, un contorno tenue para recuperarla)
    else { g.fillStyle = 'rgba(255,255,255,0.12)'; g.fill(); g.lineWidth = shaped.has(k) ? 2 : 1.2; g.strokeStyle = shaped.has(k) ? '#ffd54f' : 'rgba(255,255,255,0.85)'; g.stroke(); }
    if (sel && sel.cat === b) { path(bp, true); g.lineWidth = 4; g.strokeStyle = '#4fc3f7'; g.stroke(); }
  }
  // árboles: los del juego (verde oscuro), los quitados (aspa roja) y los nuevos (verde vivo)
  const tr = Math.max(2.5, 2.2 * view.s);
  const clears = items.filter(i => i.kind === 'clear');
  for (const [x, z] of DATA.t) { const [a, b] = toS(x, z);
    if (clears.some(c => inside([x, z], c.p))) { g.strokeStyle = C('--gone'); g.lineWidth = 2.5; g.beginPath(); g.moveTo(a - tr, b - tr); g.lineTo(a + tr, b + tr); g.moveTo(a + tr, b - tr); g.lineTo(a - tr, b + tr); g.stroke(); }
    else { g.beginPath(); g.arc(a, b, tr, 0, 7); g.fillStyle = 'rgba(70,150,60,0.55)'; g.fill(); } }
  for (const t of []) { const [a, b] = toS(t.x, t.z); g.beginPath(); g.arc(a, b, tr + 1, 0, 7); g.fillStyle = C('--tree'); g.fill(); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke(); }
  if (showGame) { g.setLineDash([5, 4]); g.lineWidth = 2; for (const w of DATA.w) { const off = noAuto || wallGone.has(wkey(w)); if (off && mode !== 'unwall') continue; path(w.p); g.strokeStyle = off ? C('--gone') : 'rgba(255,255,255,0.9)'; g.lineWidth = off ? 3 : 2; g.stroke(); } g.setLineDash([]); }
  if (view.s > 1.6) { // nombres de las calles
    g.font = '600 12px "Source Sans 3", system-ui'; g.fillStyle = '#fff'; g.strokeStyle = 'rgba(0,0,0,0.6)'; g.lineWidth = 3; const seen = new Set();
    for (const r of DATA.r) if (r.n && !seen.has(r.n)) { seen.add(r.n); const q = r.p[Math.floor(r.p.length / 2)], [a, b] = toS(q[0], q[1]); g.strokeText(r.n, a + 4, b - 4); g.fillText(r.n, a + 4, b - 4); }
  }
  // lo dibujado por Darío
  for (const it of items) {
    const hi = sel && sel.item === it;
    if (it.kind === 'suelo' || it.kind === 'nivel') { if (hi) { path(it.p); g.lineWidth = Math.max(3, 2 * it.r * view.s) + 4; g.strokeStyle = 'rgba(79,195,247,0.6)'; g.stroke(); } continue; }
    if (it.kind === 'grove' || it.kind === 'clear') { path(it.p, true); g.fillStyle = it.kind === 'grove' ? 'rgba(63,209,106,0.3)' : 'rgba(255,59,48,0.18)'; g.fill(); g.setLineDash([8, 5]); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : (it.kind === 'grove' ? C('--tree') : C('--gone')); g.stroke(); g.setLineDash([]); continue; }
    if (it.kind === 'rocks') { path(it.p, true); g.fillStyle = 'rgba(160,150,135,0.55)'; g.fill(); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : C('--rock'); g.stroke();
      const c = it.p.reduce((a, q) => [a[0] + q[0] / it.p.length, a[1] + q[1] / it.p.length], [0, 0]), [a, b] = toS(c[0], c[1]); g.font = '700 12px system-ui'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('▲ ' + it.alto, a, b + 4); g.textAlign = 'start'; continue; }
    if (it.kind === 'building') { path(it.p, true); g.fillStyle = 'rgba(155,107,214,0.45)'; g.fill(); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : C('--bld'); g.stroke();
      if (view.s > 1.2) { const c = it.p.reduce((a, q) => [a[0] + q[0] / it.p.length, a[1] + q[1] / it.p.length], [0, 0]), [a, b] = toS(c[0], c[1]); g.font = '700 12px system-ui'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(it.floors + 'P', a, b + 4); g.textAlign = 'start'; } }
    else { path(it.p); const wdt = { baja: 3, media: 5, alta: 8 }[it.alto] || 5; g.lineWidth = hi ? wdt + 4 : wdt; g.strokeStyle = hi ? '#4fc3f7' : (it.kind === 'ruin' ? C('--ruin') : it.mat === 'bloque' ? C('--block') : it.mat === 'irregular' ? C('--wallirr') : C('--wall'));
      if (it.kind === 'wall' && it.mat === 'irregular') g.setLineDash([wdt * 2.2, wdt * 0.9]); g.stroke(); g.setLineDash([]); }
  }
  for (const it of items) if (it.kind === 'molino') { // el rotor a escala (86 m) y un punto rojo siempre visible
    const hi = sel && sel.item === it, [a, b] = toS(it.p[0][0], it.p[0][1]), rr = ROTOR * view.s;
    if (rr > 8) { g.beginPath(); g.arc(a, b, rr, 0, 7); g.setLineDash([6, 5]); g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,255,255,0.8)'; g.stroke(); g.setLineDash([]); }
    const L = Math.max(11, Math.min(rr, 40)); g.lineWidth = 3; g.strokeStyle = '#fff'; g.beginPath(); for (let k = 0; k < 3; k++) { const t = -Math.PI / 2 + k * 2.0944; g.moveTo(a, b); g.lineTo(a + L * Math.cos(t), b + L * Math.sin(t)); } g.stroke();
    g.beginPath(); g.arc(a, b, hi ? 8 : 6, 0, 7); g.fillStyle = hi ? '#4fc3f7' : C('--mill'); g.fill(); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke();
  }
  if (editPts()) for (const q of sel.item.p) { const [a, b] = toS(q[0], q[1]); g.beginPath(); g.arc(a, b, 6, 0, 7); g.fillStyle = '#4fc3f7'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke(); }
  if (cur.length) {
    const cc = mode === 'wall' && $('wmat').value === 'bloque' ? C('--block') : mode === 'wall' && $('wmat').value === 'irregular' ? C('--wallirr') : mode === 'ruin' ? C('--ruin') : mode === 'bld' ? C('--bld') : mode === 'tree' ? C('--tree') : mode === 'untree' ? C('--gone') : mode === 'rock' ? C('--rock') : mode === 'nivel' ? C('--level') : C('--wall');
    path(cur, area() && cur.length > 2); if (area() && cur.length > 2) { g.fillStyle = 'rgba(155,155,155,0.3)'; g.fill(); }
    g.lineWidth = area() ? 3 : 5; g.strokeStyle = cc; g.stroke();
    for (const q of cur) { const [a, b] = toS(q[0], q[1]); g.beginPath(); g.arc(a, b, 5, 0, 7); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#000'; g.stroke(); }
  }
  if (mode === 'paint' && hover) { const [a, b] = toS(hover[0], hover[1]); g.beginPath(); g.arc(a, b, Math.max(3, +$('brush').value * view.s), 0, 7); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke(); g.setLineDash([3, 3]); g.strokeStyle = '#000'; g.stroke(); g.setLineDash([]); }
  // escala gráfica
  const m = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000].find(v => v * view.s >= 50) || 5000, x0 = 16, y0 = H() - 18;
  g.fillStyle = '#fff'; g.fillRect(x0, y0, m * view.s, 4); g.font = '600 12px system-ui'; g.fillText(m >= 1000 ? m / 1000 + ' km' : m + ' m', x0, y0 - 6);
  
  const nL = items.filter(i => i.kind === 'wall' || i.kind === 'ruin').length, nB = items.filter(i => i.kind === 'building').length, nR = items.filter(i => i.kind === 'rocks').length, nS = items.filter(i => i.kind === 'suelo').length, nV = items.filter(i => i.kind === 'nivel').length, nM = items.filter(i => i.kind === 'molino').length, nZ = items.length - nL - nB - nR - nS - nV - nM, parts = [];
  if (nM) parts0.push(nM + (nM === 1 ? ' molino' : ' molinos'));
  if (nS) parts0.push(nS + (nS === 1 ? ' trazo de suelo' : ' trazos de suelo')); if (nV) parts0.push(nV + (nV === 1 ? ' desnivel' : ' desniveles'));
  if (nR) parts0.push(nR + (nR === 1 ? ' zona de rocas' : ' zonas de rocas'));
  if (nZ) parts0.push(nZ + (nZ === 1 ? ' zona de árboles' : ' zonas de árboles'));
  if (nL) parts.push(nL + (nL === 1 ? ' línea' : ' líneas')); if (nB) parts.push(nB + (nB === 1 ? ' edificio nuevo' : ' edificios nuevos')); if (wallGone.size && !noAuto) parts.push(wallGone.size + (wallGone.size === 1 ? ' tapia del juego quitada' : ' tapias del juego quitadas')); if (noAuto) parts.push('sin tapias del juego');
  if (shaped.size) parts.push(shaped.size + (shaped.size === 1 ? ' casa con otra forma' : ' casas con otra forma'));
  if (gone.size) parts.push(gone.size + (gone.size === 1 ? ' casa quitada' : ' casas quitadas'));
  parts.push(...parts0);
  $('count').textContent = parts.length ? parts.join(' · ') : 'Nada dibujado aún';
  $('bUndo').disabled = !hist.some(h => !h.alive || h.alive()); $('bRedo').disabled = !redoSt.length; $('bSave').disabled = !col || cur.length < (area() ? 3 : 2);
  $('bSave').textContent = mode === 'bld' ? 'Guardar edificio' : area() ? 'Guardar zona' : 'Guardar línea'; $('bSave').hidden = !drawing();
}
function setMode(m) {
  mode = m; for (const [id, k] of [['bWall', 'wall'], ['bRuin', 'ruin'], ['bBld', 'bld'], ['bGone', 'gone'], ['bDel', 'del'], ['bPhoto', 'photo'], ['bTree', 'tree'], ['bUntree', 'untree'], ['bUnwall', 'unwall'], ['bRock', 'rock'], ['bShape', 'shape'], ['bPaint', 'paint'], ['bNivel', 'nivel'], ['bMolino', 'molino']]) $(id).setAttribute('aria-pressed', String(k === m));
  $('nudge').hidden = m !== 'photo'; $('paintBar').hidden = m !== 'paint'; $('nivelBar').hidden = m !== 'nivel'; $('toolName').textContent = TOOL[m]; status(HINT[m]); cv.style.cursor = m === 'paint' ? 'none' : 'crosshair';
  $('floors').hidden = m !== 'bld'; $('wmat').hidden = m !== 'wall'; $('whigh').hidden = !['wall', 'ruin', 'rock'].includes(m);
  if (!drawing()) cur = []; sel = null; $('confirm').hidden = true; $('edit').hidden = true; $('shapeBar').hidden = true; draw();
}
for (const [id, k] of [['bWall', 'wall'], ['bRuin', 'ruin'], ['bBld', 'bld'], ['bGone', 'gone'], ['bDel', 'del'], ['bPhoto', 'photo'], ['bTree', 'tree'], ['bUntree', 'untree'], ['bUnwall', 'unwall'], ['bRock', 'rock'], ['bShape', 'shape'], ['bPaint', 'paint'], ['bNivel', 'nivel'], ['bMolino', 'molino']]) $(id).onclick = () => setMode(k);
// ajuste de la foto: flechas de 25 cm (norte arriba) y arrastre
const showOff = () => { $('offTxt').textContent = (off[0] >= 0 ? '+' : '') + off[0].toFixed(2) + ' E, ' + (-off[1] >= 0 ? '+' : '') + (-off[1]).toFixed(2) + ' N m · ' + (fz * 100).toFixed(1) + ' % · ' + frot.toFixed(1) + '°'; };
for (const [id, k] of [['zIn', 1.002], ['zOut', 1 / 1.002]]) $(id).onclick = () => { fz *= k; showOff(); draw(); };
for (const [id, k] of [['rL', -0.1], ['rR', 0.1]]) $(id).onclick = () => { frot = Math.round((frot + k) * 10) / 10; showOff(); draw(); };
for (const [id, dx, dz] of [['nW', -0.25, 0], ['nE', 0.25, 0], ['nN', 0, -0.25], ['nS', 0, 0.25]]) $(id).onclick = () => { off = [off[0] + dx, off[1] + dz]; showOff(); draw(); };
$('bPhotoSave').onclick = async () => {
  if (!db) return; status('Guardando ajuste…');
  try { await db.collection('ajuste').doc('foto').set({ dx: Math.round(off[0] * 100) / 100, dz: Math.round(off[1] * 100) / 100, scale: Math.round(fz * 10000) / 10000, rot: frot, at: Date.now() }); offSaved = off.slice(); status('Ajuste de la foto guardado'); }
  catch (e) { status('No se ha podido guardar el ajuste (' + (e.message || e.code) + ')'); }
};
async function undo() {
  while (hist.length) {
    const h = hist.pop(); if (h.alive && !h.alive()) continue;
    try { await h.undo(); redoSt.push(h); status('Deshecho'); } catch (e) { status('No se ha podido deshacer (' + (e.message || e.code) + ')'); }
    draw(); return;
  }
  status('No hay nada que deshacer');
}
async function redo() {
  while (redoSt.length) {
    const h = redoSt.pop();
    if (!h.redo) continue;
    try { await h.redo(); hist.push(h); status('Rehecho'); } catch (e) { status('No se ha podido rehacer (' + (e.message || e.code) + ')'); }
    draw(); return;
  }
  status('No hay nada que rehacer');
}
$('bUndo').onclick = undo; $('bRedo').onclick = redo;
addEventListener('keydown', e => { if (!(e.ctrlKey || e.metaKey) || /SELECT|INPUT/.test(e.target.tagName)) return; const k = e.key.toLowerCase();
  if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); } else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); } });
for (const b of document.querySelectorAll('#paintBar .chip')) b.onclick = () => { paintMat = b.dataset.mat; for (const o of document.querySelectorAll('#paintBar .chip')) o.setAttribute('aria-pressed', String(o === b)); };
$('brush').onchange = draw;
// capa del suelo pintado: los trazos en orden, la goma recorta lo de debajo
function drawPaint() {
  const list = items.filter(i => i.kind === 'suelo'); if (stroke) list.push(stroke); if (!list.length) return;
  if (layer.width !== cv.width || layer.height !== cv.height) { layer.width = cv.width; layer.height = cv.height; }
  const d = devicePixelRatio || 1; lg.setTransform(d, 0, 0, d, 0, 0); lg.clearRect(0, 0, W(), H()); lg.lineCap = 'round'; lg.lineJoin = 'round';
  for (const it of list) {
    lg.globalCompositeOperation = it.mat === 'borrar' ? 'destination-out' : 'source-over';
    const c = PAINT[it.mat] || [0, 0, 0]; lg.strokeStyle = lg.fillStyle = `rgb(${c})`; lg.lineWidth = Math.max(1, 2 * it.r * view.s);
    lg.beginPath(); it.p.forEach((q, i) => { const [a, b] = toS(q[0], q[1]); i ? lg.lineTo(a, b) : lg.moveTo(a, b); }); if (it.p.length === 1) { const [a, b] = toS(it.p[0][0], it.p[0][1]); lg.lineTo(a + 0.01, b); } lg.stroke();
  }
  lg.globalCompositeOperation = 'source-over'; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 0.6; g.drawImage(layer, 0, 0); g.restore();
}
async function saveStroke(st) {
  if (!col || !st.p.length) { stroke = null; draw(); status('Sin conexión: el trazo no se ha guardado'); return; }
  const doc = { kind: 'suelo', mat: st.mat, r: st.r, xy: st.p.flatMap(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), at: Date.now() };
  const id = newId(); st.id = id; items.push({ id, raw: doc, kind: 'suelo', mat: st.mat, r: st.r, p: st.p, at: doc.at }); stroke = null; draw();
  try { await col.doc(id).set(doc); push(() => col.doc(id).delete(), null, () => col.doc(id).set(doc)); status(st.mat === 'borrar' ? 'Borrado del suelo guardado' : 'Trazo guardado'); } catch (e) { items = items.filter(i => i.id !== id); draw(); status('No se ha podido guardar el trazo (' + (e.message || e.code) + ')'); }
}
cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('pointerleave', () => { hover = null; if (mode === 'paint') draw(); });
$('showGame').onchange = e => { showGame = e.target.checked; draw(); };
$('bSave').onclick = async () => {
  if (!col || cur.length < (area() ? 3 : 2)) return;
  const doc = { kind: { ruin: 'ruin', bld: 'building', tree: 'grove', untree: 'clear', rock: 'rocks', nivel: 'nivel' }[mode] || 'wall', xy: cur.flatMap(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), at: Date.now() };
  if (mode === 'bld') doc.floors = +$('floors').value;
  if (mode === 'rock') doc.alto = $('whigh').value;
  if (mode === 'nivel') { doc.dh = +$('dh').value; doc.talud = $('talud').value; }
  if (mode === 'wall' || mode === 'ruin') { doc.alto = $('whigh').value; doc.mat = mode === 'ruin' ? 'piedra' : $('wmat').value; }
  const keep = cur; cur = []; draw(); status('Guardando…');
  try { const id = newId(); await col.doc(id).set(doc); push(() => col.doc(id).delete(), null, () => col.doc(id).set(doc)); status(mode === 'bld' ? 'Edificio guardado' : mode === 'nivel' ? 'Desnivel guardado' : area() ? 'Zona guardada' : 'Línea guardada'); } catch (e) { cur = keep; draw(); status('No se ha podido guardar (' + (e.message || e.code) + '). Vuelve a pulsar Guardar.'); }
};
$('bNo').onclick = () => { sel = null; $('confirm').hidden = true; draw(); };
$('bYes').onclick = async () => {
  const s = sel; sel = null; $('confirm').hidden = true; draw(); if (!s) return; status('Guardando…');
  try {
    if (s.reset) { await resetAll(); return; }
    if (s.item) { const raw = s.item.raw, id = s.item.id; await col.doc(id).delete(); push(() => col.doc(id).set(raw), null, () => col.doc(id).delete()); status('Borrado'); }
    else if (s.cat) { const k = docId(keyOf(s.cat)), v = { id: s.cat.id, cx: s.cat.c[0], cz: s.cat.c[1], at: Date.now() };
      if (gone.has(k)) { const old = gone.get(k); await colGone.doc(k).delete(); push(() => colGone.doc(k).set(old), null, () => colGone.doc(k).delete()); status('La casa vuelve a estar'); }
      else { await colGone.doc(k).set(v); push(() => colGone.doc(k).delete(), null, () => colGone.doc(k).set(v)); status('Casa quitada'); } }
  } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
};
// empezar de cero: borra todo lo dibujado y todo lo quitado (el ajuste de la foto se queda)
$('bReset').onclick = () => { if (!db) return; sel = { reset: true }; ask('¿Borrar todo lo dibujado y lo quitado y empezar de cero? El ajuste de la foto se queda.', 'Sí, empezar de cero'); };
async function resetAll() {
  status('Borrando todo…');
  const snapI = items.map(i => [i.id, i.raw]), snapG = [...gone], snapW = [...wallGone], snapA = noAuto, snapF = [...shaped].map(([k, v]) => [k, v.raw]);
  push(() => Promise.all([...snapF.map(([k, v]) => colShape.doc(k).set(v)), ...snapI.map(([id, v]) => col.doc(id).set(v)), ...snapG.map(([k, v]) => colGone.doc(k).set(v)), ...snapW.map(([k, v]) => colWallGone.doc(k).set(v)), db.collection('ajuste').doc('tapias').set({ todas: snapA, at: Date.now() })]), null,
    () => Promise.all([...snapF.map(([k]) => colShape.doc(k).delete()), ...snapI.map(([id]) => col.doc(id).delete()), ...snapG.map(([k]) => colGone.doc(k).delete()), ...snapW.map(([k]) => colWallGone.doc(k).delete()), db.collection('ajuste').doc('tapias').set({ todas: false, at: Date.now() })]));
  const jobs = [...snapF.map(([k]) => colShape.doc(k).delete()), ...items.map(i => col.doc(i.id).delete()), ...[...gone.keys()].map(k => colGone.doc(k).delete()), ...[...wallGone.keys()].map(k => colWallGone.doc(k).delete()), db.collection('ajuste').doc('tapias').set({ todas: false, at: Date.now() })];
  const r = await Promise.allSettled(jobs), bad = r.filter(x => x.status === 'rejected').length;
  cur = []; draw(); status(bad ? `Quedan ${bad} cosas sin borrar: vuelve a pulsar Empezar de cero` : 'Plano limpio: empieza de cero');
}
// panel de edición de lo mío: cambiar tipo, material, altura o plantas, o borrarlo
const KINDS = { wall: 'Tapia', ruin: 'Ruina', building: 'Edificio', rocks: 'Rocas', grove: 'Zona de árboles', clear: 'Zona sin árboles', suelo: 'Trazo de suelo', nivel: 'Desnivel', molino: 'Molino' };
$('eDh').innerHTML = $('dh').innerHTML; $('eTalud').innerHTML = $('talud').innerHTML;
function openEdit(it) {
  const line = it.kind === 'wall' || it.kind === 'ruin';
  $('eKind').innerHTML = (line ? ['wall', 'ruin'] : it.kind === 'grove' || it.kind === 'clear' ? ['grove', 'clear'] : [it.kind]).map(k => `<option value="${k}"${k === it.kind ? ' selected' : ''}>${KINDS[k]}</option>`).join('');
  $('eMat').value = it.mat; $('eHigh').value = it.alto; $('eFloors').value = String(it.floors); if (it.kind === 'suelo') $('eSuelo').value = it.mat; if (it.kind === 'nivel') { $('eDh').value = String(it.dh); $('eTalud').value = it.talud; }
  const upd = () => { const k = $('eKind').value; $('eMat').hidden = k !== 'wall'; $('eHigh').hidden = !['wall', 'ruin', 'rocks'].includes(k); $('eFloors').hidden = k !== 'building'; $('eSuelo').hidden = k !== 'suelo'; $('eDh').hidden = $('eTalud').hidden = k !== 'nivel'; };
  sel.orig = it.p.map(q => q.slice()); it.p = it.p.map(q => q.slice());
  $('eKind').onchange = upd; upd(); $('edit').hidden = false; draw();
}
$('eCancel').onclick = () => { if (sel?.orig) sel.item.p = sel.orig; sel = null; $('edit').hidden = true; draw(); };
$('eDel').onclick = () => { const it = sel?.item; if (!it) return; $('edit').hidden = true; ask('¿Borrar ' + (KINDS[it.kind] || 'esto').toLowerCase() + '?', 'Sí, borrar'); };
$('eSave').onclick = async () => {
  const it = sel?.item; if (!it || !col) return;
  const k = $('eKind').value, prev = it.raw, doc = { ...it.raw, kind: k, xy: it.p.flatMap(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), at: Date.now() };
  delete doc.mat; delete doc.alto; delete doc.floors; delete doc.dh; delete doc.talud;
  if (k === 'wall') { doc.mat = $('eMat').value; doc.alto = $('eHigh').value; }
  if (k === 'ruin') { doc.mat = 'piedra'; doc.alto = $('eHigh').value; }
  if (k === 'rocks') doc.alto = $('eHigh').value;
  if (k === 'building') doc.floors = +$('eFloors').value;
  if (k === 'suelo') doc.mat = $('eSuelo').value;
  if (k === 'nivel') { doc.dh = +$('eDh').value; doc.talud = $('eTalud').value; }
  sel = null; $('edit').hidden = true; draw(); status('Guardando…');
  try { await col.doc(it.id).set(doc); push(() => col.doc(it.id).set(prev), null, () => col.doc(it.id).set(doc)); status('Cambios guardados'); } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
};
// forma de una casa del Catastro: se guarda aparte (colección 'forma') y se puede volver a la original
$('shapeCancel').onclick = () => { sel = null; $('shapeBar').hidden = true; draw(); };
$('shapeSave').onclick = async () => {
  const s = sel; if (!s?.cat || !colShape) return; const k = docId(keyOf(s.cat)), prev = shaped.get(k)?.raw || null;
  const v = { id: s.cat.id, cx: s.cat.c[0], cz: s.cat.c[1], xy: s.item.p.flatMap(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), at: Date.now() };
  sel = null; $('shapeBar').hidden = true; status('Guardando…');
  try { await colShape.doc(k).set(v); push(() => prev ? colShape.doc(k).set(prev) : colShape.doc(k).delete(), null, () => colShape.doc(k).set(v)); status('Forma de la casa guardada'); } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
  draw();
};
$('shapeOrig').onclick = async () => {
  const s = sel; if (!s?.cat || !colShape) return; const k = docId(keyOf(s.cat)), prev = shaped.get(k)?.raw; if (!prev) return;
  sel = null; $('shapeBar').hidden = true;
  try { await colShape.doc(k).delete(); push(() => colShape.doc(k).set(prev), null, () => colShape.doc(k).delete()); status('La casa vuelve a su forma del Catastro'); } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
  draw();
};
function ask(text, yes) { $('confirmTxt').textContent = text; $('bYes').textContent = yes; $('confirm').hidden = false; draw(); }
// un dedo pone puntos o arrastra el plano; dos dedos acercan
const ptrs = new Map(); let drag = null, pinch = null;
cv.addEventListener('pointerdown', e => {
  cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
  if (ptrs.size === 1 && mode === 'paint' && e.button === 0) { const p = toW(e.offsetX, e.offsetY); stroke = { kind: 'suelo', mat: paintMat, r: +$('brush').value, p: [p] }; drag = null; draw(); return; }
  if (ptrs.size === 1) {
    drag = { x: e.offsetX, y: e.offsetY, cx: view.cx, cz: view.cz, ox: off[0], oz: off[1], moved: false, pan: e.button === 1 || e.button === 2 };
    // ¿se ha cogido un punto? (del trazo que se dibuja o de lo que se edita)
    const arrs = [cur, editPts() ? sel.item.p : null].filter(Boolean);
    for (const arr of arrs) arr.forEach((q, i) => { const [a, b] = toS(q[0], q[1]); if (!drag.pt && Math.hypot(a - e.offsetX, b - e.offsetY) < 16) drag.pt = { arr, i, orig: q.slice() }; });
  }
  else if (ptrs.size === 2) { stroke = null; const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: view.s, w: toW((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) }; drag = null; draw(); }
});
cv.addEventListener('pointermove', e => {
  if (mode === 'paint') { hover = toW(e.offsetX, e.offsetY); if (!ptrs.size) { draw(); return; } }
  if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
  if (stroke && ptrs.size === 1) { const p = toW(e.offsetX, e.offsetY), q = stroke.p[stroke.p.length - 1]; if (Math.hypot(p[0] - q[0], p[1] - q[1]) > Math.max(0.3, stroke.r * 0.35)) stroke.p.push(p); draw(); return; }
  if (pinch && ptrs.size === 2) {
    const [a, b] = [...ptrs.values()], mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    view.s = Math.min(12, Math.max(0.025, pinch.s * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d));
    const w1 = toW(...mid); view.cx += pinch.w[0] - w1[0]; view.cz += pinch.w[1] - w1[1]; draw(); return;
  }
  if (drag) { const dx = e.offsetX - drag.x, dy = e.offsetY - drag.y; if (Math.hypot(dx, dy) > 7) drag.moved = true; if (drag.moved) { if (drag.pt) { drag.pt.arr[drag.pt.i] = toW(e.offsetX, e.offsetY); } else if (mode === 'photo' && !drag.pan) { off = [drag.ox + dx / view.s, drag.oz + dy / view.s]; showOff(); } else { view.cx = drag.cx - dx / view.s; view.cz = drag.cz - dy / view.s; } draw(); } }
});
cv.addEventListener('pointerup', e => { const d = drag; ptrs.delete(e.pointerId); if (stroke && !ptrs.size) { const st = stroke; saveStroke(st); return; } if (ptrs.size < 2) pinch = null; if (d?.pt && d.moved) { const { arr, i, orig } = d.pt, now = arr[i].slice(); push(() => { arr[i] = orig; }, () => arr === cur || (sel?.item && arr === sel.item.p), () => { arr[i] = now; }); draw(); }
  else if (d && !d.moved && !d.pan && ptrs.size === 0 && !d.pt) tap(e.offsetX, e.offsetY); drag = null; });
cv.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); drag = null; pinch = null; stroke = null; draw(); });
cv.addEventListener('wheel', e => {
  e.preventDefault(); const w0 = toW(e.offsetX, e.offsetY);
  view.s = Math.min(12, Math.max(0.025, view.s * Math.exp(-e.deltaY * 0.0015)));
  const w1 = toW(e.offsetX, e.offsetY); view.cx += w0[0] - w1[0]; view.cz += w0[1] - w1[1]; draw();
}, { passive: false });
function tap(px, py) {
  const [x, z] = toW(px, py);
  if (mode === 'photo') return;
  if (mode === 'unwall') { // tapia automática más cercana
    let best = null, bd = 14 / view.s;
    for (const w of DATA.w) for (let i = 0; i < w.p.length - 1; i++) {
      const a = w.p[i], b = w.p[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)), d = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t);
      if (d < bd) { bd = d; best = w; }
    }
    if (!best || !colWallGone) return; const k = wkey(best), was = wallGone.has(k);
    const v = { x0: best.p[0][0], z0: best.p[0][1], x1: best.p[best.p.length - 1][0], z1: best.p[best.p.length - 1][1], at: Date.now() };
    push(() => was ? colWallGone.doc(k).set(v) : colWallGone.doc(k).delete(), null, () => was ? colWallGone.doc(k).delete() : colWallGone.doc(k).set(v));
    (was ? colWallGone.doc(k).delete() : colWallGone.doc(k).set(v))
      .then(() => status(was ? 'La tapia vuelve a estar' : 'Tapia quitada'), e => status('No se ha podido guardar (' + (e.message || e.code) + ')'));
    return;
  }
  if (mode === 'shape') { // casa del Catastro: se cogen sus esquinas y se arrastran
    const b = DATA.b.find(b => !gone.has(docId(keyOf(b))) && inside([x, z], shaped.get(docId(keyOf(b)))?.p || b.p));
    if (!b) { sel = null; $('shapeBar').hidden = true; draw(); return; }
    const k = docId(keyOf(b)), p0 = (shaped.get(k)?.p || b.p).map(q => q.slice());
    sel = { cat: b, item: { p: p0.map(q => q.slice()) }, orig: p0 }; $('shapeOrig').disabled = !shaped.has(k); $('shapeBar').hidden = false; status('Arrastra las esquinas azules y pulsa Guardar forma'); draw(); return;
  }
  if (mode === 'gone') { // casa del Catastro bajo el dedo
    const b = DATA.b.find(b => inside([x, z], b.p));
    sel = b ? { cat: b } : null;
    if (b) ask(gone.has(docId(keyOf(b))) ? '¿Volver a poner esta casa?' : '¿Quitar esta casa del juego?', gone.has(docId(keyOf(b))) ? 'Sí, ponerla' : 'Sí, quitarla'); else { $('confirm').hidden = true; draw(); }
    return;
  }
  if (mode === 'del') { // lo mío más cercano: un edificio que contenga el toque o la línea más próxima
    let best = null, bd = 14 / view.s;
    for (const it of items) if (it.kind === 'molino') { const d = Math.hypot(x - it.p[0][0], z - it.p[0][1]); if (d < Math.max(bd, 16 / view.s)) { bd = d; best = it; } } bd = 14 / view.s;
    for (let k = items.length - 1; k >= 0 && !best; k--) { const it = items[k]; if (it.kind === 'suelo') for (let i = 0; i < it.p.length; i++) { const a = it.p[Math.max(0, i - 1)], b = it.p[i], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)); if (Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t) < it.r + 4 / view.s) { best = it; break; } } }
    if (!best) best = items.find(it => !['wall', 'ruin', 'suelo', 'nivel', 'molino'].includes(it.kind) && inside([x, z], it.p)) || items.find(it => it.kind === 'nivel' && inside([x, z], it.p)) || null;
    if (!best) for (const l of items) if (l.kind === 'wall' || l.kind === 'ruin') for (let i = 0; i < l.p.length - 1; i++) {
      const a = l.p[i], b = l.p[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)), d = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t);
      if (d < bd) { bd = d; best = l; }
    }
    sel = best ? { item: best } : null; $('confirm').hidden = true;
    if (best) openEdit(best); else { $('edit').hidden = true; draw(); }
    return;
  }
  if (mode === 'molino') { // un toque y queda guardado
    if (Math.abs(x) > FAR || Math.abs(z) > FAR) { status('Fuera del mapa: el molino tiene que estar a menos de 10 km del pueblo'); return; }
    if (!col) { status('Sin conexión: el molino no se ha guardado'); return; }
    const doc = { kind: 'molino', xy: [Math.round(x), Math.round(z)], at: Date.now() }, id = newId(); status('Guardando molino…');
    col.doc(id).set(doc).then(() => { push(() => col.doc(id).delete(), null, () => col.doc(id).set(doc)); status('Molino guardado. Toca otro sitio para poner más'); }, e => status('No se ha podido guardar el molino (' + (e.message || e.code) + ')'));
    return;
  }
  if (Math.abs(x) > EDIT || Math.abs(z) > EDIT) { status('Fuera del plano: se puede dibujar hasta 4 km del pueblo'); return; }
  const arr = cur, pt = [x, z]; cur.push(pt); push(() => { arr.pop(); }, () => cur === arr && arr.length > 0, () => { arr.push(pt); }); draw();
}
// coordenadas bajo el ratón (o el dedo): latitud/longitud y UTM 30N (ETRS89), como los datos del IGN y el Catastro
const UTM0 = [233830.73, 4650998.60]; // el centro del juego (0, 0)
function utmToGeo(E, N) {
  const k0 = 0.9996, a = 6378137, f = 1 / 298.257222101, e2 = f * (2 - f), ep2 = e2 / (1 - e2), x = E - 500000, M = N / k0;
  const mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 ** 3 / 256)), r = Math.sqrt(1 - e2), e1 = (1 - r) / (1 + r);
  const p1 = mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 ** 4 / 32) * Math.sin(4 * mu) + (151 * e1 ** 3 / 96) * Math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * Math.sin(8 * mu);
  const sn = Math.sin(p1), cs = Math.cos(p1), C1 = ep2 * cs * cs, T1 = Math.tan(p1) ** 2, w = 1 - e2 * sn * sn, N1 = a / Math.sqrt(w), R1 = a * (1 - e2) / w ** 1.5, D = x / (N1 * k0);
  const lat = p1 - (N1 * Math.tan(p1) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * D ** 4 / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * ep2 - 3 * C1 * C1) * D ** 6 / 720);
  const lon = -3 * Math.PI / 180 + (D - (1 + 2 * T1 + C1) * D ** 3 / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * D ** 5 / 120) / cs;
  return [lat * 180 / Math.PI, lon * 180 / Math.PI];
}
function showCoord(px, py) {
  const [x, z] = toW(px, py), E = UTM0[0] + x, N = UTM0[1] - z, [la, lo] = utmToGeo(E, N), d = Math.hypot(x, z);
  $('coord').hidden = false;
  $('coord').textContent = `${Math.abs(la).toFixed(5)}° ${la >= 0 ? 'N' : 'S'}, ${Math.abs(lo).toFixed(5)}° ${lo >= 0 ? 'E' : 'O'} · UTM 30N ${Math.round(E)} E ${Math.round(N)} N · ${d < 1000 ? Math.round(d) + ' m' : (d / 1000).toFixed(2).replace('.', ',') + ' km'} del centro`;
}
cv.addEventListener('pointermove', e => showCoord(e.offsetX, e.offsetY));
cv.addEventListener('pointerdown', e => showCoord(e.offsetX, e.offsetY));
addEventListener('resize', resize); resize();
// botón Generar el juego: deja un comentario para Claude, que lee el plano y vuelve a publicar el juego
(async () => {
  const cm = window.claude ? await window.claude.use('comments').catch(() => null) : null; if (!cm) return;
  const b = $('bGen'), why = { writers_only: 'Solo quien edita el plano puede pedirlo', no_session: 'Claude no está atento ahora: pídelo en el chat', off: '' };
  const check = async () => { let st = 'off'; try { st = await cm.canSendToClaude(); } catch {} b.hidden = st === 'off'; b.disabled = st !== 'available'; $('genTxt').textContent = st === 'available' ? '' : (why[st] || ''); return st; };
  await check(); setInterval(check, 30000);
  b.onclick = async () => {
    if (await check() !== 'available') return;
    b.disabled = true; $('genTxt').textContent = 'Avisando a Claude…';
    try { const anchor = await cm.anchorFor(b); await cm.sendToClaude({ anchor, text: 'Generar el juego: pasa el plano tal como está ahora al juego y publícalo.' }); $('genTxt').textContent = 'Aviso enviado: el juego se está generando. Te contesto en el chat cuando esté.'; }
    catch (e) { $('genTxt').textContent = e?.code === 'rate_limited' ? 'Espera un poco antes de volver a pedirlo' : 'No se ha podido avisar (' + (e?.code || e?.message || e) + '): pídelo en el chat'; }
    setTimeout(() => { b.disabled = false; }, 15000);
  };
})();
// todo se guarda para que Claude lo lea y lo ponga en el juego
(async () => {
  const t = setTimeout(() => status('Sin conexión: puedes mirar el plano, pero no guardar.'), 10000);
  db = window.claude ? await window.claude.use('db') : null;
  if (!db) { clearTimeout(t); status('Sin conexión: puedes mirar el plano, pero no guardar.'); return; }
  col = db.collection('trazos'); colGone = db.collection('quitar'); draw();
  col.onSnapshot(snap => {
    clearTimeout(t);
    items = snap.docs.map(d => { const v = d.data(), xy = v.xy || [], p = []; for (let i = 0; i + 1 < xy.length; i += 2) p.push([xy[i], xy[i + 1]]); return { id: d.id, raw: v, kind: v.kind, floors: v.floors || 2, mat: v.mat || 'piedra', alto: v.alto || 'media', r: v.r || 2, dh: v.dh ?? 1, talud: v.talud || 'medio', at: v.at || 0, p }; }).filter(l => l.p.length > (l.kind === 'suelo' || l.kind === 'molino' ? 0 : 1)).sort((a, b) => a.at - b.at);
    status('Todo guardado'); draw();
  }, e => { clearTimeout(t); status('No se pueden leer los trazos (' + (e.message || e.code) + ')'); });
  db.collection('ajuste').doc('foto').get().then(d => { if (d.exists) { const v = d.data(); off = [v.dx || 0, v.dz || 0]; fz = v.scale || 1; frot = v.rot || 0; offSaved = off.slice(); showOff(); draw(); } }).catch(() => {});
  colWallGone = db.collection('quitar_tapia');
  colWallGone.onSnapshot(snap => { wallGone = new Map(snap.docs.map(d => [d.id, d.data()])); draw(); }, () => {});
  db.collection('ajuste').doc('tapias').onSnapshot(d => { noAuto = !!(d.exists && d.data().todas); $('noAuto').checked = noAuto; draw(); }, () => {});
  $('noAuto').onchange = e => { noAuto = e.target.checked; draw(); db.collection('ajuste').doc('tapias').set({ todas: noAuto, at: Date.now() }).then(() => status(noAuto ? 'Se quitan todas las tapias del juego' : 'Vuelven las tapias del juego'), er => status('No se ha podido guardar (' + (er.message || er.code) + ')')); };
  colShape = db.collection('forma');
  colShape.onSnapshot(snap => { shaped = new Map(snap.docs.map(d => { const v = d.data(), xy = v.xy || [], p = []; for (let i = 0; i + 1 < xy.length; i += 2) p.push([xy[i], xy[i + 1]]); return [d.id, { p, raw: v }]; })); draw(); }, () => {});
  colGone.onSnapshot(snap => { gone = new Map(snap.docs.map(d => [d.id, d.data()])); draw(); }, () => {});
})();
