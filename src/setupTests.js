// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver, which the scroll-reveal
// hook (useFadeIn) and ScrollNav rely on. Provide a no-op stub for tests.
class IntersectionObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

global.IntersectionObserver = global.IntersectionObserver || IntersectionObserverStub;
window.IntersectionObserver = window.IntersectionObserver || IntersectionObserverStub;
