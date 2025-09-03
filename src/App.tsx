// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ThankYou from "./pages/ThankYou";

// ✅ Pages for F1 and Dark editions
const F1Edition = () => (
  <div className="p-8 text-center text-xl">Chaos E Collection</div>
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
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white">
        <ScrollToTop />
        <ScrollToHashElement />

        <Header />

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
      </div>
    </CartProvider>
  );
}
