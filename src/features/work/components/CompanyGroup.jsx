import { Reveal, RevealGroup } from 'components/motion/Reveal';

import DateRange from './DateRange';
import RoleEntry from './RoleEntry';

/**
 * A company and the roles held there, newest first. The company sits in a
 * sticky left rail (title, location, years, role count); the roles hang off a
 * hairline timeline on the right so a progression reads top to bottom.
 */
const CompanyGroup = ({ group, now }) => {
  const headingId = `company-${group.id}`;
  const roleCount = group.roles.length;

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-x-10 gap-y-8 border-t py-12 md:grid-cols-12 sm:py-16"
    >
      <Reveal as="header" className="md:col-span-4">
        <div className="md:sticky md:top-[calc(var(--nav-height)+2rem)]">
          <h2
            id={headingId}
            className="font-display text-4xl font-normal leading-none tracking-tight text-ink sm:text-5xl"
          >
            {group.company}
          </h2>
          {group.location && <p className="kicker mt-4">{group.location}</p>}
          <p className="mt-1.5 font-mono text-xs text-ink-muted">
            <DateRange start={group.start} end={group.end} precision="year" />
            {roleCount > 1 && <span> · {roleCount} roles</span>}
          </p>
        </div>
      </Reveal>

      <RevealGroup as="ol" stagger={0.12} className="border-l md:col-span-8">
        {group.roles.map((role) => (
          <RoleEntry
            key={`${role.start}-${role.role}`}
            role={role}
            showLocation={!group.location}
            now={now}
          />
        ))}
      </RevealGroup>
    </section>
  );
};

export default CompanyGroup;
