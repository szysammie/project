<script setup lang="ts">
import { onMounted } from 'vue';
import { useProjectsStore } from './stores/projects';
import { useImpress } from './composables/useImpress';
import { IMPRESS_CONFIG } from './constants/impressConfig';

import ProgressBar from './components/ProgressBar/ProgressBar.vue';
import TitleSlide from './components/TitleSlide/TitleSlide.vue';
import ProjectSlide from './components/ProjectSlide/ProjectSlide.vue';
import OverviewSlide from './components/OverviewSlide/OverviewSlide.vue';
import MiniMap from './components/MiniMap/MiniMap.vue';
import Toolbar from './components/Toolbar/Toolbar.vue';
import TargetCursor from './components/ui/TargetCursor.vue';

const projectsStore = useProjectsStore();
const { navigateToSlide } = useImpress();

onMounted(() => {
  projectsStore.fetchGitHubStars();
});
</script>

<template>
  <div class="App">
    <ProgressBar />

    <div
      id="impress"
      :data-transition-duration="IMPRESS_CONFIG.TRANSITION_DURATION"
      :data-max-scale="IMPRESS_CONFIG.MAX_SCALE"
      :data-min-scale="IMPRESS_CONFIG.MIN_SCALE"
      :data-perspective="IMPRESS_CONFIG.PERSPECTIVE"
      :data-width="IMPRESS_CONFIG.WIDTH"
      :data-height="IMPRESS_CONFIG.HEIGHT"
    >
      <TitleSlide />

      <ProjectSlide
        v-for="project in projectsStore.projects"
        :key="project.id"
        :project="project"
      />

      <OverviewSlide />
    </div>

    <MiniMap />
    <Toolbar />

    <TargetCursor :hide-default-cursor="true" />
  </div>
</template>

<style>
@import './App.css';
</style>
