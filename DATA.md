# Data: Monthly Report

資料層文件：report.json schema、TypeScript 型別、資料流。

## 唯一資料來源

`src/data/report.json` 是所有內容的唯一來源，所有顯示內容皆在此編輯。  
`src/types/report.ts` 定義對應的 TypeScript 型別。

## 資料結構（report.json）

```
ReportData
├── meta: { year, month, author, department }
└── projects: Project[]
    └── Project
        ├── id, name, description, impact
        └── executiveSummary: {
              headline1: string           # 大標第一行（純白）
              headline2: string           # 大標第二行（漸層）
              headline3: string           # 摘要段落（支援數字 highlight）
              chips: { value, desc }[]    # 統計卡片
              progress: string[]          # 詳細要點清單
            }
```

## 資料流

```
report.json
  └─ App.vue 讀入 → reportData (ReportData)
       ├─ reportData.meta      → HeroSection, topbar monthName
       └─ reportData.projects  → 依 activeProjectId 篩出 currentProject
            ├─ project.*              → HeroSection
            └─ project.executiveSummary → ExecutiveSummary
```

## 新增 / 修改資料欄位流程

1. 修改 `src/data/report.json`
2. 若新增欄位，同步更新 `src/types/report.ts` 的型別
3. 若 schema 有變動，更新本文件（DATA.md）的資料結構章節
