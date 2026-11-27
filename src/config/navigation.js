import { Briefcase, House, PenLine, Target, UserRound } from 'lucide-react';

/**
 * Primary site navigation — single source of truth for the Navbar, the mobile
 * menu, the footer index, and the "№ 02 — About" kicker on each PageHeader.
 * Order = display order (and drives each page's number).
 */
export const navLinks = [
  { to: '/', label: 'Home', icon: House },
  { to: '/about', label: 'About', icon: UserRound },
  { to: '/work', label: 'Work', icon: Briefcase },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/blog', label: 'Blog', icon: PenLine },
].map((link, i) => ({ ...link, number: String(i + 1).padStart(2, '0') }));

/** The nav entry a pathname belongs to (`/blog/some-post` → Blog). */
export const navLinkFor = (pathname) =>
  navLinks.find(({ to }) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)
  );
