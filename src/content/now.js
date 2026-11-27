import { BookOpen, Bot, Building2, GraduationCap, Guitar, Mountain, Plane } from 'lucide-react';

/**
 * The homepage "Now" list: what I'm focused on at the moment.
 *
 * Shape:
 *   updated      - ISO date (YYYY-MM-DD) the list was last refreshed.
 *                  Rendered as "Updated Nov 2026". Bump it whenever you edit below.
 *   visibleCount - how many entries show before the rest collapse behind the toggle
 *   showAll      - toggle copy while collapsed; the entry total is appended ("Show all 7")
 *   showLess     - toggle copy while expanded
 *   entries      - ordered list of { icon, label, cite?, text }, most interesting first
 *     icon  - a Lucide icon COMPONENT (import it above); a quiet, unique glyph per entry
 *     label - a short verb phrase ("Building", "Training for"), shown as a mono label
 *     cite  - OPTIONAL title of a work, rendered in italics (<cite>) before `text`
 *     text  - one line that completes the label. With `cite`, it continues the
 *             title, so start it lower-case ("by Andy Weir")
 */
const now = {
  updated: '2026-11-27',
  visibleCount: 3,
  showAll: 'Show all',
  showLess: 'Show less',
  entries: [
    {
      icon: Building2,
      label: 'Building',
      text: 'A suite of data-driven corporate finance apps at Travelers. Piloting some mobile app ideas in my spare time.',
    },
    {
      icon: Bot,
      label: 'Automating',
      text: 'Claude agents, skills & plugins that speed up how my team ships.',
    },
    {
      icon: Plane,
      label: 'Traveling',
      text: 'A couple’s trip to Hilton Head Island, SC is on the itinerary!',
    },
    {
      icon: BookOpen,
      label: 'Reading',
      cite: 'Project Hail Mary',
      text: 'by Andy Weir, author of The Martian.',
    },
    {
      icon: GraduationCap,
      label: 'Learning',
      text: 'The fundamentals of retrieval-augmented generation (RAG).',
    },
    {
      icon: Mountain,
      label: 'Hiking',
      text: 'More of the White Mountains’ 4,000-footers. Mt. Washington: summited this summer.',
    },
    {
      icon: Guitar,
      label: 'Practicing',
      text: 'Intermediate music theory, and more grunge songs on acoustic guitar.',
    },
  ],
};

export default now;
