import Container from 'components/layout/Container';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import { blogPage } from 'content/blog/page';

import CategoryGroup from '../components/CategoryGroup';
import groupPostsByCategory from '../lib/groupPostsByCategory';
import { posts } from '../posts';

/**
 * /blog — the post index. Each category is a collapsible, labelled section
 * (see CategoryGroup): name and blurb on the left, ruled post rows on the right.
 */
const BlogListPage = () => {
  const groups = groupPostsByCategory(posts);

  return (
    <>
      <PageMeta title="Blog" description={blogPage.description} />
      <PageHeader title={blogPage.title} lede={blogPage.lede} />

      <Container className="pb-20 sm:pb-28">
        {groups.map((group, i) => (
          <CategoryGroup
            key={group.name}
            group={group}
            headingId={`blog-category-${i}`}
            className={i > 0 ? 'mt-20 sm:mt-28' : ''}
          />
        ))}
      </Container>
    </>
  );
};

export default BlogListPage;
