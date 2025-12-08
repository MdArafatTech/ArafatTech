import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/tech.gif";
import service1 from "../assets/iconpng.gif";
import service2 from "../assets/iconpng.gif";
import service3 from "../assets/iconpng.gif";
import Clock from "../component/Clock";

const HomePage = () => {
  const services = [
    {
      title: "Identity Management",
      desc: "Create digital identity forms with QR codes, images, and detailed info.",
      img: service1,
      link: "/identity",
    },
    {
      title: "Id Card Generation",
      desc: "Generate dynamic ID card for personal and employee and idcard.",
      img: service2,
      link: "/idcardpage",
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
      title: "Health & Calculation",
      desc: "Digital BMI calculation with send data by email,scientific calculation,unit converter.",
      img: service2,
      link: "/healthandcalculation",
    },
    {
      title: "CGPA Calculator",
      desc: "Calculate your CGPA .",
      img: service3,
      link: "/cgpacalculator"
    },
  ];

  return (
    <div className="min-h-screen w-full -mb-12 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-900 transition-colors duration-700">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col md:flex-row items-center justify-between max-w-6xl p-6 md:p-12 mx-auto"
      >
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-6">
            Welcome to Arafat-Tech Ltd
          </h1>
          <div className="-mt-5 -mb-30 lg:-mt-9">
            <Clock />
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={heroImg}
            alt="Hero Animation"
            className="w-full h-80 lg:h-128 mt-37 max-w-md rounded-xl shadow-lg"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-5xl mx-auto p-6 md:p-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
          About Arafat-Tech
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl">
          Arafat-Tech Ltd is a technology-driven company providing smart
          solutions for educational institutions and businesses. From identity
          management to PDF generation and automated billing, we make processes
          simple and efficient.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-6xl mx-auto p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {services.map((service, index) => (
          <Link key={index} to={service.link} className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center h-full transition-transform hover:scale-105"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-20 h-20 mb-4 object-cover rounded-full"
              />
              <h3 className="text-xl font-bold text-orange-600 mb-2">
                {service.title}
              </h3>
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
        className="max-w-5xl mx-auto p-6 mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
          Ready to start?
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-lg md:text-xl">
          Get in touch with us today and explore our solutions for your business
          or institution.
        </p>
        <Link
          to="/contact"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
        >
          Contact Us
        </Link>
      </motion.section>
    </div>
  );
};

export default HomePage;
