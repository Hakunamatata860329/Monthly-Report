<template>
  <div class="trend-analysis">
    <div class="chart-grid">
      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-label">改善前 vs 改善後</span>
        </div>
        <VChart class="chart" :option="barOption" autoresize />
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <span class="chart-label">KPI 達成率分布</span>
        </div>
        <VChart class="chart chart--pie" :option="pieOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import type { Project } from '../types/report'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{ project: Project }>()

const COLORS = {
  before: '#d1d1d6',
  after: '#0071e3',
  good: '#34c759',  // ≥100%
  warn: '#ff9f0a',  // 51-99%
  bad: '#ff3b30',   // 0-50%
  text: '#6e6e73',
  textPrimary: '#1d1d1f',
  grid: '#e5e5ea',
}

const barOption = computed(() => {
  const kpis = props.project.kpis
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#e5e5ea',
      textStyle: { color: COLORS.textPrimary, fontSize: 13 },
    },
    legend: {
      data: ['改善前', '改善後'],
      textStyle: { color: COLORS.text, fontSize: 12 },
      right: 0,
    },
    grid: { left: 16, right: 16, bottom: 10, top: 36, containLabel: true },
    xAxis: {
      type: 'category',
      data: kpis.map(k => k.name),
      axisLine: { lineStyle: { color: COLORS.grid } },
      axisLabel: { color: COLORS.text, fontSize: 12 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: COLORS.grid, type: 'dashed' } },
      axisLabel: { color: COLORS.text, fontSize: 10 },
    },
    series: [
      {
        name: '改善前',
        type: 'bar',
        data: kpis.map(k => k.before),
        itemStyle: { color: COLORS.before, borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 48,
      },
      {
        name: '改善後',
        type: 'bar',
        data: kpis.map(k => k.after),
        itemStyle: { color: COLORS.after, borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 48,
      },
    ],
  }
})

const pieOption = computed(() => {
  const kpis = props.project.kpis
  const good = kpis.filter(k => k.achievementRate >= 100).length
  const warn = kpis.filter(k => k.achievementRate >= 51 && k.achievementRate < 100).length
  const bad = kpis.filter(k => k.achievementRate < 51).length

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e5e5ea',
      textStyle: { color: COLORS.textPrimary, fontSize: 13 },
      formatter: '{b}: {c} 項 ({d}%)',
    },
    legend: {
      orient: 'vertical' as const,
      right: 20,
      top: 'center',
      textStyle: { color: COLORS.text, fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['38%', '50%'],
        data: [
          { value: good, name: '達標 ≥100%', itemStyle: { color: COLORS.good } },
          { value: warn, name: '接近 80–99%', itemStyle: { color: COLORS.warn } },
          { value: bad, name: '未達 <80%', itemStyle: { color: COLORS.bad } },
        ].filter(d => d.value > 0),
        label: {
          show: true,
          formatter: '{d}%',
          color: COLORS.textPrimary,
          fontSize: 12,
        },
        labelLine: { lineStyle: { color: COLORS.grid } },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' } },
      },
    ],
  }
})
</script>

<style scoped>
.trend-analysis { display: flex; flex-direction: column; gap: 20px; }

.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-card {
  background: var(--bg-card);
  border: none;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s, transform 0.25s;
}
.chart-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); transform: translateY(-1px); }

.chart-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.chart-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-transform: uppercase;
}

.chart { height: 260px; width: 100%; }
.chart--pie { height: 240px; }

@media (max-width: 768px) {
  .chart-grid { grid-template-columns: 1fr; }
}
</style>
