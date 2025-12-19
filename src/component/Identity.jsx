// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import QRCode from "qrcode";

// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
// const divisions = [
//   "Dhaka",
//   "Chittagong",
//   "Khulna",
//   "Rajshahi",
//   "Barisal",
//   "Sylhet",
//   "Rangpur",
//   "Mymensingh",
// ];
// const districts = [
//   "Dhaka",
//   "Faridpur",
//   "Gazipur",
//   "Gopalganj",
//   "Kishoreganj",
//   "Madaripur",
//   "Manikganj",
//   "Munshiganj",
//   "Narsingdi",
//   "Narayanganj",
//   "Netrokona",
//   "Shariatpur",
//   "Tangail",
//   "Chattogram",
//   "Bandarban",
//   "Brahmanbaria",
//   "Chandpur",
//   "Cox's Bazar",
//   "Feni",
//   "Khagrachhari",
//   "Lakshmipur",
//   "Noakhali",
//   "Rangamati",
//   "Khulna",
//   "Bagerhat",
//   "Chuadanga",
//   "Jashore",
//   "Jhenaidah",
//   "Kushtia",
//   "Magura",
//   "Meherpur",
//   "Narail",
//   "Satkhira",
//   "Rajshahi",
//   "Bogra",
//   "Joypurhat",
//   "Naogaon",
//   "Natore",
//   "Chapai Nawabganj",
//   "Pabna",
//   "Sirajganj",
//   "Barisal",
//   "Barguna",
//   "Bhola",
//   "Jhalokati",
//   "Patuakhali",
//   "Pirojpur",
//   "Sylhet",
//   "Habiganj",
//   "Moulvibazar",
//   "Sunamganj",
//   "Rangpur",
//   "Dinajpur",
//   "Kurigram",
//   "Lalmonirhat",
//   "Nilphamari",
//   "Panchagarh",
//   "Thakurgaon",
//   "Gaibandha",
//   "Mymensingh",
//   "Jamalpur",
//   "Netrokona",
//   "Sherpur",
// ];
// const hobbies = [
//   "Reading",
//   "Writing",
//   "Sports",
//   "Music",
//   "Traveling",
//   "Gaming",
//   "Cooking",
//   "Photography",
//   "Painting",
//   "Dancing",
//   "Singing",
//   "Hiking",
//   "Cycling",
//   "Gardening",
//   "Swimming",
//   "Yoga",
//   "Knitting",
//   "Fishing",
//   "Meditation",
// ];
// const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];

// const Identity = () => {
//   /* --------------------- AUTO THEME SYSTEM ---------------------- */
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia("(prefers-color-scheme: dark)");
//     const applyTheme = () => setDark(media.matches);
//     applyTheme();
//     media.addEventListener("change", applyTheme);
//     return () => media.removeEventListener("change", applyTheme);
//   }, []);

//   /* -------------------------------------------------------------- */

//   const [form, setForm] = useState({
//     name: "",
//     father: "",
//     mother: "",
//     dob: "",
//     age: "",
//     gender: "",
//     nationality: "",
//     religion: "",
//     marital: "",
//     blood: "",
//     hobby: "",
//     email: "",
//     phone: "",
//     passport: "",
//     website: "",
//     linkedin: "",
//     profession: "",
//     skills: "",
//     presentVillage: "",
//     presentThana: "",
//     presentDistrict: "",
//     presentDivision: "",
//     permanentVillage: "",
//     permanentThana: "",
//     permanentDistrict: "",
//     permanentDivision: "",
//     sscResult: "",
//     sscYear: "",
//     sscInstitution: "",
//     hscResult: "",
//     hscYear: "",
//     hscInstitution: "",
//     universityResult: "",
//     universityYear: "",
//     universityInstitution: "",
//   });

//   const [sameAddress, setSameAddress] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(false);
//   const [qrDataURL, setQrDataURL] = useState("");

//   useEffect(() => {
//     QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL);
//   }, [form]);

//   const handleChange = (e) => {
//     const { name, value, checked } = e.target;
//     if (name === "sameAddress") {
//       setSameAddress(checked);
//       if (checked) {
//         setForm((prev) => ({
//           ...prev,
//           permanentVillage: prev.presentVillage,
//           permanentThana: prev.presentThana,
//           permanentDistrict: prev.presentDistrict,
//           permanentDivision: prev.presentDivision,
//         }));
//       }
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//       if (
//         sameAddress &&
//         [
//           "presentVillage",
//           "presentThana",
//           "presentDistrict",
//           "presentDivision",
//         ].includes(name)
//       ) {
//         setForm((prev) => ({
//           ...prev,
//           permanentVillage: prev.presentVillage,
//           permanentThana: prev.presentThana,
//           permanentDistrict: prev.presentDistrict,
//           permanentDivision: prev.presentDivision,
//         }));
//       }
//     }
//   };

//   const handleImageChange = (e) => setImageFile(e.target.files[0]);






//   // YOUR ORIGINAL PDF FUNCTION - UNCHANGED
//   const generatePDF = async () => {
//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 30;
//     const spacing = 6;
//     const rowHeight = 21;
//     let contentY = 10;

//     doc.setFillColor(255, 249, 195);
//     doc.rect(0, 0, pageWidth, pageHeight, "F");

//     const headerHeight = 50;
//     doc.setFillColor(250, 130, 50);
//     doc.rect(0, contentY, pageWidth, headerHeight, "F");
//     doc.setFontSize(22);
//     doc.setFont(undefined, "bold");
//     doc.setTextColor("#fff");
//     doc.text("IDENTITY FORM", pageWidth / 2, contentY + 33, {
//       align: "center",
//     });
//     contentY += headerHeight + spacing;

//     const qrSize = 80;
//     const imageWidth = 100;
//     const imageHeight = 120;
//     const qrX = margin;
//     const imgX = pageWidth - margin - imageWidth;
//     const topY = contentY;

//     const getImageData = (file) =>
//       new Promise((resolve) => {
//         if (!file) return resolve(null);
//         const reader = new FileReader();
//         reader.onload = (e) => resolve(e.target.result);
//         reader.readAsDataURL(file);
//       });

//     const imageData = await getImageData(imageFile);

//     if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, topY, qrSize, qrSize);
//     if (imageData)
//       doc.addImage(imageData, "JPEG", imgX, topY, imageWidth, imageHeight);

//     contentY += Math.max(qrSize, imageHeight) + 8;

//     const drawInfoTable = (title, rows) => {
//       doc.setFillColor(250, 200, 150);
//       doc.rect(margin, contentY, pageWidth - 2 * margin, rowHeight, "F");
//       doc.setFontSize(12);
//       doc.setFont(undefined, "bold");
//       doc.setTextColor("#000");
//       doc.text(title, margin + 5, contentY + 15);
//       contentY += rowHeight;

//       const col1 = 150;
//       const col2 = pageWidth - 2 * margin - col1;

//       rows.forEach(([label, value]) => {
//         const labelLines = doc.splitTextToSize(label + ":", col1 - 10);
//         const valueLines = doc.splitTextToSize(value || "-", col2 - 10);
//         const maxLines = Math.max(labelLines.length, valueLines.length);
//         const cellHeight = maxLines * 14 + 6;

//         doc.setFillColor(245);
//         doc.rect(margin, contentY, col1, cellHeight, "F");
//         doc.rect(margin, contentY, col1, cellHeight);

//         doc.setFillColor(255);
//         doc.rect(margin + col1, contentY, col2, cellHeight, "F");
//         doc.rect(margin + col1, contentY, col2, cellHeight);

//         doc.setFont(undefined, "bold");
//         doc.setTextColor("#333");
//         doc.setFontSize(11);
//         doc.text(labelLines, margin + 5, contentY + 14);

//         doc.setFont(undefined, "normal");
//         doc.setTextColor("#000");
//         doc.text(valueLines, margin + col1 + 5, contentY + 14);

//         contentY += cellHeight;
//       });
//       contentY += spacing;
//     };

//     const drawAddressTables = () => {
//       const tableWidth = (pageWidth - 2 * margin - 20) / 2;
//       const gap = 20;
//       const col1 = 80;
//       const col2 = tableWidth - col1;

//       const rows = [
//         ["Village", form.presentVillage, form.permanentVillage],
//         ["Thana", form.presentThana, form.permanentThana],
//         ["District", form.presentDistrict, form.permanentDistrict],
//         ["Division", form.presentDivision, form.permanentDivision],
//       ];

//       doc.setFillColor(250, 200, 150);
//       doc.rect(margin, contentY, tableWidth, rowHeight, "F");
//       doc.rect(margin + tableWidth + gap, contentY, tableWidth, rowHeight, "F");
//       doc.setFont(undefined, "bold");
//       doc.text("Present Address", margin + 5, contentY + 15);
//       doc.text(
//         "Permanent Address",
//         margin + tableWidth + gap + 5,
//         contentY + 15
//       );
//       contentY += rowHeight;

//       rows.forEach(([label, present, permanent]) => {
//         const labelLines = doc.splitTextToSize(label, col1 - 10);
//         const presentLines = doc.splitTextToSize(present || "-", col2 - 10);
//         const permanentLines = doc.splitTextToSize(permanent || "-", col2 - 10);
//         const maxLines = Math.max(
//           labelLines.length,
//           presentLines.length,
//           permanentLines.length
//         );
//         const cellHeight = maxLines * 14 + 6;

//         doc.rect(margin, contentY, col1, cellHeight);
//         doc.text(labelLines, margin + 5, contentY + 14);

//         doc.rect(margin + col1, contentY, col2, cellHeight);
//         doc.text(presentLines, margin + col1 + 5, contentY + 14);

//         doc.rect(margin + tableWidth + gap, contentY, col1, cellHeight);
//         doc.text(labelLines, margin + tableWidth + gap + 5, contentY + 14);

//         doc.rect(margin + tableWidth + gap + col1, contentY, col2, cellHeight);
//         doc.text(
//           permanentLines,
//           margin + tableWidth + gap + col1 + 5,
//           contentY + 14
//         );

//         contentY += cellHeight;
//       });

//       contentY += spacing;
//     };

//     const drawEducationTable = () => {
//       doc.setFillColor(250, 200, 150);
//       doc.rect(margin, contentY, pageWidth - 2 * margin, rowHeight, "F");
//       doc.setFont(undefined, "bold");
//       doc.text("Education Background", margin + 5, contentY + 15);
//       contentY += rowHeight;

//       const col1 = 100;
//       const col2 = 120;
//       const col3 = 80;
//       const col4 = pageWidth - 2 * margin - (col1 + col2 + col3);

//       doc.setFillColor(240);
//       doc.rect(margin, contentY, col1, rowHeight, "F");
//       doc.rect(margin + col1, contentY, col2, rowHeight, "F");
//       doc.rect(margin + col1 + col2, contentY, col3, rowHeight, "F");
//       doc.rect(margin + col1 + col2 + col3, contentY, col4, rowHeight, "F");

//       doc.text("Exam", margin + 5, contentY + 15);
//       doc.text("Result", margin + col1 + 5, contentY + 15);
//       doc.text("Year", margin + col1 + col2 + 5, contentY + 15);
//       doc.text("Institution", margin + col1 + col2 + col3 + 5, contentY + 15);
//       contentY += rowHeight;

//       const drawRow = (label, r, y, i) => {
//         const labelLines = doc.splitTextToSize(label, col1 - 10);
//         const resultLines = doc.splitTextToSize(r || "-", col2 - 10);
//         const yearLines = doc.splitTextToSize(y || "-", col3 - 10);
//         const instLines = doc.splitTextToSize(i || "-", col4 - 10);
//         const maxLines = Math.max(
//           labelLines.length,
//           resultLines.length,
//           yearLines.length,
//           instLines.length
//         );
//         const cellHeight = maxLines * 14 + 6;

//         doc.rect(margin, contentY, col1, cellHeight);
//         doc.text(labelLines, margin + 5, contentY + 14);

//         doc.rect(margin + col1, contentY, col2, cellHeight);
//         doc.text(resultLines, margin + col1 + 5, contentY + 14);

//         doc.rect(margin + col1 + col2, contentY, col3, cellHeight);
//         doc.text(yearLines, margin + col1 + col2 + 5, contentY + 14);

//         doc.rect(margin + col1 + col2 + col3, contentY, col4, cellHeight);
//         doc.text(instLines, margin + col1 + col2 + col3 + 5, contentY + 14);

//         contentY += cellHeight;
//       };

//       drawRow("SSC", form.sscResult, form.sscYear, form.sscInstitution);
//       drawRow("HSC", form.hscResult, form.hscYear, form.hscInstitution);
//       drawRow(
//         "University",
//         form.universityResult,
//         form.universityYear,
//         form.universityInstitution
//       );

//       contentY += spacing;
//     };

//     drawInfoTable("Personal Information", [
//       ["Full Name", form.name],
//       ["Gender", form.gender],
//       ["Father's Name", form.father],
//       ["Mother's Name", form.mother],
//       ["Date of Birth", form.dob],
//       ["Age", form.age],
//       ["Nationality", form.nationality],
//       ["Religion", form.religion],
//       ["Marital Status", form.marital],
//       ["Blood Group", form.blood],
//       ["Hobby", form.hobby],
//       ["Passport / ID", form.passport],
//       ["Website", form.website],
//       ["LinkedIn", form.linkedin],
//       ["Profession", form.profession],
//       ["Skills", form.skills],
//       ["Email", form.email],
//       ["Phone", form.phone],
//     ]);

//     drawAddressTables();
//     drawEducationTable();

//     doc.setFontSize(7);
//     doc.setFont(undefined, "italic");
//     doc.setTextColor("#666");
//     const footerText = "Powered by ArafatTech";
//     const footerX = pageWidth - margin - doc.getTextWidth(footerText);
//     const footerY = 8;
//     doc.text(footerText, footerX, footerY);

//     doc.save("identity_form.pdf");
//   };










  
//   /* ----------------------- PREMIUM THEME STYLES ---------------------- */
//   const themeBG = dark
//     ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
//     : "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50";
//   const cardBG = dark
//     ? "bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl"
//     : "bg-white/90 backdrop-blur-xl border border-orange-100/50 shadow-2xl";

//   /* ---------------------------------------------------------------- */

//   // Premium Components
//   const PremiumInput = ({ label, name, type = "text", form, handleChange }) => (
//     <div className="group">
//       <label
//         className={`block text-sm font-bold mb-2 tracking-wide ${
//           dark ? "text-slate-300" : "text-gray-700"
//         }`}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         placeholder={`Enter ${label}`}
//         value={form[name] || ""}
//         onChange={handleChange}
//         className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 focus:ring-4 focus:outline-none placeholder-gray-400 ${
//           dark
//             ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
//             : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
//         }`}
//       />
//     </div>
//   );

//   const PremiumListInput = ({ label, name, form, handleChange }) => (
//     <div className="group">
//       <label
//         className={`block text-sm font-bold mb-2 tracking-wide ${
//           dark ? "text-slate-300" : "text-gray-700"
//         }`}
//       >
//         {label}
//       </label>
//       <input
//         list={`${name}List`}
//         name={name}
//         placeholder={`Select ${label}`}
//         value={form[name] || ""}
//         onChange={handleChange}
//         className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 focus:ring-4 focus:outline-none placeholder-gray-400 ${
//           dark
//             ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
//             : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
//         }`}
//       />
//     </div>
//   );

//   const PremiumSelect = ({ label, name, form, handleChange }) => (
//     <div className="group relative">
//       <label
//         className={`block text-sm font-bold mb-2 tracking-wide ${
//           dark ? "text-slate-300" : "text-gray-700"
//         }`}
//       >
//         {label}
//       </label>
//       <select
//         name={name}
//         value={form[name] || ""}
//         onChange={handleChange}
//         className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg appearance-none bg-no-repeat bg-right pr-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
//           dark
//             ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
//             : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
//         }`}
//       >
//         <option value="">Select {label}</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>
//       <div
//         className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${
//           dark ? "text-slate-400" : "text-gray-400"
//         }`}
//       >
//         <svg
//           className="h-5 w-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>
//     </div>
//   );

//   return (
//     <div
//       className={`min-h-screen flex items-start justify-center ${themeBG} py-12 px-2 md:px-6 lg:px-8`}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={`w-full max-w-6xl ${cardBG} rounded-3xl p-4 md:p-8  lg:p-12`}
//       >
//         {/* Premium Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-5 rounded-3xl shadow-2xl mb-6 backdrop-blur-sm">
//             <div
//               className={`w-3 h-3 ${
//                 dark ? "bg-orange-400" : "bg-white"
//               } rounded-full animate-pulse`}
//             />
//             <h2
//               className={`text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text `}
//             >
//               Identity Form
//             </h2>
//           </div>
//           <p
//             className={`font-medium text-lg ${
//               dark ? "text-slate-300" : "text-gray-600"
//             }`}
//           >
//             Arafat-Tech Ltd • Professional Identity Documentation
//           </p>
//         </div>

//         {!preview ? (
//           <>
//             {/* Personal Information */}
//             <section className="mb-12">
//               <div
//                 className={`flex items-center gap-4 mb-8 p-4 rounded-3xl backdrop-blur-sm shadow-xl ${
//                   dark
//                     ? "bg-slate-700/50 border border-slate-600"
//                     : "bg-gradient-to-r from-orange-50/80 to-yellow-50/80 border border-orange-200/50"
//                 }`}
//               >
//                 <div
//                   className={`w-3 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-2xl ${
//                     dark ? "shadow-orange-500/30" : "shadow-lg"
//                   }`}
//                 />
//                 <h3
//                   className={`text-2xl font-black tracking-tight ${
//                     dark ? "text-slate-200" : "text-gray-900"
//                   }`}
//                 >
//                   Personal Information
//                 </h3>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                   ["name", "Full Name"],
//                   ["gender", "Gender", "select"],
//                   ["father", "Father's Name"],
//                   ["mother", "Mother's Name"],
//                   ["dob", "Date of Birth", "date"],
//                   ["age", "Age"],
//                   ["nationality", "Nationality"],
//                   ["religion", "Religion", "list"],
//                   ["marital", "Marital Status"],
//                   ["blood", "Blood Group", "list"],
//                   ["hobby", "Hobby", "list"],
//                   ["passport", "Passport / ID"],
//                   ["website", "Website"],
//                   ["linkedin", "LinkedIn"],
//                   ["profession", "Profession"],
//                   ["skills", "Skills"],
//                   ["email", "Email", "email"],
//                   ["phone", "Phone", "tel"],
//                 ].map(([name, label, type = "text"]) =>
//                   type === "list" ? (
//                     <PremiumListInput
//                       key={name}
//                       label={label}
//                       name={name}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                   ) : type === "select" ? (
//                     <PremiumSelect
//                       key={name}
//                       label={label}
//                       name={name}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                   ) : (
//                     <PremiumInput
//                       key={name}
//                       label={label}
//                       name={name}
//                       type={type}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                   )
//                 )}
//               </div>
//             </section>

//             {/* Address Information */}
//             <section className="mb-12">
//               <div
//                 className={`flex items-center gap-4 mb-8 p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
//                   dark
//                     ? "bg-slate-700/50 border border-slate-600"
//                     : "bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/50"
//                 }`}
//               >
//                 <div
//                   className={`w-3 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl ${
//                     dark ? "shadow-blue-500/30" : "shadow-lg"
//                   }`}
//                 />
//                 <h3
//                   className={`text-2xl font-black tracking-tight ${
//                     dark ? "text-slate-200" : "text-gray-900"
//                   }`}
//                 >
//                   Address Information
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//                 <div className="space-y-4">
//                   <h4
//                     className={`font-black text-xl pb-2 border-b ${
//                       dark
//                         ? "text-slate-200 border-slate-600"
//                         : "text-gray-900 border-gray-200"
//                     }`}
//                   >
//                     Present Address
//                   </h4>
//                   <PremiumInput
//                     label="Village"
//                     name="presentVillage"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumInput
//                     label="Thana"
//                     name="presentThana"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumListInput
//                     label="District"
//                     name="presentDistrict"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumListInput
//                     label="Division"
//                     name="presentDivision"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   <h4
//                     className={`font-black text-xl pb-2 border-b ${
//                       dark
//                         ? "text-slate-200 border-slate-600"
//                         : "text-gray-900 border-gray-200"
//                     }`}
//                   >
//                     Permanent Address
//                   </h4>
//                   <PremiumInput
//                     label="Village"
//                     name="permanentVillage"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumInput
//                     label="Thana"
//                     name="permanentThana"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumListInput
//                     label="District"
//                     name="permanentDistrict"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                   <PremiumListInput
//                     label="Division"
//                     name="permanentDivision"
//                     form={form}
//                     handleChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`flex items-center p-6 rounded-3xl border-2 border-dashed transition-all duration-300 ${
//                   dark
//                     ? "bg-slate-700/30 border-slate-600 hover:border-orange-500 hover:bg-slate-700/50"
//                     : "bg-gray-50/50 border-gray-200 hover:border-orange-400 hover:bg-orange-50/50"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="sameAddress"
//                   checked={sameAddress}
//                   onChange={handleChange}
//                   id="sameAddress"
//                   className={`w-6 h-6 text-orange-500 border-2 rounded-xl focus:ring-orange-500 focus:ring-2 shadow-lg transition-all duration-300 ${
//                     dark
//                       ? "bg-slate-800 border-slate-500"
//                       : "bg-white border-gray-300"
//                   }`}
//                 />
//                 <label
//                   className={`ml-4 text-lg font-semibold cursor-pointer select-none transition-colors ${
//                     dark
//                       ? "text-slate-300 hover:text-orange-400"
//                       : "text-gray-800 hover:text-orange-600"
//                   }`}
//                   htmlFor="sameAddress"
//                 >
//                   Permanent address same as present
//                 </label>
//               </div>
//             </section>

//             {/* Education Background */}
//             <section className="mb-12">
//               <div
//                 className={`flex items-center gap-4 mb-8 p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
//                   dark
//                     ? "bg-slate-700/50 border border-slate-600"
//                     : "bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/50"
//                 }`}
//               >
//                 <div
//                   className={`w-3 h-12 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-2xl ${
//                     dark ? "shadow-emerald-500/30" : "shadow-lg"
//                   }`}
//                 />
//                 <h3
//                   className={`text-2xl font-black tracking-tight ${
//                     dark ? "text-slate-200" : "text-gray-900"
//                   }`}
//                 >
//                   Education Background
//                 </h3>
//               </div>

//               {["ssc", "hsc", "university"].map((edu) => (
//                 <div
//                   key={edu}
//                   className={`p-8 rounded-3xl shadow-xl mb-6 transition-all duration-300 group hover:shadow-2xl ${
//                     dark
//                       ? "bg-slate-700/40 border border-slate-600 hover:bg-slate-700/60"
//                       : "bg-white/70 border border-gray-200 hover:bg-orange-50/50"
//                   }`}
//                 >
//                   <h4
//                     className={`text-2xl font-black mb-6 pb-3 border-b ${
//                       dark
//                         ? "text-slate-200 border-slate-600"
//                         : "text-gray-900 border-gray-200"
//                     }`}
//                   >
//                     {edu.toUpperCase()}
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <PremiumInput
//                       label="Result (GPA/Grade)"
//                       name={`${edu}Result`}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                     <PremiumInput
//                       label="Year (e.g., 2018)"
//                       name={`${edu}Year`}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                     <PremiumInput
//                       label="Institution Name"
//                       name={`${edu}Institution`}
//                       form={form}
//                       handleChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </section>

//             {/* Photo Upload */}
//             <section className="mb-12">
//               <div
//                 className={`flex items-center gap-4 mb-8 p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
//                   dark
//                     ? "bg-slate-700/50 border border-slate-600"
//                     : "bg-gradient-to-r from-purple-50/80 to-pink-50/80 border border-purple-200/50"
//                 }`}
//               >
//                 <div
//                   className={`w-3 h-12 bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl ${
//                     dark ? "shadow-purple-500/30" : "shadow-lg"
//                   }`}
//                 />
//                 <h3
//                   className={`text-2xl font-black tracking-tight ${
//                     dark ? "text-slate-200" : "text-gray-900"
//                   }`}
//                 >
//                   Profile Photo
//                 </h3>
//               </div>

//               <div
//                 className={`p-10 rounded-3xl border-2 border-dashed text-center group transition-all duration-500 cursor-pointer ${
//                   dark
//                     ? "bg-slate-700/30 border-slate-600 hover:border-orange-500 hover:bg-slate-700/50 shadow-xl hover:shadow-2xl"
//                     : "bg-white/60 border-gray-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 shadow-xl hover:shadow-2xl"
//                 }`}
//               >
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="photo-upload"
//                 />
//                 <label
//                   htmlFor="photo-upload"
//                   className="cursor-pointer flex flex-col items-center gap-4"
//                 >
//                   {imageFile ? (
//                     <>
//                       <div
//                         className={`w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 transition-all duration-500 group-hover:scale-105 ${
//                           dark ? "ring-orange-500/30" : "ring-orange-300/60"
//                         }`}
//                       >
//                         <img
//                           src={URL.createObjectURL(imageFile)}
//                           alt="Preview"
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                       </div>
//                       <p
//                         className={`font-bold text-xl ${
//                           dark ? "text-orange-400" : "text-orange-600"
//                         }`}
//                       >
//                         Photo Selected ✓
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       <div
//                         className={`w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300`}
//                       >
//                         <svg
//                           className="w-10 h-10 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <p
//                           className={`font-bold text-2xl mb-1 ${
//                             dark ? "text-slate-300" : "text-gray-800"
//                           }`}
//                         >
//                           Upload Profile Photo
//                         </p>
//                         <p
//                           className={`text-sm ${
//                             dark ? "text-slate-400" : "text-gray-500"
//                           }`}
//                         >
//                           PNG, JPG up to 5MB
//                         </p>
//                       </div>
//                     </>
//                   )}
//                 </label>
//               </div>
//             </section>

//             {/* Premium CTA */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setPreview(true)}
//               className={`group relative w-full h-20 rounded-3xl font-black text-xl shadow-2xl overflow-hidden transition-all duration-300 ${
//                 dark
//                   ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
//                   : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-400/50 hover:shadow-orange-500/60"
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               <span className="relative z-10 flex items-center justify-center gap-3 h-full">
//                 <svg
//                   className="w-7 h-7"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 Create Form Preview
//               </span>
//             </motion.button>

//             <p
//               className={`text-center mt-6 font-medium ${
//                 dark ? "text-slate-400" : "text-gray-600"
//               }`}
//             >
//               Click above to generate your professional Identity form instantly
//             </p>

//             {/* Datalists */}
//             <datalist id="districtList">
//               {districts.map((d) => (
//                 <option key={d} value={d} />
//               ))}
//             </datalist>
//             <datalist id="divisionList">
//               {divisions.map((d) => (
//                 <option key={d} value={d} />
//               ))}
//             </datalist>
//             {bloodGroups.map((v) => (
//               <>
//                 <datalist key={`blood-${v}`} id="bloodList">
//                   <option value={v} />
//                 </datalist>
//                 <datalist key={`hobby-${v}`} id="hobbyList">
//                   {hobbies.map((h) => (
//                     <option key={h} value={h} />
//                   ))}
//                 </datalist>
//                 <datalist key={`religion-${v}`} id="religionList">
//                   {religions.map((r) => (
//                     <option key={r} value={r} />
//                   ))}
//                 </datalist>
//               </>
//             ))}
//           </>
//         ) : (
//           /* Premium Preview Section */
//           <section aria-live="polite" className="space-y-8">
//             <div
//               className={`flex items-center gap-4 p-8 rounded-3xl backdrop-blur-sm shadow-2xl ${
//                 dark
//                   ? "bg-gradient-to-r from-emerald-800/70 to-emerald-900/70 border border-emerald-700/50"
//                   : "bg-gradient-to-r from-emerald-50/90 to-emerald-100/90 border border-emerald-200/60"
//               }`}
//             >
//               <div
//                 className={`w-3 h-12 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-2xl animate-pulse shadow-lg ${
//                   dark ? "shadow-emerald-400/40" : ""
//                 }`}
//               />
//               <div>
//                 <h3
//                   className={`text-3xl font-black tracking-tight ${
//                     dark ? "text-slate-100" : "text-gray-900"
//                   }`}
//                 >
//                   Form Preview
//                 </h3>
//                 <p
//                   className={`font-semibold ${
//                     dark ? "text-emerald-300" : "text-emerald-700"
//                   }`}
//                 >
//                   Review your information before download
//                 </p>
//               </div>
//             </div>

//             <div
//               className={`p-10 rounded-3xl backdrop-blur-xl shadow-2xl max-h-96 overflow-y-auto border ${
//                 dark
//                   ? "bg-slate-800/70 border-slate-700/50"
//                   : "bg-white/80 border-gray-200/50"
//               }`}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {Object.entries(form).map(([key, val]) => (
//                   <motion.div
//                     key={key}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
//                       dark
//                         ? "bg-slate-700/50 border-slate-600 hover:border-orange-500 hover:bg-slate-700/70"
//                         : "bg-white/70 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 shadow-sm"
//                     }`}
//                   >
//                     <dt
//                       className={`font-black text-xs uppercase tracking-wider mb-2 truncate ${
//                         dark
//                           ? "text-slate-400 group-hover:text-orange-400"
//                           : "text-gray-500 group-hover:text-orange-600"
//                       }`}
//                     >
//                       {key
//                         .replace(/([A-Z])/g, " $1")
//                         .replace(/\b\w/g, (l) => l.toUpperCase())}
//                     </dt>
//                     <dd
//                       className={`font-semibold text-lg truncate ${
//                         dark
//                           ? "text-slate-200 group-hover:text-orange-400"
//                           : "text-gray-900 group-hover:text-orange-600"
//                       }`}
//                     >
//                       {val || (
//                         <span
//                           className={`${
//                             dark ? "text-slate-500" : "text-gray-400"
//                           } italic font-normal`}
//                         >
//                           Not provided
//                         </span>
//                       )}
//                     </dd>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {imageFile && (
//               <div className="flex justify-center">
//                 <div
//                   className={`w-40 h-40 rounded-3xl overflow-hidden shadow-2xl ring-8 transition-all duration-500 ${
//                     dark ? "ring-emerald-500/40" : "ring-emerald-300/70"
//                   }`}
//                 >
//                   <img
//                     src={URL.createObjectURL(imageFile)}
//                     alt="Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-col lg:flex-row gap-6 pt-10 border-t-2 border-opacity-30">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={generatePDF}
//                 className={`group relative flex-1 h-20 rounded-3xl font-black text-xl shadow-2xl overflow-hidden transition-all duration-300 ${
//                   dark
//                     ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40"
//                     : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-400/50 hover:shadow-emerald-500/60"
//                 }`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <span className="relative z-10 flex items-center justify-center gap-3 h-full">
//                   <svg
//                     className="w-7 h-7"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 10l-5.5 5.5m0 0L12 21l5.5-5.5m-5.5 0H20"
//                     />
//                   </svg>
//                   Download PDF
//                 </span>
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setPreview(false)}
//                 className={`group relative flex-1 h-20 rounded-3xl font-black text-xl shadow-2xl overflow-hidden transition-all duration-300 ${
//                   dark
//                     ? "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-slate-500/25 hover:shadow-slate-500/40"
//                     : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-gray-400/50 hover:shadow-gray-500/60"
//                 }`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <span className="relative z-10 flex items-center justify-center gap-3 h-full">
//                   <svg
//                     className="w-7 h-7"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m-3 0H20"
//                     />
//                   </svg>
//                   Edit Form
//                 </span>
//               </motion.button>
//             </div>
//           </section>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Identity;



















import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const divisions = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
];
const districts = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj",
  "Munshiganj", "Narsingdi", "Narayanganj", "Netrokona", "Shariatpur", "Tangail",
  "Chattogram", "Bandarban", "Brahmanbaria", "Chandpur", "Cox's Bazar", "Feni",
  "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati", "Khulna", "Bagerhat",
  "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail",
  "Satkhira", "Rajshahi", "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj",
  "Pabna", "Sirajganj", "Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali",
  "Pirojpur", "Sylhet", "Habiganj", "Moulvibazar", "Sunamganj", "Rangpur", "Dinajpur",
  "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon", "Gaibandha",
  "Mymensingh", "Jamalpur", "Netrokona", "Sherpur",
];
const hobbies = [
  "Reading", "Writing", "Sports", "Music", "Traveling", "Gaming", "Cooking",
  "Photography", "Painting", "Dancing", "Singing", "Hiking", "Cycling",
  "Gardening", "Swimming", "Yoga", "Knitting", "Fishing", "Meditation",
];
const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];

const Identity = () => {
  /* --------------------- AUTO THEME SYSTEM ---------------------- */
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({
    name: "", father: "", mother: "", dob: "", age: "", gender: "", nationality: "",
    religion: "", marital: "", blood: "", hobby: "", email: "", phone: "", passport: "",
    website: "", linkedin: "", profession: "", skills: "",
    presentVillage: "", presentThana: "", presentDistrict: "", presentDivision: "",
    permanentVillage: "", permanentThana: "", permanentDistrict: "", permanentDivision: "",
    sscResult: "", sscYear: "", sscInstitution: "", hscResult: "", hscYear: "",
    hscInstitution: "", universityResult: "", universityYear: "", universityInstitution: "",
  });
  const [sameAddress, setSameAddress] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [qrDataURL, setQrDataURL] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => setDark(media.matches);
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, []);

  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "sameAddress") {
      setSameAddress(checked);
      if (checked) {
        setForm((prev) => ({
          ...prev,
          permanentVillage: prev.presentVillage,
          permanentThana: prev.presentThana,
          permanentDistrict: prev.presentDistrict,
          permanentDivision: prev.presentDivision,
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (sameAddress && ["presentVillage", "presentThana", "presentDistrict", "presentDivision"].includes(name)) {
        setForm((prev) => ({
          ...prev,
          permanentVillage: prev.presentVillage,
          permanentThana: prev.presentThana,
          permanentDistrict: prev.presentDistrict,
          permanentDivision: prev.presentDivision,
        }));
      }
    }
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  /* ----------------------- PREMIUM PDF GENERATOR ---------------------- */
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 30;
      const spacing = 8;
      const rowHeight = 21;
      let contentY = 10;

      // Premium Background
      doc.setFillColor(255, 249, 195);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Premium Header
      const headerHeight = 50;
      doc.setFillColor(250, 130, 50);
      doc.rect(0, contentY, pageWidth, headerHeight, "F");
      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.setTextColor("#fff");
      doc.text("IDENTITY FORM", pageWidth / 2, contentY + 33, { align: "center" });
      contentY += headerHeight + spacing;

      // Profile Section with QR & Photo
      const qrSize = 80;
      const imageWidth = 100;
      const imageHeight = 120;
      const qrX = margin;
      const imgX = pageWidth - margin - imageWidth;
      const topY = contentY;

      const getImageData = (file) => new Promise((resolve) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const imageData = await getImageData(imageFile);

      if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, topY, qrSize, qrSize);
      if (imageData) doc.addImage(imageData, "JPEG", imgX, topY, imageWidth, imageHeight);

      contentY += Math.max(qrSize, imageHeight) + 8;

      // Premium Table Functions
      const drawInfoTable = (title, rows) => {
        doc.setFillColor(250, 200, 150);
        doc.rect(margin, contentY, pageWidth - 2 * margin, rowHeight, "F");
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.setTextColor("#000");
        doc.text(title, margin + 5, contentY + 15);
        contentY += rowHeight;

        const col1 = 150;
        const col2 = pageWidth - 2 * margin - col1;

        rows.forEach(([label, value]) => {
          const labelLines = doc.splitTextToSize(label + ":", col1 - 10);
          const valueLines = doc.splitTextToSize(value || "-", col2 - 10);
          const maxLines = Math.max(labelLines.length, valueLines.length);
          const cellHeight = maxLines * 14 + 6;

          doc.setFillColor(245);
          doc.rect(margin, contentY, col1, cellHeight, "F");
          doc.rect(margin, contentY, col1, cellHeight);

          doc.setFillColor(255);
          doc.rect(margin + col1, contentY, col2, cellHeight, "F");
          doc.rect(margin + col1, contentY, col2, cellHeight);

          doc.setFont(undefined, "bold");
          doc.setTextColor("#333");
          doc.setFontSize(11);
          doc.text(labelLines, margin + 5, contentY + 14);

          doc.setFont(undefined, "normal");
          doc.setTextColor("#000");
          doc.text(valueLines, margin + col1 + 5, contentY + 14);

          contentY += cellHeight;
        });
        contentY += spacing;
      };

      const drawAddressTables = () => {
        const tableWidth = (pageWidth - 2 * margin - 20) / 2;
        const gap = 20;
        const col1 = 80;
        const col2 = tableWidth - col1;

        const rows = [
          ["Village", form.presentVillage, form.permanentVillage],
          ["Thana", form.presentThana, form.permanentThana],
          ["District", form.presentDistrict, form.permanentDistrict],
          ["Division", form.presentDivision, form.permanentDivision],
        ];

        doc.setFillColor(250, 200, 150);
        doc.rect(margin, contentY, tableWidth, rowHeight, "F");
        doc.rect(margin + tableWidth + gap, contentY, tableWidth, rowHeight, "F");
        doc.setFont(undefined, "bold");
        doc.text("Present Address", margin + 5, contentY + 15);
        doc.text("Permanent Address", margin + tableWidth + gap + 5, contentY + 15);
        contentY += rowHeight;

        rows.forEach(([label, present, permanent]) => {
          const labelLines = doc.splitTextToSize(label, col1 - 10);
          const presentLines = doc.splitTextToSize(present || "-", col2 - 10);
          const permanentLines = doc.splitTextToSize(permanent || "-", col2 - 10);
          const maxLines = Math.max(labelLines.length, presentLines.length, permanentLines.length);
          const cellHeight = maxLines * 14 + 6;

          doc.rect(margin, contentY, col1, cellHeight);
          doc.text(labelLines, margin + 5, contentY + 14);

          doc.rect(margin + col1, contentY, col2, cellHeight);
          doc.text(presentLines, margin + col1 + 5, contentY + 14);

          doc.rect(margin + tableWidth + gap, contentY, col1, cellHeight);
          doc.text(labelLines, margin + tableWidth + gap + 5, contentY + 14);

          doc.rect(margin + tableWidth + gap + col1, contentY, col2, cellHeight);
          doc.text(permanentLines, margin + tableWidth + gap + col1 + 5, contentY + 14);

          contentY += cellHeight;
        });
        contentY += spacing;
      };

      const drawEducationTable = () => {
        doc.setFillColor(250, 200, 150);
        doc.rect(margin, contentY, pageWidth - 2 * margin, rowHeight, "F");
        doc.setFont(undefined, "bold");
        doc.text("Education Background", margin + 5, contentY + 15);
        contentY += rowHeight;

        const col1 = 100;
        const col2 = 120;
        const col3 = 80;
        const col4 = pageWidth - 2 * margin - (col1 + col2 + col3);

        doc.setFillColor(240);
        doc.rect(margin, contentY, col1, rowHeight, "F");
        doc.rect(margin + col1, contentY, col2, rowHeight, "F");
        doc.rect(margin + col1 + col2, contentY, col3, rowHeight, "F");
        doc.rect(margin + col1 + col2 + col3, contentY, col4, rowHeight, "F");

        doc.text("Exam", margin + 5, contentY + 15);
        doc.text("Result", margin + col1 + 5, contentY + 15);
        doc.text("Year", margin + col1 + col2 + 5, contentY + 15);
        doc.text("Institution", margin + col1 + col2 + col3 + 5, contentY + 15);
        contentY += rowHeight;

        const drawRow = (label, r, y, i) => {
          const labelLines = doc.splitTextToSize(label, col1 - 10);
          const resultLines = doc.splitTextToSize(r || "-", col2 - 10);
          const yearLines = doc.splitTextToSize(y || "-", col3 - 10);
          const instLines = doc.splitTextToSize(i || "-", col4 - 10);
          const maxLines = Math.max(labelLines.length, resultLines.length, yearLines.length, instLines.length);
          const cellHeight = maxLines * 14 + 6;

          doc.rect(margin, contentY, col1, cellHeight);
          doc.text(labelLines, margin + 5, contentY + 14);

          doc.rect(margin + col1, contentY, col2, cellHeight);
          doc.text(resultLines, margin + col1 + 5, contentY + 14);

          doc.rect(margin + col1 + col2, contentY, col3, cellHeight);
          doc.text(yearLines, margin + col1 + col2 + 5, contentY + 14);

          doc.rect(margin + col1 + col2 + col3, contentY, col4, cellHeight);
          doc.text(instLines, margin + col1 + col2 + col3 + 5, contentY + 14);

          contentY += cellHeight;
        };

        drawRow("SSC", form.sscResult, form.sscYear, form.sscInstitution);
        drawRow("HSC", form.hscResult, form.hscYear, form.hscInstitution);
        drawRow("University", form.universityResult, form.universityYear, form.universityInstitution);

        contentY += spacing;
      };

      // Draw all tables
      drawInfoTable("Personal Information", [
        ["Full Name", form.name], ["Gender", form.gender], ["Father's Name", form.father],
        ["Mother's Name", form.mother], ["Date of Birth", form.dob], ["Age", form.age],
        ["Nationality", form.nationality], ["Religion", form.religion], ["Marital Status", form.marital],
        ["Blood Group", form.blood], ["Hobby", form.hobby], ["Passport / ID", form.passport],
        ["Website", form.website], ["LinkedIn", form.linkedin], ["Profession", form.profession],
        ["Skills", form.skills], ["Email", form.email], ["Phone", form.phone],
      ]);

      drawAddressTables();
      drawEducationTable();

      // Premium Footer
      doc.setFontSize(7);
      doc.setFont(undefined, "italic");
      doc.setTextColor("#666");
      const footerText = "Powered by ArafatTech";
      const footerX = pageWidth - margin - doc.getTextWidth(footerText);
      const footerY = 8;
      doc.text(footerText, footerX, footerY);

      doc.save("identity_form.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  /* ----------------------- PREMIUM THEME STYLES ---------------------- */
  const themeBG = dark
    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    : "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50";
  const cardBG = dark
    ? "bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl"
    : "bg-white/90 backdrop-blur-xl border border-orange-100/50 shadow-2xl";

  /* ----------------------- PREMIUM COMPONENTS ---------------------- */
  const PremiumInput = ({ label, name, type = "text", form, handleChange }) => (
    <div className="group">
      <label className={`block text-sm font-bold mb-2 tracking-wide ${dark ? "text-slate-300" : "text-gray-700"}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter ${label}`}
        value={form[name] || ""}
        onChange={handleChange}
        className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 focus:ring-4 focus:outline-none placeholder-gray-400 ${
          dark
            ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
            : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
        }`}
      />
    </div>
  );

  const PremiumListInput = ({ label, name, form, handleChange }) => (
    <div className="group">
      <label className={`block text-sm font-bold mb-2 tracking-wide ${dark ? "text-slate-300" : "text-gray-700"}`}>
        {label}
      </label>
      <input
        list={`${name}List`}
        name={name}
        placeholder={`Select ${label}`}
        value={form[name] || ""}
        onChange={handleChange}
        className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 focus:ring-4 focus:outline-none placeholder-gray-400 ${
          dark
            ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
            : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
        }`}
      />
    </div>
  );

  const PremiumSelect = ({ label, name, form, handleChange }) => (
    <div className="group relative">
      <label className={`block text-sm font-bold mb-2 tracking-wide ${dark ? "text-slate-300" : "text-gray-700"}`}>
        {label}
      </label>
      <select
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
        className={`w-full h-14 px-5 py-3 rounded-2xl font-semibold text-lg shadow-lg appearance-none bg-no-repeat bg-right pr-12 transition-all duration-300 focus:ring-4 focus:outline-none ${
          dark
            ? "bg-slate-700/80 border-2 border-slate-600 text-white focus:ring-orange-500/30 focus:border-orange-400 hover:border-orange-500 hover:shadow-orange-500/25"
            : "bg-white/70 border-2 border-gray-200 text-gray-900 focus:ring-orange-400/50 focus:border-orange-500 hover:border-orange-400 hover:shadow-orange-200/50"
        }`}
      >
        <option value="">Select {label}</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 ${dark ? "text-slate-400" : "text-gray-400"}`}>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-start justify-center ${themeBG} py-12 px-2 md:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-6xl ${cardBG} rounded-3xl p-4 md:p-8 lg:p-12`}
      >
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-5 rounded-3xl shadow-2xl mb-6 backdrop-blur-sm">
            <div className={`w-3 h-3 ${dark ? "bg-orange-400" : "bg-white"} rounded-full animate-pulse`} />
            <h2 className={`text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text `}>
              Identity Form
            </h2>
          </div>
          <p className={`font-medium text-lg ${dark ? "text-slate-300" : "text-gray-600"}`}>
            Arafat-Tech Ltd • Professional Identity Documentation
          </p>
        </div>

        {!preview ? (
          <>
            {/* Personal Information */}
            <section className="mb-12">
              <div className={`flex items-center gap-4 mb-8 p-4 rounded-3xl backdrop-blur-sm shadow-xl ${
                dark
                  ? "bg-slate-700/50 border border-slate-600"
                  : "bg-gradient-to-r from-orange-50/80 to-yellow-50/80 border border-orange-200/50"
              }`}>
                <div className={`w-3 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-2xl ${dark ? "shadow-orange-500/30" : "shadow-lg"}`} />
                <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-slate-200" : "text-gray-900"}`}>
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  ["name", "Full Name"],
                  ["gender", "Gender", "select"],
                  ["father", "Father's Name"],
                  ["mother", "Mother's Name"],
                  ["dob", "Date of Birth", "date"],
                  ["age", "Age"],
                  ["nationality", "Nationality"],
                  ["religion", "Religion", "list"],
                  ["marital", "Marital Status"],
                  ["blood", "Blood Group", "list"],
                  ["hobby", "Hobby", "list"],
                  ["passport", "Passport / ID"],
                  ["website", "Website"],
                  ["linkedin", "LinkedIn"],
                  ["profession", "Profession"],
                  ["skills", "Skills"],
                  ["email", "Email", "email"],
                  ["phone", "Phone", "tel"],
                ].map(([name, label, type = "text"]) =>
                  type === "list" ? (
                    <PremiumListInput key={name} label={label} name={name} form={form} handleChange={handleChange} />
                  ) : type === "select" ? (
                    <PremiumSelect key={name} label={label} name={name} form={form} handleChange={handleChange} />
                  ) : (
                    <PremiumInput key={name} label={label} name={name} type={type} form={form} handleChange={handleChange} />
                  )
                )}
              </div>
            </section>

            {/* Address Information */}
            <section className="mb-12">
              <div className={`flex items-center gap-4 mb-8 p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
                dark
                  ? "bg-slate-700/50 border border-slate-600"
                  : "bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/50"
              }`}>
                <div className={`w-3 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl ${dark ? "shadow-blue-500/30" : "shadow-lg"}`} />
                <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-slate-200" : "text-gray-900"}`}>
                  Address Information
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className={`font-black text-xl pb-2 border-b ${dark ? "text-slate-200 border-slate-600" : "text-gray-900 border-gray-200"}`}>
                    Present Address
                  </h4>
                  <PremiumInput label="Village" name="presentVillage" form={form} handleChange={handleChange} />
                  <PremiumInput label="Thana" name="presentThana" form={form} handleChange={handleChange} />
                  <PremiumListInput label="District" name="presentDistrict" form={form} handleChange={handleChange} />
                  <PremiumListInput label="Division" name="presentDivision" form={form} handleChange={handleChange} />
                </div>

                <div className="space-y-4">
                  <h4 className={`font-black text-xl pb-2 border-b ${dark ? "text-slate-200 border-slate-600" : "text-gray-900 border-gray-200"}`}>
                    Permanent Address
                  </h4>
                  <PremiumInput label="Village" name="permanentVillage" form={form} handleChange={handleChange} />
                  <PremiumInput label="Thana" name="permanentThana" form={form} handleChange={handleChange} />
                  <PremiumListInput label="District" name="permanentDistrict" form={form} handleChange={handleChange} />
                  <PremiumListInput label="Division" name="permanentDivision" form={form} handleChange={handleChange} />
                </div>
              </div>

              <div className={`flex items-center p-6 rounded-3xl border-2 border-dashed transition-all duration-300 ${
                dark
                  ? "bg-slate-700/30 border-slate-600 hover:border-orange-500 hover:bg-slate-700/50"
                  : "bg-gray-50/50 border-gray-200 hover:border-orange-400 hover:bg-orange-50/50"
              }`}>
                <input
                  type="checkbox"
                  name="sameAddress"
                  checked={sameAddress}
                  onChange={handleChange}
                  id="sameAddress"
                  className={`w-6 h-6 text-orange-500 border-2 rounded-xl focus:ring-orange-500 focus:ring-2 shadow-lg transition-all duration-300 ${
                    dark ? "bg-slate-800 border-slate-500" : "bg-white border-gray-300"
                  }`}
                />
                <label className={`ml-4 text-lg font-semibold cursor-pointer select-none transition-colors ${
                  dark ? "text-slate-300 hover:text-orange-400" : "text-gray-800 hover:text-orange-600"
                }`} htmlFor="sameAddress">
                  Permanent address same as present
                </label>
              </div>
            </section>

            {/* Education Background */}
            <section className="mb-12">
              <div className={`flex items-center gap-4 mb-8 p-2 md:p-4 lg:p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
                dark
                  ? "bg-slate-700/50 border border-slate-600"
                  : "bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/50"
              }`}>
                <div className={`w-3 h-12 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-2xl ${dark ? "shadow-emerald-500/30" : "shadow-lg"}`} />
                <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-slate-200" : "text-gray-900"}`}>
                  Education Background
                </h3>
              </div>
              {["ssc", "hsc", "university"].map((edu) => (
                <div key={edu} className={`p-3 md:p-5 lg:p-8 rounded-3xl shadow-xl mb-6 transition-all duration-300 group hover:shadow-2xl ${
                  dark
                    ? "bg-slate-700/40 border border-slate-600 hover:bg-slate-700/60"
                    : "bg-white/70 border border-gray-200 hover:bg-orange-50/50"
                }`}>
                  <h4 className={`text-2xl font-black mb-6 pb-3 border-b ${dark ? "text-slate-200 border-slate-600" : "text-gray-900 border-gray-200"}`}>
                    {edu.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PremiumInput label="Result (GPA/Grade)" name={`${edu}Result`} form={form} handleChange={handleChange} />
                    <PremiumInput label="Year (e.g., 2018)" name={`${edu}Year`} form={form} handleChange={handleChange} />
                    <PremiumInput label="Institution Name" name={`${edu}Institution`} form={form} handleChange={handleChange} />
                  </div>
                </div>
              ))}
            </section>

            {/* Photo Upload */}
            <section className="mb-12">
              <div className={`flex items-center gap-4 mb-8 p-6 rounded-3xl backdrop-blur-sm shadow-xl ${
                dark
                  ? "bg-slate-700/50 border border-slate-600"
                  : "bg-gradient-to-r from-purple-50/80 to-pink-50/80 border border-purple-200/50"
              }`}>
                <div className={`w-3 h-12 bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl ${dark ? "shadow-purple-500/30" : "shadow-lg"}`} />
                <h3 className={`text-2xl font-black tracking-tight ${dark ? "text-slate-200" : "text-gray-900"}`}>
                  Profile Photo
                </h3>
              </div>
              <div className={`p-10 rounded-3xl border-2 border-dashed text-center group transition-all duration-500 cursor-pointer ${
                dark
                  ? "bg-slate-700/30 border-slate-600 hover:border-orange-500 hover:bg-slate-700/50 shadow-xl hover:shadow-2xl"
                  : "bg-white/60 border-gray-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 shadow-xl hover:shadow-2xl"
              }`}>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-4">
                  {imageFile ? (
                    <>
                      <div className={`w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 transition-all duration-500 group-hover:scale-105 ${
                        dark ? "ring-orange-500/30" : "ring-orange-300/60"
                      }`}>
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <p className={`font-bold text-xl ${dark ? "text-orange-400" : "text-orange-600"}`}>
                        Photo Selected ✓
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className={`font-bold text-2xl mb-1 ${dark ? "text-slate-300" : "text-gray-800"}`}>
                          Upload Profile Photo
                        </p>
                        <p className={`text-sm ${dark ? "text-slate-400" : "text-gray-500"}`}>
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>
            </section>

            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreview(true)}
              className={`group relative w-full h-20 rounded-3xl font-black text-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                dark
                  ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-400/50 hover:shadow-orange-500/60"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-3 h-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Form Preview
              </span>
            </motion.button>

            <p className={`text-center mt-6 font-medium ${dark ? "text-slate-400" : "text-gray-600"}`}>
              Click above to generate your professional Identity form instantly
            </p>

            {/* Datalists */}
            <datalist id="districtList">{districts.map((d) => <option key={d} value={d} />)}</datalist>
            <datalist id="divisionList">{divisions.map((d) => <option key={d} value={d} />)}</datalist>
            <datalist id="bloodList">{bloodGroups.map((v) => <option key={v} value={v} />)}</datalist>
            <datalist id="hobbyList">{hobbies.map((h) => <option key={h} value={h} />)}</datalist>
            <datalist id="religionList">{religions.map((r) => <option key={r} value={r} />)}</datalist>
          </>
        ) : (
          /* Premium Preview Section */
          <section aria-live="polite" className="space-y-8">
            <div className={`flex items-center gap-4 p-8 rounded-3xl backdrop-blur-sm shadow-2xl ${
              dark
                ? "bg-gradient-to-r from-emerald-800/70 to-emerald-900/70 border border-emerald-700/50"
                : "bg-gradient-to-r from-emerald-50/90 to-emerald-100/90 border border-emerald-200/60"
            }`}>
              <div className={`w-3 h-12 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-2xl animate-pulse shadow-lg ${dark ? "shadow-emerald-400/40" : ""}`} />
              <div>
                <h3 className={`text-3xl font-black tracking-tight ${dark ? "text-slate-100" : "text-gray-900"}`}>
                  Form Preview
                </h3>
                <p className={`font-semibold ${dark ? "text-emerald-300" : "text-emerald-700"}`}>
                  Review your information before download
                </p>
              </div>
            </div>

            <div className={`p-10 rounded-3xl backdrop-blur-xl shadow-2xl max-h-96 overflow-y-auto border ${
              dark ? "bg-slate-800/70 border-slate-700/50" : "bg-white/80 border-gray-200/50"
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(form).map(([key, val]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      dark
                        ? "bg-slate-700/50 border-slate-600 hover:border-orange-500 hover:bg-slate-700/70"
                        : "bg-white/70 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 shadow-sm"
                    }`}
                  >
                    <dt className={`font-black text-xs uppercase tracking-wider mb-2 truncate ${
                      dark ? "text-slate-400 group-hover:text-orange-400" : "text-gray-500 group-hover:text-orange-600"
                    }`}>
                      {key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </dt>
                    <dd className={`font-semibold text-lg truncate ${
                      dark ? "text-slate-200 group-hover:text-orange-400" : "text-gray-900 group-hover:text-orange-600"
                    }`}>
                      {val || <span className="text-gray-500 italic">Not provided</span>}
                    </dd>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ULTRA-PREMIUM BUTTONS WITH LOADING */}
            <div className="flex flex-col lg:flex-row gap-6 pt-12 border-t-4 border-gradient-to-r from-orange-200/50 via-emerald-200/50 to-purple-200/50 to-transparent bg-gradient-to-r from-orange-500/10 via-emerald-500/10 to-purple-500/10 p-1 rounded-3xl backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: isGeneratingPDF ? 1 : 1.05 }}
                whileTap={{ scale: 0.97 }}
                disabled={isGeneratingPDF}
                onClick={generatePDF}
                className={`group relative flex-1 h-20 lg:h-24 rounded-3xl font-black text-xl lg:text-2xl shadow-2xl overflow-hidden transition-all duration-500 border-2 border-transparent bg-gradient-to-r ${
                  dark
                    ? "from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-800 shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:shadow-2xl hover:border-emerald-400/50"
                    : "from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-700 shadow-emerald-400/60 hover:shadow-emerald-500/80 hover:shadow-3xl hover:border-emerald-400/70"
                } ${isGeneratingPDF ? 'cursor-not-allowed opacity-90 shadow-emerald-400/30' : ''}`}
              >
                {/* Shimmer Effect */}
                {!isGeneratingPDF && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 bg-gradient-to-r from-white/30 via-white/0 to-white/30 -skew-x-12 animate-shimmer" />
                )}
                
                {/* Loading Spinner */}
                {isGeneratingPDF && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className={`w-10 h-10 animate-spin ${dark ? 'text-emerald-300' : 'text-emerald-400'} drop-shadow-lg`} 
                         fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                      <path className="opacity-75" fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  </div>
                )}

                <span className={`relative z-10 flex items-center justify-center gap-4 h-full px-8 transition-all duration-300 ${
                  isGeneratingPDF ? 'opacity-0' : 'opacity-100'
                }`}>
                  <svg
                    className={`w-8 h-8 lg:w-9 lg:h-9 drop-shadow-lg ${dark ? 'drop-shadow-emerald-400/50' : 'drop-shadow-emerald-300/70'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 10l-5.5 5.5m0 0L12 21l5.5-5.5m-5.5 0H20"
                    />
                  </svg>
                  <span className="tracking-wide leading-tight">
                    {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                  </span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPreview(false)}
                className={`group relative flex-1 h-20 lg:h-24 rounded-3xl font-black text-xl lg:text-2xl shadow-2xl overflow-hidden transition-all duration-500 border-2 border-transparent bg-gradient-to-r ${
                  dark
                    ? "from-slate-600 via-slate-500 to-slate-700 hover:from-slate-700 hover:via-slate-600 hover:to-slate-800 shadow-slate-500/40 hover:shadow-slate-500/60 hover:shadow-2xl hover:border-slate-400/50"
                    : "from-gray-500 via-gray-400 to-gray-600 hover:from-gray-600 hover:via-gray-500 hover:to-gray-700 shadow-gray-400/60 hover:shadow-gray-500/80 hover:shadow-3xl hover:border-gray-400/70"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 bg-gradient-to-r from-white/20 via-white/0 to-white/20 -skew-x-12 animate-shimmer" />
                <span className="relative z-10 flex items-center justify-center gap-4 h-full px-8">
                  <svg
                    className={`w-8 h-8 lg:w-9 lg:h-9 drop-shadow-lg ${dark ? 'drop-shadow-slate-400/50' : 'drop-shadow-gray-300/70'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m-3 0H20"
                    />
                  </svg>
                  <span className="tracking-wide leading-tight">Edit Form</span>
                </span>
              </motion.button>
            </div>
          </section>
        )}

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(100%) skewX(-12deg); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite linear;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default Identity;
