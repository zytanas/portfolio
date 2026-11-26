<template>
  <!-- Four projects, one strip. The homepage's job here is to show the work is
       real and get you to the studies — not to be the index — so the section is
       a single control: point at a panel, it opens. Everything past the fourth
       project is behind "Explore more". -->
  <SectionBlock id="work" number="02" title="Case studies">
    <template v-if="hasMore" #action>
      <RouterLink class="more" to="/selected-work">Explore more →</RouterLink>
    </template>

    <ProjectPanels :items="featured" />
  </SectionBlock>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SectionBlock from '../components/SectionBlock.vue'
import ProjectPanels from '../components/ProjectPanels.vue'
import { projects } from '../data/projects'

/* The cut point for the tier described at the top of data/projects.js. Four is
   the most the strip can hold before the closed spines stop leaving the open
   panel room to say anything: at the 900px breakpoint the open panel still gets
   ~4.2/7.2 of the row (~480px), above the body's 420px text measure, and each
   spine ~115px, above its 76px floor. */
const FEATURED = 4

const featured = projects.slice(0, FEATURED)
const hasMore = projects.length > FEATURED
</script>
