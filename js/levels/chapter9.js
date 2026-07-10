// 第九章〈黑鴉分局〉：豎井爬上來是分局後巷——停電的城市裡，分局還有燈。
// 但燈下沒有秩序：無線電最後的命令是「全部移交晨星指揮」，警力被繳械、被調離、被留下。
// 拘留室裡反鎖自保的老員警「老周」是最後的證人；軍械室還鎖著沒被搬走的火力（支線）。
// 魔王：警笛融合嘶吼者（howler）盤踞通訊室，尖嘯會驚動全場敵人；前庭有鎮暴變異（ironmask）巡守。
export const CHAPTER9 = {
  id: 'chapter9',
  name: '第九章：黑鴉分局',
  next: 'chapter10',
  exitNeeds: 'copkey',
  exitHint: '分局正門被鎮暴車堵死，只能走後門——後門鑰匙照規定掛在通訊室的鑰匙板上。通訊室裡那個聲音，得先想辦法',
  spawn: { x: 7, z: 1, yaw: Math.PI }, // 分局前庭北側（後巷豎井出口），面向分局大門
  lockNames: { copkey: '分局後門鑰匙', armorykey: '軍械室鑰匙', chapterExit: '分局後門' },
  story: [
    '黑鴉分局的藍白燈箱，是停電後亮均見過最亮的東西。\n\n前庭停著一輛燒剩骨架的巡邏車，火還沒熄透。旗桿上的旗子降了一半，卡在那裡——降旗降到一半，人就不見了。\n\n欣儀靠在門柱上，右手撐著牆。她的左臂現在連袖子都撐不起形狀了。\n\n「分局有發電機，有無線電，有軍械室。」她的聲音在發抖，但語速還是很快，「就算人都撤了，東西也帶不走全部。」\n\n（還有藥。分局一定有急救櫃。）\n\n（但如果分局還安全，為什麼整條街的避難方向，沒有一個箭頭指向這裡？）',
    '大廳的燈亮著，值班台的電話聽筒垂在桌沿，懸空轉著。\n\n報案紀錄攤開在台面上，最後一筆停在晚上九點十四分，字跡越寫越斜：「西平街民眾報案：有人咬人。派○四車前往──」\n\n後面沒有了。\n\n欣儀翻過值班台的無線電，頻道停在一個陌生的編號上。她按下重播，喇叭裡滋滋地吐出最後一段錄音，一個很平靜、平靜得不像深夜的聲音：\n\n「──黑鴉分局全體注意，即刻起本轄區治安事務全部移交晨星工業現場指揮部。武器入庫、警力待命，重複，武器入庫──」\n\n（警察繳械、移交指揮。用一段廣播，一個晚上，一座城市的警徽就變成了晨星的臂章。）',
    '走廊深處，有什麼東西在叫。\n\n那不是人的聲音，也不完全不是——像警笛，卡在人的喉嚨裡拉響，忽高忽低，每一聲都讓整棟樓的黑暗跟著動一下。\n\n欣儀數著間隔：「四十秒一次。它在巡邏——用聲音巡邏。」\n\n拘留室的方向傳來另一個聲音，很小，是金屬敲擊：三短、三長、三短。\n\nSOS。\n\n（有活人。在拘留室裡，用手銬敲欄杆的活人。）\n\n亮均握緊槍。（先找到那個人。整個黑鴉市的警察只剩一個還在敲 SOS——他知道的事，值得我們穿過那個聲音去聽。）',
  ],
  endingText:
    '後門的鎖轉開時，那頭嘶吼者的殘骸還掛在通訊台上，警笛的殘響卡在它裂開的喉嚨裡，滋滋地放完最後一格電。老周不肯走：「總要有人留下來看著分局。等他們回來的時候——不管回來的是人還是公文——要有人作證，黑鴉分局不是自己放下武器的。」他把後門鑰匙塞進亮均手裡，敬了一個很標準的禮。巷子外，欣儀忽然踉蹌了一下，扶牆的右手抓皺了整張通緝公告。她左臂的繃帶滲出來的，已經不是血的顏色——是黑的。仁愛醫院就在兩條街外，急診室的綠色招牌在黑暗裡若隱若現。還來得及。一定還來得及。〔續　第十章〕',
  objective: '進入黑鴉分局，找到後門鑰匙離開——通訊室的怪物守著它',
  rooms: [
    { id: 'yard', name: '分局前庭', x: 0, z: 0, w: 14, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 7, y: 4.6, z: 5.5, color: 0x99bbff, intensity: 26, flicker: true } }, // 分局燈箱＋警示燈
    { id: 'hall', name: '分局大廳', x: 2, z: 7, w: 10, d: 8, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 7, y: 3, z: 11, color: 0xffeecc, intensity: 22, flicker: true } },    // 發電機供電的日光燈
    { id: 'cells', name: '拘留室', x: 12, z: 8.5, w: 5, d: 5, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 14.5, y: 2.6, z: 11, color: 0xaabbcc, intensity: 12, flicker: true } },
    { id: 'armory', name: '軍械室', x: 2, z: 15, w: 5, d: 4.5, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 4.5, y: 2.6, z: 17.2, color: 0xffe8b8, intensity: 16 } },
    { id: 'comms', name: '通訊室', x: 7, z: 15, w: 6, d: 5.5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 10, y: 2.7, z: 17.5, color: 0xff6655, intensity: 13, flicker: true } }, // 故障的警示紅燈
  ],
  doors: [
    { id: 'd9-yard-hall', from: 'yard', to: 'hall', axis: 'x', at: [7, 7], width: 1.8, height: 2.6, lock: null },
    { id: 'd9-hall-cells', from: 'hall', to: 'cells', axis: 'z', at: [12, 11], width: 1.2, height: 2.1, lock: null },
    { id: 'd9-hall-armory', from: 'hall', to: 'armory', axis: 'x', at: [4.5, 15], width: 1.2, height: 2.1, lock: 'armorykey' },
    { id: 'd9-hall-comms', from: 'hall', to: 'comms', axis: 'x', at: [9.5, 15], width: 1.4, height: 2.2, lock: null },
    { id: 'd9-exit', from: 'comms', to: null, axis: 'x', at: [10, 20.5], width: 1.4, height: 2.3, lock: 'chapterExit' },
  ],
  props: [
    // 前庭：燒毀巡邏車、堵正門的鎮暴車、沙包哨
    { room: 'yard', type: 'car', x: 11.2, z: 4.2, rot: -0.35, variant: 2, solid: 1.0 }, // 燒剩骨架的巡邏車
    { room: 'yard', type: 'car', x: 3.2, z: 5.6, rot: 1.75, variant: 1, solid: 1.0 },   // 側翻的鎮暴車
    { room: 'yard', type: 'streetlight', x: 1, z: 0.8 },
    { room: 'yard', type: 'streetlight', x: 13, z: 0.8, dead: true },
    { room: 'yard', type: 'hydrant', x: 0.7, z: 3.5 },
    { room: 'yard', type: 'crate', x: 5.5, z: 6.2, solid: 0.4 },   // 大門前的沙包哨
    { room: 'yard', type: 'crate', x: 8.6, z: 6.3, solid: 0.4 },
    { room: 'yard', type: 'trash', x: 12.8, z: 1.5 },
    { room: 'yard', type: 'corpse', x: 6, z: 5.4 },                // 哨位上的員警
    { room: 'yard', type: 'blood', x: 6.6, z: 4.8 },
    { room: 'yard', type: 'debris', x: 9.5, z: 2.5 },
    // 大廳：值班台、公告欄前的長椅殘骸
    { room: 'hall', type: 'table', x: 7, z: 8.6, solid: 0.5 },     // 值班台
    { room: 'hall', type: 'papers', x: 7.3, z: 8.8 },
    { room: 'hall', type: 'chair_fallen', x: 5.9, z: 9.4, rot: 2.4 },
    { room: 'hall', type: 'shelf', x: 2.4, z: 10.5, rot: Math.PI / 2, solid: 0.28 }, // 檔案架
    { room: 'hall', type: 'cardboard', x: 10.8, z: 12.5 },
    { room: 'hall', type: 'bodybag', x: 3.5, z: 13.8, rot: 0.9 },
    { room: 'hall', type: 'blood', x: 8.5, z: 11.5 },
    { room: 'hall', type: 'debris', x: 10.5, z: 9.5 },
    // 拘留室：老周的堡壘
    { room: 'cells', type: 'cardboard', x: 15.8, z: 9.5 },         // 鋪地的紙板床
    { room: 'cells', type: 'chair_fallen', x: 13, z: 12.8, rot: 1.1 },
    { room: 'cells', type: 'crate', x: 16.2, z: 12.6, solid: 0.4 }, // 他囤的乾糧箱
    { room: 'cells', type: 'blood', x: 12.6, z: 9.2 },
    // 軍械室：槍架與彈藥箱（大多被搬空）
    { room: 'armory', type: 'shelf', x: 2.4, z: 16.5, rot: Math.PI / 2, solid: 0.28 }, // 空槍架
    { room: 'armory', type: 'shelf', x: 6.6, z: 17.8, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'armory', type: 'crate', x: 3.2, z: 18.8, solid: 0.4 },
    { room: 'armory', type: 'crate', x: 5.5, z: 15.6, solid: 0.4 },
    { room: 'armory', type: 'papers', x: 4.2, z: 16 },             // 繳械清冊散落一地
    // 通訊室：無線電台、被撕碎的值機位
    { room: 'comms', type: 'table', x: 8, z: 19.6, solid: 0.5 },   // 通訊台
    { room: 'comms', type: 'papers', x: 8.2, z: 19.4 },
    { room: 'comms', type: 'chair_fallen', x: 9.2, z: 18.6, rot: 2.8 },
    { room: 'comms', type: 'corpse', x: 12, z: 16, variant: 2 },   // 值機員
    { room: 'comms', type: 'blood', x: 11.4, z: 16.6 },
    { room: 'comms', type: 'debris', x: 7.8, z: 16.2 },
  ],
  // 前庭火場與泛藍積水（下水道人孔溢出）、廳內斷落電線、通訊室走火的機櫃
  hazards: [
    { room: 'yard', type: 'fire', x: 11, z: 3, r: 1.0 },   // 燒毀巡邏車周圍
    { room: 'yard', type: 'fire', x: 12.3, z: 4.9, r: 0.8 },
    { room: 'yard', type: 'slime', x: 4.5, z: 2.2, r: 0.85 }, // 人孔蓋溢出的藍水
    { room: 'hall', type: 'shock', x: 7.5, z: 12.8, r: 0.8 }, // 垂落的日光燈電線泡在水裡
    { room: 'comms', type: 'shock', x: 8.8, z: 17, r: 0.85 }, // 走火的機櫃
  ],
  documents: [
    {
      id: 'g9-doc-board', title: '前庭公告欄的協尋啟事', x: 1, z: 1.2,
      text: '（公告欄上疊了三層紙。最上層是晨星的管制公告，蓋住底下的協尋啟事——一張、兩張……數不完。）\n\n「協尋：陳王秀蘭，78歲，失智，著紅色外套，西平街走失。」\n「協尋：李承恩，9歲，補習班下課後未返家。」\n「尋人：我先生是本分局員警，三天沒回家了，有人看到他嗎？」\n\n（最後那張的邊角，被人用手撫平過很多次。）\n\n（管制公告蓋住協尋啟事——他們連別人找家人的紙，都要蓋掉。）',
    },
    {
      id: 'g9-doc-log', title: '通訊勤務日誌', x: 7.4, z: 19,
      text: '2130　接獲晨星工業「協防通知」，對方要求開放本局中繼頻道。值班官拒絕。\n2154　縣警局來電：核准晨星接入。值班官再次陳報異議。\n2210　全頻廣播：「治安事務全部移交晨星工業現場指揮部，武器入庫、警力待命。」\n2216　外勤各車呼叫無回應。中繼台遭遠端鎖定，本席只能收聽，無法發話。\n2231　（字跡潦草）他們不是來協防的。走廊有聲音。把這本留給\n\n（日誌到這裡斷了。四十一分鐘——從「協防」到整個分局失聲，只用了四十一分鐘。）',
    },
    {
      id: 'g9-doc-arrest', title: '逮捕紀錄（案號 1024-77）', x: 13, z: 13,
      text: '被逮捕人：張啓文，34歲，貨運司機。\n事由：散布謠言、妨害公共秩序。\n筆錄摘要：被逮捕人聲稱於外環道路目擊「晨星工業無標識卡車於封鎖前運入市區數十個貨櫃」，並拍攝照片上傳網路。依晨星現場指揮部通報，該言論已造成恐慌，予以逮捕。手機沒收，移交晨星指揮部。\n承辦人備註（鉛筆，字很輕）：照片我看過了。他沒有說謊。\n\n（「散布謠言」。拍到真相的人被上銬，運貨櫃的人在指揮全市的警察。承辦人只敢用鉛筆說真話——因為鉛筆擦得掉。）',
    },
    {
      id: 'g9-doc-photo', title: '值班台抽屜的節慶合照', x: 6.4, z: 9, monoAfter: true,
      text: '（值班台抽屜裡壓著一張照片，相紙邊緣捲了毛。）\n\n（尾牙的圓桌，十幾個穿便服的員警擠在一起舉杯，有人比 YA，有人笑到閉眼。最旁邊一個頭髮花白的老警員沒看鏡頭，正在替鄰座的年輕女警撥掉肩上的彩帶。）\n\n（照片背面：）\n\n「黑鴉分局歲末聯歡。明年也要全員到齊。——老周敬上」\n\n（明年。照片裡十幾張笑臉，今晚這棟樓裡，還在敲 SOS 的只剩一個。）\n\n（全員到齊——這四個字，現在是全市最奢侈的願望。）',
    },
    {
      id: 'g9-doc-fax', title: '晨星指揮部傳真（繳械令）', x: 6.5, z: 19.2,
      text: '發文單位：晨星工業現場指揮部\n受文單位：黑鴉分局\n主旨：即刻執行武器集中保管。\n說明：一、貴局全數槍械彈藥限於 2300 前入庫封存，鑰匙移交本部聯絡官。\n二、拒不配合者，依緊急管制條例究辦，責任由「該管基層員警」自負。\n三、本命令毋須向所屬轄區民眾說明。\n\n（責任由基層自負——命令是他們下的，條例是他們引的，出事的時候，名字卻要基層來簽。三、毋須說明。連謊言都懶得編了。）',
    },
  ],
  npcs: [
    {
      id: 'officer',
      name: '老周',
      x: 14.8, z: 11.2, yaw: -Math.PI / 2, room: 'cells',
      dialog: [
        '（拘留室最裡面的隔間反鎖著，一個頭髮花白的老警員隔著欄杆打量你們，手裡的警棍握得很穩）活人？……把手電筒照自己的臉。好，眼睛是乾淨的。我是周金土，這個分局最老的警員——現在，大概也是唯一的。',
        '無線電最後的命令是「全部移交晨星指揮」。局長帶隊去「報到」，一個都沒回來。留守的弟兄一個一個變成外面那種東西——我把自己鎖進拘留室。三十七年警察，最後靠犯人的牢房保命，你說可不可笑。',
        '（他往通訊室的方向抬了抬下巴）那東西以前是巡佐吳大順，全分局嗓門最大的。變成那樣以後，警笛的線路纏進了他的喉嚨——他一叫，整棟樓的東西都會醒。打他之前，先想好退路。',
        '軍械室的鑰匙照規定收在值班台抽屜。晨星的繳械令是 2300 生效——但我押著鑰匙拖到最後都沒交出去。裡面還有一把麥格農，是局裡的鎮暴備品。拿去。算黑鴉分局……最後一次配槍。',
        '（他看著欣儀垂著的左臂，聲音低下來）小姐，妳那個傷不是普通的傷。仁愛醫院在東邊兩條街，急診有隔離藥房——如果那裡還有人的話。快去。別像我們一樣，等到命令來了才想動。',
      ],
      dialogAfter: '（老周把警棍別回腰上，隔著欄杆看你）後門鑰匙在通訊室的鑰匙板上。解決吳大順以後……替他把警帽扶正。他當了一輩子警察，最後那一聲不是他想叫的。',
      gift: [
        { item: 'smg_ammo', count: 30 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g9-t-yard', room: 'yard', text: '分局前庭。燈箱還亮著，旗子降到一半卡在旗桿上。燒毀的巡邏車旁，一面鎮暴盾立在地上——盾的主人還握著它。', alert: true, shake: 0.06,
      monologue: '（分局的燈是整條街最亮的，卻沒有一個避難箭頭指向這裡。市民比我們早知道答案：燈亮著的地方，不一定有人守著。）' },
    { id: 'g9-t-hall', room: 'hall', text: '分局大廳。值班台的聽筒垂在桌沿轉著，報案紀錄停在九點十四分。牆上「人民保姆」的標語缺了兩個字。', sound: 'door',
      monologue: '（最後一筆報案有派車，沒有結案。○四車的弟兄開往西平街的時候，不會知道整個分局再過四十分鐘就會從無線電裡消失。）' },
    { id: 'g9-t-cells', room: 'cells', text: '拘留室。鐵欄杆的最深處亮著一盞手電筒，金屬敲擊聲停了——有人隔著欄杆盯著你們。' },
    { id: 'g9-t-armory', room: 'armory', text: '軍械室。槍架大半是空的，繳械清冊散了一地。角落的保管櫃上貼著晨星的封條——封條是完整的，櫃子是空的。', sound: 'groan',
      monologue: '（繳械令 2300 生效，封條卻蓋在空櫃子上——搬走槍的人根本沒等命令生效。程序是演給基層看的，時間表是他們自己的。）' },
    { id: 'g9-t-comms', room: 'comms', text: '通訊室。紅色警示燈還在轉，機櫃劈啪走火。通訊台後面，一個穿制服的巨大身影緩緩轉過來——警笛的線路從它喉嚨裡長出來。', alert: true, shake: 0.08,
      monologue: '（它一叫，全樓都會撲過來。先斷它的嗓子——吳巡佐，對不起，這一槍是替你收班。）' },
  ],
  entities: {
    pickups: [
      { id: 'g9-p-ammo1', item: 'handgun_ammo', count: 15, x: 1, z: 0.8 },
      { id: 'g9-p-herb1', item: 'green_herb', count: 1, x: 13.2, z: 6.2 },
      { id: 'g9-p-shells1', item: 'shotgun_shells', count: 7, x: 12.4, z: 1 },   // 巡邏車殘骸旁
      { id: 'g9-p-armorykey', item: 'armorykey', count: 1, x: 6.6, z: 8.2 },     // ★ 值班台（老周押下來的鑰匙）
      { id: 'g9-p-ammo2', item: 'handgun_ammo', count: 15, x: 2.8, z: 13.5 },
      { id: 'g9-p-smgammo1', item: 'smg_ammo', count: 30, x: 11.2, z: 13.8 },
      { id: 'g9-p-magnum', item: 'magnum_weapon', count: 1, x: 4, z: 17.4 },     // ★ 軍械室支線獎勵：鎮暴備品麥格農
      { id: 'g9-p-magammo', item: 'magnum_ammo', count: 6, x: 5.7, z: 18.4 },
      { id: 'g9-p-shells2', item: 'shotgun_shells', count: 7, x: 2.9, z: 18.4 },
      { id: 'g9-p-spray1', item: 'first_aid_spray', count: 1, x: 16.2, z: 12.9 }, // 老周囤的急救品
      { id: 'g9-p-blue1', item: 'blue_herb', count: 1, x: 12.9, z: 9.4 },
      { id: 'g9-p-copkey', item: 'copkey', count: 1, x: 12.4, z: 19.9 },         // ★ 通訊室鑰匙板（嘶吼者身後）
      { id: 'g9-p-herb2', item: 'green_herb', count: 1, x: 7.6, z: 19.8 },
    ],
    enemies: [
      { id: 'g9-ironmask', type: 'ironmask', x: 8, z: 5 },      // ★ 前庭鎮暴變異，守大門沙包哨
      { id: 'g9-agent1', type: 'agent', x: 3, z: 3.5 },         // 留下「清理」的晨星黑衣人
      { id: 'g9-z1', type: 'zombie', x: 11.5, z: 2.2 },
      { id: 'g9-dog1', type: 'dog', x: 1.8, z: 6 },             // 警犬舍跑出來的
      { id: 'g9-z2', type: 'zombie', x: 4, z: 9.5 },            // 大廳的制服感染者
      { id: 'g9-z3', type: 'zombie', x: 9, z: 13.2 },
      { id: 'g9-agent2', type: 'agent', x: 10.8, z: 8.2 },
      { id: 'g9-howler', type: 'howler', x: 10, z: 18 },        // ★ 警笛融合嘶吼者（前巡佐吳大順）守通訊室
      { id: 'g9-z4', type: 'zombie', x: 8, z: 16.4 },
    ],
    typewriters: [
      { id: 'g9-tw-yard', x: 0.7, z: 6.3 },
      { id: 'g9-tw-hall', x: 2.6, z: 14.4 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
