// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import WaitlistPage from "./pages/WaitlistPage"; // 👈 your waitlist page

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          {/* Force ALL routes to show only WaitlistPage */}
          <Route path="*" element={<WaitlistPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
