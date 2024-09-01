<template>
  <div v-if="visible" class="back-to-top" @click="scrollToTop">
    <svg class="progress-ring" width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#007acc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00aaff;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle
          class="progress-ring__circle"
          cx="40"
          cy="40"
          r="34"
          stroke-width="6"
          :stroke-dashoffset="dashOffset"
      />
    </svg>
    <img class="back-to-top-icon" src="/icon/backToTop.svg" alt="Back to Top" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const visible = ref(false)
const scrollProgress = ref(0)

const updateVisibility = () => {
  visible.value = window.scrollY > 100
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (window.scrollY / docHeight) * 100
}

const dashOffset = computed(() => {
  const circumference = 2 * Math.PI * 34 // 2 * PI * R (R = 34)
  return circumference - (scrollProgress.value / 100) * circumference
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top-icon {
  width: 40px; /* 调整图标大小 */
  height: 40px;
  z-index: 1;
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.progress-ring__circle {
  fill: none;
  stroke: url(#gradient); /* 使用渐变色 */
  stroke-width: 6; /* 增加圆环宽度 */
  stroke-dasharray: 213.6; /* 2 * PI * R (R = 34) */
  transition: stroke-dashoffset 0.25s;
  transform: rotate(-90deg); /* 使圆环从顶部开始 */
  transform-origin: 50% 50%;
}
</style>
