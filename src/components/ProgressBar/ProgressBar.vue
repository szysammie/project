<script setup lang="ts">
import { useNavigationStore } from '../../stores/navigation';

const navigationStore = useNavigationStore();
</script>

<template>
  <div
    class="progress-bar"
    id="progress"
    :style="{ width: `${navigationStore.progress * 100}%` }"
  ></div>
</template>

<style scoped>
@import './ProgressBar.css';
</style>
