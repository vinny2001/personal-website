# Personal Website — Claude Code Guide

## Project Overview
Vincenzo D'Aria's personal website, a single-page React app deployed to GitHub Pages via `gh-pages`.

- **Live URL:** https://vinny2001.github.io
- **Stack:** React 18, React Router v6 (HashRouter), Bootstrap 5, FontAwesome

## Project Structure
```
src/
  App.js                        # Root component; defines routes
  components/
    body/body.js                # Main homepage content with fade-in animations
    body/body.css
    navbar/navbar.js            # Top navigation bar
    navbar/navbar.css
public/
  images/                       # Static images
```

## Key Architectural Notes
- Uses **HashRouter** (`/#/`) for GitHub Pages compatibility (no server-side routing).
- Currently only one active route (`/` → `<Body />`). The "Skills" and "Projects" nav links are `disabled` placeholders.
- Animations are driven by `useState`/`useEffect` with staggered `setTimeout` calls in `body.js`.
- Copyright year is dynamically generated: `new Date().getFullYear()`.

## Commands
```bash
npm start          # Dev server at http://localhost:3000
npm run build      # Production build → /build
npm run deploy     # Builds then publishes to GitHub Pages (gh-pages -d build)
npm test           # Runs tests with react-scripts
```

## Deployment
Deploying pushes the `/build` output to the `gh-pages` branch on GitHub, which serves the site. Always run `npm run deploy` (not just `npm run build`) to publish changes.

## Conventions
- Components are organized in `src/components/<name>/` with co-located CSS.
- Functional components only; no class components.
- External links use `target="_blank" rel="noopener noreferrer"`.
- No TypeScript — plain JavaScript/JSX throughout.
