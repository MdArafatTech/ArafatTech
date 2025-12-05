


'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import carimg from '../assets/logincar123 .png';

const m = motion;

export default function HeaderLoginButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleLogin = () => {
    if (isClicked) return;
    setIsClicked(true);

    setTimeout(() => {
      console.log("Redirecting to Login Page...");
      // window.location.href = "/login";
      setIsClicked(false);
      setIsHovered(false);
    }, 2200);
  };

  return (
    <m.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isClicked && setIsHovered(false)}
      onClick={handleLogin}
      disabled={isClicked}
      className={`
        relative overflow-hidden rounded-full 
        p-[3px] shadow-2xl transition-all duration-500
        ${isHovered && !isClicked ? 'scale-100 shadow-purple-500/80' : 'scale-100'}
        ${isClicked ? 'cursor-wait' : 'cursor-pointer'}
        h-12 w-35 sm:w-40 md:w-44
      `}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >

      {/* BORDER SWEEP */}
      <div className="border-sweep2 absolute inset-0 rounded-full"></div>

      {/* INNER BUTTON */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-black/95 backdrop-blur-xl px-8 border-2 border-transparent">

        {/* TEXT */}
        <m.span
          className="absolute z-20 font-medium tracking-wider text-white text-sm sm:text-base"
          animate={{
            opacity: isHovered || isClicked ? 0 : 1,
            y: isHovered || isClicked ? -8 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          Login
        </m.span>

        {/* Hover Car */}
        {isHovered && !isClicked && (
          <m.div
            initial={{ x: -90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="absolute left-5 sm:left-6"
          >
            <img
              src={carimg}
              alt="Car"
              className="h-9 w-auto md:h-10 drop-shadow-2xl"
              style={{
                filter:
                  'hue-rotate(270deg) brightness(1.4) saturate(1.1) drop-shadow(0 0 20px #a855f7)',
              }}
            />
          </m.div>
        )}

        {/* Click Car Animation */}
        {isClicked && (
          <m.div
            initial={{ x: -140 }}
            animate={{ x: 180 }}
            transition={{
              duration: 3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
          >
            <img
              src={carimg}
              alt="Car Driving"
              className="h-11 w-auto md:h-12 drop-shadow-2xl"
              style={{
                filter:
                  'drop-shadow(0 0 30px #a855f7) drop-shadow(0 0 50px #d946ef)',
              }}
            />
          </m.div>
        )}

        {/* Shine Sweep */}
        <m.div
          className="pointer-events-none absolute inset-0 -left-full h-full w-full 
                     bg-gradient-to-r from-transparent via-white/40 to-transparent 
                     -skew-x-12 blur-md"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: isHovered ? 1.5 : 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </m.button>
  );
}
