/**
 * The homepage "Now" list: what I'm focused on at the moment.
 *
 * Shape:
 *   updated - ISO date (YYYY-MM-DD) the list was last refreshed.
 *             Rendered as "Updated Nov 2026". Bump it whenever you edit below.
 *   entries - ordered list of { label, text }
 *     label - a short verb phrase ("Building", "Training for"), shown as a mono label
 *     text  - one line that completes it
 */
const now = {
  updated: '2026-11-27',
  entries: [
    {
      label: 'Building',
      text: 'An AWS-based resource costing & forecasting platform at Travelers.',
    },
    {
      label: 'Learning',
      text: 'Studying for the AWS Developer Associate exam.',
    },
    {
      label: 'Training for',
      text: 'A summit of Mt. Washington.',
    },
    {
      label: 'Practicing',
      text: 'Acoustic guitar, now at an intermediate level.',
    },
  ],
};

export default now;
