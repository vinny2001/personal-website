import Container from 'components/layout/Container';
import PageMeta from 'components/seo/PageMeta';
import PageHeader from 'components/ui/PageHeader';
import { aboutFacts, aboutPage, aboutParagraphs } from 'content/about';
import certifications, { credlyProfile } from 'content/certifications';
import publications from 'content/publications';
import { skillGroups } from 'content/skills';

import Bio from '../components/Bio';
import Certifications from '../components/Certifications';
import Publications from '../components/Publications';
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
      <div className="mt-20 grid gap-16 sm:mt-28 lg:grid-cols-12 lg:gap-0">
        <Certifications
          className="lg:col-span-7 lg:pr-12"
          copy={aboutPage.certifications}
          certifications={certifications}
          profileUrl={credlyProfile}
        />
        <Publications
          className="lg:col-span-5 lg:border-l lg:pl-12"
          copy={aboutPage.publications}
          publications={publications}
        />
      </div>
    </Container>
  </>
);

export default AboutPage;
