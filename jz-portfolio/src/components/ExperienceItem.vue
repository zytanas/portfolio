<template>
  <!-- Slides in from the left: the rows read as a timeline, and the sideways
       entry follows the ledger's left-to-right structure. -->
  <div class="xp" :class="{ now: item.now, edu: item.education }" data-reveal="left">
    <h3 class="role">{{ item.role }}</h3>
    <div class="body">
      <p class="org">{{ item.org }}<span v-if="item.education" class="tag-edu">education</span></p>
      <p v-if="item.description" class="desc">{{ item.description }}</p>
    </div>
    <span class="yr">{{ item.period }}</span>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<style scoped>
/* A ledger row: role at the far left, org + what the work was in the middle,
   date hard right — the same three-column read as the work list. */
.xp {
  display: grid;
  /* fixed outer columns so the middle block lines up across rows — each row is
     its own grid and cannot size a track from its siblings */
  grid-template-columns: 190px 1fr 118px;
  gap: 24px;
  align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-soft);
}
.xp:last-child {
  border-bottom: 0;
}
.role {
  font-size: 0.95rem;
}
.org {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.desc {
  font-size: 0.86rem;
  color: var(--text-dim);
  margin-top: 8px;
  max-width: 62ch;
}
.yr {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  letter-spacing: 0.09em;
  color: var(--text-faint);
  text-align: right;
}
/* the current role keeps its date at full strength */
.xp.now .yr {
  color: var(--text);
}
.tag-edu {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  margin-left: 7px;
  color: var(--text-faint);
}

/* Mobile and tablet: there is no room for three columns, so the row collapses
   to role + date on one line with the org and copy underneath. */
@media (max-width: 767px) {
  .xp {
    grid-template-columns: 1fr auto;
    gap: 8px 14px;
    padding: 14px 0;
  }
  .yr {
    grid-column: 2;
    grid-row: 1;
  }
  .body {
    grid-column: 1 / -1;
  }
}
</style>
