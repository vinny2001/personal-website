import site from 'config/site';
import contact from 'content/contact';

const SOURCE = 'vincenzodaria.com contact form';
const SUBJECT_MAX = 70;
const SUBJECT_FALLBACK_WORDS = 8;

const categoryLabel = (id) => contact.categories.find((c) => c.id === id)?.label ?? 'General';

const clip = (text, max) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

/** The subject, or the first few words of the message when none was given. */
const subjectText = ({ subject, message }) => {
  const given = subject?.trim();
  if (given) return clip(given, SUBJECT_MAX);
  const words = message.trim().split(/\s+/).slice(0, SUBJECT_FALLBACK_WORDS).join(' ');
  return clip(words, SUBJECT_MAX);
};

const humanDate = (now) =>
  `${new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(now)} UTC`;

/**
 * Pure mapping from the form's values to the EmailJS template params.
 * `now` and `pageUrl` are injected so the output is deterministic in tests.
 */
export const buildEmailParams = (form, now = new Date(), pageUrl = site.url) => {
  const category = categoryLabel(form.category);
  return {
    subject_line: `[vincenzodaria.com · ${category}] ${subjectText(form)}`,
    category,
    from_name: form.name.trim(),
    reply_to: form.email.trim(),
    subject: form.subject?.trim() ?? '',
    message: form.message.trim(),
    sent_at: humanDate(now),
    sent_at_iso: now.toISOString(),
    source: SOURCE,
    page_url: pageUrl,
  };
};

export default buildEmailParams;
