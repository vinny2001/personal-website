import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import useFadeIn from 'hooks/useFadeIn';

import PostList from '../components/PostList';
import groupPostsByCategory from '../lib/groupPostsByCategory';
import { posts } from '../posts';

import './Blog.css';

const BlogListPage = () => {
  const ref = useFadeIn({ immediate: true });
  const groups = groupPostsByCategory(posts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog — Vincenzo D'Aria</title>
        <meta
          name="description"
          content="Writing on cloud architecture, full-stack engineering, and technical research by Vincenzo D'Aria."
        />
      </Helmet>

      <div className="blog-page">
        <div className="container">
          <div ref={ref} className="fade-in">
            <div className="blog-page-header">
              <Link to="/" className="back-link">
                &larr; Back
              </Link>
              <h1 className="blog-page-title">Writing</h1>
              <p className="blog-page-subtitle">
                Thoughts on cloud architecture, full-stack engineering, and the occasional deep dive
                into research topics — organized by what they're about.
              </p>
            </div>

            {groups.map((group) => (
              <section key={group.name} className="blog-category">
                <div className="blog-category__header">
                  <h2 className="blog-category__title">{group.name}</h2>
                  {group.description && (
                    <p className="blog-category__description">{group.description}</p>
                  )}
                </div>
                <PostList posts={group.posts} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
