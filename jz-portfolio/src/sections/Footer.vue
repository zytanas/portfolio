<template>
  <footer class="relative px-6 py-10 overflow-hidden footer-border">

    <div class="footer-glow" />

    <div class="container relative z-10 max-w-6xl mx-auto">

      <!-- ── MAIN ROW ── -->
      <div class="footer-inner">

        <!-- Brand -->
        <div class="footer-brand">
          <a href="#" @click.prevent="scrollToTop" class="footer-logo-wrap">
            <img
              src="/src/assets/images/jz-circle.webp"
              alt="Julia Almoite"
              class="footer-logo-img"
            />
          </a>
          <p class="footer-desc">
            UI/UX Designer &amp; Frontend Developer crafting intentional digital experiences.
          </p>
        </div>

        <!-- Right: availability + socials -->
        <div class="footer-right">
          <div class="footer-avail">
            <span class="avail-dot" />
            <span class="font-mono text-xs">Open to work · Remote</span>
          </div>
        </div>

      </div>

      <!-- ── DIVIDER ── -->
      <div class="footer-divider" />

      <!-- ── BOTTOM ROW ── -->
      <div class="footer-bottom">
        <p class="font-mono footer-copy">
          &copy; {{ currentYear }} Julia Almoite. All rights reserved.
        </p>
        <p class="font-mono footer-made">
          Designed &amp; built with <span class="coffee">☕</span> in Baguio City
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-border {
  border-top: 1px solid rgba(123,92,250,0.12);
}

.footer-glow {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 200px;
  background: radial-gradient(ellipse at bottom, rgba(123,92,250,0.06), transparent 70%);
  pointer-events: none;
}

/* ── MAIN ROW ── */
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

/* Brand */
.footer-brand {
  display: flex; align-items: center; gap: 1.1rem;
}
.footer-logo-wrap { display: block; flex-shrink: 0; }
.footer-logo-img { height: 52px; width: auto; object-fit: contain; }
.footer-desc {
  font-size: 0.82rem;
  color: rgb(240, 237, 248);
  line-height: 1.65;
  max-width: 260px;
}

/* Right */
.footer-right {
  display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;
}
.footer-avail {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.28rem 0.8rem; border-radius: 999px;
  background: rgba(34,197,94,0.07);
  border: 1px solid rgba(34, 197, 94, 0.986);
  font-size: 0.72rem; color: rgb(240, 237, 248);
}
.avail-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e; box-shadow: 0 0 5px #22c55e;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(1.3); }
}


/* Divider */
.footer-divider { height: 1px; background: rgba(123,92,250,0.08); margin-bottom: 1.5rem; }

/* Bottom row */
.footer-bottom {
  display: flex; align-items: center;
  justify-content: space-between; gap: 1rem; flex-wrap: wrap;
}
.footer-copy {
  font-size: 12px; letter-spacing: 0.1em;
  color: rgb(167, 139, 250);
}
.footer-made {
  font-size: 12px; letter-spacing: 0.08em;
  color: rgb(240, 237, 248);
}
.coffee { color: rgb(124, 92, 250); }
</style>