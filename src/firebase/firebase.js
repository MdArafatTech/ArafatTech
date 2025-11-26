// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDwbet8m2QwwVvOk5jDtIoDm4aQLiit9gw",
  authDomain: "fir-112-c5ac1.firebaseapp.com",
  projectId: "fir-112-c5ac1",
  storageBucket: "fir-112-c5ac1.appspot.com",
  messagingSenderId: "681639259986",
  appId: "1:681639259986:web:fca4c58aa7ea8eb95b548b",
  measurementId: "G-4WRN8C37X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
