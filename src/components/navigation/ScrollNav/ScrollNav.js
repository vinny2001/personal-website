import { useEffect, useState } from 'react';

import { sections } from 'config/navigation';

import './ScrollNav.css';

const ScrollNav = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observers = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="scroll-nav" aria-label="Section navigation">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`scroll-nav-dot${active === id ? ' active' : ''}`}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
        >
          <span className="scroll-nav-tooltip">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default ScrollNav;
