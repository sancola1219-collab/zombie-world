// i18n 引擎：語言狀態與翻譯查詢。純邏輯模組，不碰 DOM——語言記憶由 main 經 save.js 處理。
// 兩類文字：
//  1) UI 字串（介面）→ t(key, vars)：查 UI 字典，四語齊備，支援 {var} 插值
//  2) 內容字串（劇情/文件/對話）→ tx(key, 中文原文)：中文留在關卡資料檔當來源與後備，
//     其他語言查 CONTENT[lang][key]；缺翻譯自動退回中文，永不空白
//
// 術語表（專有名詞四語一律照此，勿自由發揮）：
//   殭屍世界=Zombie World/Zombie-Welt/ゾンビワールド
//   黑鴉市事件=The Blackcrow Incident/Der Blackcrow-Zwischenfall/ブラッククロウ事件
//   立愷X電=Li-Kai X-Electric  晨星工業=Morningstar Industries/Morningstar-Industrie/モーニングスター工業
//   周亮均=Zhou Liang-jun  林欣儀=Lin Xin-yi  白博士=Dr. Bai  柳營新廠=Liuying New Plant
//   KY=KY（保留）  聖時爆君=Sanctus the Warlord/Sanctus der Kriegsfürst/聖時爆君（サンクトゥス）
//   晨星清除小組=Morningstar cleanup crew  KY變異體=KY mutant
import { UI } from '../i18n/ui.js';
import { CONTENT } from '../i18n/content.js';

export const LANGS = ['zh', 'en', 'de', 'ja'];
export const LANG_NAMES = { zh: '中文', en: 'English', de: 'Deutsch', ja: '日本語' };

let cur = 'zh';

export function setLang(l) {
  if (LANGS.includes(l)) cur = l;
  return cur;
}
export function getLang() {
  return cur;
}

// UI 字串：UI[key] = { zh, en, de, ja }；vars 用 {name} 佔位
export function t(key, vars) {
  const e = UI[key];
  let s = e ? e[cur] ?? e.zh ?? key : key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

// 內容字串：zh 直接用資料檔原文；其他語言查 CONTENT，缺則退回中文
export function tx(key, zhFallback) {
  if (cur === 'zh') return zhFallback ?? '';
  const dict = CONTENT[cur];
  const v = dict && dict[key];
  return v == null || v === '' ? zhFallback ?? '' : v;
}
