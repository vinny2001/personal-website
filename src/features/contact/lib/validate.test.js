import { looksLikeSpam, MESSAGE_MIN, validateContact } from './validate';

const valid = {
  name: 'Ada',
  email: 'ada@example.com',
  category: 'hello',
  subject: '',
  message: 'x'.repeat(MESSAGE_MIN),
};

describe('validateContact', () => {
  test('accepts a complete form (subject optional)', () => {
    expect(validateContact(valid)).toEqual({});
  });

  test('flags every missing or invalid field', () => {
    const errors = validateContact({
      ...valid,
      name: '',
      email: 'nope',
      category: '',
      message: 'hi',
    });
    expect(Object.keys(errors).sort()).toEqual(['category', 'email', 'message', 'name']);
  });

  test('rejects an incomplete email address', () => {
    expect(validateContact({ ...valid, email: 'ada@example' }).email).toBeDefined();
  });
});

describe('looksLikeSpam', () => {
  test('catches a filled honeypot or a too-fast submit', () => {
    expect(looksLikeSpam({ honeypot: 'http://spam', elapsedMs: 60_000 })).toBe(true);
    expect(looksLikeSpam({ honeypot: '', elapsedMs: 500 })).toBe(true);
    expect(looksLikeSpam({ honeypot: '', elapsedMs: 60_000 })).toBe(false);
  });
});
