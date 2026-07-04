// 進入點：組裝引擎與遊戲，沙盒關卡。
import { GameLoop } from './engine/loop.js';
import { Renderer } from './engine/renderer.js';
import { Input } from './engine/input.js';
import { AudioEngine } from './engine/audio.js';
import { SaveStore } from './engine/save.js';
import { World } from './game/world.js';
import { Player } from './game/player.js';
import { SANDBOX } from './levels/sandbox.js';

const $ = (id) => document.getElementById(id);

function boot() {
  const container = $('app');

  let renderer;
  try {
    renderer = new Renderer(container);
  } catch {
    $('loading').style.display = 'none';
    $('error').style.display = 'flex';
    return;
  }

  const world = new World(SANDBOX);
  const player = new Player(SANDBOX.spawn);
  const input = new Input();
  const audio = new AudioEngine();
  let saves;
  try {
    saves = new SaveStore(window.localStorage);
  } catch {
    saves = new SaveStore(null);
  }

  renderer.buildLevel(world);
  const canvas = renderer.renderer.domElement;
  input.attach(canvas);
  canvas.addEventListener('click', () => audio.unlock());

  let paused = false;
  let stepDistance = 0;
  let activeRoom = null;
  let lastHint = null;

  function hint(text) {
    if (text === lastHint) return;
    lastHint = text;
    $('hint').textContent = text;
  }

  function setPaused(p) {
    paused = p;
    $('pause').style.display = p ? 'flex' : 'none';
  }

  $('resume').addEventListener('click', () => {
    setPaused(false);
    audio.unlock();
    if (!input.dragMode && canvas.requestPointerLock) canvas.requestPointerLock();
  });

  // 按 Esc 離開 PointerLock 時瀏覽器不會給頁面 keydown——用失鎖事件觸發暫停
  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement !== canvas && !input.dragMode && !paused) {
      setPaused(true);
    }
  });

  function updateActiveRooms() {
    const roomId = world.roomAt(player.x, player.z) ?? activeRoom;
    if (roomId === null || roomId === activeRoom) return;
    activeRoom = roomId;
    const visible = [roomId];
    for (const d of world.doorsOfRoom(roomId)) {
      const other = d.from === roomId ? d.to : d.from;
      if (other) visible.push(other);
    }
    renderer.setActiveRooms(visible);
  }

  function nearestDoor() {
    const roomId = world.roomAt(player.x, player.z);
    if (!roomId) return null;
    let best = null;
    let bestDist = 1.6;
    for (const d of world.doorsOfRoom(roomId)) {
      const dist = Math.hypot(d.at[0] - player.x, d.at[1] - player.z);
      if (dist < bestDist) {
        best = d;
        bestDist = dist;
      }
    }
    return best;
  }

  function update(dt) {
    if (paused) {
      input.actions(); // 暫停時仍消化輸入緩衝，避免恢復瞬間視角暴衝
      return;
    }
    const actions = input.actions();
    if (input.consumePressed('Escape')) {
      setPaused(true);
      return;
    }

    player.look(actions.look[0], actions.look[1]);
    const beforeX = player.x;
    const beforeZ = player.z;
    player.update(dt, actions, world);

    stepDistance += Math.hypot(player.x - beforeX, player.z - beforeZ);
    if (stepDistance > (actions.run ? 1.05 : 0.8)) {
      stepDistance = 0;
      audio.play('step');
    }

    const door = nearestDoor();
    if (door) {
      if (door.lock) {
        hint(`上鎖了——需要「${world.lockNames[door.lock] ?? door.lock}」`);
        if (actions.interact) audio.play('locked');
      } else {
        hint(door.open ? '按 E 關門' : '按 E 開門');
        if (actions.interact) {
          world.setDoorOpen(door.id, !door.open);
          renderer.setDoorOpen(door.id, door.open);
          audio.play('door');
        }
      }
    } else {
      hint('');
    }

    updateActiveRooms();
  }

  function render() {
    renderer.updateCamera(player);
    renderer.render();
  }

  const loop = new GameLoop({ update, render });

  // 尺寸：容器初始可能為 0（既有課題），ResizeObserver 持續跟隨
  const ro = new ResizeObserver(() => {
    renderer.resize(container.clientWidth, container.clientHeight);
  });
  ro.observe(container);
  renderer.resize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);

  updateActiveRooms();
  loop.start();
  $('loading').style.display = 'none';

  // 供自動驗證與除錯（發佈版也留著，無安全疑慮）
  window.__zw = { world, player, input, loop, renderer, saves, version: 'phase1' };
}

boot();
