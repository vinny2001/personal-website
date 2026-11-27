/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // The theme is driven by `data-theme` on <html> (set before first paint in
  // index.html, toggled by hooks/useTheme). Prefer the token colours below —
  // they already flip with the theme — over `dark:` utilities.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        'paper-raised': 'var(--paper-raised)',
        'paper-sunken': 'var(--paper-sunken)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-muted': 'var(--ink-muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-wash': 'var(--accent-wash)',
      },
      // Bare `border` / `divide` utilities draw the editorial hairline.
      borderColor: { DEFAULT: 'var(--rule)' },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      maxWidth: {
        page: '72rem',
        reading: '42rem',
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out)',
      },
    },
  },
  plugins: [],
};
