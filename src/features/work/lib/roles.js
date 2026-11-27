import { formatMonth, formatTenure, monthsBetween, toMonthString } from './dates';

/** A role with no `end` is the one I'm in right now. */
export const isCurrent = (role) => role.end == null;

export const findCurrentRole = (roles) => roles.find(isCurrent);

/**
 * Display-ready facts about one role, measured against `now`:
 * `{ isCurrent, startLabel: 'Jun 2025', endLabel: 'Present', tenure: '1 yr 5 mo' }`.
 */
export const describeRole = (role, now = new Date()) => {
  const current = isCurrent(role);
  return {
    isCurrent: current,
    startLabel: formatMonth(role.start),
    endLabel: current ? 'Present' : formatMonth(role.end),
    tenure: formatTenure(monthsBetween(role.start, current ? toMonthString(now) : role.end)),
  };
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Fold the role list (newest first) into consecutive same-company runs so a
 * promotion path reads as one block:
 *
 *   [{ id, company, location, start, end, roles }]
 *
 * - `location` is the shared location, or `null` when the roles differ.
 * - `start` / `end` span the whole run; `end` is `null` if any role is current.
 * - Non-consecutive stints at the same company stay as separate groups.
 */
export const groupByCompany = (roles) => {
  const runs = [];
  roles.forEach((role) => {
    const last = runs[runs.length - 1];
    if (last && last[0].company === role.company) last.push(role);
    else runs.push([role]);
  });

  return runs.map((run) => {
    const start = run.reduce((min, { start: s }) => (s < min ? s : min), run[0].start);
    const anyCurrent = run.some(isCurrent);
    const end = anyCurrent
      ? null
      : run.reduce((max, { end: e }) => (e > max ? e : max), run[0].end);
    const sharedLocation = run.every((role) => role.location === run[0].location);

    return {
      id: `${slugify(run[0].company)}-${start}`,
      company: run[0].company,
      location: sharedLocation ? run[0].location : null,
      start,
      end,
      roles: run,
    };
  });
};
