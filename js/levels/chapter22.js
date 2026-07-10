// 第二十二章〈B4 隔離區〉：住院大樓的盡頭是一部只往下的電梯，燈號停在 B4。
// 這裡曾是為 SARS 病人蓋的負壓隔離區——晨星把它改成了培養場。負壓、警示、成對的「雙生」培養體。
// 欣儀強撐著跟到這裡，用品保的眼睛替亮均判讀隔離區的數據：他們在養「可以被下指令」的宿主。
export const CHAPTER22 = {
  id: 'chapter22',
  name: '第二十二章：B4 隔離區',
  next: 'chapter23',
  exitNeeds: 'isokey',
  exitHint: '通往地下研究樓層的負壓氣密門刷卡才開——監控室裡管著整層權限，磁卡多半也鎖在那',
  spawn: { x: 3, z: 1.5, yaw: Math.PI / 2 }, // 隔離區前室西北，面向東
  lockNames: { isokey: '隔離區磁卡', chapterExit: '負壓氣密門' },
  story: [
    '電梯只剩一個按鈕還會亮：B4。\n\n門開的瞬間，一股負壓把走廊的空氣往裡吸——布簾、紙屑、連呼吸都被拉向深處。牆上還留著十幾年前的舊漆字：「負壓隔離區　非請勿入」。底下被人用噴漆蓋掉了醫院的標誌，換成晨星的紅白徽章。\n\n「這裡……」欣儀扶著門框喘，額頭全是汗，「是當年 SARS 蓋的隔離區。全市最乾淨的地方。」\n\n（最乾淨的地方，最適合養最髒的東西。）',
    '前室的觀察窗後面，兩張隔離病床並排著。\n\n床上不是病人。是兩具泡在半透明培養膜裡的軀體，幾乎一模一樣——連臉都像。它們的胸口隨著某種節奏起伏，同步得像照鏡子。\n\n欣儀貼上觀察窗，職業病似地讀起床頭的監測數據，臉色一點一點沉下去。\n\n「亮均，你看這組波形。」她的聲音在抖，「它們的腦波是連動的。晨星不是在養兩個怪物——是在養一對『可以被同一道指令驅動』的宿主。」\n\n（一個口令，兩隻聽話的手。他們在練的，是怎麼指揮這些東西。）',
    '負壓走廊的盡頭，監控室的螢幕牆還亮著。\n\n幾十路畫面切來切去，全是隔離病房裡那些泡在膜裡的軀體。角落一台伺服器規律地閃著綠燈，把每一組腦波、每一次同步，都寫進晨星的資料庫。\n\n欣儀順著螢幕上的權限表往下讀，忽然停住。\n\n「往下還有一層。」她指著一行灰掉的樓層——B5，地下研究樓層，「這裡的東西，都是從下面送上來『測試』的。要下去，得先拿到這層的隔離磁卡。」\n\n她扶著牆站直，勉強笑了一下：「我陪你到這。剩下的路，我幫你看數據。」',
  ],
  endingText:
    '隔離磁卡從監控台的抽屜裡取出來時，還連著一段沒剪斷的識別繩。刷過負壓氣密門的讀卡機，門縫裡湧出的冷氣比這一整層都更低——像從冰箱深處呼出來的。欣儀靠在監控台邊，把螢幕上那行 B5 的座標抄在亮均手背上：「這裡養的怪物，是下面『做』出來的。真正的答案，在最深的地方。」她替自己補了一針退燒的針劑，聲音輕得幾乎聽不見：「我還撐得住。你先下去——別讓我等太久。」氣密門在身後合上，把兩張並排的空床，永遠關在了燈光裡。〔續　第二十三章〕',
  objective: '取得隔離區磁卡，開啟通往地下研究樓層的負壓氣密門',
  rooms: [
    { id: 'anteroom', name: '隔離區前室', x: 0, z: 0, w: 6, d: 8, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 3, y: 2.8, z: 4, color: 0xbfe0d8, intensity: 20, flicker: true } }, // 消毒冷光
    { id: 'corridor', name: '負壓走廊', x: 6, z: 0, w: 4, d: 16, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 8, y: 2.6, z: 8, color: 0x9fd0e0, intensity: 16, flicker: true } }, // 青綠冷光
    { id: 'wardA', name: '隔離病房A', x: 10, z: 0, w: 8, d: 7, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 14, y: 3, z: 3.5, color: 0x66c0cc, intensity: 22, flicker: true } }, // 培養膜藍綠光
    { id: 'wardB', name: '隔離病房B', x: 10, z: 8, w: 8, d: 8, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 14, y: 3, z: 12, color: 0x66c0cc, intensity: 22, flicker: true } },
    { id: 'control', name: '監控室', x: 0, z: 8, w: 6, d: 8, h: 3.2, floor: 'metal', walls: 'metal',
      light: { x: 3, y: 2.8, z: 12, color: 0x8fbfff, intensity: 18, flicker: true } }, // 螢幕牆藍光
  ],
  doors: [
    { id: 'd22-ante-corr', from: 'anteroom', to: 'corridor', axis: 'z', at: [6, 4], width: 1.4, height: 2.4, lock: null },
    { id: 'd22-corr-wardA', from: 'corridor', to: 'wardA', axis: 'z', at: [10, 3.5], width: 1.3, height: 2.3, lock: null },
    { id: 'd22-corr-wardB', from: 'corridor', to: 'wardB', axis: 'z', at: [10, 12], width: 1.3, height: 2.3, lock: null },
    { id: 'd22-ante-control', from: 'anteroom', to: 'control', axis: 'x', at: [3, 8], width: 1.2, height: 2.2, lock: null },
    { id: 'd22-corr-control', from: 'corridor', to: 'control', axis: 'z', at: [6, 12], width: 1.2, height: 2.2, lock: null },
    { id: 'd22-exit', from: 'corridor', to: null, axis: 'x', at: [8, 16], width: 1.5, height: 2.5, lock: 'chapterExit' },
  ],
  props: [
    // 前室：消毒閘、防護衣架、更衣長凳
    { room: 'anteroom', type: 'shelf', x: 0.4, z: 2, rot: Math.PI / 2, solid: 0.28 },   // 防護衣架
    { room: 'anteroom', type: 'shelf', x: 0.4, z: 4.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'anteroom', type: 'table', x: 4.5, z: 6.5, solid: 0.5 },                     // 更衣長凳
    { room: 'anteroom', type: 'papers', x: 4.7, z: 6.7 },
    { room: 'anteroom', type: 'crate', x: 5, z: 1, solid: 0.4 },
    { room: 'anteroom', type: 'blood', x: 2.5, z: 5.5 },
    { room: 'anteroom', type: 'debris', x: 1.5, z: 7 },
    // 負壓走廊：拖行血痕、輸氣管線、屍袋
    { room: 'corridor', type: 'pipe', x: 8, z: 2, len: 15, y: 2.7 },
    { room: 'corridor', type: 'blood', x: 8, z: 5.5 },
    { room: 'corridor', type: 'blood', x: 7.5, z: 10 },
    { room: 'corridor', type: 'bodybag', x: 8.5, z: 14, rot: 0.4 },
    { room: 'corridor', type: 'debris', x: 7, z: 8 },
    { room: 'corridor', type: 'barrel', x: 8.6, z: 15, solid: 0.4 },
    // 隔離病房A：並排培養床、監測架、翻倒點滴
    { room: 'wardA', type: 'table', x: 12, z: 2, solid: 0.5 },       // 培養床
    { room: 'wardA', type: 'table', x: 15.5, z: 2, solid: 0.5 },     // 「雙生」的另一張
    { room: 'wardA', type: 'barrel', x: 13.7, z: 5, solid: 0.55 },   // 培養槽
    { room: 'wardA', type: 'shelf', x: 17.6, z: 3.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'wardA', type: 'blood', x: 12.5, z: 4.5 },
    { room: 'wardA', type: 'chair_fallen', x: 11, z: 5.5, rot: 1.6 },
    // 隔離病房B：與 A 對稱
    { room: 'wardB', type: 'table', x: 12, z: 10, solid: 0.5 },
    { room: 'wardB', type: 'table', x: 15.5, z: 10, solid: 0.5 },
    { room: 'wardB', type: 'barrel', x: 13.7, z: 13, solid: 0.55 },
    { room: 'wardB', type: 'shelf', x: 17.6, z: 14, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'wardB', type: 'bodybag', x: 11.5, z: 14.5, rot: 0.6 },
    { room: 'wardB', type: 'blood', x: 15, z: 13 },
    // 監控室：螢幕牆前的監控台、伺服器機櫃
    { room: 'control', type: 'table', x: 4.5, z: 9, solid: 0.5 },    // 監控台
    { room: 'control', type: 'papers', x: 4.7, z: 9.2 },
    { room: 'control', type: 'shelf', x: 0.4, z: 11, rot: Math.PI / 2, solid: 0.28 }, // 伺服器機櫃
    { room: 'control', type: 'shelf', x: 0.4, z: 13.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'control', type: 'chair_fallen', x: 3.5, z: 10.5, rot: 2.4 },
    { room: 'control', type: 'blood', x: 2, z: 14 },
  ],
  hazards: [
    { room: 'wardA', type: 'slime', x: 13.7, z: 5, r: 0.9 },        // 破掉的培養槽溢液
    { room: 'wardB', type: 'slime', x: 13.7, z: 13, r: 0.9 },
    { room: 'corridor', type: 'slime', x: 8, z: 11, r: 0.8 },
    { room: 'control', type: 'shock', x: 1, z: 12.2, r: 0.8 },       // 短路的伺服器機櫃
    { room: 'anteroom', type: 'shock', x: 0.8, z: 3.2, r: 0.75 },    // 消毒閘漏電
  ],
  documents: [
    {
      id: 'g22-doc-retrofit', title: '隔離區改建工單', x: 2, z: 1.5,
      text: '【工程變更單　編號 B4-R7】\n\n原用途：法定傳染病負壓隔離收治。\n變更後用途：晨星工業「生物適性試驗區」。\n拆除：正壓供氧、家屬會客窗。\n新增：培養膜灌注管、腦波同步監測、遠端指令匯流排。\n\n（這裡本來是救人的地方。是全市在 SARS 那年，用最貴的錢、蓋得最乾淨的地方。）\n\n（他們把供氧管拆了，換上灌注管。同一條牆，同一批病床——救人的通道，被改成了養怪的通道。）',
    },
    {
      id: 'g22-doc-hostfit', title: '宿主適性評估表', x: 16, z: 11,
      text: '【KY 宿主適性評分（滿分 100）】\n\n編號 S-07　同步率 71　自主意識殘留 高　→ 不合格（不受控）\n編號 S-08　同步率 88　自主意識殘留 中　→ 待觀察\n編號 S-09　同步率 90　……　→ 淘汰（增殖不穩）\n編號 S-10　同步率 99　服從性 99　戰術判斷 保留　→ ★最高分，轉深層改造\n\n（S-10。九十九分的服從，卻「保留戰術判斷」——他們要的不是聽話的殭屍，是聽話又會打仗的人。）\n\n（這一欄的名字被塗掉了。但同步率九十九，全院只有一個人辦得到。聖時。）',
    },
    {
      id: 'g22-doc-photo', title: '監控台抽屜裡的剪綵照', x: 4.3, z: 9.4, monoAfter: true,
      text: '（監控台的抽屜卡了一半，裡面壓著一張裱框的舊照片。負壓隔離區啟用剪綵那天，一整排穿白袍的醫護站在紅色綵帶前，中間那位剪刀舉得高高的，笑得驕傲。）\n\n（照片下方的銅牌刻著：）\n\n「黑鴉市立總醫院　負壓隔離病房　落成啟用　為守護每一位市民的呼吸」\n\n（那一年，這面牆後面躺著等著活下去的人。今年，這面牆後面泡著等著被指揮的怪物。同一張床，隔了不到二十年。）',
    },
    {
      id: 'g22-doc-twinlog', title: '「雙生」培養日誌', x: 13, z: 4.5,
      text: '第 12 日：A、B 兩體植入同源組織，腦波開始出現鏡像。\n第 20 日：對單一聲頻指令，A、B 同步反應，延遲 < 0.1 秒。\n第 26 日：測試「一令雙動」——下達攻擊指令，兩體同時撲向標的，協同無誤。\n備註：兩體不可分開喚醒。喚醒其一，另一體必同步暴走。\n\n（一道命令，兩隻手。他們在練的，是怎麼把一句話，變成一群怪物的動作。）\n\n（「不可分開喚醒」——所以我一踏進病房，這對東西，就會一起醒過來。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 8, z: 5, yaw: -Math.PI / 2, room: 'corridor',
      dialog: [
        '（欣儀撐著走廊的牆，臉色灰白，卻死死盯著監測螢幕）等一下……讓我看完這組數據。你打你的，我看我的——這種時候，我這雙品保的眼睛，總算還派得上用場。',
        '（她指著病房裡並排的兩具軀體）你看它們的胸口，起伏是同步的。腦波也是。晨星不是在養兩個怪物，是在養一對「可以被同一道指令驅動」的宿主。一個口令，兩隻聽話的手。',
        '這才是最可怕的地方。殭屍會亂咬，是失控；但這對東西不會——它們在等命令。他們想要的，從來不是災難……是一支不會抗命的軍隊。',
        '（她咳了幾聲，抹掉嘴角的血）宿主適性評估表你找到了嗎？分數最高的那一欄名字被塗掉了。同步率九十九……全院只有一個人做得到。你我都知道是誰。',
        '（她把磁卡的位置圈在螢幕上）隔離磁卡在監控室的抽屜裡。拿到它，往下走。我陪你到這一層——再下去的低溫，我這副身體撐不住了。剩下的，我幫你盯著數據。',
      ],
      dialogAfter: '（欣儀靠著牆，眼睛沒離開過螢幕）同步率九十九……去吧。我幫你看著上面的動靜。',
      gift: [
        { item: 'first_aid_spray', count: 1 },
        { item: 'smg_ammo', count: 30 },
      ],
    },
  ],
  triggers: [
    { id: 'g22-t-ante', room: 'anteroom', text: '隔離區前室。負壓把布簾往深處吸，消毒閘的紫外燈一明一滅。牆上舊漆字：「非請勿入」。',
      monologue: '（最乾淨的地方，最適合養最髒的東西。這句話今天早上還只是個比喻。）' },
    { id: 'g22-t-corr', room: 'corridor', text: '負壓走廊。地板兩道平行的拖行血痕，一路被氣流「吹」向盡頭的氣密門。', sound: 'groan',
      monologue: '（連血都往裡面流。這條走廊的設計，就是讓東西進得去、出不來。）' },
    { id: 'g22-t-wardA', room: 'wardA', text: '隔離病房A。兩張病床並排著，培養膜裡的軀體同時睜開了眼——連轉頭的角度都一模一樣。', alert: true, shake: 0.07,
      monologue: '（「雙生」。日誌說喚醒其一，另一體必同步暴走。我剛剛，把它們一起吵醒了。）' },
    { id: 'g22-t-wardB', room: 'wardB', text: '隔離病房B。和 A 房像照鏡子——第二具軀體撐破培養膜坐了起來，動作和牆那頭的它完全同步。', alert: true, sound: 'groan',
      monologue: '（一道命令，兩隻手。我要對付的不是兩個怪物，是一個被拆成兩半的意志。）' },
    { id: 'g22-t-control', room: 'control', text: '監控室。整面螢幕牆播著隔離病房的畫面，角落的伺服器綠燈規律地閃——一台會尖叫的東西藏在螢幕光後面。', alert: true,
      monologue: '（那台伺服器，把每一次同步都寫進了資料庫。滅了它救不了誰——但磁卡就在它腳邊的抽屜裡。）' },
  ],
  entities: {
    pickups: [
      { id: 'g22-p-ammo1', item: 'handgun_ammo', count: 15, x: 4.5, z: 2.5 },
      { id: 'g22-p-herb1', item: 'green_herb', count: 1, x: 1, z: 6.5 },
      { id: 'g22-p-shells1', item: 'shotgun_shells', count: 7, x: 8.5, z: 7 },        // 走廊
      { id: 'g22-p-blue1', item: 'blue_herb', count: 1, x: 7.5, z: 13 },              // 走廊培養液旁——防中毒
      { id: 'g22-p-smgammo1', item: 'smg_ammo', count: 30, x: 16.5, z: 3.5 },         // 病房A
      { id: 'g22-p-magammo1', item: 'magnum_ammo', count: 6, x: 11.5, z: 2 },
      { id: 'g22-p-spray1', item: 'first_aid_spray', count: 1, x: 16.5, z: 14.5 },     // 病房B
      { id: 'g22-p-herb2', item: 'green_herb', count: 1, x: 11.5, z: 10 },
      { id: 'g22-p-blue2', item: 'blue_herb', count: 1, x: 3, z: 8.6 },               // 監控室門口
      { id: 'g22-p-isokey', item: 'isokey', count: 1, x: 4.7, z: 9.6 },              // ★ 監控台抽屜
      { id: 'g22-p-ammo2', item: 'handgun_ammo', count: 15, x: 2, z: 12.5 },          // 監控室
      { id: 'g22-p-shells2', item: 'shotgun_shells', count: 7, x: 5.2, z: 15 },
    ],
    enemies: [
      { id: 'g22-z1', type: 'zombie', x: 5, z: 5 },        // 前室感染者
      { id: 'g22-z2', type: 'zombie', x: 8, z: 8 },        // 走廊
      { id: 'g22-dog1', type: 'dog', x: 8.5, z: 12.5 },
      { id: 'g22-mutant1', type: 'mutant', x: 13.5, z: 2.5 }, // ★「雙生」A
      { id: 'g22-z3', type: 'zombie', x: 16, z: 6 },
      { id: 'g22-mutant2', type: 'mutant', x: 13.5, z: 10.5 }, // ★「雙生」B
      { id: 'g22-z4', type: 'zombie', x: 12, z: 14.5 },
      { id: 'g22-howler1', type: 'howler', x: 2.5, z: 13 },  // ★ 監控室尖嘯者——alertAll
      { id: 'g22-z5', type: 'zombie', x: 4.5, z: 11 },
    ],
    typewriters: [
      { id: 'g22-tw-ante', x: 0.8, z: 0.8 },
      { id: 'g22-tw-control', x: 5.2, z: 8.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
