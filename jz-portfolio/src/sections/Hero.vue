<template>
  <section id="hero" class="relative flex items-center justify-center min-h-screen overflow-hidden">

    <!-- ── MOVING 3D BACKGROUND ── -->
    <MovingBackground3D />

    <!-- ── NOISE GRAIN OVERLAY ── -->
    <div class="absolute inset-0 pointer-events-none grain-overlay z-1" />

    <!-- ── RADIAL VIGNETTE ── -->
    <div class="absolute inset-0 pointer-events-none vignette z-2" />

    <!-- ── SCANLINES ── -->
    <div class="absolute inset-0 pointer-events-none scanlines z-2" />

    <!-- ── CONTENT ── -->
    <div class="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 py-24 mx-auto">

      <!-- layout: two-column on md+ -->
      <div class="w-full hero-grid">

        <!-- LEFT COLUMN -->
        <div class="flex flex-col items-center text-center md:items-start md:text-left">

          <!-- Available tag -->
          <div class="hero-tag fade-up" style="animation-delay:0.1s">
            <span class="hero-tag-dot" />
            Available for freelance & full-time
          </div>

          <!-- Headline -->
          <h1 class="hero-headline font-heading fade-up" style="animation-delay:0.25s">
            Design that converts.<br>
            <span class="headline-accent">Code that ships.</span>
          </h1>

          <!-- Value prop -->
          <p
            class="max-w-md mt-6 text-base leading-relaxed font-body desc-text fade-up"
            style="animation-delay:0.45s"
          >
            I'm <strong class="font-semibold text-accent-strong">Julia Almoite</strong> — I design interfaces in Figma
            and build them in Vue &amp; React. No hand-off friction, no lost details.
            <strong class="font-semibold text-accent-strong">From wireframe to deployed product</strong>, I own the full stack.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap justify-center gap-3 mt-8 md:justify-start fade-up" style="animation-delay:0.62s">
            <button
              @click="scrollToContact"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-primary rounded-xl font-body"
            >
              Start a Project
              <MoveRight class="w-4 h-4" />
            </button>
            <button
              @click="scrollToWork"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-secondary rounded-xl font-body"
            >
              View Work
            </button>
          </div>

          <!-- Stats row -->
          <div class="hero-stats fade-up" style="animation-delay:0.78s">
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">8<span>+</span></p>
              <p class="font-mono hero-stat-label">Products Shipped</p>
            </div>
            <div class="hero-stat-divider" />
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">2<span>yrs</span></p>
              <p class="font-mono hero-stat-label">Design + Dev</p>
            </div>
            <div class="hero-stat-divider" />
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">1<span>person</span></p>
              <p class="font-mono hero-stat-label">Full pipeline</p>
            </div>
          </div>

          <!-- Socials -->
          <div class="flex items-center justify-center gap-3 mt-6 md:justify-start fade-up" style="animation-delay:0.92s">
            <span class="font-mono text-xs tracking-widest uppercase social-label">Find me on</span>
            <a href="https://www.linkedin.com/in/almoitejuliazyrene/" target="_blank" class="hero-social-btn group" title="LinkedIn">
              <Linkedin class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors" />
            </a>
            <a href="https://github.com/zytanas" target="_blank" class="hero-social-btn group" title="GitHub">
              <Github class="w-3.5 h-3.5 text-white group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <!-- RIGHT COLUMN: split discipline panel -->
        <div class="split-panel-wrap fade-up" style="animation-delay:0.35s">

          <!-- TOP: Developer -->
          <div class="split-panel split-panel--dev">
            <!-- floating code lines -->
            <div class="font-mono code-float" aria-hidden="true">
              <span class="cf-kw">const</span> julia = {<br>
              &nbsp;&nbsp;role: <span class="cf-str">'frontend-dev'</span>,<br>
              &nbsp;&nbsp;stack: [<span class="cf-str">'Vue'</span>, <span class="cf-str">'React'</span>, <span class="cf-str">'Nuxt'</span>],<br>
              &nbsp;&nbsp;ships: <span class="cf-kw">true</span><br>
              }
            </div>
            <div class="split-panel__body">
              <div class="split-icon"><Code2 class="w-6 h-6" /></div>
              <p class="split-role font-heading">Front-End Dev</p>
              <p class="font-mono split-desc">Vue · React · Nuxt · Tailwind</p>
            </div>
          </div>

          <!-- BOTTOM: Designer -->
          <div class="split-panel split-panel--design">
            <!-- floating grid dots -->
            <div class="design-dots" aria-hidden="true">
              <span v-for="n in 12" :key="n" class="design-dot" />
            </div>
            <div class="split-panel__body">
              <div class="split-icon"><Palette class="w-6 h-6" /></div>
              <p class="split-role font-heading">UI/UX Designer</p>
              <p class="font-mono split-desc">UI/UX · Figma · Design Systems</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MoveRight, Code2, Palette, Linkedin, Github } from 'lucide-vue-next'
import MovingBackground3D from '@/components/MovingBackground3D.vue'

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' })
}

const scrollToWork = () => {
  const el = document.getElementById('projects')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}
</script>

<style scoped>
/* ── GRAIN ── */
.grain-overlay {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.55;
  mix-blend-mode: overlay;
}

/* ── VIGNETTE ── */
.vignette {
  background: radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(4,4,10,0.82) 100%);
}

/* ── SCANLINES ── */
.scanlines {
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
  );
}

/* ── AVAILABLE TAG ── */
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: rgba(34, 197, 94, 0.11);
  border: 1px solid rgba(34, 197, 94, 0.986);
  border-radius: 999px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  margin-bottom: 1.75rem;
}
.hero-tag-dot {
  display: block;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e; box-shadow: 0 0 5px #22c55e;
  box-shadow: 0 0 6px #2DD4BF;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}

/* ── HEADLINE ── */
.hero-headline {
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #F0EDF8;
  margin-bottom: 0;
}
.headline-accent {
  color: #7B5CFA;
  text-shadow:
    0 0 40px rgba(123, 92, 250, 0.45),
    0 0 80px rgba(123, 92, 250, 0.18);
}

/* ── STATS ROW ── */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(123, 92, 250, 0.12);
  width: 100%;
  max-width: 420px;
}
@media (min-width: 768px) {
  .hero-stats { justify-content: flex-start; }
}
.hero-stat { text-align: center; }
@media (min-width: 768px) { .hero-stat { text-align: left; } }
.hero-stat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: #F0EDF8;
  line-height: 1;
  margin-bottom: 0.2rem;
}
.hero-stat-num span {
  font-size: 1rem;
  color: #A78BFA;
}
.hero-stat-label {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(240, 237, 248);
}
.hero-stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(123, 92, 250, 0.18);
  flex-shrink: 0;
}

/* ── HERO GRID ── */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

/* ── SHARED TEXT UTILS ── */
.text-accent-strong { color: #A78BFA; }
.desc-text { color: rgba(240, 237, 248, 0.82); }

/* ── CTA ── */
.cta-primary {
  background: #7B5CFA;
  color: #fff;
  border: 1px solid #7B5CFA;
}
.cta-primary:hover {
  background: transparent;
  color: #A78BFA;
  border-color: #A78BFA;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(123, 92, 250, 0.3);
}
.cta-secondary {
  background: rgba(123, 92, 250, 0.08);
  color: #fff;
  border: 1px solid rgba(123, 92, 250, 0.28);
}
.cta-secondary:hover {
  background: rgba(123, 92, 250, 0.16);
  border-color: rgba(167, 139, 250, 0.6);
  transform: translateY(-2px);
}

/* ── SOCIALS ── */
.social-label { color: rgb(240, 237, 248); }
.hero-social-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(123, 92, 250, 0.08);
  border: 1px solid rgba(123, 92, 250, 0.2);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.hero-social-btn:hover {
  background: #7B5CFA;
  border-color: #7B5CFA;
  transform: translateY(-2px);
}

/* ── SPLIT PANEL ── */
.split-panel-wrap {
  display: flex;
  flex-direction: row;
  height: 160px;
  border: 1px solid rgba(123, 92, 250, 0.14);
  border-radius: 14px;
  overflow: hidden;
  gap: 1px;
  width: 100%;
}
@media (min-width: 768px) {
  .split-panel-wrap {
    flex-direction: column;
    height: 400px;
  }
}

.split-panel {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem 1.1rem;
  overflow: hidden;
  transition: flex 0.45s cubic-bezier(0.4,0,0.2,1);
  cursor: default;
}
.split-panel:hover { flex: 1.8; }
@media (min-width: 768px) {
  .split-panel { padding: 1.5rem 1.75rem; }
}

.split-panel--dev {
  background: linear-gradient(135deg, #0d0d18 0%, #141428 100%);
  border-bottom: 1px solid rgba(123, 92, 250, 0.1);
}
.split-panel--dev::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 24px,
    rgba(123, 92, 250, 0.04) 24px,
    rgba(123, 92, 250, 0.04) 25px
  );
}

.split-panel--design {
  background: linear-gradient(135deg, #0a0a14 0%, #12102a 100%);
}
.split-panel--design::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(45, 212, 191, 0.06) 0%, transparent 70%);
}

/* floating code snippet */
.code-float {
  position: absolute;
  top: 1rem; right: 1.25rem;
  font-size: 0.6rem;
  line-height: 1.9;
  color: rgb(255, 255, 255);
  text-align: right;
  pointer-events: none;
  opacity: 0.7;
}
.cf-kw  { color: rgb(250, 139, 139); }
.cf-str { color: rgba(45, 212, 190, 0.993); }

/* floating grid dots */
.design-dots {
  position: absolute;
  top: 1rem; right: 1.25rem;
  display: grid;
  grid-template-columns: repeat(4, 12px);
  grid-template-rows: repeat(3, 12px);
  gap: 5px;
  opacity: 0.25;
  pointer-events: none;
}
.design-dot {
  display: block;
  background: #7B5CFA;
  border-radius: 2px;
  width: 100%; height: 100%;
}
.design-dot:nth-child(3n) { opacity: 0.4; }
.design-dot:nth-child(2n) { opacity: 0.6; }

.split-panel__body { position: relative; z-index: 1; }

.split-icon {
  font-size: 1.1rem;
  color: #2DD4BF;
  opacity: 0.8;
  margin-bottom: 0.25rem;
  line-height: 1;
}
@media (min-width: 768px) {
  .split-icon { font-size: 1.6rem; margin-bottom: 0.35rem; }
}
.split-role {
  font-size: 0.95rem;
  font-weight: 800;
  color: #F0EDF8;
  line-height: 1;
  margin-bottom: 0.25rem;
}
@media (min-width: 768px) {
  .split-role { font-size: 1.3rem; margin-bottom: 0.35rem; }
}
.split-desc {
  font-size: 0.65rem;
  color: #2DD4BF;
  letter-spacing: 0.06em;
  line-height: 1.6;
}



/* ── FADE UP ── */
.fade-up {
  opacity: 0;
  animation: fadeUpIn 0.75s ease forwards;
}
@keyframes fadeUpIn {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
</style>