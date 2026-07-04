import test from 'node:test';
import assert from 'node:assert/strict';
import { World } from '../js/game/world.js';
import { SANDBOX } from '../js/levels/sandbox.js';

const EPS = 1e-9;

function hasSegment(segs, [x1, z1, x2, z2]) {
  return segs.some(
    (s) =>
      (near(s, [x1, z1, x2, z2])) || (near(s, [x2, z2, x1, z1]))
  );
}

function near(a, b) {
  return a.every((v, i) => Math.abs(v - b[i]) < EPS);
}

test('共牆被門洞切開：hall 東牆分成兩段', () => {
  const w = new World(SANDBOX);
  const segs = w.wallSegments('hall');
  assert.ok(hasSegment(segs, [8, 0, 8, 2.4]), 'hall 缺 [8,0,8,2.4]');
  assert.ok(hasSegment(segs, [8, 3.6, 8, 6]), 'hall 缺 [8,3.6,8,6]');
});

test('study 西牆同樣切開，北牆被鎖門切開', () => {
  const w = new World(SANDBOX);
  const segs = w.wallSegments('study');
  assert.ok(hasSegment(segs, [8, 0, 8, 2.4]));
  assert.ok(hasSegment(segs, [8, 3.6, 8, 6]));
  assert.ok(hasSegment(segs, [8, 0, 9.9, 0]), 'study 缺 [8,0,9.9,0]');
  assert.ok(hasSegment(segs, [11.1, 0, 13, 0]), 'study 缺 [11.1,0,13,0]');
});

test('關閉的門是碰撞牆，打開後不是', () => {
  const w = new World(SANDBOX);
  assert.ok(hasSegment(w.collisionSegments('hall'), [8, 2.4, 8, 3.6]));
  w.setDoorOpen('d-hall-study', true);
  assert.ok(!hasSegment(w.collisionSegments('hall'), [8, 2.4, 8, 3.6]));
  // 靜態牆不受影響
  assert.ok(hasSegment(w.collisionSegments('hall'), [8, 0, 8, 2.4]));
});

test('連通圖：未上鎖可達、上鎖阻斷、ignoreLocks 穿透', () => {
  const w = new World(SANDBOX);
  assert.deepEqual([...w.reachableRooms('hall')].sort(), ['hall', 'study']);
  w.doors.get('d-hall-study').lock = 'x';
  assert.deepEqual([...w.reachableRooms('hall')], ['hall']);
  assert.deepEqual([...w.reachableRooms('hall', { ignoreLocks: true })].sort(), ['hall', 'study']);
});

test('to:null 的裝飾鎖門不產生連通邊', () => {
  const w = new World(SANDBOX);
  w.doors.get('d-locked').lock = null; // 即使解鎖也不通往任何房間
  assert.deepEqual([...w.reachableRooms('study')].sort(), ['hall', 'study']);
});

test('roomAt 定位', () => {
  const w = new World(SANDBOX);
  assert.equal(w.roomAt(2, 3), 'hall');
  assert.equal(w.roomAt(12, 3), 'study');
  assert.equal(w.roomAt(-1, 0), null);
});
