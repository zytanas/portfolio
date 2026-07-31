<template>
  <SectionBlock id="stack" number="04" title="Stack">
    <template #action>
      <span class="more">{{ stackTotal }} tools · what I actually reach for</span>
    </template>

    <StackGroup v-for="group in stack" :key="group.label" :group="group" />
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import StackGroup from '../components/StackGroup.vue'
import { stack, stackTotal } from '../data/stack'
</script>
