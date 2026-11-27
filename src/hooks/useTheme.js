import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
};

/**
 * Light/dark theme. Initial value comes from the `data-theme` attribute that
 * index.html sets before first paint; until the user picks one explicitly, the
 * theme keeps following the OS setting.
 *
 * `toggle(event)` swaps themes with a circular reveal radiating from the click
 * point (View Transitions API), falling back to an instant swap where that's
 * unsupported or the user prefers reduced motion.
 */
const useTheme = () => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = (e) => {
      if (readStored()) return;
      const next = e.matches ? 'dark' : 'light';
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — the choice just won't persist */
      }

      const commit = () => {
        applyTheme(next);
        setTheme(next);
      };

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduceMotion) {
        commit();
        return;
      }

      const x = event?.clientX ?? window.innerWidth - 48;
      const y = event?.clientY ?? 32;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.startViewTransition(commit).ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 550,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    },
    [theme]
  );

  return { theme, toggle };
};

export default useTheme;
