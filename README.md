# Personal Website

Vincenzo D'Aria's personal site: a multi-page React app (Vite + React Router) with an editorial
design, deployed to GitHub Pages at **https://www.vincenzodaria.com**.

**Pages:** Home · About · Work · Goals · Blog · Contact

**Stack:** React 18, React Router 6 (HashRouter), Vite 8, Tailwind CSS 3, Motion, Lucide icons
(FontAwesome for brand logos), Vitest.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server at http://localhost:3000 |
| `npm run build` | Production build → `build/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Test suite (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier over `src/**/*.{js,jsx,css}` |
| `npm run deploy` | Build, then publish `build/` to the `gh-pages` branch |

## Editing content

All copy and data is static and lives under `src/content/` and `src/config/`:

| File | What it controls |
| --- | --- |
| `content/hero.js`, `now.js`, `home.js` | Home intro, the "Now" list, and the home sections' titles and order |
| `content/about.js`, `skills.js`, `certifications.js`, `publications.js` | `/about`: bio, facts, skills index, Credly badges, publications |
| `content/experience.js` | `/work` timeline (`start`/`end` as `'YYYY-MM'`; `end: null` = current role) |
| `content/goals.js` | `/goals` and the home snapshot (`status: 'wip' \| 'done'`, optional blog `link`) |
| `content/blog/featured.js`, `categories.js`, `page.js` | Featured posts on Home, `/blog` grouping, and page copy |
| `features/blog/posts/<slug>.jsx` | One file per post (`meta` + body); register it in `posts/index.js` |
| `content/contact.js`, `socials.js` | `/contact` copy, form categories and interests; social links |
| `config/navigation.js` | Nav labels and page order (also sets each page's "№ 0X" number) |
| `config/site.js` | Name and canonical URL |

## Contact form (EmailJS)

The `/contact` form sends through [EmailJS](https://www.emailjs.com/), so no backend or published
email address is needed. Copy `.env.example` to `.env.local`, fill in the three IDs, and paste
`docs/emailjs-template.html` into the EmailJS template (setup steps are in its header comment).
`npm run deploy` builds locally, so `.env.local` must be present when you deploy.

## Hosting and SEO

- The custom domain is set by `public/CNAME` (`www.vincenzodaria.com`). It ships with every
  deploy so GitHub Pages keeps the domain.
- Site-wide metadata (canonical URL, Open Graph/Twitter cards, JSON-LD) lives in `index.html`.
  Per-page titles and descriptions come from `<PageMeta>`.
- Icons: `public/favicon.svg` is the source. `favicon.ico`, `apple-touch-icon.png`, and
  `logo192/512.png` are rendered from it. The social preview is `public/images/og-image.png`
  (1200×630).

See [`CLAUDE.md`](./CLAUDE.md) for the full project structure, design system, and architecture notes.
