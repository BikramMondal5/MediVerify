import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage'; // Ensure you're importing LoginPage correctly
import Signup from './components/Signup'; // Ensure you're importing LoginPage correctly

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> {/* HomePage Route */}
        <Route path="/login" element={<LoginPage />} /> {/* LoginPage Route */}
        <Route path="/signup" element={<Signup />} /> {/* LoginPage Route */}
      </Routes>
    </div>
  );
};

export default App;
