import { useEffect, useRef } from 'react';
import experience from '../../data/experience';
import './Experience.css';

const Experience = () => {
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
    <section id="experience" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <h2 className="section-title">Experience</h2>
          <hr className="section-divider" />
          <div className="timeline">
            {experience.map((job, idx) => (
              <div
                key={job.id}
                className={`timeline-item fade-in fade-in-delay-${Math.min(idx + 1, 5)}`}
              >
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{job.role}</h3>
                      <p className="timeline-company">
                        {job.company} &mdash; {job.location}
                      </p>
                    </div>
                    <span className="timeline-dates">
                      {job.startDate} &ndash; {job.endDate}
                    </span>
                  </div>
                  {job.intro && <p className="timeline-intro">{job.intro}</p>}
                  <ul className="timeline-bullets">
                    {job.description.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="timeline-tags">
                    {job.tags.map((tag) => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
