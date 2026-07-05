// 武器定義與玩家軍火庫。純邏輯模組，node 可測。
// 時間一律用「邏輯時間」（累積的固定時步秒數），不用牆鐘。
export const WEAPONS = {
  knife: { name: '小刀', melee: true, damage: 15, range: 1.6, interval: 0.55 },
  handgun: { name: '手槍', damage: 25, magazine: 15, interval: 0.4, ammoItem: 'handgun_ammo', spread: 0.012 },
  shotgun: { name: '霰彈槍', pellets: 8, damage: 12, magazine: 7, interval: 1.05, ammoItem: 'shotgun_shells', spread: 0.07 },
  magnum: { name: '麥格農', damage: 150, magazine: 6, interval: 0.95, ammoItem: 'magnum_ammo', spread: 0.008, pierce: true },
};

export class Arsenal {
  constructor() {
    this.owned = ['knife'];
    this.current = 'knife';
    this.loaded = {}; // weaponId → 彈匣內發數
    this._nextFireAt = 0;
  }

  has(id) {
    return this.owned.includes(id);
  }

  give(id, rounds = 0) {
    if (!this.has(id)) this.owned.push(id);
    if (!WEAPONS[id].melee) {
      this.loaded[id] = Math.min(WEAPONS[id].magazine, (this.loaded[id] || 0) + rounds);
    }
  }

  select(id) {
    if (!this.has(id)) return false;
    this.current = id;
    return true;
  }

  loadedRounds(id = this.current) {
    return WEAPONS[id].melee ? Infinity : this.loaded[id] || 0;
  }

  // 回傳 null（射速冷卻中）、{empty:true}（空膛）、或射擊描述
  fire(now) {
    if (now < this._nextFireAt) return null;
    const def = WEAPONS[this.current];
    if (def.melee) {
      this._nextFireAt = now + def.interval;
      return { weapon: this.current, melee: true, damage: def.damage, range: def.range };
    }
    if ((this.loaded[this.current] || 0) <= 0) {
      this._nextFireAt = now + 0.25; // 空膛喀聲也有間隔
      return { empty: true };
    }
    this.loaded[this.current] -= 1;
    this._nextFireAt = now + def.interval;
    return {
      weapon: this.current,
      pellets: def.pellets || 1,
      damage: def.damage,
      spread: def.spread,
      pierce: !!def.pierce,
    };
  }

  // 從物品欄取彈補滿彈匣，回傳補入發數
  reload(inventory) {
    const def = WEAPONS[this.current];
    if (def.melee) return 0;
    const need = def.magazine - (this.loaded[this.current] || 0);
    if (need <= 0) return 0;
    const got = inventory.takeAmmo(def.ammoItem, need);
    this.loaded[this.current] = (this.loaded[this.current] || 0) + got;
    return got;
  }

  toJSON() {
    return { owned: [...this.owned], current: this.current, loaded: { ...this.loaded } };
  }

  static fromJSON(data) {
    const a = new Arsenal();
    a.owned = [...data.owned];
    a.current = data.current;
    a.loaded = { ...data.loaded };
    return a;
  }
}
