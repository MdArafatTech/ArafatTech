import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import registerGif from "../assets/register.gif";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // ✅ COMPLETELY SEPARATE LOADING STATES
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMsg("");
  };

  const togglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const toggleConfirmPassword = () => {
    setFormData((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
  };

  // Password Strength Calculator (unchanged)
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "", progress: 0 };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const levels = [
      { min: 1, label: "Very Weak", color: "bg-red-500" },
      { min: 2, label: "Weak", color: "bg-orange-500" },
      { min: 3, label: "Fair", color: "bg-yellow-500" },
      { min: 4, label: "Good", color: "bg-lime-500" },
      { min: 5, label: "Strong", color: "bg-green-500" },
      { min: 6, label: "Very Strong", color: "bg-emerald-600" },
    ];

    const level = levels.find(l => score <= l.min) || levels[levels.length - 1];
    return { ...level, score, progress: (score / 6) * 100 };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsRegisterLoading(true); // ✅ ONLY REGISTER

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      setIsRegisterLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setIsRegisterLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password);
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorMsg(error.message || "Registration failed. Try again.");
    } finally {
      setIsRegisterLoading(false); // ✅ ONLY REGISTER
    }
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true); // ✅ ONLY GOOGLE
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

      if (isNewUser) {
        setShowSuccessPopup(true);
      } else {
        setErrorMsg("This Google account is already registered. Please log in.");
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return;
      setErrorMsg("Google sign-up failed. Try again.");
    } finally {
      setIsGoogleLoading(false); // ✅ ONLY GOOGLE
    }
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Account Created!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Welcome! Your account is ready.</p>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
          disabled={isRegisterLoading || isGoogleLoading}
        >
          OK Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showSuccessPopup && <SuccessPopup />}

      <div className="bg-orange-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
        <div className="w-full mt-13 max-w-5xl">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2">
              {/* Form */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Create Your Account</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Join us today — it's free and fast!</p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/40 dark:to-pink-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-center">
                    <p className="text-red-800 dark:text-red-300 font-semibold">{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input - ONLY REGISTER DISABLED */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" 📩 you@example.com"
                      required
                      disabled={isRegisterLoading}  // ✅ ONLY REGISTER
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none transition disabled:opacity-50"
                    />
                  </div>

                  {/* Password Input - ONLY REGISTER DISABLED */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={formData.showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" 🔏 Create a strong password"
                        required
                        disabled={isRegisterLoading}  // ✅ ONLY REGISTER
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none transition disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        disabled={isRegisterLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition disabled:opacity-50"
                      >
                        {formData.showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                      </button>
                    </div>

                    {/* Strength Indicator - Works during Google loading */}
                    {formData.password && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Password Strength</span>
                          <span className={`text-sm font-bold ${
                            strength.score <= 2 ? "text-red-600 dark:text-red-400" :
                            strength.score <= 3 ? "text-orange-600 dark:text-orange-400" :
                            strength.score <= 4 ? "text-yellow-600 dark:text-yellow-400" :
                            "text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {strength.label}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${strength.progress}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={`h-full rounded-full ${strength.color} shadow-md`}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <div className={`${formData.password.length >= 8 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            ✓ 8+ characters
                          </div>
                          <div className={`${/[A-Z]/.test(formData.password) ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            ✓ Uppercase letter
                          </div>
                          <div className={`${/[0-9]/.test(formData.password) ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            ✓ Number
                          </div>
                          <div className={`${/[^A-Za-z0-9]/.test(formData.password) ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            ✓ Special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password - ONLY REGISTER DISABLED */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={formData.showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" 🔏 Type password again"
                        required
                        disabled={isRegisterLoading}  // ✅ ONLY REGISTER
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
                        disabled={isRegisterLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50"
                      >
                        {formData.showConfirmPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                      </button>
                    </div>
                  </div>

                  {/* ✅ REGISTER BUTTON - ONLY isRegisterLoading */}
                  <button
                    type="submit"
                    disabled={isRegisterLoading}
                    className={`w-full py-4 font-bold rounded-xl shadow-xl transform transition-all duration-200 flex items-center justify-center gap-3 text-white ${
                      isRegisterLoading
                        ? "bg-cyan-400 cursor-not-allowed animate-pulse"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 cursor-pointer"
                    }`}
                  >
                    {isRegisterLoading ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>

                <div className="my-8 text-center text-gray-500 dark:text-gray-400">or continue with</div>

                {/* ✅ GOOGLE BUTTON - ONLY isGoogleLoading */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  disabled={isGoogleLoading}
                  className={`group w-full cursor-pointer flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                    isGoogleLoading
                      ? "border-2 border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-105 hover:shadow-red-500/25"
                  }`}
                >
                  {isGoogleLoading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-gray-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                      Google Sign-up...
                    </>
                  ) : (
                    <>
                      <FaGoogle className="text-2xl text-red-500 group-hover:text-white transition-colors flex-shrink-0" />
                      <span>Sign up with Google</span>
                    </>
                  )}
                </button>

                <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 dark:text-yellow-400 font-bold hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>

              {/* Right Side – Image */}
              <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-10">
                <img src={registerGif} alt="Register" className="w-full max-w-md drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
