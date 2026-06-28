window.AI_LEARNING_HUB = {
  nav: [
    { id: "overview", label: "總覽", shortcut: "01" },
    { id: "map", label: "知識地圖", shortcut: "02" },
    { id: "roadmap", label: "學習路線", shortcut: "03" },
    { id: "skills", label: "技能資料庫", shortcut: "04" },
    { id: "projects", label: "實作作品", shortcut: "05" },
    { id: "workflow", label: "學習流程", shortcut: "06" },
    { id: "maintain", label: "維護規則", shortcut: "07" },
    { id: "editor", label: "我的內容", shortcut: "08" }
  ],
  modules: [
    {
      id: "industry",
      title: "AI 產業鏈與底層資料",
      summary: "理解 AI 從能源、晶片、基礎設施、模型到應用的完整堆疊，並掌握 Token、Embedding、向量空間等底層概念。",
      keyIdeas: ["五層產業鏈", "Token 與 Tokenizer", "Embedding 與向量距離", "訓練、推理、微調", "GPU、CUDA、資料中心"],
      why: "這是所有 AI 學習的地基，能讓你判斷技術、成本與產品可行性。"
    },
    {
      id: "agent",
      title: "Agent 智能體架構",
      summary: "分清 Workflow 與 Agent，理解 ReAct、Function Calling、MCP 與多 Agent 協作。",
      keyIdeas: ["Workflow vs Agent", "ReAct", "Function Calling", "MCP", "Agent Card / A2A"],
      why: "這讓 AI 從單純回答變成能使用工具、修正錯誤、完成任務。"
    },
    {
      id: "rag",
      title: "RAG、GraphRAG 與記憶",
      summary: "理解知識庫如何從文件解析、分塊、向量化到檢索，也比較不同 Agent 記憶框架。",
      keyIdeas: ["Chunking", "Vector DB", "Query rewrite", "GraphRAG", "Letta / Rememory / Memary"],
      why: "這能降低 AI 胡說，讓模型能引用你的資料與長期記憶。"
    },
    {
      id: "skills",
      title: "Agent Skills 與漸進式加載",
      summary: "理解技能如何透過目錄、SKILL.md、腳本與參考資料分層載入，降低上下文壓力。",
      keyIdeas: ["Progressive disclosure", "SKILL.md", "Scripts", "References", "Skills vs RAG"],
      why: "這是把知識、工具、流程封裝成可重複能力的方法。"
    },
    {
      id: "pm",
      title: "AI PM 產品能力",
      summary: "把模型能力、資料策略、產品價值、效果評估與風險容錯連起來。",
      keyIdeas: ["數據飛輪", "Bad case", "Evals", "降級容錯", "人機協同"],
      why: "這讓你不只懂 AI，而是能設計可落地、可評估、可改善的 AI 產品。"
    }
  ],
  phases: [
    {
      id: "week-1",
      label: "Week 1-2",
      title: "建立 AI 全景",
      module: "industry",
      goal: "先理解 AI 產業鏈、模型生命週期、Token 與 Embedding，讓後續學習有地圖。",
      outputs: ["AI 產業鏈一頁圖", "Token / Embedding 解釋卡", "20 個核心名詞表"],
      tasks: ["畫出能源、晶片、Infra、模型、應用五層", "用例子解釋 Token 與 Embedding", "整理訓練、推理、微調的差異"]
    },
    {
      id: "week-3",
      label: "Week 3-4",
      title: "掌握 Agent 架構",
      module: "agent",
      goal: "能判斷何時用 Workflow、何時用 Agent，並能畫出 ReAct 與工具調用流程。",
      outputs: ["Workflow vs Agent 對照表", "ReAct 流程圖", "Function Calling schema 範例"],
      tasks: ["列出 10 個任務並判斷適合 Workflow 或 Agent", "畫出 Thought -> Action -> Observation", "設計 3 個工具 schema"]
    },
    {
      id: "week-5",
      label: "Week 5-6",
      title: "建立知識庫與記憶觀念",
      module: "rag",
      goal: "理解 RAG、Query 改寫、GraphRAG 與記憶框架，知道 AI 如何使用外部知識。",
      outputs: ["RAG SOP", "知識圖譜範例", "記憶框架比較表"],
      tasks: ["拆解離線構建與線上檢索", "把模糊問題改寫成可檢索問題", "比較 text-to-memory、Letta、Rememory、Memary"]
    },
    {
      id: "week-7",
      label: "Week 7",
      title: "封裝 Agent Skills",
      module: "skills",
      goal: "理解漸進式加載，設計自己的 Skill，把知識與流程封裝成可重複能力。",
      outputs: ["SKILL.md 草案", "資料夾索引規則", "腳本與參考資料清單"],
      tasks: ["比較 MCP 與 Agent Skills 的上下文成本", "寫一份 Skill 使用說明", "規劃觸發條件、參考資料與腳本"]
    },
    {
      id: "week-8",
      label: "Week 8-10",
      title: "轉成 AI PM 實戰能力",
      module: "pm",
      goal: "把技術理解轉成產品判斷，能設計資料飛輪、評估指標、容錯方案與人機協同。",
      outputs: ["AI PRD 模板", "評估指標表", "Bad case 回饋流程"],
      tasks: ["寫一份 AI 產品 PRD", "建立 30 題測試集", "設計模型錯誤時的降級方案"]
    }
  ],
  skills: [
    { id: "industry-map", module: "industry", level: "基礎", name: "AI 產業鏈拆解", status: "todo", output: "五層產業鏈地圖", practice: "用 1 頁圖說明應用、模型、Infra、晶片、能源如何互相依賴。" },
    { id: "token-embedding", module: "industry", level: "基礎", name: "Token 與 Embedding", status: "todo", output: "概念解釋卡", practice: "用中文句子示範切 token，並用貓狗例子解釋向量距離。" },
    { id: "model-lifecycle", module: "industry", level: "基礎", name: "訓練、推理、微調", status: "todo", output: "模型生命週期圖", practice: "寫出通用模型如何變成領域專家的流程。" },
    { id: "workflow-agent", module: "agent", level: "核心", name: "Workflow vs Agent", status: "todo", output: "判斷矩陣", practice: "列出任務的不確定性、工具需求、錯誤修正需求，判斷該用哪種架構。" },
    { id: "react", module: "agent", level: "核心", name: "ReAct 決策框架", status: "todo", output: "ReAct 流程圖", practice: "模擬一個研究任務，逐步寫出 Thought、Action、Observation。" },
    { id: "function-calling", module: "agent", level: "核心", name: "Function Calling", status: "todo", output: "工具 schema", practice: "設計查詢、更新、計算三個工具的 JSON schema。" },
    { id: "mcp", module: "agent", level: "進階", name: "MCP", status: "todo", output: "Client / Server 互動圖", practice: "畫出初始化、工具註冊、工具調用的三階段。" },
    { id: "rag-pipeline", module: "rag", level: "核心", name: "RAG 完整流程", status: "todo", output: "RAG SOP", practice: "用 5 篇文章設計文檔解析、分塊、向量化、檢索、生成流程。" },
    { id: "query-rewrite", module: "rag", level: "核心", name: "Query 改寫", status: "todo", output: "改寫範例集", practice: "把 20 個模糊問題改寫成可檢索問題。" },
    { id: "graphrag", module: "rag", level: "進階", name: "GraphRAG", status: "todo", output: "知識圖譜範例", practice: "把一個多跳推理問題拆成實體、關聯、三元組。" },
    { id: "memory", module: "rag", level: "進階", name: "Agent 記憶框架", status: "todo", output: "框架比較表", practice: "比較 Letta、Rememory、Memary 的記憶型態、召回方式與防呆機制。" },
    { id: "agent-skills", module: "skills", level: "核心", name: "Agent Skills 設計", status: "todo", output: "SKILL.md 草案", practice: "寫一個自己的 AI 學習 Skill：何時使用、讀什麼、跑什麼腳本。" },
    { id: "skills-vs-rag", module: "skills", level: "進階", name: "Agent Skills vs RAG", status: "todo", output: "適用場景表", practice: "比較文件庫、Excel、PDF、流程 SOP 該用 RAG 還是 Skill。" },
    { id: "ai-pm-role", module: "pm", level: "核心", name: "AI PM 職能", status: "todo", output: "AI PM 能力地圖", practice: "寫出 AI PM 與傳統 PM 在資料、模型、評估上的差異。" },
    { id: "data-flywheel", module: "pm", level: "核心", name: "數據飛輪", status: "todo", output: "反饋閉環圖", practice: "設計輸入、應用、Bad case、回饋、優化的閉環。" },
    { id: "evals", module: "pm", level: "核心", name: "AI 評估與容錯", status: "todo", output: "測試集與評分表", practice: "建立 30 題測試集與模型出錯時的降級策略。" }
  ],
  projects: [
    { id: "project-map", title: "AI 產業鏈互動圖", module: "industry", difficulty: "入門", goal: "把五層產業鏈畫成可解釋的圖，並補上每層代表公司、成本與風險。" },
    { id: "project-agent", title: "Agent 任務設計書", module: "agent", difficulty: "核心", goal: "選一個真實任務，設計目標、工具、ReAct 迴圈、錯誤修正與完成條件。" },
    { id: "project-rag", title: "小型 RAG 知識庫規格", module: "rag", difficulty: "核心", goal: "用一批文件設計分塊策略、metadata、檢索流程與測試題。" },
    { id: "project-skill", title: "個人 AI Skill", module: "skills", difficulty: "進階", goal: "寫一份 SKILL.md，定義觸發條件、流程、參考資料與可執行腳本。" },
    { id: "project-prd", title: "AI PM PRD", module: "pm", difficulty: "核心", goal: "寫一份 AI 產品需求文件，包含資料策略、評估指標、容錯機制與人機協同。" }
  ],
  workflow: [
    { title: "1. 先定義概念邊界", detail: "每個主題先回答：它解決什麼、不解決什麼、跟相鄰概念差在哪裡。" },
    { title: "2. 追到底層資料流", detail: "看輸入如何被轉換、模型如何決策、工具如何被呼叫、結果如何被檢查。" },
    { title: "3. 做一個可展示輸出", detail: "每個主題都要產出圖、表、SOP、schema、PRD 或測試題。" },
    { title: "4. 建立測試問題", detail: "用定義題、比較題、應用題、風險題確認自己不是只看懂。" },
    { title: "5. 每週沉澱成資產", detail: "把筆記整理進 modules、skills、projects 或 inbox，避免再次散掉。" }
  ],
  doneCriteria: [
    { title: "能解釋", note: "不用照稿也能說清楚概念、流程與適用邊界。" },
    { title: "能畫圖", note: "能畫出產業鏈、資料流、工具調用、RAG 或 AI PM 閉環。" },
    { title: "能實作", note: "能做出最小可用的 schema、SOP、測試集或 PRD。" },
    { title: "能評估", note: "能說出品質指標、失敗模式、成本與風險。" }
  ],
  inbox: [
    "NVIDIA / CUDA 生態案例",
    "Tokenizer 中文切詞範例",
    "Function Calling schema 範例",
    "MCP client / server 實作資料",
    "RAG 分塊與 Query rewrite 案例",
    "GraphRAG 多跳推理案例",
    "Letta、Rememory、Memary 文件",
    "AI PM PRD 與 Evals 案例"
  ],
  maintenance: [
    { title: "新知識先進 Inbox", note: "還沒分類、沒有來源、沒有輸出物的內容先放 inbox，不直接塞進正式資料庫。" },
    { title: "每週只整理一個主軸", note: "例如本週只整理 Agent，下週只整理 RAG，避免網站再次變成大雜燴。" },
    { title: "每個技能要有輸出物", note: "如果沒有圖、表、SOP、測試題或作品，就不算真的整理完成。" },
    { title: "不確定的名詞標待查", note: "例如 ATA / A2A 類協議，先標記待查，之後用官方文件或原始資料確認。" },
    { title: "每月重新檢查路線", note: "AI 變化很快，每月檢查哪些內容過時、哪些技能要新增、哪些主軸要合併。" }
  ]
};
