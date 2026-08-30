import { faLinkedin, faGithub, faAws } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

/** Rotating tagline phrases for the typewriter effect. */
export const heroPhrases = [
  'Full-Stack Engineer',
  'Cloud & Data Systems Builder',
  'AWS Certified Cloud Practitioner',
];

/** Social / contact links shown under the hero. */
export const heroSocials = [
  { icon: faLinkedin, href: 'https://www.linkedin.com/in/vincenzodaria', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/vinny2001', label: 'GitHub' },
  {
    icon: faAws,
    href: 'https://www.credly.com/badges/f5faaf3e-85e1-4be6-aa73-8483443e95d8/linked_in?t=sh7luz',
    label: 'AWS Credentials',
  },
  { icon: faEnvelope, href: 'mailto:vincenzo.daria01@gmail.com', label: 'Email' },
];
