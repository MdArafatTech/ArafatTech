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
      title: "Student Portal",
      desc: "Manage student info, view profiles, track attendance, and generate reports efficiently.",
      img: service1,
      link: "/idcard",
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-900 transition-colors duration-700">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col items-center justify-center max-w-6xl p-6 md:p-12 mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-4">
          Our Services
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-3xl">
          Explore our premium solutions designed for educational institutions, businesses, and individuals. Each service is crafted to simplify your workflow and enhance productivity.
        </p>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
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
              <h3 className="text-xl font-bold text-orange-600 mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.desc}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
              >
                Learn More
              </motion.button>
            </motion.div>
          </Link>
        ))}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-5xl mx-auto p-6 mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
          Want to get started?
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-lg md:text-xl">
          Contact us today to explore our solutions for your business or educational institution.
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

export default Services;
