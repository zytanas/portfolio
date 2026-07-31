<template>
  <div class="cta">
    <h2>Let's build something<br />worth clicking.</h2>
    <p class="lede">
      Open to frontend and UI/UX roles, design-system work, and freelance projects.
    </p>
    <div class="row-center">
      <a class="btn solid" href="mailto:juliazyrene23@gmail.com">juliazyrene23@gmail.com</a>
      <a class="btn" href="https://github.com/zytanas" target="_blank" rel="noopener noreferrer"
        >GitHub ↗</a
      >
    </div>
  </div>
</template>

<style scoped>
.cta {
  text-align: center;
  padding: 68px 24px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
.cta h2 {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  line-height: 1.2;
  margin: 16px 0 18px;
}
.cta .lede {
  margin: 0 auto 24px;
}
.row-center {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
