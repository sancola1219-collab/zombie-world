import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER1 } from '../js/levels/chapter1.js';
import { ITEMS } from '../js/game/items.js';

test('第一章：所有門連接的房間都存在', () => {
  const ids = new Set(CHAPTER1.rooms.map((r) => r.id));
  for (const d of CHAPTER1.doors) {
    assert.ok(ids.has(d.from), `${d.id} 的 from ${d.from} 不存在`);
    if (d.to !== null) assert.ok(ids.has(d.to), `${d.id} 的 to ${d.to} 不存在`);
  }
});

test('第一章：拾取物/敵人/打字機/NPC 都落在某個房間內', () => {
  const w = new World(CHAPTER1);
  const all = [
    ...CHAPTER1.entities.pickups,
    ...CHAPTER1.entities.enemies,
    ...CHAPTER1.entities.typewriters,
    ...CHAPTER1.npcs,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在任何房間內`);
  }
});

test('第一章：拾取物品項與 NPC 贈禮都定義於 ITEMS', () => {
  for (const p of CHAPTER1.entities.pickups) {
    assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
  }
  for (const n of CHAPTER1.npcs) {
    for (const g of n.gift || []) assert.ok(ITEMS[g.item], `NPC 贈禮未定義 ${g.item}`);
  }
});

test('第一章推進鏈：鑰匙卡前後的可達範圍', () => {
  const w = new World(CHAPTER1);
  const before = w.reachableRooms('office');
  // 鑰匙卡之前：行政棟＋廠房可達，逃生動線不可達
  for (const r of ['corr', 'qa', 'reactor', 'eroom', 'fpipes', 'warehouse', 'waste']) {
    assert.ok(before.has(r), `開局應可達 ${r}`);
  }
  for (const r of ['freight', 'eastcorr', 'guard']) {
    assert.ok(!before.has(r), `鑰匙卡前不應可達 ${r}`);
  }
  // 鑰匙卡（p-keycard）位於可達範圍內
  const keyPickup = CHAPTER1.entities.pickups.find((p) => p.item === 'keycard');
  assert.ok(before.has(w.roomAt(keyPickup.x, keyPickup.z)), '鑰匙卡必須放在可達範圍內');
  // 解鎖後全通
  w.doors.get('d-wh-freight').lock = null;
  const after = w.reachableRooms('office');
  for (const r of ['freight', 'eastcorr', 'guard']) {
    assert.ok(after.has(r), `解鎖後應可達 ${r}`);
  }
});

test('第一章：觸發器房間存在、出口門為 chapterExit', () => {
  const ids = new Set(CHAPTER1.rooms.map((r) => r.id));
  for (const t of CHAPTER1.triggers) assert.ok(ids.has(t.room), `觸發器 ${t.id} 房間不存在`);
  const exit = CHAPTER1.doors.find((d) => d.lock === 'chapterExit');
  assert.ok(exit && exit.to === null && exit.from === 'guard');
});
