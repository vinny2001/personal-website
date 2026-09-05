import { render, screen } from '@testing-library/react';

import App from './app/App';

test('renders the primary nav without crashing', () => {
  render(<App />);
  // The navbar renders a full-screen and a condensed variant, so assert on the
  // "Main" (desktop) landmark and tolerate the duplicated links.
  expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0);
});
