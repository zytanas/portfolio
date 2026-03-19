<template>
  <section id="process" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <FloatingCodeSymbols />
    
    <div class="process-glow glow-left" />
    <div class="process-glow glow-right" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── HEADER ── -->
      <div class="flex flex-col pb-8 mb-16 md:flex-row md:items-end md:justify-between section-header-border">
        <div>
          <p class="section-eyebrow">// how i work</p>
          <h2 class="section-title font-heading">
            One person.<br /><span class="title-accent">Full pipeline.</span>
          </h2>
        </div>
        <p class="mt-4 section-sub md:mt-0 md:max-w-xs">
          I design and build in the same loop — no hand-off, no translation layer, no lost details between Figma and code.
        </p>
      </div>

      <!-- ── DESKTOP TIMELINE ── -->
      <div class="hidden md:block">

        <!-- Step number track -->
        <div class="step-track">
          <div
            v-for="(step, i) in steps"
            :key="step.id"
            @mouseenter="activeStep = i"
            @mouseleave="activeStep = null"
            :class="['step-node', activeStep === i && 'step-node--active']"
          >
            <!-- Connector line to next -->
            <div v-if="i < steps.length - 1" class="step-connector">
              <div :class="['step-connector-fill', activeStep !== null && activeStep >= i && 'step-connector-fill--lit']" />
            </div>
            <!-- Dot -->
            <div class="step-dot-wrap">
              <div :class="['step-dot', activeStep === i && 'step-dot--active']">
                <span class="font-mono step-dot-num">{{ String(step.id).padStart(2,'0') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step cards below track -->
        <div class="step-cards">
          <div
            v-for="(step, i) in steps"
            :key="step.id"
            @mouseenter="activeStep = i"
            @mouseleave="activeStep = null"
            :class="['step-card', activeStep === i && 'step-card--active']"
          >
            <div class="step-icon-wrap">
              <span class="step-icon">{{ step.icon }}</span>
            </div>
            <p class="font-mono step-phase">{{ step.phase }}</p>
            <h3 class="step-name font-heading">{{ step.name }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-tools">
              <span v-for="tool in step.tools" :key="tool" class="step-tool">{{ tool }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ── MOBILE ACCORDION ── -->
      <div class="space-y-3 md:hidden">
        <div
          v-for="(step, i) in steps"
          :key="step.id"
          @click="mobileOpen = mobileOpen === i ? null : i"
          :class="['mobile-step', mobileOpen === i && 'mobile-step--open']"
        >
          <!-- Header row -->
          <div class="mobile-step-header">
            <div class="mobile-step-left">
              <span class="font-mono mobile-step-num">{{ String(step.id).padStart(2,'0') }}</span>
              <span class="mobile-step-icon">{{ step.icon }}</span>
              <div>
                <p class="font-mono mobile-step-phase">{{ step.phase }}</p>
                <h3 class="mobile-step-name font-heading">{{ step.name }}</h3>
              </div>
            </div>
            <svg
              :class="['mobile-chevron w-4 h-4 transition-transform duration-300', mobileOpen === i && 'rotate-180']"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <!-- Expandable body -->
          <div v-if="mobileOpen === i" class="mobile-step-body">
            <p class="step-desc">{{ step.desc }}</p>
            <div class="mt-3 step-tools">
              <span v-for="tool in step.tools" :key="tool" class="step-tool">{{ tool }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import FloatingCodeSymbols from '@/components/FloatingCodeSymbols.vue'

const activeStep = ref(null)
const mobileOpen = ref(0) // Phase 1 always open by default on mobile

const steps = [
  {
    id: 1,
    phase: '// Phase 01',
    name: 'Understand',
    icon: '🎯',
    desc: 'I start with the brief, not the brief doc. Goals, constraints, and audience — clarified upfront so every decision that follows has a reason.',
    tools: ['Brief Review', 'User Goals', 'Miro', 'Notion'],
  },
  {
    id: 2,
    phase: '// Phase 02',
    name: 'Design',
    icon: '✏️',
    desc: 'Wireframes to high-fidelity in Figma — building a component system as I go so the handoff to code is already half done.',
    tools: ['Figma', 'Wireframes', 'Components', 'Prototyping'],
  },
  {
    id: 3,
    phase: '// Phase 03',
    name: 'Build',
    icon: '⚡',
    desc: 'I code what I designed — no translation loss. Responsive, component-driven, and pixel-faithful from day one.',
    tools: ['Vue', 'React', 'Nuxt', 'Tailwind', 'TypeScript'],
  },
  {
    id: 4,
    phase: '// Phase 04',
    name: 'Ship & Refine',
    icon: '🚀',
    desc: 'Cross-device QA, final polish, then deploy. Post-launch I stay available for iteration — because shipping is step one, not the finish line.',
    tools: ['QA', 'Vercel', 'Netlify', 'GitHub', 'Feedback Loop'],
  },
]
</script>

<style scoped>
/* ── GLOWS ── */
.process-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(100px);
}
.glow-left {
  width: 450px; height: 450px; top: 0; left: -120px;
  background: radial-gradient(circle, rgba(123,92,250,0.07), transparent 70%);
}
.glow-right {
  width: 350px; height: 350px; bottom: 0; right: -80px;
  background: radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%);
}

/* ── HEADER ── */
.section-header-border { border-bottom: 1px solid rgba(123,92,250,0.14); }
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(36px, 4.5vw, 64px); font-weight: 800;
  line-height: 0.95; letter-spacing: -0.02em; color: #F0EDF8;
}
.title-accent { color: #7B5CFA; text-shadow: 0 0 40px rgba(123,92,250,0.4); }
.section-sub {
  font-size: 0.875rem; color: rgba(240,237,248,0.5);
  line-height: 1.7;
}

/* ══════════════════════════════════════
   DESKTOP TIMELINE
══════════════════════════════════════ */

/* Top track row — dots + connectors */
.step-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 0;
  position: relative;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Horizontal connector line */
.step-connector {
  position: absolute;
  top: 18px;           /* vertically center on dot */
  left: 50%;
  right: -50%;
  height: 1px;
  background: rgba(123,92,250,0.12);
  overflow: hidden;
  z-index: 0;
}
.step-connector-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #7B5CFA, #A78BFA);
  transition: width 0.5s ease;
}
.step-connector-fill--lit { width: 100%; }

/* Dot */
.step-dot-wrap { position: relative; z-index: 1; margin-bottom: 1.5rem; }
.step-dot {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(20,20,40,0.9);
  border: 1px solid rgba(123,92,250,0.2);
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
}
.step-dot--active {
  border-color: #7B5CFA;
  background: rgba(123,92,250,0.15);
  box-shadow: 0 0 0 4px rgba(123,92,250,0.1);
}
.step-dot-num {
  font-size: 9px; letter-spacing: 0.1em;
  color: rgba(167,139,250,0.6);
}
.step-dot--active .step-dot-num { color: #A78BFA; }

/* Cards row */
.step-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.step-card {
  padding: 1.25rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(123,92,250,0.08);
  background: rgba(20,20,40,0.5);
  transition: border-color 0.3s, background 0.3s, transform 0.3s;
  cursor: default;
}
.step-card--active {
  border-color: rgba(123,92,250,0.3);
  background: rgba(123,92,250,0.07);
  transform: translateY(-4px);
}

.step-icon-wrap { margin-bottom: 0.75rem; }
.step-icon { font-size: 1.25rem; line-height: 1; }

.step-phase {
  font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 0.3rem;
}
.step-name {
  font-size: clamp(0.95rem, 2vw, 1.1rem); font-weight: 800;
  color: #F0EDF8; margin-bottom: 0.5rem; line-height: 1.1;
}
.step-desc {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem); color: rgba(240,237,248,0.6);
  line-height: 1.6; margin-bottom: 0.75rem;
}
.step-tools {
  display: flex; flex-wrap: wrap; gap: 0.3rem;
}
.step-tool {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 999px;
  background: rgba(123,92,250,0.08);
  border: 1px solid rgba(123,92,250,0.18);
  color: #A78BFA;
}

/* ══════════════════════════════════════
   MOBILE ACCORDION
══════════════════════════════════════ */
.mobile-step {
  border: 1px solid rgba(123,92,250,0.1);
  border-radius: 12px;
  background: rgba(20,20,40,0.5);
  overflow: hidden;
  transition: border-color 0.2s;
  cursor: pointer;
}
.mobile-step--open {
  border-color: rgba(123,92,250,0.3);
  background: rgba(123,92,250,0.06);
}
.mobile-step-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.1rem;
}
.mobile-step-left {
  display: flex; align-items: center; gap: 0.75rem;
}
.mobile-step-num {
  font-size: 0.7rem; letter-spacing: 0.1em;
  color: rgba(123,92,250,0.4); width: 24px; flex-shrink: 0;
}
.mobile-step-icon { font-size: 1.1rem; flex-shrink: 0; }
.mobile-step-phase {
  font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #2DD4BF; margin-bottom: 1px;
}
.mobile-step-name { font-size: 0.9rem; font-weight: 700; color: #F0EDF8; }
.mobile-chevron { color: rgba(167,139,250,0.5); flex-shrink: 0; }
.mobile-step--open .mobile-chevron { color: #A78BFA; }

.mobile-step-body { padding: 0 1.1rem 1rem; }

/* ── CTA ROW ── */
.process-cta-row {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(123,92,250,0.1);
  display: flex; align-items: center; justify-content: space-between;
  gap: 1.5rem; flex-wrap: wrap;
}
.process-cta-headline {
  font-size: clamp(1.3rem, 2.5vw, 1.9rem);
  font-weight: 800; color: #F0EDF8;
  letter-spacing: -0.02em; margin-top: 0.25rem;
}
.process-cta-btn {
  display: inline-flex; align-items: center;
  padding: 0.85rem 2rem;
  background: #7B5CFA; color: #fff;
  border: 1px solid rgba(167,139,250,0.3);
  border-radius: 999px;
  font-size: 0.9rem; font-weight: 700;
  text-decoration: none; white-space: nowrap;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.process-cta-btn:hover {
  background: #A78BFA;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(123,92,250,0.35);
}
</style>