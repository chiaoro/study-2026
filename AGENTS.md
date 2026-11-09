# 六年級複習站

## 專案用途

孩子的複習入口。`index.html` 選擇複習階段；`midterm.html` 六上期中、`final.html` 六上期末，各自依科目列出複習網站與練習步驟，可打勾記錄進度（存在瀏覽器，期中 key `hub-done-r2`、期末 `final-done-r1`）。另有 `vocab35.html` 英文期中單字 1–35 練習。

## 執行方式

- 入口：`index.html`（階段選擇），直接用瀏覽器開啟。新增階段時複製 `final.html` 改資料，並在 `index.html` 加一張卡。
- 線上版：GitHub Pages https://chiaoro.github.io/study-2026/ ，push 到 `main` 後自動更新。

## 注意

- 這個 repo 是 **public**（GitHub Pages 需要），所有檔案都會公開，不要放測驗券照片、課本內容、孩子個資或任何密碼。

## 工作規則

- 所有說明與 commit 訊息一律使用繁體中文（台灣用語）。
- 開始工作前先 git pull；每完成一項功能或修正，就用繁體中文寫 commit 說明並 push 到 GitHub。
- 不要把密碼、Token 寫死在程式裡；需要時放在 `.env`（已被 `.gitignore` 排除）。
