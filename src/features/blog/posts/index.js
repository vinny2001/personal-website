/**
 * Blog post registry — the single source of truth for what posts exist.
 *
 * To add a post:
 *   1. Create `src/features/blog/posts/<slug>.jsx` exporting `meta` + a default
 *      body component (copy an existing post as a template). The body returns a
 *      fragment of plain elements — the page wraps it in `.prose-editorial`.
 *   2. Add one import line below and one entry to `modules`.
 *
 * Optional `meta.draft: true` marks a work-in-progress post. It stays listed on
 * /blog (with a "Draft" tag) and its page shows a "More on this soon!" panel instead
 * of the body (the outline in the post file stays as working notes). It is never
 * featured on the homepage. Remove the flag when the post is finished.
 *
 * Everything else (the /blog list, category grouping, the homepage teaser,
 * per-post routes, goal-card links) derives from here.
 */
import awsDeveloperAssociate, {
  meta as awsDeveloperAssociateMeta,
} from './aws-developer-associate';
import awsSummitNyc2026, { meta as awsSummitNyc2026Meta } from './aws-summit-nyc-2026';
import guitarIntermediate, { meta as guitarIntermediateMeta } from './guitar-intermediate';
import neuralNetworksCancerRemediation, {
  meta as neuralNetworksCancerRemediationMeta,
} from './neural-networks-cancer-remediation';
import sourdoughFromScratch, { meta as sourdoughFromScratchMeta } from './sourdough-from-scratch';
import tripPlanning2026, { meta as tripPlanning2026Meta } from './trip-planning-2026';

const modules = [
  { meta: awsSummitNyc2026Meta, Component: awsSummitNyc2026 },
  { meta: neuralNetworksCancerRemediationMeta, Component: neuralNetworksCancerRemediation },
  { meta: awsDeveloperAssociateMeta, Component: awsDeveloperAssociate },
  { meta: guitarIntermediateMeta, Component: guitarIntermediate },
  { meta: tripPlanning2026Meta, Component: tripPlanning2026 },
  { meta: sourdoughFromScratchMeta, Component: sourdoughFromScratch },
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
