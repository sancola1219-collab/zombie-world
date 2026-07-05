# 階段 2.5：視覺重製＋手機觸控 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans。步驟用 checkbox 追蹤。

**Goal:** 把戰鬥示範場的畫面拉到暗色電影感生存恐怖氛圍，並讓手機可完整遊玩。

**Architecture:** 全部視覺強化走「純裝飾」路線（渲染層與 DOM 覆蓋層），遊戲邏輯不變；觸控輸入透過既有 Input 抽象合成（虛擬按鍵直接呼叫 onKeyDown/onMouseDown，搖桿走新增的類比通道），UI 層零新邏輯。

**Tech Stack:** 既有架構；新增 `assets/textures/` 外部貼圖熱插拔（程序貼圖後備）。

## Tasks

### Task 1: 貼圖管線（外部圖優先、程序後備）
- [ ] `textures.js`：`getTexture(kind)` 先回程序 Canvas 貼圖，非同步嘗試載入 `assets/textures/<kind>.jpg`，成功就把 `texture.image` 換成圖片（同一 Texture 物件熱替換，材質不需重建）
- [ ] 新增程序後備：carpet（舊地毯）、metal（鏽鋼板）、door（門板=深色木紋）
- [ ] main.js：嘗試載入 `menu-bg.jpg` 設為載入/暫停面板背景（漸層壓暗疊加）

### Task 2: 光影與後處理
- [ ] renderer：ACESFilmic tone mapping、環境光壓暗（0x202028/0.5）、霧加濃（0.09）、背景更深
- [ ] **手電筒**：SpotLight 掛相機（角度 0.55、penumbra 0.6），target 為相機子物件
- [ ] 房間燈支援 `flicker: true`（render 內隨機抖動強度，純裝飾）
- [ ] DOM 後處理：`#fx` 暗角（radial-gradient）＋ `#grain` 顆粒層（JS 生成噪點圖、CSS steps 動畫抖動）
- [ ] 相機走路搖晃（比較前後幀位置推進 bob 相位）＋受擊震動 `renderer.shake()`（衰減）

### Task 3: 場景道具（props）
- [ ] 關卡資料新增 `props: [{room, type, x, z, rot?, solid?}]`；type：table/chair_fallen/shelf/crate/barrel/papers/blood/bodybag/pipe
- [ ] renderer 依 type 程序建網格、掛進該房間群組（吃房間剔除）
- [ ] world.js：`solid` 值（半邊長）→ 在該房靜態牆段附加方形障礙段（玩家與敵人都會被擋）；補單元測試
- [ ] arena.js：三房擺道具（軍械室置物架/木箱、走廊翻倒椅/散紙/血跡、競技場桌椅/屍袋/油桶）＋燈光調暗、走廊與競技場開 flicker

### Task 4: 敵人外觀升級
- [ ] 殭屍：駝背軀幹、前伸單臂＋垂臂、歪頭、分離雙腿；行走時四肢擺動（render 內、僅視覺）
- [ ] 犬：四腿奔跑擺動
- [ ] syncEnemy 介面不變（userData 傳 moving 旗標）

### Task 5: 手機觸控
- [ ] input.js：`setTouchMove(x,z)` 類比通道（與鍵盤合併後 clamp）、推滿 >0.85 視為奔跑；`attachTouch({stick, knob, lookZone, buttons})`——搖桿多點觸控追蹤 identifier、右半螢幕滑動＝視角、按鈕合成 onKeyDown/onMouseDown（**零新邏輯，全走既有抽象**）
- [ ] index.html/css：`#touch-ui`（左下搖桿；右下 射擊/E/R/Q換武器/Tab物品；右上 ⏸）僅觸控裝置顯示；canvas `touch-action:none`
- [ ] main.js：`KeyQ` 循環切換武器（桌面也受益）；觸控時 dragMode 語意調整（不請求 pointer lock、不因失鎖暫停）；觸控 idle 提示更新
- [ ] overlays（物品欄/打字機/死亡）：面板加觸控按鈕列，按鈕只合成既有按鍵碼（KeyE/KeyF/KeyG/Tab/KeyR/Enter），桌面隱藏
- [ ] 單元測試：類比合併 clamp、觸控奔跑閾值

### Task 6: 驗證與收尾
- [ ] `node --test` 全綠；preview：桌面流程回歸＋模擬觸控輸入（直接呼叫 setTouchMove/onKeyDown 驗證）
- [ ] 手機 viewport 實測（preview_resize mobile）
- [ ] push 發佈、CLAUDE.md/AGENTS.md 同步新約定（props 格式、觸控合成原則）、記憶更新
