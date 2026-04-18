import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import blogPosts from '../data/blogPosts';
import postComponents from '../posts/index';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const ref = useRef(null);

  const meta = blogPosts.find((p) => p.slug === slug);
  const PostContent = postComponents[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = ref.current;
    if (!el) return;
    const timeout = setTimeout(() => el.classList.add('visible'), 50);
    return () => clearTimeout(timeout);
  }, [slug]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!meta || !PostContent) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="blog-post-not-found">
            <h1>Post not found</h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to="/blog" className="back-link">&larr; Back to Writing</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{meta.title} — Vincenzo D'Aria</title>
        <meta name="description" content={meta.excerpt} />
        <meta property="og:title" content={`${meta.title} — Vincenzo D'Aria`} />
        <meta property="og:description" content={meta.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="blog-post-page">
        <div className="container">
          <div ref={ref} className="fade-in blog-post-wrapper">
            <Link to="/blog" className="back-link">&larr; Back to Writing</Link>

            <header className="blog-post-header">
              <div className="blog-list-tags">
                {meta.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <h1 className="blog-post-title">{meta.title}</h1>
              <div className="blog-post-meta">
                <span>{formatDate(meta.date)}</span>
                <span>&middot;</span>
                <span>{meta.readingTime}</span>
              </div>
            </header>

            <div className="blog-post-body">
              <PostContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
