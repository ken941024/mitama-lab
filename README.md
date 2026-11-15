# 御魂研習所 · 亞洲版陰陽師

公開網站：https://ken941024.github.io/mitama-lab/

以式神使用教學為核心的繁體中文圖鑑。278 筆式神分別編寫用途、主屬性、御魂選擇、操作、隊友分工與常見誤用，沒有按輸出／控制等定位自動套用攻略。N 卡清楚區分收藏、素材與限制挑戰用途，不硬推專用套裝。傷害、命中抵抗、配速計算頁面已移除。

## 編輯與發佈

需要 Node.js 22 以上。執行 `npm ci`、`npm test`、`npm run build`，把原始檔與產生的 `docs/` 一起提交；GitHub Pages 使用 main 的 docs 目錄。

- `content/hero-guides.tsv`：每行一隻式神，以 `|` 分成七欄：ID、用途、御魂名稱（逗號分隔）、2／4／6 主屬性、操作、隊友分工、誤用提醒。御魂可以寫「散件」或「不指定」。修改後由 `scripts/build-guides.mjs` 編譯，會檢查缺漏、重複 ID 與未知御魂。
- `content/soul-decisions.tsv`：按式神 ID 逐套記錄選用理由，欄位順序須與教學的御魂選項一致。非 N 卡均有對應的逐套理由。
- `dist/hero-guides.js`：編譯後的逐式神教學；不直接編輯。
- `dist/skill-reference.json`：278 隻、803 筆國服官方技能參考，保留擷取日期、未覺醒／覺醒來源網址、說明與升級條件。這是技能依據，不是官方最優配裝推薦。
- `dist/hero-details.json`：既有逐式神社群／官方參考屬性與技能索引。
- `dist/asia-evidence.js`：亞洲實裝證據；與攻略是否已編寫分開判斷。
- `dist/`：原始前端；`docs/`：可直接以 HTTP 靜態伺服器開啟的 Pages 成品。

預覽例子：`python -m http.server 4173 --directory docs`。不能直接雙擊 HTML 開啟，因模組與資料需 HTTP 載入。

## 資料界線

教學是依逐隻技能編寫的使用建議，不宣稱跨副本、跨版本的唯一最優解。國服官方參考接口不等於亞洲版現行技能；技能原文在頁面另區標示。未核對亞洲實裝者仍留在參考區，不能因有教學就推定已實裝。未連接遊戲帳號，沒有實戰自動驗證或御魂庫最佳化。

技能來源：`g37simulator.webapp.163.com/get_hero_skill`；亞洲證據：繁中官網與官方亞洲商店；社群索引與圖片：Guidemyoji。圖片、遊戲名稱及角色素材屬原權利人。外部圖片失效顯示替代圖。OpenCC 授權見 `dist/opencc-LICENSE.txt`。
