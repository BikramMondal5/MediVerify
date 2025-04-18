import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("signedUpEmail", email);

    navigate("/dashboard");
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <div className={`flex justify-between items-center px-6 py-4 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-xl font-bold">MediVerify</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <section className="flex justify-center items-center h-screen px-6 py-20 relative">
        <img
          src="https://source.unsplash.com/1600x900/?signup,health"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`max-w-md w-full p-6 rounded-xl shadow-lg z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className={`w-full p-3 border rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                className={`w-full p-3 border rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </section>

      <footer className={`px-6 py-8 text-center text-sm border-t ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
        MediVerify • Empowering Users • © 2025
      </footer>
    </div>
  );
}
