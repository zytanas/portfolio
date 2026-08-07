<template>
  <SectionBlock id="skills" number="01" title="Core skills">
    <template #action>
      <span class="more">design and build, not one or the other</span>
    </template>

    <!-- One card at a time rather than the block as a whole; the list is a
         single column, so the index never needs to wrap. -->
    <div class="grid gap-[14px]" data-reveal-stagger>
      <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
    </div>
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import SkillCard from '../components/SkillCard.vue'
import { skills } from '../data/skills'
</script>
