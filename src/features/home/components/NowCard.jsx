import { useId, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import { DURATION, EASE_OUT } from 'components/motion/presets';
import now from 'content/now';
import { formatMonthYear } from 'utils/dates';

import './NowCard.css';

const { entries, visibleCount } = now;
const shown = entries.slice(0, visibleCount);
const extra = entries.slice(visibleCount);

const GLIDE = { duration: DURATION.base, ease: EASE_OUT };

/** One label → line pair, with its quiet icon (warms to the accent on hover). */
const NowEntry = ({ icon: Icon, label, cite, text, className = '' }) => (
  <div className={`now-card__entry group py-5 ${className}`}>
    <dt className="kicker flex items-center gap-2.5">
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-accent"
      />
      {label}
    </dt>
    <dd className="font-display text-2xl leading-tight text-ink">
      {cite && (
        <>
          <cite>{cite}</cite>{' '}
        </>
      )}
      {text}
    </dd>
  </div>
);

/**
 * The homepage "Now" list (content/now.js): a ruled definition list of short
 * label → one-liner pairs, closed by an "Updated" dateline. The first few
 * entries show; the rest unfold behind a disclosure button (unmounted while
 * collapsed, so they stay out of the accessibility tree). Inner content only;
 * the page supplies the section and heading. Lays itself out by its own width.
 */
const NowCard = () => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="now-card">
      <dl className="divide-y">
        {shown.map((entry) => (
          <NowEntry key={entry.label} {...entry} className="first:pt-0" />
        ))}
      </dl>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="more"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: GLIDE, opacity: { duration: DURATION.fast } }}
            className="overflow-hidden"
          >
            <dl className="divide-y border-t">
              {extra.map((entry) => (
                <NowEntry key={entry.label} {...entry} />
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>

      {extra.length > 0 && (
        <div className="border-t">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="kicker -ml-2 inline-flex min-h-11 items-center gap-2 px-2 transition-colors duration-200 hover:text-ink"
          >
            {open ? now.showLess : `${now.showAll} ${entries.length}`}
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.75}
              className={`size-4 transition-transform duration-300 ease-out-expo ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}

      <p className="kicker border-t pt-4">
        Updated <time dateTime={now.updated}>{formatMonthYear(now.updated)}</time>
      </p>
    </div>
  );
};

export default NowCard;
