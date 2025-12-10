import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaHandPointDown,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import img from "../assets/abirprofile.png";
import ContactForm from "../component/ContactFrom";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div
      className={`min-h-screen px-4 sm:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* ---------------- LEFT SECTION ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-start space-y-8 max-w-xl w-full"
      >
        {/* Name */}
        <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left">
          Md Al Arafat
        </h1>

        {/* Bio */}
        <p className="text-gray-700 dark:text-gray-300 text-center lg:text-left">
          I am a Full-Stack Web Developer specializing in React, Node.js and
          modern web technologies. I build responsive, professional websites and
          applications with smooth UI/UX.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-2 px-3 py-1 bg-blue-200 dark:bg-blue-700 rounded-full">
            <FaReact /> React
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-yellow-200 dark:bg-yellow-600 rounded-full">
            <FaJs /> JavaScript
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-red-200 dark:bg-red-700 rounded-full">
            <FaHtml5 /> HTML
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-blue-200 dark:bg-blue-700 rounded-full">
            <FaCss3Alt /> CSS
          </span>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Email */}
          <a
            href="mailto:mdalarafatabir@gmail.com"
            className={`flex items-center gap-3 p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <MdEmail className="text-red-500 text-2xl" />
            <span>mdalarafatabir@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+8801303180712"
            className={`flex items-center gap-3 p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaPhoneAlt className="text-green-500 text-xl" />
            <span>+880 1303180712</span>
          </a>

          {/* Location */}
          <a
            href="https://www.google.com/maps/place/24°21'48.3%22N+88°35'50.8%22E"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <MdLocationOn className="text-blue-500 text-2xl" />
            <span>Rajshahi, Bangladesh</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/MdArafatTech/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaGithub className="text-gray-700 dark:text-gray-300 text-2xl" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Get In Touch */}
    <div className="w-full relative flex flex-col justify-center items-center">
  {!showForm && (
    <>
      {/* Hand Icon Animated Above Button */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="mb-2 text-4xl text-orange-500 "
      >
        <FaHandPointDown />
      </motion.div>

      {/* Get In Touch Button */}
      <motion.button
        onClick={() => setShowForm(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-12 w-48 cursor-pointer rounded-xl font-semibold  mx-auto ${
          darkMode
            ? "bg-orange-500 text-white"
            : "bg-orange-600 text-white"
        }`}
      >
        Get In Touch
      </motion.button>
    </>
  )}

  {showForm && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mt-4 w-full"
    >
      <button
        onClick={() => setShowForm(false)}
        className={`absolute top-7 cursor-pointer right-7 font-bold text-4xl ${
          darkMode ? "text-gray-300" : "text-black"
        }`}
      >
        <AiOutlineClose />
      </button>

      <ContactForm />
    </motion.div>
  )}
</div>

      </motion.div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full gap-8"
      >
        {/* Profile Image */}
        <img
          src={img}
          alt="Arafat Tech"
          className="w-full max-w-sm rounded-xl shadow-xl object-cover"
        />

        {/* Google Map */}
       <div className="w-full h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg">
  <iframe
    title="Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.770164962802!2d88.597449!3d24.363426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDIxJzQ4LjMiTiA4OMKwMzUnNTAuOCJF!5e0!3m2!1sen!2sbd!4v1702229999999!5m2!1sen!2sbd"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen=""
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      </motion.div>
    </div>
  );
};

export default Contact;
