// 第十三章〈跨河大橋〉：過河唯一的路。晨星封橋部隊（ironmask ×2＋agent ×3）踞守橋面，
// 燒毀車陣既是掩體也是火場。收費站裡躲著市場大姐秀蘭姐與幾位倖存者——柵欄控制鑰匙在值班台。
// 關鍵演出：橋面二段望見對岸——三公尺高的剪影扛著火箭筒站在火光前，看了你們很久，然後轉身讓開了路。
// 無單一魔王，是突破封鎖戰。推進：收費站取得 tollkey → 升起對岸匝道的大橋柵欄。
export const CHAPTER13 = {
  id: 'chapter13',
  name: '第十三章：跨河大橋',
  next: 'chapter14',
  exitNeeds: 'tollkey',
  exitHint: '對岸匝道的柵欄放下了，馬達鎖死——要用收費站的控制鑰匙才升得起來。收費站的窗縫裡，好像有火光',
  spawn: { x: 1.5, z: 4, yaw: Math.PI / 2 }, // 河堤上到引道，面向東（橋的方向）
  lockNames: { tollkey: '收費站控制鑰匙', chapterExit: '大橋柵欄' },
  story: [
    '沿著河堤往下游走了二十分鐘，跨河大橋的黑影橫在夜色裡。\n\n引道上塞滿了熄火的車，一路排上橋頭——三個晚上前，全城的人都想從這裡出去。\n\n橋面上，一道探照燈光緩緩掃過，掠過路障、掠過鎮暴盾、掠過橋塔上垂下來的封鎖布條。\n\n欣儀伏在護欄後：「檢查哨。至少兩面盾，橋中央還有一道。」\n\n（晨星把橋封成了一條走廊。要過河，就得從槍口下面走過去。）',
    '「繞水路呢？」欣儀往橋下看了一眼——然後就沒有再看第二眼。\n\n河面上，一整片淡藍色的光，隨著水流緩緩地淌。KY 比他們早三個晚上過河。\n\n「走橋。」亮均把最後一個彈匣壓實，「車陣是掩體，燒著的車別靠近。收費站的窗戶有火光——可能有人。」\n\n「活人？」\n\n「活人。」他頓了頓，「死人不生火。」\n\n（配線圖在口袋裡。對岸的訊號還亮著。就差一條河。）',
    '爬上引道最高處的那一刻，兩人同時停住了。\n\n橋的另一端——對岸引道的火光前，立著一個影子。\n\n三公尺高。肩上扛著的東西，輪廓像一具火箭筒。\n\n他不動。探照燈掃過去，黑衣人繞著他走，沒有一個人敢靠近。他就那樣站著，面朝著橋的這一側。\n\n欣儀的聲音低得幾乎聽不見：「他在看我們。」\n\n（從工廠、從街區、從分局一路到河邊……他總是比我們先到。）\n\n（聖時。你到底在等什麼？）',
  ],
  endingText:
    '控制鑰匙轉到底，柵欄馬達發出封橋以來的第一聲運轉呻吟，橫桿緩緩抬起。整座橋的東西都被聲音驚動了——但已經不重要了。兩人跑過匝道，柏油路開始往上爬。東郊小丘的黑影上，轉播站的航空警示燈一下、一下地閃，像替整座城市數著心跳。天邊最低的地方，夜色已經薄得能看見灰。黎明前的最後一站。而那個讓開了路的三公尺剪影，此刻正在他們身後的某處，不緊不慢地，跟著。〔續　第十四章〕',
  objective: '突破晨星封橋部隊，在收費站取得控制鑰匙，升起大橋柵欄',
  rooms: [
    { id: 'approach', name: '大橋引道', x: 0, z: 0, w: 8, d: 8, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 4, y: 4.8, z: 4, color: 0x667788, intensity: 14, flicker: true } }, // 殘存的引道路燈
    { id: 'span1', name: '橋面一段', x: 8, z: 0, w: 14, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 15, y: 4.8, z: 3.5, color: 0xffb060, intensity: 28, flicker: true } }, // 燒車火光
    { id: 'span2', name: '橋面二段', x: 22, z: 0, w: 14, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 29, y: 4.8, z: 3.5, color: 0xff8844, intensity: 24, flicker: true } }, // 對岸引道的火光
    { id: 'toll', name: '收費站', x: 22, z: 7, w: 5, d: 4, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 24.5, y: 2.6, z: 9, color: 0xffe0b0, intensity: 18, flicker: true } }, // 鐵桶爐火光
    { id: 'ramp', name: '對岸匝道', x: 36, z: 0, w: 8, d: 8, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 40, y: 4.8, z: 4, color: 0x8899bb, intensity: 14, flicker: true } },
  ],
  doors: [
    { id: 'd13-app-span1', from: 'approach', to: 'span1', axis: 'z', at: [8, 3.5], width: 1.8, height: 2.6, lock: null },
    { id: 'd13-span1-span2', from: 'span1', to: 'span2', axis: 'z', at: [22, 3.5], width: 1.8, height: 2.6, lock: null },
    { id: 'd13-span2-toll', from: 'span2', to: 'toll', axis: 'x', at: [25.5, 7], width: 1.1, height: 2.1, lock: null },
    { id: 'd13-span2-ramp', from: 'span2', to: 'ramp', axis: 'z', at: [36, 3.5], width: 1.8, height: 2.6, lock: null },
    { id: 'd13-exit', from: 'ramp', to: null, axis: 'z', at: [44, 4], width: 1.6, height: 2.5, lock: 'chapterExit' },
  ],
  props: [
    // 引道：逃難車陣，全部頭朝著橋
    { room: 'approach', type: 'car', x: 4, z: 2.5, rot: 0.2, solid: 1.0 },
    { room: 'approach', type: 'car', x: 6, z: 5.5, rot: -0.9, variant: 1, solid: 1.0 }, // 翻覆
    { room: 'approach', type: 'streetlight', x: 2, z: 0.7 },
    { room: 'approach', type: 'streetlight', x: 6, z: 7.3, dead: true },
    { room: 'approach', type: 'trash', x: 1, z: 7 },
    { room: 'approach', type: 'hydrant', x: 7.4, z: 0.8 },
    { room: 'approach', type: 'blood', x: 5, z: 4 },
    { room: 'approach', type: 'debris', x: 3, z: 6.8 },
    // 橋面一段：車陣掩體＋第一道路障（攔阻線 B）
    { room: 'span1', type: 'car', x: 12, z: 3, rot: 0.5, solid: 1.0 },
    { room: 'span1', type: 'car', x: 16, z: 2.2, rot: -0.3, variant: 2, solid: 1.0 },   // 燒毀
    { room: 'span1', type: 'car', x: 19.5, z: 5, rot: 1.7, variant: 1, solid: 1.0 },    // 翻覆
    { room: 'span1', type: 'crate', x: 17, z: 3.8, solid: 0.4 },   // 路障沙包
    { room: 'span1', type: 'crate', x: 17.8, z: 3.1, solid: 0.4 },
    { room: 'span1', type: 'streetlight', x: 10, z: 0.6 },
    { room: 'span1', type: 'streetlight', x: 18, z: 6.4, dead: true },
    { room: 'span1', type: 'corpse', x: 17.5, z: 5.6, variant: 2 }, // 攔阻線前的犧牲者
    { room: 'span1', type: 'blood', x: 14, z: 4.5 },
    { room: 'span1', type: 'debris', x: 11, z: 6 },
    // 橋面二段：第二道路障（攔阻線 A）
    { room: 'span2', type: 'car', x: 25, z: 3.5, rot: -0.4, solid: 1.0 },
    { room: 'span2', type: 'car', x: 28.5, z: 4.6, rot: 0.8, variant: 2, solid: 1.0 },  // 燒毀
    { room: 'span2', type: 'car', x: 32, z: 2, rot: 2.0, variant: 1, solid: 1.0 },      // 翻覆
    { room: 'span2', type: 'crate', x: 30, z: 3.2, solid: 0.4 },
    { room: 'span2', type: 'crate', x: 30.7, z: 2.5, solid: 0.4 },
    { room: 'span2', type: 'streetlight', x: 24, z: 0.6 },
    { room: 'span2', type: 'streetlight', x: 31, z: 6.4, dead: true },
    { room: 'span2', type: 'corpse', x: 30.3, z: 4, variant: 0 },
    { room: 'span2', type: 'blood', x: 27, z: 2 },
    { room: 'span2', type: 'bodybag', x: 34.5, z: 1, rot: 0.4 },
    { room: 'span2', type: 'debris', x: 26, z: 5.8 },
    // 收費站：倖存者的避難小屋
    { room: 'toll', type: 'table', x: 23, z: 8, solid: 0.5 },       // 值班台
    { room: 'toll', type: 'papers', x: 23.2, z: 8.2 },
    { room: 'toll', type: 'chair_fallen', x: 24, z: 9, rot: 1.3 },
    { room: 'toll', type: 'shelf', x: 26.6, z: 9.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'toll', type: 'barrel', x: 25.5, z: 10.2, solid: 0.35 }, // 取暖的鐵桶爐
    { room: 'toll', type: 'cardboard', x: 23.5, z: 10.4 },           // 倖存者的睡墊
    { room: 'toll', type: 'cardboard', x: 24.3, z: 10.6 },
    // 對岸匝道：他讓開的那條路
    { room: 'ramp', type: 'car', x: 39, z: 2.5, rot: 0.3, variant: 2, solid: 1.0 },
    { room: 'ramp', type: 'streetlight', x: 38, z: 7.3 },
    { room: 'ramp', type: 'streetlight', x: 43, z: 0.7, dead: true },
    { room: 'ramp', type: 'trash', x: 37, z: 1 },
    { room: 'ramp', type: 'debris', x: 41, z: 6.5 },
    { room: 'ramp', type: 'blood', x: 40, z: 4.5 },
    { room: 'ramp', type: 'hydrant', x: 43.2, z: 7.2 },
  ],
  // 橋面危險：燒車火場、斷落橋燈電纜、河水漫上來的 KY 積水
  hazards: [
    { room: 'approach', type: 'slime', x: 4, z: 6.8, r: 0.8 },  // 河堤漫上來的泛藍積水
    { room: 'span1', type: 'fire', x: 16, z: 3.6, r: 1.0 },     // 燒毀車周圍
    { room: 'span1', type: 'fire', x: 14.8, z: 2.2, r: 0.8 },
    { room: 'span2', type: 'fire', x: 28.5, z: 6.2, r: 0.9 },
    { room: 'span2', type: 'shock', x: 31.2, z: 5.9, r: 0.8 },  // 死掉的橋燈斷纜垂地
    { room: 'ramp', type: 'slime', x: 42, z: 2, r: 0.8 },
  ],
  documents: [
    {
      id: 'g13-doc-roster', title: '晨星檢查哨輪值表（跨河大橋）', x: 17, z: 3.2,
      text: '哨點：黑鴉大橋　攔阻線 B\n輪值：鎮暴一組／鎮暴二組，四小時一輪\n巡察：機動組沿橋面往返，一小時一巡\n\n附註（紅字）：聖時單位：不受本表節制。遭遇時：迴避、不接觸、不回報。\n\n（「不回報」。晨星的紀錄裡不准出現他——彷彿只要沒人寫下來，那個東西就不存在。）\n\n（連拿槍的人，都在假裝沒看見。）',
    },
    {
      id: 'g13-doc-order', title: '封橋命令（晨星應變中心）', x: 29.5, z: 2.5,
      text: '命令編號：MS-EX-77\n即刻封閉黑鴉大橋雙向車道，設置攔阻線 A／B。\n攔阻對象：所有人員與車輛，含本公司員工。\n攔阻等級：終止。\n事後說明口徑：「橋體結構受損，封閉檢修」。\n\n（「終止」。命令書不寫「射殺」，就像公告不寫「棄置」。）\n\n（他們的字典永遠是乾淨的。不乾淨的是橋面。）',
    },
    {
      id: 'g13-doc-photo', title: '抽屜裡的剪綵照片（大橋通車）', x: 22.9, z: 8.1, monoAfter: true,
      text: '（收費站的抽屜裡壓著一張泛黃的照片：橋頭拉著紅布條，「黑鴉大橋通車誌慶」。剪綵的官員笑得標準，但照片的主角不是他們——是布條後面黑壓壓的人群，扶老攜幼，全都在往橋上走。）\n\n（背面的字跡已經淡了：）\n\n「那天全鎮的人都來走橋。阿爸說，橋通了，河兩邊就是一家人了。」\n\n（今晚，橋上拉的是攔阻線。）\n\n（把一家人隔成兩岸的，從來不是河。）',
    },
    {
      id: 'g13-doc-lastcar', title: '車窗上的字條（引道車陣）', x: 4.5, z: 5.5,
      text: '（一輛熄火的休旅車，車窗內側貼著一張用口紅寫的紙板：）\n\n「往東不通！！橋被封了，穿黑衣服的會開槍。\n後面的車不要再按喇叭，聲音會引來那些東西。\n我們往河堤走。小美，如果你看到這張紙——媽媽在堤防第三個涵洞等你。」\n\n（引道上的車全都頭朝著橋，沒有一輛掉頭。）\n\n（掉頭，也已經沒有地方可去了。）',
    },
  ],
  npcs: [
    {
      id: 'leader',
      name: '秀蘭姐',
      x: 25.7, z: 8.8, yaw: 0, room: 'toll',
      dialog: [
        '（鐵桶爐上溫著一鍋湯，一個大嗓門硬壓成氣音）進來就把門帶上！橋上那些黑衣服的，一小時巡一輪。……你們不是晨星的。晨星的不敲門。',
        '我秀蘭啦，橋頭市場賣魚三十年。封橋那晚我帶著隔壁攤的阿公阿嬤躲進來——收費站牆厚，他們的名單上沒有這裡。',
        '你們要過橋？（她上下打量兩人，嘆了口氣）柵欄的控制鑰匙在值班台，穿制服的阿良走之前交給我保管……人我留不住，鑰匙我替他顧到現在。',
        '對岸那個大傢伙——扛著炮的那個——三天了，站在引道就是不過橋。黑衣服的也不敢管他。（她壓低聲音）他好像……在等什麼人。',
        '鑰匙拿去。柵欄升起來的時候聲音很大，會把整座橋的東西都引過來——跑，不要回頭。替阿良把橋顧好，他到最後都沒有離開崗位。',
      ],
      dialogAfter: '（秀蘭姐往你手裡塞了一把青草）走橋面靠護欄那一側，燒車的火別碰。到了對岸……替我們看一眼天亮。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'shotgun_shells', count: 7 },
      ],
    },
  ],
  triggers: [
    { id: 'g13-t-approach', room: 'approach', text: '引道。熄火的車陣一路排上橋頭，車門大開，行李散落——所有的車都朝著同一個方向。',
      monologue: '（每一輛車都想過橋。柵欄放下的那一刻，逃難就變成了排隊。）' },
    { id: 'g13-t-span1', room: 'span1', text: '橋面一段。探照燈掃過來——路障後面，鎮暴盾豎起，黑衣人拉槍機的聲音在橋上格外清脆。', alert: true, shake: 0.07,
      monologue: '（槍口全部朝著市區這一側。晨星防的不是東西過橋——是消息過河。）' },
    { id: 'g13-t-span2', room: 'span2', text: '橋面二段。對岸引道的火光前，立著一個三公尺高的剪影，肩上扛著火箭筒。他看著你們——隔著整段橋面，看了很久。然後，他轉過身，讓開了路。', alert: true, shake: 0.08,
      monologue: '（他讓開了路。從工廠一路跟到河邊的東西，在橋上選擇了等。……他在等。等我們走到哪裡？）' },
    { id: 'g13-t-toll', room: 'toll', text: '收費站。窗縫透出鐵桶爐的火光，裡面有壓低的人聲——活人的聲音。', sound: 'door',
      monologue: '（封鎖線的正中央，有人把收費站守成了家。守夜的人，總是在最不可能的地方。）' },
    { id: 'g13-t-ramp', room: 'ramp', text: '對岸匝道。腳下的柏油開始上坡。東郊小丘的方向，一點紅光一下、一下地閃。', sound: 'dogbark',
      monologue: '（轉播站的航空警示燈。整座黑鴉市最後一顆綠燈的所在——黎明前的最後一站。）' },
  ],
  entities: {
    pickups: [
      { id: 'g13-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 1.5 },
      { id: 'g13-p-herb1', item: 'green_herb', count: 1, x: 6.5, z: 7 },
      { id: 'g13-p-shells1', item: 'shotgun_shells', count: 7, x: 13, z: 1 },
      { id: 'g13-p-blue1', item: 'blue_herb', count: 1, x: 19, z: 6 },
      { id: 'g13-p-smgammo1', item: 'smg_ammo', count: 30, x: 16.5, z: 5.8 },   // 攔阻線 B 的補給
      { id: 'g13-p-ammo2', item: 'handgun_ammo', count: 15, x: 25, z: 6.3 },
      { id: 'g13-p-magammo1', item: 'magnum_ammo', count: 6, x: 30.5, z: 1.2 }, // 攔阻線 A 的物資箱旁
      { id: 'g13-p-spray1', item: 'first_aid_spray', count: 1, x: 33.5, z: 6 },
      { id: 'g13-p-tollkey', item: 'tollkey', count: 1, x: 23, z: 8.8 },        // ★ 值班台——阿良留下的鑰匙
      { id: 'g13-p-shells2', item: 'shotgun_shells', count: 7, x: 26.5, z: 10.8 },
      { id: 'g13-p-herb2', item: 'green_herb', count: 1, x: 42, z: 7 },
      { id: 'g13-p-blue2', item: 'blue_herb', count: 1, x: 38.5, z: 1.5 },
    ],
    enemies: [
      { id: 'g13-ironmask1', type: 'ironmask', x: 18.6, z: 2.2 },  // ★ 攔阻線 B 的鎮暴隊長
      { id: 'g13-agent1', type: 'agent', x: 13.5, z: 5.5 },
      { id: 'g13-z2', type: 'zombie', x: 10.5, z: 1.5 },           // 橋上被「終止」的人
      { id: 'g13-ironmask2', type: 'ironmask', x: 30.8, z: 4.2 },  // ★ 攔阻線 A 的鎮暴隊長
      { id: 'g13-agent2', type: 'agent', x: 26, z: 1.8 },
      { id: 'g13-agent3', type: 'agent', x: 33, z: 5 },
      { id: 'g13-z1', type: 'zombie', x: 6, z: 2 },                // 引道車陣間遊蕩
      { id: 'g13-mutant1', type: 'mutant', x: 40, z: 4 },          // 對岸匝道——沒人清理的那一側
      { id: 'g13-dog1', type: 'dog', x: 38, z: 6.5 },
    ],
    typewriters: [
      { id: 'g13-tw-approach', x: 0.8, z: 0.8 },
      { id: 'g13-tw-toll', x: 22.5, z: 10.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
