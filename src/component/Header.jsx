import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import navimg from "../assets/arafattech.png";
import { useAuth } from "../provider/AuthProvider";
import LoginButton from "../component/LoginButton";
import { motion } from "framer-motion";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header Spacer - Automatically pushes content below header */}
      <div className="h-24 lg:h-28 fixed top-0 left-0 right-0  invisible z-0" />
      
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 shadow-md z-[3000] transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between px-[5%] py-3 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={navimg} alt="Logo" className="h-20 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-5 font-medium items-center relative">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Billing", path: "/billing" },
                { name: "Identity", path: "/identity" },
                { name: "Portal", path: "/studentportal" },
                { name: "IdCard", path: "/idcardpage" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`hover-spark hover:text-amber-500 ${
                      isActive(link.path) ? "active-link" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Tools Dropdown */}
              <li className="relative group">
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
                    isActive("/tools") ? "bg-gray-300 dark:bg-gray-700" : ""
                  }`}
                >
                  Tools
                  <span className="ml-1">▾</span>
                </button>

                <ul className="absolute left-0 top-full hidden group-hover:block bg-white dark:bg-gray-900 shadow-xl rounded-lg py-2 w-48 z-50 transition-all">
                  <li>
                    <Link
                      to="/cgpacalculator"
                      className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
                    >
                      CGPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/healthandcalculation"
                      className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
                    >
                      Health And Calculate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/qrandimage"
                      className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
                    >
                      QR Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/usefulltools"
                      className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
                    >
                    Useful Tools
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className={`hover-spark ${
                    isActive("/contact")
                      ? "active-link"
                      : "hover:text-amber-500"
                  }`}
                >
                  Contact
                </Link>
              </li>

              {currentUser && (
                <li>
                  <Link to="/account">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                        boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)"
                      }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      className={`group relative ${
                        isActive("/account") 
                          ? "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500" 
                          : darkMode 
                            ? "bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-700 text-white"
                            : "bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-100 text-indigo-900"
                      } px-3 py-2 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-white/50 backdrop-blur-xl transition-all duration-500 overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30 -skew-x-12 transform translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                      <span className="relative z-10 cursor-pointer flex items-center justify-center gap-3 tracking-wide">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Account
                        <div className="w-2 h-2 bg-white/80 rounded-full group-hover:animate-ping" />
                      </span>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white/70 rounded-full group-hover:w-20 group-hover:animate-pulse transition-all duration-500" />
                    </motion.button>
                  </Link>
                </li>
              )}

              {!currentUser && (
                <li>
                  <Link to="/login">
                    <LoginButton />
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-2xl cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile overlay and drawer - unchanged */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-[2500]"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-300 ease-in-out z-[2600] ${
            open ? "translate-x-0" : "-translate-x-full"
          } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          {/* Mobile drawer content - unchanged */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src={navimg} alt="Logo" className="h-20 w-auto" />
            </Link>
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-center">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Billing", path: "/billing" },
              { name: "Identity", path: "/identity" },
              { name: "Portal", path: "/studentportal" },
              { name: "IdCard", path: "/idcardpage" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={
                    isActive(link.path)
                      ? "active-link"
                      : "hover-spark hover:text-amber-500"
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="flex flex-col items-center">
              <button
                onClick={() => setToolsOpen((prev) => !prev)}
                className="flex items-center gap-2 hover-spark hover:text-amber-500"
              >
                Tools <span>{toolsOpen ? "▴" : "▾"}</span>
              </button>
              {toolsOpen && (
                <ul className="flex flex-col gap-3 mt-2">
                  <li>
                    <Link
                      to="/cgpacalculator"
                      className="hover-spark hover:text-amber-500"
                      onClick={() => setOpen(false)}
                    >
                      CGPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/healthandcalculation"
                      className="hover-spark hover:text-amber-500"
                      onClick={() => setOpen(false)}
                    >
                      Health And Calculate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/qrandimage"
                      className="hover-spark hover:text-amber-500"
                      onClick={() => setOpen(false)}
                    >
                      QR Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/usefulltools"
                     className="hover-spark hover:text-amber-500"
                      onClick={() => setOpen(false)}
                    >
                    Useful Tools
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/contact"
                className={
                  isActive("/contact")
                    ? "active-link"
                    : "hover-spark hover:text-amber-500"
                }
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </li>

            {currentUser && (
              <li>
                <Link
                  onClick={() => setOpen(false)}
                to="/account">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.5)"
                    }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    className={`group relative ${
                      isActive("/account") 
                        ? "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500" 
                        : darkMode 
                          ? "bg-gradient-to-r from-indigo-900 via-purple-700 to-pink-700 text-white"
                          : "bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-100 text-indigo-900"
                    } px-3 py-2 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-white/50 backdrop-blur-xl transition-all duration-500 overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30 -skew-x-12 transform translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                    <span className="relative z-10 cursor-pointer flex items-center justify-center gap-3 tracking-wide">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Account
                      <div className="w-2 h-2 bg-white/80 rounded-full group-hover:animate-ping" />
                    </span>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white/70 rounded-full group-hover:w-20 group-hover:animate-pulse transition-all duration-500" />
                  </motion.button>
                </Link>
              </li>
            )}

            {!currentUser && (
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    setTimeout(() => setOpen(false), 800);
                  }}
                >
                  <LoginButton />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
