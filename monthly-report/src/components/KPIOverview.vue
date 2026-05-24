<template>
  <div class="kpi-overview">
    <div v-for="kpi in project.kpis" :key="kpi.name" class="kpi-card" :class="rateClass(kpi.achievementRate)">
      <div class="kpi-top">
        <div class="kpi-meta">
          <span class="kpi-category">{{ kpi.category === 'timeEfficiency' ? '時間效益' : '軟體品質' }}</span>
          <span class="rate-badge" :class="rateClass(kpi.achievementRate)">{{ kpi.achievementRate }}%</span>
        </div>
        <h3 class="kpi-name">{{ kpi.name }}</h3>
      </div>

      <div class="kpi-values">
        <div class="val-block">
          <span class="val-label">改善前</span>
          <span class="val-num val-before">{{ kpi.before }}<span class="unit">{{ kpi.unit }}</span></span>
        </div>
        <div class="val-arrow">→</div>
        <div class="val-block">
          <span class="val-label">改善後</span>
          <span class="val-num val-after" :class="rateClass(kpi.achievementRate)">{{ kpi.after }}<span class="unit">{{ kpi.unit }}</span></span>
        </div>
        <div class="val-block val-target">
          <span class="val-label">目標</span>
          <span class="val-num">{{ kpi.target }}<span class="unit">{{ kpi.unit }}</span></span>
        </div>
      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          :class="rateClass(kpi.achievementRate)"
          :style="{ width: Math.min(kpi.achievementRate, 100) + '%' }"
        ></div>
      </div>
      <div class="progress-label">達成率 {{ kpi.achievementRate }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../types/report'

defineProps<{ project: Project }>()

function rateClass(rate: number) {
  if (rate >= 100) return 'rate-good'
  if (rate >= 51) return 'rate-warn'
  return 'rate-bad'
}
</script>

<style scoped>
.kpi-overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.kpi-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s, transform 0.25s;
  border-top: 3px solid transparent;
}
.kpi-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.12); transform: translateY(-1px); }
.kpi-card.rate-good { border-top-color: var(--green); }
.kpi-card.rate-warn { border-top-color: var(--yellow); }
.kpi-card.rate-bad { border-top-color: var(--red); }

.kpi-top { margin-bottom: 20px; }

.kpi-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.kpi-category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.rate-badge {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.rate-badge.rate-good { background: var(--green-dim); color: var(--green); }
.rate-badge.rate-warn { background: var(--yellow-dim); color: var(--yellow); }
.rate-badge.rate-bad { background: var(--red-dim); color: var(--red); }

.kpi-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.kpi-values {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.val-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.val-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.val-num {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-secondary);
  line-height: 1;
}
.val-before { color: var(--text-muted); }
.val-after.rate-good { color: var(--green); }
.val-after.rate-warn { color: var(--yellow); }
.val-after.rate-bad { color: var(--red); }
.val-target { margin-left: auto; }
.val-target .val-num { font-size: 16px; color: var(--text-muted); }

.unit {
  font-size: 12px;
  font-weight: 400;
  margin-left: 2px;
  color: var(--text-muted);
}

.val-arrow {
  font-size: 18px;
  color: var(--border-bright);
  flex-shrink: 0;
}

.progress-track {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}
.progress-fill.rate-good { background: var(--green); }
.progress-fill.rate-warn { background: var(--yellow); }
.progress-fill.rate-bad { background: var(--red); }

.progress-label {
  font-size: 12px;
  color: var(--text-muted);
  text-align: right;
}
</style>
