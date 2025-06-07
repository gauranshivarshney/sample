import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCokOZCJfB2tB7XbEfiAqkJeAYFI1ZORig",
  authDomain: "chatgpt-33bd5.firebaseapp.com",
  projectId: "chatgpt-33bd5",
  storageBucket: "chatgpt-33bd5.firebasestorage.app",
  messagingSenderId: "1056816521945",
  appId: "1:1056816521945:web:a11eeb8ae09c4485c954c8",
  measurementId: "G-0HY7BBTY5C"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }