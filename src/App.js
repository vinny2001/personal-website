import './App.css';
import Body from './components/body/body';
import Navbar from './components/navbar/navbar';

import LibertyStreams from './components/liberty streams/libertyStreams';
import { Routes, Route, HashRouter } from 'react-router-dom';


function App() {
  return (
  
      <div className="App">
        <Navbar />

        <HashRouter basename="/">
          <Routes>
              <Route path="/" element={<Body />}/>
              <Route path="/liberty-streams" element={<LibertyStreams/>}/>
          </Routes>
        </HashRouter>
           
      </div>
  );
}

export default App;
