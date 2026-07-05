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
    this._lockErrors = 0;
    this.mouseButtons = new Set();
    this._mouseJust = new Set();
  }

  onMouseDown(button) {
    this.mouseButtons.add(button);
    this._mouseJust.add(button);
  }

  onMouseUp(button) {
    this.mouseButtons.delete(button);
  }

  consumeMouseJust(button) {
    const had = this._mouseJust.has(button);
    this._mouseJust.delete(button);
    return had;
  }

  // 消費 1-4 數字鍵，回傳 0-3 或 null
  consumeWeaponSlot() {
    for (let i = 1; i <= 4; i++) {
      if (this.consumePressed(`Digit${i}`)) return i - 1;
    }
    return null;
  }

  // 失焦/隱藏時呼叫：keyup 可能永遠不會到，清掉暫態避免幽靈按鍵持續移動
  clearTransient() {
    this.keys.clear();
    this._justPressed.clear();
    this.mouseButtons.clear();
    this._mouseJust.clear();
    this._dragging = false;
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
      fire: this.consumeMouseJust(0),
      reload: this.consumePressed('KeyR'),
      inventory: this.consumePressed('Tab'),
      weaponSlot: this.consumeWeaponSlot(),
      look: this.consumeLook(),
    };
  }

  enableDragMode() {
    this.dragMode = true;
    this.pointerLocked = false;
  }

  attach(canvas) {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Tab') e.preventDefault(); // 避免焦點跳走
      this.onKeyDown(e.code, e.repeat);
    });
    window.addEventListener('keyup', (e) => this.onKeyUp(e.code));
    document.addEventListener('pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas;
      if (this.pointerLocked) this._lockErrors = 0;
    });
    // Esc 退出後瀏覽器有約 1.25 秒重新上鎖冷卻期，暫時性失敗不可永久降級；
    // 連續多次失敗才視為環境不支援，切換拖曳模式
    document.addEventListener('pointerlockerror', () => {
      this._lockErrors += 1;
      if (this._lockErrors >= 3) this.enableDragMode();
    });
    window.addEventListener('blur', () => this.clearTransient());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.clearTransient();
    });
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
      this.onMouseDown(e.button);
      if (this.dragMode) {
        this._dragging = true;
        this._dragLast = [e.clientX, e.clientY];
      }
    });
    window.addEventListener('mouseup', (e) => {
      this.onMouseUp(e.button);
      this._dragging = false;
    });
  }
}
