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

          <!-- Eyebrow -->
          <div
            class="flex items-center gap-3 mb-8 fade-up"
            style="animation-delay:0.1s"
          >
            <span class="eyebrow-pip" />
            <p class="section-eyebrow">// Hello World</p>
            <span class="eyebrow-pip" />
          </div>

          <!-- Name block -->
          <div class="fade-up" style="animation-delay:0.25s">
            <p class="hi-im font-heading">Hi, I'm</p>
            <h1 class="hero-name font-heading">
              <span
                v-for="(char, i) in 'Julia'"
                :key="i"
                class="name-char"
                :style="{ '--i': i }"
              >{{ char }}</span>
            </h1>
          </div>

          <!-- Description -->
          <p
            class="max-w-md text-base leading-relaxed mt-7 font-body desc-text fade-up"
            style="animation-delay:0.58s"
          >
            I <strong class="font-semibold text-red-400">build</strong> what I <strong class="font-semibold text-red-400">design</strong> —
            from pixel-perfect layouts to clean, production-ready code.
            Every detail crafted for seamless, user-focused experiences.
          </p>

          <!-- Divider -->
          <div class="mt-8 divider-line fade-up" style="animation-delay:0.68s" />

          <!-- CTA Buttons -->
          <div class="flex flex-wrap justify-center gap-3 mt-8 md:justify-start fade-up" style="animation-delay:0.78s">
            <button
              @click="scrollToContact"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-primary rounded-xl font-body"
            >
              Let's Talk
              <MoveRight class="w-4 h-4" />
            </button>
            <button
              @click="showCVModal = true"
              class="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300 cta-secondary rounded-xl font-body"
            >
              View Resume
              <FileText class="w-4 h-4" />
            </button>
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
              <p class="split-role font-heading">Web Designer</p>
              <p class="font-mono split-desc">UI/UX · Figma · Design Systems</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ── CORNER BADGES ── -->
    <div class="role-badge fade-up" style="animation-delay:1.05s">
      <span class="role-badge-dot" />
      <span class="font-mono text-xs text-white">Available for work</span>
    </div>

    <div class="stat-card fade-up" style="animation-delay:1.1s">
      <p class="text-[#66ff99] font-bold text-xl leading-none font-heading">2+</p>
      <p class="font-mono text-xs mt-0.5 stat-lbl">yrs exp.</p>
    </div>

    <!-- Mouse hint fades once user interacts -->
    <p class="font-mono mouse-hint" :class="{ gone: hasInteracted }">
      move cursor to interact
    </p>

    <!-- CV Modal -->
    <CVModal :isOpen="showCVModal" @close="showCVModal = false" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MoveRight, FileText, Code2, Palette, Linkedin, Github } from 'lucide-vue-next'
import CVModal from '../components/CVModal.vue'

const showCVModal = ref(false)

// ── CANVAS ──
const bgCanvas = ref(null)
const hasInteracted = ref(false)

let ctx, W, H, rafId
let targetMouse  = { x: -9999, y: -9999 }
let smoothMouse  = { x: -9999, y: -9999 }
let isMouseInside = false

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
    this.warm = Math.random() > 0.65
  }
}

let particles = []

function initParticles() {
  const count = Math.floor((W * H) / 8500)
  particles = Array.from({ length: count }, () => new Particle())
}

function draw() {
  ctx.clearRect(0, 0, W, H)

  ctx.fillStyle = '#080808'
  ctx.fillRect(0, 0, W, H)

  if (isMouseInside && smoothMouse.x > 0) {
    const gm = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, ATTRACT_RADIUS * 1.5)
    gm.addColorStop(0,   'rgba(255,102,104,0.11)')
    gm.addColorStop(0.5, 'rgba(255,102,104,0.04)')
    gm.addColorStop(1,   'transparent')
    ctx.fillStyle = gm
    ctx.fillRect(0, 0, W, H)
  }

  ;[
    [W * 0.08, H * 0.12, W * 0.44, 'rgba(255,102,104,0.07)'],
    [W * 0.92, H * 0.88, W * 0.38, 'rgba(200,60,60,0.05)'],
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

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.warm
      ? `rgba(255,102,104,${p.opacity})`
      : `rgba(255,170,150,${p.opacity * 0.65})`
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
        ctx.strokeStyle = `rgba(255,102,104,${0.05 * (1 - d / CONN_DIST)})`
        ctx.lineWidth = 0.55
        ctx.stroke()
      }
    }
  }

  if (isMouseInside && smoothMouse.x > 0) {
    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,102,104,0.08)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, REPEL_RADIUS * 0.38, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,102,104,0.20)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(smoothMouse.x, smoothMouse.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,102,104,0.75)'
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
  if (!hasInteracted.value) hasInteracted.value = true
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
  background: radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(4,4,4,0.78) 100%);
}

/* ── SCANLINES ── */
.scanlines {
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.035) 2px, rgba(0,0,0,0.035) 4px
  );
}

/* ── EYEBROW ── */
.section-eyebrow {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #66ff99;
}
.eyebrow-pip {
  display: block;
  width: 36px; height: 1px;
  background: rgba(255,102,104,0.45);
}

/* ── HI I'M ── */
.hi-im {
  font-size: clamp(48px, 3.5vw, 56px);
  font-weight: 800;
  color: rgba(255,255,255,0.72);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 4px;
}

/* ── HERO NAME ── */
.hero-name {
  font-size: clamp(96px, 11vw, 160px);
  font-weight: 800;
  line-height: 0.88;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
}
@media (min-width: 768px) {
  .hero-name { justify-content: flex-start; }
}
.name-char {
  display: inline-block;
  color: #FF6668;
  text-shadow:
    0 0 40px rgba(255,102,104,0.55),
    0 0 80px rgba(255,102,104,0.22),
    0 0 160px rgba(255,102,104,0.08);
  animation: charFloat 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.12s);
}
@keyframes charFloat {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-8px); }
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

/* ── DUAL ROLE TAGS ── */
.role-tags {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
@media (min-width: 768px) {
  .role-tags { justify-content: flex-start; }
}

.role-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: box-shadow 0.3s;
}

.role-tag--outline {
  background: transparent;
  color: #66ff99;
  border: 1.5px solid #66ff99;
}
.role-divider {
  font-size: 0.7rem;
  color: rgba(255,102,104,0.45);
  letter-spacing: 0.1em;
}

/* ── DESC ── */
.desc-text { color: rgb(255, 255, 255); }

/* ── DIVIDER ── */
.divider-line {
  width: 100%; max-width: 360px;
  height: 1px;
  background: rgba(255,102,104,0.12);
}

/* ── CTA ── */
.cta-primary {
  background: #FF6668; color: #fff;
  border: 1px solid #FF6668;
}
.cta-primary:hover { background: transparent; color: #FF6668; }
.cta-secondary {
  background: rgba(255,102,104,0.08); color: #fff;
  border: 1px solid rgba(255,102,104,0.28);
}
.cta-secondary:hover {
  background: rgba(255,102,104,0.16);
  border-color: rgba(255,102,104,0.6);
}

/* ── SOCIALS ── */
.social-label { color: rgb(255, 255, 255); }
.hero-social-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(255,102,104,0.08);
  border: 1px solid rgba(255,102,104,0.18);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.hero-social-btn:hover {
  background: #FF6668; border-color: #FF6668;
  transform: translateY(-2px);
}

/* ── SPLIT PANEL ── */
.split-panel-wrap {
  display: flex;
  flex-direction: row; /* side by side on mobile */
  height: 160px;
  border: 1px solid rgba(255,102,104,0.12);
  border-radius: 12px;
  overflow: hidden;
  gap: 1px;
  width: 100%;
}
@media (min-width: 768px) {
  .split-panel-wrap {
    flex-direction: column; /* stacked on desktop (sits in right grid column) */
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
  background: linear-gradient(135deg, #0d0d10 0%, #141420 100%);
  border-bottom: 1px solid rgba(255,102,104,0.08);
}
.split-panel--dev::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 24px,
    rgba(255,102,104,0.04) 24px,
    rgba(255,102,104,0.04) 25px
  );
}

.split-panel--design {
  background: linear-gradient(135deg, #0f0a0b 0%, #18080a 100%);
}
.split-panel--design::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,102,104,0.07) 0%, transparent 70%);
}

/* floating code snippet */
.code-float {
  position: absolute;
  top: 1rem; right: 1.25rem;
  font-size: 0.6rem;
  line-height: 1.9;
  color: rgba(255,255,255,0.18);
  text-align: right;
  pointer-events: none;
  opacity: 0.7;
}
.cf-kw  { color: rgba(255,102,104,0.7); }
.cf-str { color: rgba(126,200,164,0.7); }

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
  background: #FF6668;
  border-radius: 2px;
  width: 100%; height: 100%;
}
.design-dot:nth-child(3n) { opacity: 0.4; }
.design-dot:nth-child(2n) { opacity: 0.6; }

.split-panel__body { position: relative; z-index: 1; }

.split-icon {
  font-size: 1.1rem;
  color: #66ff99;
  opacity: 0.65;
  margin-bottom: 0.25rem;
  line-height: 1;
}
@media (min-width: 768px) {
  .split-icon { font-size: 1.6rem; margin-bottom: 0.35rem; }
}
.split-role {
  font-size: 0.95rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
  margin-bottom: 0.25rem;
}
@media (min-width: 768px) {
  .split-role { font-size: 1.3rem; margin-bottom: 0.35rem; }
}
.split-desc {
  font-size: 0.65rem;
  color: #66ff99;
  letter-spacing: 0.06em;
  line-height: 1.6;
}

/* ── BADGES ── */
.role-badge {
  position: absolute;
  bottom: 44px; left: clamp(20px, 5vw, 80px);
  display: flex; align-items: center; gap: 8px;
  background: rgba(10,4,4,0.84);
  border: 1px solid rgba(255,102,104,0.28);
  border-radius: 999px; padding: 6px 14px;
  backdrop-filter: blur(12px); z-index: 20;
}
.role-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e; box-shadow: 0 0 6px #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:0.5; transform:scale(1.3); }
}

.stat-card {
  position: absolute;
  top: clamp(88px, 11vh, 130px); right: clamp(20px, 5vw, 80px);
  background: rgba(10,4,4,0.84);
  border: 1px solid #66ff99;
  border-radius: 14px; padding: 12px 18px;
  backdrop-filter: blur(12px); text-align: center; z-index: 20;
}
.stat-lbl { color: rgb(255, 255, 255); }

/* ── MOUSE HINT ── */
.mouse-hint {
  position: absolute;
  bottom: 48px; right: clamp(20px, 5vw, 80px);
  font-size: 10px; letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2ef377;
  z-index: 20; pointer-events: none;
  transition: opacity 0.8s ease;
  animation: hintPulse 2.5s ease-in-out infinite;
  display: none; /* Hidden on mobile by default */
}
@media (min-width: 768px) {
  .mouse-hint { display: block; }
}
.mouse-hint.gone { opacity: 0; }
@keyframes hintPulse {
  0%,100% { opacity: 0.35; }
  50%     { opacity: 0.65; }
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