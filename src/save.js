// Partida guardada en el navegador: dinero, hora, día, tiempo, récords y vehículos comprados.
const KEY = 'valde.save.v1';
export function loadSave() {
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); return s && typeof s === 'object' ? s : null; } catch (_) { return null; }
}
export function writeSave(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (_) { return false; }
}
export function clearSave() { try { localStorage.removeItem(KEY); } catch (_) {} }
