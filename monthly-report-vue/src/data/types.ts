export interface Project {
  id: string
  name: string
  nameKP: string
  goal: string
  progress: number
  collaborator: string | null
  problem: string | null
  eta: string
}

export interface ThemeColumn {
  image: string
  title: string
  body: string
}

export interface Theme {
  id: string
  label: string
  mergedImage?: string
  before: ThemeColumn
  after: ThemeColumn
}

export interface AchievementCard {
  image: string
  title: string
  body: string
}
