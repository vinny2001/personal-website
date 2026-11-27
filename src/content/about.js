/**
 * Copy for the /about page. Edit the prose here.
 */

/** Masthead, <head> description, and section headings. */
export const aboutPage = {
  title: 'Curious by default.',
  lede: 'AI-driven full-stack engineer at Travelers in Hartford. Before that: data work at Yale, a Computer Science degree, and a middle-school habit of taking Android apart that never quite wore off.',
  description:
    'About Vincenzo D’Aria — AI-driven full-stack engineer, 2× AWS Certified, Computer Science graduate, hiker and guitarist.',
  bio: { kicker: 'Profile', title: 'Background', factsTitle: 'At a glance' },
  skills: {
    kicker: 'Index',
    title: 'Skills & tools',
    note: 'Full-stack breadth, now built for the agentic era — from Angular to the agent loop.',
  },
  certifications: {
    kicker: 'Credentials',
    title: 'Certifications',
    note: 'Verified on Credly.',
    profileLabel: 'All badges on Credly',
  },
  publications: {
    kicker: 'Research',
    title: 'Publications',
    note: 'Published work, with the story behind it.',
    paperLabel: 'Read the paper',
    postLabel: 'My write-up',
  },
};

/** Biography, one string per paragraph (whitespace is collapsed, so wrap freely). */
export const aboutParagraphs = [
  `I got into tech as a middle-schooler, tinkering with Android kernel development and custom
   UI mods — not for any class, just out of genuine curiosity. Code was a creative medium
   before it was ever a career, and that spirit of building things for the love of it has
   stayed with me. It eventually grew into a B.S. in Computer Science and a professional path
   that's taken me from data engineering at Yale to full-stack cloud development at Travelers —
   and, lately, to building the AI agents and automations that help my team ship.`,
  `Outside of work, I'm usually out on a trail. I summited Mt. Washington this summer, and now
   I'm working my way through more of the White Mountains' 4,000-footers. I'm also a
   self-taught acoustic guitarist, refining my music theory and playing a lot more grunge. I love to travel, with plans to explore more of the U.S. before eventually heading
   to Europe to dig into my European roots. I run on good coffee and good conversation, and I
   consider connecting with new people one of life's better features.`,
  `I hold a B.S. from Central Connecticut State University, where I also contributed to
   published research on neural network-guided nanobots for cancer remediation — a project
   that cemented my interest in the intersection of AI and real-world impact.`,
].map((p) => p.replace(/\s+/g, ' ').trim());

/** Headline figures: `number` is the big serif figure, `label` its caption. */
export const aboutFacts = [
  { number: '4+', label: 'Years of experience' },
  { number: '2×', label: 'AWS Certified' },
  { number: 'B.S.', label: 'CCSU, Computer Science' },
];
