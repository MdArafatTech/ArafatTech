// IDCardPage.jsx with adjusted layout and dark/light mode
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import IDCardGenerator from "./Pdf";
import IDCardGenerator2 from "./Id";
import idCardGif from "../assets/idcardgif.gif";

const MotionLink = motion(Link);

export default function IDCardPage() {
  const [showCustom, setShowCustom] = useState(false);
  const [showCustom2, setShowCustom2] = useState(false);
  const [dark, setDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Auto-change when system theme changes
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className={
      `min-h-screen p-6 flex flex-col items-center transition-all duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`
    }>

      {/* Dark/Light Toggle */}
      {/* <div className="w-full flex justify-end max-w-5xl mb-4">
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-xl shadow bg-blue-600 text-white hover:bg-blue-700"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div> */}

      {/* Landing Section */}
      <AnimatePresence>
        {!showCustom && !showCustom2 && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl shadow-2xl p-6 gap-6 w-full max-w-5xl grid lg:grid-cols-2 sm:grid-cols-1 items-center transition-all duration-300 ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* GIF */}
            <motion.div className="flex items-center justify-center w-full h-full">
              <motion.img
                src={idCardGif}
                alt="ID Card GIF"
                className="w-[80%] rounded-xl shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              />
            </motion.div>

            {/* Text + Buttons */}
            <motion.div
              className="flex flex-col items-center gap-4 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-blue-500 text-center">
                Welcome to ID Card Generator
              </h2>
              <p className="opacity-80 text-center">
                Create professional ID cards with QR codes & details.
              </p>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4">
                <motion.button
                  onClick={() => setShowCustom(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white py-3 rounded-xl shadow-lg hover:bg-green-600"
                >
                  Student ID Card
                </motion.button>

                <motion.button
                  onClick={() => setShowCustom2(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-500 text-white py-3 rounded-xl shadow-lg hover:bg-purple-600"
                >
                  Personal ID Card
                </motion.button>

                <MotionLink
                  to="/smartid"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white py-3 rounded-xl shadow-lg hover:bg-red-600 text-center"
                >
                  Identity Card
                </MotionLink>

                <MotionLink
                  to="/employee"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white py-3 rounded-xl shadow-lg hover:bg-blue-600 text-center"
                >
                  Employee ID
                </MotionLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Card */}
      <AnimatePresence>
        {showCustom && (
          <motion.div
            key="custom1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-5xl mt-6 rounded-2xl shadow-2xl p-6 relative ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-end">
              <button onClick={() => setShowCustom(false)} className="text-red-500 text-3xl">
                <FaTimes />
              </button>
            </div>

            <IDCardGenerator />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal Card */}
      <AnimatePresence>
        {showCustom2 && (
          <motion.div
            key="custom2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-5xl mt-6 rounded-2xl shadow-2xl p-6 relative ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-end">
              <button onClick={() => setShowCustom2(false)} className="text-red-500 text-3xl">
                <FaTimes />
              </button>
            </div>

            <IDCardGenerator2 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
