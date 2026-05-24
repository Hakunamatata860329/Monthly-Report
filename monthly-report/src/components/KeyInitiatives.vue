<template>
  <div class="initiatives">
    <!-- Impact Row -->
    <div class="impact-row">
      <div v-for="kpi in project.kpis" :key="kpi.name" class="impact-card" :class="rateClass(kpi.achievementRate)">
        <div class="impact-label">{{ kpi.name }}</div>
        <div class="impact-arrow">
          <span class="val val-before">{{ kpi.before }}{{ kpi.unit }}</span>
          <span class="arrow">→</span>
          <span class="val val-after" :class="rateClass(kpi.achievementRate)">{{ kpi.after }}{{ kpi.unit }}</span>
        </div>
        <div class="impact-rate" :class="rateClass(kpi.achievementRate)">
          達成率 {{ kpi.achievementRate }}%
        </div>
      </div>

      <div class="impact-note">
        <SvgIcon name="zap" :size="14" class="note-icon" />
        <span>{{ project.impact }}</span>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <div class="gantt-wrap">
        <div class="chart-label">任務時程甘特圖</div>
        <GanttChart :tasks="project.tasks" />
      </div>
      <div class="pie-wrap">
        <div class="chart-label">任務狀態分布</div>
        <VChart class="pie-chart" :option="pieOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
import GanttChart from './GanttChart.vue'
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import type { Project } from '../types/report'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const props = defineProps<{ project: Project }>()

const STATUS_COLORS: Record<string, string> = {
  done: '#34c759',
  'in-progress': '#0071e3',
  plan: '#d1d1d6',
}

function rateClass(rate: number) {
  if (rate >= 100) return 'rate-good'
  if (rate >= 51) return 'rate-warn'
  return 'rate-bad'
}

const pieOption = computed(() => {
  const counts: Record<string, number> = { done: 0, 'in-progress': 0, plan: 0 }
  props.project.tasks.forEach(t => counts[t.status]++)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e5e5ea',
      textStyle: { color: '#1d1d1f', fontSize: 12 },
      formatter: '{b}: {c} 項 ({d}%)',
    },
    legend: {
      orient: 'vertical' as const,
      bottom: 0,
      left: 'center',
      textStyle: { color: '#6e6e73', fontSize: 13 },
      itemGap: 10,
    },
    series: [
      {
        type: 'pie' as const,
        radius: ['38%', '62%'],
        center: ['50%', '42%'],
        data: [
          { value: counts.done, name: 'Done', itemStyle: { color: STATUS_COLORS.done } },
          { value: counts['in-progress'], name: 'In Progress', itemStyle: { color: STATUS_COLORS['in-progress'] } },
          { value: counts.plan, name: 'Plan', itemStyle: { color: STATUS_COLORS.plan } },
        ].filter(d => d.value > 0),
        label: {
          show: true,
          formatter: '{d}%',
          color: '#1d1d1f',
          fontSize: 13,
        },
        labelLine: { lineStyle: { color: '#e5e5ea' } },
        emphasis: {
          itemStyle: { shadowBlur: 8, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.15)' },
        },
      },
    ],
  }
})
</script>

<style scoped>
.initiatives { display: flex; flex-direction: column; gap: 20px; }

/* Impact Row */
.impact-row {
  display: flex;
  align-items: stretch;
  gap: 16px;
  flex-wrap: wrap;
}

.impact-card {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  min-width: 180px;
  border-top: 3px solid transparent;
  flex: 1;
}
.impact-card.rate-good { border-top-color: var(--green); }
.impact-card.rate-warn { border-top-color: var(--yellow); }
.impact-card.rate-bad { border-top-color: var(--red); }

.impact-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 10px;
}

.impact-arrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 18px;
  margin-bottom: 8px;
}
.val-before { color: var(--text-muted); text-decoration: line-through; }
.arrow { color: var(--border-bright); }
.val-after.rate-good { color: var(--green); font-weight: 700; }
.val-after.rate-warn { color: var(--yellow); font-weight: 700; }
.val-after.rate-bad { color: var(--red); font-weight: 700; }

.impact-rate {
  font-size: 13px;
  font-weight: 600;
}
.impact-rate.rate-good { color: var(--green); }
.impact-rate.rate-warn { color: var(--yellow); }
.impact-rate.rate-bad { color: var(--red); }

.impact-note {
  flex: 2;
  min-width: 240px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.65;
  background: var(--bg-card);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
}
.note-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 16px;
}
.gantt-wrap {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
}
.pie-wrap {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
}
.chart-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.pie-chart { height: 230px; width: 100%; }

@media (max-width: 900px) {
  .charts-row { grid-template-columns: 1fr; }
}
</style>
