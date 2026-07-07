// 地面危險區：純邏輯模組（不碰 three/DOM，node 可測）。
// 關卡資料格式 hazards: [{room, type, x, z, r?, dmg?}]
//   type 'fire'＝火焰（燒傷）、'slime'＝KY 黏液（感染中毒）、'shock'＝帶電積水（電擊麻痺）
// 玩家跳躍騰空（y > AIR_SAFE）時不受地面危險影響——跳過火焰是活路。
export const AIR_SAFE = 0.22;

export const HAZARD_DEFAULTS = {
  fire: { r: 0.85, dmg: 9, label: '著火了——快離開火焰！' },
  slime: { r: 0.8, dmg: 0, poison: 5, label: '踩到 KY 黏液——感染了！' },
  shock: { r: 0.8, dmg: 6, stun: 1.0, label: '觸電——肌肉麻痺了！' },
};

// 回傳玩家目前踩到的危險區（含預設值展開），沒踩到回 null
export function hazardAt(hazards, x, z, y = 0) {
  if (y > AIR_SAFE) return null;
  for (const h of hazards || []) {
    const def = HAZARD_DEFAULTS[h.type];
    if (!def) continue;
    const r = h.r ?? def.r;
    if (Math.hypot(h.x - x, h.z - z) <= r) {
      return {
        type: h.type,
        dmg: h.dmg ?? def.dmg,
        poison: h.poison ?? def.poison ?? 0,
        stun: h.stun ?? def.stun ?? 0,
        label: def.label,
      };
    }
  }
  return null;
}
