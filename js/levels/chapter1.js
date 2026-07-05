// 第一章〈瞞天過海〉：立愷X電柳營新廠。
// 佈局依使用者提供的真實廠區衛星圖轉譯：北側行政棟、西側大廠房、
// 東側倉儲與貨梯、東南警衛室出口。純資料模組（node 可測）。
export const CHAPTER1 = {
  id: 'chapter1',
  name: '第一章：瞞天過海',
  spawn: { x: 2, z: 2.5, yaw: Math.PI }, // 設備辦公室，面向南（門的方向）
  lockNames: { keycard: '貨梯鑰匙卡', chapterExit: '廠區大門' },
  rooms: [
    // === 北側行政棟 ===
    { id: 'office', name: '設備辦公室', x: 0, z: 0, w: 6, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 3, y: 2.6, z: 2.5, color: 0xffe0b0, intensity: 26 } },
    { id: 'meeting', name: '會議室', x: 6, z: 0, w: 6, d: 5, h: 3, floor: 'carpet', walls: 'wallpaper',
      light: { x: 9, y: 2.6, z: 2.5, color: 0xffe0b0, intensity: 24 } },
    { id: 'qa', name: '品保實驗室', x: 12, z: 0, w: 6, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 15, y: 2.6, z: 2.5, color: 0xcfe0ff, intensity: 30 } },
    { id: 'store', name: '備品室', x: 18, z: 0, w: 6, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 21, y: 2.6, z: 2.5, color: 0xffe0b0, intensity: 18, flicker: true } },
    { id: 'corr', name: '行政走廊', x: 0, z: 5, w: 24, d: 2.4, h: 2.8, floor: 'carpet', walls: 'wallpaper',
      light: { x: 12, y: 2.4, z: 6.2, color: 0xc09060, intensity: 20, flicker: true } },
    // === 西側大廠房 ===
    { id: 'reactor', name: '反應槽區', x: 0, z: 7.4, w: 14, d: 11.6, h: 4.2, floor: 'tile', walls: 'metal',
      light: { x: 7, y: 3.8, z: 13, color: 0x7788bb, intensity: 34, flicker: true } },
    { id: 'eroom', name: 'E區電氣室', x: 0, z: 19, w: 5, d: 6, h: 3.4, floor: 'metal', walls: 'metal',
      light: { x: 2.5, y: 3, z: 22, color: 0xff5533, intensity: 13, flicker: true } },
    { id: 'fpipes', name: 'F區氣體管線區', x: 5, z: 19, w: 9, d: 6, h: 3.4, floor: 'metal', walls: 'metal',
      light: { x: 9.5, y: 3, z: 22, color: 0x88aa88, intensity: 22, flicker: true } },
    // === 東側倉儲 ===
    { id: 'warehouse', name: '倉儲區', x: 14, z: 7.4, w: 10, d: 11.6, h: 4.2, floor: 'tile', walls: 'metal',
      light: { x: 19, y: 3.8, z: 13, color: 0xffd9a0, intensity: 30 } },
    { id: 'waste', name: '廢液暫存區', x: 14, z: 19, w: 10, d: 6, h: 3.4, floor: 'metal', walls: 'metal',
      light: { x: 19, y: 3, z: 22, color: 0x88aa66, intensity: 18, flicker: true } },
    // === 東向逃生動線 ===
    { id: 'freight', name: '貨梯間', x: 24, z: 12, w: 4, d: 5, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 26, y: 2.6, z: 14.5, color: 0xffe0b0, intensity: 26 } },
    { id: 'eastcorr', name: '連通道', x: 28, z: 12, w: 12, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 34, y: 2.6, z: 14.5, color: 0xc09060, intensity: 18, flicker: true } },
    { id: 'guard', name: '警衛室', x: 40, z: 12, w: 6, d: 7, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 43, y: 2.6, z: 15.5, color: 0xffe0b0, intensity: 32 } },
  ],
  doors: [
    // 行政棟四室 → 走廊
    { id: 'd-office', from: 'office', to: 'corr', axis: 'x', at: [3, 5], width: 1.1, height: 2.1, lock: null },
    { id: 'd-meeting', from: 'meeting', to: 'corr', axis: 'x', at: [9, 5], width: 1.1, height: 2.1, lock: null },
    { id: 'd-qa', from: 'qa', to: 'corr', axis: 'x', at: [15, 5], width: 1.1, height: 2.1, lock: null },
    { id: 'd-store', from: 'store', to: 'corr', axis: 'x', at: [21, 5], width: 1.1, height: 2.1, lock: null },
    // 走廊 → 廠房
    { id: 'd-corr-reactor', from: 'corr', to: 'reactor', axis: 'x', at: [4, 7.4], width: 1.3, height: 2.2, lock: null },
    // 廠房內部
    { id: 'd-reactor-wh', from: 'reactor', to: 'warehouse', axis: 'z', at: [14, 13], width: 1.6, height: 2.6, lock: null },
    { id: 'd-reactor-eroom', from: 'reactor', to: 'eroom', axis: 'x', at: [2.5, 19], width: 1.2, height: 2.2, lock: null },
    { id: 'd-reactor-fpipes', from: 'reactor', to: 'fpipes', axis: 'x', at: [9, 19], width: 1.2, height: 2.2, lock: null },
    { id: 'd-fpipes-waste', from: 'fpipes', to: 'waste', axis: 'z', at: [14, 22], width: 1.2, height: 2.2, lock: null },
    { id: 'd-wh-waste', from: 'warehouse', to: 'waste', axis: 'x', at: [19, 19], width: 1.3, height: 2.2, lock: null },
    // 逃生動線（鑰匙卡）
    { id: 'd-wh-freight', from: 'warehouse', to: 'freight', axis: 'z', at: [24, 14.5], width: 1.2, height: 2.2, lock: 'keycard' },
    { id: 'd-freight-east', from: 'freight', to: 'eastcorr', axis: 'z', at: [28, 14.5], width: 1.2, height: 2.2, lock: null },
    { id: 'd-east-guard', from: 'eastcorr', to: 'guard', axis: 'z', at: [40, 14.5], width: 1.2, height: 2.2, lock: null },
    // 章末出口（裝飾門，互動即通關）
    { id: 'd-exit', from: 'guard', to: null, axis: 'z', at: [46, 15.5], width: 1.4, height: 2.3, lock: 'chapterExit' },
  ],
  props: [
    // 辦公室：桌椅文件
    { room: 'office', type: 'table', x: 3, z: 1.2, solid: 0.5 },
    { room: 'office', type: 'papers', x: 3.2, z: 2.2 },
    { room: 'office', type: 'shelf', x: 5.7, z: 2.5, rot: -Math.PI / 2, solid: 0.28 },
    // 會議室：長桌翻椅
    { room: 'meeting', type: 'table', x: 9, z: 2.2, solid: 0.5 },
    { room: 'meeting', type: 'chair_fallen', x: 7.6, z: 3.2, rot: 0.7 },
    { room: 'meeting', type: 'papers', x: 10, z: 3.4 },
    // 品保實驗室：工作台與置物架
    { room: 'qa', type: 'table', x: 14, z: 1.4, solid: 0.5 },
    { room: 'qa', type: 'shelf', x: 17.7, z: 2.5, rot: -Math.PI / 2, solid: 0.28 },
    // 備品室
    { room: 'store', type: 'shelf', x: 18.3, z: 1.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'store', type: 'shelf', x: 18.3, z: 3.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'store', type: 'crate', x: 22.5, z: 4, solid: 0.4 },
    // 走廊
    { room: 'corr', type: 'papers', x: 13.5, z: 6.2 },
    { room: 'corr', type: 'blood', x: 17, z: 6 },
    // 反應槽區：槽體（大桶陣）與管線
    { room: 'reactor', type: 'barrel', x: 3, z: 10, solid: 0.35 },
    { room: 'reactor', type: 'barrel', x: 3.9, z: 10.3, solid: 0.35 },
    { room: 'reactor', type: 'barrel', x: 3.4, z: 11.2, solid: 0.35 },
    { room: 'reactor', type: 'barrel', x: 10.5, z: 9.5, solid: 0.35 },
    { room: 'reactor', type: 'barrel', x: 11.3, z: 10.1, solid: 0.35 },
    { room: 'reactor', type: 'pipe', x: 7, z: 8.2, len: 12, y: 3.9 },
    { room: 'reactor', type: 'pipe', x: 7, z: 17.8, len: 12, y: 3.6 },
    { room: 'reactor', type: 'crate', x: 6.5, z: 14.5, solid: 0.4 },
    { room: 'reactor', type: 'blood', x: 4.5, z: 16.5 },
    { room: 'reactor', type: 'papers', x: 8, z: 12 },
    // E區電氣室：爆發現場
    { room: 'eroom', type: 'blood', x: 2.5, z: 21 },
    { room: 'eroom', type: 'blood', x: 1.5, z: 23 },
    { room: 'eroom', type: 'blood', x: 3.6, z: 23.8 },
    { room: 'eroom', type: 'bodybag', x: 1.2, z: 20.3, rot: 0.4 },
    { room: 'eroom', type: 'crate', x: 4.3, z: 24.2, solid: 0.4 },
    // F區管線
    { room: 'fpipes', type: 'pipe', x: 9.5, z: 20, len: 8, y: 3 },
    { room: 'fpipes', type: 'pipe', x: 9.5, z: 22, len: 8, y: 2.6 },
    { room: 'fpipes', type: 'pipe', x: 9.5, z: 24, len: 8, y: 3.2 },
    { room: 'fpipes', type: 'barrel', x: 6, z: 23.5, solid: 0.35 },
    { room: 'fpipes', type: 'chair_fallen', x: 12, z: 20.5, rot: 2.1 },
    // 倉儲區：貨架木箱陣
    { room: 'warehouse', type: 'shelf', x: 16, z: 9, rot: 0, solid: 0.3 },
    { room: 'warehouse', type: 'shelf', x: 19, z: 9, rot: 0, solid: 0.3 },
    { room: 'warehouse', type: 'shelf', x: 22, z: 9, rot: 0, solid: 0.3 },
    { room: 'warehouse', type: 'crate', x: 16.5, z: 14, solid: 0.4 },
    { room: 'warehouse', type: 'crate', x: 17.4, z: 14.3, solid: 0.4 },
    { room: 'warehouse', type: 'crate', x: 16.9, z: 15.2, solid: 0.4 },
    { room: 'warehouse', type: 'crate', x: 21.5, z: 16.5, solid: 0.4 },
    { room: 'warehouse', type: 'blood', x: 20, z: 12 },
    // 廢液暫存區：桶陣、屍袋、鑰匙卡現場
    { room: 'waste', type: 'barrel', x: 15.5, z: 20.5, solid: 0.35 },
    { room: 'waste', type: 'barrel', x: 16.4, z: 20.8, solid: 0.35 },
    { room: 'waste', type: 'barrel', x: 15.9, z: 21.7, solid: 0.35 },
    { room: 'waste', type: 'barrel', x: 22.5, z: 23.5, solid: 0.35 },
    { room: 'waste', type: 'bodybag', x: 20.5, z: 22.3, rot: 1.2 },
    { room: 'waste', type: 'blood', x: 20.2, z: 22.8 },
    { room: 'waste', type: 'blood', x: 18.5, z: 24 },
    // 貨梯間
    { room: 'freight', type: 'crate', x: 27.2, z: 12.8, solid: 0.4 },
    { room: 'freight', type: 'blood', x: 26, z: 15.5 },
    // 連通道：窗邊雨夜
    { room: 'eastcorr', type: 'chair_fallen', x: 31, z: 13, rot: 0.4 },
    { room: 'eastcorr', type: 'papers', x: 35, z: 15 },
    { room: 'eastcorr', type: 'bodybag', x: 37.5, z: 13.2, rot: 0.2 },
    { room: 'eastcorr', type: 'blood', x: 37.2, z: 13.8 },
    // 警衛室
    { room: 'guard', type: 'table', x: 42, z: 13.5, solid: 0.5 },
    { room: 'guard', type: 'shelf', x: 45.7, z: 17, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'guard', type: 'papers', x: 43, z: 16 },
  ],
  entities: {
    pickups: [
      // 起點裝備（警衛備品的手槍在 start.weapons，辦公室給補給）
      { id: 'p-off-ammo', item: 'handgun_ammo', count: 15, x: 3, z: 1.4 },
      { id: 'p-off-herb', item: 'green_herb', count: 1, x: 5.4, z: 4.2 },
      // 品保實驗室
      { id: 'p-qa-blue', item: 'blue_herb', count: 1, x: 14, z: 1.6 },
      // 備品室
      { id: 'p-st-ammo', item: 'handgun_ammo', count: 15, x: 19, z: 1.5 },
      { id: 'p-st-herb', item: 'green_herb', count: 1, x: 19, z: 3.5 },
      // 反應槽區
      { id: 'p-re-shells', item: 'shotgun_shells', count: 7, x: 6.6, z: 15.2 },
      { id: 'p-re-herb', item: 'green_herb', count: 1, x: 12.5, z: 17.5 },
      // 倉儲區
      { id: 'p-wh-shotgun', item: 'shotgun_weapon', count: 1, x: 19, z: 10 },
      { id: 'p-wh-shells', item: 'shotgun_shells', count: 7, x: 19.8, z: 10.2 },
      { id: 'p-wh-ammo', item: 'handgun_ammo', count: 15, x: 16.5, z: 12 },
      // 廢液暫存區：鑰匙卡＋噴火器
      { id: 'p-keycard', item: 'keycard', count: 1, x: 20.9, z: 22.6 },
      { id: 'p-ws-flamer', item: 'flamethrower_weapon', count: 1, x: 15.5, z: 24.3 },
      { id: 'p-ws-fuel', item: 'fuel', count: 50, x: 16.4, z: 24.5 },
      { id: 'p-ws-herb', item: 'green_herb', count: 1, x: 23, z: 20 },
      // 管線區：解毒補給（巨蛛毒的對策）
      { id: 'p-fp-blue', item: 'blue_herb', count: 1, x: 6.5, z: 20.5 },
      // 貨梯間
      { id: 'p-fr-ammo', item: 'handgun_ammo', count: 15, x: 26.5, z: 13 },
      // 連通道：倒下警衛的衝鋒槍
      { id: 'p-ec-smg', item: 'smg_weapon', count: 1, x: 37.5, z: 13.6 },
      { id: 'p-ec-smgammo', item: 'smg_ammo', count: 30, x: 38.2, z: 13.9 },
      // 警衛室：終點補給
      { id: 'p-gd-spray', item: 'first_aid_spray', count: 1, x: 42, z: 13.7 },
      { id: 'p-gd-shells', item: 'shotgun_shells', count: 7, x: 45, z: 17 },
    ],
    enemies: [
      { id: 'z-tech1', type: 'zombie', x: 1.2, z: 23.5 },
      { id: 'z-tech2', type: 'zombie', x: 3.6, z: 21.2 },
      { id: 'z-r1', type: 'zombie', x: 7, z: 12 },
      { id: 'z-r2', type: 'zombie', x: 11.5, z: 16 },
      { id: 'z-r3', type: 'zombie', x: 3, z: 15.5 },
      { id: 'z-w1', type: 'zombie', x: 19, z: 16.5 },
      { id: 'dog-w', type: 'dog', x: 22, z: 11 },
      { id: 'z-ws1', type: 'zombie', x: 17, z: 22.5 },
      { id: 'z-ws2', type: 'zombie', x: 22, z: 21 },
      { id: 'z-ec1', type: 'zombie', x: 33.5, z: 14.5 },
      { id: 'dog-ec', type: 'dog', x: 36.5, z: 13 },
      // === 變異體（KY 洩漏的產物）===
      { id: 'lurker-wh', type: 'lurker', x: 20, z: 12.5 },   // 倉儲貨架頂的天花板爬行者
      { id: 'spider-fp', type: 'spider', x: 10, z: 22 },     // 管線區巨蛛
      { id: 'spider-re', type: 'spider', x: 11, z: 9.5 },    // 反應槽區巨蛛
      { id: 'creeper-ws', type: 'creeper', x: 18.5, z: 23.2 }, // 廢液區蔓噬花（守著噴火器）
      { id: 'bloater-ws', type: 'bloater', x: 21.5, z: 24 }, // 廢液區脹屍
      { id: 'bloater-er', type: 'bloater', x: 1.5, z: 22 },  // E區脹屍（前技術員）
      { id: 'hunter-ec', type: 'hunter', x: 38.5, z: 15.5 }, // 連通道盡頭：逃脫的實驗體
    ],
    typewriters: [
      { id: 'tw-office', x: 0.8, z: 4.2 },
      { id: 'tw-freight', x: 24.7, z: 16.2 },
      { id: 'tw-guard', x: 45.2, z: 12.8 },
    ],
  },
  // 可收集文件（依原著情節衍生；讀取〈總經理郵件〉獲得大門備援密碼）
  documents: [
    {
      id: 'doc-briefing', title: '量產進度簡報（節錄）', x: 9.5, z: 1.4,
      text: '第 14 頁：F區氣體管線——「壓力測試完成」。\n第 15 頁：E區電氣室——「已正式驗收」。\n第 22 頁：KY 製程優化方案導入後，預估良率 99.2%。\n\n（頁緣有人用鉛筆寫著：全是假的。配管還沒接完。誰簽的字？）',
    },
    {
      id: 'doc-email', title: '總經理郵件（列印稿）', x: 7.2, z: 4.2, grantsKey: 'gatecode',
      text: '主旨：Re: 投資人參訪動線\n\n……參訪當日大門走正常門禁。另，斷電備援密碼本季更新為 0746，僅限主管知悉，勿外流。\n\n（0746——晚上七點四十六分。真諷刺。）',
    },
    {
      id: 'doc-ky', title: 'KY-01 導入說明（殘頁）', x: 13, z: 3.8,
      text: '本品為製程穩定化輔助液。\n成分：（機密）\n毒理資料：（機密）\n廢液處理：（機密）\n\n備註：本品需避免長時間暴露於高溫、高濕、紫外光及生物性污染環境。\n\n供應商：晨星工業（Morningstar Industrial Solutions）',
    },
    {
      id: 'doc-log', title: '值班日誌', x: 4.2, z: 20.2,
      text: '19:02 例行巡檢，E區電盤溫度偏高。\n19:31 聽到電氣室內有滴落聲，門縫有黑色液體滲出。已通報中控。\n19:44 中控無回應。液體在動。我再說一次，液體在動。\n19:46 有東西在裡面撞門。我要去看看。\n\n（日誌到此中斷）',
    },
    {
      id: 'doc-memo', title: '晨星內部備忘：KY-02', x: 19.8, z: 23.4,
      text: '致執行小組：\n\nKY-02 樣本組今晚 21:00 前必須移出廠區，走貨梯至 B1 儲運層，按乙案路線運離。\n\n提醒：KY-02 與 01 不同，具備活性。運送途中禁止開箱、禁止照明直射。\n\n若容器出現滲漏，立即棄置並撤離。不要嘗試回收。\n\n——白',
    },
    {
      id: 'doc-radio', title: '警衛無線電抄錄', x: 44.5, z: 16.5,
      text: '20:11 「B1？B1 沒有人應答。」\n20:15 「晨星的車還停在月台，人呢？」\n20:19 「不要下去。重複，不要下去。B1 的燈全滅了，電梯自己在動。」\n\n（後面的字跡越來越亂）\n他們把東西留在下面了。',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 15.8, z: 2.2, yaw: Math.PI * 0.75, room: 'qa',
      dialog: [
        '亮均！你沒事吧？停電之後整層樓都亂了……我照你說的，把 KY-01 樣品鎖進防爆櫃了。',
        '聽我說——樣品在暗處會發藍光。助理只是碰到外瓶殘液，手背就爛出黑色水泡。這不是化學灼傷，比較像……感染。',
        '剛剛 E 區傳來撞門的聲音，警衛下去看，到現在沒回來。對講機只剩雜訊。',
        '你要過去的話，把這個帶著——實驗室的解毒草藥，還有備用彈匣。貨梯的鑰匙卡在晨星那批黑衣人身上，我看到他們往廢液區去了。',
        '我會把實驗室鎖好等救援。活著回來，副理。',
      ],
      dialogAfter: '快去吧。記住——別碰任何發藍光的東西。',
      gift: [
        { item: 'blue_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 't-reactor', room: 'reactor', text: '廠房深處傳來金屬撞擊聲……和某種拖行的腳步聲。', sound: 'groan' },
    { id: 't-eroom', room: 'eroom', text: 'E區電氣室——黑色的液體佈滿地板，在暗處泛著藍光。', sound: 'groan', alert: true },
    { id: 't-waste', room: 'waste', text: '空氣裡有腐敗的甜味。牆角的屍袋……在動？', alert: true },
    { id: 't-eastcorr', room: 'eastcorr', text: '玻璃窗外，雨下得更大了。遠處有犬吠。', sound: 'dogbark' },
    { id: 't-guard', room: 'guard', text: '大門就在前面——離開這裡！' },
  ],
  start: { weapons: [{ id: 'handgun', rounds: 15 }], items: [] },
  objective: '找到品保實驗室的林欣儀（走廊東側）',
};
