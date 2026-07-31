<template>
  <!-- No heading action: each row is opened by its own header, so there is no
       section-level control to place here. -->
  <SectionBlock id="work" number="02" title="Selected work">
    <ProjectIndex />
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import ProjectIndex from '../components/ProjectIndex.vue'
</script>
