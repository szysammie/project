<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Props {
  targetSelector?: string;
  hideDefaultCursor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  targetSelector: '.cursor-target',
  hideDefaultCursor: true,
});

const cursorPos = ref({ x: 0, y: 0 });
const isTargeting = ref(false);
const targetBounds = ref<DOMRect | null>(null);
const isVisible = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  cursorPos.value = { x: e.clientX, y: e.clientY };
  if (!isVisible.value) {
    isVisible.value = true;
  }
};

const handleMouseOver = (e: MouseEvent) => {
  const directTarget = e.target as HTMLElement;
  let current: HTMLElement | null = directTarget;
  let activeTarget: HTMLElement | null = null;

  while (current && current !== document.body) {
    if (current.matches && current.matches(props.targetSelector)) {
      activeTarget = current;
      break;
    }
    current = current.parentElement;
  }

  if (!activeTarget) return;

  isTargeting.value = true;
  targetBounds.value = activeTarget.getBoundingClientRect();

  const handleMouseLeave = () => {
    isTargeting.value = false;
    targetBounds.value = null;
    activeTarget?.removeEventListener('mouseleave', handleMouseLeave);
  };

  activeTarget.addEventListener('mouseleave', handleMouseLeave);
};

onMounted(() => {
  if (props.hideDefaultCursor) {
    document.body.style.cursor = 'none';
  }

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseover', handleMouseOver, { passive: true });
});

onUnmounted(() => {
  document.body.style.cursor = '';
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseover', handleMouseOver);
});

const cornerPositions = computed(() => {
  if (!targetBounds.value) return null;

  const cornerSize = 12;
  const borderWidth = 3;

  return {
    topLeft: {
      x: targetBounds.value.left - cursorPos.value.x - borderWidth,
      y: targetBounds.value.top - cursorPos.value.y - borderWidth,
    },
    topRight: {
      x: targetBounds.value.right - cursorPos.value.x + borderWidth - cornerSize,
      y: targetBounds.value.top - cursorPos.value.y - borderWidth,
    },
    bottomRight: {
      x: targetBounds.value.right - cursorPos.value.x + borderWidth - cornerSize,
      y: targetBounds.value.bottom - cursorPos.value.y + borderWidth - cornerSize,
    },
    bottomLeft: {
      x: targetBounds.value.left - cursorPos.value.x - borderWidth,
      y: targetBounds.value.bottom - cursorPos.value.y + borderWidth - cornerSize,
    },
  };
});
</script>

<template>
  <div
    class="target-cursor"
    :style="{
      transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.2s ease',
    }"
  >
    <div class="target-cursor-center" :class="{ spinning: !isTargeting }" />
    <div
      class="target-cursor-corner target-cursor-corner--top-left"
      :style="{
        transform: isTargeting && cornerPositions ? `translate(${cornerPositions.topLeft.x}px, ${cornerPositions.topLeft.y}px)` : undefined,
      }"
    />
    <div
      class="target-cursor-corner target-cursor-corner--top-right"
      :style="{
        transform: isTargeting && cornerPositions ? `translate(${cornerPositions.topRight.x}px, ${cornerPositions.topRight.y}px)` : undefined,
      }"
    />
    <div
      class="target-cursor-corner target-cursor-corner--bottom-right"
      :style="{
        transform: isTargeting && cornerPositions ? `translate(${cornerPositions.bottomRight.x}px, ${cornerPositions.bottomRight.y}px)` : undefined,
      }"
    />
    <div
      class="target-cursor-corner target-cursor-corner--bottom-left"
      :style="{
        transform: isTargeting && cornerPositions ? `translate(${cornerPositions.bottomLeft.x}px, ${cornerPositions.bottomLeft.y}px)` : undefined,
      }"
    />
  </div>
</template>

<style scoped>
@import './target-cursor.css';
</style>
