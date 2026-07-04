// Canvas 程序貼圖：零外部素材。固定種子保證每次生成一致。
import * as THREE from 'three';
import { mulberry32 } from './rng.js';

const cache = new Map();

export function getTexture(kind) {
  if (!cache.has(kind)) {
    const gen = GENERATORS[kind];
    if (!gen) throw new Error(`未知貼圖種類：${kind}`);
    cache.set(kind, gen());
  }
  return cache.get(kind);
}

function makeCanvas(size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function toTexture(canvas, repeat = 1) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const GENERATORS = {
  // 直紋木板：分板條、每條木紋色差＋縱向紋理線
  wood() {
    const rng = mulberry32(11);
    const c = makeCanvas();
    const g = c.getContext('2d');
    const plank = 64;
    for (let px = 0; px < 256; px += plank) {
      const base = 58 + rng() * 18;
      g.fillStyle = `rgb(${base + 20}, ${base - 4}, ${base - 28})`;
      g.fillRect(px, 0, plank, 256);
      for (let i = 0; i < 22; i++) {
        g.strokeStyle = `rgba(28, 16, 8, ${0.1 + rng() * 0.25})`;
        g.lineWidth = 0.5 + rng() * 1.5;
        const x = px + rng() * plank;
        g.beginPath();
        g.moveTo(x, 0);
        for (let y = 0; y <= 256; y += 16) {
          g.lineTo(x + Math.sin(y * 0.04 + rng() * 6) * 2.5, y);
        }
        g.stroke();
      }
      g.fillStyle = 'rgba(0,0,0,0.5)';
      g.fillRect(px, 0, 2, 256);
    }
    return toTexture(c, 2);
  },

  // 磁磚：格線＋每格微妙明度差
  tile() {
    const rng = mulberry32(22);
    const c = makeCanvas();
    const g = c.getContext('2d');
    const size = 64;
    for (let ty = 0; ty < 256; ty += size) {
      for (let tx = 0; tx < 256; tx += size) {
        const v = 108 + rng() * 22;
        g.fillStyle = `rgb(${v}, ${v + 3}, ${v + 2})`;
        g.fillRect(tx, ty, size, size);
        g.fillStyle = `rgba(0, 0, 0, ${0.04 + rng() * 0.08})`;
        for (let i = 0; i < 14; i++) {
          g.fillRect(tx + rng() * size, ty + rng() * size, 1 + rng() * 3, 1 + rng() * 3);
        }
      }
    }
    g.strokeStyle = 'rgba(30, 32, 30, 0.85)';
    g.lineWidth = 2;
    for (let i = 0; i <= 256; i += size) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.stroke();
    }
    return toTexture(c, 3);
  },

  // 壁紙：暗色直條紋＋歲月污漬
  wallpaper() {
    const rng = mulberry32(33);
    const c = makeCanvas();
    const g = c.getContext('2d');
    g.fillStyle = '#4c4436';
    g.fillRect(0, 0, 256, 256);
    for (let x = 0; x < 256; x += 32) {
      g.fillStyle = 'rgba(76, 62, 44, 0.9)';
      g.fillRect(x, 0, 14, 256);
      g.fillStyle = 'rgba(30, 25, 16, 0.35)';
      g.fillRect(x + 14, 0, 2, 256);
    }
    for (let i = 0; i < 26; i++) {
      const x = rng() * 256;
      const y = rng() * 256;
      const r = 8 + rng() * 34;
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(18, 14, 8, ${0.1 + rng() * 0.22})`);
      grad.addColorStop(1, 'rgba(18, 14, 8, 0)');
      g.fillStyle = grad;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    return toTexture(c, 2);
  },

  // 斑駁灰泥：噪點＋裂痕
  plaster() {
    const rng = mulberry32(44);
    const c = makeCanvas();
    const g = c.getContext('2d');
    g.fillStyle = '#8a8578';
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++) {
      const v = rng();
      g.fillStyle = v > 0.5 ? `rgba(60, 56, 46, ${0.05 + v * 0.1})` : `rgba(180, 174, 158, ${0.05 + v * 0.1})`;
      g.fillRect(rng() * 256, rng() * 256, 1 + rng() * 3, 1 + rng() * 3);
    }
    for (let i = 0; i < 5; i++) {
      g.strokeStyle = 'rgba(40, 36, 28, 0.5)';
      g.lineWidth = 0.8;
      let x = rng() * 256;
      let y = rng() * 256;
      g.beginPath();
      g.moveTo(x, y);
      for (let s = 0; s < 8; s++) {
        x += (rng() - 0.5) * 40;
        y += rng() * 24;
        g.lineTo(x, y);
      }
      g.stroke();
    }
    return toTexture(c, 2);
  },
};
