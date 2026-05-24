<template>
  <section class="hero" aria-label="月報封面">

    <!-- 背景環境光：紫藍漸層暈染 -->
    <div class="hero-ambient" aria-hidden="true" />

    <div class="hero-inner">

      <!-- ① Eyebrow：部門 + 日期 -->
      <div class="hero-eyebrow" style="--i:0">
        <span class="eyebrow-tag">{{ meta.department }}</span>
        <span class="eyebrow-sep" aria-hidden="true">·</span>
        <span class="eyebrow-date">
          {{ meta.year }}&nbsp;/&nbsp;{{ String(meta.month).padStart(2, '0') }}
        </span>
      </div>

      <!-- ② 主標題 H1：專案名稱，純白大字 -->
      <h1 class="hero-title" style="--i:1">{{ project.name }}</h1>

      <!-- ③ 漸層副標題：紫藍→靛藍→天藍→橘紅科技漸層 -->
      <p class="hero-sub" style="--i:2">{{ project.hero.sub }}</p>

      <!-- ④ 描述：專案簡介，淡白細字 -->
      <p class="hero-desc" style="--i:3">{{ project.description }}</p>

      <!-- ⑤ 媒體區塊：video 優先，picture 作 fallback -->
      <div
        class="hero-media"
        style="--i:4"
        role="img"
        aria-label="月報主視覺"
      >
        <!--
          Fallback 圖片（z-index 低，放在下層）
          → 將 /hero-image.webp 與 /hero-image.jpg 放入 monthly-report/public/
        -->
        <!-- 使用 :src/:srcset 動態綁定，避免 Vite 靜態解析不存在的路徑 -->
        <picture class="media-picture">
          <source :srcset="`/hero-${project.id}.webp`" type="image/webp" />
          <img
            :src="`/hero-${project.id}.jpg`"
            alt="月報主視覺"
            class="media-img"
            loading="eager"
          />
        </picture>

        <video
          v-show="!videoFailed"
          class="media-video"
          autoplay
          muted
          playsinline
          loop
          @error="videoFailed = true"
        >
          <source :src="project.hero.videoSrc ?? `/hero-${project.id}.mp4`" type="video/mp4" />
        </video>
      </div>

      <!-- ⑥ CTA：按鈕 + 說明文字（選填，不填則隱藏） -->
      <div v-if="project.hero.cta" class="hero-cta" style="--i:5">
        <button class="cta-btn" type="button">{{ project.hero.cta }}</button>
        <p v-if="project.hero.ctaPrice" class="cta-price">{{ project.hero.ctaPrice }}</p>
      </div>

      <!-- ⑦ 署名：作者 + 專案序號 -->
      <p class="hero-attribution" style="--i:6">
        {{ meta.author }}&ensp;·&ensp;專案&nbsp;{{ projectIndex }}&nbsp;/&nbsp;{{ totalProjects }}
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ReportData, Project } from '../types/report'

defineProps<{
  meta: ReportData['meta']
  project: Project
  projectIndex: number
  totalProjects: number
}>()

const videoFailed = ref(false)
</script>

<style scoped>
/* ── 入場動畫 ── */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Section 根元素 ── */
.hero {
  position: relative;
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── 背景環境光 ── */
.hero-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 80% 45% at 50% 0%,  rgba(120, 80, 240, 0.18) 0%, transparent 60%),
    radial-gradient(ellipse 55% 30% at 15% 85%,  rgba(0, 113, 227, 0.10) 0%, transparent 55%),
    radial-gradient(ellipse 40% 25% at 85% 75%,  rgba(50, 210, 242, 0.06) 0%, transparent 55%);
}

/* ── 內容容器 ── */
.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px) clamp(80px, 10vh, 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ── Stagger 動畫：透過 CSS 自訂屬性 --i 控制延遲 ── */
.hero-eyebrow,
.hero-title,
.hero-sub,
.hero-desc,
.hero-media,
.hero-cta,
.hero-attribution {
  animation: fadeSlideUp 0.85s cubic-bezier(0.25, 1, 0.5, 1) both;
  animation-delay: calc(var(--i, 0) * 0.12s + 0.06s);
}

/* ── ① Eyebrow ── */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}
.eyebrow-tag {
  background: rgba(50, 210, 242, 0.12);
  border: 1px solid rgba(50, 210, 242, 0.28);
  color: #32d2f2;
  padding: 3px 11px;
  border-radius: 100px;
  font-size: 10px;
  letter-spacing: 0.1em;
}
.eyebrow-sep { color: rgba(255, 255, 255, 0.2); }

/* ── ② 主標題 ── */
.hero-title {
  font-size: clamp(2.2rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: #fff;
  margin: 0 0 16px;
  max-width: 16ch;
}

/* ── ③ 漸層副標題 ── */
.hero-sub {
  font-size: clamp(1.6rem, 4.5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 32px;
  background: linear-gradient(
    135deg,
    #c084fc  0%,
    #818cf8 28%,
    #38bdf8 60%,
    #fb923c 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── ④ 描述 ── */
.hero-desc {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.5);
  max-width: 520px;
  margin: 0 0 56px;
}

/* ── ⑤ 媒體區塊 ── */
.hero-media {
  position: relative;
  width: 100%;
  max-width: min(880px, 100%);
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 56px;
  /* CSS 佔位背景：未放入媒體檔案前顯示此漸層 */
  background: linear-gradient(160deg, #0d0d14 0%, #111827 50%, #0a0d12 100%);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}

.media-picture,
.media-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* object-fit: cover 確保不變形 */
.media-img,
.media-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 影片在圖片上層；圖片作為靜默 fallback */
.media-video { z-index: 1; }

/* ── ⑥ CTA ── */
.hero-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 36px;
}

.cta-btn {
  padding: 13px 32px;
  border: none;
  border-radius: 100px;
  background: #0071e3;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background 0.22s cubic-bezier(0.25, 1, 0.5, 1),
    transform  0.22s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.22s cubic-bezier(0.25, 1, 0.5, 1);
}
.cta-btn:hover {
  background: #0077ed;
  transform: scale(1.05);
  box-shadow: 0 8px 28px rgba(0, 113, 227, 0.5);
}
.cta-btn:active { transform: scale(0.97); }

.cta-price {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ── ⑦ 署名 ── */
.hero-attribution {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
  margin: 0;
}

/* ── 響應式 ── */
@media (max-width: 640px) {
  .hero-title   { letter-spacing: -0.02em; }
  .hero-media   { aspect-ratio: 4 / 3; border-radius: 12px; }
  .cta-btn      { width: 100%; max-width: 240px; }
}
</style>
