import { AnimatePresence } from 'motion/react';

import { goalsPage } from 'content/goals';

import GoalItem from './GoalItem';

/**
 * The numbered ledger of goals. Pass the already-filtered, already-indexed
 * goals; rows that drop out fade away while the rest glide into place.
 * `labelledBy` is the id of the heading that names the list.
 */
const GoalList = ({ goals, labelledBy }) => {
  if (goals.length === 0) {
    return <p className="border-y py-10 text-ink-muted">{goalsPage.emptyFilter}</p>;
  }

  return (
    <ul aria-labelledby={labelledBy} className="relative border-b">
      <AnimatePresence mode="popLayout">
        {goals.map((goal, i) => (
          <GoalItem key={goal.number} goal={goal} index={i} />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default GoalList;
