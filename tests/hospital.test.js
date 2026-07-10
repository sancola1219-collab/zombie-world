// 醫院篇（第十五～二十四章）結構驗證＋新魔王 AI 不變式。
import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { ITEMS } from '../js/game/items.js';
import { HAZARD_DEFAULTS } from '../js/game/hazards.js';
import { Stitcher } from '../js/game/enemies/stitcher.js';
import { Drbai } from '../js/game/enemies/drbai.js';
import { CHAPTER15 } from '../js/levels/chapter15.js';
import { CHAPTER16 } from '../js/levels/chapter16.js';
import { CHAPTER17 } from '../js/levels/chapter17.js';
import { CHAPTER18 } from '../js/levels/chapter18.js';
import { CHAPTER19 } from '../js/levels/chapter19.js';
import { CHAPTER20 } from '../js/levels/chapter20.js';
import { CHAPTER21 } from '../js/levels/chapter21.js';
import { CHAPTER22 } from '../js/levels/chapter22.js';
import { CHAPTER23 } from '../js/levels/chapter23.js';
import { CHAPTER24 } from '../js/levels/chapter24.js';

const ENEMY_KINDS = new Set([
  'zombie', 'dog', 'hunter', 'lurker', 'spider', 'creeper', 'bloater',
  'agent', 'mutant', 'prime', 'warlord', 'keeper', 'ironmask', 'howler', 'dogking',
  'stitcher', 'drbai',
]);

const HOSPITAL = [
  [CHAPTER15, 'chapter15', 'chapter16', 'erkey'],
  [CHAPTER16, 'chapter16', 'chapter17', 'wardcard'],
  [CHAPTER17, 'chapter17', 'chapter18', 'playkey'],
  [CHAPTER18, 'chapter18', 'chapter19', 'labpass'],
  [CHAPTER19, 'chapter19', 'chapter20', 'morguekey'],
  [CHAPTER20, 'chapter20', 'chapter21', 'dirkey'],
  [CHAPTER21, 'chapter21', 'chapter22', 'surgkey'],
  [CHAPTER22, 'chapter22', 'chapter23', 'isokey'],
  [CHAPTER23, 'chapter23', 'chapter24', 'sdata'],
  [CHAPTER24, 'chapter24', null, 'inhibitor'],
];

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

for (const [ch, id, next, needKey] of HOSPITAL) {
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
    assert.ok(w.roomAt(ch.spawn.x, ch.spawn.z) !== null, '出生點不在房間內');
    for (const p of ch.entities.pickups) assert.ok(ITEMS[p.item], `未定義道具 ${p.item}`);
    for (const e of ch.entities.enemies) assert.ok(ENEMY_KINDS.has(e.type), `未定義敵種 ${e.type}`);
    for (const h of ch.hazards || []) assert.ok(HAZARD_DEFAULTS[h.type], `未定義危險區 ${h.type}`);

    const exit = ch.doors.find((d) => d.lock === 'chapterExit');
    assert.ok(exit && exit.to === null, '應有 chapterExit 出口門');

    assert.equal(ch.exitNeeds, needKey);
    assert.ok(ITEMS[needKey], `鑰匙道具 ${needKey} 未定義`);
    const spawnRoom = w.roomAt(ch.spawn.x, ch.spawn.z);
    const reach = w.reachableRooms(spawnRoom);
    const viaPickup = ch.entities.pickups.find((p) => p.item === needKey);
    const viaDoc = (ch.documents || []).find((d) => d.grantsKey === needKey);
    assert.ok(viaPickup || viaDoc, `鑰匙 ${needKey} 必須可由拾取或文件取得`);
    const src = viaPickup || viaDoc;
    assert.ok(reach.has(w.roomAt(src.x, src.z)), `鑰匙 ${needKey} 必須在可達區`);

    const allReach = w.reachableRooms(spawnRoom, { ignoreLocks: true });
    for (const r of ch.rooms) assert.ok(allReach.has(r.id), `房間 ${r.id} 與世界不連通`);

    assert.ok((ch.documents || []).length >= 3, '每章至少 3 份文件');
    const monoCount = (ch.triggers || []).filter((t) => t.monologue).length;
    assert.ok(monoCount >= 3, `內心獨白觸發器應 ≥3，實際 ${monoCount}`);
    assert.ok(Array.isArray(ch.story) && ch.story.length >= 3, '開場故事應 ≥3 頁');
    assert.ok(ch.endingText && ch.endingText.length > 30, '應有結尾文字');
    assert.ok(ch.objective, '應有目標');
    assert.ok((ch.npcs || []).length >= 1, '每章至少 1 位 NPC');
    for (const e of ch.entities.enemies) {
      const dd = Math.hypot(e.x - ch.spawn.x, e.z - ch.spawn.z);
      assert.ok(dd > 2.5, `敵人 ${e.id} 距出生點僅 ${dd.toFixed(1)}——太近`);
    }
  });
}

test('醫院篇串接：chapter14 → chapter15、終章魔王與伏筆', async () => {
  const { CHAPTER14 } = await import('../js/levels/chapter14.js');
  assert.equal(CHAPTER14.next, 'chapter15');
  assert.ok(CHAPTER24.entities.enemies.some((e) => e.type === 'drbai'), '終章應有藍囊教父');
  assert.ok(CHAPTER21.entities.enemies.some((e) => e.type === 'stitcher'), 'ch21 應有縫合醫師');
  assert.ok(CHAPTER24.endingText.includes('待續'));
});

test('縫合醫師：拉開距離會自我縫合回血、貼身/硬直打斷', () => {
  const s = new Stitcher({ id: 's', x: 0, z: 0 });
  s.alert();
  const ctx = {
    player: { x: 8, z: 0 }, // 遠距
    world: { roomAt: () => 'r', collisionSegments: () => [], doorsOfRoom: () => [] },
    attackPlayer() {}, sound() {},
  };
  s.hp = 300; s._sutureCd = 0; s.setState('chase');
  s.update(1 / 60, ctx);
  assert.equal(s.state, 'suture', '受傷+遠距應進入縫合');
  const hp0 = s.hp;
  for (let i = 0; i < 60; i++) s.update(1 / 60, ctx); // 縫 1 秒
  assert.ok(s.hp > hp0 + 20, '縫合應回血');
  s.hurt(80, 'body'); // 打斷
  assert.equal(s.state, 'stagger');
});

test('藍囊教父：三階段破囊狂暴、藍囊(head)高倍率、可擊殺', () => {
  const b = new Drbai({ id: 'b', x: 0, z: 0 });
  assert.equal(b.phase, 1);
  const s0 = b.speed;
  b.hp = 1001; b.hurt(50, 'body');
  assert.equal(b.phase, 2, '破第一囊應進二階');
  assert.ok(b.speed > s0);
  b.hp = 501; b.hurt(50, 'body');
  assert.equal(b.phase, 3);
  // 藍囊要害倍率
  const b2 = new Drbai({ id: 'b2', x: 0, z: 0 });
  const before = b2.hp;
  b2.hurt(100, 'head');
  assert.equal(before - b2.hp, 260, '藍囊應吃 2.6 倍傷');
  // 可擊殺
  b.hurt(9999, 'head');
  assert.equal(b.dead, true);
});
