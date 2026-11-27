import { useEffect, useRef } from 'react';

import { Check } from 'lucide-react';

import contact from 'content/contact';

/** Thank-you panel. Takes focus on mount so screen readers announce the swap. */
const ContactSuccess = ({ onReset }) => {
  const headingRef = useRef(null);
  const { success } = contact;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" className="hatched border border-dashed px-6 py-10 sm:px-10 sm:py-14">
      <p className="kicker flex items-center gap-2 text-accent">
        <Check aria-hidden="true" strokeWidth={2} className="size-4" />
        {success.kicker}
      </p>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 font-display text-5xl font-normal leading-none tracking-tight text-ink focus:outline-none sm:text-6xl"
      >
        {success.title}
      </h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{success.body}</p>
      <button
        type="button"
        onClick={onReset}
        className="link-draw mt-8 inline-flex min-h-10 items-center text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        {success.again}
      </button>
    </div>
  );
};

export default ContactSuccess;
