// Ordered as a continuum: design → the system that joins them → build.
// Design Systems sits in the middle on purpose; it is the bridge card.
//
// The copy argues the *advantage*, not the inventory. Each card names the thing
// that stops being a problem because one person holds all three — no handoff to
// lose the intent, no spec to go stale, no design decision that dies on contact
// with the code. Three disciplines listed side by side is a CV; three
// disciplines in one pair of hands is the reason to hire.
export const skills = [
  {
    icon: 'palette',
    eyebrow: 'start · design',
    title: 'UI/UX Design',
    description:
      'I design knowing exactly what it costs to build, so nothing gets specced that has to be walked back later. Wireframe to high-fidelity in Figma, already shaped for the code it becomes.',
  },
  {
    icon: 'layers',
    eyebrow: 'connective tissue',
    title: 'Design Systems',
    bridge: true,
    description:
      'One system, defined once, living in Figma and in the components at the same time. There is no translation step to drift out of sync — because there is no translation step.',
  },
  {
    icon: 'code-xml',
    eyebrow: 'end · build',
    title: 'Frontend Development',
    description:
      'I build what I designed, in Vue, React, Nuxt and Tailwind. The intent survives to production intact — the person defending the details in the code is the one who chose them.',
  },
]

export default skills
