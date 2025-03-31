// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "to-do-app-fea06.firebaseapp.com",
  projectId: "to-do-app-fea06",
  storageBucket: "to-do-app-fea06.firebasestorage.app",
  messagingSenderId: "799626934625",
  appId: "1:799626934625:web:61c6f6a7d53edbee5f2d20",
  measurementId: "G-F8RF4QTYSJ",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
