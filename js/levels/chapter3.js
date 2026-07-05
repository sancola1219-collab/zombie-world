// 最終章〈瞞不住了〉：晨星實驗區——原體 Boss、自毀倒數、逃生。
export const CHAPTER3 = {
  id: 'chapter3',
  name: '第三章：瞞不住了',
  next: null,
  exitNeeds: 'bossdead',
  exitHint: '豎井閘門被緊急協定鎖死——核心實驗室裡的「那個東西」還活著',
  boss: 'prime',
  countdown: 180, // Boss 倒下後的自毀倒數（秒）
  spawn: { x: 2, z: 2.5, yaw: -Math.PI / 2 },
  lockNames: { bossdead: '緊急解鎖', chapterExit: '逃生豎井' },
  story: [
    '閘門在身後緩緩闔上。\n\n這裡和上面的廠房是兩個世界：白色的牆、白色的燈、白色的地板——乾淨得像從來沒有人流過血。\n\n走廊兩側的標本槽裡，泡著一些周亮均不想細看的東西。',
    '控制室的螢幕還亮著。\n\n最後一格監視畫面停在核心實驗室：六個 KY-02 容器整齊排列。\n\n下一格畫面，容器全空了。\n\n再下一格——鏡頭前有什麼巨大的東西擋住了光。',
    '白博士倒在核心室的門口，胸口以下陷進一灘泛著藍光的黑色物質裡，像被地板吞了一半。\n\n他還有意識。\n\n「它把六個容器……全吃了。」他的聲音像漏氣的風箱，「聚合體有趨性……它在等活體。周副理……」\n\n「銷毀協定。控制室。要有人按下去。」\n\n「然後——跑。」',
    '周亮均看著核心實驗室緊閉的門。\n\n門的另一side，有什麼東西正隔著鋼板，緩慢地、有耐心地，敲。\n\n砰。\n\n砰。\n\n和 E 區那晚一模一樣的節奏。\n\n他把最後一發彈匣壓進槍裡。',
  ],
  endingText:
    '豎井的爬梯盡頭是雨。周亮均趴在濕透的地面上，聽著身後的地底傳來一連串悶響——晨星的實驗區，連同那個東西，一層一層塌了下去。無線電裡傳來欣儀的聲音，還有遠處的警笛。假產能、假報告、假製程——天亮之後，全部瞞不住了。',
  objective: '啟動銷毀協定，消滅原體，活著離開',
  rooms: [
    { id: 'gate', name: '閘門內廊', x: 0, z: 0, w: 4, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 2, y: 2.6, z: 2.5, color: 0xcfe0ff, intensity: 26 } },
    { id: 'speclab', name: '標本廊', x: 4, z: 0, w: 16, d: 4, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 12, y: 2.8, z: 2, color: 0x66ffee, intensity: 20, flicker: true } },
    { id: 'controlroom', name: '控制室', x: 20, z: 0, w: 6, d: 6, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 23, y: 2.6, z: 3, color: 0xffe0b0, intensity: 30 } },
    { id: 'corelab', name: '核心實驗室', x: 4, z: 4, w: 16, d: 12, h: 5, floor: 'metal', walls: 'metal',
      light: { x: 12, y: 4.5, z: 10, color: 0x7788bb, intensity: 36, flicker: true } },
    { id: 'vault', name: '危材庫', x: 20, z: 6, w: 6, d: 5, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 23, y: 2.8, z: 8.5, color: 0xff5533, intensity: 16, flicker: true } },
    { id: 'coolant', name: '冷卻通道', x: 20, z: 11, w: 6, d: 6, h: 2.8, floor: 'metal', walls: 'metal',
      light: { x: 23, y: 2.4, z: 14, color: 0x88aa88, intensity: 14, flicker: true } },
    { id: 'shaft', name: '逃生豎井', x: 4, z: 16, w: 8, d: 5, h: 4, floor: 'metal', walls: 'metal',
      light: { x: 8, y: 3.6, z: 18.5, color: 0xffe0b0, intensity: 24 } },
    { id: 'annex', name: '器材間', x: 12, z: 16, w: 8, d: 5, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 16, y: 2.6, z: 18.5, color: 0xc09060, intensity: 18, flicker: true } },
  ],
  doors: [
    { id: 'd3-gate-spec', from: 'gate', to: 'speclab', axis: 'z', at: [4, 2], width: 1.3, height: 2.3, lock: null },
    { id: 'd3-spec-ctrl', from: 'speclab', to: 'controlroom', axis: 'z', at: [20, 2], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-spec-core', from: 'speclab', to: 'corelab', axis: 'x', at: [10, 4], width: 1.6, height: 2.6, lock: null },
    { id: 'd3-ctrl-core', from: 'controlroom', to: 'corelab', axis: 'z', at: [20, 5], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-ctrl-vault', from: 'controlroom', to: 'vault', axis: 'x', at: [23, 6], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-vault-cool', from: 'vault', to: 'coolant', axis: 'x', at: [23, 11], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-core-shaft', from: 'corelab', to: 'shaft', axis: 'x', at: [8, 16], width: 1.4, height: 2.4, lock: 'bossdead' },
    { id: 'd3-core-annex', from: 'corelab', to: 'annex', axis: 'x', at: [16, 16], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-exit', from: 'shaft', to: null, axis: 'z', at: [4, 18.5], width: 1.4, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 標本廊：標本槽（桶列＋藍光感）
    { room: 'speclab', type: 'barrel', x: 6, z: 0.8, solid: 0.35 },
    { room: 'speclab', type: 'barrel', x: 9, z: 0.8, solid: 0.35 },
    { room: 'speclab', type: 'barrel', x: 12, z: 0.8, solid: 0.35 },
    { room: 'speclab', type: 'barrel', x: 15, z: 0.8, solid: 0.35 },
    { room: 'speclab', type: 'blood', x: 13, z: 2.6 },
    // 控制室
    { room: 'controlroom', type: 'table', x: 23, z: 1.6, solid: 0.5 },
    { room: 'controlroom', type: 'papers', x: 24, z: 2.4 },
    { room: 'controlroom', type: 'chair_fallen', x: 21.5, z: 3.5, rot: 1.8 },
    // 核心實驗室：Boss 競技場（立柱掩體）
    { room: 'corelab', type: 'crate', x: 8, z: 8, solid: 0.45 },
    { room: 'corelab', type: 'crate', x: 16, z: 8, solid: 0.45 },
    { room: 'corelab', type: 'crate', x: 8, z: 13, solid: 0.45 },
    { room: 'corelab', type: 'crate', x: 16, z: 13, solid: 0.45 },
    { room: 'corelab', type: 'blood', x: 12, z: 7 },
    { room: 'corelab', type: 'blood', x: 10.5, z: 11 },
    { room: 'corelab', type: 'blood', x: 14, z: 12.5 },
    { room: 'corelab', type: 'bodybag', x: 10.2, z: 4.8, rot: 0.3 }, // 白博士
    { room: 'corelab', type: 'pipe', x: 12, z: 5, len: 14, y: 4.6 },
    { room: 'corelab', type: 'pipe', x: 12, z: 15, len: 14, y: 4.3 },
    // 危材庫
    { room: 'vault', type: 'shelf', x: 25.6, z: 8.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'vault', type: 'crate', x: 21, z: 9.8, solid: 0.4 },
    // 冷卻通道
    { room: 'coolant', type: 'pipe', x: 23, z: 12, len: 5, y: 2.4 },
    { room: 'coolant', type: 'pipe', x: 23, z: 16, len: 5, y: 2.2 },
    { room: 'coolant', type: 'blood', x: 22, z: 14.5 },
    // 器材間
    { room: 'annex', type: 'shelf', x: 12.35, z: 18, rot: Math.PI / 2, solid: 0.28 },
    { room: 'annex', type: 'crate', x: 18.5, z: 19.5, solid: 0.4 },
    { room: 'annex', type: 'crate', x: 17.6, z: 19.9, solid: 0.4 },
    // 逃生豎井
    { room: 'shaft', type: 'crate', x: 10.5, z: 20, solid: 0.4 },
  ],
  documents: [
    {
      id: 'doc3-specimen', title: '標本清單', x: 7.5, z: 3,
      text: '槽 01–04：宿主組織樣本（來源：略）\n槽 05：犬科，暴露後 40 分鐘完成轉化\n槽 06：（劃掉）\n\n頁尾註記：「05 的轉化速度比模型快了 11 倍。上面還想拿這個進產線？他們瘋了。」',
    },
    {
      id: 'doc3-protocol', title: '設施銷毀協定', x: 22.5, z: 1.8, grantsKey: null,
      text: '本設施配備熱熔銷毀系統。\n\n啟動條件：三級以上生物危害外洩。\n啟動後倒數 180 秒，期間豎井閘門保持緊急解鎖。\n\n警告：核心實驗室的聚合體樣本對生物電訊號有趨性。倒數期間，它會朝「最後一個活體」移動。\n\n不要成為那個活體。',
    },
    {
      id: 'doc3-bai2', title: '白博士的識別證（背面手寫）', x: 10.5, z: 5.2,
      text: '如果有人撿到這張卡：\n\n對不起。\n\nKY 從來不是我做出來的。是它自己長出來的。我只是第一個餵它的人。\n\n——白',
    },
    {
      id: 'doc3-shaft', title: '逃生豎井使用須知', x: 17, z: 17.2,
      text: '豎井爬梯直通地面層警衛室後方。\n\n緊急狀態下閘門由銷毀協定控制：協定啟動＝解鎖，倒數歸零＝永久封閉。\n\n（有人在下面補了一行）\n別回頭看。爬就對了。',
    },
  ],
  npcs: [],
  triggers: [
    { id: 't3-spec', room: 'speclab', text: '標本槽的液體在你經過時，跟著轉了方向。', sound: 'groan' },
    { id: 't3-ctrl', room: 'controlroom', text: '監視畫面：六個容器，全空。', shake: 0.05 },
    { id: 't3-core', room: 'corelab', text: '它就在這裡——六個容器的東西，現在是一個。', sound: 'groan', alert: true, shake: 0.12 },
    { id: 't3-vault', room: 'vault', text: '危材庫——軍規處理裝備。晨星早就準備好要「處理」什麼了。' },
  ],
  entities: {
    pickups: [
      { id: 'p3-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 1 },
      { id: 'p3-herb1', item: 'green_herb', count: 1, x: 3.2, z: 4.2 },
      { id: 'p3-shells1', item: 'shotgun_shells', count: 7, x: 5.5, z: 3.2 },
      { id: 'p3-magammo1', item: 'magnum_ammo', count: 6, x: 21, z: 1.2 },
      { id: 'p3-spray1', item: 'first_aid_spray', count: 1, x: 25, z: 4.8 },
      { id: 'p3-rocket', item: 'rocket_weapon', count: 1, x: 24.5, z: 9.5 }, // 危材庫：火箭炮！
      { id: 'p3-rocketammo', item: 'rocket_ammo', count: 2, x: 25.2, z: 9.2 },
      { id: 'p3-fuel1', item: 'fuel', count: 50, x: 21.5, z: 13 },
      { id: 'p3-blue1', item: 'blue_herb', count: 1, x: 24.5, z: 15.5 },
      { id: 'p3-mixed1', item: 'red_herb', count: 1, x: 13.5, z: 17.5 },
      { id: 'p3-herb2', item: 'green_herb', count: 1, x: 14.2, z: 17.8 },
      { id: 'p3-shells2', item: 'shotgun_shells', count: 7, x: 18, z: 17 },
      { id: 'p3-magammo2', item: 'magnum_ammo', count: 6, x: 12.8, z: 19.5 },
      { id: 'p3-smgammo1', item: 'smg_ammo', count: 30, x: 6, z: 1.2 },
    ],
    enemies: [
      { id: 'c3-hunter1', type: 'hunter', x: 14, z: 2 },      // 標本廊獵痕者
      { id: 'c3-z1', type: 'zombie', x: 18, z: 2.5 },
      { id: 'c3-lurker1', type: 'lurker', x: 23, z: 14 },     // 冷卻通道天花板
      { id: 'c3-bloater1', type: 'bloater', x: 22, z: 9 },    // 危材庫門口
      { id: 'c3-bloater2', type: 'bloater', x: 16, z: 19 },   // 器材間
      { id: 'c3-spider1', type: 'spider', x: 17.5, z: 18 },
      { id: 'c3-z2', type: 'zombie', x: 6, z: 18.5 },
      { id: 'prime', type: 'prime', x: 12, z: 10 },           // ★ 原體
    ],
    typewriters: [
      { id: 'tw3-gate', x: 0.7, z: 0.8 },
      { id: 'tw3-ctrl', x: 25.3, z: 1.0 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }, { id: 'magnum', rounds: 6 }], items: [] },
};
