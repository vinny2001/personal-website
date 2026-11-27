/**
 * Keyboard "skip to content" link, visible only when focused. Focuses <main>
 * directly rather than following `#main` (HashRouter would treat that as a route).
 */
const SkipLink = () => (
  <a
    href="#main"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById('main')?.focus();
    }}
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
  >
    Skip to content
  </a>
);

export default SkipLink;
