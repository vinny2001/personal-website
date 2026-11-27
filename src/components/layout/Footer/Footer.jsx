import Container from 'components/layout/Container';
import SocialLinks from 'components/ui/SocialLinks';
import site from 'config/site';

/** Slim site-wide footer: fine print + socials. The full sign-off lives on /contact. */
const Footer = () => (
  <footer className="mt-24 border-t sm:mt-32">
    <Container className="flex flex-col-reverse gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[0.7rem] text-ink-muted">
        &copy; {new Date().getFullYear()} {site.name}
      </p>
      <SocialLinks className="-ml-2.5 sm:-mr-2.5 sm:ml-0" linkClassName="p-2.5" />
    </Container>
  </footer>
);

export default Footer;
