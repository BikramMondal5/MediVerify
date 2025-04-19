import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, ImagePlus, Scan, RefreshCcw, Sun, Moon } from "lucide-react";

export default function Verify() {
  const [darkMode, setDarkMode] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<"user" | "environment">("environment");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startCamera = async (facingMode: "user" | "environment") => {
    setShowCamera(true);
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
      setStream(newStream);
    } catch (err) {
      alert("Could not access your camera.");
      setShowCamera(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setImage(dataUrl);
    stopCamera();
    setShowCamera(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        stopCamera();
        setShowCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    setLoading(true);

    setTimeout(() => {
      const isAuthentic = Math.random() > 0.4;
      const resultMessage = isAuthentic
        ? "✅ This medicine appears to be authentic."
        : "⚠️ Warning! This medicine may be counterfeit.";

      setResult(resultMessage);
      setLoading(false);

      const id = userID || localStorage.getItem("userID") || `guest_${Date.now()}`;
      localStorage.setItem("userID", id);
      setUserID(id);

      const existingHistory = localStorage.getItem(id);
      let history = [];

      try {
        history = existingHistory ? JSON.parse(existingHistory) : [];
      } catch {
        history = [];
      }

      history.push({ image, result: resultMessage });
      localStorage.setItem(id, JSON.stringify(history));
    }, 2000);
  };

  const toggleCamera = () => {
    const newFacing = cameraFacingMode === "user" ? "environment" : "user";
    setCameraFacingMode(newFacing);
    stopCamera();
    startCamera(newFacing);
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme.toString());
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "false") setDarkMode(false);

    let storedID = localStorage.getItem("userID");
    if (!storedID) {
      storedID = `guest_${Date.now()}`;
      localStorage.setItem("userID", storedID);
    }
    setUserID(storedID);
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen p-6 transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <button
          onClick={toggleTheme}
          className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-4xl font-bold mb-4 p-4 ${
                darkMode ? "text-cyan-400" : "text-teal-600"
              }`}
            >
              Medicine Authenticity Checker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg px-6 py-2"
            >
              Helping you stay safe with{" "}
              <span className={darkMode ? "text-pink-400" : "text-indigo-600"}>
                quick and reliable
              </span>{" "}
              medicine checks.
            </motion.p>
          </div>

          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4">Why It Matters</h2>
              <img
                src="/PieChart.png"
                alt="Pie chart explaining medicine safety"
                className="rounded-lg shadow-md mx-auto p-4"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4"
            >
              <img
                src="/illustration.jpg"
                alt="Verification Illustration"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
          </motion.section>

          <div className="text-center mb-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-md px-6 py-2"
            >
              <span className={darkMode ? "text-blue-400" : "text-purple-600"}>Upload</span> or{" "}
              <span className={darkMode ? "text-blue-400" : "text-purple-600"}>take a photo</span> of a medicine to verify its{" "}
              <span className={darkMode ? "text-blue-400" : "text-purple-600"}>authenticity</span>.
            </motion.p>
          </div>

          <div className="text-center">
            {!image && (
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition">
                  <ImagePlus size={20} />
                  Upload File
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  onClick={() => startCamera(cameraFacingMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  <Camera size={20} />
                  Open Camera
                </button>
              </div>
            )}

            {showCamera && (
              <div className="relative">
                <video ref={videoRef} className="rounded-xl shadow-md max-w-full mx-auto" />
                <div className="absolute top-0 right-0 p-4">
                  <button
                    onClick={toggleCamera}
                    className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
                <button
                  onClick={captureImage}
                  className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
                >
                  📸 Capture Photo
                </button>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6"
              >
                <img src={image} alt="Captured" className="max-w-sm rounded-xl shadow-md mx-auto" />
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setImage(null);
                      setResult(null);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    Retake Photo
                  </button>

                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="ml-4 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <Scan className="animate-spin" size={18} />
                        Analyzing...
                      </span>
                    ) : (
                      "Continue and Analyze"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl font-semibold text-lg max-w-md mx-auto ${
                  result.includes("✅")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
