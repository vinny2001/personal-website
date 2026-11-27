import { AnimatePresence, motion } from 'motion/react';

import { DURATION, EASE_OUT } from 'components/motion/presets';

const GLIDE = { duration: DURATION.base, ease: EASE_OUT };

/**
 * Height-animated disclosure panel. The wrapper (carrying `id`, so a trigger's
 * `aria-controls` always resolves) is always rendered; its content is unmounted
 * while closed, so it leaves the accessibility tree and tab order.
 */
const CollapsePanel = ({ id, open, className = '', children }) => (
  <div id={id}>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: GLIDE, opacity: { duration: DURATION.fast } }}
          className={`overflow-hidden ${className}`.trim()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default CollapsePanel;
