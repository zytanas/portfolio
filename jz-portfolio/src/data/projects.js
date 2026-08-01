// Real project list, carried over from the previous portfolio build.
// The work section renders these as a numbered index, in order, so the
// leading entries are the ones read first — the case studies lead.
export const projects = [
   {
    title: 'CoreProc, Inc. Website',
    description:
      'Corporate site for a B2B SaaS company. Designed the full website in a cohesive visual language and dev-ready specs.',
    tech: ['Web', 'Corporate'],
    links: [{ label: '↗', href: 'https://coreproc.com/' }],
  },
  {
    title: 'VibeTeams',
    description:
      'Team collaboration SaaS with analytics, reporting, and a dashboard-driven workflow. Designed the component system in Figma and built the Vue 3 frontend, owning both ends of the handoff.',
    tech: ['UI/UX', 'SaaS', 'Vue'],
    links: [{ label: '↗', href: 'https://vibeteams.ai/' }],
  },
  {
    // The one row with a live preview: `type: 'figma'` switches the header link
    // to "open in figma" and tells the row to render `embedSrc` in a portrait
    // phone frame inside its panel. The embed is only mounted once the row is
    // opened — see ProjectRow.
    type: 'figma',
    title: 'Clowder',
    description:
      'Mobile app — interactive prototype. Tap through the real flows.',
    tech: ['Mobile', 'Figma'],
    embedSrc:
      'https://embed.figma.com/proto/c57h2VKgCZVVJzEPejFn1c/clowder?node-id=4-3138&embed-host=coreproc&scaling=scale-down&content-scaling=fixed&hide-ui=1',
    links: [
      {
        label: '↗',
        href: 'https://www.figma.com/proto/c57h2VKgCZVVJzEPejFn1c/clowder?node-id=4-3138',
      },
    ],
  },
  {
    title: 'My Shopping Box',
    description:
      'E-commerce product showcase with an editorial layout and brand-forward identity. Blade templates, reusable product cards, and an image pipeline that keeps a growing SKU catalog fast.',
    tech: ['E-commerce', 'Blade'],
    links: [{ label: '↗', href: 'https://my-shoppingbox.com/ph' }],
  },
  {
    title: 'Prestige Paper Products',
    description:
      'Full frontend revamp of an outdated storefront into an editorial-style site for a paper goods brand, including a responsive product gallery and a reusable layout system.',
    tech: ['Revamp', 'E-commerce', 'Vue'],
    links: [],
  },
  {
    title: 'SynerPark',
    description:
      'Smart parking payment platform. Designed the mobile-first UX down to a 3-step QR flow and built the Nuxt frontend, tuned for low-end Android devices.',
    tech: [ 'Landing Page', 'UX', 'Nuxt'],
    links: [{ label: '↗', href: 'https://synerpark.com/' }],
  },
  {
    title: "Adrian's Portfolio",
    description:
      'A fully custom portfolio — no template — designed in Figma and shipped solo. TSX and Tailwind with scroll-based animation, deployed on Vercel.',
    tech: ['Portfolio', 'TSX', 'Tailwind'],
    links: [{ label: '↗', href: 'https://lemonadezzz.vercel.app/' }],
  },
]

export default projects
