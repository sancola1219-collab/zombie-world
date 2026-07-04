// 渲染層：純視覺。遊戲狀態一律在 World/Player，這裡只反映狀態。
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

    this.scene.add(new THREE.AmbientLight(0x353542, 0.7));

    this.roomGroups = new Map();
    this.doorPivots = new Map();
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
      // 門洞上檻（door.height 到天花板）
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

    // 門板：鉸鏈端 pivot，開門＝旋轉（純裝飾，碰撞由 World 決定）
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
