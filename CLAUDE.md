# 殭屍世界：黑鴉市事件 — 開發指南

> 本檔與 `AGENTS.md` 內容同步（前者給 Claude Code、後者給 Codex 等其他代理）。修改任一檔請同步另一檔。
> 完整交接文件（架構導覽＋操作手冊）：`docs/HANDOVER.md`（專案完工時產出，開發中先以本檔為準）。

## 專案是什麼

第一人稱生存恐怖射擊解謎遊戲（繁體中文），致敬經典生存恐怖系列但**名稱角色全原創**（發佈公開網址，不可使用 Capcom 商標詞彙如「惡靈古堡」「保護傘」「浣熊市」及其角色名）。

- 純前端、零建置步驟：ES modules 直接跑，唯一外部依賴是 import map 指到 jsdelivr 的 `three@0.170.0`
- 線上網址：https://sancola1219-collab.github.io/zombie-world/ （repo：sancola1219-collab/zombie-world，main 分支根目錄直接發佈）
- 設計規格（已核准勿翻案）：`docs/superpowers/specs/2026-07-04-zombie-world-fps-design.md`
- 路線圖與進度：`docs/superpowers/plans/2026-07-04-zombie-world-roadmap.md`——**每階段完成才寫下一階段計畫**，計畫檔同目錄

## 鐵律（違反會壞掉的架構約定）

1. **邏輯與渲染徹底分離**：遊戲狀態只在 `GameLoop` 固定時步（60Hz）的 update 內改變；rAF 只負責渲染。動畫是純裝飾，任何遊戲狀態不得依賴動畫回呼或 rAF 時序（開發機瀏覽器常整個隱藏，rAF 會完全停擺）。
2. **邏輯模組不碰瀏覽器**：`js/game/*`、`js/engine/loop.js`、`js/engine/save.js` 不得 import three、不得碰 DOM/window。DOM 事件接線集中在各類的 `attach()` 與 `js/main.js`。這是單元測試能在 node 跑的前提。
3. **關卡＝資料**：房間（軸對齊矩形）＋門＋實體＋道具全部定義在 `js/levels/*.js`，幾何與碰撞由資料生成。加內容改資料檔，不要在渲染層硬寫幾何。資料格式見階段一計畫；道具格式 `props: [{room, type, x, z, rot?, solid?}]`——`solid`（半邊長）會在 World 生成方形障礙段，渲染由 renderer 的 `makeProp` 依 type 程序建模。
4. **觸控＝合成輸入**：虛擬搖桿走 `input.setTouchMove()` 類比通道（推滿>0.85＝奔跑）、所有虛擬按鈕與覆蓋層觸控按鈕一律合成 `onKeyDown/onMouseDown` 既有事件——不得為觸控另寫遊戲邏輯分支。觸控裝置偵測用 `(hover: none) and (pointer: coarse)`，命中時 `body.touch` class 切換 `.touch-only`/`.no-touch` 元素。
4. **隨機用 `mulberry32(seed)`**（`js/engine/rng.js`），不用 `Math.random()`（渲染特效除外），保證可重現。
5. 座標：x 向東、z 向南、y 向上；yaw=0 面向 −z；`camera.rotation.order='YXZ'`。

## 目錄結構

```
js/engine/   loop(固定時步) renderer(three 渲染) input(輸入抽象) audio(合成音效)
             save(localStorage+記憶體後備) textures(Canvas 程序貼圖) rng
js/game/     world(房間/門/牆段/連通圖) player combat(射線命中) weapons items
             enemies/(各敵種狀態機 AI)
js/levels/   關卡資料（sandbox=引擎沙盒、arena=戰鬥示範場、chapter1~3=三章）
js/ui/       HUD、物品欄等 DOM 覆蓋層
tests/       node:test 單元測試（*.test.js）
```

## 工作流程

- **測試**：`node --test`（必須全綠才 commit；新邏輯先寫測試）
- **本地執行**：`npx http-server -p 8123 .`（或 Claude Code 用 `.claude/launch.json` 的 preview）
- **自動驗證**：頁面暴露 `window.__zw = { world, player, input, loop, renderer, saves, setPaused }`；瀏覽器隱藏時照樣可測——`__zw.loop.stop()` 後用 `__zw.loop.tick(t)` 手動餵時間同步驅動，斷言狀態（不要依賴截圖，隱藏視窗會逾時）
- **發佈**：`git push`（main 分支，Pages 自動部署）。PAT 在 Windows 認證管理員；PowerShell 5.1 讀憑證要用 cmd 重導向（`git credential fill`），不要用 PS 管線餵 secret。**每次發佈必須同步 bump `index.html` 的入口 `?v=` 與 `#buildtag` 版本文字**——GitHub Pages CDN 快取 10 分鐘，使用者靠右下角版本徽章判斷載到哪一版（「畫面沒變」十之八九是快取）
- **燈光單位**：three 的光強是物理單位（燭光），手電筒 450、房燈 20~40 才正常；個位數＝幾乎全黑。改光後用 preview_eval `gl.readPixels` 取樣亮度驗證（目標：光圈中心 ~100/255、暗部 <40），不要憑截圖感覺（此機瀏覽器截圖常逾時）
- **commit**：每完成一個任務就 commit，繁中訊息

## 已知陷阱（都吃過虧）

- 開發機瀏覽器常隱藏：rAF 停、`setInterval` 節流到 1Hz、載入時容器與 `innerWidth` 全為 0、截圖逾時。對策已內建：`GameLoop.start()` 依 `document.hidden` 選驅動器、`ResizeObserver` 跟尺寸、`renderer.resize` 拒絕 0 值——不要移除這些防護
- **共用牆 z-fighting**（v3.5.0 根治）：相鄰兩房各自沿共用邊生成牆，若都以邊線為中心會完全共面→畫面閃爍破碎（「光線破碎」的真兇，換逐像素光照治不了）。`renderer.makeWall` 現把牆體往自己房間內側推 0.061——改牆生成邏輯必須保留這個內縮
- Pointer Lock：Esc 退出後約 1.25 秒內重新上鎖必失敗。`pointerlockerror` 要連續 3 次才降級拖曳模式；`requestPointerLock()` 的 Promise 要 catch；暫停中按的 Esc 要 consume 掉再恢復
- UI 面板（物品欄等）全鍵盤導航，不依賴滑鼠點擊（pointer lock 之下沒有游標）
