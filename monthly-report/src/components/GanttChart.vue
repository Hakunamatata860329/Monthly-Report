<template>
  <div class="gantt">
    <!-- Date axis -->
    <div class="gantt-head">
      <div class="label-col" aria-hidden="true" />
      <div class="axis-col">
        <span
          v-for="tick in ticks"
          :key="tick.ts"
          class="axis-tick"
          :style="{ left: pct(tick.ts) + '%' }"
        >{{ tick.label }}</span>
        <div
          v-if="todayVisible"
          class="today-pin"
          :style="{ left: pct(todayMs) + '%' }"
        >
          <span class="today-tag">今日</span>
          <div class="today-needle" />
        </div>
      </div>
    </div>

    <!-- Task rows -->
    <div class="gantt-body">
      <div v-for="task in tasks" :key="task.id" class="gantt-row">
        <div class="gantt-label" :title="task.name">{{ task.name }}</div>
        <div class="gantt-track">
          <div
            v-for="tick in ticks"
            :key="tick.ts"
            class="grid-vline"
            :style="{ left: pct(tick.ts) + '%' }"
          />
          <div
            v-if="todayVisible"
            class="today-vline"
            :style="{ left: pct(todayMs) + '%' }"
          />
          <div
            class="gantt-bar"
            :class="`bar-${task.status}`"
            :style="{
              left: pct(ms(task.startDate)) + '%',
              width: Math.max(pct(ms(task.endDate)) - pct(ms(task.startDate)), 1.5) + '%',
            }"
            :aria-label="`${task.name} ${task.startDate} 至 ${task.endDate}`"
          />
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="gantt-legend">
      <span class="legend-item">
        <span class="legend-swatch swatch-done" />Done
      </span>
      <span class="legend-item">
        <span class="legend-swatch swatch-in-progress" />In Progress
      </span>
      <span class="legend-item">
        <span class="legend-swatch swatch-plan" />Plan
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '../types/report'

const props = defineProps<{ tasks: Task[] }>()

function ms(date: string) {
  return new Date(date).getTime()
}

const minMs = computed(() => Math.min(...props.tasks.map(t => ms(t.startDate))))
const maxMs = computed(() => Math.max(...props.tasks.map(t => ms(t.endDate))))

const todayMs = new Date().setHours(0, 0, 0, 0) as number
const todayVisible = computed(() => todayMs >= minMs.value && todayMs <= maxMs.value)

function pct(ts: number) {
  return ((ts - minMs.value) / (maxMs.value - minMs.value)) * 100
}

const ticks = computed(() => {
  const DAY = 86_400_000
  const totalDays = (maxMs.value - minMs.value) / DAY
  const step = Math.ceil(totalDays / 6)
  const result: { ts: number; label: string }[] = []
  let ts = minMs.value
  while (ts <= maxMs.value) {
    const d = new Date(ts)
    result.push({ ts, label: `${d.getMonth() + 1}/${d.getDate()}` })
    ts += step * DAY
  }
  return result
})
</script>

<style scoped>
.gantt {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Header axis ── */
.gantt-head {
  display: flex;
  align-items: flex-end;
  margin-bottom: 6px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.label-col {
  width: 148px;
  flex-shrink: 0;
}

.axis-col {
  flex: 1;
  position: relative;
  height: 28px;
}

.axis-tick {
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  white-space: nowrap;
  pointer-events: none;
}

.today-pin {
  position: absolute;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.today-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.06em;
  margin-bottom: 2px;
}

.today-needle {
  width: 1px;
  height: 6px;
  background: var(--accent);
}

/* ── Body rows ── */
.gantt-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.gantt-row {
  display: flex;
  align-items: center;
  height: 34px;
}

.gantt-label {
  width: 148px;
  flex-shrink: 0;
  font-size: 12.5px;
  color: var(--text-secondary);
  padding-right: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}

.gantt-track {
  flex: 1;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.grid-vline {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 1px;
  background: var(--border);
  opacity: 0.6;
  pointer-events: none;
}

.today-vline {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--accent);
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}

.gantt-bar {
  position: absolute;
  height: 22px;
  border-radius: 3px;
  z-index: 2;
  transition: filter 0.15s, opacity 0.15s;
}
.gantt-bar:hover {
  filter: brightness(1.15);
}

.bar-done {
  background: var(--green);
  opacity: 0.85;
}

.bar-in-progress {
  background: var(--blue);
  opacity: 0.85;
}

.bar-plan {
  background: rgba(0, 0, 0, 0.08);
  border: 1px dashed var(--border-bright);
}

/* ── Legend ── */
.gantt-legend {
  display: flex;
  gap: 18px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.legend-swatch {
  width: 18px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.swatch-done { background: var(--green); opacity: 0.85; }
.swatch-in-progress { background: var(--blue); opacity: 0.82; }
.swatch-plan { background: rgba(0,0,0,0.08); border: 1px dashed var(--border-bright); }
</style>
