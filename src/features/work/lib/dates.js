/**
 * Month-precision date helpers for the work timeline.
 *
 * Dates in `content/experience.js` are "YYYY-MM" strings (lexicographic order
 * === chronological order), which keeps the content hand-editable while the
 * formatting lives here.
 */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** "2025-06" → { year: 2025, month: 6 }. Throws on anything else so typos in content fail loudly. */
export const parseMonth = (value) => {
  const match = MONTH_PATTERN.exec(value);
  if (!match) throw new Error(`Invalid month "${value}" — expected "YYYY-MM".`);
  return { year: Number(match[1]), month: Number(match[2]) };
};

/** "2025-06" → "Jun 2025". */
export const formatMonth = (value) => {
  const { year, month } = parseMonth(value);
  return `${MONTH_NAMES[month - 1]} ${year}`;
};

/** "2025-06" → "2025". */
export const formatYear = (value) => String(parseMonth(value).year);

/** A Date → "YYYY-MM" in local time. */
export const toMonthString = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const monthNumber = (value) => {
  const { year, month } = parseMonth(value);
  return year * 12 + month - 1;
};

/**
 * Whole calendar months from `start` to `end` (both "YYYY-MM"), never negative.
 * Plain month difference: Jun 2025 → Nov 2026 is 17 months.
 */
export const monthsBetween = (start, end) => Math.max(0, monthNumber(end) - monthNumber(start));

/** 17 → "1 yr 5 mo", 12 → "1 yr", 3 → "3 mo", 0 → "< 1 mo". */
export const formatTenure = (months) => {
  const total = Math.max(0, Math.floor(months));
  if (total === 0) return '< 1 mo';

  const years = Math.floor(total / 12);
  const rest = total % 12;
  return [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(' ');
};
