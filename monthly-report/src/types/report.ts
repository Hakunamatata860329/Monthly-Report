export interface Project {
  id: string
  name: string
  description: string
  impact: string
  hero: {
    sub: string         // 漸層副標題
    videoSrc?: string   // 影片路徑（選填，預設 /hero-video.mp4）
    cta?: string        // CTA 按鈕文字（選填，不填則隱藏）
    ctaPrice?: string   // CTA 下方說明文字（選填）
  }
  executiveSummary: {
    headline1: string
    headline2: string
    headline3: string
    chips: { value: string; desc: string }[]
    progress: string[]
  }
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
