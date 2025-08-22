import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ThankYou from "./pages/ThankYou";

// ✅ Firebase imports
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./main"; // initialized firebase
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Firestore example function
async function saveOrderToFirestore(orderData: any) {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Order stored with ID: ", docRef.id);
  } catch (e) {
    console.error("❌ Error adding order: ", e);
  }
}

// 🔁 Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 🔁 Smooth scroll to hash
function ScrollToHashElement() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash]);
  return null;
}

/* ===========================
   🔥 Auth Modal Component
=========================== */
function AuthModal({
  show,
  onClose,
  user
}: {
  show: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-neutral-900 rounded-2xl shadow-lg w-full max-w-md p-8 relative text-white">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-neutral-800 text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl bg-neutral-800 text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold p-3 rounded-xl hover:bg-gray-200 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="text-center mt-4 text-gray-400">
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ===========================
   🔥 Main App Component
=========================== */
function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <ScrollToTop />
          <ScrollToHashElement />
          <Header />

          {/* Auth Button (Top Right Corner) */}
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setShowAuth(true)}
              className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              {user ? "Account" : "Login / Sign Up"}
            </button>
          </div>

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/collections/f1"
                element={<div className="p-8 text-center text-xl">F1 Edition Collection</div>}
              />
              <Route
                path="/collections/dark"
                element={<div className="p-8 text-center text-xl">Dark Edition Collection</div>}
              />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </main>
          <Footer />

          {/* Auth Popup */}
          <AuthModal show={showAuth} onClose={() => setShowAuth(false)} user={user} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
export { saveOrderToFirestore };
