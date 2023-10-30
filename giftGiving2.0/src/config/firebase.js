// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyD28PhP0uc7DMXW-8oTQh43KyH77WCo7PE",
  authDomain: "fir-db-6ccaf.firebaseapp.com",
  projectId: "fir-db-6ccaf",
  storageBucket: "fir-db-6ccaf.appspot.com",
  messagingSenderId: "703615629491",
  appId: "1:703615629491:web:f43bdcf523a542deb6d8c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
