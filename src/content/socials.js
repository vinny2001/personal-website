import { faAws, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Mail } from 'lucide-react';

import site from 'config/site';

/**
 * Social / contact links (hero, footer, mobile menu).
 * Brand logos come from FontAwesome (`brand`); everything else is a Lucide
 * icon component (`icon`). `components/ui/SocialLinks` renders either.
 */
const socials = [
  { label: 'GitHub', href: 'https://github.com/vinny2001', brand: faGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vincenzodaria', brand: faLinkedin },
  {
    label: 'AWS Credentials',
    href: 'https://www.credly.com/badges/f5faaf3e-85e1-4be6-aa73-8483443e95d8/linked_in?t=sh7luz',
    brand: faAws,
  },
  { label: 'Email', href: `mailto:${site.authorEmail}`, icon: Mail },
];

export default socials;
