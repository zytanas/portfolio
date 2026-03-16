<template>
  <section id="hero" class="relative flex items-center justify-center min-h-screen overflow-hidden" @mousemove="onMouseMove" @mouseleave="onMouseLeave">

    <!-- ── INTERACTIVE CANVAS ── -->
    <canvas
      ref="bgCanvas"
      class="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />

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
            Available for freelance &amp; full-time
          </div>

          <!-- Headline -->
          <h1 class="hero-headline font-heading fade-up" style="animation-delay:0.25s">
            Crafting Digital<br>
            <span class="headline-accent">Products People</span><br>
            Actually Love.
          </h1>

          <!-- Value prop -->
          <p
            class="max-w-md mt-6 text-base leading-relaxed font-body desc-text fade-up"
            style="animation-delay:0.45s"
          >
            I'm <strong class="font-semibold text-accent-strong">Julia Almoite</strong> — a UI/UX Designer &amp; Frontend Developer
            who <strong class="font-semibold text-accent-strong">builds</strong> what she <strong class="font-semibold text-accent-strong">designs</strong>.
            Pixel-perfect layouts, clean code, seamless experiences.
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
          </div>

          <!-- Stats row -->
          <div class="hero-stats fade-up" style="animation-delay:0.78s">
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">8<span>+</span></p>
              <p class="font-mono hero-stat-label">Projects Shipped</p>
            </div>
            <div class="hero-stat-divider" />
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">2<span>yrs</span></p>
              <p class="font-mono hero-stat-label">Experience</p>
            </div>
            <div class="hero-stat-divider" />
            <div class="hero-stat">
              <p class="hero-stat-num font-heading">100<span>%</span></p>
              <p class="font-mono hero-stat-label">Remote-Ready</p>
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
              &nbsp;&nbsp;role: <span class="cf-str">'developer'</span>,<br>
              &nbsp;&nbsp;stack: [<span class="cf-str">'Vue'</span>, <span class="cf-str">'React'</span>, <span class="cf-str">'Tailwind'</span>]<br>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { MoveRight, Code2, Palette, Linkedin, Github } from 'lucide-vue-next'

// ── CANVAS ──
const bgCanvas = ref(null)

let ctx, W, H, rafId
let targetMouse  = { x: -9999, y: -9999 }
let smoothMouse  = { x: -9999, y: -9999 }
let isMouseInside = false

// Updated repel/attract colors to violet palette
const ACCENT_R = 123, ACCENT_G = 92, ACCENT_B = 250  // #7B5CFA violet
const REPEL_RADIUS   = 100
const REPEL_STRENGTH = 3.0
const ATTRACT_RADIUS = 260
const ATTRACT_STR    = 0.10
const CONN_DIST      = 125

class Particle {
  constructor() { this.init() }
  init() {
    this.x  = Math.random() * W
    this.y  = Math.random() * H
    this.vx = (Math.random() - 0.5) * 0.28
    this.vy = (Math.random() - 0.5) * 0.28
    this.r  = Math.random() * 1.5 + 0.35
    this.base = Math.random() * 0.38 + 0.07
    this.opacity = this.base
    // warm = violet-ish, cool = teal-ish
    this.warm = Math.random() > 0.5
  }
}

let particles = []

function initParticles() {
  const count = Math.floor((W * H) / 8500)
  particles = Array.from({ length: count }, () => new Particle())
}

function draw() {
  ctx.clearRect(0, 0, W, H)

  ctx.fillStyle = '#0A0A0F'
  ctx.fillRect(0, 0, W, H)

  // Mouse aura — violet
  if (isMouseInside && smoothMouse.x > 0) {
    const gm = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, ATTRACT_RADIUS * 1.5)
    gm.addColorStop(0,   `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.13)`)
    gm.addColorStop(0.5, `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.05)`)
    gm.addColorStop(1,   'transparent')
    ctx.fillStyle = gm
    ctx.fillRect(0, 0, W, H)
  }

  // Static ambient glows
  ;[
    [W * 0.08, H * 0.12, W * 0.44, `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.07)`],
    [W * 0.92, H * 0.88, W * 0.38, 'rgba(45,212,191,0.04)'],   // teal corner
  ].forEach(([cx, cy, r, color]) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'transparent')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  })

  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > W) p.vx *= -1
    if (p.y < 0 || p.y > H) p.vy *= -1

    if (isMouseInside && smoothMouse.x > 0) {
      const dx = p.x - smoothMouse.x
      const dy = p.y - smoothMouse.y
      const d  = Math.sqrt(dx * dx + dy * dy)
      if (d < REPEL_RADIUS && d > 0) {
        const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH
        p.vx += (dx / d) * f
        p.vy += (dy / d) * f
        p.opacity = Math.min(1, p.base + (1 - d / REPEL_RADIUS) * 0.7)
      } else if (d < ATTRACT_RADIUS) {
        const f = (1 - d / ATTRACT_RADIUS) * ATTRACT_STR
        p.vx -= (dx / d) * f
        p.vy -= (dy / d) * f
        p.opacity += ((p.base + 0.15) - p.opacity) * 0.06
      } else {
        p.opacity += (p.base - p.opacity) * 0.04
      }
    } else {
      p.opacity += (p.base - p.opacity) * 0.03
    }

    p.vx *= 0.97
    p.vy *= 0.97

    // Violet particles + teal accent particles
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.warm
      ? `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${p.opacity})`
      : `rgba(45,212,191,${p.opacity * 0.55})`
    ctx.fill()
  })

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const d2 = dx * dx + dy * dy
      if (d2 < CONN_DIST * CONN_DIST) {
        const d = Math.sqrt(d2)
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${0.05 * (1 - d / CONN_DIST)})`
        ctx.lineWidth = 0.55
        ctx.stroke()
      }
    }
  }

  // Mouse cursor rings
  if (isMouseInside && smoothMouse.x > 0) {
    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.10)`
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS * 0.38, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.22)`
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},0.8)`
    ctx.fill()
  }
}

function loop() {
  smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.18
  smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.18
  draw()
  rafId = requestAnimationFrame(loop)
}

function onMouseMove(e) {
  const rect = bgCanvas.value.getBoundingClientRect()
  targetMouse.x = e.clientX - rect.left
  targetMouse.y = e.clientY - rect.top
  if (!isMouseInside) {
    smoothMouse.x = targetMouse.x
    smoothMouse.y = targetMouse.y
  }
  isMouseInside = true
}

function onMouseLeave() {
  isMouseInside = false
}

function resize() {
  if (!bgCanvas.value) return
  W = bgCanvas.value.width  = bgCanvas.value.offsetWidth
  H = bgCanvas.value.height = bgCanvas.value.offsetHeight
  initParticles()
}

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' })
}

onMounted(() => {
  ctx = bgCanvas.value.getContext('2d')
  resize()
  loop()
  window.addEventListener('resize', resize, { passive: true })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
})
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
  border: 1px solid rgba(123, 92, 250, 0.25);
  border-radius: 999px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.75rem;
  color: #C4B5FD;
  letter-spacing: 0.04em;
  margin-bottom: 1.75rem;
  background: rgba(123, 92, 250, 0.07);
}
.hero-tag-dot {
  display: block;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #2DD4BF;
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