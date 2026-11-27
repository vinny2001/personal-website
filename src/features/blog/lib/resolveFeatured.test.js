import resolveFeatured from './resolveFeatured';

const meta = (slug) => ({ slug, title: slug });
const metaBySlug = { a: meta('a'), b: meta('b'), c: meta('c'), d: meta('d') };
const allPosts = [meta('d'), meta('c'), meta('b'), meta('a')]; // "newest-first"

describe('resolveFeatured', () => {
  it('keeps configured order and ignores unknown slugs', () => {
    const result = resolveFeatured(['c', 'nope', 'a'], metaBySlug, allPosts);
    expect(result.map((p) => p.slug)).toEqual(['c', 'a']);
  });

  it('caps the result at 3 even when more are configured', () => {
    const result = resolveFeatured(['a', 'b', 'c', 'd'], metaBySlug, allPosts);
    expect(result.map((p) => p.slug)).toEqual(['a', 'b', 'c']);
  });

  it('falls back to the newest posts when nothing resolves', () => {
    expect(resolveFeatured([], metaBySlug, allPosts).map((p) => p.slug)).toEqual(['d', 'c', 'b']);
    expect(resolveFeatured(['ghost'], metaBySlug, allPosts).map((p) => p.slug)).toEqual([
      'd',
      'c',
      'b',
    ]);
  });

  describe('drafts', () => {
    const draft = (slug) => ({ ...meta(slug), draft: true });
    const withDrafts = { ...metaBySlug, x: draft('x'), y: draft('y') };
    const newestFirst = [draft('y'), draft('x'), meta('d'), meta('c'), meta('b'), meta('a')];

    it('skips drafts named explicitly', () => {
      const result = resolveFeatured(['x', 'a', 'y', 'b'], withDrafts, newestFirst);
      expect(result.map((p) => p.slug)).toEqual(['a', 'b']);
    });

    it('excludes drafts from the newest-posts fallback', () => {
      const result = resolveFeatured([], withDrafts, newestFirst);
      expect(result.map((p) => p.slug)).toEqual(['d', 'c', 'b']);
    });

    it('falls back to published posts when every configured slug is a draft', () => {
      const result = resolveFeatured(['x', 'y'], withDrafts, newestFirst);
      expect(result.map((p) => p.slug)).toEqual(['d', 'c', 'b']);
    });
  });
});
