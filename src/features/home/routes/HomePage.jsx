import Container from 'components/layout/Container';
import PageMeta from 'components/seo/PageMeta';
import home from 'content/home';
import FeaturedPosts from 'features/blog/components/FeaturedPosts';
import GoalsSnapshot from 'features/goals/components/GoalsSnapshot';
import CurrentRole from 'features/work/components/CurrentRole';

import Hero from '../components/Hero';
import HomeSection from '../components/HomeSection';
import NowCard from '../components/NowCard';

/** What each `content/home` section id renders. */
const BODIES = {
  now: NowCard,
  role: CurrentRole,
  writing: FeaturedPosts,
  goals: GoalsSnapshot,
};

/**
 * Asymmetric 12-col layout (lg+), filled in order: 7 | 5, then 5 | 7. Each pair
 * shares a row with a hairline column rule between them; grid cells stretch,
 * so the rule spans the taller of the two and uneven heights read as
 * deliberate. Below lg everything stacks.
 */
const SLOTS = [
  'lg:col-span-7 lg:pr-10',
  'lg:col-span-5 lg:border-l lg:pl-10',
  'lg:col-span-5 lg:pr-10',
  'lg:col-span-7 lg:border-l lg:pl-10',
];

const sections = home.sections.filter(({ id }) => BODIES[id]);

/** `/` — the hero, then four featured sections. The hero's name is the <h1>. */
const HomePage = () => (
  <>
    <PageMeta description={home.description} />
    <Hero />
    <Container className="grid gap-y-20 sm:gap-y-28 lg:grid-cols-12">
      {sections.map(({ id, kicker, title, action }, i) => {
        const Body = BODIES[id];
        return (
          <HomeSection
            key={id}
            id={id}
            number={String(i + 1).padStart(2, '0')}
            kicker={kicker}
            title={title}
            action={action}
            delay={i % 2 ? 0.1 : 0}
            className={`min-w-0 ${SLOTS[i % SLOTS.length]}`}
          >
            <Body />
          </HomeSection>
        );
      })}
    </Container>
  </>
);

export default HomePage;
