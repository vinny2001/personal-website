/**
 * Pure state machine behind the hero typewriter (driven by hooks/useTypewriter).
 *
 *   start → typing → holding → deleting → typing (next phrase) → … → done
 *
 * A "round" shows every phrase once. After `rounds` rounds the machine types
 * the first phrase one last time and settles there (`done`) — so nothing loops
 * forever. Pass `rounds: Infinity` for an endless rotation.
 * `instant` (reduced motion) skips the per-character animation: whole phrases
 * simply swap after each hold.
 *
 * State: { index, chars, round, phase } — `chars` is how much of
 * `phrases[index]` is currently visible.
 */
const phraseAt = (phrases, index) => phrases[index] ?? '';

// Settle on the first phrase once enough rounds have passed (or there's
// nothing to rotate through).
const isSettled = ({ index, round }, phrases, rounds) =>
  phrases.length <= 1 || (index === 0 && round >= rounds);

const advance = (state, phrases) => {
  const index = (state.index + 1) % phrases.length;
  return { ...state, index, round: index === 0 ? state.round + 1 : state.round };
};

export const initialTypewriterState = ({ phrases, instant = false }) => {
  const state = { index: 0, chars: 0, round: 0, phase: 'start' };
  if (!instant) return state;
  return {
    ...state,
    chars: phraseAt(phrases, 0).length,
    phase: phrases.length <= 1 ? 'done' : 'holding',
  };
};

export const nextTypewriterState = (state, { phrases, rounds = Infinity, instant = false }) => {
  const full = phraseAt(phrases, state.index).length;

  switch (state.phase) {
    case 'start':
      return { ...state, phase: 'typing' };

    case 'typing': {
      const chars = instant ? full : Math.min(state.chars + 1, full);
      if (chars < full) return { ...state, chars };
      return { ...state, chars, phase: isSettled(state, phrases, rounds) ? 'done' : 'holding' };
    }

    case 'holding': {
      if (!instant) return { ...state, phase: 'deleting' };
      const next = advance(state, phrases);
      return {
        ...next,
        chars: phraseAt(phrases, next.index).length,
        phase: isSettled(next, phrases, rounds) ? 'done' : 'holding',
      };
    }

    case 'deleting': {
      const chars = instant ? 0 : Math.max(state.chars - 1, 0);
      if (chars > 0) return { ...state, chars };
      return { ...advance(state, phrases), chars: 0, phase: 'typing' };
    }

    default:
      return state;
  }
};

/** The visible slice of the current phrase. */
export const typewriterText = (state, phrases) =>
  phraseAt(phrases, state.index).slice(0, state.chars);
