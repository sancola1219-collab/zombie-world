# 《殭屍世界：黑鴉市事件》完整交接文件

> 給接手的 AI 代理（Codex / Claude Code / 其他）：**先讀本檔，再讀 `CLAUDE.md`（＝`AGENTS.md`）的鐵律，然後才動程式碼。**
> 現況：v3.0.0，全三章可通關，95 個 node 測試全綠，線上 https://sancola1219-collab.github.io/zombie-world/

## 一、這是什麼

純前端第一人稱生存恐怖射擊解謎遊戲（繁體中文），零建置步驟：ES modules 直接跑，唯一外部依賴是 import map 指到 jsdelivr 的 `three@0.170.0`。發佈＝`git push`（GitHub Pages，main 分支根目錄）。

劇情由使用者原著（`docs/story/chapter1-瞞天過海.md`，必讀）：2026 年台南柳營，立愷X電新廠與晨星工業的 KY 液體外洩。主角周亮均。**「雨傘公司/Umbrella」是 Capcom 商標，遊戲內一律用「晨星工業」**；所有敵人/角色/文本皆原創，不得引入 Capcom 詞彙。

## 二、架構（30 秒版）

```
js/engine/  loop（固定時步60Hz+rAF渲染+隱藏後備） renderer（three，唯一碰 three 的地方之一）
            input（動作抽象+觸控合成） audio（全合成音效+程序配樂） save textures meshes models rng
js/game/    world（房間資料→牆段/碰撞/連通圖） player combat weapons items projectiles gamestate
            enemies/（base + 每敵種一檔：zombie dog hunter lurker spider creeper bloater prime）
js/levels/  chapter1/2/3（關卡＝純資料） story1 arena(測試夾具) sandbox(夾具)
js/ui/      hud（心電圖/彈藥/小地圖） overlays（物品欄/打字機/死亡，全鍵盤）
js/main.js  唯一的組裝點：所有 DOM 接線、模式機、章節切換都在這
tests/      node --test，95 個，全部同步模擬不碰瀏覽器
```

三條命脈（違反就會出難查的 bug，細節見 CLAUDE.md）：
1. 邏輯只在 `update(dt)` 固定時步內；渲染層絕不回寫遊戲狀態。
2. `js/game/*`、loop、save 不 import three、不碰 DOM——這是 node 測試的前提。
3. 關卡＝資料。加內容改 `js/levels/*.js`，不要在 renderer 裡硬寫。

## 三、模式機（main.js 的 `mode`）

`title → difficulty → story →（play ⇄ paused/inventory/typewriter/map/read/dialog）→ end`，另有 `dead`。
每個模式在 `update(dt)` 開頭有自己的分支：**消化輸入緩衝再 return**（否則殘留的邊緣輸入會在恢復時暴走——踩過的坑）。

## 四、章節系統

- `CHAPTERS` 表（main.js）註冊所有章節；`PROGRESS_KEY`（localStorage `zombie-world-progress`）記 `{chapter, difficulty, auto}`。
- 章末門＝`lock:'chapterExit'` 的裝飾門（to:null）；需求鑰匙在關卡的 `exitNeeds`（如 gatecode/labkey/bossdead），缺少時顯示 `exitHint`。
- 「前往下一章」→ 存 progress（auto:'story'）→ reload → boot 依 progress 載入該章並直接播開場劇情。
- Boss 章：關卡設 `boss:'<enemyId>'` 與 `countdown`（秒）——main 偵測 Boss 死亡→ push 假鑰匙 `bossdead`、啟動倒數（歸零＝死亡）。

## 五、關卡資料格式（加內容就照抄現有章節）

```js
{
  id, name, next, exitNeeds, exitHint, boss?, countdown?,
  spawn: {x, z, yaw},                       // yaw=0 面向 -z
  lockNames: {lockId: 顯示名},
  story: [每頁字串],                        // 開場文字卡（\n 換行）
  endingText,                                // 章末結語（最終章）
  objective,                                 // 入局提示
  rooms: [{id, name, x, z, w, d, h, floor, walls, light:{x,y,z,color,intensity,flicker?}}],
  doors: [{id, from, to|null, axis:'x'|'z', at:[x,z], width, height, lock|null}],
  props: [{room, type, x, z, rot?, solid?}], // type 見 renderer makeProp；solid=半邊長→方形障礙
  documents: [{id, title, text, x, z, grantsKey?}],
  npcs: [{id, name, x, z, yaw, dialog:[…], dialogAfter, gift:[{item,count}]}],
  triggers: [{id, room, text, sound?, alert?, shake?}], // 進房一次性
  entities: { pickups: [{id, item, count, x, z}], enemies: [{id, type, x, z}], typewriters: [{id,x,z}] },
  start: { weapons: [{id, rounds}] },
}
```
**加完關卡必寫測試**（抄 tests/chapter3.test.js）：門房存在、實體都在房間內、鑰匙在可達區、鎖鏈 BFS 前後可達性——這套測試擋掉過真死鎖。

## 六、常見任務 Cookbook

- **加房間**：rooms 加矩形（與鄰房共邊）＋ doors 開在共邊上（at 落在邊線上）→ 測試自動驗證。
- **加敵種**：`js/game/enemies/` 新檔繼承 Enemy 實作 `think(dt,ctx)`＋`hitSpheres()`；`meshes.js` 加 `buildXxxMesh`；renderer `ENEMY_BUILDERS` 與 main `ENEMY_TYPES` 各加一行；寫狀態機測試（抄 enemies2.test.js 的 fake ctx）。ctx 提供：player/world/rng/attackPlayer/sound/poison/boom。
- **加武器**：weapons.js `WEAPONS` 加定義（melee/auto/spray/projectile 旗標）＋ items.js 彈藥與 `xxx_weapon` 拾取；`meshes.buildWeaponModel` 加視角模型分支；main `WEAPON_SLOTS` 加 id。
- **加謎題**：優先用「文件 grantsKey → 門 lock」既有機制；更複雜的再寫新 UI。
- **調亮度**：光強是物理單位——手電筒 450 等級是錯的年代產物，現制：手電筒 decay=0 值 16、房燈 20~40。改完用 preview_eval `gl.readPixels` 取樣驗證（CLAUDE.md 有目標值），**不要憑截圖**。
- **換模型**：`assets/models/*.glb` 丟檔即熱替換（剪影探測自動校正尺寸/貼地；動畫片段名對應見 renderer `CLIP_PREFS`）。

## 七、測試與發佈流程

```
node --test                # 全綠才 commit
npx http-server -p 8123 .  # 本地跑（或 preview 工具）
git push                   # 發佈；**同時 bump index.html 的 ?v= 與 #buildtag**
```
驗證用 `window.__zw`（world/player/input/loop/arsenal/inventory/enemies/setMode/setDifficulty…）——瀏覽器隱藏也能測：`__zw.loop.stop()` 後用 `__zw.loop.tick(t)` 同步驅動。
**合成 tick 陷阱**：步長用 0.02（大基準時間下 +1/60 會因浮點得到 0 次更新）、每段測試前 `input.clearTransient()`。

## 八、已知陷阱清單（都付過學費）

1. GitHub Pages CDN 快取 10 分鐘＋手機瀏覽器快取更頑固——「畫面沒變」先看右下角版本徽章；手機給 `?v=xxx` 網址。
2. 這台開發機瀏覽器常隱藏：rAF 停、interval 節流、截圖逾時、載入時視窗尺寸全 0——防護已內建（loop 啟動時就選驅動器＋自我修復、ResizeObserver、resize 拒 0），不要拆。
3. Pointer Lock：Esc 後 ~1.25s 冷卻、錯誤要連續 3 次才降級拖曳、Promise 要 catch、暫停中的 Esc 要 consume。
4. 骨架模型（glb）的包圍盒數學不可信（inverse bind 會騙人）——尺寸校正一律走 renderer 的剪影探測，別回去用 Box3。
5. 觸控偵測要雙條件（media query + maxTouchPoints），部分手機瀏覽器會誤報。
6. 敵人是骨架外部模型時 `userData.parts=null`（無程序擺動）；程序模型的擺動只在 render 內推進。

## 九、已知限制與後續想法（非承諾）

- 自毀倒數不入存檔（倒數中存檔→讀檔會歸零重來）；欣儀 NPC 只在第一章。
- 貼圖可由使用者丟 `assets/textures/*.jpg` 熱替換（檔名表：assets/textures/README.md），現為程序生成。
- 可能的擴充：更多章節（洋館設定保留在 specs/ 原設計）、執行者式不死追跡者、成就/二周目。

## 十、關鍵檔案索引

| 要改什麼 | 看哪裡 |
|---|---|
| 劇情/文案 | js/levels/chapterN.js（story/documents/triggers/npcs）＋ docs/story/ |
| 平衡（傷害/血量/彈藥） | js/game/weapons.js、各 enemies/*.js 建構子、main DIFFICULTY 表 |
| 音效/配樂 | js/engine/audio.js（全合成，_burst/_tone 兩個原語） |
| 視覺氛圍 | js/engine/renderer.js（霧/環境光/手電筒/後處理在 index.html #fx/#grain） |
| 存檔欄位 | js/game/gamestate.js + main doSave/doLoad |
| 手機操作 | js/engine/input.js attachTouch + index.html #touch-ui |
