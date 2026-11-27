import Container from 'components/layout/Container';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import experience, { workPage } from 'content/experience';

import CompanyGroup from '../components/CompanyGroup';
import { groupByCompany } from '../lib/roles';

const groups = groupByCompany(experience);

const WorkPage = () => {
  const now = new Date();

  return (
    <>
      <PageMeta title="Work" description={workPage.description} />
      <PageHeader title={workPage.title} lede={workPage.lede} />

      <Container>
        {groups.map((group) => (
          <CompanyGroup key={group.id} group={group} now={now} />
        ))}
      </Container>
    </>
  );
};

export default WorkPage;
