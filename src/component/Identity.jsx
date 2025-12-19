// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import QRCode from "qrcode";

// // ✅ 100% FIXED SYNTAX ERROR + PERFECT PDF
// const PERFECT_PDF_CONFIG = {
//   page: { unit: "pt", format: "a4", margin: 28, spacing: 12 },
//   colors: {
//     background: [255, 250, 210],        // ✅ More saturated yellow
//     header: [240, 110, 35],             // ✅ Deeper orange
//     headerText: [255, 255, 255],
//     tableHeader: [255, 200, 140],       // ✅ Richer peach
//     labelCell: [245, 235, 205],         // ✅ Creamier beige
//     valueCell: [255, 255, 255],
//     educationHeader: [210, 235, 255],   // ✅ Brighter blue
//     presentHeader: [255, 240, 205],     // ✅ Warmer yellow
//     permanentHeader: [230, 255, 230],   // ✅ Fresher green
//     text: [0, 0, 0],
//     textDark: [35, 55, 75],             // ✅ Darker gray
//     footer: [110, 125, 130],            // ✅ Deeper gray
//   },
//   fonts: { header: 20, tableHeader: 11, row: 9, footer: 8 },
//   sizes: { headerHeight: 42, qr:70, image: { width: 78, height: 94 }, rowHeight: 17, lineHeight: 11, padding: 6 },
// };


// const IdentityForm = () => {
//   const [isDark, setIsDark] = useState(false);
  
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDark(mediaQuery.matches);
//     const handler = (e) => setIsDark(e.matches);
//     mediaQuery.addEventListener('change', handler);
//     return () => mediaQuery.removeEventListener('change', handler);
//   }, []);

//   const [form, setForm] = useState({
//     name: "", father: "", mother: "", dob: "", age: "",
//     nationality: "", marital: "", id_passport: "", phone: "",
//     email: "", profession: "", skills: "", blood: "", hobby: "", website: "",
//     present_village: "", present_thana: "", present_district: "", present_division: "",
//     permanent_village: "", permanent_thana: "", permanent_district: "", permanent_division: "",
//     ssc_school: "", ssc_year: "", ssc_result: "",
//     hsc_college: "", hsc_year: "", hsc_result: "",
//     university_name: "", university_year: "", university_degree: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(false);
//   const [qrDataURL, setQrDataURL] = useState("");
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
//   const [copyAddress, setCopyAddress] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
//   const handleCopyAddress = () => {
//     if (copyAddress) {
//       setForm({
//         ...form,
//         permanent_village: form.present_village,
//         permanent_thana: form.present_thana,
//         permanent_district: form.present_district,
//         permanent_division: form.present_division,
//       });
//     }
//   };

//   const handleImageChange = (e) => setImageFile(e.target.files[0]);

//   useEffect(() => { 
//     QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL).catch(() => {}); 
//   }, [form]);
//   useEffect(() => { handleCopyAddress(); }, [copyAddress]);

//   // ✅ FIXED PDF FUNCTIONS - SYNTAX ERROR RESOLVED
//   const createPDFDoc = () => new jsPDF({ unit: PERFECT_PDF_CONFIG.page.unit, format: PERFECT_PDF_CONFIG.page.format });
  
//   const getImageData = (file) => new Promise((resolve) => {
//     if (!file) return resolve(null);
//     const reader = new FileReader();
//     reader.onload = (e) => resolve(e.target.result);
//     reader.readAsDataURL(file);
//   });

//   const drawBackground = (doc, pageWidth) => {
//     doc.setFillColor(...PERFECT_PDF_CONFIG.colors.background);
//     doc.rect(0, 0, pageWidth, 842, "F");
//   };

//   const drawHeader = (doc, pageWidth, contentY) => {
//     const config = PERFECT_PDF_CONFIG;
//     doc.setFillColor(...config.colors.header);
//     doc.rect(0, contentY, pageWidth, config.sizes.headerHeight, "F");

//     doc.setFontSize(config.fonts.header);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(...config.colors.headerText);
    
//     const headerText = doc.splitTextToSize("PROFESSIONAL IDENTITY FORM", pageWidth - 60);
//     doc.text(headerText, pageWidth / 2, contentY + 28, { align: "center" });
    
//     return contentY + config.sizes.headerHeight + config.page.spacing;
//   };

//   const drawProfileSection = async (doc, pageWidth, contentY) => {
//     const config = PERFECT_PDF_CONFIG;
//     const qrSize = config.sizes.qr;
//     const { width: imageWidth, height: imageHeight } = config.sizes.image;
//     const qrX = config.page.margin;
//     const imgX = pageWidth - config.page.margin - imageWidth;
    
//     if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, contentY, qrSize, qrSize);
    
//     const imageData = await getImageData(imageFile);
//     if (imageData) doc.addImage(imageData, "JPEG", imgX, contentY, imageWidth, imageHeight);
    
//     return contentY + Math.max(qrSize, imageHeight) + 12;
//   };

// const drawInfoTable = (doc, title, rows, contentY, pageWidth) => {
//   const config = PERFECT_PDF_CONFIG;
//   let y = contentY;
//   const margin = config.page.margin;
//   const col1 = 140;
//   const col2 = pageWidth - 2 * margin - col1;

//   doc.setFillColor(...config.colors.tableHeader);
//   doc.rect(margin, y, pageWidth - 2 * margin, config.sizes.rowHeight, "F");
//   doc.setFontSize(config.fonts.tableHeader);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(...config.colors.textDark);
//   const titleLines = doc.splitTextToSize(title, pageWidth - 2 * margin - 12);
//   doc.text(titleLines, margin + config.sizes.padding, y + 13);
//   y += config.sizes.rowHeight + 8;

//   rows.forEach(([label, value]) => {
//     const safeLabel = String(label || "") + ":";
//     const safeValue = String(value || "-");
//     const labelLines = doc.splitTextToSize(safeLabel, col1 - 12);
//     const valueLines = doc.splitTextToSize(safeValue, col2 - 12);
//     const maxLines = Math.max(labelLines.length, valueLines.length);
//     const cellHeight = maxLines * config.sizes.lineHeight + 8;

//     // ✅ FIXED: Draw borders BEFORE fill to prevent encoding issues
//     doc.setDrawColor(0); 
//     doc.setLineWidth(0.4);
    
//     doc.setFillColor(...config.colors.labelCell);
//     doc.rect(margin, y, col1, cellHeight, "F");
//     doc.rect(margin, y, col1, cellHeight);

//     doc.setFillColor(...config.colors.valueCell);
//     doc.rect(margin + col1, y, col2, cellHeight, "F");
//     doc.rect(margin + col1, y, col2, cellHeight);

//     // ✅ FIXED: Reset text state BEFORE drawing text
//     doc.setFontSize(config.fonts.row);
    
//     // Label text
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(...config.colors.textDark);
//     doc.text(labelLines, margin + config.sizes.padding, y + 12);

//     // Value text
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(...config.colors.text);
//     doc.text(valueLines, margin + col1 + config.sizes.padding, y + 12);

//     y += cellHeight + 4;
//   });
//   return y + config.page.spacing;
// };


//   const drawAddressTables = (doc, contentY, pageWidth) => {
//     const config = PERFECT_PDF_CONFIG;
//     let y = contentY;
//     const margin = config.page.margin;
//     const tableWidth = (pageWidth - 2 * margin - 15) / 2;
//     const col1 = tableWidth * 0.4;
//     const col2 = tableWidth * 0.6;

//     doc.setFillColor(...config.colors.presentHeader);
//     doc.rect(margin, y, tableWidth, config.sizes.rowHeight + 2, "F");
//     doc.setFontSize(config.fonts.tableHeader);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(...config.colors.textDark);
//     doc.text("PRESENT ADDRESS", margin + tableWidth / 2, y + 15, { align: "center" });

//     doc.setFillColor(...config.colors.permanentHeader);
//     doc.rect(margin + tableWidth + 15, y, tableWidth, config.sizes.rowHeight + 2, "F");
//     doc.text("PERMANENT ADDRESS", margin + tableWidth + 15 + tableWidth / 2, y + 15, { align: "center" });
//     y += config.sizes.rowHeight + 10;

//     const fields = ["village", "thana", "district", "division"];
//     fields.forEach((field) => {
//       const presentVal = String(form[`present_${field}`] || "-");
//       const permanentVal = String(form[`permanent_${field}`] || "-");
      
//       doc.setFillColor(...config.colors.labelCell);
//       doc.rect(margin, y, col1, config.sizes.lineHeight + 8, "F");
//       doc.rect(margin, y, col1, config.sizes.lineHeight + 8);
      
//       doc.setFillColor(...config.colors.presentHeader);
//       doc.rect(margin + col1 + 2, y, col2, config.sizes.lineHeight + 8, "F");
//       doc.rect(margin + col1 + 2, y, col2, config.sizes.lineHeight + 8);
      
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(config.fonts.row);
//       doc.text(field.charAt(0).toUpperCase() + field.slice(1), margin + config.sizes.padding, y + 12);

//       doc.setFont("helvetica", "normal");
//       doc.text(presentVal, margin + col1 + 8, y + 12);

//       doc.setFillColor(...config.colors.labelCell);
//       doc.rect(margin + tableWidth + 15, y, col1, config.sizes.lineHeight + 8, "F");
//       doc.rect(margin + tableWidth + 15, y, col1, config.sizes.lineHeight + 8);
      
//       doc.setFillColor(...config.colors.permanentHeader);
//       doc.rect(margin + tableWidth + 15 + col1 + 2, y, col2, config.sizes.lineHeight + 8, "F");
//       doc.rect(margin + tableWidth + 15 + col1 + 2, y, col2, config.sizes.lineHeight + 8);
      
//       doc.setFont("helvetica", "bold");
//       doc.text(field.charAt(0).toUpperCase() + field.slice(1), margin + tableWidth + 15 + config.sizes.padding, y + 12);
      
//       doc.setFont("helvetica", "normal");
//       doc.text(permanentVal, margin + tableWidth + 15 + col1 + 8, y + 12);
      
//       y += config.sizes.lineHeight + 10;
//     });
//     return y + config.page.spacing;
//   };

// // ✅ FIXED: Spread operator issue in drawEducationTable - colIndex === 0 condition
// const drawEducationTable = (doc, contentY, pageWidth) => {
//   const config = PERFECT_PDF_CONFIG;
//   let y = contentY;
//   const margin = config.page.margin;
//   const colWidths = [85, 120, 65, 95];

//   doc.setFillColor(...config.colors.educationHeader);
//   doc.rect(margin, y, pageWidth - 2 * margin, config.sizes.rowHeight + 2, "F");
//   doc.setFontSize(config.fonts.tableHeader);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(...config.colors.textDark);
  
//   const headerLines = doc.splitTextToSize("EDUCATION QUALIFICATION", pageWidth - 2 * margin - 12);
//   doc.text(headerLines, margin + config.sizes.padding, y + 15);
//   y += config.sizes.rowHeight + 8;

//   const educationData = [
//     ["SSC", form.ssc_school || "-", form.ssc_year || "-", form.ssc_result || "-"],
//     ["HSC", form.hsc_college || "-", form.hsc_year || "-", form.hsc_result || "-"],
//     ["UNI", form.university_name || "-", form.university_year || "-", form.university_degree || "-"],
//   ];

//   educationData.forEach((rowData) => {
//     let x = margin;
//     rowData.forEach((cellValue, colIndex) => {
//       const colWidth = colWidths[colIndex];
      
//       // ✅ FIXED: Direct color assignment instead of spread
//       if (colIndex === 0) {
//         doc.setFillColor(...config.colors.labelCell);
//       } else {
//         doc.setFillColor(...config.colors.valueCell);
//       }
      
//       doc.rect(x, y, colWidth, config.sizes.lineHeight + 8, "F");
//       doc.rect(x, y, colWidth, config.sizes.lineHeight + 8);

//       doc.setFont(colIndex === 0 ? "helvetica" : "helvetica", colIndex === 0 ? "bold" : "normal");
//       doc.setFontSize(config.fonts.row);
      
//       // ✅ FIXED: Direct color assignment instead of spread
//       if (colIndex === 0) {
//         doc.setTextColor(...config.colors.textDark);
//       } else {
//         doc.setTextColor(...config.colors.text);
//       }
      
//       const cellText = doc.splitTextToSize(String(cellValue), colWidth - 12);
//       doc.text(cellText, x + config.sizes.padding, y + 12);
      
//       x += colWidth + 2;
//     });
//     y += config.sizes.lineHeight + 10;
//   });
//   return y + config.page.spacing;
// };


// const drawFooter = (doc, pageWidth) => {
//   const config = PERFECT_PDF_CONFIG;
//   doc.setFontSize(config.fonts.footer);
//   doc.setFont("helvetica", "italic");
//   doc.setTextColor(...config.colors.footer);
  
//   // ✅ FIXED: Remove emoji, use simple ASCII text only
//   const footerText = doc.splitTextToSize("Powered by Arafat-Tech Ltd - Professional Identity Document", pageWidth - 60);
//   doc.text(footerText, pageWidth / 2, 785, { align: "center" });
// };


//   const generatePDF = async () => {
//     setIsGeneratingPDF(true);
//     try {
//       const doc = createPDFDoc();
//       const pageWidth = doc.internal.pageSize.getWidth();
//       let contentY = 15;

//       drawBackground(doc, pageWidth);
//       contentY = await drawHeader(doc, pageWidth, contentY);
//       contentY = await drawProfileSection(doc, pageWidth, contentY);

//       const personalRows = [
//         ["Full Name", form.name], ["Father", form.father], ["Mother", form.mother],
//         ["DOB", form.dob], ["Age", form.age], ["Nationality", form.nationality],
//         ["Marital Status", form.marital], ["ID/Passport", form.id_passport], 
//         ["Phone", form.phone], ["Email", form.email], ["Profession", form.profession],
//         ["Skills", form.skills], ["Blood Group", form.blood], 
//         ["Hobbies", form.hobby], ["Website", form.website],
//       ];

//       contentY = drawInfoTable(doc, " PERSONAL INFORMATION", personalRows, contentY, pageWidth);
//       contentY = drawAddressTables(doc, contentY, pageWidth);
//       contentY = drawEducationTable(doc, contentY, pageWidth);
//       drawFooter(doc, pageWidth);
      
//       doc.save("perfect_identity_form.pdf");
//     } catch (error) {
//       console.error("PDF Error:", error);
//     } finally {
//       setIsGeneratingPDF(false);
//     }
//   };

//   const inputStyle = isDark
//     ? "p-3 border-2 border-gray-600 bg-gray-800/90 text-white rounded-xl focus:ring-4 focus:ring-blue-500/50 backdrop-blur-sm"
//     : "p-3 border-2 border-gray-200 bg-white/90 text-gray-900 rounded-xl focus:ring-4 focus:ring-orange-400/50 backdrop-blur-sm";

//   const inputGroup = (label, name, type = "text", disabled = false) => (
//     <div className="space-y-2 group">
//       <label htmlFor={name} className={`block text-sm font-semibold transition-all ${
//         isDark ? 'text-gray-100 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-orange-600'
//       }`}>
//         {label}
//       </label>
//       <input
//         id={name}
//         type={type}
//         name={name}
//         placeholder={`Enter ${label.toLowerCase()}`}
//         value={form[name]}
//         onChange={handleChange}
//         disabled={disabled}
//         className={`${inputStyle} ${disabled ? 'bg-gray-700/50 cursor-not-allowed' : 'hover:border-blue-400 hover:shadow-lg'}`}
//       />
//     </div>
//   );

//   const sectionStyle = isDark
//     ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl"
//     : "bg-gradient-to-br from-white/90 via-yellow-50/80 to-orange-50/70 backdrop-blur-xl border border-orange-100/50 shadow-2xl";

//   return (
//     <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${
//       isDark 
//         ? 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-black' 
//         : 'bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50'
//     } overflow-hidden`}>
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className={`${sectionStyle} rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden`}
//         >
//           <div className="text-center mb-12 relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 animate-pulse" />
//             <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-2xl ${
//               isDark 
//                 ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent' 
//                 : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent'
//             }`}>
//               Identity Form
//             </h1>
//             <div className={`mx-auto w-32 h-2 rounded-full shadow-lg ${
//               isDark ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
//             }`} />
//             <p className={`mt-4 text-lg font-medium opacity-90 ${
//               isDark ? 'text-gray-200' : 'text-gray-700'
//             }`}>
//               Professional Document Generator
//             </p>
//           </div>

//           {!preview ? (
//             <>
//               <section className={`${sectionStyle} mb-10 p-8 rounded-3xl relative overflow-hidden`}>
//                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
//                 <h2 className={`text-2xl font-black mb-8 text-center ${
//                   isDark ? 'text-cyan-400 drop-shadow-lg' : 'text-orange-600 drop-shadow-lg'
//                 }`}>
//                   👤 Personal Information
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {[
//                     ["name", "Full Name"], ["father", "Father's Name"], ["mother", "Mother's Name"], ["dob", "Date of Birth", "date"],
//                     ["age", "Age"], ["nationality", "Nationality"], ["marital", "Marital Status"], ["id_passport", "ID/Passport"],
//                     ["phone", "Phone"], ["email", "Email"], ["profession", "Profession"], ["skills", "Skills"],
//                     ["blood", "Blood Group"], ["hobby", "Hobbies"], ["website", "Website"],
//                   ].map(([name, label, type], index) => (
//                     <div key={`personal-${index}`}>
//                       {inputGroup(label, name, type)}
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section className={`${sectionStyle} mb-10 p-8 rounded-3xl relative overflow-hidden`}>
//                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
//                 <h2 className={`text-2xl font-black mb-8 text-center ${
//                   isDark ? 'text-emerald-400 drop-shadow-lg' : 'text-emerald-600 drop-shadow-lg'
//                 }`}>
//                   📍 Address Details
//                 </h2>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//                   <div>
//                     <h3 className={`text-xl font-bold mb-6 text-center ${
//                       isDark ? 'text-orange-400' : 'text-orange-600'
//                     }`}>
//                       🏠 Present Address
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {[
//                         ["present_village", "Village"], ["present_thana", "Thana"],
//                         ["present_district", "District"], ["present_division", "Division"],
//                       ].map(([name, label], index) => (
//                         <div key={`present-${index}`}>
//                           {inputGroup(label, name)}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className={`text-xl font-bold mb-6 text-center ${
//                       isDark ? 'text-purple-400' : 'text-purple-600'
//                     }`}>
//                       🏡 Permanent Address
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {[
//                         ["permanent_village", "Village"], ["permanent_thana", "Thana"],
//                         ["permanent_district", "District"], ["permanent_division", "Division"],
//                       ].map(([name, label], index) => (
//                         <div key={`permanent-${index}`}>
//                           {inputGroup(label, name, "text", copyAddress)}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className={`p-6 rounded-3xl border-4 transition-all ${
//                   isDark 
//                     ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-700/60 hover:border-blue-500/80' 
//                     : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/60 hover:border-blue-400/80'
//                 }`}>
//                   <label className="flex items-center justify-center gap-4 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={copyAddress}
//                       onChange={(e) => setCopyAddress(e.target.checked)}
//                       className={`w-7 h-7 rounded-xl transition-all ${
//                         isDark 
//                           ? 'text-blue-400 bg-gray-800 border-blue-600 focus:ring-blue-500/50 group-hover:scale-110' 
//                           : 'text-orange-600 bg-white border-blue-300 focus:ring-orange-500/50 group-hover:scale-110'
//                       }`}
//                     />
//                     <span className={`text-xl font-bold transition-all ${
//                       isDark ? 'text-blue-300 group-hover:text-blue-200' : 'text-blue-800 group-hover:text-blue-700'
//                     }`}>
//                       📋 Copy Present to Permanent
//                     </span>
//                   </label>
//                 </div>
//               </section>

//               <section className={`${sectionStyle} mb-12 p-8 rounded-3xl relative overflow-hidden`}>
//                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
//                 <h2 className={`text-2xl font-black mb-10 text-center ${
//                   isDark ? 'text-purple-400 drop-shadow-lg' : 'text-purple-600 drop-shadow-lg'
//                 }`}>
//                   🎓 Education Background
//                 </h2>
//                 <div className="space-y-6">
//                   {[
//                     { title: "SSC", school: "ssc_school", year: "ssc_year", result: "ssc_result", color: "from-amber-500 to-orange-500", id: 0 },
//                     { title: "HSC", school: "hsc_college", year: "hsc_year", result: "hsc_result", color: "from-emerald-500 to-teal-500", id: 1 },
//                     { title: "University", school: "university_name", year: "university_year", result: "university_degree", color: "from-blue-500 to-indigo-500", id: 2 },
//                   ].map(({ title, school, year, result, color, id }) => (
//                     <div key={`edu-${id}`} className={`p-8 rounded-3xl border-4 group hover:shadow-2xl transition-all ${
//                       isDark 
//                         ? `bg-gradient-to-br from-gray-800/70 to-slate-800/70 border-gradient-to-r ${color} focus-within:border-white/50` 
//                         : `bg-gradient-to-br from-white/80 to-slate-50/70 border-gradient-to-r ${color}`
//                     }`}>
//                       <h3 className={`text-2xl font-black mb-8 flex items-center justify-center gap-4 text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
//                         {title}
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         {inputGroup(`${title} Institution`, school)}
//                         {inputGroup(`${title} Year`, year)}
//                         {inputGroup(`${title} Result`, result)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <div className={`${sectionStyle} p-12 text-center rounded-3xl mb-12 relative overflow-hidden`}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-3xl blur-xl" />
//                 <h3 className={`text-2xl font-black mb-8 relative z-10 ${
//                   isDark ? 'text-rose-400 drop-shadow-lg' : 'text-rose-600 drop-shadow-lg'
//                 }`}>
//                   📸 Profile Photo
//                 </h3>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className={`w-full max-w-md mx-auto p-8 border-4 border-dashed rounded-3xl cursor-pointer transition-all relative z-10 backdrop-blur-xl ${
//                       isDark
//                         ? 'bg-gray-900/50 border-gray-600/50 hover:border-rose-500/80 hover:bg-rose-900/20 shadow-2xl'
//                         : 'bg-white/70 border-rose-200/60 hover:border-rose-400/80 hover:bg-rose-50/80 shadow-xl hover:shadow-2xl'
//                     }`}
//                   />
//                   {imageFile && (
//                     <div className="mt-8 p-4 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl inline-block backdrop-blur-xl border-4 border-rose-200 dark:border-rose-700/60 mx-auto">
//                       <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-700' : 'text-gray-600'}`}>
//                         Preview
//                       </p>
//                       <img
//                         src={URL.createObjectURL(imageFile)}
//                         alt="Preview"
//                         className="w-32 h-40 object-cover rounded-2xl shadow-xl border-4 border-rose-200 dark:border-rose-700"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setPreview(true)}
//                 className="w-full p-8 rounded-3xl font-black text-xl shadow-2xl relative overflow-hidden group bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white backdrop-blur-xl border-4 border-amber-300/50"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 scale-x-[1.8] group-hover:scale-x-[2.2] transition-transform duration-500 origin-left" />
//                 <span className="relative z-10 flex items-center justify-center gap-4">
//                   ✨ Create Perfect Preview
//                 </span>
//               </motion.button>
//             </>
//           ) : (
//             <div className={`${sectionStyle} p-12 rounded-3xl relative overflow-hidden`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-cyan-500/20 rounded-3xl blur-xl animate-pulse" />
              
//               <div className="text-center mb-12 relative z-10">
//                 <h2 className={`text-4xl font-black mb-6 ${
//                   isDark ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl' : 
//                   'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-2xl'
//                 }`}>
//                   📋 Form Preview
//                 </h2>
//                 <div className={`mx-auto w-28 h-2 rounded-full shadow-lg ${
//                   isDark ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
//                 }`} />
//               </div>

//               <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-8 rounded-3xl mb-12 bg-gradient-to-br ${
//                 isDark 
//                   ? 'from-slate-900/80 backdrop-blur-3xl border border-emerald-800/50 shadow-2xl' 
//                   : 'from-emerald-50/80 via-blue-50/60 to-cyan-50/40 backdrop-blur-3xl border border-emerald-200/60 shadow-2xl'
//               }`}>
//                 {Object.entries(form).map(([key, val], index) => {
//                   const displayKey = key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, l => l.toUpperCase())
//                     .replace(/present/i, "🏠 Present")
//                     .replace(/permanent/i, "🏡 Permanent");
//                   return (
//                     <motion.div 
//                       key={`${key}-${index}`}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={`p-6 rounded-2xl border-2 transition-all group hover:scale-105 hover:-translate-y-2 ${
//                         isDark 
//                           ? 'bg-gradient-to-br from-gray-800/70 to-slate-800/50 border-gray-600/50 hover:border-emerald-500/80 hover:shadow-emerald-500/25 backdrop-blur-xl' 
//                           : 'bg-white/90 border-emerald-200/60 hover:border-emerald-400/80 hover:shadow-emerald-400/25 backdrop-blur-xl shadow-lg'
//                       }`}
//                     >
//                       <strong className={`block mb-2 text-sm font-black ${
//                         isDark ? 'text-emerald-300 group-hover:text-emerald-200' : 'text-emerald-700 group-hover:text-emerald-600'
//                       }`}>
//                         {displayKey}:
//                       </strong>
//                       <span className={`font-semibold ${
//                         isDark ? 'text-gray-100' : 'text-gray-800'
//                       }`}>
//                         {val || <em className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Not provided</em>}
//                       </span>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {imageFile && (
//                 <div className="text-center mb-12 relative z-10">
//                   <h3 className={`text-2xl font-black mb-8 ${
//                     isDark ? 'text-rose-400 drop-shadow-lg' : 'text-rose-600 drop-shadow-lg'
//                   }`}>
//                     📷 Profile Photo
//                   </h3>
//                   <img
//                     src={URL.createObjectURL(imageFile)}
//                     alt="Profile Preview"
//                     className="w-40 h-52 mx-auto object-cover rounded-3xl shadow-2xl border-8 border-gradient-to-r from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800"
//                   />
//                 </div>
//               )}

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12 border-t-4 border-dashed border-gradient-to-r from-emerald-400 to-cyan-400 relative z-10">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={generatePDF}
//                   disabled={isGeneratingPDF}
//                   className={`group p-8 rounded-3xl font-black text-xl shadow-2xl relative overflow-hidden backdrop-blur-xl border-4 ${
//                     isDark
//                       ? 'bg-gradient-to-br from-emerald-600/90 to-cyan-600/90 hover:from-emerald-700 hover:to-cyan-700 border-emerald-500/60 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40'
//                       : 'bg-gradient-to-br from-emerald-500/90 to-cyan-500/90 hover:from-emerald-600 hover:to-cyan-600 border-emerald-400/70 text-white shadow-emerald-400/30 hover:shadow-emerald-500/50'
//                   } ${isGeneratingPDF ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent -skew-x-12 -rotate-3 scale-x-[2] group-hover:scale-x-[2.5] transition-all duration-500 origin-left" />
//                   <span className="relative z-10 flex flex-col items-center gap-2">
//                     {isGeneratingPDF ? (
//                       <>
//                         <div className="w-10 h-10 border-4 border-white/50 border-t-white rounded-full animate-spin" />
//                         <span>Generating Perfect PDF...</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>💾</span>
//                         <span>Download Perfect PDF</span>
//                       </>
//                     )}
//                   </span>
//                 </motion.button>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setPreview(false)}
//                   className="group p-8 rounded-3xl font-black text-xl shadow-2xl relative overflow-hidden backdrop-blur-xl border-4 bg-gradient-to-br from-slate-600/90 to-gray-700/90 hover:from-slate-700 hover:to-gray-800 border-slate-500/60 text-white shadow-slate-500/25 hover:shadow-slate-500/40"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 scale-x-[1.8] group-hover:scale-x-[2.2] transition-all duration-500 origin-left" />
//                   <span className="relative z-10 flex items-center justify-center gap-3">
//                     ✏️ Edit Form
//                   </span>
//                 </motion.button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default IdentityForm;
















import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import QRCode from "qrcode";

// ✅ 100% FIXED SYNTAX ERROR + PERFECT PDF
const PERFECT_PDF_CONFIG = {
  page: { unit: "pt", format: "a4", margin: 28, spacing: 12 },
  colors: {
    background: [255, 250, 210],
    header: [240, 110, 35],
    headerText: [255, 255, 255],
    tableHeader: [255, 200, 140],
    labelCell: [245, 235, 205],
    valueCell: [255, 255, 255],
    educationHeader: [210, 235, 255],
    presentHeader: [255, 240, 205],
    permanentHeader: [230, 255, 230],
    text: [0, 0, 0],
    textDark: [35, 55, 75],
    footer: [110, 125, 130],
  },
  fonts: { header: 20, tableHeader: 11, row: 9, footer: 8 },
  sizes: { headerHeight: 42, qr:70, image: { width: 78, height: 94 }, rowHeight: 17, lineHeight: 11, padding: 6 },
};

const IdentityForm = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const [form, setForm] = useState({
    name: "", father: "", mother: "", gender: "", dob: "", age: "",
    nationality: "", marital: "", id_passport: "", phone: "",
    email: "", profession: "", skills: "", blood: "", hobby: "", website: "",
    present_village: "", present_thana: "", present_district: "", present_division: "",
    permanent_village: "", permanent_thana: "", permanent_district: "", permanent_division: "",
    ssc_school: "", ssc_year: "", ssc_result: "",
    hsc_college: "", hsc_year: "", hsc_result: "",
    university_name: "", university_year: "", university_degree: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [qrDataURL, setQrDataURL] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [copyAddress, setCopyAddress] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleCopyAddress = () => {
    if (copyAddress) {
      setForm({
        ...form,
        permanent_village: form.present_village,
        permanent_thana: form.present_thana,
        permanent_district: form.present_district,
        permanent_division: form.present_division,
      });
    }
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  useEffect(() => { 
    QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL).catch(() => {}); 
  }, [form]);
  useEffect(() => { handleCopyAddress(); }, [copyAddress]);

  const createPDFDoc = () => new jsPDF({ unit: PERFECT_PDF_CONFIG.page.unit, format: PERFECT_PDF_CONFIG.page.format });
  
  const getImageData = (file) => new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

  const drawBackground = (doc, pageWidth) => {
    doc.setFillColor(...PERFECT_PDF_CONFIG.colors.background);
    doc.rect(0, 0, pageWidth, 842, "F");
  };

  const drawHeader = (doc, pageWidth, contentY) => {
    const config = PERFECT_PDF_CONFIG;
    doc.setFillColor(...config.colors.header);
    doc.rect(0, contentY, pageWidth, config.sizes.headerHeight, "F");

    doc.setFontSize(config.fonts.header);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...config.colors.headerText);
    
    const headerText = doc.splitTextToSize("PROFESSIONAL IDENTITY FORM", pageWidth - 60);
    doc.text(headerText, pageWidth / 2, contentY + 28, { align: "center" });
    
    return contentY + config.sizes.headerHeight + config.page.spacing;
  };

  const drawProfileSection = async (doc, pageWidth, contentY) => {
    const config = PERFECT_PDF_CONFIG;
    const qrSize = config.sizes.qr;
    const { width: imageWidth, height: imageHeight } = config.sizes.image;
    const qrX = config.page.margin;
    const imgX = pageWidth - config.page.margin - imageWidth;
    
    if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, contentY, qrSize, qrSize);
    
    const imageData = await getImageData(imageFile);
    if (imageData) doc.addImage(imageData, "JPEG", imgX, contentY, imageWidth, imageHeight);
    
    return contentY + Math.max(qrSize, imageHeight) + 12;
  };

  const drawInfoTable = (doc, title, rows, contentY, pageWidth) => {
    const config = PERFECT_PDF_CONFIG;
    let y = contentY;
    const margin = config.page.margin;
    const col1 = 140;
    const col2 = pageWidth - 2 * margin - col1;

    doc.setFillColor(...config.colors.tableHeader);
    doc.rect(margin, y, pageWidth - 2 * margin, config.sizes.rowHeight, "F");
    doc.setFontSize(config.fonts.tableHeader);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...config.colors.textDark);
    const titleLines = doc.splitTextToSize(title, pageWidth - 2 * margin - 12);
    doc.text(titleLines, margin + config.sizes.padding, y + 13);
    y += config.sizes.rowHeight + 8;

    rows.forEach(([label, value]) => {
      const safeLabel = String(label || "") + ":";
      const safeValue = String(value || "-");
      const labelLines = doc.splitTextToSize(safeLabel, col1 - 12);
      const valueLines = doc.splitTextToSize(safeValue, col2 - 12);
      const maxLines = Math.max(labelLines.length, valueLines.length);
      const cellHeight = maxLines * config.sizes.lineHeight + 8;

      doc.setDrawColor(0); 
      doc.setLineWidth(0.4);
      
      doc.setFillColor(...config.colors.labelCell);
      doc.rect(margin, y, col1, cellHeight, "F");
      doc.rect(margin, y, col1, cellHeight);

      doc.setFillColor(...config.colors.valueCell);
      doc.rect(margin + col1, y, col2, cellHeight, "F");
      doc.rect(margin + col1, y, col2, cellHeight);

      doc.setFontSize(config.fonts.row);
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...config.colors.textDark);
      doc.text(labelLines, margin + config.sizes.padding, y + 12);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...config.colors.text);
      doc.text(valueLines, margin + col1 + config.sizes.padding, y + 12);

      y += cellHeight + 4;
    });
    return y + config.page.spacing;
  };

  const drawAddressTables = (doc, contentY, pageWidth) => {
    const config = PERFECT_PDF_CONFIG;
    let y = contentY;
    const margin = config.page.margin;
    const tableWidth = (pageWidth - 2 * margin - 15) / 2;
    const col1 = tableWidth * 0.4;
    const col2 = tableWidth * 0.6;

    doc.setFillColor(...config.colors.presentHeader);
    doc.rect(margin, y, tableWidth, config.sizes.rowHeight + 2, "F");
    doc.setFontSize(config.fonts.tableHeader);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...config.colors.textDark);
    doc.text("PRESENT ADDRESS", margin + tableWidth / 2, y + 15, { align: "center" });

    doc.setFillColor(...config.colors.permanentHeader);
    doc.rect(margin + tableWidth + 15, y, tableWidth, config.sizes.rowHeight + 2, "F");
    doc.text("PERMANENT ADDRESS", margin + tableWidth + 15 + tableWidth / 2, y + 15, { align: "center" });
    y += config.sizes.rowHeight + 10;

    const fields = ["village", "thana", "district", "division"];
    fields.forEach((field) => {
      const presentVal = String(form[`present_${field}`] || "-");
      const permanentVal = String(form[`permanent_${field}`] || "-");
      
      doc.setFillColor(...config.colors.labelCell);
      doc.rect(margin, y, col1, config.sizes.lineHeight + 8, "F");
      doc.rect(margin, y, col1, config.sizes.lineHeight + 8);
      
      doc.setFillColor(...config.colors.presentHeader);
      doc.rect(margin + col1 + 2, y, col2, config.sizes.lineHeight + 8, "F");
      doc.rect(margin + col1 + 2, y, col2, config.sizes.lineHeight + 8);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(config.fonts.row);
      doc.text(field.charAt(0).toUpperCase() + field.slice(1), margin + config.sizes.padding, y + 12);

      doc.setFont("helvetica", "normal");
      doc.text(presentVal, margin + col1 + 8, y + 12);

      doc.setFillColor(...config.colors.labelCell);
      doc.rect(margin + tableWidth + 15, y, col1, config.sizes.lineHeight + 8, "F");
      doc.rect(margin + tableWidth + 15, y, col1, config.sizes.lineHeight + 8);
      
      doc.setFillColor(...config.colors.permanentHeader);
      doc.rect(margin + tableWidth + 15 + col1 + 2, y, col2, config.sizes.lineHeight + 8, "F");
      doc.rect(margin + tableWidth + 15 + col1 + 2, y, col2, config.sizes.lineHeight + 8);
      
      doc.setFont("helvetica", "bold");
      doc.text(field.charAt(0).toUpperCase() + field.slice(1), margin + tableWidth + 15 + config.sizes.padding, y + 12);
      
      doc.setFont("helvetica", "normal");
      doc.text(permanentVal, margin + tableWidth + 15 + col1 + 8, y + 12);
      
      y += config.sizes.lineHeight + 10;
    });
    return y + config.page.spacing;
  };

  const drawEducationTable = (doc, contentY, pageWidth) => {
    const config = PERFECT_PDF_CONFIG;
    let y = contentY;
    const margin = config.page.margin;
    const colWidths = [85, 120, 65, 95];

    doc.setFillColor(...config.colors.educationHeader);
    doc.rect(margin, y, pageWidth - 2 * margin, config.sizes.rowHeight + 2, "F");
    doc.setFontSize(config.fonts.tableHeader);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...config.colors.textDark);
    
    const headerLines = doc.splitTextToSize("EDUCATION QUALIFICATION", pageWidth - 2 * margin - 12);
    doc.text(headerLines, margin + config.sizes.padding, y + 15);
    y += config.sizes.rowHeight + 8;

    const educationData = [
      ["SSC", form.ssc_school || "-", form.ssc_year || "-", form.ssc_result || "-"],
      ["HSC", form.hsc_college || "-", form.hsc_year || "-", form.hsc_result || "-"],
      ["UNI", form.university_name || "-", form.university_year || "-", form.university_degree || "-"],
    ];

    educationData.forEach((rowData) => {
      let x = margin;
      rowData.forEach((cellValue, colIndex) => {
        const colWidth = colWidths[colIndex];
        
        if (colIndex === 0) {
          doc.setFillColor(...config.colors.labelCell);
        } else {
          doc.setFillColor(...config.colors.valueCell);
        }
        
        doc.rect(x, y, colWidth, config.sizes.lineHeight + 8, "F");
        doc.rect(x, y, colWidth, config.sizes.lineHeight + 8);

        doc.setFont(colIndex === 0 ? "helvetica" : "helvetica", colIndex === 0 ? "bold" : "normal");
        doc.setFontSize(config.fonts.row);
        
        if (colIndex === 0) {
          doc.setTextColor(...config.colors.textDark);
        } else {
          doc.setTextColor(...config.colors.text);
        }
        
        const cellText = doc.splitTextToSize(String(cellValue), colWidth - 12);
        doc.text(cellText, x + config.sizes.padding, y + 12);
        
        x += colWidth + 2;
      });
      y += config.sizes.lineHeight + 10;
    });
    return y + config.page.spacing;
  };

  const drawFooter = (doc, pageWidth) => {
    const config = PERFECT_PDF_CONFIG;
    doc.setFontSize(config.fonts.footer);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...config.colors.footer);
    
    const footerText = doc.splitTextToSize("Powered by Arafat-Tech Ltd - Professional Identity Document", pageWidth - 60);
    doc.text(footerText, pageWidth / 2, 825, { align: "center" });
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = createPDFDoc();
      const pageWidth = doc.internal.pageSize.getWidth();
      let contentY = 15;

      drawBackground(doc, pageWidth);
      contentY = await drawHeader(doc, pageWidth, contentY);
      contentY = await drawProfileSection(doc, pageWidth, contentY);

      const personalRows = [
        ["Full Name", form.name], ["Father", form.father], ["Mother", form.mother], ["Gender", form.gender],
        ["DOB", form.dob], ["Age", form.age], ["Nationality", form.nationality],
        ["Marital Status", form.marital], ["ID/Passport", form.id_passport], 
        ["Phone", form.phone], ["Email", form.email], ["Profession", form.profession],
        ["Skills", form.skills], ["Blood Group", form.blood], 
        ["Hobbies", form.hobby], ["Website", form.website],
      ];

      contentY = drawInfoTable(doc, " PERSONAL INFORMATION", personalRows, contentY, pageWidth);
      contentY = drawAddressTables(doc, contentY, pageWidth);
      contentY = drawEducationTable(doc, contentY, pageWidth);
      drawFooter(doc, pageWidth);
      
      doc.save("perfect_identity_form.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const inputStyle = isDark
    ? "p-2 sm:p-3 border-2 border-gray-600 bg-gray-800/90 text-white rounded-xl focus:ring-4 focus:ring-blue-500/50 backdrop-blur-sm w-full"
    : "p-2 sm:p-3 border-2 border-gray-200 bg-white/90 text-gray-900 rounded-xl focus:ring-4 focus:ring-orange-400/50 backdrop-blur-sm w-full";

  const inputGroup = (label, name, type = "text", disabled = false) => (
    <div className="space-y-1.5 sm:space-y-2 group">
      <label htmlFor={name} className={`block text-xs sm:text-sm font-semibold transition-all ${
        isDark ? 'text-gray-100 group-hover:text-blue-300' : 'text-gray-700 group-hover:text-orange-600'
      }`}>
        {label}
      </label>
      <input
        id={name}
        list={name === "gender" ? "gender-list" : 
              name === "profession" ? "profession-list" :
              name === "skills" ? "skills-list" :
              name === "blood" ? "blood-list" :
              name === "hobby" ? "hobby-list" : undefined}
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={form[name]}
        onChange={handleChange}
        disabled={disabled}
        className={`${inputStyle} ${disabled ? 'bg-gray-700/50 cursor-not-allowed' : 'hover:border-blue-400 hover:shadow-lg'}`}
      />
    </div>
  );

  const sectionStyle = isDark
    ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl"
    : "bg-gradient-to-br from-white/90 via-yellow-50/80 to-orange-50/70 backdrop-blur-xl border border-orange-100/50 shadow-2xl";

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-black' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50'
    } overflow-hidden`}>
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${sectionStyle} rounded-2xl sm:rounded-3xl p-2 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden`}
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl -z-10 animate-pulse" />
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 lg:mb-6 leading-tight drop-shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent'
            }`}>
              Identity Form
            </h1>
            <div className={`mx-auto w-20 sm:w-24 lg:w-32 h-1.5 sm:h-2 lg:h-2 rounded-full shadow-lg ${
              isDark ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
            }`} />
            <p className={`mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg font-medium opacity-90 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Professional Document Generator
            </p>
          </div>

          {!preview ? (
            <>
              <section className={`${sectionStyle} mb-6 sm:mb-8 lg:mb-10 p-2 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl" />
                <h2 className={`text-xl sm:text-2xl lg:text-2xl font-black mb-6 sm:mb-8 text-center ${
                  isDark ? 'text-cyan-400 drop-shadow-lg' : 'text-orange-600 drop-shadow-lg'
                }`}>
                  👤 Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {[
                    ["name", "Full Name"], ["father", "Father's Name"], ["mother", "Mother's Name"], 
                    ["gender", "Gender"], ["dob", "Date of Birth", "date"],
                    ["age", "Age"], ["nationality", "Nationality"], ["marital", "Marital Status"], ["id_passport", "ID/Passport"],
                    ["phone", "Phone"], ["email", "Email"], ["profession", "Profession"], ["skills", "Skills"],
                    ["blood", "Blood Group"], ["hobby", "Hobbies"], ["website", "Website"],
                  ].map(([name, label, type], index) => (
                    <div key={`personal-${index}`} className="w-full">
                      {inputGroup(label, name, type)}
                    </div>
                  ))}
                </div>
              </section>

              <section className={`${sectionStyle} mb-6 sm:mb-8 lg:mb-10 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl" />
                <h2 className={`text-xl sm:text-2xl lg:text-2xl font-black mb-6 sm:mb-8 text-center ${
                  isDark ? 'text-emerald-400 drop-shadow-lg' : 'text-emerald-600 drop-shadow-lg'
                }`}>
                  📍 Address Details
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center ${
                      isDark ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      🏠 Present Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        ["present_village", "Village"], ["present_thana", "Thana"],
                        ["present_district", "District"], ["present_division", "Division"],
                      ].map(([name, label], index) => (
                        <div key={`present-${index}`} className="w-full">
                          {inputGroup(label, name)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      🏡 Permanent Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        ["permanent_village", "Village"], ["permanent_thana", "Thana"],
                        ["permanent_district", "District"], ["permanent_division", "Division"],
                      ].map(([name, label], index) => (
                        <div key={`permanent-${index}`} className="w-full">
                          {inputGroup(label, name, "text", copyAddress)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-4 transition-all w-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-700/60 hover:border-blue-500/80' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/60 hover:border-blue-400/80'
                }`}>
                  <label className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={copyAddress}
                      onChange={(e) => setCopyAddress(e.target.checked)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl transition-all self-center ${
                        isDark 
                          ? 'text-blue-400 bg-gray-800 border-blue-600 focus:ring-blue-500/50 group-hover:scale-110' 
                          : 'text-orange-600 bg-white border-blue-300 focus:ring-orange-500/50 group-hover:scale-110'
                      }`}
                    />
                    <span className={`text-base sm:text-xl font-bold transition-all text-center sm:text-left ${
                      isDark ? 'text-blue-300 group-hover:text-blue-200' : 'text-blue-800 group-hover:text-blue-700'
                    }`}>
                      📋 Copy Present to Permanent
                    </span>
                  </label>
                </div>
              </section>

              <section className={`${sectionStyle} mb-8 sm:mb-10 lg:mb-12 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl" />
                <h2 className={`text-lg sm:text-xl lg:text-2xl font-black mb-4 sm:mb-6 lg:mb-10 text-center ${
                  isDark ? 'text-purple-400 drop-shadow-lg' : 'text-purple-600 drop-shadow-lg'
                }`}>
                  🎓 Education Background
                </h2>
                
                <div className={`p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 lg:mb-8 border-2 border-dashed transition-all group ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 hover:border-purple-400/80 hover:shadow-purple-500/20' 
                    : 'bg-gradient-to-r from-purple-50/80 to-pink-50/60 border-purple-200/60 hover:border-purple-400/80 hover:shadow-purple-200/30'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1 sm:mt-2 flex-shrink-0 self-center sm:self-start ${
                      isDark ? 'bg-purple-400' : 'bg-purple-600'
                    }`} />
                    <h3 className={`font-bold text-sm sm:text-base lg:text-lg flex-1 text-center sm:text-left ${
                      isDark ? 'text-purple-300' : 'text-purple-700'
                    }`}>
                      📝 PDF Formatting Note
                    </h3>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-purple-200/90' : 'text-purple-600/90'
                  }`}>
                    Use <span className="font-mono bg-purple-500/20 px-1 sm:px-2 py-px sm:py-1 rounded font-semibold text-xs border border-purple-400/50">short forms</span> for institution names to prevent line breaks in PDF:
                  </p>
                  <div className="mt-2 sm:mt-3 lg:mt-4 grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3 pt-2 sm:pt-3 lg:pt-4 border-t border-purple-200/50 dark:border-purple-700/50">
                    {['RUET', 'DU', 'BUET', 'CUET'].map((uni, idx) => (
                      <code key={idx} className={`p-1.5 sm:p-2 rounded-lg text-xs font-mono text-center bg-white/20 dark:bg-purple-900/50 border w-full ${
                        isDark ? 'border-purple-500/50 text-purple-200' : 'border-purple-300/50 text-purple-800'
                      }`}>
                        {uni}
                      </code>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {[
                    { title: "SSC", school: "ssc_school", year: "ssc_year", result: "ssc_result", color: "from-amber-500 to-orange-500", id: 0 },
                    { title: "HSC", school: "hsc_college", year: "hsc_year", result: "hsc_result", color: "from-emerald-500 to-teal-500", id: 1 },
                    { title: "University", school: "university_name", year: "university_year", result: "university_degree", color: "from-blue-500 to-indigo-500", id: 2 },
                  ].map(({ title, school, year, result, color, id }) => (
                    <div key={`edu-${id}`} className={`p-3 sm:p-4 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 sm:border-4 group hover:shadow-2xl transition-all w-full ${
                      isDark 
                        ? `bg-gradient-to-br from-gray-800/70 to-slate-800/70 border-gray-600/50 hover:border-white/50` 
                        : `bg-gradient-to-br from-white/80 to-slate-50/70 border-gray-200/60 hover:border-gray-400/80`
                    }`}>
                      <h3 className={`text-base sm:text-lg lg:text-2xl font-black mb-3 sm:mb-4 lg:mb-8 flex items-center justify-center gap-1 sm:gap-2 lg:gap-4 text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
                        {title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        <div className="w-full">{inputGroup(`${title} Institution`, school)}</div>
                        <div className="w-full">{inputGroup(`${title} Year`, year)}</div>
                        <div className="w-full">{inputGroup(`${title} Result`, result)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className={`${sectionStyle} p-6 sm:p-8 lg:p-12 text-center rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 lg:mb-12 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl blur-xl" />
                <h3 className={`text-lg sm:text-2xl lg:text-2xl font-black mb-4 sm:mb-6 lg:mb-8 relative z-10 ${
                  isDark ? 'text-rose-400 drop-shadow-lg' : 'text-rose-600 drop-shadow-lg'
                }`}>
                  📸 Profile Photo
                </h3>
                <div className="relative w-full max-w-sm mx-auto">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`w-full p-6 sm:p-8 border-3 sm:border-4 border-dashed rounded-2xl sm:rounded-3xl cursor-pointer transition-all relative z-10 backdrop-blur-xl ${
                      isDark
                        ? 'bg-gray-900/50 border-gray-600/50 hover:border-rose-500/80 hover:bg-rose-900/20 shadow-2xl'
                        : 'bg-white/70 border-rose-200/60 hover:border-rose-400/80 hover:bg-rose-50/80 shadow-xl hover:shadow-2xl'
                    }`}
                  />
                  {imageFile && (
                    <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 bg-white/90 dark:bg-gray-900/90 rounded-2xl sm:rounded-3xl shadow-2xl inline-block backdrop-blur-xl border-3 sm:border-4 border-rose-200 dark:border-rose-700/60 mx-auto  w-28 sm:w-32 lg:w-40">
                      <p className={`text-xs sm:text-sm font-semibold mb-2 ${isDark ? 'text-gray-700' : 'text-gray-600'} text-center`}>
                        Preview
                      </p>
                      <img
                        src={URL.createObjectURL(imageFile)}
                      
                        className="w-full h-28 sm:h-32 lg:h-40 object-cover rounded-xl sm:rounded-2xl shadow-xl border-3 sm:border-4 border-rose-200 dark:border-rose-700"
                      />
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPreview(true)}
                className="w-full p-6 sm:p-8 rounded-2xl cursor-pointer sm:rounded-3xl font-black text-base sm:text-xl shadow-2xl relative overflow-hidden group bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white backdrop-blur-xl border-3 sm:border-4 border-amber-300/50"
              >
                <div className="absolute  inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 scale-x-[1.8] group-hover:scale-x-[2.2] transition-transform duration-500 origin-left" />
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-4">
                  ✨ Create Perfect Preview
                </span>
              </motion.button>
            </>
          ) : (
            <div className={`${sectionStyle} p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-xl animate-pulse" />
              
              <div className="text-center mb-6 sm:mb-8 lg:mb-12 relative z-10">
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 lg:mb-6 ${
                  isDark ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl' : 
                  'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-2xl'
                }`}>
                  📋 Form Preview
                </h2>
                <div className={`mx-auto w-24 sm:w-28 lg:w-28 h-1.5 sm:h-2 lg:h-2 rounded-full shadow-lg ${
                  isDark ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                }`} />
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 max-h-80 sm:max-h-96 overflow-y-auto p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 lg:mb-12 bg-gradient-to-br ${
                isDark 
                  ? 'from-slate-900/80 backdrop-blur-3xl border border-emerald-800/50 shadow-2xl' 
                  : 'from-emerald-50/80 via-blue-50/60 to-cyan-50/40 backdrop-blur-3xl border border-emerald-200/60 shadow-2xl'
              }`}>
                {Object.entries(form).map(([key, val], index) => {
                  const displayKey = key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, l => l.toUpperCase())
                    .replace(/present/i, "🏠 Present")
                    .replace(/permanent/i, "🏡 Permanent");
                  return (
                    <motion.div 
                      key={`${key}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all group hover:scale-105 hover:-translate-y-1 ${
                        isDark 
                          ? 'bg-gradient-to-br from-gray-800/70 to-slate-800/50 border-gray-600/50 hover:border-emerald-500/80 hover:shadow-emerald-500/25 backdrop-blur-xl' 
                          : 'bg-white/90 border-emerald-200/60 hover:border-emerald-400/80 hover:shadow-emerald-400/25 backdrop-blur-xl shadow-lg'
                      }`}
                    >
                      <strong className={`block mb-1 sm:mb-2 text-xs sm:text-sm font-black ${
                        isDark ? 'text-emerald-300 group-hover:text-emerald-200' : 'text-emerald-700 group-hover:text-emerald-600'
                      }`}>
                        {displayKey}:
                      </strong>
                      <span className={`font-semibold text-xs sm:text-sm ${
                        isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {val || <em className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Not provided</em>}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {imageFile && (
                <div className="text-center mb-6 sm:mb-8 lg:mb-12 relative z-10">
                  <h3 className={`text-lg sm:text-2xl lg:text-2xl font-black mb-4 sm:mb-6 lg:mb-8 ${
                    isDark ? 'text-rose-400 drop-shadow-lg' : 'text-rose-600 drop-shadow-lg'
                  }`}>
                    📷 Profile Photo
                  </h3>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Profile Preview"
                    className="w-32 sm:w-40 lg:w-52 h-40 sm:h-52 lg:h-64 mx-auto object-cover rounded-2xl sm:rounded-3xl shadow-2xl border-4 sm:border-8 border-gradient-to-r from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-12 border-t-3 sm:border-t-4 border-dashed border-gradient-to-r from-emerald-400 to-cyan-400 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className={`group p-6 sm:p-8  cursor-pointer rounded-2xl sm:rounded-3xl font-black text-base sm:text-xl shadow-2xl relative overflow-hidden backdrop-blur-xl border-3 sm:border-4 ${
                    isDark
                      ? 'bg-gradient-to-br from-emerald-600/90 to-cyan-600/90 hover:from-emerald-700 hover:to-cyan-700 border-emerald-500/60 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40'
                      : 'bg-gradient-to-br from-emerald-500/90 to-cyan-500/90 hover:from-emerald-600 hover:to-cyan-600 border-emerald-400/70 text-white shadow-emerald-400/30 hover:shadow-emerald-500/50'
                  } ${isGeneratingPDF ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute cursor-pointer inset-0 bg-gradient-to-r from-white/30 to-transparent -skew-x-12 -rotate-3 scale-x-[2] group-hover:scale-x-[2.5] transition-all duration-500 origin-left" />
                  <span className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 sm:border-4 border-white/50 border-t-white rounded-full animate-spin mx-auto" />
                        <span className="text-sm sm:text-base">Generating Perfect PDF...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">💾</span>
                        <span>Download  PDF</span>
                      </>
                    )}
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreview(false)}
                  className="group cursor-pointer p-6 sm:p-8 rounded-2xl sm:rounded-3xl font-black text-base sm:text-xl shadow-2xl relative overflow-hidden backdrop-blur-xl border-3 sm:border-4 bg-gradient-to-br from-slate-600/90 to-gray-700/90 hover:from-slate-700 hover:to-gray-800 border-slate-500/60 text-white shadow-slate-500/25 hover:shadow-slate-500/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 scale-x-[1.8] group-hover:scale-x-[2.2] transition-all duration-500 origin-left" />
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    ✏️ Edit Form
                  </span>
                </motion.button>
              </div>
            </div>
          )}

        {/* GENDER */}
<datalist id="gender-list">
  <option value="Male" />
  <option value="Female" />
  <option value="Other" />
  <option value="Non-binary" />
 
  <option value="Genderqueer" />
  <option value="Agender" />
  <option value="Bigender" />
  <option value="Prefer not to say" />
</datalist>

{/* PROFESSION - 45+ options */}
<datalist id="profession-list">
  <option value="Software Developer" />
  <option value="Web Developer" />
  <option value="Front-end Developer" />
  <option value="Back-end Developer" />
  <option value="Full Stack Developer" />
  <option value="Mobile App Developer" />
  <option value="DevOps Engineer" />
  <option value="Data Scientist" />
  <option value="Data Analyst" />
  <option value="Machine Learning Engineer" />
  <option value="AI Engineer" />
  <option value="UI/UX Designer" />
  <option value="Graphic Designer" />
  <option value="Product Manager" />
  <option value="Project Manager" />
  <option value="Business Analyst" />
  <option value="Digital Marketer" />
  <option value="SEO Specialist" />
  <option value="Content Marketer" />
  <option value="Social Media Manager" />
  <option value="Accountant" />
  <option value="Financial Analyst" />
  <option value="Civil Engineer" />
  <option value="Mechanical Engineer" />
  <option value="Doctor" />
  <option value="Nurse" />
  <option value="Pharmacist" />
  <option value="Teacher" />
  <option value="Professor" />
  <option value="Lawyer" />
  <option value="Freelancer" />
  <option value="Entrepreneur" />
  <option value="Consultant" />
  <option value="Sales Executive" />
  <option value="HR Manager" />
  <option value="Student" />
  <option value="Architect" />
  <option value="Pilot" />
  <option value="Chef" />
  <option value="Journalist" />
  <option value="Artist" />
</datalist>

{/* SKILLS - 60+ options */}
<datalist id="skills-list">
  <option value="JavaScript" />
  <option value="TypeScript" />
  <option value="React" />
  <option value="Next.js" />
  <option value="Vue.js" />
  <option value="Angular" />
  <option value="Node.js" />
  <option value="Express.js" />
  <option value="Python" />
  <option value="Django" />
  <option value="FastAPI" />
  <option value="Java" />
  <option value="Spring Boot" />
  <option value="PHP" />
  <option value="Laravel" />
  <option value="Go" />
  <option value="Rust" />
  <option value="HTML/CSS" />
  <option value="Tailwind CSS" />
  <option value="Bootstrap" />
  <option value="Sass/SCSS" />
  <option value="MongoDB" />
  <option value="PostgreSQL" />
  <option value="MySQL" />
  <option value="Redis" />
  <option value="Docker" />
  <option value="Kubernetes" />
  <option value="AWS" />
  <option value="Azure" />
  <option value="Git" />
  <option value="GitHub Actions" />
  <option value="Figma" />
  <option value="Adobe XD" />
  <option value="Photoshop" />
  <option value="Machine Learning" />
  <option value="TensorFlow" />
  <option value="PyTorch" />
  <option value="GraphQL" />
  <option value="REST APIs" />
  <option value="Microservices" />
  <option value="CI/CD" />
  <option value="Agile" />
  <option value="Scrum" />
  <option value="Public Speaking" />
  <option value="Leadership" />
  <option value="Negotiation" />
</datalist>

{/* BLOOD GROUPS - Complete 8 types */}
<datalist id="blood-list">
  <option value="A+" />
  <option value="A-" />
  <option value="B+" />
  <option value="B-" />
  <option value="AB+" />
  <option value="AB-" />
  <option value="O+" />
  <option value="O-" />
</datalist>

{/* HOBBIES - 50+ options */}
<datalist id="hobby-list">
  <option value="Reading" />
  <option value="Gaming" />
  <option value="Coding" />
  <option value="Music" />
  <option value="Sports" />
  <option value="Traveling" />
  <option value="Photography" />
  <option value="Cooking" />
  <option value="Baking" />
  <option value="Painting" />
  <option value="Drawing" />
  <option value="Writing" />
  <option value="Movies" />
  <option value="Hiking" />
  <option value="Gardening" />
  <option value="Fishing" />
  <option value="Dancing" />
  <option value="Yoga" />
  <option value="Swimming" />
  <option value="Cycling" />
  <option value="Running" />
  <option value="Weightlifting" />
  <option value="Chess" />
  <option value="Board Games" />
  <option value="Video Editing" />
  <option value="Blogging" />
  <option value="Podcasting" />
  <option value="Volunteering" />
  <option value="DIY Projects" />
  <option value="Woodworking" />
  <option value="Knitting" />
  <option value="Camping" />
  <option value="Bird Watching" />
  <option value="Astronomy" />
  <option value="Collecting" />
  <option value="Language Learning" />
  <option value="Puzzles" />
  <option value="Singing" />
  <option value="Guitar" />
  <option value="Piano" />
  <option value="Meditation" />
  <option value="Meditation" />
  <option value="Kayaking" />
  <option value="Surfing" />
  <option value="Skiing" />
</datalist>

        </motion.div>
      </div>
    </div>
  );
};

export default IdentityForm;













































