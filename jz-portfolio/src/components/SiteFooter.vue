<template>
  <div class="wrap">
    <footer
      class="flex flex-wrap items-center justify-between gap-[18px] border-t border-line-soft pt-9 pb-[60px] text-[.8rem] text-faint max-lg:flex-col max-lg:justify-center max-lg:text-center"
    >
      <!-- The full legal name, once, where a copyright line is the natural place
           for it. A name search can only match words the page actually contains,
           and the hero says "Julia Almoite". -->
      <span>© {{ year }} Julia Zyrene Almoite</span>
      <div class="flex flex-col items-center gap-[13px]">
        <p class="note">
          <span class="slashes">//</span> The colors are hiding in the
          <span class="hl hint">case studies</span>.
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
/* The one phrase the sentence points at, carrying the shared marker highlight
   (.hl in main.css) — the same mark the hero claim, the current role and the
   contact heading use, so "the thing being pointed at" reads identically in all
   four places. It replaces a dotted underline, which an underline of any kind
   risked reading as a link. The mono box sits a touch tighter than the sans
   ones: mono's wider glyph advance already pads the phrase optically. */
.hint {
  padding-inline: 0.22em;
}
</style>
