/**
 * Standard section heading: title + accent divider + optional subtitle.
 * Styling comes from the shared `.section-title` / `.section-divider` /
 * `.section-subtitle` rules in src/index.css.
 */
const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`section-header ${className}`.trim()}>
    <h2 className="section-title">{title}</h2>
    <hr className="section-divider" />
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

export default SectionHeader;
