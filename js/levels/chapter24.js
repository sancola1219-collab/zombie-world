// 第二十四章〈藍囊教父〉：醫院篇終章。地下研究樓層的最深處，白博士不再躲在廣播後面。
// 他把 KY 改良型注射進自己的脊椎——「科學家應該親自驗證」。
// 魔王：白博士・藍囊教父（drbai）——針管觸手、胸口三顆藍囊（要害）、破囊狂暴。
// 擊倒他後在中央培養井取得「病毒抑制劑」：救欣儀的命——也是白博士留給聖時的最後一件東西。
// 結尾：白博士臨死解除聖時的抑制晶片——「真正的爆君，現在才開始。」
export const CHAPTER24 = {
  id: 'chapter24',
  name: '第二十四章：藍囊教父',
  next: null, // 第二十五章待續（聖時甦醒）
  exitNeeds: 'inhibitor',
  exitHint: '欣儀還在上面等。沒有抑制劑，走出這扇門就沒有意義——中央培養井的低溫櫃裡，一定有成品',
  spawn: { x: 3, z: 1.5, yaw: Math.PI }, // 前室，面向南
  lockNames: { inhibitor: '病毒抑制劑', chapterExit: '緊急撤離通道' },
  isBossLevel: true,
  story: [
    'B4 再往下，還有一層。\n\n電梯到不了，樓梯間的門牌被拆掉了。走下去的時候，牆上的醫院標語逐漸消失，換成晨星的內部編號。空氣越來越冷，消毒水的氣味底下，是那股熟悉的、淡淡的甜。\n\n樓梯底端的氣密門上，貼著一張再普通不過的 A4 紙：\n\n「S 計畫　主控實驗室」\n\n（從柳營新廠的第一夜到現在，所有的路，原來都通向這扇門。）',
    '主控實驗室的燈是亮的。\n\n白博士站在中央培養井前，白袍還是那件白袍，乾淨得與這整座地獄格格不入。他沒有回頭。\n\n「周副理。你比模型預測的多活了四天。」他輕輕地說，「數據很漂亮。」\n\n「你的證據播出去了，董事會在切割，晨星在斷尾。這個項目今晚就會被抹掉——連同我。」\n\n他終於轉過身，手裡握著一支注射器，裡面的液體藍得像深海。\n\n「所以，最後一次實驗，我親自來。」',
    '「科學家，」他把針頭抵上自己的頸椎，「應該親自驗證。」\n\n「白博士——住手！」\n\n推桿到底。\n\n白博士的身體在三秒內開始變形：脊椎一節一節頂起白袍，雙臂拉長、指尖裂開露出中空的針管，胸口的皮膚底下，三顆藍色的囊泡亮了起來，像三顆心臟在同時跳動。\n\n他最後看了亮均一眼，眼神裡竟然是平靜的。\n\n「來吧。讓我看看——」\n\n聲音在變異中碎裂成低頻的震動。\n\n「——人，值不值得被拯救。」',
  ],
  endingText:
    '抑制劑推進欣儀的手臂，黑色的紋路從指尖開始，一寸一寸退了回去。她的呼吸慢慢平穩——活下來了。培養井邊，白博士倒在自己的白袍裡，變異的身體正在崩解。他用還算是手的那隻手，按下了控制台上最後一個鍵。「聖時的抑制晶片——解除。」他看著天花板，像看著很遠的地方，「科學應該拯救人。我走錯的路，讓他……替我走完。」螢幕上，聖時的生命數據瘋狂飆升。整棟醫院的燈，由白轉紅。廣播自動響起，重複著同一句話：「S-10 行為限制解除。S-10 行為限制解除。」真正的爆君，現在才開始。〔第二十五章 待續〕',
  objective: '擊倒藍囊教父，取得病毒抑制劑——救欣儀',
  rooms: [
    { id: 'anteroom', name: '氣密前室', x: 0, z: 0, w: 6, d: 6, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 3, y: 2.6, z: 3, color: 0xcfe0ff, intensity: 16, flicker: true } },
    { id: 'mainlab', name: 'S計畫主控實驗室', x: 6, z: 0, w: 14, d: 10, h: 4.5, floor: 'tile', walls: 'metal',
      light: { x: 13, y: 4, z: 5, color: 0x88bbff, intensity: 30 } }, // 冷冽的實驗室藍光
    { id: 'storage', name: '樣本庫', x: 0, z: 6, w: 6, d: 10, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 3, y: 2.8, z: 11, color: 0x66aa88, intensity: 14, flicker: true } },
    { id: 'well', name: '中央培養井', x: 6, z: 10, w: 14, d: 6, h: 5, floor: 'metal', walls: 'metal',
      light: { x: 13, y: 4.4, z: 13, color: 0x55baff, intensity: 24, flicker: true } }, // 培養液藍光
    { id: 'exitway', name: '緊急撤離通道', x: 20, z: 0, w: 5, d: 16, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 22.5, y: 2.6, z: 8, color: 0xff5533, intensity: 14, flicker: true } }, // 紅色警示
  ],
  doors: [
    { id: 'd24-ante-lab', from: 'anteroom', to: 'mainlab', axis: 'z', at: [6, 3], width: 1.5, height: 2.5, lock: null },
    { id: 'd24-ante-storage', from: 'anteroom', to: 'storage', axis: 'x', at: [3, 6], width: 1.2, height: 2.2, lock: null },
    { id: 'd24-storage-well', from: 'storage', to: 'well', axis: 'z', at: [6, 13], width: 1.3, height: 2.3, lock: null },
    { id: 'd24-lab-well', from: 'mainlab', to: 'well', axis: 'x', at: [13, 10], width: 1.6, height: 2.6, lock: null },
    { id: 'd24-lab-exit', from: 'mainlab', to: 'exitway', axis: 'z', at: [20, 5], width: 1.3, height: 2.3, lock: null },
    { id: 'd24-well-exit', from: 'well', to: 'exitway', axis: 'z', at: [20, 13], width: 1.3, height: 2.3, lock: null },
    { id: 'd24-exit', from: 'exitway', to: null, axis: 'x', at: [22.5, 16], width: 1.5, height: 2.5, lock: 'chapterExit' },
  ],
  props: [
    // 前室：防護衣掛架與消毒閘
    { room: 'anteroom', type: 'shelf', x: 0.4, z: 2, rot: Math.PI / 2, solid: 0.28 },
    { room: 'anteroom', type: 'crate', x: 5, z: 5, solid: 0.4 },
    { room: 'anteroom', type: 'papers', x: 3, z: 4.5 },
    // 主控實驗室：培養槽（大桶）、主控台、實驗桌陣（魔王場地的掩體）
    { room: 'mainlab', type: 'barrel', x: 8, z: 2, solid: 0.55 },
    { room: 'mainlab', type: 'barrel', x: 8.9, z: 2.4, solid: 0.4 },
    { room: 'mainlab', type: 'table', x: 13, z: 2.2, solid: 0.5 },   // 主控台
    { room: 'mainlab', type: 'papers', x: 13.2, z: 2.4 },
    { room: 'mainlab', type: 'table', x: 10, z: 6.5, solid: 0.5 },   // 實驗桌掩體
    { room: 'mainlab', type: 'table', x: 16, z: 6.5, solid: 0.5 },
    { room: 'mainlab', type: 'shelf', x: 19.6, z: 2.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'mainlab', type: 'blood', x: 12, z: 5 },
    { room: 'mainlab', type: 'debris', x: 17.5, z: 8.5 },
    { room: 'mainlab', type: 'chair_fallen', x: 14.5, z: 3.5, rot: 1.8 },
    // 樣本庫：層架與樣本箱
    { room: 'storage', type: 'shelf', x: 0.4, z: 8.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'storage', type: 'shelf', x: 0.4, z: 11, rot: Math.PI / 2, solid: 0.28 },
    { room: 'storage', type: 'shelf', x: 5.6, z: 9.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'storage', type: 'crate', x: 4.5, z: 14.5, solid: 0.4 },
    { room: 'storage', type: 'bodybag', x: 2, z: 15, rot: 0.8 },
    { room: 'storage', type: 'blood', x: 3, z: 13 },
    // 中央培養井：井體（桶陣）與管線
    { room: 'well', type: 'barrel', x: 12.5, z: 12.5, solid: 0.55 }, // 培養井主體
    { room: 'well', type: 'barrel', x: 13.6, z: 13, solid: 0.55 },
    { room: 'well', type: 'barrel', x: 12.9, z: 14, solid: 0.55 },
    { room: 'well', type: 'pipe', x: 13, z: 10.6, len: 13, y: 4.4 },
    { room: 'well', type: 'pipe', x: 13, z: 15.4, len: 13, y: 4.0 },
    { room: 'well', type: 'crate', x: 18.5, z: 14.5, solid: 0.4 },  // 低溫櫃（抑制劑）
    { room: 'well', type: 'blood', x: 9, z: 12 },
    // 撤離通道
    { room: 'exitway', type: 'debris', x: 22, z: 3 },
    { room: 'exitway', type: 'blood', x: 23, z: 10 },
    { room: 'exitway', type: 'bodybag', x: 21.5, z: 14.5, rot: 0.5 },
  ],
  hazards: [
    { room: 'mainlab', type: 'slime', x: 9.5, z: 8.5, r: 0.9 },   // 溢出的培養液
    { room: 'mainlab', type: 'fire', x: 18, z: 3.5, r: 0.85 },    // 短路的儀器
    { room: 'storage', type: 'slime', x: 2, z: 9.5, r: 0.85 },
    { room: 'well', type: 'slime', x: 10.5, z: 14.5, r: 0.9 },
    { room: 'well', type: 'slime', x: 15.5, z: 11.5, r: 0.85 },
    { room: 'exitway', type: 'shock', x: 22.5, z: 6, r: 0.8 },    // 警示系統短路
  ],
  documents: [
    {
      id: 'g24-doc-sfinal', title: 'S 最終進化指令（未執行）', x: 12.6, z: 2.4,
      text: '指令：解除 S-10 行為限制晶片。\n授權：白（單獨授權）\n狀態：待執行\n\n附註（手寫）：董事會不會批准這道指令。他們要的是能上鍊的狗，不是能思考的人。\n\n但聖時值得知道自己是誰。\n\n（白博士想解開聖時。不是作為武器——作為一個人。）',
    },
    {
      id: 'g24-doc-inhibitor', title: '抑制劑實驗紀錄（第 41 批）', x: 4.5, z: 8,
      text: '批次 41：增殖抑制率 97%，神經侵蝕逆轉確認。\n對早期感染（黑紋未過肩）：預後良好。\n對深度改造體：無法逆轉變異，但可恢復部分自主意識。\n\n低溫保存於中央培養井 C 櫃。\n\n（97%。欣儀有救。而「恢復部分自主意識」這一行——他是寫給聖時的。）',
    },
    {
      id: 'g24-doc-photo', title: '抽屜裡的舊照片', x: 15.5, z: 2.6, monoAfter: true,
      text: '（主控台抽屜裡只有一張照片。年輕的白博士站在大學實驗室門口，白袍太大，笑得靦腆。）\n\n（照片背面，是褪色的鋼筆字：）\n\n「科學應該拯救人，而不是管理人。——給第一天上班的自己」\n\n（他不是忘了這句話。他把它鎖在抽屜裡，每天在它上面簽下相反的東西。這比忘記更殘忍。）',
    },
    {
      id: 'g24-doc-welllog', title: '培養井運轉日誌', x: 17.8, z: 12,
      text: '第 88 日：井內樣本對聲音出現反應。\n第 91 日：樣本嘗試以敲擊回應巡檢節奏。三短，三長，三短。\n第 92 日：奉指示停止記錄「疑似求救行為」。\n\n（SOS。井裡的東西在求救。而指示說：不要記錄。）\n\n（不要記錄，它就不存在——這座公司從頭到尾，只有這一招。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 1.5, z: 3.5, yaw: Math.PI / 2, room: 'anteroom',
      dialog: [
        '（欣儀靠著氣密門坐著，臉色灰白，左臂的黑紋已經爬到肩膀）我走到這裡……就走不動了。你去。我聽得到裡面的聲音——是白博士，對吧。',
        '（她抓住亮均的手腕，力氣小得嚇人）聽我說。如果裡面有解方，先確認劑量和批次。我是品保……這種時候，我只剩這個用得上了。',
        '（她笑了一下）第 41 批。如果紀錄上寫的是第 41 批，那就是能用的。之前的四十批……你不會想知道。',
        '別跟他硬拚。他變成什麼樣都好——他本質上還是個研究員。研究員最大的弱點，就是他自己設計的東西。看清楚那三顆藍囊。',
        '亮均。（她閉上眼睛）不管裡面發生什麼……回來。這次換你答應我。',
      ],
      dialogAfter: '（欣儀的呼吸很淺，但很穩）第 41 批。三顆藍囊。……回來。',
      gift: [
        { item: 'magnum_ammo', count: 6 },
        { item: 'blue_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g24-t-ante', room: 'anteroom', text: '氣密前室。消毒噴嘴還在運轉，牆上的防護衣架整整齊齊——少了一件。',
      monologue: '（少的那一件不是被拿走的。白博士今晚進來的時候，就沒打算再穿著它出去。）' },
    { id: 'g24-t-lab', room: 'mainlab', text: 'S計畫主控實驗室。培養槽的藍光映在天花板上，像水面。井邊站著一個白色的身影。', alert: true, shake: 0.08,
      monologue: '（從瞞天過海的會議室到這裡，他說的每一句話我都記得。現在，他要用自己的身體說最後一句。）' },
    { id: 'g24-t-storage', room: 'storage', text: '樣本庫。層架上的低溫箱編號從 S-01 排到 S-09——每一箱，都曾經是一個名字。', sound: 'groan',
      monologue: '（S-01 到 S-09。聖時是 S-10。前面九個「不夠穩定」的人，都在這裡。）' },
    { id: 'g24-t-well', room: 'well', text: '中央培養井。井體的玻璃內側佈滿抓痕，培養液的藍光一明一滅——像呼吸。', alert: true,
      monologue: '（三短，三長，三短。求救的節奏停了。我寧願相信它是睡著了。）' },
    { id: 'g24-t-exitway', room: 'exitway', text: '緊急撤離通道。紅色警示燈開始旋轉——整層樓的廣播醒了過來。', sound: 'groan', shake: 0.06,
      monologue: '（S-10 行為限制解除。這句廣播響起的那一刻，這場災變才真正進入最後一章。）' },
  ],
  entities: {
    pickups: [
      { id: 'g24-p-ammo1', item: 'handgun_ammo', count: 15, x: 5, z: 1 },
      { id: 'g24-p-shells1', item: 'shotgun_shells', count: 7, x: 1, z: 5 },
      { id: 'g24-p-rocket', item: 'rocket_weapon', count: 1, x: 1.5, z: 14.5 },  // 樣本庫深處——晨星守衛的遺物
      { id: 'g24-p-rammo1', item: 'rocket_ammo', count: 2, x: 2.2, z: 14.8 },
      { id: 'g24-p-magammo1', item: 'magnum_ammo', count: 6, x: 4.8, z: 7 },
      { id: 'g24-p-spray1', item: 'first_aid_spray', count: 1, x: 19.4, z: 2 },
      { id: 'g24-p-blue1', item: 'blue_herb', count: 1, x: 8, z: 9 },           // 針管中毒對策
      { id: 'g24-p-blue2', item: 'blue_herb', count: 1, x: 16.5, z: 8.8 },
      { id: 'g24-p-herb1', item: 'green_herb', count: 1, x: 7, z: 11.5 },
      { id: 'g24-p-inhibitor', item: 'inhibitor', count: 1, x: 18.6, z: 14.8 }, // ★ 低溫櫃：第 41 批抑制劑
      { id: 'g24-p-smgammo1', item: 'smg_ammo', count: 30, x: 21.5, z: 2 },
      { id: 'g24-p-shells2', item: 'shotgun_shells', count: 7, x: 23.5, z: 12 },
    ],
    enemies: [
      { id: 'g24-drbai', type: 'drbai', x: 13, z: 6 },     // ★ 白博士・藍囊教父
      { id: 'g24-mutant1', type: 'mutant', x: 9, z: 4 },   // 「半成品」——白博士召來的護衛
      { id: 'g24-mutant2', type: 'mutant', x: 17, z: 5 },
      { id: 'g24-z1', type: 'zombie', x: 3, z: 12 },       // 樣本庫的失敗品
      { id: 'g24-z2', type: 'zombie', x: 4.5, z: 15 },
      { id: 'g24-mutant3', type: 'mutant', x: 10, z: 13 }, // 培養井邊
      { id: 'g24-z3', type: 'zombie', x: 22.5, z: 12 },    // 撤離通道
    ],
    typewriters: [
      { id: 'g24-tw-ante', x: 0.8, z: 0.8 },
      { id: 'g24-tw-well', x: 6.6, z: 15.3 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
