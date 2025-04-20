import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Sun, Moon, LogOut, Home, FileText, Phone, Info, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const data = [
  { name: "Authentic", value: 85 },
  { name: "Counterfeit", value: 15 },
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <nav className={`flex justify-between items-center px-8 py-6 shadow-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"} transition-all duration-300`}>
        <div className="flex items-center gap-12 text-lg font-semibold">
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => navigate("/")}
          >
            <Home size={20} /> Home
          </span>
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => navigate("/history")}
          >
            <FileText size={20} /> History
          </span>
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => navigate("/verify")}
          >
            <Info size={20} /> Verify Medicines
          </span>
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => navigate("/blog")}
          >
            <FileText size={20} /> Blog
          </span>
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => document.getElementById("aboutUs")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Users size={20} /> About Us
          </span>
          <span
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition transform hover:scale-110"
            onClick={() => document.getElementById("contactUs")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Phone size={20} /> Contact Us
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition-all hover:scale-105"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-8"
      >
        <h1 className={`text-5xl select-none font-bold mb-6 ${darkMode ? "text-blue-700" : "text-cyan-800"}`}>
          {userName !== "Guest" ? `${displayName}, Welcome to ` : `Hello Guest, Welcome to `}
          <span
            className={`text-5xl font-extrabold ${darkMode ? "text-cyan-800" : "text-blue-700"}`}
            style={{ transition: "transform 0.5s ease-out" }}
          >
            MediVerify
          </span>
        </h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Ensuring your medication is safe and authentic — simply upload a photo or take a snapshot to begin verification.
        </motion.p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-6xl mx-auto px-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Why Verify Medicines?</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <img
          src="/Statistics.jpeg"
          alt="Medicine verification"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Problem of Fake Medicines</h3>
          <p className="text-lg leading-relaxed">
            According to WHO, up to 10% of medicines globally are counterfeit. Verifying medicine authenticity can save lives and reduce health risks significantly. MediVerify helps you make smarter, safer decisions instantly.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="aboutUs"
        ref={aboutRef}
        className={`py-16 px-8 text-center ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: aboutInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto">
          MediVerify was founded with the vision of creating a safer world where people can trust the medicines they take. Our platform provides reliable tools to verify the authenticity of pharmaceutical products, ensuring that your health and safety are always a top priority.
        </p>
      </motion.section>

      <motion.section
        id="contactUs"
        ref={contactRef}
        className={`py-16 px-8 text-center ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: contactInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-6">If you have any questions, feel free to reach out to us. We're here to help!</p>
        <div className="flex justify-center gap-6">
          <div className="text-lg">
            <strong>Email:</strong> support@medverify.com
          </div>
          <div className="text-lg">
            <strong>Phone:</strong> +91 800123456
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={faqRef}
        className={`py-16 px-8 text-center ${darkMode ? "bg-gray-600 text-white" : "bg-gray-50 text-gray-900"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: faqInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>
            <h3 className="text-2xl font-semibold">1. How can I verify my medicine?</h3>
            <p className="text-lg">
              Simply upload a clear image of the medicine packaging or scan the barcode, and our system will check its authenticity.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>
            <h3 className="text-2xl font-semibold">2. What if my medicine is counterfeit?</h3>
            <p className="text-lg">
              If our system detects the medicine is counterfeit, you’ll be notified immediately and advised on the next steps, such as reporting it to authorities.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"}`}>
            <h3 className="text-2xl font-semibold">3. How accurate is the verification process?</h3>
            <p className="text-lg">
              We use advanced image recognition and verified databases to ensure the highest level of accuracy in our medicine verification process.
            </p>
          </div>
        </div>
      </motion.section>

      <footer className="text-center text-sm py-12 text-gray-400 bg-gray-800">
        © 2025 MediVerify • Built for your health and safety
      </footer>
    </div>
  );
}
