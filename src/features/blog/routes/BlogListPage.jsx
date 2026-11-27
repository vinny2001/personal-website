import Container from 'components/layout/Container';
import { Reveal } from 'components/motion/Reveal';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import { blogPage } from 'content/blog/page';

import PostList from '../components/PostList';
import groupPostsByCategory from '../lib/groupPostsByCategory';
import { posts } from '../posts';

/**
 * /blog — the post index. Each category is a labelled section: the category
 * name and blurb sit in a left column, its posts run down the right as ruled rows.
 */
const BlogListPage = () => {
  const groups = groupPostsByCategory(posts);

  return (
    <>
      <PageMeta title="Blog" description={blogPage.description} />
      <PageHeader title={blogPage.title} lede={blogPage.lede} />

      <Container className="pb-20 sm:pb-28">
        {groups.map((group, i) => {
          const headingId = `blog-category-${i}`;
          const count = group.posts.length;

          return (
            <section
              key={group.name}
              aria-labelledby={headingId}
              className={`border-t lg:grid lg:grid-cols-12 lg:gap-x-8 ${i > 0 ? 'mt-20 sm:mt-28' : ''}`}
            >
              <Reveal className="pt-8 lg:col-span-4 lg:pr-6 lg:pt-9">
                <p className="kicker">
                  {count} {count === 1 ? 'post' : 'posts'}
                </p>
                <h2
                  id={headingId}
                  className="mt-2 font-display text-3xl font-normal leading-none tracking-tight text-ink sm:text-4xl"
                >
                  {group.name}
                </h2>
                {group.description && (
                  <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-ink-muted">
                    {group.description}
                  </p>
                )}
              </Reveal>

              <div className="lg:col-span-8">
                <PostList posts={group.posts} />
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
};

export default BlogListPage;
