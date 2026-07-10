// 第六章〈騎樓下的燈〉：停電的商店街裡，只有便利商店的一盞燈還亮著。
// 守燈的是夜班少年阿哲——店長出門找妻子沒再回來，他留下來顧店，等去了國小避難所的家人。
// 倉庫被脹屍與蔓噬花佔成巢，巢的另一頭是店長辦公室——後巷鐵捲門的鑰匙在那裡。
// 推進：穿過倉庫巢拿鐵捲門鑰匙，開後巷鐵捲門。下一站：國小避難所。
export const CHAPTER6 = {
  id: 'chapter6',
  name: '第六章：騎樓下的燈',
  next: 'chapter7',
  exitNeeds: 'shutterkey',
  exitHint: '後巷鐵捲門的遙控早就沒電了——阿哲說鑰匙在店長辦公室的抽屜，但辦公室得經過倉庫那個「巢」',
  spawn: { x: 1.5, z: 3.5, yaw: Math.PI / 2 }, // 圍籬缺口，面向東（商店街深處）
  lockNames: { shutterkey: '鐵捲門鑰匙', chapterExit: '後巷鐵捲門' },
  story: [
    '圍籬的缺口在身後合攏。商店街的騎樓像一條黑色的隧道，鐵捲門一面接一面拉到底，機車倒在柱子之間，玻璃碎了一地。\n\n只有一盞燈。\n\n騎樓中段，便利商店的招牌黑著，但店裡的燈亮著——白色的、穩定的、正常得刺眼的日光燈。\n\n欣儀停下腳步：「發電機？不對，太穩了。」\n\n（停電三天的街區，一盞不閃的燈。）',
    '「有兩種可能。」亮均壓低聲音，「有人在裡面撐著——或者，有什麼東西希望我們以為有人在裡面。」\n\n欣儀檢查了彈匣：「你要進去？」\n\n「要。」他說，「如果是活人，他撐了三天，我們是他等到的第一批人。如果是陷阱——」\n\n他看著那盞燈。\n\n「——那我寧可現在就知道，這條街上的東西已經聰明到會用燈當誘餌。」\n\n（不管是哪一種，都不能繞過去。燈在街的中段，後巷的出口在燈的後面。）',
    '走近了才看清楚：便利商店的自動門被人從裡面用貨架抵住，玻璃上貼著一張紙，字跡稚拙——\n\n「還有活人。會開門。請不要打破玻璃，怪物聽得到。」\n\n欣儀輕聲唸完，看向亮均。\n\n門後的貨架縫隙裡，一雙眼睛眨了一下，飛快地縮回去。\n\n（是個孩子。守著整條街最後一盞燈的，是個孩子。）',
  ],
  endingText:
    '鑰匙轉了兩圈，後巷的鐵捲門喀啦喀啦捲上去，夜風灌進來。阿哲站在店門口沒有跟上——他把燈又擦亮了一點。「我媽跟妹妹在國小避難所。」他說，「幫我看一眼就好。我要顧店，店長說燈不能關——他們回來的時候，要看得到路。」整條淪陷的街只剩這一盞燈，和一個等家人的孩子。亮均把彈匣壓滿。下一站，國小。〔續　第七章〕',
  objective: '查明便利商店那盞還亮著的燈，並找到打開後巷鐵捲門的鑰匙',
  rooms: [
    { id: 'arcade', name: '騎樓商店街', x: 0, z: 0, w: 22, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 11, y: 4.8, z: 2, color: 0x667788, intensity: 12, flicker: true } }, // 僅存的騎樓燈
    { id: 'store', name: '便利商店', x: 5, z: 7, w: 9, d: 7, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 9.5, y: 2.6, z: 10.5, color: 0xffe8c0, intensity: 26 } }, // ★那盞燈——整條街唯一不閃的光
    { id: 'ware', name: '倉庫', x: 14, z: 7, w: 7, d: 7, h: 3.5, floor: 'metal', walls: 'metal',
      light: { x: 17.5, y: 3, z: 10.5, color: 0x557766, intensity: 8, flicker: true } }, // 巢——濕黏的暗綠
    { id: 'office', name: '店長辦公室', x: 14, z: 14, w: 5, d: 5, h: 2.8, floor: 'wood', walls: 'plaster',
      light: { x: 16.5, y: 2.4, z: 16.5, color: 0xffe0b0, intensity: 14 } },
    { id: 'alley', name: '後巷', x: 5, z: 14, w: 4, d: 8, h: 5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 7, y: 4.2, z: 18, color: 0x667788, intensity: 11, flicker: true } },
  ],
  doors: [
    { id: 'd6-arcade-store', from: 'arcade', to: 'store', axis: 'x', at: [9.5, 7], width: 1.3, height: 2.2, lock: null },  // 自動門（貨架已挪開）
    { id: 'd6-store-ware', from: 'store', to: 'ware', axis: 'z', at: [14, 10.5], width: 1.2, height: 2.1, lock: null },
    { id: 'd6-ware-office', from: 'ware', to: 'office', axis: 'x', at: [16.5, 14], width: 1.1, height: 2.1, lock: null },
    { id: 'd6-store-alley', from: 'store', to: 'alley', axis: 'x', at: [7, 14], width: 1.2, height: 2.1, lock: null },     // 員工後門
    { id: 'd6-exit', from: 'alley', to: null, axis: 'x', at: [7, 22], width: 1.6, height: 2.4, lock: 'chapterExit' },      // 後巷鐵捲門
  ],
  props: [
    // 騎樓商店街：倒下的機車（debris 代）、棄車、路燈、店門沙包
    { room: 'arcade', type: 'car', x: 7, z: 5.2, rot: 0.3, solid: 1.0 },
    { room: 'arcade', type: 'car', x: 13, z: 1.2, rot: 2.8, variant: 1, solid: 1.0 },   // 翻覆
    { room: 'arcade', type: 'car', x: 18.3, z: 5.2, rot: -1.2, variant: 2, solid: 1.0 }, // 燒毀
    { room: 'arcade', type: 'streetlight', x: 4, z: 0.6 },
    { room: 'arcade', type: 'streetlight', x: 12, z: 6.4, dead: true },
    { room: 'arcade', type: 'streetlight', x: 20, z: 0.6 },
    { room: 'arcade', type: 'trash', x: 2.2, z: 6.3 },
    { room: 'arcade', type: 'trash', x: 16, z: 0.8 },
    { room: 'arcade', type: 'hydrant', x: 9.7, z: 0.7 },
    { room: 'arcade', type: 'crate', x: 10.8, z: 6.4, solid: 0.4 },  // 店門口的沙包
    { room: 'arcade', type: 'blood', x: 8.5, z: 4 },
    { room: 'arcade', type: 'corpse', x: 5.5, z: 6.2, variant: 0 },
    { room: 'arcade', type: 'debris', x: 15, z: 3.5 },
    { room: 'arcade', type: 'cardboard', x: 21, z: 4 },
    // 便利商店：貨架走道與櫃檯
    { room: 'store', type: 'shelf', x: 6.2, z: 9.5, rot: 0, solid: 0.28 },
    { room: 'store', type: 'shelf', x: 6.2, z: 11.5, rot: 0, solid: 0.28 },
    { room: 'store', type: 'shelf', x: 12.4, z: 12.6, rot: 0, solid: 0.28 }, // 冰櫃（漏電）
    { room: 'store', type: 'table', x: 10.5, z: 8.6, solid: 0.5 },           // 櫃檯
    { room: 'store', type: 'papers', x: 10.7, z: 8.7 },
    { room: 'store', type: 'trash', x: 13.3, z: 7.8 },
    { room: 'store', type: 'chair_fallen', x: 9, z: 12.8, rot: 1.4 },
    { room: 'store', type: 'blood', x: 7.5, z: 13.4 },
    { room: 'store', type: 'cardboard', x: 11.5, z: 13.2 },
    // 倉庫：飲料箱與「巢」
    { room: 'ware', type: 'crate', x: 15, z: 8, solid: 0.4 },
    { room: 'ware', type: 'crate', x: 15.9, z: 8.4, solid: 0.4 },
    { room: 'ware', type: 'crate', x: 15.3, z: 9.2, solid: 0.4 },
    { room: 'ware', type: 'barrel', x: 20.2, z: 12.8, solid: 0.35 },
    { room: 'ware', type: 'barrel', x: 19.5, z: 13.3, solid: 0.35 },
    { room: 'ware', type: 'cardboard', x: 19.5, z: 8 },
    { room: 'ware', type: 'blood', x: 17.5, z: 10.5 },
    { room: 'ware', type: 'blood', x: 16, z: 12 },
    { room: 'ware', type: 'bodybag', x: 20.3, z: 9.5, rot: 0.6 },
    { room: 'ware', type: 'debris', x: 14.8, z: 12.5 },
    // 店長辦公室：辦公桌與鑰匙抽屜
    { room: 'office', type: 'table', x: 16.5, z: 16.8, solid: 0.5 },
    { room: 'office', type: 'papers', x: 16.7, z: 16.9 },
    { room: 'office', type: 'shelf', x: 18.5, z: 15, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'office', type: 'chair_fallen', x: 15.2, z: 17.8, rot: 2 },
    // 後巷：排水管與逃難痕跡（牆上的粉筆箭頭指向國小）
    { room: 'alley', type: 'pipe', x: 5.4, z: 18, len: 7, y: 2.4, rot: Math.PI / 2 },
    { room: 'alley', type: 'trash', x: 8.4, z: 15 },
    { room: 'alley', type: 'trash', x: 6, z: 21.2 },
    { room: 'alley', type: 'debris', x: 7, z: 18.5 },
    { room: 'alley', type: 'blood', x: 8, z: 20.3 },
  ],
  // 街道危險：泛藍積水（KY）、燒毀車輛的餘火、冰櫃漏電、倉庫巢的黏液
  hazards: [
    { room: 'arcade', type: 'slime', x: 4.2, z: 4.8, r: 0.85 },  // 泛藍積水
    { room: 'arcade', type: 'fire', x: 18.3, z: 4.1, r: 0.95 },  // 燒毀車周圍
    { room: 'store', type: 'shock', x: 12.6, z: 13, r: 0.75 },   // 冰櫃漏電泡水
    { room: 'ware', type: 'slime', x: 17.5, z: 10.5, r: 1.0 },   // 巢的中心
    { room: 'ware', type: 'slime', x: 19.8, z: 11.7, r: 0.8 },
    { room: 'alley', type: 'slime', x: 6.5, z: 16.5, r: 0.8 },
  ],
  documents: [
    {
      id: 'g6-doc-closed', title: '公休公告', x: 9, z: 6.4,
      text: '【公休公告】\n\n各位親愛的鄰居：\n本店今晚暫停營業一晚，配合區域消毒作業。\n明天見。\n\n——店長 阿隆\n\n（公告紙的膠帶還很新。「明天見」三個字寫得特別用力。\n這條街每一家店都貼著差不多的紙——他們都以為，只是一個晚上。）',
    },
    {
      id: 'g6-doc-log', title: '夜班交接簿', x: 11.3, z: 8.8,
      text: '夜班交接簿\n\n0518 阿哲→店長：關東煮機不加熱了，報修單寄了。\n0520 店長→阿哲：外面在傳工廠出事，客人變少。沒事。\n0522 阿哲→店長：整晚只有一個客人，眼睛怪怪的，站在冰櫃前二十分鐘沒動。\n0523 店長→阿哲：燈不要關。有事躲倉庫夾層，等我回來。\n\n（之後是空白。交接簿寫到第五天，另一個人再也沒有回來交接。）',
    },
    {
      id: 'g6-doc-invoice', title: '進貨簽收單', x: 14.7, z: 18.3,
      text: '立愷商行 進貨簽收單\n\n0512 02:40　簽收人：阿隆\n備註：晨星工業的卡車又半夜借道後巷，把我的進貨動線堵死四十分鐘。跟里長反映第三次，里長說「人家是大公司，配合一下」。\n0517 03:05　又來。這次卸了東西進下水道工程的工地。半夜三點，誰家的工程半夜三點卸貨？\n\n（半夜借道的卡車、下水道的工地。晨星在爆發之前，就把東西往地下送了——這條街從頭到尾都在他們的路線圖上。）',
    },
    {
      id: 'g6-doc-photo', title: '抽屜裡的合照', x: 17.5, z: 17.4, monoAfter: true,
      text: '（辦公室抽屜裡壓著一張照片：店長站在關東煮機前，身邊圍著幾張熟面孔——夜班常客的合照。）\n\n（照片背面寫著每個人常買的東西：「阿伯：米酒。學生仔：泡麵加蛋。」）\n\n（角落有一個高大得幾乎頂出鏡頭的保全，制服上是晨星的臂章。備註寫著：「大個子：宵夜總是買兩份。人很客氣，只是不太說話。」）\n\n（買兩份宵夜的人，是替誰買的？\n……這個輪廓，這個身高。聖時。變成那個樣子之前，他也只是這條街上，一個買宵夜的客人。）',
    },
  ],
  npcs: [
    {
      id: 'clerk',
      name: '阿哲',
      x: 10.5, z: 9.6, yaw: 0, room: 'store',
      dialog: [
        '（貨架後傳來一聲壓抑的抽氣，一個瘦瘦的少年舉著掃把站起來）……你、你們是人？眼睛沒有流黑色的……太好了。我是阿哲，夜班的。',
        '店長昨晚把鑰匙留給我就出去了，說去找他老婆。他只交代一句：「燈不要關。」——便利商店的燈永遠是亮的，迷路的人看到燈，就知道往哪裡走。',
        '（他放下掃把，聲音變小）我媽跟妹妹在對面巷子住。封鎖那晚，里長廣播叫大家去國小集合，說那邊是避難所。我留下來顧店，想說隔天就能去會合……已經第三天了。',
        '倉庫不要進去！前天有個渾身腫起來的東西撞破後門鑽進去，之後裡面就一直有咕嚕咕嚕的聲音……可是後巷鐵捲門的鑰匙在店長辦公室，辦公室的門，就在倉庫最裡面。',
        '（他從櫃檯下拖出一個塑膠籃）拿去，飯糰過期一天而已，藥妝架的東西也隨便拿。你們要去國小的話……幫我看一眼。我媽姓陳，妹妹叫小穗。拜託。',
      ],
      dialogAfter: '（阿哲把燈罩擦亮了一點）我會把燈顧好。這樣他們回來的時候，就找得到路。……你們也是。回來的時候，看到燈，就知道我還在。',
      gift: [
        { item: 'green_herb', count: 1 },
        { item: 'handgun_ammo', count: 15 },
      ],
    },
  ],
  triggers: [
    { id: 'g6-t-arcade', room: 'arcade', text: '騎樓商店街。鐵捲門一排拉到底，機車橫倒在柱子之間。整條街只有一處亮著——便利商店，門口那盞燈。', sound: 'groan',
      monologue: '（停電的街區裡，一盞還亮著的燈。不是奇蹟，就是陷阱。也可能兩者都是。）' },
    { id: 'g6-t-store', room: 'store', text: '便利商店。燈是亮的，冷藏櫃還在運轉，貨架上的東西倒了一半。櫃檯後面——有呼吸聲。',
      monologue: '（有人。活人。這條街上，還有人在呼吸。）' },
    { id: 'g6-t-ware', room: 'ware', text: '倉庫。飲料箱堆到天花板，暗處傳來濕黏的蠕動聲——貨架之間，有什麼東西把這裡當成了巢。', alert: true, shake: 0.06, sound: 'groan' },
    { id: 'g6-t-office', room: 'office', text: '店長辦公室。保險箱開著，鈔票一毛都沒少——少的是抽屜裡的全家照，和牆上掛勾的機車鑰匙。',
      monologue: '（錢沒有人拿。世界壞掉的第一個晚上，錢就變回了紙。他帶走的是照片。）' },
    { id: 'g6-t-alley', room: 'alley', text: '後巷。鐵捲門拉得死緊，鎖孔生了鏽。牆上有人用粉筆畫了箭頭，寫著：「往國小，跟著箭頭」。', sound: 'dogbark',
      monologue: '（箭頭是畫給跑得動的人看的。畫箭頭的人，希望後面還有人跟得上。）' },
  ],
  entities: {
    pickups: [
      { id: 'g6-p-ammo1', item: 'handgun_ammo', count: 15, x: 2.5, z: 2 },
      { id: 'g6-p-blue1', item: 'blue_herb', count: 1, x: 5.2, z: 5.6 },       // 積水旁（解 slime 中毒）
      { id: 'g6-p-shells1', item: 'shotgun_shells', count: 7, x: 15, z: 1 },   // 翻覆車後
      { id: 'g6-p-herb1', item: 'green_herb', count: 1, x: 21.2, z: 6.3 },
      { id: 'g6-p-ammo2', item: 'handgun_ammo', count: 15, x: 6.2, z: 8.4 },
      { id: 'g6-p-spray1', item: 'first_aid_spray', count: 1, x: 13.4, z: 9 }, // 藥妝架
      { id: 'g6-p-smg1', item: 'smg_ammo', count: 30, x: 20.4, z: 7.8 },
      { id: 'g6-p-blue2', item: 'blue_herb', count: 1, x: 15, z: 12.8 },       // 巢旁
      { id: 'g6-p-shutterkey', item: 'shutterkey', count: 1, x: 17.6, z: 16.2 }, // ★ 店長辦公桌抽屜
      { id: 'g6-p-shells2', item: 'shotgun_shells', count: 7, x: 18.5, z: 18.4 },
      { id: 'g6-p-herb2', item: 'green_herb', count: 1, x: 5.6, z: 14.8 },
      { id: 'g6-p-ammo3', item: 'handgun_ammo', count: 15, x: 8.3, z: 21.3 },
    ],
    enemies: [
      { id: 'g6-z1', type: 'zombie', x: 6.5, z: 3 },        // 街上的居民感染者
      { id: 'g6-z2', type: 'zombie', x: 11, z: 4.5 },
      { id: 'g6-z3', type: 'zombie', x: 16.5, z: 2.5 },
      { id: 'g6-dog1', type: 'dog', x: 14.5, z: 6 },
      { id: 'g6-mutant1', type: 'mutant', x: 20.5, z: 3 },
      { id: 'g6-z4', type: 'zombie', x: 7.5, z: 10.5 },     // 站在冰櫃前的那個「客人」
      { id: 'g6-creeper1', type: 'creeper', x: 16, z: 9 },  // ★ 倉庫巢
      { id: 'g6-creeper2', type: 'creeper', x: 19.5, z: 12 },
      { id: 'g6-bloater1', type: 'bloater', x: 17.8, z: 11 }, // ★ 撞破後門的那個東西
      { id: 'g6-dog2', type: 'dog', x: 7, z: 20 },          // 後巷
    ],
    typewriters: [
      { id: 'g6-tw-store', x: 5.6, z: 13.4 },
      { id: 'g6-tw-office', x: 14.7, z: 16.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
