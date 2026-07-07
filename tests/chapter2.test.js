import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER2 } from '../js/levels/chapter2.js';
import { ITEMS } from '../js/game/items.js';

test('第二章〈KY添加劑〉：門/實體/文件位置全部合法', () => {
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
    ...CHAPTER2.npcs,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在房間內`);
  }
  for (const p of CHAPTER2.entities.pickups) assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
});

test('第二章推進鏈：滅火器→品保實驗室→證據→安全梯（逐步解鎖無死鎖）', () => {
  const w = new World(CHAPTER2);
  const spawnRoom = w.roomAt(CHAPTER2.spawn.x, CHAPTER2.spawn.z);

  // 1. 開局：滅火器所在區可達，但品保實驗室(qalab)上鎖不可達
  const before = w.reachableRooms(spawnRoom);
  const fireext = CHAPTER2.entities.pickups.find((p) => p.item === 'fireext');
  assert.ok(fireext, '應有滅火器拾取');
  assert.ok(before.has(w.roomAt(fireext.x, fireext.z)), '滅火器必須在開局可達區');
  assert.ok(!before.has('qalab'), '滅火器前品保實驗室不應可達');

  // 2. 用滅火器解鎖品保門 → qalab 可達，且證據文件在 qalab
  w.doors.get('d2-corr-qalab').lock = null;
  const afterFireext = w.reachableRooms(spawnRoom);
  assert.ok(afterFireext.has('qalab'), '滅火器解鎖後品保實驗室應可達');
  const evidenceDoc = CHAPTER2.documents.find((d) => d.grantsKey === 'evidence');
  assert.ok(evidenceDoc, '應有授予 evidence 的文件');
  assert.ok(afterFireext.has(w.roomAt(evidenceDoc.x, evidenceDoc.z)), '證據文件必須在解鎖後可達');

  // 3. 出口需要 evidence
  const exit = CHAPTER2.doors.find((d) => d.lock === 'chapterExit');
  assert.ok(exit && exit.to === null && exit.from === 'fireexit');
  assert.equal(CHAPTER2.exitNeeds, 'evidence');
});

test('第二章：KY 變異體與觸發器/獨白設定', () => {
  const mutant = CHAPTER2.entities.enemies.find((e) => e.type === 'mutant');
  assert.ok(mutant, '第二章應有一隻 KY 變異體(mutant)');
  const ids = new Set(CHAPTER2.rooms.map((r) => r.id));
  for (const t of CHAPTER2.triggers) assert.ok(ids.has(t.room), `觸發器 ${t.id} 房間不存在`);
  // 至少數個觸發器帶內心獨白（心理氛圍）
  const withMono = CHAPTER2.triggers.filter((t) => t.monologue).length;
  assert.ok(withMono >= 3, `應有多個內心獨白觸發器，實際 ${withMono}`);
});
