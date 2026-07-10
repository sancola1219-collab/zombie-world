// 第十一章〈夜市殘響〉：離開醫院，往電信機房的近路穿過黑鴉夜市。遠處的引擎低鳴
// 在靠近時熄了火——夜市的老柴油發電機沒了啟動搖桿。攤位巷裡立著嘶吼者（一叫全街醒），
// 小吃街的油鍋翻倒起火、脹屍在火光間遊走。守著麵攤四十年的陳伯不肯走。
// 推進：後場倉庫找回阿雄藏起的發電機搖桿→發電機供電→後門鐵門升起。
export const CHAPTER11 = {
  id: 'chapter11',
  name: '第十一章：夜市殘響',
  next: 'chapter12',
  exitNeeds: 'genlever',
  exitHint: '後門鐵門是電動的，捲門馬達接在夜市的老發電機上——發電機的啟動搖桿被人拆走藏了起來。管發電機的阿雄，工具都收在後場倉庫',
  spawn: { x: 1.5, z: 3.5, yaw: Math.PI / 2 }, // 夜市牌樓下，面向東
  lockNames: { genlever: '發電機搖桿', chapterExit: '夜市後門鐵門' },
  story: [
    '離開醫院之後，那個低鳴聲越來越近。\n\n引擎。規律的、四拍的、老柴油機的聲音——從黑鴉夜市的方向傳來。\n\n欣儀皺眉：「停電第三天。整個市區只有晨星的據點有電……誰在夜市開發電機？」\n\n走到隔一條街，聲音忽然咳了兩下，熄了。\n\n（像一句話說到一半，被掐斷。）\n\n再往前，夜市牌樓的輪廓浮出夜色。「黑鴉觀光夜市」六個霓虹字，全黑。',
    '牌樓底下堆著沙包和翻倒的攤車——有人想在這裡守過，沒守住。\n\n「電信機房就在夜市後面那條街。」亮均比了比，「穿過去最快。後門有鐵捲門，是電動的。」\n\n欣儀看著攤位巷深處，忽然壓低聲音：「你聞到嗎？」\n\n油煙味。冷掉的油煙味底下，還有一絲很淡的、正在冒的熱氣——這條死掉的街裡，有一鍋湯還是熱的。\n\n（有一鍋湯是熱的，就代表有人。三天了，還有人守在這裡。）\n\n（或者——有東西，在模仿人。）',
    '攤位巷的帆布棚被夜風掀起一角，又落下。\n\n招牌一路排過去：蚵仔煎、藥燉排骨、麻辣鴨血、彈珠台。第三攤的油鍋翻在地上，火還在燒，把整條巷子的影子燒得忽長忽短。\n\n欣儀忽然停步，一把抓住亮均的手臂。\n\n巷子深處，一個東西背對著他們站著。很瘦，很高，脖子仰成不自然的角度——喉嚨隨著呼吸鼓動，像青蛙，像風箱。\n\n（分局裡聽過的那種呼吸聲。嘶吼者。）\n\n（牠一叫，整條街都會醒過來。要嘛快，要嘛繞。）',
  ],
  endingText:
    '搖桿插進卡座，壓下去。發電機咳了兩聲，轟隆運轉起來——小吃街的燈泡串「啪」地亮起半排，像這條街最後一次深呼吸。後門鐵門喀啦喀啦捲上去，夜風湧了進來。陳伯沒有跟來。他的麵攤在燈串下冒著熱氣，像四十年來的每一個晚上。兩條街外，電信機房的紅色訊號燈在黑暗裡一明、一滅——那是整座黑鴉市，最後一個還在心跳的節點。〔續　第十二章〕',
  objective: '找回發電機搖桿，讓後門鐵門通電升起',
  rooms: [
    { id: 'gate', name: '夜市牌樓', x: 0, z: 0, w: 6, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 3, y: 4.8, z: 3.5, color: 0x667788, intensity: 12, flicker: true } }, // 牌樓殘燈
    { id: 'stalls', name: '攤位巷', x: 6, z: 0, w: 14, d: 6, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 12, y: 4.5, z: 3, color: 0xff9955, intensity: 22, flicker: true } }, // 悶燒攤位的火光
    { id: 'food', name: '小吃街', x: 6, z: 6, w: 18, d: 6.5, h: 5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 14, y: 4.4, z: 9, color: 0xffa050, intensity: 28, flicker: true } }, // 翻倒油鍋的火
    { id: 'genroom', name: '發電機房', x: 24, z: 6, w: 5, d: 5, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 26.5, y: 2.6, z: 8.5, color: 0xaabbcc, intensity: 12, flicker: true } },
    { id: 'storage', name: '後場倉庫', x: 20, z: 12.5, w: 7, d: 5, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 23.5, y: 2.6, z: 15, color: 0xc0b090, intensity: 11, flicker: true } },
  ],
  doors: [
    { id: 'd11-gate-stalls', from: 'gate', to: 'stalls', axis: 'z', at: [6, 3], width: 1.6, height: 2.6, lock: null },
    { id: 'd11-stalls-food', from: 'stalls', to: 'food', axis: 'x', at: [12, 6], width: 1.6, height: 2.5, lock: null },
    { id: 'd11-food-gen', from: 'food', to: 'genroom', axis: 'z', at: [24, 8.5], width: 1.3, height: 2.2, lock: null },
    { id: 'd11-food-storage', from: 'food', to: 'storage', axis: 'x', at: [23, 12.5], width: 1.5, height: 2.3, lock: null },
    { id: 'd11-exit', from: 'genroom', to: null, axis: 'z', at: [29, 8.5], width: 1.6, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 牌樓：沙包工事、被雨泡爛的燈籠架
    { room: 'gate', type: 'crate', x: 4.8, z: 6.4, solid: 0.4 },       // 沙包
    { room: 'gate', type: 'streetlight', x: 3, z: 0.6, dead: true },
    { room: 'gate', type: 'hydrant', x: 0.6, z: 1.8 },
    { room: 'gate', type: 'trash', x: 0.7, z: 5.8 },
    { room: 'gate', type: 'debris', x: 4.5, z: 5.5 },
    { room: 'gate', type: 'blood', x: 2.8, z: 2.2 },
    { room: 'gate', type: 'cardboard', x: 5.3, z: 1 },
    // 攤位巷：攤車、疊起的貨箱、悶燒的第三攤
    { room: 'stalls', type: 'table', x: 9.5, z: 1.5, rot: 0.2, solid: 0.5 },   // 攤車
    { room: 'stalls', type: 'table', x: 13.5, z: 4.5, rot: -0.3, solid: 0.5 },
    { room: 'stalls', type: 'crate', x: 17, z: 1, solid: 0.4 },
    { room: 'stalls', type: 'crate', x: 17.8, z: 1.6, solid: 0.4 },
    { room: 'stalls', type: 'barrel', x: 7, z: 4.8, solid: 0.35 },
    { room: 'stalls', type: 'streetlight', x: 16, z: 5.4, dead: true },
    { room: 'stalls', type: 'trash', x: 10.5, z: 5.5 },
    { room: 'stalls', type: 'trash', x: 19.2, z: 2 },
    { room: 'stalls', type: 'corpse', x: 12.3, z: 5.2, variant: 0 },
    { room: 'stalls', type: 'blood', x: 14, z: 2.5 },
    { room: 'stalls', type: 'cardboard', x: 15.5, z: 0.8 },
    // 小吃街：陳伯的麵攤（還冒著熱氣）、翻倒的油鍋攤
    { room: 'food', type: 'table', x: 8.2, z: 11.7, solid: 0.5 },      // 陳伯的麵攤
    { room: 'food', type: 'table', x: 14, z: 7.4, rot: 0.4, solid: 0.5 }, // 翻倒的油鍋攤
    { room: 'food', type: 'barrel', x: 12.5, z: 7.6, solid: 0.35 },    // 倒下的油桶
    { room: 'food', type: 'chair_fallen', x: 9, z: 10.4, rot: 1.2 },
    { room: 'food', type: 'chair_fallen', x: 16, z: 9.8, rot: 2.4 },
    { room: 'food', type: 'crate', x: 22.8, z: 6.6, solid: 0.4 },
    { room: 'food', type: 'corpse', x: 17, z: 11.5, variant: 2 },      // 火裡沒逃出來的
    { room: 'food', type: 'blood', x: 10.8, z: 9 },
    { room: 'food', type: 'blood', x: 18.5, z: 10.2 },
    { room: 'food', type: 'trash', x: 21.5, z: 11.8 },
    { room: 'food', type: 'debris', x: 19.5, z: 7 },
    // 發電機房：老柴油機（桶代替）、工具架、沿牆的電纜
    { room: 'genroom', type: 'barrel', x: 27.5, z: 9.8, solid: 0.35 },
    { room: 'genroom', type: 'barrel', x: 28.2, z: 10.4, solid: 0.35 },
    { room: 'genroom', type: 'pipe', x: 26.5, z: 10.6, len: 4.5, y: 2.4, rot: Math.PI / 2 },
    { room: 'genroom', type: 'shelf', x: 24.4, z: 6.5, rot: Math.PI / 2, solid: 0.28 }, // 阿雄的工具架
    { room: 'genroom', type: 'debris', x: 26, z: 9.2 },
    // 後場倉庫：整箱的免洗餐具堆到天花板
    { room: 'storage', type: 'crate', x: 20.6, z: 14, solid: 0.45 },
    { room: 'storage', type: 'crate', x: 21.3, z: 14.7, solid: 0.45 },
    { room: 'storage', type: 'crate', x: 26.3, z: 14, solid: 0.45 },
    { room: 'storage', type: 'crate', x: 26.3, z: 15, solid: 0.45 },
    { room: 'storage', type: 'shelf', x: 24.5, z: 17.1, rot: Math.PI, solid: 0.28 },   // 工具櫃
    { room: 'storage', type: 'cardboard', x: 23, z: 16.5 },
    { room: 'storage', type: 'cardboard', x: 22, z: 13.3 },
    { room: 'storage', type: 'trash', x: 20.5, z: 15.8 },
    { room: 'storage', type: 'blood', x: 23, z: 13 },
  ],
  // 夜市危險：翻倒油鍋的火場、悶燒攤位、脹屍殘液、發電機房裸露電纜
  hazards: [
    { room: 'stalls', type: 'fire', x: 11.5, z: 1.8, r: 0.9 },   // 悶燒的第三攤
    { room: 'food', type: 'fire', x: 12.1, z: 8.1, r: 1.0 },     // 翻倒的油鍋
    { room: 'food', type: 'fire', x: 16.6, z: 11.2, r: 0.9 },
    { room: 'food', type: 'fire', x: 20.8, z: 10.6, r: 0.85 },
    { room: 'food', type: 'slime', x: 8.5, z: 7, r: 0.8 },       // 脹屍炸過的殘液
    { room: 'genroom', type: 'shock', x: 25.8, z: 9.9, r: 0.75 }, // 裸露的饋電電纜
  ],
  documents: [
    {
      id: 'g11-doc-assoc', title: '攤商自治會公告', x: 8, z: 0.8,
      text: '各位攤商：\n\n晨星工業「地方共榮專案」說明如下——\n一、封鎖管制期間，每攤發給慰問補助金新台幣十萬元整。\n二、領取補助需簽署保密切結書：管制期間所見所聞（含人員、車輛、聲響）不得對外陳述。\n三、切結書一式兩份，由本會代收轉交。\n\n——黑鴉夜市攤商自治會\n\n（十萬塊，買一條街的眼睛和嘴巴。切結書「本會代收」——連名單都不必晨星自己出面。）\n\n（收買基層的錢，永遠比補償基層的錢好批。）',
    },
    {
      id: 'g11-doc-swab', title: '食安抽驗紀錄單（副本）', x: 17.8, z: 7,
      text: '黑鴉市衛生稽查——食品安全抽驗紀錄\n受檢攤位：G-17（麻辣鴨血）\n抽驗項目：\n□ 食材檢體　□ 湯底檢體　□ 油品檢體\n■ 人員唾液檢體（攤主＋幫工，計 2 份）\n複驗通知：無\n\n（食安抽驗，抽的不是食物，是人。三個禮拜前，他們就在測這條街的人有沒有被感染——或者說，測 KY 在人群裡走到了哪裡。）\n\n（陳伯說得對。不抽菜、不抽湯。他們早就不關心食物了。）',
    },
    {
      id: 'g11-doc-photo', title: '工具箱裡的開幕合照', x: 25.2, z: 6.8, monoAfter: true,
      text: '（發電機房的工具箱最底層，墊著一張泛黃的大合照。夜市牌樓底下密密麻麻站了上百人，紅布條寫著「黑鴉觀光夜市　三十週年誌慶」。）\n\n（背面的原子筆字：）\n\n「三十年，風颱來了收攤，雨停了再開。第一排右三是我。——阿雄」\n\n（第一排右三，一個蹲著比讚的年輕人，笑得見牙不見眼。）\n\n（風颱來了收攤，雨停了再開。這一次，雨停了三天——攤子還沒有開回來。）',
    },
    {
      id: 'g11-doc-log', title: '發電機保養單（阿雄的字）', x: 21, z: 16.8,
      text: '6/18　換機油、清濾網。晨星的人來，說封鎖期間發電機要「保持可用」，油錢他們出。問要供電給啥，不講。\n6/25　他們在牌樓和後巷裝了幾個灰色箱子，接我的電。問是啥，說是「空氣品質監測」。監測個鬼，箱子上有鏡頭。\n7/02　油快沒了，他們也沒再來。這幾天怪聲愈來愈多，我把啟動搖桿拆下來收好——電是這條街的，不是他們的。\n\n（灰色箱子、鏡頭、接夜市的電。晨星的「觀察場」，連攝影機的電費都要基層出。）\n\n（阿雄把搖桿拆下來藏好——這是他能做的、最後的一點不合作。）',
    },
  ],
  npcs: [
    {
      id: 'vendor',
      name: '陳伯',
      x: 7.2, z: 11.3, yaw: -Math.PI / 2, room: 'food',
      dialog: [
        '（小吃街深處亮著一盞瓦斯燈。麵攤後的老人頭也不抬，長筷在滾水裡攪了兩圈）坐。要蛤？陽春還是切仔？……開玩笑的，剩什麼煮什麼。',
        '我姓陳，這條街的人都叫我陳伯。民國七十幾年就在這裡了——我在這條街煮了四十年麵，你們後生的爸母搞不好都吃過。',
        '走？（他把一撮麵甩進碗裡，動作沒停）第三天了，要走的人都從我攤子前面跑過去。跑去哪？封鎖線？聽講連狗都過不去。我的鍋在這裡、我的攤在這裡，我走去哪裡，都是別人的地方。',
        '倒是你們要小心——前幾個禮拜有一批穿白衫的，講是「食安抽驗」，一攤一攤跑。抽什麼？不抽菜、不抽湯，拿棉花棒往人嘴裡刮。自治會的頭仔還幫他們發同意書，一攤十萬，簽了不能講。呸。',
        '發電機喔？阿雄管的，機房在小吃街尾。拄才熄火不是沒油——是搖桿。阿雄那支啟動搖桿驚人偷，拆下來收在後場倉庫，工具櫃那頭。你們要開後門鐵門，就去把它找回來。',
      ],
      dialogAfter: '（陳伯往兩個碗裡各撒了一把蔥花，推過來）呷飽再走。草藥？青草茶攤的阿樹留下那些，你們提去——這條街的東西，這條街的人做主。',
      gift: [
        { item: 'green_herb', count: 2 },
      ],
    },
  ],
  triggers: [
    { id: 'g11-t-gate', room: 'gate', text: '夜市牌樓。「黑鴉觀光夜市」的霓虹字全滅了，鐵架上掛著一排被雨泡爛的燈籠。柱子上貼著晨星的封鎖告示。', sound: 'door',
      monologue: '（三十年的夜市，被一張 A4 公告宣佈暫停。落款甚至不是市政府。）' },
    { id: 'g11-t-stalls', room: 'stalls', text: '攤位巷。帆布棚在夜風裡起伏。巷子深處那個仰著脖子的身影，喉嚨鼓動得越來越快——牠察覺了。', alert: true, shake: 0.08,
      monologue: '（嘶吼者。開槍之前先想清楚——牠的叫聲會把整條街的東西都叫醒。要嘛快，要嘛遠。）' },
    { id: 'g11-t-food', room: 'food', text: '小吃街。翻倒的油鍋還在燒，火舌舔著攤車帆布。幾個腫脹的身影在火光之間緩慢移動，皮膚底下有東西在流。', sound: 'groan',
      monologue: '（脹屍。在火場旁邊碰上牠們是最壞的組合——牠們炸開的時候，別剛好站在火裡。）' },
    { id: 'g11-t-gen', room: 'genroom', text: '發電機房。老柴油機還有餘溫，機油味蓋過了外面的腐臭。啟動搖桿的卡座，是空的。',
      monologue: '（機器保養得乾乾淨淨。阿雄到最後都在照顧它——人不在了，機器還在等著被搖醒。）' },
    { id: 'g11-t-storage', room: 'storage', text: '後場倉庫。整箱的免洗碗筷堆到天花板，牆角的工具櫃敞著。門後的地上，有拖行的痕跡。', sound: 'dogbark' },
  ],
  entities: {
    pickups: [
      { id: 'g11-p-ammo1', item: 'handgun_ammo', count: 15, x: 4.5, z: 1 },
      { id: 'g11-p-herb1', item: 'green_herb', count: 1, x: 0.7, z: 4.5 },
      { id: 'g11-p-shells1', item: 'shotgun_shells', count: 7, x: 7.5, z: 5.3 },
      { id: 'g11-p-ammo2', item: 'handgun_ammo', count: 15, x: 16.5, z: 0.8 },
      { id: 'g11-p-blue1', item: 'blue_herb', count: 1, x: 9.3, z: 7.6 },     // 脹屍殘液旁
      { id: 'g11-p-spray1', item: 'first_aid_spray', count: 1, x: 22.6, z: 9.9 },
      { id: 'g11-p-shells2', item: 'shotgun_shells', count: 7, x: 13.2, z: 11.9 },
      { id: 'g11-p-herb2', item: 'green_herb', count: 1, x: 20.5, z: 13.2 },
      { id: 'g11-p-smgammo1', item: 'smg_ammo', count: 30, x: 25.5, z: 13.2 },
      { id: 'g11-p-genlever', item: 'genlever', count: 1, x: 26, z: 16.6 },   // ★ 後場倉庫工具櫃旁
      { id: 'g11-p-ammo3', item: 'handgun_ammo', count: 15, x: 24.5, z: 10.3 },
      { id: 'g11-p-magammo1', item: 'magnum_ammo', count: 6, x: 26.9, z: 6.4 },
    ],
    enemies: [
      { id: 'g11-howler1', type: 'howler', x: 14, z: 3 },      // ★ 攤位巷深處——嘶吼喚醒整條街
      { id: 'g11-z1', type: 'zombie', x: 9, z: 2 },
      { id: 'g11-dog1', type: 'dog', x: 17, z: 4.5 },
      { id: 'g11-bloater1', type: 'bloater', x: 10, z: 9.5 },  // ★ 小吃街火場間的脹屍
      { id: 'g11-bloater2', type: 'bloater', x: 15, z: 10.5 },
      { id: 'g11-bloater3', type: 'bloater', x: 20, z: 8 },
      { id: 'g11-z2', type: 'zombie', x: 8, z: 8.8 },
      { id: 'g11-z3', type: 'zombie', x: 21.5, z: 16.5 },      // 倉庫
      { id: 'g11-dog2', type: 'dog', x: 24, z: 15.5 },
    ],
    typewriters: [
      { id: 'g11-tw-gate', x: 1.2, z: 6.5 },
      { id: 'g11-tw-gen', x: 28.4, z: 6.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
