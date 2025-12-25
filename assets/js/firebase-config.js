// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Z7NxPcD82kfnyKkW5_HY3M_C0Pu0Ca0",
  authDomain: "wedtest-af71f.firebaseapp.com",
  projectId: "wedtest-af71f",
  storageBucket: "wedtest-af71f.firebasestorage.app",
  messagingSenderId: "272938561280",
  appId: "1:272938561280:web:7effbd6b8ed8562f828de5",
  measurementId: "G-74E7SBN5VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);