import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/tech.gif"; // Optional hero GIF
import service1 from "../assets/iconpng.gif";
import service2 from "../assets/iconpng.gif";
import service3 from "../assets/iconpng.gif";

const HomePage = () => {
  // Services with links
  const services = [
    {
      title: "Identity Management",
      desc: "Create digital identity forms with QR codes, images, and detailed info.",
      img: service1,
      link: "/identity",
    },
    {
      title: "PDF Generation",
      desc: "Generate dynamic PDFs for students, billing, and identity forms.",
      img: service2,
      link: "/pdf",
    },
    {
      title: "Billing System",
      desc: "Automated billing with discounts, VAT, warranty, and PDF export.",
      img: service3,
      link: "/billing",
    },
    {
      title: "Student Portal",
      desc: "Manage student info, view profiles, and generate reports easily.",
      img: service1,
      link: "/idcard",
    },
    {
      title: "Secure Authentication",
      desc: "Google sign-in, email/password registration, and secure login.",
      img: service2,
      link: "/",
    },
    {
      title: "Custom Solutions",
      desc: "Tailored software solutions for educational and tech-based needs.",
      img: service3,
      link: "/",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col md:flex-row items-center justify-between max-w-6xl p-6 md:p-12"
      >
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            Welcome to Arafat-Tech Ltd
          </h1>
          <p className="text-gray-700 dark:text-gray-800 mb-6 text-lg md:text-xl">
            We provide technology solutions for identity, billing, and PDF automation.
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Get in Touch
          </Link>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src={heroImg}
            alt="Hero Animation"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-5xl p-6 md:p-12 text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-4">About Arafat-Tech</h2>
        <p className="text-gray-700 dark:text-gray-800 text-lg md:text-xl">
          Arafat-Tech Ltd is a technology-driven company providing smart solutions
          for educational institutions and businesses. From identity management
          to PDF generation and automated billing, we make processes simple and efficient.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="w-full max-w-6xl p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {services.map((service, index) => (
          <Link key={index} to={service.link} className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center h-full"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-15 h-15 mb-4 object-cover rounded-full"
              />
              <h3 className="text-xl font-bold text-orange-600 mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.desc}</p>
            </motion.div>
          </Link>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="w-full p-6 mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-4">Ready to start?</h2>
        <p className="text-gray-700 dark:text-gray-800 mb-6">
          Get in touch with us today and explore our solutions for your business or institution.
        </p>
        <Link
          to="/contact"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Contact Us
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-6 text-center">
        © 2025 Arafat-Tech Ltd. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;
