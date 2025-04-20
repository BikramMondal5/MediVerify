import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircleMore, Sun, Moon, TrendingUp, Trash } from "lucide-react";

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export default function Blog() {
  const [darkMode, setDarkMode] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [whatsNewPosts, setWhatsNewPosts] = useState<Post[]>([]);

  const defaultPosts: Post[] = [
    {
      id: 1,
      author: "Guest",
      content: "Share your thoughts on medicine verification and safety.",
      timestamp: new Date().toLocaleString(),
    },
    {
      id: 2,
      author: "User",
      content: "Counterfeit medicines are a growing concern globally. Stay informed and stay safe!",
      timestamp: new Date().toLocaleString(),
    },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "true");
    }

    const storedPosts = localStorage.getItem("communityPosts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);
      setWhatsNewPosts(parsedPosts.slice(0, 3));
    } else {
      setPosts(defaultPosts);
      setWhatsNewPosts(defaultPosts.slice(0, 3));
    }

    setTrendingPosts([
      {
        id: 1,
        author: "WHO",
        content: "New study shows alarming rise in counterfeit medicines in Southeast Asia. Stay aware!",
        timestamp: new Date().toLocaleString(),
      },
      {
        id: 2,
        author: "FDA",
        content: "Warning: Popular over-the-counter medications found with fraudulent labels in the market.",
        timestamp: new Date().toLocaleString(),
      },
      {
        id: 3,
        author: "MedicAlert",
        content: "Check your medicine! Fake pills causing serious side effects reported in the last quarter.",
        timestamp: new Date().toLocaleString(),
      },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handlePost = () => {
    if (!newPost.trim()) return;

    const newEntry: Post = {
      id: Date.now(),
      author: localStorage.getItem("userID") || "Guest",
      content: newPost,
      timestamp: new Date().toLocaleString(),
    };

    const updatedPosts = [newEntry, ...posts];
    setPosts(updatedPosts);
    setWhatsNewPosts([newEntry, ...whatsNewPosts.slice(0, 2)]);

    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    setNewPost("");
  };

  const handleDelete = (id: number) => {
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
    setWhatsNewPosts(filteredPosts.slice(0, 3));
    localStorage.setItem("communityPosts", JSON.stringify(filteredPosts));
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen p-6 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <div className="flex justify-center mb-4">
                <MessageCircleMore size={48} className="text-indigo-500" />
              </div>
              <h1 className="text-4xl font-bold">What's New</h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Discover the latest discussions and posts from the community!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`mb-6 rounded-xl p-4 shadow-md ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <textarea
                rows={4}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-900 bg-white text-sm resize-none focus:outline-none"
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePost}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  Post
                </motion.button>
              </div>
            </motion.div>

            {whatsNewPosts.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-lg mt-10 text-gray-500 dark:text-gray-400"
              >
                🚫 No discussions yet. Be the first to start a conversation!
              </motion.p>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="space-y-4"
              >
                {whatsNewPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl shadow-md relative ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                   <button
                        onClick={() => handleDelete(post.id)}
                        className="absolute top-10 right-2 text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-200 ease-in-out"
                        title="Delete post"
                    >
                        <Trash size={20} />
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {post.author} • {post.timestamp}
                    </div>
                    <p className="text-base">{post.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl shadow-md mb-10 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-indigo-500" />
                Trending Now
              </h2>
              {trendingPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`p-4 rounded-xl mb-4 ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {post.author} • {post.timestamp}
                  </div>
                  <p>{post.content}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-xl shadow-md ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Latest News on Counterfeit Medicines</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}>
                  <h4 className="font-semibold text-md">FDA issues warning</h4>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Counterfeit blood pressure medicine on the rise
                  </p>
                  <div className="text-xs text-gray-500 mt-1">FDA • April 12, 2025</div>
                </div>
                <div className={`p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}>
                  <h4 className="font-semibold text-md">New anti-counterfeit regulations</h4>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Governments tightening drug quality checks
                  </p>
                  <div className="text-xs text-gray-500 mt-1">Health Ministry • April 10, 2025</div>
                </div>
                <div className={`p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}>
                  <h4 className="font-semibold text-md">Study reveals surge in fake drugs online</h4>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Online pharmacies linked to rising fake medicine cases
                  </p>
                  <div className="text-xs text-gray-500 mt-1">WHO • April 5, 2025</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
