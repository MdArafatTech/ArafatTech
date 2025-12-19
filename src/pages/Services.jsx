import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import service1 from "../assets/iconpng.gif";
import service2 from "../assets/iconpng.gif";
import service3 from "../assets/iconpng.gif";

const Services = () => {
  const services = [
    {
      title: "Identity Management",
      desc: "Create digital identity forms with QR codes, images, and detailed info for employees, students, or members.",
      img: service1,
      link: "/identity",
    },
    {
      title: "ID Card Generation",
      desc: "Generate dynamic ID cards for individuals and organizations with professional designs and printable PDFs.",
      img: service2,
      link: "/idcardpage",
    },
    {
      title: "Billing System",
      desc: "Automated billing with discounts, VAT, warranty options, and instant PDF generation for smooth operations.",
      img: service3,
      link: "/billing",
    },
    {
      title: "QR Code Generator",
      desc: "Create custom QR codes instantly for links, text, WiFi, contacts, and more. Add logos, colors, and download in high quality.",
      img: service1,
      link: "/qrandimage",
    },
    {
      title: "Health & Calculation",
      desc: "Digital BMI, unit converters, scientific calculators, and email-enabled health tracking.",
      img: service2,
      link: "/healthandcalculation",
    },
    {
      title: "CGPA Calculator",
      desc: "Easily calculate CGPA for any academic year with detailed breakdowns.",
      img: service3,
      link: "/cgpacalculator",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/50 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full flex flex-col items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-500/90 dark:to-pink-600/90 backdrop-blur-sm shadow-2xl shadow-orange-500/25 mb-8"
        >
          <span className="text-sm font-semibold text-white tracking-wide">🚀 Premium Solutions</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 dark:from-white dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
          Our Services
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm">
          Premium solutions crafted for <span className="font-semibold bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-400 dark:to-pink-500 bg-clip-text text-transparent">institutions</span>,{" "}
          <span className="font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">businesses</span>, and{" "}
          <span className="font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 bg-clip-text text-transparent">individuals</span>.
        </p>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link to={service.link} className="block h-full">
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 flex flex-col items-center text-center h-full border border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group-hover:bg-white/95 dark:group-hover:bg-slate-800/95">
                  
                  {/* Icon with glow effect */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative w-24 h-24 lg:w-28 lg:h-28 mb-8 p-4 bg-gradient-to-br from-orange-500 to-pink-600 dark:from-orange-400 dark:to-pink-500 rounded-2xl shadow-2xl shadow-orange-500/40 group-hover:shadow-orange-500/60"
                  >
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-100 transition-all duration-300"
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 group-hover:scale-105 transition-transform duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 flex-1">
                    {service.desc}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 backdrop-blur-sm border border-emerald-400/30 hover:scale-105"
                  >
                    <span>Explore →</span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="inline-block ml-2"
                    />
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Premium CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center"
      >
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-12 lg:p-20 border border-white/40 dark:border-slate-700/50 shadow-2xl">
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40"
          >
            <span className="text-2xl">✨</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-orange-600 to-pink-600 dark:from-white dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-8 leading-tight">
            Ready to Transform?
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers using our premium solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-600 dark:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-orange-400/30"
            >
              <span className="flex items-center">
                  Get In Touch
                <motion.span 
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  className="ml-3"
                >
                  →
                </motion.span>
              </span>
            </Link>
           
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
