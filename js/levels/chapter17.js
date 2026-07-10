// 第十七章〈小兒科的蠟筆〉：電梯把亮均載到三樓。小兒科的牆上貼滿蠟筆畫——
// 「藍色的水」「黑衣人叔叔」「大大的針」。孩子們比大人更早看見真相：大人學會不看，孩子只會照實畫。
// 隔離小房的櫃子裡，有個數到一千又重數的女孩，還在等媽媽說「可以出來了」。
export const CHAPTER17 = {
  id: 'chapter17',
  name: '第十七章：小兒科的蠟筆',
  next: 'chapter18',
  exitNeeds: 'playkey',
  exitHint: '防火門在遊戲室那一側，遊戲室卻被反鎖了——小咪說鑰匙掛在護理站的木板上，掛著小熊的那一支',
  spawn: { x: 1.2, z: 2, yaw: Math.PI / 2 }, // 電梯口，面向東（走廊深處）
  lockNames: { playkey: '遊戲室鑰匙', chapterExit: '小兒科防火門' },
  story: [
    '電梯在「3」停下，門開的瞬間，一股蠟筆和乳膠漆混著消毒水的味道湧進來。\n\n小兒科。牆壁下半截漆成淡黃色，畫著身高刻度的長頸鹿。慘白的日光燈一格一格閃著，把走廊照成快轉的幻燈片。\n\n沿著整條走廊的牆，用膠帶貼了一排蠟筆畫。膠帶還很新。\n\n每一張畫的右下角，都有護理師代寫的名字和年齡：六歲、七歲、五歲……\n\n（欣儀的十二個小時，剩十一個。可是電梯只肯先停這一層——有人要我看看這裡。）',
    '畫的內容不對勁。\n\n排隊的火柴人，每人手上一個杯子，杯子裡塗著用力的藍色。穿黑衣服的大人，手裡的針比人還長。太陽塗成黑色的。\n\n一張、兩張、十幾張——不同的筆跡，畫的都是同一件事。\n\n（大人的公告會說謊：「疫苗接種」「健康觀察」。孩子的畫不會。他們把看見的照實畫下來，然後被稱讚「畫得真好」。）\n\n走廊盡頭，遊戲室的門上了鎖。玻璃窗裡，積木疊到一半，散落一地的畫紙。',
    '病房區深處，傳來一個很小很小的聲音。\n\n「……九百九十八、九百九十九、一千。」\n\n停頓。然後，帶著鼻音，重新開始：\n\n「一、二、三……」\n\n是個孩子。躲在某個看不見的地方，用數數把自己留在「媽媽會回來」的那個世界裡。\n\n（別跑。腳步聲會嚇到她——也會引來別的東西。這一層的走廊裡，有什麼正貼著地板爬。）',
  ],
  endingText:
    '防火門的鎖芯轉開時，小咪拉住亮均的衣角：「大哥哥，黑衣人叔叔把紅色的冰箱搬走了——大大台、會冒白煙的，從後面的樓梯搬下去的。」紅色的冰箱。血庫的冷藏櫃。亮均把小咪送進電梯、按下急診層——護理長會接住她，像接住欣儀一樣。門闔上前，小咪隔著縫隙比了一個「噓」。往下，檢驗科。他們搬走的是血，養在血裡的東西，也一起下去了。〔續　第十八章〕',
  objective: '找到遊戲室鑰匙，打開被反鎖的遊戲室，從防火門離開小兒科',
  rooms: [
    { id: 'corr', name: '小兒科走廊', x: 0, z: 0, w: 16, d: 4, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 8, y: 2.6, z: 2, color: 0xe8f0f4, intensity: 15, flicker: true } }, // 一格一格閃的日光燈
    { id: 'wards', name: '病房區', x: 0, z: 4, w: 7, d: 8, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 3.5, y: 2.6, z: 8, color: 0xd8e0d8, intensity: 18, flicker: true } },
    { id: 'station', name: '護理站', x: 7, z: 4, w: 5, d: 6, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 9.5, y: 2.6, z: 7, color: 0xcfe0ff, intensity: 22 } },
    { id: 'play', name: '遊戲室', x: 12, z: 4, w: 6, d: 7, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 15, y: 2.8, z: 7.5, color: 0xf0e6d2, intensity: 18 } }, // 遊戲室僅存的一點暖色
    { id: 'iso', name: '隔離小房', x: 7, z: 10, w: 5, d: 4, h: 2.8, floor: 'tile', walls: 'metal',
      light: { x: 9.5, y: 2.4, z: 12, color: 0xcfe0ff, intensity: 9, flicker: true } }, // 快沒電的夜燈
  ],
  doors: [
    { id: 'd17-corr-wards', from: 'corr', to: 'wards', axis: 'x', at: [3.5, 4], width: 1.4, height: 2.2, lock: null },
    { id: 'd17-corr-station', from: 'corr', to: 'station', axis: 'x', at: [9.5, 4], width: 1.4, height: 2.2, lock: null },
    { id: 'd17-corr-play', from: 'corr', to: 'play', axis: 'x', at: [14, 4], width: 1.4, height: 2.2, lock: 'playkey' }, // ★ 被反鎖的遊戲室
    { id: 'd17-station-iso', from: 'station', to: 'iso', axis: 'x', at: [9.5, 10], width: 1.0, height: 2.0, lock: null },
    { id: 'd17-exit', from: 'play', to: null, axis: 'z', at: [18, 7.5], width: 1.5, height: 2.4, lock: 'chapterExit' }, // 小兒科防火門
  ],
  props: [
    // 小兒科走廊：貼滿蠟筆畫的牆、翻倒的推車、拖行痕
    { room: 'corr', type: 'trash', x: 0.7, z: 3.3 },
    { room: 'corr', type: 'papers', x: 4.5, z: 1 },                        // 散落的畫紙
    { room: 'corr', type: 'bodybag', x: 5, z: 1, rot: 0.3 },
    { room: 'corr', type: 'blood', x: 8.5, z: 2.2 },
    { room: 'corr', type: 'cardboard', x: 12, z: 0.8 },
    { room: 'corr', type: 'debris', x: 15.3, z: 3.2 },
    // 病房區：放下圍欄的小床、來不及帶走的玩偶
    { room: 'wards', type: 'table', x: 1.5, z: 5.5, solid: 0.5 },          // 小床
    { room: 'wards', type: 'table', x: 1.5, z: 8, solid: 0.5 },
    { room: 'wards', type: 'table', x: 1.5, z: 10.5, solid: 0.5 },
    { room: 'wards', type: 'corpse', x: 5, z: 7.2, variant: 2 },           // 擋在床前的陪病家屬
    { room: 'wards', type: 'blood', x: 4, z: 8.5 },
    { room: 'wards', type: 'chair_fallen', x: 5.5, z: 10.8, rot: 1.1 },
    { room: 'wards', type: 'cardboard', x: 2.8, z: 11.5 },
    // 護理站：掛鑰匙的木板、藥車、交接白板
    { room: 'station', type: 'table', x: 9, z: 6.5, solid: 0.5 },          // 護理站台
    { room: 'station', type: 'shelf', x: 11.2, z: 5, rot: -Math.PI / 2, solid: 0.28 },  // 藥車
    { room: 'station', type: 'papers', x: 9.2, z: 6.8 },
    { room: 'station', type: 'chair_fallen', x: 8, z: 8, rot: 2.3 },
    { room: 'station', type: 'blood', x: 10.5, z: 9 },
    // 遊戲室：積木箱、小桌小椅、繪本架
    { room: 'play', type: 'cardboard', x: 13, z: 5.5 },                    // 積木箱
    { room: 'play', type: 'table', x: 14, z: 9, solid: 0.5 },              // 小桌
    { room: 'play', type: 'chair_fallen', x: 14.8, z: 9.8, rot: 0.7 },
    { room: 'play', type: 'chair_fallen', x: 13.2, z: 8.4, rot: 2.6 },
    { room: 'play', type: 'shelf', x: 12.5, z: 10.5, rot: -Math.PI / 2, solid: 0.28 }, // 繪本架
    { room: 'play', type: 'crate', x: 17, z: 10, solid: 0.4 },             // 玩具箱
    { room: 'play', type: 'papers', x: 16, z: 6 },                         // 阿哲的恐龍畫
    { room: 'play', type: 'blood', x: 14.5, z: 6.5 },
    // 隔離小房：小咪躲的櫃子、糖果紙
    { room: 'iso', type: 'shelf', x: 8, z: 13.4, rot: Math.PI, solid: 0.28 }, // 小咪躲的櫃子
    { room: 'iso', type: 'cardboard', x: 11, z: 12.8 },
    { room: 'iso', type: 'trash', x: 7.8, z: 10.8 },                       // 糖果紙
  ],
  hazards: [
    { room: 'wards', type: 'fire', x: 6, z: 5, r: 0.8 },        // 打翻的電暖器
    { room: 'wards', type: 'slime', x: 3, z: 7, r: 0.75 },
    { room: 'corr', type: 'shock', x: 11.3, z: 1, r: 0.7 },     // 跳電的兒童身高測量儀
    { room: 'corr', type: 'slime', x: 13.2, z: 2.8, r: 0.9 },   // 腫脹者滲出的體液——遊戲室門外
    { room: 'play', type: 'slime', x: 16.5, z: 9.5, r: 0.7 },   // 打翻的不明黏液，混著顏料
  ],
  documents: [
    {
      id: 'g17-doc-draw1', title: '蠟筆畫：藍色的水', x: 6.5, z: 0.8,
      text: '（走廊牆上的蠟筆畫。排隊的火柴人，每個人手上一個杯子，杯子裡塗滿用力的藍色。隊伍最前面站著穿白衣服的大人。天上的太陽，塗成黑色的。）\n\n（右下角，護理師代寫：）\n「小宇，6 歲：發藥的叔叔說，喝了藍藍的水就不會生病了。」\n\n（大人的公告叫它「預防性投藥」。孩子畫出來的，是排隊喝藍色的水。）',
    },
    {
      id: 'g17-doc-draw2', title: '蠟筆畫：黑衣人叔叔', x: 2.5, z: 6.5,
      text: '（病房牆上的畫。穿黑衣服的大人牽著一排小孩，手裡的針筒畫得比人還大。被牽走的小孩，一個比一個畫得小，最後一個小得快看不見。）\n\n（右下角：）\n「阿哲，7 歲：叔叔說打完大大的針，就可以去找媽媽了。」\n\n（阿哲的床，就在這張畫的旁邊。床是空的，圍欄放下來了，枕頭上還擺著一隻蠟筆畫的恐龍。）',
    },
    {
      id: 'g17-doc-notice', title: '護理站內部通知', x: 9.4, z: 5.4,
      text: '【內部通知　即日生效】\n家屬詢問病童轉床事宜，一律回覆「觀察中」。\n不得說明去向、不得提供名單。\n違者視同洩密，自負責任。——晨星工業醫療支援隊\n\n（下面有護理師的筆跡，筆畫很重：）\n\n「自負責任。我們連孩子被帶去哪一層都不知道，是要怎麼負責？負責的人從來不簽名，簽名的永遠是我們。」',
    },
    {
      id: 'g17-doc-momnote', title: '摺成小方塊的字條', x: 10.8, z: 13.2,
      text: '（櫃子旁撿到一張摺成小方塊的字條，摺痕都起毛了——被打開又摺回去過無數次。）\n\n「咪咪：\n躲好，數到一千，媽媽就回來。\n不要開門，不要出聲音，糖果一天只能吃一顆。\n媽媽愛妳。」\n\n（一天一顆。垃圾桶裡的糖果紙，有三張。）',
    },
    {
      id: 'g17-doc-photo', title: '遊戲室抽屜裡的合照', x: 15, z: 8.2, monoAfter: true,
      text: '（遊戲室小桌的抽屜裡壓著一張拍立得。病童們和兩個護理師擠在塗鴉牆前，每個孩子舉著自己的畫，護理師蹲在正中間，比著兩個讚。）\n\n（背面寫著：）\n\n「兒科的孩子最勇敢。——護師節快樂」\n\n（照片裡舉著的那些畫，現在還貼在走廊的牆上。畫畫的孩子，一個都不在了。）',
    },
  ],
  npcs: [
    {
      id: 'girl',
      name: '小咪',
      x: 9.5, z: 12.5, yaw: 0, room: 'iso',
      dialog: [
        '（櫃子門推開一條縫，一雙眼睛在黑暗裡眨了眨）……你不是黑衣人。噓——小聲一點，他們聽得到腳步聲。',
        '媽媽說躲好，數到一千她就回來。我數完三次了。第三次我數得很慢很慢很慢……可是媽媽還是沒有回來。',
        '黑衣人叔叔帶大家去打「大大的針」。打完針的人都從後面的樓梯下去了，沒有人再上來。老師以前都說，妹妹畫畫畫得最像。',
        '遊戲室被鎖起來了。鑰匙掛在護理站的板板上，有小熊的那一支。裡面有我們的畫，還有阿哲的恐龍——你去拿的話，幫我跟恐龍說，阿哲等它。',
        '（她從口袋裡掏出一顆糖果，硬塞過來）祕密基地的糖果分你。媽媽說，糖果要分給幫忙的人。……大哥哥，你出去的時候，可以順便找一下我媽媽嗎？',
      ],
      dialogAfter: '（小咪抱著膝蓋，小小聲地數著）一、二、三……大哥哥快去快回喔，我數到一千。',
      gift: [
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g17-t-corr', room: 'corr', text: '小兒科走廊。蠟筆畫沿著牆貼成一整排，膠帶都還很新。慘白的燈一格一格閃著。',
      monologue: '（大人的公告會說謊，孩子的畫不會。他們把看見的照實畫下來，然後被稱讚「畫得真好」。）' },
    { id: 'g17-t-wards', room: 'wards', text: '病房區。小床的圍欄都放下來了，床上留著來不及帶走的玩偶，棉被摺得整整齊齊。', alert: true,
      monologue: '（棉被是護理師最後替他們摺的。帶走孩子的人，不會替孩子摺被子。）' },
    { id: 'g17-t-station', room: 'station', text: '護理站。交接白板上寫著「今日轉出：14」，「轉入」那一格是空的。掛鑰匙的木板上，小熊鑰匙圈還在。',
      monologue: '（十四個孩子「轉出」。轉去哪裡，白板沒有寫——因為寫白板的人，也不被允許知道。）' },
    { id: 'g17-t-play', room: 'play', text: '遊戲室。積木疊到一半，音樂盒的發條鬆了，牆邊的畫紙散了一地。', alert: true, shake: 0.04,
      monologue: '（積木疊到一半就被打斷。孩子們不是自己走出這個房間的。）' },
    { id: 'g17-t-iso', room: 'iso', text: '隔離小房。數數的聲音就是從這裡傳出來的——牆角的櫃子裡，有一雙眼睛。', sound: 'groan' },
  ],
  entities: {
    pickups: [
      { id: 'g17-p-ammo1', item: 'handgun_ammo', count: 15, x: 2.2, z: 3.2 },
      { id: 'g17-p-ammo3', item: 'handgun_ammo', count: 15, x: 5.2, z: 1.2 },
      { id: 'g17-p-herb2', item: 'green_herb', count: 1, x: 15.5, z: 2 },
      { id: 'g17-p-herb1', item: 'green_herb', count: 1, x: 0.9, z: 11.5 },
      { id: 'g17-p-shells1', item: 'shotgun_shells', count: 7, x: 6.2, z: 11 },
      { id: 'g17-p-ammo2', item: 'handgun_ammo', count: 15, x: 8, z: 9.2 },
      { id: 'g17-p-playkey', item: 'playkey', count: 1, x: 11.5, z: 6.5 },   // ★ 護理站掛鉤，小熊鑰匙圈
      { id: 'g17-p-blue1', item: 'blue_herb', count: 1, x: 7.6, z: 4.8 },
      { id: 'g17-p-red1', item: 'red_herb', count: 1, x: 11.2, z: 10.8 },
      { id: 'g17-p-smg1', item: 'smg_ammo', count: 30, x: 13, z: 6 },
      { id: 'g17-p-shells2', item: 'shotgun_shells', count: 7, x: 13.6, z: 10.6 },
      { id: 'g17-p-spray1', item: 'first_aid_spray', count: 1, x: 16.8, z: 10.5 },
    ],
    enemies: [
      { id: 'g17-z1', type: 'zombie', x: 7, z: 2.5 },          // 走廊上的病人服身影
      { id: 'g17-bloat1', type: 'bloater', x: 13, z: 1.5 },    // 遊戲室門外——腫脹的「家長」
      { id: 'g17-bloat2', type: 'bloater', x: 15, z: 3 },
      { id: 'g17-creep1', type: 'creeper', x: 4.5, z: 9.5 },   // 病房區地板上爬的
      { id: 'g17-creep2', type: 'creeper', x: 12, z: 2 },      // 走廊東段
      { id: 'g17-z2', type: 'zombie', x: 5, z: 6.5 },
      { id: 'g17-z3', type: 'zombie', x: 2.8, z: 11.2 },
      { id: 'g17-z4', type: 'zombie', x: 10.5, z: 8 },         // 護理站——沒等到交班的人
    ],
    typewriters: [
      { id: 'g17-tw-corr', x: 0.7, z: 0.7 },
      { id: 'g17-tw-play', x: 17.2, z: 5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
