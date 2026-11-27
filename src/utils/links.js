/**
 * Anchor attributes for an `href`: web links open in a new tab safely
 * (`noopener noreferrer`); mailto:, tel:, and same-site links don't.
 */
export const linkProps = (href) =>
  /^https?:\/\//.test(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };

export const isExternal = (href) => /^https?:\/\//.test(href);
