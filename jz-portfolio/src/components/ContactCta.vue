<template>
  <div class="cta">
    <h2 data-reveal="up">Let's build something<br />worth clicking.</h2>
    <p class="lede cta-lede" data-reveal="up">
      No form to fill out — grab what you need and reach out.
    </p>

    <!-- A formless contact "session": the same directory-index language the work
         section speaks, so the page ends in the voice it was written in. -->
    <div class="term" role="group" aria-label="Contact details" data-reveal="up">
      <div class="term-bar">
        <span class="term-lights" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="term-title">julia@portfolio: ~/contact</span>
      </div>

      <!-- The stagger wrap is set past the child count so the delay keeps
           climbing top-to-bottom instead of restarting part-way down. -->
      <div class="term-body" data-reveal-stagger="12">
        <p class="tline"><span class="tp" aria-hidden="true">$</span>whoami</p>
        <p class="tout">julia almoite — ui/ux engineer · remote · gmt+8</p>

        <p class="tline"><span class="tp" aria-hidden="true">$</span>availability --now</p>
        <p class="tout tavail">
          <span class="tdot" aria-hidden="true"></span>
          <span>open · frontend · ui/ux · design systems · freelance</span>
        </p>

        <p class="tline"><span class="tp" aria-hidden="true">$</span>contact --list</p>

        <div v-for="row in rows" :key="row.label" class="trow">
          <span class="trow-label">{{ row.label }}</span>
          <span class="trow-value">{{ row.value }}</span>
          <a
            class="trow-action"
            :class="{ 'is-primary': row.primary }"
            :href="row.href"
            :target="row.primary ? null : '_blank'"
            :rel="row.primary ? null : 'noopener noreferrer'"
            :aria-label="`${row.action} ${row.label}: ${row.value}`"
            >{{ row.action }} <span aria-hidden="true">↗</span></a
          >
        </div>

        <p class="tline">
          <span class="tp" aria-hidden="true">$</span
          ><span class="tcaret" aria-hidden="true"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const rows = [
  {
    label: 'mail',
    value: 'juliazyrene23@gmail.com',
    href: 'mailto:juliazyrene23@gmail.com',
    action: 'email',
    primary: true,
  },
  {
    label: 'github',
    value: 'github.com/zytanas',
    href: 'https://github.com/zytanas',
    action: 'open',
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/almoitejuliazyrene',
    href: 'https://www.linkedin.com/in/almoitejuliazyrene/',
    action: 'open',
  },
]
</script>

<style scoped>
.cta {
  text-align: center;
  padding: 38px 24px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
.cta h2 {
  font-size: clamp(1.35rem, 4vw, 2.2rem);
  line-height: 1.2;
  margin: 16px 0 18px;
}
.cta-lede {
  max-width: 44ch;
  margin: 0 auto 30px;
}

/* ---- terminal window ----
   Chrome only: 1px hairline, the section radius, surface fill. Everything
   inside is left-aligned even though the block itself is centred, because a
   centred transcript stops reading as a transcript. */
.term {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
  /* The one non-token colour in here, and the same lime the work index already
     uses for its link accent — a live status reads as status, not as text. */
  --status: #a3e635;
  /* Faster and tighter than the page default: nine short lines in sequence
     need to finish before they read as a queue. */
  --reveal-dur: 0.4s;
  --reveal-step: 55ms;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.term-lights {
  display: inline-flex;
  flex: none;
  gap: 6px;
}
.term-lights i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border);
}
/* the ramp is the only differentiator — no colour anywhere on the page */
.term-lights i:nth-child(2) {
  background: color-mix(in srgb, var(--border) 55%, var(--text-faint));
}
.term-lights i:nth-child(3) {
  background: var(--text-faint);
}
.term-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.term-body {
  padding: 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
}

/* ---- session lines ---- */
.tline {
  color: var(--text);
}
.tp {
  display: inline-block;
  width: 1.1em;
  color: var(--text-faint);
}
.tout {
  color: var(--text-dim);
  padding-left: 1.1em; /* hangs under the command, not under the prompt */
  margin-bottom: 12px;
}
/* Inline flow, not flex. As a flex row the status text is one item, so the
   moment it is too wide for the line it wraps *as a whole* and drops below the
   dot — which is exactly what a phone width does to it. Inline, the dot is just
   the first thing on the first line and the text wraps around it. */
.tavail {
  display: block;
}

/* the pulse is a ring that grows out of the dot and fades, so the dot itself
   stays a solid 8px mark */
.tdot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 9px;
  border-radius: 50%;
  vertical-align: middle;
  background: var(--status);
}
.tdot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--status);
  animation: tdot-pulse 2.2s var(--ease) infinite;
}
@keyframes tdot-pulse {
  0% {
    transform: scale(1);
    opacity: 0.45;
  }
  70%,
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}

/* ---- contact rows ----
   The value track is minmax(0, 1fr) with min-width: 0 so a long URL shrinks
   inside the window instead of pushing the action off the right edge. */
.trow {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 5px 0 5px 1.1em;
}
.trow-label {
  color: var(--text-faint);
}
.trow-value {
  min-width: 0;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.trow-action {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.5);
  background: var(--bg);
  color: var(--text-dim);
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  transition:
    color 0.2s var(--ease),
    border-color 0.2s var(--ease),
    opacity 0.2s var(--ease);
}
.trow-action:hover {
  color: var(--text);
  border-color: var(--text-dim);
}
/* The one filled action on the page — the existing plate cream, page ink for
   the text. Light mode has to switch the fill to --text: cream on a white
   surface is the same value twice and the chip disappears. Still monochrome
   either way; no colour is introduced. */
.trow-action.is-primary {
  background: var(--plate);
  border-color: var(--plate);
  color: var(--bg);
  font-weight: 500;
}
html[data-mode='light'] .trow-action.is-primary {
  background: var(--text);
  border-color: var(--text);
}
.trow-action.is-primary:hover {
  color: var(--bg);
  border-color: transparent;
  opacity: 0.86;
}

.tcaret {
  display: inline-block;
  width: 8px;
  height: 1em;
  vertical-align: text-bottom;
  background: var(--text);
  animation: tcaret-blink 1.05s step-end infinite;
}
@keyframes tcaret-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ---- tablet: one step less padding all round ---- */
@media (max-width: 820px) {
  .cta {
    padding: 52px 18px;
  }
  .term-body {
    padding: 16px;
  }
}

/* ---- mobile: the three-column row cannot hold, so it becomes three stacked
       lines with a hairline between entries and the URL wrapping in place ---- */
@media (max-width: 560px) {
  .cta {
    padding: 40px 14px;
  }
  .term-body {
    padding: 14px;
    font-size: 12.5px;
  }
  .tout {
    margin-bottom: 10px;
  }
  .trow {
    display: block;
    padding: 10px 0 10px 1.1em;
    border-top: 1px solid var(--border-soft);
  }
  .trow-label,
  .trow-value {
    display: block;
  }
  .trow-value {
    white-space: normal;
    overflow: visible;
    overflow-wrap: anywhere;
  }
  .trow-action {
    margin-top: 7px;
    padding: 5px 10px;
  }
}

/* ---- small phones: the title crowds the lights, so it goes ---- */
@media (max-width: 360px) {
  .term-title {
    display: none;
  }
}

/* main.css switches every animation off globally under reduced motion, and
   reveal.css restores the resting state of the staggered lines — the dot and
   the caret only need their end state pinned so neither goes invisible. */
@media (prefers-reduced-motion: reduce) {
  .tdot::after {
    display: none;
  }
  .tcaret {
    opacity: 1;
  }
}
</style>
