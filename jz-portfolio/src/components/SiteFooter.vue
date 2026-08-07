<template>
  <div class="wrap">
    <footer
      class="flex flex-wrap items-center justify-between gap-[18px] border-t border-line-soft pt-9 pb-[60px] text-[.8rem] text-faint max-lg:flex-col max-lg:justify-center max-lg:text-center"
    >
      <span>© {{ year }} Julia Almoite</span>
      <div class="flex flex-col items-center gap-[13px]">
        <p class="note">
          <span class="slashes">//</span> The colors are hiding in the
          <span class="hint">case studies</span>.
        </p>
        <InkPicker />
      </div>
      <span class="mono max-lg:hidden">press <b>T</b> to flip</span>
    </footer>
  </div>
</template>

<script setup>
import InkPicker from './InkPicker.vue'

const year = new Date().getFullYear()
</script>

<style scoped>
/* A source comment, not a label — so it keeps mono's family but none of its
   uppercase/tracking treatment, and sits directly above the ink row it is
   talking about. */
.note {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-dim);
}
.slashes {
  color: var(--text-faint);
}
/* The one phrase the sentence points at, marked the way a comment marks an
   aside: dotted, never solid — a solid rule here would read as a link. */
.hint {
  border-bottom: 2px dotted var(--border);
  padding-bottom: 1px;
}
</style>
