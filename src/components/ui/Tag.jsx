/**
 * Small pill label. `variant="blog"` renders the filled `.blog-tag` chip used
 * across the blog UI; the default renders the outline `.skill-tag`.
 */
const Tag = ({ children, variant = 'skill', className = '' }) => {
  const base = variant === 'blog' ? 'blog-tag' : 'skill-tag';
  return <span className={`${base} ${className}`.trim()}>{children}</span>;
};

export default Tag;
