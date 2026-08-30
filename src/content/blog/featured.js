/**
 * Slugs of the posts to feature in the homepage "Writing" section.
 *
 * - 1 to 3 slugs. Array order = display order on the homepage.
 * - More than 3 are ignored (only the first 3 render).
 * - Each slug must match a post in src/features/blog/posts/. Unknown slugs are
 *   skipped (with a dev-only console warning).
 * - If this ends up empty, the homepage falls back to the 3 newest posts.
 *
 * The /blog page is unaffected by this list — it always shows every post.
 */
export const featuredSlugs = ['neural-networks-cancer-remediation'];
