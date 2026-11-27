/**
 * Shared motion vocabulary — every animation on the site pulls its easing and
 * timing from here so the whole thing moves as one system.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const DURATION = { fast: 0.2, base: 0.45, slow: 0.7 };

/**
 * Fade + rise, used by Reveal / RevealItem. The optional delay arrives via the
 * `custom` prop; it's omitted (not zeroed) otherwise so a parent's stagger
 * timing isn't overridden.
 */
export const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT, ...(delay ? { delay } : {}) },
  }),
};

/** Parent variant that staggers its RevealItem children. */
export const staggerVariants = (stagger = 0.07, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Reveal once, when ~20% of the element has entered the viewport. */
export const VIEWPORT = { once: true, amount: 0.2 };
