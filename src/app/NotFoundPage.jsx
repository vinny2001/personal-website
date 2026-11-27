import PageMeta from 'components/seo/PageMeta';
import ArrowLink from 'components/ui/ArrowLink';
import PageHeader from 'components/ui/PageHeader';

const NotFoundPage = () => (
  <>
    <PageMeta title="Not found" />
    <PageHeader
      kicker="Error 404"
      title="Off the trail."
      lede="That page doesn't exist — or it moved somewhere else. Let's get you back on the path."
    >
      <ArrowLink to="/" className="mt-8">
        Back home
      </ArrowLink>
    </PageHeader>
  </>
);

export default NotFoundPage;
