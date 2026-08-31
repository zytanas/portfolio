<template>
  <!-- Three tiers, not five equals. The lead card carries the argument, the two
       rows support it, and the strip shows breadth. Each row is still opened by
       its own header, so the only section-level control here is the overflow
       link — and only once there is overflow to explore. -->
  <SectionBlock id="work" number="02" title="Case studies">
    <template v-if="hasMore" #action>
      <RouterLink class="more" to="/selected-work">Explore more →</RouterLink>
    </template>

    <ProjectLead :project="lead" index="01" />

    <ProjectIndex :items="supporting" :offset="1" />

    <MoreWorkStrip v-if="rest.length" :items="rest" />
  </SectionBlock>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SectionBlock from '../components/SectionBlock.vue'
import ProjectLead from '../components/ProjectLead.vue'
import ProjectIndex from '../components/ProjectIndex.vue'
import MoreWorkStrip from '../components/MoreWorkStrip.vue'
import { projects } from '../data/projects'

/* The cut points for the tiers described at the top of data/projects.js. One
   lead, two supporting rows — three studies is the most that can hold "these
   are the ones that matter" before it reads as a list again. The rest go to the
   strip; /selected-work is linked whenever the strip is not the whole tail. */
const LEAD = 1
const FEATURED = 3

const lead = projects[0]
const supporting = projects.slice(LEAD, FEATURED)
const rest = projects.slice(FEATURED)
const hasMore = rest.length > 0
</script>
