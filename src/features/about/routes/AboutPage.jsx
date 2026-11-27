import Container from 'components/layout/Container';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import { aboutFacts, aboutPage, aboutParagraphs } from 'content/about';
import { skillGroups } from 'content/skills';

import Bio from '../components/Bio';
import SkillIndex from '../components/SkillIndex';

const AboutPage = () => (
  <>
    <PageMeta title="About" description={aboutPage.description} />
    <PageHeader title={aboutPage.title} lede={aboutPage.lede} />

    <Container>
      <Bio copy={aboutPage.bio} paragraphs={aboutParagraphs} facts={aboutFacts} />
      <div className="mt-20 sm:mt-28">
        <SkillIndex copy={aboutPage.skills} groups={skillGroups} />
      </div>
    </Container>
  </>
);

export default AboutPage;
