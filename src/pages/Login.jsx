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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      alert("Login successful!");
      navigate("/account");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("You are not registered! Please register first.");
        navigate("/register");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password!");
      } else {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Login successful!");
      navigate("/account");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
 <div className="flex flex-col gap-6 max-w-3xl sm:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 mt-5 p-10
    transition-all duration-300 
    bg-white text-black 
    dark:bg-[#0f0f0f] dark:text-white">


      <div className="overflow-hidden border rounded-lg shadow-lg 
        bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700">

        <div className="grid md:grid-cols-2 gap-0">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 flex flex-col gap-6 dark:text-white"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold dark:text-gray-300">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="border rounded px-3 py-2 
                bg-white dark:bg-[#2a2a2a] 
                border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-yellow-400 
                text-black dark:text-white"
              />
            </div>

            {/* Password with eye icon */}
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className="font-semibold dark:text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="border rounded px-3 py-2 w-full 
                bg-white dark:bg-[#2a2a2a]
                border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-yellow-400
                text-black dark:text-white"
              />

              <span
                className="absolute right-3 top-4 transform -translate-y-1/2 cursor-pointer 
                text-gray-600 dark:text-gray-300"
                onClick={() =>
                  setFormData({
                    ...formData,
                    showPassword: !formData.showPassword,
                  })
                }
              >
                {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="text-right">
              <Link
                to="/forgotpass"
                className="text-blue-600 dark:text-yellow-400 font-bold text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-600 dark:bg-yellow-500 
              text-white dark:text-black 
              px-4 py-2 rounded-xl cursor-pointer 
              hover:bg-blue-700 dark:hover:bg-yellow-400 transition"
            >
              Login
            </button>

            <div className="text-center text-gray-400 dark:text-gray-500 my-2">
              Or continue with
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center border 
              border-gray-300 dark:border-gray-600
              rounded-xl p-2 gap-2 cursor-pointer 
              hover:bg-blue-500 dark:hover:bg-yellow-500 
              hover:text-white dark:hover:text-black 
              transition bg-white dark:bg-[#2a2a2a]"
            >
              <FaGoogle className="text-red-500 dark:text-red-400 w-5 h-5" />
              <span>Login with Google</span>
            </button>

            <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold dark:text-yellow-400 ">
                Register
              </Link>
            </div>
          </form>

          {/* Right Image */}
          <div className="w-full md:flex-1 h-full flex items-center justify-center bg-gray-100 dark:bg-[#111]">
  <img
    src={loginGif}
    alt="Login Animation"
    className="w-full h-full "
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;



