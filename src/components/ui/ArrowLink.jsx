import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { isExternal, linkProps } from 'utils/links';

const ARROWS = {
  forward: { Icon: ArrowRight, nudge: 'group-hover:translate-x-1' },
  external: {
    Icon: ArrowUpRight,
    nudge: 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
  },
  back: { Icon: ArrowLeft, nudge: 'group-hover:-translate-x-1' },
};

/**
 * Text link with an arrow that nudges on hover. Pass `to` for an in-app route
 * (→) or `href` for anything else (↗ for web links). `back` puts a ← in front.
 */
const ArrowLink = ({ to, href, back = false, children, className = '', ...rest }) => {
  const kind = back ? 'back' : href && isExternal(href) ? 'external' : 'forward';
  const { Icon, nudge } = ARROWS[kind];
  const cls = `group inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent ${className}`;

  const icon = (
    <Icon
      aria-hidden="true"
      className={`size-[1.05em] shrink-0 transition-transform duration-300 ease-out-expo ${nudge}`}
    />
  );
  const content = (
    <>
      {back && icon}
      <span className="link-draw">{children}</span>
      {!back && icon}
    </>
  );

  return to ? (
    <Link to={to} className={cls} {...rest}>
      {content}
    </Link>
  ) : (
    <a {...linkProps(href)} className={cls} {...rest}>
      {content}
    </a>
  );
};

export default ArrowLink;
