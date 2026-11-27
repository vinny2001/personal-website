import { useLocation } from 'react-router-dom';

import Container from 'components/layout/Container';
import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import { navLinkFor } from 'config/navigation';

/**
 * Masthead for a top-level page: "№ 02 — About" kicker (numbered from the
 * nav config), oversized serif <h1>, optional lede, optional extra content.
 * `kicker` overrides the label derived from the current route.
 */
const PageHeader = ({ title, lede, kicker, children }) => {
  const { pathname } = useLocation();
  const link = navLinkFor(pathname);
  const label = kicker ?? link?.label;

  return (
    <Container as="header" className="pb-12 pt-14 sm:pb-16 sm:pt-24">
      <RevealGroup immediate stagger={0.08}>
        {label && (
          <RevealItem as="p" className="kicker flex items-center gap-3">
            {link && <span className="text-accent">№ {link.number}</span>}
            {link && <span aria-hidden="true" className="h-px w-8 bg-rule" />}
            <span>{label}</span>
          </RevealItem>
        )}
        <RevealItem
          as="h1"
          className="mt-6 font-display text-[clamp(3.25rem,10vw,7rem)] font-normal leading-[0.9] tracking-[-0.025em] text-ink"
        >
          {title}
        </RevealItem>
        {lede && (
          <RevealItem
            as="p"
            className="mt-7 max-w-reading text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            {lede}
          </RevealItem>
        )}
        {children && <RevealItem>{children}</RevealItem>}
      </RevealGroup>
    </Container>
  );
};

export default PageHeader;
