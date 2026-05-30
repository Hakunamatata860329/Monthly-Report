<template>
  <div class="v2-container">
    <div class="v2-progress">
      <div class="v2-progress-current">{{ currentSectionLabel }}</div>
      <div class="v2-progress-dots">
        <a
          v-for="i in 7"
          :key="i"
          :href="'#v2-s' + i"
          :class="{ 'is-active': activeSectionIndex === i }"
          @click.prevent="scrollTo('#v2-s' + i)"
        ></a>
      </div>
      <div class="v2-progress-meta">{{ String(activeSectionIndex).padStart(2, '0') }} / 07</div>
    </div>

    <!-- 01 Cover -->
    <section class="v2-sec bg-dark apple-hero" id="v2-s1">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 01 · Cover</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">2026-05<br>Monthly <span class="gradient-blue">Report.</span></h2>
          <p class="apple-tagline">Optimized Efficiency. Compromiseless Quality.<br><span style="font-size:0.6em;opacity:1;">優化效益。絕不妥協的品質。</span></p>
          <dl class="cover-meta">
            <dt>NAME</dt><dd>JASON.JY.LIN</dd>
            <dt>DEPARTMENT</dt><dd>軟體測試課</dd>
            <dt>DATE</dt><dd>06/03/2026</dd>
          </dl>
        </div>
      </div>
    </section>

    <!-- 02 Executive Summary -->
    <section class="v2-sec v2-sec--scroll-tabs" id="v2-s2">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 02 · Executive Summary</div>
        </div>
        <div class="v2-body">
          <div class="comparison-header">
            <h3 class="comparison-header-title">What happened and why it matters today.</h3>
          </div>

          <!-- Achievement cards -->
          <div class="achievement-cards">
            <div
              class="achievement-card card-left"
              :class="{ 'has-image': whatHappened.image }"
              :style="whatHappened.image ? { backgroundImage: `url(${whatHappened.image})` } : {}"
            >
              <div class="achievement-card-main">
                <div v-if="whatHappened.title" class="achievement-card-title">{{ whatHappened.title }}</div>
                <div v-if="whatHappened.body" class="achievement-card-body">{{ whatHappened.body }}</div>
              </div>
            </div>
            <div
              class="achievement-card card-right"
              :class="{ 'has-image': whyItMatters.image }"
              :style="whyItMatters.image ? { backgroundImage: `url(${whyItMatters.image})` } : {}"
            >
              <div class="achievement-card-main">
                <div v-if="whyItMatters.title" class="achievement-card-title">{{ whyItMatters.title }}</div>
                <div v-if="whyItMatters.body" class="achievement-card-body">{{ whyItMatters.body }}</div>
              </div>
            </div>
          </div>

          <!-- Before vs After heading — not sticky, scrolls away before card locks in -->
          <div class="comparison-section">
            <div class="comparison-header">
              <h3 class="comparison-header-title">Before vs After</h3>
            </div>
          </div>

          <!-- Sticky: only the comparison card + tabs stick -->
          <div class="v2-comparison-sticky-wrap">
            <div class="theme-tabs">
              <button
                v-for="theme in themes"
                :key="theme.id"
                class="theme-tab"
                :class="{ active: activeTheme === theme.id }"
                @click="activeTheme = theme.id"
              >{{ theme.label }}</button>
            </div>
            <div class="comparison-card">
              <!-- Merged full-width image (used when before/after share one image) -->
              <div v-if="activeThemeData.mergedImage" class="comparison-merged">
                <img :src="activeThemeData.mergedImage" class="comparison-img-merged" alt="">
              </div>
              <!-- Normal 2-col Before / After -->
              <div v-else class="comparison-grid">
                <!-- Left: Before -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.before.image" :src="activeThemeData.before.image" class="comparison-img" alt="">
                    <div v-else class="comparison-img-ph"></div>
                  </div>
                </div>

                <!-- Right: After -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.after.image" :src="activeThemeData.after.image" class="comparison-img" alt="">
                    <div v-else class="comparison-img-ph"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Scroll space inside .v2-body (parent of sticky) so sticky stays active for 3 tabs -->
          <div class="v2-tab-scroll-spacer"></div>
        </div>
      </div>
    </section>

    <!-- 03 Project Status -->
    <section class="v2-sec" id="v2-s3">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 03 · Project Status</div>
        </div>
        <div class="v2-body">
          <div class="comparison-header">
            <h3 class="comparison-header-title">Project Summary</h3>
          </div>
          <table class="v2-table">
            <thead><tr><th>Project</th><th>Goal</th><th>Progress</th><th>Collaborator</th><th>Problem</th><th>ETA</th></tr></thead>
            <tbody>
              <tr><td>W3A Issue/Requirement Management</td><td>跨團隊需求交集與市場價值分析</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill green" style="width:100%"></div></div><div class="battery-nub"></div><span class="battery-label">100%</span></div></td><td>Triage Team</td><td class="empty">—</td><td>2026-06-30</td></tr>
              <tr><td>SITR Workflow Optimization</td><td>減少人工填寫成本，落實資料數位化</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill yellow" style="width:50%"></div></div><div class="battery-nub"></div><span class="battery-label">50%</span></div></td><td>Daisy</td><td><span class="pill red"><span class="dot"></span>Blocked</span></td><td>2026-07-31</td></tr>
              <tr><td>Workflow Optimization with AI</td><td>應用 AI 優化日常工作流程</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill green" style="width:100%"></div></div><div class="battery-nub"></div><span class="battery-label">100%</span></div></td><td class="empty">—</td><td class="empty">—</td><td>2026-09-30</td></tr>
            </tbody>
          </table>

          <!-- Key Progress -->
          <div class="comparison-header" style="margin-top:48px;">
            <h3 class="comparison-header-title">Key Progress</h3>
          </div>
          <div class="kp-apple-wrap">
            <!-- Project name headers -->
            <div class="kp-apple-header-row">
              <div v-for="p in projects" :key="p.id" class="kp-apple-header-cell">
                {{ p.name }}
              </div>
            </div>
            <!-- Feature rows -->
            <div
              v-for="(sec, si) in sections"
              :key="si"
              class="kp-apple-section-row"
            >
              <div v-for="p in projects" :key="p.id" class="kp-apple-section-col">
                <div class="kp-apple-feat-label" :class="sec.cls">{{ sec.label }}</div>
                <div class="kp-apple-feat-value">{{ keyProgress[p.id][sec.key] || '—' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 Risks -->
    <section class="v2-sec" id="v2-s4">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id" style="color:var(--accent);">§ 04 · Risks &amp; Problems</div>
        </div>
        <div class="v2-body">
          <h2 class="comparison-header-title" style="text-align:left;margin-bottom:32px;">Discussion of Problem</h2>
          <div class="v2-callout" style="border-color:var(--accent);">
            <span class="k">Decision needed</span>
            <div class="field"><span class="field-label">Q1</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Q2</span><span class="field-input">—</span></div>
          </div>
          <div class="v2-callout">
            <span class="k">Resource needed</span>
            <div class="field"><span class="field-label">Q1</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Q2</span><span class="field-input">—</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 Technical Details -->
    <section class="v2-sec bg-dark apple-hero" id="v2-s5">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 05 · Technical Details</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Key Technical <span class="gradient-blue">Achievements.</span></h2>
          <p class="apple-tagline">What problem existed? Why was it important?<br>Design approach. Key implementation details.</p>
          <dl class="cover-meta">
            <dt>NAME</dt><dd>JASON.JY.LIN</dd>
            <dt>DEPARTMENT</dt><dd>軟體測試課</dd>
            <dt>DATE</dt><dd>06/03/2026</dd>
          </dl>
        </div>
      </div>
    </section>

    <!-- 06 Collaboration -->
    <section class="v2-sec" id="v2-s6">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 06 · Claude.md</div>
        </div>
        <div class="v2-body">

          <!-- Slide 1: Why Claude.md? -->
          <h2 class="v2-headline">Why Need <span class="gradient-blue">Claude.md?</span></h2>

          <div class="v2-cols-2" style="margin-top:32px;">
            <div class="s6-card">
              <h4 class="v2-sub-h">Without Claude.md</h4>
              <ul class="s6-list">
                <li>每次重新解釋專案背景</li>
                <li>依賴 Prompt 品質</li>
                <li>結果容易不一致</li>
                <li>知識無法累積</li>
              </ul>
            </div>
            <div class="s6-card">
              <h4 class="v2-sub-h">With Claude.md</h4>
              <ul class="s6-list">
                <li>專案知識持續注入</li>
                <li>理解團隊規範</li>
                <li>產出一致結果</li>
                <li>降低溝通成本</li>
              </ul>
            </div>
          </div>

          <!-- Slide 2: What's Inside? -->
          <h2 class="v2-headline" style="margin-top:80px;">Claude.md <span class="gradient-blue">Summary</span></h2>

          <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
            <pre class="s6-tree">Claude.md
├── Project Context
├── Behavioral Rules
├── Workflow
├── Tool Usage
└── Verification Strategy</pre>
            <div style="display:flex;align-items:stretch;">
              <img src="/reference/Claudemd.png" style="width:100%;height:100%;object-fit:cover;border-radius:16px;" alt="">
            </div>
          </div>


        </div>
      </div>
    </section>

    <!-- 07 Lessons -->
    <section class="v2-sec" id="v2-s7">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 07 · Skills</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Take with us.</h2>
          <div class="v2-cols-2">
            <div class="field"><span class="field-label">Worked well</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Failed</span><span class="field-input">—</span></div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentSectionLabel = ref('— Cover')
const activeSectionIndex = ref(1)

// Section 02: achievement cards (independent of theme tabs)
const whatHappened = { image: '/reference/what-happened.png', title: '', body: '' }
const whyItMatters = { image: '/reference/why-it-matters.png', title: '', body: '' }

// Section 02: theme switcher (controls Before/After only)
const activeTheme = ref('data-analysis')

const themes = [
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    before: { image: '/reference/Voc_Analysis_Before.png', title: '', body: 'Isolated Analysis\nFeature-Focused\nScattered Goals' },
    after:  { image: '/reference/Voc_Analysis_After.png',  title: '', body: 'Unified Demands\nMarket-Focused\nAligned Goals' }
  },
  {
    id: 'ai',
    label: 'AI',
    before: { image: '/reference/Not Use Skill.png', title: '', body: 'Token wastage\nRedundant prompting\nUnreusable outputs' },
    after:  { image: '/reference/Use Skill.png',     title: '', body: 'Token savings\nAccelerated task execution\nTeam leverage' }
  },
  {
    id: 'automation',
    label: 'Automation',
    mergedImage: '/reference/Query.png',
    before: { image: '', title: '', body: '' },
    after:  { image: '', title: '', body: '' }
  }
]

const activeThemeData = computed(() => themes.find(t => t.id === activeTheme.value)!)

// Section 03: key progress
const projects = [
  { id: 'project-a', name: 'W3A Issue /\nRequirement Management' },
  { id: 'project-b', name: 'SITR Workflow\nOptimization' },
  { id: 'project-c', name: 'Workflow Optimization\nwith AI' },
]

const sections: { label: string; key: 'completed' | 'inProgress' | 'blockers'; cls: string }[] = [
  { label: 'Completed',   key: 'completed',  cls: 'kp-status--completed'   },
  { label: 'In Progress', key: 'inProgress', cls: 'kp-status--inprogress'  },
  { label: 'Plan',        key: 'blockers',   cls: 'kp-status--plan'        },
]

const keyProgress: Record<string, { completed: string; inProgress: string; blockers: string }> = {
  'project-a': { completed: '需求交集分析\n(StepC vs Function Requirement)', inProgress: '重新分配、規劃項目優先權', blockers: 'DGC、IMS、MOK\n整合需求交集' },
  'project-b': { completed: '進度追蹤機制建立\n數據圖表化', inProgress: 'QM 上傳格式、機制研究', blockers: 'SITR 流程討論\n測試結果自動回填' },
  'project-c': { completed: 'Issue/Requirement\nData Analysis Skill', inProgress: '周進度報告自動產出', blockers: 'VOC 回饋流程自動化' },
}

const scrollTo = (id: string) => {
  const el = document.querySelector(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Drive activeTheme by tracking the scroll spacer's real-time viewport position.
// No caching needed — works regardless of image load timing.
const handleS2Scroll = () => {
  const spacer = document.querySelector('#v2-s2 .v2-tab-scroll-spacer') as HTMLElement | null
  if (!spacer) return

  // spacerScrolled: how many px of the spacer have entered the viewport from the bottom
  const spacerScrolled = window.innerHeight - spacer.getBoundingClientRect().top
  if (spacerScrolled < 0) return  // spacer not yet in view

  const progress = spacerScrolled / spacer.offsetHeight  // 0 → 1 across 300vh
  const idx = Math.min(themes.length - 1, Math.floor(progress * themes.length))
  activeTheme.value = themes[idx].id
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const sections = document.querySelectorAll('.v2-sec')
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id
        const idx = parseInt(id.replace('v2-s', ''))
        activeSectionIndex.value = idx

        const secId = e.target.querySelector('.v2-sec-id')
        if (secId) {
          currentSectionLabel.value = '— ' + secId.textContent
        }

      }
    })
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 })

  sections.forEach(s => observer?.observe(s))
  window.addEventListener('scroll', handleS2Scroll, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleS2Scroll)
})
</script>
