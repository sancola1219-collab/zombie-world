// 第七章〈國小避難所〉：阿哲的家人去了國小——但校門敞開，避難所已空。
// 川堂禮堂的地鋪整整齊齊留在原地，名冊上的名字一頁頁被劃掉；留下的只有受傷的護理師佩珊。
// 魔王：裂嘴犬王（dogking）率犬群佔據操場——牠們把校園當成了獵場。
// 推進：訓導處抽屜拿校門鑰匙開學校側門。倖存者往河邊撤了——下一站，地下道。
export const CHAPTER7 = {
  id: 'chapter7',
  name: '第七章：國小避難所',
  next: 'chapter8',
  exitNeeds: 'gatekey',
  exitHint: '側門上了鎖。訓導處保管全校的鑰匙——那串掛牌寫著「側門」的黃銅鑰匙應該在主任的抽屜裡',
  spawn: { x: 1.5, z: 4, yaw: Math.PI / 2 }, // 校門口，面向東（操場方向）
  lockNames: { gatekey: '校門鑰匙', chapterExit: '學校側門' },
  story: [
    '國小的圍牆上拉著白布條，紅漆大字被雨水暈開：「黑鴉市臨時避難所——請至川堂報到」。\n\n校門敞開著。\n\n沙包堆在門柱兩側，拒馬歪倒在地，門口的桌子上還放著簽到簿，和一支沒蓋回筆蓋的原子筆。\n\n（避難所的門，不應該是開著的。）',
    '欣儀在校門口停了很久。\n\n「沒有聲音。」她說，「幾百個人的避難所，沒有一點聲音。」\n\n亮均看著操場的方向。跑道上散落著行李——來不及帶走的那種散落法：一只鞋、一個保溫瓶、一台嬰兒車，空的。\n\n遠處，有狗吠。\n\n不是一隻，是一群。而且吠聲的底下，墊著一種更低、更沉的東西，像雷聲滾過地面。\n\n（阿哲的媽媽和妹妹在這裡。姓陳，妹妹叫小穗。我答應過，要幫他看一眼。）',
    '穿過校門，公佈欄上貼著避難所的生活公約：「保持安靜／物資統一分配／晚上九點熄燈」。\n\n最後一行是後來用麥克筆加上去的，字跡潦草——\n\n「不要靠近操場」。\n\n欣儀握緊了槍。\n\n（幾百個人守著規矩安靜、排隊、熄燈——到最後，還是得在公約的末尾，加上這一行。）',
  ],
  endingText:
    '校門鑰匙插進側門的鎖孔，轉開的瞬間，操場那頭傳來犬群散去的嗚咽——王死了，獵場散了。佩珊撐著繃帶站起來，指向河的方向：「大家往河邊撤，說要過橋……但主要道路全被晨星的路障堵死了。」她頓了頓，「還有一條路。學校後面的地下道，清淤班以前走的，直通排水幹線。」她看著亮均，聲音壓低：「只是這幾天，下面一直有聲音。很大的、東西在水裡翻身的聲音。」〔續　第八章〕',
  objective: '搜索空無一人的避難所，查明幾百個人去了哪裡，並找到打開學校側門的校門鑰匙',
  rooms: [
    { id: 'gate', name: '校門口', x: 0, z: 0, w: 6, d: 8, h: 5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 3, y: 4.2, z: 4, color: 0x778899, intensity: 12, flicker: true } }, // 警衛室外的壁燈
    { id: 'field', name: '操場', x: 6, z: 0, w: 20, d: 14, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 16, y: 5, z: 7, color: 0x99aacc, intensity: 15, flicker: true } },  // 殘存的操場探照燈——★犬王的獵場
    { id: 'hall', name: '川堂禮堂', x: 6, z: 14, w: 14, d: 8, h: 4, floor: 'wood', walls: 'plaster',
      light: { x: 13, y: 3.4, z: 18, color: 0xffd8a0, intensity: 16, flicker: true } }, // 緊急照明
    { id: 'clinic', name: '保健室', x: 20, z: 14, w: 5, d: 5, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 22.5, y: 2.6, z: 16.5, color: 0xcfe0d8, intensity: 15 } },
    { id: 'office', name: '訓導處', x: 0, z: 14, w: 6, d: 6, h: 3, floor: 'wood', walls: 'plaster',
      light: { x: 3, y: 2.5, z: 17, color: 0xffe0b0, intensity: 14 } },
  ],
  doors: [
    { id: 'd7-gate-field', from: 'gate', to: 'field', axis: 'z', at: [6, 4], width: 1.8, height: 2.6, lock: null },
    { id: 'd7-field-hall', from: 'field', to: 'hall', axis: 'x', at: [13, 14], width: 1.8, height: 2.6, lock: null }, // 川堂大門
    { id: 'd7-hall-clinic', from: 'hall', to: 'clinic', axis: 'z', at: [20, 16.5], width: 1.1, height: 2.1, lock: null },
    { id: 'd7-hall-office', from: 'hall', to: 'office', axis: 'z', at: [6, 17], width: 1.1, height: 2.1, lock: null },
    { id: 'd7-exit', from: 'hall', to: null, axis: 'x', at: [9, 22], width: 1.4, height: 2.4, lock: 'chapterExit' },  // 學校側門
  ],
  props: [
    // 校門口：沙包、簽到桌、歪倒的拒馬
    { room: 'gate', type: 'crate', x: 1, z: 1.2, solid: 0.4 },
    { room: 'gate', type: 'crate', x: 1.9, z: 0.8, solid: 0.4 },
    { room: 'gate', type: 'table', x: 3.5, z: 1, solid: 0.5 },   // 簽到桌
    { room: 'gate', type: 'papers', x: 3.7, z: 1.2 },
    { room: 'gate', type: 'debris', x: 5, z: 2.4 },              // 歪倒的拒馬
    { room: 'gate', type: 'trash', x: 0.7, z: 7.3 },
    { room: 'gate', type: 'hydrant', x: 5.4, z: 7.4 },
    { room: 'gate', type: 'blood', x: 3, z: 5.5 },
    // 操場：衝進來的轎車、來不及帶走的行李、司令台物資
    { room: 'field', type: 'car', x: 8, z: 2, rot: 0.7, variant: 1, solid: 1.0 }, // 撞垮圍牆衝進來的翻覆轎車
    { room: 'field', type: 'streetlight', x: 7, z: 13.4 },
    { room: 'field', type: 'streetlight', x: 25, z: 0.7, dead: true },
    { room: 'field', type: 'streetlight', x: 25, z: 13.3 },
    { room: 'field', type: 'crate', x: 23.5, z: 2, solid: 0.4 },  // 司令台旁的物資箱
    { room: 'field', type: 'crate', x: 24.3, z: 2.6, solid: 0.4 },
    { room: 'field', type: 'trash', x: 9, z: 0.8 },
    { room: 'field', type: 'debris', x: 12, z: 8 },
    { room: 'field', type: 'debris', x: 20, z: 4 },
    { room: 'field', type: 'blood', x: 14, z: 7 },
    { room: 'field', type: 'blood', x: 17, z: 9.5 },
    { room: 'field', type: 'corpse', x: 22.5, z: 11, variant: 0 },
    { room: 'field', type: 'bodybag', x: 10, z: 12.5, rot: 0.4 },
    { room: 'field', type: 'cardboard', x: 18, z: 12.8 },
    // 川堂禮堂：整齊的地鋪、講台、物資
    { room: 'hall', type: 'cardboard', x: 8, z: 16 },    // 地鋪
    { room: 'hall', type: 'cardboard', x: 10, z: 17.5 },
    { room: 'hall', type: 'cardboard', x: 8.5, z: 19.5 },
    { room: 'hall', type: 'table', x: 14.5, z: 21.2, solid: 0.5 }, // 講台
    { room: 'hall', type: 'table', x: 16, z: 16, solid: 0.5 },     // 物資分配桌
    { room: 'hall', type: 'chair_fallen', x: 11, z: 20, rot: 1.1 },
    { room: 'hall', type: 'chair_fallen', x: 17, z: 15.3, rot: 2.6 },
    { room: 'hall', type: 'crate', x: 6.8, z: 14.8, solid: 0.4 },
    { room: 'hall', type: 'barrel', x: 19.3, z: 18, solid: 0.35 },  // 飲水桶
    { room: 'hall', type: 'papers', x: 10.2, z: 16.2 },
    { room: 'hall', type: 'blood', x: 13, z: 18 },
    { room: 'hall', type: 'bodybag', x: 15.5, z: 18.5, rot: -0.5 },
    // 保健室：診療台與半空的藥櫃
    { room: 'clinic', type: 'table', x: 23.5, z: 14.8, solid: 0.5 },
    { room: 'clinic', type: 'shelf', x: 24.5, z: 17, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'clinic', type: 'papers', x: 23.6, z: 15 },
    { room: 'clinic', type: 'chair_fallen', x: 21, z: 18.3, rot: 0.8 },
    { room: 'clinic', type: 'blood', x: 21.5, z: 14.7 },
    // 訓導處：主任辦公桌與鑰匙抽屜
    { room: 'office', type: 'table', x: 3, z: 16.5, solid: 0.5 },
    { room: 'office', type: 'papers', x: 3.2, z: 16.6 },
    { room: 'office', type: 'shelf', x: 0.8, z: 18.8, rot: Math.PI / 2, solid: 0.28 },
    { room: 'office', type: 'chair_fallen', x: 4.5, z: 15.2, rot: 2.1 },
    { room: 'office', type: 'debris', x: 1.2, z: 15 },   // 倒下的獎盃櫃
    { room: 'office', type: 'trash', x: 5.3, z: 19.3 },
  ],
  // 校園危險：燒過的行李堆、翻車餘火、泛藍積水（KY）、廣播配電箱垂落的電線
  hazards: [
    { room: 'gate', type: 'fire', x: 2.8, z: 6.8, r: 0.8 },      // 燒過的行李堆
    { room: 'field', type: 'fire', x: 9.4, z: 3.2, r: 0.85 },    // 翻覆轎車的餘火
    { room: 'field', type: 'slime', x: 10.5, z: 5.5, r: 0.9 },   // 泛藍積水
    { room: 'field', type: 'slime', x: 21, z: 12, r: 0.85 },
    { room: 'hall', type: 'shock', x: 18.6, z: 14.8, r: 0.8 },   // 廣播配電箱垂落的電線
  ],
  documents: [
    {
      id: 'g7-doc-guard', title: '警衛室出入登記簿', x: 0.8, z: 1,
      text: '國小警衛室　車輛出入登記\n\n0519 22:40　晨星工業　廂型車×2　「校園環境消毒」　核准人：（空白）\n0520 23:15　晨星工業　廂型車×3　「飲用水質檢測」　核准人：（空白）\n0521 08:00　警衛老周留言：上面說配合就好，不用登記。那我這本子是寫辛酸的？\n\n（避難所開張前兩天，晨星就進來「消毒」過了。\n幾百個人被圈進來的地方，先被誰檢查過？核准人永遠空白——出了事，名字留在本子上的，只有警衛老周。）',
    },
    {
      id: 'g7-doc-roster', title: '避難所收容名冊', x: 10, z: 16,
      text: '黑鴉市臨時避難所　收容名冊（川堂）\n\n第 1 頁：王明德、王林秀枝、李國彰……（工整的正楷，一格一格編了床位）\n第 7 頁：字跡開始潦草，床位欄空著。\n第 9 頁起，有些名字被原子筆劃掉。劃掉的名字後面，註記著同一個小字：「發燒」。\n第 11 頁，劃掉的比留下的多。\n\n（名冊是活的。前面幾頁是希望，後面幾頁是統計。\n把名字劃掉的那個人，每劃一筆，手都在抖。）',
    },
    {
      id: 'g7-doc-broadcast', title: '疏散廣播稿', x: 14.5, z: 20.5,
      text: '（講台上留著一張手寫廣播稿，邊角被捏得發皺）\n\n「各位鄉親請注意，請保持冷靜。因應圍牆破損，本避難所即刻起分批向河濱疏散。請攜帶隨身物品，由自衛隊引導，長者與孩童優先——」\n\n稿子到這裡斷掉，最後是一道拖長的筆痕，劃出紙面。\n\n（廣播沒有播完。拿著稿子的人，是在唸到一半的時候，放下它的。）',
    },
    {
      id: 'g7-doc-meds', title: '保健室領藥登記', x: 20.7, z: 18.5,
      text: '保健室領藥登記（避難所開設後）\n\n第一天：擦傷×12、感冒×3、安眠×1。\n第三天：安眠×9。發燒×4——隔離在器材室。\n第五天：退燒藥發完了。發燒的人數不寫了，寫了也沒有藥。\n最後一行：「把剩下的藥留給還用得到的人。」\n\n（藥是有限的，發燒是無限的。\n寫下這一行之後，佩珊留了下來，守著一個半空的藥櫃。）',
    },
    {
      id: 'g7-doc-photo', title: '抽屜裡的接力照片', x: 4.6, z: 17.8, monoAfter: true,
      text: '（訓導處抽屜裡壓著一張放大又拆了框的照片：運動會大隊接力，紅色跑道，滿場的加油旗。）\n\n（一個小女孩正在交棒，跑得整個人飛起來，辮子甩在半空。照片下緣有鉛筆字：）\n\n「三年二班　陳小穗　最後一棒　逆轉」\n\n（小穗。阿哲的妹妹。\n這條紅色跑道，上星期還有孩子在上面飛。\n現在蹲在跑道上的東西，也在等發令槍。）',
    },
  ],
  npcs: [
    {
      id: 'nurse',
      name: '佩珊',
      x: 22.8, z: 17.5, yaw: 0, room: 'clinic',
      dialog: [
        '（保健室的白簾後，一個綁著滲血繃帶的女人背靠藥櫃坐著，手裡握著一把剪刀。看清來人，她才把剪刀放下）……是人。太好了。我是佩珊，這裡的護理師——好吧，「曾經是避難所」的護理師。',
        '大家走了，前天晚上。操場圍牆被那些狗撞垮了一角，牠們的王……你們等一下就會知道，那不是狗該有的體型。里長和自衛隊決定連夜往河邊撤，說要過橋到對岸。',
        '（她按住腿上的繃帶）我斷後的時候被抓了一道，跟不上隊伍，就留下來了。反正保健室總要有人看著——萬一，有人回來拿藥呢。',
        '你們在找陳媽媽和小穗？（她翻開桌上的名冊）陳秀蘭、陳小穗……有，撤離名單裡有。回去可以告訴便利商店那個弟弟：前天晚上，他媽媽牽著妹妹，是自己走出去的。',
        '側門的鑰匙在訓導處，主任把全校的鑰匙都收在辦公桌抽屜。但過去得穿過川堂……還有，聽我一句：無論如何，不要從操場的正中間走。牠在等會動的東西。',
      ],
      dialogAfter: '（佩珊把急救噴劑塞過來，不容拒絕）拿著，我這裡還有。到了河邊，如果看到大隊……告訴他們，保健室的燈還亮著，我等他們回來拿藥。',
      gift: [
        { item: 'first_aid_spray', count: 1 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g7-t-gate', room: 'gate', text: '校門口。白布條上「臨時避難所」的紅字被雨暈開，簽到簿攤在桌上，最後一筆停在半個名字。', sound: 'door',
      monologue: '（撤退的時候，沒有人想到要收簽到簿。名字留在這裡，人不知道在哪裡。）' },
    { id: 'g7-t-field', room: 'field', text: '操場。跑道上散落著行李與童鞋，旗桿空著。跑道中央，一頭小牛犢大小的犬形輪廓緩緩抬起頭——牠周圍的犬群，同時停止了走動。', alert: true, shake: 0.08, sound: 'dogbark' },
    { id: 'g7-t-hall', room: 'hall', text: '川堂禮堂。幾百張地鋪整整齊齊留在原地，棉被摺得方方正正——撤離的人到最後一刻都守著秩序。', sound: 'door',
      monologue: '（連逃難都把棉被摺好。守規矩的人，值得一個守規矩的結局。他們沒有得到。）' },
    { id: 'g7-t-clinic', room: 'clinic', text: '保健室。藥櫃半空，白色簾子後透出人影。一個沙啞的女聲：「有人嗎？……我這裡還有藥。」' },
    { id: 'g7-t-office', room: 'office', text: '訓導處。獎盃櫃倒了一半，主任的辦公桌卻整整齊齊，抽屜的鑰匙孔擦得發亮。',
      monologue: '（把幾百人的名冊管到最後一刻的人，抽屜永遠是整齊的。鑰匙一定還在。）' },
  ],
  entities: {
    pickups: [
      { id: 'g7-p-ammo1', item: 'handgun_ammo', count: 15, x: 0.8, z: 5.8 },
      { id: 'g7-p-herb1', item: 'green_herb', count: 1, x: 5.2, z: 0.8 },
      { id: 'g7-p-shells1', item: 'shotgun_shells', count: 7, x: 24, z: 1.4 },  // 司令台物資箱旁
      { id: 'g7-p-smg1', item: 'smg_ammo', count: 30, x: 16, z: 0.8 },          // 自衛隊遺落
      { id: 'g7-p-blue1', item: 'blue_herb', count: 1, x: 11.3, z: 6.2 },       // 積水旁（解 slime 中毒）
      { id: 'g7-p-ammo2', item: 'handgun_ammo', count: 15, x: 7.5, z: 20.8 },
      { id: 'g7-p-herb2', item: 'green_herb', count: 1, x: 12.5, z: 21.3 },
      { id: 'g7-p-shells2', item: 'shotgun_shells', count: 7, x: 19.4, z: 21.4 },
      { id: 'g7-p-spray1', item: 'first_aid_spray', count: 1, x: 20.6, z: 14.6 },
      { id: 'g7-p-blue2', item: 'blue_herb', count: 1, x: 24.4, z: 14.6 },
      { id: 'g7-p-gatekey', item: 'gatekey', count: 1, x: 3.4, z: 17.3 },       // ★ 主任辦公桌抽屜
      { id: 'g7-p-ammo3', item: 'handgun_ammo', count: 15, x: 0.8, z: 16 },
    ],
    enemies: [
      { id: 'g7-dogking', type: 'dogking', x: 16, z: 7 },   // ★ 裂嘴犬王——操場中央，等發令槍
      { id: 'g7-dog1', type: 'dog', x: 12.5, z: 4 },        // 犬群圍攻
      { id: 'g7-dog2', type: 'dog', x: 19, z: 10.5 },
      { id: 'g7-dog3', type: 'dog', x: 22.5, z: 5.5 },
      { id: 'g7-z1', type: 'zombie', x: 4.8, z: 7 },        // 沒能跟上撤離的人
      { id: 'g7-z2', type: 'zombie', x: 8.5, z: 11.5 },
      { id: 'g7-z3', type: 'zombie', x: 11, z: 18.5 },      // 川堂
      { id: 'g7-mutant1', type: 'mutant', x: 16.5, z: 19 },
      { id: 'g7-z4', type: 'zombie', x: 2, z: 19 },         // 訓導處
    ],
    typewriters: [
      { id: 'g7-tw-hall', x: 6.6, z: 21.4 },
      { id: 'g7-tw-clinic', x: 24.5, z: 18.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
