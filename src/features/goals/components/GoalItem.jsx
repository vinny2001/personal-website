import { motion } from 'motion/react';

import { DURATION, EASE_OUT, VIEWPORT } from 'components/motion/presets';
import ArrowLink from 'components/ui/ArrowLink';
import { goalsPage, statusLabels } from 'content/goals';

import StatusMark from './StatusMark';

/**
 * One goal as a ledger row: its number, category + text (the headline), and a
 * status line, with a "Read the write-up" link when the goal has a post.
 * Lives inside a <ul>, so it is an <li>; `index` only staggers the entrance.
 * `layout="position"` makes it glide (rather than jump) when the filter changes.
 */
const GoalItem = ({ goal, index = 0 }) => {
  const { icon: Icon, category, text, status, link, number } = goal;

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.slow, ease: EASE_OUT, delay: Math.min(index, 4) * 0.06 },
      }}
      exit={{ opacity: 0, transition: { duration: DURATION.fast } }}
      viewport={VIEWPORT}
      transition={{ layout: { duration: DURATION.base, ease: EASE_OUT } }}
      className="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-5 border-t py-7 md:grid-cols-12 md:gap-x-6 md:py-9"
    >
      <span className="font-mono text-xs leading-6 text-ink-muted md:col-span-1">
        {String(number).padStart(2, '0')}
      </span>

      <div className="min-w-0 md:col-span-7">
        <p className="kicker flex items-center gap-2">
          <Icon aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0" />
          {category}
        </p>
        <h3 className="mt-3 font-display text-[1.75rem] font-normal leading-[1.12] tracking-tight text-ink md:text-3xl lg:text-4xl">
          {text}
        </h3>
      </div>

      <div className="col-start-2 flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-4 md:col-start-auto md:flex-col md:items-end md:gap-y-3">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          <StatusMark status={status} />
          {statusLabels[status] ?? statusLabels.wip}
        </p>
        {link && (
          <ArrowLink
            to={`/blog/${link}`}
            className="text-sm"
            aria-label={`${goalsPage.linkLabel}: ${text}`}
          >
            {goalsPage.linkLabel}
          </ArrowLink>
        )}
      </div>
    </motion.li>
  );
};

export default GoalItem;
