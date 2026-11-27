import { formatMonth, formatYear } from '../lib/dates';

/**
 * "Jun 2025 – Present" as machine-readable <time> elements. `end` of `null`
 * means present (rendered as plain text, optionally accented). With
 * `precision="year"` the range collapses to years, and to a single year when
 * start and end fall in the same one.
 */
const DateRange = ({ start, end, precision = 'month', highlightPresent = false }) => {
  const byYear = precision === 'year';
  const format = byYear ? formatYear : formatMonth;
  const iso = (value) => (byYear ? formatYear(value) : value);
  const collapsed = end != null && format(end) === format(start);

  return (
    <>
      <time dateTime={iso(start)}>{format(start)}</time>
      {!collapsed && (
        <>
          {' – '}
          {end == null ? (
            <span className={highlightPresent ? 'text-accent' : undefined}>Present</span>
          ) : (
            <time dateTime={iso(end)}>{format(end)}</time>
          )}
        </>
      )}
    </>
  );
};

export default DateRange;
