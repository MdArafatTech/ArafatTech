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
      desc: "Create digital identity forms with QR codes, images, and detailed info for employees, students, or members.",
      img: service1,
      link: "/identity",
    },
    {
      title: "Id Card Generation",
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

  const testimonials = [
    {
      name: "Rahim Ahmed",
      position: "School Principal",
      text: "Arafat-Tech provided an exceptional student management and ID card system that saved us hours every week.",
    },
    {
      name: "Sofia Khan",
      position: "HR Manager",
      text: "The billing and identity solutions are highly professional and easy to use. Excellent customer support!",
    },
    {
      name: "Tanvir Hossain",
      position: "Software Engineer",
      text: "Premium solutions with smooth UI/UX. Everything from ID cards to automated billing is top-notch.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-900 transition-colors duration-700">
      {/* Top Section: Name and Buttons */}
      <section className="w-full flex flex-col items-center text-center max-w-6xl p-6 md:p-12 mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-6 tracking-wide">
          Welcome to Arafat-Tech Ltd
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
          Your trusted partner for innovative technology solutions in education
          and business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Contact Us
          </Link>
          <Link
            to="/services"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* Bottom Section: Image and Clock */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center max-w-6xl p-2 md:p-12 mx-auto gap-8">
        <div className="flex flex-col items-center justify-center mt-6 md:mt-0">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-600 mb-1 tracking-wide">
            Current Time All Over World
          </h2>

          <Clock />
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImg}
            alt="Hero Animation"
            className="w-full h-80 lg:h-128 max-w-md rounded-xl shadow-xl object-cover"
          />
        </div>
      </section>

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
        <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mb-4">
          Arafat-Tech Ltd is a technology-driven company providing smart
          solutions for educational institutions and businesses. We specialize
          in:
        </p>
        <ul className="text-gray-700 dark:text-gray-300 text-lg md:text-xl list-disc list-inside space-y-2">
          <li>Identity management and digital forms</li>
          <li>Dynamic ID card and PDF generation</li>
          <li>Automated billing systems with discounts and VAT</li>
          <li>Student portals and reporting systems</li>
          <li>Health calculators and scientific tools</li>
        </ul>
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

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="max-w-6xl mx-auto p-6 md:p-12 mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8 text-center">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.text}"
              </p>
              <h4 className="font-bold text-orange-600">{testimonial.name}</h4>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {testimonial.position}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-5xl mx-auto p-6 mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
          Ready to start your project?
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-lg md:text-xl">
          Get in touch with us today to explore our premium solutions for your
          business or institution.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Contact Us
          </Link>
          <Link
            to="/services"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Explore Services
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
