import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { blogPage, draftCopy } from 'content/blog/page';

import groupPostsByCategory from '../lib/groupPostsByCategory';
import { posts } from '../posts';

import BlogListPage from './BlogListPage';
import BlogPostPage from './BlogPostPage';

/** Open every "Show N more" toggle so all rows are mounted. */
const showAllPosts = () =>
  screen.queryAllByRole('button', { name: /^Show \d+ more/ }).forEach((b) => fireEvent.click(b));

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
  showAllPosts();

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

test('draft posts carry a Draft tag on the index; published posts do not', () => {
  renderAt('/blog');
  showAllPosts();

  const drafts = posts.filter((p) => p.draft);
  expect(drafts.length).toBeGreaterThan(0);
  posts.forEach((post) => {
    const link = screen.getByRole('link', { name: post.title });
    if (post.draft) expect(within(link).getByText(draftCopy.label)).toBeInTheDocument();
    else expect(within(link).queryByText(draftCopy.label)).toBeNull();
  });
});

test('a draft post page keeps its header but swaps the body for "More on this soon!"', () => {
  renderAt('/blog/aws-developer-associate');

  expect(
    screen.getByRole('heading', { level: 1, name: /Passing the AWS Developer Associate/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('list', { name: 'Tags' })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Back to Writing/i })[0]).toHaveAttribute(
    'href',
    '/blog'
  );

  const note = screen.getByRole('note');
  expect(within(note).getByText('More on this soon!')).toBeInTheDocument();
  expect(within(note).getByText(draftCopy.note)).toBeInTheDocument();
  // The working outline stays in source and is not rendered.
  expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  expect(screen.queryByRole('complementary')).toBeNull();
});

test('a published post page renders its body, not the coming-soon panel', () => {
  renderAt('/blog/neural-networks-cancer-remediation');
  expect(screen.queryByRole('note')).toBeNull();
  expect(screen.queryByText('More on this soon!')).toBeNull();
  expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0);
});

test('long categories show a few posts, with a toggle for the rest', async () => {
  renderAt('/blog');
  const long = groupPostsByCategory(posts).find((g) => g.posts.length > blogPage.initialVisible);
  expect(long).toBeDefined();
  const hidden = long.posts.slice(blogPage.initialVisible);

  const section = screen.getByRole('region', { name: long.name });
  long.posts
    .slice(0, blogPage.initialVisible)
    .forEach((p) => expect(within(section).getByRole('link', { name: p.title })).toBeVisible());
  hidden.forEach((p) => expect(within(section).queryByRole('link', { name: p.title })).toBeNull());

  const more = within(section).getByRole('button', { name: blogPage.showMore(hidden.length) });
  expect(more).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(more);
  hidden.forEach((p) =>
    expect(within(section).getByRole('link', { name: p.title })).toBeInTheDocument()
  );

  const fewer = within(section).getByRole('button', { name: blogPage.showFewer });
  expect(fewer).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(fewer);
  await waitFor(() =>
    hidden.forEach((p) => expect(within(section).queryByRole('link', { name: p.title })).toBeNull())
  );
});

test('a category collapses from its heading and leaves the accessibility tree', async () => {
  renderAt('/blog');
  const group = groupPostsByCategory(posts).find((g) => g.name === 'Research');
  const section = screen.getByRole('region', { name: 'Research' });
  const toggle = within(screen.getByRole('heading', { level: 2, name: 'Research' })).getByRole(
    'button'
  );

  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(toggle).toHaveAttribute('aria-controls');
  expect(document.getElementById(toggle.getAttribute('aria-controls'))).toBeInTheDocument();

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await waitFor(() =>
    group.posts.forEach((p) =>
      expect(within(section).queryByRole('link', { name: p.title })).toBeNull()
    )
  );
  // The panel element stays so aria-controls still resolves.
  expect(document.getElementById(toggle.getAttribute('aria-controls'))).toBeInTheDocument();

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  group.posts.forEach((p) =>
    expect(within(section).getByRole('link', { name: p.title })).toBeInTheDocument()
  );
});
