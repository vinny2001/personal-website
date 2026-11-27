import filterGoals, { goalCounts } from './filterGoals';

const goals = [
  { text: 'a', status: 'wip' },
  { text: 'b', status: 'done' },
  { text: 'c', status: 'done' },
];

describe('filterGoals', () => {
  it('returns everything for "all" (and for unknown filters)', () => {
    expect(filterGoals(goals, 'all')).toEqual(goals);
    expect(filterGoals(goals, 'nonsense')).toEqual(goals);
    expect(filterGoals(goals)).toEqual(goals);
  });

  it('returns only accomplished goals for "done"', () => {
    expect(filterGoals(goals, 'done').map((g) => g.text)).toEqual(['b', 'c']);
  });

  it('returns only in-motion goals for "wip"', () => {
    expect(filterGoals(goals, 'wip').map((g) => g.text)).toEqual(['a']);
  });

  it('counts each filter', () => {
    expect(goalCounts(goals)).toEqual({ all: 3, wip: 1, done: 2 });
  });
});
