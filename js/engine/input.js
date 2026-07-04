// 輸入抽象層：onKeyDown/onKeyUp/onMouseMove 為可直接呼叫的純方法（可測），
// attach() 才做 DOM 事件接線。PointerLock 失敗自動退化為拖曳視角模式。
export class Input {
  constructor() {
    this.keys = new Set();
    this._justPressed = new Set();
    this._lookDX = 0;
    this._lookDY = 0;
    this.pointerLocked = false;
    this.dragMode = false;
    this._dragging = false;
    this._dragLast = null;
  }

  onKeyDown(code, repeat = false) {
    if (repeat) return;
    this.keys.add(code);
    this._justPressed.add(code);
  }

  onKeyUp(code) {
    this.keys.delete(code);
  }

  onMouseMove(dx, dy) {
    this._lookDX += dx;
    this._lookDY += dy;
  }

  pressed(code) {
    return this.keys.has(code);
  }

  consumePressed(code) {
    const had = this._justPressed.has(code);
    this._justPressed.delete(code);
    return had;
  }

  consumeLook() {
    const v = [this._lookDX, this._lookDY];
    this._lookDX = 0;
    this._lookDY = 0;
    return v;
  }

  actions() {
    return {
      moveX: (this.pressed('KeyD') ? 1 : 0) - (this.pressed('KeyA') ? 1 : 0),
      moveZ: (this.pressed('KeyS') ? 1 : 0) - (this.pressed('KeyW') ? 1 : 0),
      run: this.pressed('ShiftLeft') || this.pressed('ShiftRight'),
      interact: this.consumePressed('KeyE'),
      look: this.consumeLook(),
    };
  }

  enableDragMode() {
    this.dragMode = true;
    this.pointerLocked = false;
  }

  attach(canvas) {
    window.addEventListener('keydown', (e) => this.onKeyDown(e.code, e.repeat));
    window.addEventListener('keyup', (e) => this.onKeyUp(e.code));
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas;
    });
    document.addEventListener('pointerlockerror', () => this.enableDragMode());
    canvas.addEventListener('click', () => {
      if (this.pointerLocked || this.dragMode) return;
      if (canvas.requestPointerLock) canvas.requestPointerLock();
      else this.enableDragMode();
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this.pointerLocked) {
        this.onMouseMove(e.movementX, e.movementY);
      } else if (this.dragMode && this._dragging) {
        this.onMouseMove(e.clientX - this._dragLast[0], e.clientY - this._dragLast[1]);
        this._dragLast = [e.clientX, e.clientY];
      }
    });
    canvas.addEventListener('mousedown', (e) => {
      if (this.dragMode) {
        this._dragging = true;
        this._dragLast = [e.clientX, e.clientY];
      }
    });
    window.addEventListener('mouseup', () => {
      this._dragging = false;
    });
  }
}
