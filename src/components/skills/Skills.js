import { useEffect, useRef } from 'react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Python', '.NET / C#', 'REST APIs'],
  },
  {
    category: 'Cloud & Infrastructure',
    skills: ['AWS', 'Lambda', 'API Gateway', 'Glue', 'Terraform', 'GitHub Actions'],
  },
  {
    category: 'Data & Databases',
    skills: ['PostgreSQL', 'SQL', 'SQL Server', 'DynamoDB'],
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'CI/CD', 'Agile', 'Jira', 'Bash', 'Linux'],
  },
];

const Skills = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={ref} className="fade-in">
          <h2 className="section-title">Skills</h2>
          <hr className="section-divider" />
          <p className="section-subtitle">Technologies I've worked with across my career</p>
          <div className="skills-grid">
            {skillGroups.map(({ category, skills }, groupIdx) => (
              <div
                key={category}
                className={`skill-group fade-in fade-in-delay-${groupIdx + 1}`}
              >
                <h3 className="skill-category">{category}</h3>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
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
