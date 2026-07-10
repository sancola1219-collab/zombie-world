// 第四章〈聖時爆君〉：柳營新廠地下廢液暫存區。使用者原著劇情。
// 緊急出口被外面鎖死，晨星工業把整座廠變成屠宰場。廢液 T-04 槽其實是 KY 培養槽。
// 大魔王「聖時爆君」（S-10 戰術適應體，晨星鎮壓小隊隊長改造）扛火箭筒登場——
// 無法正面擊殺的追殺型 Boss。玩家在被追殺下逃亡，最後拔下物料提升機的釋放插銷，
// 讓配重墜落卡住聖時爆君，炸開往 F 區的路逃脫。
// 結尾伏筆：周亮均決定反過來回行政大樓，找出完整證據對峙白博士（第五章）。
export const CHAPTER4 = {
  id: 'chapter4',
  name: '第四章：聖時爆君',
  next: 'chapter5', // 銜接街道篇〈斷電的街區〉
  exitNeeds: 'liftkey',
  exitHint: '這扇門也被鎖死了。硬闖沒用——得先到二樓平台，拔下物料提升機的釋放插銷，用配重砸出一條路',
  spawn: { x: 2, z: 1.5, yaw: -Math.PI / 2 }, // 廢液暫存區，面向東（往維修通道）
  lockNames: { liftkey: '提升機釋放插銷', chapterExit: '通往 F 區的維修門' },
  isBossLevel: true,
  story: [
    '廢液暫存區的緊急出口，被從外面鎖死了。\n\n周亮均連續拉了三次，厚重的鐵門只發出沉悶的撞擊聲，電子鎖亮著紅燈，像一隻冷漠的眼睛。\n\n林欣儀靠在牆邊，左臂的傷口滲著血。\n\n「所以他們連逃生門都鎖了？」\n\n亮均沒有回答。逃生門、門禁、訊號、監視器、空調、大門，全都被接管。晨星工業不是來支援事故——他們是來接管屠宰場。',
    '幾座巨大的暫存槽立在黑暗中，管線像血管纏繞在牆面。最深處那座編號 T-04 的槽體，不斷傳出低沉撞擊。\n\n咚。咚。咚。\n\n頭頂的廣播響起，白博士的聲音：「KY 病毒最有價值的，不是感染，而是適應。它能把環境壓力變成進化條件。」\n\n欣儀罵道：「你們把工廠當實驗室，把員工當耗材！」\n\n「請精準一點。」白博士平靜地說，「不是耗材，是樣本。」',
    '廢液區另一側的捲門緩緩升起，刺耳的金屬摩擦聲迴盪。\n\n先是腳步聲。沉重。穩定。每一步落地，地面都微微震動。\n\n黑暗中，一個至少三公尺高的身影出現。灰黑膨脹的肌肉爬滿青藍血管，右手扛著一具火箭筒——外殼印著晨星工業的紅白標誌。\n\n白博士宣告：「第一戰術適應體，S-10 型。正式名稱，聖時爆君。」\n\n它抬起火箭筒。亮均臉色驟變：「趴下——」\n\n轟！牆面被炸開一個缺口。「他幫我們開路了。走！」',
  ],
  endingText:
    '維修門在配重墜落的巨響中被撞開。身後，聖時爆君的左臂正把壓住自己的物料平台一寸寸推開，鋼架發出彎曲的呻吟——他沒有倒下，甚至沒有減速。周亮均拉著林欣儀衝進 F 區橋廊，握緊口袋裡的隨身碟。他們不再只是逃。橋廊的另一端，是行政大樓三樓——白博士和高層所在的地方。「他們以為我們只會逃。」亮均低聲說，「這次，換我們去找他們。」〔第五章 待續〕',
  objective: '在聖時爆君的追殺下逃出廢液區，抵達二樓拔下提升機插銷，衝向 F 區',
  rooms: [
    { id: 'wastetank', name: '廢液暫存區', x: 0, z: 0, w: 8, d: 10, h: 4.2, floor: 'metal', walls: 'metal',
      light: { x: 4, y: 3.6, z: 5, color: 0x66aa66, intensity: 14, flicker: true } }, // 廢液綠光
    { id: 'repair', name: '維修通道', x: 8, z: 0, w: 12, d: 4, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 14, y: 2.6, z: 2, color: 0xff5533, intensity: 12, flicker: true } }, // 紅色警示（標路）
    { id: 'liftshaft', name: '物料提升機井', x: 8, z: 4, w: 5, d: 8, h: 5, floor: 'metal', walls: 'metal',
      light: { x: 10.5, y: 4.2, z: 8, color: 0xa88030, intensity: 11, flicker: true } }, // 昏黃工作燈
    { id: 'platform2f', name: '二樓平台', x: 13, z: 4, w: 7, d: 7, h: 3.4, floor: 'metal', walls: 'plaster',
      light: { x: 16.5, y: 2.9, z: 7.5, color: 0x9fd0e0, intensity: 20, flicker: true } }, // 控制盤藍白光
    { id: 'fcorr', name: 'F 區走道', x: 20, z: 4, w: 5, d: 9, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 22.5, y: 2.6, z: 8, color: 0x88bbaa, intensity: 16 } },
  ],
  doors: [
    { id: 'd4-tank-repair', from: 'wastetank', to: 'repair', axis: 'z', at: [8, 2], width: 1.5, height: 2.6, lock: null },
    { id: 'd4-repair-lift', from: 'repair', to: 'liftshaft', axis: 'x', at: [10.5, 4], width: 1.3, height: 2.3, lock: null },
    { id: 'd4-lift-plat', from: 'liftshaft', to: 'platform2f', axis: 'z', at: [13, 7], width: 1.3, height: 2.3, lock: null },
    { id: 'd4-plat-fcorr', from: 'platform2f', to: 'fcorr', axis: 'z', at: [20, 7.5], width: 1.3, height: 2.3, lock: null },
    { id: 'd4-exit', from: 'fcorr', to: null, axis: 'x', at: [22.5, 13], width: 1.5, height: 2.5, lock: 'chapterExit' },
  ],
  props: [
    // 廢液暫存區：巨大培養槽、管線、黑水、桶陣
    { room: 'wastetank', type: 'barrel', x: 6, z: 8.5, solid: 0.55 }, // T-04 培養槽（大）
    { room: 'wastetank', type: 'barrel', x: 6.9, z: 8.9, solid: 0.4 },
    { room: 'wastetank', type: 'barrel', x: 1.5, z: 6, solid: 0.35 },
    { room: 'wastetank', type: 'barrel', x: 2.4, z: 6.4, solid: 0.35 },
    { room: 'wastetank', type: 'pipe', x: 4, z: 0.6, len: 9, y: 3.6 },
    { room: 'wastetank', type: 'pipe', x: 0.6, z: 5, len: 9, y: 3.2 },
    { room: 'wastetank', type: 'blood', x: 3, z: 8 },
    { room: 'wastetank', type: 'blood', x: 5, z: 4 },
    { room: 'wastetank', type: 'bodybag', x: 1.2, z: 9, rot: 0.5 },
    { room: 'wastetank', type: 'crate', x: 3.5, z: 2.5, solid: 0.4 },
    // 維修通道：管線、翻倒的桶（Boss 炸出的殘骸）
    { room: 'repair', type: 'pipe', x: 14, z: 0.5, len: 11, y: 2.6 },
    { room: 'repair', type: 'barrel', x: 11, z: 3, solid: 0.35 },
    { room: 'repair', type: 'crate', x: 17, z: 1, solid: 0.4 },
    { room: 'repair', type: 'blood', x: 13, z: 2 },
    { room: 'repair', type: 'chair_fallen', x: 18.5, z: 3, rot: 1.2 },
    // 物料提升機井：井道、鋼梯感（管線）、掩體
    { room: 'liftshaft', type: 'pipe', x: 8.6, z: 8, len: 7, y: 4.5 },
    { room: 'liftshaft', type: 'crate', x: 9, z: 10, solid: 0.4 },
    { room: 'liftshaft', type: 'barrel', x: 12, z: 6, solid: 0.35 },
    { room: 'liftshaft', type: 'blood', x: 10.5, z: 9 },
    // 二樓平台：控制盤（桌）、監控、翻椅
    { room: 'platform2f', type: 'table', x: 16, z: 9, solid: 0.5 }, // 物料提升機維修控制盤
    { room: 'platform2f', type: 'papers', x: 16, z: 9.2 },
    { room: 'platform2f', type: 'shelf', x: 14, z: 5.5, rot: 0, solid: 0.3 },
    { room: 'platform2f', type: 'chair_fallen', x: 18, z: 6, rot: 0.7 },
    { room: 'platform2f', type: 'blood', x: 15, z: 7 },
    // F 區走道：往行政大樓橋廊
    { room: 'fcorr', type: 'pipe', x: 22.5, z: 5, len: 8, y: 2.7 },
    { room: 'fcorr', type: 'crate', x: 21, z: 10, solid: 0.4 },
    { room: 'fcorr', type: 'blood', x: 23, z: 9 },
    // 地面雜物與遺體（v3.6.0 環境營造）
    { room: 'wastetank', type: 'corpse', x: 5.5, z: 8.2, variant: 0 },
    { room: 'wastetank', type: 'debris', x: 2.2, z: 3.4 },
    { room: 'repair', type: 'debris', x: 11, z: 2.8 },
    { room: 'repair', type: 'cardboard', x: 17.5, z: 1.2 },
    { room: 'platform2f', type: 'corpse', x: 14.5, z: 5.6, variant: 2 }, // 沒躲過火箭的晨星兵
    { room: 'fcorr', type: 'debris', x: 21.2, z: 6.5 },
    { room: 'fcorr', type: 'cardboard', x: 23.6, z: 11.6 },
  ],
  // 地面危險區：廢液滲流、帶電積水、火箭餘燼（原著第四章環境危險）
  hazards: [
    { room: 'wastetank', type: 'slime', x: 3, z: 7, r: 1.0 },
    { room: 'wastetank', type: 'slime', x: 5.5, z: 3.5, r: 0.8 },
    { room: 'repair', type: 'shock', x: 14, z: 2, r: 0.8 },      // 斷裂電纜泡在積水裡——跳過去
    { room: 'platform2f', type: 'fire', x: 18.5, z: 9.2, r: 0.75 }, // 火箭轟擊的餘燼
    { room: 'fcorr', type: 'fire', x: 22, z: 10.4, r: 0.8 },
  ],
  documents: [
    {
      id: 'g4-doc-tank', title: 'T-04 廢液槽異常監測記錄', x: 5.5, z: 7.5,
      text: '槽體：T-04（清洗水／反應殘液集中）\n\n近三週監測：\n・pH 持續異常震盪\n・溶氧歸零\n・槽壁生物膜增生（非預期）\n・夜間偵測到規律性內部撞擊\n\n（廢酸、金屬離子、清洗水、有機殘留，再加上 KY 的活性載體……這裡不是廢液槽了。是培養槽。）',
    },
    {
      id: 'g4-doc-s10', title: '晨星工業：S-10 戰術適應體改造報告', x: 15, z: 2,
      text: '原始宿主：晨星鎮壓小隊隊長，代號「聖時」。\n\n改造方向：不追求數量，追求「保留戰術本能的單體」。\n注入 KY 強化載體後，宿主體格膨脹逾 150%，力量、耐損遠超常規變異體，且——關鍵——保留了判斷、瞄準、目標選擇能力。\n配武：制式火箭發射器。\n\n（拿著火箭筒、還有智力的怪物。這不是實驗。是處決。）',
    },
    {
      id: 'g4-doc-lift', title: '物料提升機維修控制盤', x: 16, z: 9, grantsKey: 'liftkey',
      text: '【手動維修模式】\n\n步驟：\n1. 切換配重系統至手動\n2. 拔下「緊急釋放插銷」\n3. 平台將失去制動、高速墜落\n\n※ 警告：釋放後平台與配重不可回收。\n\n（插銷拔下來了。下方那東西正試著穿過梯井口——身體太大，動作受限。就是現在。壓不死他，但可以拖住他，替我們炸出一條路。）',
    },
    {
      id: 'g4-doc-bridge', title: 'F 區平面圖：行政大樓連通橋廊', x: 22, z: 11, monoAfter: true,
      text: 'F 區走道 → 文件室 → 備用電腦室 → 行政大樓內部橋廊（三樓）。\n\n（只靠隨身碟不夠。監視器斷訊、訊號阻斷——資料送不出去。要把證據送出這座廠，需要外部連線。而還在線上的外部節點，只剩行政大樓三樓。）\n\n（白博士以為我們只會逃。這次，換我們回去找他。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 14, z: 6.2, yaw: Math.PI, room: 'platform2f',
      dialog: [
        '（欣儀按著左臂，喘著氣）那東西……他不是普通變異體。他在看我們，他在判斷該往哪追。',
        '他為什麼不直接衝過來？他明明追得上。',
        '（她忽然明白）……他在逼我們往指定方向走。白博士要看我們怎麼逃、怎麼判斷、怎麼被追。他在收集數據。',
        '（她看向控制盤）物料提升機……如果放下配重，能不能把他壓住？',
        '壓不死他，我知道。但只要能拖住一分鐘——就夠我們衝過那道被炸開的牆了。快，拔插銷！',
      ],
      dialogAfter: '（欣儀盯著梯井下方）他在推那塊平台了……鋼架在彎。動作要快。',
      gift: [
        { item: 'magnum_ammo', count: 6 },
        { item: 'first_aid_spray', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g4-t-tank', room: 'wastetank', text: 'T-04 廢液槽的方向傳來規律撞擊——咚，咚，咚。像有巨大的東西正在槽體內部撞擊。', sound: 'groan', alert: true, shake: 0.08,
      monologue: '（原本只是收集清洗水、反應殘液的地方。現在卻在……孵化什麼。這座廠的每一道製程，都被拿來餵養它。）' },
    { id: 'g4-t-repair', room: 'repair', text: '維修通道兩側的紅燈依序亮起，像在替你標路——一路通往某個「適合觀察」的方向。', sound: 'door',
      monologue: '（紅燈在標路。如果照著跑，只會被趕進更適合觀察的區域。白博士不只要殺我們，他要看我們怎麼被追。那就偏偏不照他的走。）' },
    { id: 'g4-t-lift', room: 'liftshaft', text: '狹窄的提升機井。身後傳來金屬被硬生生撕開的巨響——那東西把牆拆了。', sound: 'groan', alert: true, shake: 0.12,
      monologue: '（門太小，他進不來——但這根本擋不住他。他直接把牆撕開。力量遠超估計。如果普通變異體是失控感染，那他就是被設計出來的戰爭機器。）' },
    { id: 'g4-t-plat', room: 'platform2f', text: '二樓平台。物料提升機的維修控制盤就在眼前，電源還亮著。下方，聖時爆君正卡在梯井口。', alert: true,
      monologue: '（配重系統還能手動控制。他的身體太大，卡在梯井口，動作受限。這是唯一的機會——不是打倒他，是拖住他。）' },
    { id: 'g4-t-fcorr', room: 'fcorr', text: 'F 區走道。空氣終於不再濕冷刺鼻。橋廊的另一端，隱約是行政大樓的燈光。', sound: 'door',
      monologue: '（身後的巨響還在。他掀開了平台。但我們已經到了 F 區。這一次，我們不只是逃——我們要帶著全部的證據，回去找他們。）' },
  ],
  entities: {
    pickups: [
      { id: 'g4-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 3 },
      { id: 'g4-p-shells1', item: 'shotgun_shells', count: 7, x: 4, z: 7.5 },
      { id: 'g4-p-herb1', item: 'green_herb', count: 1, x: 1.5, z: 8 },
      { id: 'g4-p-rocket', item: 'rocket_weapon', count: 1, x: 3, z: 4.5 }, // 火箭炮——牽制聖時爆君
      { id: 'g4-p-rammo1', item: 'rocket_ammo', count: 2, x: 3.6, z: 4.7 },
      { id: 'g4-p-spray1', item: 'first_aid_spray', count: 1, x: 18, z: 1 },
      { id: 'g4-p-magammo1', item: 'magnum_ammo', count: 6, x: 12, z: 2.5 },
      { id: 'g4-p-smgammo', item: 'smg_ammo', count: 30, x: 11.5, z: 10 },
      { id: 'g4-p-herb2', item: 'green_herb', count: 1, x: 9.5, z: 6 },
      { id: 'g4-p-shells2', item: 'shotgun_shells', count: 7, x: 14, z: 5.5 },
      { id: 'g4-p-blue1', item: 'blue_herb', count: 1, x: 18, z: 6 },
      { id: 'g4-p-rammo2', item: 'rocket_ammo', count: 1, x: 21.5, z: 6 },
      { id: 'g4-p-ammo2', item: 'handgun_ammo', count: 15, x: 23, z: 10 },
      { id: 'g4-p-spray2', item: 'first_aid_spray', count: 1, x: 21, z: 5.5 },
    ],
    enemies: [
      { id: 'g4-warlord', type: 'warlord', x: 6, z: 9 }, // ★ 聖時爆君：從廢液區捲門登場
      { id: 'g4-z1', type: 'zombie', x: 4, z: 5 },       // 廢液區殘餘
      { id: 'g4-mutant1', type: 'mutant', x: 13, z: 2 }, // 維修通道變異體
      { id: 'g4-mutant2', type: 'mutant', x: 11, z: 8 }, // 提升機井變異體
      { id: 'g4-agent1', type: 'agent', x: 17, z: 6 },   // 二樓晨星清除小組
      { id: 'g4-z2', type: 'zombie', x: 22, z: 9 },      // F 區
    ],
    typewriters: [
      { id: 'g4-tw-tank', x: 0.8, z: 1 },
      { id: 'g4-tw-plat', x: 13.6, z: 4.8 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
