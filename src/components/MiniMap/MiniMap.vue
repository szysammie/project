<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useNavigationStore } from '../../stores/navigation';
import { useProjectsStore } from '../../stores/projects';

const navigationStore = useNavigationStore();
const projectsStore = useProjectsStore();

const isVisible = ref(false);
const navContentRef = ref<HTMLElement | null>(null);

const handleNodeClick = (nodeId: string) => {
  navigationStore.navigateToSlide(nodeId);
};

const scrollToActiveItem = () => {
  if (!navContentRef.value) return;

  const activeElement = navContentRef.value.querySelector(
    `[data-step-id="${navigationStore.currentSlide}"]`
  ) as HTMLElement;
  if (activeElement) {
    const container = navContentRef.value;
    const containerHeight = container.clientHeight;
    const elementTop = activeElement.offsetTop;
    const elementHeight = activeElement.offsetHeight;

    const targetScrollTop = elementTop - containerHeight / 2 + elementHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    });
  }
};

const handleToggleMiniMap = () => {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    nextTick(() => {
      setTimeout(scrollToActiveItem, 500);
    });
  }
};

watch(() => navigationStore.currentSlide, () => {
  if (isVisible.value) {
    scrollToActiveItem();
  }
});

onMounted(() => {
  window.addEventListener('toggleMiniMap', handleToggleMiniMap);
});

onUnmounted(() => {
  window.removeEventListener('toggleMiniMap', handleToggleMiniMap);
});
</script>

<template>
  <div
    class="nav-list"
    :class="{ visible: isVisible, hidden: !isVisible }"
    id="miniMap"
  >
    <div class="nav-header">
      <span>
        <i class="fas fa-map"></i>
        <span class="nav-progress">
          {{ navigationStore.currentSlideIndex + 1 }}/{{ projectsStore.mapData.length }}
        </span>
      </span>
    </div>

    <div class="nav-content" ref="navContentRef">
      <div
        v-for="node in projectsStore.mapData"
        :key="node.id"
        class="nav-item"
        :class="{ active: navigationStore.currentSlide === node.id }"
        @click="handleNodeClick(node.id)"
        :data-step-id="node.id"
      >
        <span class="nav-icon">
          <i :class="node.icon"></i>
        </span>
        <span class="nav-text">{{ node.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './MiniMap.css';
</style>
