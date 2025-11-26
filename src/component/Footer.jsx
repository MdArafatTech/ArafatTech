import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import fimg from "../assets/iconpng.gif";
import { FaGithub } from 'react-icons/fa';

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer bg-black text-white  w-full  bottom-0 p-8 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 place-items-center  ">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2   font-medium items-center md:items-start">
        <a className="hover:text-amber-300" href="/">
          Home
        </a>
        <a className="hover:text-amber-300" href="/billing">
         Billing
        </a>
        <a className="hover:text-amber-300" href="/identity">
          Identity
        </a>
        <a className="hover:text-amber-300" href="/pdf">
          Pdf
        </a>
        <a className="hover:text-amber-300" href="/contact">
         Contact
        </a>
       
      </nav>

      {/* Social Section */}
      <div className="flex flex-col items-center gap-3 mt-4 md:mt-0">
        <h1 className="font-bold text-xl">Social</h1>
        <div className="flex gap-3">
          <a
               href="https://github.com/MdArafatTech/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-500 text-xl rounded-full text-white hover:scale-110 transition-transform"
          >
             <FaGithub />
          </a>
          <a
                href="mailto:mdalarafatabir@gmail.com"
            className="p-2 bg-red-500 text-xl rounded-full text-white hover:scale-110 transition-transform"
          >
            <MdEmail />
          </a>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center mt-4 md:mt-0">
       <a href="/"> <img className="h-40 cursor-pointer" src={fimg} alt="Footer Logo" /></a>
      </div>

      <Link
        to="https://github.com/MdArafatTech"
        className=" bottom-0  left-0 my-3"
      >
        <h1 className="font-bold  italic text-center items-center">
          Designed By ArafatTECH
        </h1>
      </Link>
    </footer>
  );
};

export default Footer;
