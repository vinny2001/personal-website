import { faAws, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

/**
 * Social links (hero, footer, mobile menu). Brand logos come from FontAwesome
 * (`brand`) since Lucide has none. There is deliberately no email entry: the
 * address isn't published, people reach out through the /contact form.
 */
const socials = [
  { label: 'GitHub', href: 'https://github.com/vinny2001', brand: faGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vincenzodaria', brand: faLinkedin },
  {
    label: 'AWS Credentials',
    href: 'https://www.credly.com/users/vincenzo-d-aria',
    brand: faAws,
  },
];

export default socials;
