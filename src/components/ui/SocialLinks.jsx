import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import socials from 'content/socials';
import { linkProps } from 'utils/links';

/**
 * The social links from content/socials. Icon-only by default (each link is
 * labelled for screen readers); `showLabels` adds visible text.
 */
const SocialLinks = ({ showLabels = false, className = '', linkClassName = '' }) => (
  <ul className={`flex ${className}`.trim()}>
    {socials.map(({ label, href, brand }) => (
      <li key={label}>
        <a
          {...linkProps(href)}
          aria-label={showLabels ? undefined : label}
          className={`inline-flex items-center gap-2.5 text-ink-soft transition-colors hover:text-accent ${linkClassName}`.trim()}
        >
          <FontAwesomeIcon icon={brand} aria-hidden="true" className="size-[1.1em]" />
          {showLabels && <span className="link-draw">{label}</span>}
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
