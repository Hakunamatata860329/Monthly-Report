export type KpiCategory = 'timeEfficiency' | 'softwareQuality'
export type TaskStatus = 'plan' | 'in-progress' | 'done'

export interface Kpi {
  name: string
  category: KpiCategory
  unit: string
  target: number
  before: number
  after: number
  achievementRate: number
}

export interface Task {
  id: string
  name: string
  status: TaskStatus
  startDate: string
  endDate: string
}

export interface ActionItem {
  goal: string
  specific: string
  measurable: string
  achievable: string
  realistic: string
  timeBound: string
  owner: string
  priority: 'high' | 'medium' | 'low'
}

export interface Project {
  id: string
  name: string
  description: string
  impact: string
  executiveSummary: {
    progress: string[]
    problems: string[]
  }
  kpis: Kpi[]
  tasks: Task[]
  actionPlan: ActionItem[]
}

export interface ReportData {
  meta: {
    year: number
    month: number
    author: string
    department: string
  }
  projects: Project[]
}
