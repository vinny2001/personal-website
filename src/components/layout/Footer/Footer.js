import site from 'config/site';

import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <p>
      &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
    </p>
  </footer>
);

export default Footer;
