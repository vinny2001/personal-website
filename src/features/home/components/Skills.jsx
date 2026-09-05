import SectionHeader from 'components/ui/SectionHeader';
import Tag from 'components/ui/Tag';
import { skillGroups } from 'content/skills';
import useFadeIn from 'hooks/useFadeIn';

import './Skills.css';

const Skills = () => {
  const ref = useFadeIn();

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={ref} className="fade-in">
          <SectionHeader title="Skills" subtitle="Technologies I've worked with across my career" />
          <div className="skills-grid">
            {skillGroups.map(({ category, skills }, groupIdx) => (
              <div key={category} className={`skill-group fade-in fade-in-delay-${groupIdx + 1}`}>
                <h3 className="skill-category">{category}</h3>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
