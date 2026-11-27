import { CircleAlert } from 'lucide-react';

/** Hairline-underline control shared by the text inputs and the textarea. */
export const CONTROL_CLASS =
  'block w-full rounded-none border-0 border-b border-ink-muted bg-transparent px-0 py-2.5 text-lg text-ink transition-colors placeholder:text-ink-muted focus-visible:border-accent focus-visible:shadow-[0_1px_0_0_var(--accent)] focus-visible:outline-none aria-[invalid=true]:border-ink aria-[invalid=true]:shadow-[0_1px_0_0_var(--ink)]';

/** Inline validation message, wired to its control through `aria-describedby`. */
export const FieldError = ({ id, children }) => (
  <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-ink">
    <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
    <span>{children}</span>
  </p>
);

/**
 * Label (mono kicker) + control + optional hint/error. `children` is a render
 * function receiving the props the control needs for accessibility, so the
 * same wrapper serves <input> and <textarea>.
 */
const Field = ({ id, label, hint, error, footer, children }) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="kicker flex items-baseline justify-between gap-4">
        <span>{label}</span>
        {hint && (
          <span id={hintId} className="normal-case tracking-normal">
            {hint}
          </span>
        )}
      </label>
      {children({
        id,
        className: CONTROL_CLASS,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
      })}
      {error && <FieldError id={errorId}>{error}</FieldError>}
      {footer}
    </div>
  );
};

export default Field;
