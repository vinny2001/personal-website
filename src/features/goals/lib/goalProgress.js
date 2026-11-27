/** A goal counts as done only when `status === 'done'`; anything else is in motion. */
export const isDone = (goal) => goal.status === 'done';

/**
 * Summarise how many goals are accomplished.
 * `percent` is a whole number (0 for an empty list, so there is never a NaN).
 */
const goalProgress = (goals) => {
  const total = goals.length;
  const done = goals.filter(isDone).length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
};

export default goalProgress;
