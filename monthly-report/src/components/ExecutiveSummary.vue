<template>
  <div class="exec-summary">

    <!-- ── Progress: Apple-style dark feature section ── -->
    <section class="section-mx-scroll">
      <div class="viewport-content">

        <!-- Hero headline (split for staggered animation) -->
        <hgroup class="mx-headline-group">
          <h2
            class="mx-headline-1"
            tabindex="-1"
            data-focus-expression="headline-1"
          >{{ data.headline1 }}</h2>
          <h2
            class="mx-headline-2"
            tabindex="-1"
            data-focus-expression="headline-2"
          >{{ data.headline2 }}</h2>
        </hgroup>

        <!-- Body content block -->
        <div class="mx-chip-under">

          <!-- mx-copy-1: headline3 -->
          <p
            v-if="data.headline3"
            class="mx-copy-1"
            tabindex="0"
            data-focus-expression="copy-1"
            v-html="highlightNumbers(data.headline3)"
          ></p>

          <!-- Stat chips: extracted quantitative highlights -->
          <div v-if="data.chips.length" class="mx-chip-stat-container">
            <div
              v-for="chip in data.chips"
              :key="chip.value"
              class="mx-chip-ai"
              tabindex="-1"
              :data-focus-expression="`chip-${chip.value}`"
            >
              <div class="mx-chip-stat">{{ chip.value }}</div>
              <p class="mx-chip-desc">{{ chip.desc }}</p>
            </div>
          </div>

          <!-- mx-copy-2: progress items -->
          <ul
            v-if="data.progress.length"
            class="mx-copy-2"
            tabindex="0"
            data-focus-expression="copy-2"
          >
            <li
              v-for="(item, i) in data.progress"
              :key="i"
              class="copy-2-item"
            >
              <span class="item-bullet"></span>
              <span v-html="highlightNumbers(item)"></span>
            </li>
          </ul>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { headline1: string; headline2: string; headline3: string; chips: { value: string; desc: string }[]; progress: string[] }
}>()

// Wrap percentage and unit numbers in highlight spans
function highlightNumbers(text: string): string {
  return text
    .replace(/([\d.]+%)/g, '<span class="highlight">$1</span>')
    .replace(/(\d+)\s*(分鐘|小時|天|倍)/g, '<span class="highlight">$1</span>$2')
}
</script>

<style scoped>
/* ── Layout wrapper ── */
.exec-summary {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Outer dark section ── */
.section-mx-scroll {
  /* Dark-mode text token overrides — scoped so light-mode vars are unaffected */
  --text-primary:   #f5f5f7;
  --text-secondary: #e8e8ed;
  --text-muted:     #86868b;

  background: #000;
  border-radius: 20px;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(80px, 12vw, 160px) clamp(24px, 5vw, 60px);
  overflow: hidden;
  position: relative;
}

/* Subtle green ambient glow at top */
.section-mx-scroll::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 50% at 50% -10%,
    rgba(0, 113, 227, 0.18) 0%,
    transparent 65%
  );
  pointer-events: none;
}

/* ── Viewport content: centered column ── */
.viewport-content {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ── Eyebrow ── */
.mx-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #32d2f2;
  margin: 0 0 20px;
}

/* ── Hero headline ── */
.mx-headline-group {
  margin: 0 0 64px;
}

.mx-headline-1,
.mx-headline-2 {
  font-size: clamp(3.5rem, 8vw, 6.25rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.08;
  margin: 0;
}

.mx-headline-1 {
  color: var(--text-primary);
}

/* Headline 2: gradient accent — ready for text-animation on scroll */
.mx-headline-2 {
  background: linear-gradient(90deg, #0071e3 0%, #32d2f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Body block ── */
.mx-chip-under {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

/* ── Copy 1: primary intro paragraph ── */
.mx-copy-1 {
  max-width: 640px;
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
}

/* Highlighted numbers (injected via v-html) */
:deep(.highlight) {
  color: var(--text-primary);
  font-weight: 700;
}

:deep(.nowrap) {
  white-space: nowrap;
}

/* ── Stat chips ── */
.mx-chip-stat-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.mx-chip-ai {
  flex: 1 1 150px;
  max-width: 220px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(50, 210, 242, 0.2);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.mx-chip-ai:hover {
  background: rgba(50, 210, 242, 0.08);
  border-color: rgba(50, 210, 242, 0.45);
}

/* Big bold metric number */
.mx-chip-stat {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #0071e3 0%, #32d2f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Footnote label below stat */
.mx-chip-desc {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
}

/* ── Copy 2: secondary bullet items ── */
.mx-copy-2 {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

.copy-2-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: clamp(0.875rem, 1.8vw, 0.975rem);
  line-height: 1.65;
  color: var(--text-muted);
}

.item-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #32d2f2;
  flex-shrink: 0;
  margin-top: 7px;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .mx-chip-ai {
    flex: 1 1 110px;
  }
}

@media (max-width: 640px) {
  .viewport-content,
  .mx-copy-1,
  .mx-copy-2 {
    text-align: left;
  }

  .mx-chip-ai {
    flex: 1 1 100%;
    max-width: none;
  }
}
</style>
