import { motion } from 'motion/react';

import { DURATION, EASE_OUT, VIEWPORT } from 'components/motion/presets';

import '../Goals.css';

const trackVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fillVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

const SIZES = {
  sm: 'h-2 gap-1',
  lg: 'h-3.5 gap-1.5 sm:h-4',
};

/**
 * Segmented progress bar: one segment per goal. Accomplished segments fill in
 * (left to right, staggered) when the bar scrolls into view; the rest stay
 * hatched. Decorative — always pair it with the "X of Y accomplished" text.
 */
const ProgressMeter = ({ done, total, size = 'lg', className = '' }) => (
  <motion.div
    aria-hidden="true"
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
    variants={trackVariants}
    className={`flex ${SIZES[size]} ${className}`.trim()}
  >
    {Array.from({ length: total }, (_, i) =>
      i < done ? (
        <span key={i} className="goal-mark goal-mark--filling relative flex-1 overflow-hidden">
          <motion.span variants={fillVariants} className="absolute inset-0 origin-left bg-accent" />
        </span>
      ) : (
        <span key={i} className="goal-mark flex-1" />
      )
    )}
  </motion.div>
);

export default ProgressMeter;
