// // src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
// import navimg from "../assets/arafattech.png";
// import { useAuth } from "../provider/AuthProvider";
// import LoginButton from "../component/LoginButton";

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const { currentUser } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);

//   // Detect system preference
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (e) => setDarkMode(e.matches);

//     setDarkMode(mediaQuery.matches);
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   // Lock body scroll when mobile menu open
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//   }, [open]);

//   return (
//     <header
//       className={`sticky top-0 shadow-md z-[3000] transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
//       }`}
//     >
//       <div className="flex items-center justify-between px-[5%] py-3">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={navimg} alt="Logo" className="h-20 w-auto" />
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden lg:flex items-center gap-6">
//           <ul className="flex gap-5 font-medium items-center">
//             <li>
//               <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
//             </li>
//             <li>
//               <Link to="/billing" className="hover:text-yellow-400 transition">Billing</Link>
//             </li>
//             <li>
//               <Link to="/identity" className="hover:text-yellow-400 transition">Identity</Link>
//             </li>
//             <li>
//               <Link to="/idcard" className="hover:text-yellow-400 transition">Portal</Link>
//             </li>
//             <li>
//               <Link to="/idcardpage" className="hover:text-yellow-400 transition">IdCard</Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
//             </li>
//             {currentUser && (
//               <li>
//                 <Link to="/account"  className="btn btn-accent bg-red-500 text-white rounded-2xl hover:bg-white hover:text-red-500" onClick>Account</Link>
//               </li>
//             )}
//             {!currentUser && (
//               <li>
//                 <Link
//   to="/login"

// >
//  <LoginButton></LoginButton>
// </Link>
//               </li>
//             )}
//             {/* Icon showing current system mode */}
            
//           </ul>
//         </nav>

//         {/* Mobile Menu Icon */}
//         <button className="lg:hidden text-2xl cursor-pointer" onClick={() => setOpen(true)}>
//           <FaBars />
//         </button>
//       </div>

//       {/* Mobile Overlay */}
//       {open && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-[2500]" onClick={() => setOpen(false)}></div>
//       )}

//       {/* Mobile Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-300 z-[2600] ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
//       >
//         <div className="flex justify-between items-center p-4 border-b border-gray-700">
//           <Link to="/">
//             <img src={navimg} alt="Logo" className="h-20 w-auto" />
//           </Link>
//           <FaTimes className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
//         </div>

//         <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-center">
//           <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
//           <li><Link to="/billing" onClick={() => setOpen(false)}>Billing</Link></li>
//           <li><Link to="/identity" onClick={() => setOpen(false)}>Identity</Link></li>
//           <li><Link to="/idcard" onClick={() => setOpen(false)}>Portal</Link></li>
//           <li><Link to="/idcardpage" onClick={() => setOpen(false)}>IdCard</Link></li>
//           <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
//           {currentUser && <li><Link to="/account" className="btn btn-accent bg-red-500 text-white rounded-2xl hover:bg-white hover:text-red-500" onClick={() => setOpen(false)}>Account</Link></li>}
// {!currentUser && (
// <li>
//   <Link
//     to="/login"
//     onClick={() => {
//       // Close drawer before navigating
//       setTimeout(() => setOpen(false), 700); // Adjust timeout to match animation duration
//     }}
//   >
//     <LoginButton />
//   </Link>
// </li>

// )}

        
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Header;









import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import navimg from "../assets/arafattech.png";
import { useAuth } from "../provider/AuthProvider";
import LoginButton from "../component/LoginButton";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 shadow-md z-[3000] transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-[5%] py-3 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={navimg} alt="Logo" className="h-20 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-5 font-medium items-center relative">
            {[
              { name: "Home", path: "/" },
              { name: "Billing", path: "/billing" },
              { name: "Identity", path: "/identity" },
              { name: "Portal", path: "/idcard" },
              { name: "IdCard", path: "/idcardpage" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
<Link
    to={link.path}
    className={`hover-spark ${isActive(link.path) ? "active-link" : ""}`}
  >
    {link.name}
  </Link>
              </li>
            ))}

            {currentUser && (
              <li>
                <Link
                  to="/account"
                  className={`btn btn-accent bg-red-500 text-white rounded-2xl hover:bg-white hover:text-red-500 ${
                    isActive("/account") ? "active-link" : ""
                  }`}
                >
                  Account
                </Link>
              </li>
            )}
            {!currentUser && (
              <li>
                <Link to="/login">
                  <LoginButton />
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay after opening mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[2500]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-300 z-[2600] ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Link to="/">
            <img src={navimg} alt="Logo" className="h-20 w-auto" />
          </Link>
          <FaTimes className="text-2xl cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-center">
          {[
            { name: "Home", path: "/" },
            { name: "Billing", path: "/billing" },
            { name: "Identity", path: "/identity" },
            { name: "Portal", path: "/idcard" },
            { name: "IdCard", path: "/idcardpage" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path) ? "active-link" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {currentUser && (
            <li>
              <Link
                to="/account"
                className={isActive("/account") ? "active-link" : ""}
              >
                Account
              </Link>
            </li>
          )}
         {!currentUser && (
<li>
  <Link
    to="/login"
    onClick={() => {
      // Close drawer before navigating
      setTimeout(() => setOpen(false), 750); // Adjust timeout to match animation duration
    }}
  >
    <LoginButton />
  </Link>
</li>

)}
        </ul>
      </div>
    </header>
  );
};

export default Header;





















