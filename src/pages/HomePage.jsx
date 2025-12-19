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
  title: "QR Code Generator",
  desc: "Create custom QR codes instantly for links, text, WiFi, contacts, and more. Add logos, colors, and download in high quality.",
  img: service1,  // Replace with your QR code icon/image import if needed
  link: "/qrandimage",  // Suggested route; change as per your app
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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-1000 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-purple-500/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent mb-8 leading-tight">
              Arafat-Tech Ltd
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
              Innovative technology solutions for education, business, and beyond – crafted with precision and passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </Link>
              <Link
                to="/services"
                className="px-10 py-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-900 dark:text-white text-xl font-bold rounded-full shadow-2xl border border-white/50 hover:border-purple-400/50 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features & Clock */}
      <section className="py-20 px-3 md:p-5 lg:p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <img
                src={heroImg}
                alt="Tech Innovation"
                className="w-full rounded-3xl shadow-2xl border-8 border-white/30 dark:border-gray-700/50 object-cover"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 to-purple-600/30 rounded-3xl blur-3xl -z-10 animate-pulse" />
            </div>
          </motion.div>





          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-5xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-8">
              Real-Time World Clock
            </h2>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl">
              <Clock />
            </div>
          </motion.div>




        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-12"
          >
            About Arafat-Tech
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-16"
          >
            We deliver cutting-edge digital solutions that empower educational institutions and businesses to thrive in the modern world.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              "Digital Identity & QR Systems",
              "Professional ID Card Generation",
              "Smart Automated Billing",
              "Complete Student Management",
              "Health & Scientific Calculators",
              "Advanced CGPA Tools",
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-gradient-to-br from-orange-50/80 to-purple-50/80 dark:from-gray-800/80 dark:to-gray-700/80 p-8 rounded-3xl shadow-xl border border-white/50 dark:border-gray-600/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="text-4xl mb-4">✦</div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-8"
          >
            Our Premium Services
          </motion.h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Innovative tools designed to streamline operations and elevate experiences
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {services.map((service, i) => (
            <Link key={i} to={service.link}>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -16, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 h-full flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="p-10 flex flex-col items-center text-center flex-1">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-purple-600 rounded-3xl p-4 mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <img src={service.img} alt={service.title} className="w-full h-full object-contain rounded-2xl" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 flex-1">{service.desc}</p>
                  <span className="text-purple-600 font-bold text-lg group-hover:text-purple-500 flex items-center gap-2">
                    Explore → 
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-br from-purple-50/50 via-transparent to-orange-50/50 dark:from-gray-900/50">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-8"
          >
            Client Testimonials
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-purple-600/5" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl text-white">“</span>
                </div>
                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-8">"{t.text}"</p>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">{t.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-emerald-500/10" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-12"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
          >
            Let's build something amazing together. Contact us today for a free consultation.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              to="/contact"
              className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-2 transition-all duration-500"
            >
              Start Your Project
            </Link>
            <Link
              to="/services"
              className="px-12 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white text-2xl font-bold rounded-full shadow-2xl border-2 border-white/50 hover:border-purple-500/50 transition-all duration-500"
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