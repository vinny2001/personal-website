export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;
export const SUBJECT_MAX = 120;
/** Anything faster than this after the form mounts is treated as a bot. */
export const MIN_FILL_MS = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns `{ field: message }` for every invalid field (empty object = valid). */
export const validateContact = (form) => {
  const errors = {};
  const email = form.email.trim();
  const length = form.message.trim().length;

  if (form.name.trim().length < 2) errors.name = 'Please tell me your name.';

  if (!email) errors.email = 'Please add an email so I can reply.';
  else if (!EMAIL_RE.test(email)) errors.email = 'That email address looks incomplete.';

  if (!form.category) errors.category = 'Pick the option that fits best.';

  if (form.subject.length > SUBJECT_MAX)
    errors.subject = `Keep the subject under ${SUBJECT_MAX} characters.`;

  if (length < MESSAGE_MIN)
    errors.message = `A little more, please: at least ${MESSAGE_MIN} characters (${length} so far).`;
  else if (length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
};

/** Cheap bot checks: a filled honeypot, or a submit faster than a human could type. */
export const looksLikeSpam = ({ honeypot, elapsedMs, minFillMs = MIN_FILL_MS }) =>
  Boolean(honeypot) || elapsedMs < minFillMs;
