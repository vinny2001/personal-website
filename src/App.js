import './App.css';
import Body from './components/body/body';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Research from './components/research/research';
import { Routes, Route, HashRouter } from 'react-router-dom';


function App() {
  return (
  
      <div className="App">
        <Navbar />

        <HashRouter basename="/">
          <Routes>
              <Route path="/" element={<Body />}/>
              <Route path="/research" element={<Research/>}/>
          </Routes>
        </HashRouter>

        <Footer />     
      </div>
  );
}

export default App;
