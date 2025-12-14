import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-all duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 lg:mb-8 leading-tight">
              Welcome to
              <br className="sm:hidden" />
              <span className="block">Arafat-Tech Ltd</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed">
              Your trusted partner for innovative technology solutions in education and business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link
                to="/contact"
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <span>Contact Us</span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              </Link>
              <Link
                to="/services"
                className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-orange-500/50 transition-all duration-300 flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-gray-700/50"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
      </section>

      {/* Features & Clock Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <h2 className="text-2xl text-center md:text-3xl lg:text-5xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-3">
              Current Time
              <br />
              All Over World
            </h2>
            <div>
              <Clock />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative lg:order-1"
          >
            <div className="relative z-10">
              <img
                src={heroImg}
                alt="Hero Animation"
                className="w-full max-w-md lg:max-w-lg h-80 lg:h-96 xl:h-[28rem] rounded-3xl shadow-2xl object-cover border-4 border-white/50 dark:border-gray-700/50"
              />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8"
          >
            About Arafat-Tech
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Arafat-Tech Ltd is a technology-driven company providing smart solutions for educational institutions and businesses.
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              "Identity management and digital forms",
              "Dynamic ID card and PDF generation",
              "Automated billing systems with discounts and VAT",
              "Student portals and reporting systems",
              "Health calculators and scientific tools",
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">{feature}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your business with our cutting-edge technology solutions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="block group">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/50 dark:border-gray-700/50 hover:border-orange-500/30 group-hover:bg-white dark:group-hover:bg-gray-800 transition-all duration-500 h-full flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-16 h-16 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <motion.div
                    className="mt-6 text-orange-600 font-bold text-lg group-hover:text-orange-500 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Learn More →
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Trusted by industry leaders and educational institutions worldwide
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 hover:shadow-orange-500/25 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-black text-2xl text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <span className="text-orange-600 font-semibold text-lg">{testimonial.position}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/5 to-orange-500/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8"
          >
            Ready to Transform
            <br />
            Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get in touch with us today to explore our premium solutions for your business or institution.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-green-500/50 transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 bg-white/20 backdrop-blur-xl"
            >
              <span>Start Your Project</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/services"
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-gray-900 dark:text-white px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-2xl border-2 border-white/50 hover:border-orange-500/50 transition-all duration-500 flex items-center gap-3"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
