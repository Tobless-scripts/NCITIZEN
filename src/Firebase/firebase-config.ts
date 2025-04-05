// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhsQ8EYxNFWbHrvFur6hIrqj3lmg61n5g",
    authDomain: "icitizen-ng.firebaseapp.com",
    projectId: "icitizen-ng",
    storageBucket: "icitizen-ng.firebasestorage.app",
    messagingSenderId: "983515184969",
    appId: "1:983515184969:web:70e16136c36f2f15a22498",
    measurementId: "G-GV8E9Q8T76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);
const db = getFirestore(app);

export { auth, app, messaging, db };
