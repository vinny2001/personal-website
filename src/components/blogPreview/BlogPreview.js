import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blogPosts';
import './BlogPreview.css';

const BlogPreview = () => {
  const ref = useRef(null);
  const latestPosts = blogPosts.slice(0, 3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="section">
      <div className="container">
        <div ref={ref} className="fade-in">
          <div className="blog-preview-header">
            <div>
              <h2 className="section-title">Writing</h2>
              <hr className="section-divider" />
              <p className="section-subtitle">Thoughts on engineering, cloud, and research</p>
            </div>
            <Link to="/blog" className="view-all-link">View all posts &rarr;</Link>
          </div>
          <div className="blog-preview-grid">
            {latestPosts.map((post, idx) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className={`blog-card fade-in fade-in-delay-${idx + 1}`}
              >
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span className="blog-card-date">{formatDate(post.date)}</span>
                  <span className="blog-card-reading-time">{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
