/**
 * Copy for the homepage below the hero.
 *
 *   description - <meta name="description"> for the homepage
 *   sections    - the featured blocks, in display order (their number, "01"…,
 *                 comes from this order). `id` picks the block's content in
 *                 features/home/routes/HomePage — don't rename ids.
 *     kicker - small mono label above the title
 *     title  - the section heading
 *     action - OPTIONAL { to, label } trailing "view all" link
 */
const home = {
  description:
    "Vincenzo D'Aria is a full-stack engineer building cloud-native systems on AWS. What he's working on now, his current role, recent writing, and this year's goals.",
  sections: [
    { id: 'now', kicker: "What I'm up to", title: 'Now' },
    {
      id: 'role',
      kicker: 'Day job',
      title: 'Current role',
      action: { to: '/work', label: 'Full history' },
    },
    {
      id: 'writing',
      kicker: 'From the notebook',
      title: 'Writing',
      action: { to: '/blog', label: 'All posts' },
    },
    {
      id: 'goals',
      kicker: 'Goals board',
      title: 'This year',
      action: { to: '/goals', label: 'All goals' },
    },
  ],
};

export default home;
