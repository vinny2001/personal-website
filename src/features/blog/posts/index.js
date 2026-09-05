/**
 * Blog post registry — the single source of truth for what posts exist.
 *
 * To add a post:
 *   1. Create `src/features/blog/posts/<slug>.js` exporting `meta` + a default
 *      body component (copy an existing post as a template).
 *   2. Add one import line below and one entry to `modules`.
 *
 * Everything else (the /blog list, category grouping, the homepage preview,
 * per-post routes, goal-card links) derives from here.
 */
import neuralNetworksCancerRemediation, {
  meta as neuralNetworksCancerRemediationMeta,
} from './neural-networks-cancer-remediation';

const modules = [
  { meta: neuralNetworksCancerRemediationMeta, Component: neuralNetworksCancerRemediation },
];

if (import.meta.env.DEV) {
  const seen = new Set();
  modules.forEach(({ meta }) => {
    if (!meta || !meta.slug) {
      console.warn('[blog] a post module is missing `meta.slug`');
      return;
    }
    if (seen.has(meta.slug)) console.warn(`[blog] duplicate post slug: "${meta.slug}"`);
    seen.add(meta.slug);
    if (!meta.category) console.warn(`[blog] post "${meta.slug}" has no \`category\``);
  });
}

/** All post metadata, newest-first. */
export const posts = modules.map((m) => m.meta).sort((a, b) => new Date(b.date) - new Date(a.date));

/** slug -> body component. */
export const postsBySlug = modules.reduce((acc, { meta, Component }) => {
  acc[meta.slug] = Component;
  return acc;
}, {});

/** slug -> metadata. */
export const postMetaBySlug = modules.reduce((acc, { meta }) => {
  acc[meta.slug] = meta;
  return acc;
}, {});
