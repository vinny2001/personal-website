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
});
