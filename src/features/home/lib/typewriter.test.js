import { initialTypewriterState, nextTypewriterState, typewriterText } from './typewriter';

// Step the machine until it settles, recording each distinct visible string.
const run = (config, limit = 500) => {
  let state = initialTypewriterState(config);
  const frames = [typewriterText(state, config.phrases)];
  for (let i = 0; state.phase !== 'done' && i < limit; i += 1) {
    state = nextTypewriterState(state, config);
    const text = typewriterText(state, config.phrases);
    if (text !== frames[frames.length - 1]) frames.push(text);
  }
  return { state, frames };
};

describe('typewriter state machine', () => {
  test('types, deletes and rotates, then settles on the first phrase after one round', () => {
    const { state, frames } = run({ phrases: ['ab', 'c'], rounds: 1 });
    expect(frames).toEqual(['', 'a', 'ab', 'a', '', 'c', '', 'a', 'ab']);
    expect(state).toMatchObject({ phase: 'done', index: 0, chars: 2 });
  });

  test('holds after each fully typed phrase', () => {
    let state = initialTypewriterState({ phrases: ['hi', 'yo'] });
    const config = { phrases: ['hi', 'yo'] };
    state = nextTypewriterState(state, config); // start → typing
    state = nextTypewriterState(state, config); // "h"
    state = nextTypewriterState(state, config); // "hi"
    expect(state.phase).toBe('holding');
    expect(nextTypewriterState(state, config).phase).toBe('deleting');
  });

  test('instant mode swaps whole phrases without a partial frame', () => {
    const { state, frames } = run({ phrases: ['one', 'two', 'three'], rounds: 1, instant: true });
    expect(frames).toEqual(['one', 'two', 'three', 'one']);
    expect(state.phase).toBe('done');
  });

  test('a single phrase types once and settles', () => {
    expect(run({ phrases: ['solo'], rounds: 3 }).frames).toEqual(['', 's', 'so', 'sol', 'solo']);
    expect(initialTypewriterState({ phrases: ['solo'], instant: true }).phase).toBe('done');
  });

  test('rounds: Infinity never settles', () => {
    const { state } = run({ phrases: ['a', 'b'] }, 200);
    expect(state.phase).not.toBe('done');
  });

  test('copes with an empty phrase list', () => {
    const { state, frames } = run({ phrases: [] });
    expect(state.phase).toBe('done');
    expect(frames).toEqual(['']);
  });
});
