// UI 字串四語字典。每項 { zh, en, de, ja }。{var} 為插值佔位。
// 由 i18n.t(key, vars) 查詢。介面文字集中在此；劇情內容在 content-*.js。
export const UI = {
  // === 標題／載入 ===
  game_title: { zh: '殭屍世界', en: 'Zombie World', de: 'Zombie-Welt', ja: 'ゾンビワールド' },
  subtitle: { zh: '黑鴉市事件', en: 'The Blackcrow Incident', de: 'Der Blackcrow-Zwischenfall', ja: 'ブラッククロウ事件' },
  loading_tip: { zh: '載入中…', en: 'Loading…', de: 'Wird geladen…', ja: '読み込み中…' },
  title_tip: { zh: '2026・立愷X電 柳營新廠', en: '2026 · Li-Kai X-Electric, Liuying New Plant', de: '2026 · Li-Kai X-Electric, Werk Liuying', ja: '2026・立愷Xエレクトリック 柳営新工場' },
  no_save: { zh: '沒有存檔紀錄', en: 'No saved game', de: 'Kein Spielstand', ja: 'セーブデータがありません' },
  btn_start: { zh: '開始遊戲', en: 'New Game', de: 'Neues Spiel', ja: 'ゲーム開始' },
  btn_continue: { zh: '繼續遊戲', en: 'Continue', de: 'Fortsetzen', ja: 'つづきから' },
  btn_help: { zh: '操作說明', en: 'Controls', de: 'Steuerung', ja: '操作説明' },
  lang_label: { zh: '語言', en: 'Language', de: 'Sprache', ja: '言語' },

  // === 難度 ===
  diff_title: { zh: '選擇難度', en: 'Select Difficulty', de: 'Schwierigkeit wählen', ja: '難易度を選択' },
  diff_easy_name: { zh: '輕鬆', en: 'Easy', de: 'Leicht', ja: 'イージー' },
  diff_standard_name: { zh: '標準', en: 'Standard', de: 'Standard', ja: 'スタンダード' },
  diff_hard_name: { zh: '艱難', en: 'Hard', de: 'Schwer', ja: 'ハード' },
  diff_easy_btn: { zh: '輕鬆　　彈藥較多，敵人較弱', en: 'Easy — more ammo, weaker enemies', de: 'Leicht — mehr Munition, schwächere Gegner', ja: 'イージー　　弾薬多め・敵が弱い' },
  diff_standard_btn: { zh: '標準　　經典生存恐怖體驗', en: 'Standard — the classic survival-horror experience', de: 'Standard — das klassische Survival-Horror-Erlebnis', ja: 'スタンダード　　王道サバイバルホラー' },
  diff_hard_btn: { zh: '艱難　　彈藥稀缺，步步驚心', en: 'Hard — scarce ammo, every step a risk', de: 'Schwer — knappe Munition, jeder Schritt ein Risiko', ja: 'ハード　　弾薬僅少・一歩ごとに緊張' },

  // === 通用提示條 ===
  story_tip: { zh: '點擊或按 E 繼續．Esc 跳過', en: 'Click or press E to continue · Esc to skip', de: 'Klicken oder E zum Fortfahren · Esc zum Überspringen', ja: 'クリックまたは E で進む・Esc でスキップ' },
  doc_tip: { zh: '按 E 或點擊關閉', en: 'Press E or click to close', de: 'E oder Klick zum Schließen', ja: 'E またはクリックで閉じる' },
  dialog_tip: { zh: '按 E 或點擊繼續', en: 'Press E or click to continue', de: 'E oder Klick zum Fortfahren', ja: 'E またはクリックで進む' },

  // === 章末 ===
  chapend_next: { zh: '前往下一章', en: 'Next Chapter', de: 'Nächstes Kapitel', ja: '次の章へ' },
  chapend_back: { zh: '回到標題', en: 'Back to Title', de: 'Zum Titelbildschirm', ja: 'タイトルへ' },
  all_complete: { zh: '全章節　完', en: 'All Chapters Complete', de: 'Alle Kapitel abgeschlossen', ja: '全章 完' },
  chapter_complete_suffix: { zh: '　完', en: ' — Complete', de: ' — Abgeschlossen', ja: ' 完' },
  chapend_stats: {
    zh: '存活時間 {m} 分 {s} 秒．文件 {read}/{total}．難度 {diff}',
    en: 'Survived {m}m {s}s · Documents {read}/{total} · Difficulty {diff}',
    de: 'Überlebt {m}m {s}s · Dokumente {read}/{total} · Schwierigkeit {diff}',
    ja: '生存時間 {m}分{s}秒・書類 {read}/{total}・難易度 {diff}',
  },

  // === 互動提示 hint ===
  hint_talk: { zh: '按 E 與{name}交談', en: 'Press E to talk to {name}', de: 'E — mit {name} sprechen', ja: 'E で{name}と話す' },
  hint_read: { zh: '按 E 閱讀「{title}」', en: 'Press E to read “{title}”', de: 'E — „{title}“ lesen', ja: 'E で「{title}」を読む' },
  hint_pickup: { zh: '按 E 拾取 {item}', en: 'Press E to pick up {item}', de: 'E — {item} aufheben', ja: 'E で{item}を拾う' },
  hint_typewriter: { zh: '按 E 使用打字機', en: 'Press E to use the typewriter', de: 'E — Schreibmaschine benutzen', ja: 'E でタイプライターを使う' },
  hint_exit: { zh: '按 E 離開廠區', en: 'Press E to leave the plant', de: 'E — Werk verlassen', ja: 'E で工場から出る' },
  hint_exit_code: { zh: '按 E 輸入密碼', en: 'Press E to enter the code', de: 'E — Code eingeben', ja: 'E で暗証番号を入力' },
  hint_use_key: { zh: '按 E 使用「{key}」', en: 'Press E to use “{key}”', de: 'E — „{key}“ benutzen', ja: 'E で「{key}」を使う' },
  hint_locked: { zh: '上鎖了——需要「{key}」', en: 'Locked — requires “{key}”', de: 'Verschlossen — benötigt „{key}“', ja: '施錠——「{key}」が必要' },
  hint_close_door: { zh: '按 E 關門', en: 'Press E to close the door', de: 'E — Tür schließen', ja: 'E で扉を閉める' },
  hint_open_door: { zh: '按 E 開門', en: 'Press E to open the door', de: 'E — Tür öffnen', ja: 'E で扉を開ける' },

  // === 互動提示（觸控變體：手機沒有 E 鍵，指向右下「互動」鈕；標籤與 touch_interact 一致）===
  hint_talk_touch: { zh: '點「互動」與{name}交談', en: 'Tap “Use” to talk to {name}', de: '„Aktion“ — mit {name} sprechen', ja: '「調べる」で{name}と話す' },
  hint_read_touch: { zh: '點「互動」閱讀「{title}」', en: 'Tap “Use” to read “{title}”', de: '„Aktion“ — „{title}“ lesen', ja: '「調べる」で「{title}」を読む' },
  hint_pickup_touch: { zh: '點「互動」拾取 {item}', en: 'Tap “Use” to pick up {item}', de: '„Aktion“ — {item} aufheben', ja: '「調べる」で{item}を拾う' },
  hint_typewriter_touch: { zh: '點「互動」使用打字機', en: 'Tap “Use” for the typewriter', de: '„Aktion“ — Schreibmaschine benutzen', ja: '「調べる」でタイプライターを使う' },
  hint_exit_touch: { zh: '點「互動」離開廠區', en: 'Tap “Use” to leave the plant', de: '„Aktion“ — Werk verlassen', ja: '「調べる」で工場から出る' },
  hint_exit_code_touch: { zh: '點「互動」輸入密碼', en: 'Tap “Use” to enter the code', de: '„Aktion“ — Code eingeben', ja: '「調べる」で暗証番号を入力' },
  hint_use_key_touch: { zh: '點「互動」使用「{key}」', en: 'Tap “Use” to use “{key}”', de: '„Aktion“ — „{key}“ benutzen', ja: '「調べる」で「{key}」を使う' },
  hint_close_door_touch: { zh: '點「互動」關門', en: 'Tap “Use” to close the door', de: '„Aktion“ — Tür schließen', ja: '「調べる」で扉を閉める' },
  hint_open_door_touch: { zh: '點「互動」開門', en: 'Tap “Use” to open the door', de: '„Aktion“ — Tür öffnen', ja: '「調べる」で扉を開ける' },
  no_ammo_touch: { zh: '沒有子彈了——點「裝填」', en: 'Out of ammo — tap “Reload”', de: 'Keine Munition — „Laden“ tippen', ja: '弾切れ——「リロード」をタップ' },
  story_skip: { zh: '跳過劇情', en: 'Skip', de: 'Überspringen', ja: 'スキップ' },

  // === 動態飄字 hintFlash ===
  objective_default: { zh: '活下去', en: 'Survive', de: 'Überlebe', ja: '生き延びろ' },
  got_item: { zh: '取得 {item}', en: 'Got {item}', de: '{item} erhalten', ja: '{item} を入手' },
  no_ammo: { zh: '沒有子彈了——按 R 裝填', en: 'Out of ammo — press R to reload', de: 'Keine Munition — R zum Nachladen', ja: '弾切れ——R でリロード' },
  poisoned: { zh: '中毒了——找藍色草藥解毒', en: 'Poisoned — find blue herb to cure', de: 'Vergiftet — blaues Kraut heilt', ja: '毒を受けた——青ハーブで解毒' },
  paralyzed: { zh: '被電擊麻痺——行動遲緩！', en: 'Shocked and paralyzed — movement slowed!', de: 'Durch Stromschlag gelähmt — verlangsamt!', ja: '感電して麻痺——動きが鈍い！' },
  inv_full: { zh: '物品欄已滿', en: 'Inventory is full', de: 'Inventar ist voll', ja: '持ち物がいっぱい' },
  load_done: { zh: '讀取完成', en: 'Game loaded', de: 'Spielstand geladen', ja: 'ロード完了' },
  selfdestruct_start: { zh: '銷毀協定啟動——豎井閘門緊急解鎖，快跑！', en: 'Purge protocol engaged — shaft gate emergency-unlocked. Run!', de: 'Löschprotokoll aktiv — Schachttor notentriegelt. Lauf!', ja: '破棄プロトコル始動——竪坑ゲート緊急解錠、走れ！' },
  selfdestruct_final: { zh: '熱熔銷毀系統啟動——', en: 'Thermal incineration system activating—', de: 'Thermisches Vernichtungssystem startet—', ja: '熱溶解破棄システム作動——' },
  need_key: { zh: '需要「{key}」才能離開', en: '“{key}” is required to leave', de: '„{key}“ nötig, um zu gehen', ja: '出るには「{key}」が必要' },
  used_key: { zh: '使用了「{key}」', en: 'Used “{key}”', de: '„{key}“ benutzt', ja: '「{key}」を使った' },
  wrote_code: { zh: '記下了大門備援密碼：{code}', en: 'Noted the gate backup code: {code}', de: 'Backup-Code des Tors notiert: {code}', ja: 'ゲートの予備暗証番号を記録：{code}' },

  // === 密碼盤 ===
  keypad_title: { zh: '大門備援密碼', en: 'Gate Backup Code', de: 'Backup-Code des Tors', ja: 'ゲート予備暗証番号' },
  keypad_prompt: { zh: '輸入備援密碼', en: 'Enter the backup code', de: 'Backup-Code eingeben', ja: '予備暗証番号を入力' },
  keypad_wrong: { zh: '密碼錯誤——再想想「那個時刻」', en: 'Wrong code — think about “that moment” again', de: 'Falscher Code — denk an „jenen Moment“', ja: '暗証番号が違う——「あの瞬間」を思い出せ' },
  keypad_leave: { zh: '離開', en: 'Exit', de: 'Verlassen', ja: '離れる' },
  keypad_tip: { zh: '數字鍵輸入．Enter 確認．Esc 離開', en: 'Number keys to type · Enter to confirm · Esc to exit', de: 'Zifferntasten · Enter bestätigen · Esc verlassen', ja: '数字キーで入力・Enter で確定・Esc で離れる' },

  // === 倒數 ===
  countdown: { zh: '自毀 {t}', en: 'Self-destruct {t}', de: 'Selbstzerstörung {t}', ja: '自爆 {t}' },

  // === 打字機 ===
  typewriter_title: { zh: '打字機', en: 'Typewriter', de: 'Schreibmaschine', ja: 'タイプライター' },
  tw_saved: { zh: '已存檔。', en: 'Game saved.', de: 'Spiel gespeichert.', ja: 'セーブしました。' },
  tw_saved_volatile: { zh: '已存檔（此瀏覽器無法永久保存，關閉頁面將遺失）。', en: 'Saved (this browser can’t persist storage; closing the page loses it).', de: 'Gespeichert (dieser Browser speichert nicht dauerhaft; Schließen der Seite löscht es).', ja: 'セーブしました（このブラウザは永続保存できません。ページを閉じると失われます）。' },
  tw_no_save: { zh: '沒有可讀取的存檔。', en: 'No save to load.', de: 'Kein Spielstand zum Laden.', ja: '読み込めるセーブがありません。' },
  tw_found_save: { zh: '發現既有的存檔紀錄。', en: 'Existing save found.', de: 'Vorhandener Spielstand gefunden.', ja: '既存のセーブデータが見つかりました。' },
  tw_no_save_yet: { zh: '尚無存檔紀錄。', en: 'No save yet.', de: 'Noch kein Spielstand.', ja: 'まだセーブがありません。' },
  death_tip_nosave: { zh: 'Enter 重新開始', en: 'Enter to restart', de: 'Enter Neustart', ja: 'Enter でリスタート' },
  tw_tip: { zh: 'E 存檔．R 讀取．Tab 離開', en: 'E to save · R to load · Tab to exit', de: 'E speichern · R laden · Tab verlassen', ja: 'E セーブ・R ロード・Tab 離れる' },
  tw_save: { zh: '存檔', en: 'Save', de: 'Speichern', ja: 'セーブ' },
  tw_load: { zh: '讀取', en: 'Load', de: 'Laden', ja: 'ロード' },
  tw_leave: { zh: '離開', en: 'Exit', de: 'Verlassen', ja: '離れる' },

  // === 物品欄 ===
  inv_title: { zh: '物品欄', en: 'Inventory', de: 'Inventar', ja: '持ち物' },
  inv_tip: { zh: 'WASD/方向鍵 移動．E 使用．F 選取＋組合．G 丟棄．Tab 關閉', en: 'WASD/arrows to move · E use · F select+combine · G drop · Tab close', de: 'WASD/Pfeile bewegen · E benutzen · F wählen+kombinieren · G ablegen · Tab schließen', ja: 'WASD/矢印で移動・E 使用・F 選択＋調合・G 捨てる・Tab 閉じる' },
  inv_use: { zh: '使用', en: 'Use', de: 'Benutzen', ja: '使用' },
  inv_combine: { zh: '組合', en: 'Combine', de: 'Kombinieren', ja: '調合' },
  inv_drop: { zh: '丟棄', en: 'Drop', de: 'Ablegen', ja: '捨てる' },
  inv_close: { zh: '關閉', en: 'Close', de: 'Schließen', ja: '閉じる' },

  // === 地圖 ===
  map_title: { zh: '地圖', en: 'Map', de: 'Karte', ja: 'マップ' },
  map_close: { zh: 'M / Tab 關閉', en: 'M / Tab to close', de: 'M / Tab schließen', ja: 'M / Tab で閉じる' },
  map_close_touch: { zh: '關閉', en: 'Close', de: 'Schließen', ja: '閉じる' },

  // === 死亡 ===
  death_title: { zh: '你死了', en: 'You Died', de: 'Du bist gestorben', ja: 'あなたは死んだ' },
  death_tip: { zh: 'R 讀取存檔．Enter 重新開始', en: 'R to load save · Enter to restart', de: 'R Spielstand laden · Enter Neustart', ja: 'R でロード・Enter でリスタート' },
  death_load: { zh: '讀取存檔', en: 'Load Save', de: 'Laden', ja: 'ロード' },
  death_restart: { zh: '重新開始', en: 'Restart', de: 'Neustart', ja: 'リスタート' },

  // === 暫停 ===
  pause_title: { zh: '暫停', en: 'Paused', de: 'Pause', ja: 'ポーズ' },
  pause_resume: { zh: '繼續遊戲', en: 'Resume', de: 'Weiter', ja: '再開' },
  pause_tip: { zh: '點擊畫面鎖定視角．WASD 移動．Shift 奔跑．E 互動．Esc 暫停', en: 'Click to lock the view · WASD move · Shift run · E interact · Esc pause', de: 'Klicken zum Sperren · WASD bewegen · Shift rennen · E interagieren · Esc Pause', ja: '画面をクリックで視点固定・WASD 移動・Shift 走る・E 調べる・Esc ポーズ' },

  // === 說明 ===
  help_title: { zh: '操作說明', en: 'Controls', de: 'Steuerung', ja: '操作説明' },
  help_back: { zh: '返回', en: 'Back', de: 'Zurück', ja: '戻る' },
  help_body: {
    zh: 'WASD 移動．滑鼠 視角．Shift 奔跑．空白鍵 跳躍<br>左鍵 攻擊/射擊（衝鋒槍/噴火器按住連發）<br>E 互動．R 裝填．Q/數字鍵 切換武器<br>Tab 物品欄．M 地圖．Esc 暫停<br>手機：左搖桿移動（推滿奔跑）．滑動畫面轉視角．右下「跳躍」鈕<br>提示：跳躍可以越過地上的火焰與黏液',
    en: 'WASD move · Mouse look · Shift run · Space jump<br>Left click attack/fire (hold for SMG/flamethrower)<br>E interact · R reload · Q/number keys switch weapon<br>Tab inventory · M map · Esc pause<br>Mobile: left stick to move (push fully to run) · swipe to look · bottom-right “Jump” button<br>Tip: jumping clears fire and slime on the ground',
    de: 'WASD bewegen · Maus umsehen · Shift rennen · Leertaste springen<br>Linksklick Angriff/Schuss (halten für MP/Flammenwerfer)<br>E interagieren · R nachladen · Q/Zifferntasten Waffe wechseln<br>Tab Inventar · M Karte · Esc Pause<br>Mobil: linker Stick bewegen (voll drücken zum Rennen) · wischen zum Umsehen · Taste „Springen“ unten rechts<br>Tipp: Springen überwindet Feuer und Schleim am Boden',
    ja: 'WASD 移動・マウス 視点・Shift 走る・スペース ジャンプ<br>左クリック 攻撃/射撃（SMG/火炎放射は長押し連射）<br>E 調べる・R リロード・Q/数字キー 武器切替<br>Tab 持ち物・M マップ・Esc ポーズ<br>スマホ：左スティックで移動（最大でダッシュ）・スワイプで視点・右下「ジャンプ」ボタン<br>ヒント：ジャンプで地面の炎や粘液を飛び越えられる',
  },

  // === 錯誤 ===
  error_title: { zh: '無法啟動', en: 'Cannot Start', de: 'Start nicht möglich', ja: '起動できません' },
  error_body: { zh: '你的瀏覽器不支援 WebGL，無法執行本遊戲。', en: 'Your browser does not support WebGL, so this game cannot run.', de: 'Dein Browser unterstützt kein WebGL, das Spiel kann nicht laufen.', ja: 'お使いのブラウザは WebGL に対応しておらず、このゲームを実行できません。' },

  // === 觸控按鈕 ===
  touch_weapon: { zh: '武器', en: 'Weapon', de: 'Waffe', ja: '武器' },
  touch_reload: { zh: '裝填', en: 'Reload', de: 'Laden', ja: 'リロード' },
  touch_jump: { zh: '跳躍', en: 'Jump', de: 'Springen', ja: 'ジャンプ' },
  touch_interact: { zh: '互動', en: 'Use', de: 'Aktion', ja: '調べる' },
  touch_fire: { zh: '射擊', en: 'Fire', de: 'Feuer', ja: '射撃' },
  touch_inv: { zh: '物品', en: 'Items', de: 'Items', ja: '持ち物' },
  touch_map: { zh: '地圖', en: 'Map', de: 'Karte', ja: 'マップ' },

  // === 移動／閒置提示 ===
  move_hint_touch: { zh: '左下搖桿移動（推滿奔跑）．滑動畫面轉視角．右下按鈕互動/跳躍', en: 'Left stick to move (push fully to run) · swipe to look · bottom-right buttons interact/jump', de: 'Linker Stick bewegen (voll drücken zum Rennen) · wischen zum Umsehen · Tasten unten rechts Aktion/Springen', ja: '左スティックで移動（最大でダッシュ）・スワイプで視点・右下ボタンで調べる/ジャンプ' },
  move_hint_drag: { zh: '按住滑鼠拖曳調整視角．WASD 移動．Shift 奔跑．空白鍵 跳躍．E 互動．Esc 暫停', en: 'Hold and drag to look · WASD move · Shift run · Space jump · E interact · Esc pause', de: 'Halten und ziehen zum Umsehen · WASD bewegen · Shift rennen · Leertaste springen · E interagieren · Esc Pause', ja: 'ドラッグで視点・WASD 移動・Shift 走る・スペース ジャンプ・E 調べる・Esc ポーズ' },
  move_hint_click: { zh: '點擊畫面鎖定視角．WASD 移動．Shift 奔跑．空白鍵 跳躍．E 互動．Esc 暫停', en: 'Click to lock the view · WASD move · Shift run · Space jump · E interact · Esc pause', de: 'Klicken zum Sperren · WASD bewegen · Shift rennen · Leertaste springen · E interagieren · Esc Pause', ja: '画面をクリックで視点固定・WASD 移動・Shift 走る・スペース ジャンプ・E 調べる・Esc ポーズ' },
  idle_drag: { zh: '按住滑鼠拖曳調整視角．WASD 移動．E 互動', en: 'Hold and drag to look · WASD move · E interact', de: 'Halten und ziehen zum Umsehen · WASD bewegen · E interagieren', ja: 'ドラッグで視点・WASD 移動・E 調べる' },
  idle_click: { zh: '點擊畫面鎖定視角．WASD 移動．E 互動', en: 'Click to lock the view · WASD move · E interact', de: 'Klicken zum Sperren · WASD bewegen · E interagieren', ja: '画面をクリックで視点固定・WASD 移動・E 調べる' },
};
