/**
 * Copy for the /blog index page. `title` is the page's <h1>; the "№ 05 — Blog"
 * kicker above it is derived from config/navigation.
 */
export const blogPage = {
  title: 'Writing',
  lede: "Thoughts on cloud architecture, full-stack engineering, and the occasional deep dive into research topics — organized by what they're about.",
  description:
    "Writing on cloud architecture, full-stack engineering, and technical research by Vincenzo D'Aria.",
  /** Posts a category shows before the rest fold behind the "show more" toggle. */
  initialVisible: 3,
  showMore: (n) => `Show ${n} more`,
  showFewer: 'Show fewer',
};

/** Copy for posts flagged `draft: true` in their meta. */
export const draftCopy = {
  label: 'Draft',
  note: 'The full write-up is on its way. Check back soon for how it all went.',
};
