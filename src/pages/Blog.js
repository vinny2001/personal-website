import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import blogPosts from '../data/blogPosts';
import './Blog.css';

const Blog = () => {
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = ref.current;
    if (!el) return;
    const timeout = setTimeout(() => el.classList.add('visible'), 50);
    return () => clearTimeout(timeout);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Blog — Vincenzo D'Aria</title>
        <meta name="description" content="Writing on cloud architecture, full-stack engineering, and technical research by Vincenzo D'Aria." />
      </Helmet>

      <div className="blog-page">
        <div className="container">
          <div ref={ref} className="fade-in">
            <div className="blog-page-header">
              <Link to="/" className="back-link">&larr; Back</Link>
              <h1 className="blog-page-title">Writing</h1>
              <p className="blog-page-subtitle">
                Thoughts on cloud architecture, full-stack engineering, and the occasional
                deep dive into research topics.
              </p>
            </div>

            <div className="blog-list">
              {blogPosts.map((post, idx) => (
                <Link
                  to={`/blog/${post.slug}`}
                  key={post.slug}
                  className={`blog-list-item fade-in fade-in-delay-${Math.min(idx + 1, 5)}`}
                >
                  <div className="blog-list-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <h2 className="blog-list-title">{post.title}</h2>
                  <p className="blog-list-excerpt">{post.excerpt}</p>
                  <div className="blog-list-meta">
                    <span className="blog-card-date">{formatDate(post.date)}</span>
                    <span className="blog-card-reading-time">{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
