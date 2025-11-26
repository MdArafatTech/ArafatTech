// src/component/ForgotPass.jsx
import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import loginGif from "../assets/forgot.gif";

const ForgotPass = () => {
  const { resetPasswordByEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailReset = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Enter your email");
    try {
      await resetPasswordByEmail(email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4 sm:px-6 m-10">
      <div className="overflow-hidden border rounded-lg shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Form */}
          <form onSubmit={handleEmailReset} className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">Reset Password</h1>
              <p className="text-gray-500">Enter your email to receive reset instructions</p>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>

            {message && (
              <p className="text-center text-green-600">{message}</p>
            )}

            <div className="text-center text-gray-400 my-2">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>

          {/* Right side image */}
          <div className="bg-gray-100 relative w-full h-64 md:h-auto flex md:block">
            <img
              src={loginGif}
              alt="Reset Animation"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
