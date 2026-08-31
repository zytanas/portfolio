<template>
  <!-- The fading hairline above each section comes from the global
       `section + section::before` rule in main.css, so it only appears where
       one section actually follows another. -->
  <section :id="id" class="wrap">
    <div class="sec-head" data-reveal="up">
      <span class="mono">{{ number }}</span>
      <h2>{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  number: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<style scoped>
.sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  padding-bottom: 16px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--border-soft);
}
.sec-head h2 {
  font-size: 1.26rem;
}
/* the slotted action sits hard right, whether it is a note, a link or a button */
.sec-head :slotted(*) {
  margin-left: auto;
}

/* Mobile and tablet: the row is too narrow to hold the title and the action
   side by side, so the action drops onto its own line — but it keeps hugging
   the right edge, so the heading reads the same way at every width. */
@media (max-width: 1024px) {
  .sec-head :slotted(*) {
    margin-left: 0;
    flex-basis: 100%;
    text-align: right;
    /* reaches inside a slotted flex wrapper too, not just its text */
    justify-content: flex-end;
  }
}
</style>
