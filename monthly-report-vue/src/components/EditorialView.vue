<template>
  <div class="v2-container">
    <div class="v2-progress">
      <div class="v2-progress-current">{{ currentSectionLabel }}</div>
      <div class="v2-progress-dots">
        <a
          v-for="i in 11"
          :key="i"
          :href="'#v2-s' + i"
          :class="{ 'is-active': activeSectionIndex === i }"
          @click.prevent="scrollTo('#v2-s' + i)"
        ></a>
      </div>
      <div class="v2-progress-meta">{{ String(activeSectionIndex).padStart(2, '0') }} / 11</div>
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
    <section class="v2-sec" id="v2-s2">
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

          <!-- Comparison section -->
          <div class="comparison-section">
            <!-- Header above card -->
            <div class="comparison-header">
              <h3 class="comparison-header-title">Before vs After</h3>
            </div>

            <!-- Main card -->
            <div class="comparison-card">
              <div class="comparison-grid">
                <!-- Left: Before (compact) -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.before.image" :src="activeThemeData.before.image" class="comparison-img" alt="">
                    <div v-else class="comparison-img-ph"></div>
                  </div>
                  <h3 class="comparison-col-title">{{ activeThemeData.before.title || '—' }}</h3>
                  <div class="comparison-col-chip">Existing Methods</div>
                  <p class="comparison-col-body">{{ activeThemeData.before.body || '—' }}</p>
                </div>

                <!-- Right: After (prominent) -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.after.image" :src="activeThemeData.after.image" class="comparison-img" alt="">
                    <div v-else class="comparison-img-ph"></div>
                  </div>
                  <h3 class="comparison-col-title">{{ activeThemeData.after.title || '—' }}</h3>
                  <div class="comparison-col-chip">Current Methods</div>
                  <p class="comparison-col-body">{{ activeThemeData.after.body || '—' }}</p>
                </div>
              </div>

            </div>

          <!-- Theme tabs -->
          <div class="theme-tabs">
            <button
              v-for="theme in themes"
              :key="theme.id"
              class="theme-tab"
              :class="{ active: activeTheme === theme.id }"
              @click="activeTheme = theme.id"
            >{{ theme.label }}</button>
          </div>
          </div>
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
              <tr><td>Project A</td><td class="empty">—</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill green" style="width:70%"></div></div><div class="battery-nub"></div><span class="battery-label">70%</span></div></td><td class="empty">—</td><td>Low</td><td class="empty">—</td></tr>
              <tr><td>Project B</td><td class="empty">—</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill yellow" style="width:45%"></div></div><div class="battery-nub"></div><span class="battery-label">45%</span></div></td><td class="empty">—</td><td>Medium</td><td class="empty">—</td></tr>
              <tr><td>Project C</td><td class="empty">—</td><td><div class="battery-wrap"><div class="battery-body"><div class="battery-fill red" style="width:20%"></div></div><div class="battery-nub"></div><span class="battery-label">20%</span></div></td><td class="empty">—</td><td>High</td><td class="empty">—</td></tr>
            </tbody>
          </table>

          <!-- Key Progress -->
          <div class="comparison-header" style="margin-top:48px;">
            <h3 class="comparison-header-title">Key Progress</h3>
          </div>
          <div class="kp-selector-wrap">
            <label class="kp-selector-label">選擇專案</label>
            <div class="kp-selector-dropdown-wrap">
              <select class="kp-selector-select" v-model="activeProject">
                <option value="project-a">Project A</option>
                <option value="project-b">Project B</option>
                <option value="project-c">Project C</option>
              </select>
            </div>
          </div>
          <div class="kp-cards">
            <div class="kp-feature-card">
              <div class="kp-feature-label">Completed</div>
              <div class="kp-feature-content">{{ activeProjectData.completed || '—' }}</div>
            </div>
            <div class="kp-feature-card">
              <div class="kp-feature-label">In Progress</div>
              <div class="kp-feature-content">{{ activeProjectData.inProgress || '—' }}</div>
            </div>
            <div class="kp-feature-card kp-feature-card--blocker">
              <div class="kp-feature-label">Blockers</div>
              <div class="kp-feature-content">{{ activeProjectData.blockers || '—' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 Risks -->
    <section class="v2-sec" id="v2-s4">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id" style="color:var(--accent);">§ 04 · Risks &amp; Escalations</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">What we'd like <em style="color:var(--accent);font-style:italic;">flagged</em>.</h2>
          <table class="v2-table">
            <thead><tr><th>Risk</th><th>Impact</th><th>Mitigation</th><th>Owner</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td><span class="pill yellow"><span class="dot"></span>open</span></td></tr>
              <tr><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td><span class="pill red"><span class="dot"></span>blocked</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 05 Next Month -->
    <section class="v2-sec" id="v2-s5">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 05 · Next Month Plan</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">The next thirty days.</h2>
          <h4 class="v2-sub-h">Planned milestones</h4>
          <table class="v2-table">
            <thead><tr><th>Milestone</th><th>Deliverable</th><th>Owner</th><th>ETA</th><th>Success criteria</th></tr></thead>
            <tbody>
              <tr><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 06 Tech Wins -->
    <section class="v2-sec bg-dark" id="v2-s6">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 06 · Section B · Deep Dive</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Key technical achievements.</h2>
          <p class="v2-lede">Each highlight: Problem → Root Cause → Solution → Result.</p>
          <div class="v2-cols-2">
            <div>
              <div class="field"><span class="field-label">Problem</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Why important</span><span class="field-input">—</span></div>
            </div>
            <div>
              <div class="field"><span class="field-label">Design</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Implementation</span><span class="field-input">—</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07 Architecture -->
    <section class="v2-sec" id="v2-s7">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 07 · Architecture</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Decisions and trade-offs.</h2>
          <table class="v2-table">
            <thead><tr><th>Topic</th><th>Decision</th><th>Alternative</th><th>Trade-off</th><th>Reason</th></tr></thead>
            <tbody>
              <tr><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 08 Performance -->
    <section class="v2-sec bg-blue" id="v2-s8">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 08 · Performance / Reliability</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Numbers that <span class="gradient-blue">moved.</span></h2>
          <div class="apple-metric">—<sup style="font-size:0.3em;letter-spacing:0;">ms</sup></div>
          <div class="apple-metric-label">Headline metric — the single number this section argues for</div>
        </div>
      </div>
    </section>

    <!-- 09 Collaboration -->
    <section class="v2-sec" id="v2-s9">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 09 · Collaboration</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">How the team moved together.</h2>
          <table class="v2-table">
            <thead><tr><th>Team</th><th>Area</th><th>Outcome</th></tr></thead>
            <tbody>
              <tr><td>PM</td><td class="empty">—</td><td class="empty">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 10 Lessons -->
    <section class="v2-sec" id="v2-s10">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 10 · Lessons Learned</div>
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

    <!-- 11 Appendix -->
    <section class="v2-sec" id="v2-s11">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 11 · Appendix</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Supporting materials.</h2>
          <div class="v2-cols-2">
            <div class="placeholder" style="height:120px"><span>architecture diagram</span></div>
            <div class="placeholder" style="height:120px"><span>benchmark results</span></div>
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
const whatHappened = { image: '/what-happened.png', title: '', body: '' }
const whyItMatters = { image: '/why-it-matters.png', title: '', body: '' }

// Section 02: theme switcher (controls Before/After only)
const activeTheme = ref('data-analysis')

const themes = [
  {
    id: 'data-analysis',
    label: 'Data Analysis',
    before: { image: '/Voc_Analysis_Before.png', title: '', body: 'Isolated Analysis\nFeature-Focused\nScattered Goals' },
    after:  { image: '/Voc_Analysis_After.png',  title: '', body: 'Unified Demands\nMarket-Focused\nAligned Goals' }
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
    before: { image: '', title: '', body: '' },
    after:  { image: '', title: '', body: '' }
  }
]

const activeThemeData = computed(() => themes.find(t => t.id === activeTheme.value)!)

// Section 03: key progress project switcher
const activeProject = ref('project-a')

const keyProgress: Record<string, { completed: string; inProgress: string; blockers: string }> = {
  'project-a': { completed: '', inProgress: '', blockers: '' },
  'project-b': { completed: '', inProgress: '', blockers: '' },
  'project-c': { completed: '', inProgress: '', blockers: '' },
}

const activeProjectData = computed(() => keyProgress[activeProject.value])

const scrollTo = (id: string) => {
  const el = document.querySelector(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
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
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
