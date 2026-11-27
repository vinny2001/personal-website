import { useReducedMotion } from 'motion/react';

import Container from 'components/layout/Container';
import { RevealGroup, RevealItem } from 'components/motion/Reveal';
import SocialLinks from 'components/ui/SocialLinks';
import site from 'config/site';
import { heroBio, heroGreeting, heroPhrases } from 'content/hero';

import useTypewriter from '../hooks/useTypewriter';

import './Hero.css';

// "Vincenzo D'Aria" → ["Vincenzo", "D'Aria"]: the surname is set in italic.
const splitName = (name) => {
  const cut = name.lastIndexOf(' ');
  return cut === -1 ? [name, ''] : [name.slice(0, cut), name.slice(cut + 1)];
};

// Solid while typing; blinks while waiting; a few last blinks once settled.
const CURSOR_BLINK = { start: 'loop', holding: 'loop', done: 'settle' };

/**
 * Homepage masthead: greeting, the page's <h1> (the name, set huge), a
 * typewriter line, the intro, and socials. Fills the first screen.
 * The typewriter is decorative — assistive tech reads every phrase at once.
 */
const Hero = () => {
  const reduceMotion = useReducedMotion();
  // Rotates endlessly; with reduced motion it swaps whole phrases once, then rests.
  const { text, phase } = useTypewriter(heroPhrases, {
    rounds: reduceMotion ? 1 : Infinity,
    instant: Boolean(reduceMotion),
  });
  const [first, last] = splitName(site.name);

  return (
    <Container
      as="header"
      className="flex min-h-[calc(100svh_-_var(--nav-height))] flex-col justify-center pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      <RevealGroup immediate stagger={0.09}>
        <RevealItem
          as="p"
          className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none text-ink-soft"
        >
          {heroGreeting}
        </RevealItem>

        {/* Sized by width AND height so the whole hero fits a laptop-height screen. */}
        <h1 className="mt-4 font-display text-[length:clamp(4.5rem,min(26vw,21svh),14rem)] font-normal leading-[0.88] tracking-[-0.03em] text-ink">
          <RevealItem as="span" className="block">
            {first}
          </RevealItem>{' '}
          {last && (
            <RevealItem as="span" className="block sm:pl-[1em]">
              <span className="pr-[0.04em] italic">{last}</span>
              <span aria-hidden="true" className="text-accent">
                .
              </span>
            </RevealItem>
          )}
        </h1>

        <RevealItem className="mt-10 grid gap-7 border-t pt-7 sm:mt-14 lg:grid-cols-12 lg:gap-x-8">
          {/* Scaled so the longest phrase stays on one line from 320px up (no layout shift). */}
          <p className="min-h-[1.5em] font-mono text-[length:clamp(0.8rem,3.9vw,0.95rem)] leading-normal text-ink sm:text-lg lg:col-span-5">
            <span className="sr-only">{heroPhrases.join(', ')}</span>
            <span aria-hidden="true">
              {text}
              <span
                className="hero__cursor"
                data-blink={reduceMotion ? undefined : CURSOR_BLINK[phase]}
              />
            </span>
          </p>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-reading text-lg leading-relaxed text-ink-soft">{heroBio}</p>
            <SocialLinks
              className="-ml-3 mt-6 gap-1"
              linkClassName="size-11 justify-center text-lg"
            />
          </div>
        </RevealItem>
      </RevealGroup>
    </Container>
  );
};

export default Hero;
