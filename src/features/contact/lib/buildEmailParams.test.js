import { buildEmailParams } from './buildEmailParams';

const NOW = new Date('2026-11-27T14:03:00.000Z');
const base = {
  name: '  Ada Lovelace ',
  email: ' ada@example.com ',
  category: 'recruiter',
  subject: '',
  message: 'Hello Vincenzo, we are building something in insurtech and would love to chat.',
};

describe('buildEmailParams', () => {
  test('maps the form to the EmailJS template params', () => {
    expect(
      buildEmailParams({ ...base, subject: 'Staff role' }, NOW, 'https://x.test/#/contact')
    ).toEqual({
      subject_line: '[vincenzodaria.com · Recruiter] Staff role',
      category: 'Recruiter',
      from_name: 'Ada Lovelace',
      reply_to: 'ada@example.com',
      subject: 'Staff role',
      message: base.message,
      sent_at: 'Friday, November 27, 2026 at 2:03 PM UTC',
      sent_at_iso: '2026-11-27T14:03:00.000Z',
      source: 'vincenzodaria.com contact form',
      page_url: 'https://x.test/#/contact',
    });
  });

  test('falls back to the first words of the message when there is no subject', () => {
    const { subject_line } = buildEmailParams(base, NOW);
    expect(subject_line).toBe(
      '[vincenzodaria.com · Recruiter] Hello Vincenzo, we are building something in insurtech'
    );
  });

  test('clips very long subjects', () => {
    const { subject_line } = buildEmailParams({ ...base, subject: 'a'.repeat(200) }, NOW);
    expect(subject_line.endsWith('…')).toBe(true);
    expect(subject_line.length).toBeLessThan(120);
  });

  test('uses the category label, and "General" for an unknown id', () => {
    expect(buildEmailParams({ ...base, category: 'speaking' }, NOW).category).toBe(
      'Speaking / event'
    );
    expect(buildEmailParams({ ...base, category: 'nope' }, NOW).subject_line).toMatch(
      /^\[vincenzodaria\.com · General\]/
    );
  });

  test('preserves line breaks in the message', () => {
    const message = 'Line one of my note.\n\nLine two, after a gap.';
    expect(buildEmailParams({ ...base, message }, NOW).message).toBe(message);
  });
});
