import { AnimatePresence } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTransition from 'components/motion/PageTransition';
import AboutPage from 'features/about/routes/AboutPage';
import BlogListPage from 'features/blog/routes/BlogListPage';
import BlogPostPage from 'features/blog/routes/BlogPostPage';
import ContactPage from 'features/contact/routes/ContactPage';
import GoalsPage from 'features/goals/routes/GoalsPage';
import HomePage from 'features/home/routes/HomePage';
import WorkPage from 'features/work/routes/WorkPage';

import NotFoundPage from './NotFoundPage';

/** Route table. Top-level paths mirror `navLinks` in config/navigation. */
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/work', element: <WorkPage /> },
  { path: '/goals', element: <GoalsPage /> },
  { path: '/blog', element: <BlogListPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '*', element: <NotFoundPage /> },
];

// Jump to the top between the old page leaving and the new one entering.
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

export default AppRoutes;
