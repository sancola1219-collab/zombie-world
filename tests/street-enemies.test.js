// 街道篇新敵人 AI 不變式
import test from 'node:test';
import assert from 'node:assert/strict';
import { Ironmask } from '../js/game/enemies/ironmask.js';
import { Howler } from '../js/game/enemies/howler.js';
import { Dogking } from '../js/game/enemies/dogking.js';

test('鐵面：推進中盾面減傷 70%，硬直期吃全額', () => {
  const a = new Ironmask({ id: 'a', x: 0, z: 0 });
  a.alerted = true;
  a.state = 'chase';
  const hp0 = a.hp;
  a.hurt(100, 'body');
  assert.equal(hp0 - a.hp, 30, '舉盾中 100 傷應只吃 30');
  a.state = 'recover';
  const hp1 = a.hp;
  a.hurt(100, 'body');
  assert.equal(hp1 - a.hp, 100, '收招硬直應吃全額');
});

test('嘶吼者：吸氣→嘶吼會呼叫 alertAll 並冷卻', () => {
  const h = new Howler({ id: 'h', x: 0, z: 0 });
  h.alert();
  let alerted = 0;
  const ctx = {
    player: { x: 5, z: 0 },
    world: { roomAt: () => 'r', collisionSegments: () => [], doorsOfRoom: () => [] },
    attackPlayer() {},
    sound() {},
    alertAll() { alerted++; },
  };
  h._howlCd = 0;
  h.setState('chase');
  h.update(1 / 60, ctx); // chase → inhale
  assert.equal(h.state, 'inhale');
  for (let i = 0; i < 120; i++) h.update(1 / 60, ctx); // 吸氣 0.7s → howl 0.5s → 冷卻
  assert.ok(alerted >= 1, '嘶吼應觸發 alertAll');
  assert.ok(h._howlCd > 0, '嘶吼後應進冷卻');
});

test('裂嘴犬王：半血狂暴加速、血量高於一般犬', () => {
  const d = new Dogking({ id: 'd', x: 0, z: 0 });
  assert.ok(d.hp >= 300);
  const s0 = d.speed;
  d.hp = 191;
  d.hurt(10, 'body');
  assert.equal(d.frenzy, true);
  assert.ok(d.speed > s0, '狂暴應加速');
  assert.equal(d.dead, false);
});
