import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { heroPhrases, heroSocials } from 'content/hero';
import useFadeIn from 'hooks/useFadeIn';

import './Hero.css';

const TYPE_SPEED = 45;
const DELETE_SPEED = 28;
const PAUSE_AFTER = 1800;

const Hero = () => {
  const heroRef = useFadeIn({ immediate: true, delay: 80 });
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

  // Hide chevron once user scrolls more than 20% of the viewport height
  useEffect(() => {
    const handleScroll = () => setScrolledAway(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter loop
  useEffect(() => {
    const current = heroPhrases[phraseIdx];

    if (paused) {
      const t = setTimeout(() => {
        setPaused(false);
        setDeleting(true);
      }, PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (!deleting && text === current) {
      setPaused(true);
      return undefined;
    }

    if (deleting && text === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % heroPhrases.length);
      return undefined;
    }

    const speed = deleting ? DELETE_SPEED : TYPE_SPEED;
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
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
            <span className="typewriter-cursor" aria-hidden="true">
              |
            </span>
          </p>
          <p className="hero-bio">
            I got my start customizing Android kernels in middle school, where code was a creative
            outlet long before it was a career. These days I build cloud-native systems for a living
            &mdash; and spend my off-hours hiking, learning guitar, and planning my next adventure.
          </p>
          <div className="hero-socials">
            {heroSocials.map(({ icon, href, label }) => (
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
        </div>
      </div>
      <div className={`scroll-indicator${scrolledAway ? ' hidden' : ''}`} aria-hidden="true">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </section>
  );
};

export default Hero;
