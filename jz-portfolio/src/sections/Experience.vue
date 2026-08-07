<template>
  <SectionBlock id="experience" number="03" title="Experience">
    <template #action> </template>

    <ExperienceItem v-for="item in experience" :key="item.role" :item="item" />
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import ExperienceItem from '../components/ExperienceItem.vue'
import { experience } from '../data/experience'
</script>
