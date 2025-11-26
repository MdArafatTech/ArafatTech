// // src/provider/AuthProvider.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth, googleProvider } from "../firebase/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Register
//   const register = (email, password) =>
//     createUserWithEmailAndPassword(auth, email, password);

//   // Login
//   const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

//   // Google login
//   const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

//   // Logout
//   const logout = () => signOut(auth);

//   // Forgot password by email
//   const resetPasswordByEmail = (email) => sendPasswordResetEmail(auth, email);

//   // Track auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     register,
//     login,
//     loginWithGoogle,
//     logout,
//     resetPasswordByEmail,
//   };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// };

// // Custom hook
// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updatePassword
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Google login
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => signOut(auth);

  // Forgot password by email
  const resetPasswordByEmail = (email) => sendPasswordResetEmail(auth, email);

  // ---------- Phone OTP ----------
  const sendPhoneOTP = (phoneNumber, appVerifier) =>
    signInWithPhoneNumber(auth, phoneNumber, appVerifier);

  const updateUserPassword = (user, newPassword) => updatePassword(user, newPassword);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPasswordByEmail,
    sendPhoneOTP,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
