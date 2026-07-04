import test from 'node:test';
import assert from 'node:assert/strict';
import { SaveStore } from '../js/engine/save.js';

function fakeStorage() {
  const m = new Map();
  return {
    setItem: (k, v) => m.set(k, String(v)),
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    removeItem: (k) => m.delete(k),
    _map: m,
  };
}

test('往返：存進去讀出來 deepEqual', () => {
  const s = new SaveStore(fakeStorage());
  assert.equal(s.persistent, true);
  const data = { chapter: 1, room: 'hall', flags: ['a', 'b'], hp: 87 };
  s.save('slot', data);
  assert.deepEqual(s.load('slot'), data);
});

test('probe 失敗：直接降級記憶體', () => {
  const broken = {
    setItem() { throw new Error('QuotaExceeded'); },
    getItem: () => null,
    removeItem() {},
  };
  const s = new SaveStore(broken);
  assert.equal(s.persistent, false);
  s.save('slot', { x: 1 });
  assert.deepEqual(s.load('slot'), { x: 1 });
});

test('建構後才失敗：自動降級且資料不遺失', () => {
  const flaky = {
    setItem(k) { if (k !== '__zw_probe') throw new Error('quota'); },
    getItem: () => null,
    removeItem() {},
  };
  const s = new SaveStore(flaky);
  assert.equal(s.persistent, true);
  s.save('slot', { x: 2 });
  assert.equal(s.persistent, false);
  assert.deepEqual(s.load('slot'), { x: 2 });
});

test('壞 JSON 回 null', () => {
  const st = fakeStorage();
  st.setItem('slot', '{壞掉的');
  const s = new SaveStore(st);
  assert.equal(s.load('slot'), null);
});

test('無 storage：純記憶體模式', () => {
  const s = new SaveStore(null);
  assert.equal(s.persistent, false);
  s.save('slot', [1, 2, 3]);
  assert.deepEqual(s.load('slot'), [1, 2, 3]);
  s.remove('slot');
  assert.equal(s.load('slot'), null);
});
