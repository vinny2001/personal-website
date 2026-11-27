import now from 'content/now';

import { formatMonthYear } from 'utils/dates';

import './NowCard.css';

/**
 * The homepage "Now" list (content/now.js): a ruled definition list of short
 * label → one-liner pairs, closed by an "Updated" dateline. Inner content only;
 * the page supplies the section and heading. Lays itself out by its own width.
 */
const NowCard = () => (
  <div className="now-card">
    <dl className="divide-y">
      {now.entries.map(({ label, text }) => (
        <div key={label} className="now-card__entry py-5 first:pt-0">
          <dt className="kicker">{label}</dt>
          <dd className="font-display text-2xl leading-tight text-ink">{text}</dd>
        </div>
      ))}
    </dl>
    <p className="kicker border-t pt-4">
      Updated <time dateTime={now.updated}>{formatMonthYear(now.updated)}</time>
    </p>
  </div>
);

export default NowCard;
