import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Moon, RefreshCcw, Scan, Sun } from "lucide-react";
import { motion } from "framer-motion";

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
    // Simulate analysis
    setTimeout(() => {
      setLoading(false);
      // This would be replaced with your actual analysis logic
      const isAuthentic = Math.random() > 0.5;
      setResult(isAuthentic ? "✅ This medicine appears to be authentic" : "⚠️ Warning: This medicine may be counterfeit");
      
      // Save to history
      if (image) {
        const userID = localStorage.getItem("userID") || "guest";
        const history = JSON.parse(localStorage.getItem(userID) || "[]");
        history.unshift({
          image,
          result: isAuthentic ? "✅ Authentic" : "⚠️ Counterfeit"
        });
        localStorage.setItem(userID, JSON.stringify(history));
      }
    }, 2000);
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
          {/* ... (keep your existing header and other content) ... */}

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
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="rounded-xl shadow-md max-w-full mx-auto"
                />
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                  <button
                    onClick={toggleCamera}
                    className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-200 hover:bg-gray-300"} transition`}
                    title="Switch camera"
                  >
                    <Camera size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setShowCamera(false);
                      if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        setStream(null);
                      }
                    }}
                    className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-200 hover:bg-gray-300"} transition`}
                    title="Close camera"
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
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
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