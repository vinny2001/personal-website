/**
 * Work history — edit this file to change the /work page and the "current
 * role" teaser on the homepage.
 *
 * `experience` is listed NEWEST FIRST. Each entry:
 *
 *   role      string       Job title (shown as the entry's heading).
 *   company   string       Consecutive entries with the same company are grouped
 *                          into one block, so keep a company's roles adjacent.
 *   location  string       "City, ST".
 *   start     'YYYY-MM'    First month in the role.
 *   end       'YYYY-MM' | null
 *                          Last month, or `null` for the role I'm in now
 *                          (displayed as "Present"; tenure counts up to today).
 *   intro     string?      Optional one-paragraph summary shown above the bullets
 *                          (also used by the homepage teaser).
 *   bullets   string[]     What I did, one sentence each.
 *   tags      string[]     Tech stack.
 *
 * Dates are formatted in code (features/work/lib), so just keep them ISO-ish.
 */
const experience = [
  {
    role: 'Associate Software Engineer',
    company: 'Travelers',
    location: 'Hartford, CT',
    start: '2025-06',
    end: null,
    intro:
      'Full-stack engineer in the Corporate Technology — Finance and Investments Value Stream, building an AWS cloud-based internal web app for resource costing and forecasting across 12 lines of business.',
    bullets: [
      'Frontend (Angular): data-driven UI components powering forecasting and costing insights for 30,000+ enterprise resources.',
      'Middle-end (TypeScript, Node.js, AWS): in-house REST APIs and API Gateway integrations for secure, efficient data transactions.',
      'Backend (PostgreSQL, AWS): schema design and data querying supporting the core forecasting engine.',
      'Batch & analytics: Python-based Lambda and Glue jobs processing Jira and Workday data to generate business insights for ~1M costable items.',
      'CI/CD: manage GitHub Actions pipelines across all stacks for automated deployments to dev, test, and production.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'GitHub Actions'],
  },
  {
    role: 'Software Engineer — EDP',
    company: 'Travelers',
    location: 'Hartford, CT',
    start: '2024-06',
    end: '2025-06',
    bullets: [
      'Worked under the Corporate Technology LOB supporting the Corporate Finance & Investments value stream.',
      'Engineered robust, data-driven web applications serving internal enterprise users.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    role: 'Software Engineer Intern — TLDP',
    company: 'Travelers',
    location: 'Hartford, CT',
    start: '2023-06',
    end: '2023-08',
    bullets: [
      'Developed in-house, data-driven cloud applications for the Finance Applications & Data value stream as part of the Technology Leadership Development Program (TLDP).',
      'Supported full-stack development on the Check Feed System (CFS): Angular frontend and .NET C# backend.',
    ],
    tags: ['Angular', '.NET', 'C#', 'AWS'],
  },
  {
    role: 'Data Engineer — YSM ACE',
    company: 'Yale University',
    location: 'New Haven, CT',
    start: '2022-08',
    end: '2022-12',
    bullets: [
      'Continued part-time work for the YSM Analytics Center of Excellence following the summer internship.',
      'Led the YSM Space Analytics project: increased automation, efficiency, and visualization of space-related data to provide metrics for future space planning and funding across all YSM spaces.',
    ],
    tags: ['Python', 'SQL', 'Data Engineering', 'Analytics'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Yale University',
    location: 'New Haven, CT',
    start: '2022-06',
    end: '2022-08',
    bullets: [
      'Yale ITS Summer 2022 internship with the Analytics Center of Excellence.',
      'Developed, tested, and delivered data analysis projects for the Yale School of Medicine.',
    ],
    tags: ['Python', 'SQL', 'Data Analysis'],
  },
];

/** Copy for the /work page masthead and <head>. */
export const workPage = {
  title: 'The work so far.',
  lede: 'From data analysis at the Yale School of Medicine to full-stack cloud engineering at Travelers — newest first, with each company’s roles grouped so the progression is easy to follow.',
  description:
    'Work experience of Vincenzo D’Aria — full-stack cloud engineering at Travelers and data engineering at Yale.',
};

export default experience;
