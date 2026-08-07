// Ordered as a continuum: design → the system that joins them → build.
// Design Systems sits in the middle on purpose; it is the bridge card.
export const skills = [
  {
    icon: 'palette',
    eyebrow: 'start · design',
    title: 'UI/UX Design',
    description:
      'From wireframe to high-fidelity in Figma — I build component systems as I design, so the handoff to code is already half done.',
  },
  {
    icon: 'layers',
    eyebrow: 'connective tissue',
    title: 'Design Systems',
    bridge: true,
    description:
      'I build reusable component libraries that keep interfaces consistent at scale — the same system works in Figma and in code.',
  },
  {
    icon: 'code-xml',
    eyebrow: 'end · build',
    title: 'Frontend Development',
    description:
      'Vue, React, Nuxt, Tailwind — I write the code for what I design. Pixel-faithful, responsive, and production-ready.',
  },
]

export default skills
