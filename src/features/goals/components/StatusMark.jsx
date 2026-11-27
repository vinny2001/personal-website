import '../Goals.css';

/** Tiny swatch for a goal status: solid = accomplished, hatched = in motion. Decorative. */
const StatusMark = ({ status, className = '' }) => (
  <span
    aria-hidden="true"
    className={['goal-mark', status === 'done' && 'goal-mark--done', 'size-2.5 shrink-0', className]
      .filter(Boolean)
      .join(' ')}
  />
);

export default StatusMark;
