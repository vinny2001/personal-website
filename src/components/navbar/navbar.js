import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const homeLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: "What's Next", href: '#goals' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location                = useLocation();
  const isHome                  = location.pathname === '/';
  const menuRef                 = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleOutside = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (menuOpen) document.addEventListener('mousedown', handleOutside);
    else document.removeEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen, handleOutside]);

  const scrollTo = (e, href) => {
    if (!isHome) return;
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`pill-nav${scrolled ? ' pill-nav--scrolled' : ''}`} ref={menuRef}>
      <div className="pill-nav__pill">
        {/* Brand logo */}
        <Link
          to="/"
          className="pill-nav__brand"
          aria-label="Home"
          onClick={() => {
            setMenuOpen(false);
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="VD logo"
            className="pill-nav__logo"
          />
        </Link>

        {/* Desktop links */}
        <nav className="pill-nav__links" aria-label="Main navigation">
          {isHome && homeLinks.map(({ label, href }) => (
            <a key={label} href={href} className="pill-nav__link" onClick={(e) => scrollTo(e, href)}>
              {label}
            </a>
          ))}
          <Link
            to="/blog"
            className={`pill-nav__link${location.pathname.startsWith('/blog') ? ' pill-nav__link--active' : ''}`}
          >
            Blog
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`pill-nav__toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`pill-nav__dropdown${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {isHome && homeLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="pill-nav__dropdown-link"
            onClick={(e) => scrollTo(e, href)}
          >
            {label}
          </a>
        ))}
        <Link
          to="/blog"
          className={`pill-nav__dropdown-link${location.pathname.startsWith('/blog') ? ' pill-nav__link--active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
