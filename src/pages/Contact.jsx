import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai'; 
import img from '../assets/arafat.jpg';
import ContactForm from '../component/ContactFrom';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="px-[5%] py-16 bg-white grid sm:grid-cols-1 lg:grid-cols-2 place-items-center gap-8 text-black">
      <div>
        
        <div className="h-[4px] lg:w-full bg-red-500 mb-6"></div>

        <h1 className="font-bold text-3xl lg:text-6xl tracking-wide uppercase mb-8">
          Contact
        </h1>

        <div className="flex gap-6 mb-4">
          <a
            href="https://github.com/MdArafatTech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-3xl lg:text-5xl text-gray-800 hover:text-black hover:scale-110 transition-transform"
          >
            <FaGithub />
          </a>

          <a
            href="mailto:mdalarafatabir@gmail.com"
            aria-label="Send Email"
            className="text-3xl lg:text-5xl text-red-500 hover:text-red-600 hover:scale-110 transition-transform"
          >
            <MdEmail />
          </a>
        </div>

        <h2 className="font-bold text-xl lg:text-4xl tracking-wide uppercase mb-8">
          Rakesh Datta
        </h2>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 text-white h-12 w-40 mb-5 rounded-xl hover:bg-orange-300 hover:text-gray-700 transition-all"
          >
            Get In Touch
          </button>
        )}

        {showForm && (
          <div className="relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-0 right-0 text-black text-2xl hover:text-red-500 transition-transform"
              aria-label="Close Contact Form"
            >
              <AiOutlineClose />
            </button>
            <ContactForm />
          </div>
        )}
      </div>

      <div className="w-full h-auto">
        <img src={img} alt="Rakesh Datt" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default Contact;
