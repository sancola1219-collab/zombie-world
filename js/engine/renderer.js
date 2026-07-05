// 渲染層：純視覺。遊戲狀態一律在 World/Player/Enemy，這裡只反映狀態。
// 血粒子、槍口光衰減、拾取物旋轉屬純裝飾，在 render() 內推進不影響邏輯。
import * as THREE from 'three';
import { getTexture } from './textures.js';

export class Renderer {
  constructor(container) {
    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      throw new Error('WEBGL_UNSUPPORTED');
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // 電影感色調映射
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020306);
    this.scene.fog = new THREE.FogExp2(0x03040a, 0.115);

    this.camera = new THREE.PerspectiveCamera(70, 1, 0.05, 60);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera); // 讓視角武器模型（相機子物件）可被渲染

    // 光強單位是物理量（燭光），數值要比直覺大得多——
    // 以下數值經像素取樣調校：光圈中心約 100/255、暗部個位數，勿憑感覺改
    this.scene.add(new THREE.AmbientLight(0x50505e, 1.0));

    // 手電筒：掛在相機上、微偏右下，照向前方
    this._flash = new THREE.SpotLight(0xfff0d2, 450, 16, 0.55, 0.6, 1.4);
    this._flash.position.set(0.12, -0.08, 0);
    this._flashTarget = new THREE.Object3D();
    this._flashTarget.position.set(0, -0.1, -6);
    this.camera.add(this._flash, this._flashTarget);
    this._flash.target = this._flashTarget;

    // 貼身微光：讓腳邊與極近物在光圈外仍隱約可辨
    this._fill = new THREE.PointLight(0xffe8c8, 5, 5, 1.6);
    this.camera.add(this._fill);

    this.roomGroups = new Map();
    this.doorPivots = new Map();
    this.enemyMeshes = new Map();
    this.pickupMeshes = new Map();
    this._bloodBursts = [];
    this._flickers = [];
    this._shake = 0;
    this._bobPhase = 0;
    this._lastCam = null;

    // 槍口閃光
    this._muzzle = new THREE.PointLight(0xffcc88, 0, 7, 2);
    this.scene.add(this._muzzle);

    this._buildViewmodels();
  }

  // 受擊/爆炸震動（純裝飾，render 內衰減）
  shake(strength = 0.06) {
    this._shake = Math.max(this._shake, strength);
  }

  buildLevel(world) {
    for (const room of world.rooms.values()) {
      const group = new THREE.Group();
      const floorMat = new THREE.MeshLambertMaterial({ map: getTexture(room.floor || 'wood') });
      const wallMat = new THREE.MeshLambertMaterial({ map: getTexture(room.walls || 'wallpaper') });
      const ceilMat = new THREE.MeshLambertMaterial({ map: getTexture('plaster'), color: 0x777470 });

      const floor = new THREE.Mesh(new THREE.PlaneGeometry(room.w, room.d), floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(room.x + room.w / 2, 0, room.z + room.d / 2);
      group.add(floor);

      const ceil = new THREE.Mesh(new THREE.PlaneGeometry(room.w, room.d), ceilMat);
      ceil.rotation.x = Math.PI / 2;
      ceil.position.set(room.x + room.w / 2, room.h, room.z + room.d / 2);
      group.add(ceil);

      for (const [x1, z1, x2, z2] of world.wallSegments(room.id)) {
        group.add(makeWall(x1, z1, x2, z2, 0, room.h, wallMat));
      }
      for (const d of world.doorsOfRoom(room.id)) {
        if (d.height < room.h) {
          const s = world.doorSegment(d.id);
          group.add(makeWall(s[0], s[1], s[2], s[3], d.height, room.h - d.height, wallMat));
        }
      }

      if (room.light) {
        const L = room.light;
        const light = new THREE.PointLight(L.color ?? 0xffd9a0, L.intensity ?? 6, 18, 1.6);
        light.position.set(L.x, L.y ?? room.h - 0.4, L.z);
        group.add(light);
        if (L.flicker) this._flickers.push({ light, base: light.intensity, t: 0 });
      }

      this.scene.add(group);
      this.roomGroups.set(room.id, group);
    }

    // 場景道具（吃房間剔除；碰撞由 World 依 solid 值處理）
    for (const p of world.data.props || []) {
      const mesh = makeProp(p);
      if (!mesh) continue;
      (this.roomGroups.get(p.room) || this.scene).add(mesh);
    }

    const doorMat = new THREE.MeshLambertMaterial({ map: getTexture('wood'), color: 0x9a7a55 });
    for (const d of world.doors.values()) {
      const s = world.doorSegment(d.id);
      const pivot = new THREE.Group();
      pivot.position.set(s[0], 0, s[1]);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(d.width, d.height, 0.06), doorMat);
      if (d.axis === 'x') {
        panel.position.set(d.width / 2, d.height / 2, 0);
      } else {
        panel.rotation.y = Math.PI / 2;
        panel.position.set(0, d.height / 2, d.width / 2);
      }
      pivot.add(panel);
      this.scene.add(pivot);
      this.doorPivots.set(d.id, pivot);
    }
  }

  setDoorOpen(doorId, open) {
    const pivot = this.doorPivots.get(doorId);
    if (pivot) pivot.rotation.y = open ? -Math.PI * 0.47 : 0;
  }

  setActiveRooms(ids) {
    for (const [id, g] of this.roomGroups) g.visible = ids.includes(id);
  }

  // === 敵人 ===

  addEnemy(id, type) {
    const group = type === 'dog' ? makeDogMesh() : makeZombieMesh();
    this.scene.add(group);
    this.enemyMeshes.set(id, group);
  }

  syncEnemy(id, e, visible = true) {
    const g = this.enemyMeshes.get(id);
    if (!g) return;
    g.visible = visible;
    g.position.x = e.x;
    g.position.z = e.z;
    g.rotation.y = e.yaw;
    g.userData.dead = e.dead;
    g.userData.moving = !e.dead && (e.state === 'chase' || e.state === 'lunge');
    if (e.dead) {
      g.rotation.x = -Math.PI / 2;
      g.position.y = 0.22;
    } else {
      g.position.y = 0;
      g.rotation.x = e.state === 'stagger' ? 0.18 : e.state === 'windup' ? -0.12 : 0;
    }
  }

  // === 拾取物與打字機 ===

  addPickup(id, itemType) {
    const color =
      itemType === 'heal' ? 0x3f9f4f : itemType === 'weapon' ? 0x8899aa : 0xc9a94f;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.24, 0.24),
      new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.45 })
    );
    mesh.position.y = 0.3;
    this.scene.add(mesh);
    this.pickupMeshes.set(id, mesh);
  }

  placePickup(id, x, z) {
    const m = this.pickupMeshes.get(id);
    if (m) {
      m.position.x = x;
      m.position.z = z;
    }
  }

  setPickupVisible(id, visible) {
    const m = this.pickupMeshes.get(id);
    if (m) m.visible = visible;
  }

  removePickup(id) {
    const m = this.pickupMeshes.get(id);
    if (m) {
      this.scene.remove(m);
      this.pickupMeshes.delete(id);
    }
  }

  addTypewriter(x, z) {
    const g = new THREE.Group();
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.72, 0.55),
      new THREE.MeshLambertMaterial({ map: getTexture('wood') })
    );
    desk.position.y = 0.36;
    g.add(desk);
    const tw = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.2, 0.34),
      new THREE.MeshLambertMaterial({ color: 0x22262c })
    );
    tw.position.y = 0.82;
    g.add(tw);
    const paper = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.22, 0.012),
      new THREE.MeshLambertMaterial({ color: 0xd8d2bc })
    );
    paper.position.set(0, 1.0, -0.08);
    paper.rotation.x = -0.25;
    g.add(paper);
    g.position.set(x, 0, z);
    this.scene.add(g);
  }

  // === 戰鬥特效（純裝飾） ===

  muzzleFlash() {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    this._muzzle.position.copy(this.camera.position).addScaledVector(dir, 0.5);
    this._muzzle.intensity = 26;
  }

  bloodBurst(x, y, z) {
    const n = 14;
    const pos = new Float32Array(n * 3);
    const vel = [];
    for (let i = 0; i < n; i++) {
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      vel.push([
        (Math.random() - 0.5) * 2.4,
        Math.random() * 2 + 0.5,
        (Math.random() - 0.5) * 2.4,
      ]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x8a1010, size: 0.06 });
    const points = new THREE.Points(geo, mat);
    this.scene.add(points);
    this._bloodBursts.push({ points, vel, life: 0.45 });
  }

  // === 視角武器模型 ===

  _buildViewmodels() {
    const dark = new THREE.MeshLambertMaterial({ color: 0x23262b });
    const steel = new THREE.MeshLambertMaterial({ color: 0x55595f });
    const wood = new THREE.MeshLambertMaterial({ color: 0x5a4028 });

    const knife = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.05, 0.22), steel);
    blade.position.z = -0.14;
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.1), wood);
    knife.add(blade, handle);

    const handgun = new THREE.Group();
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.24), dark);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.13, 0.05), dark);
    grip.position.set(0, -0.08, 0.08);
    grip.rotation.x = 0.25;
    handgun.add(slide, grip);

    const shotgun = new THREE.Group();
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.55), dark);
    const pump = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.16), wood);
    pump.position.set(0, -0.05, -0.12);
    const stock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.2), wood);
    stock.position.set(0, -0.04, 0.3);
    shotgun.add(barrel, pump, stock);

    const magnum = new THREE.Group();
    const mbarrel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.32), steel);
    const mgrip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.05), wood);
    mgrip.position.set(0, -0.08, 0.1);
    mgrip.rotation.x = 0.3;
    magnum.add(mbarrel, mgrip);

    this._vms = { knife, handgun, shotgun, magnum };
    this._vmRoot = new THREE.Group();
    this._vmRoot.position.set(0.24, -0.2, -0.45);
    for (const g of Object.values(this._vms)) {
      g.visible = false;
      this._vmRoot.add(g);
    }
    this.camera.add(this._vmRoot);
    this._vmKick = 0;
  }

  setWeaponView(id) {
    for (const [k, g] of Object.entries(this._vms)) g.visible = k === id;
  }

  kickViewmodel(strength = 0.06) {
    this._vmKick = strength;
  }

  updateCamera(player) {
    // 走路搖晃＋受擊震動：純裝飾，只影響相機呈現，不回寫遊戲狀態
    const moved = this._lastCam
      ? Math.hypot(player.x - this._lastCam[0], player.z - this._lastCam[1])
      : 0;
    this._lastCam = [player.x, player.z];
    if (moved > 0.0005) this._bobPhase += Math.min(moved, 0.12) * 22;
    const bob = Math.sin(this._bobPhase) * 0.022;
    let sx = 0;
    let sy = 0;
    if (this._shake > 0.001) {
      sx = (Math.random() - 0.5) * this._shake;
      sy = (Math.random() - 0.5) * this._shake;
    }
    this.camera.position.set(player.x + sx, player.eyeHeight + bob + sy, player.z);
    this.camera.rotation.y = player.yaw;
    this.camera.rotation.x = player.pitch;
    this.camera.rotation.z = Math.sin(this._bobPhase * 0.5) * 0.006;
  }

  resize(w, h) {
    if (w <= 0 || h <= 0) return; // 容器初始尺寸可能為 0（既有課題）
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  render() {
    // 純裝飾動畫（以固定 1/60 近似推進；停擺只影響視覺不影響邏輯）
    const dt = 1 / 60;
    if (this._muzzle.intensity > 0.5) this._muzzle.intensity *= 0.62;
    else this._muzzle.intensity = 0;
    this._vmKick *= 0.8;
    this._vmRoot.position.z = -0.45 + this._vmKick;
    this._shake *= 0.86;
    for (const m of this.pickupMeshes.values()) m.rotation.y += 0.02;

    // 日光燈忽明忽暗
    for (const f of this._flickers) {
      f.t -= dt;
      if (f.t <= 0) {
        f.t = 0.06 + Math.random() * 0.18;
        f.light.intensity = f.base * (Math.random() < 0.1 ? 0.12 : 0.7 + Math.random() * 0.45);
      }
    }

    // 敵人四肢擺動（僅視覺；moving/dead 旗標由 syncEnemy 設定）
    for (const g of this.enemyMeshes.values()) {
      const parts = g.userData.parts;
      if (!g.visible || !parts || g.userData.dead) continue;
      if (g.userData.moving) g.userData.phase += dt * (g.userData.kind === 'dog' ? 15 : 5.2);
      const s = Math.sin(g.userData.phase);
      if (g.userData.kind === 'dog') {
        parts.legFL.rotation.x = s * 0.85;
        parts.legBR.rotation.x = s * 0.85;
        parts.legFR.rotation.x = -s * 0.85;
        parts.legBL.rotation.x = -s * 0.85;
      } else {
        parts.legL.rotation.x = s * 0.5;
        parts.legR.rotation.x = -s * 0.5;
        parts.armF.rotation.x = 0.15 + s * 0.1;
        parts.armD.rotation.z = 0.12 + s * 0.16;
        parts.torso.rotation.x = 0.3 + Math.sin(g.userData.phase * 0.5) * 0.05;
      }
    }
    for (let i = this._bloodBursts.length - 1; i >= 0; i--) {
      const b = this._bloodBursts[i];
      b.life -= dt;
      const arr = b.points.geometry.attributes.position;
      for (let j = 0; j < b.vel.length; j++) {
        b.vel[j][1] -= 6 * dt;
        arr.array[j * 3] += b.vel[j][0] * dt;
        arr.array[j * 3 + 1] = Math.max(0.02, arr.array[j * 3 + 1] + b.vel[j][1] * dt);
        arr.array[j * 3 + 2] += b.vel[j][2] * dt;
      }
      arr.needsUpdate = true;
      if (b.life <= 0) {
        this.scene.remove(b.points);
        this._bloodBursts.splice(i, 1);
      }
    }
    this.renderer.render(this.scene, this.camera);
  }
}

function makeWall(x1, z1, x2, z2, yBase, height, mat) {
  const len = Math.hypot(x2 - x1, z2 - z1);
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(len, height, 0.12), mat);
  mesh.position.set((x1 + x2) / 2, yBase + height / 2, (z1 + z2) / 2);
  mesh.rotation.y = Math.atan2(z1 - z2, x2 - x1);
  return mesh;
}

// 人形殭屍：駝背、歪頭、一臂前伸一臂垂盪；四肢樞紐在關節處，render 內擺動
function makeZombieMesh() {
  const g = new THREE.Group();
  const skin = new THREE.MeshLambertMaterial({ color: 0x8a927a });
  const skinDark = new THREE.MeshLambertMaterial({ color: 0x6d745e });
  const cloth = new THREE.MeshLambertMaterial({ color: 0x2f333c });
  const clothDark = new THREE.MeshLambertMaterial({ color: 0x252932 });

  const legGeoL = new THREE.BoxGeometry(0.15, 0.78, 0.18);
  legGeoL.translate(0, -0.39, 0); // 樞紐在髖部
  const legL = new THREE.Mesh(legGeoL, cloth);
  legL.position.set(-0.1, 0.78, 0);
  const legGeoR = legGeoL.clone();
  const legR = new THREE.Mesh(legGeoR, clothDark);
  legR.position.set(0.1, 0.78, 0.02);

  const torso = new THREE.Group();
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.6, 0.26), cloth);
  chest.position.y = 0.3;
  torso.add(chest);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), skin);
  head.position.set(0.04, 0.68, -0.05);
  head.rotation.z = 0.28; // 歪頭
  torso.add(head);
  const armF = new THREE.Group(); // 前伸手臂，肩為樞紐
  const armFMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.55), skinDark);
  armFMesh.position.z = -0.27;
  armF.add(armFMesh);
  armF.position.set(-0.22, 0.5, -0.05);
  armF.rotation.x = 0.15;
  torso.add(armF);
  const armD = new THREE.Group(); // 垂盪手臂
  const armDMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.5, 0.09), skin);
  armDMesh.position.y = -0.25;
  armD.add(armDMesh);
  armD.position.set(0.25, 0.52, 0);
  armD.rotation.z = 0.12;
  torso.add(armD);
  torso.position.y = 0.76;
  torso.rotation.x = 0.3; // 駝背前傾

  g.add(legL, legR, torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'zombie';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

function makeDogMesh() {
  const g = new THREE.Group();
  const fur = new THREE.MeshLambertMaterial({ color: 0x4e3c2e });
  const furDark = new THREE.MeshLambertMaterial({ color: 0x3a2c22 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.72), fur);
  body.position.y = 0.44;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.18, 0.3), furDark);
  head.position.set(0, 0.42, -0.48); // 壓低頭部，攻擊姿態
  head.rotation.x = 0.25;
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.26), furDark);
  tail.position.set(0, 0.5, 0.44);
  tail.rotation.x = -0.5;

  const legGeo = new THREE.BoxGeometry(0.07, 0.3, 0.07);
  legGeo.translate(0, -0.15, 0); // 樞紐在肩/髖
  const mk = (x, z) => {
    const m = new THREE.Mesh(legGeo, fur);
    m.position.set(x, 0.3, z);
    return m;
  };
  const legFL = mk(-0.1, -0.26);
  const legFR = mk(0.1, -0.26);
  const legBL = mk(-0.1, 0.26);
  const legBR = mk(0.1, 0.26);

  g.add(body, head, tail, legFL, legFR, legBL, legBR);
  g.userData.parts = { legFL, legFR, legBL, legBR };
  g.userData.kind = 'dog';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// === 場景道具（程序生成，低多邊形） ===

function makeProp(p) {
  const rng = mulberry32Like(p.x * 73 + p.z * 131 + 7);
  const wood = () => new THREE.MeshLambertMaterial({ map: getTexture('wood') });
  const metal = () => new THREE.MeshLambertMaterial({ map: getTexture('metal') });
  const g = new THREE.Group();

  switch (p.type) {
    case 'table': {
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.8), wood());
      top.position.y = 0.72;
      g.add(top);
      for (const [lx, lz] of [[-0.62, -0.32], [0.62, -0.32], [-0.62, 0.32], [0.62, 0.32]]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.7, 0.07), wood());
        leg.position.set(lx, 0.35, lz);
        g.add(leg);
      }
      break;
    }
    case 'chair_fallen': {
      const c = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.42), wood());
      seat.position.y = 0.45;
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.5, 0.05), wood());
      back.position.set(0, 0.72, 0.2);
      c.add(seat, back);
      for (const [lx, lz] of [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.05), wood());
        leg.position.set(lx, 0.22, lz);
        c.add(leg);
      }
      c.rotation.z = Math.PI / 2; // 翻倒
      c.position.y = -0.22;
      g.add(c);
      break;
    }
    case 'shelf': {
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.05, 0.06), wood());
      back.position.set(0, 1.02, 0.13);
      g.add(back);
      for (let i = 0; i < 4; i++) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.3), wood());
        plank.position.y = 0.28 + i * 0.55;
        g.add(plank);
        for (let b = 0; b < 4; b++) {
          if (rng() < 0.3) continue;
          const h = 0.2 + rng() * 0.16;
          const bookMat = new THREE.MeshLambertMaterial({
            color: [0x5a2020, 0x2c3c2a, 0x3a3050, 0x584a28][Math.floor(rng() * 4)],
          });
          const book = new THREE.Mesh(new THREE.BoxGeometry(0.12 + rng() * 0.08, h, 0.2), bookMat);
          book.position.set(-0.36 + b * 0.24, 0.28 + i * 0.55 + h / 2 + 0.03, 0);
          book.rotation.z = (rng() - 0.5) * 0.12;
          g.add(book);
        }
      }
      break;
    }
    case 'crate': {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), wood());
      box.position.y = 0.325;
      box.rotation.y = (rng() - 0.5) * 0.5;
      g.add(box);
      break;
    }
    case 'barrel': {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.85, 10), metal());
      b.position.y = 0.425;
      g.add(b);
      break;
    }
    case 'papers': {
      for (let i = 0; i < 6; i++) {
        const sheet = new THREE.Mesh(
          new THREE.PlaneGeometry(0.22, 0.3),
          new THREE.MeshLambertMaterial({ color: 0xc9c2ae })
        );
        sheet.rotation.x = -Math.PI / 2;
        sheet.rotation.z = rng() * Math.PI * 2;
        sheet.position.set((rng() - 0.5) * 1.4, 0.012 + i * 0.002, (rng() - 0.5) * 1.4);
        g.add(sheet);
      }
      break;
    }
    case 'blood': {
      const stain = new THREE.Mesh(
        new THREE.CircleGeometry(0.35 + rng() * 0.35, 12),
        new THREE.MeshBasicMaterial({ color: 0x3a0505, transparent: true, opacity: 0.85 })
      );
      stain.rotation.x = -Math.PI / 2;
      stain.position.y = 0.011;
      g.add(stain);
      break;
    }
    case 'bodybag': {
      const bag = new THREE.Mesh(
        new THREE.BoxGeometry(1.75, 0.3, 0.6),
        new THREE.MeshLambertMaterial({ color: 0x14161c })
      );
      bag.position.y = 0.15;
      g.add(bag);
      break;
    }
    case 'pipe': {
      const len = p.len ?? 4;
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 8), metal());
      pipe.rotation.z = Math.PI / 2; // 水平沿 x
      pipe.position.y = 0;
      g.add(pipe);
      g.position.y = p.y ?? 2.6;
      break;
    }
    default:
      return null;
  }

  g.position.x = p.x;
  g.position.z = p.z;
  if (p.type !== 'pipe') g.position.y = 0;
  else g.position.y = p.y ?? 2.6;
  g.rotation.y = p.rot ?? 0;
  return g;
}

// 道具擺設用的輕量種子亂數（與 engine/rng 同演算法，避免渲染層反向依賴遊戲種子）
function mulberry32Like(seed) {
  let a = Math.floor(seed) >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
