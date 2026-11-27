import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import home from 'content/home';
import now from 'content/now';

import HomePage from './HomePage';

// The teasers belong to other features — stub them so this test covers only
// the homepage's own composition.
vi.mock('features/work/components/CurrentRole', () => ({
  default: () => <p>CurrentRole teaser</p>,
}));
vi.mock('features/blog/components/FeaturedPosts', () => ({
  default: () => <p>FeaturedPosts teaser</p>,
}));
vi.mock('features/goals/components/GoalsSnapshot', () => ({
  default: () => <p>GoalsSnapshot teaser</p>,
}));

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    </HelmetProvider>
  );

test('the name is the single <h1>', () => {
  renderHome();
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveAccessibleName("Vincenzo D'Aria");
});

test('every typewriter phrase is available to assistive tech at once', () => {
  renderHome();
  expect(
    screen.getByText(
      'Full-Stack Engineer, Cloud & Data Systems Builder, AWS Certified Cloud Practitioner'
    )
  ).toBeInTheDocument();
});

test('renders the four featured sections, each a labelled region with its teaser', () => {
  renderHome();
  const expected = [
    ['Now', null],
    ['Current role', 'CurrentRole teaser'],
    ['Writing', 'FeaturedPosts teaser'],
    ['This year', 'GoalsSnapshot teaser'],
  ];

  expected.forEach(([title, teaser]) => {
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    const region = screen.getByRole('region', { name: title });
    if (teaser) expect(within(region).getByText(teaser)).toBeInTheDocument();
  });
});

test('section "view all" links point at their pages', () => {
  renderHome();
  home.sections
    .filter(({ action }) => action)
    .forEach(({ action }) => {
      expect(screen.getByRole('link', { name: action.label })).toHaveAttribute('href', action.to);
    });
});

test('the Now section lists every entry and its updated date', () => {
  renderHome();
  const region = screen.getByRole('region', { name: 'Now' });

  now.entries.forEach(({ label, text }) => {
    expect(within(region).getByText(label)).toBeInTheDocument();
    expect(within(region).getByText(text)).toBeInTheDocument();
  });
  expect(within(region).getByText('Building')).toBeInTheDocument();
  expect(
    within(region).getByText(/AWS-based resource costing & forecasting platform/)
  ).toBeInTheDocument();

  const updated = within(region).getByText('Nov 2026');
  expect(updated.tagName).toBe('TIME');
  expect(updated).toHaveAttribute('dateTime', '2026-11-27');
});
