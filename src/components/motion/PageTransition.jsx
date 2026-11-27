import { motion } from 'motion/react';

import { DURATION, EASE_OUT } from './presets';

/**
 * The page's <main> landmark, animated between routes. Rendered (keyed by
 * pathname) inside <AnimatePresence mode="wait"> in app/AppRoutes.
 * `id="main"` is the skip link's target.
 */
const PageTransition = ({ children }) => (
  <motion.main
    id="main"
    tabIndex={-1}
    className="flex-1 outline-none"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } }}
    exit={{ opacity: 0, y: -8, transition: { duration: DURATION.fast, ease: 'easeIn' } }}
  >
    {children}
  </motion.main>
);

export default PageTransition;
