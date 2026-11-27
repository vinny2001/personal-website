import { Helmet } from 'react-helmet-async';

import site from 'config/site';

/**
 * Per-route <head> tags. `title` is suffixed with the site name; omit it on
 * the homepage to get the bare name.
 */
const PageMeta = ({ title, description, type = 'website' }) => {
  const fullTitle = title ? `${title} — ${site.name}` : site.name;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta property="og:type" content={type} />
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  );
};

export default PageMeta;
