// Entrada unificada: teclado + ratón en ordenador, joystick y botones táctiles en móvil.
export class Input {
  constructor(dom) {
    this.keys = new Set();
    this.move = { x: 0, y: 0 };      // joystick táctil (-1..1)
    this.look = { dx: 0, dy: 0 };    // giro de cámara acumulado
    this.buttons = { run: false, action: false, brake: false, jump: false, left: false, right: false, gas: false, rev: false };
    this.pressed = new Set();        // pulsaciones de un solo frame
    this.touch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    addEventListener('keydown', e => {
      if (!this.keys.has(e.code)) this.pressed.add(e.code);
      this.keys.add(e.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    });
    addEventListener('keyup', e => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());

    // Ratón: arrastrar para girar la cámara (o bloqueo de puntero al hacer clic)
    dom.addEventListener('click', () => { if (!this.touch && document.pointerLockElement !== dom) dom.requestPointerLock?.(); });
    addEventListener('mousemove', e => {
      if (document.pointerLockElement === dom) { this.look.dx += e.movementX; this.look.dy += e.movementY; }
    });

    if (this.touch) this.#setupTouch(dom);
  }

  #setupTouch(dom) {
    document.body.classList.add('touch');
    const stick = document.getElementById('stick'), knob = document.getElementById('knob');
    let stickId = null, lookId = null, sx = 0, sy = 0, lx = 0, ly = 0;
    const R = 55;
    stick.addEventListener('touchstart', e => {
      const t = e.changedTouches[0]; stickId = t.identifier;
      const r = stick.getBoundingClientRect(); sx = r.left + r.width / 2; sy = r.top + r.height / 2;
      this.#stickMove(t, sx, sy, R, knob); e.preventDefault();
    }, { passive: false });
    dom.addEventListener('touchstart', e => {
      for (const t of e.changedTouches) if (lookId === null) { lookId = t.identifier; lx = t.clientX; ly = t.clientY; }
      e.preventDefault();
    }, { passive: false });
    addEventListener('touchmove', e => {
      for (const t of e.changedTouches) {
        if (t.identifier === stickId) this.#stickMove(t, sx, sy, R, knob);
        else if (t.identifier === lookId) { this.look.dx += (t.clientX - lx) * 1.6; this.look.dy += (t.clientY - ly) * 1.6; lx = t.clientX; ly = t.clientY; }
      }
      e.preventDefault();
    }, { passive: false });
    const end = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === stickId) { stickId = null; this.move.x = this.move.y = 0; knob.style.transform = ''; }
        if (t.identifier === lookId) lookId = null;
      }
    };
    addEventListener('touchend', end); addEventListener('touchcancel', end);

    for (const b of document.querySelectorAll('[data-btn]')) {
      const name = b.dataset.btn;
      b.addEventListener('touchstart', e => { this.buttons[name] = true; this.pressed.add('btn:' + name); b.classList.add('on'); e.preventDefault(); e.stopPropagation(); }, { passive: false });
      const up = e => { this.buttons[name] = false; b.classList.remove('on'); e.preventDefault(); };
      b.addEventListener('touchend', up); b.addEventListener('touchcancel', up);
    }
  }

  #stickMove(t, sx, sy, R, knob) {
    let dx = t.clientX - sx, dy = t.clientY - sy;
    const d = Math.hypot(dx, dy); if (d > R) { dx *= R / d; dy *= R / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    this.move.x = dx / R; this.move.y = -dy / R;
  }

  // Ejes combinados teclado + joystick
  axes() {
    const k = this.keys;
    let x = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    let y = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    x += this.move.x; y += this.driving ? 0 : this.move.y; // en coche el joystick solo es el volante
    const b = this.buttons; x += (b.right ? 1 : 0) - (b.left ? 1 : 0); y += (b.gas ? 1 : 0) - (b.rev ? 1 : 0);
    return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  }
  get run() { return this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') || this.buttons.run || Math.hypot(this.move.x, this.move.y) > 0.95; }
  get brake() { return this.keys.has('Space') || this.buttons.brake || this.buttons.jump; }
  wasPressed(...codes) { return codes.some(c => this.pressed.has(c)); }
  consumeLook() { const l = { ...this.look }; this.look.dx = this.look.dy = 0; return l; }
  endFrame() { this.pressed.clear(); }
}
