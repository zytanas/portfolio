<template>
  <div>
  <section id="about" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <FloatingCodeSymbols />

    <div class="about-glow glow-tl" />
    <div class="about-glow glow-br" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── SECTION HEADER ── -->
      <div class="flex items-end justify-between pb-8 mb-16 section-header-border">
        <div>
          <p class="section-eyebrow">// about me</p>
          <h2 class="section-title font-heading">
            The person<br /><span class="title-accent">behind the work.</span>
          </h2>
        </div>
        <div class="hidden text-right md:block">
          <div class="count-bg font-heading">03</div>
          <p class="font-mono count-label">core skills</p>
        </div>
      </div>

      <!-- ── TWO-COLUMN LAYOUT ── -->
      <div class="about-layout">
        <!-- ══ LEFT: Identity Panel ══ -->
        <IdentityPanel />

        <!-- ══ VERTICAL DIVIDER (desktop only) ══ -->
        <div class="column-divider" aria-hidden="true" />

        <!-- ══ RIGHT: Tab Panel ══ -->
        <AboutTabPanel />
      </div>
    </div>
  </section>

  <!-- ── CLIENT STORIES ── -->
  <ClientStory />
  </div>
</template>

<script setup>
import ClientStory from '../components/ClientStory.vue'
import IdentityPanel from '../components/IdentityPanel.vue'
import AboutTabPanel from '../components/AboutTabPanel.vue'
import FloatingCodeSymbols from '@/components/FloatingCodeSymbols.vue'
</script>

<style scoped>
/* ── GLOWS ── */
.about-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(100px);
}
.glow-tl {
  width: 500px; height: 500px; top: -60px; left: -100px;
  background: radial-gradient(circle, rgba(123,92,250,0.07), transparent 70%);
}
.glow-br {
  width: 350px; height: 350px; bottom: 0; right: -60px;
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
  font-size: clamp(42px, 5vw, 72px); font-weight: 800;
  line-height: 0.95; letter-spacing: -0.02em; color: #F0EDF8;
}
.title-accent { color: #7B5CFA; text-shadow: 0 0 40px rgba(123,92,250,0.4); }
.count-bg { font-size: 64px; font-weight: 800; line-height: 1; color: #7B5CFA; opacity: 0.18; }
.count-label { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(240,237,248,0.3); margin-top: 2px; }

/* ══════════════════════════════════════
   TWO-COLUMN LAYOUT
══════════════════════════════════════ */
.about-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

/* Hide divider on mobile */
.column-divider { display: none; }

@media (min-width: 768px) {
  .about-layout {
    grid-template-columns: 340px 56px 1fr;
    gap: 0;
    align-items: start;
  }

  .column-divider {
    display: flex;
    justify-content: center;
    align-self: stretch;
  }

  .column-divider::after {
    content: '';
    display: block;
    width: 1px;
    min-height: 200px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(123,92,250,0.3) 15%,
      rgba(123,92,250,0.18) 60%,
      transparent
    );
  }
}
</style>