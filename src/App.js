import './App.css';
import Body from './components/body/body';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { Routes, Route, HashRouter } from 'react-router-dom';


function App() {
  return (
  
      <div className="App">
        <Navbar />

        <HashRouter basename="/">
          <Routes>
              <Route path="/" element={<Body />}/>
          </Routes>
        </HashRouter>
           
      </div>
  );
}

export default App;
