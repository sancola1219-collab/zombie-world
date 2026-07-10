// 程序 3D 模型工廠：武器視角模型、敵人、打字機、拾取物。
// 全部程式生成（多零件低多邊形），供 renderer 使用；外部 .glb 存在時由 models.js 熱替換。
import * as THREE from 'three';
import { getTexture } from './textures.js';

// === 小工具 ===

const mat = (color) => new THREE.MeshLambertMaterial({ color });

// === 寫實怪物材質（逐像素 Phong＋程序貼圖）===
// 貼圖底色約 0.77 灰，會把材質色壓暗——×1.3 補償回原亮度，builder 內色票不用改。
// dithering 消除暗部色階斷層；bumpMap 讓手電筒下的皮膚有真實起伏。

// 腐肉皮膚：斑駁腐塊＋血管網＋微濕反光
const fleshMat = (color) =>
  new THREE.MeshPhongMaterial({
    color: new THREE.Color(color).multiplyScalar(1.3),
    map: getTexture('flesh'),
    bumpMap: getTexture('fleshbump'),
    bumpScale: 0.25,
    specular: 0x1e1a18,
    shininess: 12,
    dithering: true,
  });

// 濕潤組織：外露肌肉/傷口/膿瘤——高光強＝濕黏感
const wetMat = (color) =>
  new THREE.MeshPhongMaterial({
    color: new THREE.Color(color).multiplyScalar(1.3),
    map: getTexture('flesh'),
    bumpMap: getTexture('fleshbump'),
    bumpScale: 0.35,
    specular: 0x66524a,
    shininess: 44,
    dithering: true,
  });

// 破布衣物：織紋＋髒污
const ragMat = (color) =>
  new THREE.MeshLambertMaterial({
    color: new THREE.Color(color).multiplyScalar(1.3),
    map: getTexture('rag'),
    dithering: true,
  });

// 甲殼/聚合體：硬質油亮表面（蛛殼、原體）
const sheenMat = (color, spec = 0x3a3f46, shin = 55) =>
  new THREE.MeshPhongMaterial({
    color,
    bumpMap: getTexture('fleshbump'),
    bumpScale: 0.12,
    specular: spec,
    shininess: shin,
    dithering: true,
  });

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

// 膠囊體（沿 Y 軸），四肢軀幹的圓潤基元
function cap(parent, material, r, len, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10), material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
}

// 橢球（縮放球體），顱骨/軀幹/斑塊用
function blob(parent, material, r, sx, sy, sz, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), material);
  m.scale.set(sx, sy, sz);
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
  } else if (id === 'katana') {
    const blade = mat(0xb8c0cc);
    // 微彎刀身：三段直片略轉角度近似弧線
    box(g, blade, 0.008, 0.035, 0.24, 0, 0.005, -0.14, 0.03);
    box(g, blade, 0.008, 0.032, 0.2, 0, 0.022, -0.34, 0.09);
    box(g, blade, 0.008, 0.026, 0.14, 0, 0.047, -0.49, 0.16);
    box(g, mat(0xe0e6ee), 0.004, 0.008, 0.55, 0, -0.008, -0.27, 0.08); // 開鋒亮線
    cyl(g, mat(0x8a7a45), 0.032, 0.032, 0.008, 12, 0, 0, 0.005, Math.PI / 2); // 圓鍔
    const hilt = cyl(g, mat(0x1c1e26), 0.014, 0.015, 0.16, 8, 0, -0.01, 0.09, Math.PI / 2 - 0.1);
    for (let i = 0; i < 4; i++) {
      cyl(hilt, mat(0x3d4450), 0.0148, 0.0148, 0.006, 8, 0, -0.06 + i * 0.036, 0); // 柄卷
    }
  } else if (id === 'smg') {
    box(g, dark, 0.045, 0.06, 0.2, 0, 0, 0.02);                // 機匣
    cyl(g, steel, 0.011, 0.011, 0.14, 8, 0, 0.012, -0.15, Math.PI / 2); // 短槍管
    box(g, dark, 0.03, 0.016, 0.1, 0, 0.012, -0.1);            // 護木
    box(g, mat(0x2b2f36), 0.028, 0.14, 0.05, 0, -0.1, 0.03, 0.12); // 長彈匣
    box(g, dark, 0.036, 0.1, 0.05, 0, -0.075, 0.09, 0.3);      // 握把
    box(g, steel, 0.012, 0.012, 0.16, 0, 0.02, 0.16);          // 摺疊托桿
    box(g, steel, 0.036, 0.05, 0.014, 0, -0.005, 0.24);        // 托底
    box(g, dark, 0.008, 0.014, 0.01, 0, 0.048, -0.2);          // 準星
    box(g, steel, 0.006, 0.02, 0.006, 0, -0.03, 0.045, 0.2);   // 扳機
  } else if (id === 'flamethrower') {
    cyl(g, steel, 0.016, 0.016, 0.42, 10, 0, 0.02, -0.16, Math.PI / 2);  // 噴管
    cyl(g, dark, 0.013, 0.013, 0.42, 8, 0, -0.014, -0.16, Math.PI / 2);  // 供油管
    cyl(g, mat(0x7a2a1a), 0.02, 0.026, 0.05, 10, 0, 0.02, -0.39, Math.PI / 2); // 點火嘴
    box(g, mat(0xffb84a), 0.008, 0.008, 0.012, 0, 0.004, -0.415);        // 常燃小火
    cyl(g, mat(0x5a3c1e), 0.045, 0.045, 0.16, 12, 0, -0.06, 0.1, Math.PI / 2); // 燃料罐
    box(g, mat(0x3a3f48), 0.05, 0.03, 0.1, 0, 0.03, 0.08);     // 閥座
    box(g, dark, 0.036, 0.09, 0.05, 0, -0.07, 0.16, 0.3);      // 握把
    box(g, steel, 0.006, 0.02, 0.006, 0, -0.028, 0.12, 0.2);   // 扳機
  } else if (id === 'rocket') {
    cyl(g, mat(0x3d4034), 0.045, 0.045, 0.62, 12, 0, 0.03, -0.05, Math.PI / 2); // 發射管
    cyl(g, mat(0x23261e), 0.048, 0.052, 0.06, 12, 0, 0.03, -0.37, Math.PI / 2); // 前喇叭口
    cyl(g, mat(0x23261e), 0.052, 0.048, 0.06, 12, 0, 0.03, 0.27, Math.PI / 2);  // 後噴口
    box(g, mat(0x8a2a1a), 0.02, 0.02, 0.04, 0, 0.03, -0.33);   // 彈頭尖（膛內可見）
    box(g, dark, 0.02, 0.05, 0.06, 0, 0.09, 0.02);             // 瞄具座
    box(g, steel, 0.014, 0.03, 0.05, 0, 0.125, 0.02);          // 瞄具
    box(g, dark, 0.036, 0.09, 0.05, 0, -0.055, 0.06, 0.25);    // 握把
    box(g, dark, 0.036, 0.07, 0.04, 0, -0.045, -0.12, 0.15);   // 前握把
    box(g, steel, 0.006, 0.02, 0.006, 0, -0.02, 0.03, 0.2);    // 扳機
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

// === 殭屍（高約 1.68，原點在腳底，面向 -z）===
// v3 全膠囊/橢球建模：圓潤人體、腐斑、頸部咬傷、露肋、鼓脹腹部、破衣赤足。

export function buildZombieMesh() {
  const g = new THREE.Group();
  const skin = fleshMat(0x93987f);
  const skinShade = fleshMat(0x767c66);
  const rot = wetMat(0x565c48);
  const bone = mat(0xcfc9b8);
  const blood = wetMat(0x3c0d0d);
  const shirt = ragMat(0x3b4350);
  const shirtDark = ragMat(0x303844);
  const pants = ragMat(0x2f2b27);
  const eyeDark = mat(0x121216);
  const hair = mat(0x2a2620);

  // --- 左腿（完整褲管） ---
  const legL = new THREE.Group();
  legL.position.set(-0.11, 0.86, 0);
  legL.rotation.y = 0.14; // 外八
  cap(legL, pants, 0.062, 0.26, 0, -0.16, 0, -0.06);          // 大腿
  blob(legL, pants, 0.055, 1, 0.8, 1, 0, -0.34, 0.01);         // 膝
  cap(legL, pants, 0.05, 0.26, 0, -0.55, 0.03, 0.17);          // 小腿
  blob(legL, skinShade, 0.05, 1.1, 0.5, 2.1, 0, -0.83, -0.05); // 赤足
  blob(legL, skin, 0.028, 1.4, 0.5, 1, 0, -0.85, -0.15);       // 趾
  g.add(legL);

  // --- 右腿（褲管撕裂露小腿） ---
  const legR = new THREE.Group();
  legR.position.set(0.11, 0.86, 0);
  legR.rotation.y = -0.1;
  cap(legR, pants, 0.062, 0.2, 0, -0.13, 0, -0.06);
  box(legR, pants, 0.05, 0.07, 0.02, -0.03, -0.26, -0.05, 0, 0, 0.3);  // 破褲襬
  box(legR, pants, 0.045, 0.06, 0.02, 0.035, -0.25, 0.045, 0, 0, -0.25);
  blob(legR, skin, 0.052, 1, 0.8, 1, 0, -0.33, 0.01);          // 膝（露膚）
  cap(legR, skin, 0.046, 0.26, 0, -0.55, 0.03, 0.17);          // 小腿（露膚）
  blob(legR, rot, 0.03, 1.2, 1.6, 0.5, 0.02, -0.55, -0.075);   // 小腿腐斑
  blob(legR, skinShade, 0.05, 1.1, 0.5, 2.1, 0, -0.83, -0.05);
  blob(legR, skin, 0.028, 1.4, 0.5, 1, 0, -0.85, -0.15);
  g.add(legR);

  // --- 軀幹 ---
  const torso = new THREE.Group();
  torso.position.y = 0.86;
  torso.rotation.x = 0.28;                                     // 前傾
  torso.rotation.z = 0.05;                                     // 微側傾
  blob(torso, pants, 0.1, 1.7, 1.0, 1.2, 0, 0.02, 0);          // 骨盆
  blob(torso, skin, 0.11, 1.5, 1.25, 1.2, 0, 0.22, -0.045);    // 鼓脹的腹（從破衣下露出）
  blob(torso, rot, 0.045, 1.4, 1, 0.5, 0.05, 0.24, -0.155);    // 腹部腐斑
  blob(torso, shirt, 0.12, 1.75, 1.5, 1.15, 0, 0.47, 0);       // 胸膛（襯衫）
  // 破爛衣襬
  box(torso, shirtDark, 0.1, 0.1, 0.015, -0.13, 0.3, -0.115, 0.1, 0, 0.35);
  box(torso, shirt, 0.08, 0.09, 0.015, 0.02, 0.28, -0.125, 0.1, 0, -0.15);
  box(torso, shirtDark, 0.09, 0.08, 0.015, 0.15, 0.31, -0.1, 0.1, 0, 0.2);
  blob(torso, shirt, 0.075, 1, 0.85, 1, -0.235, 0.62, 0);      // 肩
  blob(torso, shirtDark, 0.075, 1, 0.85, 1, 0.24, 0.585, 0.01); // 垂肩
  cap(torso, skin, 0.048, 0.05, 0.01, 0.72, -0.02, 0.15);      // 頸
  // 頸側咬傷＋血streak
  blob(torso, blood, 0.05, 1, 0.8, 0.8, 0.1, 0.67, -0.04);
  box(torso, blood, 0.05, 0.2, 0.012, 0.11, 0.5, -0.136, 0, 0, 0.12);
  // 左肋外露：暗色創口＋三根肋骨
  blob(torso, blood, 0.055, 1.2, 1.1, 0.5, -0.13, 0.4, -0.11);
  cap(torso, bone, 0.008, 0.07, -0.13, 0.35, -0.128, 0, 0, 1.35);
  cap(torso, bone, 0.008, 0.075, -0.13, 0.4, -0.132, 0, 0, 1.3);
  cap(torso, bone, 0.008, 0.07, -0.13, 0.45, -0.128, 0, 0, 1.25);

  // --- 頭 ---
  const head = new THREE.Group();
  head.position.set(0.015, 0.78, -0.05);
  head.rotation.z = 0.3;                                       // 歪頭
  head.rotation.x = 0.12;
  blob(head, skin, 0.095, 1.0, 1.18, 1.05, 0, 0.06, 0);        // 顱
  blob(head, skinShade, 0.075, 1.0, 0.9, 0.88, 0, 0.015, -0.045); // 面頰
  blob(head, hair, 0.09, 1.0, 0.55, 1.0, -0.01, 0.135, 0.015); // 稀疏頭髮
  blob(head, skin, 0.055, 1.3, 0.5, 1.0, 0.03, 0.15, -0.02);   // 禿斑
  blob(head, eyeDark, 0.02, 1.4, 1.1, 0.6, -0.04, 0.055, -0.085); // 眼窩
  blob(head, eyeDark, 0.02, 1.4, 1.1, 0.6, 0.04, 0.055, -0.085);
  blob(head, skinShade, 0.016, 1, 1.2, 1, 0, 0.02, -0.1);      // 塌鼻
  blob(head, skinShade, 0.05, 1.0, 0.55, 0.85, 0, -0.075, -0.045, 0.5); // 下垂張顎
  blob(head, eyeDark, 0.03, 1.2, 0.5, 0.7, 0, -0.045, -0.075); // 口腔陰影
  box(head, mat(0xb8b09a), 0.05, 0.012, 0.012, 0, -0.028, -0.088); // 上排牙
  blob(head, blood, 0.028, 1, 1.4, 0.5, -0.055, 0.09, -0.062); // 額側血痕
  torso.add(head);

  // --- 前伸的手臂（右） ---
  const armF = new THREE.Group();
  armF.position.set(-0.24, 0.6, -0.02);
  armF.rotation.x = 0.05;
  cap(armF, shirt, 0.052, 0.1, 0, 0, -0.07, Math.PI / 2);      // 破袖
  cap(armF, skin, 0.042, 0.17, 0, -0.01, -0.23, Math.PI / 2 + 0.06); // 上臂
  blob(armF, skin, 0.042, 1, 1, 1, 0, -0.025, -0.35);          // 肘
  cap(armF, skin, 0.037, 0.18, 0, -0.05, -0.47, Math.PI / 2 + 0.22); // 前臂
  blob(armF, rot, 0.028, 1.5, 0.6, 1.1, 0, -0.07, -0.45);      // 前臂腐斑
  blob(armF, skinShade, 0.035, 1, 0.55, 1.35, 0, -0.095, -0.6, 0.35); // 手掌
  cap(armF, skinShade, 0.007, 0.05, -0.025, -0.115, -0.655, 1.15);   // 手指（張抓）
  cap(armF, skinShade, 0.007, 0.05, -0.005, -0.12, -0.665, 1.25);
  cap(armF, skinShade, 0.007, 0.048, 0.015, -0.118, -0.66, 1.2);
  cap(armF, skinShade, 0.007, 0.042, 0.033, -0.11, -0.645, 1.05);
  torso.add(armF);

  // --- 垂盪的手臂（左） ---
  const armD = new THREE.Group();
  armD.position.set(0.245, 0.585, 0.01);
  armD.rotation.z = 0.12;
  cap(armD, shirtDark, 0.055, 0.09, 0, -0.05, 0);              // 破袖
  cap(armD, skin, 0.04, 0.17, 0, -0.22, 0.005, 0.06);          // 上臂
  blob(armD, skin, 0.038, 1, 1, 1, 0, -0.345, 0.015);          // 肘
  cap(armD, skin, 0.035, 0.18, 0.005, -0.475, 0.025, 0.1);     // 前臂
  box(armD, blood, 0.012, 0.11, 0.04, 0.038, -0.47, 0.025, 0, 0, 0.1); // 前臂撕裂傷
  blob(armD, skinShade, 0.034, 1, 1.3, 0.6, 0.01, -0.615, 0.04); // 垂手
  cap(armD, skinShade, 0.0065, 0.04, 0.0, -0.67, 0.045, 0.25);
  cap(armD, skinShade, 0.0065, 0.04, 0.02, -0.665, 0.04, 0.2);
  cap(armD, skinShade, 0.0065, 0.036, -0.02, -0.665, 0.045, 0.3);
  torso.add(armD);

  g.add(torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'zombie';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// === 殭屍犬（面向 -z） ===

export function buildDogMesh() {
  const g = new THREE.Group();
  const fur = fleshMat(0x4e3c2e); // 疥癬斑駁的皮毛
  const furDark = fleshMat(0x382b20);
  const blood = wetMat(0x481010);

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

// === 五種變異體（皆為原創設計，程序生成） ===

// 獵痕者：蛙型獵殺生物——蹲伏、大腿粗壯、前爪
export function buildHunterMesh() {
  const g = new THREE.Group();
  const hide = fleshMat(0x4a6a3c);
  const hideDark = fleshMat(0x38512c);
  const claw = mat(0xd8d2b8);
  const eyeShine = new THREE.MeshBasicMaterial({ color: 0x9a8428 }); // 黑暗中反光的獸瞳
  blob(g, hide, 0.16, 1.4, 1.1, 1.5, 0, 0.72, 0.05, 0.5);      // 前傾軀幹
  blob(g, hideDark, 0.1, 1.2, 1, 1.1, 0, 1.15, -0.18);          // 頭
  blob(g, eyeShine, 0.02, 1.4, 1, 0.6, -0.05, 1.18, -0.27); // 黃眼
  blob(g, eyeShine, 0.02, 1.4, 1, 0.6, 0.05, 1.18, -0.27);
  cap(g, hide, 0.09, 0.3, -0.24, 0.45, 0.12, 0.7);              // 蹲伏大腿
  cap(g, hide, 0.09, 0.3, 0.24, 0.45, 0.12, 0.7);
  cap(g, hideDark, 0.05, 0.28, -0.26, 0.2, -0.08, 1.5);         // 小腿前折
  cap(g, hideDark, 0.05, 0.28, 0.26, 0.2, -0.08, 1.5);
  cap(g, hide, 0.05, 0.3, -0.2, 0.85, -0.25, 1.2);              // 前伸臂
  cap(g, hide, 0.05, 0.3, 0.2, 0.85, -0.25, 1.2);
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      cap(g, claw, 0.012, 0.09, sx * (0.16 + i * 0.04), 0.62, -0.42 - i * 0.01, 1.3); // 爪
    }
  }
  g.userData.kind = 'hunter';
  return g;
}

// 潛伏者：無皮爬行者——低伏、外露肌理、長舌
export function buildLurkerMesh() {
  const g = new THREE.Group();
  const flesh = wetMat(0x8a3028);      // 無皮＝濕亮的外露肌肉
  const fleshDark = wetMat(0x5e1e18);
  const bone = mat(0xcfc9b8);
  blob(g, flesh, 0.14, 1.9, 0.85, 1.3, 0, 0.42, 0.05);          // 低伏軀幹
  blob(g, fleshDark, 0.09, 1, 0.9, 1.1, 0, 0.5, -0.3);          // 頭
  blob(g, wetMat(0xd8b0b0), 0.06, 1.2, 0.7, 1, 0, 0.62, -0.28);    // 外露腦
  cap(g, wetMat(0xb05a6a), 0.018, 0.5, 0, 0.42, -0.62, 1.35);      // 垂出的長舌
  for (const [sx, sz] of [[-0.22, -0.15], [0.22, -0.15], [-0.2, 0.28], [0.2, 0.28]]) {
    cap(g, flesh, 0.045, 0.3, sx, 0.28, sz, 0.3, 0, sx > 0 ? -0.9 : 0.9); // 攤開的四肢
    blob(g, bone, 0.02, 1, 0.6, 1.4, sx * 1.5, 0.08, sz);       // 爪端
  }
  g.userData.kind = 'lurker';
  return g;
}

// 巨蛛：腹部渾圓、八足、多眼
export function buildSpiderMesh() {
  const g = new THREE.Group();
  const chitin = sheenMat(0x2e2620);   // 油亮甲殼
  const chitinDark = sheenMat(0x1e1814);
  blob(g, chitin, 0.3, 1.1, 0.9, 1.25, 0, 0.5, 0.28);           // 腹
  blob(g, fleshMat(0x4a3626), 0.06, 1, 0.7, 2.2, 0, 0.72, 0.28);     // 腹紋
  blob(g, chitinDark, 0.16, 1.1, 0.8, 1, 0, 0.42, -0.22);       // 頭胸
  const eyeShine = new THREE.MeshBasicMaterial({ color: 0x8a1010 }); // 黑暗中發亮的眼列
  for (let i = 0; i < 4; i++) {
    blob(g, eyeShine, 0.016, 1, 1, 0.6, -0.09 + i * 0.06, 0.5, -0.36); // 眼列
  }
  cap(g, chitinDark, 0.02, 0.14, -0.06, 0.3, -0.4, 1.1);        // 螯肢
  cap(g, chitinDark, 0.02, 0.14, 0.06, 0.3, -0.4, 1.1);
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = -0.28 + i * 0.18;
      cap(g, chitin, 0.022, 0.42, sx * 0.42, 0.5, z, 0, 0, sx * 1.1);  // 上段外張
      cap(g, chitinDark, 0.016, 0.36, sx * 0.68, 0.22, z, 0, 0, sx * 0.35); // 下段觸地
    }
  }
  g.userData.kind = 'spider';
  return g;
}

// 蔓噬花：食人巨花——根丘、莖、花苞頭、外翻花瓣、觸蔓
export function buildCreeperMesh() {
  const g = new THREE.Group();
  const vine = fleshMat(0x3c5a2e);
  const vineDark = fleshMat(0x2a4020);
  const petal = fleshMat(0x7a2848);
  const maw = wetMat(0x481018);       // 濕亮的口腔
  blob(g, vineDark, 0.4, 1.3, 0.5, 1.3, 0, 0.16, 0);            // 根丘
  cyl(g, vine, 0.1, 0.16, 0.9, 8, 0, 0.7, 0);                   // 主莖
  blob(g, maw, 0.22, 1, 1.15, 1, 0, 1.45, 0);                   // 花苞頭（口）
  box(g, mat(0xd8d2b8), 0.2, 0.02, 0.02, 0, 1.38, -0.19, 0.3);  // 齒列
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    blob(g, petal, 0.16, 0.6, 1.6, 0.25, Math.cos(a) * 0.24, 1.42, Math.sin(a) * 0.24, Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9); // 外翻花瓣
  }
  cap(g, vine, 0.035, 0.5, -0.4, 0.5, -0.15, 0.5, 0, 0.9);      // 觸蔓
  cap(g, vine, 0.035, 0.45, 0.42, 0.45, 0.1, 0.4, 0, -0.8);
  cap(g, vineDark, 0.03, 0.4, 0.1, 0.4, 0.42, -0.7, 0, 0.2);
  g.userData.kind = 'creeper';
  return g;
}

// 脹屍：鼓脹欲裂的軀體、病變膿瘤
export function buildBloaterMesh() {
  const g = new THREE.Group();
  const skin = fleshMat(0x7a8060);
  const bloat = fleshMat(0x8a9058);
  const tumor = wetMat(0xa8b040);     // 繃緊發亮的膿瘤
  const dark = fleshMat(0x50563c);
  cap(g, dark, 0.09, 0.35, -0.12, 0.4, 0, 0, 0, -0.1);          // 短腿
  cap(g, dark, 0.09, 0.35, 0.12, 0.4, 0, 0, 0, 0.1);
  blob(g, bloat, 0.34, 1.15, 1.2, 1.05, 0, 0.95, 0);            // 鼓脹軀體
  blob(g, tumor, 0.09, 1, 0.85, 0.9, -0.24, 1.05, -0.2);        // 膿瘤
  blob(g, tumor, 0.07, 1, 1, 0.8, 0.26, 0.8, -0.18);
  blob(g, tumor, 0.06, 1.2, 0.8, 0.8, 0.05, 1.25, -0.26);
  blob(g, skin, 0.09, 1, 0.95, 1, 0, 1.5, -0.05);               // 陷進肩膀的頭
  blob(g, mat(0x14140f), 0.018, 1.3, 1, 0.6, -0.035, 1.52, -0.135); // 眼
  blob(g, mat(0x14140f), 0.018, 1.3, 1, 0.6, 0.035, 1.52, -0.135);
  cap(g, skin, 0.05, 0.28, -0.36, 1.0, 0, 0, 0, 0.5);           // 短臂
  cap(g, skin, 0.05, 0.28, 0.37, 1.0, 0, 0, 0, -0.5);
  g.userData.kind = 'bloater';
  return g;
}

// 晨星清除小組（1.78m）：黑西裝/防護裝、墨鏡、持手槍前伸的射擊姿態
export function buildAgentMesh() {
  const g = new THREE.Group();
  const suit = ragMat(0x191b22);
  const suitLight = ragMat(0x262a33);
  const skin = fleshMat(0xc4b4a0);
  const shade = mat(0x0a0a0e);
  const steel = sheenMat(0x33363c, 0x50565e, 35);

  // 腿（西裝褲）
  const legL = new THREE.Group();
  legL.position.set(-0.11, 0.88, 0);
  cap(legL, suit, 0.062, 0.28, 0, -0.17, 0, -0.03);
  cap(legL, suit, 0.052, 0.28, 0, -0.56, 0.02, 0.05);
  blob(legL, shade, 0.05, 1.1, 0.5, 2.0, 0, -0.82, -0.04); // 皮鞋
  g.add(legL);
  const legR = new THREE.Group();
  legR.position.set(0.11, 0.88, 0);
  cap(legR, suit, 0.062, 0.28, 0, -0.17, 0, -0.03);
  cap(legR, suit, 0.052, 0.28, 0, -0.56, 0.02, 0.05);
  blob(legR, shade, 0.05, 1.1, 0.5, 2.0, 0, -0.82, -0.04);
  g.add(legR);

  // 軀幹（挺直的西裝外套）
  const torso = new THREE.Group();
  torso.position.y = 0.86;
  torso.rotation.x = 0.04;
  blob(torso, suit, 0.1, 1.6, 1.0, 1.1, 0, 0.05, 0);
  blob(torso, suit, 0.12, 1.55, 1.5, 1.1, 0, 0.5, 0);
  box(torso, shade, 0.04, 0.5, 0.11, 0, 0.4, -0.11);       // 領帶/拉鍊
  blob(torso, suitLight, 0.07, 1, 0.85, 1, -0.23, 0.62, 0); // 肩
  blob(torso, suitLight, 0.07, 1, 0.85, 1, 0.23, 0.62, 0);
  cap(torso, skin, 0.045, 0.05, 0, 0.72, -0.02, 0.15);      // 頸

  // 頭（蒼白、墨鏡）
  const head = new THREE.Group();
  head.position.set(0, 0.8, -0.03);
  blob(head, skin, 0.092, 1.0, 1.15, 1.02, 0, 0.05, 0);
  blob(head, mat(0x14140f), 0.08, 1.0, 0.4, 1.0, 0, 0.14, 0.01); // 短髮
  box(head, shade, 0.14, 0.035, 0.02, 0, 0.04, -0.088);         // 墨鏡
  torso.add(head);

  // 左臂（扶槍）
  const armL = new THREE.Group();
  armL.position.set(-0.22, 0.6, -0.02);
  armL.rotation.x = 0.2;
  cap(armL, suit, 0.05, 0.18, 0, -0.02, -0.18, Math.PI / 2 + 0.1);
  cap(armL, suit, 0.042, 0.16, 0, -0.05, -0.36, Math.PI / 2 + 0.35);
  blob(armL, skin, 0.035, 1, 0.6, 1.2, 0.06, -0.11, -0.46, 0.4);
  torso.add(armL);

  // 右臂（持槍前伸——射擊姿態）
  const armR = new THREE.Group();
  armR.position.set(0.22, 0.6, -0.02);
  armR.rotation.x = 0.15;
  cap(armR, suit, 0.05, 0.18, 0, -0.01, -0.2, Math.PI / 2 + 0.05);
  cap(armR, suit, 0.042, 0.18, 0, -0.02, -0.42, Math.PI / 2);
  blob(armR, skin, 0.035, 1, 0.6, 1.2, 0, -0.03, -0.56, 0.15); // 手
  // 手槍
  box(armR, steel, 0.032, 0.05, 0.14, 0, -0.02, -0.66);
  box(armR, shade, 0.028, 0.06, 0.045, 0, -0.06, -0.62, 0.3);  // 握把
  cap(armR, steel, 0.008, 0.02, 0, 0, -0.74, Math.PI / 2);     // 槍管
  torso.add(armR);

  g.add(torso);
  g.userData.parts = { legL, legR, armF: armR, armD: armL, torso };
  g.userData.kind = 'agent';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// KY 變異體：初代感染者（1.75m）——還有人形，但右臂黑色壞死腫脹、
// 皮膚裂縫滲出 KY 藍光、歪頭血口、針孔瞳。感染早期的駭人，不是腐爛的殭屍。
export function buildMutantMesh() {
  const g = new THREE.Group();
  const skin = fleshMat(0xb8a488);        // 病態蒼白膚
  const skinShade = fleshMat(0x9a8670);
  const necro = wetMat(0x2a1c22);       // 黑紫壞死（濕亮）
  const necroMid = wetMat(0x4a2c34);
  const cloth = ragMat(0x3b4550);       // 撕裂工作服（灰藍）
  const clothDark = ragMat(0x2c333c);
  const blood = wetMat(0x4a0d0d);
  const glow = new THREE.MeshBasicMaterial({ color: 0x4ad9c4 }); // KY 藍綠光裂縫
  const eye = mat(0x0c0c10);

  // 腿（撕裂褲管）
  const legL = new THREE.Group();
  legL.position.set(-0.11, 0.86, 0);
  cap(legL, cloth, 0.062, 0.26, 0, -0.16, 0, -0.05);
  cap(legL, cloth, 0.05, 0.24, 0, -0.54, 0.03, 0.16);
  blob(legL, skinShade, 0.05, 1.1, 0.5, 2.1, 0, -0.8, -0.04);
  g.add(legL);
  const legR = new THREE.Group();
  legR.position.set(0.11, 0.86, 0);
  cap(legR, clothDark, 0.062, 0.26, 0, -0.16, 0, -0.05);
  cap(legR, skin, 0.048, 0.24, 0, -0.54, 0.03, 0.16); // 露膚小腿
  blob(legR, glow, 0.02, 1, 2, 0.6, 0.02, -0.5, -0.06); // 小腿藍光裂縫
  blob(legR, skinShade, 0.05, 1.1, 0.5, 2.1, 0, -0.8, -0.04);
  g.add(legR);

  // 軀幹（前傾攻擊姿態、撕裂工作服）
  const torso = new THREE.Group();
  torso.position.y = 0.82;
  torso.rotation.x = 0.22;
  blob(torso, clothDark, 0.1, 1.7, 1.0, 1.2, 0, 0.04, 0);
  blob(torso, cloth, 0.12, 1.7, 1.5, 1.15, 0, 0.5, 0);
  blob(torso, skin, 0.06, 1.2, 1, 0.8, 0.04, 0.34, -0.11); // 撕裂處露出的腹
  blob(torso, glow, 0.02, 1, 2.4, 0.5, 0.02, 0.34, -0.155); // 胸腹藍光裂縫
  box(torso, cloth, 0.09, 0.1, 0.015, -0.13, 0.32, -0.12, 0.1, 0, 0.35); // 破布
  box(torso, clothDark, 0.08, 0.09, 0.015, 0.14, 0.34, -0.1, 0.1, 0, 0.2);
  blob(torso, cloth, 0.072, 1, 0.85, 1, -0.235, 0.62, 0);
  blob(torso, necroMid, 0.078, 1, 0.9, 1, 0.24, 0.6, 0.01); // 右肩已開始壞死
  cap(torso, skin, 0.048, 0.05, 0.01, 0.72, -0.02, 0.15);

  // 頭（歪向一邊、血口、針孔眼）
  const head = new THREE.Group();
  head.position.set(0.02, 0.78, -0.04);
  head.rotation.z = 0.34; // 歪頭
  head.rotation.x = 0.1;
  blob(head, skin, 0.095, 1.0, 1.16, 1.05, 0, 0.06, 0);
  blob(head, skinShade, 0.075, 1.0, 0.9, 0.88, 0, 0.01, -0.045);
  blob(head, mat(0x241c14), 0.088, 1.0, 0.5, 1.0, 0, 0.14, 0.01); // 亂髮
  blob(head, eye, 0.02, 1.5, 1.2, 0.5, -0.04, 0.06, -0.085);      // 眼白（大）
  blob(head, eye, 0.02, 1.5, 1.2, 0.5, 0.04, 0.06, -0.085);
  blob(head, mat(0x6a0808), 0.006, 1, 1, 1, -0.04, 0.06, -0.098);  // 針孔紅瞳
  blob(head, mat(0x6a0808), 0.006, 1, 1, 1, 0.04, 0.06, -0.098);
  blob(head, mat(0x5a1414), 0.05, 1.0, 0.6, 0.85, 0.01, -0.07, -0.05, 0.55); // 血口
  box(head, blood, 0.05, 0.11, 0.012, 0.06, -0.03, -0.09, 0, -0.2, 0.15); // 嘴角血
  torso.add(head);

  // 左臂（正常、緊繃前伸）
  const armL = new THREE.Group();
  armL.position.set(-0.24, 0.6, -0.02);
  armL.rotation.x = 0.1;
  cap(armL, cloth, 0.052, 0.1, 0, 0, -0.07, Math.PI / 2);
  cap(armL, skin, 0.042, 0.17, 0, -0.01, -0.23, Math.PI / 2 + 0.06);
  cap(armL, skin, 0.037, 0.18, 0, -0.05, -0.42, Math.PI / 2 + 0.2);
  blob(armL, skinShade, 0.035, 1, 0.55, 1.35, 0, -0.09, -0.55, 0.35);
  torso.add(armL);

  // 右臂（★ 黑色壞死、腫脹、藍光裂縫、爪化）
  const armR = new THREE.Group();
  armR.position.set(0.26, 0.6, -0.01);
  armR.rotation.x = 0.05;
  cap(armR, necroMid, 0.07, 0.12, 0, -0.02, -0.08, Math.PI / 2); // 腫脹上臂
  blob(armR, glow, 0.018, 1, 2.5, 0.5, 0, 0, -0.16);            // 藍光裂縫
  cap(armR, necro, 0.06, 0.2, 0, -0.03, -0.3, Math.PI / 2 + 0.1); // 前臂黑化
  blob(armR, glow, 0.016, 1, 2.2, 0.5, 0.01, -0.02, -0.4);
  blob(armR, necro, 0.06, 1, 0.6, 1.3, 0, -0.06, -0.56, 0.3);   // 腫大的手
  for (const fx of [-0.04, 0, 0.04]) {                          // 黑爪
    cap(armR, necro, 0.01, 0.07, fx, -0.08, -0.64, 1.15);
  }
  torso.add(armR);

  g.add(torso);
  g.userData.parts = { legL, legR, armF: armL, armD: armR, torso };
  g.userData.kind = 'mutant';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// 原體：吞噬 KY-02 後成形的聚合體巨物（2.6m）——黑色聚合體＋藍光脈絡＋外露核心
export function buildPrimeMesh() {
  const g = new THREE.Group();
  const mass = sheenMat(0x14161c, 0x3a4656, 70);      // 油亮的黑色聚合體
  const massLight = sheenMat(0x1e2230, 0x3a4656, 70);
  const glow = new THREE.MeshBasicMaterial({ color: 0x55eedd });
  const glowDim = new THREE.MeshBasicMaterial({ color: 0x2a8878 });

  blob(g, mass, 0.5, 1.5, 1.0, 1.2, 0, 0.5, 0);                // 底部拖行團塊
  blob(g, mass, 0.42, 1.3, 1.5, 1.1, 0, 1.2, 0);               // 軀幹主體
  blob(g, massLight, 0.3, 1.2, 1.3, 1, -0.3, 1.7, 0);          // 隆起的肩
  blob(g, massLight, 0.26, 1.1, 1.2, 1, 0.35, 1.6, 0.05);
  blob(g, mass, 0.2, 1, 1.2, 1, 0.05, 2.1, -0.05);             // 無面孔的頭部
  blob(g, glow, 0.13, 1, 1, 1, 0, 2.2, -0.12);                 // ★ 外露核心（弱點）
  cap(g, mass, 0.16, 0.5, -0.55, 1.3, -0.1, 0.3, 0, 0.9);      // 巨臂
  blob(g, massLight, 0.2, 1, 0.8, 1.4, -0.75, 0.85, -0.3);     // 巨掌
  cap(g, mass, 0.1, 0.4, 0.5, 1.2, 0, 0.2, 0, -0.7);           // 次臂
  // 藍光脈絡
  for (const [x, y, z] of [[-0.2, 1.4, -0.35], [0.25, 1.1, -0.32], [0, 0.7, -0.42], [-0.4, 1.8, -0.2], [0.1, 1.75, -0.28]]) {
    blob(g, glowDim, 0.03, 0.6, 2.2, 0.5, x, y, z);
  }
  // 吞入的容器殘片
  box(g, mat(0x3d4034), 0.16, 0.22, 0.05, 0.3, 0.6, -0.4, 0.4, 0.3);
  box(g, mat(0x3d4034), 0.14, 0.18, 0.05, -0.35, 0.4, -0.38, -0.3, 0.5);
  g.userData.kind = 'prime';
  return g;
}

// 聖時爆君（S-10 戰術適應體，約 2.9m）：灰黑膨脹肌肉＋青藍血管、破損戰術背心、
// 左臂工業夾爪、右肩扛火箭筒（晨星紅白標誌）、左眼藍白火焰瞳。靜態巨大剪影（無擺動）。
export function buildWarlordMesh() {
  const g = new THREE.Group();
  const flesh = fleshMat(0x3a3d42);      // 灰黑膨脹肌肉
  const fleshDark = fleshMat(0x24262b);
  const fleshMid = fleshMat(0x2f3238);
  const vest = ragMat(0x131418);       // 破損黑色戰術背心
  const vestStrap = ragMat(0x0c0d10);
  const steel = sheenMat(0x2c2f36, 0x50565e, 35);      // 火箭筒金屬
  const steelDark = sheenMat(0x181a1f, 0x40464e, 35);
  const red = mat(0xc02622);        // 晨星紅白標誌
  const white = mat(0xd6d6d0);
  const teeth = mat(0xcfc7b4);
  const vein = new THREE.MeshBasicMaterial({ color: 0x4a90d9 });  // 青藍血管光
  const eyeGlow = new THREE.MeshBasicMaterial({ color: 0xbfe0ff }); // 藍白火焰瞳
  const eyeHuman = mat(0x1a1712);

  // === 腿（粗壯膨脹） ===
  for (const sx of [-0.26, 0.26]) {
    const leg = new THREE.Group();
    leg.position.set(sx, 1.28, 0);
    cap(leg, flesh, 0.16, 0.44, 0, -0.28, 0.02, 0.04);        // 大腿
    cap(leg, fleshMid, 0.13, 0.44, 0, -0.78, 0.03, -0.02);    // 小腿
    blob(leg, vein, 0.03, 0.5, 2.2, 0.5, sx > 0 ? 0.1 : -0.1, -0.5, -0.1); // 血管
    blob(leg, fleshDark, 0.11, 1.2, 0.6, 1.9, 0, -1.08, -0.05); // 巨足
    box(leg, steelDark, 0.12, 0.14, 0.12, 0, -0.2, 0.02);     // 護膝殘片
    g.add(leg);
  }

  // === 軀幹（巨大寬肩、破戰術背心） ===
  const torso = new THREE.Group();
  torso.position.y = 1.28;
  blob(torso, flesh, 0.34, 1.7, 1.2, 1.15, 0, 0.42, 0);        // 下軀幹/腹
  blob(torso, fleshMid, 0.4, 1.9, 1.35, 1.1, 0, 0.95, 0);      // 巨大胸膛
  blob(torso, vein, 0.02, 1, 3.0, 0.6, -0.18, 0.9, -0.32);     // 胸口血管
  blob(torso, vein, 0.02, 1, 2.6, 0.6, 0.2, 0.7, -0.34);
  // 破損戰術背心（殘掛半邊）
  box(torso, vest, 0.5, 0.7, 0.18, 0, 0.9, -0.22, 0.05);
  box(torso, vestStrap, 0.09, 0.85, 0.06, -0.28, 0.85, -0.16, 0, 0, 0.25); // 斜背帶
  box(torso, vest, 0.22, 0.24, 0.1, 0.24, 1.05, -0.26);       // 殘破口袋塊
  // 寬肩（塞滿通道感）
  blob(torso, flesh, 0.24, 1.0, 0.95, 1.0, -0.62, 1.35, 0);
  blob(torso, flesh, 0.26, 1.0, 0.95, 1.0, 0.64, 1.35, 0);
  cap(torso, fleshMid, 0.11, 0.14, 0, 1.5, -0.02, 0.2);        // 粗頸

  // === 頭（扭曲人形、突顎尖牙、左眼藍白火焰） ===
  const head = new THREE.Group();
  head.position.set(0, 1.62, -0.02);
  head.rotation.x = 0.05;
  blob(head, flesh, 0.19, 1.0, 1.1, 1.05, 0, 0.05, 0);
  blob(head, fleshDark, 0.12, 1.0, 0.5, 1.0, 0, 0.16, 0.02);   // 顱頂
  blob(head, fleshMid, 0.13, 1.3, 0.7, 0.9, 0, -0.12, -0.05, 0.3); // 突出下顎
  // 尖牙
  for (const tx of [-0.07, -0.025, 0.025, 0.07]) {
    cap(head, teeth, 0.014, 0.05, tx, -0.14, -0.13, Math.PI);
  }
  box(head, steelDark, 0.02, 0.02, 0.02, 0, 0, 0); // (占位避免空)
  blob(head, eyeHuman, 0.03, 1.1, 1.0, 0.6, 0.07, 0.05, -0.17); // 右眼（人類殘留）
  blob(head, eyeGlow, 0.045, 1.2, 1.1, 0.7, -0.075, 0.05, -0.17); // 左眼（藍白火焰，較大）
  blob(head, vein, 0.02, 1, 2.0, 0.5, -0.1, 0.14, -0.12);
  torso.add(head);

  // === 左臂（工業夾爪，異常巨大） ===
  const armL = new THREE.Group();
  armL.position.set(-0.66, 1.3, 0);
  armL.rotation.z = -0.15;
  cap(armL, flesh, 0.15, 0.4, 0, -0.24, 0, 0.08);              // 巨大上臂
  blob(armL, vein, 0.025, 0.6, 2.2, 0.6, 0.08, -0.24, -0.12);
  cap(armL, fleshMid, 0.14, 0.42, 0, -0.68, 0.02, -0.1);       // 前臂
  // 工業夾爪（兩片開合鉗）
  const claw = new THREE.Group();
  claw.position.set(0, -0.98, 0);
  blob(claw, steelDark, 0.14, 1.0, 0.9, 1.1, 0, 0, 0);         // 夾爪基座
  box(claw, steel, 0.08, 0.34, 0.1, -0.1, -0.2, 0, 0, 0, 0.35);  // 左鉗指
  box(claw, steel, 0.08, 0.34, 0.1, 0.1, -0.2, 0, 0, 0, -0.35); // 右鉗指
  cap(claw, red, 0.03, 0.12, 0, 0.06, 0, Math.PI / 2);         // 液壓管紅
  armL.add(claw);
  torso.add(armL);

  // === 右臂（扛火箭筒） ===
  const armR = new THREE.Group();
  armR.position.set(0.6, 1.34, 0);
  cap(armR, flesh, 0.14, 0.34, 0, -0.18, -0.06, 0.3);          // 上臂抬起
  cap(armR, fleshMid, 0.12, 0.3, 0.18, -0.32, -0.28, 0.7);     // 前臂前伸握把
  blob(armR, fleshDark, 0.09, 1, 0.8, 1.2, 0.32, -0.42, -0.4); // 手
  // 火箭筒（扛在肩上，斜指前方）
  const launcher = new THREE.Group();
  launcher.position.set(0.16, 0.02, -0.18);
  launcher.rotation.set(0.12, 0.18, 0);
  cyl(launcher, steel, 0.11, 0.11, 1.05, 12, 0, 0, -0.2, Math.PI / 2); // 主管
  cyl(launcher, steelDark, 0.135, 0.135, 0.12, 12, 0, 0, -0.72, Math.PI / 2); // 前口擴張
  cyl(launcher, steelDark, 0.13, 0.13, 0.14, 12, 0, 0, 0.34, Math.PI / 2);    // 後噴口
  box(launcher, steel, 0.05, 0.16, 0.14, 0, -0.15, 0.02);     // 握把
  box(launcher, steelDark, 0.04, 0.1, 0.18, 0, 0.13, -0.05);  // 瞄具
  // 晨星紅白標誌（紅底白條）
  cyl(launcher, red, 0.113, 0.113, 0.2, 12, 0, 0, -0.35, Math.PI / 2);
  box(launcher, white, 0.03, 0.16, 0.04, 0.1, 0, -0.35, Math.PI / 2, 0, 0);
  armR.add(launcher);
  torso.add(armR);

  g.add(torso);
  g.userData.kind = 'warlord'; // 不設 parts：維持巨大靜態剪影（暴君式壓迫）
  return g;
}

// 鐵面・鎮暴隊長（1.9m）：金屬面罩＋鎮暴盾左臂＋警棍右手＋黑色鎮暴裝
export function buildIronmaskMesh() {
  const g = new THREE.Group();
  const armor = mat(0x1c1e24);      // 鎮暴裝
  const armorHi = mat(0x2a2d36);
  const metal = mat(0x4a4e56);      // 面罩/盾
  const metalDark = mat(0x33363c);
  const flesh = mat(0x8a7a68);      // 裂縫露出的病變皮膚
  const vein = new THREE.MeshBasicMaterial({ color: 0x4a90d9 });

  // 腿（護具）
  const legL = new THREE.Group();
  legL.position.set(-0.13, 0.92, 0);
  cap(legL, armor, 0.075, 0.3, 0, -0.18, 0, -0.04);
  cap(legL, armorHi, 0.06, 0.28, 0, -0.58, 0.02, 0.06);
  blob(legL, metalDark, 0.055, 1.1, 0.5, 2.0, 0, -0.86, -0.04); // 戰鬥靴
  g.add(legL);
  const legR = new THREE.Group();
  legR.position.set(0.13, 0.92, 0);
  cap(legR, armor, 0.075, 0.3, 0, -0.18, 0, -0.04);
  cap(legR, armorHi, 0.06, 0.28, 0, -0.58, 0.02, 0.06);
  blob(legR, metalDark, 0.055, 1.1, 0.5, 2.0, 0, -0.86, -0.04);
  g.add(legR);

  // 軀幹（防彈背心+肩甲）
  const torso = new THREE.Group();
  torso.position.y = 0.9;
  blob(torso, armor, 0.12, 1.6, 1.05, 1.15, 0, 0.05, 0);
  blob(torso, armorHi, 0.14, 1.6, 1.5, 1.15, 0, 0.5, 0);
  box(torso, metalDark, 0.34, 0.4, 0.1, 0, 0.5, -0.14);       // 胸甲板
  blob(torso, metal, 0.085, 1, 0.9, 1, -0.26, 0.66, 0);        // 金屬肩甲
  blob(torso, metal, 0.085, 1, 0.9, 1, 0.26, 0.66, 0);
  blob(torso, flesh, 0.04, 1, 1.6, 0.6, 0.1, 0.28, -0.13);     // 背心裂縫露肉
  blob(torso, vein, 0.014, 1, 2.0, 0.5, 0.1, 0.28, -0.145);

  // 頭（全罩金屬面罩、一道裂縫透藍光）
  const head = new THREE.Group();
  head.position.set(0, 0.84, -0.02);
  blob(head, metal, 0.1, 1.0, 1.15, 1.05, 0, 0.05, 0);
  box(head, metalDark, 0.16, 0.045, 0.02, 0, 0.05, -0.1);      // 面罩視窗縫
  blob(head, vein, 0.012, 1, 1.8, 0.5, -0.05, 0.02, -0.098);   // 裂縫藍光
  torso.add(head);

  // 左臂（鎮暴盾）
  const armD = new THREE.Group();
  armD.position.set(-0.28, 0.62, -0.02);
  cap(armD, armor, 0.06, 0.2, 0, -0.03, -0.2, Math.PI / 2 + 0.15);
  const shield = new THREE.Group();
  shield.position.set(-0.14, -0.1, -0.34);
  box(shield, metal, 0.06, 1.15, 0.62, 0, 0, 0, 0, 0.15, 0);   // 盾面
  box(shield, metalDark, 0.04, 1.0, 0.5, -0.05, 0, 0, 0, 0.15, 0);
  armD.add(shield);
  torso.add(armD);

  // 右臂（警棍）
  const armF = new THREE.Group();
  armF.position.set(0.28, 0.62, -0.02);
  cap(armF, armor, 0.06, 0.2, 0, -0.02, -0.2, Math.PI / 2 + 0.1);
  cap(armF, flesh, 0.045, 0.16, 0, -0.05, -0.4, Math.PI / 2 + 0.3);
  cap(armF, metalDark, 0.025, 0.3, 0.02, -0.12, -0.58, 1.2);   // 警棍
  torso.add(armF);

  g.add(torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'ironmask';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// 嘶吼者（1.8m 瘦長）：喉部與擴音喇叭融合、下顎撐裂、細長肢體
export function buildHowlerMesh() {
  const g = new THREE.Group();
  const skin = mat(0x9a8878);
  const skinDark = mat(0x6e5e50);
  const horn = mat(0x3a3f46);       // 金屬喇叭
  const hornDark = mat(0x24282e);
  const blood = mat(0x4a0d0d);
  const glow = new THREE.MeshBasicMaterial({ color: 0x4ad9c4 });

  // 細長腿
  const legL = new THREE.Group();
  legL.position.set(-0.1, 0.95, 0);
  cap(legL, skinDark, 0.05, 0.32, 0, -0.2, 0, -0.05);
  cap(legL, skin, 0.04, 0.3, 0, -0.62, 0.03, 0.1);
  g.add(legL);
  const legR = new THREE.Group();
  legR.position.set(0.1, 0.95, 0);
  cap(legR, skinDark, 0.05, 0.32, 0, -0.2, 0, -0.05);
  cap(legR, skin, 0.04, 0.3, 0, -0.62, 0.03, 0.1);
  g.add(legR);

  // 瘦削軀幹（肋骨浮凸、後仰嘶吼姿態）
  const torso = new THREE.Group();
  torso.position.y = 0.92;
  torso.rotation.x = -0.12; // 後仰
  blob(torso, skin, 0.09, 1.3, 1.5, 0.9, 0, 0.4, 0);
  for (let i = 0; i < 3; i++) blob(torso, skinDark, 0.05, 1.3, 0.16, 0.7, 0, 0.24 + i * 0.14, -0.055); // 肋
  blob(torso, glow, 0.014, 1, 2.2, 0.5, 0.03, 0.4, -0.085);

  // ★ 喉部喇叭（要害）：金屬擴音器從喉嚨裡長出來
  const throat = new THREE.Group();
  throat.position.set(0, 0.66, -0.1);
  cyl(throat, hornDark, 0.05, 0.09, 0.16, 8, 0, 0, -0.05, Math.PI / 2 + 0.5);
  cyl(throat, horn, 0.1, 0.14, 0.1, 8, 0, 0.04, -0.16, Math.PI / 2 + 0.5); // 喇叭口
  blob(throat, blood, 0.05, 1.2, 0.8, 0.8, 0, -0.03, 0.02);   // 融合處血肉
  torso.add(throat);

  // 頭（下顎撐裂大張）
  const head = new THREE.Group();
  head.position.set(0, 0.86, -0.02);
  head.rotation.x = -0.35; // 仰頭嘶吼
  blob(head, skin, 0.085, 1.0, 1.1, 1.0, 0, 0.05, 0);
  blob(head, skinDark, 0.06, 1.2, 0.5, 0.9, 0, -0.08, -0.06, 0.7); // 撐裂下顎
  blob(head, blood, 0.045, 1.0, 0.5, 0.7, 0, -0.05, -0.07, 0.6);   // 口腔
  blob(head, mat(0x0c0c10), 0.016, 1.3, 1.1, 0.5, -0.035, 0.07, -0.075);
  blob(head, mat(0x0c0c10), 0.016, 1.3, 1.1, 0.5, 0.035, 0.07, -0.075);
  torso.add(head);

  // 細長臂（向外張開）
  const armF = new THREE.Group();
  armF.position.set(-0.2, 0.62, 0);
  armF.rotation.z = -0.5;
  cap(armF, skin, 0.035, 0.24, 0, -0.14, -0.06, Math.PI / 2 + 0.4);
  cap(armF, skinDark, 0.03, 0.22, 0, -0.34, -0.16, Math.PI / 2 + 0.6);
  torso.add(armF);
  const armD = new THREE.Group();
  armD.position.set(0.2, 0.62, 0);
  armD.rotation.z = 0.5;
  cap(armD, skin, 0.035, 0.24, 0, -0.14, -0.06, Math.PI / 2 + 0.4);
  cap(armD, skinDark, 0.03, 0.22, 0, -0.34, -0.16, Math.PI / 2 + 0.6);
  torso.add(armD);

  g.add(torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'howler';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// 裂嘴犬王（肩高 1.1m 巨犬）：嘴裂到耳後、背脊骨刺、KY 藍光裂縫——四足 parts 隨動畫擺動
export function buildDogkingMesh() {
  const g = new THREE.Group();
  const fur = mat(0x2e2a26);
  const furDark = mat(0x1e1b18);
  const flesh = mat(0x6a1414);
  const teeth = mat(0xcfc7b4);
  const bone = mat(0x8a8478);
  const glow = new THREE.MeshBasicMaterial({ color: 0x4ad9c4 });
  const eye = new THREE.MeshBasicMaterial({ color: 0xff3322 });

  // 軀幹
  blob(g, fur, 0.34, 1.9, 1.0, 1.05, 0, 0.72, 0.1);
  blob(g, furDark, 0.28, 1.4, 0.95, 1.0, 0, 0.78, 0.5);        // 後臀
  blob(g, glow, 0.02, 1, 2.2, 0.5, 0.2, 0.72, -0.1);           // 體側藍光裂縫
  // 背脊骨刺
  for (let i = 0; i < 5; i++) {
    cap(g, bone, 0.028, 0.12 + (2 - Math.abs(i - 2)) * 0.04, -0.4 + i * 0.25, 1.02, 0.15, Math.PI + 0.3 * (i - 2) * 0.2);
  }
  // 頭（裂嘴）
  const headG = new THREE.Group();
  headG.position.set(-0.62, 0.86, 0);
  blob(headG, fur, 0.2, 1.3, 1.0, 0.95, 0, 0, 0);
  blob(headG, furDark, 0.13, 1.6, 0.6, 0.8, -0.18, -0.08, 0);  // 吻部
  blob(headG, flesh, 0.1, 1.7, 0.35, 0.7, -0.2, -0.14, 0);     // ★ 裂到耳後的嘴
  for (const tx of [-0.3, -0.22, -0.14, -0.06]) {
    cap(headG, teeth, 0.012, 0.05, tx, -0.1, -0.08, Math.PI);
    cap(headG, teeth, 0.012, 0.05, tx, -0.18, -0.08, 0);
  }
  blob(headG, eye, 0.028, 1, 1, 1, -0.08, 0.1, -0.14);
  blob(headG, eye, 0.028, 1, 1, 1, -0.08, 0.1, 0.14);
  cap(headG, fur, 0.045, 0.1, 0.08, 0.2, -0.12, 0.4);          // 耳
  cap(headG, fur, 0.045, 0.1, 0.08, 0.2, 0.12, -0.4);
  g.add(headG);
  // 尾
  cap(g, furDark, 0.05, 0.3, 0.85, 0.9, 0, 0, 0, -0.9);

  // 四足（renderer 四足擺動動畫吃這些 parts 名）
  const mkLeg = (x, z) => {
    const leg = new THREE.Group();
    leg.position.set(x, 0.62, z);
    cap(leg, fur, 0.07, 0.26, 0, -0.16, 0, 0.06);
    cap(leg, furDark, 0.05, 0.22, 0, -0.44, 0.02, -0.08);
    blob(leg, furDark, 0.06, 1.3, 0.5, 1.5, 0, -0.58, -0.03);  // 爪
    g.add(leg);
    return leg;
  };
  const legFL = mkLeg(-0.42, -0.22);
  const legFR = mkLeg(-0.42, 0.22);
  const legBL = mkLeg(0.45, -0.22);
  const legBR = mkLeg(0.45, 0.22);

  g.userData.parts = { legFL, legFR, legBL, legBR };
  g.userData.kind = 'dogking';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// 電氣室守門者（第一章魔王，約 1.9m）：原 E 區值班技術員——
// 右半身被電弧燒焦碳化、背上插著斷裂電纜（尖端帶電火花）、右臂帶電藍光裂縫。
export function buildKeeperMesh() {
  const g = new THREE.Group();
  const skin = fleshMat(0xa89880);       // 未燒傷側：病態蒼白
  const char = wetMat(0x1a1410);         // 碳化焦黑（濕亮＝滲液）
  const charMid = wetMat(0x2e2018);
  const uniform = ragMat(0x35424e);      // 工務制服（灰藍）
  const uniformDark = ragMat(0x27313b);
  const cable = sheenMat(0x14161a, 0x3a4656, 40);
  const spark = new THREE.MeshBasicMaterial({ color: 0x9adcff }); // 電火花
  const arc = new THREE.MeshBasicMaterial({ color: 0x5aa8e8 });   // 帶電裂縫

  // 腿（制服褲，右腿燒焦）
  const legL = new THREE.Group();
  legL.position.set(-0.13, 0.95, 0);
  cap(legL, uniform, 0.075, 0.3, 0, -0.18, 0, -0.04);
  cap(legL, uniform, 0.06, 0.28, 0, -0.6, 0.02, 0.08);
  blob(legL, mat(0x14161a), 0.055, 1.1, 0.5, 2.0, 0, -0.9, -0.04); // 工作靴
  g.add(legL);
  const legR = new THREE.Group();
  legR.position.set(0.13, 0.95, 0);
  cap(legR, charMid, 0.075, 0.3, 0, -0.18, 0, -0.04);
  cap(legR, char, 0.06, 0.28, 0, -0.6, 0.02, 0.08);
  blob(legR, arc, 0.015, 1, 2.2, 0.5, 0.03, -0.45, -0.07); // 小腿電光裂縫
  blob(legR, mat(0x14161a), 0.055, 1.1, 0.5, 2.0, 0, -0.9, -0.04);
  g.add(legR);

  // 軀幹（寬厚前傾；左半制服、右半燒穿露焦肉）
  const torso = new THREE.Group();
  torso.position.y = 0.93;
  torso.rotation.x = 0.18;
  blob(torso, uniformDark, 0.12, 1.7, 1.0, 1.2, 0, 0.05, 0);
  blob(torso, uniform, 0.14, 1.65, 1.5, 1.15, -0.05, 0.52, 0);   // 左胸（制服）
  blob(torso, char, 0.13, 1.3, 1.45, 1.1, 0.12, 0.5, -0.02);     // 右胸（燒穿碳化）
  blob(torso, arc, 0.022, 1, 2.8, 0.5, 0.14, 0.5, -0.16);        // 胸口電光裂縫
  blob(torso, uniform, 0.085, 1, 0.85, 1, -0.27, 0.68, 0);       // 左肩
  blob(torso, charMid, 0.09, 1, 0.9, 1, 0.28, 0.66, 0.01);       // 右肩（焦）
  cap(torso, skin, 0.05, 0.05, -0.01, 0.8, -0.02, 0.15);         // 頸

  // 背上斷裂電纜：兩截外弓的粗纜＋帶電斷口
  const cab1 = new THREE.Group();
  cab1.position.set(0.1, 0.62, 0.2);
  cab1.rotation.x = -0.7;
  cyl(cab1, cable, 0.028, 0.034, 0.55, 8, 0, 0.24, 0, 0.25);
  blob(cab1, spark, 0.035, 1, 1, 1, 0.06, 0.5, 0.02);            // 斷口火花
  torso.add(cab1);
  const cab2 = new THREE.Group();
  cab2.position.set(-0.12, 0.4, 0.2);
  cab2.rotation.x = -0.95;
  cyl(cab2, cable, 0.022, 0.028, 0.4, 8, 0, 0.18, 0, -0.35);
  blob(cab2, spark, 0.026, 1, 1, 1, -0.05, 0.36, 0.02);
  torso.add(cab2);

  // 頭（右半臉燒熔、左眼殘存、右眼電藍）
  const head = new THREE.Group();
  head.position.set(0.01, 0.86, -0.04);
  head.rotation.z = -0.12;
  blob(head, skin, 0.1, 1.0, 1.15, 1.05, -0.02, 0.06, 0);
  blob(head, char, 0.09, 0.95, 1.1, 1.0, 0.045, 0.055, -0.005);  // 右半臉碳化
  blob(head, mat(0x101014), 0.02, 1.3, 1.1, 0.6, -0.045, 0.06, -0.09); // 左眼（黑陷）
  blob(head, spark, 0.02, 1.2, 1.1, 0.7, 0.05, 0.06, -0.09);     // 右眼（電藍）
  blob(head, charMid, 0.05, 1.0, 0.55, 0.85, 0.01, -0.07, -0.04, 0.4); // 半脫下顎
  torso.add(head);

  // 左臂（制服，垂盪）
  const armD = new THREE.Group();
  armD.position.set(-0.29, 0.64, 0.01);
  armD.rotation.z = 0.14;
  cap(armD, uniform, 0.06, 0.1, 0, -0.06, 0);
  cap(armD, skin, 0.045, 0.19, 0, -0.26, 0.005, 0.06);
  cap(armD, skin, 0.04, 0.19, 0.005, -0.52, 0.025, 0.1);
  blob(armD, skin, 0.038, 1, 1.3, 0.6, 0.01, -0.66, 0.04);
  torso.add(armD);

  // 右臂（★ 帶電巨臂：碳化腫脹、電光裂縫、砸地主武器）
  const armF = new THREE.Group();
  armF.position.set(0.3, 0.62, -0.01);
  armF.rotation.x = 0.15;
  cap(armF, charMid, 0.085, 0.14, 0, -0.02, -0.1, Math.PI / 2);
  blob(armF, arc, 0.02, 1, 2.6, 0.5, 0.02, 0.02, -0.2);
  cap(armF, char, 0.075, 0.24, 0, -0.04, -0.36, Math.PI / 2 + 0.12);
  blob(armF, arc, 0.018, 1, 2.4, 0.5, 0.02, -0.04, -0.46);
  blob(armF, char, 0.08, 1, 0.7, 1.3, 0, -0.09, -0.64, 0.3);     // 焦黑巨拳
  blob(armF, spark, 0.022, 1, 1, 1, 0, -0.13, -0.72);            // 拳端電花
  torso.add(armF);

  g.add(torso);
  g.userData.parts = { legL, legR, armF, armD, torso };
  g.userData.kind = 'keeper';
  g.userData.phase = Math.random() * Math.PI * 2;
  return g;
}

// === 倖存者 NPC（白袍研究員，站姿，無傷） ===

export function buildSurvivorMesh() {
  const g = new THREE.Group();
  const skin = fleshMat(0xd8b89a);
  const coat = ragMat(0xd8d8d4);
  const coatShade = ragMat(0xc2c2bc);
  const pants = ragMat(0x3a3e48);
  const hair = mat(0x2a2018);

  cap(g, pants, 0.06, 0.3, -0.1, 0.55, 0);                    // 雙腿
  cap(g, pants, 0.06, 0.3, 0.1, 0.55, 0);
  blob(g, mat(0x1c1e24), 0.05, 1.1, 0.5, 2, -0.1, 0.06, -0.03); // 鞋
  blob(g, mat(0x1c1e24), 0.05, 1.1, 0.5, 2, 0.1, 0.06, -0.03);
  blob(g, coat, 0.12, 1.5, 1.9, 1.05, 0, 1.05, 0);             // 白袍軀幹
  box(g, coatShade, 0.03, 0.42, 0.13, 0, 1.05, -0.115);        // 袍前襟
  cap(g, coat, 0.042, 0.2, -0.23, 1.12, 0, 0, 0, 0.15);        // 雙臂（垂放）
  cap(g, coat, 0.042, 0.2, 0.23, 1.12, 0, 0, 0, -0.15);
  blob(g, skin, 0.032, 1, 1.1, 1, -0.26, 0.88, 0);             // 手
  blob(g, skin, 0.032, 1, 1.1, 1, 0.26, 0.88, 0);
  cyl(g, skin, 0.045, 0.05, 0.07, 8, 0, 1.42, 0);              // 頸
  blob(g, skin, 0.095, 1, 1.12, 1, 0, 1.56, 0);                // 頭
  blob(g, hair, 0.095, 1.02, 0.85, 1.02, 0, 1.62, 0.015);      // 長髮
  blob(g, hair, 0.06, 1, 2.2, 0.5, 0, 1.35, 0.09);             // 馬尾
  blob(g, mat(0x201812), 0.016, 1.2, 1, 0.5, -0.035, 1.58, -0.088); // 眼
  blob(g, mat(0x201812), 0.016, 1.2, 1, 0.5, 0.035, 1.58, -0.088);
  return g;
}

// === 遺體（場景道具：死者仰躺，周圍血泊）===
// variant 0=工人制服、1=白袍、2=警衛/黑衣；seed 決定姿勢微差
export function buildCorpseMesh(variant = 0, seed = 1) {
  const g = new THREE.Group();
  const cloth =
    variant === 1 ? ragMat(0xc8c8c2) : variant === 2 ? ragMat(0x1c2026) : ragMat(0x3a4550);
  const clothDark =
    variant === 1 ? ragMat(0xb0b0a8) : variant === 2 ? ragMat(0x14181e) : ragMat(0x2c3640);
  const skin = fleshMat(0x9a8f7c); // 死者膚色（失血蒼灰）
  const s = (seed * 137) % 7;

  // 血泊
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(0.55 + (s % 3) * 0.12, 14),
    new THREE.MeshBasicMaterial({ color: 0x2e0606, transparent: true, opacity: 0.88 })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.012;
  g.add(pool);

  // 仰躺軀幹（貼地）
  const body = new THREE.Group();
  body.rotation.y = (s * 0.9) % (Math.PI * 2);
  blob(body, cloth, 0.13, 1.5, 0.55, 1.9, 0, 0.09, 0);           // 胸腹（壓扁）
  blob(body, clothDark, 0.1, 1.5, 0.5, 1.2, 0, 0.07, 0.28);      // 骨盆
  blob(body, skin, 0.085, 1.05, 0.75, 1.0, 0.02, 0.09, -0.32);   // 頭（側傾）
  blob(body, wetMat(0x3c0d0d), 0.05, 1.3, 0.4, 1, 0.05, 0.1, -0.2); // 頸胸創口
  // 四肢攤開
  cap(body, cloth, 0.045, 0.3, -0.24, 0.07, -0.1, 0.2, 0, 1.2);  // 左臂外攤
  cap(body, skin, 0.035, 0.2, -0.42, 0.05, 0.03, 0.1, 0, 1.35);
  cap(body, cloth, 0.045, 0.28, 0.2, 0.07, -0.05, 0.2, 0, -0.7); // 右臂
  cap(body, clothDark, 0.055, 0.34, -0.1, 0.07, 0.52, 1.35, 0, 0.15); // 左腿
  cap(body, clothDark, 0.055, 0.36, 0.12, 0.07, 0.54, 1.3, 0, -0.2);  // 右腿
  blob(body, mat(0x14161a), 0.05, 1, 0.5, 1.8, -0.13, 0.06, 0.86);    // 鞋
  blob(body, mat(0x14161a), 0.05, 1, 0.5, 1.8, 0.16, 0.06, 0.88);
  g.add(body);
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
      color:
        itemType === 'heal' ? 0x3f9f4f
        : itemType === 'weapon' ? 0x8fa5c0
        : itemType === 'doc' ? 0xd8d2bc
        : 0xc9a94f,
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
  } else if (itemType === 'doc') {
    // 文件：微微立起的紙頁
    const page = new THREE.Mesh(
      new THREE.PlaneGeometry(0.22, 0.3),
      new THREE.MeshLambertMaterial({ color: 0xd8d2bc, side: THREE.DoubleSide })
    );
    page.rotation.x = -Math.PI / 2 + 0.35;
    page.position.y = -0.08;
    item.add(page);
    const lines = new THREE.Mesh(
      new THREE.PlaneGeometry(0.16, 0.2),
      new THREE.MeshLambertMaterial({ color: 0x8a857a, side: THREE.DoubleSide })
    );
    lines.rotation.x = -Math.PI / 2 + 0.35;
    lines.position.set(0, -0.075, 0.005);
    item.add(lines);
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
