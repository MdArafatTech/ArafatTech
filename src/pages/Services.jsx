import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import service1 from "../assets/iconpng.gif";
import service2 from "../assets/iconpng.gif";
import service3 from "../assets/iconpng.gif";


import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import LoginModal from "../component/LoginModal";

const Services = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // BLOCK ACCESS - Unauthenticated users cannot proceed
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-4">
        <LoginModal 
          onClose={() => {
            navigate("/", { replace: true }); // Redirect to home
          }}
          onSignIn={() => {
            navigate("/login", { replace: true }); // Redirect to login
          }}
        />
      </div>
    );
  }




























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
      title: "Student ID Card",
      desc: "Customizable student ID cards with photo, QR code, academic details, and institutional branding.",
      img: service3,
      link: "/studentidcard",
    },
    {
      title: "Smart ID Card",
      desc: "Advanced smart ID cards with NFC, RFID, biometric integration, and real-time verification.",
      img: service1,
      link: "/smartid",
    },
    {
      title: "Employee ID Card",
      desc: "Professional employee ID cards with access control, photo ID, department info, and security features.",
      img: service2,
      link: "/employee",
    },
    {
      title: "Personal ID Card",
      desc: "Personalized ID cards for individuals, events, members with custom designs and digital features.",
      img: service3,
      link: "/personalidcard",
    },
    {
      title: "Billing System",
      desc: "Automated billing with discounts, VAT, warranty options, and instant PDF generation for smooth operations.",
      img: service1,
      link: "/billing",
    },
    {
      title: "QR Code Generator",
      desc: "Create custom QR codes instantly for links, text, WiFi, contacts, and more. Add logos, colors, and download in high quality.",
      img: service2,
      link: "/qrandimage",
    },
    {
      title: "Health & Calculation",
      desc: "Digital BMI, unit converters, scientific calculators, and email-enabled health tracking.",
      img: service3,
      link: "/healthandcalculation",
    },
    {
      title: "CGPA Calculator",
      desc: "Easily calculate CGPA for any academic year with detailed breakdowns.",
      img: service1,
      link: "/cgpacalculator",
    },
    {
      title: "Student Portal",
      desc: "Complete student management portal with ID generation, attendance, grades, and academic tools.",
      img: service2,
      link: "/studentportal",
    },
    {
  title: "Useful Tools",
  desc: "Premium collection of calculators, generators, converters & productivity tools with password manager, QR codes, and utilities.",
  img: service2, // or your tools icon/image
  link: "/usefulltools",
},

  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/50 dark:to-slate-900 overflow-x-hidden overflow-y-auto">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-500/90 dark:to-pink-600/90 backdrop-blur-sm shadow-2xl shadow-orange-500/25 mb-8 w-full max-w-sm mx-auto">
          <span className="text-sm font-semibold text-white tracking-wide">🚀 Premium Solutions</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 dark:from-white dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 leading-tight w-full max-w-4xl mx-auto px-2">
          Our Services
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm px-2 w-full">
          Premium solutions crafted for <span className="font-semibold bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-400 dark:to-pink-500 bg-clip-text text-transparent">institutions</span>,{" "}
          <span className="font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">businesses</span>, and{" "}
          <span className="font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 bg-clip-text text-transparent">individuals</span>.
        </p>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group w-full max-w-full"
            >
              <Link to={service.link} className="block h-full w-full">
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center h-full border border-white/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group-hover:bg-white/95 dark:group-hover:bg-slate-800/95 min-h-[340px] sm:min-h-[380px] w-full max-w-full">
                  
                  {/* Icon with glow effect */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-24 h-24 sm:w-30 sm:h-30 lg:w-36 lg:h-36 mb-6 sm:mb-8 p-2 sm:p-4 bg-gradient-to-br from-orange-500 to-pink-600 dark:from-orange-400 dark:to-pink-500 rounded-2xl shadow-2xl shadow-orange-500/40 group-hover:shadow-orange-500/60 flex-shrink-0 mx-auto"
                  >
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-contain filter invert group-hover:brightness-100 transition-all duration-300"
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-300 line-clamp-2 px-2 w-full text-center">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-10 flex-1 line-clamp-3 px-2 w-full text-center">
                    {service.desc}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 cursor-pointer sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 backdrop-blur-sm border border-emerald-400/30 hover:scale-105 w-full sm:w-auto flex-shrink-0"
                  >
                    <span>Explore →</span>
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 text-center overflow-hidden">
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-20 border border-white/40 dark:border-slate-700/50 shadow-2xl w-full max-w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 flex-shrink-0">
            <span className="text-xl sm:text-2xl">✨</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-orange-600 to-pink-600 dark:from-white dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight px-2 w-full max-w-3xl mx-auto">
            Ready to Transform?
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 w-full">
            Join thousands of satisfied customers using our premium solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link
              to="/contact"
              className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-pink-600 dark:from-orange-600 dark:to-pink-700 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-orange-400/30 w-full sm:w-auto max-w-md mx-auto sm:mx-0 flex-shrink-0"
            >
              <span className="flex items-center justify-center">
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
      </section>
    </div>
  );
};

export default Services;