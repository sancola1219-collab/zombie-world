// 第十九章〈太平間點名〉：檢驗科後門的拖痕通往地下太平間。晨星把「收治死亡」的人全部改成
// 「疫歿火化」，趕在天亮前把證據燒乾淨。而太平間的老管理員，盡責了一輩子，變異後仍守在冰櫃室
// ——每一具他都要「點到名」。亮均得從他手裡拿到太平間鑰匙，穿過焚化前室，追進晨星的指揮所。
export const CHAPTER19 = {
  id: 'chapter19',
  name: '第十九章：太平間點名',
  next: 'chapter20',
  exitNeeds: 'morguekey',
  exitHint: '殯儀後門要用太平間的老鑰匙——守著點名冊的老陳說，那把鑰匙落在解剖室，管理員從不離身的那一把',
  spawn: { x: 2, z: 1.5, yaw: Math.PI }, // 殯儀走廊北端，面向南
  lockNames: { morguekey: '太平間鑰匙', chapterExit: '殯儀後門' },
  story: [
    '拖痕在一道向下的斜坡盡頭停住。\n\n斜坡底下是一條窄長的走廊，牆是水泥的，沒有粉刷，冷氣的出風口結著一層薄霜。空氣裡的味道變了——消毒水底下，壓著一種甜膩的、腐敗的氣息。\n\n走廊盡頭的門牌，只有兩個字：往生。\n\n（太平間。這棟白色堡壘最底下的一層。連死人都要排隊的地方。）',
    '冰櫃室是一整面牆的不鏽鋼抽屜。\n\n幾十格冰櫃，每一格的把手上都掛著一張手寫的名牌。有幾格是拉開的，裡面空了——名牌卻還在，被人整整齊齊地翻了面。\n\n地上有一本厚厚的登記冊，攤開著。最新的幾頁，原本工整的「收治死亡」四個字，全被人用另一種筆跡劃掉，改成了四個字：\n\n「疫歿火化」。\n\n（改一個死因，就抹掉一個「是被他們害死的」證據。\n他們連燒，都要燒得師出有名。）',
    '冰櫃室最深處，有個佝僂的身影在動。\n\n它穿著太平間管理員的深藍色制服，背對著亮均，一格一格地拉開冰櫃、又推回去，喉嚨裡發出破碎的、像在唸誦的聲音。它的手指扣在鐵櫃上，每一下都迸出細小的藍色電火花，震得整面冰櫃牆嗡嗡作響。\n\n它在點名。一格都不肯漏。\n\n（他盡責了一輩子。就算變成這樣，他還在數——不能讓任何一個人，沒有名字地走掉。）',
  ],
  endingText:
    '太平間鑰匙轉開殯儀後門的老鎖，那聲金屬摩擦，在空盪的走廊裡響得很久。老陳把點名冊闔上，抱在懷裡，沒有跟出來：「你去吧。我留下來——總得有人把他們的名字，一個一個唸完。」後門外是一道通往行政樓層的樓梯，扶手上還留著晨星那些人上上下下的手印。「上面就是他們的指揮所了。」老陳在身後說，「把這裡發生的事，帶到有光的地方去。」〔續　第二十章〕',
  objective: '取得太平間鑰匙，穿過焚化前室追向行政樓層',
  rooms: [
    { id: 'corridor', name: '殯儀走廊', x: 0, z: 0, w: 4, d: 16, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 2, y: 2.6, z: 8, color: 0xb8c4cc, intensity: 16, flicker: true } }, // 陰森冷灰
    { id: 'crypt', name: '冰櫃室', x: 4, z: 0, w: 10, d: 9, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 9, y: 3.0, z: 4.5, color: 0xc4d4e4, intensity: 20, flicker: true } },
    { id: 'autopsy', name: '解剖室', x: 4, z: 9, w: 10, d: 7, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 9, y: 3.0, z: 12.5, color: 0xdce8f2, intensity: 28 } }, // 解剖檯無影燈
    { id: 'family', name: '家屬休息室', x: 14, z: 9, w: 7, d: 7, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 17.5, y: 2.8, z: 12.5, color: 0xd8d0c0, intensity: 18 } }, // 暖一點但灰敗
    { id: 'furnace', name: '焚化前室', x: 4, z: 16, w: 10, d: 6, h: 3.6, floor: 'metal', walls: 'metal',
      light: { x: 9, y: 3.2, z: 19, color: 0xffb060, intensity: 22, flicker: true } }, // 焚化爐橘火反光
  ],
  doors: [
    { id: 'd19-corr-crypt', from: 'corridor', to: 'crypt', axis: 'z', at: [4, 4], width: 1.3, height: 2.3, lock: null },
    { id: 'd19-crypt-autopsy', from: 'crypt', to: 'autopsy', axis: 'x', at: [9, 9], width: 1.4, height: 2.4, lock: null },
    { id: 'd19-autopsy-family', from: 'autopsy', to: 'family', axis: 'z', at: [14, 12], width: 1.2, height: 2.2, lock: null },
    { id: 'd19-autopsy-furnace', from: 'autopsy', to: 'furnace', axis: 'x', at: [9, 16], width: 1.4, height: 2.4, lock: null },
    { id: 'd19-exit', from: 'furnace', to: null, axis: 'x', at: [9, 22], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 殯儀走廊：靈車推床、花圈殘骸、拖痕
    { room: 'corridor', type: 'table', x: 2, z: 6, solid: 0.5 },       // 遺體運送推床
    { room: 'corridor', type: 'debris', x: 1, z: 3 },
    { room: 'corridor', type: 'blood', x: 2.5, z: 9 },
    { room: 'corridor', type: 'bodybag', x: 2, z: 13, rot: 0.2 },
    { room: 'corridor', type: 'cardboard', x: 1, z: 14.5 },
    // 冰櫃室：一整面牆的冰櫃（shelf 排列）、解剖前推車、翻倒名牌
    { room: 'crypt', type: 'shelf', x: 5, z: 1, rot: Math.PI / 2, solid: 0.3 }, // 冰櫃牆
    { room: 'crypt', type: 'shelf', x: 5, z: 3.5, rot: Math.PI / 2, solid: 0.3 },
    { room: 'crypt', type: 'shelf', x: 5, z: 6, rot: Math.PI / 2, solid: 0.3 },
    { room: 'crypt', type: 'shelf', x: 13, z: 2, rot: -Math.PI / 2, solid: 0.3 },
    { room: 'crypt', type: 'shelf', x: 13, z: 5, rot: -Math.PI / 2, solid: 0.3 },
    { room: 'crypt', type: 'bodybag', x: 8, z: 7, rot: 0.3 },
    { room: 'crypt', type: 'bodybag', x: 10, z: 7.5, rot: -0.4 },
    { room: 'crypt', type: 'blood', x: 9, z: 5 },
    { room: 'crypt', type: 'papers', x: 7, z: 2 },
    // 解剖室：解剖檯、器械車、標本櫃
    { room: 'autopsy', type: 'table', x: 7, z: 12, solid: 0.6 },       // 解剖檯
    { room: 'autopsy', type: 'table', x: 10.5, z: 12, solid: 0.6 },
    { room: 'autopsy', type: 'shelf', x: 5, z: 14.5, rot: Math.PI / 2, solid: 0.28 }, // 器械櫃
    { room: 'autopsy', type: 'shelf', x: 13, z: 10.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'autopsy', type: 'corpse', x: 8.5, z: 13.8, variant: 2 },
    { room: 'autopsy', type: 'blood', x: 10, z: 13.5 },
    { room: 'autopsy', type: 'pipe', x: 6, z: 10 },
    // 家屬休息室：長椅、供桌、翻倒的紙巾盒
    { room: 'family', type: 'chair_fallen', x: 15.5, z: 11, rot: 1.0 },
    { room: 'family', type: 'chair_fallen', x: 16.5, z: 11.4, rot: 2.3 },
    { room: 'family', type: 'table', x: 18.5, z: 10.5, solid: 0.5 },   // 供桌
    { room: 'family', type: 'papers', x: 18.7, z: 10.7 },
    { room: 'family', type: 'debris', x: 16, z: 14.5 },
    // 焚化前室：焚化爐口（barrel）、待燒的屍袋堆、燃料桶
    { room: 'furnace', type: 'barrel', x: 11, z: 18, solid: 0.4 },     // 燃料桶
    { room: 'furnace', type: 'bodybag', x: 6, z: 18, rot: 0.2 },
    { room: 'furnace', type: 'bodybag', x: 7.5, z: 18.5, rot: -0.3 },
    { room: 'furnace', type: 'bodybag', x: 6.8, z: 20, rot: 0.5 },
    { room: 'furnace', type: 'crate', x: 12, z: 20, solid: 0.4 },
  ],
  hazards: [
    { room: 'crypt', type: 'shock', x: 8, z: 5.5, r: 0.9 },     // 管理員砸地的電弧殘留
    { room: 'crypt', type: 'shock', x: 11, z: 3, r: 0.8 },
    { room: 'autopsy', type: 'slime', x: 9, z: 13.5, r: 0.8 },  // 解剖檯下的黏液
    { room: 'corridor', type: 'slime', x: 2, z: 11, r: 0.75 },
    { room: 'furnace', type: 'fire', x: 8, z: 19.5, r: 0.85 },  // 焚化爐口
    { room: 'furnace', type: 'fire', x: 10.5, z: 20.5, r: 0.7 },
  ],
  documents: [
    {
      id: 'g19-doc-roll', title: '遺體點名冊（改寫頁）', x: 9, z: 3.5,
      text: '【往生者登記冊　黑鴉總院太平間】\n\n（每一列的死因欄都被劃掉重寫，原字跡工整、新字跡潦草）\n\n０４１　收治死亡 → 疫歿火化\n０４２　收治死亡 → 疫歿火化\n０４３　收治死亡 → 疫歿火化\n……（連續三十七列，全部一樣）\n\n（「收治死亡」——是在他們手裡死的。\n「疫歿火化」——是病毒殺的，跟他們無關。\n改四個字，就把三十七條命的帳，一筆勾銷。）',
    },
    {
      id: 'g19-doc-schedule', title: '火化排程（急件）', x: 11, z: 19,
      text: '【焚化排程　支援隊　急】\n\n本批「疫歿遺體」共 41 具，務必於今日 06:00 天亮前全數焚化完畢。\n理由：避免日間有媒體空拍、家屬圍聚。\n備註：焚化後灰燼不予保留、不通知家屬。\n\n（趕在天亮前。他們怕光。\n只要太陽一出來，這四十一個人就再也燒不掉了——\n所以他們要搶在天亮前，把人變成沒人領的灰。）',
    },
    {
      id: 'g19-doc-photo', title: '抽屜裡的感謝卡合照', x: 19.5, z: 14, monoAfter: true,
      text: '（家屬休息室的抽屜裡，塞著一疊家屬寄來的感謝卡，最上面壓著一張照片：太平間的老管理員，被一家人圍在中間，一個小女孩踮腳把一張畫塞給他，他笑得眼睛都瞇了。）\n\n（卡片上寫著：）\n\n「謝謝陳伯伯，把我爸爸整理得那麼乾淨，讓他走得有尊嚴。」\n\n（有尊嚴地走。這四個字，是這座地下室裡，最後一個還有人記得的東西。）',
    },
    {
      id: 'g19-doc-note', title: '管理員的值班日誌（最後一頁）', x: 6.5, z: 2,
      text: '【太平間值班日誌】\n\n３／０７　夜班。支援隊今晚又送來十二具，說是「疫歿」。可我驗過了，有咬傷、有槍傷。不是病死的。\n３／０７　他們叫我照單登記、照單火化，別多問。我說死人也有名字，該讓家屬看最後一面。\n３／０７　他們把我推開了。\n（字跡到這裡斷掉，最後一行是用指甲刻在紙上的：）\n「我不走。我要把他們的名字，一個一個點完。」',
    },
  ],
  npcs: [
    {
      id: 'mortician',
      name: '老陳',
      x: 16, z: 13, yaw: -Math.PI / 2, room: 'family',
      dialog: [
        '（一個瘦削的老人坐在長椅上，膝上抱著一本厚厚的冊子，聽見腳步聲也不驚慌）別怕。我不是那些東西。我是這裡的管理員……本來有兩個，另一個，就在冰櫃室裡，你看到了吧。',
        '他叫阿德，做了三十年。變成那樣了，還在一格一格點名——他這輩子最怕的就是有人沒登記到、沒人來領。你別怪他兇。他只是……放不下。',
        '晨星把「收治死亡」全改成「疫歿火化」，趕著天亮前燒光。燒掉的不只是屍體，是四十一個「他們害死的人」的證據。我攔不住，我只能把名字記下來——記在這本冊子裡，記在我腦子裡。',
        '你要出殯儀後門？那把老鑰匙在解剖室，阿德從不離身的那把——他變異的時候，鑰匙掉在解剖檯底下了。拿了它，後門上頭就是晨星的指揮所。',
        '（他把東西塞進你手裡）綠色草藥，手槍彈，我這把老骨頭用不上了。你去吧——上去，把這裡的事帶出去。我留下來，總得有人把他們的名字，一個一個唸完。',
      ],
      dialogAfter: '（老陳翻開點名冊，低聲一個一個唸著名字）你去吧。到有光的地方去。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g19-t-corr', room: 'corridor', text: '殯儀走廊。水泥牆結著薄霜，門牌上只有兩個字：往生。甜膩的腐味壓在消毒水底下。', alert: true, shake: 0.04,
      monologue: '（太平間。這棟白色堡壘最底下的一層。連死人，都要排隊的地方。）' },
    { id: 'g19-t-crypt', room: 'crypt', text: '冰櫃室。一整面牆的不鏽鋼抽屜，把手上掛著手寫名牌。最深處有個藍制服的身影，正一格一格拉開又推回。', sound: 'groan', alert: true, shake: 0.06,
      monologue: '（它在點名。手指一扣，就迸出藍色電火花。他盡責了一輩子——變成這樣，還在數。）' },
    { id: 'g19-t-autopsy', room: 'autopsy', text: '解剖室。無影燈慘白地照著空的解剖檯，器械車上的手術刀擺得整整齊齊，只有一把不見了。',
      monologue: '（連在這裡，都有人把工具收得一絲不苟。乾淨得可怕——他們把殺人這件事，也做成了流程。）' },
    { id: 'g19-t-family', room: 'family', text: '家屬休息室。長椅翻倒，供桌上的白蠟燭燒到了底。牆上還貼著一張沒撕下的告示：請保持安靜。',
      monologue: '（多少家屬在這張椅子上等過最後一面。而現在，連「最後一面」都被排進了天亮前的焚化清單。）' },
    { id: 'g19-t-furnace', room: 'furnace', text: '焚化前室。爐口的橘火映在鋼牆上，待燒的屍袋沿牆堆著，一具一具，都沒有名牌。', sound: 'groan', alert: true,
      monologue: '（趕在天亮前，把人變成沒人領的灰。他們怕光——那我就把這裡，帶到有光的地方去。）' },
  ],
  entities: {
    pickups: [
      { id: 'g19-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 8 },
      { id: 'g19-p-shells1', item: 'shotgun_shells', count: 7, x: 2.5, z: 14 },
      { id: 'g19-p-herb1', item: 'green_herb', count: 1, x: 6, z: 2 },
      { id: 'g19-p-blue1', item: 'blue_herb', count: 1, x: 12, z: 6.5 },
      { id: 'g19-p-morguekey', item: 'morguekey', count: 1, x: 7, z: 12.5 },   // ★ 解剖室解剖檯底下
      { id: 'g19-p-ammo2', item: 'handgun_ammo', count: 15, x: 12.5, z: 14 },
      { id: 'g19-p-smgammo1', item: 'smg_ammo', count: 30, x: 5.5, z: 10.5 },
      { id: 'g19-p-spray1', item: 'first_aid_spray', count: 1, x: 17.5, z: 11 },
      { id: 'g19-p-herb2', item: 'green_herb', count: 1, x: 19.5, z: 13.5 },
      { id: 'g19-p-shells2', item: 'shotgun_shells', count: 7, x: 6, z: 20.5 },
      { id: 'g19-p-blue2', item: 'blue_herb', count: 1, x: 12.5, z: 20.5 },
      { id: 'g19-p-ammo3', item: 'handgun_ammo', count: 15, x: 9, z: 17.5 },
    ],
    enemies: [
      { id: 'g19-keeper1', type: 'keeper', x: 9, z: 4 },       // ★ 冰櫃室——太平間管理員阿德
      { id: 'g19-mutant1', type: 'mutant', x: 11, z: 6 },      // 冰櫃室精英
      { id: 'g19-z1', type: 'zombie', x: 6, z: 7 },
      { id: 'g19-z2', type: 'zombie', x: 12, z: 3 },
      { id: 'g19-z3', type: 'zombie', x: 2.5, z: 11 },         // 走廊
      { id: 'g19-mutant2', type: 'mutant', x: 8, z: 14 },      // 解剖室
      { id: 'g19-z4', type: 'zombie', x: 6, z: 11 },
      { id: 'g19-z5', type: 'zombie', x: 17, z: 12 },          // 家屬休息室
      { id: 'g19-z6', type: 'zombie', x: 7, z: 19 },           // 焚化前室
      { id: 'g19-z7', type: 'zombie', x: 11, z: 20 },
    ],
    typewriters: [
      { id: 'g19-tw-corr', x: 1, z: 1 },
      { id: 'g19-tw-family', x: 20, z: 15 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
