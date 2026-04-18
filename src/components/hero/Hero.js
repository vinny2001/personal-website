import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faAws } from '@fortawesome/free-brands-svg-icons';
import './Hero.css';

const PHRASES = [
  'Full-Stack Engineer',
  'Cloud & Data Systems Builder',
  'AWS Certified Cloud Practitioner',
];
const TYPE_SPEED   = 45;
const DELETE_SPEED = 28;
const PAUSE_AFTER  = 1800;

const socials = [
  { icon: faLinkedin, href: 'https://www.linkedin.com/in/vincenzodaria', label: 'LinkedIn' },
  { icon: faGithub,   href: 'https://github.com/vinny2001',              label: 'GitHub' },
  { icon: faAws,      href: 'https://www.credly.com/users/vincenzo-daria', label: 'AWS Credentials' },
  { icon: faEnvelope, href: 'mailto:vincenzo.daria01@gmail.com',           label: 'Email' },
];

const Hero = () => {
  const heroRef = useRef(null);
  const [text, setText]           = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [paused, setPaused]       = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('visible'), 80);
    return () => clearTimeout(t);
  }, []);

  // Typewriter loop
  useEffect(() => {
    const current = PHRASES[phraseIdx];

    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (!deleting && text === current) {
      setPaused(true);
      return;
    }

    if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return;
    }

    const speed = deleting ? DELETE_SPEED : TYPE_SPEED;
    const t = setTimeout(() => {
      setText(deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, paused, phraseIdx]);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div ref={heroRef} className="hero-content fade-in">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Vincenzo D'Aria</h1>
          <p className="hero-tagline" aria-live="polite">
            <span className="typewriter-text">{text}</span>
            <span className="typewriter-cursor" aria-hidden="true">|</span>
          </p>
          <p className="hero-bio">
            I got my start customizing Android kernels in middle school, where code was a
            creative outlet long before it was a career. These days I build cloud-native
            systems for a living &mdash; and spend my off-hours hiking, learning guitar,
            and planning my next adventure.
          </p>
          <div className="hero-socials">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hero-social-link"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
          <div className="hero-cta">
            <a href="#about" className="btn-primary">Learn more</a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
