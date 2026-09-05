import SectionHeader from 'components/ui/SectionHeader';
import Tag from 'components/ui/Tag';
import experience from 'content/experience';
import useFadeIn from 'hooks/useFadeIn';

import './Experience.css';

const Experience = () => {
  const ref = useFadeIn();

  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <SectionHeader title="Experience" />
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
                      <Tag key={tag}>{tag}</Tag>
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
