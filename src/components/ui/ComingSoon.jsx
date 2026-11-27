import { Hourglass } from 'lucide-react';

import { Reveal } from 'components/motion/Reveal';

/**
 * "More on this soon!" placeholder — for draft write-ups and unfinished
 * sections. A hatched, print-tint panel (the site's "not done yet" motif)
 * with an optional short note underneath.
 */
const ComingSoon = ({
  title = 'More on this soon!',
  note,
  icon: Icon = Hourglass,
  className = '',
}) => (
  <Reveal
    role="note"
    className={`hatched relative overflow-hidden rounded-sm border border-dashed px-6 py-10 text-center sm:px-10 sm:py-14 ${className}`.trim()}
  >
    <Icon aria-hidden="true" strokeWidth={1.5} className="mx-auto size-7 text-accent" />
    <p className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</p>
    {note && <p className="mx-auto mt-3 max-w-md text-ink-soft">{note}</p>}
  </Reveal>
);

export default ComingSoon;
