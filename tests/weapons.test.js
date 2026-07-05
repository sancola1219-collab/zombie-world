import test from 'node:test';
import assert from 'node:assert/strict';
import { Arsenal, WEAPONS } from '../js/game/weapons.js';
import { Inventory } from '../js/game/items.js';

test('射速間隔：間隔內 fire 回 null', () => {
  const a = new Arsenal();
  a.give('handgun', 15);
  a.select('handgun');
  const shot = a.fire(0);
  assert.ok(shot && !shot.empty);
  assert.equal(a.fire(0.2), null); // 0.4s 間隔內
  assert.ok(a.fire(0.5));
});

test('彈耗與空膛', () => {
  const a = new Arsenal();
  a.give('handgun', 2);
  a.select('handgun');
  a.fire(0);
  a.fire(1);
  assert.equal(a.loadedRounds(), 0);
  const dry = a.fire(2);
  assert.equal(dry.empty, true);
});

test('裝填：從物品欄取彈補滿彈匣', () => {
  const a = new Arsenal();
  a.give('handgun', 3);
  a.select('handgun');
  const inv = new Inventory();
  inv.add('handgun_ammo', 20);
  const got = a.reload(inv);
  assert.equal(got, 12); // 15 - 3
  assert.equal(a.loadedRounds(), 15);
  assert.equal(inv.countOf('handgun_ammo'), 8);
  assert.equal(a.reload(inv), 0); // 已滿
});

test('裝填：彈藥不足取到多少算多少', () => {
  const a = new Arsenal();
  a.give('shotgun', 0);
  a.select('shotgun');
  const inv = new Inventory();
  inv.add('shotgun_shells', 3);
  assert.equal(a.reload(inv), 3);
  assert.equal(a.loadedRounds(), 3);
});

test('霰彈槍一發 8 顆彈丸、消耗 1 發', () => {
  const a = new Arsenal();
  a.give('shotgun', 7);
  a.select('shotgun');
  const shot = a.fire(0);
  assert.equal(shot.pellets, 8);
  assert.equal(a.loadedRounds(), 6);
});

test('小刀無限、melee 描述', () => {
  const a = new Arsenal();
  const swing = a.fire(0);
  assert.equal(swing.melee, true);
  assert.equal(a.loadedRounds(), Infinity);
});

test('give 補彈不超過彈匣、select 未持有失敗', () => {
  const a = new Arsenal();
  a.give('handgun', 99);
  assert.equal(a.loaded.handgun, WEAPONS.handgun.magazine);
  assert.equal(a.select('magnum'), false);
  assert.equal(a.current, 'knife');
});

test('JSON 往返', () => {
  const a = new Arsenal();
  a.give('handgun', 10);
  a.give('shotgun', 4);
  a.select('shotgun');
  a.fire(0);
  const copy = Arsenal.fromJSON(a.toJSON());
  assert.deepEqual(copy.toJSON(), a.toJSON());
});
