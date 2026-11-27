import { useId } from 'react';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Tag from 'components/ui/Tag';

import { formatDate } from 'utils/dates';

import './PostRow.css';

/**
 * One entry in the editorial post index: mono date + reading time, serif title,
 * excerpt, tags, and an arrow that nudges on hover. The entire row is a single
 * link (named by its title, described by its excerpt) with no nested controls.
 * `compact` drops the tags and clamps the excerpt for the homepage teaser.
 */
const PostRow = ({ post, compact = false }) => {
  const id = useId();
  const titleId = `${id}-title`;
  const excerptId = `${id}-excerpt`;

  return (
    <Link
      to={`/blog/${post.slug}`}
      aria-labelledby={titleId}
      aria-describedby={excerptId}
      className={`post-row group${compact ? ' post-row--compact' : ''}`}
    >
      <p className="post-row__meta kicker">
        <time dateTime={post.date}>{formatDate(post.date, 'short')}</time>
        <span>{post.readingTime}</span>
      </p>

      <div className="post-row__body">
        <h3
          id={titleId}
          className={`font-display font-normal leading-[1.08] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent ${
            compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {post.title}
        </h3>
        <p
          id={excerptId}
          className={`mt-3 max-w-[60ch] text-ink-soft ${compact ? 'line-clamp-2' : ''}`.trim()}
        >
          {post.excerpt}
        </p>
        {!compact && post.tags?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.75}
        className="post-row__arrow size-6 text-ink-muted transition duration-300 ease-out-expo group-hover:translate-x-1.5 group-hover:text-accent"
      />
    </Link>
  );
};

export default PostRow;
