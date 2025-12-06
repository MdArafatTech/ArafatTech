// import React, { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     number: "",
//     email: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("");

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate fields
//     if (!formData.name || !formData.email || !formData.message || !formData.number) {
//       setStatus("Please fill all fields.");
//       return;
//     }

//     // Simulate sending message
//     setStatus("Message sent successfully!");
//     setFormData({ name: "", number: "", email: "", message: "" });

//     // Hide message after 3 seconds
//     setTimeout(() => setStatus(""), 3000);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-16 bg-white text-black">
//       <div className="max-w-xl mx-auto bg-red-400 rounded-lg p-6 sm:p-8">
//         <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center mb-6">
//           Contact Us
//         </h1>

//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//             required
//           />

//           <input
//             type="tel"
//             name="number"
//             placeholder="Phone Number"
//             value={formData.number}
//             onChange={handleChange}
//             className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//             required
//           />

//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
//             rows="6"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-red-500 cursor-pointer hover:bg-red-600 text-black hover:text-white font-bold py-3 rounded transition-all w-full"
//           >
//             Send Message
//           </button>

//           {status && <p className="mt-2 text-center text-green-500">{status}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;











import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.name || !formData.email || !formData.message || !formData.number) {
      setStatus("Please fill all fields.");
      return;
    }

    // Send email using EmailJS
    emailjs
      .send(
        "service_fel2b38",   // Replace with your EmailJS service ID
        "template_2nb2qvj",  // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_number: formData.number,
          message: formData.message,
        },
        "-dm5gWB-Fz--QlTIN"    // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", number: "", email: "", message: "" });
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send message. Please try again.");
          setTimeout(() => setStatus(""), 3000);
        }
      );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-white text-black">
      <div className="max-w-xl mx-auto bg-red-400 rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl lg:text-4xl font-bold uppercase text-center mb-6">
          Contact Us
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            required
          />

          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            rows="6"
            required
          />

          <button
            type="submit"
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-black hover:text-white font-bold py-3 rounded transition-all w-full"
          >
            Send Message
          </button>

          {status && <p className="mt-2 text-center text-green-500">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
