// 道具定義與物品欄。純邏輯模組，node 可測。
// 武器不佔格（由 Arsenal 管理）；關鍵道具（鑰匙等）記在 keyItems 不受 8 格限制。
export const ITEMS = {
  green_herb: { name: '綠色草藥', type: 'heal', stack: 3, desc: '恢復少量生命（+40）' },
  red_herb: { name: '紅色草藥', type: 'heal', stack: 3, desc: '單獨使用無效，可與綠色草藥調和' },
  mixed_herb: { name: '調和草藥', type: 'heal', stack: 1, desc: '綠紅調和，完全恢復生命' },
  first_aid_spray: { name: '急救噴霧', type: 'heal', stack: 1, desc: '完全恢復生命' },
  blue_herb: { name: '藍色草藥', type: 'heal', stack: 3, desc: '解除中毒' },
  keycard: { name: '貨梯鑰匙卡', type: 'key', desc: '晨星工業的門禁卡，可開啟貨梯' },
  labkey: { name: '實驗區通行卡', type: 'key', desc: '生物危害等級4區域的通行卡' },
  fireext: { name: '滅火器', type: 'key', desc: '沉甸甸的鋼瓶——門禁停權時，砸開玻璃罩比刷卡快' },
  evidence: { name: 'KY 導入證據', type: 'key', desc: '林欣儀的手寫筆記——證明晨星拿工廠當培養皿的唯一憑據' },
  liftkey: { name: '提升機釋放插銷', type: 'key', desc: '拔下它，物料平台的配重就會失控墜落——用來拖住聖時爆君、炸開往 F 區的路' },
  // === 街道篇（第五～十四章）===
  boltcutter: { name: '斷線鉗', type: 'key', desc: '加油站的工具——剪開封鎖圍籬的鐵絲網' },
  shutterkey: { name: '鐵捲門鑰匙', type: 'key', desc: '便利商店店長的鑰匙串——後巷鐵捲門的搖控早就沒電了' },
  gatekey: { name: '校門鑰匙', type: 'key', desc: '訓導處抽屜裡的黃銅鑰匙，掛牌寫著「側門」' },
  sluicekey: { name: '閘門把手', type: 'key', desc: '排水幹線閘門的手動把手——閘門一開，就能走幹線渠道離開' },
  copkey: { name: '分局後門鑰匙', type: 'key', desc: '黑鴉分局後門的鑰匙——正門被鎮暴車堵死了' },
  armorykey: { name: '軍械室鑰匙', type: 'key', desc: '值班台的軍械室鑰匙——裡面也許還有沒被搬走的火力' },
  medkey: { name: '藥局鑰匙', type: 'key', desc: '仁愛醫院藥局的鑰匙——抗生素和止痛藥都鎖在裡面' },
  genlever: { name: '發電機搖桿', type: 'key', desc: '夜市發電機的啟動搖桿——電門一響，出口鐵門就能升起' },
  linemap: { name: '微波鏈路配線圖', type: 'key', desc: '電信機房的配線圖——證明河對岸的電視轉播站還有一條沒被切斷的微波鏈路' },
  tollkey: { name: '收費站控制鑰匙', type: 'key', desc: '跨河大橋收費站的控制鑰匙，可以升起車道柵欄' },
  // === 醫院篇（第十五～二十四章）===
  erkey: { name: '急診管制卡', type: 'key', desc: '急診區管制門的感應卡——晨星接管後換了權限，這張是護理長私藏的備用卡' },
  wardcard: { name: '病棟電梯卡', type: 'key', desc: '住院大樓的電梯卡——沒有它，只能困在急診層' },
  playkey: { name: '遊戲室鑰匙', type: 'key', desc: '小兒科遊戲室的鑰匙，鑰匙圈上掛著一隻褪色的小熊' },
  labpass: { name: '檢驗科通行證', type: 'key', desc: '醫檢師的識別證——檢驗科與血庫的門禁都認它' },
  morguekey: { name: '太平間鑰匙', type: 'key', desc: '地下太平間的老式鑰匙——管理員從不離身的那一把' },
  dirkey: { name: '院長室鑰匙', type: 'key', desc: '行政樓層院長室的鑰匙——協議正本就鎖在裡面' },
  surgkey: { name: '手術中心鑰匙', type: 'key', desc: '手術中心刷手區的鑰匙——裡面的東西還在「執刀」' },
  isokey: { name: '隔離區磁卡', type: 'key', desc: 'B4 負壓隔離區的磁卡——晨星把那裡改成了培養區' },
  sdata: { name: 'S計畫核心資料', type: 'key', desc: '地下研究樓層的完整資料——聖時不是意外，是被選中的' },
  inhibitor: { name: '病毒抑制劑', type: 'key', desc: '白博士最後的成品——能壓住 KY 的增殖。欣儀的命，也許還有聖時的' },
  magnum_weapon: { name: '麥格農', type: 'weapon', weapon: 'magnum', rounds: 6 },
  handgun_ammo: { name: '手槍彈', type: 'ammo', stack: 45, weapon: 'handgun' },
  shotgun_shells: { name: '霰彈', type: 'ammo', stack: 21, weapon: 'shotgun' },
  magnum_ammo: { name: '麥格農彈', type: 'ammo', stack: 12, weapon: 'magnum' },
  smg_ammo: { name: '衝鋒槍彈', type: 'ammo', stack: 90, weapon: 'smg' },
  fuel: { name: '燃料罐', type: 'ammo', stack: 100, weapon: 'flamethrower' },
  rocket_ammo: { name: '火箭彈', type: 'ammo', stack: 3, weapon: 'rocket' },
  shotgun_weapon: { name: '霰彈槍', type: 'weapon', weapon: 'shotgun', rounds: 4 },
  smg_weapon: { name: '衝鋒槍', type: 'weapon', weapon: 'smg', rounds: 30 },
  flamethrower_weapon: { name: '火焰噴射槍', type: 'weapon', weapon: 'flamethrower', rounds: 60 },
  rocket_weapon: { name: '火箭炮', type: 'weapon', weapon: 'rocket', rounds: 1 },
};

export class Inventory {
  constructor(size = 8) {
    this.size = size;
    this.slots = new Array(size).fill(null); // {id, count} | null
    this.keyItems = [];
  }

  // 先疊進既有堆，再開新格。回傳實際加入數與放不下的餘量。
  add(id, count = 1) {
    const def = ITEMS[id];
    let left = count;
    for (let i = 0; i < this.size && left > 0; i++) {
      const s = this.slots[i];
      if (s && s.id === id && s.count < def.stack) {
        const take = Math.min(def.stack - s.count, left);
        s.count += take;
        left -= take;
      }
    }
    for (let i = 0; i < this.size && left > 0; i++) {
      if (!this.slots[i]) {
        const take = Math.min(def.stack, left);
        this.slots[i] = { id, count: take };
        left -= take;
      }
    }
    return { added: count - left, leftover: left };
  }

  remove(index, count = 1) {
    const s = this.slots[index];
    if (!s) return 0;
    const take = Math.min(s.count, count);
    s.count -= take;
    if (s.count <= 0) this.slots[index] = null;
    return take;
  }

  countOf(id) {
    return this.slots.reduce((n, s) => n + (s && s.id === id ? s.count : 0), 0);
  }

  isFull() {
    return this.slots.every((s) => s !== null);
  }

  // 裝填用：從彈藥堆中取出至多 max 發
  takeAmmo(id, max) {
    let need = max;
    for (let i = 0; i < this.size && need > 0; i++) {
      const s = this.slots[i];
      if (s && s.id === id) need -= this.remove(i, need);
    }
    return max - need;
  }

  // 組合：綠＋紅 → 調和草藥（放回 a 格）。不符合配方回 false。
  combine(a, b) {
    const sa = this.slots[a];
    const sb = this.slots[b];
    if (!sa || !sb || a === b) return false;
    const pair = [sa.id, sb.id].sort().join('+');
    if (pair !== 'green_herb+red_herb') return false;
    this.remove(a, 1);
    this.remove(b, 1);
    if (this.slots[a]) {
      // a 格還有剩（堆疊>1），調和結果找空格；沒空格則失敗還原
      const r = this.add('mixed_herb', 1);
      if (r.leftover > 0) {
        this.add(sa.id === 'green_herb' ? 'green_herb' : 'red_herb', 1);
        this.add(sb.id === 'red_herb' ? 'red_herb' : 'green_herb', 1);
        return false;
      }
    } else {
      this.slots[a] = { id: 'mixed_herb', count: 1 };
    }
    return true;
  }

  // 治療道具使用。成功回 true 並消耗一個。
  useHeal(index, player) {
    const s = this.slots[index];
    if (!s) return false;
    if (s.id === 'green_herb') {
      if (player.hp >= 100) return false;
      player.hp = Math.min(100, player.hp + 40);
    } else if (s.id === 'mixed_herb' || s.id === 'first_aid_spray') {
      if (player.hp >= 100) return false;
      player.hp = 100;
    } else if (s.id === 'blue_herb') {
      if (!(player.poison > 0)) return false;
      player.poison = 0;
    } else {
      return false; // 紅草藥單用無效、非治療道具
    }
    this.remove(index, 1);
    return true;
  }

  toJSON() {
    return { slots: this.slots.map((s) => (s ? { ...s } : null)), keyItems: [...this.keyItems] };
  }

  static fromJSON(data, size = 8) {
    const inv = new Inventory(size);
    data.slots.forEach((s, i) => {
      if (s && i < size) inv.slots[i] = { ...s };
    });
    inv.keyItems = [...(data.keyItems || [])];
    return inv;
  }
}
