import SectionHeader from 'components/ui/SectionHeader';
import { goals } from 'content/goals';
import useFadeIn from 'hooks/useFadeIn';

import GoalColumn from './GoalColumn';

import '../Goals.css';

const GoalsBoard = () => {
  const ref = useFadeIn();

  const inMotion = goals.filter((g) => g.status !== 'done');
  const accomplished = goals.filter((g) => g.status === 'done');

  return (
    <section id="goals" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="This Year's Goals"
            subtitle="A living board of what I'm chasing this year — and what's already in the books."
          />
          <div className="goals-board">
            <GoalColumn title="In Motion" items={inMotion} />
            <GoalColumn title="Accomplished" items={accomplished} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsBoard;
