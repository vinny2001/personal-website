import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Thin accent bar under the navbar that fills as the `target` element (a ref to
 * the post's <article>) scrolls past. Decorative, so hidden from assistive tech.
 * Smoothed with a spring unless the user prefers reduced motion.
 */
const ReadingProgress = ({ target }) => {
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[calc(var(--nav-height)+1px)] z-30 h-0.5 origin-left bg-accent"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
    />
  );
};

export default ReadingProgress;
