// 第十六章〈病棟燈號〉：住院大樓。護理長說被「收治」上樓的人沒有一個下來過——
// 這一層就是「上樓」的第一站。天花板的輸氧管線成了潛伏者的巢，長廊的燈一路壞到底。
// 躲在護理站的實習醫師小盧，用一本交班簿記下了整層樓「被轉走」的過程。
export const CHAPTER16 = {
  id: 'chapter16',
  name: '第十六章：病棟燈號',
  next: 'chapter17',
  exitNeeds: 'wardcard',
  exitHint: '電梯讀卡機亮著紅燈——小盧說學姊的備用電梯卡壓在護理站值班表底下的抽屜裡',
  spawn: { x: 1.5, z: 1.5, yaw: Math.PI }, // 連通門內側的電梯間門廳，面向南（長廊方向）
  lockNames: { wardcard: '病棟電梯卡', chapterExit: '病棟電梯' },
  story: [
    '連通門在身後鎖上的聲音，比想像中沉。\n\n住院大樓的電梯間門廳，白燈亮得像手術台。樓層索引牌上，三樓以上的樓層名全被撕掉了，貼上晨星的藍色封條：「特殊收治區　閒人勿入」。\n\n電梯門緊閉。讀卡機的紅燈一下、一下地眨。\n\n樓層燈號的面板上，只有一個字亮著——B4。\n\n（護理長的樓層圖，紅筆圈的也是 B4。他們把答案鎖在最深的地方，然後把路上的每一層，都變成了關卡。）',
    '住院長廊比記憶中任何一條醫院走廊都長。\n\n十八公尺，一側是護理站與病房，天花板上輸氧管線一路延伸進黑暗。燈壞了大半，剩下的那幾盞，閃得像快斷氣。\n\n管線在響。\n\n不是風。是有什麼東西貼著管子，在頭頂上，緩慢地、一段一段地挪動。剝落的天花板隔板間，垂下幾條黏稠的絲。\n\n（護理長說：被收治上樓的人，沒有一個下來過。）\n\n（也許有些「下來」了——只是換了一種方式，住進了天花板。）',
    '長廊中段，護理站的玻璃窗後面，一道手電筒的光一閃，立刻熄掉。\n\n有活人。\n\n玻璃上貼滿了便條紙：「19 床家屬電話改」「今晚超收 4 位」「氧氣瓶剩 6 支，省著用」——一整面牆的日常，停在支援隊進駐的那個晚上。\n\n櫃台上攤著一本交班簿，最後幾頁的字跡越來越潦草，最後一行劃出了頁面。\n\n藥車後面，有人抱著手電筒，屏住呼吸。\n\n（欣儀在樓下等。十二個小時，已經在倒數了。這一層的事，得快。）',
  ],
  endingText:
    '病棟電梯卡刷過，讀卡機的紅燈終於轉綠，電梯門開了。面板上整排按鈕都沒有反應——只有三個樓層亮著：3、B1、B4。無論按哪一個，燈號都先跳到「3」，像有人預先寫好了路線。門闔上前，小盧從護理站探出頭喊：「三樓是小兒科——昨天半夜，我聽到那一層有孩子在唱歌！」電梯開始上行。欣儀的十二個小時，已經過去了一個。〔續　第十七章〕',
  objective: '穿過住院長廊，找到病棟電梯卡，啟動病棟電梯',
  rooms: [
    { id: 'lobby', name: '電梯間門廳', x: 0, z: 0, w: 8, d: 6, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 4, y: 3, z: 3, color: 0xe8f0f4, intensity: 26 } }, // 亮得像手術台的白燈
    { id: 'corridor', name: '住院長廊', x: 0, z: 6, w: 4, d: 18, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 2, y: 2.6, z: 15, color: 0xc0c8c0, intensity: 14, flicker: true } }, // 壞了一半的燈
    { id: 'station', name: '護理站', x: 4, z: 8, w: 6, d: 6, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 7, y: 2.6, z: 11, color: 0xcfe0ff, intensity: 22 } }, // 全樓層唯一穩定的燈
    { id: 'wardA', name: '病房 A', x: 4, z: 14, w: 7, d: 6, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 7.5, y: 2.6, z: 17, color: 0xd8e0d8, intensity: 18, flicker: true } },
    { id: 'wardB', name: '病房 B', x: 4, z: 20, w: 7, d: 6, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 7.5, y: 2.6, z: 23, color: 0xd8e0d8, intensity: 16, flicker: true } },
  ],
  doors: [
    { id: 'd16-lobby-corr', from: 'lobby', to: 'corridor', axis: 'x', at: [2, 6], width: 1.6, height: 2.4, lock: null },
    { id: 'd16-corr-station', from: 'corridor', to: 'station', axis: 'z', at: [4, 11], width: 1.2, height: 2.2, lock: null },
    { id: 'd16-corr-wardA', from: 'corridor', to: 'wardA', axis: 'z', at: [4, 17], width: 1.2, height: 2.2, lock: null },
    { id: 'd16-corr-wardB', from: 'corridor', to: 'wardB', axis: 'z', at: [4, 22], width: 1.2, height: 2.2, lock: null },
    { id: 'd16-exit', from: 'lobby', to: null, axis: 'x', at: [6, 0], width: 1.6, height: 2.4, lock: 'chapterExit' }, // 病棟電梯
  ],
  props: [
    // 電梯間門廳：撕掉樓層名的索引牌、翻倒的輪椅、管制物資
    { room: 'lobby', type: 'chair_fallen', x: 5.8, z: 3, rot: 1.2 },      // 翻倒的輪椅
    { room: 'lobby', type: 'crate', x: 4.2, z: 4.8, solid: 0.4 },         // 晨星的管制物資
    { room: 'lobby', type: 'papers', x: 4.5, z: 1.5 },                    // 撕下來的樓層索引
    { room: 'lobby', type: 'blood', x: 2.5, z: 3.2 },
    { room: 'lobby', type: 'corpse', x: 7, z: 5.2, variant: 2 },          // 沒能等到電梯的人
    { room: 'lobby', type: 'debris', x: 7.2, z: 4.3 },
    { room: 'lobby', type: 'trash', x: 0.7, z: 3.6 },
    // 住院長廊：垂落的輸氧管——潛伏者的巢
    { room: 'corridor', type: 'pipe', x: 1, z: 9.5 },                     // 掉落的輸氧管
    { room: 'corridor', type: 'pipe', x: 3, z: 18.5 },
    { room: 'corridor', type: 'blood', x: 2, z: 12 },
    { room: 'corridor', type: 'blood', x: 1.5, z: 20 },
    { room: 'corridor', type: 'corpse', x: 3.2, z: 10.5, variant: 0 },    // 從天花板上掉下來一半的
    { room: 'corridor', type: 'bodybag', x: 2.8, z: 14.8, rot: 0.4 },
    { room: 'corridor', type: 'debris', x: 0.8, z: 22.5 },
    // 護理站：值班台、藥車、小盧的窩
    { room: 'station', type: 'table', x: 7, z: 10, solid: 0.5 },          // 值班台
    { room: 'station', type: 'shelf', x: 5, z: 12.5, rot: Math.PI / 2, solid: 0.28 },   // 藥車（泡麵藏第三層）
    { room: 'station', type: 'shelf', x: 9.5, z: 8.7, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'station', type: 'papers', x: 7.3, z: 10.8 },
    { room: 'station', type: 'chair_fallen', x: 6, z: 8.9, rot: 2.2 },
    { room: 'station', type: 'cardboard', x: 9.4, z: 13.3 },              // 小盧藏身的紙箱堆
    // 病房 A：空床，約束帶從裡面掙斷
    { room: 'wardA', type: 'table', x: 6, z: 15.2, solid: 0.5 },          // 病床
    { room: 'wardA', type: 'table', x: 9, z: 15.2, solid: 0.5 },
    { room: 'wardA', type: 'table', x: 6, z: 18.8, solid: 0.5 },
    { room: 'wardA', type: 'blood', x: 7.5, z: 17 },
    { room: 'wardA', type: 'corpse', x: 8, z: 17.5, variant: 0 },
    { room: 'wardA', type: 'chair_fallen', x: 5, z: 18.5, rot: 1.1 },
    { room: 'wardA', type: 'papers', x: 10.3, z: 16 },
    { room: 'wardA', type: 'cardboard', x: 10.4, z: 19.3 },
    // 病房 B：床簾還拉著的那張床
    { room: 'wardB', type: 'table', x: 5.8, z: 20.9, solid: 0.5 },        // 病床
    { room: 'wardB', type: 'table', x: 5.8, z: 24.8, solid: 0.5 },
    { room: 'wardB', type: 'bodybag', x: 8, z: 25.3, rot: 0.2 },          // 床簾後面的東西
    { room: 'wardB', type: 'blood', x: 7, z: 22.5 },
    { room: 'wardB', type: 'barrel', x: 10.3, z: 25.2, solid: 0.35 },     // 氧氣鋼瓶
    { room: 'wardB', type: 'debris', x: 9.7, z: 23 },
    { room: 'wardB', type: 'papers', x: 8.5, z: 20.7 },
  ],
  hazards: [
    { room: 'lobby', type: 'shock', x: 7.3, z: 2.5, r: 0.8 },     // 被撬開的電梯配電箱
    { room: 'corridor', type: 'slime', x: 2, z: 12.8, r: 0.8 },   // 從輸氧管線滴下來的
    { room: 'corridor', type: 'slime', x: 1.8, z: 19.5, r: 0.8 },
    { room: 'wardA', type: 'slime', x: 6.5, z: 19.5, r: 0.75 },
    { room: 'wardB', type: 'fire', x: 9.7, z: 23, r: 0.85 },      // 電線走火的雜物堆
  ],
  documents: [
    {
      id: 'g16-doc-handover', title: '交班簿（最後三天）', x: 6.8, z: 10.8,
      text: '7/6 大夜：03:00 巡房，19 床家屬要求加毯。05:40 交班，無異常。\n\n7/7 大夜（字跡開始潦草）：支援隊接走 7 位。名單不給看。學姊說別問。點滴車上去是滿的，下來是空的。\n\n7/8 大夜（越寫越斜）：他們往上搬的是人，往下搬的是——\n\n（這一行沒有寫完。筆畫拖出一道長長的墨痕，劃出了頁面。）',
    },
    {
      id: 'g16-doc-transfer', title: '晨星「轉床單」', x: 9.2, z: 15.7,
      text: '【病患轉床通知單】　核發：晨星工業醫療支援隊\n\n轉出：住院大樓 2F　全數。\n轉入樓層：9F。\n轉床原因：觀察。（整疊單子，每一張的原因欄都蓋著同一個章：「觀察」。）\n\n（本院住院大樓，只有七層樓。）\n\n（不存在的樓層，就是「消失」的公文寫法。）',
    },
    {
      id: 'g16-doc-photo', title: '值班表底下的交班合照', x: 6.4, z: 9.2, monoAfter: true,
      text: '（值班台的抽屜裡，值班表底下壓著一張照片。大夜班的三個人擠在護理站的燈下比讚，最旁邊的年輕人白袍還太大件，笑得最用力。）\n\n（照片背面寫著：）\n\n「大夜班的祕密：泡麵要藏在藥車第三層，學姊才找不到。——小盧敬上」\n\n（值班表上，三個名字被紅筆圈起來。現在還守在燈下的，只剩一個。）',
    },
    {
      id: 'g16-doc-report', title: '院內感染通報單（駁回）', x: 6.8, z: 25.3,
      text: '【院內感染通報】本病房一週內出現 12 例同型皮膚黑斑，疑似接觸傳染，請感控科即刻介入。——2F 護理站\n\n批示一：「檢體判讀錯誤，退回。」\n批示二：「基層再教育，退回。」\n批示三（換了一種字跡，藍黑色的鋼筆）：「再上報，依洩密處理。」\n\n（通報了三次的人在保護病人。蓋章的人在保護什麼？）',
    },
  ],
  npcs: [
    {
      id: 'intern',
      name: '小盧',
      x: 8.5, z: 12.5, yaw: -Math.PI / 2, room: 'station',
      dialog: [
        '（藥車後面舉著手電筒的年輕人差點叫出來）別、別開槍！我是人！……實習醫師，盧奕辰。學姊都叫我小盧。',
        '支援隊進駐那晚我值大夜。他們拿著名單一間一間收人——名單上有床號、體重、血型。收「病人」需要知道體重跟血型嗎？那是收「檢體」才要填的欄位。',
        '學姊不讓我跟上去。她把我塞進藥車後面，說「大夜班的工作是守著燈」。然後她推著點滴車跟他們上樓了。點滴車回來過一次——空的。',
        '交班簿我一直寫到最後。誰被帶走、幾點、被帶去幾樓，都在裡面。總得有人記下來——不然這一層樓，就像從來沒有存在過。',
        '電梯卡……學姊的備卡在值班台的抽屜，值班表壓著的那一格。（他忽然抓住亮均的袖子）還有，走長廊的時候，不要抬頭看天花板。聽到管子在響，就跑。',
      ],
      dialogAfter: '（小盧把手電筒抱在胸前）我守著燈。你們把樓上樓下的事查清楚——交班簿的最後一頁，我留著等你回來寫。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g16-t-lobby', room: 'lobby', text: '電梯間門廳。樓層索引牌被撕得只剩空格，電梯燈號的面板上，只有 B4 亮著紅。', alert: true, shake: 0.04,
      monologue: '（護理長的樓層圖，紅筆圈的也是 B4。他們不怕你知道終點——他們怕你活著走到。）' },
    { id: 'g16-t-corr', room: 'corridor', text: '住院長廊。頭頂的輸氧管線在響——那不是風，是有東西貼著管子在爬。', sound: 'groan', alert: true,
      monologue: '（被「收治」上樓的人沒有一個下來過。也許有些下來了——只是換了一種樣子，住進了天花板。）' },
    { id: 'g16-t-station', room: 'station', text: '護理站。玻璃上貼滿了便條紙，一整面牆的日常，停在支援隊進駐的那個晚上。',
      monologue: '（「氧氣瓶剩 6 支，省著用」。到最後一刻，這裡的人省的都是物資，賠上的都是自己。）' },
    { id: 'g16-t-wardA', room: 'wardA', text: '病房 A。床全空著，床欄上的約束帶一條一條斷開，斷口朝外。', alert: true,
      monologue: '（約束帶是從裡面掙斷的。被「收治」的人自己站了起來——站起來的時候，還算不算人？）' },
    { id: 'g16-t-wardB', room: 'wardB', text: '病房 B。最裡面那張床的床簾還拉著，簾底露出的影子，不太像人的形狀。', sound: 'groan',
      monologue: '（轉床單上寫著 9F。這棟樓沒有九樓——所以他們哪裡也沒去，一直都在這裡。）' },
  ],
  entities: {
    pickups: [
      { id: 'g16-p-ammo1', item: 'handgun_ammo', count: 15, x: 6.5, z: 1.2 },
      { id: 'g16-p-herb1', item: 'green_herb', count: 1, x: 0.8, z: 4.8 },
      { id: 'g16-p-shells1', item: 'shotgun_shells', count: 7, x: 3, z: 7.2 },
      { id: 'g16-p-blue1', item: 'blue_herb', count: 1, x: 0.8, z: 13 },
      { id: 'g16-p-ammo2', item: 'handgun_ammo', count: 15, x: 0.8, z: 20.5 },
      { id: 'g16-p-wardcard', item: 'wardcard', count: 1, x: 7.6, z: 9.2 },  // ★ 值班台抽屜（值班表底下）
      { id: 'g16-p-herb2', item: 'green_herb', count: 1, x: 9.2, z: 13.2 },
      { id: 'g16-p-spray1', item: 'first_aid_spray', count: 1, x: 5, z: 15 },
      { id: 'g16-p-shells2', item: 'shotgun_shells', count: 7, x: 10.2, z: 19.2 },
      { id: 'g16-p-smg1', item: 'smg_ammo', count: 30, x: 5, z: 25.2 },
      { id: 'g16-p-red1', item: 'red_herb', count: 1, x: 10.2, z: 21 },
      { id: 'g16-p-blue2', item: 'blue_herb', count: 1, x: 9, z: 25 },
    ],
    enemies: [
      { id: 'g16-z1', type: 'zombie', x: 6.2, z: 4.6 },        // 門廳的「收治病患」（病人服）
      { id: 'g16-lurk1', type: 'lurker', x: 2, z: 10.5 },      // 輸氧管線上的巢
      { id: 'g16-lurk2', type: 'lurker', x: 2.5, z: 16.5 },
      { id: 'g16-lurk3', type: 'lurker', x: 1.5, z: 21.5 },
      { id: 'g16-z2', type: 'zombie', x: 6.8, z: 16.2 },       // 掙斷約束帶的病人
      { id: 'g16-z3', type: 'zombie', x: 8.5, z: 19 },
      { id: 'g16-z4', type: 'zombie', x: 7.8, z: 21.8 },
      { id: 'g16-mutant1', type: 'mutant', x: 8.5, z: 24 },    // 床簾後面的東西
    ],
    typewriters: [
      { id: 'g16-tw-lobby', x: 0.7, z: 0.7 },
      { id: 'g16-tw-wardA', x: 10.4, z: 14.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
