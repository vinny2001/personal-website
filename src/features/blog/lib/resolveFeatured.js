export const MAX_FEATURED = 3;

/**
 * Resolves configured featured slugs to post metadata for the homepage preview.
 *
 * - keeps `featuredSlugs` order, ignores unknown slugs, caps at 3
 * - falls back to the newest posts when nothing resolves (guarantees 1–3)
 *
 * @param {string[]} featuredSlugs
 * @param {Object.<string, object>} metaBySlug  slug -> post meta
 * @param {Array} allPosts  every post meta, already sorted newest-first
 */
const resolveFeatured = (featuredSlugs, metaBySlug, allPosts) => {
  const resolved = [];
  featuredSlugs.forEach((slug) => {
    const meta = metaBySlug[slug];
    if (meta) resolved.push(meta);
    else if (import.meta.env.DEV) {
      console.warn(`[blog] featuredSlugs: no post found for "${slug}"`);
    }
  });

  if (import.meta.env.DEV && featuredSlugs.length > MAX_FEATURED) {
    console.warn(
      `[blog] featuredSlugs has ${featuredSlugs.length} entries; only ${MAX_FEATURED} are shown`
    );
  }

  const featured = resolved.slice(0, MAX_FEATURED);
  return featured.length ? featured : allPosts.slice(0, MAX_FEATURED);
};

export default resolveFeatured;
