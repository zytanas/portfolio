<template>
  <div class="identity-panel">
    <!-- Avatar block -->
    <div class="avatar-block">
      <div class="avatar-ring" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <div class="avatar-inner">
          <img :src="isHovered ? avatarDark : avatar" alt="Julia Almoite" class="avatar-img" />
        </div>
      </div>
    </div>

    <!-- Name + role -->
    <div class="identity-name-block">
      <h3 class="identity-name font-heading">Julia Almoite</h3>
      <p class="font-mono identity-role">UI/UX Designer · Frontend Dev</p>
    </div>

    <!-- Bio -->
    <p class="identity-bio">
      I'm a designer who codes and a developer who cares about aesthetics.
      Based in the <span class="bio-accent">Philippines</span>, working remotely with
      teams and clients worldwide. I bridge the gap between creative vision
      and technical execution — so nothing ever gets lost in handoff.
    </p>

    <!-- Quick facts -->
    <div class="quick-facts">
      <div class="qf-row">
        <span class="font-mono qf-label">Location</span>
        <span class="qf-value">Baguio City, Philippines</span>
      </div>
      <div class="qf-row">
        <span class="font-mono qf-label">Current Role</span>
        <span class="qf-value">Jr. UI/UX Engineer <span class="text-[#2DD4BF]">@Coreproc, Inc.</span></span>
      </div>
      <div class="qf-row">
        <span class="font-mono qf-label">Open to</span>
        <span class="qf-value">Full-time Remote · Freelance </span>
      </div>
      <div class="qf-row">
        <span class="font-mono qf-label">Degree</span>
        <span class="qf-value">BS Information Technology</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import avatar from '../assets/images/avatar.webp'
import avatarDark from '../assets/images/avatar-dark.webp'

const isHovered = ref(false)
</script>

<style scoped>
.identity-panel {
  display: flex; flex-direction: column; gap: 1.5rem;
}
@media (min-width: 768px) {
  .identity-panel {
    position: sticky;
    top: 100px;
  }
}

/* Avatar */
.avatar-block {
  display: flex; align-items: center; gap: 1rem;
}
.avatar-ring {
  width: 200px; height: 200px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #7B5CFA, #2DD4BF, #7B5CFA);
  padding: 2px;
  flex-shrink: 0;
}
@media (min-width: 768px) {
  .avatar-ring {
    width: 200px; height: 200px;
  }
}
.avatar-inner {
  width: 100%; height: 100%;
  border-radius: 50%;
  background: #0D0D1A;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.avatar-img {
  width: 100%; height: 100%;
  object-fit: cover;
}

/* Name + role */
.identity-name { font-size: 1.5rem; font-weight: 800; color: #F0EDF8; line-height: 1.1; margin-bottom: 0.2rem; }
.identity-role { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #2DD4BF; }

/* Bio */
.identity-bio {
  font-size: 0.9rem; color: rgba(240,237,248,0.65);
  line-height: 1.75; padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(123,92,250,0.1);
}
.bio-accent { color: #A78BFA; font-weight: 500; }

/* Quick facts */
.quick-facts { display: flex; flex-direction: column; gap: 0.65rem; }
.qf-row {
  display: flex; align-items: baseline;
  gap: 1rem; flex-wrap: wrap;
}
.qf-label {
  font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  color: #2DD4BF; width: 80px; flex-shrink: 0;
}
.qf-value { font-size: 0.8rem; color: rgba(240,237,248,0.7); }
</style>