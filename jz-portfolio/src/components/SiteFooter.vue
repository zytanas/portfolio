<template>
  <div class="wrap">
    <footer
      class="flex flex-wrap items-center justify-between gap-[18px] border-t border-line-soft pt-9 pb-[60px] text-[.8rem] text-faint max-lg:flex-col max-lg:justify-center max-lg:text-center"
    >
      <span>© {{ year }} Julia Almoite</span>
      <InkPicker />
      <span class="mono">press <b>T</b> to flip</span>
    </footer>
  </div>
</template>

<script setup>
import InkPicker from './InkPicker.vue'

const year = new Date().getFullYear()
</script>
