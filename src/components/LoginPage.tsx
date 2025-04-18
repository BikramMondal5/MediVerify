import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking localStorage
    const loggedInEmail = localStorage.getItem("userEmail");
    if (loggedInEmail) {
      // If user is already logged in, redirect to dashboard
      navigate("/dashboard");
    }

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("⚠️ Please fill in both email and password.");
      return;
    }

    // Get all saved emails from localStorage
    const savedEmails = JSON.parse(localStorage.getItem("users") || "[]");
    
    const user = savedEmails.find((user: { email: string, password: string }) => user.email === email && user.password === password);

    if (user) {
      // If email and password match, set userEmail in localStorage and navigate to dashboard
      localStorage.setItem("userEmail", email);
      setErrorMessage("");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      // If credentials are invalid, show error message and "Sign Up" button
      setErrorMessage("⚠️ Invalid email or password.");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      {/* Navbar */}
      <div className={`flex justify-between items-center px-6 py-4 shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>MediVerify</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Login Section */}
      <section className="flex justify-center items-center h-screen px-6 py-20 relative">
        <img
          src="https://source.unsplash.com/1600x900/?medicine,health"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-md w-full p-6 rounded-xl shadow-lg z-10 ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Login to MediVerify
          </h2>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center mb-4"
            >
              {errorMessage}
            </motion.div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-lg ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-900"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className={`block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full p-3 border rounded-lg ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-900"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >
              Login
            </button>
          </form>

          {/* Show the SignUp Button if login fails */}
          {errorMessage && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSignUpRedirect}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                Create a new account
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-10 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        Made with ❤️ for patient safety • © 2025 MediVerify
      </footer>
    </div>
  );
}
