import { act, renderHook } from '@testing-library/react';

import useTypewriter from './useTypewriter';

const PHRASES = ['Hi', 'Yo'];
const TIMING = { startDelay: 100, typeSpeed: 10, deleteSpeed: 10, hold: 50 };

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const advance = (ms) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

test('waits, then types a character per tick and holds the finished phrase', () => {
  const { result } = renderHook(() => useTypewriter(PHRASES, TIMING));
  expect(result.current).toEqual({ text: '', phase: 'start' });

  advance(100); // start → typing
  advance(10);
  expect(result.current.text).toBe('H');
  advance(10);
  expect(result.current).toEqual({ text: 'Hi', phase: 'holding' });
});

test('settles on the first phrase after the requested rounds', () => {
  const { result } = renderHook(() => useTypewriter(PHRASES, { ...TIMING, rounds: 1 }));
  // Each step schedules the next only after React re-renders, so tick per act().
  for (let i = 0; i < 50 && result.current.phase !== 'done'; i += 1) advance(100);
  expect(result.current).toEqual({ text: 'Hi', phase: 'done' });
  expect(vi.getTimerCount()).toBe(0); // nothing left running
});

test('instant mode shows whole phrases and swaps them after each hold', () => {
  const { result } = renderHook(() => useTypewriter(PHRASES, { ...TIMING, instant: true }));
  expect(result.current).toEqual({ text: 'Hi', phase: 'holding' });
  advance(50);
  expect(result.current.text).toBe('Yo');
});
