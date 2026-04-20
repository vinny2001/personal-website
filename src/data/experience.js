/**
 * Work experience data — update this file to change the Experience section.
 * Items are displayed in reverse-chronological order (newest first).
 */
const experience = [
  {
    id: 1,
    role: 'Associate Software Engineer',
    company: 'Travelers',
    location: 'Hartford, CT',
    startDate: 'June 2025',
    endDate: 'Present',
    intro: 'Full-stack engineer in the Corporate Technology — Finance and Investments Value Stream, building an AWS cloud-based internal web app for resource costing and forecasting across 12 lines of business.',
    description: [
      'Frontend (Angular): data-driven UI components powering forecasting and costing insights for 30,000+ enterprise resources.',
      'Middle-end (TypeScript, Node.js, AWS): in-house REST APIs and API Gateway integrations for secure, efficient data transactions.',
      'Backend (PostgreSQL, AWS): schema design and data querying supporting the core forecasting engine.',
      'Batch & analytics: Python-based Lambda and Glue jobs processing Jira and Workday data to generate business insights for ~1M costable items.',
      'CI/CD: manage GitHub Actions pipelines across all stacks for automated deployments to dev, test, and production.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'GitHub Actions'],
  },
  {
    id: 2,
    role: 'Software Engineer — EDP',
    company: 'Travelers',
    location: 'Hartford, CT',
    startDate: 'June 2024',
    endDate: 'June 2025',
    description: [
      'Worked under the Corporate Technology LOB supporting the Corporate Finance & Investments value stream.',
      'Engineered robust, data-driven web applications serving internal enterprise users.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: 3,
    role: 'Software Engineer Intern — TLDP',
    company: 'Travelers',
    location: 'Hartford, CT',
    startDate: 'June 2023',
    endDate: 'August 2023',
    description: [
      'Developed in-house, data-driven cloud applications for the Finance Applications & Data value stream as part of the Technology Leadership Development Program (TLDP).',
      'Supported full-stack development on the Check Feed System (CFS): Angular frontend and .NET C# backend.',
    ],
    tags: ['Angular', '.NET', 'C#', 'AWS'],
  },
  {
    id: 4,
    role: 'Data Engineer — YSM ACE',
    company: 'Yale University',
    location: 'New Haven, CT',
    startDate: 'August 2022',
    endDate: 'December 2022',
    description: [
      'Continued part-time work for the YSM Analytics Center of Excellence following the summer internship.',
      'Led the YSM Space Analytics project: increased automation, efficiency, and visualization of space-related data to provide metrics for future space planning and funding across all YSM spaces.',
    ],
    tags: ['Python', 'SQL', 'Data Engineering', 'Analytics'],
  },
  {
    id: 5,
    role: 'Data Analyst Intern',
    company: 'Yale University',
    location: 'New Haven, CT',
    startDate: 'June 2022',
    endDate: 'August 2022',
    description: [
      'Yale ITS Summer 2022 internship with the Analytics Center of Excellence.',
      'Developed, tested, and delivered data analysis projects for the Yale School of Medicine.',
    ],
    tags: ['Python', 'SQL', 'Data Analysis'],
  },
];

export default experience;
