// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLExk02mdglKh-T6usW9VtDoU1taT-IdM",
  authDomain: "osiris-clothing.firebaseapp.com",
  projectId: "osiris-clothing",
  storageBucket: "osiris-clothing.firebasestorage.app",
  messagingSenderId: "448747370903",
  appId: "1:448747370903:web:a57b21f4bcb29898c4acd2",
  measurementId: "G-WTKRKM6YR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
