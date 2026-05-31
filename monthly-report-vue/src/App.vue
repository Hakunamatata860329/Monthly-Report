<template>
  <div :data-theme="theme" class="app-container">
    <!-- ========================= TOP BAR ========================= -->
    <header class="topbar">
      <div class="brand">Monthly Report · <b>{{ author.name }}</b></div>

      <nav class="month-selector">
        <button
          v-for="m in [report.month]"
          :key="m"
          class="month-btn"
          :class="{ active: currentMonth === m }"
          @click="currentMonth = m"
        >
          {{ m }}
        </button>
      </nav>

      <div class="actions">
        <button class="theme-toggle" @click="toggleTheme">
          <span class="dot"></span>
          <span>{{ theme }}</span>
        </button>
      </div>
    </header>

    <main class="variation active v2">
      <EditorialView @section-change="updateEditorialProgress" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import EditorialView from './components/EditorialView.vue'
import { author, report } from './data/report'

const theme = ref(localStorage.getItem('mr-theme') || 'light')
const currentMonth = ref(report.month)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('mr-theme', theme.value)
}

const updateEditorialProgress = (data: { label: string, index: number, total: number }) => {
  // This could be used for a global progress bar if needed, 
  // but it's handled inside EditorialView for now to match wireframe.
}

const markVisibleNow = () => {
  const sections = document.querySelectorAll('.v2-sec')
  sections.forEach((s) => {
    const r = s.getBoundingClientRect()
    if (r.top < window.innerHeight + 100 && r.bottom > -100) {
      s.classList.add('is-loaded', 'is-visible')
    }
  })
}

onMounted(() => {
  document.body.setAttribute('data-theme', theme.value)
  
  const sectionReveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible')
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 })

  const observeSections = () => {
    document.querySelectorAll('.v2-sec').forEach(s => sectionReveal.observe(s))
  }

  observeSections()
  markVisibleNow()
})

watch(theme, (newTheme) => {
  document.body.setAttribute('data-theme', newTheme)
})
</script>

<style>
@import './assets/wireframe.css';

/* Fix for Vue app container to allow data-theme on it or body */
.app-container {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  transition: background 0.25s ease, color 0.25s ease;
}

body {
  margin: 0;
}
</style>
