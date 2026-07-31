<template>
  <figure class="rec" :class="{ 'rec--full': full }">
    <span class="qm" aria-hidden="true">&rdquo;</span>
    <blockquote>{{ recommendation.quote }}</blockquote>
    <figcaption class="rec-by">
      <span class="av" aria-hidden="true">{{ recommendation.initials }}</span>
      <span class="who">
        <span class="nm">{{ recommendation.name }}</span>
        <span class="rl">{{ recommendation.role }}</span>
      </span>
    </figcaption>
  </figure>
</template>

<script setup>
defineProps({
  recommendation: { type: Object, required: true },
  // The home section shows three teasers, so quotes clamp and roles truncate.
  // The /recommendation page shows everything in full.
  full: { type: Boolean, default: false },
})
</script>

<style scoped>
.rec {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  transition: background 0.25s var(--ease), border-color 0.25s var(--ease);
}
.rec:hover {
  background: var(--card-hi);
  border-color: var(--text-dim);
}
.qm {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-faint);
  transition: color 0.25s var(--ease);
}
.rec:hover .qm {
  color: var(--text-dim);
}
.rec blockquote {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text);
  /* clamp to four lines so the cards stay the same height */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rec-by {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 11px;
  align-items: center;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border-soft);
}
.av {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.04em;
  color: var(--text-faint);
  transition: 0.25s var(--ease);
}
.rec:hover .av {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
/* name over role, each on its own line. The spans need to be blocks for the
   ellipsis below to have anything to clip. */
.who {
  min-width: 0;
  display: block;
}
.nm {
  display: block;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--text);
}
/* the role line truncates rather than wrapping, so every card matches */
.rl {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Full mode: nothing is cut off — the quote runs to its natural length and the
   role wraps onto as many lines as it needs. */
.rec--full blockquote {
  display: block;
  -webkit-line-clamp: none;
  overflow: visible;
}
.rec--full .rl {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}
.rec--full .rec-by {
  align-items: start;
}

/* Mobile and tablet keep the same left-aligned layout as desktop — quote mark,
   quote and attribution all flush left, avatar beside the name rather than
   above it. The role stays on one line and trails off, so the attribution is
   always two tidy lines however long the title is. */
@media (max-width: 1024px) {
  .rec {
    padding: 20px;
  }
  .rec--full .rl {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Narrow phones: trade a little card padding for reading width, and pull the
   quote mark closer to the quote it belongs to. */
@media (max-width: 480px) {
  .rec {
    padding: 18px;
    gap: 12px;
  }
  .qm {
    font-size: 1.3rem;
  }
  .rec-by {
    padding-top: 12px;
  }
}
</style>
