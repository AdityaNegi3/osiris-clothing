import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {KEY ? (
      <ClerkProvider publishableKey={KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <ClerkLoaded>
            <App />
          </ClerkLoaded>
        </BrowserRouter>
      </ClerkProvider>
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </React.StrictMode>
);
