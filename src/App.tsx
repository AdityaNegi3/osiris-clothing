import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ThankYou from "./pages/ThankYou";

// ✅ Import Firebase Firestore
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./main"; // 👈 use initialized firebase app

const db = getFirestore(app); // ✅ Firestore instance

// Pages for F1 and Dark editions
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

// Handles smooth scrolling to hash targets (optional)
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

// ✅ Example function to save order to Firestore
async function saveOrderToFirestore(orderData: any) {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Order stored with ID: ", docRef.id);
  } catch (e) {
    console.error("❌ Error adding order: ", e);
  }
}

function App() {
  return (
    <CartProvider>
      <Router>
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
      </Router>
    </CartProvider>
  );
}

export default App;
export { saveOrderToFirestore }; // ✅ export to use in checkout
