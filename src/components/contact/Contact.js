import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

const contactLinks = [
  {
    icon: faEnvelope,
    label: 'Email',
    value: 'vincenzo.daria01@gmail.com',
    href: 'mailto:vincenzo.daria01@gmail.com',
  },
  {
    icon: faLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vincenzodaria',
    href: 'https://www.linkedin.com/in/vincenzodaria',
  },
  {
    icon: faGithub,
    label: 'GitHub',
    value: 'github.com/vinny2001',
    href: 'https://github.com/vinny2001',
  },
];

const Contact = () => {
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
    <section id="contact" className="section section-alt">
      <div className="container">
        <div ref={ref} className="fade-in contact-wrapper">
          <h2 className="section-title">Get in Touch</h2>
          <hr className="section-divider" />
          <p className="contact-intro">
            I'm always open to interesting conversations — whether that's about a project,
            a research idea, or just to connect. The best way to reach me is via email
            or LinkedIn.
          </p>
          <div className="contact-links">
            {contactLinks.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="contact-link fade-in"
              >
                <span className="contact-link-icon">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <div className="contact-link-text">
                  <span className="contact-link-label">{label}</span>
                  <span className="contact-link-value">{value}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="contact-copyright">
            &copy; {new Date().getFullYear()} Vincenzo D'Aria. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
