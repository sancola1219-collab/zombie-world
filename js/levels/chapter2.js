// 第二章〈地下的東西〉：柳營新廠 B1 儲運層。
// 延續第一章：KY-02 被運往 B1，警衛無線電「不要下去」。周亮均決定下去查明真相。
export const CHAPTER2 = {
  id: 'chapter2',
  name: '第二章：地下的東西',
  next: 'chapter3',
  exitNeeds: 'labkey',
  spawn: { x: 2, z: 2.5, yaw: -Math.PI / 2 }, // 貨梯底，面向東
  lockNames: { labkey: '實驗區通行卡', chapterExit: '實驗區閘門' },
  story: [
    '大門在身後合上。雨水打在臉上，周亮均這輩子沒有覺得雨這麼乾淨過。\n\n手機沒有訊號。整個柳營工業區一片漆黑，只有遠處國道上偶爾掃過的車燈。',
    '無線電忽然響了。是欣儀。\n\n「亮均——我在監控室。你先聽我說完。白博士的車還停在貨運月台，可是監視器裡……B1 儲運層的燈全滅了，畫面裡有東西在動。不是人的動法。」',
    '「KY-02 還在下面。」她的聲音壓得很低，「如果那批東西流出廠區，就不只是柳營的事了。」\n\n周亮均看著手裡的貨梯鑰匙卡，雨聲像無數手指在敲門。\n\n他轉身走回貨梯。按下了「B1」。',
    '貨梯下降。燈管在頭頂閃爍。\n\n越往下，空氣越冷，混著機油、消毒水，和一絲若有似無的——甜腐味。\n\n叮。\n\n門開了。黑暗裡，有什麼東西泛著淡淡的藍光。',
  ],
  objective: '查明 KY-02 下落，找到進入實驗區的通行卡',
  rooms: [
    { id: 'b1lift', name: '貨梯底', x: 0, z: 0, w: 4, d: 5, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 2, y: 2.6, z: 2.5, color: 0xffe0b0, intensity: 22, flicker: true } },
    { id: 'b1hall', name: '儲運月台', x: 4, z: 0, w: 16, d: 10, h: 4.5, floor: 'tile', walls: 'metal',
      light: { x: 12, y: 4, z: 5, color: 0x66ffee, intensity: 26, flicker: true } }, // KY 藍光
    { id: 'coldroom', name: '冷藏庫', x: 4, z: 10, w: 6, d: 6, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 7, y: 2.8, z: 13, color: 0xaaccff, intensity: 14, flicker: true } },
    { id: 'storage', name: '化學品倉', x: 10, z: 10, w: 10, d: 8, h: 3.6, floor: 'tile', walls: 'metal',
      light: { x: 15, y: 3.2, z: 14, color: 0xffd9a0, intensity: 24 } },
    { id: 'barracks', name: '值勤室', x: 20, z: 10, w: 6, d: 5, h: 3, floor: 'carpet', walls: 'plaster',
      light: { x: 23, y: 2.6, z: 12.5, color: 0xffe0b0, intensity: 30 } },
    { id: 'tunnel', name: '輸送隧道', x: 20, z: 3.5, w: 20, d: 3, h: 2.8, floor: 'metal', walls: 'metal',
      light: { x: 30, y: 2.4, z: 5, color: 0xc09060, intensity: 16, flicker: true } },
    { id: 'pumproom', name: '泵房', x: 40, z: 2, w: 6, d: 6, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 43, y: 2.8, z: 5, color: 0x88aa88, intensity: 20, flicker: true } },
    { id: 'sump', name: '集水坑', x: 40, z: 8, w: 8, d: 6, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 44, y: 2.6, z: 11, color: 0x66aa88, intensity: 12, flicker: true } },
    { id: 'lablock', name: '實驗區閘門廳', x: 46, z: 2, w: 6, d: 5, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 49, y: 3, z: 4.5, color: 0xff5533, intensity: 18, flicker: true } },
  ],
  doors: [
    { id: 'd2-lift-hall', from: 'b1lift', to: 'b1hall', axis: 'z', at: [4, 2.5], width: 1.4, height: 2.3, lock: null },
    { id: 'd2-hall-cold', from: 'b1hall', to: 'coldroom', axis: 'x', at: [7, 10], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-hall-storage', from: 'b1hall', to: 'storage', axis: 'x', at: [15, 10], width: 1.4, height: 2.4, lock: null },
    { id: 'd2-cold-storage', from: 'coldroom', to: 'storage', axis: 'z', at: [10, 13], width: 1.1, height: 2.1, lock: null },
    { id: 'd2-storage-barracks', from: 'storage', to: 'barracks', axis: 'z', at: [20, 12.5], width: 1.1, height: 2.1, lock: null },
    { id: 'd2-hall-tunnel', from: 'b1hall', to: 'tunnel', axis: 'z', at: [20, 5], width: 1.4, height: 2.3, lock: null },
    { id: 'd2-tunnel-pump', from: 'tunnel', to: 'pumproom', axis: 'z', at: [40, 5], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-pump-sump', from: 'pumproom', to: 'sump', axis: 'x', at: [43, 8], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-pump-lab', from: 'pumproom', to: 'lablock', axis: 'z', at: [46, 4.5], width: 1.3, height: 2.3, lock: 'labkey' },
    { id: 'd2-exit', from: 'lablock', to: null, axis: 'z', at: [52, 4.5], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 儲運月台：KY-02 破損箱（中央事發點）＋棧板木箱
    { room: 'b1hall', type: 'crate', x: 11.5, z: 4.6, solid: 0.4 },
    { room: 'b1hall', type: 'crate', x: 12.4, z: 5.3, solid: 0.4 },
    { room: 'b1hall', type: 'blood', x: 12, z: 5.8 },
    { room: 'b1hall', type: 'blood', x: 13.2, z: 4.2 },
    { room: 'b1hall', type: 'bodybag', x: 10.6, z: 6.2, rot: 0.8 },
    { room: 'b1hall', type: 'barrel', x: 5.5, z: 1.2, solid: 0.35 },
    { room: 'b1hall', type: 'barrel', x: 6.3, z: 1.5, solid: 0.35 },
    { room: 'b1hall', type: 'crate', x: 18.5, z: 8.5, solid: 0.4 },
    { room: 'b1hall', type: 'papers', x: 14, z: 7 },
    { room: 'b1hall', type: 'pipe', x: 12, z: 0.6, len: 15, y: 4.2 },
    // 冷藏庫
    { room: 'coldroom', type: 'shelf', x: 4.35, z: 12, rot: Math.PI / 2, solid: 0.28 },
    { room: 'coldroom', type: 'shelf', x: 4.35, z: 14.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'coldroom', type: 'bodybag', x: 8, z: 14.8, rot: 1.5 },
    { room: 'coldroom', type: 'blood', x: 7.6, z: 14 },
    // 化學品倉：貨架迷宮
    { room: 'storage', type: 'shelf', x: 12, z: 12, rot: 0, solid: 0.3 },
    { room: 'storage', type: 'shelf', x: 15, z: 12, rot: 0, solid: 0.3 },
    { room: 'storage', type: 'shelf', x: 12, z: 15.5, rot: 0, solid: 0.3 },
    { room: 'storage', type: 'shelf', x: 15, z: 15.5, rot: 0, solid: 0.3 },
    { room: 'storage', type: 'barrel', x: 18.8, z: 16.8, solid: 0.35 },
    { room: 'storage', type: 'barrel', x: 18.1, z: 17.2, solid: 0.35 },
    { room: 'storage', type: 'papers', x: 17, z: 11 },
    // 值勤室
    { room: 'barracks', type: 'table', x: 23, z: 11.5, solid: 0.5 },
    { room: 'barracks', type: 'chair_fallen', x: 24.3, z: 13.5, rot: 2.2 },
    { room: 'barracks', type: 'papers', x: 22, z: 13.8 },
    // 輸送隧道：輸送帶（連續木箱）＋管線
    { room: 'tunnel', type: 'pipe', x: 30, z: 4, len: 19, y: 2.5 },
    { room: 'tunnel', type: 'crate', x: 26, z: 6, solid: 0.4 },
    { room: 'tunnel', type: 'crate', x: 31, z: 4.2, solid: 0.4 },
    { room: 'tunnel', type: 'blood', x: 33, z: 5 },
    { room: 'tunnel', type: 'bodybag', x: 36, z: 4.4, rot: 0.2 },
    // 泵房
    { room: 'pumproom', type: 'barrel', x: 41.2, z: 3, solid: 0.35 },
    { room: 'pumproom', type: 'barrel', x: 42, z: 3.4, solid: 0.35 },
    { room: 'pumproom', type: 'pipe', x: 43, z: 2.5, len: 5, y: 2.8 },
    // 集水坑：毒沼氛圍
    { room: 'sump', type: 'blood', x: 43, z: 11 },
    { room: 'sump', type: 'blood', x: 45.5, z: 12.5 },
    { room: 'sump', type: 'bodybag', x: 46.5, z: 10.5, rot: 2.6 }, // 白博士的助理
    { room: 'sump', type: 'barrel', x: 41, z: 13, solid: 0.35 },
    // 閘門廳
    { room: 'lablock', type: 'crate', x: 47, z: 6.2, solid: 0.4 },
    { room: 'lablock', type: 'blood', x: 49.5, z: 4 },
  ],
  documents: [
    {
      id: 'doc2-manifest', title: '運輸單（乙案）', x: 13.5, z: 6.5,
      text: '品名：KY-02 樣本組（×6）\n路線：貨梯 → B1 儲運層 → 輸送隧道 → 泵房側門 → 場外車輛\n\n備註欄蓋著紅章：「中止。樣本狀態異常。等待白博士指示。」\n\n六個容器。月台上的破箱……只有一個。',
    },
    {
      id: 'doc2-coldnote', title: '冷藏庫溫度紀錄', x: 5.2, z: 11,
      text: '18:00　-18.2°C　正常\n19:00　-17.9°C　正常\n20:00　-9.4°C　（手寫）壓縮機沒壞。是裡面的東西在發熱。\n21:00　（空白）\n\n紀錄表的最後一格，畫了一個歪歪扭扭的門，門上打了一個叉。',
    },
    {
      id: 'doc2-duty', title: 'B1 值勤日誌', x: 22, z: 11.3,
      text: '20:05 晨星的人到月台，六箱。他們自己搬，不讓我們碰。\n20:30 搬到第三箱的時候箱子晃了一下。是箱子自己在晃。\n20:41 白博士到場。他們吵起來了，說什麼「活性超標」「必須銷毀」。\n20:58 燈滅了。\n\n（下面是另一種筆跡）\n誰看到這本日誌：不要相信穿黑衣服的。他們把人鎖在冷藏庫裡。',
    },
    {
      id: 'doc2-bai', title: '白博士的錄音筆記（謄寫）', x: 44.8, z: 3.2,
      text: '「……KY 系列不是添加劑，從來都不是。它是載體。01 是穩定版本，02 是……02 不應該離開實驗區。」\n\n「聚合體對生物電訊號有趨性。斷電之後它們會安靜，但只要有活體靠近——」\n\n「是我的錯。我以為產線的規模可以稀釋它。」\n\n錄音到這裡被掐斷。',
    },
    {
      id: 'doc2-lastorder', title: '晨星緊急指令', x: 48, z: 5.8,
      text: '致 B1 全體執行人員：\n\n即刻放棄回收作業。實驗區閘門將於 21:30 落鎖。\n\n持通行卡者依丙案自行撤離。其餘人員……\n\n（後半頁被撕掉了。地上有半張碎片，只看得到四個字）\n\n「不予回收」。',
    },
  ],
  npcs: [],
  triggers: [
    { id: 't2-hall', room: 'b1hall', text: 'KY-02 的貨箱破了——藍光正從裂縫裡滲出來，像在呼吸。', sound: 'groan', alert: true, shake: 0.08 },
    { id: 't2-cold', room: 'coldroom', text: '冷藏庫的門是從外面鎖上的。裡面的溫度計停在 -9°C。', sound: 'locked' },
    { id: 't2-tunnel', room: 'tunnel', text: '輸送帶上的東西……在動。', sound: 'groan', alert: true },
    { id: 't2-sump', room: 'sump', text: '水聲。黑色的水面下，有什麼東西正貼著池底移動。', alert: true },
    { id: 't2-lablock', room: 'lablock', text: '閘門上的警示燈還亮著：「實驗區——生物危害等級 4」。', shake: 0.06 },
  ],
  entities: {
    pickups: [
      { id: 'p2-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 4 },
      { id: 'p2-herb1', item: 'green_herb', count: 1, x: 3.4, z: 1 },
      { id: 'p2-shells1', item: 'shotgun_shells', count: 7, x: 18.5, z: 1.5 },
      { id: 'p2-blue1', item: 'blue_herb', count: 1, x: 8.8, z: 11 },
      { id: 'p2-spray1', item: 'first_aid_spray', count: 1, x: 9, z: 15 }, // 冷藏庫深處
      { id: 'p2-smgammo1', item: 'smg_ammo', count: 30, x: 11, z: 17.2 },
      { id: 'p2-fuel1', item: 'fuel', count: 40, x: 18.8, z: 16 },
      { id: 'p2-magnum', item: 'magnum_weapon', count: 1, x: 23, z: 11.7 }, // 值勤室槍櫃
      { id: 'p2-magammo1', item: 'magnum_ammo', count: 6, x: 23.8, z: 11.5 },
      { id: 'p2-herb2', item: 'green_herb', count: 1, x: 21, z: 14 },
      { id: 'p2-ammo2', item: 'handgun_ammo', count: 15, x: 28, z: 4.5 },
      { id: 'p2-shells2', item: 'shotgun_shells', count: 7, x: 37, z: 5.8 },
      { id: 'p2-red1', item: 'red_herb', count: 1, x: 41.5, z: 6.5 },
      { id: 'p2-labkey', item: 'labkey', count: 1, x: 46.8, z: 10.8 }, // 助理屍袋旁
      { id: 'p2-blue2', item: 'blue_herb', count: 1, x: 42, z: 12.5 },
      { id: 'p2-magammo2', item: 'magnum_ammo', count: 6, x: 47.5, z: 6 },
      { id: 'p2-herb3', item: 'green_herb', count: 1, x: 50.5, z: 6 },
    ],
    enemies: [
      { id: 'c2-z1', type: 'zombie', x: 9, z: 3 },
      { id: 'c2-z2', type: 'zombie', x: 15, z: 8 },
      { id: 'c2-z3', type: 'zombie', x: 17.5, z: 3.5 },
      { id: 'c2-hunter1', type: 'hunter', x: 12, z: 8.5 }, // 月台巡獵
      { id: 'c2-lurker1', type: 'lurker', x: 7, z: 13 },   // 冷藏庫天花板
      { id: 'c2-lurker2', type: 'lurker', x: 30, z: 5 },   // 隧道中段
      { id: 'c2-spider1', type: 'spider', x: 13.5, z: 14 },
      { id: 'c2-spider2', type: 'spider', x: 16.5, z: 16.5 },
      { id: 'c2-z4', type: 'zombie', x: 24, z: 13.5 },
      { id: 'c2-bloater1', type: 'bloater', x: 33, z: 5 },
      { id: 'c2-bloater2', type: 'bloater', x: 38.5, z: 4.5 },
      { id: 'c2-z5', type: 'zombie', x: 42.5, z: 4.5 },
      { id: 'c2-creeper1', type: 'creeper', x: 44.5, z: 12 }, // 守通行卡
      { id: 'c2-creeper2', type: 'creeper', x: 47, z: 9.5 },
      { id: 'c2-bloater3', type: 'bloater', x: 41.5, z: 10.5 },
      { id: 'c2-dog1', type: 'dog', x: 26, z: 4.5 },
      { id: 'c2-dog2', type: 'dog', x: 49, z: 3.5 },
      { id: 'c2-z6', type: 'zombie', x: 48.5, z: 5.5 },
    ],
    typewriters: [
      { id: 'tw2-lift', x: 0.7, z: 0.8 },
      { id: 'tw2-barracks', x: 25.3, z: 14.2 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 4 }], items: [] },
};
