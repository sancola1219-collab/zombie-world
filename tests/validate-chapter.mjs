// 單章驗證器（給並行撰寫章節的 agent 自我驗證；正式驗證仍以 tests/street.test.js 為準）
// 用法：node tests/validate-chapter.mjs <章節檔路徑> <id> <next|null> <exitNeeds鑰匙|code>
// 例：  node tests/validate-chapter.mjs js/levels/chapter6.js chapter6 chapter7 shutterkey
import { World } from '../js/game/world.js';
import { ITEMS } from '../js/game/items.js';
import { HAZARD_DEFAULTS } from '../js/game/hazards.js';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const [, , file, id, next, key] = process.argv;
const mod = await import(pathToFileURL(resolve(file)).href);
const ch = Object.values(mod)[0];
const errs = [];
const ok = (cond, msg) => { if (!cond) errs.push(msg); };

ok(ch.id === id, `id 應為 ${id}，實際 ${ch.id}`);
ok(String(ch.next) === next, `next 應為 ${next}，實際 ${ch.next}`);
const w = new World(ch);
const roomIds = new Set(ch.rooms.map((r) => r.id));
for (let i = 0; i < ch.rooms.length; i++) {
  for (let j = i + 1; j < ch.rooms.length; j++) {
    const a = ch.rooms[i], b = ch.rooms[j];
    const sep = a.x + a.w <= b.x || b.x + b.w <= a.x || a.z + a.d <= b.z || b.z + b.d <= a.z;
    ok(sep, `房間 ${a.id} 與 ${b.id} 重疊`);
  }
}
for (const d of ch.doors) {
  ok(roomIds.has(d.from), `${d.id} from 不存在`);
  if (d.to !== null) ok(roomIds.has(d.to), `${d.id} to 不存在`);
}
const all = [
  ...ch.entities.pickups, ...ch.entities.enemies, ...ch.entities.typewriters,
  ...(ch.documents || []), ...(ch.npcs || []), ...(ch.hazards || []),
];
for (const e of all) ok(w.roomAt(e.x, e.z) !== null, `${e.id ?? e.type} (${e.x},${e.z}) 不在房間內`);
ok(w.roomAt(ch.spawn.x, ch.spawn.z) !== null, '出生點不在房間內');
for (const p of ch.entities.pickups) ok(!!ITEMS[p.item], `未定義道具 ${p.item}`);
for (const h of ch.hazards || []) ok(!!HAZARD_DEFAULTS[h.type], `未定義危險區 ${h.type}`);
const exit = ch.doors.find((d) => d.lock === 'chapterExit');
ok(exit && exit.to === null, '應有 to:null 的 chapterExit 出口門');
const spawnRoom = w.roomAt(ch.spawn.x, ch.spawn.z);
const reach = w.reachableRooms(spawnRoom);
if (key !== 'code') {
  ok(ch.exitNeeds === key, `exitNeeds 應為 ${key}`);
  const src = ch.entities.pickups.find((p) => p.item === key) || (ch.documents || []).find((d) => d.grantsKey === key);
  ok(!!src, `鑰匙 ${key} 必須可由拾取或文件取得`);
  if (src) ok(reach.has(w.roomAt(src.x, src.z)), `鑰匙 ${key} 必須在可達區`);
} else {
  ok(/^\d{4}$/.test(ch.exitCode || ''), '應有四位數 exitCode');
}
const allReach = w.reachableRooms(spawnRoom, { ignoreLocks: true });
for (const r of ch.rooms) ok(allReach.has(r.id), `房間 ${r.id} 不連通`);
ok((ch.documents || []).length >= 3, '文件應 ≥3');
ok((ch.triggers || []).filter((t) => t.monologue).length >= 3, '獨白應 ≥3');
ok(Array.isArray(ch.story) && ch.story.length >= 3, '故事應 ≥3 頁');
ok(!!ch.endingText && ch.endingText.length > 30, '應有結尾文字');
ok((ch.npcs || []).length >= 1, 'NPC 應 ≥1');
for (const e of ch.entities.enemies) {
  const dd = Math.hypot(e.x - ch.spawn.x, e.z - ch.spawn.z);
  ok(dd > 2.5, `敵人 ${e.id} 距出生點 ${dd.toFixed(1)} 太近`);
}

if (errs.length) {
  console.error(`✖ ${file} 驗證失敗：`);
  for (const e of errs) console.error('  -', e);
  process.exit(1);
}
console.log(`✔ ${file} 全部通過`);
