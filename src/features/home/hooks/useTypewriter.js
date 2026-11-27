import { useEffect, useReducer } from 'react';

import { initialTypewriterState, nextTypewriterState, typewriterText } from '../lib/typewriter';

const DEFAULTS = {
  startDelay: 700, // ms before the first character (lets the hero settle in)
  typeSpeed: 55, // ms per character typed
  deleteSpeed: 28, // ms per character deleted
  hold: 1900, // ms a finished phrase stays up
  rounds: Infinity, // full passes through `phrases` before settling on the first
  instant: false, // swap whole phrases instead of typing (reduced motion)
};

/**
 * Cycles through `phrases` typewriter-style. Returns the visible `text` and
 * the current `phase` ('start' | 'typing' | 'holding' | 'deleting' | 'done')
 * so the caller can style the cursor. Logic lives in lib/typewriter; this hook
 * only schedules the next step.
 */
const useTypewriter = (phrases, options) => {
  const { startDelay, typeSpeed, deleteSpeed, hold, rounds, instant } = {
    ...DEFAULTS,
    ...options,
  };
  const [state, step] = useReducer(
    nextTypewriterState,
    { phrases, instant },
    initialTypewriterState
  );

  useEffect(() => {
    if (state.phase === 'done') return undefined;
    const delay = { start: startDelay, typing: typeSpeed, holding: hold, deleting: deleteSpeed };
    const timer = setTimeout(() => step({ phrases, rounds, instant }), delay[state.phase]);
    return () => clearTimeout(timer);
  }, [state, phrases, rounds, instant, startDelay, typeSpeed, deleteSpeed, hold]);

  return { text: typewriterText(state, phrases), phase: state.phase };
};

export default useTypewriter;
