import PostCard from './PostCard';

/** Vertical list of posts used on the /blog page (within each category group). */
const PostList = ({ posts }) => (
  <div className="blog-list">
    {posts.map((post, idx) => (
      <PostCard
        key={post.slug}
        post={post}
        variant="list"
        className={`fade-in fade-in-delay-${Math.min(idx + 1, 5)}`}
      />
    ))}
  </div>
);

export default PostList;
