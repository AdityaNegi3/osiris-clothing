import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthPopup: React.FC = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      setShow(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in!");
      setShow(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Sign In / Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignIn} style={styles.button}>Sign In</button>
        <button onClick={handleSignUp} style={styles.button}>Create Account</button>
        <button onClick={() => setShow(false)} style={styles.skip}>Continue Without Account</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px"
  },
  input: {
    display: "block",
    width: "90%",
    margin: "10px auto",
    padding: "8px"
  },
  button: {
    margin: "5px",
    padding: "10px 15px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  skip: {
    marginTop: "10px",
    background: "transparent",
    color: "#333",
    border: "none",
    cursor: "pointer"
  }
};

export default AuthPopup;
