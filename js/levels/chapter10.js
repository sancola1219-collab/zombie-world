// 第十章〈仁愛醫院〉：欣儀左臂的抓傷化膿滲黑——不是 KY 感染，是普通的、會要人命的細菌感染。
// 需要抗生素，抗生素在仁愛醫院的藥局。醫院爆發時最慘：慘白的檢傷燈、翻倒的病床、
// 走廊盡頭天花板管線裡爬行的東西。晨星的「醫療支援隊」三週前就進駐採檢——病歷全被收走。
// 本章沒有單一魔王，是「密度恐怖」：潛伏者×2＋巨蛛×2＋變異體。推進：護理站拿藥局鑰匙。
export const CHAPTER10 = {
  id: 'chapter10',
  name: '第十章：仁愛醫院',
  next: 'chapter11',
  exitNeeds: 'medkey',
  exitHint: '藥局深處有一道醫護專用的後門，通卸貨巷。藥局鑰匙照交班規矩不會插在門上——護理站的人，永遠把鑰匙親手留給下一班',
  spawn: { x: 1.5, z: 4, yaw: Math.PI / 2 }, // 急診大廳西側半開的自動門，面向東
  lockNames: { medkey: '藥局鑰匙', chapterExit: '醫院後門' },
  story: [
    '分局後門關上的那一刻，欣儀靠在牆上，慢慢滑了下去。\n\n左臂的繃帶滲出的不是血——是一種暗色的、近乎黑的液體。她自己先開口：「別問。從排水幹線那時候就開始了。」\n\n亮均蹲下來看傷口。抓痕周圍的皮膚泛灰，微微發燙。\n\n（不是 KY。感染者不會撐著三天還替我包紮、替我數子彈。是傷口在化膿——最普通、也最會要人命的那一種。）\n\n「需要抗生素。」他說。',
    '「仁愛醫院。」欣儀朝街口抬了抬下巴。\n\n三個街區外，醫院大樓的輪廓浮在夜色裡。十二層樓，全黑，只有急診入口的紅色十字還亮著——備用電池撐著的最後一點光。\n\n「醫院爆發的時候一定最慘。」她說，「病人、家屬、一車一車送進來的傷患……」\n\n「所以晨星的人也一定來過。」亮均檢查了彈匣，「病歷、檢體、疫情起點的紀錄——全在醫院。他們拿走的，跟他們漏掉的，都值得看。」\n\n（去拿藥。順便，看看這場「疫情」在醫院留下的帳。）',
    '急診入口的自動門停在半開，門縫剛好過人。\n\n大廳裡，檢傷燈管一半滅了，剩下那一半白得刺眼。輪椅翻倒在掛號機前面，號碼紙吐了一地，像一條白色的舌頭。\n\n欣儀壓低聲音：「醫院跟別的地方不一樣。這裡的感染者……生前就已經躺在病床上了。」\n\n走廊深處，天花板的輸氧管線傳來「叩、叩」兩聲。然後安靜。\n\n（醫院的恐怖不是屍體多。是這棟樓的每一個角落，都設計成「有人會來救你」的樣子——而現在，沒有人會來。）',
  ],
  endingText:
    '藥局的冷藏櫃還剩微弱的電。欣儀把抗生素數出七天份，手停了一下，又放回去三天份——「留給下一個需要的人」。後門推開，卸貨巷的夜風灌進來，吹散了整層樓的消毒水味。往電信機房的路，會穿過黑鴉夜市。遠處的街區傳來規律的低鳴——引擎聲？發電機？停電三天的城市裡，是誰、憑什麼，還能讓機器轉起來？〔續　第十一章〕',
  objective: '找到藥局鑰匙，拿到抗生素，從醫院後門離開',
  rooms: [
    { id: 'er', name: '急診大廳', x: 0, z: 0, w: 10, d: 8, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 5, y: 3, z: 4, color: 0xdfe8ee, intensity: 20, flicker: true } }, // 慘白的檢傷燈
    { id: 'corridor', name: '病房走廊', x: 10, z: 2, w: 16, d: 3.5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 18, y: 2.6, z: 3.75, color: 0xcfd8dd, intensity: 13, flicker: true } }, // 長廊，看不見盡頭
    { id: 'nurse', name: '護理站', x: 12, z: 5.5, w: 6, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 15, y: 2.6, z: 8, color: 0xffe4c0, intensity: 16 } }, // 還亮著的桌燈
    { id: 'or', name: '手術室', x: 20, z: 5.5, w: 6, d: 6, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 23, y: 2.8, z: 8.5, color: 0xbfe8dc, intensity: 20, flicker: true } }, // 無影燈
    { id: 'pharmacy', name: '藥局', x: 26, z: 0, w: 5, d: 5.5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 28.5, y: 2.6, z: 2.7, color: 0xffe0b0, intensity: 15 } },
  ],
  doors: [
    { id: 'd10-er-corr', from: 'er', to: 'corridor', axis: 'z', at: [10, 3.7], width: 1.6, height: 2.4, lock: null },
    { id: 'd10-corr-nurse', from: 'corridor', to: 'nurse', axis: 'x', at: [15, 5.5], width: 1.5, height: 2.2, lock: null },
    { id: 'd10-corr-or', from: 'corridor', to: 'or', axis: 'x', at: [23, 5.5], width: 1.4, height: 2.3, lock: null },
    { id: 'd10-corr-pharm', from: 'corridor', to: 'pharmacy', axis: 'z', at: [26, 3.5], width: 1.2, height: 2.2, lock: 'medkey' },
    { id: 'd10-exit', from: 'pharmacy', to: null, axis: 'x', at: [28.5, 5.5], width: 1.4, height: 2.3, lock: 'chapterExit' },
  ],
  props: [
    // 急診大廳：檢傷台、翻倒的輪椅與病床、排在角落的屍袋
    { room: 'er', type: 'table', x: 5, z: 1.2, solid: 0.5 },            // 檢傷台
    { room: 'er', type: 'papers', x: 5.2, z: 1.4 },
    { room: 'er', type: 'table', x: 8.5, z: 3.5, rot: 0.5, solid: 0.5 }, // 翻倒的推床
    { room: 'er', type: 'chair_fallen', x: 3, z: 5.5, rot: 1.3 },        // 翻倒的輪椅
    { room: 'er', type: 'crate', x: 1.8, z: 0.6, solid: 0.4 },           // 沒拆封的物資箱
    { room: 'er', type: 'bodybag', x: 9, z: 7.3, rot: 0.4 },
    { room: 'er', type: 'bodybag', x: 7.8, z: 7.5, rot: -0.2 },          // 來不及送走的
    { room: 'er', type: 'blood', x: 6.5, z: 6.8 },
    { room: 'er', type: 'debris', x: 2.5, z: 2.5 },
    { room: 'er', type: 'cardboard', x: 9.4, z: 1 },
    // 病房走廊：天花板輸氧管線（潛伏者的路）、橫在走廊的病床
    { room: 'corridor', type: 'pipe', x: 18, z: 2.4, len: 15, y: 2.7, rot: Math.PI / 2 },
    { room: 'corridor', type: 'table', x: 13, z: 4.8, rot: 0.3, solid: 0.5 },  // 橫著的病床
    { room: 'corridor', type: 'table', x: 20, z: 2.7, rot: -0.2, solid: 0.5 },
    { room: 'corridor', type: 'chair_fallen', x: 16, z: 4.9, rot: 2 },
    { room: 'corridor', type: 'corpse', x: 19.5, z: 4.9, variant: 2 },
    { room: 'corridor', type: 'blood', x: 15, z: 3 },
    { room: 'corridor', type: 'blood', x: 23.5, z: 3.4 },
    { room: 'corridor', type: 'debris', x: 25, z: 2.6 },
    // 護理站：櫃台、藥車、翻開的交班簿
    { room: 'nurse', type: 'table', x: 14, z: 7.4, solid: 0.55 },        // 護理站櫃台
    { room: 'nurse', type: 'papers', x: 14.2, z: 7.6 },
    { room: 'nurse', type: 'shelf', x: 12.3, z: 10.2, rot: Math.PI, solid: 0.28 },   // 藥車
    { room: 'nurse', type: 'shelf', x: 17.7, z: 7.6, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'nurse', type: 'chair_fallen', x: 15.5, z: 9.5, rot: 0.8 },
    { room: 'nurse', type: 'blood', x: 13, z: 6 },
    // 手術室：手術台、器械架、倒下的氧氣瓶
    { room: 'or', type: 'table', x: 23, z: 8.5, solid: 0.6 },            // 手術台
    { room: 'or', type: 'papers', x: 23.2, z: 8.7 },
    { room: 'or', type: 'shelf', x: 25.7, z: 9.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'or', type: 'barrel', x: 20.5, z: 7.5, solid: 0.3 },         // 氧氣鋼瓶
    { room: 'or', type: 'corpse', x: 21.5, z: 10.8, variant: 0 },        // 沒下手術台的人
    { room: 'or', type: 'blood', x: 23.2, z: 9.6 },
    // 藥局：藥架成排，有一排被翻倒
    { room: 'pharmacy', type: 'shelf', x: 26.4, z: 2, rot: Math.PI / 2, solid: 0.28 },
    { room: 'pharmacy', type: 'shelf', x: 28.5, z: 0.45, solid: 0.28 },
    { room: 'pharmacy', type: 'shelf', x: 30.6, z: 3, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'pharmacy', type: 'crate', x: 26.8, z: 4.9, solid: 0.4 },
    { room: 'pharmacy', type: 'papers', x: 29, z: 2.8 },                 // 散落一地的管制清單
    { room: 'pharmacy', type: 'cardboard', x: 30.3, z: 1 },
    { room: 'pharmacy', type: 'blood', x: 28, z: 3.8 },
  ],
  // 醫院危險：感染者留下的黑色滲液、掉落泡水的維生設備電線、酒精架的火
  hazards: [
    { room: 'er', type: 'slime', x: 6, z: 4.5, r: 0.85 },        // 推床下蔓延的黑色滲液
    { room: 'corridor', type: 'shock', x: 17, z: 2.8, r: 0.8 },  // 掉落的維生設備電線
    { room: 'corridor', type: 'slime', x: 22.5, z: 4.2, r: 0.9 },
    { room: 'or', type: 'shock', x: 24.8, z: 8.3, r: 0.75 },     // 電燒灼器漏電
    { room: 'pharmacy', type: 'fire', x: 29.6, z: 1.2, r: 0.8 }, // 打翻的酒精架
  ],
  documents: [
    {
      id: 'g10-doc-triage', title: '急診檢傷紀錄（三週前）', x: 7.8, z: 1.2,
      text: '檢傷序號 0847：男，34，前臂黑色水泡，主訴夜間發熱。判定：接觸性過敏。衛教後離院。\n檢傷序號 0851：女，19，同樣症狀。判定：過敏。\n檢傷序號 0862：男，61，黑色水泡＋畏光。判定：過敏，轉皮膚科（候診）。\n\n（三週前。市區早就有病例了。一模一樣的症狀進來一個、歸檔一個——「過敏」兩個字，把整場疫情的前兆蓋得乾乾淨淨。）\n\n（第一線的檢傷護理師照著手冊做，沒有錯。錯的是手冊上面那隻改判定的手。）',
    },
    {
      id: 'g10-doc-shift', title: '護理站交班簿（最後一頁）', x: 12.4, z: 6,
      text: '21:40　三樓隔離區又收兩床，症狀同前。晨星的「支援隊」直接接手，不給碰。\n22:15　支援隊帶走 301、302、305 三位病人，說是「轉院」。家屬簽的單子我瞄到一眼，抬頭不是醫院的，是他們公司的。\n22:50　停電。發電機只撐了十分鐘。三樓在敲牆壁。\n23:05　學妹，如果你看到這頁——不要上三樓。把藥局鑰匙\n\n（字跡到這裡拖出一條長長的墨痕。）\n\n（「把藥局鑰匙」——怎麼樣？留在哪裡？她想寫完的，是交班的最後一件事。）',
    },
    {
      id: 'g10-doc-photo', title: '抽屜裡的生日會照片', x: 17.5, z: 10, monoAfter: true,
      text: '（護理站抽屜深處壓著一張拍立得。小小的護理站擠了七、八個人，中央的蛋糕插著蠟燭，每個人都比著剪刀手。）\n\n（照片下緣的手寫字：）\n\n「小雅生日快樂！小夜班的蛋糕永遠留一塊給大夜班——冰箱第二層，別讓學姊發現。」\n\n（茶水間的冰箱還在。第二層有一個空盤子，保鮮膜掀開了一半。）\n\n（大夜班的人回來吃過了。然後呢？然後去了哪裡？）',
    },
    {
      id: 'g10-doc-ms', title: '晨星工業「醫療支援」公文', x: 20.6, z: 10.9,
      text: '受文者：仁愛醫院院長室\n主旨：本公司醫療支援隊進駐貴院事宜\n說明：\n一、為協助貴院應處近期不明皮膚症狀病患，本公司派遣支援隊八名進駐急診。\n二、支援隊將「協助採檢」，檢體由本公司統一保管化驗，貴院毋需留存副本。\n三、相關病歷依保密協議辦理，原件由支援隊收整。\n\n——晨星工業健康事業部\n\n（「毋需留存副本」。支援是假的，收走檢體和病歷才是真的。三週前他們就進駐了——不是來治病，是來採樣的。）',
    },
  ],
  npcs: [
    {
      id: 'xinyi',
      name: '林欣儀',
      x: 13.2, z: 8.6, yaw: Math.PI / 2, room: 'nurse',
      dialog: [
        '（欣儀在護理站的椅子上坐下，把左臂的繃帶一圈一圈解開——傷口周圍的皮膚泛著淡淡的灰黑）……別那個表情。比昨天好，真的。',
        '（她用生理食鹽水沖傷口，手很穩，聲音也很穩）在廠裡受傷的那一晚我就在想：感染的判定標準是什麼？發燒？變色？還是……開始聽得懂那種聲音？',
        '亮均，聽我說。如果我變成那樣——變成走廊上那些東西——你要先走。帶著證據走。不要回頭，不要猶豫，更不要把子彈留給我用不著的溫柔。',
        '（亮均說：「不會有那一天。」她看著他，看了很久，忽然笑了）……你這個人，開會的時候明明最會講「風險控管」。好吧。那就麻煩你，把風險控管好。',
        '藥局在走廊最底。鑰匙不會插在門上——護理站交班有規矩，管制藥的鑰匙永遠親手交給下一班。找找櫃台，看最後一班把它留在了哪裡。',
      ],
      dialogAfter: '（欣儀重新纏好繃帶，動作利落得像沒事）抗生素找「頭孢」開頭的，藥局左邊第二排。……剛剛的話還算數。但我會撐到用不上它的那一天。',
      gift: [
        { item: 'blue_herb', count: 1 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g10-t-er', room: 'er', text: '急診大廳。檢傷燈管滅了一半，剩下那一半白得像加護病房的凌晨。掛號機還在吐號碼紙——沒有人取。', sound: 'door',
      monologue: '（234 號。最後一個抽號碼牌的人，等到叫號了嗎？）' },
    { id: 'g10-t-corr', room: 'corridor', text: '病房走廊，長得看不到盡頭。天花板的輸氧管線在響——不是風。上面有東西，貼著管子在爬。', alert: true, shake: 0.06,
      monologue: '（醫院的天花板夾層四通八達，走得比走廊還快。別只盯著地面。）' },
    { id: 'g10-t-nurse', room: 'nurse', text: '護理站。交班簿攤開在櫃台上，最後一筆停在一半。呼叫鈴面板上，七盞燈還亮著。',
      monologue: '（七個病房在呼叫。沒有人去。也沒有人能去了。）' },
    { id: 'g10-t-or', room: 'or', text: '手術室。無影燈還亮著，器械在托盤上排得整整齊齊——手術沒有開始，人就不在了。', sound: 'groan',
      monologue: '（消毒水的味道底下混著別的味道，甜的、腐的。牆角的陰影，在動。）' },
    { id: 'g10-t-pharm', room: 'pharmacy', text: '藥局。抗生素的架位貼著整齊的標籤，角落的藥架卻被整排翻倒——有人比你們先來過，拿走的不是藥，是管制紀錄。',
      monologue: '（晨星連醫院都清過一遍。他們怕的從來不是藥品流出——是病歷流出。）' },
  ],
  entities: {
    pickups: [
      { id: 'g10-p-ammo1', item: 'handgun_ammo', count: 15, x: 2, z: 7 },
      { id: 'g10-p-herb1', item: 'green_herb', count: 1, x: 8.8, z: 1 },
      { id: 'g10-p-shells1', item: 'shotgun_shells', count: 7, x: 12, z: 2.5 },
      { id: 'g10-p-blue1', item: 'blue_herb', count: 1, x: 25, z: 4.5 },      // 黑色滲液旁
      { id: 'g10-p-ammo2', item: 'handgun_ammo', count: 15, x: 13, z: 9.5 },
      { id: 'g10-p-medkey', item: 'medkey', count: 1, x: 16.8, z: 6 },        // ★ 護理站櫃台——交班留下的鑰匙
      { id: 'g10-p-red1', item: 'red_herb', count: 1, x: 12.5, z: 7.5 },      // 藥車上的乾燥藥草
      { id: 'g10-p-spray1', item: 'first_aid_spray', count: 1, x: 21, z: 10.8 },
      { id: 'g10-p-smgammo1', item: 'smg_ammo', count: 30, x: 25.2, z: 6.5 },
      { id: 'g10-p-shells2', item: 'shotgun_shells', count: 7, x: 20.8, z: 6.2 },
      { id: 'g10-p-herb2', item: 'green_herb', count: 1, x: 26.8, z: 0.9 },
      { id: 'g10-p-magammo1', item: 'magnum_ammo', count: 6, x: 30.2, z: 4.7 }, // 上鎖藥局深處的報酬
    ],
    enemies: [
      { id: 'g10-z1', type: 'zombie', x: 7.5, z: 6 },          // 大廳裡穿病人服的
      { id: 'g10-z2', type: 'zombie', x: 4, z: 7 },
      { id: 'g10-z3', type: 'zombie', x: 14, z: 3.5 },         // 走廊
      { id: 'g10-lurker1', type: 'lurker', x: 19, z: 3.8 },    // ★ 天花板輸氧管線上
      { id: 'g10-lurker2', type: 'lurker', x: 24.5, z: 3 },    // ★ 藥局門前的天花板
      { id: 'g10-z4', type: 'zombie', x: 21.5, z: 4.5 },
      { id: 'g10-spider1', type: 'spider', x: 22, z: 8 },      // 手術室
      { id: 'g10-spider2', type: 'spider', x: 24.5, z: 10.5 },
      { id: 'g10-mutant1', type: 'mutant', x: 28.5, z: 2.5 },  // 鎖在藥局裡的東西
    ],
    typewriters: [
      { id: 'g10-tw-er', x: 0.7, z: 0.7 },
      { id: 'g10-tw-nurse', x: 17.5, z: 8.7 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
