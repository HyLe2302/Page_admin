import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Components/NavigationTemplate/Navigation';
import Main from './Main/Main';
import Discover from './Components/AddDiscover/Discover'; 
import Test from './Components/Test/Test'; 
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;