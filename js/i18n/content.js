// 內容（劇情/文件/對話/獨白/道具）翻譯彙整。中文原文留在 js/levels/* 與 items.js 當來源與後備，
// 這裡只放 en/de/ja。按範圍分檔（parts/），各檔 export { en, de, ja }，避免翻譯時互相衝突。
import { story } from './parts/story.js';
import { street } from './parts/street.js'; // 街道篇道具等共用內容
import { ch1 } from './parts/ch1.js';
import { ch2 } from './parts/ch2.js';
import { ch3 } from './parts/ch3.js';
import { ch4 } from './parts/ch4.js';
import { ch5 } from './parts/ch5.js';
import { ch6 } from './parts/ch6.js';
import { ch7 } from './parts/ch7.js';
import { ch8 } from './parts/ch8.js';
import { ch9 } from './parts/ch9.js';
import { ch10 } from './parts/ch10.js';
import { ch11 } from './parts/ch11.js';
import { ch12 } from './parts/ch12.js';
import { ch13 } from './parts/ch13.js';
import { ch14 } from './parts/ch14.js';
import { hospital } from './parts/hospital.js'; // 醫院篇道具等共用內容
import { ch15 } from './parts/ch15.js';
import { ch16 } from './parts/ch16.js';
import { ch17 } from './parts/ch17.js';
import { ch18 } from './parts/ch18.js';
import { ch19 } from './parts/ch19.js';
import { ch20 } from './parts/ch20.js';
import { ch21 } from './parts/ch21.js';
import { ch22 } from './parts/ch22.js';
import { ch23 } from './parts/ch23.js';
import { ch24 } from './parts/ch24.js';

// NPC 林欣儀在四章都用相同 id 'xinyi'，key 'npc.xinyi.*' 會跨章互相覆蓋——
// 合併時給每章的 npc.* key 加章節命名空間（npc.{chapterId}.*），main.js 查詢時亦帶 LEVEL.id。
const scoped = [
  ['', story],
  ['', street],
  ['chapter1', ch1],
  ['chapter2', ch2],
  ['chapter3', ch3],
  ['chapter4', ch4],
  ['chapter5', ch5],
  ['chapter6', ch6],
  ['chapter7', ch7],
  ['chapter8', ch8],
  ['chapter9', ch9],
  ['chapter10', ch10],
  ['chapter11', ch11],
  ['chapter12', ch12],
  ['chapter13', ch13],
  ['chapter14', ch14],
  ['', hospital],
  ['chapter15', ch15],
  ['chapter16', ch16],
  ['chapter17', ch17],
  ['chapter18', ch18],
  ['chapter19', ch19],
  ['chapter20', ch20],
  ['chapter21', ch21],
  ['chapter22', ch22],
  ['chapter23', ch23],
  ['chapter24', ch24],
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
