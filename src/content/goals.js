/**
 * "This Year's Goals" board data.
 *
 * Each goal:
 *   icon     - emoji shown on the card
 *   category - short kicker label (Career / Personal / Health / Adventure / …)
 *   text     - the goal itself
 *   status   - 'wip'  -> "In Motion" column
 *              'done' -> "Accomplished" column
 *   link     - OPTIONAL blog slug. When set, the whole card becomes a link to
 *              /blog/<slug> (the matching post in src/features/blog/posts/).
 *              Leave it off for goals without a write-up.
 *
 * Example with a write-up:
 *   { icon: '🧠', category: 'Career', text: '…', status: 'done',
 *     link: 'neural-networks-cancer-remediation' },
 */
export const goals = [
  {
    icon: '☁️',
    category: 'Career',
    text: 'Finish studying and pass the AWS Developer Associate exam',
    status: 'wip',
  },
  {
    icon: '🗽',
    category: 'Career',
    text: 'Attend the AWS Summit in New York City',
    status: 'done',
  },
  {
    icon: '🎸',
    category: 'Personal',
    text: 'Level up to intermediate on guitar',
    status: 'done',
  },
  {
    icon: '💧',
    category: 'Health',
    text: 'Hit 2-3 liters of water every day, consistently',
    status: 'wip',
  },
  {
    icon: '✈️',
    category: 'Adventure',
    text: "Draft plans for 1-2 trips to places I've never been",
    status: 'done',
  },
  {
    icon: '🍞',
    category: 'Personal',
    text: 'Learn how to bake sourdough bread from scratch',
    status: 'done',
  },
];
