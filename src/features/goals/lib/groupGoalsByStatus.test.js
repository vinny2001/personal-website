import groupGoalsByStatus from './groupGoalsByStatus';

describe('groupGoalsByStatus', () => {
  it('splits goals by status and keeps their order', () => {
    const goals = [
      { text: 'a', status: 'wip' },
      { text: 'b', status: 'done' },
      { text: 'c', status: 'wip' },
    ];
    const { wip, done } = groupGoalsByStatus(goals);
    expect(wip.map((g) => g.text)).toEqual(['a', 'c']);
    expect(done.map((g) => g.text)).toEqual(['b']);
  });

  it('returns empty groups for an empty list', () => {
    expect(groupGoalsByStatus([])).toEqual({ wip: [], done: [] });
  });
});
