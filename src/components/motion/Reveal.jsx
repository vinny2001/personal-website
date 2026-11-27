import { motion } from 'motion/react';

import { revealVariants, staggerVariants, VIEWPORT } from './presets';

/**
 * Scroll-reveal primitives (replaces the old `useFadeIn` + `.fade-in` CSS).
 *
 *   <Reveal as="section" delay={0.1}>…</Reveal>          fades/rises in on scroll
 *
 *   <RevealGroup as="ul" stagger={0.06}>                 children enter in sequence
 *     <RevealItem as="li">…</RevealItem>
 *   </RevealGroup>
 *
 * `immediate` animates on mount instead of on scroll (above-the-fold content).
 * `as` is any HTML tag name; extra props pass through to the element.
 */
const triggerProps = (immediate) =>
  immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT };

export const Reveal = ({ as = 'div', delay = 0, immediate = false, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag {...triggerProps(immediate)} variants={revealVariants} custom={delay} {...rest}>
      {children}
    </Tag>
  );
};

export const RevealGroup = ({
  as = 'div',
  stagger,
  delay,
  immediate = false,
  children,
  ...rest
}) => {
  const Tag = motion[as];
  return (
    <Tag {...triggerProps(immediate)} variants={staggerVariants(stagger, delay)} {...rest}>
      {children}
    </Tag>
  );
};

/** A child of RevealGroup — inherits the parent's trigger, adds the stagger step. */
export const RevealItem = ({ as = 'div', children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag variants={revealVariants} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
