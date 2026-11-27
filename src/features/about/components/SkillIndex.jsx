import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import SectionHeader from 'components/ui/SectionHeader';

/**
 * Skills as a magazine-style index: one ruled row per category (numbered mono
 * label on the left, the skills as a serif list on the right).
 */
const SkillIndex = ({ copy, groups }) => (
  <section aria-labelledby="skills-heading">
    <SectionHeader id="skills-heading" kicker={copy.kicker} title={copy.title} />
    {copy.note && <p className="mt-5 max-w-reading text-ink-soft">{copy.note}</p>}

    <RevealGroup as="dl" stagger={0.08} className="mt-6 divide-y border-b">
      {groups.map(({ category, skills }, i) => (
        <RevealItem
          key={category}
          as="div"
          className="group grid gap-x-10 gap-y-4 py-7 md:grid-cols-12"
        >
          <dt className="flex items-baseline gap-4 md:col-span-4">
            <span
              aria-hidden="true"
              className="font-mono text-xs text-ink-muted transition-colors duration-300 group-hover:text-accent"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="kicker text-[0.8rem] text-ink">{category}</span>
          </dt>
          <dd className="md:col-span-8">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="group/skill flex items-baseline gap-2.5 font-display text-xl leading-snug text-ink sm:text-2xl"
                >
                  {/* Square bullet (the site's status-mark motif); lifts to the accent on hover. */}
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 -translate-y-[0.3em] bg-ink-muted transition-colors duration-300 group-hover/skill:bg-accent"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </dd>
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);

export default SkillIndex;
