# Deployment Guide

這個網站是純靜態網站，檔案包含：

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `404.html`
- `.nojekyll`

## 建議正式上線方式

第一版建議使用 GitHub Pages。

### GitHub Pages

1. 建立 GitHub repository，例如 `ai-skill-learning-hub`。
2. 把本資料夾內所有檔案放到 repo 根目錄。
3. 到 repository 的 Settings -> Pages。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，folder 選 `/root`。
6. 發布完成後會得到公開網址。

## 之後如何更新

1. 修改 `data.js`。
2. 本機打開 `index.html` 檢查。
3. 確認沒問題後 commit。
4. push 到 GitHub。
5. GitHub Pages 自動更新。

## 正式網站檢查

上線前確認：

- 首頁 10 秒內看得懂用途。
- 手機版文字不重疊。
- 搜尋與篩選能正常使用。
- 不要放私人資料、API key、內部文件。
- `title`、`description`、`404.html` 都存在。
- 內容有清楚分類與維護規則。
