<template>
  <!-- Every title is visible at all times; a row's own header is the only
       control over its detail. No transforms, no stacking, nothing to clip. -->
  <ul id="work-index" class="pindex">
    <ProjectRow
      v-for="(project, i) in items"
      :key="project.title"
      :id="`work-${i}`"
      :project="project"
      :index="String(i + 1).padStart(2, '0')"
      :open="openIndex === i"
      @toggle="toggleRow(i)"
    />
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import ProjectRow from './ProjectRow.vue'
import { projects } from '../data/projects'

// The home section passes a slice; anything else gets the full list.
defineProps({
  items: { type: Array, default: () => projects },
})

/* Single source of truth for the accordion: the index of the one open row, or
   null for none. Because every row derives `open` from this, assigning it both
   closes the previous row and opens the new one in the same tick — the two
   panels animate against each other and the swap reads as one motion. */
const openIndex = ref(null)

// clicking the open row closes it; clicking any other row moves the open state
function toggleRow(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<style scoped>
.pindex {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
