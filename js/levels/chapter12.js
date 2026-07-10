// 第十二章〈電信機房〉：紅色訊號燈的盡頭。三個晚上追著的希望在交換機室斷頭——
// 晨星早在爆發前一週就裝好阻斷器，全市固網被預謀斬首。但監控室的配線圖顯示：
// 河對岸的電視轉播站微波鏈路點對點、獨立供電、不入管線——還活著。
// 威脅：線纜井是潛伏者的巢（lurker ×3）＋晨星回頭搜索的小隊（agent ×3）。推進：監控室文件取得配線圖（linemap）。
export const CHAPTER12 = {
  id: 'chapter12',
  name: '第十二章：電信機房',
  next: 'chapter13',
  exitNeeds: 'linemap',
  exitHint: '機房側門通往河堤。但沒有配線圖，過了河也只是亂闖——監控室整面牆的線路圖上，一定畫著那條還活著的鏈路',
  spawn: { x: 1.5, z: 4, yaw: Math.PI / 2 }, // 機房大廳西側入口，面向東
  lockNames: { linemap: '微波鏈路配線圖', chapterExit: '機房側門' },
  story: [
    '夜市的鐵門在身後轟然落下，隔開了脹屍的哭腔。\n\n電信大樓就在兩條街外——十二層樓，一整面黑玻璃，全暗著。只有三樓的一扇窗裡，一顆紅色的訊號燈，安安靜靜地亮著。\n\n「備援電源。」欣儀的聲音有點抖，不是怕，「全市斷電三個晚上，它還亮著。」\n\n亮均按了按背包裡的隨身碟。名單、協議、錄音——三個晚上、十條街換來的全部。\n\n（把它插進去，按下上傳。就結束了。）',
    '交換機室。機櫃陣列還在嗡嗡作響。\n\n內網登入：成功。憑證掛載：成功。上傳——3%。\n\n中斷。\n\n重試。中斷。再重試。螢幕上跳出一行冷冷的字：「外部鏈路：無回應（0/4）」。\n\n亮均沿著光纖槽道往上找。四條對外光纖，整整齊齊地接進一個機櫃頂上多出來的黑色盒子——盒身噴著晨星的星徽，狀態燈安穩地綠著。\n\n（阻斷器。全黑鴉市的固網，在這個盒子裡被斬了首。）',
    '欣儀順著機櫃滑坐到地上。\n\n「三個晚上……」她的聲音碎在機房的嗡鳴裡，「我們拚了三個晚上，他們一個盒子就……」\n\n亮均盯著那顆安穩的綠燈，忽然轉身，看向監控室的方向。\n\n「盒子切的是固網。」他說，「但監控室有全市的線路圖。晨星的工單是照著圖開的——」\n\n（那就找出一條，不在他們圖上的線。）',
  ],
  endingText:
    '側門推開，河風灌進機房，帶著水腥味和一絲燒焦的甜。配線圖折在亮均胸前的口袋裡——河對岸，黑鴉轉播站的方向，一點紅光在丘頂一下一下地閃。欣儀順著河堤望向下游：跨河大橋的橋面上，有燈光在移動。不是路燈——路燈三個晚上前就死了。是探照燈，一小時掃一輪。「檢查哨。」她輕聲說。過河只有一條路，而那條路上，有人拿著槍在等。〔續　第十三章〕',
  objective: '把證據接上內網上傳——若鏈路已斷，就在監控室找出還活著的節點',
  rooms: [
    { id: 'hall', name: '機房大廳', x: 0, z: 0, w: 10, d: 8, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 5, y: 3, z: 4, color: 0xc0c8d8, intensity: 18, flicker: true } }, // 備援電源的慘白燈
    { id: 'switch', name: '交換機室', x: 10, z: 0, w: 10, d: 8, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 15, y: 2.8, z: 4, color: 0x9fd0e0, intensity: 20 } }, // 機櫃陣 LED 冷光
    { id: 'shaft', name: '線纜井', x: 20, z: 0, w: 4, d: 12, h: 5, floor: 'metal', walls: 'metal',
      light: { x: 22, y: 4.5, z: 6, color: 0x557766, intensity: 10, flicker: true } }, // 井口垂下的工作燈
    { id: 'ups', name: 'UPS 室', x: 10, z: 8, w: 6, d: 6, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 13, y: 2.6, z: 11, color: 0xff7744, intensity: 14, flicker: true } }, // 燒過的應急燈
    { id: 'monitor', name: '監控室', x: 16, z: 8, w: 4, d: 6, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 18, y: 2.8, z: 11, color: 0x9fd0e0, intensity: 22 } }, // 監看牆藍光
  ],
  doors: [
    { id: 'd12-hall-switch', from: 'hall', to: 'switch', axis: 'z', at: [10, 4], width: 1.4, height: 2.4, lock: null },
    { id: 'd12-switch-shaft', from: 'switch', to: 'shaft', axis: 'z', at: [20, 3], width: 1.2, height: 2.2, lock: null },
    { id: 'd12-switch-ups', from: 'switch', to: 'ups', axis: 'x', at: [13, 8], width: 1.2, height: 2.2, lock: null },
    { id: 'd12-ups-monitor', from: 'ups', to: 'monitor', axis: 'z', at: [16, 11], width: 1.1, height: 2.1, lock: null },
    { id: 'd12-monitor-shaft', from: 'monitor', to: 'shaft', axis: 'z', at: [20, 10], width: 1.1, height: 2.1, lock: null },
    { id: 'd12-exit', from: 'shaft', to: null, axis: 'x', at: [22, 12], width: 1.4, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 機房大廳：值班台與傾倒的接待區
    { room: 'hall', type: 'table', x: 5, z: 2.5, solid: 0.5 },       // 值班台
    { room: 'hall', type: 'papers', x: 5.2, z: 2.7 },
    { room: 'hall', type: 'chair_fallen', x: 3.5, z: 3.3, rot: 2.0 },
    { room: 'hall', type: 'shelf', x: 9.6, z: 5.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'hall', type: 'blood', x: 7, z: 4.2 },
    { room: 'hall', type: 'cardboard', x: 2, z: 6.8 },
    { room: 'hall', type: 'debris', x: 6.5, z: 7.3 },
    // 交換機室：機櫃陣（架代替）留出中央走道
    { room: 'switch', type: 'shelf', x: 12.5, z: 2, solid: 0.28 },
    { room: 'switch', type: 'shelf', x: 12.5, z: 6, solid: 0.28 },
    { room: 'switch', type: 'shelf', x: 15, z: 2, solid: 0.28 },
    { room: 'switch', type: 'shelf', x: 15, z: 6, solid: 0.28 },
    { room: 'switch', type: 'shelf', x: 17.5, z: 2, solid: 0.28 },
    { room: 'switch', type: 'crate', x: 19, z: 6.8, solid: 0.4 },   // 晨星施工留下的器材箱
    { room: 'switch', type: 'papers', x: 15.2, z: 2.4 },
    { room: 'switch', type: 'blood', x: 14, z: 3.8 },
    { room: 'switch', type: 'corpse', x: 16.5, z: 4.5, variant: 2 }, // 被拖下天花板的晨星隊員
    { room: 'switch', type: 'debris', x: 11, z: 1.2 },
    // 線纜井：成束的電纜垂直井
    { room: 'shaft', type: 'pipe', x: 20.6, z: 6, len: 11, y: 3, rot: Math.PI / 2 },
    { room: 'shaft', type: 'pipe', x: 23.4, z: 6, len: 11, y: 4.2, rot: Math.PI / 2 },
    { room: 'shaft', type: 'debris', x: 22, z: 5 },
    { room: 'shaft', type: 'blood', x: 21.5, z: 2.5 },
    { room: 'shaft', type: 'bodybag', x: 23.2, z: 3.2, rot: 0.6 },
    { room: 'shaft', type: 'corpse', x: 21, z: 9.5, variant: 0 },
    // UPS 室：燒過的電池櫃
    { room: 'ups', type: 'shelf', x: 10.4, z: 12, rot: Math.PI / 2, solid: 0.28 }, // 電池櫃
    { room: 'ups', type: 'barrel', x: 11, z: 9.2, solid: 0.35 },
    { room: 'ups', type: 'crate', x: 15.4, z: 13.4, solid: 0.4 },
    { room: 'ups', type: 'chair_fallen', x: 12, z: 10.8, rot: 1.8 },
    { room: 'ups', type: 'blood', x: 13, z: 10.2 },
    { room: 'ups', type: 'debris', x: 14, z: 13 },
    // 監控室：監看牆與控制台
    { room: 'monitor', type: 'table', x: 18, z: 10.5, solid: 0.5 },
    { room: 'monitor', type: 'papers', x: 18.2, z: 10.7 },
    { room: 'monitor', type: 'shelf', x: 19.6, z: 12.8, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'monitor', type: 'chair_fallen', x: 17, z: 11.5, rot: 2.4 },
    { room: 'monitor', type: 'blood', x: 16.8, z: 13.3 },
  ],
  // 機房危險：斷落電纜（shock 特多）＋UPS 電池火場
  hazards: [
    { room: 'hall', type: 'shock', x: 4, z: 7, r: 0.8 },       // 天花板垂落的斷纜
    { room: 'switch', type: 'shock', x: 16, z: 6, r: 0.85 },   // 被扯斷的機櫃跳線泡在冷凝水裡
    { room: 'shaft', type: 'shock', x: 21, z: 6, r: 0.9 },     // 井底裸露的饋線
    { room: 'shaft', type: 'slime', x: 23, z: 10.8, r: 0.75 }, // 順著井壁滲下來的 KY
    { room: 'ups', type: 'fire', x: 14.5, z: 12.5, r: 0.9 },   // 電池櫃悶燒
    { room: 'ups', type: 'fire', x: 11.5, z: 9.5, r: 0.8 },
  ],
  documents: [
    {
      id: 'g12-doc-workorder', title: '晨星工單：外部鏈路阻斷器安裝', x: 15, z: 2.5,
      text: '工單編號：MS-0993\n項目：黑鴉市電信機房　固網外部鏈路阻斷器（×4）安裝\n狀態：已完成\n施工備註：夜間施工，勿驚動值機人員。對外說法：「例行防雷改造」。\n\n（工單右上角的日期——比 E 區出事，早了整整七天。）\n\n（不是應變，是佈景。病毒還沒出廠，斷頭台就先架好了。他們從一開始就沒打算讓這座城市喊出聲。）',
    },
    {
      id: 'g12-doc-log', title: '夜班值機日誌（最後三筆）', x: 9.4, z: 5.3,
      text: '22:41　全市語音中繼量暴增 40 倍，交換容量告警。研判：重大災害，市民大量撥打求救電話。\n23:05　對外四條光纖鏈路同時中斷。切備援——備援也是斷的。這不可能是故障。\n23:37　收到上級專線指示：「維持現狀、不回應、不轉接、等待接管。」……接管的人到了。穿黑衣服。他們數了數我們有幾個人。\n\n（日誌到這裡就停了。「等待接管」——被接管的不是機房，是值機員。）',
    },
    {
      id: 'g12-doc-photo', title: '抽屜裡的合照（值機員與貓）', x: 4.7, z: 2.4, monoAfter: true,
      text: '（值班台抽屜深處有一張護貝過的照片：機櫃前，值機員蹲著，一隻橘貓踩在他的肩膀上，尾巴掃過他的耳朵。兩個都瞇著眼。）\n\n（背面用簽字筆寫著：）\n\n「阿橘，本機房編制外值班員。牠聽得懂警報聲，比人早三秒躲。」\n\n（抽屜半開著，底下的貓糧袋被咬破，撒了一地。機房裡沒有貓。）\n\n（比人早三秒躲。希望這一次，牠也是。）',
    },
    {
      id: 'g12-doc-ups', title: 'UPS 電池更換申請單（第三次駁回）', x: 12.5, z: 12.8,
      text: '申請單位：機房值機組\n事由：UPS 電池組已逾使用年限，內阻超標，高負載時有熱失控風險。第三次申請更換。\n審核意見：成本考量，延後至下一季度。另：請申請人檢討「重複申請」造成之行政負擔。\n\n（然後停電來了，UPS 扛著全市最後一盞紅燈燒了自己。）\n\n（燒起來的永遠是被「延後至下一季度」的東西——和簽了名申請過三次的那個人。）',
    },
    {
      id: 'g12-doc-linemap', title: '全市傳輸網路配線圖（監控室牆面）', x: 18, z: 10.2, grantsKey: 'linemap',
      text: '（整面牆的配線圖上，固網節點被監控系統標成一片死紅。只有東北角，一條虛線越過河面——）\n\n鏈路編號：MW-01「黑鴉轉播站　微波鏈路」\n形式：點對點微波，7.2 GHz，不經地下管線\n電源：轉播站自有機組，獨立供電\n\n（旁邊有值機員的手寫註記：「全市只有這條不歸我們管——也就是說，誰都切不到它。」）\n\n（晨星的工單照著管線圖開。不在管線圖上的東西，他們的剪刀構不到。）\n\n（河對岸。還有一條活著的線。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 17, z: 12.5, yaw: 0, room: 'monitor',
      dialog: [
        '（欣儀盯著交換機室的方向，眼眶是紅的）三個晚上。十條街。我們拚了三個晚上，他們一張工單就……（她深吸一口氣，沒讓聲音碎掉）',
        '阻斷器的施工日期你看到了嗎？爆發前一週。他們切斷這座城市的時候，病毒都還沒出廠。',
        '（她忽然停住，手指抵在牆面的線路圖上）等等。這條……微波鏈路。轉播站的微波不走固網——它是點對點的，獨立供電。阻斷器摸不到它。',
        '河對岸。黑鴉電視轉播站。晨星的工單上沒有它——因為它根本不在地下管線圖裡。他們剪得再乾淨，也剪不到天上的訊號。',
        '（她把配線圖折好，塞進亮均手裡，眼睛重新亮了起來）還有一條線。過河。',
      ],
      dialogAfter: '（欣儀收拾背包，往線纜井的方向瞥了一眼）井裡的天花板不要盯太久——上面那些影子會動。走側門，沿河堤往下游。',
      gift: [
        { item: 'handgun_ammo', count: 15 },
        { item: 'first_aid_spray', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g12-t-hall', room: 'hall', text: '機房大廳。備援電源的紅色訊號燈還亮著——整條街追著它走了一夜的那盞燈。',
      monologue: '（還有電，就還有機會。三個晚上換來的東西，今晚要送出去。）' },
    { id: 'g12-t-switch', room: 'switch', text: '交換機室。機櫃陣列在黑暗裡嗡嗡作響——最上層的線纜槽道，有東西爬過的聲音。', sound: 'groan', alert: true,
      monologue: '（機櫃還活著，鏈路卻是死的。晨星殺一座城市，不用碰任何人——剪四條光纖就夠了。）' },
    { id: 'g12-t-shaft', room: 'shaft', text: '線纜井。成束的電纜從十二公尺高的井口垂下來，像什麼東西的巢。頭頂上，影子在動。', alert: true, shake: 0.06 },
    { id: 'g12-t-ups', room: 'ups', text: 'UPS 室。電池櫃燒過一輪，焦味還沒散。焦味底下——有無線電的沙沙聲。晨星的搜索隊，回頭了。', alert: true,
      monologue: '（他們回來檢查阻斷器。也就是說——他們也知道，有什麼東西還漏著。）' },
    { id: 'g12-t-monitor', room: 'monitor', text: '監控室。整面牆的線路圖上，全市的節點一顆一顆熄成紅色——只有河對岸，有一顆還是綠的。',
      monologue: '（一顆綠燈。整座黑鴉市最後一顆綠燈，在河的對岸。）' },
  ],
  entities: {
    pickups: [
      { id: 'g12-p-ammo1', item: 'handgun_ammo', count: 15, x: 2.5, z: 1.5 },
      { id: 'g12-p-herb1', item: 'green_herb', count: 1, x: 8.8, z: 7.2 },
      { id: 'g12-p-shells1', item: 'shotgun_shells', count: 7, x: 2.6, z: 7.6 },
      { id: 'g12-p-shells2', item: 'shotgun_shells', count: 7, x: 11, z: 6.5 },
      { id: 'g12-p-smgammo1', item: 'smg_ammo', count: 30, x: 19, z: 1 },       // 晨星隊員遺物
      { id: 'g12-p-spray1', item: 'first_aid_spray', count: 1, x: 11, z: 13.2 },
      { id: 'g12-p-ammo2', item: 'handgun_ammo', count: 15, x: 15.2, z: 8.8 },
      { id: 'g12-p-shells3', item: 'shotgun_shells', count: 7, x: 19.3, z: 13.3 },
      { id: 'g12-p-red1', item: 'red_herb', count: 1, x: 16.6, z: 9.2 },
      { id: 'g12-p-blue1', item: 'blue_herb', count: 1, x: 23.2, z: 4 },         // 井壁滲液旁
      { id: 'g12-p-herb2', item: 'green_herb', count: 1, x: 20.8, z: 11.2 },
      { id: 'g12-p-magammo1', item: 'magnum_ammo', count: 6, x: 23.4, z: 7.5 },  // 井底屍體旁
    ],
    enemies: [
      { id: 'g12-lurker1', type: 'lurker', x: 22, z: 2 },     // ★ 線纜井天花板的巢
      { id: 'g12-lurker2', type: 'lurker', x: 22, z: 9 },
      { id: 'g12-lurker3', type: 'lurker', x: 18, z: 2 },     // 沿槽道爬進交換機室
      { id: 'g12-agent1', type: 'agent', x: 14, z: 5 },        // ★ 晨星回頭搜索的小隊
      { id: 'g12-agent2', type: 'agent', x: 18, z: 12 },
      { id: 'g12-agent3', type: 'agent', x: 13, z: 11 },
      { id: 'g12-z1', type: 'zombie', x: 7, z: 6 },            // 湧進大廳的感染者
      { id: 'g12-z2', type: 'zombie', x: 6, z: 1.5 },
      { id: 'g12-z3', type: 'zombie', x: 12, z: 2 },
    ],
    typewriters: [
      { id: 'g12-tw-hall', x: 0.8, z: 0.8 },
      { id: 'g12-tw-monitor', x: 19.4, z: 8.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
