import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import ArrowLink from 'components/ui/ArrowLink';
import SectionHeader from 'components/ui/SectionHeader';

const CREDLY = 'https://www.credly.com';

/**
 * Certifications as Credly's official badge frames (the same iframe Credly's
 * embed.js would inject, minus the third-party script), each with a link to
 * its verifiable public page.
 */
const Certifications = ({ copy, certifications, profileUrl, className = '' }) => (
  <section aria-labelledby="certifications-heading" className={className}>
    <SectionHeader
      id="certifications-heading"
      kicker={copy.kicker}
      title={copy.title}
      action={{ href: profileUrl, label: copy.profileLabel }}
    />
    {copy.note && <p className="mt-5 max-w-reading text-ink-soft">{copy.note}</p>}

    <RevealGroup as="ul" stagger={0.1} className="mt-8 flex flex-wrap gap-x-10 gap-y-8">
      {certifications.map(({ name, issuer, badgeId }) => (
        <RevealItem as="li" key={badgeId} className="flex w-[150px] flex-col gap-3">
          <iframe
            src={`${CREDLY}/embedded_badge/${badgeId}`}
            title={`${name} badge on Credly`}
            width="150"
            height="270"
            loading="lazy"
            className="rounded-sm border-0"
          />
          <p className="text-sm leading-snug text-ink">
            {name}
            <span className="mt-0.5 block font-mono text-[0.7rem] text-ink-muted">{issuer}</span>
          </p>
          <ArrowLink href={`${CREDLY}/badges/${badgeId}/public_url`} className="text-sm">
            Verify
          </ArrowLink>
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);

export default Certifications;
