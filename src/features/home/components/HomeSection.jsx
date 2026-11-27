import { Reveal } from 'components/motion/Reveal';
import SectionHeader from 'components/ui/SectionHeader';

/**
 * One featured block on the homepage: a labelled <section> that rises in on
 * scroll, with a numbered SectionHeader ("01 — What I'm up to" / title /
 * optional "view all" link) above its content.
 */
const HomeSection = ({
  id,
  number,
  kicker,
  title,
  action,
  delay = 0,
  className = '',
  children,
}) => {
  const headingId = `home-${id}-heading`;

  return (
    <Reveal as="section" aria-labelledby={headingId} delay={delay} className={className}>
      <SectionHeader
        id={headingId}
        title={title}
        action={action}
        kicker={
          <>
            <span className="text-ink">{number}</span>
            <span
              aria-hidden="true"
              className="mx-2.5 inline-block h-px w-6 bg-rule align-middle"
            />
            {kicker}
          </>
        }
      />
      <div className="mt-7">{children}</div>
    </Reveal>
  );
};

export default HomeSection;
