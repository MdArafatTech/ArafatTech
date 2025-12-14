import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
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
    <div className={`min-h-screen px-6 lg:px-20 py-20 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100" 
        : "bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Section - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 lg:space-y-12"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className={`font-black text-4xl sm:text-5xl lg:text-6xl leading-tight ${
                darkMode 
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" 
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              }`}>
                Get In Touch
              </h1>
              <div className={`h-1 w-24 rounded-full ${
                darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}></div>
            </div>

            {/* Personal Info */}
            <div className="space-y-6">
              <div className={`p-8 rounded-3xl border shadow-xl ${
                darkMode 
                  ? "bg-gray-800/50 backdrop-blur-xl border-white/20" 
                  : "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-white/50"
              }`}>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}>
                  Md Al Arafat
                </h3>
                <p className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Full-Stack Developer specializing in modern web technologies. 
                  I create responsive, performant applications with exceptional UI/UX.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}>
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: FaReact, label: "React", color: "from-blue-500 to-blue-600" },
                    { icon: FaJs, label: "JavaScript", color: "from-yellow-500 to-yellow-600" },
                    { icon: FaHtml5, label: "HTML5", color: "from-orange-500 to-orange-600" },
                    { icon: FaCss3Alt, label: "CSS3", color: "from-emerald-500 to-emerald-600" },
                  ].map(({ icon: Icon, label, color }, idx) => (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? `bg-gradient-to-r ${color} bg-opacity-20 border-white/30` 
                          : `bg-gradient-to-r ${color} bg-opacity-10 border-gray-200/50`
                      }`}
                    >
                      <Icon className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`} />
                      {label}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: MdEmail, label: "mdalarafatabir@gmail.com", href: "mailto:mdalarafatabir@gmail.com", color: "text-red-500" },
                  { icon: FaPhoneAlt, label: "+880 1303-180712", href: "tel:+8801303180712", color: "text-emerald-600" },
                  { icon: MdLocationOn, label: "Rajshahi, Bangladesh", href: "https://www.google.com/maps/place/24°21'48.3\"N+88°35'50.8\"E", color: "text-blue-600", external: true },
                  { icon: FaGithub, label: "@MdArafatTech", href: "https://github.com/MdArafatTech/", color: "text-gray-800", external: true },
                ].map(({ icon: Icon, label, href, color, external }, idx) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={external ? "_blank" : "_self"}
                    rel={external ? "noopener noreferrer" : ""}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                      darkMode 
                        ? "bg-gray-800/50 border-white/10 hover:border-white/30 hover:bg-gray-700/70" 
                        : "bg-white/80 border-gray-200/50 hover:border-blue-200/50 hover:bg-blue-50/50 shadow-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-xl border group-hover:scale-110 transition-all duration-300 w-12 h-12 flex items-center justify-center ${
                      darkMode 
                        ? "bg-white/20 group-hover:bg-white/30 border-white/20" 
                        : "bg-blue-50/50 group-hover:bg-blue-100/70 border-blue-100/50"
                    }`}>
                      <Icon className={`${color} text-xl transition-transform`} />
                    </div>
                    <div>
                      <p className={`${darkMode ? "text-gray-100" : "text-gray-900"} font-medium group-hover:text-blue-600`}>{label}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            {!showForm && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 border-t border-gray-200/50 dark:border-white/10"
              >
                <motion.button
                  onClick={() => setShowForm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative h-14 px-8 w-full max-w-md mx-auto font-semibold rounded-2xl shadow-2xl border-2 transition-all duration-300 overflow-hidden ${
                    darkMode
                      ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-transparent hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-transparent hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-blue-500/25 hover:shadow-blue-600/40"
                  }`}
                >
                  <span className="relative cursor-pointer z-10 flex items-center justify-center gap-2">
                    <AiOutlineMail className="text-lg" />
                    Let's Talk About Your Project
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Section - Image & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 lg:space-y-12"
          >
            {/* Profile Image */}
            <div className="relative group">
              <div className={`absolute -inset-2 opacity-20 blur-xl rounded-3xl -z-10 group-hover:opacity-30 transition-all duration-500 ${
                darkMode ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" : "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
              }`}></div>
              <img
                src={img}
                alt="Md Al Arafat - Full Stack Developer"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl object-cover border-4 transition-all duration-500 border-white/30 group-hover:border-blue-200/50 group-hover:shadow-blue-500/20"
              />
            </div>

            {/* Enhanced Map */}
            <div className="relative">
              <div className={`absolute -inset-3 backdrop-blur-sm rounded-3xl -z-10 opacity-50 ${
                darkMode ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20" : "bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20"
              }`}></div>
              <div className={`relative rounded-3xl p-2 border shadow-2xl backdrop-blur-xl ${
                darkMode 
                  ? "bg-gray-800/50 border-white/20" 
                  : "bg-white/80 border-gray-200/50 shadow-white/50"
              }`}>
                <iframe
                  title="Md Al Arafat Location - Rajshahi, Bangladesh"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.770164962802!2d88.597449!3d24.363426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDIxJzQ4LjMiTiA4OMKwMzUnNTAuOCJF!5e0!3m2!1sen!2sbd!4v1702229999999!5m2!1sen!2sbd"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "20px" }}
                  loading="lazy"
                  allowFullScreen=""
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>

     {/* Improved Contact Form Modal - Mobile Responsive */}
{showForm && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[500] flex top-25 items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
    onClick={() => setShowForm(false)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 500 }}
      className={`w-full max-w-md sm:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border relative backdrop-blur-xl ${
        darkMode 
          ? "bg-gray-900/95 border-gray-700/50" 
          : "bg-white/95 border-gray-200/50 shadow-white/50"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Fixed Close Button - Mobile Responsive */}




   <button
  onClick={() => setShowForm(false)}
  className={`group absolute top-8 sm:top-6  lg:top-6 right-5 sm:-right-3 xl:right-7 p-2.5 sm:p-3 lg:p-4 cursor-pointer rounded-3xl text-lg sm:text-xl lg:text-2xl xl:text-2xl z-20 transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-white/20 backdrop-blur-md border border-white/10 hover:border-white/20 ${
    darkMode 
      ? "text-gray-300 hover:text-white bg-red-800/95 hover:bg-gray-700/95 shadow-gray-900/50" 
      : "text-gray-700 hover:text-gray-900 bg-red-500 hover:bg-white shadow-lg shadow-black/10"
  }`}
  style={{ zIndex: 30 }}
  aria-label="Close modal"
>
  <AiOutlineClose />
</button>










      <div className="text-center mb-6 sm:mb-8 pt-12 sm:pt-0">
        <h2 className={`text-2xl sm:text-3xl font-black mb-3 px-4 sm:px-0 ${
          darkMode 
            ? "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" 
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        }`}>
          Let's Connect
        </h2>
        <p className={`text-base sm:text-lg px-4 sm:px-0 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          {/* Add your subtitle here */}
        </p>
      </div>
      
      <ContactForm />
    </motion.div>
  </motion.div>
)}

      </div>
    </div>
  );
};

export default Contact;
