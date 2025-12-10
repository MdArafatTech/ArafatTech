import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);

    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || !formData.number) {
      setStatus("Please fill all fields.");
      return;
    }

    emailjs
      .send(
        "service_fel2b38", // Your EmailJS service ID
        "template_2nb2qvj", // Your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_number: formData.number,
          message: formData.message,
        },
        "-dm5gWB-Fz--QlTIN" // Your EmailJS public key
      )
      .then(
        (response) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", number: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 4000);
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send message. Please try again.");
          setTimeout(() => setStatus(""), 4000);
        }
      );
  };

  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-16 rounded-xl shadow-lg transition-colors duration-500 ${
        darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-300 text-gray-900"
      }`}
    >
      <div className="max-w-xl mx-auto p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase text-center mb-8 tracking-wide">
          Contact Me
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 w-full transition-all ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-red-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-red-500"
            }`}
            required
          />

          <input
            type="tel"
            name="number"
            placeholder="📱 Phone Number"
            value={formData.number}
            onChange={handleChange}
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 w-full transition-all ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-red-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-red-500"
            }`}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📩 Your Email"
            value={formData.email}
            onChange={handleChange}
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 w-full transition-all ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-red-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-red-500"
            }`}
            required
          />

          <textarea
            name="message"
            placeholder="✉️ Your Message"
            value={formData.message}
            onChange={handleChange}
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 w-full transition-all ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-red-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-red-500"
            }`}
            rows="6"
            required
          />

          <button
            type="submit"
            className={`py-4 rounded-lg cursor-pointer font-semibold transition-all w-full ${
              darkMode
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Send Message
          </button>

          {status && (
            <p
              className={`text-center mt-2 font-medium transition-colors ${
                status.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
