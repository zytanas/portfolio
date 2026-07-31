<template>
  <div class="card">
    <div class="skill">
      <!-- the icon tile inverts when the whole card is hovered -->
      <span class="mark">
        <SkillIcon :name="skill.icon" />
      </span>
      <div>
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkillIcon from './SkillIcon.vue'

defineProps({
  skill: { type: Object, required: true },
})
</script>

<style scoped>
.skill {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 18px;
}
.mark {
  width: 40px;
  height: 40px;
  flex: none;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.5);
  display: grid;
  place-items: center;
  color: var(--text-dim);
  transition: 0.25s var(--ease);
}
.card:hover .mark {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
.skill h3 {
  font-size: 1.01rem;
  margin-bottom: 7px;
}
.skill p {
  font-size: 0.89rem;
  color: var(--text-dim);
  max-width: 64ch;
}

/* Mobile and tablet: the mark stacks above the copy and the whole card centres. */
@media (max-width: 1024px) {
  .skill {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 14px;
    text-align: center;
  }
  .skill p {
    margin-inline: auto;
  }
}
</style>
