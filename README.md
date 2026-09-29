Portfolio

Personal portfolio of Julia Almoite, UI/UX Engineer & QA.

**Live:** [juliaalmoite.netlify.app](https://juliaalmoite.netlify.app)

---

## ■ Stack

- **Framework:** Vue 3 + Nuxt
- **Prerendering:** vite-ssg (static output)
- **Hosting:** Netlify

## ■ Design System

The site follows a strict monochrome terminal aesthetic:

| Token | Value |
| --- | --- |
| Background | `#0a0a0a` with a dotted radial-gradient pattern |
| Accent (only) | `#b8e34a` (lime) |
| Typography | Monospace throughout |
| Frames | Dashed borders |
| Bullets | `■` |

**Ink-reveal flip:** press `T` anywhere on the site to flip into the alternate ink-reveal view.

## ■ Sections

- **Preloader** — scan-in animation with a pixel-art logo reveal. Displays for a minimum of 1750ms on first visit; a `sessionStorage` flag triggers a condensed replay on same-session refresh.
- **Selected Work** — terminal / file-tree accordion (single-open), with embedded Figma prototypes and dedicated link buttons on mobile.
- **Core Skills**
- **Recommendations**
- **Contact** — with a dedicated mobile layout.

## ■ Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build the static site
npm run build

# preview the production build
npm run preview
```

## ■ Deployment

The site deploys to Netlify. Pushes to `main` trigger a build, and the prerendered static output is published.

<!-- Update these to match your Netlify settings -->
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## ■ Branch Naming

`type/short-description`, e.g. `feat/seo-improvements`, `fix/contact-mobile-layout`, `chore/update-deps`.

---

© Julia Almoite
