<template>
  <SectionBlock id="stack" number="04" title="Stack">
    <template #action>
      <span class="more">{{ stackTotal }} tools · what I actually reach for</span>
    </template>

    <!-- SectionBlock already prints the index, title and meta, so the grid
         renders headerless here. -->
    <StackSpotlight :tools="stackFlat" :show-header="false" />
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import StackSpotlight from '../components/StackSpotlight.vue'
import { stackFlat, stackTotal } from '../data/stack'
</script>
