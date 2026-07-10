// 第十四章〈轉播站的黎明〉：街道篇終章。跨過大橋，黎明前抵達黑鴉市電視轉播站——
// 微波鏈路還活著，這是把證據送出去的最後機會。但聖時比他們先到，
// 在停車場的火光裡遊獵。推進：主控室文件找出「開台日」→ 發射塔基座密碼門 0524 → 上傳。
// 魔王：聖時爆君再臨（warlord）——依然殺不死，避開他、拿到密碼、衝進發射塔。
export const CHAPTER14 = {
  id: 'chapter14',
  name: '第十四章：轉播站的黎明',
  next: 'chapter15', // 銜接醫院篇〈白色警戒〉
  exitCode: '0524', // 發射塔備援門密碼＝開台日 5/24（線索在〈開播頻率表〉與〈開台紀念照〉）
  exitHint: '發射塔基座的門是機械密碼鎖——工程師慣例會把備援密碼設成「不會忘記的日子」。主控室的文件也許有答案',
  spawn: { x: 2, z: 1.5, yaw: Math.PI / 2 }, // 停車場西側，面向東
  lockNames: { chapterExit: '發射塔基座門' },
  isBossLevel: true,
  story: [
    '過橋之後，路開始往上。\n\n轉播站建在黑鴉市東郊的小丘上，紅白相間的發射塔刺進將亮未亮的天色裡——塔頂的航空警示燈，還在一下、一下地閃。\n\n欣儀仰著頭，聲音啞了：「還有電。微波鏈路是獨立供電的……它真的還活著。」\n\n亮均握緊背包帶。裡面是隨身碟：名單、協議、錄音、報告。三個晚上，十條街，換來的全部。\n\n（把它送出去，就結束了。）',
    '停車場入口的柵欄被撞斷了。\n\n不是撞開——是被「踏平」的。金屬柵欄陷進柏油裡，印著一個熟悉的、巨大的腳印。\n\n欣儀退了半步：「他怎麼會知道……」\n\n「一直都知道。」亮均盯著停車場深處的火光，「橋上他沒有下場，收費站他讓開了路。他不是追不上我們——」\n\n（他在等我們把所有證據收集齊全，走到最後一站。）\n\n（白博士要的是數據。晨星要的是滅證。而聖時……聖時要的是什麼？）',
    '廣播雜訊裡，忽然傳出白博士的聲音——從轉播站自己的擴音系統。\n\n「周副理，恭喜你們走到這裡。市區的觀察數據非常完整，董事會很滿意。」\n\n「不過，實驗該收尾了。『全區淨化』已經核准。天亮之前，黑鴉市會變得很乾淨。」\n\n「聖時會陪你們走完最後一段。畢竟——」白博士頓了頓，像在微笑，「守夜的人，總要有人記得。」\n\n停車場中央，三公尺高的身影從燃燒的轉播車後面站起來。\n\n火箭筒，指向天空的第一縷灰光。',
  ],
  endingText:
    '上傳進度 100%。晨間新聞的畫面切進雜訊，再亮起時，螢幕上是名單、協議、錄音的波形——全黑鴉市還有電的每一面螢幕，都在播。欣儀靠著主控台哭了，笑著哭。而停車場的火光裡，聖時緩緩放下了火箭筒。他沒有追。他隔著玻璃看了亮均很久，久到像一個人在確認某件事終於被記得——然後轉身走進黎明前最深的黑。遠方，晨星總部的直升機群正掠過河面。「全區淨化」的倒數，還在走。廢墟深處，一滴藍色的液體，滴進了排水溝。〔第十五章 待續〕',
  objective: '避開聖時，找出發射塔的密碼，把證據傳出去',
  rooms: [
    { id: 'lot', name: '轉播站停車場', x: 0, z: 0, w: 16, d: 8, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 8, y: 4.8, z: 4, color: 0xffb060, intensity: 26, flicker: true } }, // 燃燒轉播車火光
    { id: 'lobby', name: '轉播站大廳', x: 0, z: 8, w: 10, d: 6, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 5, y: 3, z: 11, color: 0xc0c8d8, intensity: 20, flicker: true } },
    { id: 'studio', name: '主控室', x: 10, z: 8, w: 6, d: 6, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 13, y: 2.8, z: 11, color: 0x9fd0e0, intensity: 24 } }, // 監看牆藍光
    { id: 'corridor', name: '機房走廊', x: 16, z: 0, w: 4, d: 14, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 18, y: 2.6, z: 7, color: 0xc09060, intensity: 14, flicker: true } },
    { id: 'tower', name: '發射塔基座', x: 20, z: 0, w: 6, d: 14, h: 6, floor: 'metal', walls: 'metal',
      light: { x: 23, y: 5, z: 7, color: 0xff5533, intensity: 16, flicker: true } }, // 紅色航空警示燈
  ],
  doors: [
    { id: 'd14-lot-lobby', from: 'lot', to: 'lobby', axis: 'x', at: [5, 8], width: 1.8, height: 2.6, lock: null },
    { id: 'd14-lobby-studio', from: 'lobby', to: 'studio', axis: 'z', at: [10, 11], width: 1.2, height: 2.2, lock: null },
    { id: 'd14-lot-corr', from: 'lot', to: 'corridor', axis: 'z', at: [16, 4], width: 1.3, height: 2.3, lock: null },
    { id: 'd14-studio-corr', from: 'studio', to: 'corridor', axis: 'z', at: [16, 11], width: 1.2, height: 2.2, lock: null },
    { id: 'd14-corr-tower', from: 'corridor', to: 'tower', axis: 'z', at: [20, 7], width: 1.4, height: 2.5, lock: null },
    { id: 'd14-exit', from: 'tower', to: null, axis: 'z', at: [26, 7], width: 1.5, height: 2.5, lock: 'chapterExit' },
  ],
  props: [
    // 停車場：燒毀的 SNG 轉播車、棄車、被踏平的柵欄
    { room: 'lot', type: 'car', x: 8.5, z: 4.5, rot: 0.3, variant: 2, solid: 1.0 }, // 燃燒轉播車
    { room: 'lot', type: 'car', x: 3.5, z: 6, rot: -0.6, solid: 1.0 },
    { room: 'lot', type: 'car', x: 13, z: 2, rot: 1.4, variant: 1, solid: 1.0 },
    { room: 'lot', type: 'streetlight', x: 5, z: 0.7 },
    { room: 'lot', type: 'streetlight', x: 12, z: 7.3, dead: true },
    { room: 'lot', type: 'debris', x: 2, z: 3.5 },
    { room: 'lot', type: 'blood', x: 6, z: 2.5 },
    { room: 'lot', type: 'trash', x: 15, z: 6.8 },
    { room: 'lot', type: 'corpse', x: 10.5, z: 6.6, variant: 2 }, // 晨星哨兵——聖時經過的痕跡
    // 大廳：接待台與傾倒的立牌
    { room: 'lobby', type: 'table', x: 5, z: 9.3, solid: 0.5 },
    { room: 'lobby', type: 'papers', x: 5.2, z: 9.5 },
    { room: 'lobby', type: 'chair_fallen', x: 3, z: 11.5, rot: 1.1 },
    { room: 'lobby', type: 'shelf', x: 0.4, z: 12, rot: Math.PI / 2, solid: 0.28 },
    { room: 'lobby', type: 'blood', x: 7.5, z: 12.5 },
    { room: 'lobby', type: 'cardboard', x: 8.6, z: 9.2 },
    // 主控室：控制台（桌）與監看牆（架）
    { room: 'studio', type: 'table', x: 13, z: 9.2, solid: 0.5 },
    { room: 'studio', type: 'papers', x: 13.2, z: 9.4 },
    { room: 'studio', type: 'shelf', x: 15.6, z: 12.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'studio', type: 'chair_fallen', x: 11.5, z: 12.5, rot: 2.6 },
    // 機房走廊
    { room: 'corridor', type: 'pipe', x: 18, z: 0.5, len: 13, y: 2.6, rot: Math.PI / 2 },
    { room: 'corridor', type: 'crate', x: 19.2, z: 11.5, solid: 0.4 },
    { room: 'corridor', type: 'debris', x: 17.5, z: 9 },
    { room: 'corridor', type: 'blood', x: 18.5, z: 3 },
    // 發射塔基座：鋼構與配電
    { room: 'tower', type: 'pipe', x: 23, z: 0.6, len: 5, y: 4.5 },
    { room: 'tower', type: 'crate', x: 21, z: 2, solid: 0.4 },
    { room: 'tower', type: 'crate', x: 21.8, z: 2.6, solid: 0.4 },
    { room: 'tower', type: 'barrel', x: 24.8, z: 12, solid: 0.35 },
    { room: 'tower', type: 'bodybag', x: 22, z: 12.5, rot: 0.5 },
  ],
  hazards: [
    { room: 'lot', type: 'fire', x: 9.7, z: 5.4, r: 1.0 },   // 轉播車火場
    { room: 'lot', type: 'fire', x: 7.4, z: 3.6, r: 0.85 },
    { room: 'lot', type: 'slime', x: 14.5, z: 5, r: 0.8 },
    { room: 'corridor', type: 'shock', x: 18, z: 10.2, r: 0.8 }, // 機房斷纜
    { room: 'tower', type: 'fire', x: 23.5, z: 10.5, r: 0.85 },
  ],
  documents: [
    {
      id: 'g14-doc-freq', title: '開播頻率表（主控室膠膜卡）', x: 13.6, z: 9.4,
      text: '黑鴉轉播站　微波鏈路頻率配置\n主鏈路：7.2 GHz（獨立供電）\n備援鏈路：7.6 GHz\n\n（卡片下緣有一行手寫小字：）\n\n「基座備援門的密碼，老規矩——開台那天。忘了的去大廳看牆上的照片。」\n\n（開台那天。哪一天？）',
    },
    {
      id: 'g14-doc-founding', title: '開台紀念照（大廳牆上）', x: 2.5, z: 8.8, monoAfter: true,
      text: '（相框玻璃裂了，照片還在。發射塔落成那天，全體施工班在塔下合影，紅布條上寫著：）\n\n「黑鴉轉播站　五月二十四日　開台誌慶」\n\n（施工班的最後一排，有一張年輕的臉——制服上繡著「保全：蔡」。是小蔡。他退伍後的第一份工作，原來在這裡。）\n\n（守夜的人，總要有人記得。五月二十四日。0524。）',
    },
    {
      id: 'g14-doc-jam', title: '晨星工單：鏈路阻斷（未完成）', x: 18.5, z: 12.8,
      text: '工單編號：MS-2214\n項目：黑鴉轉播站微波鏈路阻斷\n狀態：未完成\n\n備註：基座門為機械密碼鎖，無法遠端接管。申請爆破許可中。\n\n（未完成。晨星的手伸得再長，也還沒摸進這座塔。這就是為什麼——這裡是最後一個活著的節點。）\n\n（也是為什麼，聖時會在外面。）',
    },
    {
      id: 'g14-doc-draft', title: '新聞稿草稿（沒播出的那一則）', x: 11, z: 12.6,
      text: '【快訊草稿】柳營工業區入夜後傳出多起異常事故，本台記者於封鎖線外目擊大量身著黑衣之不明人員。警方電話無人接聽。市府新聞稿與現場狀況嚴重不符——\n\n（草稿到這裡中斷。鍵盤上有一杯打翻的咖啡，已經乾了。）\n\n（記者比誰都早知道不對勁。這一則沒播出去的快訊，今天早上會由我們替他播完。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 14.5, z: 10.5, yaw: Math.PI, room: 'studio',
      dialog: [
        '（欣儀把隨身碟插進主控台，手指懸在鍵盤上，在抖）鏈路是活的。頻率對上了。只差……基座的實體開關。發射塔的門有密碼鎖。',
        '外面那個腳步聲——是他，對吧。從工廠一路到這裡。（她閉了閉眼）他明明可以在橋上就殺了我們。',
        '白博士說「守夜的人總要有人記得」。你發現了嗎？小蔡、警衛、值班員、維修班……名單上被劃掉的，全部都是守夜的人。聖時，是他們之中最後一個。',
        '（她看著螢幕上的上傳佇列）名單、協議、錄音、你拍的每一張照片——全部就緒。你去開門，我在這裡等訊號。',
        '亮均。不管外面那個東西還記不記得自己是誰——把證據送出去，就是替他們全部的人記得。去吧。',
      ],
      dialogAfter: '（欣儀盯著監看牆，聲音很輕）密碼是「不會忘記的日子」。轉播站的人不會忘記哪一天？……去大廳看看。',
      gift: [
        { item: 'first_aid_spray', count: 1 },
        { item: 'magnum_ammo', count: 6 },
      ],
    },
  ],
  triggers: [
    { id: 'g14-t-lot', room: 'lot', text: '停車場。轉播車在燒。柵欄被踏進柏油裡——那個腳印，你在提升機井底見過一次。', alert: true, shake: 0.1,
      monologue: '（他先到了。不是埋伏，是等待。從工廠到橋，再到這裡——他一路都只是在看著我們往前走。）' },
    { id: 'g14-t-lobby', room: 'lobby', text: '大廳。接待台的電視牆黑著，只有一面螢幕還亮——雪花雜訊，像整座城市的心電圖。', sound: 'door',
      monologue: '（轉播站建台的時候，這裡播過選舉、球賽、颱風夜的停班停課。今天它要播的，是黑鴉市最後一則、也最重要的一則新聞。）' },
    { id: 'g14-t-studio', room: 'studio', text: '主控室。監看牆的藍光裡，上傳佇列一排就緒——名單、協議、錄音。只差一個訊號。',
      monologue: '（三個晚上。小蔡的相機、麥克的貨單、Allen 的硬碟、橋上那些儲物櫃裡的人生。全部都在這一條佇列裡。）' },
    { id: 'g14-t-corr', room: 'corridor', text: '機房走廊。晨星的阻斷工單釘在配線架上——「未完成」。', sound: 'groan',
      monologue: '（他們切斷了整座城市，卻少切了這一條。不是疏忽。是塔下有東西，讓他們的工程隊再也沒有回報。）' },
    { id: 'g14-t-tower', room: 'tower', text: '發射塔基座。鋼構在頭頂交錯上升，紅色警示燈一明一滅。密碼鎖的九宮格，還有電。', alert: true,
      monologue: '（0524。開台的日子。守夜的人記得的日子。……輸進去，然後把一切送上天空。）' },
  ],
  entities: {
    pickups: [
      { id: 'g14-p-ammo1', item: 'handgun_ammo', count: 15, x: 1.5, z: 3 },
      { id: 'g14-p-shells1', item: 'shotgun_shells', count: 7, x: 2.5, z: 6.5 },
      { id: 'g14-p-rocket', item: 'rocket_weapon', count: 1, x: 14.8, z: 1 },   // 牽制聖時用
      { id: 'g14-p-rammo1', item: 'rocket_ammo', count: 2, x: 15.4, z: 1.4 },
      { id: 'g14-p-herb1', item: 'green_herb', count: 1, x: 1, z: 12.5 },
      { id: 'g14-p-magammo1', item: 'magnum_ammo', count: 6, x: 6.5, z: 13 },
      { id: 'g14-p-spray1', item: 'first_aid_spray', count: 1, x: 12, z: 8.7 },
      { id: 'g14-p-smgammo1', item: 'smg_ammo', count: 30, x: 17.2, z: 2 },
      { id: 'g14-p-blue1', item: 'blue_herb', count: 1, x: 19, z: 5.5 },
      { id: 'g14-p-shells2', item: 'shotgun_shells', count: 7, x: 21.5, z: 4 },
      { id: 'g14-p-herb2', item: 'green_herb', count: 1, x: 25, z: 2 },
      { id: 'g14-p-rammo2', item: 'rocket_ammo', count: 1, x: 24.5, z: 9 },
    ],
    enemies: [
      { id: 'g14-warlord', type: 'warlord', x: 9, z: 6 },   // ★ 聖時再臨——停車場遊獵
      { id: 'g14-agent1', type: 'agent', x: 13, z: 5.5 },   // 沒撤走的晨星哨兵
      { id: 'g14-z1', type: 'zombie', x: 5.5, z: 3 },
      { id: 'g14-z2', type: 'zombie', x: 7.5, z: 11 },      // 大廳
      { id: 'g14-mutant1', type: 'mutant', x: 18, z: 5 },   // 機房走廊
      { id: 'g14-mutant2', type: 'mutant', x: 23, z: 11 },  // 塔基座——晨星工程隊的下場
      { id: 'g14-z3', type: 'zombie', x: 18.5, z: 12.5 },
    ],
    typewriters: [
      { id: 'g14-tw-lobby', x: 0.8, z: 9 },
      { id: 'g14-tw-corr', x: 16.6, z: 0.8 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
