// 第八章〈排水幹線〉：往河邊的路被晨星的路障堵死，唯一的捷徑是地下道——
// 但整條排水幹線是全市 KY 濃度最高的地方：三週來每一滴藍色的水，都往這裡匯流。
// 欣儀判讀出真相：下水道不是下水道，是 KY 的血管。而她左臂的傷，正在惡化。
// 魔王：排水幹線聚合體（prime）——人體殘骸與濾渣在 KY 匯流處融成的巨物，守幹線渠道深處。
export const CHAPTER8 = {
  id: 'chapter8',
  name: '第八章：排水幹線',
  next: 'chapter9',
  exitNeeds: 'sluicekey',
  exitHint: '出口豎井前的幹線閘門是手動的——閘門室的操作台上少了一支把手。清淤班的工具應該都收在閘門室裡',
  spawn: { x: 2, z: 1.2, yaw: Math.PI }, // 地下道入口階梯下，面向南（幹線方向）
  lockNames: { sluicekey: '閘門把手', chapterExit: '幹線閘門' },
  story: [
    '國小側門出來，往河邊的路只走了兩百公尺。\n\n路口橫著三輛鎮暴車，車頭全部朝內，探照燈掃著空無一人的街道。欣儀把亮均拉回牆角：「別過去。那不是防線，是陷阱——燈亮著，就是在等人自己走過去。」\n\n亮均盯著路邊的地下道入口。鐵柵門半開，階梯往下沒進黑暗裡。\n\n（地面上每一條路都是他們的。地面下呢？）\n\n入口的告示牌鏽得快看不清了：「雨水排水幹線・非工作人員請勿進入」。',
    '階梯走到一半，欣儀停住了。\n\n「你聽。」\n\n底下有聲音。不是水聲——水聲是均勻的。這個聲音有起伏，像很多東西擠在一起呼吸，一漲、一縮。\n\n亮均把手電筒壓低：「下水道跟廠區排水渠是同一套系統。第一夜流出去的 KY，下了整夜的雨，全市的雨水──」\n\n「都往幹線匯流。」欣儀接完這句，臉色比階梯底的黑暗還沉，「亮均，我們要走的這條路，是全黑鴉市 KY 濃度最高的地方。」\n\n（濃度最高的地方。也就是說——它長得最好的地方。）',
    '最後一階踩進水裡，腳踝以下泛起一圈藍光。\n\n幹線渠道比想像中高，管壁上每一道接縫都在滲出藍色的黏液，像牆壁本身在流汗。手電筒照過去，光柱裡浮著細小的發光顆粒，緩緩地、朝同一個方向漂。\n\n欣儀抬起左臂想扶牆，動作做到一半就縮了回去，繃帶下的手臂僵得不像她的。\n\n「妳的手——」\n\n「還能開槍。」她把袖子拉下來蓋住繃帶，「走吧。閘門在幹線末端，開了閘門就能從豎井上去。」\n\n（她不說，我也不問。但那道傷是第三天了，普通的傷口第三天不會越來越燙。）\n\n（先出去。出去就找藥。）',
  ],
  endingText:
    '閘門把手插進操作台，轉到底——鏽死的齒輪咬合、鬆脫、再咬合，幹線閘門在轟隆聲裡緩緩升起。渠道的水位開始退，那個巨物剩下的殘渣隨水流散開，像從來沒有存在過。豎井的鐵梯一路向上，人孔蓋推開的瞬間，夜風灌下來——是地面的空氣。亮均先爬出去，回身拉欣儀上來時，摸到她的手燙得嚇人。後巷的盡頭立著一棟樓，門口的藍白燈箱還亮著：黑鴉分局。停電的城市裡，分局還有燈。有燈，也許就有人、有無線電、有武器。欣儀靠著牆喘：「進去看看。」〔續　第九章〕',
  objective: '穿過排水幹線，找到閘門把手開啟幹線閘門',
  rooms: [
    { id: 'inlet', name: '地下道入口', x: 0, z: 0, w: 4, d: 5, h: 2.8, floor: 'metal', walls: 'metal',
      light: { x: 2, y: 2.4, z: 2, color: 0x668877, intensity: 10, flicker: true } }, // 階梯口透下的街光
    { id: 'main', name: '幹線渠道', x: 0, z: 5, w: 4, d: 16, h: 3, floor: 'metal', walls: 'metal',
      light: { x: 2, y: 2.6, z: 13, color: 0x33cc99, intensity: 9, flicker: true } },  // KY 藍綠色生物光
    { id: 'side', name: '側渠', x: 4, z: 9, w: 6, d: 4, h: 2.6, floor: 'metal', walls: 'metal',
      light: { x: 7, y: 2.2, z: 11, color: 0x44bbaa, intensity: 8, flicker: true } },  // 滲流反光
    { id: 'sluice', name: '閘門室', x: 0, z: 21, w: 7, d: 6, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 3.5, y: 2.8, z: 24, color: 0x77ddbb, intensity: 14, flicker: true } }, // 殘存的工務燈
    { id: 'shaft', name: '出口豎井', x: 7, z: 22, w: 3.5, d: 4, h: 4.5, floor: 'metal', walls: 'metal',
      light: { x: 8.7, y: 4.2, z: 24, color: 0x8899bb, intensity: 12 } },              // 人孔蓋縫透下的夜光
  ],
  doors: [
    { id: 'd8-inlet-main', from: 'inlet', to: 'main', axis: 'x', at: [2, 5], width: 1.5, height: 2.3, lock: null },
    { id: 'd8-main-side', from: 'main', to: 'side', axis: 'z', at: [4, 11], width: 1.3, height: 2.1, lock: null },
    { id: 'd8-main-sluice', from: 'main', to: 'sluice', axis: 'x', at: [2, 21], width: 1.5, height: 2.4, lock: null },
    { id: 'd8-sluice-shaft', from: 'sluice', to: 'shaft', axis: 'z', at: [7, 24], width: 1.2, height: 2.2, lock: null },
    { id: 'd8-exit', from: 'shaft', to: null, axis: 'x', at: [8.7, 26], width: 1.4, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 地下道入口：鏽柵與逃難遺物
    { room: 'inlet', type: 'debris', x: 0.8, z: 1 },
    { room: 'inlet', type: 'cardboard', x: 3.2, z: 3.5 },
    { room: 'inlet', type: 'blood', x: 2.2, z: 4.2 },
    // 幹線渠道：沿壁大管線、清淤工的遺物
    { room: 'main', type: 'pipe', x: 0.5, z: 13, len: 15, y: 2.4, rot: Math.PI / 2 },
    { room: 'main', type: 'pipe', x: 3.5, z: 13, len: 15, y: 2.4, rot: Math.PI / 2 },
    { room: 'main', type: 'barrel', x: 0.7, z: 9.5, solid: 0.35 },   // 清淤班的瀝水桶
    { room: 'main', type: 'crate', x: 3.3, z: 10.2, solid: 0.4 },
    { room: 'main', type: 'corpse', x: 1, z: 15.5, variant: 2 },     // 沒能撤走的清淤工
    { room: 'main', type: 'blood', x: 1.6, z: 15 },
    { room: 'main', type: 'debris', x: 3, z: 19.5 },
    { room: 'main', type: 'blood', x: 2.2, z: 18.2 },                // 聚合體巢區
    // 側渠：晨星的採樣點
    { room: 'side', type: 'pipe', x: 7, z: 9.4, len: 5, y: 2.1 },
    { room: 'side', type: 'crate', x: 9.3, z: 11, solid: 0.4 },      // 採樣器材箱
    { room: 'side', type: 'barrel', x: 8.5, z: 12.5, solid: 0.35 },
    { room: 'side', type: 'papers', x: 6, z: 9.6 },
    { room: 'side', type: 'blood', x: 5, z: 10.5 },
    // 閘門室：清淤班工務站
    { room: 'sluice', type: 'table', x: 4.8, z: 26, solid: 0.5 },    // 操作台
    { room: 'sluice', type: 'papers', x: 4.6, z: 25.8 },
    { room: 'sluice', type: 'shelf', x: 0.4, z: 24.5, rot: Math.PI / 2, solid: 0.28 }, // 工具架
    { room: 'sluice', type: 'crate', x: 1, z: 22, solid: 0.4 },      // 工具箱
    { room: 'sluice', type: 'chair_fallen', x: 5.8, z: 24.6, rot: 1.6 },
    { room: 'sluice', type: 'bodybag', x: 2.5, z: 26.3, rot: 0.5 },
    { room: 'sluice', type: 'barrel', x: 6.4, z: 22.4, solid: 0.35 },
    // 出口豎井：鐵梯下的雜物
    { room: 'shaft', type: 'debris', x: 7.6, z: 22.6 },
    { room: 'shaft', type: 'trash', x: 10, z: 25.3 },
  ],
  // 幹線＝KY 匯流處：泛藍黏液特多，閘門室泡水的電纜還帶電
  hazards: [
    { room: 'inlet', type: 'slime', x: 1, z: 3.8, r: 0.8 },
    { room: 'main', type: 'slime', x: 2, z: 7.5, r: 0.95 },
    { room: 'main', type: 'slime', x: 1.2, z: 12.5, r: 0.9 },
    { room: 'main', type: 'slime', x: 2.8, z: 17.2, r: 1.0 },  // 聚合體巢區外圈
    { room: 'side', type: 'slime', x: 6.2, z: 12.3, r: 0.8 },
    { room: 'sluice', type: 'shock', x: 1.8, z: 23.2, r: 0.8 }, // 泡水的抽水機電纜
    { room: 'sluice', type: 'slime', x: 5.5, z: 22.8, r: 0.75 },
  ],
  documents: [
    {
      id: 'g8-doc-report', title: '下水道檢測報告（三週前）', x: 0.8, z: 2.5,
      text: '報告單位：黑鴉市下水道清淤三班\n檢測點：排水幹線 M-04\n異常：渠壁附著不明膠狀物，藍色，夜間發光，刮除後 48 小時內復生。班員兩名接觸後手部麻癢。\n處置申請：封閉幹線、送驗、全班健檢。\n上級批示：「經查為藻類滋生，例行沖洗即可。勿再重複陳報。」\n\n（勿再重複陳報。跟水利局那張貼條同一週、同一套話術。基層看見了兩次，就被劃掉了兩次。）',
    },
    {
      id: 'g8-doc-label', title: '晨星取樣標籤', x: 9.3, z: 10,
      text: '（採樣器材箱上貼著防水標籤，列印工整：）\n\n晨星工業環境監測部\n樣本編號：KY-SW-117\n採樣點：市排水幹線 M-04 側渠\n日期：〔三週前〕\n項目：菌落擴散速率／宿主組織融合度\n備註：本點位濃度全市最高，列每日必採。\n\n（三週前。清淤班陳報異常被壓下去的同一週，晨星的人已經天天下來採樣了。）\n\n（他們不是沒看見。他們是最早看見的——然後把所有其他看見的人，都變成「藻類」。）',
    },
    {
      id: 'g8-doc-log', title: '清淤班巡檢日誌', x: 3.4, z: 9.5,
      text: '〔十二天前〕M-04 膠狀物又長回來了，這次連成一整片。沖洗車來過，沖不掉。\n〔九天前〕幹線深處有聲音。阿溪說像有人在water裡翻身。上報，沒有回音。\n〔六天前〕聲音變大了。阿溪不肯再進去。我替他排了假。\n〔三天前〕上面來電：幹線列入「委外管理」，清淤班即日起不必進場。委外給誰，沒有說。\n\n（不必進場。不是保護他們——是清場。從那天起，這下面長什麼、長多大，就只有晨星知道了。）',
    },
    {
      id: 'g8-doc-photo', title: '工具箱抽屜的合照', x: 1, z: 22.6, monoAfter: true,
      text: '（閘門室的工具箱最底層，壓著一張防水套裡的照片。）\n\n（六個穿青蛙裝的男人站在剛清完的渠道裡，膠鞋上全是泥，比著大拇指笑。背後的渠壁乾乾淨淨，一點藍色都沒有。）\n\n（照片背面的字被水暈開了一半：）\n\n「M-04 大清淤完工。三週前這裡還只是臭水溝——現在乾淨得能辦桌。辛苦了，兄弟們。」\n\n（三週前，這裡還只是臭水溝。臭水溝會臭、會髒、會堵——但不會發光，不會呼吸，不會把清它的人留下來。）\n\n（把渠道清乾淨的人，最後被當成濾渣留在渠道裡。守夜的人，總要有人記得。）',
    },
    {
      id: 'g8-doc-sluice', title: '閘門操作規程', x: 7.5, z: 25.5,
      text: '排水幹線閘門・手動操作規程\n一、把手插入操作台轉軸，順時針轉到底。\n二、閘門全開後，方可經由 V-2 豎井離場。\n三、豎井出口：警民路後巷（黑鴉分局後方）。\n四、把手用畢請歸位工具架，勿隨意放置。\n\n（把手不在工具架上。最後一個用它的人沒有歸位——或者，沒能歸位。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 8.5, z: 11.2, yaw: -Math.PI / 2, room: 'side',
      dialog: [
        '（欣儀蹲在晨星的採樣箱前，用右手翻著裡面的紀錄表，左臂垂在身側沒有動）你看這些採樣點的分布——廠區排水渠、外環幹渠、這裡、河口。全部連起來，就是一張網。',
        '我一直想錯了。KY 不是「流進」下水道——它是把下水道長成了自己的一部分。管壁上那些黏液不是附著，是內襯。這整套排水系統，現在是它的血管。',
        '（她的聲音很平，平得刻意）全市的雨水往幹線匯流，幹線往河口走。它不用移動，躺著就有全城的養分送上門。晨星選這裡當每日必採點，因為這裡是心臟。',
        '（她終於看了一眼自己的左臂，繃帶邊緣透出的皮膚泛著不正常的暗色）別用那種眼神看我。只是發炎。出去以後找間藥局，消炎藥吃一吃就好了。',
        '幹線深處那個聲音……它在收縮。跟血管一樣，有節奏的。亮均，閘門在它後面——我們得從心臟旁邊走過去。槍先上膛。',
      ],
      dialogAfter: '（欣儀用右手替你把彈匣壓滿）那東西沒有要害，因為它全身都是別人的身體。打它縫合的地方——殘骸跟殘骸接起來的縫，是它自己長的肉，會痛的只有那裡。',
      gift: [
        { item: 'blue_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g8-t-inlet', room: 'inlet', text: '地下道入口。階梯上有拖行的痕跡，一路往下，沒進水裡。鐵柵門在身後輕輕晃。', sound: 'door',
      monologue: '（往河邊的路被堵死了，只剩下面這條。他們封得住每一條路，卻從來不封水溝——因為他們知道水溝裡有什麼。）' },
    { id: 'g8-t-main', room: 'main', text: '幹線渠道。管壁的每一道接縫都在滲藍光，水面的發光顆粒朝同一個方向漂。深處傳來規律的、潮濕的收縮聲。', alert: true, shake: 0.06,
      monologue: '（濃度全市最高。第一夜那一灘 KY 走了三週，走到這裡——它不是迷路，是回家。）' },
    { id: 'g8-t-side', room: 'side', text: '側渠。整齊碼放的採樣箱、編號的樣本架、防水的紀錄表——這裡乾淨得不像下水道，像實驗室的分部。', sound: 'groan',
      monologue: '（清淤班被趕出去的同一條渠道，晨星的人天天進來。「委外管理」——委外給病毒，管理給他們自己。）' },
    { id: 'g8-t-sluice', room: 'sluice', text: '閘門室。抽水機泡在水裡還在漏電，工具架上的工具一件不少——只少了閘門把手。操作台前有一灘乾掉的血。' },
    { id: 'g8-t-shaft', room: 'shaft', text: '出口豎井。鐵梯一路向上，人孔蓋的縫隙透下夜光，還有——地面的風。', sound: 'thunder',
      monologue: '（欣儀的呼吸越來越淺，左臂從側渠之後就沒再抬起來過。先上去。上去就找藥——她可以騙我，傷口不會。）' },
  ],
  entities: {
    pickups: [
      { id: 'g8-p-ammo1', item: 'handgun_ammo', count: 15, x: 3.2, z: 2 },
      { id: 'g8-p-blue1', item: 'blue_herb', count: 1, x: 1, z: 4.4 },       // 入口積液旁
      { id: 'g8-p-herb1', item: 'green_herb', count: 1, x: 3.4, z: 6.5 },
      { id: 'g8-p-shells1', item: 'shotgun_shells', count: 7, x: 0.9, z: 10.5 },
      { id: 'g8-p-blue2', item: 'blue_herb', count: 1, x: 3.4, z: 13.8 },    // 幹線中段
      { id: 'g8-p-ammo2', item: 'handgun_ammo', count: 15, x: 0.8, z: 19.8 }, // 聚合體巢區前
      { id: 'g8-p-smgammo1', item: 'smg_ammo', count: 30, x: 9.4, z: 9.6 },  // 採樣箱旁
      { id: 'g8-p-blue3', item: 'blue_herb', count: 1, x: 5, z: 12.6 },
      { id: 'g8-p-spray1', item: 'first_aid_spray', count: 1, x: 9.5, z: 12.7 },
      { id: 'g8-p-sluicekey', item: 'sluicekey', count: 1, x: 2.6, z: 26.2 }, // ★ 操作台旁的血泊邊
      { id: 'g8-p-shells2', item: 'shotgun_shells', count: 7, x: 6.3, z: 21.6 },
      { id: 'g8-p-herb2', item: 'green_herb', count: 1, x: 9.8, z: 23 },     // 豎井鐵梯下
    ],
    enemies: [
      { id: 'g8-prime', type: 'prime', x: 2, z: 18 },       // ★ 排水幹線聚合體，守渠道深處
      { id: 'g8-lurker1', type: 'lurker', x: 2, z: 8 },     // 水面下的潛伏者
      { id: 'g8-z1', type: 'zombie', x: 1.2, z: 11 },       // 泡水的感染者
      { id: 'g8-lurker2', type: 'lurker', x: 2.5, z: 14.5 },
      { id: 'g8-z2', type: 'zombie', x: 3.2, z: 16 },
      { id: 'g8-spider1', type: 'spider', x: 7, z: 10.2 },  // 側渠管頂
      { id: 'g8-spider2', type: 'spider', x: 9, z: 12.2 },
      { id: 'g8-bloater1', type: 'bloater', x: 3.8, z: 24 }, // 閘門室的脹屍
      { id: 'g8-z3', type: 'zombie', x: 5.8, z: 25.4 },
    ],
    typewriters: [
      { id: 'g8-tw-inlet', x: 0.6, z: 0.7 },
      { id: 'g8-tw-sluice', x: 0.6, z: 26.4 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
