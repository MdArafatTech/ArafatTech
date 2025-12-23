import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loginGif from "../assets/forgot.gif";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const auth = getAuth();

  // Auto detect system dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
      document.documentElement.classList.toggle("dark", e.matches);
    };
    setDarkMode(mediaQuery.matches);
    document.documentElement.classList.toggle("dark", mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      setShowNote(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    setShowNote(false);

    try {
      // FIXED: Uses current app domain (localhost:5173, etc.) - works immediately
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`, // Dynamic: http://localhost:5173/login
      });

      setMessage("Password reset email sent! Check your inbox (or spam folder).");
      setShowNote(true);
      setEmail(""); // Clear input
    } catch (error) {
      console.error("Firebase error:", error);
      
      // Better error handling for common cases
      if (error.code === 'auth/user-not-found') {
        setMessage("No account found with this email address.");
      } else if (error.code === 'auth/invalid-email') {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Failed to send reset email. Please try again.");
      }
      setShowNote(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row p-6 md:p-8">
        {/* Form side */}
        <div className="flex-1 flex flex-col justify-center px-4">
          <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Enter your email below to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 px-6 py-3 rounded-xl cursor-pointer font-semibold text-white transition-all duration-300 transform ${
                darkMode
                  ? "bg-blue-700 hover:bg-blue-600 hover:scale-105"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  message.includes("sent") || message.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {showNote && (
              <div
                className={`border rounded-xl p-4 mt-4 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}
              >
                <p className="text-sm text-center">
                  If you don't see the reset email, please check your spam folder.
                </p>
              </div>
            )}

            <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Remember your password?{" "}
              <span className="inline-block transform transition-transform duration-300 hover:scale-110">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>

        {/* Image side */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <img
            src={loginGif}
            alt="Reset Illustration"
            className="w-full h-64 object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
