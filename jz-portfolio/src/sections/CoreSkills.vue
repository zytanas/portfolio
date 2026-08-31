<template>
  <SectionBlock id="skills" number="01" title="Core skills">
    <template #action>
      <span class="more">three disciplines, one pair of hands</span>
    </template>

    <!-- The framing the cards need before they read as an argument rather than
         an inventory. It says what stops going wrong, which is the only reason
         the three-card continuum below is worth drawing. -->
    <p class="skills-lede lede" data-reveal="up">
      The point isn't that I do all three — it's what stops going wrong when one person does.
      Fewer handoffs, a faster 0→1, and design decisions that survive into the code instead of
      being renegotiated there.
    </p>

    <div class="continuum">
      <!-- Decorative: the rail carries no information the cards do not also
           state, so it is hidden from assistive tech entirely. -->
      <div class="rail" aria-hidden="true" data-reveal="up">
        <span class="rail-end rail-end--start">design</span>
        <span class="rail-end rail-end--finish">build</span>
        <span class="rail-line">
          <span class="nodes">
            <span class="node" />
            <span class="node node--hub" />
            <span class="node" />
          </span>
        </span>
      </div>

      <!-- One card at a time rather than the block as a whole, so the three
           steps of the continuum arrive left to right. -->
      <div class="skill-grid" data-reveal-stagger>
        <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
      </div>
    </div>
  </SectionBlock>
</template>

<script setup>
import SectionBlock from '../components/SectionBlock.vue'
import SkillCard from '../components/SkillCard.vue'
import { skills } from '../data/skills'
</script>

<style scoped>
/* The gap is shared by the rail's node track and the card grid — equal
   columns plus an equal gap is what keeps each node centred over its card. */
.continuum {
  --skill-gap: 14px;
  --drop: 20px;
}

/* Wider than .lede's default 52ch: this sits over a full-width three-column
   grid, and a narrow column of text above it reads as orphaned. */
.skills-lede {
  max-width: 68ch;
  margin-bottom: 30px;
}

.rail {
  position: relative;
  /* room above the hairline for the two end labels */
  padding-top: 22px;
  margin-bottom: var(--drop);
}
.rail-line {
  display: block;
  border-top: 1px dashed var(--border);
}
.rail-end {
  position: absolute;
  top: 0;
  font-family: var(--font-mono);
  font-size: 0.69rem;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.rail-end--start {
  left: 0;
}
.rail-end--finish {
  right: 0;
}

/* Sits on the hairline rather than under it, so the nodes read as pinned to
   the line instead of hanging off it. */
.nodes {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--skill-gap);
  place-items: center;
  transform: translateY(50%);
}
.node {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--text-faint);
}
/* The junction: solid, larger, and haloed in the page colour so the dashes
   stop cleanly at its edge. */
.node--hub {
  width: 15px;
  height: 15px;
  background: var(--text);
  border-color: var(--text);
  box-shadow: 0 0 0 5px var(--bg);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--skill-gap);
  align-items: stretch;
}

/* Tablet and below: the rail can no longer sit over three columns, so the
   whole continuum collapses to a plain stack. */
@media (max-width: 720px) {
  .rail {
    display: none;
  }
  .skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>
