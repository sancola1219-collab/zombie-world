// 第十五章〈白色警戒〉：醫院篇開幕。證據播出後，晨星急停「全區淨化」改打防疫牌，
// 以「醫療支援」之名接管黑鴉市立總醫院。而欣儀的左臂感染終於壓不住——高燒、黑紋蔓延。
// 亮均背著她衝進急診：救她，是進這座白色堡壘的理由；揭開 S 計畫的醫療端，是走出去的代價。
export const CHAPTER15 = {
  id: 'chapter15',
  name: '第十五章：白色警戒',
  next: 'chapter16',
  exitNeeds: 'erkey',
  exitHint: '通往住院大樓的連通門被管制了——護理長說她在藥品準備室藏了一張備用管制卡',
  spawn: { x: 2, z: 1.5, yaw: Math.PI / 2 }, // 救護車道西側，面向東
  lockNames: { erkey: '急診管制卡', chapterExit: '住院大樓連通門' },
  story: [
    '證據播出去的第三個小時，黑鴉市的天亮了。\n\n新聞直升機在河面上盤旋，警笛從四面八方逼近市區。晨星的「全區淨化」在輿論引爆的那一刻緊急喊停——他們不能在全國的鏡頭前燒掉一座城市。\n\n欣儀在轉播站的樓梯間倒下。\n\n她的左臂繃帶底下，黑色的紋路已經爬過手肘。額頭燙得嚇人。\n\n「亮均……」她的聲音很輕，「我好像，撐不太住了。」',
    '黑鴉市立總醫院，全市最後一個還在收治的地方。\n\n亮均背著欣儀走到急診車道時，看見的卻不是救護車——是晨星的黑色廂型車，一輛接一輛。穿白色防護衣的「醫療支援隊」在門口架起管制線，胸口別著晨星的紅白徽章。\n\n廣播裡是柔和的女聲：「本院已納入疫情管制，請民眾配合分流收治。」\n\n（收治。他們現在改叫收治了。）\n\n（燒不掉的東西，就用白色的布蓋起來。）',
    '急診大廳裡，燈亮得刺眼。\n\n候診椅上坐著一排「病患」，點滴架東倒西歪。有幾個人的姿勢不太對——頭垂得太低，手腕上的識別帶是晨星的藍色，不是醫院的白色。\n\n一個護理長攔住亮均，把他們拉進檢傷區的簾子後面。\n\n「別走正門的分流。」她壓低聲音，看了一眼欣儀的手臂，臉色變了。\n\n「這個症狀……三樓以上全是。聽我說，年輕人——被『收治』上樓的人，沒有一個下來過。」',
  ],
  endingText:
    '管制卡刷過讀卡機，連通門的鎖彈開一聲輕響。護理長替欣儀打上最後一劑退燒點滴：「這只能拖十二個小時。她需要的東西，這層樓沒有。」她把一張皺掉的樓層圖塞進亮均手裡，上面用紅筆圈著地下四樓——「晨星的人整晚往下搬東西。答案在下面。但你得先活著穿過上面的每一層。」住院大樓的電梯間裡，燈號停在 B4，不動了。〔續　第十六章〕',
  objective: '找到急診管制卡，帶欣儀進入住院大樓',
  rooms: [
    { id: 'bay', name: '救護車道', x: 0, z: 0, w: 14, d: 7, h: 5.5, sky: true, floor: 'asphalt', walls: 'brick',
      light: { x: 7, y: 4.8, z: 3.5, color: 0xa0c0e0, intensity: 22, flicker: true } }, // 清晨冷光
    { id: 'er', name: '急診大廳', x: 0, z: 7, w: 10, d: 8, h: 3.6, floor: 'tile', walls: 'plaster',
      light: { x: 5, y: 3.2, z: 11, color: 0xe8f0f4, intensity: 30 } }, // 刺眼的白燈
    { id: 'triage', name: '檢傷區', x: 10, z: 7, w: 4, d: 8, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 12, y: 2.8, z: 11, color: 0xd8e0d8, intensity: 20, flicker: true } },
    { id: 'corridor', name: '急診走廊', x: 14, z: 0, w: 4, d: 15, h: 3, floor: 'tile', walls: 'plaster',
      light: { x: 16, y: 2.6, z: 7.5, color: 0xc0c8c0, intensity: 16, flicker: true } },
    { id: 'prep', name: '藥品準備室', x: 18, z: 0, w: 6, d: 8, h: 3, floor: 'tile', walls: 'metal',
      light: { x: 21, y: 2.6, z: 4, color: 0xcfe0ff, intensity: 22 } },
  ],
  doors: [
    { id: 'd15-bay-er', from: 'bay', to: 'er', axis: 'x', at: [5, 7], width: 1.8, height: 2.6, lock: null },
    { id: 'd15-er-triage', from: 'er', to: 'triage', axis: 'z', at: [10, 11], width: 1.2, height: 2.2, lock: null },
    { id: 'd15-bay-corr', from: 'bay', to: 'corridor', axis: 'z', at: [14, 3.5], width: 1.4, height: 2.4, lock: null },
    { id: 'd15-triage-corr', from: 'triage', to: 'corridor', axis: 'z', at: [14, 10], width: 1.2, height: 2.2, lock: null },
    { id: 'd15-corr-prep', from: 'corridor', to: 'prep', axis: 'z', at: [18, 4], width: 1.2, height: 2.2, lock: null },
    { id: 'd15-exit', from: 'corridor', to: null, axis: 'x', at: [16, 15], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 救護車道：救護車（car）、晨星廂型車、管制路障
    { room: 'bay', type: 'car', x: 4.5, z: 4.5, rot: 0.2, solid: 1.0 },          // 救護車
    { room: 'bay', type: 'car', x: 10, z: 2.5, rot: -0.4, variant: 2, solid: 1.0 }, // 燒毀的晨星廂型車
    { room: 'bay', type: 'streetlight', x: 2, z: 0.7 },
    { room: 'bay', type: 'crate', x: 12.5, z: 5.5, solid: 0.4 }, // 管制物資
    { room: 'bay', type: 'trash', x: 1, z: 6 },
    { room: 'bay', type: 'blood', x: 7, z: 5.8 },
    { room: 'bay', type: 'corpse', x: 11.8, z: 6.3, variant: 2 }, // 倒下的「醫療支援隊」
    { room: 'bay', type: 'debris', x: 8.5, z: 1 },
    // 急診大廳：候診椅、點滴架（pipe 短）、翻倒的輪床（table）
    { room: 'er', type: 'table', x: 3, z: 9.5, solid: 0.5 },       // 翻倒的輪床
    { room: 'er', type: 'chair_fallen', x: 5.5, z: 12, rot: 1.4 },
    { room: 'er', type: 'chair_fallen', x: 6.4, z: 12.4, rot: 2.8 },
    { room: 'er', type: 'chair_fallen', x: 2, z: 13, rot: 0.4 },
    { room: 'er', type: 'papers', x: 7.5, z: 9 },
    { room: 'er', type: 'blood', x: 4.5, z: 10.8 },
    { room: 'er', type: 'blood', x: 8, z: 13.5 },
    { room: 'er', type: 'corpse', x: 8.6, z: 10.2, variant: 0 },   // 沒等到看診的人
    { room: 'er', type: 'cardboard', x: 1, z: 8.2 },
    // 檢傷區：簾幕後的工作台
    { room: 'triage', type: 'table', x: 12, z: 8.6, solid: 0.5 },
    { room: 'triage', type: 'papers', x: 12.2, z: 8.8 },
    { room: 'triage', type: 'shelf', x: 13.7, z: 13, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'triage', type: 'blood', x: 11, z: 12 },
    // 急診走廊：拖行痕跡
    { room: 'corridor', type: 'blood', x: 16, z: 5 },
    { room: 'corridor', type: 'blood', x: 15.5, z: 9.5 },
    { room: 'corridor', type: 'debris', x: 17, z: 12 },
    { room: 'corridor', type: 'bodybag', x: 15, z: 13.5, rot: 0.3 },
    // 藥品準備室：藥架陣
    { room: 'prep', type: 'shelf', x: 19.5, z: 1.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'prep', type: 'shelf', x: 19.5, z: 3.5, rot: Math.PI / 2, solid: 0.28 },
    { room: 'prep', type: 'shelf', x: 23.5, z: 2.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'prep', type: 'table', x: 21.5, z: 6, solid: 0.5 },
    { room: 'prep', type: 'chair_fallen', x: 20, z: 6.8, rot: 2.1 },
  ],
  hazards: [
    { room: 'bay', type: 'fire', x: 10.8, z: 3.3, r: 1.0 },   // 燒毀廂型車
    { room: 'bay', type: 'fire', x: 9.2, z: 1.8, r: 0.8 },
    { room: 'er', type: 'slime', x: 6.5, z: 13.8, r: 0.85 },  // 「病患」留下的
    { room: 'corridor', type: 'slime', x: 16.5, z: 11, r: 0.8 },
    { room: 'corridor', type: 'shock', x: 15.2, z: 2.5, r: 0.8 }, // 掉落的電擊器還通著電
    { room: 'prep', type: 'slime', x: 22.5, z: 7, r: 0.75 },
  ],
  documents: [
    {
      id: 'g15-doc-notice', title: '晨星「收治分流」公告', x: 3.5, z: 8,
      text: '【疫情管制通告】\n\n本院即刻起由晨星工業醫療支援隊協同管理。\n發燒、皮膚異色、傷口滲黑之病患，一律移送三樓以上「特殊收治區」。\n家屬不得陪同。病歷由支援隊統一保管。\n\n（家屬不得陪同。病歷統一保管。每一條，都是為了讓人「消失」而寫的。）',
    },
    {
      id: 'g15-doc-triage', title: '檢傷紀錄（最後一頁）', x: 12.6, z: 9,
      text: '06:12　男，34，左肩咬傷，意識清楚——移送三樓。\n06:19　女，8，手臂黑斑，無發燒——移送三樓。\n06:24　支援隊接管檢傷。本表停用。\n\n（最後一行的字跡是用力寫上去的，筆畫劃破了紙：）\n\n「八歲。沒發燒。也送三樓。他們不是在分流病人，是在挑樣本。」',
    },
    {
      id: 'g15-doc-photo', title: '抽屜裡的尾牙合照', x: 21.8, z: 6.2, monoAfter: true,
      text: '（藥品準備室的抽屜裡壓著一張合照。急診全科在尾牙的圓桌前擠成一團，每個人都比著讚，護理長被拱著站在中間，笑得最不自然。）\n\n（照片背面寫著：）\n\n「急診人，沒有選班的命，只有互相罩的義氣。——2025 尾牙」\n\n（今天早上，這一整桌人，還剩幾個站著？）',
    },
    {
      id: 'g15-doc-radio', title: '救護無線電抄錄', x: 5.5, z: 4,
      text: '05:40 「〇三車，載到的傷患在車上抽搐，皮膚變黑，請指示。」\n05:41 「回報總台，改送黑鴉總院，晨星支援隊接手。」\n05:43 「總台，他不動了。總台？」\n05:44 「……〇三車，照程序，送黑鴉總院。」\n\n（沒有人問傷患怎麼了。程序比人命大——這句話，我在工廠聽了十年。）',
    },
  ],
  npcs: [
    {
      id: 'headnurse',
      name: '護理長',
      x: 11.5, z: 10.5, yaw: Math.PI / 2, room: 'triage',
      dialog: [
        '（護理長拉上檢傷區的簾子，先看欣儀的手臂，再看亮均）咬傷？不是。這是接觸感染……跟三樓那些人一模一樣，但她撐得比誰都久。',
        '你們就是新聞上那兩個人，對吧。把立愷X電的事捅出來的。（她苦笑）捅得好。可是晨星的人半小時後就進駐了——他們現在管這裡叫「收治」。',
        '聽好：被送上三樓的病人，一個都沒有下來。點滴車上去是滿的，下來是空的。他們晚上把東西往地下四樓搬，電梯的燈號我看了一整夜。',
        '要救她，普通的抗生素沒有用。晨星在地下弄的那些東西裡，一定有他們自己人用的解方——不然那些穿防護衣的怎麼敢進出？',
        '藥品準備室有我藏的備用管制卡，拿去。往住院大樓走，往下走。（她替欣儀掛上點滴）我能替她爭取十二個小時。剩下的，看你的了。',
      ],
      dialogAfter: '（護理長守在欣儀的點滴旁）十二個小時。別回頭看，往下走。',
      gift: [
        { item: 'first_aid_spray', count: 1 },
        { item: 'green_herb', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g15-t-bay', room: 'bay', text: '救護車道。晨星的黑色廂型車還在悶燒，白色防護衣散落一地——有些裡面還有人。', alert: true, shake: 0.05,
      monologue: '（淨化喊停了，但他們沒有走。燒不掉的東西，就用白色的布蓋起來。）' },
    { id: 'g15-t-er', room: 'er', text: '急診大廳。燈亮得刺眼。候診椅上那排「病患」，頭垂得太低了。', sound: 'groan', alert: true,
      monologue: '（識別帶是晨星的藍色。他們不是來看病的——是被「編號」的。）' },
    { id: 'g15-t-triage', room: 'triage', text: '檢傷區。簾子後面，檢傷表停在今天早上六點二十四分。',
      monologue: '（六點二十四分，支援隊接管檢傷。從那一刻起，這裡分的就不是輕重症——是「有用」跟「沒用」。）' },
    { id: 'g15-t-corr', room: 'corridor', text: '急診走廊。地板上兩道平行的拖行血痕，一路延伸向住院大樓的方向。', sound: 'groan',
      monologue: '（輪床的輪距。載的東西在流血，推的人沒有停。）' },
    { id: 'g15-t-prep', room: 'prep', text: '藥品準備室。藥架被翻過了——缺的全是抗生素與鎮靜劑。牆角的保險櫃敞開著。',
      monologue: '（晨星把「有用的」都搬走了。護理長藏的卡，是這層樓最後一件他們沒找到的東西。）' },
  ],
  entities: {
    pickups: [
      { id: 'g15-p-ammo1', item: 'handgun_ammo', count: 15, x: 2.5, z: 3 },
      { id: 'g15-p-herb1', item: 'green_herb', count: 1, x: 13, z: 1 },
      { id: 'g15-p-shells1', item: 'shotgun_shells', count: 7, x: 5.2, z: 4.3 },  // 救護車旁
      { id: 'g15-p-blue1', item: 'blue_herb', count: 1, x: 1.5, z: 9 },
      { id: 'g15-p-ammo2', item: 'handgun_ammo', count: 15, x: 8.8, z: 14 },
      { id: 'g15-p-spray1', item: 'first_aid_spray', count: 1, x: 12.8, z: 14 },
      { id: 'g15-p-smgammo1', item: 'smg_ammo', count: 30, x: 15.2, z: 6.5 },
      { id: 'g15-p-erkey', item: 'erkey', count: 1, x: 21.7, z: 2.5 },           // ★ 藥品準備室藥架
      { id: 'g15-p-herb2', item: 'green_herb', count: 1, x: 23, z: 6.5 },
      { id: 'g15-p-blue2', item: 'blue_herb', count: 1, x: 19.2, z: 7 },
      { id: 'g15-p-shells2', item: 'shotgun_shells', count: 7, x: 23.2, z: 1 },
    ],
    enemies: [
      { id: 'g15-z1', type: 'zombie', x: 7, z: 2.5 },     // 車道感染者
      { id: 'g15-dog1', type: 'dog', x: 11.5, z: 4.5 },
      { id: 'g15-z2', type: 'zombie', x: 4, z: 12 },      // 候診椅上的「病患」
      { id: 'g15-z3', type: 'zombie', x: 7, z: 13 },
      { id: 'g15-z4', type: 'zombie', x: 2.5, z: 10.5 },
      { id: 'g15-mutant1', type: 'mutant', x: 8, z: 8.5 }, // 大廳深處的精英感染體
      { id: 'g15-agent1', type: 'agent', x: 16, z: 12.5 }, // 沒撤走的晨星哨兵
      { id: 'g15-z5', type: 'zombie', x: 16.5, z: 8 },
      { id: 'g15-mutant2', type: 'mutant', x: 21, z: 4.5 }, // 藥品準備室——搬藥時變異的支援隊員
    ],
    typewriters: [
      { id: 'g15-tw-bay', x: 0.8, z: 0.8 },
      { id: 'g15-tw-triage', x: 13.4, z: 7.6 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
