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
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05060a);
    this.scene.fog = new THREE.FogExp2(0x05060a, 0.07);

    this.camera = new THREE.PerspectiveCamera(70, 1, 0.05, 60);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera); // 讓視角武器模型（相機子物件）可被渲染

    this.scene.add(new THREE.AmbientLight(0x353542, 0.7));

    this.roomGroups = new Map();
    this.doorPivots = new Map();
    this.enemyMeshes = new Map();
    this.pickupMeshes = new Map();
    this._bloodBursts = [];

    // 槍口閃光
    this._muzzle = new THREE.PointLight(0xffcc88, 0, 7, 2);
    this.scene.add(this._muzzle);

    this._buildViewmodels();
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
      }

      this.scene.add(group);
      this.roomGroups.set(room.id, group);
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
    this.camera.position.set(player.x, player.eyeHeight, player.z);
    this.camera.rotation.y = player.yaw;
    this.camera.rotation.x = player.pitch;
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
    for (const m of this.pickupMeshes.values()) m.rotation.y += 0.02;
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

function makeZombieMesh() {
  const g = new THREE.Group();
  const skin = new THREE.MeshLambertMaterial({ color: 0x7d8a68 });
  const cloth = new THREE.MeshLambertMaterial({ color: 0x3a3f48 });
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.75, 0.26), cloth);
  legs.position.y = 0.375;
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.3), cloth);
  torso.position.y = 1.06;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), skin);
  head.position.y = 1.55;
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.5), skin);
  armL.position.set(-0.2, 1.26, -0.3);
  const armR = armL.clone();
  armR.position.x = 0.2;
  g.add(legs, torso, head, armL, armR);
  return g;
}

function makeDogMesh() {
  const g = new THREE.Group();
  const fur = new THREE.MeshLambertMaterial({ color: 0x5c4838 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.32, 0.72), fur);
  body.position.y = 0.42;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.28), fur);
  head.position.set(0, 0.55, -0.42);
  const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.28, 0.07), fur);
  legFL.position.set(-0.1, 0.14, -0.26);
  const legFR = legFL.clone(); legFR.position.x = 0.1;
  const legBL = legFL.clone(); legBL.position.set(-0.1, 0.14, 0.26);
  const legBR = legFL.clone(); legBR.position.set(0.1, 0.14, 0.26);
  g.add(body, head, legFL, legFR, legBL, legBR);
  return g;
}
