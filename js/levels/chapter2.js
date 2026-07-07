// 第二章〈KY添加劑〉：停電當晚的柳營新廠。使用者原著劇情。
// 周亮均逃到警衛室卻發現封廠、欣儀在品保實驗室求救——只能折返，
// 追查 E 區黑色滲液、KY 真相，對抗第一隻 KY 變異體，帶著證據逃出。
// 內心獨白（monologue）＝周亮均喃喃自語的不安，用觸發器承載、以斜體呈現。
export const CHAPTER2 = {
  id: 'chapter2',
  name: '第二章：KY添加劑',
  next: 'chapter3',
  exitNeeds: 'evidence',
  exitHint: '沒有證據就這樣逃出去，沒有人會相信——欣儀說品保實驗室裡有他們真正的導入計畫',
  spawn: { x: 2, z: 1.5, yaw: Math.PI / 2 }, // 廠務走廊西端，面向東
  lockNames: { fireext: '滅火器', evidence: 'KY 導入證據', chapterExit: '安全梯' },
  story: [
    '警衛室的大門在眼前緩緩落下。\n\n保全柵欄降到一半，卡住了——但那道縫，已經窄到人鑽不出去。\n\n停車場旁，幾輛晨星工業的黑色廂型車正駛入廠區。\n\n周亮均盯著那些車，忽然懂了總經理廣播的意思。\n\n「封閉管理」不是為了保護誰。是為了不讓任何東西——任何人——離開。',
    '對講機在腰間響起，是欣儀，聲音壓得極低。\n\n「亮均……我在 B 棟品保實驗室。那個助理變了，他咬了人，往醫護室跑了。我手上有 KY 真正的導入計畫，三週前就混進清洗流程了——反應槽、廢液桶，可能全污染了。」\n\n背景傳來一聲金屬托盤落地的巨響，然後是壓抑的尖叫。\n\n「欣儀？欣儀！」\n\n只剩雜訊。',
    '周亮均轉身，往廠區裡跑。\n\n（走不了。門封了，訊號斷了，連我的門禁權限都被停用了。）\n\n（可是欣儀還在裡面。而且如果她說的是真的——這東西已經進了管線三週，那停電、那灘黑色液體，全都說得通了。）\n\n（那不是外洩。是系統回流。整座廠，早就是一個培養皿。）\n\n他握緊手裡的手電筒。\n\n目標只有一個：到 B 棟品保實驗室，找到欣儀，帶著證據活著出去。',
  ],
  objective: '穿過廠區到 B 棟品保實驗室，找到林欣儀',
  rooms: [
    { id: 'corr', name: '廠務走廊', x: 0, z: 0, w: 22, d: 3, h: 2.8, floor: 'tile', walls: 'plaster',
      light: { x: 11, y: 2.4, z: 1.5, color: 0x8fd0a0, intensity: 16, flicker: true } }, // 緊急照明淡綠
    { id: 'eroom', name: 'E區電氣室', x: 0, z: 3, w: 6, d: 6, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 3, y: 3, z: 6, color: 0x66ffaa, intensity: 12, flicker: true } }, // KY 藍綠光
    { id: 'storage', name: '原料暫存區', x: 6, z: 3, w: 7, d: 8, h: 3.6, floor: 'tile', walls: 'metal',
      light: { x: 9.5, y: 3.2, z: 7, color: 0xffd9a0, intensity: 22, flicker: true } },
    { id: 'qalab', name: 'B棟品保實驗室', x: 13, z: 3, w: 9, d: 9, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 17.5, y: 3, z: 7.5, color: 0x9fc4ff, intensity: 20, flicker: true } }, // 儀器冷光
    { id: 'medbay', name: '醫護室', x: 22, z: 0, w: 6, d: 6, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 25, y: 2.6, z: 3, color: 0xffe0b0, intensity: 24, flicker: true } },
    { id: 'fireexit', name: '安全梯', x: 22, z: 6, w: 6, d: 5, h: 4, floor: 'metal', walls: 'metal',
      light: { x: 25, y: 3.6, z: 8.5, color: 0xaaccee, intensity: 26 } },
  ],
  doors: [
    { id: 'd2-corr-eroom', from: 'corr', to: 'eroom', axis: 'x', at: [3, 3], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-corr-storage', from: 'corr', to: 'storage', axis: 'x', at: [9, 3], width: 1.3, height: 2.2, lock: null },
    { id: 'd2-corr-qalab', from: 'corr', to: 'qalab', axis: 'x', at: [17, 3], width: 1.3, height: 2.3, lock: 'fireext' }, // 門禁停權→滅火器砸開
    { id: 'd2-corr-medbay', from: 'corr', to: 'medbay', axis: 'z', at: [22, 1.5], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-medbay-fireexit', from: 'medbay', to: 'fireexit', axis: 'x', at: [25, 6], width: 1.2, height: 2.2, lock: null },
    { id: 'd2-exit', from: 'fireexit', to: null, axis: 'x', at: [25, 11], width: 1.4, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 廠務走廊：翻倒推車、散落文件、血跡
    { room: 'corr', type: 'chair_fallen', x: 5, z: 1, rot: 1.2 },
    { room: 'corr', type: 'papers', x: 8, z: 2 },
    { room: 'corr', type: 'blood', x: 13, z: 1.5 },
    { room: 'corr', type: 'crate', x: 20, z: 0.8, solid: 0.4 },
    { room: 'corr', type: 'pipe', x: 11, z: 0.5, len: 20, y: 2.5 },
    // E區電氣室：黑色滲液現場（用血跡代表黑色液體）、機櫃
    { room: 'eroom', type: 'blood', x: 3, z: 8 },
    { room: 'eroom', type: 'blood', x: 2, z: 6.5 },
    { room: 'eroom', type: 'blood', x: 4.2, z: 7 },
    { room: 'eroom', type: 'crate', x: 1, z: 4, solid: 0.4 },
    { room: 'eroom', type: 'barrel', x: 5, z: 4.2, solid: 0.35 },
    { room: 'eroom', type: 'pipe', x: 3, z: 3.6, len: 5, y: 2.9 },
    // 原料暫存區：桶陣、置物架（滅火器在這）
    { room: 'storage', type: 'barrel', x: 7.5, z: 5, solid: 0.35 },
    { room: 'storage', type: 'barrel', x: 8.4, z: 5.4, solid: 0.35 },
    { room: 'storage', type: 'barrel', x: 7.9, z: 6.3, solid: 0.35 },
    { room: 'storage', type: 'shelf', x: 12.6, z: 6, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'storage', type: 'crate', x: 11, z: 9.5, solid: 0.4 },
    { room: 'storage', type: 'papers', x: 9, z: 9 },
    // 品保實驗室：工作台、抽風櫃、樣品桌、拖拽血痕
    { room: 'qalab', type: 'table', x: 16, z: 5, solid: 0.5 },
    { room: 'qalab', type: 'table', x: 20, z: 9, rot: 0.3, solid: 0.5 },
    { room: 'qalab', type: 'shelf', x: 21.6, z: 6, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'qalab', type: 'blood', x: 18, z: 7 }, // 拖拽痕
    { room: 'qalab', type: 'blood', x: 19.5, z: 8.5 },
    { room: 'qalab', type: 'bodybag', x: 14.5, z: 10.5, rot: 0.5 },
    { room: 'qalab', type: 'papers', x: 16, z: 5.2 },
    // 醫護室：病床、翻倒器材、血
    { room: 'medbay', type: 'chair_fallen', x: 24, z: 2, rot: 2.1 },
    { room: 'medbay', type: 'blood', x: 25, z: 3.5 },
    { room: 'medbay', type: 'bodybag', x: 26.5, z: 4.5, rot: 1.1 }, // 被咬的護理師
    { room: 'medbay', type: 'papers', x: 23.5, z: 4 },
    // 安全梯
    { room: 'fireexit', type: 'crate', x: 23, z: 9.5, solid: 0.4 },
    { room: 'fireexit', type: 'blood', x: 25, z: 8 },
    { room: 'fireexit', type: 'cardboard', x: 26.8, z: 7.2 },
    // 地面雜物與遺體（v3.6.0 環境營造）
    { room: 'corr', type: 'debris', x: 10.5, z: 1.9 },
    { room: 'corr', type: 'cardboard', x: 18.5, z: 2.2 },
    { room: 'storage', type: 'cardboard', x: 10.8, z: 4.2 },
    { room: 'storage', type: 'corpse', x: 8.6, z: 8.4, variant: 0 }, // 暫存區倉管
    { room: 'qalab', type: 'corpse', x: 15.2, z: 6.8, variant: 2 }, // 被咬斷喉嚨的晨星人員
    { room: 'qalab', type: 'debris', x: 18.8, z: 10.4 },            // 破裂試管與翻倒器材
    { room: 'medbay', type: 'corpse', x: 26.4, z: 2.6, variant: 1 }, // 白袍醫護
    { room: 'medbay', type: 'debris', x: 24.6, z: 4.6 },
  ],
  // 地面危險區：黑色 KY 滲液、倒地燃燒的酒精燈（原著第二章環境危險）
  hazards: [
    { room: 'eroom', type: 'slime', x: 3.2, z: 7.4, r: 0.9 },
    { room: 'qalab', type: 'fire', x: 14.8, z: 7.8, r: 0.7 },  // 燃燒的酒精燈
    { room: 'qalab', type: 'slime', x: 17.8, z: 8.2, r: 0.75 },
    { room: 'medbay', type: 'slime', x: 23.2, z: 4.9, r: 0.7 },
  ],
  documents: [
    {
      id: 'g2-doc-sds', title: 'KY-01 安全資料表（僅一頁）', x: 3, z: 5,
      text: '品名：KY-01 製程穩定化輔助液\n供應商：晨星工業\n成分：機密\n毒理：機密\n\n（整頁只有這幾行有字。頁腳被人用原子筆重重寫下一句：）\n\n「這種東西不該靠近電氣室。是誰把它藏進來的？」',
    },
    {
      id: 'g2-doc-camlog', title: 'E區監視器維護單', x: 4.5, z: 8,
      text: '斷訊時間：停電前 7 分鐘\n維護人員：（空白）\n事由：（空白）\n\n（周亮均盯著這張單子——）\n\n（停電前七分鐘。太準了。準到不像事故。是有人先關了眼睛，才開始動手。）',
    },
    {
      id: 'g2-doc-pipeline', title: '管線鈍化測試紀錄（三週前）', x: 9, z: 9.2,
      text: '測試項目：清洗流程管線鈍化\n導入藥劑：KY-01（稀釋）\n範圍：反應槽 → 清洗水 → 廢液暫存桶\n\n（欣儀說得沒錯。KY 不是今天才進廠。）\n\n（三週。它在管線裡走了三週。反應槽、排水、廢氣洗滌塔……我們喝的、呼吸的、踩過的，全都可能有。）\n\n（E 區那灘黑色液體不是外洩。是它回家了。）',
    },
    {
      id: 'g2-doc-xinyi', title: '林欣儀的手寫筆記', x: 18.5, z: 5, grantsKey: 'evidence',
      text: 'KY-01 並非單純添加劑。疑似含有可反應性生物載體。\n外瓶殘留物接觸皮膚後，出現黑色壞死斑。\n樣品在 37°C 環境下活性明顯上升。\n接觸血液後發生快速增殖反應。\n\n（最後一行字寫得很急，筆跡幾乎劃破紙面——）\n\n「這不是製程材料，是病毒。」\n\n（他們不是在做量產。他們是拿整座工廠當培養皿。這張紙，就是證據。收好。）',
    },
    {
      id: 'g2-doc-order', title: '晨星內部指令（撕去半頁）', x: 26.5, z: 4.8,
      text: '致 E 區回收小組：\n\n材料穩定性偏差已進入不可控階段。即刻封鎖現場，回收所有殘留物。\n\n（後半頁被撕掉了。地上的碎片只剩四個字——）\n\n「一併……處理。」\n\n（處理現場。處理殘留物。處理……看到的人。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 20, z: 9.2, yaw: Math.PI, room: 'qalab',
      dialog: [
        '（欣儀倒在冷藏櫃旁，左臂一道傷口，臉色蒼白但意識清楚）\n亮均……你怎麼進來的？門禁不是被停了嗎？',
        '那個助理……不是人了。晨星的人把他帶進來要做血液檢測，他突然抽搐，然後咬斷了其中一個人的喉嚨。',
        '樣品桌上那瓶 KY-01——你看到它發藍光了嗎？剛才那東西本來要撲我，一看到瓶子就停了。它不是失去理智……它是在找 KY。病毒在驅使宿主回到源頭。',
        '我的筆記在桌上，拿走。那是唯一能證明他們拿工廠當培養皿的東西。沒有它，我們就算逃出去，也只是兩個瘋子在亂講話。',
        '扶我起來。安全梯在醫護室後面……但那東西還在附近。動作快，別碰任何發藍光的東西。',
      ],
      dialogAfter: '（欣儀按著手臂）別管我了，先確認證據在你身上。走安全梯。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g2-t-corr', room: 'corr', text: '緊急照明一盞盞亮起，淡綠色的光讓整條走廊像一具剛從水裡撈上來的屍體。',
      monologue: '（十三分鐘才接上備用電源。這停電，停得太乾淨了。）' },
    { id: 'g2-t-eroom', room: 'eroom', text: 'E區電氣室——黑色液體從機櫃縫隙滲出，表面泛著極淡的藍光，像有生命一樣沿地面爬。',
      sound: 'groan', shake: 0.06, monologue: '（添加劑不該出現在電氣室。除非有人在裡面做了不該做的事。）' },
    { id: 'g2-t-storage', room: 'storage', text: '原料暫存區。牆邊掛著一具滅火器——玻璃門禁擋在品保實驗室前，也許用得上。',
      monologue: '（我的權限被切了。白博士說得對——出事時，扛責任的從來不是最有權力的人。）' },
    { id: 'g2-t-qalab', room: 'qalab', text: '空氣裡有消毒水、鐵鏽、腐肉，還混著淡淡的甜味。樣品桌上，半瓶 KY-01 在無人攪拌下，自己形成一道道漩渦。',
      sound: 'groan', alert: true, shake: 0.08, monologue: '（幽藍色光絲在液體裡游動，像活體神經。這就是他們要藏的東西。）' },
    { id: 'g2-t-medbay', room: 'medbay', text: '醫護室。牆上噴濺著早已乾涸的血。那個被咬的護理師……不在床上。',
      sound: 'bite', alert: true },
    { id: 'g2-t-fireexit', room: 'fireexit', text: '安全梯就在前面。往上是地面層，往下是黑。只要證據在身上——爬上去就是活路。' },
  ],
  entities: {
    pickups: [
      { id: 'g2-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 1.5 },
      { id: 'g2-p-herb1', item: 'green_herb', count: 1, x: 15, z: 1.5 },
      { id: 'g2-p-fireext', item: 'fireext', count: 1, x: 12.4, z: 6 }, // 原料暫存區置物架旁——開品保門的關鍵
      { id: 'g2-p-shells1', item: 'shotgun_shells', count: 7, x: 8, z: 6 },
      { id: 'g2-p-shotgun', item: 'shotgun_weapon', count: 1, x: 7.6, z: 9.5 },
      { id: 'g2-p-blue1', item: 'blue_herb', count: 1, x: 5, z: 5 },
      { id: 'g2-p-ammo2', item: 'handgun_ammo', count: 15, x: 16, z: 9.5 },
      { id: 'g2-p-shells2', item: 'shotgun_shells', count: 7, x: 21, z: 6 },
      { id: 'g2-p-spray1', item: 'first_aid_spray', count: 1, x: 24, z: 2 },
      { id: 'g2-p-herb2', item: 'green_herb', count: 1, x: 26, z: 3.5 },
      { id: 'g2-p-ammo3', item: 'handgun_ammo', count: 15, x: 23, z: 9 },
    ],
    enemies: [
      { id: 'g2-z1', type: 'zombie', x: 15, z: 1.5 }, // 走廊早期感染者
      { id: 'g2-z2', type: 'zombie', x: 4, z: 6 },    // E區
      { id: 'g2-z3', type: 'zombie', x: 9, z: 7 },    // 暫存區
      { id: 'g2-z4', type: 'zombie', x: 10.5, z: 5 },
      { id: 'g2-mutant', type: 'mutant', x: 18, z: 9 }, // ★ 第一隻 KY 變異體（那個助理）——品保實驗室
      { id: 'g2-z5', type: 'zombie', x: 24, z: 4 },    // 醫護室（變異的護理師）
      { id: 'g2-z6', type: 'zombie', x: 25, z: 8.5 },
    ],
    typewriters: [
      { id: 'g2-tw-corr', x: 1, z: 2.3 },
      { id: 'g2-tw-fireexit', x: 26.5, z: 9.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }], items: [] },
};
