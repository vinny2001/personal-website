/**
 * Display formatting for ISO calendar dates (YYYY-MM-DD) from content files.
 * Parsed at local midnight so the day never drifts across time zones.
 * (Month-precision "YYYY-MM" work dates live in features/work/lib/dates.)
 */
const parseISODate = (iso) => new Date(`${iso}T00:00:00`);

/** "2024-01-15" → "January 15, 2024"; `month: 'short'` → "Jan 15, 2024". */
export const formatDate = (iso, month = 'long') =>
  parseISODate(iso).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric' });

/** "2026-11-27" → "Nov 2026". */
export const formatMonthYear = (iso) =>
  parseISODate(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
