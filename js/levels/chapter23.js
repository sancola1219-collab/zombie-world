// 第二十三章〈地下研究樓層〉：B5，晨星最後、也最深的防線。檔案庫、培養槽室、資料中心。
// 一個良心崩潰的基層研究員「大衛」把 S 計畫核心資料的位置交給亮均，也供出聖時的真相——
// 他原是鎮壓小隊的隊長，因為「服從性最高」被選中改造。資料到手，深層樓梯的盡頭，就是白博士。
export const CHAPTER23 = {
  id: 'chapter23',
  name: '第二十三章：地下研究樓層',
  next: 'chapter24',
  exitNeeds: 'sdata',
  exitHint: '主控實驗室的氣密門要「S 計畫核心資料」才認證得過——那份資料鎖在資料中心的主機裡，不是拿在誰手上',
  spawn: { x: 3, z: 1.5, yaw: Math.PI / 2 }, // 研究樓層入口西北，面向東
  lockNames: { sdata: 'S計畫核心資料', chapterExit: '主控實驗室氣密門' },
  story: [
    'B5 沒有醫院的標語，只有晨星的編號。\n\n負壓氣密門在身後合上，隔開了上面所有還帶著人味的東西。這裡的牆是裸露的金屬，燈是慘白的冷光，每一道門上都印著同一組圓角字體的內部代號。空氣裡消毒水的味道淡了，那股熟悉的、甜膩的氣味濃了起來。\n\n（從柳營新廠的第一夜，到黑鴉市的最深處。這股味道，一路跟著我。）\n\n（研究，他們管這叫研究。）',
    '培養槽室的門一開，一整排立式的玻璃槽亮在眼前。\n\n每一槽裡都泡著一個成形到一半的軀體，管線從天花板垂下來，把某種發光的液體一滴一滴打進去。編號牌從 S-01 掛到 S-09——大多數槽裡的東西，早就不動了。\n\n有個穿研究袍的人縮在最角落的槽後面，看見亮均，整個人抖了一下，卻沒有逃。\n\n「你……不是他們的人。」他的聲音沙啞，「你是新聞上那個。太好了……太好了，總算有人下來了。」\n\n（一個沒有拿武器的晨星人。第一個。）',
    '「我叫大衛，研究員。編號以下、什麼都不是的那種。」他苦笑著，把一張門禁卡塞給亮均。\n\n「核心資料在資料中心的主機裡，我幫你留了一個沒鎖的帳號。你會看到 S 計畫的全部——可控、可武裝、可指令化的『戰術變異體』。他們要造的不是怪物，是聽話的兵。」\n\n他頓了頓，聲音更低了。\n\n「還有聖時……你以為他一開始就是怪物？他是鎮壓小隊的隊長。因為『服從性最高』，被挑中改造的。他曾經，是個會聽命令去救人的人。」\n\n「往下走。樓梯盡頭那扇門——白博士，在裡面等你。」',
  ],
  endingText:
    '資料中心的主機在指紋驗證失敗七次後，終於認了大衛留下的那個帳號。螢幕捲過一整套 S 計畫的核心文件——編號、劑量、指令集，還有一份標著「S-10」的術前檔案，照片上是個眼神乾淨的年輕隊長。核心資料一到手，深層樓梯的照明自動亮起，一級一級往下沉沒進黑暗。樓梯的盡頭，一扇氣密門冷冷地立著，門上只有一張再普通不過的 A4 紙，印著五個字：「S 計畫 主控實驗室」。門縫底下透出一線藍光，像深海。亮均握緊了核心資料，走下最後一階。白博士，在裡面。〔續　第二十四章〕',
  objective: '取得 S 計畫核心資料，開啟通往主控實驗室的氣密門',
  rooms: [
    { id: 'entry', name: '研究樓層入口', x: 0, z: 0, w: 6, d: 8, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 3, y: 2.8, z: 4, color: 0xbfd0e8, intensity: 18, flicker: true } }, // 慘白冷光
    { id: 'archive', name: '檔案庫', x: 0, z: 8, w: 7, d: 8, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 3.5, y: 2.8, z: 12, color: 0x9fb8c0, intensity: 15, flicker: true } },
    { id: 'tanks', name: '培養槽室', x: 6, z: 0, w: 9, d: 8, h: 4, floor: 'metal', walls: 'metal',
      light: { x: 10.5, y: 3.4, z: 4, color: 0x55bacc, intensity: 22, flicker: true } }, // 培養槽藍綠光
    { id: 'datacenter', name: '資料中心', x: 7, z: 8, w: 8, d: 8, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 11, y: 3, z: 12, color: 0x7fb0ff, intensity: 20, flicker: true } }, // 主機藍光
    { id: 'stairs', name: '深層樓梯', x: 15, z: 0, w: 5, d: 16, h: 4.5, floor: 'metal', walls: 'metal',
      light: { x: 17.5, y: 4, z: 8, color: 0x6690cc, intensity: 16, flicker: true } }, // 往下沉的藍光
  ],
  doors: [
    { id: 'd23-entry-tanks', from: 'entry', to: 'tanks', axis: 'z', at: [6, 4], width: 1.4, height: 2.4, lock: null },
    { id: 'd23-entry-archive', from: 'entry', to: 'archive', axis: 'x', at: [3, 8], width: 1.2, height: 2.2, lock: null },
    { id: 'd23-archive-data', from: 'archive', to: 'datacenter', axis: 'z', at: [7, 12], width: 1.2, height: 2.2, lock: null },
    { id: 'd23-tanks-data', from: 'tanks', to: 'datacenter', axis: 'x', at: [11, 8], width: 1.4, height: 2.4, lock: null },
    { id: 'd23-tanks-stairs', from: 'tanks', to: 'stairs', axis: 'z', at: [15, 4], width: 1.3, height: 2.3, lock: null },
    { id: 'd23-data-stairs', from: 'datacenter', to: 'stairs', axis: 'z', at: [15, 12], width: 1.3, height: 2.3, lock: null },
    { id: 'd23-exit', from: 'stairs', to: null, axis: 'x', at: [17.5, 16], width: 1.6, height: 2.6, lock: 'chapterExit' },
  ],
  props: [
    // 入口：門禁閘、掛牌架、值班桌
    { room: 'entry', type: 'table', x: 4.5, z: 2, solid: 0.5 },     // 值班桌
    { room: 'entry', type: 'papers', x: 4.7, z: 2.2 },
    { room: 'entry', type: 'shelf', x: 0.4, z: 5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'entry', type: 'crate', x: 5, z: 6.5, solid: 0.4 },
    { room: 'entry', type: 'blood', x: 2.5, z: 4 },
    { room: 'entry', type: 'debris', x: 1.5, z: 7 },
    // 檔案庫：檔案層架陣、翻倒的紙箱
    { room: 'archive', type: 'shelf', x: 0.4, z: 9.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'archive', type: 'shelf', x: 0.4, z: 12, rot: Math.PI / 2, solid: 0.28 },
    { room: 'archive', type: 'shelf', x: 6.6, z: 10, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'archive', type: 'shelf', x: 6.6, z: 13.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'archive', type: 'cardboard', x: 3.5, z: 14.5 },
    { room: 'archive', type: 'papers', x: 2, z: 9 },
    { room: 'archive', type: 'blood', x: 4, z: 12.5 },
    // 培養槽室：立式培養槽陣（barrel）、管線、監測台
    { room: 'tanks', type: 'barrel', x: 7.5, z: 2, solid: 0.55 },
    { room: 'tanks', type: 'barrel', x: 9, z: 2, solid: 0.55 },
    { room: 'tanks', type: 'barrel', x: 10.5, z: 2, solid: 0.55 },
    { room: 'tanks', type: 'barrel', x: 12, z: 2, solid: 0.55 },
    { room: 'tanks', type: 'pipe', x: 10.5, z: 1, len: 8, y: 3.6 },
    { room: 'tanks', type: 'table', x: 13, z: 6, solid: 0.5 },      // 監測台
    { room: 'tanks', type: 'bodybag', x: 7.5, z: 6.5, rot: 0.5 },
    { room: 'tanks', type: 'blood', x: 10, z: 5 },
    // 資料中心：主機機櫃陣、操作台
    { room: 'datacenter', type: 'shelf', x: 7.4, z: 9.5, rot: Math.PI / 2, solid: 0.28 }, // 主機機櫃
    { room: 'datacenter', type: 'shelf', x: 7.4, z: 12, rot: Math.PI / 2, solid: 0.28 },
    { room: 'datacenter', type: 'shelf', x: 14.6, z: 10, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'datacenter', type: 'table', x: 11, z: 11, solid: 0.5 }, // 操作台
    { room: 'datacenter', type: 'papers', x: 11.2, z: 11.2 },
    { room: 'datacenter', type: 'chair_fallen', x: 12, z: 12, rot: 2.2 },
    { room: 'datacenter', type: 'blood', x: 9, z: 14 },
    // 深層樓梯：往下的階、警示管線
    { room: 'stairs', type: 'pipe', x: 17.5, z: 3, len: 15, y: 4 },
    { room: 'stairs', type: 'debris', x: 16.5, z: 8 },
    { room: 'stairs', type: 'barrel', x: 18.5, z: 6, solid: 0.4 },
    { room: 'stairs', type: 'blood', x: 17, z: 11 },
    { room: 'stairs', type: 'bodybag', x: 16.5, z: 14, rot: 0.4 },
  ],
  hazards: [
    { room: 'tanks', type: 'slime', x: 9, z: 4, r: 0.9 },          // 破槽溢出的培養液
    { room: 'tanks', type: 'slime', x: 12, z: 5.5, r: 0.85 },
    { room: 'datacenter', type: 'shock', x: 8, z: 13, r: 0.8 },     // 過載的主機機櫃
    { room: 'archive', type: 'fire', x: 5.5, z: 15, r: 0.85 },      // 燒毀的檔案堆
    { room: 'stairs', type: 'shock', x: 18.5, z: 10, r: 0.8 },      // 樓梯間短路的配電箱
  ],
  documents: [
    {
      id: 'g23-doc-sdata', title: 'S 計畫核心資料（主機存取）', x: 11, z: 11.3, grantsKey: 'sdata',
      text: '【S 計畫　核心綱要　最高機密】\n\n目標：量產「可認證、可武裝、可指令化」之戰術變異體。\n三大指標——\n　可控：植入行為限制晶片，指令優先於本能。\n　可武裝：骨骼強化、再生加速，可持械協同作戰。\n　可指令化：腦波匯流排，一令多動。\n\n主控權限：白（總負責）。\n首例：S-10（詳見術前檔案）。\n\n（拿到了。這份東西一離開主機，主控實驗室的門就會認證通過。）\n\n（可控、可武裝、可指令化。他們把「人」的定義，改寫成了這三行規格。）',
    },
    {
      id: 'g23-doc-preop', title: '術前檔案　S-10', x: 13.5, z: 10,
      text: '【改造前評估　編號 S-10】\n\n姓名：〔已封存〕　職務：市維安鎮壓中隊　隊長\n心理側寫：服從性極高，執行力滿分，對「上級命令」無條件信任。\n入選理由：同等體能者中，「最不會質疑命令」的一個。\n本人談話節錄：「我只是照命令做事。上面說誰是威脅，我就處理誰。」\n\n（服從性極高。這就是他被選中的原因——不是因為他壞，是因為他太聽話。）\n\n（「我只是照命令做事」。這句話我在工廠、在醫院、在每一份文件裡都聽過。責任，永遠在更上面。而承受的，永遠是最底層的這個人。）',
    },
    {
      id: 'g23-doc-photo', title: '檔案庫抽屜裡的舊照片', x: 2.2, z: 9.2, monoAfter: true,
      text: '（檔案庫最裡面那格抽屜沒有上鎖，裡面只有一張泛黃的照片。一群大學生擠在老舊的實驗室門口，最前排那個瘦瘦的年輕人抱著一疊書，笑得靦腆——白袍上還別著「見習」的名牌。）\n\n（照片背面用鋼筆寫著一行褪色的字：）\n\n「科學應該拯救人。——攝於分子生物實驗室，我們都還相信這句話的那一年」\n\n（照片裡的年輕人，和樓梯盡頭那扇門後面的人，是同一個。中間隔著的，不是歲月，是一次又一次「照命令做事」。）',
    },
    {
      id: 'g23-doc-outline', title: '研究樓層週報（最後一份）', x: 5, z: 13,
      text: '本週進度：\n・S-10 深層改造完成，各項指標達標，轉入戰術待命。\n・培養槽 S-01～S-09 淘汰，遺體待處理。\n・上級指示：加速量產，董事會要求「可上鏈的成品」交付。\n\n研究員附註（手寫，被劃掉又重寫）：\n「我們不是在做研究。我們在流水線上做人。做出來、淘汰、再做——第九個失敗的時候，我還會做噩夢。第九十個的時候，我已經不會了。這比怪物更可怕。」\n\n（會做噩夢，是還有良心。大衛把這句話留在這裡，是想讓下來的人知道——這裡曾經有人不想這麼做。）',
    },
  ],
  npcs: [
    {
      id: 'defector',
      name: '大衛（研究員）',
      x: 8, z: 6.5, yaw: 0, room: 'tanks',
      dialog: [
        '（他縮在培養槽後面，雙手還在抖，卻硬是沒有逃）別開槍……我沒有武器。我是研究員，大衛。編號以下、什麼都不是的那種。你是新聞上那個人吧？太好了，總算有人下來了。',
        '這些槽……S-01 到 S-09，全是「做壞的」。他們一個接一個地做人、淘汰、再做。我親手貼過其中三個的淘汰標籤。我以為我只是在做研究……直到我開始做噩夢。',
        '核心資料在資料中心的主機裡。我幫你留了一個沒鎖的帳號——你會看到 S 計畫的全部：可控、可武裝、可指令化。他們要的從來不是災難，是一支不會抗命的軍隊。',
        '（他壓低聲音）聖時……你以為他天生是怪物？他是鎮壓小隊的隊長。因為「服從性最高」被挑中改造的。他曾經是個會聽命令去救人的人。把他變成今天這樣的，不是病毒——是那些下命令的人。',
        '（他把一小盒補給塞給亮均）往下走，樓梯盡頭那扇門——白博士在裡面。我沒有勇氣跟你下去……但至少，我能讓那扇門，替你開。去吧。替我們這些不敢走的人，走下去。',
      ],
      dialogAfter: '（大衛靠著培養槽滑坐到地上）帳號沒鎖……資料在主機裡。往下走。替我們，走下去。',
      gift: [
        { item: 'magnum_ammo', count: 6 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g23-t-entry', room: 'entry', text: '研究樓層入口。牆上再沒有醫院的標語，只剩晨星的內部編號。那股甜膩的氣味，濃得化不開。',
      monologue: '（從柳營新廠的第一夜到這裡，這股味道一路跟著我。研究，他們管這叫研究。）' },
    { id: 'g23-t-tanks', room: 'tanks', text: '培養槽室。一整排立式玻璃槽亮著，每一槽泡著一個成形到一半的軀體，管線一滴一滴地灌注。', alert: true, shake: 0.06,
      monologue: '（S-01 到 S-09。他們把「做人」變成了流水線——做出來、淘汰、再做。第九個之後，就沒有人會做噩夢了。）' },
    { id: 'g23-t-archive', room: 'archive', text: '檔案庫。層架上的卷宗編號一路排到看不見的深處，最裡面那格抽屜，沒有上鎖。', sound: 'groan',
      monologue: '（沒上鎖的抽屜，往往藏著最不想被鎖住的東西。有人故意留了條縫。）' },
    { id: 'g23-t-data', room: 'datacenter', text: '資料中心。主機陣的指示燈連成一片藍海，操作台的螢幕還亮著大衛留下的登入畫面。', alert: true,
      monologue: '（一個沒鎖的帳號。一份會定罪整間公司的資料。他用他僅剩的良心，替我開了一道門。）' },
    { id: 'g23-t-stairs', room: 'stairs', text: '深層樓梯。照明一級一級往下亮起，盡頭那扇氣密門上，貼著一張 A4 紙：「S 計畫 主控實驗室」。', alert: true, sound: 'groan',
      monologue: '（所有的路，原來都通向這扇門。白博士，在裡面。這一次，我不會再被廣播擋在外面了。）' },
  ],
  entities: {
    pickups: [
      { id: 'g23-p-ammo1', item: 'handgun_ammo', count: 15, x: 4.5, z: 3 },
      { id: 'g23-p-herb1', item: 'green_herb', count: 1, x: 1, z: 6 },
      { id: 'g23-p-shells1', item: 'shotgun_shells', count: 7, x: 5, z: 6.5 },
      { id: 'g23-p-magammo1', item: 'magnum_ammo', count: 6, x: 8, z: 3 },           // 培養槽室
      { id: 'g23-p-smgammo1', item: 'smg_ammo', count: 30, x: 13, z: 6.5 },
      { id: 'g23-p-blue1', item: 'blue_herb', count: 1, x: 11, z: 4.5 },             // 培養液旁——防中毒
      { id: 'g23-p-herb2', item: 'green_herb', count: 1, x: 2, z: 10.5 },            // 檔案庫
      { id: 'g23-p-shells2', item: 'shotgun_shells', count: 7, x: 6, z: 14 },
      { id: 'g23-p-spray1', item: 'first_aid_spray', count: 1, x: 13.5, z: 13.5 },    // 資料中心
      { id: 'g23-p-ammo2', item: 'handgun_ammo', count: 15, x: 8.5, z: 10 },
      { id: 'g23-p-blue2', item: 'blue_herb', count: 1, x: 17, z: 6 },              // 樓梯間
      { id: 'g23-p-smgammo2', item: 'smg_ammo', count: 30, x: 18.5, z: 12 },
    ],
    enemies: [
      { id: 'g23-z1', type: 'zombie', x: 5, z: 5.5 },       // 入口失敗品
      { id: 'g23-hunter1', type: 'hunter', x: 10, z: 3 },    // 培養槽室——脫槽的獵殺體
      { id: 'g23-agent1', type: 'agent', x: 13.5, z: 5 },    // 培養槽室的守衛
      { id: 'g23-hunter2', type: 'hunter', x: 4, z: 13.5 },  // 檔案庫
      { id: 'g23-z2', type: 'zombie', x: 2.5, z: 11 },
      { id: 'g23-agent2', type: 'agent', x: 10, z: 13 },     // 資料中心守衛
      { id: 'g23-z3', type: 'zombie', x: 13, z: 14.5 },
      { id: 'g23-agent3', type: 'agent', x: 17, z: 9 },      // 樓梯守衛
      { id: 'g23-ironmask1', type: 'ironmask', x: 17.5, z: 13 }, // ★ 最後的精銳防線——鐵面
    ],
    typewriters: [
      { id: 'g23-tw-entry', x: 0.8, z: 0.8 },
      { id: 'g23-tw-data', x: 14.4, z: 15.2 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
