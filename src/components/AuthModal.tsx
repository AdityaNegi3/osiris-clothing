import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Signed in successfully!");
      }
      onClose();
    } catch (error: any) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#111] text-white rounded-2xl shadow-2xl w-[400px] p-6 relative animate-fade-in">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">{isSignup ? "Sign Up" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-black border border-gray-600 text-white focus:outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-black border border-gray-600 text-white focus:outline-none focus:border-white"
          />
          <button type="submit" className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">
            Continue
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-yellow-400 hover:underline">
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
