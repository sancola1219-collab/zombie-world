// i18n 覆蓋率檢查：比對關卡資料實際的 id 與 content 翻譯的 key，抓出對不上（會退回中文）的項目。
// 用法：node tests/i18n-coverage.mjs [--fix-hints]
import { CONTENT } from '../js/i18n/content.js';
import { ITEMS } from '../js/game/items.js';
import { STORY1 } from '../js/levels/story1.js';

const mods = {};
for (let n = 1; n <= 24; n++) {
  const m = await import(`../js/levels/chapter${n}.js`);
  mods[`chapter${n}`] = Object.values(m)[0];
}

function expectedKeys(id, ch) {
  const k = [];
  k.push(`${id}.name`, `${id}.objective`);
  if (ch.exitHint) k.push(`${id}.exitHint`);
  if (ch.endingText) k.push(`${id}.ending`);
  (ch.story || []).forEach((_, i) => k.push(`${id}.story.${i}`));
  for (const lk of Object.keys(ch.lockNames || {})) k.push(`${id}.lock.${lk}`);
  for (const d of ch.documents || []) k.push(`doc.${d.id}.title`, `doc.${d.id}.text`);
  for (const n of ch.npcs || []) {
    k.push(`npc.${id}.${n.id}.name`, `npc.${id}.${n.id}.after`);
    (n.dialog || []).forEach((_, i) => k.push(`npc.${id}.${n.id}.d${i}`));
  }
  for (const t of ch.triggers || []) {
    if (t.text) k.push(`trg.${t.id}.text`);
    if (t.monologue) k.push(`trg.${t.id}.mono`);
  }
  return k;
}

let missTotal = 0;
const report = [];
for (const [id, ch] of Object.entries(mods)) {
  const want = expectedKeys(id, ch);
  const miss = want.filter((k) => CONTENT.en[k] == null);
  if (miss.length) {
    missTotal += miss.length;
    report.push(`\n${id}（${ch.name}）缺 ${miss.length}/${want.length}：`);
    for (const m of miss.slice(0, 12)) report.push(`  - ${m}`);
    if (miss.length > 12) report.push(`  … 另 ${miss.length - 12} 條`);
  }
}
// 開場故事與道具
const extra = ['story1.title', ...STORY1.pages.map((_, i) => `story1.${i}`)];
for (const iid of Object.keys(ITEMS)) {
  extra.push(`item.${iid}.name`);
  if (ITEMS[iid].desc) extra.push(`item.${iid}.desc`);
}
const extraMiss = extra.filter((k) => CONTENT.en[k] == null);
if (extraMiss.length) {
  missTotal += extraMiss.length;
  report.push(`\n開場/道具缺 ${extraMiss.length}：`);
  for (const m of extraMiss.slice(0, 15)) report.push(`  - ${m}`);
}

// 三語一致性
const langMiss = [];
for (const k of Object.keys(CONTENT.en)) {
  for (const l of ['de', 'ja']) if (CONTENT[l][k] == null) langMiss.push(`${l}:${k}`);
}

if (report.length) console.log(report.join('\n'));
if (langMiss.length) console.log(`\n三語不一致 ${langMiss.length} 條，例：${langMiss.slice(0, 6).join(', ')}`);
console.log(`\n總計：缺 ${missTotal} 條英文 key；三語不一致 ${langMiss.length} 條。`);
process.exit(missTotal || langMiss.length ? 1 : 0);
