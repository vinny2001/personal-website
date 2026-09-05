import groupPostsByCategory from './groupPostsByCategory';

vi.mock('../../../content/blog/categories', () => ({
  categories: [
    { name: 'Research', description: 'deep dives' },
    { name: 'Free Thought', description: 'essays' },
  ],
}));

const post = (slug, category, date) => ({ slug, category, date, title: slug, tags: [] });

describe('groupPostsByCategory', () => {
  it('orders groups by the categories config and sorts posts newest-first', () => {
    const posts = [
      post('a', 'Free Thought', '2023-01-01'),
      post('b', 'Research', '2024-05-01'),
      post('c', 'Research', '2024-09-01'),
    ];

    const groups = groupPostsByCategory(posts);

    expect(groups.map((g) => g.name)).toEqual(['Research', 'Free Thought']);
    expect(groups[0].posts.map((p) => p.slug)).toEqual(['c', 'b']);
    expect(groups[0].description).toBe('deep dives');
  });

  it('drops empty configured groups and appends unlisted categories at the end', () => {
    const posts = [post('a', 'Research', '2024-01-01'), post('z', 'Rambles', '2024-02-01')];

    const groups = groupPostsByCategory(posts);

    expect(groups.map((g) => g.name)).toEqual(['Research', 'Rambles']);
    expect(groups[1].description).toBeUndefined();
  });

  it('buckets posts with no category under "Uncategorized"', () => {
    const groups = groupPostsByCategory([post('a', undefined, '2024-01-01')]);
    expect(groups.map((g) => g.name)).toEqual(['Uncategorized']);
  });
});
