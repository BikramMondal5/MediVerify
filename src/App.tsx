import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage'; 
import Signup from './components/Signup'; 

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </div>
  );
};

export default App;
