import { Link } from 'react-router-dom';

import SectionHeader from 'components/ui/SectionHeader';
import { featuredSlugs } from 'content/blog/featured';
import useFadeIn from 'hooks/useFadeIn';

import resolveFeatured from '../lib/resolveFeatured';
import { posts, postMetaBySlug } from '../posts';

import PostCard from './PostCard';

import './BlogPreview.css';

const BlogPreview = () => {
  const ref = useFadeIn();
  const featured = resolveFeatured(featuredSlugs, postMetaBySlug, posts);

  return (
    <section id="blog" className="section">
      <div className="container">
        <div ref={ref} className="fade-in">
          <SectionHeader
            title="Writing"
            subtitle="Thoughts on engineering, tech, and more."
            className="blog-preview-header"
          />
          <div className="blog-preview-grid">
            {featured.map((post, idx) => (
              <PostCard
                key={post.slug}
                post={post}
                className={`fade-in fade-in-delay-${idx + 1}`}
              />
            ))}
          </div>
          <div className="blog-preview-footer">
            <Link to="/blog" className="view-all-link">
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
