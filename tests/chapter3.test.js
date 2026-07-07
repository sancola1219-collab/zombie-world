import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { CHAPTER3 } from '../js/levels/chapter3.js';
import { ITEMS } from '../js/game/items.js';

test('第三章〈封口名單〉：門/實體/文件位置全部合法', () => {
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
    ...CHAPTER3.npcs,
  ];
  for (const e of all) {
    assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id} (${e.x},${e.z}) 不在房間內`);
  }
  for (const p of CHAPTER3.entities.pickups) assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
});

test('第三章推進鏈：風險名單(dossier)在可達區、出口需名單', () => {
  const w = new World(CHAPTER3);
  const spawnRoom = w.roomAt(CHAPTER3.spawn.x, CHAPTER3.spawn.z);
  const reach = w.reachableRooms(spawnRoom);
  // 名單文件（grantsKey dossier）必須在可達區
  const dossierDoc = CHAPTER3.documents.find((d) => d.grantsKey === 'dossier');
  assert.ok(dossierDoc, '應有授予 dossier 的名單文件');
  assert.ok(reach.has(w.roomAt(dossierDoc.x, dossierDoc.z)), '風險名單必須在可達區');
  // 出口需 dossier
  const exit = CHAPTER3.doors.find((d) => d.lock === 'chapterExit');
  assert.ok(exit && exit.to === null && exit.from === 'wasteway');
  assert.equal(CHAPTER3.exitNeeds, 'dossier');
  // 全區連通
  const all = w.reachableRooms(spawnRoom, { ignoreLocks: true });
  for (const r of CHAPTER3.rooms) assert.ok(all.has(r.id), `房間 ${r.id} 與世界不連通`);
});

test('第三章：晨星清除小組(agent)＋KY變異體＋觸發器獨白', () => {
  const agents = CHAPTER3.entities.enemies.filter((e) => e.type === 'agent').length;
  assert.ok(agents >= 3, `應有多名黑衣人清除小組，實際 ${agents}`);
  assert.ok(CHAPTER3.entities.enemies.some((e) => e.type === 'mutant'), '應有 KY 變異體追進地下層');
  const withMono = CHAPTER3.triggers.filter((t) => t.monologue).length;
  assert.ok(withMono >= 3, `應有多個內心獨白觸發器，實際 ${withMono}`);
  // 伏筆結尾與待續
  assert.ok(CHAPTER3.endingText.includes('第四章') || CHAPTER3.endingText.includes('待續'));
  assert.equal(CHAPTER3.next, null);
});
