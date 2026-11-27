import goalProgress, { isDone } from './goalProgress';

describe('goalProgress', () => {
  it('counts accomplished goals and rounds the percentage', () => {
    const goals = [
      { status: 'wip' },
      { status: 'done' },
      { status: 'done' },
      { status: 'done' },
      { status: 'done' },
      { status: 'wip' },
    ];
    expect(goalProgress(goals)).toEqual({ done: 4, total: 6, percent: 67 });
  });

  it('handles an empty list without dividing by zero', () => {
    expect(goalProgress([])).toEqual({ done: 0, total: 0, percent: 0 });
  });

  it('reports 100% when everything is done', () => {
    expect(goalProgress([{ status: 'done' }, { status: 'done' }]).percent).toBe(100);
  });

  it('treats any status other than "done" as in motion', () => {
    expect(isDone({ status: 'done' })).toBe(true);
    expect(isDone({ status: 'wip' })).toBe(false);
    expect(isDone({})).toBe(false);
  });
});
