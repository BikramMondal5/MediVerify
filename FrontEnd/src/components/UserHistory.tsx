import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScanSearch } from "lucide-react";

interface ScanEntry {
  image: string;
  result: string;
}

export default function UserHistory() {
  const [history, setHistory] = useState<ScanEntry[]>([]);
  const [realCount, setRealCount] = useState(0);
  const [fakeCount, setFakeCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const userID = localStorage.getItem("userID") || "guest";
    const savedHistory = localStorage.getItem(userID);

    if (savedHistory) {
      const parsedHistory: ScanEntry[] = JSON.parse(savedHistory);
      setHistory(parsedHistory);

      const real = parsedHistory.filter((entry) =>
        entry.result.includes("✅")
      ).length;
      const fake = parsedHistory.length - real;

      setRealCount(real);
      setFakeCount(fake);
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "false") setDarkMode(false);
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen p-6 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-8"
          >
            Your Medicine Scan History
          </motion.h1>

          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center mt-20 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-full shadow-xl"
              >
                <ScanSearch size={48} className="text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold mt-6"
              >
                No Scan History Found
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-gray-500 dark:text-gray-400 max-w-md"
              >
                It looks like you haven’t scanned any medicines yet. Start scanning to check for authenticity and keep track of your scan history here.
              </motion.p>

              <motion.a
                href="/verify"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
              >
                Start Scanning
              </motion.a>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center gap-6 mb-8 text-xl font-semibold"
              >
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl dark:bg-green-900 dark:text-green-300 shadow">
                  ✅ Authentic: {realCount}
                </div>
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl dark:bg-red-900 dark:text-red-300 shadow">
                  ⚠️ Counterfeit: {fakeCount}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {history.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={entry.image}
                      alt={`Scanned medicine ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg mb-4 border"
                    />
                    <p
                      className={`text-lg font-medium ${
                        entry.result.includes("✅")
                          ? "text-green-600 dark:text-green-300"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {entry.result}
                    </p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
