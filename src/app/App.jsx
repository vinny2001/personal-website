import { MotionConfig } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';

import Footer from 'components/layout/Footer/Footer';
import Navbar from 'components/layout/Navbar/Navbar';
import SkipLink from 'components/layout/SkipLink';

import AppRoutes from './AppRoutes';

/** App shell. `reducedMotion="user"` tones every animation down per the OS setting. */
const App = () => (
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <SkipLink />
        <Navbar />
        <AppRoutes />
        <Footer />
      </HashRouter>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
