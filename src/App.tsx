\import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ThankYou from "./pages/ThankYou";

import AuthModal from "./components/AuthModal"; // ✅ NEW import

// ✅ Pages for F1 and Dark editions
const F1Edition = () => (
  <div className="p-8 text-center text-xl">F1 Edition Collection</div>
);

const DarkEdition = () => (
  <div className="p-8 text-center text-xl">Dark Edition Collection</div>
);

// 🔁 Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ✅ Smooth scrolling to hash targets
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

function App() {
  const [showAuth, setShowAuth] = useState(false); // ✅ new state for modal

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* 🔁 Always scroll to top on new page */}
          <ScrollToTop />
          <ScrollToHashElement />

          {/* ✅ Pass handler to Header so "Sign In" button can open modal */}
          <Header onSignInClick={() => setShowAuth(true)} />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/collections/f1" element={<F1Edition />} />
              <Route path="/collections/dark" element={<DarkEdition />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </main>

          <Footer />

          {/* ✅ Auth Modal */}
          <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
