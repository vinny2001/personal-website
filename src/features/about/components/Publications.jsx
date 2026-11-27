import { FlaskConical } from 'lucide-react';

import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import ArrowLink from 'components/ui/ArrowLink';
import SectionHeader from 'components/ui/SectionHeader';

/** Kicker line: venue, then year when known, then role. */
const kickerOf = ({ venue, year, role }) => [venue, year, role].filter(Boolean).join(' · ');

/**
 * Publications as editorial entries: mono kicker, serif title, a short line,
 * then links to the paper and (optionally) this site's write-up.
 */
const Publications = ({ copy, publications, className = '' }) => (
  <section aria-labelledby="publications-heading" className={className}>
    <SectionHeader id="publications-heading" kicker={copy.kicker} title={copy.title} />
    {copy.note && <p className="mt-5 max-w-reading text-ink-soft">{copy.note}</p>}

    <RevealGroup as="ul" stagger={0.1} className="mt-8 flex flex-col gap-10">
      {publications.map((pub) => (
        <RevealItem as="li" key={pub.title}>
          <article className="group/pub border-t border-rule pt-5 transition-colors duration-300 hover:border-accent">
            <FlaskConical
              aria-hidden="true"
              strokeWidth={1.75}
              className="size-6 text-ink-muted transition-transform duration-300 ease-out-expo group-hover/pub:-translate-y-0.5 group-hover/pub:text-accent"
            />
            <p className="kicker mt-4">{kickerOf(pub)}</p>
            <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-ink">
              {pub.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pub.summary}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {pub.url && <ArrowLink href={pub.url}>{copy.paperLabel}</ArrowLink>}
              {pub.post && <ArrowLink to={`/blog/${pub.post}`}>{copy.postLabel}</ArrowLink>}
            </div>
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);

export default Publications;
