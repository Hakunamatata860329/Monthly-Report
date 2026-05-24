Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Pre-Response Checklist

Before every response, explicitly run through these checks:

1. **Assumptions** — List any assumptions I'm making. If any are uncertain, stop and ask instead of guessing.
2. **Scope** — Is everything I'm about to produce explicitly requested? If not, name the extras and ask whether they're wanted.
3. **Clarity** — Is there anything in the request I don't fully understand? If yes, name it and ask — don't invent an interpretation.

If any check flags an issue, surface it to the user before proceeding.

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 架構同步機制（Arch-Sync Hooks）

本專案設有自動提醒機制，確保架構變更時 CLAUDE.md 能同步更新。

### 觸發條件

以下檔案被 Edit / Write 修改時，hook 會自動提醒應更新的 CLAUDE.md 章節：

| 檔案 | 需更新的 CLAUDE.md 章節 |
|------|------------------------|
| `src/types/report.ts` | 資料結構、元件 Props 表格 |
| `src/App.vue` | App.vue 核心邏輯、五個章節對照表、Design System |
| `src/components/*.vue` | 元件 Props 表格、五個章節對照表 |

> `src/data/report.json` 是內容資料，**不觸發**架構同步（只有 schema 改變才算架構變更）。

### Hook 檔案位置

```
.claude/
├── settings.json                    # Hook 設定（PostToolUse + Stop）
└── hooks/
    ├── check-arch-sync.js           # PostToolUse：偵測架構檔修改，即時提醒
    └── stop-arch-sync.js            # Stop：對話結束前確認同步狀態
```

### 執行規則

當你收到 `[arch-sync]` 提醒時：
1. **完成當前所有程式碼變更**後再更新 CLAUDE.md（避免來回修改）
2. 只更新被標示的章節，不動其他部分
3. 更新完成後，`.arch-dirty` flag 會在下次 Stop 時自動清除

---

## Project: Monthly Report

月報網站，用 Vue 3 + Vite + TypeScript 建置，以 Apple 官網風格為設計基準。

### Tech Stack

- **框架**：Vue 3 (Composition API `<script setup>`)
- **建構**：Vite
- **語言**：TypeScript
- **圖表**：Apache ECharts via `vue-echarts`
- **字型**：`-apple-system` SF Pro 系統字型（無外部字型依賴）
- **Dev server port**：5174（`npm run dev -- --port 5174`）

### 目錄結構

```
monthly-report/
├── src/
│   ├── App.vue              # 根元件：側邊欄 + 主內容 + 專案切換邏輯
│   ├── data/
│   │   └── report.json      # 唯一資料來源，所有內容皆在此編輯
│   ├── types/
│   │   └── report.ts        # TypeScript 型別定義
│   └── components/
│       ├── SvgIcon.vue       # Lucide icon 包裝元件
│       ├── ExecutiveSummary.vue
│       ├── KPIOverview.vue
│       ├── TrendAnalysis.vue
│       ├── KeyInitiatives.vue
│       ├── GanttChart.vue
│       └── ActionPlan.vue
└── public/
    └── icons.svg            # SVG sprite（Lucide icons）
```

### 資料結構（report.json）

```
ReportData
├── meta: { year, month, author, department }
└── projects: Project[]
    └── Project
        ├── id, name, description, impact
        ├── executiveSummary: { progress: string[], problems: string[] }
        ├── kpis: Kpi[]                  # KPI 指標（含 before/after/target/achievementRate）
        ├── tasks: Task[]                # 甘特圖任務（含 startDate/endDate/status）
        └── actionPlan: ActionItem[]     # SMART 格式行動計畫
```

- **所有欄位都是 per-project**：executiveSummary 和 actionPlan 已從全域移入每個 project
- `Kpi.category`：`'timeEfficiency' | 'softwareQuality'`
- `Task.status`：`'plan' | 'in-progress' | 'done'`
- `ActionItem.priority`：`'high' | 'medium' | 'low'`

### 元件 Props

| 元件 | Props |
|------|-------|
| `ExecutiveSummary` | `data: { progress: string[], problems: string[] }` |
| `KPIOverview` | `project: Project` |
| `TrendAnalysis` | `project: Project` |
| `KeyInitiatives` | `project: Project` |
| `ActionPlan` | `items: ActionItem[]` |
| `GanttChart` | `tasks: Task[]` |

### App.vue 核心邏輯

- `activeProjectId`：ref，追蹤目前選取的專案（預設第一個）
- `currentProject`：computed，從 projects 陣列找出對應 project
- `switchProject(id)`：切換專案時重設 scroll 位置、重播 reveal 動畫
- `activeSection`：IntersectionObserver 自動追蹤目前可見章節
- 側邊欄上半：**專案切換器**（3 個 `.proj-item` 按鈕）
- 側邊欄下半：**章節導覽**（5 個 `.nav-item` 連結，scrollIntoView）

### 五個章節（每個專案共用）

| # | id | 元件 | 說明 |
|---|-----|------|------|
| 01 | `summary` | ExecutiveSummary | 本月進度 / 問題清單 |
| 02 | `kpi` | KPIOverview | KPI 卡片（含達成率進度條） |
| 03 | `trend` | TrendAnalysis | 改善前後長條圖 + 達成率圓餅圖 |
| 04 | `initiatives` | KeyInitiatives | Impact 卡片 + 甘特圖 + 任務狀態圓餅 |
| 05 | `plan` | ActionPlan | SMART 格式行動計畫卡片 |

### Design System（CSS Variables）

定義於 `App.vue <style>` 的 `:root`：

| 變數 | 值 | 用途 |
|------|----|------|
| `--bg` | `#ffffff` | 卡片背景 |
| `--bg-section` | `#f5f5f7` | 頁面底色 |
| `--text-primary` | `#1d1d1f` | 主要文字 |
| `--text-secondary` | `#6e6e73` | 次要文字 |
| `--text-muted` | `#86868b` | 輔助文字 |
| `--accent` | `#0071e3` | 蘋果藍（UI 互動元素專用） |
| `--green` | `#34c759` | 達標 / Done |
| `--yellow` | `#ff9f0a` | 接近達標 / 進行中警示 |
| `--red` | `#ff3b30` | 未達標 |
| `--blue` | `#0071e3` | In-Progress 狀態 |
| `--border` | `#e5e5ea` | 邊框 |
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.07)...` | 卡片陰影 |
| `--radius-card` | `16px` | 標準圓角 |
| `--font-sans` | `-apple-system, BlinkMacSystemFont...` | 主字型 |
| `--font-mono` | `ui-monospace, SF Mono...` | 等寬字型 |

### 顏色規則定義

> **這是唯一的顏色規則來源。** 所有元件的 `rateClass()` 函式與 STATUS_COLORS 均以此為準。

#### KPI 達成率（`achievementRate`）

| 條件 | 顏色變數 | 色碼 | 說明 |
|------|----------|------|------|
| `≥ 100%` | `--green` | `#34c759` | 達標 |
| `51% ~ 99%` | `--yellow` | `#ff9f0a` | 接近達標 |
| `0% ~ 50%` | `--red` | `#ff3b30` | 未達標 |

```ts
// rateClass 標準實作
function rateClass(rate: number) {
  if (rate >= 100) return 'rate-good'   // --green
  if (rate >= 51)  return 'rate-warn'   // --yellow
  return 'rate-bad'                      // --red
}
```

#### 任務狀態（`Task.status`）

| 狀態 | 顏色變數 | 色碼 | 說明 |
|------|----------|------|------|
| `done` | `--green` | `#34c759` | 完成 |
| `in-progress` | `--blue` | `#0071e3` | 進行中 |
| `plan` | `--gray`（`#d1d1d6`） | `#d1d1d6` | 計畫中 |

```ts
// STATUS_COLORS 標準實作
const STATUS_COLORS = {
  done:          '#34c759',  // --green
  'in-progress': '#0071e3',  // --blue
  plan:          '#d1d1d6',  // gray
}
```

> `--accent`（`#0071e3`）**僅用於 UI 元素**（側邊欄 active、badge、eyebrow 文字），不用於資料狀態顏色。