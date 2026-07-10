// 第二十一章〈手術中心〉：醫院篇魔王關。院長合約裡的「特殊項目」就在這道氣密門後面——
// 無影燈慘白、地上是血，機械臂還在自顧自地縫合。魔王：縫合醫師(stitcher)，白博士的作品，
// 拉開距離牠會自我縫合回血，要貼身壓制、重擊打斷。麻醉科醫師宗翰重傷躲在器械室，告知弱點。
// 手術指示末尾提到「B4 隔離區的雙生體」——路，繼續往下。
export const CHAPTER21 = {
  id: 'chapter21',
  name: '第二十一章：手術中心',
  next: 'chapter22',
  exitNeeds: 'surgkey',
  exitHint: '通往下一層的氣密門要手術中心鑰匙——恢復室的無影燈底下，護理車上似乎有一把',
  spawn: { x: 2, z: 1.5, yaw: Math.PI / 2 }, // 刷手區西側，面向東
  lockNames: { surgkey: '手術中心鑰匙', chapterExit: '手術中心氣密門' },
  isBossLevel: true,
  story: [
    '氣密門在身後合上，發出一聲真空般的悶響。\n\n消毒水的氣味濃得嗆人，白得發青的無影燈從天花板一整排壓下來，把整個刷手區照得沒有一絲陰影。不鏽鋼的洗手槽一字排開，龍頭還在滴水，牆上的手術排程白板寫得滿滿的。\n\n地上有血。不是濺的，是拖的——從更衣間一路拖進手術房，像有人被清醒地拉進去。\n\n（合約上寫「由乙方指定醫師執行，院方不予過問」。）\n\n（現在，我要去見這位醫師了。）',
    '第一手術房的門是半開的。\n\n裡面的無影燈全開著，照著手術台上一具已經不成人形的軀體。而站在台邊的，穿著沾滿黑血的手術袍，戴著口罩和頭燈——不是人。\n\n牠的雙臂從手肘以下換成了一組組機械臂，末端是持針器、止血鉗、還在滴血的手術刀。牠低著頭，專注地在自己身上縫合，一針一針，把方才被打開的傷口重新閉合，動作精準得像在做一台不容出錯的手術。\n\n頭燈的光轉過來，照在亮均臉上。\n\n（牠把我，也看成一台待處理的手術了。）',
    '器械室的門縫裡，有人用氣音喊他。\n\n一個穿著髒污刷手服的男人癱坐在器械櫃之間，大腿被縫合線草草縫過，血還在滲。他是這裡的麻醉科醫師，宗翰——白博士下令改造的「作品」裡，他是唯一逃出來、還記得自己是誰的人。\n\n「別……別跟牠拉開距離。」他喘著氣抓住亮均的手，「牠一離開你的攻擊範圍，那些機械臂就會開始縫自己——傷多重都能縫回去。你退一步，牠就活一次。」\n\n「要贏，只有貼上去，往死裡壓，趁牠縫合的空檔重擊打斷。別讓牠有一秒鐘，能好好『做手術』。」',
  ],
  endingText:
    '縫合醫師最後一次舉起機械臂，卻再也找不到可以縫合的完整皮膚——牠的動作慢下來，持針器空扎了幾下，像一台耗盡程式的機器，緩緩伏倒在自己的手術台上。無影燈依舊慘白地照著。宗翰靠著器械櫃喘息，把一把染血的鑰匙塞給亮均，又指了指手術台旁那疊被血浸透的手術指示。亮均翻到最後一頁，白博士的字跡清楚得刺眼：「本例縫合體之再生機制已驗證成功，下一階段——移轉 B4 隔離區，用於『雙生體』之交叉縫合實驗。」B4。又是往下一層。恢復室的氣密門在鑰匙轉動下解鎖，冷氣從門縫裡灌出來，帶著更深、更冷的那股甜味。〔續　第二十二章〕',
  objective: '壓制縫合醫師、取得手術中心鑰匙，前往 B4 隔離區',
  rooms: [
    { id: 'scrub', name: '刷手區', x: 0, z: 0, w: 8, d: 7, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 4, y: 2.9, z: 3.5, color: 0xd8f0ff, intensity: 24, flicker: true } }, // 慘白冷光
    { id: 'or1', name: '第一手術房', x: 8, z: 0, w: 11, d: 9, h: 4, floor: 'tile', walls: 'metal',
      light: { x: 13.5, y: 3.6, z: 4.5, color: 0xf0faff, intensity: 34 } }, // 無影燈——刺眼慘白
    { id: 'or2', name: '第二手術房', x: 8, z: 9, w: 11, d: 8, h: 4, floor: 'tile', walls: 'metal',
      light: { x: 13.5, y: 3.6, z: 13, color: 0xe0f4ff, intensity: 30 } },
    { id: 'recovery', name: '恢復室', x: 0, z: 7, w: 8, d: 10, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 4, y: 2.9, z: 12, color: 0xcfe0ff, intensity: 20, flicker: true } },
    { id: 'instr', name: '器械室', x: 19, z: 4, w: 6, d: 9, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 22, y: 2.7, z: 8.5, color: 0xc0d0d8, intensity: 16, flicker: true } },
  ],
  doors: [
    { id: 'd21-scrub-or1', from: 'scrub', to: 'or1', axis: 'z', at: [8, 3], width: 1.4, height: 2.4, lock: null },
    { id: 'd21-or1-or2', from: 'or1', to: 'or2', axis: 'x', at: [13.5, 9], width: 1.4, height: 2.4, lock: null },
    { id: 'd21-scrub-rec', from: 'scrub', to: 'recovery', axis: 'x', at: [4, 7], width: 1.3, height: 2.3, lock: null },
    { id: 'd21-rec-or2', from: 'recovery', to: 'or2', axis: 'z', at: [8, 12], width: 1.3, height: 2.3, lock: null },
    { id: 'd21-or1-instr', from: 'or1', to: 'instr', axis: 'z', at: [19, 6], width: 1.2, height: 2.2, lock: null },
    { id: 'd21-exit', from: 'recovery', to: null, axis: 'x', at: [4, 17], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 刷手區：不鏽鋼洗手槽、更衣櫃、排程白板、拖行血痕
    { room: 'scrub', type: 'table', x: 6, z: 2, rot: 0, solid: 0.7 },        // 洗手槽台
    { room: 'scrub', type: 'shelf', x: 1.5, z: 3.5, rot: Math.PI / 2, solid: 0.28 }, // 更衣櫃
    { room: 'scrub', type: 'papers', x: 6, z: 2 },
    { room: 'scrub', type: 'blood', x: 4.5, z: 5.5 },
    { room: 'scrub', type: 'blood', x: 6.5, z: 5 },
    { room: 'scrub', type: 'bodybag', x: 2, z: 6, rot: 0.4 },
    // 第一手術房：手術台（魔王場）、器械托盤、無影燈柱、麻醉機
    { room: 'or1', type: 'table', x: 13.5, z: 4, rot: 0, solid: 0.9 },       // 中央手術台
    { room: 'or1', type: 'crate', x: 10, z: 2, solid: 0.4 },                 // 麻醉機
    { room: 'or1', type: 'shelf', x: 18.5, z: 2, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'or1', type: 'blood', x: 13.5, z: 6 },
    { room: 'or1', type: 'blood', x: 11, z: 7 },
    { room: 'or1', type: 'corpse', x: 16, z: 7, variant: 2 },
    { room: 'or1', type: 'debris', x: 10, z: 6.5 },
    // 第二手術房：另一張手術台、翻倒的器械車、堆置的屍袋
    { room: 'or2', type: 'table', x: 13.5, z: 12.5, rot: 0, solid: 0.9 },
    { room: 'or2', type: 'chair_fallen', x: 11, z: 14, rot: 1.5 },
    { room: 'or2', type: 'bodybag', x: 16.5, z: 14, rot: 0.2 },
    { room: 'or2', type: 'bodybag', x: 17.2, z: 15, rot: 2.1 },
    { room: 'or2', type: 'blood', x: 13, z: 15 },
    { room: 'or2', type: 'papers', x: 10, z: 11 },
    // 恢復室：成排病床（table 代表）、點滴架、護理車（放鑰匙）
    { room: 'recovery', type: 'table', x: 2, z: 9, rot: 0, solid: 0.6 },
    { room: 'recovery', type: 'table', x: 6, z: 9, rot: 0, solid: 0.6 },
    { room: 'recovery', type: 'table', x: 2, z: 13, rot: 0, solid: 0.6 },
    { room: 'recovery', type: 'shelf', x: 6.5, z: 15, rot: -Math.PI / 2, solid: 0.28 }, // 護理車
    { room: 'recovery', type: 'blood', x: 4, z: 11 },
    { room: 'recovery', type: 'chair_fallen', x: 5, z: 12.5, rot: 0.8 },
    // 器械室：器械櫃陣（宗翰躲在中間）、消毒鍋、碎金屬
    { room: 'instr', type: 'shelf', x: 20, z: 5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'instr', type: 'shelf', x: 20, z: 7, rot: Math.PI / 2, solid: 0.28 },
    { room: 'instr', type: 'shelf', x: 24, z: 6, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'instr', type: 'shelf', x: 24, z: 11, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'instr', type: 'papers', x: 22, z: 12 },
    { room: 'instr', type: 'debris', x: 21.5, z: 10 },
  ],
  hazards: [
    { room: 'scrub', type: 'slime', x: 3, z: 5.8, r: 0.8 },
    { room: 'or1', type: 'slime', x: 11, z: 7.5, r: 0.85 },    // 手術台下的積血黏液
    { room: 'or1', type: 'shock', x: 10, z: 2.5, r: 0.75 },    // 麻醉機漏電
    { room: 'or2', type: 'slime', x: 16, z: 15, r: 0.8 },
    { room: 'recovery', type: 'shock', x: 3, z: 14, r: 0.8 },  // 點滴監視器短路
    { room: 'instr', type: 'fire', x: 22, z: 12.5, r: 0.85 },  // 消毒鍋過熱起火
  ],
  documents: [
    {
      id: 'g21-doc-schedule', title: '手術排程白板（抄錄）', x: 6, z: 1.8,
      text: '【手術中心・特殊項目　排程】\n\n案號 SC-07：檢體改造手術，供體「反映書名單 No.3」，狀態——完成。\n案號 SC-08：檢體改造手術，供體「反映書名單 No.7」，狀態——完成。\n案號 SC-09：縫合體自癒機制驗證，狀態——進行中。\n\n（「檢體」。「供體」。他們連在白板上，都不肯寫一個「人」字。）\n（No.3、No.7——院長那份反映書名單上，簽名反映真相的護理師。說真話的人，被送上了手術台。）',
    },
    {
      id: 'g21-doc-order', title: '白博士的手術指示', x: 13.5, z: 3.5,
      text: '【致執刀單位　手術指示　白博士 親筆】\n\n一、縫合體之機械臂須維持全時供電，脫離供體後仍應自主縫合，以驗證再生極限。\n二、實驗中不得投予麻醉。清醒狀態下之縫合，數據較完整。\n三、本例（SC-09）如驗證成功，下一階段移轉 B4 隔離區，用於「雙生體」之交叉縫合實驗。\n\n（「不得投予麻醉」。「數據較完整」。）\n（縫合醫師不是怪物變的。牠是被一份像這樣的指示，一針一針，做出來的。）',
    },
    {
      id: 'g21-doc-photo', title: '器械室抽屜的千例合照', x: 23, z: 8, monoAfter: true,
      text: '（器械室的抽屜裡，壓著一張裱框的合照。手術室全體圍著一塊蛋糕，上面插著「本院手術突破一萬例　感謝每一雙手」的牌子。）\n\n（前排中央那位主刀醫師笑得很自豪，兩旁的護理師、麻醉師、刷手護士，每個人都比著讚。角落那個年輕的麻醉科醫師，認得出來——是現在癱在器械櫃裡的宗翰。）\n\n（照片背面寫著：）\n\n「一萬台手術，一萬次把人從鬼門關拉回來。這雙手，只做救人的事。——手術室全體」\n\n（同樣的一雙手，同樣的一間手術房。他們把「救人」的地方，改成了「拆人」的地方，只花了幾個月。）',
    },
    {
      id: 'g21-doc-anesth', title: '宗翰的麻醉紀錄（撕頁）', x: 3, z: 10,
      text: '（一張被血浸透、又撕下來的麻醉紀錄，字跡到後面幾乎握不住筆：）\n\n「他們要我對清醒的病人開麻醉機，卻不准我推藥。只是要那台機器的聲音，讓門外的人以為一切正常。\n\n第三天，我把麻醉劑偷偷推進了一個孩子的點滴，讓他至少睡著。\n\n他們發現了。\n\n所以現在，躺在台上的，換成我的同事。而我，被縫在了這裡。」',
    },
  ],
  npcs: [
    {
      id: 'anesth',
      name: '宗翰',
      x: 22, z: 8, yaw: -Math.PI / 2, room: 'instr',
      dialog: [
        '（他抓住你的手腕，掌心全是冷汗）你要去對付牠？聽我說，我是這裡的麻醉醫師……曾經是。那東西，是白博士拿我們幾個改造出來的。',
        '牠的機械臂能自己縫合。只要你一離開牠的攻擊範圍，那些持針器就會開始修補牠身上的傷——你打得再重，牠退兩步就縫回來了。',
        '所以千萬別退。貼死牠，壓在牠身上打，趁牠抬起手要縫合的那一瞬間，一記重擊打斷牠。別讓牠有空檔「做手術」，牠就贏不了。',
        '牠不投麻醉的……牠對躺上台的人，一針都不肯浪費在止痛上。（他咬牙）我親眼看著。所以你動手的時候，不用可憐牠——牠早就不是被綁在台上的那個人了。',
        '這個給你，藍色的草藥能解那些黏液的毒，麥格農的彈你會用得上。我腿廢了，跟不上你。把牠了結，然後……別回頭，往 B4 走。答案都在下面。',
      ],
      dialogAfter: '（宗翰把頭靠回冰冷的器械櫃）我在這撐著。你去把那扇門後面的事，做個了結。',
      gift: [
        { item: 'blue_herb', count: 1 },
        { item: 'magnum_ammo', count: 6 },
      ],
    },
  ],
  triggers: [
    { id: 'g21-t-scrub', room: 'scrub', text: '刷手區。無影燈把一切照得沒有陰影，龍頭還在滴水。地上一道拖行的血痕，通向手術房。', alert: true,
      monologue: '（血是拖進去的，不是抬進去的。被拖的那個人，當時還是清醒的。）' },
    { id: 'g21-t-or1', room: 'or1', text: '第一手術房。無影燈全開。手術台邊站著一個穿手術袍的東西，機械臂正一針一針，縫合牠自己。', alert: true, shake: 0.08, sound: 'groan',
      monologue: '（牠抬起頭，把我也看成了一台待處理的手術。別退——退一步，牠就活一次。）' },
    { id: 'g21-t-or2', room: 'or2', text: '第二手術房。兩張手術台，牆邊堆著沒來得及處理的屍袋，數字標籤還沒撕。', sound: 'groan',
      monologue: '（一號、二號手術房輪流開工。這裡不是在治病，是一條把人拆開的生產線。）' },
    { id: 'g21-t-recovery', room: 'recovery', text: '恢復室。一排空病床，點滴架東倒西歪。護理車最上層，一把染血的鑰匙壓在紗布底下。',
      monologue: '（叫「恢復室」，卻沒有一張床上的人恢復過。他們只是換個房間，繼續被拆解。）' },
    { id: 'g21-t-instr', room: 'instr', text: '器械室。器械櫃之間，一個穿刷手服的男人癱坐著，大腿被粗糙的縫合線草草縫過，還在滲血。',
      monologue: '（他是活人。是這整層樓，除了我以外，唯一還在呼吸、還記得自己名字的人。）' },
  ],
  entities: {
    pickups: [
      { id: 'g21-p-ammo1', item: 'handgun_ammo', count: 15, x: 4, z: 4 },
      { id: 'g21-p-shells1', item: 'shotgun_shells', count: 7, x: 6.5, z: 5.5 },
      { id: 'g21-p-spray1', item: 'first_aid_spray', count: 1, x: 1.5, z: 5 },
      { id: 'g21-p-magammo1', item: 'magnum_ammo', count: 6, x: 10.5, z: 3 },    // 第一手術房
      { id: 'g21-p-blue1', item: 'blue_herb', count: 1, x: 17.5, z: 3 },
      { id: 'g21-p-smgammo1', item: 'smg_ammo', count: 30, x: 11, z: 11.5 },     // 第二手術房
      { id: 'g21-p-green1', item: 'green_herb', count: 1, x: 17, z: 11 },
      { id: 'g21-p-surgkey', item: 'surgkey', count: 1, x: 6.5, z: 15 },         // ★ 恢復室護理車：手術中心鑰匙
      { id: 'g21-p-spray2', item: 'first_aid_spray', count: 1, x: 2, z: 15.5 },
      { id: 'g21-p-magweapon', item: 'magnum_weapon', count: 1, x: 22, z: 6 },   // 器械室獎勵：麥格農
      { id: 'g21-p-magammo2', item: 'magnum_ammo', count: 6, x: 23.5, z: 10 },
      { id: 'g21-p-green2', item: 'green_herb', count: 1, x: 21, z: 5.5 },
    ],
    enemies: [
      { id: 'g21-stitcher', type: 'stitcher', x: 13.5, z: 5 },   // ★ 魔王：縫合醫師（第一手術房）
      { id: 'g21-z1', type: 'zombie', x: 6.5, z: 3 },            // 刷手區被拖進來的
      { id: 'g21-z2', type: 'zombie', x: 5, z: 6 },
      { id: 'g21-mutant1', type: 'mutant', x: 16.5, z: 5 },      // 第一手術房精英
      { id: 'g21-z3', type: 'zombie', x: 11.5, z: 13 },         // 第二手術房
      { id: 'g21-mutant2', type: 'mutant', x: 16, z: 12.5 },
      { id: 'g21-z4', type: 'zombie', x: 3.5, z: 12 },          // 恢復室
      { id: 'g21-z5', type: 'zombie', x: 6, z: 13.5 },
      { id: 'g21-z6', type: 'zombie', x: 22, z: 11 },           // 器械室深處
    ],
    typewriters: [
      { id: 'g21-tw-scrub', x: 1, z: 1 },
      { id: 'g21-tw-recovery', x: 1, z: 16 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
