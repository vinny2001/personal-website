import { Reveal } from 'components/motion/Reveal';
import SectionHeader from 'components/ui/SectionHeader';

import FactList from './FactList';

import './Bio.css';

/**
 * Biography as a two-column spread: long-form prose (drop cap on the opener)
 * with the headline facts in a ruled side rail.
 */
const Bio = ({ copy, paragraphs, facts }) => (
  <section aria-labelledby="bio-heading">
    <SectionHeader id="bio-heading" kicker={copy.kicker} title={copy.title} />

    <div className="mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <div className="prose-editorial bio__text">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal
        as="aside"
        delay={0.1}
        aria-labelledby="facts-heading"
        className="lg:col-span-4 lg:col-start-9"
      >
        <FactList id="facts-heading" title={copy.factsTitle} facts={facts} />
      </Reveal>
    </div>
  </section>
);

export default Bio;
