<template>
  <div>
  <section id="about" class="relative px-6 py-24 overflow-hidden perf-optimize">
    <!-- Floating Code Symbols -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="code-symbol symbol-1">&lt;/&gt;</div>
      <div class="code-symbol symbol-2">{ }</div>
      <div class="code-symbol symbol-3">[ ]</div>
      <div class="code-symbol symbol-4">&lt;div&gt;</div>
      <div class="code-symbol symbol-5">( )</div>
      <div class="code-symbol symbol-6">===</div>
      <div class="code-symbol symbol-7">=&gt;</div>
      <div class="code-symbol symbol-8">&lt;/&gt;</div>
    </div>

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
@media (min-width: 768px) {
  .about-layout {
    grid-template-columns: 360px 1fr;
    gap: 3rem;
    align-items: start;
  }
}

/* ── FLOATING CODE SYMBOLS ── */
.code-symbol {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.08;
  pointer-events: none;
}

.symbol-1 { font-size: 3rem; top: 15%; left: 10%; animation: floatCode 8s ease-in-out infinite; }
.symbol-2 { font-size: 2.5rem; top: 25%; right: 15%; animation: floatCode 7s ease-in-out infinite; animation-delay: -2s; }
.symbol-3 { font-size: 2rem; top: 45%; left: 20%; animation: floatCode 9s ease-in-out infinite; animation-delay: -4s; }
.symbol-4 { font-size: 2.8rem; bottom: 30%; right: 25%; animation: floatCode 6.5s ease-in-out infinite; animation-delay: -1s; }
.symbol-5 { font-size: 2.2rem; top: 60%; left: 8%; animation: floatCode 7.5s ease-in-out infinite; animation-delay: -5s; }
.symbol-6 { font-size: 2rem; bottom: 20%; left: 30%; animation: floatCode 8.5s ease-in-out infinite; animation-delay: -3s; }
.symbol-7 { font-size: 2.5rem; top: 35%; right: 8%; animation: floatCode 7s ease-in-out infinite; animation-delay: -6s; }
.symbol-8 { font-size: 2rem; bottom: 15%; right: 12%; animation: floatCode 9s ease-in-out infinite; animation-delay: -7s; }

@keyframes floatCode {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.08; }
  25%       { transform: translateY(-20px) translateX(10px) rotate(5deg); opacity: 0.12; }
  50%       { transform: translateY(-40px) translateX(-10px) rotate(-5deg); opacity: 0.06; }
  75%       { transform: translateY(-20px) translateX(15px) rotate(3deg); opacity: 0.1; }
}
</style>