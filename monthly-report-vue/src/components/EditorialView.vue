<template>
  <div class="v2-container">
    <div class="v2-progress">
      <div class="v2-progress-current">{{ currentSectionLabel }}</div>
      <div class="v2-progress-dots">
        <a
          v-for="i in sectionLabels.length"
          :key="i"
          :href="'#v2-s' + i"
          :class="{ 'is-active': activeSectionIndex === i }"
          @click.prevent="scrollTo('#v2-s' + i)"
        ></a>
      </div>
      <div class="v2-progress-meta">{{ String(activeSectionIndex).padStart(2, '0') }} / {{ String(sectionLabels.length).padStart(2, '0') }}</div>
    </div>

    <!-- 01 Cover -->
    <section class="v2-sec bg-dark apple-hero" id="v2-s1">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ sectionLabels[0] }}</div>
        </div>
        <div class="v2-body">
          <template v-if="props.activeMonth === 'efficacy-test'">
            <h2 class="v2-headline">Evolutionary History of<br><span class="gradient-blue">Efficacy Testing</span></h2>
          </template>
          <template v-else>
            <h2 class="v2-headline">{{ report.monthHeadline }}<br>Monthly <span class="gradient-blue">Report.</span></h2>
          </template>
          <p class="apple-tagline">Optimized Efficiency. Compromiseless Quality.<br><span style="font-size:0.6em;opacity:1;">效率優化。絕不妥協的品質。</span></p>
          <dl class="cover-meta">
            <dt>NAME</dt><dd>{{ author.name }}</dd>
            <dt>DEPARTMENT</dt><dd>{{ author.department }}</dd>
            <dt>DATE</dt><dd>{{ author.date }}</dd>
          </dl>
        </div>
      </div>
    </section>

    <!-- 02 Executive Summary -->
    <section class="v2-sec v2-sec--scroll-tabs" id="v2-s2">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ sectionLabels[1] }}</div>
        </div>
        <div class="v2-body">
          <div class="comparison-header">
            <h3 class="comparison-header-title">
              <template v-if="props.activeMonth === 'efficacy-test'">Executive Summary</template>
              <template v-else>What happened and why it matters today.</template>
            </h3>
          </div>

          <!-- Milestones image (efficacy-test only) -->
          <div v-if="props.activeMonth === 'efficacy-test'" class="milestones-img-wrap lb-trigger" @click="openLightbox('/reference/efficacy-test/milestones.png')">
            <img src="/reference/efficacy-test/milestones.png" alt="Efficacy Test Milestones" class="milestones-img">
          </div>

          <!-- Achievement cards (other months) -->
          <div v-else class="achievement-cards">
            <div
              class="achievement-card card-left"
              :class="{ 'has-image': whatHappened.image, 'lb-trigger': whatHappened.image }"
              :style="whatHappened.image ? { backgroundImage: `url(${whatHappened.image})` } : {}"
              @click="whatHappened.image && openLightbox(whatHappened.image)"
            >
              <div class="achievement-card-main">
                <div v-if="whatHappened.title" class="achievement-card-title">{{ whatHappened.title }}</div>
                <div v-if="whatHappened.body" class="achievement-card-body">{{ whatHappened.body }}</div>
              </div>
            </div>
            <div
              class="achievement-card card-right"
              :class="{ 'has-image': whyItMatters.image, 'lb-trigger': whyItMatters.image }"
              :style="whyItMatters.image ? { backgroundImage: `url(${whyItMatters.image})` } : {}"
              @click="whyItMatters.image && openLightbox(whyItMatters.image)"
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
              <div v-if="activeThemeData.mergedImage !== undefined" class="comparison-merged">
                <img v-if="activeThemeData.mergedImage" :src="activeThemeData.mergedImage" class="comparison-img-merged lb-trigger" alt="" @click="openLightbox(activeThemeData.mergedImage!)">
                <div v-else class="comparison-img-ph"></div>
              </div>
              <!-- Normal 2-col Before / After -->
              <div v-else class="comparison-grid">
                <!-- Left: Before -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.before.image" :src="activeThemeData.before.image" class="comparison-img lb-trigger" alt="" @click="openLightbox(activeThemeData.before.image)">
                    <div v-else class="comparison-img-ph"></div>
                  </div>
                </div>

                <!-- Right: After -->
                <div class="comparison-col">
                  <div class="comparison-img-area">
                    <img v-if="activeThemeData.after.image" :src="activeThemeData.after.image" class="comparison-img lb-trigger" alt="" @click="openLightbox(activeThemeData.after.image)">
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
    <section v-show="props.activeMonth !== 'efficacy-test'" :id="props.activeMonth === 'efficacy-test' ? 'v2-s3-hidden' : 'v2-s3'" class="v2-sec">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ sectionLabels[2] }}</div>
        </div>
        <div class="v2-body">
          <div class="comparison-header">
            <h3 class="comparison-header-title">Project Summary</h3>
          </div>
          <table class="v2-table">
            <thead><tr><th>Project</th><th>Goal</th><th>Progress</th><th>Collaborator</th><th>Problem</th><th>ETA</th></tr></thead>
            <tbody>
              <tr v-for="p in projects" :key="p.id">
                <td>{{ p.name }}</td>
                <td>{{ p.goal }}</td>
                <td>
                  <div class="battery-wrap">
                    <div class="battery-body">
                      <div class="battery-fill" :class="batteryColor(p.progress)" :style="{ width: p.progress + '%' }"></div>
                    </div>
                    <div class="battery-nub"></div>
                    <span class="battery-label">{{ p.progress }}%</span>
                  </div>
                </td>
                <td :class="{ empty: !p.collaborator }">{{ p.collaborator || '—' }}</td>
                <td :class="{ empty: !p.problem }">
                  <span v-if="p.problem" class="pill red"><span class="dot"></span>{{ p.problem }}</span>
                  <template v-else>—</template>
                </td>
                <td>{{ p.eta }}</td>
              </tr>
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
                {{ p.nameKP }}
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
    <section v-show="props.activeMonth !== 'efficacy-test'" :id="props.activeMonth === 'efficacy-test' ? 'v2-s4-hidden' : 'v2-s4'" class="v2-sec">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id" style="color:var(--accent);">{{ sectionLabels[3] }}</div>
        </div>
        <div class="v2-body">
          <h2 class="comparison-header-title" style="text-align:left;margin-bottom:32px;">Discussion of Problem</h2>
          <div class="v2-callout" style="border-color:var(--accent);">
            <span class="k">Decision needed</span>
            <div class="field"><span class="field-label">Q1</span><span class="field-input">{{ risks.decision.q1 }}</span></div>
            <div class="field"><span class="field-label">Q2</span><span class="field-input">{{ risks.decision.q2 }}</span></div>
          </div>
          <div class="v2-callout">
            <span class="k">Resource needed</span>
            <div class="field"><span class="field-label">Q1</span><span class="field-input">{{ risks.resource.q1 }}</span></div>
            <div class="field"><span class="field-label">Q2</span><span class="field-input">{{ risks.resource.q2 }}</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 Technical Details -->
    <section class="v2-sec bg-dark apple-hero" :id="props.activeMonth === 'efficacy-test' ? 'v2-s3' : 'v2-s5'">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ props.activeMonth === 'efficacy-test' ? sectionLabels[2] : sectionLabels[4] }}</div>
        </div>
        <div class="v2-body">
          <h2 class="v2-headline">Key Technical <span class="gradient-blue">Achievements.</span></h2>
          <p class="apple-tagline">What problem existed? Why was it important?<br>Design approach. Key implementation details.</p>
          <dl class="cover-meta">
            <dt>NAME</dt><dd>{{ author.name }}</dd>
            <dt>DEPARTMENT</dt><dd>{{ author.department }}</dd>
            <dt>DATE</dt><dd>{{ author.date }}</dd>
          </dl>
        </div>
      </div>
    </section>

    <!-- 06 -->
    <section class="v2-sec" :id="props.activeMonth === 'efficacy-test' ? 'v2-s4' : 'v2-s6'">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ props.activeMonth === 'efficacy-test' ? sectionLabels[3] : sectionLabels[5] }}</div>
        </div>
        <div class="v2-body">

          <!-- Efficacy Test: Config-Driven -->
          <template v-if="props.activeMonth === 'efficacy-test'">
            <h2 class="v2-headline">Why Need <span class="gradient-blue">Config-Driven?</span></h2>
            <div class="v2-cols-2" style="margin-top:32px;">
              <div class="s6-card">
                <h4 class="v2-sub-h">Without Config-Driven</h4>
                <ul class="s6-list">
                  <li>改需求要改程式、測試</li>
                  <li>新功能常需修改核心邏輯</li>
                  <li>類似的程式碼重複產出</li>
                  <li>程式碼耦合性高維護不易</li>
                </ul>
              </div>
              <div class="s6-card">
                <h4 class="v2-sub-h">With Config-Driven</h4>
                <ul class="s6-list">
                  <li>多數需求只需改設定</li>
                  <li>新功能多半透過新增設定</li>
                  <li>同一套程式可支援多種測例情境</li>
                  <li>程式架構清晰易維護</li>
                </ul>
              </div>
            </div>

            <h2 class="v2-headline" style="margin-top:80px;">Config-Driven <span class="gradient-blue">Architecture</span></h2>
            <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
              <pre class="s6-tree">config.xml
└── Test Case ID
    ├── Validation 01
    │   ├── Name
    │   ├── Step
    │   ├── Communication
    │   └── Related Issue
    └── Validation 02
        ├── Name
        ├── Step
        ├── Communication
        └── Related Issue</pre>
              <div class="s7-code-window">
                <div class="s7-code-titlebar">
                  <span class="s7-dot s7-dot--red"></span>
                  <span class="s7-dot s7-dot--yellow"></span>
                  <span class="s7-dot s7-dot--green"></span>
                  <span class="s7-code-filename">config.xml</span>
                </div>
                <pre class="s7-code-body"><span class="c-punc">&lt;</span><span class="c-h2">config</span><span class="c-punc">&gt;</span>
  <span class="c-punc">&lt;</span><span class="c-h2">TestCaseID</span><span class="c-punc">&gt;</span>
    <span class="c-punc">&lt;</span><span class="c-h2">Validation</span> <span class="c-key">id</span><span class="c-punc">=</span><span class="c-str">"01"</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Name</span><span class="c-punc">&gt;</span><span class="c-str">AS 機種編譯時間</span><span class="c-punc">&lt;/</span><span class="c-h3">Name</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Step</span><span class="c-punc">&gt;</span><span class="c-str">1. [ACT] 開啟 AS 測試專案</span>
             <span class="c-str">2. [VP] 計時編譯開始到結束花費時間</span><span class="c-punc">&lt;/</span><span class="c-h3">Step</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Communication</span><span class="c-punc">&gt;</span><span class="c-str">N.A.</span><span class="c-punc">&lt;/</span><span class="c-h3">Communication</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">RelatedIssue</span><span class="c-punc">&gt;</span><span class="c-str">Issue-xxxxx</span><span class="c-punc">&lt;/</span><span class="c-h3">RelatedIssue</span><span class="c-punc">&gt;</span>
    <span class="c-punc">&lt;/</span><span class="c-h2">Validation</span><span class="c-punc">&gt;</span>
    <span class="c-punc">&lt;</span><span class="c-h2">Validation</span> <span class="c-key">id</span><span class="c-punc">=</span><span class="c-str">"02"</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Name</span><span class="c-punc">&gt;</span><span class="c-str">W3A 機種編譯時間</span><span class="c-punc">&lt;/</span><span class="c-h3">Name</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Step</span><span class="c-punc">&gt;</span><span class="c-str">1. [ACT] 開啟 W3A 測試專案</span>
             <span class="c-str">2. [VP] 計時編譯開始到結束花費時間</span><span class="c-punc">&lt;/</span><span class="c-h3">Step</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">Communication</span><span class="c-punc">&gt;</span><span class="c-str">SIMULATOR</span><span class="c-punc">&lt;/</span><span class="c-h3">Communication</span><span class="c-punc">&gt;</span>
      <span class="c-punc">&lt;</span><span class="c-h3">RelatedIssue</span><span class="c-punc">&gt;</span><span class="c-str">Issue-xxxxx</span><span class="c-punc">&lt;/</span><span class="c-h3">RelatedIssue</span><span class="c-punc">&gt;</span>
    <span class="c-punc">&lt;/</span><span class="c-h2">Validation</span><span class="c-punc">&gt;</span>
  <span class="c-punc">&lt;/</span><span class="c-h2">TestCaseID</span><span class="c-punc">&gt;</span>
<span class="c-punc">&lt;/</span><span class="c-h2">config</span><span class="c-punc">&gt;</span></pre>
              </div>
            </div>
          </template>

          <!-- April: Vibe Coding -->
          <template v-else-if="report.month === '2026.04'">
            <h2 class="v2-headline">What is <span class="gradient-blue">Vibe Coding?</span></h2>
            <div class="v2-cols-2" style="margin-top:32px;">
              <div class="s6-card">
                <h4 class="v2-sub-h">Traditional Coding</h4>
                <ul class="s6-list">
                  <li>逐行撰寫程式碼</li>
                  <li>需記憶 API 語法</li>
                  <li>難以快速原型迭代</li>
                  <li>開發者需全程專注實作</li>
                </ul>
              </div>
              <div class="s6-card">
                <h4 class="v2-sub-h">Vibe Coding</h4>
                <ul class="s6-list">
                  <li>以自然語言描述意圖</li>
                  <li>AI 生成並驗證程式碼</li>
                  <li>快速迭代，專注設計</li>
                  <li>知識與 Prompt 持續累積</li>
                </ul>
              </div>
            </div>

            <h2 class="v2-headline" style="margin-top:80px;">Vibe Coding <span class="gradient-blue">in Practice</span></h2>
            <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
              <pre class="s6-tree">Monthly Report
├── Wireframe Design
├── Component Architecture
├── Data Layer
├── Animations
└── Dark / Light Theme</pre>
              <div class="s7-code-window">
                <div class="s7-code-titlebar">
                  <span class="s7-dot s7-dot--red"></span>
                  <span class="s7-dot s7-dot--yellow"></span>
                  <span class="s7-dot s7-dot--green"></span>
                  <span class="s7-code-filename">Claude Code Session</span>
                </div>
                <pre class="s7-code-body"><span class="c-plain">我想建立一個月報網站，要有：</span>
<span class="c-comment">  Apple 風格設計、深色背景</span>
<span class="c-comment">  Section 滾動式導覽</span>
<span class="c-comment">  Battery 進度條元件</span>
<span class="c-comment">  Before / After 圖片對比</span>
<span class="c-sep">──────────────────────────</span>
<span class="c-h2">Claude Code →</span>
<span class="c-bash">  vue create monthly-report-vue</span>
<span class="c-bash">  # 建立元件架構...</span>
<span class="c-bash">  # 撰寫 wireframe.css...</span>
<span class="c-bash">  # 實作 EditorialView.vue...</span>
<span class="c-sep">──────────────────────────</span>
<span class="c-h3">Result:</span>
<span class="c-plain">  本月報由 Vibe Coding 完成</span></pre>
              </div>
            </div>
          </template>

          <!-- May+: Claude.md -->
          <template v-else>
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

            <h2 class="v2-headline" style="margin-top:80px;">Claude.md <span class="gradient-blue">Summary</span></h2>
            <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
              <pre class="s6-tree">Claude.md
├── Project Context
├── Behavioral Rules
├── Workflow
├── Tool Usage
└── Verification Strategy</pre>
              <div class="s7-code-window">
                <div class="s7-code-titlebar">
                  <span class="s7-dot s7-dot--red"></span>
                  <span class="s7-dot s7-dot--yellow"></span>
                  <span class="s7-dot s7-dot--green"></span>
                  <span class="s7-code-filename">CLAUDE.md</span>
                </div>
                <pre class="s7-code-body"><span class="c-h2">## Pre-Response Checklist</span>

<span class="c-plain">Before every response:</span>

<span class="c-plain">1. </span><span class="c-key">**Assumptions**</span><span class="c-plain"> — List any assumptions.</span>
<span class="c-comment">   If uncertain, stop and ask.</span>

<span class="c-plain">2. </span><span class="c-key">**Scope**</span><span class="c-plain"> — Is everything I'm about</span>
<span class="c-plain">   to produce explicitly requested?</span>

<span class="c-plain">3. </span><span class="c-key">**Clarity**</span><span class="c-plain"> — Anything I don't</span>
<span class="c-plain">   fully understand? Name it and ask.</span>

<span class="c-sep">---</span>

<span class="c-h2">## Think Before Coding</span>
<span class="c-comment">Don't assume. Surface tradeoffs.</span>

<span class="c-h2">## Simplicity First</span>
<span class="c-comment">Minimum code. Nothing speculative.</span>

<span class="c-h2">## Surgical Changes</span>
<span class="c-comment">Touch only what you must.</span>

<span class="c-h2">## Goal-Driven Execution</span>
<span class="c-comment">Define success criteria.</span>
<span class="c-comment">Loop until verified.</span></pre>
              </div>
            </div>
          </template>

        </div>
      </div>
    </section>

    <!-- 07 Skills -->
    <section v-show="report.month !== '2026.04'" class="v2-sec" :id="props.activeMonth === 'efficacy-test' ? 'v2-s5' : 'v2-s7'">
      <div class="v2-inner">
        <div class="v2-sec-head">
          <div class="v2-sec-id">{{ props.activeMonth === 'efficacy-test' ? sectionLabels[4] : sectionLabels[6] }}</div>
        </div>
        <div class="v2-body">

          <!-- Efficacy Test: Grafana -->
          <template v-if="props.activeMonth === 'efficacy-test'">
            <h2 class="v2-headline">Why Need <span class="gradient-blue">Grafana?</span></h2>

            <div class="v2-cols-2" style="margin-top:32px;">
              <div class="s6-card">
                <h4 class="v2-sub-h">Without Grafana</h4>
                <ul class="s6-list">
                  <li>以 Excel 手動記錄測試數據</li>
                  <li>只能閱讀冷冰冰的數字</li>
                  <li>歷史數據難以回溯比較</li>
                  <li>趨勢變化不易察覺</li>
                </ul>
              </div>
              <div class="s6-card">
                <h4 class="v2-sub-h">With Grafana</h4>
                <ul class="s6-list">
                  <li>歷史數據集中統一管理</li>
                  <li>數據圖形化直觀呈現</li>
                  <li>趨勢變化一目瞭然</li>
                  <li>跨時間點比對輕鬆實現</li>
                </ul>
              </div>
            </div>

            <h2 class="v2-headline" style="margin-top:80px;">Grafana <span class="gradient-blue">Dashboard</span></h2>

            <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
              <pre class="s6-tree">Data Pipeline
├── Test Result
│   ├── Compile Time
│   ├── Download Time
│   └── Open Project
├── Time-Series DB
│   └── MySQL Data Base
└── Grafana Dashboard
    ├── Line Chart
    ├── Bar Chart
    └── Alert</pre>
              <div class="grafana-img-wrap lb-trigger" @click="openLightbox('https://grafana.com/api/dashboards/1860/images/7994/image')">
                <img src="https://grafana.com/api/dashboards/1860/images/7994/image" alt="Grafana Dashboard" class="grafana-img">
              </div>
            </div>
          </template>

          <!-- Skills (other months) -->
          <template v-else>

          <!-- Slide 1: Why Skills? -->
          <h2 class="v2-headline">Why Need <span class="gradient-blue">Skills?</span></h2>

          <div class="v2-cols-2" style="margin-top:32px;">
            <div class="s6-card">
              <h4 class="v2-sub-h">Without Skills</h4>
              <ul class="s6-list">
                <li>重複輸入相同 Prompt</li>
                <li>Token 消耗高、效率低</li>
                <li>輸出結果不穩定</li>
                <li>知識無法沉澱複用</li>
              </ul>
            </div>
            <div class="s6-card">
              <h4 class="v2-sub-h">With Skills</h4>
              <ul class="s6-list">
                <li>一行指令觸發完整工作流</li>
                <li>Token 效率大幅提升</li>
                <li>標準化、可預期的輸出</li>
                <li>可分享給團隊持續累積</li>
              </ul>
            </div>
          </div>

          <!-- Slide 2: Skill Summary -->
          <h2 class="v2-headline" style="margin-top:80px;">Skill <span class="gradient-blue">Summary</span></h2>

          <div class="v2-cols-2" style="margin-top:32px; align-items:stretch;">
            <pre class="s6-tree">data-analysis
├── Trigger
│   └── /data-analysis
├── Input
│   ├── Excel Issue List
│   └── Feature Requirements
├── Process
│   ├── Demand Intersection
│   └── Market Priority Rank
└── Output
    ├── Analysis Report
    └── Priority Matrix</pre>
            <div class="s7-code-window">
              <div class="s7-code-titlebar">
                <span class="s7-dot s7-dot--red"></span>
                <span class="s7-dot s7-dot--yellow"></span>
                <span class="s7-dot s7-dot--green"></span>
                <span class="s7-code-filename">gen-priority / SKILL.md</span>
              </div>
              <pre class="s7-code-body"><span class="c-sep">---</span>
<span class="c-key">name</span><span class="c-punc">:</span> <span class="c-str">gen-priority</span>
<span class="c-key">allowed-tools</span><span class="c-punc">:</span> <span class="c-str">Bash, Read, PowerShell</span>
<span class="c-sep">---</span>

<span class="c-h1"># Gen Priority</span>

<span class="c-h2">## 步驟</span>

<span class="c-h3">### 1.</span> <span class="c-plain">前置檢查</span>
<span class="c-comment">  確認資料檔存在，缺少則中止</span>

<span class="c-h3">### 2.</span> <span class="c-plain">清洗 StepControl</span>
<span class="c-bash">  $ python clean_stepcontrol.py</span>

<span class="c-h3">### 3.</span> <span class="c-plain">執行 Dashboard Pipeline</span>
<span class="c-bash">  $ python pipeline.py</span>

<span class="c-h3">### 4.</span> <span class="c-plain">確認輸出並回報</span>
<span class="c-ps">  Get-ChildItem "weekly_report" |</span>
<span class="c-ps">    Sort-Object Name -Descending |</span>
<span class="c-ps">    Select-Object -First 1</span>

<span class="c-h2">## 成功標準</span>
<span class="c-plain">weekly_report/YYYY-Wxx/priority.html</span>
<span class="c-comment">存在，且修改時間為本次執行後</span></pre>
            </div>
          </div>

          </template>

        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="lb">
      <div v-if="lightboxSrc" class="lightbox-overlay" @click="closeLightbox">
        <img :src="lightboxSrc" class="lightbox-img" alt="" @click.stop>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as april        from '../data/months/2026-04'
import * as may          from '../data/months/2026-05'
import * as efficacyTest from '../data/months/efficacy-test'

const currentSectionLabel = ref('— Cover')
const activeSectionIndex = ref(1)

// Lightbox
const lightboxSrc = ref('')
const openLightbox = (src: string) => { if (src) lightboxSrc.value = src }
const closeLightbox = () => { lightboxSrc.value = '' }
const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }

type MonthKey = '2026-04' | '2026-05' | 'efficacy-test'
const MONTHS = { '2026-04': april, '2026-05': may, 'efficacy-test': efficacyTest } as const

const props = defineProps<{ activeMonth: MonthKey }>()
const md = computed(() => MONTHS[props.activeMonth])

const author      = computed(() => md.value.author)
const report      = computed(() => md.value.report)
const projects    = computed(() => md.value.projects)
const keyProgress = computed(() => md.value.keyProgress)
const risks       = computed(() => md.value.risks)
const sectionLabels = computed(() => md.value.sectionLabels)
const themes      = computed(() => md.value.themes)
const whatHappened  = computed(() => md.value.whatHappened)
const whyItMatters  = computed(() => md.value.whyItMatters)

const activeTheme = ref(md.value.themes[0].id)
watch(() => props.activeMonth, () => { activeTheme.value = md.value.themes[0].id })

const activeThemeData = computed(() => themes.value.find(t => t.id === activeTheme.value)!)

const sections: { label: string; key: 'completed' | 'inProgress' | 'blockers'; cls: string }[] = [
  { label: 'Completed',   key: 'completed',  cls: 'kp-status--completed'   },
  { label: 'In Progress', key: 'inProgress', cls: 'kp-status--inprogress'  },
  { label: 'Plan',        key: 'blockers',   cls: 'kp-status--plan'        },
]

function batteryColor(progress: number): string {
  if (progress >= 80) return 'green'
  if (progress >= 40) return 'yellow'
  return 'red'
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
  const idx = Math.min(themes.value.length - 1, Math.floor(progress * themes.value.length))
  activeTheme.value = themes.value[idx].id
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
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleS2Scroll)
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
/* Grafana dashboard image */
.grafana-img-wrap {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  cursor: zoom-in;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.grafana-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* §07 Apple-style code window */
.s7-code-window {
  background: #1e1e2e;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.s7-code-titlebar {
  background: #2a2a3c;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.s7-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.s7-dot--red    { background: #ff5f57; }
.s7-dot--yellow { background: #febc2e; }
.s7-dot--green  { background: #28c840; }

.s7-code-filename {
  margin-left: 6px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  letter-spacing: 0.02em;
}

.s7-code-body {
  margin: 0;
  padding: 20px 22px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 12.5px;
  line-height: 1.75;
  color: #cdd6f4;
  overflow: auto;
  flex: 1;
  white-space: pre;
}

/* Syntax token colours */
.c-sep     { color: #6c7086; }
.c-key     { color: #cba6f7; }
.c-str     { color: #a6e3a1; }
.c-punc    { color: #89dceb; }
.c-h1      { color: #89b4fa; font-weight: 700; }
.c-h2      { color: #89b4fa; }
.c-h3      { color: #74c7ec; }
.c-plain   { color: #cdd6f4; }
.c-comment { color: #585b70; font-style: italic; }
.c-bash    { color: #f38ba8; }
.c-ps      { color: #fab387; }

/* Milestones image */
.milestones-img-wrap {
  margin-top: 32px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
}

.milestones-img {
  width: 100%;
  display: block;
}

/* Timeline */
.timeline-wrap {
  position: relative;
  margin-top: 32px;
  padding-left: 2px;
}

.timeline-wrap::before {
  content: '';
  position: absolute;
  left: 17px;
  top: 26px;
  bottom: 26px;
  width: 1px;
  background: linear-gradient(to bottom, color-mix(in oklab, var(--accent-blue) 60%, transparent), color-mix(in oklab, var(--accent-blue) 5%, transparent));
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  position: relative;
}

.timeline-node {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid color-mix(in oklab, var(--accent-blue) 35%, transparent);
  background: color-mix(in oklab, var(--accent-blue) 8%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline-node--last {
  border-color: var(--accent-blue);
  background: color-mix(in oklab, var(--accent-blue) 18%, transparent);
  box-shadow: 0 0 16px color-mix(in oklab, var(--accent-blue) 25%, transparent);
}

.timeline-num {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent-blue);
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.8;
}

.timeline-node--last .timeline-num {
  opacity: 1;
}

.timeline-content {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink-2);
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.timeline-content--last {
  color: var(--ink);
  font-weight: 600;
}

.lb-trigger {
  cursor: zoom-in;
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.lightbox-img {
  max-width: 92vw;
  max-height: 92vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.7);
  cursor: default;
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.2s ease;
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
