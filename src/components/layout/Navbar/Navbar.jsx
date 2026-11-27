import { useCallback, useState } from 'react';

import { motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import Container from 'components/layout/Container';
import { navLinks } from 'config/navigation';
import site from 'config/site';
import useScrolled from 'hooks/useScrolled';

import MobileMenu, { MenuButton } from './MobileMenu';
import ThemeToggle from './ThemeToggle';

/**
 * Sticky masthead: serif wordmark, numbered route links with a sliding accent
 * underline (md+), theme toggle, and a full-screen menu below md.
 */
const Navbar = () => {
  const scrolled = useScrolled();
  const { pathname } = useLocation();
  // The menu is "open for" the path it was opened on, so any navigation
  // (link, back button) closes it without a sync effect.
  const [menuPath, setMenuPath] = useState(null);
  const open = menuPath === pathname;
  const closeMenu = useCallback(() => setMenuPath(null), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? 'border-rule bg-paper/85 backdrop-blur-md'
            : 'border-transparent bg-paper'
        }`}
      >
        <Container className="flex h-[var(--nav-height)] items-center justify-between gap-6">
          <Link to="/" className="font-display text-[1.85rem] leading-none text-ink">
            <span aria-hidden="true">
              VD<span className="text-accent">.</span>
            </span>
            <span className="sr-only">{site.name}, home</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center">
              {navLinks.map(({ to, label, number }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `group relative flex items-baseline gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden="true"
                          className="font-mono text-[0.65rem] text-ink-muted transition-colors group-hover:text-accent"
                        >
                          {number}
                        </span>
                        {label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 bottom-0.5 h-px bg-accent"
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="-mr-2 flex items-center">
            <ThemeToggle />
            <MenuButton open={open} onClick={() => setMenuPath(open ? null : pathname)} />
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
