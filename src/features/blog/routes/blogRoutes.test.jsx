import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { posts } from '../posts';

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

test('blog index lists every post as one link per row, inside its labelled category', () => {
  renderAt('/blog');

  posts.forEach((post) => {
    const link = screen.getByRole('link', { name: post.title });
    expect(link).toHaveAttribute('href', `/blog/${post.slug}`);
    expect(within(link).getByRole('heading', { level: 3, name: post.title })).toBeInTheDocument();
    expect(link.querySelector('time')).toHaveAttribute('datetime', post.date);
    // No interactive elements nested inside the row link.
    expect(link.querySelector('a, button, input, select, textarea')).toBeNull();
  });

  const research = screen.getByRole('region', { name: 'Research' });
  expect(
    within(research).getByRole('link', { name: /Neural Network Nanobots for Cancer Remediation/i })
  ).toBeInTheDocument();
});

test('a known post slug renders its title', () => {
  renderAt('/blog/neural-networks-cancer-remediation');
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /Neural Network Nanobots for Cancer Remediation/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('article')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Back to Writing/i })[0]).toHaveAttribute(
    'href',
    '/blog'
  );
});

test('an unknown post slug renders the not-found state', () => {
  renderAt('/blog/does-not-exist');
  expect(screen.getByRole('heading', { name: /Post not found/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Back to Writing/i })).toHaveAttribute('href', '/blog');
});
