// 第十八章〈血庫異變〉：承接 ch17——大人們被帶去「有很多冰箱的地方」，那是檢驗科與血庫。
// 亮均循著地板拖痕潛入檢驗科，發現晨星把整座血庫當成 KY 的培養皿：一袋袋庫存血在冷藏室裡
// 自己增殖、鼓脹。血庫＝炸藥庫。他得在血袋孵出更多噬血者之前，拿到檢驗科通行證穿過去。
export const CHAPTER18 = {
  id: 'chapter18',
  name: '第十八章：血庫異變',
  next: 'chapter19',
  exitNeeds: 'labpass',
  exitHint: '檢驗科的後門要刷通行證——躲在離心機房的醫檢師怡君說，她的識別證掉在生化實驗區了',
  spawn: { x: 2, z: 4, yaw: Math.PI / 2 }, // 檢驗科大廳西側，面向東
  lockNames: { labpass: '檢驗科通行證', chapterExit: '檢驗科後門' },
  story: [
    '「有很多冰箱的地方。」\n\n那孩子在小兒科的門後這樣說。亮均循著地板上那兩道拖痕一路往下，拖痕的盡頭，是掛著「檢驗醫學科」燈牌的雙扇門。\n\n門後的空氣是冷的，冷得帶著鐵鏽和消毒水的味道。\n\n（很多冰箱。血庫的冰箱。他們把人帶到這裡來，不是為了救。）',
    '檢驗科大廳的燈管半數壞了，剩下的一半慘白刺眼。\n\n離心機還在某個房間裡空轉，嗡嗡的低鳴像是誰在牆壁裡磨牙。牆上的血品庫存表被人用紅筆整片劃掉，只剩一行還看得清：\n\n「全數陽性。封存。勿報。」\n\n（陽性的血，不銷毀，反而封存起來。他們不是在防疫——是在囤貨。）\n\n（囤一整座血庫的 KY。）',
    '血庫冷藏室的門是半掩的，冷氣從門縫裡漏出來，白霧貼著地面爬。\n\n一排排血袋掛在架上，本該是暗紅色的，此刻卻有幾袋鼓得發亮，表面爬著細細的黑色紋路——跟欣儀手臂上的一模一樣。\n\n其中一袋，正緩慢地、一下一下地，搏動著。\n\n（像心跳。沒有心臟的血，自己學會了跳。）\n\n（這裡的每一袋，都是一顆還沒引爆的炸彈。）',
  ],
  endingText:
    '通行證刷過檢驗科後門，冷藏室的溫控警報還在身後尖叫。怡君替亮均把最後幾格彈藥塞進口袋：「別開槍打那些鼓起來的血袋，聽見沒有——它們一破，整條走廊都是感染源。」她指了指後門外那道更深的拖痕，那痕跡沾著防腐液的味道，一路通往地下更冷的地方。「他們把『處理掉』的人往那邊搬。那裡是太平間。」她頓了頓，「連死人，晨星都不打算放過。」〔續　第十九章〕',
  objective: '找到檢驗科通行證，穿過血庫離開檢驗科',
  rooms: [
    { id: 'lobby', name: '檢驗科大廳', x: 0, z: 0, w: 12, d: 8, h: 3.6, floor: 'tile', walls: 'plaster',
      light: { x: 6, y: 3.2, z: 4, color: 0xe6f2f8, intensity: 32, flicker: true } }, // 慘白半壞燈管
    { id: 'lab', name: '生化實驗區', x: 12, z: 0, w: 8, d: 8, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 16, y: 3.0, z: 4, color: 0xd8ecff, intensity: 30 } },
    { id: 'coldstore', name: '血庫冷藏室', x: 12, z: 8, w: 8, d: 8, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 16, y: 2.9, z: 12, color: 0xc8ddff, intensity: 24, flicker: true } }, // 低溫冷藍
    { id: 'centrifuge', name: '離心機房', x: 2, z: 8, w: 10, d: 8, h: 3.4, floor: 'tile', walls: 'metal',
      light: { x: 7, y: 3.0, z: 12, color: 0xdfeeff, intensity: 26 } },
    { id: 'freezer', name: '冷凍庫', x: 2, z: 16, w: 10, d: 6, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 7, y: 2.9, z: 19, color: 0xc0d6f4, intensity: 22, flicker: true } }, // 更冷更暗
  ],
  doors: [
    { id: 'd18-lobby-lab', from: 'lobby', to: 'lab', axis: 'z', at: [12, 4], width: 1.4, height: 2.4, lock: null },
    { id: 'd18-lab-cold', from: 'lab', to: 'coldstore', axis: 'x', at: [16, 8], width: 1.3, height: 2.3, lock: null },
    { id: 'd18-cold-cent', from: 'coldstore', to: 'centrifuge', axis: 'z', at: [12, 12], width: 1.3, height: 2.3, lock: null },
    { id: 'd18-cent-freezer', from: 'centrifuge', to: 'freezer', axis: 'x', at: [7, 16], width: 1.4, height: 2.4, lock: null },
    { id: 'd18-exit', from: 'freezer', to: null, axis: 'x', at: [7, 22], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 檢驗科大廳：接待台、翻倒的候檢椅、傾倒的採血車
    { room: 'lobby', type: 'table', x: 3, z: 2, rot: 0.1, solid: 0.6 },       // 接待台
    { room: 'lobby', type: 'chair_fallen', x: 5, z: 5.5, rot: 1.2 },
    { room: 'lobby', type: 'chair_fallen', x: 6.2, z: 6, rot: 2.6 },
    { room: 'lobby', type: 'shelf', x: 10.4, z: 1.5, rot: -Math.PI / 2, solid: 0.28 }, // 檢體架
    { room: 'lobby', type: 'papers', x: 4, z: 3 },
    { room: 'lobby', type: 'blood', x: 8, z: 5.5 },
    { room: 'lobby', type: 'debris', x: 9.5, z: 7 },
    // 生化實驗區：實驗桌陣、試劑架、燒杯
    { room: 'lab', type: 'table', x: 14, z: 2, solid: 0.5 },
    { room: 'lab', type: 'table', x: 17.5, z: 2, solid: 0.5 },
    { room: 'lab', type: 'shelf', x: 12.4, z: 5.5, rot: Math.PI / 2, solid: 0.28 }, // 試劑架
    { room: 'lab', type: 'shelf', x: 19.5, z: 5.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'lab', type: 'papers', x: 14.3, z: 2.2 },
    { room: 'lab', type: 'barrel', x: 18.5, z: 6.5, solid: 0.35 }, // 生物廢棄物桶
    { room: 'lab', type: 'blood', x: 15.5, z: 6 },
    // 血庫冷藏室：血袋架（shelf）、鼓脹血袋、拖車
    { room: 'coldstore', type: 'shelf', x: 13, z: 9.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'coldstore', type: 'shelf', x: 13, z: 12, rot: Math.PI / 2, solid: 0.28 },
    { room: 'coldstore', type: 'shelf', x: 19, z: 10.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'coldstore', type: 'shelf', x: 19, z: 13, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'coldstore', type: 'crate', x: 16, z: 14, solid: 0.4 }, // 血品運輸箱
    { room: 'coldstore', type: 'blood', x: 15.5, z: 11 },
    { room: 'coldstore', type: 'blood', x: 17.5, z: 13.5 },
    { room: 'coldstore', type: 'bodybag', x: 14, z: 14.5, rot: 0.4 },
    // 離心機房：離心機（table）、控制台、抽屜櫃
    { room: 'centrifuge', type: 'table', x: 4, z: 10, solid: 0.55 },   // 離心機
    { room: 'centrifuge', type: 'table', x: 6.5, z: 10, solid: 0.55 },
    { room: 'centrifuge', type: 'shelf', x: 10.4, z: 13.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'centrifuge', type: 'chair_fallen', x: 5, z: 12.5, rot: 0.8 },
    { room: 'centrifuge', type: 'papers', x: 6.6, z: 10.2 },
    { room: 'centrifuge', type: 'pipe', x: 9, z: 9 },
    // 冷凍庫：屍袋、堆疊的檢體箱、結霜的管線
    { room: 'freezer', type: 'bodybag', x: 4, z: 18, rot: 0.2 },
    { room: 'freezer', type: 'bodybag', x: 5.5, z: 18.6, rot: -0.3 },
    { room: 'freezer', type: 'crate', x: 9.5, z: 17.5, solid: 0.4 },
    { room: 'freezer', type: 'pipe', x: 3, z: 20 },
    { room: 'freezer', type: 'blood', x: 7, z: 20 },
  ],
  hazards: [
    { room: 'lab', type: 'fire', x: 18, z: 3, r: 0.7 },        // 打翻的酒精燈引燃試劑
    { room: 'lab', type: 'slime', x: 15, z: 6.5, r: 0.8 },      // 溢出的檢體
    { room: 'coldstore', type: 'slime', x: 17, z: 10, r: 0.85 },// 破掉的血袋
    { room: 'coldstore', type: 'shock', x: 13.5, z: 14, r: 0.8 }, // 冷凍壓縮機漏電
    { room: 'centrifuge', type: 'slime', x: 8, z: 11.5, r: 0.75 },
    { room: 'freezer', type: 'fire', x: 10, z: 20.5, r: 0.7 },  // 除霜加熱管短路起火
  ],
  documents: [
    {
      id: 'g18-doc-report', title: '血品異常報告', x: 15.5, z: 12.5,
      text: '【庫存血品週報　檢驗醫學科】\n\n本院庫存血袋 O 型 42 袋、A 型 55 袋、B 型 38 袋——KY 抗原快篩全數陽性。\n依規應立即高溫銷毀、通報疾管。\n但支援隊指示：全數封存於冷藏，勿報疾管，勿列入銷毀清冊。\n\n（他們知道每一袋都有毒。他們不但不銷毀，還特地冰起來。\n這不是疏失，是收藏。他們在替 KY 存糧。）',
    },
    {
      id: 'g18-doc-consent', title: '晨星「防疫採血」同意書', x: 5, z: 2.5,
      text: '【疫情監測採血同意書　晨星工業醫療支援隊】\n\n受檢人：（多份，姓名欄字跡相同）\n「本人同意提供血液樣本供疫情監測，並同意樣本後續研究利用。」\n簽名：陳＊＊　林＊＊　王＊＊……\n\n（三十幾份同意書，簽名的筆跡卻是同一個人。\n他們連「同意」都懶得去騙——直接自己簽了。\n被抽血的人，早就沒有手能簽字了。）',
    },
    {
      id: 'g18-doc-photo', title: '抽屜裡的醫檢科合照', x: 10, z: 13.7, monoAfter: true,
      text: '（離心機房的抽屜底下壓著一張合照。檢驗醫學科全體站在離心機前，每個人手裡都舉著一支試管，笑得很開心。最左邊那個綁馬尾的女生比著大大的讚。）\n\n（照片背面寫著：）\n\n「我們負責的每一管血，背後都是一個等結果的人。——檢醫科　怡君」\n\n（等結果的人。而現在，這座血庫裡連一管乾淨的血都沒有了。）',
    },
    {
      id: 'g18-doc-coldlog', title: '冷鏈溫控警報記錄', x: 18, z: 13.5,
      text: '【冷藏監控系統　異常記錄】\n\n03:11　4 號冷藏庫溫度異常上升（設定 4°C，實測 11°C）\n03:40　庫內偵測到「非預期生物活性」——警示解除者：支援隊\n04:02　多個血袋內壓超出量程，感測器故障\n04:15　建議立即淨空。已讀。未處理。\n\n（血袋自己在升溫。裡面的東西在動、在長。\n系統一直在尖叫「快跑」，而管事的人，把警報關掉了。）',
    },
  ],
  npcs: [
    {
      id: 'labtech',
      name: '怡君',
      x: 5.5, z: 13, yaw: 0, room: 'centrifuge',
      dialog: [
        '（一個綁馬尾的女生從離心機後面探出頭，手裡攥著一支破掉的試管當武器）你……不是穿防護衣的。謝天謝地。我躲在這裡兩天了，不敢開門——外面那些血袋，會叫。',
        '我是這裡的醫檢師。你知道最可怕的是什麼嗎？是我親手把那些血冰進去的。上頭說是「監測樣本」，我照做了。直到有一天，我看見架上的血袋自己在鼓、在跳。',
        '那不是血了。那是 KY 拿血當養分，在裡面繁殖。一袋就能感染一條走廊——而冷藏室裡，有一百多袋。晨星把整座血庫養成了他們的彈藥庫。',
        '我的通行證……逃進來的時候掉在生化實驗區的實驗桌那邊了。你要出後門，非它不可。幫我撿回來，我告訴你怎麼安全穿過冷藏室——千萬別打那些鼓起來的血袋。',
        '（她把東西塞給你）藍色草藥，解毒用，那些黏液沾到就麻煩了。還有這盒霰彈，我從支援隊的屍體上摸來的。走後門，往下——他們把「處理掉」的人都搬去太平間了。',
      ],
      dialogAfter: '（怡君縮回離心機後）記住，別碰那些會跳的血袋。往後門走，別回頭。',
      gift: [
        { item: 'blue_herb', count: 1 },
        { item: 'shotgun_shells', count: 7 },
      ],
    },
  ],
  triggers: [
    { id: 'g18-t-lobby', room: 'lobby', text: '檢驗科大廳。半數燈管壞了，牆上的血品庫存表被紅筆整片劃掉。', alert: true, shake: 0.04,
      monologue: '（「全數陽性。封存。勿報。」——陽性的血不銷毀，反而收起來。他們在囤貨。）' },
    { id: 'g18-t-lab', room: 'lab', text: '生化實驗區。實驗桌上排著一整列貼著條碼的樣本管，最後一排的封膜鼓了起來。', sound: 'groan', alert: true,
      monologue: '（每一管都貼著一個人的編號。他們把人拆成一管一管的樣本，編號歸檔。）' },
    { id: 'g18-t-cold', room: 'coldstore', text: '血庫冷藏室。冷氣白霧貼地爬行，架上有幾袋血鼓得發亮，一下一下地搏動。', sound: 'groan', alert: true, shake: 0.05,
      monologue: '（像心跳。沒有心臟的血，自己學會了跳。這裡的每一袋，都是一顆還沒引爆的炸彈。）' },
    { id: 'g18-t-cent', room: 'centrifuge', text: '離心機房。一台離心機還在空轉，嗡嗡作響——轉子裡卡著一管早就凝固的黑血。',
      monologue: '（機器不知道該停。它還在忠實地執行最後一道指令，替一管死血離心。跟這棟樓裡每一個「照程序辦事」的人一樣。）' },
    { id: 'g18-t-freezer', room: 'freezer', text: '冷凍庫。屍袋沿牆堆著，結霜的管線在頭頂滴水。地上的拖痕從這裡繼續往更深處延伸。',
      monologue: '（拖痕沾著防腐液的味道。這條路的盡頭不是出口——是太平間。連死人，他們都還要再利用一次。）' },
  ],
  entities: {
    pickups: [
      { id: 'g18-p-ammo1', item: 'handgun_ammo', count: 15, x: 8, z: 2 },
      { id: 'g18-p-herb1', item: 'green_herb', count: 1, x: 10.5, z: 6 },
      { id: 'g18-p-labpass', item: 'labpass', count: 1, x: 17.6, z: 2.4 },    // ★ 生化實驗區實驗桌
      { id: 'g18-p-shells1', item: 'shotgun_shells', count: 7, x: 13, z: 2 },
      { id: 'g18-p-blue1', item: 'blue_herb', count: 1, x: 19, z: 3 },
      { id: 'g18-p-ammo2', item: 'handgun_ammo', count: 15, x: 18.5, z: 12.5 },
      { id: 'g18-p-smgammo1', item: 'smg_ammo', count: 30, x: 14.5, z: 13.5 },
      { id: 'g18-p-herb2', item: 'green_herb', count: 1, x: 3.5, z: 13.5 },
      { id: 'g18-p-spray1', item: 'first_aid_spray', count: 1, x: 9.5, z: 10.5 },
      { id: 'g18-p-shells2', item: 'shotgun_shells', count: 7, x: 4, z: 20 },
      { id: 'g18-p-blue2', item: 'blue_herb', count: 1, x: 8.5, z: 18 },
      { id: 'g18-p-ammo3', item: 'handgun_ammo', count: 15, x: 6, z: 20.5 },
    ],
    enemies: [
      { id: 'g18-z1', type: 'zombie', x: 10, z: 6.5 },        // 大廳深處
      { id: 'g18-spider1', type: 'spider', x: 14, z: 3.5 },   // 生化實驗區——沿試劑架爬下來的巨蛛
      { id: 'g18-spider2', type: 'spider', x: 18, z: 6 },
      { id: 'g18-bloater1', type: 'bloater', x: 15, z: 10.5 },// 冷藏室——鼓脹血袋孵出的
      { id: 'g18-bloater2', type: 'bloater', x: 18, z: 13.5 },
      { id: 'g18-bloater3', type: 'bloater', x: 17, z: 5.5 }, // 實驗區溢出樣本
      { id: 'g18-bloater4', type: 'bloater', x: 9, z: 13 },   // 離心機房
      { id: 'g18-z3', type: 'zombie', x: 4.5, z: 14.5 },
      { id: 'g18-z4', type: 'zombie', x: 6.5, z: 19 },        // 冷凍庫
    ],
    typewriters: [
      { id: 'g18-tw-lobby', x: 1, z: 7 },
      { id: 'g18-tw-cent', x: 10.5, z: 8.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
