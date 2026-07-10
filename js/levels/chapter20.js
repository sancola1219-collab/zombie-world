// 第二十章〈院長的簽名〉：醫院篇行政樓層。晨星把指揮所設在這裡——比廠區安靜到不正常，
// 茶還溫著，西裝哨兵(agent)在走廊踱步，鐵面指揮官(ironmask)守著院長室。
// 院長秘書淑芬躲在秘書室，良心不安倒戈，把院長室鑰匙交給亮均，供出「醫療支援合約」。
// 合約末尾提到「手術中心的特殊項目」——那扇門還鎖著，裡面有聲音，在「執刀」。
export const CHAPTER20 = {
  id: 'chapter20',
  name: '第二十章：院長的簽名',
  next: 'chapter21',
  exitNeeds: 'dirkey',
  exitHint: '院長室的門鎖著——秘書淑芬躲在秘書室，她手上有院長私藏的那把鑰匙，也有想說的話',
  spawn: { x: 2, z: 1.5, yaw: Math.PI / 2 }, // 行政大廳西側，面向東
  lockNames: { dirkey: '院長室鑰匙', chapterExit: '行政樓梯間' },
  story: [
    '從太平間爬上來，換了一部客梯，燈號一路亮到頂樓行政層。\n\n電梯門開的瞬間，亮均以為自己走錯了地方。\n\n這裡沒有血。地毯是乾淨的，盆栽是活的，空調吹著恰到好處的冷氣。牆上掛著歷任院長的油畫肖像，走廊盡頭，一盞盞嵌燈把大理石地面照得發亮。\n\n（下面那些樓層，人被當成樣本一車一車往下搬。這裡，連花都有人澆。）\n\n（越乾淨的地方，越髒。）',
    '接待櫃臺上，一只白瓷茶杯還冒著熱氣。\n\n亮均伸手碰了碰杯壁——溫的。有人剛剛還坐在這裡，聽見電梯聲，走了。\n\n轉角的落地窗外，晨星的黑色公務車停滿了整個中庭。西裝筆挺的人在樓層間安靜地走動，胸口別著紅白徽章，腰間鼓起一塊——不是防護衣底下的東西，是槍。\n\n（這裡不是醫院的行政樓了。是晨星的指揮所。）\n\n（他們不穿防護衣，因為他們知道，這一層很「乾淨」。乾淨到，連要被處理掉的人，都是體面地簽了字送下去的。）',
    '秘書室虛掩著門，裡面有壓抑的呼吸聲。\n\n一個穿著套裝的女人縮在辦公桌底下，看見亮均，先是驚恐，接著整個人鬆掉，眼淚一下子湧出來。\n\n「你……你不是他們的人。」她的聲音抖得厲害，「你是新聞上那個……把工廠的事說出去的那個。」\n\n她死死攥著一把鑰匙，指節都白了。\n\n「我在這間辦公室，替院長打了十五年的字。每一份把人送下去的公文，都是我經手蓋章的。」\n\n「我不能……我不能再裝作不知道了。」',
  ],
  endingText:
    '院長室鑰匙插進鎖孔的時候，亮均想起淑芬最後說的話——「院長年輕時，是真的想救人的。」抽屜裡那張泛黃的創院合照可以作證。可是桌上那份燙金封面的「醫療支援合約」，一頁一頁翻下去，全是把活人換成研究經費的數字，最後一條列著一個他沒看過的名目：「手術中心・特殊項目——由甲方指定醫師執行，院方不予過問。」窗外天色未明。亮均把合約塞進背包，走向行政樓梯間——通往手術中心那道氣密門的後面，隱隱傳來金屬器械碰撞的聲音，很規律，很專注。有人，還在裡面「執刀」。〔續　第二十一章〕',
  objective: '取得院長室鑰匙，查明晨星與院方的協議，前往手術中心',
  rooms: [
    { id: 'lobby', name: '行政大廳', x: 0, z: 0, w: 12, d: 9, h: 4, floor: 'tile', walls: 'plaster',
      light: { x: 6, y: 3.6, z: 4.5, color: 0xe8f0f4, intensity: 28 } }, // 體面的嵌燈冷白光
    { id: 'secretary', name: '秘書室', x: 12, z: 0, w: 7, d: 5, h: 3.2, floor: 'tile', walls: 'plaster',
      light: { x: 15.5, y: 2.8, z: 2.5, color: 0xd8e0e8, intensity: 22, flicker: true } },
    { id: 'meeting', name: '會議室', x: 0, z: 9, w: 9, d: 7, h: 3.4, floor: 'tile', walls: 'plaster',
      light: { x: 4.5, y: 3, z: 12.5, color: 0xcfe0ff, intensity: 20 } },
    { id: 'director', name: '院長室', x: 12, z: 5, w: 7, d: 8, h: 3.6, floor: 'tile', walls: 'plaster',
      light: { x: 15.5, y: 3.2, z: 9, color: 0xe0d8c0, intensity: 24 } }, // 木質暖調——唯一有人味的房間
    { id: 'finance', name: '財務室', x: 19, z: 5, w: 6, d: 8, h: 3.2, floor: 'tile', walls: 'metal',
      light: { x: 22, y: 2.8, z: 9, color: 0xc0c8c0, intensity: 16, flicker: true } },
  ],
  doors: [
    { id: 'd20-lobby-sec', from: 'lobby', to: 'secretary', axis: 'z', at: [12, 2.5], width: 1.3, height: 2.3, lock: null },
    { id: 'd20-lobby-meet', from: 'lobby', to: 'meeting', axis: 'x', at: [4.5, 9], width: 1.6, height: 2.4, lock: null },
    { id: 'd20-sec-dir', from: 'secretary', to: 'director', axis: 'x', at: [15.5, 5], width: 1.3, height: 2.3, lock: 'dirkey' }, // 院長室——鎖著
    { id: 'd20-dir-fin', from: 'director', to: 'finance', axis: 'z', at: [19, 9], width: 1.2, height: 2.2, lock: null },
    { id: 'd20-exit', from: 'meeting', to: null, axis: 'x', at: [4.5, 16], width: 1.5, height: 2.4, lock: 'chapterExit' },
  ],
  props: [
    // 行政大廳：接待櫃臺、沙發區、盆栽、歷任院長油畫（用 shelf 代表牆面陳列）
    { room: 'lobby', type: 'table', x: 6, z: 2, rot: 0, solid: 0.9 },        // 接待櫃臺
    { room: 'lobby', type: 'papers', x: 6.2, z: 2, },                         // 櫃臺上的訪客簿
    { room: 'lobby', type: 'chair_fallen', x: 3, z: 6, rot: 0.6 },
    { room: 'lobby', type: 'chair_fallen', x: 9, z: 6.5, rot: 2.2 },
    { room: 'lobby', type: 'shelf', x: 11.5, z: 6, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'lobby', type: 'crate', x: 10.5, z: 1, solid: 0.4 },             // 晨星剛搬進來的器材箱
    { room: 'lobby', type: 'blood', x: 8, z: 8 },
    // 秘書室：辦公桌（淑芬躲在底下）、文件櫃、翻倒的椅子
    { room: 'secretary', type: 'table', x: 14, z: 2, solid: 0.6 },
    { room: 'secretary', type: 'papers', x: 14, z: 2 },
    { room: 'secretary', type: 'shelf', x: 18, z: 1.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'secretary', type: 'shelf', x: 18, z: 3.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'secretary', type: 'chair_fallen', x: 16, z: 4, rot: 1.1 },
    // 會議室：長會議桌、成排座椅、投影布幕（用 shelf）
    { room: 'meeting', type: 'table', x: 4.5, z: 12, rot: 0, solid: 1.1 },   // 長會議桌
    { room: 'meeting', type: 'chair_fallen', x: 2, z: 11, rot: 0.3 },
    { room: 'meeting', type: 'chair_fallen', x: 7, z: 11, rot: 2.6 },
    { room: 'meeting', type: 'chair_fallen', x: 3, z: 14, rot: 1.8 },
    { room: 'meeting', type: 'papers', x: 5.5, z: 12.5 },
    { room: 'meeting', type: 'blood', x: 6.5, z: 14.5 },
    // 院長室：氣派辦公桌、書架牆、真皮座椅、抽屜（藏創院合照）
    { room: 'director', type: 'table', x: 15.5, z: 7.5, rot: 0, solid: 1.0 }, // 院長辦公桌
    { room: 'director', type: 'papers', x: 15.5, z: 7.5 },
    { room: 'director', type: 'shelf', x: 18.5, z: 8, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'director', type: 'shelf', x: 18.5, z: 10.5, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'director', type: 'chair_fallen', x: 15.5, z: 11.5, rot: 0.5 },
    { room: 'director', type: 'crate', x: 13, z: 12, solid: 0.4 },
    // 財務室：保險櫃、帳冊架、碎紙機旁的紙堆
    { room: 'finance', type: 'shelf', x: 20, z: 6, rot: Math.PI / 2, solid: 0.28 },
    { room: 'finance', type: 'shelf', x: 24, z: 7, rot: -Math.PI / 2, solid: 0.28 },
    { room: 'finance', type: 'crate', x: 22, z: 11, solid: 0.5 },            // 保險櫃
    { room: 'finance', type: 'papers', x: 21, z: 9 },
    { room: 'finance', type: 'papers', x: 23, z: 10.5 },
  ],
  hazards: [
    { room: 'lobby', type: 'shock', x: 10.5, z: 7.5, r: 0.8 },   // 器材箱漏電
    { room: 'secretary', type: 'slime', x: 13, z: 4.2, r: 0.75 },
    { room: 'meeting', type: 'slime', x: 7.5, z: 14, r: 0.8 },
    { room: 'director', type: 'fire', x: 13.5, z: 6, r: 0.85 },   // 被推倒的檯燈引燃地毯
    { room: 'finance', type: 'shock', x: 22, z: 6.2, r: 0.8 },    // 碎紙機短路
    { room: 'finance', type: 'slime', x: 20.5, z: 11.5, r: 0.75 },
  ],
  documents: [
    {
      id: 'g20-doc-contract', title: '醫療支援合約（燙金正本）', x: 15.8, z: 7.2,
      text: '【黑鴉市立總醫院　與　晨星工業　醫療支援合作合約】\n\n第三條：乙方（晨星）提供防疫物資與人力，甲方（院方）應優先轉介「特殊症狀」病患至乙方指定收治區。\n第七條：每轉介一名符合條件之個案，甲方研究發展基金入帳新台幣拾伍萬元整。\n附則：手術中心・特殊項目，由乙方指定醫師執行，院方不予過問、不予紀錄。\n\n（一條命，十五萬。院長的簽名，蓋在每一頁的騎縫處。）\n（他不是不知道。他是仔細算過，然後簽了字。）',
    },
    {
      id: 'g20-doc-board', title: '董事會臨時會議紀錄', x: 22, z: 9,
      text: '【第一線醫護反映收治異常之處理決議】\n\n案由：急診、病棟多名護理人員書面反映「收治後病患去向不明」。\n決議：\n一、該等反映屬第一線人員「未落實新流程之認知不足」，由護理部加強教育訓練。\n二、簽署反映書之人員，列入下季輪調評估。\n三、對外一律以「配合中央防疫政策」回應。\n\n（護理長說得對。出事了，永遠是基層沒做好。他們坐在這張桌子上，把責任像分菜一樣分下去。）',
    },
    {
      id: 'g20-doc-photo', title: '抽屜裡的創院合照', x: 15.2, z: 8, monoAfter: true,
      text: '（院長辦公桌最底層的抽屜上鎖了，但鎖芯是壞的。裡面沒有錢，沒有印章，只有一張裱框的舊照片。）\n\n（三十年前的工地前，一群戴著安全帽的年輕人舉著「黑鴉市立總醫院　動土典禮」的紅布條。最左邊那個笑得最開的瘦高青年，眉眼還認得出來，是現在牆上油畫裡那位院長。）\n\n（照片背面，是他自己的字：）\n\n「這座城市不能再有人因為沒錢、沒床位而死在門口。——我們蓋的，是一座不拒絕任何人的醫院。」\n\n（三十年。從一句誓言，到一張十五萬一條命的合約。是哪一步走錯的，他自己還記得嗎？）',
    },
    {
      id: 'g20-doc-memo', title: '院長桌上的手寫便條', x: 14.8, z: 7.8,
      text: '（一張撕下來的便條紙，字跡潦草，像是深夜寫的：）\n\n「白博士又來電。手術中心那邊他要再『兩個活體』。\n我說院內已經沒有符合的了。\n他說：那就從『反映書名單』裡挑。\n\n——我還能拒絕嗎？我連自己的醫院，都已經不是我的了。」\n\n（便條被揉過又攤平，紙上有一圈茶漬。他寫完這張紙，還是把它壓在了桌墊下，然後照常上班。）',
    },
    {
      id: 'g20-doc-defect', title: '淑芬的辭職信（未寄出）', x: 17.5, z: 2.5,
      text: '（一封寫了一半的辭職信，壓在秘書室的鍵盤下。）\n\n「敬啟者：\n本人任職院長室秘書十五年，自認盡忠職守。但近月經手之公文，已非我良知所能承受。\n那些被『轉介』的病人，我打過他們每一個人的名字。有八歲的孩子。\n我不敢辭，因為知道太多的人，晨星不會讓他走。\n所以這封信，我大概永遠不會寄出——」\n\n（信到這裡就斷了。淑芬把命賭在一個陌生人身上，也不願再替這張桌子蓋一次章。）',
    },
  ],
  npcs: [
    {
      id: 'secretary',
      name: '淑芬',
      x: 14, z: 3, yaw: -Math.PI / 2, room: 'secretary',
      dialog: [
        '（她從桌子底下爬出來，套裝的膝蓋沾了灰）你別過去大廳那頭——有個戴鐵面罩的，晨星今晚才調來的，是他們的頭。西裝那幾個都聽他的。',
        '這一層我最清楚。哪一份公文送走了誰，都是我蓋的章。剛開始我以為只是轉院，後來……點滴車上去是滿的，下來是空的。我全都知道，我什麼都沒做。',
        '院長？（她苦笑）他年輕的時候，是真的想救人的。你去他辦公室看看那張老照片就知道。可是人一旦開始算「一條命值多少錢」，就再也回不了頭了。',
        '這把是院長室的鑰匙，備用的，他以為只有他有。合約正本鎖在他桌上——你拿去，把它公開，像你上次那樣。這是我唯一還能做的事。',
        '對了，合約最後那幾行，講到「手術中心的特殊項目」。那扇門一直鎖著，可是我值大夜的時候，聽過裡面有聲音……像有人在動手術。裡面沒有病人會醒著。你自己小心。',
      ],
      dialogAfter: '（淑芬把身體縮回桌子的陰影裡）鑰匙給你了。我守在這，等這一切結束——如果還有結束的話。',
      gift: [
        { item: 'handgun_ammo', count: 15 },
        { item: 'first_aid_spray', count: 1 },
      ],
    },
  ],
  triggers: [
    { id: 'g20-t-lobby', room: 'lobby', text: '行政大廳。乾淨得不像話。接待櫃臺上的茶還冒著熱氣——有人聽見電梯聲，剛走。', alert: true,
      monologue: '（下面把人當樣本搬，這裡連花都有人澆。越乾淨的地方，越髒。）' },
    { id: 'g20-t-secretary', room: 'secretary', text: '秘書室。一個穿套裝的女人縮在桌子底下，攥著一把鑰匙，指節發白。',
      monologue: '（她不是敵人。她是這一層，唯一一個還會為別人哭的人。）' },
    { id: 'g20-t-meeting', room: 'meeting', text: '會議室。長桌上還攤著沒收走的會議資料，投影布幕停在一張「收治流程」的簡報。', sound: 'groan',
      monologue: '（他們坐在這張桌子上，把一車一車的人變成流程圖上的箭頭。開完會，還會有人問要不要訂便當。）' },
    { id: 'g20-t-director', room: 'director', text: '院長室。木質的、暖色的，牆上滿是感謝狀與合影——這是整層樓唯一有人味的房間。桌上壓著一份燙金封面的合約。', alert: true,
      monologue: '（一牆的感謝狀，一桌的簽名。他把兩者放在同一個房間，每天看著，居然睡得著。）' },
    { id: 'g20-t-finance', room: 'finance', text: '財務室。保險櫃敞開著，帳冊被翻得亂七八糟，碎紙機卡著一疊還沒絞完的文件。', sound: 'groan',
      monologue: '（斷尾的時候到了。連錢都來不及數，就急著把證據磨成紙屑——他們也怕。）' },
  ],
  entities: {
    pickups: [
      { id: 'g20-p-ammo1', item: 'handgun_ammo', count: 15, x: 4, z: 3 },
      { id: 'g20-p-shells1', item: 'shotgun_shells', count: 7, x: 9.5, z: 8 },
      { id: 'g20-p-spray1', item: 'first_aid_spray', count: 1, x: 10.5, z: 4 },
      { id: 'g20-p-green1', item: 'green_herb', count: 1, x: 17, z: 4 },       // 秘書室
      { id: 'g20-p-dirkey', item: 'dirkey', count: 1, x: 13, z: 1.5 },         // ★ 秘書室：淑芬指引的院長室鑰匙
      { id: 'g20-p-smgammo1', item: 'smg_ammo', count: 30, x: 2.5, z: 13 },    // 會議室
      { id: 'g20-p-blue1', item: 'blue_herb', count: 1, x: 7.5, z: 10 },
      { id: 'g20-p-magammo1', item: 'magnum_ammo', count: 6, x: 17.5, z: 11 }, // 院長室
      { id: 'g20-p-green2', item: 'green_herb', count: 1, x: 13.5, z: 6 },
      { id: 'g20-p-ammo2', item: 'handgun_ammo', count: 15, x: 21, z: 6.5 },   // 財務室
      { id: 'g20-p-shells2', item: 'shotgun_shells', count: 7, x: 23.5, z: 9.5 },
      { id: 'g20-p-spray2', item: 'first_aid_spray', count: 1, x: 20.5, z: 12 },
    ],
    enemies: [
      { id: 'g20-agent1', type: 'agent', x: 9, z: 7 },       // 大廳西裝哨兵
      { id: 'g20-z1', type: 'zombie', x: 6, z: 5 },          // 沒撤走的變異員工
      { id: 'g20-agent2', type: 'agent', x: 3, z: 13 },      // 會議室哨兵
      { id: 'g20-mutant1', type: 'mutant', x: 6.5, z: 13.5 }, // 會議室變異體
      { id: 'g20-ironmask1', type: 'ironmask', x: 15.5, z: 9.5 }, // ★ 院長室：鐵面指揮官
      { id: 'g20-z2', type: 'zombie', x: 14, z: 11 },        // 院長室
      { id: 'g20-agent3', type: 'agent', x: 21.5, z: 7 },    // 財務室哨兵（斷尾滅證）
      { id: 'g20-mutant2', type: 'mutant', x: 22.5, z: 10.5 }, // 財務室變異體
      { id: 'g20-z3', type: 'zombie', x: 8, z: 2 },          // 大廳深處
    ],
    typewriters: [
      { id: 'g20-tw-lobby', x: 1, z: 8 },
      { id: 'g20-tw-director', x: 18, z: 11.5 },
    ],
  },
  start: { weapons: [{ id: 'handgun', rounds: 15 }, { id: 'shotgun', rounds: 7 }], items: [] },
};
