import { Building2, Cloud, Droplets, Guitar, Plane, Wheat } from 'lucide-react';

/**
 * "This year's goals" — the /goals page and the homepage snapshot.
 *
 * `goalsYear` is the year the list belongs to. It is set by hand (not derived
 * from the clock) because the list is per-year: when 2027 starts, replace the
 * goals below and bump this number.
 *
 * Each goal:
 *   icon     - a Lucide icon COMPONENT (import it above), shown beside the category
 *   category - short kicker label (Career / Personal / Health / Adventure / …)
 *   text     - the goal itself
 *   status   - 'wip'  -> "In motion"
 *              'done' -> "Accomplished"
 *   link     - OPTIONAL blog slug. When set, the goal shows a "Read the write-up"
 *              link to /blog/<slug> (the matching post in src/features/blog/posts/).
 *              Leave it off for goals without a write-up.
 *
 * Example with a write-up:
 *   { icon: Brain, category: 'Career', text: '…', status: 'done',
 *     link: 'neural-networks-cancer-remediation' },
 *
 * Goals are numbered 01, 02, … in the order listed here.
 */
export const goalsYear = 2026;

/** Page-level copy for /goals. */
export const goalsPage = {
  title: 'This year’s goals',
  lede: `${goalsYear}, in progress. A living list of what I’m chasing this year, and what’s already in the books.`,
  description: `Vincenzo D’Aria’s goals for ${goalsYear}: what’s in motion and what’s already accomplished.`,
  listKicker: `The ${goalsYear} index`,
  listTitle: 'The list',
  progressHeading: 'Progress',
  filterLabel: 'Filter goals by status',
  linkLabel: 'Read the write-up',
  emptyFilter: 'Nothing in this view yet.',
  noneInMotion: 'Everything on the list is accomplished.',
};

/** Display names for each status. */
export const statusLabels = {
  wip: 'In motion',
  done: 'Accomplished',
};

/**
 * Filter choices, in display order. `id` is 'all' or a status key (see
 * features/goals/lib/filterGoals).
 *
 * An entry with `scratchpad: true` is not a status filter: it has no count and,
 * when selected, shows a "More on this soon!" panel (with `note`) instead of goals.
 */
export const goalFilters = [
  { id: 'all', label: 'All' },
  { id: 'wip', label: statusLabels.wip },
  { id: 'done', label: statusLabels.done },
  {
    id: 'scratchpad',
    scratchpad: true,
    label: `${goalsYear + 1} scratchpad`,
    note: `Ideas for ${goalsYear + 1} are still taking shape. Check back once ${goalsYear} wraps up.`,
  },
];

export const goals = [
  {
    icon: Cloud,
    category: 'Career',
    text: 'Finish studying and pass the AWS Developer Associate exam',
    status: 'done',
    link: 'aws-developer-associate',
  },
  {
    icon: Building2,
    category: 'Career',
    text: 'Attend the AWS Summit in New York City',
    status: 'done',
    link: 'aws-summit-nyc-2026',
  },
  {
    icon: Guitar,
    category: 'Personal',
    text: 'Level up to intermediate on guitar',
    status: 'done',
    link: 'guitar-intermediate',
  },
  {
    icon: Droplets,
    category: 'Health',
    text: 'Hit 2-3 liters of water every day, consistently',
    status: 'wip',
  },
  {
    icon: Plane,
    category: 'Adventure',
    text: "Draft plans for 1-2 trips to places I've never been",
    status: 'done',
    link: 'trip-planning-2026',
  },
  {
    icon: Wheat,
    category: 'Personal',
    text: 'Learn how to bake sourdough bread from scratch',
    status: 'done',
    link: 'sourdough-from-scratch',
  },
];
