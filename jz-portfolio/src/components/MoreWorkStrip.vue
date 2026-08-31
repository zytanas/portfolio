<template>
  <!-- The third tier. Everything here is deliberately quieter than the rows
       above it: no index numbers, no chips, no preview, no expanding panel —
       just the title, the stack as plain text, and a link out. It exists so the
       breadth is visible without competing with the studies that carry the
       argument. -->
  <div class="mwork">
    <p class="mwork-label mono" data-reveal="up">More work</p>

    <ul class="mwork-list" data-reveal-stagger="2">
      <li v-for="project in items" :key="project.title" class="mwork-item" data-reveal="up">
        <!-- Unlinked entries (Prestige has no live URL) still list, as a plain
             row rather than a dead anchor. -->
        <component
          :is="linkOf(project) ? 'a' : 'div'"
          class="mwork-row"
          v-bind="
            linkOf(project)
              ? {
                  href: linkOf(project).href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': `View project: ${project.title}`,
                }
              : {}
          "
        >
          <span class="mwork-mark" aria-hidden="true"></span>
          <span class="mwork-title">{{ project.title }}</span>
          <span class="mwork-tech">{{ project.tech.join(' / ') }}</span>
          <span v-if="linkOf(project)" class="mwork-arrow" aria-hidden="true">↗</span>
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})

const linkOf = (project) => project.links?.[0] ?? null
</script>

<style scoped>
.mwork {
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px dashed var(--border);
}
.mwork-label {
  font-size: 0.66rem;
  margin-bottom: 6px;
}

.mwork-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Hairline between items only — no top or bottom rule, so the strip reads as a
   footnote to the section rather than as another bordered block. */
.mwork-item + .mwork-item {
  border-top: 1px solid var(--border-soft);
}

.mwork-row {
  display: flex;
  align-items: center;
  gap: 10px;
  /* 44px touch target without a visible box */
  min-height: 44px;
  padding: 6px 2px;
  color: var(--text-faint);
  transition: color 0.2s var(--ease);
}
a.mwork-row:hover {
  color: var(--text);
}
a.mwork-row:focus-visible {
  outline: 2px solid var(--text-dim);
  outline-offset: -2px;
  border-radius: calc(var(--radius) * 0.6);
}

/* The square marker. A CSS box rather than a ■ glyph so it takes a token colour
   and stays optically the same size across the six themes' typefaces. */
.mwork-mark {
  flex: none;
  width: 5px;
  height: 5px;
  background: currentColor;
  opacity: 0.7;
}
.mwork-title {
  flex: 0 1 auto;
  min-width: 0;
  font-size: 0.86rem;
  color: var(--text-dim);
  transition: color 0.2s var(--ease);
}
a.mwork-row:hover .mwork-title {
  color: var(--text);
}
/* Plain text, not chips: chips are the featured tier's vocabulary. */
.mwork-tech {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.08em;
  text-transform: lowercase;
  text-align: right;
  color: var(--text-faint);
  /* the stack is the first thing worth dropping when the row runs out of room */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mwork-arrow {
  flex: none;
  font-size: 0.8rem;
}

/* Phones: the stack list beside a title leaves neither enough room, so it drops
   out entirely — the title and the link are what the strip is for. */
@media (max-width: 560px) {
  .mwork-tech {
    display: none;
  }
  .mwork-title {
    flex: 1 1 auto;
  }
}

@media (min-width: 768px) {
  .mwork {
    margin-top: 38px;
  }
  .mwork-row {
    min-height: 40px;
    padding: 6px 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mwork-row,
  .mwork-title {
    transition: none;
  }
}
</style>
