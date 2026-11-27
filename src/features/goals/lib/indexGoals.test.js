import indexGoals from './indexGoals';

describe('indexGoals', () => {
  it('adds a 1-based number without mutating the input', () => {
    const goals = [{ text: 'a' }, { text: 'b' }];
    const indexed = indexGoals(goals);
    expect(indexed.map((g) => g.number)).toEqual([1, 2]);
    expect(goals[0]).toEqual({ text: 'a' });
  });
});
