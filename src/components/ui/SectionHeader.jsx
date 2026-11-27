import ArrowLink from './ArrowLink';

/**
 * Heading for a section within a page: mono kicker, serif title, hairline
 * underneath, and an optional trailing link (`action={{ to, label }}`).
 * Pass `id` to target it from the section's `aria-labelledby`.
 */
const SectionHeader = ({ kicker, title, action, id, as: Heading = 'h2', className = '' }) => (
  <div className={`flex items-end justify-between gap-6 border-b pb-4 ${className}`.trim()}>
    <div>
      {kicker && <p className="kicker mb-2">{kicker}</p>}
      <Heading
        id={id}
        className="font-display text-3xl font-normal leading-none tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </Heading>
    </div>
    {action && (
      <ArrowLink to={action.to} href={action.href} className="shrink-0 pb-0.5 text-sm">
        {action.label}
      </ArrowLink>
    )}
  </div>
);

export default SectionHeader;
