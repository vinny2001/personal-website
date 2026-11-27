import { RevealItem } from 'components/motion/Reveal';
import Tag from 'components/ui/Tag';

import { describeRole } from '../lib/roles';

import DateRange from './DateRange';

/**
 * One role on the timeline: serif title, mono dates + tenure, intro, bullets
 * and stack. Renders the <li> (with its marker on the rail) so it can stagger
 * in as part of its company's list. `showLocation` is for groups whose roles
 * don't all share one location.
 */
const RoleEntry = ({ role, showLocation = false, now }) => {
  const { isCurrent, tenure } = describeRole(role, now);

  return (
    <RevealItem as="li" className="relative pb-12 pl-6 last:pb-0 sm:pl-8">
      <span
        aria-hidden="true"
        className={`absolute -left-[4px] top-[0.7rem] size-[7px] rounded-full border sm:top-[0.95rem] ${
          isCurrent ? 'border-accent bg-accent' : 'border-ink-muted bg-paper'
        }`}
      />

      <article>
        <header className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-ink sm:text-3xl">
            {role.role}
          </h3>
          <p className="shrink-0 font-mono text-xs text-ink-muted">
            <DateRange start={role.start} end={role.end} highlightPresent />
            <span aria-hidden="true"> · </span>
            <span>{tenure}</span>
          </p>
        </header>

        {showLocation && <p className="kicker mt-1.5">{role.location}</p>}

        {role.intro && <p className="mt-4 max-w-reading text-ink">{role.intro}</p>}

        <ul className="mt-5 max-w-reading space-y-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
          {role.bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-ink-muted"
            >
              {bullet}
            </li>
          ))}
        </ul>

        <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-1.5">
          {role.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </RevealItem>
  );
};

export default RoleEntry;
