import Hero from '../components/hero/Hero';
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Experience from '../components/experience/Experience';
import Goals from '../components/goals/Goals';
import BlogPreview from '../components/blogPreview/BlogPreview';
import ScrollNav from '../components/scrollNav/ScrollNav';

const Home = () => (
  <>
    <ScrollNav />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Goals />
    <BlogPreview />
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Vincenzo D'Aria. All rights reserved.</p>
    </footer>
  </>
);

export default Home;
