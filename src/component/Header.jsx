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
  const [toolsOpen, setToolsOpen] = useState(false);

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
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover-spark hover:text-amber-500 ${
                    isActive(link.path) ? "active-link" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

        {/* Tools Dropdown */}
<li className="relative group">
  <button
    className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
      isActive("/tools") ? "bg-gray-300 dark:bg-gray-700" : ""
    }`}
  >
    Tools
    <span className="ml-1">▾</span>
  </button>

  <ul className="absolute left-0 top-full hidden group-hover:block bg-white dark:bg-gray-900 shadow-xl rounded-lg py-2 w-48 z-50 transition-all">
    <li>
      <Link
        to="/cgpacalculator"
        className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
      >
        CGPA Calculator
      </Link>
    </li>
    <li>
      <Link
        to="/healthandcalculation"
        className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
      >
        Health And Calculate
      </Link>
    </li>
    <li>
      <Link
        to="/qrandimage"
        className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 rounded-md transition"
      >
        QR And Image
      </Link>
    </li>
  </ul>
</li>


            {/* Contact last */}
            <li>
              <Link
                to="/contact"
                className={`hover-spark ${
                  isActive("/contact")
                    ? "active-link"
                    : "hover-spark hover:text-amber-500"
                }`}
              >
                Contact
              </Link>
            </li>

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

      {/* Dark background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[2500]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer -- ONLY ANIMATION CHANGED */}
      <div
        className={`fixed top-0 left-0 h-full w-full transform transition-transform duration-300 ease-in-out z-[2600] ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={navimg} alt="Logo" className="h-20 w-auto" />
          </Link>
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-center">
          {[
            { name: "Home", path: "/" },
            { name: "Billing", path: "/billing" },
            { name: "Identity", path: "/identity" },
            { name: "Portal", path: "/idcard" },
            { name: "IdCard", path: "/idcardpage" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={
                  isActive(link.path)
                    ? "active-link"
                    : "hover-spark hover:text-amber-500"
                }
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Tools dropdown */}
          <li className="flex flex-col items-center">
            <button
              onClick={() => setToolsOpen((prev) => !prev)}
              className="flex items-center gap-2 hover-spark hover:text-amber-500"
            >
              Tools <span>{toolsOpen ? "▴" : "▾"}</span>
            </button>

            {toolsOpen && (
              <ul className="flex flex-col gap-3 mt-2">
                <li>
                  <Link
                    to="/cgpacalculator"
                    className="hover-spark hover:text-amber-500"
                    onClick={() => setOpen(false)}
                  >
                    CGPA Calculattor
                  </Link>
                </li>

                <li>
                  <Link
                    to="/healthandcalculation"
                    className="hover-spark hover:text-amber-500"
                    onClick={() => setOpen(false)}
                  >
                    HealthAndCalculate
                  </Link>
                </li>

                <li>
                  <Link
                    to="/qrandimage"
                    className="hover-spark hover:text-amber-500"
                    onClick={() => setOpen(false)}
                  >
                    QrAndImage
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Contact */}
          <li>
            <Link
              to="/contact"
              className={
                isActive("/contact")
                  ? "active-link"
                  : "hover-spark hover:text-amber-500"
              }
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>

          {currentUser && (
            <li>
              <Link
                to="/account"
                className={isActive("/account") ? "active-link" : ""}
                onClick={() => setOpen(false)}
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
                  setTimeout(() => setOpen(false), 800);
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
