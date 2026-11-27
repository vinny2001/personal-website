const WIDTHS = {
  page: 'max-w-page',
  reading: 'max-w-reading',
};

/**
 * Horizontal page frame: centred, max-width, responsive side gutters.
 * `width="reading"` narrows it to a comfortable line length for long-form copy.
 */
const Container = ({ as: Tag = 'div', width = 'page', className = '', children, ...rest }) => (
  <Tag className={`mx-auto w-full px-5 sm:px-8 ${WIDTHS[width]} ${className}`.trim()} {...rest}>
    {children}
  </Tag>
);

export default Container;
