import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER2 } from '../js/levels/chapter2.js';
import { ITEMS } from '../js/game/items.js';

test('第二章：門/實體/文件位置全部合法', () => {
  const w = new World(CHAPTER2);
  const ids = new Set(CHAPTER2.rooms.map((r) => r.id));
  for (const d of CHAPTER2.doors) {
    assert.ok(ids.has(d.from), `${d.id} from 不存在`);
    if (d.to !== null) assert.ok(ids.has(d.to), `${d.id} to 不存在`);
  }
  const all = [
    ...CHAPTER2.entities.pickups,
    ...CHAPTER2.entities.enemies,
    ...CHAPTER2.entities.typewriters,
    ...CHAPTER2.documents,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在房間內`);
  }
  for (const p of CHAPTER2.entities.pickups) {
    assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
  }
});

test('第二章推進鏈：通行卡前後可達範圍、通行卡在可達區', () => {
  const w = new World(CHAPTER2);
  const before = w.reachableRooms('b1lift');
  for (const r of ['b1hall', 'coldroom', 'storage', 'barracks', 'tunnel', 'pumproom', 'sump']) {
    assert.ok(before.has(r), `開局應可達 ${r}`);
  }
  assert.ok(!before.has('lablock'), '通行卡前不應可達閘門廳');
  const key = CHAPTER2.entities.pickups.find((p) => p.item === 'labkey');
  assert.ok(before.has(w.roomAt(key.x, key.z)), '通行卡必須在可達範圍');
  w.doors.get('d2-pump-lab').lock = null;
  assert.ok(w.reachableRooms('b1lift').has('lablock'), '解鎖後可達閘門廳');
});

test('第二章：出口設定與章節銜接欄位', () => {
  assert.equal(CHAPTER2.exitNeeds, 'labkey');
  const exit = CHAPTER2.doors.find((d) => d.lock === 'chapterExit');
  assert.ok(exit && exit.from === 'lablock' && exit.to === null);
  assert.ok(Array.isArray(CHAPTER2.story) && CHAPTER2.story.length >= 3, '應有開場劇情頁');
});
