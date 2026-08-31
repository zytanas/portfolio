<template>
  <!-- The case study's facts, as a spec sheet rather than prose: dashed frame,
       mono labels, one row per fact. It is the same vocabulary as the contact
       terminal's label/value rows — a reference panel you scan, not read.

       A <dl> because that is what this is: four terms and their definitions.
       The dashed rules between rows come from the list, not from a border on
       each row, so the panel has no trailing hairline above its own frame. -->
  <dl class="cmeta">
    <div v-for="row in items" :key="row.label" class="cmeta-row">
      <dt class="cmeta-label mono">{{ row.label }}</dt>
      <dd class="cmeta-value" :class="{ 'is-todo': !filled(row) }">
        <template v-if="filled(row)">{{ row.value }}</template>
        <!-- Unwritten facts show as an obvious gap rather than an empty row —
             see the note on `study` in data/projects.js. -->
        <template v-else>
          <span class="cmeta-todo-tag">[TODO]</span>
          <span v-if="row.todo" class="cmeta-todo-hint">{{ row.todo }}</span>
        </template>
      </dd>
    </div>
  </dl>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})

// Whitespace-only counts as unwritten, so a stray space cannot ship a blank row.
const filled = (row) => Boolean(row.value?.trim())
</script>

<style scoped>
.cmeta {
  border: 1px dashed var(--border);
  border-radius: calc(var(--radius) * 0.75);
  padding: 4px 14px;
  margin: 0;
}

/* Two columns: the label track is fixed so every value starts on the same axis,
   which is what makes the block read as a spec sheet. */
.cmeta-row {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 10px;
  align-items: baseline;
  padding: 11px 0;
}
.cmeta-row + .cmeta-row {
  border-top: 1px dashed var(--border-soft);
}

.cmeta-label {
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  color: var(--text-faint);
}
.cmeta-value {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.45;
  color: var(--text);
  /* the arrow in "figma → vue 3" must not break onto its own line */
  text-wrap: balance;
}

/* An unwritten fact keeps the mono grid but drops to the faint tone, so the row
   still lines up while reading as missing. */
.cmeta-value.is-todo {
  color: var(--text-faint);
}
.cmeta-todo-tag {
  letter-spacing: 0.08em;
}
.cmeta-todo-hint {
  display: block;
  margin-top: 3px;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-style: italic;
  letter-spacing: normal;
  text-transform: none;
}

@media (min-width: 1024px) {
  .cmeta {
    padding: 4px 16px;
  }
}
</style>
