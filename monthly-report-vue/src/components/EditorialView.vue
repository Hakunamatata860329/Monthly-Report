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
      <div class="v2-progress-meta">{{ String(activeSectionIndex).padStart(2, '0') }} / 11 · Section {{ sectionMeta }}</div>
    </div>

    <!-- 01 Cover -->
    <section class="v2-sec bg-dark apple-hero" id="v2-s1">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 01 · Cover</div>
          <div class="v2-sec-audience">cover page</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">2026-05<br>Monthly <span class="gradient-blue">Report.</span></h2>
          <p class="apple-tagline">One month. One document. The progress that actually moved engineering forward — told for managers and engineers alike.</p>
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
          <div class="v2-sec-id">§ 02 · Section A · Delivery</div>
          <div class="v2-sec-audience">Manager / PM / Director</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Executive summary.</h2>
          <p class="v2-lede">The three outcomes that defined the month — and the impact each one created.</p>

          <div class="v2-cols-2">
            <div>
              <h4 class="v2-sub-h">01 — Major Achievement</h4>
              <div class="field"><span class="field-label">Happened</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Why</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Impact</span><span class="field-input">—</span></div>
            </div>
            <div>
              <h4 class="v2-sub-h">02 — Major Achievement</h4>
              <div class="field"><span class="field-label">Happened</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Why</span><span class="field-input">—</span></div>
              <div class="field"><span class="field-label">Impact</span><span class="field-input">—</span></div>
            </div>
          </div>
          <h4 class="v2-sub-h" style="margin-top:32px;">03 — Major Achievement</h4>
          <div class="v2-cols-2">
            <div class="field"><span class="field-label">Happened</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Why</span><span class="field-input">—</span></div>
          </div>

          <blockquote class="v2-pullquote">"Impact, not <em>activity</em>" — the through-line of every entry below.</blockquote>

          <h4 class="v2-sub-h">Engineering impact snapshot</h4>
          <table class="v2-table">
            <thead><tr><th>Area</th><th>Before</th><th>After</th><th>Impact</th></tr></thead>
            <tbody>
              <tr><td>Performance</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
              <tr><td>Stability</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
              <tr><td>Productivity</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
              <tr><td>Cost</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
              <tr><td>Delivery</td><td class="empty">—</td><td class="empty">—</td><td class="empty">—</td></tr>
            </tbody>
          </table>

          <div class="v2-callout">
            <span class="k">Overall status</span>
            <h4>Project health</h4>
            <div style="display:flex; gap:8px; margin-bottom:10px;">
              <span class="pill green"><span class="dot"></span>green</span>
              <span class="pill yellow"><span class="dot"></span>yellow</span>
              <span class="pill red"><span class="dot"></span>red</span>
            </div>
            <div class="field"><span class="field-label">Confidence</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Major Risk</span><span class="field-input">—</span></div>
            <div class="field"><span class="field-label">Attention Needed</span><span class="field-input">—</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 Project Status -->
    <section class="v2-sec" id="v2-s3">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">§ 03 · Project Status</div>
          <div class="v2-sec-audience">Stakeholders</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Where every project stands.</h2>
          <table class="v2-table">
            <thead><tr><th>Project</th><th>Goal</th><th>Status</th><th>Progress</th><th>Risk</th><th>ETA</th></tr></thead>
            <tbody>
              <tr><td>Project A</td><td class="empty">—</td><td><span class="pill green"><span class="dot"></span>green</span></td><td class="empty">70%</td><td>Low</td><td class="empty">—</td></tr>
              <tr><td>Project B</td><td class="empty">—</td><td><span class="pill yellow"><span class="dot"></span>yellow</span></td><td class="empty">45%</td><td>Medium</td><td class="empty">—</td></tr>
              <tr><td>Project C</td><td class="empty">—</td><td><span class="pill red"><span class="dot"></span>red</span></td><td class="empty">20%</td><td>High</td><td class="empty">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 04 Risks -->
    <section class="v2-sec" id="v2-s4">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id" style="color:var(--accent);">§ 04 · Risks &amp; Escalations</div>
          <div class="v2-sec-audience">Leadership attention</div>
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
          <div class="v2-sec-audience">Forward look</div>
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
          <div class="v2-sec-audience">Engineers / Tech Leads</div>
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
          <div class="v2-sec-audience">Tech Leads / Architects</div>
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
          <div class="v2-sec-audience">Engineers</div>
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
          <div class="v2-sec-audience">Team / Cross-team</div>
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
          <div class="v2-sec-audience">Closing reflection</div>
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
          <div class="v2-sec-audience">Optional supporting</div>
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
import { ref, onMounted, onUnmounted } from 'vue'

const currentSectionLabel = ref('— Cover')
const activeSectionIndex = ref(1)
const sectionMeta = ref('A')

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

        if (idx <= 5) sectionMeta.value = 'A'
        else if (idx <= 10) sectionMeta.value = 'B'
        else sectionMeta.value = 'C'
      }
    })
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 })

  sections.forEach(s => observer?.observe(s))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
