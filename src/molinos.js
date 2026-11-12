// Molinos eólicos puestos por Darío en el plano: torre de 150 m hasta el buje y palas de 86 m.
// Se ven desde lejos (niebla más suave que el resto), giran despacio y de noche llevan la baliza roja.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const HUB = 150, BLADE = 86, HUB_R = 2.2, RPM = 11, YAW = Math.PI / 2; // el rotor mira al oeste (viento de poniente)

// la niebla de estas piezas empieza y acaba más lejos: un molino se ve a varios kilómetros
function farFog(m, k = 2.6) {
  m.onBeforeCompile = s => {
    s.fragmentShader = s.fragmentShader.replace('#include <fog_fragment>', `#ifdef USE_FOG
  float fogF = smoothstep( fogNear * ${k.toFixed(1)}, fogFar * ${k.toFixed(1)}, vFogDepth );
  gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogF );
#endif`);
  };
  return m;
}

function bladeGeometry() {
  // pala: perfil ancho junto al buje que se estrecha hasta la punta, algo torcida
  const g = new THREE.BoxGeometry(1, BLADE, 1, 1, 12, 1), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = p.getY(i) / BLADE + 0.5, chord = 4.2 * (1 - t) ** 0.8 + 0.7 * t, thick = 1.6 * (1 - t) + 0.25 * t;
    const x = p.getX(i) * chord, z = p.getZ(i) * thick, tw = (1 - t) * 0.35;
    p.setXYZ(i, x * Math.cos(tw) - z * Math.sin(tw) + (p.getX(i) > 0 ? 0.6 * (1 - t) : 0), p.getY(i) + BLADE / 2 + HUB_R * 0.6, x * Math.sin(tw) + z * Math.cos(tw));
  }
  g.computeVertexNormals(); return g;
}

export class Molinos {
  constructor(list, terrain, colliders) {
    this.group = new THREE.Group(); this.list = []; this.t = 0;
    if (!list?.length) return;
    const white = farFog(new THREE.MeshStandardMaterial({ color: 0xeef0f0, roughness: 0.55, metalness: 0.05 }));
    const grey = farFog(new THREE.MeshStandardMaterial({ color: 0xb8bcbe, roughness: 0.8 }));
    // torre troncocónica, góndola y zapata de hormigón
    const tower = new THREE.CylinderGeometry(1.6, 3.0, HUB + 2, 20, 1, true); tower.translate(0, (HUB + 2) / 2 - 2, 0);
    const nac = new THREE.BoxGeometry(4.2, 4.4, 14); nac.translate(0, HUB + 0.6, 4.5);
    const nacTop = new THREE.CylinderGeometry(2.1, 2.1, 14, 16, 1); nacTop.rotateX(Math.PI / 2); nacTop.translate(0, HUB + 2.8, 4.5);
    const yawRing = new THREE.CylinderGeometry(1.9, 1.9, 1, 16); yawRing.translate(0, HUB - 1.6, 1.5);
    const towerGeo = mergeGeometries([tower, nac, nacTop, yawRing]);
    const base = new THREE.CylinderGeometry(9, 10, 1.2, 24); base.translate(0, -0.3, 0);
    // rotor: buje (morro redondeado) y tres palas, en el plano XY; gira alrededor de Z
    const nose = new THREE.SphereGeometry(HUB_R + 0.4, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2); nose.rotateX(-Math.PI / 2); nose.scale(1, 1, 1.6); nose.translate(0, 0, -1.2);
    const hubC = new THREE.CylinderGeometry(HUB_R + 0.4, HUB_R + 0.4, 2.4, 16); hubC.rotateX(Math.PI / 2);
    const b0 = bladeGeometry(), blades = [0, 1, 2].map(k => b0.clone().rotateZ(k * Math.PI * 2 / 3));
    const rotorGeo = mergeGeometries([nose.toNonIndexed(), hubC.toNonIndexed(), ...blades.map(b => b.toNonIndexed())]);
    // baliza roja de noche (encima de la góndola)
    this.lightMat = new THREE.MeshBasicMaterial({ color: 0xff2015, fog: false, transparent: true });
    const lampGeo = new THREE.SphereGeometry(1.1, 10, 8);
    for (const [x, z] of list) {
      const y = terrain.ground(x, z), yaw = YAW + Math.sin(x * 0.013 + z * 0.021) * 0.12;
      const root = new THREE.Group(); root.position.set(x, y, z); root.rotation.y = yaw;
      const tw = new THREE.Mesh(towerGeo, white); tw.castShadow = true; root.add(tw);
      const bs = new THREE.Mesh(base, grey); bs.receiveShadow = true; root.add(bs);
      const rotor = new THREE.Mesh(rotorGeo, white); rotor.position.set(0, HUB, -3.4); rotor.rotation.z = Math.random() * 6.28; rotor.castShadow = true; root.add(rotor);
      const lamp = new THREE.Mesh(lampGeo, this.lightMat); lamp.position.set(0, HUB + 5.4, 8); root.add(lamp);
      for (const o of [tw, bs, rotor, lamp]) o.frustumCulled = true;
      this.group.add(root);
      // el rotor, en coordenadas del mundo: centro y eje (hacia donde mira)
      const ax = -Math.sin(yaw), az = -Math.cos(yaw);
      this.list.push({ x, z, y, rotor, hub: new THREE.Vector3(x + ax * 3.4, y + HUB, z + az * 3.4), ax, az, speed: (RPM / 60) * Math.PI * 2 * (0.9 + 0.2 * Math.random()) });
      // la torre es un obstáculo en el suelo: un octógono de 3 m
      if (colliders) { const pts = []; for (let k = 0; k < 8; k++) pts.push([x + 3.1 * Math.cos(k * Math.PI / 4), z + 3.1 * Math.sin(k * Math.PI / 4)]);
        for (let k = 0; k < 8; k++) colliders.addSegment(pts[k][0], pts[k][1], pts[(k + 1) % 8][0], pts[(k + 1) % 8][1], 'building');
        colliders.addArea?.(pts); }
    }
  }
  // giro de las palas (sentido horario visto de frente) y la baliza que parpadea de noche, todas a la vez
  update(dt, night = 0) {
    if (!this.list.length) return;
    this.t += dt;
    for (const m of this.list) m.rotor.rotation.z -= m.speed * dt;
    const on = night > 0.3 && (this.t % 2) < 1;
    this.lightMat.opacity = on ? 1 : 0; this.lightMat.visible = on;
  }
  // ¿un punto (la avioneta) choca con un molino? devuelve el motivo o null
  hit(p) {
    for (const m of this.list) {
      const dx = p.x - m.x, dz = p.z - m.z, d = Math.hypot(dx, dz);
      if (d > BLADE + 10) continue;
      if (d < 4 && p.y < m.y + HUB + 3) return 'Te has estrellado contra la torre de un molino';
      // dentro del disco del rotor: cerca del plano de giro y a menos de una pala del buje
      const hx = p.x - m.hub.x, hy = p.y - m.hub.y, hz = p.z - m.hub.z, along = hx * m.ax + hz * m.az;
      if (Math.abs(along) < 4 && Math.hypot(hx - m.ax * along, hy, hz - m.az * along) < BLADE + HUB_R) return 'Te han dado las palas de un molino';
    }
    return null;
  }
}
