/**
 * Single source of truth for on-page navigation.
 *
 * `sections` drives both the ScrollNav dots and the Navbar anchor links.
 * `id` must match the `id` attribute on the corresponding <section> in the
 * homepage components. Order = document order.
 */
export const sections = [
  { id: 'home', label: 'Home', navLabel: null },
  { id: 'about', label: 'About', navLabel: 'About' },
  { id: 'skills', label: 'Skills', navLabel: 'Skills' },
  { id: 'experience', label: 'Experience', navLabel: 'Experience' },
  { id: 'goals', label: "This Year's Goals", navLabel: 'Goals' },
  { id: 'blog', label: 'Blog', navLabel: null },
];

/** Anchor links shown in the Navbar on the home route (excludes hidden ones). */
export const homeNavLinks = sections
  .filter((s) => s.navLabel)
  .map((s) => ({ label: s.navLabel, href: `#${s.id}` }));
