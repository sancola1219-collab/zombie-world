import test from 'node:test';
import assert from 'node:assert/strict';
import { Player, EYE_HEIGHT, WALK_SPEED } from '../js/game/player.js';
import { World } from '../js/game/world.js';

const LEVEL = { id: 't', rooms: [{ id: 'r', x: 0, z: 0, w: 20, d: 20, h: 3 }], doors: [] };
const IDLE = { moveX: 0, moveZ: 0, run: false, jump: false, look: [0, 0] };

function tick(p, w, actions, seconds) {
  const n = Math.round(seconds * 60);
  for (let i = 0; i < n; i++) p.update(1 / 60, actions, w);
}

test('跳躍：起跳上升、到頂回落、落地歸零', () => {
  const w = new World(LEVEL);
  const p = new Player({ x: 5, z: 5 });
  assert.ok(p.grounded());
  p.update(1 / 60, { ...IDLE, jump: true }, w);
  assert.ok(p.vy > 0 && p.y > 0, '起跳後應離地');
  assert.ok(p.eyeHeight > EYE_HEIGHT, '視線高度應隨跳躍上升');
  tick(p, w, IDLE, 1.2); // 足夠完成一次完整跳躍
  assert.ok(p.grounded(), '應已落地');
  assert.equal(p.eyeHeight, EYE_HEIGHT);
  assert.equal(p.vy, 0);
});

test('跳躍：空中不能二段跳', () => {
  const w = new World(LEVEL);
  const p = new Player({ x: 5, z: 5 });
  p.update(1 / 60, { ...IDLE, jump: true }, w);
  const vyAfterFirst = p.vy;
  tick(p, w, IDLE, 0.15);
  p.update(1 / 60, { ...IDLE, jump: true }, w); // 空中再按跳
  assert.ok(p.vy < vyAfterFirst, '空中按跳不應重設上升速度');
});

test('麻痺：stun 期間移動大幅減速並隨時間恢復', () => {
  const w = new World(LEVEL);
  const p = new Player({ x: 5, z: 5 });
  p.stun = 1;
  const x0 = p.x;
  p.update(1 / 60, { ...IDLE, moveZ: -1 }, w);
  const stunStep = Math.hypot(p.x - x0, p.z - 5);
  assert.ok(stunStep < (WALK_SPEED / 60) * 0.5, '麻痺中步幅應大幅縮短');
  tick(p, w, IDLE, 1.1);
  assert.equal(p.stun, 0, '麻痺應隨時間結束');
});

test('麻痺中不能起跳', () => {
  const w = new World(LEVEL);
  const p = new Player({ x: 5, z: 5 });
  p.stun = 1;
  p.update(1 / 60, { ...IDLE, jump: true }, w);
  assert.ok(p.grounded(), '麻痺中按跳不應離地');
});
