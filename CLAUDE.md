# Personal Website — Claude Code Guide

## Project Overview
Vincenzo D'Aria's personal website — a multi-page React app (client-side routed) deployed to GitHub Pages via `gh-pages`.

- **Live URL:** https://vinny2001.github.io
- **Stack:** React 18, React Router v6 (HashRouter), Vite 8, Tailwind CSS 3 (preflight on), Motion (`motion/react`), Lucide (`lucide-react`) for UI icons, FontAwesome brands for logos only. Tests run on Vitest.
- **Content is 100% static** — no API, no data fetching. Everything editable lives in `src/content/` and `src/config/`.

## Design system ("Editorial")
- Paper/ink palette + one vermilion accent; tokens are CSS custom properties in `src/index.css`, exposed to Tailwind as `paper`, `paper-raised`, `paper-sunken`, `ink`, `ink-soft`, `ink-muted`, `rule`, `accent`, `accent-hover`, `accent-wash`. Bare `border` draws the hairline colour.
- **Theme:** `data-theme="light|dark"` on `<html>`, set pre-paint by the inline script in `index.html` and toggled by `hooks/useTheme` (circular View-Transition reveal). Tokens flip under `:root[data-theme='dark']` — don't use Tailwind `dark:` utilities.
- **Type:** `font-display` Instrument Serif (400 + italic only — never bold), `font-sans` Inter Tight, `font-mono` JetBrains Mono. Global classes: `.kicker` (mono label), `.link-draw` (underline draws in), `.prose-editorial` (long-form copy).
- **Motion:** tasteful only — reveals, staggers, hover nudges, layout animations; nothing loops forever. Timing lives in `components/motion/presets.js`; `<MotionConfig reducedMotion="user">` is global.
- **Icons:** Lucide with `aria-hidden="true"` + `strokeWidth={1.75}`. Lucide has no brand logos — those come from FontAwesome via `content/socials.js`.

## Project Structure
Organized along "bulletproof-react" lines, scaled down for a static site:

```
src/
  app/
    App.jsx                # HelmetProvider > MotionConfig > HashRouter > SkipLink, Navbar, AppRoutes, Footer
    AppRoutes.jsx          # route table + animated page transitions (scrolls to top between pages)
    NotFoundPage.jsx       # `*` route
  config/
    site.js                # name, url, email
    navigation.js          # `navLinks` (Navbar, mobile menu, footer index, "№ 0X" page kickers) + `navLinkFor`
  content/                 # ← EDIT SITE CONTENT HERE
    hero.js  now.js  home.js          # homepage intro, "Now" list, featured-section titles/order
    about.js  skills.js  experience.js
    goals.js               # goals (status + optional blog link) + goals page copy
    socials.js  footer.js
    blog/
      featured.js          # `featuredSlugs` — 1–3 slugs shown in the homepage "Writing" section
      categories.js        # ordered category groups for the /blog page
      page.js              # /blog page copy
  components/              # shared, presentational
    layout/                # Container, Navbar/ (+ MobileMenu, ThemeToggle), Footer/, SkipLink
    motion/                # Reveal / RevealGroup / RevealItem, PageTransition, presets
    seo/PageMeta.jsx       # per-route <head> tags (Helmet)
    ui/                    # PageHeader, SectionHeader, ArrowLink, Tag, SocialLinks
  features/                # one folder per route; each has routes/, components/, lib/ as needed
    home/                  # /         Hero, NowCard, HomeSection, useTypewriter
    about/                 # /about    Bio, FactList, SkillIndex
    work/                  # /work     CompanyGroup, RoleEntry, CurrentRole (home teaser), lib/dates + roles
    goals/                 # /goals    GoalFilter, GoalList, ProgressMeter, GoalsSnapshot (home teaser)
    blog/                  # /blog, /blog/:slug   PostRow, PostList, ReadingProgress, FeaturedPosts (home teaser)
      posts/
        <slug>.jsx         # ONE FILE PER POST: `export const meta` + default body component
        index.js           # registry — exports `posts`, `postsBySlug`, `postMetaBySlug`
  hooks/                   # useTheme, useScrolled
  utils/                   # links (linkProps/isExternal), dates (formatDate/formatMonthYear)
  index.jsx  index.css     # entry + design tokens / global primitives
index.html                 # Vite entry HTML (project root, not public/) — fonts, favicon, pre-paint theme script
public/
  favicon.svg  images/     # static assets (keep photos ≤ 1600px on the long edge)
vite.config.mjs            # build config + absolute-import aliases + Vitest config
tailwind.config.js         # maps Tailwind utilities to the CSS tokens
eslint.config.mjs          # ESLint flat config
```

**File extensions:** any file containing JSX must be `.jsx` (Vite/rolldown will not
parse JSX out of a `.js` file). Plain-logic modules stay `.js`.

## Key Architectural Notes
- **HashRouter** (`/#/`) for GitHub Pages (no server-side routing). Routes: `/`, `/about`, `/work`, `/goals`, `/blog`, `/blog/:slug`, `*`. Top-level paths mirror `navLinks` — add a page in both `config/navigation.js` and `app/AppRoutes.jsx`.
- **Page anatomy:** `<PageMeta>` + `<PageHeader>` (the page's only `<h1>`, kicker auto-numbered from `navLinks`) + `<Container>` blocks. The shell already provides `<main>`, the footer, and scroll-to-top — pages must not. Home is the exception: its Hero holds the `<h1>`.
- **Home teasers** (`CurrentRole`, `GoalsSnapshot`, `FeaturedPosts`) live in their own features and render inner content only (no `<section>`/heading/"view all" link — `HomePage` wraps them). They size themselves by container query, not viewport.
- **Absolute imports** are rooted at `src/` via `resolve.alias` in `vite.config.mjs` (`app`, `components`, `config`, `content`, `features`, `hooks`, `utils`). Add a new top-level `src/` folder to that alias list. Within a feature, use relative paths.
- **Scroll reveals:** wrap with `Reveal` / `RevealGroup` + `RevealItem` from `components/motion/Reveal` (`as`, `delay`, `stagger`, `immediate`).
- **Blog slugs** are the shared key across the `/blog/:slug` route, `meta.slug`, the `posts/index.js` registry, `featuredSlugs`, and each goal's optional `link`. The post **filename must equal `meta.slug`**.

## Common edits
- **Add a blog post:** create `src/features/blog/posts/<slug>.jsx` (copy an existing one — `export const meta` with `slug/title/date/category/excerpt/tags/readingTime`, plus the default body component returning a fragment), then add one import + one `modules` entry in `src/features/blog/posts/index.js`. Give `<img>` real `width`/`height` + `loading="lazy"`.
- **Feature posts on the homepage:** edit `featuredSlugs` in `src/content/blog/featured.js` (1–3 slugs, array order = display order).
- **Blog page sections:** edit `src/content/blog/categories.js` (order + blurbs). A post whose `category` isn't listed still appears, under its own trailing heading.
- **Goals:** edit `src/content/goals.js` — `icon` is a Lucide component, `status: 'wip' | 'done'`, optional `link: '<blog-slug>'`. Bump `goalsYear` for a new year.
- **"Now" list:** edit `src/content/now.js` and bump `updated`.
- **Experience:** `src/content/experience.js` — `start`/`end` are `'YYYY-MM'` (`end: null` = current role).
- **Rename a nav label / reorder pages:** `src/config/navigation.js` (page numbers follow the order).

## Commands
```bash
npm start          # Vite dev server at http://localhost:3000 (alias: npm run dev)
npm run build      # Production build → /build (Vite; outDir kept as /build for deploy)
npm run preview    # Serve the production build locally
npm test           # Vitest (single run); npm run test:watch for watch mode
npm run lint       # ESLint flat config (eslint.config.mjs) — js/react/hooks/jsx-a11y/import + prettier
npm run format     # Prettier over src/**/*.{js,jsx,css}
npm run deploy     # Builds then publishes /build to the gh-pages branch
```

## Deployment
`npm run deploy` pushes `/build` to the `gh-pages` branch, which GitHub Pages serves. Always deploy (not just build) to publish.

## Conventions
- Functional components only; plain JavaScript/JSX (no TypeScript, no PropTypes). JSX files use the `.jsx` extension.
- Tailwind utilities first (token colours only); co-located CSS (globally scoped, hand-namespaced BEM-ish, using the CSS vars) only for what utilities can't express — pseudo-elements, container queries, drop caps.
- HTML5 semantics: one `<h1>` per page, labelled `<section aria-labelledby>`, real lists, `<time dateTime>`, `<article>` for entries; buttons for actions, links for navigation.
- External links use `target="_blank" rel="noopener noreferrer"` — `linkProps(href)` / `ArrowLink` handle it.
- Static data lives in `src/content/` — don't hard-code lists/copy inside components. Pure derived logic goes in `features/<x>/lib/` with unit tests.
