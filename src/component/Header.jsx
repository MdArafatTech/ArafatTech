import React, { useState, useEffect } from "react";
import { Link, Links } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import navimg from "../assets/iconpng.gif";
import { useAuth } from "../provider/AuthProvider";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="sticky top-0 bg-black text-white shadow-md z-[3000]">
      <div className="flex items-center justify-between px-[5%] py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={navimg} alt="Logo" className="h-25 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-5 font-medium">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/billing" className="hover:text-yellow-400 transition">
                Billing
              </Link>
            </li>

            <li>
              <Link to="/identity" className="hover:text-yellow-400 transition">
                Identity
              </Link>
            </li>

            <li>
            <Link to="/idcard" className="hover:text-yellow-400 transition" onClick={() => setOpen(false)}>
              Portal
            </Link>
          </li>
          <li>
            <Link to="/idcardpage" className="hover:text-yellow-400 transition" onClick={() => setOpen(false)}>
             IdCard
            </Link>
          </li>

            {/* Show only Account when logged in */}
            {currentUser && (
              <li>
                <Link to="/account" className="hover:text-yellow-400 transition">
                  Account
                </Link>
              </li>
            )}
          </ul>

          {/* Show Login ONLY when logged out */}
          {!currentUser && (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[2500]"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black text-white transform transition-transform duration-300 z-[2600] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Link to="/"><img src={navimg} alt="Logo" className="h-20 w-auto" /></Link>
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-center">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/billing" onClick={() => setOpen(false)}>
              Billing
            </Link>
          </li>

          <li>
            <Link to="/identity" onClick={() => setOpen(false)}>
              Identity
            </Link>
          </li>

          <li>
            <Link to="/idcard" onClick={() => setOpen(false)}>
              Portal
            </Link>
          </li>
          <li>
            <Link to="/idcardpage" onClick={() => setOpen(false)}>
             IdCard
            </Link>
          </li>

          {/* Only Account when logged in */}
          {currentUser && (
            <li>
              <Link to="/account" onClick={() => setOpen(false)}>
                Account
              </Link>
            </li>
          )}

          {/* Only Login when not logged in */}
          {!currentUser && (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="py-3 rounded-lg border"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
