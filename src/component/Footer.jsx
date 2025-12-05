import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import fimg from "../assets/arafattech.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    // Listen for changes in system preference
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <footer
      className={`footer w-full bottom-0 p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Logo */}
      <div className="sm:order-1 order-1 flex justify-center">
        <Link to="/">
          <img className="h-30 cursor-pointer" src={fimg} alt="Footer Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="sm:order-2 order-2 flex flex-col gap-2 font-medium items-center sm:items-start">
        <Link to="/" className="hover:text-amber-300 transition">
          Home
        </Link>
        <Link to="/billing" className="hover:text-amber-300 transition">
          Billing
        </Link>
        <Link to="/identity" className="hover:text-amber-300 transition">
          Identity
        </Link>
        <Link to="/idcard" className="hover:text-amber-300 transition">
          Portal
        </Link>
        <Link to="/idcardpage" className="hover:text-amber-300 transition">
          IdCard
        </Link>
        <Link to="/contact" className="hover:text-amber-300 transition">
          Contact
        </Link>
      </nav>

      {/* Social Section */}
      <div className="sm:order-3 order-3 flex flex-col items-center gap-3 mt-4 sm:mt-0">
        <h1 className="font-bold text-xl">Social</h1>
        <div className="flex gap-3">
          <a
            href="https://github.com/MdArafatTech/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-500 text-xl rounded-full text-white hover:scale-110 transition-transform"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:mdalarafatabir@gmail.com"
            className="p-2 bg-red-500 text-xl rounded-full text-white hover:scale-110 transition-transform"
          >
            <MdEmail />
          </a>
        </div>
      </div>

      {/* Powered by ArafatTECH */}
      <div className="col-span-1 sm:col-span-3 order-4 mt-6 text-center">
        <p className="font-bold italic">
          <a href="https://github.com/MdArafatTech/">Powered by ArafatTECH</a>
        </p>
      </div>

      {/* Copyright Notice */}
      <div className="col-span-1 sm:col-span-3 order-5 mt-2 text-center text-sm text-gray-400">
        © 2025 Arafat-Tech Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
