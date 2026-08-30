import Footer from 'components/layout/Footer/Footer';
import ScrollNav from 'components/navigation/ScrollNav/ScrollNav';
import BlogPreview from 'features/blog/components/BlogPreview';
import GoalsBoard from 'features/goals/components/GoalsBoard';

import About from './components/About';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Skills from './components/Skills';

const Home = () => (
  <>
    <ScrollNav />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <GoalsBoard />
    <BlogPreview />
    <Footer />
  </>
);

export default Home;
