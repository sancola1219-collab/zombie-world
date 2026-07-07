import test from 'node:test';
import assert from 'node:assert/strict';
import { hazardAt, AIR_SAFE } from '../js/game/hazards.js';

const HZ = [
  { room: 'r', type: 'fire', x: 5, z: 5 },
  { room: 'r', type: 'slime', x: 10, z: 5, r: 1.2 },
  { room: 'r', type: 'shock', x: 15, z: 5 },
];

test('hazardAt：踩進火焰半徑內回傳火焰（含預設傷害）', () => {
  const h = hazardAt(HZ, 5.3, 5.2, 0);
  assert.ok(h);
  assert.equal(h.type, 'fire');
  assert.ok(h.dmg > 0);
});

test('hazardAt：半徑外回傳 null；自訂半徑生效', () => {
  assert.equal(hazardAt(HZ, 6.5, 5, 0), null); // fire 預設 r=0.85
  assert.ok(hazardAt(HZ, 11.1, 5, 0)); // slime 自訂 r=1.2
  assert.equal(hazardAt(HZ, 11.3, 5, 0), null);
});

test('hazardAt：跳躍騰空中（y > AIR_SAFE）不受地面危險影響', () => {
  assert.ok(hazardAt(HZ, 5, 5, AIR_SAFE - 0.01));
  assert.equal(hazardAt(HZ, 5, 5, AIR_SAFE + 0.01), null);
});

test('hazardAt：slime 給中毒、shock 給麻痺', () => {
  const slime = hazardAt(HZ, 10, 5, 0);
  assert.ok(slime.poison > 0);
  assert.equal(slime.dmg, 0);
  const shock = hazardAt(HZ, 15, 5, 0);
  assert.ok(shock.stun > 0);
  assert.ok(shock.dmg > 0);
});

test('hazardAt：未知類型忽略、空清單安全', () => {
  assert.equal(hazardAt([{ type: 'lava', x: 0, z: 0 }], 0, 0, 0), null);
  assert.equal(hazardAt(undefined, 0, 0, 0), null);
});
