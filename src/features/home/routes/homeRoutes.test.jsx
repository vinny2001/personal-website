import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import { heroPhrases } from 'content/hero';
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
  expect(screen.getByText(heroPhrases.join(', '))).toBeInTheDocument();
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

test('the Now section shows the first entries collapsed, with its updated date', () => {
  renderHome();
  const region = screen.getByRole('region', { name: 'Now' });
  const { entries, visibleCount } = now;

  entries.slice(0, visibleCount).forEach(({ label }) => {
    expect(within(region).getByText(label)).toBeInTheDocument();
  });
  entries.slice(visibleCount).forEach(({ label }) => {
    expect(within(region).queryByText(label)).not.toBeInTheDocument();
  });

  const toggle = within(region).getByRole('button', { name: `${now.showAll} ${entries.length}` });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');

  const updated = within(region).getByText('Nov 2026');
  expect(updated.tagName).toBe('TIME');
  expect(updated).toHaveAttribute('dateTime', '2026-11-27');
});

test('the Now toggle reveals every entry, italicises cited titles, then collapses again', async () => {
  renderHome();
  const region = screen.getByRole('region', { name: 'Now' });
  const { entries, visibleCount } = now;

  fireEvent.click(within(region).getByRole('button', { name: `${now.showAll} ${entries.length}` }));

  const toggle = within(region).getByRole('button', { name: now.showLess });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(
    region.querySelector(`#${CSS.escape(toggle.getAttribute('aria-controls'))}`)
  ).not.toBeNull();

  entries.forEach(({ label, text, cite }) => {
    expect(within(region).getByText(label)).toBeInTheDocument();
    expect(within(region).getByText(text)).toBeInTheDocument();
    if (cite) expect(within(region).getByText(cite).tagName).toBe('CITE');
  });

  fireEvent.click(toggle);
  await waitFor(() => {
    entries.slice(visibleCount).forEach(({ label }) => {
      expect(within(region).queryByText(label)).not.toBeInTheDocument();
    });
  });
  expect(within(region).getByRole('button', { name: /show all/i })).toHaveAttribute(
    'aria-expanded',
    'false'
  );
});
