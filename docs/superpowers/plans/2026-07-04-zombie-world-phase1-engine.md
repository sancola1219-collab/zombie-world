# 階段一：引擎基礎與沙盒 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立整個遊戲的引擎地基——固定時步迴圈、資料驅動關卡、碰撞、輸入、存檔、程序貼圖、渲染、音效——並以兩房沙盒地圖驗證：第一人稱行走、開門、遇上鎖門、分頁隱藏不當機。

**Architecture:** 邏輯與渲染徹底分離。`js/game/*`＋`js/engine/loop.js`＋`js/engine/save.js` 為純邏輯（不 import three、不碰 DOM），在 `node --test` 下同步測試；`js/engine/{renderer,textures,audio}.js`＋`js/main.js` 為瀏覽器層，用 preview 驗證。關卡＝資料（房間矩形＋門），幾何與碰撞線段皆由資料生成。

**Tech Stack:** Three.js 0.170.0（jsdelivr CDN import map）、ES modules、node:test、http-server（npx，僅本地預覽用）。

跨階段約定見 `2026-07-04-zombie-world-roadmap.md`（座標、yaw、測試指令、RNG、commit 頻率）。

---

## 檔案結構（本階段建立）

```
package.json               — {"type":"module","private":true}（讓 node --test 吃 ESM）
.gitignore                 — node_modules/
.claude/launch.json        — preview 用 http-server 設定（port 8123）
index.html                 — import map、#app 容器、HUD/載入/暫停/錯誤覆蓋層
css/style.css              — 全螢幕佈局、準星、提示、覆蓋層
js/engine/rng.js           — mulberry32 種子亂數
js/engine/loop.js          — GameLoop：固定時步 60Hz、rAF 渲染、隱藏分頁 setInterval 後備
js/engine/save.js          — SaveStore：localStorage＋記憶體後備
js/engine/textures.js      — getTexture(kind)：wood/tile/wallpaper/plaster Canvas 程序貼圖
js/engine/renderer.js      — Renderer：場景/霧/燈、由 World 建房間網格與門板、房間級剔除
js/engine/audio.js         — AudioEngine：WebAudio 合成 step/door/locked＋環境音
js/engine/input.js         — Input：鍵鼠抽象（onKeyDown 等可直接呼叫測試）、PointerLock＋拖曳後備
js/game/world.js           — World：房間/門資料→牆段（扣門洞）、碰撞段、連通圖、roomAt
js/game/player.js          — Player：移動、視角、圓 vs 線段碰撞解算（純函式）
js/levels/sandbox.js       — SANDBOX 兩房沙盒（一道可開門、一道上鎖門）
tests/loop.test.js  tests/world.test.js  tests/player.test.js  tests/input.test.js  tests/save.test.js
```

## 關卡資料格式（本階段定案，後續三章沿用）

```js
{
  id: 'sandbox', name: '引擎沙盒',
  spawn: { x, z, yaw },
  lockNames: { moon: '月之鑰' },          // lock id → 顯示名稱
  rooms: [ { id, x, z, w, d, h,           // 軸對齊矩形：(x,z)最小角，w 沿 x、d 沿 z、h 高
             floor: 'wood', walls: 'wallpaper',
             light: { x, y, z, color, intensity } } ],
  doors: [ { id, from, to,                // to:null＝裝飾鎖門（不通往任何房）
             axis: 'x'|'z',               // 'x'：門洞沿 x 展開（在 z=at[1] 的牆上）；'z' 反之
             at: [x, z], width: 1.2, height: 2.2,
             lock: null | 'moon' } ],
}
```

牆段生成規則：每房四條邊；邊上有本房間門洞者，依門洞切開為子線段。碰撞段＝靜態牆段＋該房「關閉中」門的門洞段。門洞上方（door.height→room.h）由渲染層補上檻牆（純視覺，碰撞不需要——玩家高度不會撞到）。

## 核心演算法（實作依此，不得偏離）

**固定時步（loop.js）**：`tick(nowSeconds)` 累積 frame 時間（上限 `maxFrameTime=0.25`），`while (acc >= 1/60) update(1/60)`，單次 tick 最多 `maxUpdatesPerTick=240` 次後清空累積器（螺旋死亡保險）。`start()` 用 rAF 驅動 tick＋render；`visibilitychange` 隱藏時改 `setInterval(→tick, 50)` 只跑邏輯。`tick` 回傳本次 update 次數（供測試）。

**碰撞（player.js）**：`resolveCircleVsSegments(x, z, r, segments, iterations=3)`——對每線段取最近點，距離 < r 則沿法向推出 `(r-d)/d`；迭代 3 輪處理角落。60Hz 下單步位移（跑步 5.2/60≈0.087m）遠小於半徑 0.35，不需掃掠防穿隧。移動方向：`fwd=-moveZ`；`dirX=-sin(yaw)*fwd+cos(yaw)*moveX`；`dirZ=-cos(yaw)*fwd-sin(yaw)*moveX`；正規化超過 1 的對角移動。玩家跨房時把「相鄰開門房間」的牆段一併納入解算。

**速度**：走 3.2 m/s、跑 5.2 m/s；眼高 1.6；半徑 0.35。

**輸入（input.js）**：`onKeyDown(code, repeat)`/`onKeyUp`/`onMouseMove(dx,dy)` 為可測純方法（repeat=true 忽略）；`actions()` 回傳 `{ moveX, moveZ, run, interact, look:[dx,dy] }`，interact 為邊緣觸發（consume 一次性）、look 讀取即清零。`attach(canvas)` 才接 DOM 事件：click→requestPointerLock，`pointerlockerror`→拖曳後備模式。

**存檔（save.js）**：建構時以 probe key 試寫判定可用性；save 時寫入失敗自動降級記憶體 Map 並標 `persistent=false`；load 找不到回 null，JSON 壞損回 null。

## Tasks

### Task 1: 專案骨架＋測試設施

**Files:** Create `package.json`、`.gitignore`、`.claude/launch.json`、`index.html`、`css/style.css`

- [ ] Step 1: 建立上列檔案（index.html 含 import map `three → https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js`、`#app`、HUD（#crosshair、#hint）、#loading/#pause/#error 覆蓋層、`<script type="module" src="./js/main.js">`；所有路徑相對，GitHub Pages 子路徑相容）
- [ ] Step 2: `node --test tests/` 跑通（0 測試也算通過）
- [ ] Step 3: Commit `chore: 專案骨架與測試設施`

### Task 2: rng.js＋loop.js（TDD）

**Files:** Create `js/engine/rng.js`、`js/engine/loop.js`、Test `tests/loop.test.js`

- [ ] Step 1: 寫失敗測試：
  - `tick(0)` 初始化基準回傳 0；`tick(0.1)` 回傳 6（0.1s/60Hz）
  - 大跳幀 `tick(10)` 被 clamp 到 0.25s → 15 次
  - `maxUpdatesPerTick:5` 時 `tick(0.2)` 回傳 5 且累積器歸零（下次 tick(0.2+ε) 從新累積）
  - mulberry32 同種子序列相同、不同種子不同
- [ ] Step 2: `node --test tests/loop.test.js` → FAIL（模組不存在）
- [ ] Step 3: 依核心演算法實作 loop.js/rng.js
- [ ] Step 4: `node --test tests/loop.test.js` → PASS
- [ ] Step 5: Commit `feat: 固定時步遊戲迴圈與種子亂數`

### Task 3: sandbox.js＋world.js（TDD）

**Files:** Create `js/game/world.js`、`js/levels/sandbox.js`（純資料，兩房：hall 0,0,8×6 / study 8,0,5×6，門 d-hall-study axis'z' at[8,3]、鎖門 d-locked axis'x' at[10.5,0] lock:'moon' to:null）、Test `tests/world.test.js`

- [ ] Step 1: 寫失敗測試（用 SANDBOX 當夾具、線段比對用 ε 容差不比順序）：
  - `wallSegments('hall')` 含 `[8,0,8,2.4]`、`[8,3.6,8,6]`（共牆被門洞切開）；`wallSegments('study')` 同樣含這兩段＋minZ 邊被鎖門切開的 `[8,0,9.9,0]`、`[11.1,0,13,0]`
  - `collisionSegments('hall')` 含關閉門段 `[8,2.4,8,3.6]`；`setDoorOpen('d-hall-study', true)` 後不含
  - `reachableRooms('hall')` = {hall, study}；把 d-hall-study 加鎖後（測試中直接改 `world.doors.get(...).lock='x'`）= {hall}；`ignoreLocks:true` 又通
  - `roomAt(2,3)='hall'`、`roomAt(12,3)='study'`、`roomAt(-1,0)=null`
- [ ] Step 2: RUN → FAIL
- [ ] Step 3: 實作 World（見核心演算法；牆段快取 Map；doorSegment 由 axis/at/width 展開）
- [ ] Step 4: RUN → PASS
- [ ] Step 5: Commit `feat: 資料驅動世界與牆段生成`

### Task 4: player.js（TDD）

**Files:** Create `js/game/player.js`、Test `tests/player.test.js`

- [ ] Step 1: 失敗測試（用單房 10×10 World 夾具，actions 手寫物件，60 次 update(1/60)）：
  - 正面走向 z=0 牆（yaw=0、moveZ=-1、起點 (5,1)）→ 最終 z≈0.35（±1e-6）、x 不變
  - 斜 45° 撞牆滑行（yaw=π/4）→ z≈0.35 且 x 明顯減少（<4.9）
  - 跑步 1 秒空曠處位移 ≈5.2；走路 ≈3.2（±0.01）
  - `resolveCircleVsSegments` 單元：點在牆邊 r 內被推出到距離 r；正好落在線上時沿法線推出
- [ ] Step 2: RUN → FAIL
- [ ] Step 3: 實作（見核心演算法）
- [ ] Step 4: RUN → PASS
- [ ] Step 5: Commit `feat: 玩家移動與圓對線段碰撞`

### Task 5: input.js（TDD）

**Files:** Create `js/engine/input.js`、Test `tests/input.test.js`

- [ ] Step 1: 失敗測試：W→moveZ=-1、S+W 抵銷=0、D→moveX=1；E 邊緣觸發一次後自動清除；repeat 按鍵不重新觸發；onMouseMove 累積、actions().look 讀後歸零；Shift→run
- [ ] Step 2: RUN → FAIL；Step 3: 實作（attach 只做事件接線，不在測試路徑）；Step 4: PASS
- [ ] Step 5: Commit `feat: 輸入動作抽象層`

### Task 6: save.js（TDD）

**Files:** Create `js/engine/save.js`、Test `tests/save.test.js`

- [ ] Step 1: 失敗測試：fake storage 往返 deepEqual；建構時 probe 失敗→persistent=false 走記憶體；建構後才失敗（probe 過、正式 key 丟例外）→自動降級且資料不遺失；load 壞 JSON→null；SaveStore(null) 純記憶體可用
- [ ] Step 2: RUN → FAIL；Step 3: 實作；Step 4: PASS
- [ ] Step 5: Commit `feat: 存檔層與記憶體後備`

### Task 7: textures.js（瀏覽器驗證）

**Files:** Create `js/engine/textures.js`

- [ ] Step 1: 實作 `getTexture(kind)`（快取；wood 直紋木板、tile 磁磚格線、wallpaper 直條紋＋污漬、plaster 斑駁灰泥；全部 256×256、RepeatWrapping、SRGBColorSpace、mulberry32 固定種子）
- [ ] Step 2: 驗證延後至 Task 10 preview 一併看
- [ ] Step 3: Commit `feat: Canvas 程序貼圖`

### Task 8: renderer.js（瀏覽器驗證）

**Files:** Create `js/engine/renderer.js`

- [ ] Step 1: 實作 Renderer：WebGLRenderer 建構失敗 throw `WEBGL_UNSUPPORTED`；FogExp2 暗夜氛圍；PerspectiveCamera(70) `rotation.order='YXZ'`；`buildLevel(world)` 由 wallSegments 建牆 Box、地板/天花板 Plane、門洞上檻、房內 PointLight、門板 pivot（鉸鏈端 Group）；`setDoorOpen` 轉門板（純裝飾）；`setActiveRooms(ids)` 房間級剔除；`updateCamera(player)`；`resize(w,h)`（w/h≤0 直接 return——容器初始尺寸為 0 的既有課題）
- [ ] Step 2: Commit `feat: 渲染層與房間級剔除`

### Task 9: audio.js（瀏覽器驗證）

**Files:** Create `js/engine/audio.js`

- [ ] Step 1: 實作 AudioEngine：`unlock()` 首次手勢建 AudioContext＋環境棕噪音；`play('step'|'door'|'locked')` 合成音（濾波噪音短脈衝／低頻悶響＋吱呀掃頻／金屬雙 click）；ctx 不存在時所有方法安靜 no-op
- [ ] Step 2: Commit `feat: WebAudio 合成音效`

### Task 10: main.js 整合＋沙盒可玩（preview 驗證）

**Files:** Create `js/main.js`

- [ ] Step 1: 實作 boot：Renderer 失敗→#error；World/Player/Input/AudioEngine/SaveStore 組裝；`input.attach(canvas)`；GameLoop({update,render}) 啟動；ResizeObserver→renderer.resize；`window.__zw={world,player,input,loop,renderer}` 供自動驗證
- [ ] Step 2: update(dt) 內：Escape→暫停（另監聽 pointerlockchange 失鎖即暫停）；look/move；步行距離累積播 step 音；最近門 1.6m 內顯示提示（上鎖門顯示「上鎖了——需要『月之鑰』」），E 開關門同步 world+renderer+audio；`roomAt` 變更時 setActiveRooms(當前+相鄰)
- [ ] Step 3: preview_start `zombie-world` → preview_eval 驗證：`__zw` 存在；模擬 `input.onKeyDown('KeyW')` 後 500ms `player.z` 減少；`input.onKeyDown('KeyE')`（站門邊）後 `world.doors.get('d-hall-study').open===true`；console 無錯誤
- [ ] Step 4: Commit `feat: 沙盒整合——行走、開門、暫停`

### Task 11: 隱藏分頁韌性驗證

- [ ] Step 1: preview_eval：`document.dispatchEvent`模擬不可行（document.hidden 唯讀），改為直接驗證後備機制——`__zw.loop.tick(t)` 手動餵時間邏輯照跑；record `player.z` → `onKeyDown('KeyW')` → 連續 `tick` 30 次 → z 減少（rAF 停擺下邏輯仍可被驅動）
- [ ] Step 2: 確認除 jsdelivr three 外無其他外部請求（preview_network）
- [ ] Step 3: Commit（如有修正）`fix: 隱藏分頁後備驗證修正`

### Task 12: 多代理審查與收尾

- [ ] Step 1: Workflow 平行審查：邏輯正確性（碰撞/牆段 vs 測試）、GH Pages/CDN 相容、隱藏分頁與既有教訓遵循、UI/文案
- [ ] Step 2: 確認的問題修正＋補測試
- [ ] Step 3: `node --test tests/` 全綠後 Commit `chore: 階段一審查修正`

## 驗收（本階段完成的定義）

1. `node --test tests/` 全部通過
2. preview 中可行走兩房、開關門、鎖門提示正確、ESC 暫停/繼續
3. rAF 不跑（隱藏分頁）時以 tick 驅動邏輯仍正確
4. 除 three CDN 外零外部請求
5. 每任務皆有獨立 commit
