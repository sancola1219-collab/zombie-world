// 存檔快照：組裝與還原。純邏輯模組，node 可測。
// 敵人物件由呼叫端依 type 重建（本模組不依賴具體敵種類別）。
import { Inventory } from './items.js';
import { Arsenal } from './weapons.js';

export function buildSave({ levelId, player, inventory, arsenal, enemies, takenPickups, gameTime }) {
  return {
    version: 2,
    levelId,
    player: { x: player.x, z: player.z, yaw: player.yaw, hp: player.hp },
    inventory: inventory.toJSON(),
    arsenal: arsenal.toJSON(),
    enemies: enemies.map((e) => e.snapshot()),
    takenPickups: [...takenPickups],
    gameTime,
  };
}

// 回傳還原後的共用物件；敵人快照與拾取清單交給呼叫端套用
export function applySave(data, { player }) {
  player.x = data.player.x;
  player.z = data.player.z;
  player.yaw = data.player.yaw;
  player.hp = data.player.hp;
  player.pitch = 0;
  return {
    levelId: data.levelId,
    inventory: Inventory.fromJSON(data.inventory),
    arsenal: Arsenal.fromJSON(data.arsenal),
    enemySnapshots: data.enemies,
    takenPickups: new Set(data.takenPickups),
    gameTime: data.gameTime,
  };
}
