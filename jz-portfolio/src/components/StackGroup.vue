<template>
  <div class="stack-group">
    <div class="group-head">
      <span class="sq" aria-hidden="true"></span>
      <h3>{{ group.label }}</h3>
      <span class="rule" aria-hidden="true"></span>
      <!-- zero-padded and derived, so adding a tool can never leave it stale -->
      <span class="count">{{ count }}</span>
    </div>
    <div class="chips">
      <span v-for="item in group.items" :key="item" class="chip">{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  group: { type: Object, required: true },
})

const count = computed(() => String(props.group.items.length).padStart(2, '0'))
</script>

<style scoped>
.stack-group + .stack-group {
  margin-top: 30px;
}
.group-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.sq {
  width: 7px;
  height: 7px;
  background: var(--text-faint);
  flex: none;
  transition: background var(--dur) var(--ease);
}
.stack-group:hover .sq {
  background: var(--text);
}
.group-head h3 {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.rule {
  flex: 1;
  height: 1px;
  background: var(--border-soft);
}
.count {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--text-faint);
  flex: none;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Mobile and tablet: the group label centres with its count, and the chips
   below centre under it. The flexible rule is dropped — it exists to push the
   count to the right edge, which is the opposite of what is wanted here. */
@media (max-width: 1024px) {
  .group-head {
    justify-content: center;
  }
  .rule {
    display: none;
  }
  .chips {
    justify-content: center;
  }
}
</style>
