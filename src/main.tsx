// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

const Root: React.FC = () => {
  if (!KEY) {
    // Don't crash production if the key isn't injected.
    console.warn("⚠️ Missing VITE_CLERK_PUBLISHABLE_KEY. Rendering without Clerk.");
    return <App />;
  }
  return (
    <ClerkProvider publishableKey={KEY}>
      <App />
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
