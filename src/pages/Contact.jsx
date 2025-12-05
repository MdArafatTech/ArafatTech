import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai'; 
import img from '../assets/abirprofile.png';
import ContactForm from '../component/ContactFrom';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    };

    setDarkMode(mediaQuery.matches);
    document.documentElement.classList.toggle('dark', mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`px-[5%] py-16 grid sm:grid-cols-1 lg:grid-cols-2 gap-8 place-items-center transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Left side: Contact info and form */}
      <div className="flex flex-col justify-center items-center lg:items-start max-w-lg w-full">
        <div className={`h-[4px] w-full mb-6 ${darkMode ? 'bg-red-600' : 'bg-red-500'}`}></div>
        <h1 className="font-bold text-3xl lg:text-6xl tracking-wide uppercase mb-8 text-center lg:text-left">
          Contact
        </h1>

        <div className="flex gap-6 mb-6">
          <a
            href="https://github.com/MdArafatTech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={`text-3xl lg:text-5xl hover:scale-110 transition-transform ${
              darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'
            }`}
          >
            <FaGithub />
          </a>
          <a
            href="mailto:mdalarafatabir@gmail.com"
            aria-label="Send Email"
            className={`text-3xl lg:text-5xl hover:scale-110 transition-transform ${
              darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'
            }`}
          >
            <MdEmail />
          </a>
        </div>

        <h2 className="font-bold text-xl lg:text-4xl tracking-wide uppercase mb-8 text-center lg:text-left">
          Arafat Tech
        </h2>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={`h-12 w-40 rounded-xl transition-all ${
              darkMode
                ? 'bg-orange-500 text-white hover:bg-orange-400 hover:text-gray-900'
                : 'bg-orange-600 text-white hover:bg-orange-300 hover:text-gray-700'
            }`}
          >
            Get In Touch
          </button>
        )}

        {showForm && (
          <div className="relative w-full mt-6">
            <button
              onClick={() => setShowForm(false)}
              className={`absolute top-0 right-0 text-2xl transition-transform hover:text-red-500 ${
                darkMode ? 'text-gray-300' : 'text-black'
              }`}
              aria-label="Close Contact Form"
            >
              <AiOutlineClose />
            </button>
            <ContactForm />
          </div>
        )}
      </div>

      {/* Right side: Image */}
      <div className="w-full h-auto flex justify-center lg:justify-start">
        <img
          src={img}
          alt="Arafat Tech"
          className="w-full h-auto max-w-xs lg:max-w-md object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Contact;
