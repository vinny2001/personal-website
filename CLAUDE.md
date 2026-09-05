# Personal Website — Claude Code Guide

## Project Overview
Vincenzo D'Aria's personal website — a single-page React app deployed to GitHub Pages via `gh-pages`.

- **Live URL:** https://vinny2001.github.io
- **Stack:** React 18, React Router v6 (HashRouter), Vite 8, Tailwind CSS 3, FontAwesome. Bootstrap CSS/JS is imported globally but barely used (`.container` only). Tests run on Vitest.
- **Content is 100% static** — no API, no data fetching. Everything editable lives in `src/content/` and `src/config/`.

## Project Structure
Organized along "bulletproof-react" lines, scaled down for a static site:

```
src/
  app/                     # App shell
    App.jsx                # HelmetProvider > HashRouter > Navbar + <Routes>
  config/
    site.js                # name, url, email
    navigation.js          # `sections` (drives ScrollNav + Navbar anchors) — single source of truth
  content/                 # ← EDIT SITE CONTENT HERE
    about.js  skills.js  experience.js  hero.js
    goals.js               # "This Year's Goals" board items (status + optional blog link)
    blog/
      featured.js          # `featuredSlugs` — 1–3 slugs shown in the homepage "Writing" section
      categories.js        # ordered category groups for the /blog page
  components/               # shared, presentational
    layout/Navbar/  layout/Footer/
    navigation/ScrollNav/
    ui/SectionHeader.jsx  ui/Tag.jsx
  features/
    home/
      Home.jsx             # composes the homepage sections
      components/          # Hero, About, Skills, Experience
    goals/
      components/GoalsBoard.jsx  GoalColumn.jsx  GoalCard.jsx
      Goals.css
    blog/
      components/BlogPreview.jsx  PostCard.jsx  PostList.jsx
      routes/BlogListPage.jsx (/blog)  BlogPostPage.jsx (/blog/:slug)
      lib/formatDate.js  groupPostsByCategory.js  resolveFeatured.js
      posts/
        <slug>.jsx         # ONE FILE PER POST: `export const meta` + default body component
        index.js           # registry — exports `posts`, `postsBySlug`, `postMetaBySlug`
  hooks/
    useFadeIn.js           # scroll-reveal ref helper (replaces the old per-component observers)
  index.jsx  index.css     # entry + design tokens / global utilities
index.html                 # Vite entry HTML (project root, not public/)
public/
  images/                  # static images
vite.config.mjs            # build config + absolute-import aliases + Vitest config
postcss.config.js          # Tailwind + autoprefixer pipeline
tailwind.config.js         # Tailwind theme (maps utilities to the CSS custom props)
eslint.config.mjs          # ESLint flat config
```

**File extensions:** any file containing JSX must be `.jsx` (Vite/rolldown will not
parse JSX out of a `.js` file). Plain-logic modules stay `.js`.

## Key Architectural Notes
- **HashRouter** (`/#/`) for GitHub Pages (no server-side routing). Routes: `/`, `/blog`, `/blog/:slug`.
- **Absolute imports** are rooted at `src/` via `resolve.alias` in `vite.config.mjs` (`app`, `components`, `config`, `content`, `features`, `hooks`) — import `content/goals`, `hooks/useFadeIn`, etc. Add a new top-level `src/` folder to that alias list. Within a feature, use relative paths.
- **Fade-in animations:** attach `className="fade-in"` + a ref from `useFadeIn()`. The hook adds `visible` (via IntersectionObserver, or immediately for above-the-fold content with `useFadeIn({ immediate: true })`). CSS lives in `src/index.css`.
- **Blog slugs** are the shared key across the `/blog/:slug` route, `meta.slug`, the `posts/index.js` registry, `featuredSlugs`, and each goal's optional `link`. The post **filename must equal `meta.slug`**.
- Copyright year is dynamic: `new Date().getFullYear()` (in `components/layout/Footer`).

## Common edits
- **Add a blog post:** create `src/features/blog/posts/<slug>.jsx` (copy an existing one — `export const meta` with `slug/title/date/category/excerpt/tags/readingTime`, plus the default body component), then add one import + one `modules` entry in `src/features/blog/posts/index.js`.
- **Feature posts on the homepage:** edit `featuredSlugs` in `src/content/blog/featured.js` (1–3 slugs, array order = display order).
- **Blog page sections:** edit `src/content/blog/categories.js` (order + blurbs). A post whose `category` isn't listed still appears, under its own trailing heading.
- **Goals board:** edit `src/content/goals.js` — `status: 'wip' | 'done'` picks the column ("In Motion" / "Accomplished"); optional `link: '<blog-slug>'` makes the card a link to that post.
- **Rename a nav label / reorder sections:** `src/config/navigation.js`.

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
- Co-located CSS, globally scoped, hand-namespaced (BEM-ish). Design tokens are CSS custom properties in `src/index.css` with a `prefers-color-scheme: dark` block.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Static data lives in `src/content/` — don't hard-code lists/copy inside components.
