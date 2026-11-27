import { Link } from 'react-router-dom';

import Container from 'components/layout/Container';
import { Reveal } from 'components/motion/Reveal';
import ArrowLink from 'components/ui/ArrowLink';
import SocialLinks from 'components/ui/SocialLinks';
import { navLinks } from 'config/navigation';
import site from 'config/site';
import footer from 'content/footer';

/** Site-wide colophon: contact sign-off, page index, socials, fine print. */
const Footer = () => (
  <footer className="mt-24 border-t sm:mt-32">
    <Container className="grid gap-12 py-14 sm:py-20 md:grid-cols-12">
      <Reveal className="md:col-span-6">
        <p className="kicker">{footer.kicker}</p>
        <p className="mt-4 font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] tracking-tight text-ink">
          {footer.headline} <em className="text-accent">{footer.emphasis}</em>
        </p>
        <ArrowLink href={`mailto:${site.authorEmail}`} className="mt-6 text-base sm:text-lg">
          {site.authorEmail}
        </ArrowLink>
      </Reveal>

      <nav aria-label="Footer" className="md:col-span-3">
        <p className="kicker">Index</p>
        <ul className="mt-4 space-y-2">
          {navLinks.map(({ to, label, number }) => (
            <li key={to}>
              <Link
                to={to}
                className="inline-flex items-baseline gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <span aria-hidden="true" className="font-mono text-[0.7rem] text-ink-muted">
                  {number}
                </span>
                <span className="link-draw">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:col-span-3">
        <p className="kicker">Elsewhere</p>
        <SocialLinks showLabels className="mt-4 flex-col gap-2" />
      </div>
    </Container>

    <div className="border-t">
      <Container className="flex flex-col gap-1 py-6 font-mono text-[0.7rem] text-ink-muted sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>{footer.colophon}</p>
      </Container>
    </div>
  </footer>
);

export default Footer;
