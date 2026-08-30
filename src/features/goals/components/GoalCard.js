import { Link } from 'react-router-dom';

const GoalCardInner = ({ icon, category, text }) => (
  <>
    <span className="goal-icon" aria-hidden="true">
      {icon}
    </span>
    <div className="goal-content">
      <span className="goal-category">{category}</span>
      <p className="goal-text">{text}</p>
    </div>
  </>
);

/**
 * A single goal. When `link` (a blog slug) is set the whole card is a
 * <Link> to /blog/<slug>; otherwise it renders as a plain <div>.
 */
const GoalCard = ({ icon, category, text, status, link, delay = 1 }) => {
  const className = [
    'goal-card',
    'fade-in',
    `fade-in-delay-${Math.min(delay, 5)}`,
    status === 'done' && 'goal-card--done',
    link && 'goal-card--linked',
  ]
    .filter(Boolean)
    .join(' ');

  if (link) {
    return (
      <Link to={`/blog/${link}`} className={className}>
        <GoalCardInner icon={icon} category={category} text={text} />
        <span className="goal-card__arrow" aria-hidden="true">
          &rarr;
        </span>
      </Link>
    );
  }

  return (
    <div className={className}>
      <GoalCardInner icon={icon} category={category} text={text} />
    </div>
  );
};

export default GoalCard;
