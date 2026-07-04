// 固定時步遊戲迴圈：邏輯永遠以 1/hz 秒為單位前進，與渲染（rAF）解耦。
// 分頁隱藏時 rAF 會停擺，改由 setInterval 驅動 tick，邏輯不中斷。
export class GameLoop {
  constructor({ update, render = null, hz = 60, maxFrameTime = 0.25, maxUpdatesPerTick = 240 }) {
    this.update = update;
    this.render = render;
    this.step = 1 / hz;
    this.maxFrameTime = maxFrameTime;
    this.maxUpdatesPerTick = maxUpdatesPerTick;
    this.accumulator = 0;
    this.lastTime = null;
    this.running = false;
    this._raf = 0;
    this._interval = 0;
    this._onVis = null;
  }

  // now 以秒為單位。回傳本次執行的 update 次數（供測試與診斷）。
  tick(now) {
    if (this.lastTime === null) {
      this.lastTime = now;
      return 0;
    }
    let frame = now - this.lastTime;
    this.lastTime = now;
    if (frame < 0) frame = 0;
    if (frame > this.maxFrameTime) frame = this.maxFrameTime;
    this.accumulator += frame;
    let updates = 0;
    while (this.accumulator >= this.step) {
      this.update(this.step);
      this.accumulator -= this.step;
      if (++updates >= this.maxUpdatesPerTick) {
        this.accumulator = 0;
        break;
      }
    }
    return updates;
  }

  start() {
    if (this.running) return;
    this.running = true;
    const rafStep = (ms) => {
      if (!this.running) return;
      this.tick(ms / 1000);
      if (this.render) this.render();
      this._raf = requestAnimationFrame(rafStep);
    };
    this._raf = requestAnimationFrame(rafStep);
    this._onVis = () => {
      if (!this.running) return;
      if (document.hidden) {
        cancelAnimationFrame(this._raf);
        this._interval = setInterval(() => this.tick(performance.now() / 1000), 50);
      } else {
        clearInterval(this._interval);
        this._raf = requestAnimationFrame(rafStep);
      }
    };
    document.addEventListener('visibilitychange', this._onVis);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this._raf);
    clearInterval(this._interval);
    if (this._onVis) {
      document.removeEventListener('visibilitychange', this._onVis);
      this._onVis = null;
    }
    this.lastTime = null;
    this.accumulator = 0;
  }
}
