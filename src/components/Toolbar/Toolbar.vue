<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { SLIDE_IDS } from '../../constants/slideIds';
import { useNavigationStore } from '../../stores/navigation';

const navigationStore = useNavigationStore();

const isAutoplay = ref(false);
const isMiniMapVisible = ref(false);
const theme = ref<'light' | 'dark'>('light');
const autoplayTimer = ref<number | null>(null);
const autoplayInterval = 3000;

const applyTheme = (newTheme: 'light' | 'dark') => {
  const root = document.documentElement;
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  const themeColor = newTheme === 'light' ? '#F0F2FF' : '#0A0A0F';
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  const metaMsNavButton = document.querySelector('meta[name="msapplication-navbutton-color"]');

  if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);
  if (metaAppleStatusBar) metaAppleStatusBar.setAttribute('content', themeColor);
  if (metaMsNavButton) metaMsNavButton.setAttribute('content', themeColor);
};

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  applyTheme(theme.value);
};

const handlePrev = () => {
  if ((window as any).impress) (window as any).impress().prev();
};

const handleNext = () => {
  if ((window as any).impress) (window as any).impress().next();
};

const handleOverview = () => {
  if ((window as any).impress) (window as any).impress().goto(SLIDE_IDS.OVERVIEW);
};

const toggleAutoplay = () => {
  isAutoplay.value = !isAutoplay.value;
  if (isAutoplay.value) {
    autoplayTimer.value = window.setInterval(() => {
      handleNext();
    }, autoplayInterval);
  } else {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value);
      autoplayTimer.value = null;
    }
  }
};

const toggleMiniMap = () => {
  const event = new CustomEvent('toggleMiniMap');
  window.dispatchEvent(event);
};

const handleMiniMapToggle = () => {
  isMiniMapVisible.value = !isMiniMapVisible.value;
};

onMounted(() => {
  const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  theme.value = savedTheme;
  applyTheme(savedTheme);

  window.addEventListener('toggleMiniMap', handleMiniMapToggle);
});

onUnmounted(() => {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value);
  window.removeEventListener('toggleMiniMap', handleMiniMapToggle);
});

const themeIcon = computed(() => (theme.value === 'light' ? 'fas fa-moon' : 'fas fa-sun'));
const themeTitle = computed(() =>
  theme.value === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
);
</script>

<template>
  <div class="toolbar">
    <button
      class="toolbar-btn cursor-target"
      @click="handlePrev"
      data-tooltip="Previous"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      class="toolbar-btn cursor-target"
      @click="handleNext"
      data-tooltip="Next"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
    <button
      class="toolbar-btn cursor-target"
      :class="{ 'autoplay-active': isAutoplay }"
      @click="toggleAutoplay"
      :data-tooltip="isAutoplay ? 'Pause autoplay' : 'Start autoplay'"
    >
      <i class="fas" :class="isAutoplay ? 'fa-pause' : 'fa-play'"></i>
      <div v-if="isAutoplay" class="autoplay-indicator"></div>
    </button>
    <button
      class="toolbar-btn cursor-target"
      @click="handleOverview"
      data-tooltip="Overview"
    >
      <i class="fas fa-th-large"></i>
    </button>
    <button
      class="toolbar-btn cursor-target"
      :class="{ 'minimap-active': isMiniMapVisible }"
      @click="toggleMiniMap"
      :data-tooltip="isMiniMapVisible ? 'Hide minimap' : 'Show minimap'"
    >
      <i class="fas fa-map"></i>
      <div v-if="isMiniMapVisible" class="minimap-indicator"></div>
    </button>
    <button
      class="toolbar-btn theme-btn cursor-target"
      @click="toggleTheme"
      :data-tooltip="themeTitle"
    >
      <i :class="themeIcon"></i>
      <div class="theme-indicator"></div>
    </button>
  </div>
</template>

<style scoped>
@import './Toolbar.css';
</style>
