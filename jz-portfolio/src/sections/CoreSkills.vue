<template>
  <SectionBlock id="skills" number="01" title="Core skills">
    <template #action>
      <span class="more">design and build, not one or the other</span>
    </template>

    <div class="grid gap-[14px]">
      <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
    </div>
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import SkillCard from '../components/SkillCard.vue'
import { skills } from '../data/skills'
</script>
