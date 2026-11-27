import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { EASE_OUT } from 'components/motion/presets';
import useTheme from 'hooks/useTheme';

/** Light/dark switch; the icon spins over to the new state. */
const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  const Icon = theme === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="grid"
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
