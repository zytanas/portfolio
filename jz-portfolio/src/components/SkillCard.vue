<template>
  <div class="card skill-card" :class="{ 'skill-card--bridge': skill.bridge }" tabindex="0">
    <!-- the icon tile inverts when the whole card is hovered, and stays
         inverted on the bridge card -->
    <span class="mark">
      <SkillIcon :name="skill.icon" />
    </span>
    <p class="eyebrow">{{ skill.eyebrow }}</p>
    <h3>{{ skill.title }}</h3>
    <p class="desc">{{ skill.description }}</p>
  </div>
</template>

<script setup>
import SkillIcon from './SkillIcon.vue'

defineProps({
  skill: { type: Object, required: true },
})
</script>

<style scoped>
.skill-card {
  position: relative;
  background: var(--card);
  transition:
    border-color 0.25s var(--ease),
    background 0.25s var(--ease),
    transform 0.25s var(--ease);
}
/* the short dashed drop that ties the card to its node on the rail */
.skill-card::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 100%;
  width: 0;
  height: var(--drop, 20px);
  border-left: 1px dashed var(--border);
}
.skill-card:hover {
  background: var(--card-hi);
  border-color: var(--text-faint);
  transform: translateY(-3px);
}
/* the drop grows by the same 3px the card rises, so it stays plugged into
   its node instead of tearing away from the rail */
.skill-card:hover::before {
  height: calc(var(--drop, 20px) + 3px);
}
.skill-card:hover .mark {
  color: var(--text);
  border-color: var(--text-faint);
}

.mark {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.5);
  display: grid;
  place-items: center;
  color: var(--text-dim);
  margin-bottom: 16px;
  transition: 0.25s var(--ease);
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 9px;
}
.skill-card h3 {
  font-size: 1.01rem;
  margin-bottom: 7px;
}
.desc {
  font-size: 0.89rem;
  color: var(--text-dim);
  max-width: 64ch;
}

/* ---- the bridge card ------------------------------------------------
   Emphasis comes from light, never colour: one step lighter on both the
   surface and the border, the heading at full strength, and the icon tile
   already inverted. */
.skill-card--bridge {
  background: var(--surface-2);
  border-color: var(--border);
  border-color: color-mix(in srgb, var(--border) 55%, var(--text-faint));
}
.skill-card--bridge h3 {
  color: var(--text);
}
.skill-card--bridge .mark {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
.skill-card--bridge:hover .mark {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
/* the label tab straddles the top border; its opaque background is what the
   dashed drop terminates against */
.skill-card--bridge::after {
  content: 'the bridge';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 8px;
  background: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* Mobile: no rail, so no drops — and the tab moves off centre, where a lone
   label in a single column reads as a caption rather than a junction. */
@media (max-width: 720px) {
  .skill-card::before {
    display: none;
  }
  .skill-card--bridge::after {
    left: 18px;
    transform: translate(0, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-card:hover {
    transform: none;
  }
  .skill-card:hover::before {
    height: var(--drop, 20px);
  }
}
</style>
