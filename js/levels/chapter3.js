// 第三章〈封口名單〉：柳營新廠地下層。使用者原著劇情。
// 周亮均與林欣儀逃入地下，潛入資訊機房抓出「KY 風險人員分級表」（封口名單），
// 對抗晨星清除小組（黑衣人），發現「廠區淨化程序」倒數——全面滅證。
// 結尾伏筆：廢液槽裡的東西醒來（第四章 Boss）。無 Boss 戰，追查＋逃亡型。
export const CHAPTER3 = {
  id: 'chapter3',
  name: '第三章：封口名單',
  next: 'chapter4', // 銜接第四章〈聖時爆君〉
  exitNeeds: 'dossier',
  exitHint: '空手逃出去沒有意義——白博士說得對，外面不會相信兩個事故責任人。得先拿到那份名單',
  spawn: { x: 2, z: 2, yaw: Math.PI / 2 }, // 安全梯底，面向東（往地下層）
  lockNames: { dossier: 'KY 風險人員分級表', chapterExit: '緊急出口' },
  story: [
    '品保實驗室的玻璃門碎裂時，整棟 B 棟都聽見了。\n\n那不是普通玻璃破掉的聲音，而像是某種規則被硬生生撕開。\n\n周亮均扶著林欣儀衝進安全梯，反手把防火門推上。門闔上的瞬間，門外傳來濕重的撞擊聲。\n\n砰。砰。每一下都不像人類的力道。',
    '手機訊號剩一格。撥外線、打中控，都沒人接。\n\n（監視器斷訊、門禁被拔、訊號阻斷、大門降下——這不是面對事故的混亂，是一套事先設計好的封鎖流程。）\n\n（換句話說，他們早就知道 KY 會失控。甚至……他們等著它失控。）',
    '「我們去資訊機房。」\n\n欣儀愣住：「不是往一樓逃？」\n\n「一樓有人守著。機房還有內網備份——如果我的維修權限沒被拔掉，或許能抓到資料。」\n\n「你要找什麼？」\n\n周亮均的眼神冷下來。\n\n「名單。誰知道真相、誰要被推責、誰不能活著離開——這種規模的行動，一定會有一份名單。」',
  ],
  endingText:
    '緊急出口的門在身後闔上。廢液暫存槽的方向，傳來第一聲低沉的咆哮——一下，又一下，像有什麼東西正在槽裡醒來。周亮均握緊口袋裡的隨身碟。封口名單負責決定誰先死，淨化程序負責讓剩下的人一起死。而工廠裡真正可怕的怪物，還沒有出現。〔第四章 待續〕',
  objective: '潛入資訊機房，找出 KY 風險人員分級表',
  rooms: [
    { id: 'stairbottom', name: '安全梯底', x: 0, z: 0, w: 5, d: 4, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 2.5, y: 2.6, z: 2, color: 0xff5533, intensity: 12, flicker: true } }, // 紅色警示燈
    { id: 'tunnel', name: '地下通道', x: 5, z: 0, w: 14, d: 4, h: 2.8, floor: 'metal', walls: 'metal',
      light: { x: 12, y: 2.4, z: 2, color: 0x668888, intensity: 14, flicker: true } },
    { id: 'server', name: '資訊機房', x: 0, z: 4, w: 10, d: 8, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 5, y: 3, z: 8, color: 0x88bbff, intensity: 24, flicker: true } }, // 伺服器冷光
    { id: 'control', name: '廠務管制室', x: 10, z: 4, w: 9, d: 7, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 14.5, y: 2.8, z: 7.5, color: 0x9fd0e0, intensity: 22, flicker: true } }, // 監控牆藍光
    { id: 'wasteway', name: '廢液區走道', x: 19, z: 0, w: 6, d: 11, h: 3.6, floor: 'metal', walls: 'metal',
      light: { x: 22, y: 3.2, z: 5.5, color: 0x66aa66, intensity: 12, flicker: true } }, // 廢液綠光
  ],
  doors: [
    { id: 'd3-stair-tunnel', from: 'stairbottom', to: 'tunnel', axis: 'z', at: [5, 2], width: 1.3, height: 2.3, lock: null },
    { id: 'd3-stair-server', from: 'stairbottom', to: 'server', axis: 'x', at: [2.5, 4], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-tunnel-server', from: 'tunnel', to: 'server', axis: 'x', at: [7.5, 4], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-tunnel-control', from: 'tunnel', to: 'control', axis: 'x', at: [14, 4], width: 1.3, height: 2.3, lock: null },
    { id: 'd3-tunnel-waste', from: 'tunnel', to: 'wasteway', axis: 'z', at: [19, 2], width: 1.3, height: 2.3, lock: null },
    { id: 'd3-control-waste', from: 'control', to: 'wasteway', axis: 'z', at: [19, 7], width: 1.2, height: 2.2, lock: null },
    { id: 'd3-exit', from: 'wasteway', to: null, axis: 'z', at: [22, 11], width: 1.4, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    { room: 'stairbottom', type: 'crate', x: 4, z: 1, solid: 0.4 },
    { room: 'stairbottom', type: 'blood', x: 2, z: 3 },
    // 地下通道：管線、排水溝黑水
    { room: 'tunnel', type: 'pipe', x: 12, z: 0.5, len: 13, y: 2.5 },
    { room: 'tunnel', type: 'blood', x: 9, z: 2 },
    { room: 'tunnel', type: 'blood', x: 15, z: 2.5 },
    { room: 'tunnel', type: 'barrel', x: 7, z: 3.3, solid: 0.35 },
    { room: 'tunnel', type: 'bodybag', x: 16.5, z: 1, rot: 0.4 },
    // 資訊機房：伺服器機櫃陣（掩體）、主控台
    { room: 'server', type: 'shelf', x: 2, z: 6, rot: 0, solid: 0.3 },
    { room: 'server', type: 'shelf', x: 5, z: 6, rot: 0, solid: 0.3 },
    { room: 'server', type: 'shelf', x: 8, z: 6, rot: 0, solid: 0.3 },
    { room: 'server', type: 'shelf', x: 2, z: 9.5, rot: 0, solid: 0.3 },
    { room: 'server', type: 'shelf', x: 5, z: 9.5, rot: 0, solid: 0.3 },
    { room: 'server', type: 'table', x: 8, z: 10.5, solid: 0.5 }, // 主控台
    { room: 'server', type: 'papers', x: 8, z: 10.7 },
    { room: 'server', type: 'blood', x: 6, z: 8 },
    // 廠務管制室：監控牆、桌、翻椅
    { room: 'control', type: 'table', x: 14.5, z: 5.5, solid: 0.5 },
    { room: 'control', type: 'chair_fallen', x: 12, z: 8, rot: 1.8 },
    { room: 'control', type: 'papers', x: 16, z: 6 },
    { room: 'control', type: 'crate', x: 17.5, z: 9.5, solid: 0.4 },
    // 廢液區走道：廢液槽、桶陣、黑水
    { room: 'wasteway', type: 'barrel', x: 20.5, z: 3, solid: 0.35 },
    { room: 'wasteway', type: 'barrel', x: 21.4, z: 3.4, solid: 0.35 },
    { room: 'wasteway', type: 'blood', x: 22, z: 6 },
    { room: 'wasteway', type: 'blood', x: 21, z: 8.5 },
    { room: 'wasteway', type: 'bodybag', x: 23.5, z: 4.5, rot: 1.1 },
    { room: 'wasteway', type: 'pipe', x: 22, z: 0.6, len: 10, y: 3.2 },
  ],
  documents: [
    {
      id: 'g3-doc-dossier', title: 'KY 專案風險人員分級表', x: 9, z: 10.7, grantsKey: 'dossier',
      text: 'A 級：核心知情人\nB 級：可疑接觸者\nC 級：可轉嫁責任者\nD 級：清除對象\n\n周亮均……………C 級\n林欣儀……………D 級\n\n（D 級備註：掌握樣品異常紀錄。疑似備份 KY 原始檢測資料。不建議留存。）\n\n（「不建議留存」——四個字，比槍口還冷。他們不是要抓欣儀問話。他們要讓她消失。）',
    },
    {
      id: 'g3-doc-mail', title: '財務長內部信：資料一致性處理', x: 6, z: 5.2,
      text: '致 KY 核心小組：\n\n明日上午投資方進行第二輪資料查核，請各單位確認產能、良率、設備完成率、KY 導入進度說法一致。現場若有異議人員，依風險分級表處理。必要時啟用事故封鎖劇本。\n\n（他們連劇本都寫好了。從我在會議室提出問題的那一刻起，就已經被選好了。）',
    },
    {
      id: 'g3-doc-blame', title: '異常事故責任歸屬草案', x: 3, z: 9.5,
      text: '初步判定：本次異常因設備部未依標準程序進行電氣室檢修，導致 KY 輔助液儲存環境失衡，引發材料異常反應。\n\n（他們要把責任推給我。一個懂設備、碰過現場、又質疑過 KY 的人——完美的替死鬼。整起事件就能被包裝成單一工安疏失。）',
    },
    {
      id: 'g3-doc-purge', title: '系統排程：廠區淨化程序', x: 16, z: 6, monoAfter: true,
      text: '程序名稱：廠區淨化程序\n啟動時間：23:30\n\n表面說明：消防與廢氣系統整合排放。\n\n（如果接到晨星的化學槽，整座廠會被封閉噴灑。活人、怪物、證據，一起處理掉。）\n\n（封口名單負責決定誰先死。淨化程序負責讓剩下的人一起死。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 5.5, z: 10.5, yaw: Math.PI, room: 'server',
      dialog: [
        '（欣儀盯著主控台螢幕上的名單，呼吸停了一拍）\n我的名字……在 D 級。清除對象。這是什麼意思？',
        '（她慢慢退了一步，撞到後方機櫃）所以他們不是要抓我問話。是要讓我……消失。',
        '（她深吸一口氣，聲音發抖但沒有崩潰）不。既然他們怕的是證據，那證據就是我們的武器。把名單、信件、事故草案，全部複製下來。',
        '外面那些黑衣人是晨星的清除小組。他們有槍，別跟他們正面對決——機房這麼多機櫃，繞著走。',
        '把隨身碟收好。只要這東西出得去，白博士他們寫的每一個字，都會變成把他們自己送進去的證據。',
      ],
      dialogAfter: '（欣儀按著手臂）快，趁淨化程序啟動前——證據不能跟我們一起被燒掉。',
      gift: [
        { item: 'handgun_ammo', count: 30 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g3-t-tunnel', room: 'tunnel', text: '地下通道。排水孔正冒出黑水，一滴滴流進地溝，管線傳來低沉震動。', sound: 'groan',
      monologue: '（KY 不是從單點外洩。清洗水、廢液管、排風管、排水溝——它已經滲進整座廠的系統。有多少人在不知情下早就接觸過？）' },
    { id: 'g3-t-server', room: 'server', text: '資訊機房。冷氣還在運轉，伺服器燈號一排排閃爍——這裡是整座廠少數還維持秩序的地方。', alert: true,
      monologue: '（有人在停電前五分鐘大量刪除檔案。但刪除紀錄還在。他們想抹掉的東西，反而成了他們動手的證明。）' },
    { id: 'g3-t-control', room: 'control', text: '廠務管制室。監控牆恢復了部分畫面——每一個畫面都不正常。', sound: 'groan', shake: 0.05,
      monologue: '（會議室裡，總經理、財務長、白博士都在。他們沒有逃。他們坐著，看著平面圖上一個個變紅的區域。他們還有下一步。）' },
    { id: 'g3-t-waste', room: 'wasteway', text: '廢液暫存槽的方向傳來沉悶的撞擊聲——一下，又一下，像有什麼東西正在槽內醒來。', sound: 'groan', alert: true, shake: 0.1,
      monologue: '（KY 不只感染了人。它也污染了整個產程。工廠裡真正可怕的怪物……還沒有出現。）' },
  ],
  entities: {
    pickups: [
      { id: 'g3-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 1.5 },
      { id: 'g3-p-herb1', item: 'green_herb', count: 1, x: 4, z: 3 },
      { id: 'g3-p-shells1', item: 'shotgun_shells', count: 7, x: 8, z: 2 },
      { id: 'g3-p-magnum', item: 'magnum_weapon', count: 1, x: 6.5, z: 3.3 }, // 通道盡頭
      { id: 'g3-p-magammo1', item: 'magnum_ammo', count: 6, x: 7.2, z: 3.5 },
      { id: 'g3-p-ammo2', item: 'handgun_ammo', count: 15, x: 3, z: 6 },
      { id: 'g3-p-spray1', item: 'first_aid_spray', count: 1, x: 9, z: 8 },
      { id: 'g3-p-smgammo', item: 'smg_ammo', count: 30, x: 2, z: 10 },
      { id: 'g3-p-blue1', item: 'blue_herb', count: 1, x: 15, z: 5 },
      { id: 'g3-p-shells2', item: 'shotgun_shells', count: 7, x: 17, z: 9.5 },
      { id: 'g3-p-herb2', item: 'green_herb', count: 1, x: 12, z: 6 },
      { id: 'g3-p-magammo2', item: 'magnum_ammo', count: 6, x: 21, z: 3 },
      { id: 'g3-p-ammo3', item: 'handgun_ammo', count: 15, x: 23, z: 7 },
    ],
    enemies: [
      { id: 'g3-agent1', type: 'agent', x: 4, z: 7 },     // 機房黑衣人（清除小組）
      { id: 'g3-agent2', type: 'agent', x: 7, z: 9 },
      { id: 'g3-agent3', type: 'agent', x: 5, z: 11 },
      { id: 'g3-mutant', type: 'mutant', x: 12, z: 2 },   // KY 變異體追進地下通道
      { id: 'g3-z1', type: 'zombie', x: 16, z: 3 },
      { id: 'g3-z2', type: 'zombie', x: 14, z: 8 },       // 管制室
      { id: 'g3-z3', type: 'zombie', x: 21, z: 6 },       // 廢液走道
      { id: 'g3-agent4', type: 'agent', x: 16, z: 6 },    // 管制室黑衣人
    ],
    typewriters: [
      { id: 'g3-tw-stair', x: 0.8, z: 0.8 },
      { id: 'g3-tw-control', x: 10.7, z: 4.8 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
