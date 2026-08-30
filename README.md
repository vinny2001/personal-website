# Personal Website

Vincenzo D'Aria's personal site — a single-page React app (Create React App) deployed to
GitHub Pages at **https://vinny2001.github.io**.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server at http://localhost:3000 |
| `npm run build` | Production build → `build/` |
| `npm test` | Test suite (Jest via react-scripts) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier over `src/**/*.{js,css}` |
| `npm run deploy` | Build, then publish `build/` to the `gh-pages` branch |

## Editing content

All copy and data is static and lives under `src/`:

- `src/content/about.js`, `skills.js`, `experience.js`, `hero.js` — homepage section content
- `src/content/goals.js` — the "This Year's Goals" board (`status`, optional blog `link`)
- `src/content/blog/featured.js` — which 1–3 posts show on the homepage
- `src/content/blog/categories.js` — how the `/blog` page is grouped
- `src/features/blog/posts/<slug>.js` — one file per blog post (metadata + body); register it in
  `src/features/blog/posts/index.js`
- `src/config/navigation.js` — nav labels and section order

See [`CLAUDE.md`](./CLAUDE.md) for the full project structure and architecture notes.
