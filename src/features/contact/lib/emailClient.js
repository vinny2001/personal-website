import { send } from '@emailjs/browser';

const SIMULATED_DELAY_MS = 900;

const getConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

const isConfigured = ({ serviceId, templateId, publicKey }) =>
  Boolean(serviceId && templateId && publicKey);

/**
 * Sends the contact form through EmailJS (browser SDK, no backend).
 * With no VITE_EMAILJS_* keys: a dev build simulates success and logs the
 * params so the UI is testable; a production build rejects, which the form
 * renders as its error state.
 */
export const sendContactEmail = async (params) => {
  const config = getConfig();

  if (!isConfigured(config)) {
    if (import.meta.env.DEV) {
      console.info('[contact] EmailJS keys missing, simulating a successful send.', params);
      await new Promise((resolve) => {
        setTimeout(resolve, SIMULATED_DELAY_MS);
      });
      return { simulated: true };
    }
    throw new Error('Contact form is not configured (missing VITE_EMAILJS_* env vars).');
  }

  return send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
};
