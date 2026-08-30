import { categories } from 'content/blog/categories';

const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

/**
 * Groups post metadata into ordered category sections for the Blog page.
 *
 * @param {Array<{category?: string, date: string}>} posts
 * @returns {Array<{ name: string, description?: string, posts: Array }>}
 *   Groups from `categories.js` first (in that order), then any leftover
 *   categories that posts reference but the config does not list. Empty groups
 *   are dropped. Posts are newest-first within each group.
 */
const groupPostsByCategory = (posts) => {
  const remaining = new Map();
  posts.forEach((post) => {
    const key = post.category || 'Uncategorized';
    if (!remaining.has(key)) remaining.set(key, []);
    remaining.get(key).push(post);
  });

  const groups = [];

  categories.forEach(({ name, description }) => {
    const bucket = remaining.get(name);
    if (bucket && bucket.length) {
      groups.push({ name, description, posts: [...bucket].sort(byDateDesc) });
      remaining.delete(name);
    }
  });

  remaining.forEach((bucket, name) => {
    if (bucket.length) groups.push({ name, posts: [...bucket].sort(byDateDesc) });
  });

  return groups;
};

export default groupPostsByCategory;
