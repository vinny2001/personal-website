import { useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Tag from 'components/ui/Tag';
import useFadeIn from 'hooks/useFadeIn';

import formatDate from '../lib/formatDate';
import { postMetaBySlug, postsBySlug } from '../posts';

import './BlogPost.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const ref = useFadeIn({ immediate: true, deps: [slug] });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const meta = postMetaBySlug[slug];
  const PostContent = postsBySlug[slug];

  if (!meta || !PostContent) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="blog-post-not-found">
            <h1>Post not found</h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to="/blog" className="back-link">
              &larr; Back to Writing
            </Link>
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
            <Link to="/blog" className="back-link">
              &larr; Back to Writing
            </Link>

            <header className="blog-post-header">
              {meta.category && <p className="blog-post-kicker">{meta.category}</p>}
              <div className="blog-list-tags">
                {meta.tags.map((tag) => (
                  <Tag key={tag} variant="blog">
                    {tag}
                  </Tag>
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

export default BlogPostPage;
