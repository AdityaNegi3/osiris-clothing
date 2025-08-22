import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, analytics, auth };
