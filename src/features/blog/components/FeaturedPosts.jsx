import { featuredSlugs } from 'content/blog/featured';

import resolveFeatured from '../lib/resolveFeatured';
import { posts, postMetaBySlug } from '../posts';

import PostList from './PostList';

/**
 * Homepage teaser: the featured posts (see content/blog/featured.js) as a
 * compact ruled list. Inner content only — the page supplies the <section>,
 * its heading and the "all writing" link. Fluid from ~20rem up.
 */
const FeaturedPosts = () => {
  const featured = resolveFeatured(featuredSlugs, postMetaBySlug, posts);
  return <PostList posts={featured} compact className="border-b" />;
};

export default FeaturedPosts;
