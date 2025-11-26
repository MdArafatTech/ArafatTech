import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import loginGif from "../assets/register.gif";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    try {
      await register(formData.email, formData.password);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-orange-50 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                Create Account
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Sign up to get started
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border rounded px-3 py-2 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="font-semibold text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full border rounded px-3 py-2 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() =>
                  setFormData({ ...formData, showPassword: !formData.showPassword })
                }
              >
                {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="confirmPassword" className="font-semibold text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={formData.showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="w-full border rounded px-3 py-2 text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() =>
                  setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword })
                }
              >
                {formData.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Register
            </button>

            {/* Google Login */}
            <div className="text-center text-gray-400 dark:text-gray-300 mt-2">Or continue with</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center border cursor-pointer dark:border-gray-700 rounded-xl p-2 gap-2 cursor-pointer hover:bg-blue-500 hover:text-white transition"
            >
              <FaGoogle className="text-red-500 w-5 h-5" />
              <span>Sign up with Google</span>
            </button>

            {/* Login Link */}
            <div className="text-center text-gray-500 dark:text-gray-300 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Login
              </Link>
            </div>
          </form>

          {/* GIF / Right Side */}
          <div className="w-full md:flex-1 h-60 md:h-auto flex items-center justify-center bg-gray-100 dark:bg-[#111]">
            <img
              src={loginGif}
              alt="Register Animation"
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
