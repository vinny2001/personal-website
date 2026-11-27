import experience from 'content/experience';

import { describeRole, findCurrentRole } from '../lib/roles';

import DateRange from './DateRange';

/**
 * Homepage teaser: the role I'm in right now. Renders inner content only — the
 * caller supplies the surrounding <section>, its heading and any "view all"
 * link. The title is an <h3>. Falls back to the newest role (shown with its
 * full date range) if no entry is marked current.
 *
 * Layout is intrinsic (flex-wrap on content-width bases) rather than
 * breakpoint-driven, so it adapts to whatever width its parent gives it.
 */
const CurrentRole = () => {
  const role = findCurrentRole(experience) ?? experience[0];
  if (!role) return null;

  const { isCurrent, startLabel, tenure } = describeRole(role);

  return (
    <article className="flex flex-wrap gap-x-12 gap-y-5">
      <div className="min-w-0 grow basis-[16rem]">
        <p className="font-mono text-xs text-ink-muted">
          {isCurrent ? (
            <>
              Since <time dateTime={role.start}>{startLabel}</time>
            </>
          ) : (
            <DateRange start={role.start} end={role.end} />
          )}
          <span aria-hidden="true"> · </span>
          <span>{tenure}</span>
        </p>
        <h3 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-ink sm:text-4xl">
          {role.role}
        </h3>
        <p className="mt-3 text-ink-soft">
          {role.company}
          <span aria-hidden="true" className="px-2 text-ink-muted">
            ·
          </span>
          {role.location}
        </p>
      </div>

      {role.intro && (
        <p className="min-w-0 max-w-reading grow-[2] basis-[20rem] text-ink-soft">{role.intro}</p>
      )}
    </article>
  );
};

export default CurrentRole;
