import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import fimg from "../assets/arafattech.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Billing", path: "/billing" },
    { name: "Identity", path: "/identity" },
    { name: "Student Portal", path: "/studentportal" },
    { name: "ID Card", path: "/idcardpage" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/MdArafatTech/",
      color: "from-slate-900 via-indigo-500 to-purple-600",
      label: "GitHub"
    },
    {
      icon: MdEmail,
      href: "mailto:mdalarafatabir@gmail.com",
      color: "from-rose-500 via-pink-500 to-red-600",
      label: "Email"
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/mdarafattech",
      color: "from-blue-500 via-cyan-500 to-blue-700",
      label: "LinkedIn"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8
      }
    }
  };

  return (
    <footer className={`w-full pt-20 pb-8 px-6 md:px-12 lg:px-24 overflow-hidden transition-all duration-1000 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white" 
        : "bg-gradient-to-br from-slate-50 via-white to-gray-50 text-slate-900"
    }`}>
      {/* Floating Particles Background */}
     

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section - Logo → Quick Links → Contact (Perfect Order) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16"
        >
          {/* 1st: Brand & Logo */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className="mb-8 block">
                <motion.img 
                  src={fimg} 
                  alt="ArafatTECH" 
                  className="h-30 w-auto drop-shadow-2xl filter"
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: [0, -2, 0],
                    filter: darkMode ? "drop-shadow([0_0_20px_rgba(251,146,60,0.5)])" : "drop-shadow([0_0_25px_rgba(251,146,60,0.6)])"
                  }}
                  transition={{ 
                    rotate: { duration: 0.4 },
                    filter: { duration: 0.3 }
                  }}
                />
              </Link>
            </motion.div>
            <motion.p 
              className={`text-sm md:text-md lg:text-md leading-relaxed max-w-xs  ${
                darkMode ? "text-slate-200 drop-shadow-sm" : "text-slate-800"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Building innovative web solutions with cutting-edge technology. 
              Your trusted partner for digital transformation.
            </motion.p>
          </motion.div>

          {/* 2nd: Quick Links */}
 <motion.div variants={itemVariants} className="order-2">
  <motion.h3 
    className={`text-xl font-black mb-6 flex items-center justify-center lg:justify-start gap-2 tracking-tight text-transparent bg-clip-text ${
      darkMode 
        ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" 
        : "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
    }`}
    whileHover={{
      scale: 1.02,
      textShadow: "0 0 20px rgba(251, 146, 60, 0.5)"
    }}
  >
    Quick Links
    <motion.div 
      className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </motion.h3>
  <nav className="grid grid-cols-2 gap-2 max-w-xs mx-auto lg:mx-0 px-2 sm:px-0">
    {navLinks.map((link, idx) => (
      <motion.div key={link.path}>
        <Link
          to={link.path}
          className={`group relative block py-2 px-3 text-sm lg:text-base font-bold transition-all duration-300 hover:scale-[1.03] text-center lg:text-left overflow-hidden rounded-xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 hover:border-amber-400/50 ${
            darkMode 
              ? "text-slate-300 hover:text-slate-100 hover:drop-shadow-lg hover:bg-slate-700/50" 
              : "text-slate-700 hover:text-slate-900 hover:drop-shadow-md hover:bg-amber-50/80"
          }`}
          whileHover={{
            scale: 1.03,
            rotateX: 5,
            rotateY: 5,
            boxShadow: darkMode 
              ? "0 20px 40px rgba(251, 146, 60, 0.3), 0 0 0 1px rgba(251, 146, 60, 0.2)" 
              : "0 25px 50px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.3)"
          }}
          whileTap={{
            scale: 0.96,
            rotateX: 0,
            rotateY: 0,
            backgroundColor: darkMode ? "#1e293b" : "#fef3c7"
          }}
          whileFocusVisible={{
            outline: "none",
            boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.4)"
          }}
        >
          {/* 3D Card Tilt Background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-400/10 to-amber-500/10 rounded-xl -z-10"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ 
              rotateX: [0, 2, 0],
              rotateY: [0, 2, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Ripple Effect Container */}
          <motion.div 
            className="absolute inset-0 rounded-xl overflow-hidden"
            initial={false}
          >
            <AnimatePresence>
              <motion.span 
                className="absolute bg-gradient-to-r from-amber-400/40 to-orange-500/40 rounded-full blur-xl"
                initial={{ 
                  scale: 0, 
                  opacity: 1,
                  x: "50%",
                  y: "50%"
                }}
                animate={{ 
                  scale: 20, 
                  opacity: [1, 0],
                  x: "0%",
                  y: "0%"
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut"
                }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Floating Shine */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-y-3"
            initial={{ scaleX: 0, x: "-100%" }}
            whileHover={{ scaleX: 1, x: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Link Text */}
          <span className="relative z-10 flex items-center justify-center lg:justify-start">
            {link.name}
            {/* Magic Icon Appear */}
            <motion.div
              className="w-0 h-0 overflow-hidden ml-2 inline-block"
              initial={{ width: 0 }}
              whileHover={{ width: 20 }}
              transition={{ duration: 0.3 }}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </span>

          {/* Multi-layered Underline */}
          <motion.span 
            className="absolute bottom-2 left-50% lg:left-0 -translate-x-1/2 lg:translate-x-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full blur-sm"
            initial={{ width: 0, scaleX: 0 }}
            whileHover={{ width: "90%", scaleX: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <span className="absolute bottom-0 left-50% lg:left-0 -translate-x-1/2 lg:translate-x-0 w-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full shadow-lg" 
                style={{ boxShadow: "0 5px 15px rgba(251, 146, 60, 0.4)" }}
          />
        </Link>
      </motion.div>
    ))}
  </nav>
</motion.div>



          {/* 3rd: Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-end text-center lg:text-right order-3">
            <motion.h3 
              className={`text-xl font-black mb-10 flex items-center gap-3 tracking-tight text-transparent bg-clip-text ${
                darkMode 
                  ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" 
                  : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
              }`}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(34, 197, 94, 0.5)"
              }}
            >
              Get In Touch
              <motion.div 
                className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
            </motion.h3>
            
            <div className="space-y-4 max-w-sm w-full">
              {[
                {
                  icon: MdEmail,
                  text: "mdalarafatabir@gmail.com",
                  href: "mailto:mdalarafatabir@gmail.com",
                  color: darkMode ? "text-emerald-400" : "text-emerald-500"
                },
                {
                  icon: MdLocationOn,
                  text: "Dhamoirhat, Rajshahi, Bangladesh",
                  href: "/contact",
                  color: darkMode ? "text-blue-400" : "text-blue-500"
                }
              ].map(({ icon: Icon, text, href, color }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  className={`flex items-center justify-center lg:justify-end gap-4 p-6 rounded-2xl transition-all group backdrop-blur-xl border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-amber-500/15 w-full relative overflow-hidden ${
                    darkMode 
                      ? "bg-slate-800/60 hover:bg-slate-700/80" 
                      : "bg-white/90 hover:bg-slate-50 shadow-lg"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: darkMode 
                      ? "0 20px 40px rgba(251, 146, 60, 0.2)" 
                      : "0 25px 50px rgba(251, 146, 60, 0.25)"
                  }}
                >
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className={`text-base font-bold transition-all group-hover:font-black text-center lg:text-right ${
                    darkMode ? "text-slate-200 hover:text-emerald-300" : "text-slate-800 hover:text-emerald-600"
                  }`}>
                    {text}
                  </span>
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-xl -z-10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Gradient Divider */}
        <motion.div
          className={`h-px my-16 backdrop-blur-xl relative overflow-hidden ${
            darkMode 
              ? "bg-gradient-to-r from-slate-700 via-slate-600 to-transparent" 
              : "bg-gradient-to-r from-slate-200 via-slate-300 to-transparent"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-emerald-400/30 h-full"
            animate={{ 
              x: ["0%", "100%", "0%"],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>

       {/* Social Links & Copyright - Mobile: Links First, Then Text */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
  className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-12"
>
  {/* Social Links - Mobile First (order-1), Desktop Second (lg:order-2) */}
  <motion.div 
    className="flex items-center justify-center lg:justify-start gap-4 order-1 lg:order-2 w-full lg:w-auto"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {socialLinks.map(({ icon: Icon, href, color }, idx) => (
      <motion.a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative p-4 rounded-3xl text-white shadow-2xl backdrop-blur-xl border border-white/20 hover:border-amber-400/50 overflow-hidden group transition-all duration-300 ${
          darkMode 
            ? `${color} hover:shadow-amber-500/40 hover:shadow-xl hover:-translate-y-1 bg-opacity-90`
            : "bg-gradient-to-br from-white via-amber-50/80 to-orange-50/70 shadow-white/50 hover:shadow-amber-400/30 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 border-amber-200/50 hover:border-amber-400/60 backdrop-blur-2xl"
        }`}
        variants={itemVariants}
        custom={idx}
        whileHover={{
          scale: 1.15,
          y: -8,
          boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)",
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-6 h-6 relative z-10" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.a>
    ))}
  </motion.div>

  {/* Copyright - Mobile Second (order-2), Desktop First (lg:order-1) */}
  <motion.div 
    className={`text-center lg:text-left order-2 lg:order-1 w-full lg:w-auto ${
      darkMode ? "text-slate-400" : "text-slate-500"
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    <p className="font-bold text-base">
      © 2025{' '}
      <motion.a 
        href="https://github.com/MdArafatTech/" 
        target="_blank"
        className="font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 bg-clip-text text-transparent hover:shadow-lg hover:drop-shadow-2xl"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.05,
          textShadow: "0 0 25px rgba(251, 146, 60, 0.6)"
        }}
      >
        Arafat-Tech Ltd.
      </motion.a>
    </p>
    <p className="text-sm mt-2 opacity-90 font-semibold tracking-wider">
      All Rights Reserved | Crafted with ❤️ in Bangladesh
    </p>
  </motion.div>
</motion.div>

      </div>
    </footer>
  );
};

export default Footer;
