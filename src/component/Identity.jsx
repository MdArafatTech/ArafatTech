

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";
// import QRCode from "qrcode";

// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
// const divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

// const districts = ["Dhaka","Faridpur","Gazipur","Gopalganj","Kishoreganj","Madaripur","Manikganj","Munshiganj","Narsingdi","Narayanganj","Netrokona","Shariatpur","Tangail","Chattogram","Bandarban","Brahmanbaria","Chandpur","Cox's Bazar","Feni","Khagrachhari","Lakshmipur","Noakhali","Rangamati","Khulna","Bagerhat","Chuadanga","Jashore","Jhenaidah","Kushtia","Magura","Meherpur","Narail","Satkhira","Rajshahi","Bogra","Joypurhat","Naogaon","Natore","Chapai Nawabganj","Pabna","Sirajganj","Barisal","Barguna","Bhola","Jhalokati","Patuakhali","Pirojpur","Sylhet","Habiganj","Moulvibazar","Sunamganj","Rangpur","Dinajpur","Kurigram","Lalmonirhat","Nilphamari","Panchagarh","Thakurgaon","Gaibandha","Mymensingh","Jamalpur","Netrokona","Sherpur"];

// const hobbies = ["Reading","Writing","Sports","Music","Traveling","Gaming","Cooking","Photography","Painting","Dancing","Singing","Hiking","Cycling","Gardening","Swimming","Yoga","Knitting","Fishing","Meditation"];

// const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];

// const Identity = () => {
// const [form, setForm] = useState({
//   name: "", father: "", mother: "", dob: "", age: "", gender: "", nationality: "",
//   religion: "", marital: "", blood: "", hobby: "", email: "", phone: "",
//   passport: "", website: "", linkedin: "", profession: "", skills: "",
//   presentVillage: "", presentThana: "", presentDistrict: "", presentDivision: "",
//   permanentVillage: "", permanentThana: "", permanentDistrict: "", permanentDivision: "",
//   sscResult: "", sscYear: "", sscInstitution: "",
//   hscResult: "", hscYear: "", hscInstitution: "",
//   universityResult: "", universityYear: "", universityInstitution: "",
// });
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
//         setForm(prev => ({
//           ...prev,
//           permanentVillage: prev.presentVillage,
//           permanentThana: prev.presentThana,
//           permanentDistrict: prev.presentDistrict,
//           permanentDivision: prev.presentDivision,
//         }));
//       }
//     } else {
//       setForm({ ...form, [name]: value });
//       if (sameAddress && ["presentVillage", "presentThana", "presentDistrict", "presentDivision"].includes(name)) {
//         setForm(prev => ({
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

//   const generatePDF = async () => {
//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 30;
//     const spacing = 6;
//     const rowHeight = 21;
//     let y = 10;

//     // Background
//     doc.setFillColor(255, 249, 195);
//     doc.rect(0, 0, pageWidth, pageHeight, "F");

//     // Header
//     const headerHeight = 50;
//     doc.setFillColor(250, 130, 50);
//     doc.rect(0, y, pageWidth, headerHeight, "F");
//     doc.setFontSize(22);
//     doc.setFont(undefined, "bold");
//     doc.setTextColor("#fff");
//     doc.text("IDENTITY FORM", pageWidth / 2, y + 33, { align: "center" });
//     y += headerHeight + spacing;

//     const qrSize = 80;
//     const imageWidth = 100;
//     const imageHeight = 120;
//     const qrX = margin;
//     const imgX = pageWidth - margin - imageWidth;
//     const topY = y;

//     const getImageData = (file) => new Promise((resolve) => {
//       if (!file) return resolve(null);
//       const reader = new FileReader();
//       reader.onload = (e) => resolve(e.target.result);
//       reader.readAsDataURL(file);
//     });

//     const imageData = await getImageData(imageFile);

//     if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, topY, qrSize, qrSize);
//     if (imageData) doc.addImage(imageData, "JPEG", imgX, topY, imageWidth, imageHeight);

//     let contentY = topY + Math.max(qrSize, imageHeight) + 8;

//    // --- PERSONAL INFORMATION TABLE WITH BORDERS ---
//   const drawInfoTable = (title, rows) => {
//     doc.setFillColor(250, 200, 150);
//     doc.rect(margin, contentY, pageWidth - 2 * margin, rowHeight, "F"); // title background
//     doc.setFontSize(12);
//     doc.setFont(undefined, "bold");
//     doc.setTextColor("#000");
//     doc.text(title, margin + 5, contentY + 15);
//     contentY += rowHeight;

//     const col1 = 150; // label width
//     const col2 = pageWidth - 2 * margin - col1; // value width

//     rows.forEach(([label, value]) => {
//       // Label cell with border
//       doc.setFillColor(245);
//       doc.rect(margin, contentY, col1, rowHeight, "F");
//       doc.rect(margin, contentY, col1, rowHeight); // border
//       doc.text(label + ":", margin + 5, contentY + 15);

//       // Value cell with border
//       doc.setFillColor(255);
//       doc.rect(margin + col1, contentY, col2, rowHeight, "F");
//       doc.rect(margin + col1, contentY, col2, rowHeight); // border
//       doc.text(value || "-", margin + col1 + 5, contentY + 15);

//       contentY += rowHeight;
//     });

//     contentY += spacing;
//   };

// drawInfoTable("Personal Information", [
//   ["Full Name", form.name],
//   ["Gender", form.gender],
//   ["Father's Name", form.father],
//   ["Mother's Name", form.mother],
//   ["Date of Birth", form.dob],
//   ["Age", form.age],
//   ["Nationality", form.nationality],
//   ["Religion", form.religion],
//   ["Marital Status", form.marital],
//   ["Blood Group", form.blood],
//   ["Hobby", form.hobby],
//   ["Passport / ID", form.passport],
//   ["Website", form.website],
//   ["LinkedIn", form.linkedin],
//   ["Profession", form.profession],
//   ["Skills", form.skills],
//   ["Email", form.email],
//   ["Phone", form.phone],
// ]);

// // --- NEW SIDE BY SIDE ADDRESS TABLES ---
// const drawAddressTables = () => {

//   const tableWidth = (pageWidth - 2 * margin - 20) / 2; 
//   const gap = 20;
//   const col1 = 80;
//   const col2 = tableWidth - col1;

//   const rows = [
//     ["Village", form.presentVillage, form.permanentVillage],
//     ["Thana", form.presentThana, form.permanentThana],
//     ["District", form.presentDistrict, form.permanentDistrict],
//     ["Division", form.presentDivision, form.permanentDivision],
//   ];

//   // HEADER BOX FOR BOTH TABLES
//   doc.setFillColor(250, 200, 150);
//   doc.rect(margin, contentY, tableWidth, rowHeight, "F");
//   doc.rect(margin + tableWidth + gap, contentY, tableWidth, rowHeight, "F");

//   doc.setFont(undefined, "bold");
//   doc.text("Present Address", margin + 5, contentY + 15);
//   doc.text("Permanent Address", margin + tableWidth + gap + 5, contentY + 15);

//   contentY += rowHeight;

//   rows.forEach(([label, present, permanent]) => {
//     // Left table
//     doc.rect(margin, contentY, col1, rowHeight);
//     doc.text(label, margin + 5, contentY + 15);

//     doc.rect(margin + col1, contentY, col2, rowHeight);
//     doc.text(present || "-", margin + col1 + 5, contentY + 15);

//     // Right table
//     doc.rect(margin + tableWidth + gap, contentY, col1, rowHeight);
//     doc.text(label, margin + tableWidth + gap + 5, contentY + 15);

//     doc.rect(margin + tableWidth + gap + col1, contentY, col2, rowHeight);
//     doc.text(permanent || "-", margin + tableWidth + gap + col1 + 5, contentY + 15);

//     contentY += rowHeight;
//   });

//   contentY += spacing;
// };

// // CALL THE NEW ADDRESS TABLE FUNCTION
// drawAddressTables();



//     // ** NEW EDUCATION TABLE WITH BORDERS **
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
//         doc.rect(margin, contentY, col1, rowHeight);
//         doc.text(label, margin + 5, contentY + 15);

//         doc.rect(margin + col1, contentY, col2, rowHeight);
//         doc.text(r || "-", margin + col1 + 5, contentY + 15);

//         doc.rect(margin + col1 + col2, contentY, col3, rowHeight);
//         doc.text(y || "-", margin + col1 + col2 + 5, contentY + 15);

//         doc.rect(margin + col1 + col2 + col3, contentY, col4, rowHeight);
//         doc.text(i || "-", margin + col1 + col2 + col3 + 5, contentY + 15);

//         contentY += rowHeight;
//       };

//       drawRow("SSC", form.sscResult, form.sscYear, form.sscInstitution);
//       drawRow("HSC", form.hscResult, form.hscYear, form.hscInstitution);
//       drawRow("University", form.universityResult, form.universityYear, form.universityInstitution);

//       contentY += spacing;
//     };

//     drawEducationTable();

//     // Footer
//     doc.setFontSize(7);
//     doc.setFont(undefined, "italic");
//     doc.setTextColor("#666");
//     const footerText = "Powered by ArafatTech";
//     const footerX = (pageWidth - doc.getTextWidth(footerText)) / 2;
//     const footerY = pageHeight - 20;
//     doc.text(footerText, footerX, footerY);





//     doc.save("identity_form.pdf");
//   };

//   const inputStyle = "p-3 border rounded-lg transition duration-200 hover:border-orange-400 w-full";

//   return (
//     <div className="min-h-screen flex items-start justify-center bg-yellow-50 text-black">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-4xl shadow-xl rounded-xl p-6 border bg-white mt-4"
//       >
//         <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
//           Identity Form – Arafat-Tech Ltd
//         </h2>

//         {!preview ? (
//           <>
//             {/* Personal Information */}
//             <h3 className="font-semibold mb-2 text-lg">Personal Information</h3>
      
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//   {[
//     ["name","Full Name"],
//     ["gender","Gender","select"], 
//     ["father","Father's Name"], 
//     ["mother","Mother's Name"],
//     ["dob","Date of Birth","date"], 
//     ["age","Age"], 
//     ["nationality","Nationality"],
//     ["religion","Religion","list"], 
//     ["marital","Marital Status"], 
//     ["blood","Blood Group","list"],
//     ["hobby","Hobby","list"], 
//     ["passport","Passport / ID"], 
//     ["website","Website"], 
//     ["linkedin","LinkedIn"], 
//     ["profession","Profession"], 
//     ["skills","Skills"], 
//     ["email","Email","email"], 
//     ["phone","Phone","tel"],
//   ].map(([name,label,type="text"]) => (
//     type === "list" ? (
//       <div key={name} className="flex flex-col">
//         <label className="font-semibold mb-1">{label}</label>
//         <input
//           list={name+"List"}
//           name={name}
//           placeholder={label}
//           value={form[name]}
//           onChange={handleChange}
//           className={inputStyle}
//         />
//         <datalist id={name+"List"}>
//           {name==="blood" && bloodGroups.map(v=><option key={v} value={v} />)}
//           {name==="hobby" && hobbies.map(v=><option key={v} value={v} />)}
//           {name==="religion" && religions.map(v=><option key={v} value={v} />)}
//         </datalist>
//       </div>
//     ) : type === "select" ? (
//       <div key={name} className="flex flex-col">
//         <label className="font-semibold mb-1">{label}</label>
//         <select name={name} value={form[name]} onChange={handleChange} className={inputStyle}>
//           <option value="">Select {label}</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//     ) : (
//       <div key={name} className="flex flex-col">
//         <label className="font-semibold mb-1">{label}</label>
//         <input
//           type={type}
//           name={name}
//           placeholder={label}
//           value={form[name]}
//           onChange={handleChange}
//           className={inputStyle}
//         />
//       </div>
//     )
//   ))}
// </div>

//             {/* Addresses */}
//             <h3 className="font-semibold mb-2 text-lg">Address Information</h3>
//             <div className="flex gap-4 mb-4">
//               <div className="flex-1">
//                 <label className="font-semibold mb-1 block">Present Address</label>
//                 <input placeholder="Village" name="presentVillage" value={form.presentVillage} onChange={handleChange} className={inputStyle} />
//                 <input placeholder="Thana" name="presentThana" value={form.presentThana} onChange={handleChange} className={inputStyle} />
//                 <input list="districtList" placeholder="District" name="presentDistrict" value={form.presentDistrict} onChange={handleChange} className={inputStyle} />
//                 <input list="divisionList" placeholder="Division" name="presentDivision" value={form.presentDivision} onChange={handleChange} className={inputStyle} />
//               </div>
//               <div className="flex-1">
//                 <label className="font-semibold mb-1 block">Permanent Address</label>
//                 <input placeholder="Village" name="permanentVillage" value={form.permanentVillage} onChange={handleChange} className={inputStyle} />
//                 <input placeholder="Thana" name="permanentThana" value={form.permanentThana} onChange={handleChange} className={inputStyle} />
//                 <input list="districtList" placeholder="District" name="permanentDistrict" value={form.permanentDistrict} onChange={handleChange} className={inputStyle} />
//                 <input list="divisionList" placeholder="Division" name="permanentDivision" value={form.permanentDivision} onChange={handleChange} className={inputStyle} />
//               </div>
//             </div>
//             <div className="mb-4">
//               <input type="checkbox" name="sameAddress" checked={sameAddress} onChange={handleChange} />
//               <label className="ml-2">Permanent address same as present</label>
//             </div>
//             <datalist id="districtList">{districts.map(d=><option key={d} value={d} />)}</datalist>
//             <datalist id="divisionList">{divisions.map(d=><option key={d} value={d} />)}</datalist>

//             {/* Education */}
//             <h3 className="font-semibold mb-2 text-lg">Education Background</h3>
//             {["ssc","hsc","university"].map((edu)=>(
//               <div key={edu} className="mb-4">
//                 <label className="font-semibold mb-1 block">{edu.toUpperCase()}</label>
//                 <input placeholder="Result" name={`${edu}Result`} value={form[`${edu}Result`]} onChange={handleChange} className={inputStyle} />
//                 <input placeholder="Year" name={`${edu}Year`} value={form[`${edu}Year`]} onChange={handleChange} className={inputStyle} />
//                 <input placeholder="Institution" name={`${edu}Institution`} value={form[`${edu}Institution`]} onChange={handleChange} className={inputStyle} />
//               </div>
//             ))}

//             {/* Photo Upload */}
//             <div className="mb-6">
//               <label className="block mb-2 font-semibold">Upload Photo</label>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="w-full md:w-auto p-2 border rounded-lg hover:border-orange-400 transition" />
//               {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 mt-2 object-cover border rounded-lg" />}
//             </div>

//             {/* Buttons */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               onClick={() => setPreview(true)}
//               className="mt-6 w-full bg-orange-500 text-white p-3 rounded-xl font-semibold hover:bg-orange-600"
//             >
//               Create Form Preview
//             </motion.button>
//           </>
//         ) : (
//           <section aria-live="polite">
//             <h3 className="font-semibold mb-2 text-lg">Form Preview</h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               {Object.entries(form).map(([key, val]) => (
//                 <div key={key} className="border-b py-1">
//                   <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {val || "-"}
//                 </div>
//               ))}
//             </div>
//             {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 mt-2 object-cover border rounded-lg" />}
//             <div className="mt-6 flex gap-4 flex-col md:flex-row">
//               <motion.button whileHover={{ scale: 1.05 }} onClick={generatePDF} className="w-full md:w-1/2 bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700">Download PDF</motion.button>
//               <motion.button whileHover={{ scale: 1.05 }} onClick={() => setPreview(false)} className="w-full md:w-1/2 bg-gray-500 text-white p-3 rounded-xl font-semibold hover:bg-gray-600">Edit Form</motion.button>
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
const divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const districts = ["Dhaka","Faridpur","Gazipur","Gopalganj","Kishoreganj","Madaripur","Manikganj","Munshiganj","Narsingdi","Narayanganj","Netrokona","Shariatpur","Tangail","Chattogram","Bandarban","Brahmanbaria","Chandpur","Cox's Bazar","Feni","Khagrachhari","Lakshmipur","Noakhali","Rangamati","Khulna","Bagerhat","Chuadanga","Jashore","Jhenaidah","Kushtia","Magura","Meherpur","Narail","Satkhira","Rajshahi","Bogra","Joypurhat","Naogaon","Natore","Chapai Nawabganj","Pabna","Sirajganj","Barisal","Barguna","Bhola","Jhalokati","Patuakhali","Pirojpur","Sylhet","Habiganj","Moulvibazar","Sunamganj","Rangpur","Dinajpur","Kurigram","Lalmonirhat","Nilphamari","Panchagarh","Thakurgaon","Gaibandha","Mymensingh","Jamalpur","Netrokona","Sherpur"];
const hobbies = ["Reading","Writing","Sports","Music","Traveling","Gaming","Cooking","Photography","Painting","Dancing","Singing","Hiking","Cycling","Gardening","Swimming","Yoga","Knitting","Fishing","Meditation"];
const religions = ["Islam", "Hinduism", "Christianity", "Buddhism", "Other"];

const Identity = () => {

  /* --------------------- AUTO THEME SYSTEM ---------------------- */
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => setDark(media.matches);

    applyTheme();
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, []);

  /* -------------------------------------------------------------- */

  const [form, setForm] = useState({
    name: "", father: "", mother: "", dob: "", age: "", gender: "", nationality: "",
    religion: "", marital: "", blood: "", hobby: "", email: "", phone: "",
    passport: "", website: "", linkedin: "", profession: "", skills: "",
    presentVillage: "", presentThana: "", presentDistrict: "", presentDivision: "",
    permanentVillage: "", permanentThana: "", permanentDistrict: "", permanentDivision: "",
    sscResult: "", sscYear: "", sscInstitution: "",
    hscResult: "", hscYear: "", hscInstitution: "",
    universityResult: "", universityYear: "", universityInstitution: "",
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [qrDataURL, setQrDataURL] = useState("");

  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(form)).then(setQrDataURL);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "sameAddress") {
      setSameAddress(checked);
      if (checked) {
        setForm(prev => ({
          ...prev,
          permanentVillage: prev.presentVillage,
          permanentThana: prev.presentThana,
          permanentDistrict: prev.presentDistrict,
          permanentDivision: prev.presentDivision,
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      if (sameAddress && ["presentVillage", "presentThana", "presentDistrict", "presentDivision"].includes(name)) {
        setForm(prev => ({
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

  const generatePDF = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 30;
    const spacing = 6;
    const rowHeight = 21;
    let contentY = 10;

    doc.setFillColor(255, 249, 195);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    const headerHeight = 50;
    doc.setFillColor(250, 130, 50);
    doc.rect(0, contentY, pageWidth, headerHeight, "F");
    doc.setFontSize(22);
    doc.setFont(undefined, "bold");
    doc.setTextColor("#fff");
    doc.text("IDENTITY FORM", pageWidth / 2, contentY + 33, { align: "center" });
    contentY += headerHeight + spacing;

    const qrSize = 80;
    const imageWidth = 100;
    const imageHeight = 120;
    const qrX = margin;
    const imgX = pageWidth - margin - imageWidth;
    const topY = contentY;

    const getImageData = (file) =>
      new Promise((resolve) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

    const imageData = await getImageData(imageFile);

    if (qrDataURL) doc.addImage(qrDataURL, "PNG", qrX, topY, qrSize, qrSize);
    if (imageData) doc.addImage(imageData, "JPEG", imgX, topY, imageWidth, imageHeight);

    contentY += Math.max(qrSize, imageHeight) + 8;

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

    drawInfoTable("Personal Information", [
      ["Full Name", form.name],
      ["Gender", form.gender],
      ["Father's Name", form.father],
      ["Mother's Name", form.mother],
      ["Date of Birth", form.dob],
      ["Age", form.age],
      ["Nationality", form.nationality],
      ["Religion", form.religion],
      ["Marital Status", form.marital],
      ["Blood Group", form.blood],
      ["Hobby", form.hobby],
      ["Passport / ID", form.passport],
      ["Website", form.website],
      ["LinkedIn", form.linkedin],
      ["Profession", form.profession],
      ["Skills", form.skills],
      ["Email", form.email],
      ["Phone", form.phone],
    ]);

    drawAddressTables();
    drawEducationTable();

    doc.setFontSize(7);
    doc.setFont(undefined, "italic");
    doc.setTextColor("#666");
    const footerText = "Powered by ArafatTech";
    const footerX = pageWidth - margin - doc.getTextWidth(footerText);
    const footerY = 8;
    doc.text(footerText, footerX, footerY);

    doc.save("identity_form.pdf");
  };

  /* ----------------------- THEME BASED STYLES ---------------------- */

  const themeBG = dark ? "bg-[#0f0f0f]" : "bg-yellow-50";
  const cardBG = dark ? "bg-[#1a1a1a] text-white border-gray-700" : "bg-white text-black";
  const inputStyle = dark
    ? "p-3 border rounded-lg w-full bg-black text-white border-gray-600 focus:border-orange-400"
    : "p-3 border rounded-lg w-full bg-white text-black hover:border-orange-400";

  /* ---------------------------------------------------------------- */

  return (
    <div className={`min-h-screen flex items-start justify-center ${themeBG}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-4xl shadow-xl rounded-xl p-6 border mt-4 ${cardBG}`}
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
          Identity Form – Arafat-Tech Ltd
        </h2>

        {!preview ? (
          <>
            <h3 className="font-semibold mb-2 text-lg">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold mb-1">{label}</label>
                    <input
                      list={name + "List"}
                      name={name}
                      placeholder={label}
                      value={form[name]}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    <datalist id={name + "List"}>
                      {name === "blood" &&
                        bloodGroups.map((v) => <option key={v} value={v} />)}
                      {name === "hobby" &&
                        hobbies.map((v) => <option key={v} value={v} />)}
                      {name === "religion" &&
                        religions.map((v) => <option key={v} value={v} />)}
                    </datalist>
                  </div>
                ) : type === "select" ? (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold mb-1">{label}</label>
                    <select
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select {label}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <div key={name} className="flex flex-col">
                    <label className="font-semibold mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      placeholder={label}
                      value={form[name]}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                )
              )}
            </div>

            <h3 className="font-semibold mb-2 text-lg">Address Information</h3>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="font-semibold mb-1 block">Present Address</label>

                <input placeholder="Village" name="presentVillage"
                  value={form.presentVillage} onChange={handleChange} className={inputStyle} />

                <input placeholder="Thana" name="presentThana"
                  value={form.presentThana} onChange={handleChange} className={inputStyle} />

                <input list="districtList" placeholder="District" name="presentDistrict"
                  value={form.presentDistrict} onChange={handleChange} className={inputStyle} />

                <input list="divisionList" placeholder="Division" name="presentDivision"
                  value={form.presentDivision} onChange={handleChange} className={inputStyle} />
              </div>

              <div className="flex-1">
                <label className="font-semibold mb-1 block">Permanent Address</label>

                <input placeholder="Village" name="permanentVillage"
                  value={form.permanentVillage} onChange={handleChange} className={inputStyle} />

                <input placeholder="Thana" name="permanentThana"
                  value={form.permanentThana} onChange={handleChange} className={inputStyle} />

                <input list="districtList" placeholder="District" name="permanentDistrict"
                  value={form.permanentDistrict} onChange={handleChange} className={inputStyle} />

                <input list="divisionList" placeholder="Division" name="permanentDivision"
                  value={form.permanentDivision} onChange={handleChange} className={inputStyle} />
              </div>
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                name="sameAddress"
                checked={sameAddress}
                onChange={handleChange}
                id="sameAddress"
              />
              <label className="ml-2" htmlFor="sameAddress">
                Permanent address same as present
              </label>
            </div>

            <datalist id="districtList">
              {districts.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>

            <datalist id="divisionList">
              {divisions.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>

            <h3 className="font-semibold mb-2 text-lg">Education Background</h3>

            {["ssc", "hsc", "university"].map((edu) => (
              <div key={edu} className="mb-4">
                <label className="font-semibold mb-1 block">{edu.toUpperCase()}</label>

                <input placeholder="Result" name={`${edu}Result`} value={form[`${edu}Result`]}
                  onChange={handleChange} className={inputStyle} />

                <input placeholder="Year" name={`${edu}Year`} value={form[`${edu}Year`]}
                  onChange={handleChange} className={inputStyle} />

                <input placeholder="Institution" name={`${edu}Institution`} value={form[`${edu}Institution`]}
                  onChange={handleChange} className={inputStyle} />
              </div>
            ))}

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full md:w-auto p-2 border rounded-lg hover:border-orange-400 transition"
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-32 h-32 mt-2 object-cover border rounded-lg"
                />
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setPreview(true)}
              className="mt-6 w-full bg-orange-500 text-white p-3 rounded-xl font-semibold hover:bg-orange-600"
            >
              Create Form Preview
            </motion.button>

            <p className="text-center text-gray-600 mt-4 text-sm">
              Click "Create Form Preview" to generate your Identity form instantly.
            </p>
          </>
        ) : (
          <section aria-live="polite">
            <h3 className="font-semibold mb-2 text-lg">Form Preview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(form).map(([key, val]) => (
                <div key={key} className="border-b py-1">
                  <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> {val || "-"}
                </div>
              ))}
            </div>

            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover border rounded-lg"
              />
            )}

            <div className="mt-6 flex gap-4 flex-col md:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={generatePDF}
                className="w-full md:w-1/2 bg-green-600 text-white p-3 rounded-xl font-semibold hover:bg-green-700"
              >
                Download PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setPreview(false)}
                className="w-full md:w-1/2 bg-gray-500 text-white p-3 rounded-xl font-semibold hover:bg-gray-600"
              >
                Edit Form
              </motion.button>
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default Identity;
