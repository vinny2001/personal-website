import { useRef } from 'react';

import { useParams } from 'react-router-dom';

import Container from 'components/layout/Container';
import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import PageMeta from 'components/seo/PageMeta';
import ArrowLink from 'components/ui/ArrowLink';
import PageHeader from 'components/ui/PageHeader';
import Tag from 'components/ui/Tag';
import { formatDate } from 'utils/dates';

import ReadingProgress from '../components/ReadingProgress';
import { postMetaBySlug, postsBySlug } from '../posts';

import './BlogPost.css';

const PostNotFound = () => (
  <>
    <PageMeta title="Post not found" />
    <PageHeader
      kicker="404"
      title="Post not found"
      lede="The post you're looking for doesn't exist — or it moved somewhere else."
    >
      <ArrowLink to="/blog" back className="mt-8">
        Back to Writing
      </ArrowLink>
    </PageHeader>
  </>
);

const PostView = ({ meta, PostContent }) => {
  const articleRef = useRef(null);

  return (
    <>
      <PageMeta title={meta.title} description={meta.excerpt} type="article" />

      <article ref={articleRef}>
        <Container as="header" className="pb-10 pt-10 sm:pb-14 sm:pt-16">
          <RevealGroup immediate stagger={0.08}>
            <RevealItem>
              <ArrowLink to="/blog" back className="text-sm">
                Back to Writing
              </ArrowLink>
            </RevealItem>

            {meta.category && (
              <RevealItem as="p" className="kicker mt-12 text-accent sm:mt-16">
                {meta.category}
              </RevealItem>
            )}

            <RevealItem
              as="h1"
              className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.75rem)] font-normal leading-[0.95] tracking-[-0.025em] text-ink"
            >
              {meta.title}
            </RevealItem>

            <RevealItem className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t pt-5 sm:mt-14">
              <p className="kicker flex flex-wrap items-center gap-x-3">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span aria-hidden="true" className="h-px w-5 bg-rule" />
                <span>{meta.readingTime}</span>
              </p>
              {meta.tags?.length > 0 && (
                <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
                  {meta.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </RevealItem>
          </RevealGroup>
        </Container>

        <Container width="reading" className="pb-20 sm:pb-28">
          <div className="prose-editorial blog-prose">
            <PostContent />
          </div>

          <footer className="mt-16 border-t pt-8">
            <ArrowLink to="/blog" back>
              All writing
            </ArrowLink>
          </footer>
        </Container>
      </article>

      {/* After the <article> so its ref is attached when the scroll tracker starts. */}
      <ReadingProgress target={articleRef} />
    </>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const meta = postMetaBySlug[slug];
  const PostContent = postsBySlug[slug];

  if (!meta || !PostContent) return <PostNotFound />;
  return <PostView meta={meta} PostContent={PostContent} />;
};

export default BlogPostPage;
