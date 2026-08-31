// Real project list, carried over from the previous portfolio build.
//
// ORDER IS THE HIERARCHY
// The homepage reads this array as three tiers, by position — see
// sections/SelectedWork.vue, which owns the cut points:
//
//   [0]     the lead case study. Rendered as a full always-open card with the
//           `study` narrative below, not as a row. VibeTeams holds this slot
//           because it is the only project where the design was *led* and the
//           Vue frontend *built* by the same person — the argument the whole
//           page is making.
//   [1..2]  supporting featured studies — the existing accordion rows.
//   [3..]   "More work" — a deliberately lighter strip of titles and links.
//
// So reordering this array reweights the homepage. Nothing else to change.
// /selected-work still renders every entry at equal weight, in this same order.
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
    slug: 'vibeteams',
    title: 'VibeTeams',
    /* The one-line summary. The lead card does NOT render this — its narrative
       replaces it — but /selected-work's card and the accordion rows still do,
       so it stays. */
    description:
      'A chat platform where you consult a team of specialist agents, not a single chatbot. Led the UI/UX for the room and agent system in Figma and built the Vue 3 frontend.',
    /* Describes the file that is actually in assets/images/work: the marketing
       landing page hero, not the product. ⚠️ Worth replacing the file with a
       shot of a real room — the agent rail plus a live "Consulting 2 agents"
       state — since that is what the case study below is about. Update this
       line with it. This is the only outstanding item on the lead study; the
       copy itself is final. */
    imageAlt:
      'VibeTeams landing page — “Make smarter decisions now” over a dark gradient, beside a demo video card.',
    tech: ['UI/UX', 'SaaS', 'Vue'],
    links: [{ label: '↗', href: 'https://vibeteams.ai/' }],

    /* ============================================================
       THE DEEP CASE STUDY
       ============================================================
       Only the lead project has this, and it is what makes the lead a case
       study rather than a longer card. components/ProjectLead.vue renders it as
       two columns: the beats on the left, `meta` in a sticky panel on the
       right.

       Beat shapes, all optional past `label`:
         `kicker`  a clause after the label — "The key decision — make the
                   invisible work legible". Reads as part of the heading.
         `body`    prose.
         `items`   a bullet list instead of (or after) prose. Each item is
                   { lead, body }; `lead` is the decision, `body` the tradeoff.

       An empty `body` / `value` renders its `todo` in a visible draft treatment
       — dashed, dimmed, labelled TODO — so an unfinished section is impossible
       to miss rather than silently absent. Nothing here is invented; the copy
       below is Julia's own. */
    study: {
      // Rendered as the card's title + tagline, not as one long h3.
      tagline: 'a chat platform where you consult a team, not a chatbot',

      /* The credit line under the title. Segments rather than one string so the
         · separators are markup and the line can wrap between facts instead of
         mid-fact on a narrow screen.

         Deliberately the same four facts as `meta` below. At desktop that is a
         repeat of the sticky panel two columns to the right — see the note in
         components/ProjectLead.vue, which hides it there and shows it only
         where the panel is not alongside it. */
      roleLine: ['Lead UI/UX + frontend', 'Figma → Vue 3', '~3 months', 'oct 2025 – jan 2026'],

      meta: [
        { label: 'Role', value: 'lead ui/ux + frontend' },
        { label: 'Stack', value: 'figma → vue 3' },
        { label: 'Timeframe', value: '~3 months' },
        { label: 'Year', value: 'oct 2025 – jan 2026' },
      ],

      beats: [
        {
          label: 'Problem',
          body:
            'General AI assistants give you one generalist you re-brief on every question. ' +
            'VibeTeams is built on a different idea: real work gets done by teams of ' +
            'specialists. The product is organized into rooms — a room is a focused team of ~5 ' +
            'agents (a frontend dev team, a content team) that share context, orchestrated by ' +
            'DIVA, the assistant that assembles the team from a plain-language request. The ' +
            'design problem: make a room of five agents feel like a team collaborating, not ' +
            'five chatbots in a list — for a “no tech skills” audience, at scales from one ' +
            'person to an enterprise.',
        },
        {
          label: 'The key decision',
          kicker: 'make the invisible work legible',
          body:
            'The hardest moment in a multi-agent chat is the wait. Several agents work in ' +
            'parallel behind the scenes, and a generic spinner throws away the one thing that ' +
            'makes VibeTeams different: that a team is on it. So I designed the thinking state ' +
            'to narrate the collaboration — DIVA responds first, then the UI surfaces which ' +
            'specific agents are being consulted (“Consulting Creative Catalyst…”, a ' +
            '“Consulting 2 agents” indicator with each agent’s color) before their answers ' +
            'resolve. The tradeoff: speed-of-perception vs. honesty-of-process. The faster path ' +
            'was to buffer everything and show one clean answer. I chose to expose the ' +
            'intermediate steps — more states to design and build — because that legibility IS ' +
            'the value proposition.',
        },
        {
          label: 'Owning both ends',
          body:
            'As lead UI/UX, I owned the design direction and built the Vue 3 frontend myself — ' +
            'which is why the hardest parts came out right. Consulting states, streaming order, ' +
            'thinking transitions — none of that is real in a static Figma frame; it only tells ' +
            'the truth in the running app. Building it myself meant I could tune timing and ' +
            'sequencing live instead of specifying a feeling and hoping it survived handoff. ' +
            'The persistent agent rail came from the same instinct — keep the five agents ' +
            'visible so the team stays present even when only DIVA is talking.',
        },
        {
          label: 'Supporting decisions',
          items: [
            {
              lead: 'DIVA over a config form',
              body:
                'building a team could have been a setup form. I made it conversational — ' +
                'describe the team, DIVA returns a structured, editable 5-agent team. Lower ' +
                'barrier for non-technical users, at the cost of a slower path for power ' +
                'users. Right trade for the audience.',
            },
            {
              lead: 'One system, three scales',
              body:
                'the same room concept holds for a solo user, a family, and an enterprise ' +
                'sharing credits under one group plan — without bloating the interface.',
            },
          ],
        },
      ],
    },

    /* The fifth beat, and the one every featured study carries — see the
       `outcome` note further down this file. Written, so it renders with the
       lime rule rather than as a draft. */
    outcome: {
      body:
        'Shipped end to end in ~3 months and live in production at vibeteams.ai — ' +
        'DIVA-assisted team creation, real-time multi-agent chat with per-agent consulting ' +
        'states, and account management across personal, group, and enterprise plans. ' +
        'Led design and built the Vue 3 frontend.',
    },
  },
  {
    slug: 'coreproc-website',
    title: 'CoreProc, Inc. Website',
    description:
      'Corporate site for a B2B SaaS company. Supporting UI and frontend development — contributed design work in Figma and helped build the site against a cohesive visual language and dev-ready specs.',
    imageAlt: 'CoreProc corporate site homepage — full-width hero over a product feature grid.',
    tech: ['Web', 'Corporate'],
    links: [{ label: '↗', href: 'https://coreproc.com/' }],

    /* ============================================================
       `role` — THE CREDIT LINE ON A SUPPORTING STUDY
       ============================================================
       The featured rows state what the involvement actually was, in the same
       mono voice as the lead card's `study.roleLine` — see the panel in
       components/ProjectRow.vue. One string, not segments: a row's credit is a
       single fact, so it has nothing to wrap between.

       It matters most where the honest answer is "supporting", as here: the
       row says so up front rather than letting the tier imply ownership.

       No `outcome` on this one, deliberately. A support contribution has no
       result of its own to claim, and an empty box would only advertise the
       absence — see the note on SynerPark below. */
    role: 'Supporting UI + dev',
  },
  {
    slug: 'synerpark',
    title: 'SynerPark',
    description:
      'Smart parking payment platform. Designed the mobile-first UX down to a 3-step QR flow and built the Nuxt frontend, tuned for low-end Android devices.',
    imageAlt: 'SynerPark mobile parking flow — the three-step QR payment screens.',
    tech: ['Landing Page', 'UX', 'Nuxt'],
    links: [{ label: '↗', href: 'https://synerpark.com/' }],

    // See the `role` note on the CoreProc entry above.
    role: 'Lead UI/UX + frontend',

    /* ============================================================
       `outcome` — ONE CONCRETE RESULT
       ============================================================
       Rendered in components/CaseOutcome.vue: the lead card shows it as the
       last beat of its narrative, a supporting row at the foot of its panel.
       It is the only line in a study that is a claim rather than a
       description, which is why it gets its own box and the lime rule.

       An empty `body` renders the `todo` prompt as a visible draft, and the
       box withholds the accent until the result is real — so a placeholder can
       never read as a shipped number. Fill in `body`; do not invent a metric.
       A project with no result of its own to claim (CoreProc, and everything
       in the "More work" tier) simply omits the key. */
    outcome: {
      body:
        'Live in production — the payment flow I designed and built is deployed in ' +
        'real parking sites.',
    },
  },
  {
    // The one row with a live preview: `type: 'figma'` switches the header link
    // to "open in figma" and tells the row to render `embedSrc` in a portrait
    // phone frame inside its panel. The embed is only mounted once the row is
    // opened — see ProjectRow.
    type: 'figma',
    slug: 'clowder',
    title: 'Clowder',
    description: 'Mobile app — interactive prototype. Tap through the real flows.',
    imageAlt: 'Clowder mobile app screens — onboarding and main flow from the Figma prototype.',
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
    imageAlt: 'My Shopping Box storefront — editorial product grid with brand-forward type.',
    tech: ['E-commerce', 'Blade'],
    links: [{ label: '↗', href: 'https://my-shoppingbox.com/ph' }],
  },
  {
    slug: 'prestige-paper-products',
    title: 'Prestige Paper Products',
    description:
      'Full frontend revamp of an outdated storefront into an editorial-style site for a paper goods brand, including a responsive product gallery and a reusable layout system.',
    imageAlt: 'Prestige Paper Products storefront after the revamp — responsive product gallery.',
    tech: ['Revamp', 'E-commerce', 'Vue'],
    links: [],
  },
  {
    slug: 'adrians-portfolio',
    title: "Adrian's Portfolio",
    description:
      'A fully custom portfolio — no template — designed in Figma and shipped solo. TSX and Tailwind with scroll-based animation, deployed on Vercel.',
    imageAlt: "Adrian's portfolio homepage — custom scroll-based layout in TSX and Tailwind.",
    tech: ['Portfolio', 'TSX', 'Tailwind'],
    links: [{ label: '↗', href: 'https://lemonadezzz.vercel.app/' }],
  },
]

export default projects
