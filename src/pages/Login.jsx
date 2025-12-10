import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import loginGif from "../assets/login.gif";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showGoogleSuccessPopup, setShowGoogleSuccessPopup] = useState(false); // NEW

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrorMsg("");
  };

  const togglePassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await login(formData.email, formData.password);
      setShowSuccessPopup(true);
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        setErrorMsg("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("Too many attempts. Account temporarily locked.");
      } else {
        setErrorMsg("Unable to log in. Please try again later.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // ALWAYS SHOW POPUP
      setShowGoogleSuccessPopup(true);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return;
      if (error.code === "auth/invalid-credential") {
        navigate("/register");
        return;
      }
      setErrorMsg("Google sign-in failed.");
    }
  };

  // Email Login Success Popup
  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center transform scale-100 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Login Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Welcome back! You're being redirected...
        </p>
        <button
          onClick={() => navigate("/account")}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
        >
          OK → Go to Account
        </button>
      </div>
    </div>
  );

  // Google Login Success Popup (NEW)
  const GoogleSuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center transform scale-100 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Google Login Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Redirecting to your account...
        </p>
        <button
          onClick={() => navigate("/account")}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 cursor-pointer hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
        >
          OK → Go to Account
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showSuccessPopup && <SuccessPopup />}
      {showGoogleSuccessPopup && <GoogleSuccessPopup />}

      <div className="bg-orange-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2">

              {/* Form */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Log in to access your account
                  </p>
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/40 dark:to-pink-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-center">
                    <p className="text-red-800 dark:text-red-300 font-semibold mb-3">
                      {errorMsg}
                    </p>

                    {errorMsg.includes("No account found") && (
                      <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                          New here? Create your account in seconds
                        </p>
                        <button
                          onClick={() => navigate("/register")}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition"
                        >
                          Create Free Account
                        </button>
                      </div>
                    )}

                    {errorMsg.includes("Incorrect password") && (
                      <Link to="/forgotpass" className="inline-block mt-3 cursor-pointer text-blue-600 dark:text-yellow-400 font-medium hover:underline">
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="📩 you@example.com"
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={formData.showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="🔑 Enter password"
                        required
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none"
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {formData.showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Link to="/forgotpass" className="text-blue-600 dark:text-yellow-400 font-medium  text-sm">
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl transform hover:scale-105 transition"
                  >
                    Log In
                  </button>
                </form>

                <div className="my-8 text-center text-gray-500">or continue with</div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="group w-full flex cursor-pointer items-center justify-center gap-3 py-4 
                        border-2 border-gray-300 dark:border-gray-600 
                        rounded-xl font-medium text-gray-700 dark:text-gray-200
                        bg-white dark:bg-gray-800
                        hover:bg-red-600 hover:border-red-600 
                        hover:text-white dark:hover:text-white
                        transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <FaGoogle className="text-2xl text-red-500 group-hover:text-white transition-colors duration-300" />

                  <span className="group-hover:text-white cursor-pointer transition-colors duration-300">
                    Continue with Google
                  </span>
                </button>

                <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 dark:text-yellow-400 font-bold cursor-pointer">
                    Register for free
                  </Link>
                </p>
              </div>

              {/* Image */}
              <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-10">
                <img src={loginGif} alt="Welcome" className="w-full max-w-md drop-shadow-2xl" />
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Login;
