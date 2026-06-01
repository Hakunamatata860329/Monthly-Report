import type { Project, Theme, AchievementCard } from '../types'

export const sectionLabels = [
  '§ 01 · Cover',
  '§ 02 · Executive Summary',
  '§ 03 · Technical Details',
  '§ 04 · Config-Driven',
  '§ 05 · Grafana',
]

export const author = {
  name: 'JASON.JY.LIN',
  department: '軟體測試課',
  date: '06/02/2026',
}

export const report = {
  month: '2026.05',
  monthHeadline: 'Efficacy Test',
}

export const projects: Project[] = [
  {
    id: 'project-a',
    name: 'W3A Issue/Requirement Management',
    nameKP: 'W3A Issue /\nRequirement Management',
    goal: '跨團隊需求交集與市場價值分析',
    progress: 100,
    collaborator: 'Triage Team',
    problem: null,
    eta: '2026-06-30',
  },
  {
    id: 'project-b',
    name: 'SITR Workflow Optimization',
    nameKP: 'SITR Workflow\nOptimization',
    goal: '減少人工填寫成本，落實資料數位化',
    progress: 50,
    collaborator: 'Daisy',
    problem: 'Blocked',
    eta: '2026-07-31',
  },
  {
    id: 'project-c',
    name: 'Workflow Optimization with AI',
    nameKP: 'Workflow Optimization\nwith AI',
    goal: '應用 AI 優化日常工作流程',
    progress: 100,
    collaborator: null,
    problem: null,
    eta: '2026-09-30',
  },
]

export const keyProgress: Record<string, { completed: string; inProgress: string; blockers: string }> = {
  'project-a': {
    completed: '需求交集分析\n(StepC vs Function Requirement)',
    inProgress: '重新分配、規劃項目優先權',
    blockers: 'DGC、IMS、MOK\n整合需求交集',
  },
  'project-b': {
    completed: '進度追蹤機制建立\n數據圖表化',
    inProgress: 'QM 上傳格式、機制研究',
    blockers: 'SITR 流程討論\n測試結果自動回填',
  },
  'project-c': {
    completed: 'Issue/Requirement\nData Analysis Skill',
    inProgress: '周進度報告自動產出',
    blockers: 'VOC 回饋流程自動化',
  },
}

export const risks = {
  decision: { q1: '—', q2: '—' },
  resource:  { q1: '—', q2: '—' },
}

export const timeline: string[] = [
  'Manual Testing & Excel Report',
  'Test Case Automation',
  'Database-Driven Test Data Management',
  'Grafana Visualization',
  'Version Test Result Consolidation',
  'Config-Driven Architecture',
  'Standardized Release Test Reporting',
  'Automation Workflow Optimization',
  'Grafana Dashboard Enhancement',
]

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
    id: 'workflow',
    label: 'Workflow',
    mergedImage: '/reference/efficacy-test/workflow.png',
    before: { image: '', title: '', body: '' },
    after:  { image: '', title: '', body: '' },
  },
  {
    id: 'config-driven',
    label: 'Config-Driven',
    mergedImage: '/reference/efficacy-test/config-driven.png',
    before: { image: '', title: '', body: '' },
    after:  { image: '', title: '', body: '' },
  },
  {
    id: 'grafana',
    label: 'Grafana',
    mergedImage: '/reference/efficacy-test/grafana.png',
    before: { image: '', title: '', body: '' },
    after:  { image: '', title: '', body: '' },
  },
]
