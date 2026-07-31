<template>
  <div class="stats">
    <!-- Only the metrics that actually go somewhere are links, and only those
         carry the little arrow. -->
    <component
      :is="metric.href ? 'a' : 'div'"
      v-for="metric in metrics"
      :key="metric.label"
      class="stat"
      :href="metric.href"
    >
      <b>{{ metric.value }}<sup v-if="metric.href" aria-hidden="true">↗</sup></b>
      <span>{{ metric.label }}</span>
    </component>
  </div>
</template>

<script setup>
import { metrics } from '../data/metrics'
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  margin-top: 54px;
  border-top: 1px solid var(--border-soft);
}
.stat {
  padding: 20px;
  border-left: 1px solid var(--border-soft);
  transition: background 0.2s var(--ease);
}
.stat:first-child {
  border-left: 0;
  padding-left: 0;
}
.stat b {
  font-family: var(--font-mono);
  font-size: 1.28rem;
  font-weight: 500;
  display: block;
  letter-spacing: -0.02em;
  color: var(--text);
}
.stat b sup {
  color: var(--text-faint);
  font-size: 0.55em;
  margin-left: 3px;
  font-weight: 400;
}
.stat span {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--text-faint);
}
a.stat:hover b {
  text-decoration: underline;
  text-underline-offset: 4px;
}
a.stat:hover span {
  color: var(--text-dim);
}
a.stat:hover b sup {
  color: var(--text);
}

/* Mobile and tablet: each metric centres inside its own cell, so the flush-left
   padding trick the desktop row relies on has to be given back. */
@media (max-width: 1024px) {
  .stat,
  .stat:first-child {
    padding: 20px 12px;
    text-align: center;
  }
}

@media (max-width: 520px) {
  .stats {
    grid-template-columns: 1fr 1fr;
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--border-soft);
  }
}
</style>
