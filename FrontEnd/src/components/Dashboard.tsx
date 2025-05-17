import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Sun, Moon, LogOut, Home, FileText, Phone, Info, Users, Menu, X, ChevronRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const authenticityData = [
  { name: "Authentic", value: 85 },
  { name: "Counterfeit", value: 15 },
];

const monthlyData = [
  { month: "Jan", scans: 45 },
  { month: "Feb", scans: 52 },
  { month: "Mar", scans: 48 },
  { month: "Apr", scans: 61 },
  { month: "May", scans: 72 },
  { month: "Jun", scans: 83 },
  { month: "Jul", scans: 90 },
];

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}>
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex justify-between items-center px-8 py-6 shadow-xl sticky top-0 z-50 ${darkMode ? "bg-gray-800" : "bg-gray-100"} transition-all duration-300`}>
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

      {/* Mobile Navigation */}
      <nav className={`md:hidden flex justify-between items-center px-6 py-4 shadow-xl sticky top-0 z-50 ${darkMode ? "bg-gray-800" : "bg-gray-100"} transition-all duration-300`}>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-lg">MediVerify</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? "bg-gray-800" : "bg-gray-100"} overflow-hidden`}
          >
            <div className="flex flex-col py-2">
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Home size={18} /> <span>Home</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  navigate("/history");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} /> <span>History</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  navigate("/verify");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Info size={18} /> <span>Verify Medicines</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  navigate("/blog");
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} /> <span>Blog</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  document.getElementById("aboutUs")?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Users size={18} /> <span>About Us</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 hover:bg-gray-700 dark:hover:bg-gray-700"
                onClick={() => {
                  document.getElementById("contactUs")?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} /> <span>Contact Us</span>
                </div>
                <ChevronRight size={16} />
              </span>
              <span
                className="flex items-center justify-between px-6 py-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-3">
                  <LogOut size={18} /> <span>Logout</span>
                </div>
                <ChevronRight size={16} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-8"
      >
        <h1 className={`text-5xl select-none font-bold mb-6 ${darkMode ? "text-blue-500" : "text-blue-700"}`}>
          {userName !== "Guest" ? `${displayName}, Welcome to ` : `Hello Guest, Welcome to `}
          <span
            className={`text-5xl font-extrabold ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}
            style={{ transition: "transform 0.5s ease-out" }}
          >
            MediVerify
          </span>
        </h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto select-none mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Ensuring your medication is safe and authentic — simply upload a photo or take a snapshot to begin verification.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button 
            onClick={() => navigate("/verify")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Verify a Medicine Now
            <ArrowUpRight className="inline ml-2" size={18} />
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        ref={statsRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: statsInView ? 1 : 0, scale: statsInView ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-8 py-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Dashboard Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-xl font-semibold mb-4">Medicine Verification Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={authenticityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {authenticityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-xl font-semibold mb-4">Monthly Verification Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="month" stroke={darkMode ? "#d1d5db" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#d1d5db" : "#4b5563"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#ffffff", borderColor: darkMode ? "#374151" : "#e5e7eb" }} />
                <Legend />
                <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8">
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-xl font-semibold mb-4">Verification Distribution by Medicine Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Antibiotics", authentic: 45, counterfeit: 5 },
                  { name: "Pain Relief", authentic: 68, counterfeit: 12 },
                  { name: "Vitamins", authentic: 30, counterfeit: 3 },
                  { name: "Cardiac", authentic: 52, counterfeit: 8 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={darkMode ? "#d1d5db" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#d1d5db" : "#4b5563"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1f2937" : "#ffffff", borderColor: darkMode ? "#374151" : "#e5e7eb" }} />
                <Legend />
                <Bar dataKey="authentic" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="counterfeit" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
          className="rounded-xl shadow-lg w-full h-auto object-cover"
        />
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Problem of Fake Medicines</h3>
          <p className="text-lg leading-relaxed">
            According to WHO, up to 10% of medicines globally are counterfeit. In some regions, this number can reach as high as 30%. Counterfeit medicines can contain harmful ingredients or incorrect dosages, posing serious health risks.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            MediVerify helps you make smarter, safer decisions instantly with our advanced verification technology. Our system cross-references multiple databases and uses AI image recognition to accurately identify authentic medicines.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/30" : "bg-blue-50"}`}>
              <p className="text-3xl font-bold text-blue-500">90%+</p>
              <p>Accuracy rate</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/30" : "bg-green-50"}`}>
              <p className="text-3xl font-bold text-green-500">3.5M+</p>
              <p>Verifications done</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/30" : "bg-purple-50"}`}>
              <p className="text-3xl font-bold text-purple-500">120+</p>
              <p>Countries served</p>
            </div>
          </div>
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
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
          <div className={`p-6 rounded-xl max-w-md ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
            <Users size={48} className="mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p>
              Our diverse team of healthcare professionals, data scientists, and technology experts work together to combat counterfeit medicines globally.
            </p>
          </div>
          <div className={`p-6 rounded-xl max-w-md ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
            <Info size={48} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To create a world where everyone can easily verify their medication's authenticity and make informed decisions about their health.
            </p>
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"} shadow-lg`}>
            <Phone className="mx-auto mb-4 text-blue-500" size={32} />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-lg">+91 800123456</p>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"} shadow-lg`}>
            <Mail className="mx-auto mb-4 text-purple-500" size={32} />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-lg">support@medverify.com</p>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"} shadow-lg`}>
            <MapPin className="mx-auto mb-4 text-red-500" size={32} />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-lg">123 Health Street<br />Tech City, 560001</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={faqRef}
        className={`py-16 px-8 ${darkMode ? "bg-gray-600 text-white" : "bg-gray-50 text-gray-900"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: faqInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h3 className="text-2xl font-semibold mb-3">How can I verify my medicine?</h3>
            <p className="text-lg">
              Simply upload a clear image of the medicine packaging or scan the barcode, and our system will check its authenticity against our database of verified products.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h3 className="text-2xl font-semibold mb-3">What if my medicine is counterfeit?</h3>
            <p className="text-lg">
              If our system detects the medicine is counterfeit, you'll be notified immediately and advised on the next steps, such as reporting it to authorities and safely disposing of the product.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h3 className="text-2xl font-semibold mb-3">How accurate is the verification process?</h3>
            <p className="text-lg">
              We use advanced image recognition technology and maintain an extensive database of authentic medicines. Our system has over 90% accuracy and is continuously improving.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h3 className="text-2xl font-semibold mb-3">Is my data secure?</h3>
            <p className="text-lg">
              Yes, we take data privacy seriously. Your uploaded images and verification history are encrypted and never shared with third parties without your explicit consent.
            </p>
          </div>
        </div>
      </motion.section>

      <footer className={`py-12 px-8 ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-900 text-gray-300"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MediVerify</h3>
            <p>Ensuring medication safety through innovative verification technology.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Verify</a></li>
              <li><a href="#" className="hover:text-white transition">History</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          © 2025 MediVerify • Built for your health and safety
        </div>
      </footer>
    </div>
  );
}
