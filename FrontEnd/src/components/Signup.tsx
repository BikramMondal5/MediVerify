import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: { email: string }) => u.email === email);

    if (existingUser) {
      setErrorMessage("⚠️ Email already registered. Please log in.");
    } else {
      const newUser = { name, email, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name); 
      navigate("/dashboard");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <div className={`flex justify-between items-center px-6 py-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-xl font-bold">MediVerify</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full transition hover:scale-105">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-72px-80px)]">
        <div
          className={`flex flex-col justify-center items-center px-10 relative 
            ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-blue-100 to-white"}`}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className={`text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent 
                ${
                  darkMode
                    ? "bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
                }`}
            >
              Join the Fight Against Fakes
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg tracking-wide font-light max-w-md mx-auto"
            >
              Become a part of a global network ensuring the authenticity of medicines and promoting trust in healthcare.
            </motion.p>
          </motion.div>

          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40 z-0"
            style={{ backgroundImage: `url(/Signup.webp)`}}>
          </div>
        </div>

        <div className="flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`shadow-xl rounded-2xl p-8 w-full max-w-sm 
              ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">Sign up for an account</h3>
            <form onSubmit={handleLogin}>
              <label className="block text-sm mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage("");
                }}
                required
                className={`w-full mb-4 px-4 py-2 rounded border text-sm 
                  ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
              />

              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
                required
                className={`w-full mb-4 px-4 py-2 rounded border text-sm 
                  ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
              />

              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                required
                className={`w-full mb-4 px-4 py-2 rounded border text-sm 
                  ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm transition"
              >
                Sign up now
              </button>
            </form>

            {errorMessage && <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>}

            <p className="text-xs mt-6 text-center">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      <footer className={`px-6 py-8 text-center text-sm border-t ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
        MediVerify • Powered by Trust • © 2025
      </footer>
    </div>
  );
}
