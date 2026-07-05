// 進入點：組裝引擎與遊戲。階段二：戰鬥示範場。
import { GameLoop } from './engine/loop.js';
import { Renderer } from './engine/renderer.js';
import { Input } from './engine/input.js';
import { AudioEngine } from './engine/audio.js';
import { SaveStore } from './engine/save.js';
import { loadExternalModels } from './engine/models.js';
import { mulberry32 } from './engine/rng.js';
import { World } from './game/world.js';
import { Player } from './game/player.js';
import { Inventory, ITEMS } from './game/items.js';
import { Arsenal, WEAPONS } from './game/weapons.js';
import { Projectiles } from './game/projectiles.js';
import { castShot, jitterDir } from './game/combat.js';
import { Zombie } from './game/enemies/zombie.js';
import { Dog } from './game/enemies/dog.js';
import { separateEnemies } from './game/enemies/base.js';
import { buildSave, applySave } from './game/gamestate.js';
import { ARENA } from './levels/arena.js';
import { HUD } from './ui/hud.js';
import { Overlays } from './ui/overlays.js';

const $ = (id) => document.getElementById(id);
const SAVE_KEY = 'zombie-world-save';
const WEAPON_SLOTS = ['knife', 'katana', 'handgun', 'shotgun', 'magnum', 'smg', 'flamethrower', 'rocket'];
const DIFFICULTY = {
  easy: { name: '輕鬆', dmg: 0.6, hp: 0.8, ammo: 1.5 },
  standard: { name: '標準', dmg: 1.0, hp: 1.0, ammo: 1.0 },
  hard: { name: '艱難', dmg: 1.4, hp: 1.2, ammo: 0.7 },
};
const LEVEL = ARENA;

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

  const world = new World(LEVEL);
  const player = new Player(LEVEL.spawn);
  const input = new Input();
  const audio = new AudioEngine();
  const hud = new HUD();
  const overlays = new Overlays();
  let saves;
  try {
    saves = new SaveStore(window.localStorage);
  } catch {
    saves = new SaveStore(null);
  }

  let inventory = new Inventory();
  let arsenal = new Arsenal();
  for (const w of LEVEL.start.weapons) arsenal.give(w.id, w.rounds);
  if (LEVEL.start.weapons.length) arsenal.select(LEVEL.start.weapons[0].id);

  // === 實體 ===
  const pickups = new Map(); // id → {item, count, x, z}
  let takenPickups = new Set();
  const enemies = LEVEL.entities.enemies.map((d) =>
    d.type === 'dog' ? new Dog({ id: d.id, x: d.x, z: d.z }) : new Zombie({ id: d.id, x: d.x, z: d.z })
  );
  const applyDifficultyHp = () => {
    for (const e of enemies) {
      if (!e._baseHp) e._baseHp = e.hp;
      if (!e.dead) e.hp = Math.round(e._baseHp * diff().hp);
    }
  }; // 初始呼叫在狀態區宣告之後（避免 TDZ）

  renderer.buildLevel(world);
  for (const e of enemies) renderer.addEnemy(e.id, e.type);
  for (const p of LEVEL.entities.pickups) {
    pickups.set(p.id, { item: p.item, count: p.count, x: p.x, z: p.z });
    renderer.addPickup(p.id, ITEMS[p.item].type);
    renderer.placePickup(p.id, p.x, p.z);
  }
  for (const t of LEVEL.entities.typewriters) renderer.addTypewriter(t.x, t.z);
  renderer.setWeaponView(arsenal.current);
  // 外部 .glb 模型（assets/models/ 有檔才替換；非同步，不擋啟動）
  loadExternalModels().then((m) => {
    if (m) renderer.setExternalModels(m);
  }).catch(() => {});

  const canvas = renderer.renderer.domElement;
  input.attach(canvas);
  canvas.addEventListener('click', () => audio.unlock());

  // === 觸控裝置：顯示虛擬搖桿與按鈕，全部合成既有輸入 ===
  const isTouchOnly = !!(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  if (isTouchOnly) {
    document.body.classList.add('touch');
    $('touch-ui').style.display = 'block';
    input.enableDragMode(); // 不請求 pointer lock、失鎖不觸發暫停
    input.attachTouch({
      stick: $('stick'),
      knob: $('stick-knob'),
      lookZone: $('look-zone'),
      buttons: document.querySelectorAll('#touch-ui .tbtn'),
    });
    document.addEventListener('touchstart', () => audio.unlock(), { once: true });
  }
  // 覆蓋層的觸控按鈕：合成按鍵事件，走與鍵盤完全相同的路徑
  for (const btn of document.querySelectorAll('.synth-btn')) {
    btn.addEventListener('click', () => {
      input.onKeyDown(btn.dataset.code);
      input.onKeyUp(btn.dataset.code);
    });
  }

  // === 後處理：顆粒層（JS 生成噪點圖）與選單背景（有 menu-bg.jpg 就用） ===
  {
    const nc = document.createElement('canvas');
    nc.width = nc.height = 128;
    const ng = nc.getContext('2d');
    const img = ng.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ng.putImageData(img, 0, 0);
    $('grain').style.backgroundImage = `url(${nc.toDataURL()})`;

    const bg = new Image();
    bg.onload = () => {
      for (const id of ['loading', 'pause']) {
        $(id).style.backgroundImage =
          'linear-gradient(rgba(3,4,7,0.72), rgba(3,4,7,0.88)), url(assets/textures/menu-bg.jpg)';
        $(id).style.backgroundSize = 'cover';
        $(id).style.backgroundPosition = 'center';
      }
    };
    bg.src = 'assets/textures/menu-bg.jpg'; // 缺檔靜默跳過
  }

  // === 狀態 ===
  let mode = 'play'; // play | paused | inventory | typewriter | map | dead
  let gameTime = 0;
  let stepDistance = 0;
  let activeRoom = null;
  let activeRoomIds = [];
  let lastHint = null;
  let everLocked = false;
  let hintOverride = null; // {text, t}
  let difficulty = 'standard';
  const projectiles = new Projectiles();
  const burning = new Map(); // enemy → {left, next}（火焰 DoT）
  const visited = new Set(); // 已探索房間（小地圖）
  let mapDrawTick = 0;
  let growlCooldown = 0;
  let musicOn = false;
  const rngFire = mulberry32(1234);
  const rngAI = mulberry32(5678);

  const diff = () => DIFFICULTY[difficulty];

  function hint(text) {
    if (text === lastHint) return;
    lastHint = text;
    $('hint').textContent = text;
  }

  function hintFlash(text, seconds = 1.4) {
    hintOverride = { text, t: seconds };
  }

  function setMode(m) {
    mode = m;
    $('pause').style.display = m === 'paused' ? 'flex' : 'none';
    if (m === 'paused') {
      $('pause-tip').textContent = isTouchOnly
        ? '左下搖桿移動（推滿奔跑）．滑動畫面轉視角．右下按鈕互動'
        : (input.dragMode ? '按住滑鼠拖曳調整視角' : '點擊畫面鎖定視角') +
          '．WASD 移動．Shift 奔跑．E 互動．Esc 暫停';
    }
  }

  $('resume').addEventListener('click', () => {
    setMode('play');
    audio.unlock();
    if (!input.dragMode && canvas.requestPointerLock) {
      const p = canvas.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    }
  });

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
      everLocked = true;
    } else if (!input.dragMode && mode === 'play') {
      setMode('paused');
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && mode === 'play') setMode('paused');
  });

  function idleHint() {
    if (isTouchOnly) return '';
    if (everLocked) return '';
    if (input.dragMode) return '按住滑鼠拖曳調整視角．WASD 移動．E 互動';
    return '點擊畫面鎖定視角．WASD 移動．E 互動';
  }

  // === 房間可視性 ===

  function updateActiveRooms(force = false) {
    const roomId = world.roomAt(player.x, player.z) ?? activeRoom;
    if (roomId === null || (roomId === activeRoom && !force)) return;
    activeRoom = roomId;
    visited.add(roomId);
    activeRoomIds = [roomId];
    for (const d of world.doorsOfRoom(roomId)) {
      const other = d.from === roomId ? d.to : d.from;
      if (other) activeRoomIds.push(other);
    }
    renderer.setActiveRooms(activeRoomIds);
    for (const [id, p] of pickups) {
      renderer.setPickupVisible(id, !takenPickups.has(id) && activeRoomIds.includes(world.roomAt(p.x, p.z)));
    }
  }

  // === 互動目標 ===

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

  function nearestPickup() {
    let best = null;
    let bestDist = 1.1;
    for (const [id, p] of pickups) {
      if (takenPickups.has(id)) continue;
      const dist = Math.hypot(p.x - player.x, p.z - player.z);
      if (dist < bestDist) {
        best = { id, def: p };
        bestDist = dist;
      }
    }
    return best;
  }

  function nearestTypewriter() {
    for (const t of LEVEL.entities.typewriters) {
      if (Math.hypot(t.x - player.x, t.z - player.z) < 1.25) return t;
    }
    return null;
  }

  // === 戰鬥 ===

  function camDir() {
    const cp = Math.cos(player.pitch);
    return { x: -Math.sin(player.yaw) * cp, y: Math.sin(player.pitch), z: -Math.cos(player.yaw) * cp };
  }

  function shotWallSegments() {
    const roomId = world.roomAt(player.x, player.z);
    if (!roomId) return [];
    let segs = world.collisionSegments(roomId);
    for (const d of world.doorsOfRoom(roomId)) {
      if (!d.open) continue;
      const other = d.from === roomId ? d.to : d.from;
      if (other) segs = segs.concat(world.collisionSegments(other));
    }
    return segs;
  }

  function alertNearbyEnemies() {
    const roomId = world.roomAt(player.x, player.z);
    if (!roomId) return;
    const rooms = new Set([roomId]);
    for (const d of world.doorsOfRoom(roomId)) {
      const other = d.from === roomId ? d.to : d.from;
      if (other) rooms.add(other);
    }
    for (const e of enemies) {
      if (!e.dead && rooms.has(world.roomAt(e.x, e.z))) e.alert();
    }
  }

  function tryFire() {
    const shot = arsenal.fire(gameTime);
    if (!shot) return;
    if (shot.empty) {
      audio.play('dry');
      hintFlash('沒有子彈了——按 R 裝填');
      return;
    }
    const origin = { x: player.x, y: player.eyeHeight, z: player.z };
    const baseDir = camDir();
    const segs = shotWallSegments();

    if (shot.melee) {
      // 武士刀：三向扇形掃擊（可同時命中多個敵人）；小刀：單向
      if (shot.sweep > 1) {
        audio.play('katana');
        renderer.swingViewmodel();
        const hitEnemies = new Set();
        for (const off of [-0.35, 0, 0.35]) {
          const cy = Math.cos(player.pitch);
          const dir = {
            x: -Math.sin(player.yaw + off) * cy,
            y: Math.sin(player.pitch),
            z: -Math.cos(player.yaw + off) * cy,
          };
          const hit = castShot({ origin, dir, enemies, wallSegments: segs, maxRange: shot.range });
          if (hit && !hitEnemies.has(hit.enemy)) {
            hitEnemies.add(hit.enemy);
            applyHit(hit, dir, shot.damage);
          }
        }
      } else {
        audio.play('knife');
        renderer.kickViewmodel(0.03);
        const hit = castShot({ origin, dir: baseDir, enemies, wallSegments: segs, maxRange: shot.range });
        if (hit) applyHit(hit, baseDir, shot.damage);
      }
      return;
    }

    if (shot.spray) {
      // 火焰噴射：錐形範圍傷害＋點燃 DoT
      audio.play('flame');
      renderer.flameJet();
      alertNearbyEnemies();
      const cosArc = Math.cos(shot.arc);
      for (const e of enemies) {
        if (e.dead) continue;
        const dx = e.x - player.x;
        const dz = e.z - player.z;
        const d = Math.hypot(dx, dz);
        if (d > shot.range || d < 1e-6) continue;
        const dot = (dx / d) * baseDir.x + (dz / d) * baseDir.z;
        if (dot < cosArc) continue;
        e.hurt(shot.damage, 'body');
        burning.set(e, { left: 2, next: 0.5 });
        hud.hitmark();
      }
      hud.setAmmo(arsenal, inventory);
      return;
    }

    if (shot.projectile) {
      audio.play('rocketLaunch');
      renderer.kickViewmodel(0.13);
      alertNearbyEnemies();
      projectiles.spawn({
        x: player.x + baseDir.x * 0.6,
        y: player.eyeHeight - 0.1,
        z: player.z + baseDir.z * 0.6,
        dirX: baseDir.x,
        dirY: baseDir.y,
        dirZ: baseDir.z,
        speed: shot.speed,
        damage: shot.damage,
        radius: shot.radius,
      });
      hud.setAmmo(arsenal, inventory);
      return;
    }

    audio.gunshot(shot.weapon);
    renderer.muzzleFlash();
    renderer.kickViewmodel(shot.weapon === 'shotgun' ? 0.1 : shot.weapon === 'smg' ? 0.035 : 0.06);
    alertNearbyEnemies();
    for (let i = 0; i < shot.pellets; i++) {
      const dir = jitterDir(baseDir, shot.spread, rngFire);
      const hit = castShot({ origin, dir, enemies, wallSegments: segs });
      if (hit) applyHit(hit, dir, shot.damage);
    }
    hud.setAmmo(arsenal, inventory);
  }

  function applyHit(hit, dir, damage) {
    hit.enemy.hurt(damage, hit.zone);
    hud.hitmark();
    renderer.bloodBurst(
      player.x + dir.x * hit.dist,
      player.eyeHeight + dir.y * hit.dist,
      player.z + dir.z * hit.dist
    );
  }

  const enemyCtx = {
    player,
    world,
    rng: rngAI,
    get gameTime() {
      return gameTime;
    },
    attackPlayer(dmg) {
      if (player.hurt(Math.round(dmg * diff().dmg))) {
        hud.damageFlash();
        renderer.shake(0.1);
        audio.play('hurt');
        if (player.hp <= 0) die();
      }
    },
    sound(name) {
      audio.play(name);
    },
  };

  function die() {
    setMode('dead');
    overlays.showDeath(saves.load(SAVE_KEY) !== null);
  }

  // === 拾取 ===

  function tryPickup(p) {
    const def = ITEMS[p.def.item];
    if (def.type === 'weapon') {
      arsenal.give(def.weapon, def.rounds || 0);
      arsenal.select(def.weapon);
      renderer.setWeaponView(def.weapon);
    } else {
      // 難度影響彈藥拾取量
      const def0 = ITEMS[p.def.item];
      const count = def0.type === 'ammo' ? Math.max(1, Math.round(p.def.count * diff().ammo)) : p.def.count;
      const r = inventory.add(p.def.item, count);
      if (r.leftover > 0) {
        // 全有或全無：部分拾取會讓存檔狀態變複雜
        inventory.takeAmmo(p.def.item, r.added); // 還原
        hintFlash('物品欄已滿');
        audio.play('locked');
        return;
      }
    }
    takenPickups.add(p.id);
    renderer.removePickup(p.id);
    audio.play('pickup');
    hintFlash(`取得 ${def.name}${p.def.count > 1 ? ' ×' + p.def.count : ''}`);
    hud.setAmmo(arsenal, inventory);
  }

  // === 存讀檔 ===

  function doSave() {
    const data = buildSave({
      levelId: LEVEL.id,
      player,
      inventory,
      arsenal,
      enemies,
      takenPickups,
      gameTime,
    });
    data.difficulty = difficulty;
    data.visited = [...visited];
    saves.save(SAVE_KEY, data);
    audio.play('typewriter');
    $('tw-info').textContent = saves.persistent
      ? '已存檔。'
      : '已存檔（此瀏覽器無法永久保存，關閉頁面將遺失）。';
  }

  function doLoad() {
    const data = saves.load(SAVE_KEY);
    if (!data || data.levelId !== LEVEL.id) return false;
    if (data.difficulty && DIFFICULTY[data.difficulty]) difficulty = data.difficulty;
    if (Array.isArray(data.visited)) {
      visited.clear();
      for (const r of data.visited) visited.add(r);
    }
    const restored = applySave(data, { player });
    inventory = restored.inventory;
    arsenal = restored.arsenal;
    gameTime = restored.gameTime;
    takenPickups = restored.takenPickups;
    player.iframes = 0;
    const byId = new Map(restored.enemySnapshots.map((s) => [s.id, s]));
    for (const e of enemies) {
      const s = byId.get(e.id);
      if (!s) continue;
      e.restore(s);
      if (!e.dead) {
        e.setState('idle');
        e.alerted = false;
      }
      renderer.syncEnemy(e.id, e, true);
    }
    for (const [id, p] of pickups) {
      if (takenPickups.has(id)) {
        renderer.removePickup(id);
      } else if (!renderer.pickupMeshes.has(id)) {
        renderer.addPickup(id, ITEMS[p.item].type);
        renderer.placePickup(id, p.x, p.z);
      }
    }
    renderer.setWeaponView(arsenal.current);
    hud.setAmmo(arsenal, inventory);
    updateActiveRooms(true);
    return true;
  }

  // === 主更新 ===

  function update(dt) {
    if (mode === 'paused') {
      input.actions();
      input.consumePressed('Escape');
      return;
    }
    if (mode === 'inventory') {
      input.consumeLook();
      input.consumeMouseJust(0);
      if (overlays.inventoryInput(input, inventory, player, audio)) {
        overlays.closeInventory();
        hud.setAmmo(arsenal, inventory);
        setMode('play');
      }
      return;
    }
    if (mode === 'typewriter') {
      input.consumeLook();
      input.consumeMouseJust(0);
      const act = overlays.typewriterInput(input);
      if (act === 'save') doSave();
      else if (act === 'load') {
        if (doLoad()) {
          overlays.closeTypewriter();
          setMode('play');
          hintFlash('讀取完成');
        } else {
          $('tw-info').textContent = '沒有可讀取的存檔。';
        }
      } else if (act === 'close') {
        overlays.closeTypewriter();
        setMode('play');
      }
      return;
    }
    if (mode === 'map') {
      input.consumeLook();
      input.consumeMouseJust(0);
      if (input.consumePressed('KeyM') || input.consumePressed('Tab') || input.consumePressed('Escape')) {
        $('bigmap').style.display = 'none';
        setMode('play');
      }
      return;
    }
    if (mode === 'dead') {
      input.consumeLook();
      const act = overlays.deathInput(input);
      if (act === 'load' && doLoad()) {
        $('death').style.display = 'none';
        setMode('play');
      } else if (act === 'restart') {
        window.location.reload();
      }
      return;
    }

    // === play ===
    gameTime += dt;
    const actions = input.actions();
    if (input.consumePressed('Escape')) {
      setMode('paused');
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

    if (actions.weaponSlot !== null) {
      const id = WEAPON_SLOTS[actions.weaponSlot];
      if (id && arsenal.has(id)) {
        arsenal.select(id);
        renderer.setWeaponView(id);
        hud.setAmmo(arsenal, inventory);
      }
    }
    // Q（或觸控「武器」鈕）：循環切換持有的武器
    if (input.consumePressed('KeyQ')) {
      const owned = WEAPON_SLOTS.filter((id) => arsenal.has(id));
      if (owned.length > 1) {
        const next = owned[(owned.indexOf(arsenal.current) + 1) % owned.length];
        arsenal.select(next);
        renderer.setWeaponView(next);
        hud.setAmmo(arsenal, inventory);
      }
    }
    if (actions.reload) {
      const got = arsenal.reload(inventory);
      if (got > 0) {
        audio.play('reload');
        hud.setAmmo(arsenal, inventory);
      }
    }
    if (actions.inventory) {
      overlays.openInventory(inventory);
      setMode('inventory');
      return;
    }
    if (input.consumePressed('KeyM')) {
      hud.drawBigmap(world, player, visited, LEVEL.entities.typewriters);
      $('bigmap').style.display = 'flex';
      setMode('map');
      return;
    }
    // 全自動/噴射武器按住連發，其餘單發
    const wdef = WEAPONS[arsenal.current];
    if (wdef.auto ? actions.fireHeld : actions.fire) tryFire();
    if (wdef.auto) input.consumeMouseJust(0); // 清掉邊緣事件避免殘留

    // 投射物（火箭彈）推進與爆炸
    const events = projectiles.update(dt, { world, enemies, player });
    for (const ev of events) {
      renderer.explosion(ev.x, ev.y, ev.z);
      audio.play('explosion');
      alertNearbyEnemies();
      for (const h of ev.hits) {
        h.enemy.hurt(h.damage, 'body');
        hud.hitmark();
      }
      if (ev.playerDamage > 0 && player.hurt(ev.playerDamage)) {
        hud.damageFlash();
        renderer.shake(0.2);
        audio.play('hurt');
        if (player.hp <= 0) die();
      }
    }

    // 火焰 DoT
    for (const [e, b] of burning) {
      if (e.dead) {
        burning.delete(e);
        continue;
      }
      b.left -= dt;
      b.next -= dt;
      if (b.next <= 0) {
        b.next = 0.5;
        e.hurt(5, 'body');
      }
      if (b.left <= 0) burning.delete(e);
    }

    // 犬類追擊低吼
    growlCooldown -= dt;
    if (growlCooldown <= 0) {
      growlCooldown = 2.4;
      if (enemies.some((e) => e.type === 'dog' && !e.dead && e.state === 'chase')) {
        audio.play('doggrowl');
      }
    }

    // 配樂強度：有警覺中的活敵＝戰鬥層
    const inCombat = enemies.some((e) => !e.dead && e.alerted);
    if (inCombat !== musicOn) {
      musicOn = inCombat;
      audio.setMusicIntensity(inCombat ? 1 : 0);
    }

    // 互動優先序：拾取 > 打字機 > 門
    const pickup = nearestPickup();
    const typewriter = pickup ? null : nearestTypewriter();
    const door = pickup || typewriter ? null : nearestDoor();

    if (actions.interact) {
      if (pickup) tryPickup(pickup);
      else if (typewriter) {
        overlays.openTypewriter(saves.load(SAVE_KEY) !== null);
        setMode('typewriter');
      } else if (door) {
        if (door.lock) audio.play('locked');
        else {
          const next = !door.open;
          world.setDoorOpen(door.id, next);
          renderer.setDoorOpen(door.id, next);
          audio.play('door');
        }
      }
    }

    // 提示
    if (hintOverride) {
      hintOverride.t -= dt;
      hint(hintOverride.text);
      if (hintOverride.t <= 0) hintOverride = null;
    } else if (pickup) {
      hint(`按 E 拾取 ${ITEMS[pickup.def.item].name}`);
    } else if (typewriter) {
      hint('按 E 使用打字機');
    } else if (door) {
      hint(door.lock ? `上鎖了——需要「${world.lockNames[door.lock] ?? door.lock}」` : door.open ? '按 E 關門' : '按 E 開門');
    } else {
      hint(idleHint());
    }

    // 敵人
    for (const e of enemies) e.update(dt, enemyCtx);
    separateEnemies(enemies);
    for (const e of enemies) {
      renderer.syncEnemy(e.id, e, activeRoomIds.includes(world.roomAt(e.x, e.z)));
    }

    audio.setHeartbeat(player.healthTier());
    hud.update(dt, player);
    updateActiveRooms();
    // 小地圖每 0.25 秒重繪
    if (++mapDrawTick >= 15) {
      mapDrawTick = 0;
      hud.drawMinimap(world, player, visited, LEVEL.entities.typewriters);
    }
  }

  function render() {
    renderer.updateCamera(player);
    renderer.syncProjectiles(projectiles.list);
    renderer.render();
  }

  const loop = new GameLoop({ update, render });

  const ro = new ResizeObserver(() => {
    renderer.resize(container.clientWidth, container.clientHeight);
  });
  ro.observe(container);
  renderer.resize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);

  applyDifficultyHp();
  hud.setAmmo(arsenal, inventory);
  updateActiveRooms(true);
  loop.start();
  $('loading').style.display = 'none';

  // 供自動驗證與除錯
  window.__zw = {
    world,
    player,
    input,
    loop,
    renderer,
    saves,
    enemies,
    doSave,
    doLoad,
    setMode,
    projectiles,
    visited,
    setDifficulty(d) {
      if (DIFFICULTY[d]) {
        difficulty = d;
        applyDifficultyHp();
      }
    },
    get difficulty() {
      return difficulty;
    },
    get mode() {
      return mode;
    },
    get inventory() {
      return inventory;
    },
    get arsenal() {
      return arsenal;
    },
    get gameTime() {
      return gameTime;
    },
    version: 'phase2',
  };
}

boot();
