const VARIANTS = {
  outline: 'border text-ink-soft',
  solid: 'bg-paper-sunken text-ink-soft',
  accent: 'bg-accent-wash text-accent',
};

/** Small mono label for tech stacks, post tags, statuses. */
const Tag = ({ children, variant = 'outline', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-[3px] px-2 py-0.5 font-mono text-[0.7rem] leading-5 tracking-wide ${VARIANTS[variant]} ${className}`.trim()}
  >
    {children}
  </span>
);

export default Tag;
