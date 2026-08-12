<template>
  <!-- Each row is opened by its own header, so the only section-level control
       here is the overflow link — and only once there is overflow to explore. -->
  <SectionBlock id="work" number="02" title="Case studies">
    <template v-if="hasMore" #action>
      <RouterLink class="more" to="/selected-work">Explore more →</RouterLink>
    </template>

    <ProjectIndex :items="featured" />
  </SectionBlock>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SectionBlock from '../components/SectionBlock.vue'
import ProjectIndex from '../components/ProjectIndex.vue'
import { projects } from '../data/projects'

// Five is as long as the index reads as a shortlist; the rest live on
// /selected-work, which is only linked when there is actually a rest.
const LIMIT = 5
const featured = projects.slice(0, LIMIT)
const hasMore = projects.length > LIMIT
</script>
