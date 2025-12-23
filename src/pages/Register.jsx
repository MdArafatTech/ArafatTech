import React, { useState } from "react";










import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import registerGif from "../assets/register.gif";
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

  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      await register(formData.email, formData.password);
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorMsg(error.message || "Registration failed. Try again.");
    }
  };

  const handleGoogleRegister = async () => {
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
    }
  };

  // Success Popup
  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Account Created!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Welcome! Your account is ready.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition"
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
        <div className="w-full max-w-5xl">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2">

              {/* Form */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Create Your Account
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Join us today — it's free and fast!
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/40 dark:to-pink-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-center">
                    <p className="text-red-800 dark:text-red-300 font-semibold">{errorMsg}</p>
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
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none transition"
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
                        placeholder="🔑 Create a strong password"
                        required
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none"
                      />
                      <button type="button" onClick={togglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        {formData.showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={formData.showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="🔑 Type password again"
                        required
                        className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-yellow-500/20 outline-none"
                      />
                      <button type="button" onClick={toggleConfirmPassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        {formData.showConfirmPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl transform hover:scale-105 transition duration-200"
                  >
                    Register
                  </button>
                </form>

                <div className="my-8 text-center text-gray-500 dark:text-gray-400">
                  or continue with
                </div>

                {/* Google Button – Fixed (the one that was broken is now fixed) */}
                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="group w-full flex items-center justify-center gap-3 py-4 
                             border-2 border-gray-300 dark:border-gray-600 rounded-xl 
                             font-semibold text-gray-700 dark:text-gray-200
                             bg-white dark:bg-gray-800
                             hover:bg-red-600 hover:border-red-600 
                             hover:text-white hover:scale-105
                             transform transition-all cursor-pointer duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  <FaGoogle className="text-2xl text-red-500 group-hover:text-white transition-colors" />
                  <span>Sign up with Google</span>
                </button>

                <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 cursor-pointer dark:text-yellow-400 font-bold ">
                    Log in here
                  </Link>
                </p>
              </div>

              {/* Right Side – Image */}
              <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-10">
                <img
                  src={registerGif}
                  alt="Register"
                  className="w-full max-w-md drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;















