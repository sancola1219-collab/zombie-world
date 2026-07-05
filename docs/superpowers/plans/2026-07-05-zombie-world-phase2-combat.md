# 階段二：戰鬥與物品系統 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 武器射擊（小刀/手槍/霰彈槍，麥格農資料就位）、殭屍與殭屍犬 AI、心電圖 HUD、8 格物品欄與草藥、打字機存讀檔、死亡畫面——以三房「戰鬥示範場」驗證完整生存恐怖循環：打殭屍→撿彈藥→用草藥→打字機存檔→死亡讀檔。

**Architecture:** 延續階段一分層：新邏輯模組（items/weapons/combat/enemies/gamestate）全部純邏輯可 node 測試；渲染只反映狀態。命中判定不用 three raycaster——自寫「射線對球體（身體/頭部命中區）＋射線對牆段（遮擋）」數學，邏輯側可測。UI 全鍵盤操作（物品欄/打字機不退出 pointer lock，避免與失鎖自動暫停互打）。

**Tech Stack:** 同階段一。跨階段約定見 roadmap。

---

## 檔案

```
新增：
js/game/items.js        — ITEMS 定義 + Inventory（8格、堆疊、組合、治療、關鍵道具另列）
js/game/weapons.js      — WEAPONS 定義 + Arsenal（持有武器、彈匣、射速、裝填）
js/game/combat.js       — castShot：射線對敵人命中球（head/body）＋牆段遮擋；散佈
js/game/enemies/base.js — Enemy 基底：狀態機骨架、hurt/zone 倍率、separateEnemies
js/game/enemies/zombie.js / dog.js
js/game/gamestate.js    — 存檔快照 build/apply（玩家/物品欄/武器/敵人/已拾取）
js/levels/arena.js      — 三房示範場（軍械室→走廊→競技場）＋ entities
js/ui/hud.js            — 心電圖 canvas、彈藥數、受擊紅暈、命中標記
js/ui/overlays.js       — 物品欄（鍵盤導航）、打字機、死亡畫面
tests/items|weapons|combat|enemies|gamestate.test.js
修改：
js/game/world.js        — nextDoorToward(from,to)（BFS 經「開著的門」）
js/game/player.js       — hurt(dmg)+無敵幀、Danger(<33) 移速 ×0.8
js/engine/input.js      — 滑鼠鍵 just-pressed、Digit1-4/R/Tab/F/G/Enter、Tab preventDefault
js/engine/renderer.js   — 敵人網格（程序低模）、拾取物、打字機、槍口閃光、血粒子、視角武器模型
js/engine/audio.js      — 槍聲×3、空膛、裝填、呻吟、犬吠、咬擊、受傷、拾取、治療、打字機、心跳
js/main.js              — 遊戲模式機（play/paused/inventory/typewriter/dead）與全系統整合
```

## 介面定案（實作不得偏離）

**items.js**：`ITEMS = { green_herb{heal,stack3}, red_herb{stack3,單用無效}, mixed_herb{全滿}, first_aid_spray{全滿}, handgun_ammo{stack45}, shotgun_shells{stack21}, magnum_ammo{stack12}, shotgun_weapon{type:'weapon'} }`。`Inventory(size=8)`：`add(id,count)→{added,leftover}`（先堆疊後空格）、`remove(i,n)`、`combine(a,b)`（綠+紅→mixed，佔原 a 格）、`useHeal(i,player)`（綠+40 上限 100；紅單用 false；mixed/噴霧全滿）、`takeAmmo(id,max)→n`、`toJSON()/fromJSON()`。武器不佔格（Arsenal 管），關鍵道具 `keyItems` 另列（本階段未用）。

**weapons.js**：`WEAPONS = { knife{melee,15,range1.6,間隔0.55}, handgun{25,彈匣15,0.4,散佈0.012}, shotgun{8顆×12,彈匣7,1.05,0.07}, magnum{150,彈匣6,0.95,pierce} }`。`Arsenal`：`owned/current/loaded`、`give(id,rounds)`、`select(id)`、`fire(now)→null|{empty:true}|{melee|pellets,damage,spread,pierce}`（間隔用邏輯時間 now 秒）、`reload(inv)→補入發數`、`toJSON()/fromJSON()`。

**combat.js**：`castShot({origin:{x,y,z}, dir:{x,y,z}, enemies, wallSegments, maxRange=40}) → {enemy,zone,dist}|null`。敵人命中球由 `enemy.hitSpheres()` 提供 `[{y,r,zone:'body'|'head'}]`；牆段 2D 遮擋（牆為全高）。`jitterDir(dir,spread,rng)` 散佈。

**enemies**：`Enemy` 基底：`hp/state/stateTime/yaw/radius/speed`、`hurt(dmg,zone)`（head ×2；未死進 stagger 0.3s）、`update(dt,ctx)`。`ctx = { player, world, rng, gameTime, attackPlayer(dmg), sound(name,x,z) }`。殭屍：hp70、速0.9、同房 12m 內或被槍聲警覺（`alert()`）追擊、0.95m 進 windup 0.45s → 1.15m 內咬 20、冷卻 0.6s；跨房走向 `world.nextDoorToward` 的門中心。犬：hp40、速3.4、3m 內撲擊（鎖向 6.5 速 0.45s、觸碰咬 15）→ 硬直 0.9s。`separateEnemies(list)` 圓對圓推開。玩家 `hurt()` 有 0.7s 無敵幀。

**gamestate.js**：`buildSave({...})→object`、`applySave(data,{...})`。內容：levelId、player{x,z,yaw,hp}、inventory、arsenal、enemies[{id,x,z,hp,dead}]、takenPickups[]、gameTime。

**arena.js**：軍械室(0,0,6×5)–走廊(6,1.5,6×2)–競技場(12,0,9×8)，門 [6,2.5]、[12,2.5]（axis 'z'）。開局：小刀＋手槍(滿彈15)。拾取：手槍彈15、綠草藥×2、紅草藥、霰彈槍(裝4)、霰彈7。敵人：走廊殭屍×1、競技場殭屍×3＋犬×1。打字機在軍械室。

**操作**：左鍵射擊（單發 edge）、R 裝填、1-4 切武器、Tab 物品欄（開著時 WASD/方向鍵移動游標、E 使用、F 組合、G 丟棄、Tab 關閉）、打字機 E→（E 存檔/R 讀檔/Tab 離開）、死亡畫面（R 讀檔/Enter 重來）。物品欄與打字機開啟時不退出 pointer lock、遊戲暫停推進但迴圈照跑。

## Tasks

- [ ] **T1 計畫提交** → commit
- [ ] **T2 items.js（TDD）**：堆疊/滿格 leftover/組合/紅單用無效/治療上限/takeAmmo 部分取出/JSON 往返 → commit
- [ ] **T3 weapons.js（TDD）**：射速間隔、彈耗、空膛、裝填從物品欄取彈、霰彈 pellets、JSON 往返 → commit
- [ ] **T4 combat.js（TDD）**：球命中/未命中、頭部區優先（瞄準高度）、牆後不可擊中、雙敵取近者 → commit
- [ ] **T5 world.nextDoorToward + player.hurt/Danger 減速（TDD）** → commit
- [ ] **T6 enemies（TDD）**：殭屍警覺→追擊→windup→咬到（ctx 回呼）、受擊硬直、頭×2 兩槍死、犬撲擊與硬直、separateEnemies → commit
- [ ] **T7 gamestate（TDD）**：完整快照往返 → commit
- [ ] **T8 input 擴充（TDD）**：滑鼠 edge、新按鍵映射 → commit
- [ ] **T9 arena.js＋renderer 擴充**（敵人低模網格與死亡姿態、拾取物、打字機、槍口閃光、血粒子、視角武器）→ commit
- [ ] **T10 audio 擴充**（槍聲/空膛/裝填/呻吟/犬吠/咬擊/受傷/拾取/治療/打字機/心跳分級）→ commit
- [ ] **T11 hud.js＋overlays.js＋main.js 整合**：模式機、射擊→castShot→hurt→血粒子、拾取（1.1m E）、警覺廣播、心電圖、物品欄、打字機存讀、死亡畫面 → commit
- [ ] **T12 preview 驗證**：擊殺殭屍（兩發頭）、被咬掉血＋紅暈、草藥回血、撿霰彈槍切換、存檔→亂走→讀檔還原、死亡→讀檔；console 乾淨 → commit

## 驗收

1. `node --test` 全綠（含新模組）
2. preview：完整循環（戰鬥/拾取/治療/存讀/死亡讀檔）可跑通
3. 邏輯模組零 three/DOM 依賴；隱藏分頁下可用 tick 手動驅動全流程
4. 右鍵瞄準、麥格農拾取、殭屍撞門行為 → 明確延後（階段三+）
