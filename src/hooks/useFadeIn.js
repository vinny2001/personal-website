import { useEffect, useRef } from 'react';

/**
 * Reveal-on-scroll helper. Returns a ref to attach to an element that already
 * carries the `fade-in` class (see the `.fade-in` / `.fade-in.visible` rules in
 * `src/index.css`). The hook adds `visible` to trigger the CSS transition.
 *
 * @param {Object}  [options]
 * @param {number}  [options.threshold=0.1] IntersectionObserver threshold.
 * @param {boolean} [options.immediate=false] Reveal on mount via a short timeout
 *   instead of waiting for the element to scroll into view. Use for content that
 *   is above the fold on load (hero, top of a routed page).
 * @param {number}  [options.delay=50] Timeout delay (ms) when `immediate` is true.
 * @param {Array}   [options.deps=[]] Extra deps that should re-run the effect
 *   (e.g. a route `slug` so the animation replays on navigation).
 * @returns {React.RefObject<HTMLElement>}
 */
const useFadeIn = ({ threshold = 0.1, immediate = false, delay = 50, deps = [] } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (immediate) {
      const timeout = setTimeout(() => el.classList.add('visible'), delay);
      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, immediate, delay, ...deps]);

  return ref;
};

export default useFadeIn;
