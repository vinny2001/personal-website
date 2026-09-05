import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

/**
 * Ghost "back" pill used at the top of the Blog list and post pages.
 * The arrow slides left on hover/focus; colors come from the shared tokens.
 */
const BackLink = ({ to, children = 'Back' }) => (
  <Link
    to={to}
    className="group mb-6 inline-flex items-center gap-2 rounded-full py-1.5 pr-3 text-sm font-medium text-ink-muted no-underline transition-colors duration-150 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
  >
    <FontAwesomeIcon
      icon={faArrowLeftLong}
      className="text-[0.8rem] transition-transform duration-200 ease-out group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
    />
    <span>{children}</span>
  </Link>
);

export default BackLink;
