/**
 * Canonical ordering + blurbs for the /blog page category sections.
 *
 * Every post declares a `category` string in its `meta` (see
 * src/features/blog/posts/<slug>.js). The Blog page groups posts by that string
 * and renders the groups in the order below. A post whose category is not listed
 * here still shows up — under its own heading, after all the ordered groups.
 */
export const categories = [
  {
    name: "This Year's Goals",
    description: 'Progress logs and reflections tied to the goals on my homepage.',
  },
  {
    name: 'Research',
    description: 'Long-form technical deep dives and published work.',
  },
  {
    name: 'Free Thought',
    description: 'Essays and half-formed ideas that are not tied to a goal.',
  },
];
