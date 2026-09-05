import SectionHeader from 'components/ui/SectionHeader';
import { aboutParagraphs, aboutFacts } from 'content/about';
import useFadeIn from 'hooks/useFadeIn';

import './About.css';

const About = () => {
  const ref = useFadeIn({ threshold: 0.15 });

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <SectionHeader title="About Me" />
          <div className="about-grid">
            <div className="about-text">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="about-facts">
              {aboutFacts.map((fact, i) => (
                <div key={fact.label} className={`fact-card fade-in fade-in-delay-${i + 1}`}>
                  <span className="fact-number">{fact.number}</span>
                  <span className="fact-label">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
