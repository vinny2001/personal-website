import { useId } from 'react';

import { motion } from 'motion/react';

import { DURATION, EASE_OUT } from 'components/motion/presets';

const GLIDE = { duration: DURATION.base, ease: EASE_OUT };

/**
 * Status filter: a row of toggle buttons (`aria-pressed`) with a count each.
 * The ink underline glides between the active options (shared `layoutId`).
 * `options` = [{ id, label }], `counts` = { [id]: number } (an option with no
 * count, like the scratchpad, shows none).
 */
const GoalFilter = ({ options, counts, value, onChange, label }) => {
  const indicatorId = useId();

  return (
    <div role="group" aria-label={label} className="-ml-2.5 flex flex-wrap">
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`relative inline-flex min-h-11 items-center gap-2 px-2.5 text-sm font-medium transition-colors duration-200 ${
              active ? 'text-ink' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {option.label}
            {counts[option.id] !== undefined && (
              <span className="font-mono text-xs text-ink-muted">{counts[option.id]}</span>
            )}
            {active && (
              <motion.span
                layoutId={indicatorId}
                aria-hidden="true"
                transition={GLIDE}
                className="absolute inset-x-2.5 -bottom-px h-0.5 bg-ink"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GoalFilter;
