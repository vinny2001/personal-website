import { useState } from 'react';

import Container from 'components/layout/Container';
import { Reveal } from 'components/motion/Reveal';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import SectionHeader from 'components/ui/SectionHeader';
import { goalFilters, goals, goalsPage } from 'content/goals';

import GoalFilter from '../components/GoalFilter';
import GoalList from '../components/GoalList';
import GoalProgress from '../components/GoalProgress';
import filterGoals, { goalCounts } from '../lib/filterGoals';
import indexGoals from '../lib/indexGoals';

const numberedGoals = indexGoals(goals);
const counts = goalCounts(goals);

const GoalsPage = () => {
  const [filter, setFilter] = useState('all');
  const visible = filterGoals(numberedGoals, filter);

  return (
    <>
      <PageMeta title="Goals" description={goalsPage.description} />
      <PageHeader title={goalsPage.title} lede={goalsPage.lede} />

      <Container className="pb-4 sm:pb-8">
        <Reveal
          as="section"
          aria-labelledby="goals-progress-heading"
          className="border-y py-10 sm:py-14"
        >
          <h2 id="goals-progress-heading" className="sr-only">
            {goalsPage.progressHeading}
          </h2>
          <GoalProgress goals={goals} size="lg" />
        </Reveal>

        <section aria-labelledby="goals-list-heading" className="mt-20 sm:mt-28">
          <SectionHeader
            id="goals-list-heading"
            kicker={goalsPage.listKicker}
            title={goalsPage.listTitle}
          />

          <div className="flex items-center justify-between gap-x-6">
            <GoalFilter
              label={goalsPage.filterLabel}
              options={goalFilters}
              counts={counts}
              value={filter}
              onChange={setFilter}
            />
            <p role="status" className="kicker sr-only sm:not-sr-only">
              Showing {visible.length} of {goals.length}
            </p>
          </div>

          <GoalList goals={visible} labelledBy="goals-list-heading" />
        </section>
      </Container>
    </>
  );
};

export default GoalsPage;
