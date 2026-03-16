<script setup lang="ts">
import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';
</script>

<template>
  <div
    :id="SLIDE_IDS.OVERVIEW"
    class="step"
    :data-x="SLIDE_POSITIONS.OVERVIEW.x"
    :data-y="SLIDE_POSITIONS.OVERVIEW.y"
    :data-z="SLIDE_POSITIONS.OVERVIEW.z"
    :data-scale="SLIDE_POSITIONS.OVERVIEW.scale"
  ></div>
</template>
