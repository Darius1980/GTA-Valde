const B = 300; // la foto cubre de -300 a 300 m en x y en z (norte arriba)
const cv = document.getElementById('cv'), g = cv.getContext('2d'), map = document.getElementById('map');
const img = new Image(); img.src = 'ortho_center.jpg'; img.onload = draw;
let view = { cx: -10, cz: 10, s: 2 }; // centro (m) y píxeles por metro
// mode: wall | ruin | bld (dibujar) · gone (quitar casa del Catastro) · del (borrar algo mío)
let wallGone = new Map(), noAuto = false, colWallGone = null, trees = [], treeGone = new Map(), colTree = null, colTreeGone = null, off = [0, 0], offSaved = [0, 0], fz = 1, frot = 0, mode = 'wall', cur = [], items = [], gone = new Map(), sel = null, showGame = true, db = null, col = null, colGone = null;
const $ = id => document.getElementById(id), status = t => { $('status').textContent = t; };
const drawing = () => ['wall', 'ruin', 'bld', 'tree', 'untree', 'rock'].includes(mode), area = () => ['bld', 'tree', 'untree', 'rock'].includes(mode);
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
  if (img.complete && img.naturalWidth) { const [a, b] = toS(off[0], off[1]); g.save(); g.translate(a, b); g.rotate(frot * Math.PI / 180); const L = B * fz * view.s; g.drawImage(img, -L, -L, 2 * L, 2 * L); g.restore(); }
  g.lineCap = 'round'; g.lineJoin = 'round';
  // casas del Catastro (las que se quitan, en rojo y tachadas)
  for (const b of DATA.b) {
    const off = gone.has(docId(keyOf(b)));
    path(b.p, true);
    if (off) { if (mode === 'gone') { g.setLineDash([4, 4]); g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,59,48,0.7)'; g.stroke(); g.setLineDash([]); } } // quitada: no se ve (en Quitar casa, un contorno tenue para recuperarla)
    else { g.fillStyle = 'rgba(255,255,255,0.12)'; g.fill(); g.lineWidth = 1.2; g.strokeStyle = 'rgba(255,255,255,0.85)'; g.stroke(); }
    if (sel && sel.cat === b) { path(b.p, true); g.lineWidth = 4; g.strokeStyle = '#4fc3f7'; g.stroke(); }
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
    if (it.kind === 'grove' || it.kind === 'clear') { path(it.p, true); g.fillStyle = it.kind === 'grove' ? 'rgba(63,209,106,0.3)' : 'rgba(255,59,48,0.18)'; g.fill(); g.setLineDash([8, 5]); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : (it.kind === 'grove' ? C('--tree') : C('--gone')); g.stroke(); g.setLineDash([]); continue; }
    if (it.kind === 'rocks') { path(it.p, true); g.fillStyle = 'rgba(160,150,135,0.55)'; g.fill(); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : C('--rock'); g.stroke();
      const c = it.p.reduce((a, q) => [a[0] + q[0] / it.p.length, a[1] + q[1] / it.p.length], [0, 0]), [a, b] = toS(c[0], c[1]); g.font = '700 12px system-ui'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText('▲ ' + it.alto, a, b + 4); g.textAlign = 'start'; continue; }
    if (it.kind === 'building') { path(it.p, true); g.fillStyle = 'rgba(155,107,214,0.45)'; g.fill(); g.lineWidth = hi ? 5 : 3; g.strokeStyle = hi ? '#4fc3f7' : C('--bld'); g.stroke();
      if (view.s > 1.2) { const c = it.p.reduce((a, q) => [a[0] + q[0] / it.p.length, a[1] + q[1] / it.p.length], [0, 0]), [a, b] = toS(c[0], c[1]); g.font = '700 12px system-ui'; g.fillStyle = '#fff'; g.textAlign = 'center'; g.fillText(it.floors + 'P', a, b + 4); g.textAlign = 'start'; } }
    else { path(it.p); const wdt = { baja: 3, media: 5, alta: 8 }[it.alto] || 5; g.lineWidth = hi ? wdt + 4 : wdt; g.strokeStyle = hi ? '#4fc3f7' : (it.kind === 'ruin' ? C('--ruin') : it.mat === 'bloque' ? C('--block') : C('--wall')); g.stroke(); }
  }
  if (cur.length) {
    const cc = mode === 'wall' && $('wmat').value === 'bloque' ? C('--block') : mode === 'ruin' ? C('--ruin') : mode === 'bld' ? C('--bld') : mode === 'tree' ? C('--tree') : mode === 'untree' ? C('--gone') : mode === 'rock' ? C('--rock') : C('--wall');
    path(cur, area() && cur.length > 2); if (area() && cur.length > 2) { g.fillStyle = 'rgba(155,155,155,0.3)'; g.fill(); }
    g.lineWidth = area() ? 3 : 5; g.strokeStyle = cc; g.stroke();
    for (const q of cur) { const [a, b] = toS(q[0], q[1]); g.beginPath(); g.arc(a, b, 5, 0, 7); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#000'; g.stroke(); }
  }
  // escala gráfica
  const m = view.s > 3 ? 10 : view.s > 0.8 ? 50 : 100, x0 = 16, y0 = H() - 18;
  g.fillStyle = '#fff'; g.fillRect(x0, y0, m * view.s, 4); g.font = '600 12px system-ui'; g.fillText(m + ' m', x0, y0 - 6);
  
  const nL = items.filter(i => i.kind === 'wall' || i.kind === 'ruin').length, nB = items.filter(i => i.kind === 'building').length, nR = items.filter(i => i.kind === 'rocks').length, nZ = items.length - nL - nB - nR, parts = [];
  if (nR) parts0.push(nR + (nR === 1 ? ' zona de rocas' : ' zonas de rocas'));
  if (nZ) parts0.push(nZ + (nZ === 1 ? ' zona de árboles' : ' zonas de árboles'));
  if (nL) parts.push(nL + (nL === 1 ? ' línea' : ' líneas')); if (nB) parts.push(nB + (nB === 1 ? ' edificio nuevo' : ' edificios nuevos')); if (wallGone.size && !noAuto) parts.push(wallGone.size + (wallGone.size === 1 ? ' tapia del juego quitada' : ' tapias del juego quitadas')); if (noAuto) parts.push('sin tapias del juego');
  if (gone.size) parts.push(gone.size + (gone.size === 1 ? ' casa quitada' : ' casas quitadas'));
  parts.push(...parts0);
  $('count').textContent = parts.length ? parts.join(' · ') : 'Nada dibujado aún';
  $('bUndo').disabled = !cur.length; $('bSave').disabled = !col || cur.length < (area() ? 3 : 2);
  $('bSave').textContent = mode === 'bld' ? 'Guardar edificio' : area() ? 'Guardar zona' : 'Guardar línea';
}
function setMode(m) {
  mode = m; for (const [id, k] of [['bWall', 'wall'], ['bRuin', 'ruin'], ['bBld', 'bld'], ['bGone', 'gone'], ['bDel', 'del'], ['bPhoto', 'photo'], ['bTree', 'tree'], ['bUntree', 'untree'], ['bUnwall', 'unwall'], ['bRock', 'rock']]) $(id).setAttribute('aria-pressed', String(k === m));
  $('nudge').hidden = m !== 'photo';
  $('floors').hidden = m !== 'bld'; $('wmat').hidden = m !== 'wall'; $('whigh').hidden = !['wall', 'ruin', 'rock'].includes(m);
  if (!drawing()) cur = []; sel = null; $('confirm').hidden = true; $('edit').hidden = true; draw();
}
for (const [id, k] of [['bWall', 'wall'], ['bRuin', 'ruin'], ['bBld', 'bld'], ['bGone', 'gone'], ['bDel', 'del'], ['bPhoto', 'photo'], ['bTree', 'tree'], ['bUntree', 'untree'], ['bUnwall', 'unwall'], ['bRock', 'rock']]) $(id).onclick = () => setMode(k);
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
$('bUndo').onclick = () => { cur.pop(); draw(); };
$('showGame').onchange = e => { showGame = e.target.checked; draw(); };
$('bSave').onclick = async () => {
  if (!col || cur.length < (area() ? 3 : 2)) return;
  const doc = { kind: { ruin: 'ruin', bld: 'building', tree: 'grove', untree: 'clear', rock: 'rocks' }[mode] || 'wall', xy: cur.flatMap(q => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), at: Date.now() };
  if (mode === 'bld') doc.floors = +$('floors').value;
  if (mode === 'rock') doc.alto = $('whigh').value;
  if (mode === 'wall' || mode === 'ruin') { doc.alto = $('whigh').value; doc.mat = mode === 'ruin' ? 'piedra' : $('wmat').value; }
  const keep = cur; cur = []; draw(); status('Guardando…');
  try { await col.add(doc); status(mode === 'bld' ? 'Edificio guardado' : area() ? 'Zona guardada' : 'Línea guardada'); } catch (e) { cur = keep; draw(); status('No se ha podido guardar (' + (e.message || e.code) + '). Vuelve a pulsar Guardar.'); }
};
$('bNo').onclick = () => { sel = null; $('confirm').hidden = true; draw(); };
$('bYes').onclick = async () => {
  const s = sel; sel = null; $('confirm').hidden = true; draw(); if (!s) return; status('Guardando…');
  try {
    if (s.reset) { await resetAll(); return; }
    if (s.item) { await col.doc(s.item.id).delete(); status('Borrado'); }
    else if (s.cat) { const k = docId(keyOf(s.cat)); if (gone.has(k)) { await colGone.doc(k).delete(); status('La casa vuelve a estar'); } else { await colGone.doc(k).set({ id: s.cat.id, cx: s.cat.c[0], cz: s.cat.c[1], at: Date.now() }); status('Casa quitada'); } }
  } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
};
// empezar de cero: borra todo lo dibujado y todo lo quitado (el ajuste de la foto se queda)
$('bReset').onclick = () => { if (!db) return; sel = { reset: true }; ask('¿Borrar todo lo dibujado y lo quitado y empezar de cero? El ajuste de la foto se queda.', 'Sí, empezar de cero'); };
async function resetAll() {
  status('Borrando todo…');
  const jobs = [...items.map(i => col.doc(i.id).delete()), ...[...gone.keys()].map(k => colGone.doc(k).delete()), ...[...wallGone.keys()].map(k => colWallGone.doc(k).delete()), db.collection('ajuste').doc('tapias').set({ todas: false, at: Date.now() })];
  const r = await Promise.allSettled(jobs), bad = r.filter(x => x.status === 'rejected').length;
  cur = []; draw(); status(bad ? `Quedan ${bad} cosas sin borrar: vuelve a pulsar Empezar de cero` : 'Plano limpio: empieza de cero');
}
// panel de edición de lo mío: cambiar tipo, material, altura o plantas, o borrarlo
const KINDS = { wall: 'Tapia', ruin: 'Ruina', building: 'Edificio', rocks: 'Rocas', grove: 'Zona de árboles', clear: 'Zona sin árboles' };
function openEdit(it) {
  const line = it.kind === 'wall' || it.kind === 'ruin';
  $('eKind').innerHTML = (line ? ['wall', 'ruin'] : it.kind === 'grove' || it.kind === 'clear' ? ['grove', 'clear'] : [it.kind]).map(k => `<option value="${k}"${k === it.kind ? ' selected' : ''}>${KINDS[k]}</option>`).join('');
  $('eMat').value = it.mat; $('eHigh').value = it.alto; $('eFloors').value = String(it.floors);
  const upd = () => { const k = $('eKind').value; $('eMat').hidden = k !== 'wall'; $('eHigh').hidden = !['wall', 'ruin', 'rocks'].includes(k); $('eFloors').hidden = k !== 'building'; };
  $('eKind').onchange = upd; upd(); $('edit').hidden = false; draw();
}
$('eCancel').onclick = () => { sel = null; $('edit').hidden = true; draw(); };
$('eDel').onclick = () => { const it = sel?.item; if (!it) return; $('edit').hidden = true; ask('¿Borrar ' + (KINDS[it.kind] || 'esto').toLowerCase() + '?', 'Sí, borrar'); };
$('eSave').onclick = async () => {
  const it = sel?.item; if (!it || !col) return;
  const k = $('eKind').value, doc = { ...it.raw, kind: k, at: Date.now() };
  delete doc.mat; delete doc.alto; delete doc.floors;
  if (k === 'wall') { doc.mat = $('eMat').value; doc.alto = $('eHigh').value; }
  if (k === 'ruin') { doc.mat = 'piedra'; doc.alto = $('eHigh').value; }
  if (k === 'rocks') doc.alto = $('eHigh').value;
  if (k === 'building') doc.floors = +$('eFloors').value;
  sel = null; $('edit').hidden = true; draw(); status('Guardando…');
  try { await col.doc(it.id).set(doc); status('Cambios guardados'); } catch (e) { status('No se ha podido guardar (' + (e.message || e.code) + ')'); }
};
function ask(text, yes) { $('confirmTxt').textContent = text; $('bYes').textContent = yes; $('confirm').hidden = false; draw(); }
// un dedo pone puntos o arrastra el plano; dos dedos acercan
const ptrs = new Map(); let drag = null, pinch = null;
cv.addEventListener('pointerdown', e => {
  cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
  if (ptrs.size === 1) drag = { x: e.offsetX, y: e.offsetY, cx: view.cx, cz: view.cz, ox: off[0], oz: off[1], moved: false };
  else if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: view.s }; drag = null; }
});
cv.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.offsetX, e.offsetY]);
  if (pinch && ptrs.size === 2) {
    const [a, b] = [...ptrs.values()], mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], w0 = toW(...mid);
    view.s = Math.min(12, Math.max(0.6, pinch.s * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d));
    const w1 = toW(...mid); view.cx += w0[0] - w1[0]; view.cz += w0[1] - w1[1]; draw(); return;
  }
  if (drag) { const dx = e.offsetX - drag.x, dy = e.offsetY - drag.y; if (Math.hypot(dx, dy) > 7) drag.moved = true; if (drag.moved) { if (mode === 'photo') { off = [drag.ox + dx / view.s, drag.oz + dy / view.s]; showOff(); } else { view.cx = drag.cx - dx / view.s; view.cz = drag.cz - dy / view.s; } draw(); } }
});
cv.addEventListener('pointerup', e => { const d = drag; ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null; if (d && !d.moved && ptrs.size === 0) tap(e.offsetX, e.offsetY); drag = null; });
cv.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); drag = null; pinch = null; });
cv.addEventListener('wheel', e => {
  e.preventDefault(); const w0 = toW(e.offsetX, e.offsetY);
  view.s = Math.min(12, Math.max(0.6, view.s * Math.exp(-e.deltaY * 0.0015)));
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
    (was ? colWallGone.doc(k).delete() : colWallGone.doc(k).set({ x0: best.p[0][0], z0: best.p[0][1], x1: best.p[best.p.length - 1][0], z1: best.p[best.p.length - 1][1], at: Date.now() }))
      .then(() => status(was ? 'La tapia vuelve a estar' : 'Tapia quitada'), e => status('No se ha podido guardar (' + (e.message || e.code) + ')'));
    return;
  }
  if (mode === 'gone') { // casa del Catastro bajo el dedo
    const b = DATA.b.find(b => inside([x, z], b.p));
    sel = b ? { cat: b } : null;
    if (b) ask(gone.has(docId(keyOf(b))) ? '¿Volver a poner esta casa?' : '¿Quitar esta casa del juego?', gone.has(docId(keyOf(b))) ? 'Sí, ponerla' : 'Sí, quitarla'); else { $('confirm').hidden = true; draw(); }
    return;
  }
  if (mode === 'del') { // lo mío más cercano: un edificio que contenga el toque o la línea más próxima
    let best = items.find(it => it.kind !== 'wall' && it.kind !== 'ruin' && inside([x, z], it.p)) || null, bd = 14 / view.s;
    if (!best) for (const l of items) if (l.kind === 'wall' || l.kind === 'ruin') for (let i = 0; i < l.p.length - 1; i++) {
      const a = l.p[i], b = l.p[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)), d = Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t);
      if (d < bd) { bd = d; best = l; }
    }
    sel = best ? { item: best } : null; $('confirm').hidden = true;
    if (best) openEdit(best); else { $('edit').hidden = true; draw(); }
    return;
  }
  if (Math.abs(x) > B || Math.abs(z) > B) return;
  cur.push([x, z]); draw();
}
addEventListener('resize', resize); resize();
// todo se guarda para que Claude lo lea y lo ponga en el juego
(async () => {
  const t = setTimeout(() => status('Sin conexión: puedes mirar el plano, pero no guardar.'), 10000);
  db = window.claude ? await window.claude.use('db') : null;
  if (!db) { clearTimeout(t); status('Sin conexión: puedes mirar el plano, pero no guardar.'); return; }
  col = db.collection('trazos'); colGone = db.collection('quitar'); draw();
  col.onSnapshot(snap => {
    clearTimeout(t);
    items = snap.docs.map(d => { const v = d.data(), xy = v.xy || [], p = []; for (let i = 0; i + 1 < xy.length; i += 2) p.push([xy[i], xy[i + 1]]); return { id: d.id, raw: v, kind: v.kind, floors: v.floors || 2, mat: v.mat || 'piedra', alto: v.alto || 'media', p }; }).filter(l => l.p.length > 1);
    status('Todo guardado'); draw();
  }, e => { clearTimeout(t); status('No se pueden leer los trazos (' + (e.message || e.code) + ')'); });
  db.collection('ajuste').doc('foto').get().then(d => { if (d.exists) { const v = d.data(); off = [v.dx || 0, v.dz || 0]; fz = v.scale || 1; frot = v.rot || 0; offSaved = off.slice(); showOff(); draw(); } }).catch(() => {});
  colWallGone = db.collection('quitar_tapia');
  colWallGone.onSnapshot(snap => { wallGone = new Map(snap.docs.map(d => [d.id, d.data()])); draw(); }, () => {});
  db.collection('ajuste').doc('tapias').onSnapshot(d => { noAuto = !!(d.exists && d.data().todas); $('noAuto').checked = noAuto; draw(); }, () => {});
  $('noAuto').onchange = e => { noAuto = e.target.checked; draw(); db.collection('ajuste').doc('tapias').set({ todas: noAuto, at: Date.now() }).then(() => status(noAuto ? 'Se quitan todas las tapias del juego' : 'Vuelven las tapias del juego'), er => status('No se ha podido guardar (' + (er.message || er.code) + ')')); };
  colGone.onSnapshot(snap => { gone = new Map(snap.docs.map(d => [d.id, d.data()])); draw(); }, () => {});
})();
