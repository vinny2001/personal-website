import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in">
          <h2 className="section-title">About Me</h2>
          <hr className="section-divider" />
          <div className="about-grid">
            <div className="about-text">
              <p>
                I got into tech as a middle-schooler, tinkering with Android kernel development
                and custom UI mods — not for any class, just out of genuine curiosity. Code was
                a creative medium before it was ever a career, and that spirit of building things
                for the love of it has stayed with me. It eventually grew into a B.S. in Computer
                Science and a professional path that's taken me from data engineering at Yale to
                full-stack cloud development at Travelers.
              </p>
              <p>
                Outside of work, I'm usually out on a trail — my next big goal is summiting
                Mt. Washington. I'm also slowly teaching myself acoustic guitar, with a soft
                spot for alternative rock and country. I love to travel, with plans to explore
                more of the U.S. before eventually heading to Europe to dig into my European
                roots. I run on good coffee and good conversation, and I consider connecting
                with new people one of life's better features.
              </p>
              <p>
                I hold a B.S. from Central Connecticut State University, where I also
                contributed to published research on neural network-guided nanobots for
                cancer remediation — a project that cemented my interest in the intersection
                of AI and real-world impact.
              </p>
            </div>
            <div className="about-facts">
              <div className="fact-card fade-in fade-in-delay-1">
                <span className="fact-number">4+</span>
                <span className="fact-label">Years of experience</span>
              </div>
              <div className="fact-card fade-in fade-in-delay-2">
                <span className="fact-number">AWS</span>
                <span className="fact-label">Cloud Practitioner Certified</span>
              </div>
              <div className="fact-card fade-in fade-in-delay-3">
                <span className="fact-number">B.S.</span>
                <span className="fact-label">CCSU, Computer Science</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
