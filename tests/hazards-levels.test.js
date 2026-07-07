import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { HAZARD_DEFAULTS } from '../js/game/hazards.js';
import { CHAPTER1 } from '../js/levels/chapter1.js';
import { CHAPTER2 } from '../js/levels/chapter2.js';
import { CHAPTER3 } from '../js/levels/chapter3.js';
import { CHAPTER4 } from '../js/levels/chapter4.js';

const CHAPTERS = [CHAPTER1, CHAPTER2, CHAPTER3, CHAPTER4];

test('各章危險區：類型已定義、座標落在指定房間內', () => {
  for (const lv of CHAPTERS) {
    for (const h of lv.hazards || []) {
      assert.ok(HAZARD_DEFAULTS[h.type], `${lv.id} 危險區類型 ${h.type} 未定義`);
      const w = new World(lv);
      assert.equal(
        w.roomAt(h.x, h.z), h.room,
        `${lv.id} 危險區 (${h.x},${h.z}) 應在 ${h.room} 內`
      );
    }
  }
});

test('各章危險區：不壓在出生點與門口（保留安全動線）', () => {
  for (const lv of CHAPTERS) {
    for (const h of lv.hazards || []) {
      const r = h.r ?? HAZARD_DEFAULTS[h.type].r;
      const ds = Math.hypot(lv.spawn.x - h.x, lv.spawn.z - h.z);
      assert.ok(ds > r + 0.6, `${lv.id} 危險區 (${h.x},${h.z}) 離出生點太近`);
      for (const d of lv.doors) {
        const dd = Math.hypot(d.at[0] - h.x, d.at[1] - h.z);
        assert.ok(dd > r + 0.5, `${lv.id} 危險區 (${h.x},${h.z}) 壓住門 ${d.id}`);
      }
    }
  }
});

test('各章新道具（corpse/cardboard/debris）都落在指定房間內', () => {
  for (const lv of CHAPTERS) {
    const w = new World(lv);
    for (const p of lv.props || []) {
      if (!['corpse', 'cardboard', 'debris'].includes(p.type)) continue;
      assert.equal(w.roomAt(p.x, p.z), p.room, `${lv.id} 道具 ${p.type} (${p.x},${p.z}) 應在 ${p.room}`);
    }
  }
});
