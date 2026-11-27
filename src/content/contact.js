import { Briefcase, Handshake, Mic, Smile, UserSearch } from 'lucide-react';

/** Copy for the /contact page and its form. Social links come from content/socials. */
const contact = {
  description:
    "Get in touch with Vincenzo D'Aria: send a note through the contact form, or find him on LinkedIn and GitHub.",
  title: "Let's build something",
  emphasis: 'good.',
  lede: "Whether it's a role, a project, or just a good conversation over coffee, drop me a note and I'll get back to you.",

  form: {
    headline: 'Write to me',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    categoryLegend: 'What is this about?',
    subjectLabel: 'Subject',
    subjectHint: 'optional',
    messageLabel: 'Message',
    messageHint: 'What are you working on? What would you like to talk about?',
    submitLabel: 'Send message',
    sendingLabel: 'Sending…',
    retryLabel: 'Try again',
    errorSummary: 'A few things need another look:',
  },

  /** Single-select chips. `id` is the stable key; `label` appears in the email subject. */
  categories: [
    { id: 'recruiter', label: 'Recruiter', icon: UserSearch },
    { id: 'work', label: 'Work opportunity', icon: Briefcase },
    { id: 'collaboration', label: 'Collaboration', icon: Handshake },
    { id: 'speaking', label: 'Speaking / event', icon: Mic },
    { id: 'hello', label: 'Just saying hi', icon: Smile },
  ],

  success: {
    kicker: 'Message sent',
    title: 'Thank you.',
    body: 'Your note is on its way. I read everything that comes in and will reply to the address you gave me as soon as I can.',
    again: 'Send another',
  },

  error: {
    title: "That didn't go through.",
    body: "Something went wrong and your message wasn't sent. Your text is still here, so try again in a moment, or reach out on LinkedIn instead.",
    fallbackLabel: 'Message me on LinkedIn',
  },

  interests: {
    kicker: "What I'm drawn to",
    title: 'Talking shop',
    blurb:
      'Not a job ad, just the corners of the field where I most enjoy talking shop. If one of these is yours, say hello.',
    groups: [
      { title: 'Industries', items: ['Insurtech', 'Fintech', 'Aerospace technology'] },
      {
        title: 'Kinds of work',
        items: [
          'AI engineering',
          'Forward-deployed engineering',
          'Cloud & infrastructure architecture',
          'AI-driven full-stack engineering',
        ],
      },
    ],
  },

  elsewhereKicker: 'Elsewhere',
  elsewhereTitle: 'Find me online',
};

export default contact;
