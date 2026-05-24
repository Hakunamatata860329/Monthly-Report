<template>
  <div class="app">
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <span class="sidebar-logo">MONTHLY REPORT · {{ report.meta.year }}/{{ String(report.meta.month).padStart(2, '0') }}</span>
        <button
          class="collapse-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
          :aria-label="sidebarCollapsed ? '展開側邊欄' : '收合側邊欄'"
        >
          <SvgIcon :name="sidebarCollapsed ? 'chevron-right' : 'chevron-left'" :size="14" />
        </button>
      </div>

      <div class="sidebar-section-title">PROJECTS</div>
      <nav class="project-nav">
        <button
          v-for="(proj, i) in report.projects"
          :key="proj.id"
          class="proj-item"
          :class="{ active: activeProjectId === proj.id }"
          @click="switchProject(proj.id)"
        >
          <span class="proj-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="proj-name">{{ proj.name }}</span>
        </button>
      </nav>

      <div class="sidebar-divider"></div>

      <div class="sidebar-section-title">SECTIONS</div>
      <nav class="sidebar-nav">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
          @click.prevent="scrollTo(item.id)"
        >
          <SvgIcon :name="item.icon" :size="15" class="nav-icon" />
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <img src="/logo.png" class="footer-logo" alt="Delta Electronics" />
        <span class="meta-author">JASON.JY.LIN</span>
      </div>
    </aside>

    <main class="main-content">
      <header class="page-header">
        <div class="header-eyebrow">
          MONTHLY REPORT · {{ report.meta.year }}/{{ String(report.meta.month).padStart(2, '0') }}
        </div>
        <h1 class="header-title">{{ currentProject.name }}</h1>
        <p class="header-desc">{{ currentProject.description }}</p>
        <div class="header-meta">
          <span class="badge">{{ report.meta.department }}</span>
          <span class="badge badge-author">{{ report.meta.author }}</span>
          <span class="badge badge-proj-index">
            {{ report.projects.findIndex(p => p.id === activeProjectId) + 1 }} / {{ report.projects.length }}
          </span>
        </div>
      </header>

      <div class="sections">
        <section id="summary" class="section reveal">
          <div class="section-label">01 / EXECUTIVE SUMMARY</div>
          <ExecutiveSummary :data="currentProject.executiveSummary" />
        </section>

        <section id="kpi" class="section reveal">
          <div class="section-label">02 / KPI OVERVIEW</div>
          <KPIOverview :project="currentProject" />
        </section>

        <section id="trend" class="section reveal">
          <div class="section-label">03 / TREND ANALYSIS</div>
          <TrendAnalysis :project="currentProject" />
        </section>

        <section id="initiatives" class="section reveal">
          <div class="section-label">04 / KEY INITIATIVES</div>
          <KeyInitiatives :project="currentProject" />
        </section>

        <section id="plan" class="section reveal">
          <div class="section-label">05 / ACTION PLAN</div>
          <ActionPlan :items="currentProject.actionPlan" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { ReportData } from './types/report'
import reportData from './data/report.json'
import SvgIcon from './components/SvgIcon.vue'
import ExecutiveSummary from './components/ExecutiveSummary.vue'
import KPIOverview from './components/KPIOverview.vue'
import TrendAnalysis from './components/TrendAnalysis.vue'
import KeyInitiatives from './components/KeyInitiatives.vue'
import ActionPlan from './components/ActionPlan.vue'

const report = reportData as ReportData
const sidebarCollapsed = ref(false)
const activeSection = ref('summary')
const activeProjectId = ref(report.projects[0].id)

const currentProject = computed(
  () => report.projects.find(p => p.id === activeProjectId.value) ?? report.projects[0]
)

const navItems = [
  { id: 'summary', label: '執行摘要', icon: 'file-text' },
  { id: 'kpi', label: 'KPI 總覽', icon: 'bar-chart-2' },
  { id: 'trend', label: '趨勢分析', icon: 'trending-up' },
  { id: 'initiatives', label: '專案成果', icon: 'layers' },
  { id: 'plan', label: '下月計畫', icon: 'calendar' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

async function switchProject(id: string) {
  activeProjectId.value = id
  activeSection.value = 'summary'
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'))
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver?.observe(el)
    })
  }, 50)
}

let observer: IntersectionObserver
let revealObserver: IntersectionObserver

onMounted(() => {
  const sections = document.querySelectorAll('.section')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { threshold: 0.25 }
  )
  sections.forEach((s) => observer.observe(s))

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.06 }
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
  revealObserver?.disconnect()
})
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #ffffff;
  --bg-card: #ffffff;
  --bg-card-hover: #fafafa;
  --bg-section: #f5f5f7;
  --border: #e5e5ea;
  --border-bright: #d1d1d6;
  --accent: #0071e3;
  --accent-dim: rgba(0, 113, 227, 0.08);
  --accent-glow: rgba(0, 113, 227, 0.2);
  --green: #34c759;
  --green-dim: rgba(52, 199, 89, 0.08);
  --yellow: #ff9f0a;
  --yellow-dim: rgba(255, 159, 10, 0.08);
  --red: #ff3b30;
  --red-dim: rgba(255, 59, 48, 0.08);
  --blue: #0071e3;
  --blue-dim: rgba(0, 113, 227, 0.08);
  --gray-dim: rgba(0, 0, 0, 0.04);
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --text-muted: #86868b;
  --font-mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  --sidebar-w: 270px;
  --sidebar-collapsed-w: 48px;
  --shadow-card: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-hover: 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  --radius-card: 16px;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg-section);
  color: var(--text-primary);
  font-family: var(--font-sans);
  min-height: 100vh;
}

.app {
  display: flex;
  min-height: 100vh;
}

/* ─── Sidebar section title ─── */
.sidebar-section-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--text-muted);
  padding: 10px 18px 6px;
  text-transform: uppercase;
}

.sidebar-divider {
  height: 1px;
  background: var(--border);
  margin: 10px 0;
}

/* ─── Project nav ─── */
.project-nav {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.proj-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.15s;
  white-space: nowrap;
  overflow: hidden;
}
.proj-item:hover { background: rgba(0,0,0,0.05); }
.proj-item.active { background: var(--accent-dim); }

.proj-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  flex-shrink: 0;
  line-height: 1;
}
.proj-item.active .proj-num { color: var(--accent); }

.proj-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}
.proj-item.active .proj-name { color: var(--accent); }

/* ─── Sidebar ─── */
.sidebar {
  width: var(--sidebar-w);
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 100;
  flex-shrink: 0;
}
.sidebar.collapsed { width: var(--sidebar-collapsed-w); }

/* ─── Collapsed state ─── */
.sidebar.collapsed .sidebar-header { justify-content: center; padding: 22px 0; }

.sidebar.collapsed .sidebar-logo,
.sidebar.collapsed .sidebar-section-title,
.sidebar.collapsed .sidebar-divider,
.sidebar.collapsed .project-nav,
.sidebar.collapsed .sidebar-nav,
.sidebar.collapsed .sidebar-footer {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 18px;
  gap: 8px;
}
.sidebar-logo {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
}
.collapse-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 15px;
  transition: background 0.2s, color 0.2s;
  line-height: 1;
}
.collapse-btn:hover { background: var(--bg-section); color: var(--text-primary); }

.sidebar-nav {
  flex: 1;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(0,0,0,0.05); color: var(--text-primary); }
.nav-item.active { background: var(--accent-dim); color: var(--accent); }

.nav-icon { flex-shrink: 0; opacity: 0.65; }
.nav-item:hover .nav-icon, .nav-item.active .nav-icon { opacity: 1; }

.sidebar-footer {
  padding: 16px 18px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
.footer-logo {
  width: 100px;
  height: auto;
  object-fit: contain;
  opacity: 0.82;
  flex-shrink: 0;
}
.meta-author {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

/* ─── Main ─── */
.main-content {
  flex: 1;
  min-width: 0;
  padding: 48px 56px 128px;
}

.page-header {
  margin-bottom: 56px;
  padding: 40px 48px;
  background: var(--bg);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
}
.header-eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 16px;
  text-transform: uppercase;
}
.header-title {
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.header-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 22px;
  max-width: 640px;
}
.header-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.badge {
  font-size: 12px;
  font-weight: 500;
  padding: 5px 13px;
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-secondary);
}
.badge-author { color: var(--accent); border-color: rgba(0,113,227,0.25); background: var(--accent-dim); }
.badge-proj-index { color: var(--text-secondary); }

/* ─── Sections ─── */
.sections { display: flex; flex-direction: column; gap: 72px; }
.section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.section.visible { opacity: 1; transform: translateY(0); }
.section-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

/* ─── Shared Card ─── */
.card {
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-card);
  padding: 24px;
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.25s, transform 0.25s;
}
.card:hover { box-shadow: var(--shadow-hover); transform: translateY(-1px); }

/* ─── Section title ─── */
.sec-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}
</style>
