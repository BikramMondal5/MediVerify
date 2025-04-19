import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Camera, ScanLine, CheckCircle, Sun, Moon, Clock, Sparkles, Zap } from "lucide-react";

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

  const handleVerifyNowClick = () => {
    navigate("/dashboard");
  };

  const handleGuestClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}
      style={{
        backgroundImage: `url(/BG.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "multiply",
        backgroundColor: darkMode ? "#1f2937" : "#d1d5db",
      }}
    >
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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={handleSignupClick}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-lg transition"
            whileHover={{ scale: 1.15 }}
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
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
            Is Your <span className="text-blue-600">Medication</span> Genuine?
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
            Verify authenticity instantly using AI image analysis & blockchain verification.
          </p>
          <motion.button
            onClick={handleVerifyNowClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.15 }}
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
          <img src="/Home.webp" alt="Scan Medication Demo" className="w-full max-w-sm" />
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
        <h3 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-10`}>
          How It Works?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              Icon: Camera,
              title: "Step 1: Snap a Photo",
              desc: "Capture the medication using your phone or webcam.",
            },
            {
              Icon: ScanLine,
              title: "Step 2: Analyze with AI",
              desc: "AI detects packaging authenticity patterns.",
            },
            {
              Icon: ShieldCheck,
              title: "Step 3: Verify on Blockchain",
              desc: "Supply chain data confirms source and authenticity.",
            },
            {
              Icon: CheckCircle,
              title: "Step 4: Get Your Result",
              desc: "Instant result: Verified ✅ or Suspicious ⚠️",
            },
          ].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 border rounded-xl text-center ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100'}`}
            >
              <Icon className={`mx-auto mb-4 ${darkMode ? 'text-blue-600' : 'text-blue-500'}`} size={36} />
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="px-6 lg:px-20 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-900'} mb-10`}>
          Why MediVerify?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock size={32} className="text-blue-500 dark:text-blue-400 mx-auto mb-4" />,
              title: "Real-Time Verification",
              desc: "Instant results with lightning-speed AI analysis, right when you need it.",
              delay: 0.2,
            },
            {
              icon: <Sparkles size={32} className="text-purple-500 dark:text-purple-400 mx-auto mb-4" />,
              title: "Local Medicine Detection",
              desc: "Tailored models trained on regional medications and known counterfeits.",
              delay: 0.4,
            },
            {
              icon: <Zap size={32} className="text-green-500 dark:text-green-400 mx-auto mb-4" />,
              title: "Seamless Experience",
              desc: "User-friendly interface with smooth navigation across all devices.",
              delay: 0.6,
            },
          ].map(({ icon, title, desc, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1, delay }}
              viewport={{ once: true }}
              className={`p-6 border rounded-xl text-center transition-all ${
                darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              {icon}
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="px-6 lg:px-20 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Why are you still here?
        </h3>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Start using MediVerify to ensure the authenticity of your medication.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <motion.button
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={handleSignupClick}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg transition"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </div>
        <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
          Just want to explore? <span className="text-blue-500">Dive in as a guest!</span>
        </p>
        <motion.button
          onClick={handleGuestClick}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg text-base transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start as Guest
        </motion.button>
      </motion.section>

      <motion.footer
        className={`py-4 text-center ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm">Made with ❤️ for patient safety • © 2025 MediVerify</p>
      </motion.footer>
    </div>
  );
}
