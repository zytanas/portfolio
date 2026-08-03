// Real project list, carried over from the previous portfolio build.
// The work section renders these as a numbered index, in order, so the
// leading entries are the ones read first — the case studies lead.
//
// IMAGERY
// There is no `image` field. A project's picture is resolved by convention
// from its `slug` — drop a file at
//
//   src/assets/images/work/<slug>.webp
//
// and it appears on the /selected-work card, in the homepage accordion panel,
// and as the hover preview on the collapsed row. Nothing else to wire up. See
// components/ProjectThumb.vue for the lookup, and the README in that folder
// for sizing.
//
// A project with no file falls back to a typographic tile, so the grid is
// never holed while artwork is outstanding. `imageAlt` describes the shot for
// screen readers and is worth writing before the file exists.
export const projects = [
   {
    slug: 'coreproc-website',
    title: 'CoreProc, Inc. Website',
    description:
      'Corporate site for a B2B SaaS company. Designed the full website in Figma with a cohesive visual language and dev-ready specs.',
    imageAlt:
      'CoreProc corporate site homepage — full-width hero over a product feature grid.',
    tech: ['Web', 'Corporate', 'Figma'],
    links: [{ label: '↗', href: 'https://coreproc.com/' }],
  },
  {
    slug: 'vibeteams',
    title: 'VibeTeams',
    description:
      'Team collaboration SaaS with analytics, reporting, and a dashboard-driven workflow. Designed the component system in Figma and built the Vue 3 frontend, owning both ends of the handoff.',
    imageAlt:
      'VibeTeams dashboard — analytics cards and reporting charts in the Vue 3 UI.',
    tech: ['UI/UX', 'SaaS', 'Vue'],
    links: [{ label: '↗', href: 'https://vibeteams.ai/' }],
  },
  {
    // The one row with a live preview: `type: 'figma'` switches the header link
    // to "open in figma" and tells the row to render `embedSrc` in a portrait
    // phone frame inside its panel. The embed is only mounted once the row is
    // opened — see ProjectRow.
    type: 'figma',
    slug: 'clowder',
    title: 'Clowder',
    description:
      'Mobile app — interactive prototype. Tap through the real flows.',
    imageAlt:
      'Clowder mobile app screens — onboarding and main flow from the Figma prototype.',
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
    slug: 'my-shopping-box',
    title: 'My Shopping Box',
    description:
      'E-commerce product showcase with an editorial layout and brand-forward identity. Blade templates, reusable product cards, and an image pipeline that keeps a growing SKU catalog fast.',
    imageAlt:
      'My Shopping Box storefront — editorial product grid with brand-forward type.',
    tech: ['E-commerce', 'Blade'],
    links: [{ label: '↗', href: 'https://my-shoppingbox.com/ph' }],
  },
  {
    slug: 'prestige-paper-products',
    title: 'Prestige Paper Products',
    description:
      'Full frontend revamp of an outdated storefront into an editorial-style site for a paper goods brand, including a responsive product gallery and a reusable layout system.',
    imageAlt:
      'Prestige Paper Products storefront after the revamp — responsive product gallery.',
    tech: ['Revamp', 'E-commerce', 'Vue'],
    links: [],
  },
  {
    slug: 'synerpark',
    title: 'SynerPark',
    description:
      'Smart parking payment platform. Designed the mobile-first UX down to a 3-step QR flow and built the Nuxt frontend, tuned for low-end Android devices.',
    imageAlt:
      'SynerPark mobile parking flow — the three-step QR payment screens.',
    tech: [ 'Landing Page', 'UX', 'Nuxt'],
    links: [{ label: '↗', href: 'https://synerpark.com/' }],
  },
  {
    slug: 'adrians-portfolio',
    title: "Adrian's Portfolio",
    description:
      'A fully custom portfolio — no template — designed in Figma and shipped solo. TSX and Tailwind with scroll-based animation, deployed on Vercel.',
    imageAlt:
      'Adrian\'s portfolio homepage — custom scroll-based layout in TSX and Tailwind.',
    tech: ['Portfolio', 'TSX', 'Tailwind'],
    links: [{ label: '↗', href: 'https://lemonadezzz.vercel.app/' }],
  },
]

export default projects
