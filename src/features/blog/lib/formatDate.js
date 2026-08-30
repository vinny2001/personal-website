/**
 * Formats an ISO date string (YYYY-MM-DD) as e.g. "January 15, 2024".
 * Parsed at local midnight so the day never drifts across time zones.
 */
const formatDate = (dateStr) => {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default formatDate;
