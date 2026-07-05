// 程序 3D 模型工廠：武器視角模型、敵人、打字機、拾取物。
// 全部程式生成（多零件低多邊形），供 renderer 使用；外部 .glb 存在時由 models.js 熱替換。
import * as THREE from 'three';
import { getTexture } from './textures.js';

// === 小工具 ===

const mat = (color) => new THREE.MeshLambertMaterial({ color });

function box(parent, material, w, h, d, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
}

function cyl(parent, material, rTop, rBot, h, seg, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
}

// === 武器視角模型（尺寸配合 vmRoot 位置，槍口朝 -z） ===

const STEEL = 0x596068;
const DARKSTEEL = 0x23262b;
const GUNWOOD = 0x5a4028;

export function buildWeaponModel(id) {
  const g = new THREE.Group();
  const dark = mat(DARKSTEEL);
  const steel = mat(STEEL);
  const wood = mat(GUNWOOD);

  if (id === 'knife') {
    const blade = mat(0x9aa2ac);
    box(g, blade, 0.013, 0.042, 0.19, 0, 0, -0.13);          // 刀身
    box(g, mat(0xc4ccd6), 0.006, 0.01, 0.18, 0, -0.02, -0.125); // 開鋒亮線
    box(g, blade, 0.013, 0.028, 0.05, 0, -0.006, -0.245, 0.32); // 收尖段
    box(g, dark, 0.05, 0.014, 0.016, 0, 0, -0.03);            // 護手
    const grip = cyl(g, dark, 0.015, 0.017, 0.1, 8, 0, -0.004, 0.035, Math.PI / 2);
    for (let i = 0; i < 3; i++) cyl(g, mat(0x15171a), 0.0165, 0.0165, 0.006, 8, 0, -0.004, 0.012 + i * 0.024, Math.PI / 2);
    void grip;
  } else if (id === 'handgun') {
    box(g, dark, 0.042, 0.04, 0.19, 0, -0.008, -0.01);        // 底把
    box(g, steel, 0.046, 0.044, 0.225, 0, 0.032, -0.02);      // 滑套
    cyl(g, dark, 0.012, 0.012, 0.022, 10, 0, 0.032, -0.14, Math.PI / 2); // 槍口
    box(g, dark, 0.008, 0.014, 0.01, 0, 0.061, -0.125);       // 準星
    box(g, dark, 0.032, 0.012, 0.012, 0, 0.061, 0.085);       // 照門
    const grip = box(g, dark, 0.04, 0.125, 0.056, 0, -0.075, 0.075, 0.28);
    box(grip, mat(0x6b4a2c), 0.043, 0.09, 0.04, 0, -0.008, 0.004); // 木紋握片
    box(g, dark, 0.012, 0.008, 0.05, 0, -0.045, 0.02);        // 護弓下緣
    box(g, dark, 0.012, 0.03, 0.008, 0, -0.032, -0.005);      // 護弓前緣
    box(g, steel, 0.006, 0.022, 0.006, 0, -0.028, 0.022, 0.2); // 扳機
    box(g, dark, 0.014, 0.02, 0.014, 0, 0.045, 0.1, -0.5);    // 擊錘
  } else if (id === 'shotgun') {
    cyl(g, steel, 0.015, 0.015, 0.5, 10, 0, 0.018, -0.2, Math.PI / 2);   // 槍管
    cyl(g, dark, 0.011, 0.011, 0.42, 8, 0, -0.014, -0.17, Math.PI / 2);  // 彈管
    box(g, steel, 0.008, 0.01, 0.008, 0, 0.04, -0.44);        // 準珠
    box(g, dark, 0.05, 0.068, 0.17, 0, 0, 0.12);              // 機匣
    const pump = cyl(g, wood, 0.023, 0.023, 0.13, 10, 0, -0.014, -0.09, Math.PI / 2); // 護木
    for (let i = 0; i < 4; i++) cyl(pump, mat(0x3d2c1c), 0.024, 0.024, 0.008, 10, 0, -0.05 + i * 0.032, 0);
    box(g, wood, 0.044, 0.07, 0.2, 0, -0.012, 0.28, 0.1);     // 槍托
    box(g, dark, 0.046, 0.072, 0.02, 0, -0.024, 0.375, 0.1);  // 托底板
    box(g, dark, 0.012, 0.008, 0.05, 0, -0.045, 0.06);        // 護弓
    box(g, steel, 0.006, 0.02, 0.006, 0, -0.03, 0.05, 0.2);   // 扳機
  } else if (id === 'magnum') {
    box(g, steel, 0.03, 0.034, 0.3, 0, 0.02, -0.1);           // 平頂槍管
    box(g, steel, 0.024, 0.02, 0.26, 0, -0.006, -0.09);       // 下掛重塊
    box(g, dark, 0.008, 0.016, 0.01, 0, 0.045, -0.24);        // 準星
    cyl(g, mat(0x454b52), 0.027, 0.027, 0.056, 8, 0, 0.004, 0.045, Math.PI / 2); // 彈巢
    box(g, steel, 0.034, 0.05, 0.08, 0, 0, 0.1);              // 後框
    box(g, dark, 0.014, 0.024, 0.016, 0, 0.036, 0.135, -0.55); // 擊錘
    box(g, mat(0x5e3a20), 0.038, 0.11, 0.05, 0, -0.07, 0.13, 0.35); // 木握把
    box(g, dark, 0.012, 0.008, 0.045, 0, -0.04, 0.05);        // 護弓
    box(g, steel, 0.006, 0.02, 0.006, 0, -0.026, 0.045, 0.2); // 扳機
  }
  return g;
}

// === 殭屍（高約 1.7，原點在腳底，面向 -z） ===

export function buildZombieMesh() {
  const g = new THREE.Group();
  const skin = mat(0x8a927a);
  const skinDark = mat(0x6d745e);
  const cloth = mat(0x2f333c);
  const clothDark = mat(0x252932);
  const blood = mat(0x481010);
  const eye = mat(0x0c0c10);

  const makeLeg = (x, m) => {
    const leg = new THREE.Group();
    leg.position.set(x, 0.84, 0);
    box(leg, m, 0.14, 0.4, 0.16, 0, -0.2, 0);                 // 大腿
    box(leg, m, 0.12, 0.4, 0.14, 0, -0.58, 0.02, 0.08);       // 小腿（微屈）
    box(leg, skinDark, 0.12, 0.06, 0.22, 0, -0.8, -0.04);     // 赤足
    g.add(leg);
    return leg;
  };
  const legL = makeLeg(-0.11, cloth);
  const legR = makeLeg(0.11, clothDark);

  const torso = new THREE.Group();
  torso.position.y = 0.8;
  torso.rotation.x = 0.3;                                     // 駝背前傾
  box(torso, clothDark, 0.4, 0.16, 0.24, 0, 0.05, 0);         // 骨盆
  box(torso, cloth, 0.42, 0.26, 0.24, 0, 0.26, 0);            // 腹部
  box(torso, blood, 0.2, 0.16, 0.02, 0.06, 0.3, -0.125);      // 胸前血漬
  box(torso, cloth, 0.48, 0.34, 0.28, 0, 0.55, 0);            // 胸膛
  // 破爛衣襬
  box(torso, cloth, 0.1, 0.12, 0.02, -0.14, -0.03, -0.12, 0, 0, 0.3);
  box(torso, clothDark, 0.08, 0.1, 0.02, 0.05, -0.05, -0.12, 0, 0, -0.2);
  box(torso, cloth, 0.09, 0.11, 0.02, 0.16, -0.02, 0.12, 0, 0, 0.25);
  cyl(torso, skin, 0.055, 0.06, 0.09, 8, 0, 0.76, -0.03);     // 頸

  const head = new THREE.Group();
  head.position.set(0.02, 0.88, -0.04);
  head.rotation.z = 0.25;                                     // 歪頭
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.155, 12, 10), skin);
  head.add(skull);
  box(head, skinDark, 0.11, 0.055, 0.1, 0, -0.12, -0.05, 0.5); // 張開的下顎
  box(head, eye, 0.034, 0.026, 0.02, -0.055, 0.02, -0.135);   // 凹陷眼窩
  box(head, eye, 0.034, 0.026, 0.02, 0.055, 0.02, -0.135);
  box(head, blood, 0.05, 0.1, 0.02, 0.07, -0.05, -0.13, 0, 0, 0.2); // 臉側血痕
  torso.add(head);

  const armF = new THREE.Group();                             // 前伸手臂
  armF.position.set(-0.26, 0.6, -0.03);
  armF.rotation.x = 0.1;
  box(armF, cloth, 0.11, 0.11, 0.14, 0, 0, -0.06);            // 破袖
  box(armF, skinDark, 0.09, 0.09, 0.22, 0, 0, -0.22);         // 上臂
  box(armF, skinDark, 0.08, 0.08, 0.24, 0, -0.015, -0.44, 0.12); // 前臂（肘微垂）
  box(armF, skin, 0.085, 0.035, 0.1, 0, -0.045, -0.58, 0.25); // 手掌
  box(armF, skin, 0.02, 0.025, 0.06, -0.025, -0.06, -0.64, 0.35); // 手指
  box(armF, skin, 0.02, 0.025, 0.06, 0.005, -0.06, -0.65, 0.4);
  box(armF, skin, 0.02, 0.025, 0.055, 0.03, -0.06, -0.635, 0.3);
  torso.add(armF);

  const armD = new THREE.Group();                             // 垂盪手臂
  armD.position.set(0.28, 0.62, 0);
  armD.rotation.z = 0.14;
  box(armD, clothDark, 0.11, 0.14, 0.11, 0, -0.05, 0);        // 破袖
  box(armD, skin, 0.085, 0.24, 0.085, 0, -0.22, 0);           // 上臂
  box(armD, skin, 0.075, 0.26, 0.075, 0.01, -0.46, 0.02, 0.12); // 前臂
  box(armD, skinDark, 0.08, 0.09, 0.04, 0.015, -0.62, 0.03);  // 垂著的手
  torso.add(armD);

  g.add(legL, legR, torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'zombie';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// === 殭屍犬（面向 -z） ===

export function buildDogMesh() {
  const g = new THREE.Group();
  const fur = mat(0x4e3c2e);
  const furDark = mat(0x382b20);
  const blood = mat(0x481010);

  box(g, fur, 0.26, 0.3, 0.42, 0, 0.5, -0.1);                 // 前軀
  box(g, furDark, 0.22, 0.26, 0.34, 0, 0.48, 0.24);           // 後軀
  box(g, furDark, 0.05, 0.04, 0.5, 0, 0.66, 0.04);            // 脊背
  box(g, blood, 0.02, 0.14, 0.2, 0.13, 0.5, -0.05);           // 側腹裂傷（露肋）
  box(g, mat(0x796a5a), 0.022, 0.02, 0.03, 0.135, 0.53, -0.1);
  box(g, mat(0x796a5a), 0.022, 0.02, 0.03, 0.135, 0.47, -0.02);
  box(g, fur, 0.13, 0.15, 0.2, 0, 0.58, -0.36, 0.45);         // 頸

  const head = new THREE.Group();
  head.position.set(0, 0.64, -0.5);
  head.rotation.x = 0.2;                                      // 壓低攻擊姿態
  box(head, fur, 0.16, 0.15, 0.17, 0, 0, 0.02);               // 顱
  box(head, furDark, 0.09, 0.08, 0.16, 0, -0.03, -0.13);      // 吻部
  box(head, mat(0x101012), 0.05, 0.03, 0.03, 0, -0.005, -0.215); // 鼻
  box(head, mat(0xd8d2c0), 0.07, 0.018, 0.1, 0, -0.075, -0.13);  // 齜出的牙
  box(head, mat(0x201005), 0.028, 0.022, 0.015, -0.05, 0.045, -0.075); // 眼
  box(head, mat(0x201005), 0.028, 0.022, 0.015, 0.05, 0.045, -0.075);
  box(head, furDark, 0.04, 0.09, 0.03, -0.06, 0.1, 0.05, -0.3, 0, -0.2); // 耳
  box(head, furDark, 0.04, 0.09, 0.03, 0.06, 0.1, 0.05, -0.3, 0, 0.2);
  g.add(head);

  cyl(g, furDark, 0.02, 0.008, 0.3, 6, 0, 0.58, 0.46, -1.1);  // 下垂的尾

  const makeLeg = (x, z) => {
    const leg = new THREE.Group();
    leg.position.set(x, 0.42, z);
    box(leg, fur, 0.07, 0.22, 0.1, 0, -0.1, 0);               // 上段
    box(leg, furDark, 0.05, 0.24, 0.06, 0, -0.3, 0.01);       // 下段
    box(leg, furDark, 0.06, 0.04, 0.09, 0, -0.4, -0.02);      // 爪
    g.add(leg);
    return leg;
  };
  const legFL = makeLeg(-0.1, -0.28);
  const legFR = makeLeg(0.1, -0.28);
  const legBL = makeLeg(-0.09, 0.32);
  const legBR = makeLeg(0.09, 0.32);

  g.userData.parts = { legFL, legFR, legBL, legBR };
  g.userData.kind = 'dog';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// === 打字機（含桌） ===

export function buildTypewriterMesh() {
  const g = new THREE.Group();
  const woodMat = new THREE.MeshLambertMaterial({ map: getTexture('wood') });
  const bodyMat = mat(0x22262c);

  const desk = box(g, woodMat, 0.9, 0.05, 0.55, 0, 0.7, 0);   // 桌面
  void desk;
  for (const [lx, lz] of [[-0.4, -0.22], [0.4, -0.22], [-0.4, 0.22], [0.4, 0.22]]) {
    cyl(g, mat(0x3a2c1a), 0.025, 0.03, 0.68, 8, lx, 0.35, lz);
  }
  const tw = new THREE.Group();
  tw.position.y = 0.725;
  box(tw, bodyMat, 0.44, 0.1, 0.32, 0, 0.05, 0);              // 機身
  box(tw, mat(0x2c313a), 0.4, 0.06, 0.2, 0, 0.11, 0.03, 0.25); // 鍵盤斜面
  for (let row = 0; row < 3; row++) {
    for (let k = 0; k < 8; k++) {
      box(tw, mat(0x8f8a7c), 0.028, 0.012, 0.028, -0.14 + k * 0.04, 0.135 + row * 0.012, 0.1 - row * 0.05, 0.25);
    }
  }
  cyl(tw, mat(0x14161a), 0.035, 0.035, 0.4, 10, 0, 0.17, -0.1, 0, 0, Math.PI / 2); // 滾筒
  box(tw, mat(0x596068), 0.46, 0.015, 0.015, 0, 0.17, -0.055);                     // 導桿
  box(tw, mat(0xd8d2bc), 0.26, 0.2, 0.008, 0, 0.28, -0.115, -0.22);                // 紙
  g.add(tw);
  return g;
}

// === 拾取物（依道具類型給形狀，底部發光圈輔助辨識） ===

export function buildPickupMesh(itemType) {
  const g = new THREE.Group();

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.16, 0.22, 20),
    new THREE.MeshBasicMaterial({
      color: itemType === 'heal' ? 0x3f9f4f : itemType === 'weapon' ? 0x8fa5c0 : 0xc9a94f,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  g.add(ring);

  const item = new THREE.Group();
  item.position.y = 0.16;
  if (itemType === 'heal') {
    cyl(item, mat(0x4a3423), 0.07, 0.055, 0.09, 8, 0, -0.06, 0); // 陶盆
    const leaf = new THREE.MeshLambertMaterial({ color: 0x2f8f3f, side: THREE.DoubleSide });
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.2), leaf);
      p.position.y = 0.06;
      p.rotation.y = (i * Math.PI) / 3;
      item.add(p);
    }
  } else if (itemType === 'weapon') {
    box(item, mat(0x2b2f36), 0.05, 0.07, 0.24, 0, 0, 0);       // 機匣
    cyl(item, mat(0x596068), 0.014, 0.014, 0.2, 8, 0, 0.02, -0.18, Math.PI / 2); // 槍管
    box(item, mat(0x5a4028), 0.045, 0.1, 0.05, 0, -0.07, 0.08, 0.3); // 握把
    item.rotation.z = -0.35;                                   // 斜放地上
    item.position.y = 0.1;
  } else {
    // 彈藥盒
    box(item, mat(0x4a4a34), 0.2, 0.1, 0.13, 0, -0.02, 0);
    box(item, mat(0x5c5c42), 0.205, 0.03, 0.135, 0, 0.045, 0); // 盒蓋
    box(item, mat(0xc9b06a), 0.12, 0.05, 0.01, 0, -0.02, -0.068); // 標籤
    for (let i = 0; i < 3; i++) cyl(item, mat(0xb08c3c), 0.012, 0.012, 0.05, 6, -0.04 + i * 0.04, 0.085, 0);
  }
  g.add(item);
  g.userData.spin = item; // 只旋轉物件本體，光圈不動
  return g;
}
