import { isDone } from './goalProgress';

/**
 * Filter ids: 'all', 'wip' (in motion) or 'done' (accomplished).
 * An unrecognised id behaves like 'all' so a bad filter never hides the list.
 */
const filterGoals = (goals, filter = 'all') => {
  if (filter === 'done') return goals.filter(isDone);
  if (filter === 'wip') return goals.filter((goal) => !isDone(goal));
  return goals;
};

/** How many goals each filter would show: `{ all, wip, done }`. */
export const goalCounts = (goals) => ({
  all: filterGoals(goals, 'all').length,
  wip: filterGoals(goals, 'wip').length,
  done: filterGoals(goals, 'done').length,
});

export default filterGoals;
