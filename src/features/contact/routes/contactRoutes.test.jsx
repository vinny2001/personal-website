import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import contact from 'content/contact';

import ContactPage from './ContactPage';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/contact']}>
        <ContactPage />
      </MemoryRouter>
    </HelmetProvider>
  );

test('renders the heading, the contact form, and the aside', () => {
  renderPage();
  expect(
    screen.getByRole('heading', { level: 1, name: /let's build something/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

  contact.interests.groups
    .flatMap((g) => g.items)
    .forEach((item) => expect(screen.getByText(item)).toBeInTheDocument());

  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
});

test('does not expose an email address or a mailto link', () => {
  const { container } = renderPage();
  expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  expect(container.textContent).not.toMatch(/@gmail\.com/i);
});
