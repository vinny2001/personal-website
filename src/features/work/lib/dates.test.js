import {
  formatMonth,
  formatTenure,
  formatYear,
  monthsBetween,
  parseMonth,
  toMonthString,
} from './dates';

describe('parseMonth', () => {
  it('parses "YYYY-MM"', () => {
    expect(parseMonth('2025-06')).toEqual({ year: 2025, month: 6 });
  });

  it.each(['2025-6', '2025-13', '2025-00', 'June 2025', '2025', ''])('rejects %j', (value) => {
    expect(() => parseMonth(value)).toThrow(/Invalid month/);
  });
});

describe('formatMonth / formatYear', () => {
  it('formats a month as "Mon YYYY"', () => {
    expect(formatMonth('2025-06')).toBe('Jun 2025');
    expect(formatMonth('2022-12')).toBe('Dec 2022');
  });

  it('formats just the year', () => {
    expect(formatYear('2023-08')).toBe('2023');
  });
});

describe('toMonthString', () => {
  it('uses local calendar month, zero-padded', () => {
    expect(toMonthString(new Date(2026, 10, 27))).toBe('2026-11');
    expect(toMonthString(new Date(2024, 0, 1))).toBe('2024-01');
  });
});

describe('monthsBetween', () => {
  it('counts whole calendar months', () => {
    expect(monthsBetween('2025-06', '2026-11')).toBe(17);
    expect(monthsBetween('2024-06', '2025-06')).toBe(12);
    expect(monthsBetween('2022-06', '2022-08')).toBe(2);
  });

  it('is zero for the same month and never negative', () => {
    expect(monthsBetween('2025-06', '2025-06')).toBe(0);
    expect(monthsBetween('2026-01', '2025-06')).toBe(0);
  });
});

describe('formatTenure', () => {
  it.each([
    [17, '1 yr 5 mo'],
    [12, '1 yr'],
    [24, '2 yr'],
    [25, '2 yr 1 mo'],
    [3, '3 mo'],
    [0, '< 1 mo'],
    [-4, '< 1 mo'],
  ])('%i months → %s', (months, expected) => {
    expect(formatTenure(months)).toBe(expected);
  });
});
