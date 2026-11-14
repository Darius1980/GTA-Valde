// Negocios que Darío pone en el plano: letrero en la puerta y destino de misiones (taxi y repartos).
import * as THREE from 'three';

export const NEG_ICON = { bar: '🍺', tienda: '🛒', panaderia: '🥖', carniceria: '🥩', taller: '🔧', granja: '🐄', farmacia: '💊', restaurante: '🍽️', otro: '🏪' };
const COL = { bar: '#7a3b1e', tienda: '#1f5f8b', panaderia: '#a8682a', carniceria: '#8b1f2a', taller: '#3a4a55', granja: '#4a6b2a', farmacia: '#1f7a4a', restaurante: '#6b2a5a', otro: '#4a4a4a' };

// punto de la calle más cercano a la puerta (para que el coche pueda llegar)
function frontOf([x, z], roads, region, maxD = 25) {
  let best = null, bd = maxD;
  for (const r of roads) for (let i = 0; i < r.p.length - 1; i++) {
    const a = r.p[i], c = r.p[i + 1], dx = c[0] - a[0], dz = c[1] - a[1], L = dx * dx + dz * dz || 1;
    const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)), qx = a[0] + dx * t, qz = a[1] + dz * t, d = Math.hypot(x - qx, z - qz);
    if (d < bd) { bd = d; best = [qx, qz]; }
  }
  if (!best && region) { const n = region.nearest(x, z, maxD); if (n >= 0) best = region.nodePos(n); }
  if (!best) return [x, z];
  // un poco hacia la puerta, sin salirse de la calzada
  const dx = x - best[0], dz = z - best[1], d = Math.hypot(dx, dz);
  return d > 2.5 ? [best[0] + dx / d * 1.5, best[1] + dz / d * 1.5] : best;
}

function signTex(name, tipo) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 160; const g = c.getContext('2d');
  g.fillStyle = COL[tipo] || COL.otro; g.fillRect(0, 0, 512, 160);
  g.strokeStyle = '#e8d9b0'; g.lineWidth = 8; g.strokeRect(8, 8, 496, 144);
  g.fillStyle = '#fff6dc'; g.textAlign = 'center'; g.textBaseline = 'middle';
  let fs = 64; g.font = `700 ${fs}px Georgia, serif`;
  while (g.measureText(name).width > 330 && fs > 26) { fs -= 4; g.font = `700 ${fs}px Georgia, serif`; }
  g.fillText(name, 300, 84);
  g.font = '72px system-ui'; g.fillText(NEG_ICON[tipo] || NEG_ICON.otro, 82, 86);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

export class Negocios {
  constructor(list, { terrain, roads, region }) {
    this.group = new THREE.Group(); this.list = [];
    const post = new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.9 }), postG = new THREE.CylinderGeometry(0.06, 0.07, 3, 6);
    for (const n of list || []) {
      const [x, z] = n.xy, front = frontOf([x, z], roads, region), tipo = NEG_ICON[n.tipo] ? n.tipo : 'otro';
      const it = { name: n.name || 'Negocio', tipo, icon: NEG_ICON[tipo], xy: [x, z], at: front };
      this.list.push(it);
      // letrero de dos caras sobre dos postes, junto a la puerta, mirando a la calle
      const s = new THREE.Group(), y = terrain.height(x, z), mat = new THREE.MeshStandardMaterial({ map: signTex(it.name, tipo), roughness: 0.7, side: THREE.DoubleSide });
      const board = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), mat); board.position.y = 2.55; s.add(board);
      for (const k of [-1, 1]) { const p = new THREE.Mesh(postG, post); p.position.set(k * 1.05, 1.5, -0.02); s.add(p); }
      const dx = front[0] - x, dz = front[1] - z, d = Math.hypot(dx, dz);
      const k = d > 2.5 ? (d - 2.5) / d : 0, px = x + dx * k, pz = z + dz * k; // a 2,5 m de la calle, delante de la fachada
      s.position.set(px, Math.min(y, terrain.height(px, pz)), pz); if (d > 0.5) s.rotation.y = Math.atan2(dx, dz);
      s.traverse(o => { o.castShadow = true; }); this.group.add(s);
    }
  }
}
