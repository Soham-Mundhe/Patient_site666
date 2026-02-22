// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEUC4eaL0FjbYXyw67w9z4CLXddONvJ2E",
    authDomain: "pesent666-a8949.firebaseapp.com",
    projectId: "pesent666-a8949",
    storageBucket: "pesent666-a8949.firebasestorage.app",
    messagingSenderId: "690539000065",
    appId: "1:690539000065:web:57f6b9c27b1ba2852c6b00",
    measurementId: "G-T73F0QSE06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, auth, storage };
