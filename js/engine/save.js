// 存檔層：localStorage 可用就用，不可用（隱私模式、配額滿）自動降級為記憶體存檔。
// 降級後 persistent=false，呼叫端可據此提示「關閉頁面將遺失進度」。
export class SaveStore {
  constructor(storage = null) {
    this.mem = new Map();
    this.storage = null;
    this.persistent = false;
    if (storage) {
      try {
        storage.setItem('__zw_probe', '1');
        storage.removeItem('__zw_probe');
        this.storage = storage;
        this.persistent = true;
      } catch {
        // 保持記憶體模式
      }
    }
  }

  save(key, data) {
    const json = JSON.stringify(data);
    if (this.persistent) {
      try {
        this.storage.setItem(key, json);
        return true;
      } catch {
        this.persistent = false;
      }
    }
    this.mem.set(key, json);
    return true;
  }

  load(key) {
    let json = null;
    if (this.persistent) json = this.storage.getItem(key);
    if (json === null || json === undefined) json = this.mem.has(key) ? this.mem.get(key) : null;
    if (json === null) return null;
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  remove(key) {
    if (this.persistent) {
      try {
        this.storage.removeItem(key);
      } catch {
        // 忽略
      }
    }
    this.mem.delete(key);
  }
}
