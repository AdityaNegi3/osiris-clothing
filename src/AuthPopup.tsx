// src/components/AuthPopup.tsx
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../main";
import { useAuth } from "../context/AuthContext";

export default function AuthPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const { user } = useAuth();

  const handleAuth = async () => {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 text-white rounded-2xl shadow-xl w-96 p-6 relative animate-fadeIn">
        {/* Close button */}
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>

        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-3 bg-neutral-800 rounded-xl text-white outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 bg-neutral-800 rounded-xl text-white outline-none"
            />

            <button
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-600 hover:to-gray-400 py-2 rounded-xl font-semibold transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
