// 街道篇（第五～十四章）結構驗證：每章跑同一組不變式。
// 新章節寫完後跑 `node --test tests/street.test.js` 必須全綠。
import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { ITEMS } from '../js/game/items.js';
import { HAZARD_DEFAULTS } from '../js/game/hazards.js';
import { CHAPTER5 } from '../js/levels/chapter5.js';
import { CHAPTER6 } from '../js/levels/chapter6.js';
import { CHAPTER7 } from '../js/levels/chapter7.js';
import { CHAPTER8 } from '../js/levels/chapter8.js';
import { CHAPTER9 } from '../js/levels/chapter9.js';
import { CHAPTER10 } from '../js/levels/chapter10.js';
import { CHAPTER11 } from '../js/levels/chapter11.js';
import { CHAPTER12 } from '../js/levels/chapter12.js';
import { CHAPTER13 } from '../js/levels/chapter13.js';
import { CHAPTER14 } from '../js/levels/chapter14.js';

const ENEMY_KINDS = new Set([
  'zombie', 'dog', 'hunter', 'lurker', 'spider', 'creeper', 'bloater',
  'agent', 'mutant', 'prime', 'warlord', 'keeper', 'ironmask', 'howler', 'dogking',
]);

const STREET = [
  [CHAPTER5, 'chapter5', 'chapter6', 'boltcutter'],
  [CHAPTER6, 'chapter6', 'chapter7', 'shutterkey'],
  [CHAPTER7, 'chapter7', 'chapter8', 'gatekey'],
  [CHAPTER8, 'chapter8', 'chapter9', 'sluicekey'],
  [CHAPTER9, 'chapter9', 'chapter10', 'copkey'],
  [CHAPTER10, 'chapter10', 'chapter11', 'medkey'],
  [CHAPTER11, 'chapter11', 'chapter12', 'genlever'],
  [CHAPTER12, 'chapter12', 'chapter13', 'linemap'],
  [CHAPTER13, 'chapter13', 'chapter14', 'tollkey'],
  [CHAPTER14, 'chapter14', null, null], // 終章用 exitCode 密碼盤
];

// 房間兩兩不得重疊（重疊會造成雙重牆與 roomAt 歧義）
function assertNoOverlap(ch) {
  const rs = ch.rooms;
  for (let i = 0; i < rs.length; i++) {
    for (let j = i + 1; j < rs.length; j++) {
      const a = rs[i], b = rs[j];
      const sep = a.x + a.w <= b.x || b.x + b.w <= a.x || a.z + a.d <= b.z || b.z + b.d <= a.z;
      assert.ok(sep, `${ch.id}: 房間 ${a.id} 與 ${b.id} 重疊`);
    }
  }
}

for (const [ch, id, next, needKey] of STREET) {
  test(`${id}：識別/串接/門與實體位置/推進鏈全部合法`, () => {
    assert.equal(ch.id, id);
    assert.equal(ch.next, next);
    const w = new World(ch);
    const roomIds = new Set(ch.rooms.map((r) => r.id));
    assertNoOverlap(ch);
    for (const d of ch.doors) {
      assert.ok(roomIds.has(d.from), `${d.id} from 不存在`);
      if (d.to !== null) assert.ok(roomIds.has(d.to), `${d.id} to 不存在`);
    }
    // 所有實體/文件/NPC/打字機/危險區都要在房間內
    const all = [
      ...ch.entities.pickups,
      ...ch.entities.enemies,
      ...ch.entities.typewriters,
      ...(ch.documents || []),
      ...(ch.npcs || []),
      ...(ch.hazards || []),
    ];
    for (const e of all) {
      assert.ok(w.roomAt(e.x, e.z) !== null, `${e.id ?? e.type} (${e.x},${e.z}) 不在房間內`);
    }
    // 出生點在房間內
    assert.ok(w.roomAt(ch.spawn.x, ch.spawn.z) !== null, '出生點不在房間內');
    // 道具與敵種都要有定義
    for (const p of ch.entities.pickups) assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
    for (const e of ch.entities.enemies) assert.ok(ENEMY_KINDS.has(e.type), `未定義敵種 ${e.type}`);
    for (const h of ch.hazards || []) assert.ok(HAZARD_DEFAULTS[h.type], `未定義危險區 ${h.type}`);

    // 出口門：from 存在、to 為 null、lock 為 chapterExit
    const exit = ch.doors.find((d) => d.lock === 'chapterExit');
    assert.ok(exit && exit.to === null, '應有 chapterExit 出口門');

    // 推進鏈：鑰匙型（needKey）→ 鑰匙可達；密碼型（exitCode）→ 免鑰匙
    const spawnRoom = w.roomAt(ch.spawn.x, ch.spawn.z);
    const reach = w.reachableRooms(spawnRoom);
    if (needKey) {
      assert.equal(ch.exitNeeds, needKey);
      assert.ok(ITEMS[needKey], `鑰匙道具 ${needKey} 未定義`);
      const viaPickup = ch.entities.pickups.find((p) => p.item === needKey);
      const viaDoc = (ch.documents || []).find((d) => d.grantsKey === needKey);
      assert.ok(viaPickup || viaDoc, `鑰匙 ${needKey} 必須可由拾取或文件取得`);
      const src = viaPickup || viaDoc;
      assert.ok(reach.has(w.roomAt(src.x, src.z)), `鑰匙 ${needKey} 必須在可達區`);
    } else {
      assert.ok(/^\d{4}$/.test(ch.exitCode || ''), '終章應為四位數 exitCode');
    }
    // 全區連通（忽略鎖）
    const allReach = w.reachableRooms(spawnRoom, { ignoreLocks: true });
    for (const r of ch.rooms) assert.ok(allReach.has(r.id), `房間 ${r.id} 與世界不連通`);

    // 氛圍鐵則：老照片文件（街道篇每章一張）＋內心獨白 ≥3＋故事 3 頁＋結尾文字
    assert.ok((ch.documents || []).length >= 3, '每章至少 3 份文件');
    const monoCount = (ch.triggers || []).filter((t) => t.monologue).length;
    assert.ok(monoCount >= 3, `內心獨白觸發器應 ≥3，實際 ${monoCount}`);
    assert.ok(Array.isArray(ch.story) && ch.story.length >= 3, '開場故事應 ≥3 頁');
    assert.ok(ch.endingText && ch.endingText.length > 30, '應有結尾文字');
    assert.ok(ch.objective, '應有目標');
    assert.ok((ch.npcs || []).length >= 1, '每章至少 1 位 NPC');
    // 出生房不得有敵人緊貼出生點（開場即死保護）
    for (const e of ch.entities.enemies) {
      const dd = Math.hypot(e.x - ch.spawn.x, e.z - ch.spawn.z);
      assert.ok(dd > 2.5, `敵人 ${e.id} 距出生點僅 ${dd.toFixed(1)}——太近`);
    }
  });
}

test('街道篇串接：chapter4 → chapter5、章名皆有「第N章」', async () => {
  const { CHAPTER4 } = await import('../js/levels/chapter4.js');
  assert.equal(CHAPTER4.next, 'chapter5');
  for (const [ch] of STREET) assert.match(ch.name, /^第.+章：/);
  // 終章伏筆
  assert.ok(CHAPTER14.endingText.includes('待續'));
});
