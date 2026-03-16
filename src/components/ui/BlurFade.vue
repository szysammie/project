<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  inView?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 0.4,
  yOffset: 6,
  blur: '6px',
  inView: false,
});

const isVisible = ref(false);
const target = ref<HTMLElement | null>(null);

onMounted(() => {
  if (props.inView) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (target.value) {
      observer.observe(target.value);
    }
  } else {
    isVisible.value = true;
  }
});
</script>

<template>
  <div
    ref="target"
    class="blur-fade"
    :class="{ 'is-visible': isVisible }"
    :style="{
      '--delay': `${delay}s`,
      '--duration': `${duration}s`,
      '--y-offset': `${yOffset}px`,
      '--blur': blur,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.blur-fade {
  opacity: 0;
  filter: blur(var(--blur));
  transform: translateY(var(--y-offset));
  transition: opacity var(--duration) ease-out,
              filter var(--duration) ease-out,
              transform var(--duration) ease-out;
  transition-delay: var(--delay);
}

.blur-fade.is-visible {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0);
}
</style>
