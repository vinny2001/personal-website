import { Link } from 'react-router-dom';

import Tag from 'components/ui/Tag';

import formatDate from '../lib/formatDate';

/**
 * Link card for a blog post, shared by the homepage preview grid
 * (`variant="card"`) and the /blog list (`variant="list"`).
 */
const PostCard = ({ post, variant = 'card', className = '' }) => {
  const root = variant === 'list' ? 'blog-list-item' : 'blog-card';
  const titleClass = variant === 'list' ? 'blog-list-title' : 'blog-card-title';
  const excerptClass = variant === 'list' ? 'blog-list-excerpt' : 'blog-card-excerpt';
  const metaClass = variant === 'list' ? 'blog-list-meta' : 'blog-card-meta';
  const TitleTag = variant === 'list' ? 'h2' : 'h3';

  return (
    <Link to={`/blog/${post.slug}`} className={`${root} ${className}`.trim()}>
      <div className="blog-card-tags blog-list-tags">
        {post.tags.map((tag) => (
          <Tag key={tag} variant="blog">
            {tag}
          </Tag>
        ))}
      </div>
      <TitleTag className={titleClass}>{post.title}</TitleTag>
      <p className={excerptClass}>{post.excerpt}</p>
      <div className={metaClass}>
        <span className="blog-card-date">{formatDate(post.date)}</span>
        <span className="blog-card-reading-time">{post.readingTime}</span>
      </div>
    </Link>
  );
};

export default PostCard;
