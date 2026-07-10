// 第五章〈斷電的街區〉：街道篇開幕。行政大樓的外線被晨星切斷，
// 亮均與欣儀從廠區排水渠鑽出——發現第一章那灘流進排水溝的 KY，
// 已隨整夜暴雨流進黑鴉市下水道。市區停電、淪陷，晨星封鎖線把街區變成新觀察場。
// 魔王：鐵面・鎮暴隊長（ironmask）守外環道路路障。推進：加油站辦公室拿斷線鉗剪圍籬。
export const CHAPTER5 = {
  id: 'chapter5',
  name: '第五章：斷電的街區',
  next: 'chapter6',
  exitNeeds: 'boltcutter',
  exitHint: '後巷盡頭的圍籬拉著鐵絲網——徒手拆不開。加油站是修車行兼營的，辦公室裡應該有斷線鉗',
  spawn: { x: 1.7, z: 1.5, yaw: Math.PI / 2 }, // 排水渠出口，面向東
  lockNames: { boltcutter: '斷線鉗', chapterExit: '封鎖圍籬' },
  story: [
    '行政大樓三樓，機房的門開著。\n\n裡面每一條對外線路都被剪斷，切口整齊得像手術。桌上留著一張晨星的工單：「外部鏈路隔離——已完成」。\n\n欣儀靠著牆滑坐下來：「他們比我們快。」\n\n亮均盯著窗外。雨小了。廠區圍牆外，黑鴉市的方向——整片街區都是暗的。\n\n（市區也停電了？不對。不只是停電。）',
    '「還有一條路。」亮均說，「市區。電信機房、轉播站、任何還活著的節點。晨星能切斷一座廠，切不斷整座城市。」\n\n欣儀看著他：「怎麼出去？大門是他們的。」\n\n「排水渠。」亮均拉開廠務平面圖，指著西南角，「雨水幹渠直通外環道路。他們封路、封門、封訊號——但沒有人會去封水溝。」\n\n（第一夜，E 區的黏液就是從這裡流出去的。我們要走的，是 KY 已經走過的路。）',
    '排水渠的水只到腳踝，黑色的，水面浮著一層淡淡的藍。\n\n兩人貓著腰走了四百公尺，頭頂的人孔蓋縫隙透進外環道路的火光。\n\n爬出排水渠的那一刻，雨停了。\n\n外環道路上，車輛橫七豎八，有幾輛還在燒。路燈滅了大半，僅剩的幾盞在閃。遠處的便利商店招牌，黑著。\n\n欣儀輕聲說：「這裡……也淪陷了。」\n\n亮均看著路面上蜿蜒的積水——每一灘，都泛著熟悉的藍光。\n\n「不是淪陷。」他說，「是擴散。」',
  ],
  endingText:
    '斷線鉗剪斷最後一股鐵絲，圍籬拉開一道剛好過人的縫。回頭望去，外環道路的火光裡，那個鎮暴隊長的盾牌還立在路障前——他到最後都沒有離開崗位。欣儀替他把警用名牌翻正：「陳志明。他也只是排班表上的一個名字。」商店街的方向，有一盞燈還亮著。停電的街區裡，那盞燈亮得像個問題：是誰，還在裡面？〔續　第六章〕',
  objective: '穿過外環道路，找到剪開封鎖圍籬的工具',
  rooms: [
    { id: 'drain', name: '雨水幹渠', x: 0, z: 0, w: 3.5, d: 10, h: 2.6, floor: 'metal', walls: 'metal',
      light: { x: 1.7, y: 2.2, z: 5, color: 0x557766, intensity: 9, flicker: true } }, // 滲入的微光
    { id: 'street1', name: '外環道路', x: 3.5, z: 0, w: 20, d: 8, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 13, y: 4.8, z: 4, color: 0xffb060, intensity: 30, flicker: true } }, // 燃燒車輛的火光
    { id: 'gas', name: '加油站前庭', x: 6, z: 8, w: 9, d: 7, h: 5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 10.5, y: 4.2, z: 11.5, color: 0x8899bb, intensity: 16, flicker: true } }, // 殘存頂棚燈
    { id: 'office', name: '加油站辦公室', x: 15, z: 8, w: 5, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 17.5, y: 2.6, z: 10.5, color: 0xffe0b0, intensity: 18 } },
    { id: 'alley', name: '後巷', x: 23.5, z: 0, w: 4, d: 12, h: 5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 25.5, y: 4.2, z: 6, color: 0x667788, intensity: 12, flicker: true } },
  ],
  doors: [
    { id: 'd5-drain-street', from: 'drain', to: 'street1', axis: 'z', at: [3.5, 4], width: 1.4, height: 2.2, lock: null },
    { id: 'd5-street-gas', from: 'street1', to: 'gas', axis: 'x', at: [10.5, 8], width: 1.6, height: 2.6, lock: null },
    { id: 'd5-gas-office', from: 'gas', to: 'office', axis: 'z', at: [15, 10.5], width: 1.1, height: 2.1, lock: null },
    { id: 'd5-street-alley', from: 'street1', to: 'alley', axis: 'z', at: [23.5, 4], width: 1.4, height: 2.4, lock: null },
    { id: 'd5-exit', from: 'alley', to: null, axis: 'x', at: [25.5, 12], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 排水渠：管線與淤積
    { room: 'drain', type: 'pipe', x: 1.7, z: 5, len: 9, y: 2.2, rot: Math.PI / 2 },
    { room: 'drain', type: 'debris', x: 1, z: 7.5 },
    { room: 'drain', type: 'blood', x: 2.3, z: 3 },
    // 外環道路：橫七豎八的車、路燈、路障
    { room: 'street1', type: 'car', x: 8, z: 2.5, rot: 0.4, solid: 1.0 },
    { room: 'street1', type: 'car', x: 13.5, z: 4.5, rot: -0.25, variant: 2, solid: 1.0 }, // 燒毀
    { room: 'street1', type: 'car', x: 17, z: 2, rot: 1.9, variant: 1, solid: 1.0 },       // 翻覆
    { room: 'street1', type: 'streetlight', x: 6, z: 0.6 },
    { room: 'street1', type: 'streetlight', x: 14, z: 7.4, dead: true },
    { room: 'street1', type: 'streetlight', x: 21, z: 0.6 },
    { room: 'street1', type: 'crate', x: 20.5, z: 5.5, solid: 0.4 },  // 路障沙包
    { room: 'street1', type: 'crate', x: 21.3, z: 4.8, solid: 0.4 },
    { room: 'street1', type: 'trash', x: 5, z: 6.8 },
    { room: 'street1', type: 'hydrant', x: 11, z: 0.7 },
    { room: 'street1', type: 'blood', x: 19, z: 3.5 },
    { room: 'street1', type: 'corpse', x: 20.2, z: 6.4, variant: 2 }, // 倒下的鎮暴隊員
    { room: 'street1', type: 'debris', x: 10, z: 6 },
    // 加油站前庭：加油島（桶代替）、棄車
    { room: 'gas', type: 'barrel', x: 9, z: 11, solid: 0.35 },
    { room: 'gas', type: 'barrel', x: 9.9, z: 11.3, solid: 0.35 },
    { room: 'gas', type: 'car', x: 12.5, z: 13, rot: 0.9, solid: 1.0 },
    { room: 'gas', type: 'trash', x: 7, z: 13.8 },
    { room: 'gas', type: 'blood', x: 10.5, z: 9.5 },
    { room: 'gas', type: 'cardboard', x: 13.8, z: 9 },
    // 辦公室：值班桌與工具架
    { room: 'office', type: 'table', x: 17.5, z: 9.3, solid: 0.5 },
    { room: 'office', type: 'papers', x: 17.7, z: 9.5 },
    { room: 'office', type: 'shelf', x: 19.7, z: 11.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'office', type: 'chair_fallen', x: 16.3, z: 11.8, rot: 2.2 },
    // 後巷：垃圾與逃難痕跡
    { room: 'alley', type: 'trash', x: 24.5, z: 2 },
    { room: 'alley', type: 'trash', x: 26.5, z: 8 },
    { room: 'alley', type: 'debris', x: 25, z: 5 },
    { room: 'alley', type: 'bodybag', x: 26.3, z: 10.5, rot: 0.7 },
    { room: 'alley', type: 'blood', x: 25.5, z: 9.8 },
  ],
  // 街道危險：燃燒車輛的火、泛藍積水（KY）、斷落電線
  hazards: [
    { room: 'drain', type: 'slime', x: 1.7, z: 8.5, r: 0.9 },
    { room: 'street1', type: 'fire', x: 13.5, z: 3.4, r: 1.0 },  // 燒毀車周圍
    { room: 'street1', type: 'fire', x: 14.6, z: 5.2, r: 0.8 },
    { room: 'street1', type: 'slime', x: 9.5, z: 5.5, r: 0.85 }, // 泛藍積水
    { room: 'street1', type: 'shock', x: 14.2, z: 7.1, r: 0.8 }, // 路燈斷線泡水
    { room: 'gas', type: 'fire', x: 12, z: 12.2, r: 0.85 },
    { room: 'alley', type: 'slime', x: 25.5, z: 3.5, r: 0.8 },
  ],
  documents: [
    {
      id: 'g5-doc-notice', title: '晨星工業封鎖公告', x: 20.8, z: 5.2,
      text: '【區域管制通告】\n\n因立愷X電廠區化學品外洩，本區域即刻起實施封鎖管制。\n請居民留在室內、關閉門窗，等待專業單位除污。\n擅越封鎖線者，後果自負。\n\n——晨星工業環境應變中心\n\n（「後果自負」。不是警告用語——是免責聲明。他們已經預設了會有屍體。）',
    },
    {
      id: 'g5-doc-drain', title: '水利局檢測貼條（三週前）', x: 1, z: 4.5,
      text: '檢測點：外環雨水幹渠 W-12\n異常：夜間水體發光（微弱、藍色）\n判定：藻類反光，無需處理\n複檢：無\n\n（三週前。跟廠裡管線鈍化測試同一週。有人看見了，寫下來了，然後被一句「藻類反光」蓋掉。）\n\n（第一個發現的人永遠是基層。第一個被劃掉的也是。）',
    },
    {
      id: 'g5-doc-photo', title: '抽屜裡的全家福', x: 18.9, z: 9.3, monoAfter: true,
      text: '（辦公室抽屜深處壓著一張全家福。加油站的制服、一對雙胞胎女兒、笑得瞇起眼的太太。）\n\n（照片背面用原子筆寫著：）\n\n「夜班無聊的時候就看看。等雨停就回家。」\n\n（外面的雨停了。值班台的椅子倒在地上，人不在。）\n\n（等雨停就回家——這句話，今晚全黑鴉市有多少人說過？）',
    },
    {
      id: 'g5-doc-pump', title: '油機故障單', x: 8.5, z: 10,
      text: '2 號油機：停電跳槍，油槍未歸位。\n地下油槽液位：正常。\n備註：晚上八點後路上一直有人用跑的，不像趕路，像逃。有人臉色不對，眼睛在流黑色的東西。已報警，警局電話無人接聽。\n\n（晚上八點。廠區爆發後不到半小時，市區就有感染者了。不是圍堵失敗——是根本沒有人打算圍堵。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 16.3, z: 9.8, yaw: Math.PI / 2, room: 'office',
      dialog: [
        '（欣儀翻著辦公室的急救箱，左臂的繃帶又滲出一圈暗色）路上那些積水……你看到了嗎？藍色的。跟 E 區電氣室那灘一模一樣。',
        '下水道。KY 隨著那場雨走了整夜的下水道。廠區到市區，排水系統全是相通的。',
        '（她把一捲繃帶塞進包裡，聲音壓得很低）晨星把「封鎖線」拉在市區外圍，不是在圍堵病毒——病毒早就在裡面了。他們是把整個街區圈起來，看它變成什麼樣子。',
        '第二座觀察場。這次的樣本不是工廠員工，是整條街的居民。',
        '證據還在我們身上。只要找到一個還活著的網路節點——電信機房、轉播站，都好。走吧，往市區裡面走。',
      ],
      dialogAfter: '（欣儀把急救箱背上肩）路障那邊有東西守著。別跟盾牌硬碰，等它揮空的時候再打。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g5-t-drain', room: 'drain', text: '雨水幹渠。腳下的黑水泛著一層淡藍色的光，順著水流的方向——流向市區。', sound: 'groan',
      monologue: '（我們沿著 KY 走過的路離開工廠。它比我們早三週出發。）' },
    { id: 'g5-t-street', room: 'street1', text: '外環道路。車輛橫陳，有幾輛還在燒。路障後面立著一面鎮暴盾——盾牌後面的東西，還穿著制服。', alert: true, shake: 0.06,
      monologue: '（路障是朝市區那一側架的。他們防的從來不是病毒出去——是人出去。）' },
    { id: 'g5-t-gas', room: 'gas', text: '加油站。頂棚的燈忽明忽暗，油槍垂在地上。值班台的收音機沙沙作響，只剩雜訊。', sound: 'door',
      monologue: '（廣播電台也斷了。電視、網路、電話、廣播——晨星切斷的不是訊號，是整座城市喊救命的聲音。）' },
    { id: 'g5-t-office', room: 'office', text: '辦公室的日光燈還亮著——整條街唯一正常的一盞燈。桌上的泡麵還沒拆。',
      monologue: '（值班的人走得很急。或者，沒能走。）' },
    { id: 'g5-t-alley', room: 'alley', text: '後巷。圍籬上的鐵絲網在夜風裡輕輕晃。圍籬外，商店街的方向有一盞燈還亮著。', sound: 'dogbark',
      monologue: '（有燈就可能有人。有人就可能有倖存者——或者，有守著倖存者的東西。）' },
  ],
  entities: {
    pickups: [
      { id: 'g5-p-ammo1', item: 'handgun_ammo', count: 15, x: 2.5, z: 1 },
      { id: 'g5-p-herb1', item: 'green_herb', count: 1, x: 1, z: 9 },
      { id: 'g5-p-shells1', item: 'shotgun_shells', count: 7, x: 5, z: 1.5 },
      { id: 'g5-p-blue1', item: 'blue_herb', count: 1, x: 9.8, z: 6.5 },      // 積水旁（解 slime 中毒）
      { id: 'g5-p-ammo2', item: 'handgun_ammo', count: 15, x: 18, z: 6.5 },
      { id: 'g5-p-smgammo1', item: 'smg_ammo', count: 30, x: 20.9, z: 6.2 },  // 路障（鎮暴隊員遺物）
      { id: 'g5-p-spray1', item: 'first_aid_spray', count: 1, x: 8.2, z: 12.8 },
      { id: 'g5-p-boltcutter', item: 'boltcutter', count: 1, x: 19.4, z: 11.4 }, // ★ 辦公室工具架
      { id: 'g5-p-shells2', item: 'shotgun_shells', count: 7, x: 17, z: 12.2 },
      { id: 'g5-p-herb2', item: 'green_herb', count: 1, x: 26.6, z: 1.5 },
      { id: 'g5-p-blue2', item: 'blue_herb', count: 1, x: 24.3, z: 10.8 },
    ],
    enemies: [
      { id: 'g5-ironmask', type: 'ironmask', x: 20, z: 3.5 }, // ★ 鐵面・鎮暴隊長守路障
      { id: 'g5-z1', type: 'zombie', x: 7, z: 3 },            // 街上的居民感染者
      { id: 'g5-z2', type: 'zombie', x: 11, z: 6 },
      { id: 'g5-z3', type: 'zombie', x: 16, z: 5.5 },
      { id: 'g5-dog1', type: 'dog', x: 9, z: 1.5 },
      { id: 'g5-z4', type: 'zombie', x: 11, z: 12 },          // 加油站
      { id: 'g5-mutant1', type: 'mutant', x: 13.5, z: 10.5 },
      { id: 'g5-z5', type: 'zombie', x: 25, z: 7 },           // 後巷
      { id: 'g5-dog2', type: 'dog', x: 26, z: 3 },
    ],
    typewriters: [
      { id: 'g5-tw-drain', x: 0.7, z: 0.8 },
      { id: 'g5-tw-office', x: 16, z: 8.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
