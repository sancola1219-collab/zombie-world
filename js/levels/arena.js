// 戰鬥示範場：軍械室（拾取＋打字機）→ 走廊 → 競技場（殭屍群＋犬）。
// 純資料模組（測試夾具兼遊戲關卡）。
export const ARENA = {
  id: 'arena',
  name: '戰鬥示範場',
  spawn: { x: 2, z: 2.5, yaw: -Math.PI / 2 }, // 面向 +x
  lockNames: {},
  rooms: [
    {
      id: 'armory',
      x: 0, z: 0, w: 6, d: 5, h: 3,
      floor: 'tile', walls: 'plaster',
      light: { x: 3, y: 2.6, z: 2.5, color: 0xffe0b0, intensity: 7 },
    },
    {
      id: 'corridor',
      x: 6, z: 1.5, w: 6, d: 2, h: 2.6,
      floor: 'wood', walls: 'wallpaper',
      light: { x: 9, y: 2.2, z: 2.5, color: 0xc09060, intensity: 4 },
    },
    {
      id: 'arena',
      x: 12, z: 0, w: 9, d: 8, h: 3.4,
      floor: 'wood', walls: 'wallpaper',
      light: { x: 16.5, y: 3, z: 4, color: 0x8899cc, intensity: 6 },
    },
  ],
  doors: [
    { id: 'd-armory-corridor', from: 'armory', to: 'corridor', axis: 'z', at: [6, 2.5], width: 1.2, height: 2.2, lock: null },
    { id: 'd-corridor-arena', from: 'corridor', to: 'arena', axis: 'z', at: [12, 2.5], width: 1.2, height: 2.2, lock: null },
  ],
  entities: {
    pickups: [
      { id: 'p-hgammo', item: 'handgun_ammo', count: 15, x: 4.5, z: 1 },
      { id: 'p-herb-g1', item: 'green_herb', count: 1, x: 1, z: 4 },
      { id: 'p-shotgun', item: 'shotgun_weapon', count: 1, x: 4.8, z: 4.2 },
      { id: 'p-herb-r', item: 'red_herb', count: 1, x: 8, z: 2 },
      { id: 'p-shells', item: 'shotgun_shells', count: 7, x: 10.5, z: 3 },
      { id: 'p-herb-g2', item: 'green_herb', count: 1, x: 20, z: 7 },
    ],
    enemies: [
      { id: 'z-corridor', type: 'zombie', x: 10.5, z: 2.2 },
      { id: 'z-arena-1', type: 'zombie', x: 15, z: 2 },
      { id: 'z-arena-2', type: 'zombie', x: 18, z: 5.5 },
      { id: 'z-arena-3', type: 'zombie', x: 14, z: 6.5 },
      { id: 'dog-arena', type: 'dog', x: 19.5, z: 1.5 },
    ],
    typewriters: [{ id: 'tw-armory', x: 0.7, z: 0.7 }],
  },
  // 開局配置
  start: { weapons: [{ id: 'handgun', rounds: 15 }], items: [] },
};
