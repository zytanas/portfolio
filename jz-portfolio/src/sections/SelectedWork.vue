<template>
  <!-- Three projects, one strip. The homepage's job here is to show the work is
       real and get you to the studies — not to be the index — so the section is
       a single control: point at a panel, it opens. Everything past the third
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

/* The cut point for the tier described at the top of data/projects.js. Three is
   the most the strip can hold before the closed spines stop leaving the open
   panel room to say anything. */
const FEATURED = 3

const featured = projects.slice(0, FEATURED)
const hasMore = projects.length > FEATURED
</script>
