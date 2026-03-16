<script setup lang="ts">
import type { Project } from '../../types/project';
import ProjectCard from '../ProjectCard/ProjectCard.vue';

const props = defineProps<{
  project: Project;
}>();

const { position } = props.project;

const slideProps: { [key: string]: string | number } = {
  'data-x': position.x,
  'data-y': position.y,
  'data-z': position.z || 0,
};

if (position.rotate) {
  slideProps['data-rotate'] = position.rotate;
}
if (position.rotateY) {
  slideProps['data-rotate-y'] = position.rotateY;
}
</script>

<template>
  <div :id="project.id" class="step" v-bind="slideProps">
    <ProjectCard :project="project" />
  </div>
</template>
