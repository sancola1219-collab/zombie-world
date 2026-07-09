// 內容（劇情/文件/對話/獨白/道具）翻譯彙整。中文原文留在 js/levels/* 與 items.js 當來源與後備，
// 這裡只放 en/de/ja。按範圍分檔（parts/），各檔 export { en, de, ja }，避免翻譯時互相衝突。
import { story } from './parts/story.js';
import { ch1 } from './parts/ch1.js';
import { ch2 } from './parts/ch2.js';
import { ch3 } from './parts/ch3.js';
import { ch4 } from './parts/ch4.js';

// NPC 林欣儀在四章都用相同 id 'xinyi'，key 'npc.xinyi.*' 會跨章互相覆蓋——
// 合併時給每章的 npc.* key 加章節命名空間（npc.{chapterId}.*），main.js 查詢時亦帶 LEVEL.id。
const scoped = [
  ['', story],
  ['chapter1', ch1],
  ['chapter2', ch2],
  ['chapter3', ch3],
  ['chapter4', ch4],
];
function merge(lang) {
  const o = {};
  for (const [chId, p] of scoped) {
    const dict = p[lang] || {};
    for (const k in dict) {
      const key = chId && k.startsWith('npc.') ? 'npc.' + chId + '.' + k.slice(4) : k;
      o[key] = dict[k];
    }
  }
  return o;
}

export const CONTENT = { en: merge('en'), de: merge('de'), ja: merge('ja') };
