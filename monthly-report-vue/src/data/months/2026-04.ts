import type { Project, Theme, AchievementCard } from '../types'

export const sectionLabels = [
  '§ 01 · Cover',
  '§ 02 · Executive Summary',
  '§ 03 · Project Status',
  '§ 04 · Risks & Problems',
  '§ 05 · Technical Details',
  '§ 06 · Vibe Coding',
]

export const author = {
  name: 'JASON.JY.LIN',
  department: '軟體測試課',
  date: '04/30/2026',
}

export const report = {
  month: '2026.04',
  monthHeadline: '2026-04',
}

export const projects: Project[] = [
  {
    id: 'project-a',
    name: 'W3A SITR Data Normalization',
    nameKP: 'W3A SITR\nData Normalization',
    goal: '資料正規化，減少人工填寫成本',
    progress: 100,
    collaborator: 'Daisy',
    problem: null,
    eta: '2026-06-30',
  },
  {
    id: 'project-b',
    name: 'Efficacy Test Automation',
    nameKP: 'Efficacy Test\nAutomation',
    goal: '軟體效能測試自動化，降低人力成本',
    progress: 80,
    collaborator: null,
    problem: null,
    eta: '2026-12-31',
  },
  {
    id: 'project-c',
    name: 'AI Technical Learning',
    nameKP: 'AI Technical\nLearning',
    goal: '研究 Claude Code / Gemini CLI 應用場景',
    progress: 100,
    collaborator: null,
    problem: null,
    eta: '2026-04-30',
  },
]

export const keyProgress: Record<string, { completed: string; inProgress: string; blockers: string }> = {
  'project-a': {
    completed: 'W3A SITR 流程分析\nRational QM 系統研究',
    inProgress: 'FR Issue 自動綁定 SITR 主單',
    blockers: 'Test Case 自動綁定\n驗證結果自動回填',
  },
  'project-b': {
    completed: 'V1.13.0 效能測試報告',
    inProgress: 'Efficacy 測試案例維護',
    blockers: '程式架構優化',
  },
  'project-c': {
    completed: 'Claude Code 研究\nGemini CLI 研究',
    inProgress: '工作流程 AI 輔助應用',
    blockers: '週報自動產出\nVOC 分析自動化',
  },
}

export const risks = {
  decision: { q1: '—', q2: '—' },
  resource:  { q1: '—', q2: '—' },
}

export const whatHappened: AchievementCard = {
  image: '/reference/shared/what-happened.png',
  title: '',
  body: '',
}

export const whyItMatters: AchievementCard = {
  image: '/reference/shared/why-it-matters.png',
  title: '',
  body: '',
}

export const themes: Theme[] = [
  {
    id: 'sitr',
    label: 'W3A SITR',
    before: { image: '/reference/2026-04/W3A_SITR_Before.png', title: '', body: '' },
    after:  { image: '/reference/2026-04/W3A_SITR_After.png',  title: '', body: '' },
  },
  {
    id: 'efficacy',
    label: 'Efficacy Test',
    before: { image: '/reference/2026-04/1.11.1_Efficacy_Test.png', title: '', body: '' },
    after:  { image: '/reference/2026-04/1.13.0_Efficacy_Test.png', title: '', body: '' },
  },
]
