import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import BlogListPage from './BlogListPage';
import BlogPostPage from './BlogPostPage';

const renderAt = (path) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

test('blog index renders category group headings', () => {
  renderAt('/blog');
  expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: 'Research' })).toBeInTheDocument();
});

test('a known post slug renders its title', () => {
  renderAt('/blog/neural-networks-cancer-remediation');
  expect(
    screen.getByRole('heading', { name: /Neural Network Nanobots for Cancer Remediation/i })
  ).toBeInTheDocument();
});

test('an unknown post slug renders the not-found state', () => {
  renderAt('/blog/does-not-exist');
  expect(screen.getByRole('heading', { name: /Post not found/i })).toBeInTheDocument();
});
