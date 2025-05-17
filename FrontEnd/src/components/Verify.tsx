import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Moon, RefreshCcw, Scan, Sun, Home, ArrowLeft, RotateCcw, Check, X, AlertTriangle, Info, LogOut, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [cameraFacingMode, setCameraFacingMode] = useState<"user" | "environment">("environment");
  const [hasCamera, setHasCamera] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const startCamera = async (facingMode: "user" | "environment") => {
    try {
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      setShowCamera(true);
      setHasCamera(true);
      setImage(null);
      setResult(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setHasCamera(false);
      setShowCamera(false);
    }
  };

  const toggleCamera = () => {
    const newFacingMode = cameraFacingMode === "user" ? "environment" : "user";
    setCameraFacingMode(newFacingMode);
    startCamera(newFacingMode);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setImage(imageDataUrl);
        setShowCamera(false);
        
        // Stop the camera stream after capturing
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setResult(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setLoading(true);
    // API call simulation
    setTimeout(() => {
      setLoading(false);
      
      // This would be replaced with actual API call and analysis
      const isAuthentic = Math.random() > 0.5;
      
      // Create more detailed result
      if (isAuthentic) {
        setResult("✅ This medicine appears to be authentic");
        setShowDetails(true);
      } else {
        setResult("⚠️ Warning: This medicine may be counterfeit");
        setShowDetails(true);
      }
      
      // Save to history
      if (image) {
        const userID = localStorage.getItem("userID") || "guest";
        const history = JSON.parse(localStorage.getItem(userID) || "[]");
        const timestamp = new Date().toISOString();
        history.unshift({
          image,
          result: isAuthentic ? "✅ Authentic" : "⚠️ Counterfeit",
          timestamp
        });
        localStorage.setItem(userID, JSON.stringify(history));
      }
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/login");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme === "false") setDarkMode(false);

    return () => {
      // Clean up camera stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const renderDetails = () => {
    const isAuthentic = result?.includes("✅");
    
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-8"
      >
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-xl font-semibold mb-4">Verification Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${isAuthentic ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                {isAuthentic ? <Check className="text-green-600 dark:text-green-400" /> : <AlertTriangle className="text-red-600 dark:text-red-400" />}
              </div>
              <div>
                <h4 className="font-semibold">Verification Status</h4>
                <p>{isAuthentic ? "Authentic medicine verified" : "Potential counterfeit detected"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <Info className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold">Recommendations</h4>
                <p>{isAuthentic 
                  ? "This medicine appears to be legitimate. It's safe to use as directed by your healthcare provider." 
                  : "Please do not consume this medicine. Report to local health authorities and return to the place of purchase."}</p>
              </div>
            </div>
            
            {!isAuthentic && (
              <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Report This Product</h4>
                <p className="text-yellow-700 dark:text-yellow-300">Contact your local FDA or health authority to report this potentially counterfeit medicine.</p>
                <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  Report Now
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        {/* Header/Navigation */}
        <header className={`sticky top-0 z-50 px-6 py-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)}
                className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition`}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
              
              <button 
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 font-semibold hover:text-blue-500 transition"
              >
                <Home size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              
              <button 
                onClick={() => navigate("/history")}
                className="flex items-center gap-2 font-semibold hover:text-blue-500 transition"
              >
                <FileText size={20} />
                <span className="hidden sm:inline">History</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto py-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-2">Medicine Verification</h1>
            <p className="text-center mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Upload a clear image of your medication or use your camera to verify its authenticity instantly.
            </p>
          </motion.div>

          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`p-8 rounded-xl text-center ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
              {!image && !showCamera && (
                <div className="space-y-10">
                  <div className="flex flex-col items-center justify-center">
                    <img 
                      src="/medicine-verification.svg" 
                      alt="Medicine verification" 
                      className="w-48 h-48 mb-4"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTkuNSAxMi41NzJsLTcuNSA3LjQyOGwtNy41LTcuNDI4bTAgMFY1aDEwbDUgNS4wNzJ2Mi41eiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';
                        e.currentTarget.classList.add('text-blue-500');
                      }}
                    />
                    <h3 className="text-xl font-semibold mb-2">Ready to Verify Your Medicine?</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                      Choose one of the options below to start the verification process.
                    </p>
                  </div>
                
                  <div className="flex flex-wrap justify-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <label className="flex flex-col items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl cursor-pointer hover:shadow-lg transition-shadow">
                        <ImagePlus size={36} />
                        <div>
                          <p className="font-semibold">Upload Image</p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">Select from your device</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => startCamera(cameraFacingMode)}
                        className="flex flex-col items-center gap-4 p-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:shadow-lg transition-shadow"
                        disabled={!hasCamera}
                      >
                        <Camera size={36} />
                        <div>
                          <p className="font-semibold">Use Camera</p>
                          <p className="text-sm text-green-600 dark:text-green-400">Take a photo now</p>
                        </div>
                      </button>
                    </motion.div>
                  </div>
                </div>
              )}

              {showCamera && (
                <div className="relative">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">Capture Medicine Image</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Position the medicine packaging in good lighting and centered in the frame
                    </p>
                  </div>
                  
                  <div className="relative max-w-xl mx-auto">
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline
                        className="w-full h-full object-cover"
                      ></video>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={toggleCamera}
                        className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white transition"
                        title="Switch camera"
                      >
                        <RefreshCcw size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setShowCamera(false);
                          if (stream) {
                            stream.getTracks().forEach(track => track.stop());
                            setStream(null);
                          }
                        }}
                        className="p-2 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white transition"
                        title="Close camera"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={captureImage}
                    className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
                  >
                    <Camera size={20} />
                    Capture Photo
                  </motion.button>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />

              {image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Verify This Medicine</h3>
                    <div className="relative max-w-sm mx-auto">
                      <img 
                        src={image} 
                        alt="Captured medicine" 
                        className="rounded-xl shadow-md max-w-full object-contain max-h-[400px]" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setImage(null);
                        setResult(null);
                        setShowDetails(false);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      <RotateCcw size={18} />
                      Retake Photo
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Scan className="animate-spin" size={18} />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Scan size={18} />
                          Verify Medicine
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-6 rounded-xl font-semibold text-lg max-w-3xl mx-auto mb-6 ${
                  result.includes("✅")
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {result.includes("✅") ? (
                    <Check size={24} className="text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
                  )}
                  <span>{result}</span>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm underline hover:no-underline"
                  >
                    {showDetails ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </motion.div>
            )}
            
            {showDetails && result && renderDetails()}
          </AnimatePresence>
          
          {!result && (
            <motion.div 
              className="mt-16 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">How Medicine Verification Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 mx-auto">
                    <Camera className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Step 1: Capture</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Take a clear photo of the medicine packaging or upload an existing image
                  </p>
                </div>
                
                <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4 mx-auto">
                    <Scan className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Step 2: Analyze</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Our AI system analyzes the image and compares it with our secure database
                  </p>
                </div>
                
                <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4 mx-auto">
                    <Check className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Step 3: Verify</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Get instant results showing whether the medicine is authentic or potentially counterfeit
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}