// // src/components/LoginModal.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../provider/AuthProvider";
// import { motion, AnimatePresence } from "framer-motion";

// const LoginModal = () => {
//   const { setShowLoginModal } = useAuth();
//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     setShowLoginModal(false);
//     navigate("/login");
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xl px-4">
//         {/* Backdrop glow effect */}
//         <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-pink-600/10 to-purple-600/10 blur-3xl" />

//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, y: 40 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.85, y: 40 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden max-w-md w-full"
//         >
//           {/* Premium top gradient bar */}
//           <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

//           <div className="p-10 sm:p-12 text-center">
//             {/* Icon with glow */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl ring-8 ring-orange-500/20"
//             >
//               <span className="text-5xl">🔒</span>
//             </motion.div>

//             {/* Title */}
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4"
//             >
//               Access Restricted
//             </motion.h2>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-sm mx-auto"
//             >
//               Sign in to unlock premium tools, exclusive features, and personalized experience.
//             </motion.p>

//             {/* Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="space-y-4"
//             >
//               {/* Primary Sign In Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSignInClick}
//                 className="w-full cursor-pointer py-5 px-8 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
//               >
//                 <span>Sign In</span>
//                 <motion.span
//                   className="inline-block"
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ repeat: Infinity, duration: 1.5 }}
//                 >
//                   →
//                 </motion.span>
//               </motion.button>

//               {/* Cancel Button */}
//               <motion.button
//                 whileHover={{ scale: 1.03, backgroundColor: "rgba(156, 163, 175, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setShowLoginModal(false)}
//                 className="w-full cursor-pointer py-5 px-8 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 font-semibold text-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-300"
//               >
//                 Maybe Later
//               </motion.button>
//             </motion.div>

//             {/* Subtle footer text */}
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//               className="text-xs text-gray-500 dark:text-gray-500 mt-8"
//             >
//               Your data is secure • No spam • Instant access
//             </motion.p>
//           </div>

//           {/* Bottom glow effect */}
//           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default LoginModal;



















import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoginModal = ({ onClose, onSignIn }) => {
  const handleSignInClick = () => {
    if (onSignIn) onSignIn();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xl px-4">
        {/* Backdrop glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-pink-600/10 to-purple-600/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden max-w-md w-full"
        >
          {/* Premium top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

          {/* Close Button (✕) */}
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-3 right-2 z-50 group"
            aria-label="Close modal"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden transition-all duration-700 hover:scale-120">
              {/* Deep space glass background */}
              <div className="absolute inset-0 " />
              
              {/* Cosmic nebula glow layers */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-transparent to-cyan-500 opacity-90" />
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-800 via-pink-700 to-transparent blur-2xl scale-0 group-hover:scale-100 transition-transform duration-1000" />

              {/* Floating inner orb with soft pulse */}
              <div className="absolute inset-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-inner" />
              
              {/* Animated glowing ring on hover */}
              <div className="absolute inset-0 rounded-full ring-4 ring-transparent group-hover:ring-purple-500 transition-all duration-700" />
              
              {/* Subtle star-like sparkle */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400/70 rounded-full blur-sm scale-0 group-hover:scale-100 transition-transform duration-700 delay-200" />

              {/* Premium Cross Icon – sleek, glowing, animated */}
              <svg
                className="absolute inset-0 m-auto w-7 h-7 text-white/70 transition-all duration-500 group-hover:text-white group-hover:rotate-180 group-hover:scale-110 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                  className="drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-all duration-500"
                />
              </svg>

              {/* Final hover ripple – ethereal wave */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 scale-0 group-hover:scale-200 transition-transform duration-1000 origin-center" />
            </div>

            {/* Outer ambient glow */}
            <div className="absolute -inset-4 rounded-full bg-purple-600/10 blur-3xl scale-0 group-hover:scale-100 transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
          </button>

          <div className="p-10 sm:p-12 text-center">
            {/* Icon with glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl ring-8 ring-orange-500/20"
            >
              <span className="text-5xl">🔒</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Access Restricted
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-sm mx-auto"
            >
              Sign in to unlock this page, exclusive features, and personalized experience.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {/* Primary Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignInClick}
                className="w-full cursor-pointer py-5 px-8 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Sign In</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(156, 163, 175, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full cursor-pointer py-5 px-8 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 font-semibold text-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-300"
              >
                Maybe Later
              </motion.button>
            </motion.div>

            {/* Subtle footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-gray-500 dark:text-gray-500 mt-8"
            >
              Your data is secure • No spam • Instant access
            </motion.p>
          </div>

          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;
