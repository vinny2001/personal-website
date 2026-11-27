import { RevealGroup, RevealItem } from 'components/motion/Reveal';

import PostRow from './PostRow';

/**
 * Ruled index of posts: a hairline between rows, rows stagger in on scroll.
 * Used on /blog (inside each category group) and, with `compact`, as the
 * homepage teaser. Extra `className` goes on the <ul> (e.g. a closing rule).
 */
const PostList = ({ posts, compact = false, className = '' }) => (
  <RevealGroup as="ul" stagger={0.08} className={`post-list divide-y ${className}`.trim()}>
    {posts.map((post) => (
      <RevealItem as="li" key={post.slug}>
        <PostRow post={post} compact={compact} />
      </RevealItem>
    ))}
  </RevealGroup>
);

export default PostList;
