import { useEffect, useId, useRef, useState } from 'react';

import { LoaderCircle, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { DURATION, EASE_OUT } from 'components/motion/presets';
import ArrowLink from 'components/ui/ArrowLink';
import contact from 'content/contact';
import socials from 'content/socials';

import { buildEmailParams } from '../lib/buildEmailParams';
import { sendContactEmail } from '../lib/emailClient';
import {
  looksLikeSpam,
  MESSAGE_MAX,
  MESSAGE_MIN,
  MIN_FILL_MS,
  SUBJECT_MAX,
  validateContact,
} from '../lib/validate';

import CategoryChips from './CategoryChips';
import ContactSuccess from './ContactSuccess';
import Field from './Field';

const EMPTY = { name: '', email: '', category: '', subject: '', message: '', website: '' };
const linkedIn = socials.find((s) => s.label === 'LinkedIn');

/**
 * The contact form. Validation is live per field once touched (or after the
 * first submit), failed submits focus an error summary, and a honeypot plus a
 * minimum fill time quietly discard bots (they get the success screen, so
 * there's nothing to probe). `minFillMs` exists so tests can opt out.
 */
const ContactForm = ({ minFillMs = MIN_FILL_MS }) => {
  const id = useId();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const startedAt = useRef(null); // set on mount and on reset (impure, so not during render)
  const summaryRef = useRef(null);

  const errors = validateContact(form);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => submitted || touched[field])
  );
  const errorFields = Object.keys(visibleErrors);
  const sending = status === 'sending';

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);

  const set = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.value }));
  const touch = (field) => () => setTouched((t) => ({ ...t, [field]: true }));
  const fieldId = (field) => (field === 'category' ? `${id}-first` : `${id}-${field}`);

  const focusField = (field) => (event) => {
    event.preventDefault();
    document.getElementById(fieldId(field))?.focus();
  };

  const reset = () => {
    setForm(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus('idle');
    startedAt.current = Date.now();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }

    const elapsedMs = Date.now() - (startedAt.current ?? 0);
    if (looksLikeSpam({ honeypot: form.website, elapsedMs, minFillMs })) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      await sendContactEmail(buildEmailParams(form, new Date(), window.location.href));
      setStatus('success');
    } catch (error) {
      console.error('[contact] send failed', error);
      setStatus('error');
    }
  };

  const { form: copy } = contact;
  const messageLength = form.message.trim().length;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT }}
        >
          <ContactSuccess onReset={reset} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit}
          aria-label="Contact form"
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: DURATION.base, ease: EASE_OUT }}
          className="space-y-9"
        >
          {errorFields.length > 0 && submitted && (
            <div
              ref={summaryRef}
              tabIndex={-1}
              aria-labelledby={`${id}-summary`}
              className="border border-ink px-5 py-4 focus:outline-none focus-visible:outline-accent"
            >
              <p id={`${id}-summary`} className="kicker text-ink">
                {copy.errorSummary}
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {errorFields.map((field) => (
                  <li key={field}>
                    <a
                      href={`#${fieldId(field)}`}
                      onClick={focusField(field)}
                      className="link-draw text-ink"
                    >
                      {visibleErrors[field]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-9 sm:grid-cols-2">
            <Field id={`${id}-name`} label={copy.nameLabel} error={visibleErrors.name}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={set('name')}
                  onBlur={touch('name')}
                />
              )}
            </Field>
            <Field id={`${id}-email`} label={copy.emailLabel} error={visibleErrors.email}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  onBlur={touch('email')}
                />
              )}
            </Field>
          </div>

          <CategoryChips
            id={id}
            legend={copy.categoryLegend}
            categories={contact.categories}
            value={form.category}
            onChange={(category) => {
              setForm((f) => ({ ...f, category }));
              setTouched((t) => ({ ...t, category: true }));
            }}
            error={visibleErrors.category}
          />

          <Field
            id={`${id}-subject`}
            label={copy.subjectLabel}
            hint={copy.subjectHint}
            error={visibleErrors.subject}
          >
            {(a11y) => (
              <input
                {...a11y}
                type="text"
                name="subject"
                maxLength={SUBJECT_MAX + 20}
                value={form.subject}
                onChange={set('subject')}
                onBlur={touch('subject')}
              />
            )}
          </Field>

          <Field
            id={`${id}-message`}
            label={copy.messageLabel}
            error={visibleErrors.message}
            footer={
              <p className="mt-2 flex justify-between gap-4 font-mono text-xs text-ink-muted">
                <span>{copy.messageHint}</span>
                <span className="shrink-0 tabular-nums">
                  {messageLength} / {MESSAGE_MAX}
                  {messageLength < MESSAGE_MIN && ` (min ${MESSAGE_MIN})`}
                </span>
              </p>
            }
          >
            {(a11y) => (
              <textarea
                {...a11y}
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={set('message')}
                onBlur={touch('message')}
                className={`${a11y.className} resize-y leading-relaxed`}
              />
            )}
          </Field>

          {/* Honeypot: invisible and unreachable for people, tempting for bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={set('website')}
              />
            </label>
          </div>

          {status === 'error' && (
            <div role="alert" className="hatched border border-dashed px-5 py-5">
              <p className="font-display text-2xl text-ink">{contact.error.title}</p>
              <p className="mt-2 max-w-md text-ink-soft">{contact.error.body}</p>
              {linkedIn && (
                <ArrowLink href={linkedIn.href} className="mt-4 text-sm">
                  {contact.error.fallbackLabel}
                </ArrowLink>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            aria-busy={sending}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-ink"
          >
            {sending ? (
              <LoaderCircle aria-hidden="true" strokeWidth={1.75} className="size-4 animate-spin" />
            ) : (
              <Send
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            )}
            {sending ? copy.sendingLabel : status === 'error' ? copy.retryLabel : copy.submitLabel}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
