// // IDCardPage.jsx - Professional Navigation Hub
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import idCardGif from "../assets/idcardgif.gif";
// import { motion } from "framer-motion";

// export default function IDCardPage() {
//   const [mounted, setMounted] = useState(false);

//   // Automatically follow system theme (light/dark)
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = () => {
//       document.documentElement.classList.toggle("dark", mediaQuery.matches);
//     };

//     handleChange(); // Initial check
//     mediaQuery.addEventListener("change", handleChange);
//     setMounted(true);

//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//         <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
//           Loading...
//         </p>
//       </div>
//     );
//   }

//   return (



//     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-700">
//       <div className="max-w-7xl mx-auto">
//         {/* Professional Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16 lg:mb-20"
//         >
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
//             ID Card Generator
//           </h1>
//           <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Create professional, customizable identification cards for students,
//             employees, and personal use with modern design and instant PDF
//             export.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           {/* Preview & Features Section */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="order-2 lg:order-1"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-600 dark:to-indigo-600 blur-3xl opacity-30 -z-10"></div>
//               <img
//                 src={idCardGif}
//                 alt="ID Card Preview Animation"
//                 className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl border-8 border-white dark:border-gray-700"
//               />
//             </div>

//             <div className="mt-10 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
//                 Powerful Features
//               </h3>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">✅</span>
//                   <span className="font-medium">QR Code Integration</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">🎨</span>
//                   <span className="font-medium">Full Color Customization</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">📄</span>
//                   <span className="font-medium">Instant PDF Export</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">🖼️</span>
//                   <span className="font-medium">Logo & Watermark Support</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">📱</span>
//                   <span className="font-medium">Fully Responsive Design</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <span className="text-2xl">🔒</span>
//                   <span className="font-medium">Barcode & Secure Data</span>
//                 </li>
//               </ul>
//             </div>
//           </motion.div>

//           {/* Navigation Cards */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="order-1 lg:order-2"
//           >
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center lg:text-left">
//               Choose Your ID Type
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">






//  {/* Student ID */}
//               <Link
//                 to="/studentidcard"
//                 className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
//                 <div className="p-10 text-center relative z-10">
//                   <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                     <span className="text-5xl">🎓</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
//                     Student ID
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Official academic identification cards
//                   </p>
//                 </div>
//               </Link>


















             

//               {/* Smart ID */}
//               <Link
//                 to="/smartid"
//                 className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
//                 <div className="p-10 text-center relative z-10">
//                   <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                     <span className="text-5xl">🧠</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
//                     Smart ID
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Advanced digital identity with smart features
//                   </p>
//                 </div>
//               </Link>

             

//               {/* Employee ID */}
//               <Link
//                 to="/employee"
//                 className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
//                 <div className="p-10 text-center relative z-10">
//                   <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                     <span className="text-5xl">💼</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
//                     Employee ID
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Professional corporate employee badges
//                   </p>
//                 </div>
//               </Link>


//  {/* Personal ID */}
//               <Link
//                 to="/personalidcard"
//                 className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
//                 <div className="p-10 text-center relative z-10">
//                   <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                     <span className="text-5xl">🆔</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//                     Personal ID
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Custom identification for personal and freelance use
//                   </p>
//                 </div>
//               </Link>



//             </div>
//           </motion.div>
//         </div>

//         {/* Footer Note */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="text-center text-gray-600 dark:text-gray-400 mt-20 text-lg"
//         >
//           Select an ID type above to begin creating your professional
//           identification card
//         </motion.p>
//       </div>
//     </div>


//   );
// }




























// IDCardPage.jsx - COMPLETE BLOCK FOR UNAUTHENTICATED USERS
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import idCardGif from "../assets/idcardgif.gif";
import { motion } from "framer-motion";
import LoginModal from "../component/LoginModal";

export default function IDCardPage() {
  const [mounted, setMounted] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // BLOCK ACCESS - Redirect if not logged in
  useEffect(() => {
    if (mounted && !currentUser) {
      setShowModal(true); // Show modal first
    }
  }, [currentUser, mounted]);

  // System theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      document.documentElement.classList.toggle("dark", mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    setMounted(true);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  // **COMPLETE BLOCK** - Unauthenticated users CANNOT see content
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-4">
        <LoginModal 
          onClose={() => {
            setShowModal(false);
            navigate("/", { replace: true }); // Force redirect to home
          }}
          onSignIn={() => {
            setShowModal(false);
            navigate("/login", { replace: true }); // Force redirect to login
          }}
        />
      </div>
    );
  }

  // ONLY AUTHENTICATED USERS SEE THIS CONTENT
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-700">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            ID Card Generator
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create professional, customizable identification cards for students,
            employees, and personal use with modern design and instant PDF export.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Preview & Features Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-600 dark:to-indigo-600 blur-3xl opacity-30 -z-10"></div>
              <img
                src={idCardGif}
                alt="ID Card Preview Animation"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl border-8 border-white dark:border-gray-700"
              />
            </div>

            <div className="mt-10 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Powerful Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><span className="text-2xl">✅</span><span className="font-medium">QR Code Integration</span></li>
                <li className="flex items-center gap-3"><span className="text-2xl">🎨</span><span className="font-medium">Full Color Customization</span></li>
                <li className="flex items-center gap-3"><span className="text-2xl">📄</span><span className="font-medium">Instant PDF Export</span></li>
                <li className="flex items-center gap-3"><span className="text-2xl">🖼️</span><span className="font-medium">Logo & Watermark Support</span></li>
                <li className="flex items-center gap-3"><span className="text-2xl">📱</span><span className="font-medium">Fully Responsive Design</span></li>
                <li className="flex items-center gap-3"><span className="text-2xl">🔒</span><span className="font-medium">Barcode & Secure Data</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center lg:text-left">
              Choose Your ID Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Student ID */}
              <Link to="/studentidcard" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="p-10 text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-5xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Student ID</h3>
                  <p className="text-gray-600 dark:text-gray-400">Official academic identification cards</p>
                </div>
              </Link>

              {/* Smart ID */}
              <Link to="/smartid" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="p-10 text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-5xl">🧠</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Smart ID</h3>
                  <p className="text-gray-600 dark:text-gray-400">Advanced digital identity with smart features</p>
                </div>
              </Link>

              {/* Employee ID */}
              <Link to="/employee" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="p-10 text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-5xl">💼</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Employee ID</h3>
                  <p className="text-gray-600 dark:text-gray-400">Professional corporate employee badges</p>
                </div>
              </Link>

              {/* Personal ID */}
              <Link to="/personalidcard" className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="p-10 text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-5xl">🆔</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Personal ID</h3>
                  <p className="text-gray-600 dark:text-gray-400">Custom identification for personal and freelance use</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-gray-600 dark:text-gray-400 mt-20 text-lg"
        >
          Select an ID type above to begin creating your professional identification card
        </motion.p>
      </div>
    </div>
  );
}

