import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER3 } from '../js/levels/chapter3.js';
import { ITEMS } from '../js/game/items.js';
import { Prime } from '../js/game/enemies/prime.js';
import { mulberry32 } from '../js/engine/rng.js';

test('第三章：門/實體/文件位置全部合法', () => {
  const w = new World(CHAPTER3);
  const ids = new Set(CHAPTER3.rooms.map((r) => r.id));
  for (const d of CHAPTER3.doors) {
    assert.ok(ids.has(d.from), `${d.id} from 不存在`);
    if (d.to !== null) assert.ok(ids.has(d.to), `${d.id} to 不存在`);
  }
  const all = [
    ...CHAPTER3.entities.pickups,
    ...CHAPTER3.entities.enemies,
    ...CHAPTER3.entities.typewriters,
    ...CHAPTER3.documents,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在房間內`);
  }
  for (const p of CHAPTER3.entities.pickups) assert.ok(ITEMS[p.item], `未定義 ${p.item}`);
});

test('第三章：Boss 擊破前豎井不可達、擊破解鎖後可達', () => {
  const w = new World(CHAPTER3);
  const before = w.reachableRooms('gate');
  for (const r of ['speclab', 'controlroom', 'corelab', 'vault', 'coolant', 'annex']) {
    assert.ok(before.has(r), `開局應可達 ${r}`);
  }
  assert.ok(!before.has('shaft'), 'Boss 前不應可達豎井');
  w.doors.get('d3-core-shaft').lock = null;
  assert.ok(w.reachableRooms('gate').has('shaft'));
  // Boss 與火箭炮都在可達區
  const boss = CHAPTER3.entities.enemies.find((e) => e.type === 'prime');
  assert.ok(before.has(w.roomAt(boss.x, boss.z)));
  const rocket = CHAPTER3.entities.pickups.find((p) => p.item === 'rocket_weapon');
  assert.ok(before.has(w.roomAt(rocket.x, rocket.z)));
});

test('原體：階段轉換、重擊才硬直、衝撞與酸液', () => {
  const ROOM = { id: 't', rooms: [{ id: 'r', x: 0, z: 0, w: 30, d: 30, h: 5 }], doors: [] };
  const hits = [];
  const poisons = [];
  const ctx = {
    player: { x: 15, z: 20 },
    world: new World(ROOM),
    rng: mulberry32(1),
    gameTime: 0,
    attackPlayer: (d) => hits.push(d),
    sound() {},
    poison: (s) => poisons.push(s),
  };
  const p = new Prime({ id: 'p', x: 15, z: 10 });
  // 輕傷不硬直
  p.hurt(50, 'body');
  assert.notEqual(p.state, 'stagger');
  // 半血 → 第二階段
  p.hp = 460;
  p.hurt(20, 'body');
  assert.equal(p.phase, 2);
  assert.equal(p.state, 'roar');
  assert.ok(p.speed > 2);
  // 第二階段酸液：近~9m 內、冷卻歸零 → spit → 傷害+中毒
  for (let i = 0; i < 90; i++) p.update(1 / 60, ctx); // roar 1.2s + chase
  p._acidCd = 0;
  ctx.player.x = 15;
  ctx.player.z = p.z - 6;
  for (let i = 0; i < 200 && poisons.length === 0; i++) p.update(1 / 60, ctx);
  assert.ok(poisons.length >= 1, '第二階段應噴酸使玩家中毒');
  // 死亡
  p.hurt(9999, 'head');
  assert.ok(p.dead);
});
