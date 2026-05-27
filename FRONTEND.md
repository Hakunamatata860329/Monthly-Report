# Frontend: Monthly Report

月報網站前端，Vue 3 + Vite + TypeScript，以 Apple 官網風格為設計基準。

## Tech Stack

- **框架**：Vue 3 (Composition API `<script setup>`)
- **建構**：Vite
- **語言**：TypeScript
- **字型**：`-apple-system` SF Pro 系統字型（無外部字型依賴）
- **Dev server port**：5174（`npm run dev -- --port 5174`）

## 目錄結構

```
monthly-report/
├── src/
│   ├── App.vue              # 根元件：topbar + flyout + 主內容
│   ├── data/
│   │   └── report.json      # 唯一資料來源
│   ├── types/
│   │   └── report.ts        # TypeScript 型別定義
│   └── components/
│       ├── HeroSection.vue   # 全寬 Hero 區塊（專案標題 + meta）
│       └── ExecutiveSummary.vue
└── public/
    └── favicon.svg
```

## 元件 Props

| 元件 | Props |
|------|-------|
| `HeroSection` | `meta: ReportData['meta']`, `project: Project`, `projectIndex: number`, `totalProjects: number` |
| `ExecutiveSummary` | `data: { headline1: string, headline2: string, headline3: string, chips: { value: string; desc: string }[], progress: string[] }` |

## App.vue 核心邏輯

- `activeProjectId`：ref，追蹤目前選取的專案（預設第一個）
- `currentProject`：computed，從 projects 陣列找出對應 project
- `flyoutOpen`：ref，控制月份 flyout 開關
- `monthName`：computed，將 `meta.month` 轉為英文縮寫（`Jan`～`Dec`）
- `switchProject(id)`：切換專案時重設 scroll 位置、重播 reveal 動畫
- `selectProject(id)`：關閉 flyout 後呼叫 `switchProject`
- **頂部導覽列（`.topbar`）**：sticky，高度 52px，深色背景；左側 `MONTHLY REPORT`，右側為月份按鈕（`.month-btn`）
- **月份 flyout**：點擊月份按鈕後向下展開（`<Transition name="flyout">`），全寬深色面板列出所有專案；點擊專案切換並收合；點擊面板外或按 `Escape` 亦收合
- 版面：`.app` 為 `flex-direction: column`

## 目前頁面區塊

| # | 元件 | 說明 |
|---|------|------|
| 01 | `ExecutiveSummary`（`#summary`） | 大標 + 統計卡片 + 要點清單 |

## Section 版面規則

- 每個 `<section>` 是 `.main-content` 的**直接子元素**，各自獨立（無共用包裝層）
- 預設 `padding: 72px 56px`，最後一個 section `padding-bottom: 128px`
- 各 section 可獨立設背景色，目前：`#summary { background: #1d1d1f }`（深黑）
- section 背景延伸至 main 全寬

## Design System（CSS Variables）

定義於 `App.vue <style>` 的 `:root`：

| 變數 | 值 | 用途 |
|------|----|------|
| `--bg-card` | `#ffffff` | 卡片背景 |
| `--bg-section` | `#f5f5f7` | 頁面底色 |
| `--border` | `#e5e5ea` | 邊框 |
| `--text-primary` | `#1d1d1f` | 主要文字 |
| `--text-secondary` | `#6e6e73` | 次要文字 |
| `--text-muted` | `#86868b` | 輔助文字 |
| `--font-sans` | `-apple-system, BlinkMacSystemFont...` | 主字型 |
| `--font-mono` | `ui-monospace, SF Mono...` | 等寬字型 |
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.07)...` | 卡片陰影 |
| `--shadow-hover` | `0 8px 28px rgba(0,0,0,0.12)...` | 卡片 hover 陰影 |
| `--radius-card` | `16px` | 標準圓角 |
| `--ease-spring` | `cubic-bezier(0.25, 1, 0.5, 1)` | 彈性緩動函式 |
| `--topbar-bg` | `rgba(17,17,17,0.92)` | 頂部導覽列背景 |
| `--topbar-text` | `rgba(255,255,255,0.85)` | 頂部導覽列文字 |
| `--topbar-text-muted` | `rgba(255,255,255,0.42)` | 頂部導覽列輔助文字 |
| `--topbar-active-bg` | `rgba(255,255,255,0.10)` | 專案按鈕 active 背景 |
| `--topbar-border` | `rgba(255,255,255,0.08)` | 頂部導覽列底線 |

## 顏色規則定義

> **這是唯一的顏色規則來源。** 新增元件時，狀態顏色請依此對照表選用 CSS variable。

| 語意 | 變數 | 色碼 |
|------|------|------|
| 達標 / Done | `--green` | `#34c759` |
| 接近達標 / 警示 | `--yellow` | `#ff9f0a` |
| 未達標 / 錯誤 | `--red` | `#ff3b30` |
| 進行中 | `--blue` | `#0071e3` |

> `--accent`（`#0071e3`）**僅用於 UI 元素**（topbar active、badge、eyebrow 文字），不用於資料狀態顏色。
