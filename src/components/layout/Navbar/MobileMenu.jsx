import { useEffect } from 'react';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import SocialLinks from 'components/ui/SocialLinks';
import { navLinks } from 'config/navigation';

const MENU_ID = 'mobile-menu';

/** Hamburger ⇄ close button for the condensed (< md) layout. */
export const MenuButton = ({ open, onClick }) => {
  const Icon = open ? X : Menu;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={MENU_ID}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken hover:text-ink md:hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={open ? 'close' : 'open'}
          className="grid"
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

/**
 * Full-screen menu below the header: big serif links that stagger in, socials
 * pinned to the bottom. Esc closes it and the page behind can't scroll.
 * Rendered outside <header> — the header's backdrop-filter would otherwise
 * become the containing block for this `position: fixed` overlay.
 */
const MobileMenu = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={MENU_ID}
          className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40 flex flex-col overflow-y-auto bg-paper px-5 pb-10 pt-4 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <nav aria-label="Mobile">
            <RevealGroup as="ul" immediate stagger={0.05} className="divide-y border-b">
              {navLinks.map(({ to, label, number }) => (
                <RevealItem as="li" key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between py-4 font-display text-5xl leading-none transition-colors ${
                        isActive ? 'text-accent' : 'text-ink hover:text-accent'
                      }`
                    }
                  >
                    <span>{label}</span>
                    <span aria-hidden="true" className="font-mono text-xs text-ink-muted">
                      {number}
                    </span>
                  </NavLink>
                </RevealItem>
              ))}
            </RevealGroup>
          </nav>
          <SocialLinks className="mt-auto gap-6 pt-10 text-xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
