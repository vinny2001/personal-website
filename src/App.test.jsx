import { render, screen } from '@testing-library/react';

import App from './app/App';

test('renders the site brand without crashing', () => {
  render(<App />);
  expect(screen.getByAltText(/VD logo/i)).toBeInTheDocument();
});
