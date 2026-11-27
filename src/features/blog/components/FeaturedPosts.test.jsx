import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { featuredSlugs } from 'content/blog/featured';

import { postMetaBySlug } from '../posts';

import FeaturedPosts from './FeaturedPosts';

const renderTeaser = () =>
  render(
    <MemoryRouter>
      <FeaturedPosts />
    </MemoryRouter>
  );

test('renders the featured posts as titled links, in configured order', () => {
  renderTeaser();

  const expected = featuredSlugs.map((slug) => postMetaBySlug[slug]);
  const headings = screen.getAllByRole('heading', { level: 3 });
  expect(headings.map((h) => h.textContent)).toEqual(expected.map((p) => p.title));

  expected.forEach((post) => {
    expect(screen.getByRole('link', { name: post.title })).toHaveAttribute(
      'href',
      `/blog/${post.slug}`
    );
  });
});

test('is inner content only: no section, no section heading, no extra links', () => {
  const { container } = renderTeaser();

  expect(container.querySelector('section')).toBeNull();
  expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
  expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  expect(screen.getAllByRole('link')).toHaveLength(featuredSlugs.length);
});
