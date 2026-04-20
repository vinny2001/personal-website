import { useEffect, useRef } from 'react';
import './Goals.css';

const goals = [
  {
    icon: '☁️',
    category: 'Career',
    text: 'Finish studying and pass the AWS Developer Associate exam',
  },
  {
    icon: '🗽',
    category: 'Career',
    text: 'Attend the AWS Summit in New York City',
  },
  {
    icon: '🎸',
    category: 'Personal',
    text: 'Level up to intermediate on guitar',
  },
  {
    icon: '✈️',
    category: 'Adventure',
    text: 'Draft plans for 1–2 trips to places I\'ve never been',
  },
  {
    icon: '🍞',
    category: 'Personal',
    text: 'Learn how to bake sourdough bread from scratch',
  },
  {
    icon: '💧',
    category: 'Health',
    text: 'Hit 2–3 liters of water every day, consistently',
  },
];

const Goals = () => {
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
    <section id="goals" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <h2 className="section-title">What's Next</h2>
          <hr className="section-divider" />
          <p className="section-subtitle">Things I'm working toward — personal, professional, and everything in between.</p>

          <div className="goals-grid">
            {goals.map(({ icon, category, text }, i) => (
              <div
                key={i}
                className={`goal-card fade-in fade-in-delay-${Math.min(i + 1, 5)}`}
              >
                <span className="goal-icon" aria-hidden="true">{icon}</span>
                <div className="goal-content">
                  <span className="goal-category">{category}</span>
                  <p className="goal-text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
