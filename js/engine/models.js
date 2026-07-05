// 外部 .glb 模型熱插拔：assets/models/ 有檔就載入替換程序模型，缺檔零成本跳過。
// GLTFLoader 只在真的找到檔案時才動態載入（避免平白多抓一支 addons 模組）。
const MANIFEST = ['zombie', 'dog', 'knife', 'handgun', 'shotgun', 'magnum'];

export async function loadExternalModels() {
  const found = [];
  await Promise.all(
    MANIFEST.map(async (name) => {
      try {
        const res = await fetch(`assets/models/${name}.glb`, { method: 'HEAD' });
        if (res.ok) found.push(name);
      } catch {
        // 離線或伺服器不支援 HEAD：當作無檔
      }
    })
  );
  if (!found.length) return null;

  const [{ GLTFLoader }, THREE] = await Promise.all([
    import('three/addons/loaders/GLTFLoader.js'),
    import('three'),
  ]);
  const loader = new GLTFLoader();
  const models = new Map();
  await Promise.all(
    found.map(async (name) => {
      try {
        const gltf = await loader.loadAsync(`assets/models/${name}.glb`);
        models.set(name, normalize(THREE, name, gltf.scene));
      } catch {
        // 壞檔跳過，保留程序模型
      }
    })
  );
  return models.size ? models : null;
}

// 自動校正：任何來源的模型都縮放到遊戲尺寸、腳底貼地、水平置中。
// 使用者只需要檔名正確，不用管匯出時的大小與原點。
const TARGET_HEIGHT = { zombie: 1.7, dog: 0.65 };

function normalize(THREE, name, scene) {
  const wrapper = new THREE.Group();
  wrapper.add(scene);
  const bbox = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  if (size.length() === 0) return wrapper;

  if (TARGET_HEIGHT[name]) {
    const s = TARGET_HEIGHT[name] / size.y;
    scene.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(scene);
    const c = new THREE.Vector3();
    b2.getCenter(c);
    scene.position.set(-c.x, -b2.min.y, -c.z); // 腳底貼地、置中
  } else {
    // 武器：最長邊縮到 0.5、幾何中心對原點（細部姿勢待實際檔案再微調）
    const s = 0.5 / Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(scene);
    const c = new THREE.Vector3();
    b2.getCenter(c);
    scene.position.set(-c.x, -c.y, -c.z);
  }
  return wrapper;
}
