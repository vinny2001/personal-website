import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { homeNavLinks, sections } from 'config/navigation';

import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // While the menu is open: Esc closes it and the page behind it can't scroll.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Scroll-spy: highlight the nav link for the section currently under the
  // viewport's midline (only meaningful on the homepage, where the sections
  // live). Uses a thin centre band so exactly one section is "current".
  useEffect(() => {
    if (!isHome) return undefined;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!els.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const links = [
    { label: 'Home', to: '/', href: '#home' },
    ...(isHome ? homeNavLinks : []),
    { label: 'Blog', to: '/blog' },
  ];

  // Section a link points at: `#about` → `about`, Home → `home`, Blog → `blog`.
  const sectionForLink = (link) => {
    if (link.href) return link.href.slice(1);
    if (link.to === '/') return 'home';
    if (link.to === '/blog') return 'blog';
    return null;
  };

  const isRouteActive = (link) =>
    Boolean(link.to) && link.to !== '/' && location.pathname.startsWith(link.to);

  const isActive = (link) =>
    isRouteActive(link) || (isHome && sectionForLink(link) === activeSection);

  const handleLink = (e, link) => {
    setOpen(false);
    if (link.href && isHome) {
      e.preventDefault();
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderLink = (link, extra) => {
    const active = isActive(link);
    const cls = `site-nav-link rounded-md font-medium no-underline transition-colors ${extra} ${
      active ? 'is-active' : ''
    }`;

    return link.to ? (
      <Link
        key={link.label}
        to={link.to}
        aria-current={active ? 'page' : undefined}
        className={cls}
        onClick={(e) => handleLink(e, link)}
      >
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={cls} onClick={(e) => handleLink(e, link)}>
        {link.label}
      </a>
    );
  };

  // Transparent over the hero; frosted when scrolled. While the mobile menu is
  // open the whole header + panel sits on the raised `base-alt` surface so its
  // lighter tone marks where the dropdown ends (no border needed).
  const headerBg = open
    ? 'bg-base-alt'
    : scrolled
      ? 'bg-base/80 backdrop-blur-md'
      : 'bg-transparent';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerBg}`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="relative flex h-16 items-center">
          {/* Condensed (mobile): morphing hamburger, hard-left */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-ml-2 flex appearance-none items-center rounded-md border-0 bg-transparent p-2 text-ink-soft outline-none transition-colors hover:text-ink focus-visible:text-ink sm:hidden"
          >
            <span className="relative block h-4 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>

          {/* Full-screen (sm and up): inline links */}
          <nav
            aria-label="Main"
            className="hidden w-full items-center justify-center gap-1 sm:flex"
          >
            {links.map((link) => renderLink(link, 'px-3 py-2 text-sm'))}
          </nav>
        </div>
      </div>

      {/* Condensed (mobile): collapsible panel on the raised `base-alt` surface
          plus a soft drop shadow, so its bottom edge reads against the page. */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-base-alt transition-[max-height] duration-300 ease-out sm:hidden ${
          open ? 'max-h-[480px] shadow-2xl shadow-black/50' : 'max-h-0'
        }`}
      >
        <nav aria-label="Mobile" className="space-y-1 px-3 pb-4 pt-1">
          {links.map((link) => renderLink(link, 'block px-3 py-2.5 text-base'))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
