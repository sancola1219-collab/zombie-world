// HUD：心電圖、彈藥、受擊紅暈、命中標記。只讀狀態、不改狀態。
import { WEAPONS } from '../game/weapons.js';

const TIER_COLOR = { fine: '#57d06a', caution: '#e0b83a', danger: '#e04040' };
const TIER_PERIOD = { fine: 1.25, caution: 0.9, danger: 0.55 };

export class HUD {
  constructor() {
    this.ammoEl = document.getElementById('ammo');
    this.vignetteEl = document.getElementById('vignette');
    this.hitEl = document.getElementById('hitmarker');
    this.ecg = document.getElementById('ecg');
    this.ecgCtx = this.ecg.getContext('2d');
    this._phase = 0;
    this._samples = new Array(110).fill(0.5);
    this._vignette = 0;
    this._hitTime = 0;
    this._lastAmmoText = '';
  }

  setAmmo(arsenal, inventory) {
    const id = arsenal.current;
    const def = WEAPONS[id];
    let text;
    if (def.melee) {
      text = def.name;
    } else {
      const reserve = inventory.countOf(def.ammoItem);
      text = `${def.name}　${arsenal.loadedRounds()} / ${reserve}`;
    }
    if (text !== this._lastAmmoText) {
      this._lastAmmoText = text;
      this.ammoEl.textContent = text;
    }
  }

  damageFlash() {
    this._vignette = 0.9;
  }

  hitmark() {
    this._hitTime = 0.09;
  }

  update(dt, player) {
    // 紅暈衰減
    if (this._vignette > 0.01) {
      this._vignette *= Math.pow(0.06, dt); // 約 0.7 秒淡出
      this.vignetteEl.style.opacity = String(this._vignette);
    } else if (this.vignetteEl.style.opacity !== '0') {
      this.vignetteEl.style.opacity = '0';
    }
    // 命中標記
    if (this._hitTime > 0) {
      this._hitTime -= dt;
      this.hitEl.style.opacity = this._hitTime > 0 ? '1' : '0';
    }
    // 心電圖
    const tier = player.healthTier();
    this._phase += dt / TIER_PERIOD[tier];
    if (this._phase > 1) this._phase -= 1;
    this._samples.push(ecgSample(this._phase, player.hp <= 0));
    this._samples.shift();
    this._drawEcg(TIER_COLOR[tier], player.hp <= 0);
  }

  _drawEcg(color, flat) {
    const c = this.ecgCtx;
    const W = this.ecg.width;
    const H = this.ecg.height;
    c.clearRect(0, 0, W, H);
    c.strokeStyle = 'rgba(90,100,90,0.35)';
    c.strokeRect(0.5, 0.5, W - 1, H - 1);
    c.beginPath();
    c.strokeStyle = flat ? '#666' : color;
    c.lineWidth = 1.6;
    for (let i = 0; i < this._samples.length; i++) {
      const x = (i / (this._samples.length - 1)) * (W - 8) + 4;
      const y = H - 6 - this._samples[i] * (H - 14);
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.stroke();
  }
}

// 一個心跳週期的波形（0..1 相位 → 0..1 振幅，0.5 為基線偏下）
function ecgSample(phase, flat) {
  if (flat) return 0.28;
  if (phase < 0.08) return 0.28 + 0.1 * Math.sin((phase / 0.08) * Math.PI); // P 波
  if (phase < 0.14) return 0.28;
  if (phase < 0.18) return 0.28 - 0.12 * ((phase - 0.14) / 0.04); // Q
  if (phase < 0.24) return 0.16 + 0.84 * ((phase - 0.18) / 0.06); // R 尖峰
  if (phase < 0.3) return 1.0 - 1.05 * ((phase - 0.24) / 0.06); // S
  if (phase < 0.36) return -0.05 + 0.33 * ((phase - 0.3) / 0.06);
  if (phase < 0.55) return 0.28 + 0.08 * Math.sin(((phase - 0.36) / 0.19) * Math.PI); // T 波
  return 0.28;
}
