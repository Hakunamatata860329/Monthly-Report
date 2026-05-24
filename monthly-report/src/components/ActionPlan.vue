<template>
  <div class="action-plan">
    <div v-for="(item, i) in items" :key="i" class="plan-card" :class="`priority-${item.priority}`">
      <div class="plan-left">
        <div class="plan-index">{{ String(i + 1).padStart(2, '0') }}</div>
        <div class="priority-dot" :class="`dot-${item.priority}`"></div>
      </div>

      <div class="plan-body">
        <div class="plan-top">
          <h4 class="plan-goal">{{ item.goal }}</h4>
          <div class="plan-badges">
            <span class="priority-badge" :class="`priority-${item.priority}`">
              {{ PRIORITY_LABELS[item.priority] }}
            </span>
            <span class="owner-badge">{{ item.owner }}</span>
            <span class="date-badge"><SvgIcon name="calendar" :size="12" />{{ item.timeBound }}</span>
          </div>
        </div>

        <div class="smart-grid">
          <div class="smart-item">
            <span class="smart-key">S</span>
            <span class="smart-label">Specific</span>
            <span class="smart-value">{{ item.specific }}</span>
          </div>
          <div class="smart-item">
            <span class="smart-key">M</span>
            <span class="smart-label">Measurable</span>
            <span class="smart-value">{{ item.measurable }}</span>
          </div>
          <div class="smart-item">
            <span class="smart-key">A</span>
            <span class="smart-label">Achievable</span>
            <span class="smart-value">{{ item.achievable }}</span>
          </div>
          <div class="smart-item">
            <span class="smart-key">R</span>
            <span class="smart-label">Realistic</span>
            <span class="smart-value">{{ item.realistic }}</span>
          </div>
          <div class="smart-item">
            <span class="smart-key">T</span>
            <span class="smart-label">Time-bound</span>
            <span class="smart-value">{{ item.timeBound }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
import type { ActionItem } from '../types/report'

defineProps<{ items: ActionItem[] }>()

const PRIORITY_LABELS: Record<string, string> = {
  high: 'HIGH',
  medium: 'MED',
  low: 'LOW',
}
</script>

<style scoped>
.action-plan { display: flex; flex-direction: column; gap: 20px; }

.plan-card {
  display: flex;
  gap: 0;
  background: var(--bg-card);
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s, transform 0.25s;
}
.plan-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); transform: translateY(-1px); }

.plan-left {
  width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 0;
  gap: 12px;
  border-right: 1px solid var(--border);
  background: var(--bg-section);
  flex-shrink: 0;
}

.plan-index {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
  writing-mode: vertical-lr;
  letter-spacing: 0.1em;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-high { background: var(--red); box-shadow: 0 0 6px var(--red); }
.dot-medium { background: var(--yellow); box-shadow: 0 0 6px var(--yellow); }
.dot-low { background: var(--blue); box-shadow: 0 0 6px var(--blue); }

.plan-body {
  flex: 1;
  padding: 28px 32px;
  min-width: 0;
}

.plan-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.plan-goal {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  min-width: 200px;
  line-height: 1.4;
}

.plan-badges { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.priority-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: 700;
}
.priority-badge.priority-high { background: var(--red-dim); color: var(--red); }
.priority-badge.priority-medium { background: var(--yellow-dim); color: var(--yellow); }
.priority-badge.priority-low { background: var(--blue-dim); color: var(--blue); }

.owner-badge {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-secondary);
}

.date-badge {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.smart-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

.smart-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.smart-key {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.smart-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.smart-value {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .smart-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .smart-grid { grid-template-columns: 1fr; }
  .plan-left { display: none; }
}
</style>
