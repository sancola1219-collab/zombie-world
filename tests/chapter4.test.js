import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER4 } from '../js/levels/chapter4.js';
import { ITEMS } from '../js/game/items.js';
import { Warlord } from '../js/game/enemies/warlord.js';

test('第四章〈聖時爆君〉：門/實體/文件位置全部合法', () => {
  const w = new World(CHAPTER4);
  const ids = new Set(CHAPTER4.rooms.map((r) => r.id));
  for (const d of CHAPTER4.doors) {
    assert.ok(ids.has(d.from), `${d.id} from 不存在`);
    if (d.to !== null) assert.ok(ids.has(d.to), `${d.id} to 不存在`);
  }
  const all = [
    ...CHAPTER4.entities.pickups,
    ...CHAPTER4.entities.enemies,
    ...CHAPTER4.entities.typewriters,
    ...CHAPTER4.documents,
    ...CHAPTER4.npcs,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在房間內`);
  }
  for (const p of CHAPTER4.entities.pickups) assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
});

test('第四章推進鏈：提升機插銷(liftkey)在可達區、出口需插銷、全區連通', () => {
  const w = new World(CHAPTER4);
  const spawnRoom = w.roomAt(CHAPTER4.spawn.x, CHAPTER4.spawn.z);
  const reach = w.reachableRooms(spawnRoom);
  const liftDoc = CHAPTER4.documents.find((d) => d.grantsKey === 'liftkey');
  assert.ok(liftDoc, '應有授予 liftkey 的控制盤文件');
  assert.ok(reach.has(w.roomAt(liftDoc.x, liftDoc.z)), '提升機控制盤必須在可達區');
  const exit = CHAPTER4.doors.find((d) => d.lock === 'chapterExit');
  assert.ok(exit && exit.to === null && exit.from === 'fcorr');
  assert.equal(CHAPTER4.exitNeeds, 'liftkey');
  assert.ok(ITEMS.liftkey, 'liftkey 道具需定義');
  const all = w.reachableRooms(spawnRoom, { ignoreLocks: true });
  for (const r of CHAPTER4.rooms) assert.ok(all.has(r.id), `房間 ${r.id} 與世界不連通`);
});

test('第四章：聖時爆君(warlord) Boss＋內心獨白＋第五章伏筆', () => {
  const bosses = CHAPTER4.entities.enemies.filter((e) => e.type === 'warlord');
  assert.equal(bosses.length, 1, '應有且僅有一隻聖時爆君');
  assert.equal(CHAPTER4.isBossLevel, true);
  const withMono = CHAPTER4.triggers.filter((t) => t.monologue).length;
  assert.ok(withMono >= 3, `應有多個內心獨白觸發器，實際 ${withMono}`);
  assert.ok(CHAPTER4.endingText.includes('第五章') || CHAPTER4.endingText.includes('待續'));
  assert.equal(CHAPTER4.next, 'chapter5'); // 已銜接街道篇
});

test('聖時爆君 AI：高血量裝甲、半血狂暴加速、火箭與重擊', () => {
  const b = new Warlord({ id: 'b', x: 0, z: 0 });
  assert.ok(b.hp >= 2000, 'Boss 血量應極高（逃脫型，殺不動）');
  assert.equal(b.phase, 1);
  // 普通傷害不打斷（裝甲）
  b.alerted = true;
  b.hurt(30, 'body');
  assert.notEqual(b.state, 'stagger', '普通傷害不應打斷聖時爆君');
  // 打到半血觸發狂暴、加速
  const prevSpeed = b.speed;
  b.hp = 1200 + 10;
  b.hurt(50, 'body');
  assert.equal(b.phase, 2, '半血應進入狂暴');
  assert.ok(b.speed > prevSpeed, '狂暴後應加速');
  assert.equal(b.state, 'roar');
  // 血量極高：不會被一次打死
  assert.equal(b.dead, false);
});
