import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Camera, ScanLine, CheckCircle, Sun, Moon } from "lucide-react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <motion.div
        className={`flex justify-between items-center px-6 py-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>MediVerify</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <motion.button 
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button 
            onClick={handleSignupClick}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </div>
      </motion.div>

      <section className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-20 py-20 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Is Your <span className="text-blue-600">Medication</span> Genuine?
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Verify authenticity instantly using AI image analysis & blockchain verification.
          </p>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Verify Now
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <img src="/mockup_scan_demo.png" alt="Scan Medication Demo" className="w-full max-w-sm" />
        </motion.div>
      </section>

      <motion.section
        className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-8 px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>1 in 10</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>medications are fake worldwide</p>
        </div>
        <div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>Blockchain</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>secured medication history</p>
        </div>
        <div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>10 sec</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI verification process</p>
        </div>
      </motion.section>

      <motion.section
        className="px-6 lg:px-20 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-10`}>How It Works</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`p-6 border rounded-xl text-center ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <Camera className={`mx-auto mb-4 ${darkMode ? 'text-blue-600' : 'text-blue-500'}`} size={36} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Step 1: Snap a Photo</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Capture the medication using your phone or webcam.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`p-6 border rounded-xl text-center ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <ScanLine className={`mx-auto mb-4 ${darkMode ? 'text-blue-600' : 'text-blue-500'}`} size={36} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Step 2: Analyze with AI</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI detects packaging authenticity patterns.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`p-6 border rounded-xl text-center ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <ShieldCheck className={`mx-auto mb-4 ${darkMode ? 'text-blue-600' : 'text-blue-500'}`} size={36} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Step 3: Verify on Blockchain</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Supply chain data confirms source and authenticity.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`p-6 border rounded-xl text-center ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <CheckCircle className={`mx-auto mb-4 ${darkMode ? 'text-green-600' : 'text-green-500'}`} size={36} />
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Step 4: Get Your Result</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instant result: Verified ✅ or Suspicious ⚠️</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="px-6 lg:px-20 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Why are you still here?</h3>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Start using MediVerify to ensure the authenticity of your medication.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button 
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button 
            onClick={handleSignupClick}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
