import { formatDate, formatMonthYear } from './dates';

describe('formatDate', () => {
  it('formats an ISO date with the long month by default', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });

  it('supports an abbreviated month', () => {
    expect(formatDate('2026-06-17', 'short')).toBe('Jun 17, 2026');
  });

  it('does not drift a day across time zones', () => {
    expect(formatDate('2024-12-31')).toBe('December 31, 2024');
  });
});

describe('formatMonthYear', () => {
  it('formats an ISO date as a short month and year', () => {
    expect(formatMonthYear('2026-11-27')).toBe('Nov 2026');
  });

  it('does not drift to the previous month at the start of a month', () => {
    expect(formatMonthYear('2026-01-01')).toBe('Jan 2026');
  });
});
