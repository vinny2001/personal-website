/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  // `prefers-color-scheme` drives the theme site-wide (see src/index.css), so
  // Tailwind's `dark:` variant should follow the OS setting, not a class.
  darkMode: 'media',
  // The site already ships a full global stylesheet; keep Tailwind's reset out
  // of the way and only pull in the utilities we opt into per component.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        'base-alt': 'var(--bg-secondary)',
        surface: 'var(--bg-card)',
        ink: 'var(--text-primary)',
        'ink-soft': 'var(--text-secondary)',
        'ink-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        hairline: 'var(--border)',
      },
    },
  },
  plugins: [],
};
