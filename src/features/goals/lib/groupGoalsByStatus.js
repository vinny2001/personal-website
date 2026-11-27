import { isDone } from './goalProgress';

/** Split goals into `{ wip, done }`, preserving their order. */
const groupGoalsByStatus = (goals) => ({
  wip: goals.filter((goal) => !isDone(goal)),
  done: goals.filter(isDone),
});

export default groupGoalsByStatus;
