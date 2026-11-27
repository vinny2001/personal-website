import { render, screen } from '@testing-library/react';

import { navLinks } from 'config/navigation';

import App from './app/App';

test('renders the primary nav with every route', () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: 'Main' });
  expect(nav).toBeInTheDocument();
  navLinks.forEach(({ label }) => {
    expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
  });
});

test('renders a single <main> landmark', () => {
  render(<App />);
  expect(screen.getAllByRole('main')).toHaveLength(1);
});
