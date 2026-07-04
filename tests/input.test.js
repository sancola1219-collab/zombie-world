import test from 'node:test';
import assert from 'node:assert/strict';
import { Input } from '../js/engine/input.js';

test('WASD 映射與抵銷', () => {
  const input = new Input();
  input.onKeyDown('KeyW');
  assert.equal(input.actions().moveZ, -1);
  input.onKeyDown('KeyS');
  assert.equal(input.actions().moveZ, 0); // W+S 抵銷
  input.onKeyUp('KeyW');
  assert.equal(input.actions().moveZ, 1);
  input.onKeyDown('KeyD');
  assert.equal(input.actions().moveX, 1);
});

test('E 互動為邊緣觸發，消費一次後清除', () => {
  const input = new Input();
  input.onKeyDown('KeyE');
  assert.equal(input.actions().interact, true);
  assert.equal(input.actions().interact, false); // 第二次讀取不再觸發
});

test('repeat 按鍵不會重新觸發邊緣', () => {
  const input = new Input();
  input.onKeyDown('KeyE');
  input.actions(); // 消費
  input.onKeyDown('KeyE', true); // 系統長按重複
  assert.equal(input.actions().interact, false);
});

test('滑鼠視角累積並在讀取後歸零', () => {
  const input = new Input();
  input.onMouseMove(10, -5);
  input.onMouseMove(2, 1);
  assert.deepEqual(input.actions().look, [12, -4]);
  assert.deepEqual(input.actions().look, [0, 0]);
});

test('Shift 奔跑', () => {
  const input = new Input();
  assert.equal(input.actions().run, false);
  input.onKeyDown('ShiftLeft');
  assert.equal(input.actions().run, true);
});
