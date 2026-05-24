<template>
  <div class="summary-grid">
    <div class="summary-card progress-card">
      <div class="card-header">
        <SvgIcon name="check-circle" :size="20" class="card-icon" />
        <span class="card-title">Progress</span>
        <span class="card-count">{{ data.progress.length }}</span>
      </div>
      <ul class="item-list">
        <li v-for="(item, i) in data.progress" :key="i" class="item">
          <span class="item-dot"></span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <div class="summary-card problem-card">
      <div class="card-header">
        <SvgIcon name="alert-triangle" :size="20" class="card-icon" />
        <span class="card-title">Problem</span>
        <span class="card-count">{{ data.problems.length }}</span>
      </div>
      <ul class="item-list">
        <li v-for="(item, i) in data.problems" :key="i" class="item">
          <span class="item-dot"></span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

defineProps<{
  data: { progress: string[]; problems: string[] }
}>()
</script>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.summary-card {
  border-radius: 18px;
  padding: 32px;
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s, transform 0.25s;
}
.summary-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); transform: translateY(-1px); }

.progress-card {
  background: linear-gradient(135deg, rgba(52, 199, 89, 0.06) 0%, var(--bg-card) 60%);
}

.problem-card {
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.05) 0%, var(--bg-card) 60%);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}


.card-icon { flex-shrink: 0; }
.progress-card .card-icon { color: var(--green); }
.problem-card .card-icon { color: var(--red); }

.card-title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  flex: 1;
}
.progress-card .card-title { color: var(--green); }
.problem-card .card-title { color: var(--red); }

.card-count {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: 700;
}
.progress-card .card-count {
  background: var(--green-dim);
  color: var(--green);
}
.problem-card .card-count {
  background: var(--red-dim);
  color: var(--red);
}

.item-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.item-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 7px;
}
.progress-card .item-dot { background: var(--green); }
.problem-card .item-dot { background: var(--red); }

@media (max-width: 768px) {
  .summary-grid { grid-template-columns: 1fr; }
}
</style>
