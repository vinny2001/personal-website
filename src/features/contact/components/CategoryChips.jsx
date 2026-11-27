import { FieldError } from './Field';

/**
 * Single-select pills built on real radio inputs (visually hidden), so arrow
 * keys, Tab and screen-reader semantics come for free. The checked state is
 * styled off the input with Tailwind's `peer-*` variants.
 */
const CategoryChips = ({ id, legend, categories, value, onChange, error }) => {
  const errorId = `${id}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="kicker mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {categories.map(({ id: key, label, icon: Icon }, index) => (
          <label key={key} className="cursor-pointer">
            <input
              type="radio"
              name={`${id}-category`}
              id={index === 0 ? `${id}-first` : undefined}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink-muted px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              <Icon aria-hidden="true" strokeWidth={1.75} className="size-4" />
              {label}
            </span>
          </label>
        ))}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
};

export default CategoryChips;
