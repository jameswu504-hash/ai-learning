# AI Skill Learning Hub

這是一個正式化的 AI 學習網站，用來把 AI 產業鏈、Agent、RAG、Agent Skills 與 AI PM 系統化成可執行的學習路線。

## 打開網站

```text
outputs/ai-skill-learning-hub/index.html
```

## 網站包含什麼

- 總覽儀表板：目前進度、本週任務、五大主軸
- 知識地圖：AI 產業鏈、Agent、RAG、Agent Skills、AI PM
- 十週學習路線：每階段有目標、任務與輸出物
- 技能資料庫：可搜尋、可篩選、可勾選進度
- 實作作品：用作品確認是否真的學會
- 學習流程：每次學新 AI 主題時的固定方法
- 維護規則：避免知識再次變亂

## 維護方式

主要內容都在：

```text
outputs/ai-skill-learning-hub/data.js
```

優先維護這幾塊：

- `modules`: 五大知識主軸
- `phases`: 十週學習路線
- `skills`: AI 技能資料庫
- `projects`: 實作作品與輸出物
- `workflow`: 固定學習流程
- `inbox`: 待整理的新知識
- `maintenance`: 長期維護規則

進度勾選會存在瀏覽器 localStorage，不會改動檔案本身。

## 每週維護節奏

1. 把新看到的 AI 內容先放進 `inbox`。
2. 每週只整理一個主軸，例如 Agent 或 RAG。
3. 新增技能時一定要補上 `practice` 和 `output`。
4. 學習階段只放真正要執行的任務。
5. 每月底檢查一次過時內容與新興工具。
