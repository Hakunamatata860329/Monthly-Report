<template>
  <div class="app">
    <header class="topbar">
      <span class="topbar-logo">MONTHLY REPORT</span>
      <nav class="topbar-nav">
        <button class="month-btn" :class="{ open: flyoutOpen }" @click.stop="flyoutOpen = !flyoutOpen">
          {{ monthName }}
          <span class="month-chevron"></span>
        </button>
      </nav>
    </header>

    <Transition name="flyout">
      <div v-if="flyoutOpen" class="flyout-backdrop" @click="flyoutOpen = false">
        <div class="flyout-panel" @click.stop>
          <div class="flyout-inner">
            <p class="flyout-year">{{ report.meta.year }}</p>
            <button
              v-for="(proj, i) in report.projects"
              :key="proj.id"
              class="flyout-item"
              :class="{ active: activeProjectId === proj.id }"
              @click="selectProject(proj.id)"
            >
              <span class="flyout-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="flyout-name">{{ proj.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <main class="main-content">
      <section id="summary" class="section reveal">
        <div class="section-label">EXECUTIVE SUMMARY</div>
        <ExecutiveSummary :data="currentProject.executiveSummary" />
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { ReportData } from './types/report'
import reportData from './data/report.json'
import ExecutiveSummary from './components/ExecutiveSummary.vue'

const report = reportData as ReportData
const activeProjectId = ref(report.projects[0].id)
const flyoutOpen = ref(false)

const currentProject = computed(
  () => report.projects.find(p => p.id === activeProjectId.value) ?? report.projects[0]
)

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const monthName = computed(() => MONTH_NAMES[report.meta.month - 1])

let revealObserver: IntersectionObserver

async function switchProject(id: string) {
  activeProjectId.value = id
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'))
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver?.observe(el)
    })
  }, 50)
}

function selectProject(id: string) {
  flyoutOpen.value = false
  switchProject(id)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') flyoutOpen.value = false
}

onMounted(() => {
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
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  revealObserver?.disconnect()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg-card: #ffffff;
  --bg-section: #f5f5f7;
  --border: #e5e5ea;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --text-muted: #86868b;
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace;
  --shadow-card: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  --shadow-hover: 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  --radius-card: 16px;
  --ease-spring: cubic-bezier(0.25, 1, 0.5, 1);
  --topbar-bg: rgba(17, 17, 17, 0.92);
  --topbar-text: rgba(255, 255, 255, 0.85);
  --topbar-text-muted: rgba(255, 255, 255, 0.42);
  --topbar-active-bg: rgba(255, 255, 255, 0.10);
  --topbar-border: rgba(255, 255, 255, 0.08);
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
  flex-direction: column;
  min-height: 100vh;
}

/* ─── Topbar ─── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 52px;
  flex-shrink: 0;
  background: var(--topbar-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--topbar-border);
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0 40px;
}

.topbar-logo {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--topbar-text-muted);
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ─── Topbar nav ─── */
.topbar-nav { margin-left: auto; }

.month-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--topbar-text);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  transition: background 0.2s var(--ease-spring);
}
.month-btn:hover { background: rgba(255,255,255,0.07); }
.month-btn.open { background: var(--topbar-active-bg); color: #32d2f2; }

.month-chevron {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transition: transform 0.2s var(--ease-spring);
}
.month-btn.open .month-chevron { transform: rotate(-135deg) translateY(2px); }

/* ─── Flyout ─── */
.flyout-backdrop {
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.flyout-panel {
  background: var(--topbar-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--topbar-border);
  padding: 28px 40px 36px;
}

.flyout-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.flyout-year {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--topbar-text-muted);
  margin-bottom: 16px;
}

.flyout-item {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px 14px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  text-align: left;
  transition: background 0.15s var(--ease-spring);
}
.flyout-item:hover { background: rgba(255,255,255,0.07); }
.flyout-item.active { background: var(--topbar-active-bg); }

.flyout-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--topbar-text-muted);
  flex-shrink: 0;
}
.flyout-item.active .flyout-num { color: #32d2f2; }

.flyout-name {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--topbar-text);
}
.flyout-item.active .flyout-name { color: #32d2f2; }

/* ─── Flyout transition ─── */
.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.18s ease, transform 0.22s var(--ease-spring);
}
.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ─── Main ─── */
.main-content {
  flex: 1;
  min-width: 0;
  background: var(--bg-section);
}

/* ─── Sections ─── */
.section {
  padding: 72px 56px;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s var(--ease-spring), transform 0.7s var(--ease-spring);
}
.section:last-child { padding-bottom: 128px; }
#summary { background: #1d1d1f; }
.section.visible { opacity: 1; transform: translateY(0); }

/* ─── Shared Card ─── */
.card {
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-card);
  padding: 24px;
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.3s var(--ease-spring), transform 0.3s var(--ease-spring);
}
.card:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px) scale(1.01); }

.section-label {
  font-size: clamp(3.5rem, 8vw, 6.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.08;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

/* ─── Section title ─── */
.sec-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}
</style>
