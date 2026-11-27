import experience from 'content/experience';

import { describeRole, findCurrentRole, groupByCompany, isCurrent } from './roles';

const NOW = new Date(2026, 10, 27); // Nov 2026

const role = (overrides) => ({
  role: 'Engineer',
  company: 'Acme',
  location: 'Hartford, CT',
  start: '2024-01',
  end: '2025-01',
  bullets: [],
  tags: [],
  ...overrides,
});

describe('isCurrent / findCurrentRole', () => {
  it('treats a missing end as the current role', () => {
    const current = role({ role: 'Now', end: null });
    const roles = [current, role({ role: 'Then' })];

    expect(isCurrent(current)).toBe(true);
    expect(isCurrent(roles[1])).toBe(false);
    expect(findCurrentRole(roles)).toBe(current);
  });

  it('returns undefined when nothing is current', () => {
    expect(findCurrentRole([role()])).toBeUndefined();
  });
});

describe('describeRole', () => {
  it('measures a current role against now', () => {
    expect(describeRole(role({ start: '2025-06', end: null }), NOW)).toEqual({
      isCurrent: true,
      startLabel: 'Jun 2025',
      endLabel: 'Present',
      tenure: '1 yr 5 mo',
    });
  });

  it('measures a finished role start-to-end, ignoring now', () => {
    expect(describeRole(role({ start: '2022-06', end: '2022-08' }), NOW)).toEqual({
      isCurrent: false,
      startLabel: 'Jun 2022',
      endLabel: 'Aug 2022',
      tenure: '2 mo',
    });
  });
});

describe('groupByCompany', () => {
  it('folds consecutive roles at the same company into one group', () => {
    const roles = [
      role({ role: 'Senior', start: '2025-01', end: null }),
      role({ role: 'Mid', start: '2024-01', end: '2025-01' }),
      role({ role: 'Intern', company: 'Globex', start: '2023-06', end: '2023-08' }),
    ];

    const groups = groupByCompany(roles);

    expect(groups.map((g) => [g.company, g.roles.map((r) => r.role)])).toEqual([
      ['Acme', ['Senior', 'Mid']],
      ['Globex', ['Intern']],
    ]);
  });

  it('spans the whole run: earliest start, open end if any role is current', () => {
    const [open] = groupByCompany([
      role({ start: '2025-01', end: null }),
      role({ start: '2024-01', end: '2025-01' }),
    ]);
    expect(open).toMatchObject({ start: '2024-01', end: null });

    const [closed] = groupByCompany([
      role({ start: '2025-01', end: '2025-09' }),
      role({ start: '2024-01', end: '2025-01' }),
    ]);
    expect(closed).toMatchObject({ start: '2024-01', end: '2025-09' });
  });

  it('keeps a shared location, and drops it when roles differ', () => {
    const [same] = groupByCompany([role(), role()]);
    expect(same.location).toBe('Hartford, CT');

    const [mixed] = groupByCompany([role(), role({ location: 'Remote' })]);
    expect(mixed.location).toBeNull();
  });

  it('does not merge non-adjacent stints, and gives each group a distinct id', () => {
    const groups = groupByCompany([
      role({ start: '2025-01', end: null }),
      role({ company: 'Globex', start: '2024-01', end: '2025-01' }),
      role({ start: '2022-01', end: '2024-01' }),
    ]);

    expect(groups).toHaveLength(3);
    expect(new Set(groups.map((g) => g.id)).size).toBe(3);
    expect(groups[0].id).toBe('acme-2025-01');
  });

  it('slugifies company names for ids', () => {
    const [group] = groupByCompany([role({ company: 'Yale University', start: '2022-06' })]);
    expect(group.id).toBe('yale-university-2022-06');
  });
});

describe('content/experience', () => {
  it('is well-formed: valid dates, newest first, exactly one current role', () => {
    experience.forEach((r) => expect(() => describeRole(r, NOW)).not.toThrow());

    const starts = experience.map((r) => r.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    expect(experience.filter(isCurrent)).toHaveLength(1);
  });

  it('groups Travelers (3 roles) and Yale (2 roles)', () => {
    const groups = groupByCompany(experience);
    expect(groups.map((g) => [g.company, g.roles.length])).toEqual([
      ['Travelers', 3],
      ['Yale University', 2],
    ]);
  });
});
