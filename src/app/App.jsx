import { Routes, Route, HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from 'components/layout/Navbar/Navbar';
import BlogListPage from 'features/blog/routes/BlogListPage';
import BlogPostPage from 'features/blog/routes/BlogPostPage';
import Home from 'features/home/Home';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <HashRouter basename="/">
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </div>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
