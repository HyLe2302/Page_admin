import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWJQx5E86O4U8h8QOrXaxhx6YuieRx1lQ",
    authDomain: "mytrip-ai-travel-planner.firebaseapp.com",
    projectId: "mytrip-ai-travel-planner",
    storageBucket: "mytrip-ai-travel-planner.firebasestorage.app",
    messagingSenderId: "369422985499",
    appId: "1:369422985499:web:50460584e8d806c4b40bbe",
    measurementId: "G-W7NB84KXD5"
  };

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
const db = getFirestore(app);

export { db };