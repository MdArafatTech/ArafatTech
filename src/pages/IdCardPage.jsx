// src/pages/IDCardPage.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import IDCardGenerator from "./Pdf"; // Custom IDCardGenerator
import IDCardGenerator2 from "./Id"; // Second IDCardGenerator
import idCardGif from "../assets/idcardgif.gif"; // GIF asset

const MotionLink = motion(Link); // motion + Link wrapper

export default function IDCardPage() {
  const [showCustom, setShowCustom] = useState(false);
  const [showCustom2, setShowCustom2] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Landing / Simple Card Section */}
      <AnimatePresence>
        {!showCustom && !showCustom2 && (
          <motion.div
            key="landing"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-6 gap-6 w-full max-w-5xl grid lg:grid-cols-2 sm:grid-cols-1 items-center"
          >
            {/* GIF Section */}
            <motion.div className="flex items-center justify-center w-full h-full">
  <motion.img
    src={idCardGif}
    alt="ID Card GIF"
    className="w-[80%] h-70 rounded-xl shadow-lg"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
  />
</motion.div>


            {/* Text & Buttons Section */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-blue-700 text-center animate-pulse">
                Welcome to ID Card Generator
              </h2>
              <p className="text-gray-600 text-center">
                Create professional ID cards easily with QR codes, personal details, and a signature. Click below to start designing your own custom ID card!
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-col lg:flex-row gap-3 w-full mt-4 justify-center">
                <motion.button
                  onClick={() => setShowCustom(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 w-full lg:w-auto"
                >
                  Simple Id Card
                </motion.button>

                <motion.button
                  onClick={() => setShowCustom2(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-purple-600 w-full lg:w-auto"
                >
                  Custom ID Card 
                </motion.button>

              
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom ID Card Generator Section */}
      <AnimatePresence>
        {showCustom && (
          <motion.div
            key="custom"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full max-w-5xl mt-6 bg-white rounded-2xl shadow-2xl p-6 relative"
          >
            {/* Cancel button */}
            <div className="flex justify-end">
              <motion.button
                onClick={() => setShowCustom(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-600 hover:text-red-800 text-2xl"
              >
                <FaTimes />
              </motion.button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2"
            >
              <IDCardGenerator />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom ID Card Generator 2 Section */}
      <AnimatePresence>
        {showCustom2 && (
          <motion.div
            key="custom2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full max-w-5xl mt-6 bg-white rounded-2xl shadow-2xl p-6 relative"
          >
            {/* Cancel button */}
            <div className="flex justify-end">
              <motion.button
                onClick={() => setShowCustom2(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-600 hover:text-red-800 text-2xl"
              >
                <FaTimes />
              </motion.button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2"
            >
              <IDCardGenerator2 />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
