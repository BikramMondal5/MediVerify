import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage'; 
import Signup from './components/Signup'; 
import Dashboard from './components/Dashboard';
import Verify from './components/Verify';
import UserHistory from './components/UserHistory';
import Blog from './components/Blog';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/verify" element={<Verify />} /> 
        <Route path="/history" element={<UserHistory />} /> 
        <Route path="/blog" element={<Blog />} /> 
      </Routes>
    </div>
  );
};

export default App;
