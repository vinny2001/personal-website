import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sendContactEmail } from '../lib/emailClient';

import ContactForm from './ContactForm';

vi.mock('../lib/emailClient', () => ({ sendContactEmail: vi.fn() }));

const MESSAGE = 'I would love to talk about a forward-deployed role with your team.';

const fillValid = () => {
  userEvent.type(screen.getByLabelText(/your name/i), 'Ada Lovelace');
  userEvent.type(screen.getByLabelText(/your email/i), 'ada@example.com');
  userEvent.click(screen.getByRole('radio', { name: 'Recruiter' }));
  userEvent.type(screen.getByLabelText(/^message/i), MESSAGE);
};

const submit = () => userEvent.click(screen.getByRole('button', { name: /send message/i }));

beforeEach(() => {
  sendContactEmail.mockReset();
  sendContactEmail.mockResolvedValue({ status: 200 });
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

test('shows accessible validation errors and focuses the summary on a bad submit', () => {
  render(<ContactForm minFillMs={0} />);
  submit();

  const summary = screen.getByText(/a few things need another look/i).closest('div');
  expect(summary).toHaveFocus();

  const email = screen.getByLabelText(/your email/i);
  expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(email).toHaveAccessibleDescription(/so I can reply/i);
  expect(screen.getByLabelText(/^message/i)).toHaveAttribute('aria-invalid', 'true');
  expect(sendContactEmail).not.toHaveBeenCalled();
});

test('rejects a malformed email address', () => {
  render(<ContactForm minFillMs={0} />);
  fillValid();
  userEvent.clear(screen.getByLabelText(/your email/i));
  userEvent.type(screen.getByLabelText(/your email/i), 'ada@example');
  submit();
  expect(screen.getByLabelText(/your email/i)).toHaveAttribute('aria-invalid', 'true');
  expect(sendContactEmail).not.toHaveBeenCalled();
});

test('category chips are a single-select radio group', () => {
  render(<ContactForm minFillMs={0} />);
  const group = screen.getByRole('group', { name: /what is this about/i });
  expect(group.tagName).toBe('FIELDSET');

  const recruiter = screen.getByRole('radio', { name: 'Recruiter' });
  const collab = screen.getByRole('radio', { name: 'Collaboration' });
  userEvent.click(recruiter);
  expect(recruiter).toBeChecked();
  userEvent.click(collab);
  expect(collab).toBeChecked();
  expect(recruiter).not.toBeChecked();
});

test('counts message characters', () => {
  render(<ContactForm minFillMs={0} />);
  userEvent.type(screen.getByLabelText(/^message/i), 'hello');
  expect(screen.getByText(/5 \/ 2000/)).toBeInTheDocument();
});

test('a filled honeypot shows success but never sends', async () => {
  const { container } = render(<ContactForm minFillMs={0} />);
  fillValid();
  userEvent.type(container.querySelector('input[name="website"]'), 'https://spam.example');
  submit();

  expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  expect(sendContactEmail).not.toHaveBeenCalled();
});

test('a too-fast submit is silently dropped', async () => {
  render(<ContactForm />);
  fillValid();
  submit();

  expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  expect(sendContactEmail).not.toHaveBeenCalled();
});

test('a valid submit sends the built params and shows the thank-you panel', async () => {
  render(<ContactForm minFillMs={0} />);
  fillValid();
  submit();

  expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  expect(sendContactEmail).toHaveBeenCalledTimes(1);
  expect(sendContactEmail).toHaveBeenCalledWith(
    expect.objectContaining({
      from_name: 'Ada Lovelace',
      reply_to: 'ada@example.com',
      category: 'Recruiter',
      message: MESSAGE,
      subject_line: expect.stringMatching(/^\[vincenzodaria\.com · Recruiter\] I would love/),
    })
  );

  userEvent.click(screen.getByRole('button', { name: /send another/i }));
  expect(await screen.findByRole('button', { name: /send message/i })).toBeInTheDocument();
});

test('a failed send shows a friendly error with a LinkedIn fallback and keeps the text', async () => {
  sendContactEmail.mockRejectedValue(new Error('boom'));
  render(<ContactForm minFillMs={0} />);
  fillValid();
  submit();

  expect(await screen.findByRole('alert')).toHaveTextContent(/didn't go through/i);
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    expect.stringContaining('linkedin.com')
  );
  await waitFor(() => expect(screen.getByLabelText(/^message/i)).toHaveValue(MESSAGE));
  expect(screen.getByRole('button', { name: /try again/i })).toBeEnabled();
});
