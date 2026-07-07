import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { mulberry32 } from '../js/engine/rng.js';
import { Keeper } from '../js/game/enemies/keeper.js';

const ROOM = { id: 't', rooms: [{ id: 'r', x: 0, z: 0, w: 20, d: 20, h: 3 }], doors: [] };

function makeCtx(px, pz) {
  const hits = [];
  const stuns = [];
  return {
    player: { x: px, z: pz },
    world: new World(ROOM),
    rng: mulberry32(1),
    gameTime: 0,
    attackPlayer: (d) => hits.push(d),
    stunPlayer: (s) => stuns.push(s),
    sound() {},
    hits,
    stuns,
  };
}

function run(e, ctx, seconds) {
  const n = Math.round(seconds * 60);
  for (let i = 0; i < n; i++) e.update(1 / 60, ctx);
}

test('守門者：警覺→追擊→近距砸地——傷害＋電擊麻痺', () => {
  const ctx = makeCtx(5, 5);
  const k = new Keeper({ id: 'k', x: 10, z: 5 });
  run(k, ctx, 0.1);
  assert.equal(k.state, 'chase');
  run(k, ctx, 5); // 緩慢逼近＋前搖＋砸地
  assert.ok(ctx.hits.includes(20), `砸地應命中 20 傷，實際 ${ctx.hits}`);
  assert.ok(ctx.stuns.length >= 1, '命中應施加電擊麻痺');
});

test('守門者：距離遠不警覺；受傷立即警覺且硬直短', () => {
  const ctx = makeCtx(18, 18);
  const k = new Keeper({ id: 'k2', x: 2, z: 2 });
  run(k, ctx, 0.5);
  assert.equal(k.state, 'idle');
  k.hurt(10, 'body');
  assert.ok(k.alerted);
  assert.equal(k.state, 'stagger');
  run(k, ctx, 0.4);
  assert.equal(k.state, 'chase', '硬直應快速恢復');
});

test('守門者：皮厚（150 HP）且爆頭加成較低', () => {
  const k = new Keeper({ id: 'k3', x: 0, z: 0 });
  assert.equal(k.hp, 150);
  const dealt = k.hurt(10, 'head');
  assert.equal(dealt, 16, '爆頭倍率應為 1.6');
});
