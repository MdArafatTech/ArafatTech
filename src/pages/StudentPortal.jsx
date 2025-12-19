// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import defaultLogo from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";
// import { Font } from "@react-pdf/renderer";

// // Disable hyphenation globally
// Font.registerHyphenationCallback((word) => [word]);

// export default function StudentPortal() {
//   const [PDFLib, setPDFLib] = useState(null);

//   const [headerInfo, setHeaderInfo] = useState({
//     collegeName: "",
//     department: "",
//     session: "",
//     date: "",
//     logo: defaultLogo,
//   });

//   const [students, setStudents] = useState([
//     { name: "", roll: "", email: "", mobile: "", image: null },
//   ]);

//   const [showPreview, setShowPreview] = useState(false);

//   const isMobile =
//     typeof window !== "undefined" ? window.innerWidth < 768 : false;

//   useEffect(() => {
//     import("@react-pdf/renderer").then((module) => setPDFLib(module));
//   }, []);

//   if (!PDFLib)
//     return (
//       <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>
//     );

//   const {
//     PDFViewer,
//     PDFDownloadLink,
//     Document,
//     Page,
//     Text,
//     View,
//     StyleSheet,
//     Image,
//   } = PDFLib;

//   const handleLogoUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setHeaderInfo((prev) => ({ ...prev, logo: url }));
//   };

//   const generateEmailQR = (email) =>
//     `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=mailto:${encodeURIComponent(
//       email || ""
//     )}`;

//   const paginateStudents = () => {
//     const pages = [];
//     for (let i = 0; i < students.length; i += 6)
//       pages.push(students.slice(i, i + 6));
//     return pages;
//   };

//   const styles = StyleSheet.create({
//     page: { padding: 20, fontFamily: "Helvetica" },
//     header: {
//       marginBottom: 12,
//       paddingBottom: 6,
//       borderBottomWidth: 1,
//       borderColor: "#000",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     logo: { width: 70, height: 70, marginBottom: 6, alignSelf: "center" },
//     collegeName: {
//       fontSize: 18,
//       fontWeight: "bold",
//       textAlign: "center",
//       marginBottom: 2,
//     },
//     department: { fontSize: 13, textAlign: "center", marginBottom: 2 },
//     session: {
//       fontSize: 12,
//       color: "#1a1a1a",
//       fontWeight: "bold",
//       textAlign: "center",
//       marginBottom: 2,
//     },
//     row: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginBottom: 14,
//     },
//     studentBox: {
//       width: "48%",
//       borderRadius: 10,
//       padding: 12,
//       borderWidth: 1,
//       borderColor: "#000",
//       minHeight: 170,
//       gap: 6,
//     },
//     cardRow: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "flex-start",
//     },
//     infoBox: {
//       width: "60%",
//       minWidth: 0,
//       textAlign: "left",
//     },
//     qrBox: {
//       width: "40%",
//       alignItems: "center",
//       justifyContent: "flex-start",
//     },
//     studentImage: {
//       width: 50,
//       height: 60,
//       marginBottom: 5,
//     },
//     qrImage: {
//       width: 50,
//       height: 50,
//       marginBottom: 3,
//     },
//     qrText: {
//       fontSize: 7,
//       textAlign: "center",
//       marginTop: -2,
//     },
//     label: {
//       fontSize: 9,
//       marginTop: 3,
//       textAlign: "left",
//     },
//     value: {
//       fontSize: 12,
//       marginBottom: 2,
//       fontWeight: "bold",
//       textAlign: "left",
//     },

//     footer: {
//       position: "absolute",
//       bottom: 10,
//       left: 10,
//       fontSize: 10,
//       color: "#333",
//     },
//   });

//   const MyDocument = () => (
//     <Document>
//       {paginateStudents().map((studentPage, pageIndex) => (
//         <Page style={styles.page} key={pageIndex}>
//           <View style={styles.header}>
//             <View style={{ alignItems: "center" }}>
//               <Image style={styles.logo} src={headerInfo.logo} />
//               <Text style={styles.collegeName}>{headerInfo.collegeName}</Text>
//               <Text style={styles.department}>{headerInfo.department}</Text>
//               <Text style={styles.session}>Session: {headerInfo.session}</Text>
//             </View>
//             {headerInfo.date && (
//               <View
//                 style={{ width: "100%", alignItems: "flex-end", marginTop: 4 }}
//               >
//                 <Text style={{ fontSize: 9, fontWeight: "bold" }}>
//                   Date: {headerInfo.date}
//                 </Text>
//               </View>
//             )}
//           </View>

//           {studentPage
//             .reduce((rows, s, i) => {
//               if (i % 2 === 0) rows.push([s]);
//               else rows[rows.length - 1].push(s);
//               return rows;
//             }, [])
//             .map((pair, rowIndex) => (
//               <View style={styles.row} key={rowIndex}>
//                 {pair.map((s, idx) => (
//                   <View style={styles.studentBox} key={idx}>
//                     <View style={styles.cardRow}>
//                       <View style={styles.infoBox}>
//                         <Text style={styles.label}>Name:</Text>
//                         <Text style={styles.value}>{s.name}</Text>
//                         <Text style={styles.label}>Roll:</Text>
//                         <Text style={styles.value}>{s.roll}</Text>
//                         <Text style={styles.label}>Mobile:</Text>
//                         <Text style={styles.value}>{s.mobile}</Text>
//                         <Text style={styles.label}>Email:</Text>
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             flexWrap: "wrap",
//                             fontSize: 10,
//                             textAlign: "left",
//                             width: "100%",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {s.email.split("").map((char, i) => (
//                             <Text key={i}>{char}</Text>
//                           ))}
//                         </View>
//                       </View>
//                       <View style={styles.qrBox}>
//                         {s.image && (
//                           <Image style={styles.studentImage} src={s.image} />
//                         )}
//                         <Image
//                           style={styles.qrImage}
//                           src={generateEmailQR(s.email)}
//                         />
//                         <Text style={styles.qrText}>Scan to Email</Text>
//                       </View>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             ))}

//           <Text style={styles.footer}>Powered by ArafatTech</Text>
//         </Page>
//       ))}
//     </Document>
//   );

//   const addStudent = () =>
//     setStudents((prev) => [
//       ...prev,
//       { name: "", roll: "", email: "", mobile: "", image: null },
//     ]);

//   const removeStudent = (index) =>
//     setStudents((prev) => prev.filter((_, i) => i !== index));

//   const updateStudent = (i, field, value) => {
//     setStudents((prev) => {
//       const updated = [...prev];
//       updated[i] = { ...updated[i], [field]: value };
//       return updated;
//     });
//   };

//   return (
// <div className="min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
//   <motion.div
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 space-y-6"
//   >
//     <h2 className="text-2xl font-bold text-center text-orange-600 dark:text-orange-400">
//       Student List Maker
//     </h2>

//     {/* HEADER FORM */}
//     <div className="border border-gray-400 dark:border-gray-600 rounded-xl p-4 bg-orange-50 dark:bg-gray-800 text-black dark:text-white space-y-3">
//       <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400">
//         College Header Settings
//       </h3>
//       <input
//         className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//         placeholder="College Name"
//         value={headerInfo.collegeName}
//         onChange={(e) =>
//           setHeaderInfo((prev) => ({ ...prev, collegeName: e.target.value }))
//         }
//       />
//       <input
//         className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//         placeholder="Department Name"
//         value={headerInfo.department}
//         onChange={(e) =>
//           setHeaderInfo((prev) => ({ ...prev, department: e.target.value }))
//         }
//       />
//       <input
//         className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//         placeholder="Session (2023-2024)"
//         value={headerInfo.session}
//         onChange={(e) =>
//           setHeaderInfo((prev) => ({ ...prev, session: e.target.value }))
//         }
//       />
//       <input
//         type="date"
//         className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//         value={headerInfo.date}
//         onChange={(e) =>
//           setHeaderInfo((prev) => ({ ...prev, date: e.target.value }))
//         }
//       />
//       <div>
//         <p className="font-medium text-black dark:text-white">Upload College Logo:</p>
//         <label className="flex items-center gap-2 bg-orange-400 dark:bg-orange-600 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-orange-700 dark:hover:bg-orange-500 transition-all w-fit">
//           <span className="text-lg">📤</span>
//           <span>Choose Logo</span>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogoUpload}
//             className="hidden"
//           />
//         </label>
//         {headerInfo.logo && headerInfo.logo !== defaultLogo && (
//           <p className="text-sm mt-1 text-green-700 dark:text-green-400 font-semibold">
//             ✔ Logo Selected
//           </p>
//         )}
//       </div>
//     </div>

//     {/* STUDENT FORMS */}
//     {students.map((student, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: index * 0.05 }}
//         className="border border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-orange-50 dark:bg-gray-800 space-y-2 relative"
//       >
//         <h3 className="font-semibold text-orange-700 dark:text-orange-400">Student {index + 1}</h3>
//         {students.length > 1 && (
//           <button
//             onClick={() => removeStudent(index)}
//             className="absolute cursor-pointer top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
//           >
//             ✖ Remove
//           </button>
//         )}
//         <input
//           className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//           placeholder="Name"
//           value={student.name}
//           onChange={(e) => updateStudent(index, "name", e.target.value)}
//         />
//         <input
//           className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//           placeholder="Roll"
//           value={student.roll}
//           onChange={(e) => updateStudent(index, "roll", e.target.value)}
//         />
//         <input
//           className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//           placeholder="Email"
//           value={student.email}
//           onChange={(e) => updateStudent(index, "email", e.target.value)}
//         />
//         <input
//           className="w-full border border-black dark:border-gray-500 p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//           placeholder="Mobile"
//           value={student.mobile}
//           onChange={(e) => updateStudent(index, "mobile", e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const url = URL.createObjectURL(file);
//               updateStudent(index, "image", url);
//             }
//           }}
//           className="w-full border border-black dark:border-gray-500 p-2 cursor-pointer rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
//         />
//       </motion.div>
//     ))}

//     {/* BUTTONS */}
//     <div className="flex flex-col md:flex-row gap-4 justify-center">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         onClick={addStudent}
//         className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg font-semibold shadow-md"
//       >
//         + Add More Student
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         onClick={() => setShowPreview(true)}
//         className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold shadow-md"
//       >
//         Review PDF
//       </motion.button>
//     </div>
//   </motion.div>

//   <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
//     Click "Download PDF Now" to generate and download your ID cards instantly.
//   </p>

  // {/* PDF PREVIEW MODAL */}
  // <AnimatePresence>
  //   {showPreview && (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
  //     >
  //       <motion.div
  //         initial={{ scale: 0.9, opacity: 0 }}
  //         animate={{ scale: 1, opacity: 1 }}
  //         exit={{ scale: 0.9, opacity: 0 }}
  //         className="w-11/12 md:w-4/5 h-4/5 bg-white dark:bg-gray-900 rounded-xl p-4 flex flex-col"
  //       >
  //         <button
  //           onClick={() => setShowPreview(false)}
  //           className="self-end mb-2 text-red-600 dark:text-red-400 cursor-pointer font-bold hover:text-red-800 dark:hover:text-red-200"
  //         >
  //           Close ✖
  //         </button>
  //         <div
  //           style={{
  //             width: "100%",
  //             height: isMobile ? "80vh" : "70vh",
  //             overflow: "auto",
  //             borderRadius: 10,
  //           }}
  //         >
  //           <PDFViewer
  //             style={{
  //               width: "100%",
  //               height: "100%",
  //               borderRadius: 10,
  //               backgroundColor: "white",
  //               color: "black",
  //             }}
  //           >
  //             <MyDocument />
  //           </PDFViewer>
  //         </div>
  //         <div className="mt-4 flex justify-center">
  //           <PDFDownloadLink document={<MyDocument />} fileName="idcards.pdf">
  //             {({ loading }) =>
  //               loading ? (
  //                 "Preparing PDF..."
  //               ) : (
  //                 <motion.button
  //                   whileHover={{ scale: 1.05 }}
  //                   className="bg-green-600 cursor-pointer hover:bg-green-700 text-white cursor-pointer px-4 py-2 rounded-lg font-semibold shadow-md"
  //                 >
  //                   Download PDF
  //                 </motion.button>
  //               )
  //             }
  //           </PDFDownloadLink>
  //         </div>
  //       </motion.div>
  //     </motion.div>
  //   )}
  // </AnimatePresence>
// </div>


//   );
// }









import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultLogo from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";
import { Font } from "@react-pdf/renderer";

// Disable hyphenation globally
Font.registerHyphenationCallback((word) => [word]);

// 💎 PREMIUM INPUT COMPONENTS - FULL OPACITY FIXED
const PremiumInput = ({ label, placeholder, value, onChange, type = "text", icon, dark }) => (
  <div className="group relative">
    <label className="block text-sm font-black mb-3 tracking-wide bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent transition-all duration-300">
      {icon} {label}
    </label>
    <div className={`relative ${icon ? 'pl-12' : 'pl-4'}`}>
      {icon && (
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 group-focus-within:opacity-100 transition-all duration-300`}>
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-16 px-6 py-4 rounded-3xl font-bold text-xl shadow-xl transition-all duration-500 focus:ring-4 focus:outline-none placeholder-slate-400 border-2 cursor-text ${
          dark
            ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:ring-emerald-500/60 focus:border-emerald-400 hover:border-emerald-500 hover:shadow-emerald-500/40 shadow-slate-600/50"
            : "bg-white border-gray-200 text-slate-900 placeholder-slate-500 focus:ring-emerald-400/70 focus:border-emerald-500 hover:border-emerald-400 hover:shadow-emerald-300/50 shadow-lg"
        }`}
      />
    </div>
  </div>
);

const PremiumDateInput = (props) => <PremiumInput {...props} type="date" />;

export default function StudentPortal() {
  const [PDFLib, setPDFLib] = useState(null);
  const [dark, setDark] = useState(false);

  const [headerInfo, setHeaderInfo] = useState({
    collegeName: "",
    department: "",
    session: "",
    date: "",
    logo: defaultLogo,
  });

  const [students, setStudents] = useState([
    { name: "", roll: "", email: "", mobile: "", image: null },
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  // Auto dark mode detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => setDark(media.matches);
    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, []);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
  }, []);

  if (!PDFLib)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-emerald-50 dark:from-slate-900 to-slate-900 p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-12 bg-white dark:bg-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white">
            <svg className="w-12 h-12 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">Loading PDF Engine...</p>
        </motion.div>
      </div>
    );

  const { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } = PDFLib;

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHeaderInfo((prev) => ({ ...prev, logo: url }));
  };

  // ✅ FIXED Student Image Upload - Proper event handling
  const handleStudentImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setStudents(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], image: url };
      return updated;
    });
  };

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=mailto:${encodeURIComponent(email || "")}`;

  const paginateStudents = () => {
    const pages = [];
    for (let i = 0; i < students.length; i += 6) pages.push(students.slice(i, i + 6));
    return pages;
  };

  const styles = StyleSheet.create({
    page: { padding: 20, fontFamily: "Helvetica" },
    header: {
      marginBottom: 12,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderColor: "#000",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: { width: 70, height: 70, marginBottom: 6, alignSelf: "center" },
    collegeName: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    department: { fontSize: 13, textAlign: "center", marginBottom: 2 },
    session: {
      fontSize: 12,
      color: "#1a1a1a",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    studentBox: {
      width: "48%",
      borderRadius: 10,
      padding: 12,
      borderWidth: 1,
      borderColor: "#000",
      minHeight: 170,
      gap: 6,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    infoBox: {
      width: "60%",
      minWidth: 0,
      textAlign: "left",
    },
    qrBox: {
      width: "40%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    studentImage: {
      width: 50,
      height: 60,
      marginBottom: 5,
    },
    qrImage: {
      width: 50,
      height: 50,
      marginBottom: 3,
    },
    qrText: {
      fontSize: 7,
      textAlign: "center",
      marginTop: -2,
    },
    label: {
      fontSize: 9,
      marginTop: 3,
      textAlign: "left",
    },
    value: {
      fontSize: 12,
      marginBottom: 2,
      fontWeight: "bold",
      textAlign: "left",
    },
    footer: {
      position: "absolute",
      bottom: 10,
      left: 10,
      fontSize: 10,
      color: "#333",
    },
  });

  const MyDocument = () => (
    <Document>
      {paginateStudents().map((studentPage, pageIndex) => (
        <Page style={styles.page} key={pageIndex}>
          <View style={styles.header}>
            <View style={{ alignItems: "center" }}>
              <Image style={styles.logo} src={headerInfo.logo} />
              <Text style={styles.collegeName}>{headerInfo.collegeName}</Text>
              <Text style={styles.department}>{headerInfo.department}</Text>
              <Text style={styles.session}>Session: {headerInfo.session}</Text>
            </View>
            {headerInfo.date && (
              <View style={{ width: "100%", alignItems: "flex-end", marginTop: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  Date: {headerInfo.date}
                </Text>
              </View>
            )}
          </View>

          {studentPage
            .reduce((rows, s, i) => {
              if (i % 2 === 0) rows.push([s]);
              else rows[rows.length - 1].push(s);
              return rows;
            }, [])
            .map((pair, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {pair.map((s, idx) => (
                  <View style={styles.studentBox} key={idx}>
                    <View style={styles.cardRow}>
                      <View style={styles.infoBox}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{s.name}</Text>
                        <Text style={styles.label}>Roll:</Text>
                        <Text style={styles.value}>{s.roll}</Text>
                        <Text style={styles.label}>Mobile:</Text>
                        <Text style={styles.value}>{s.mobile}</Text>
                        <Text style={styles.label}>Email:</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            fontSize: 10,
                            textAlign: "left",
                            width: "100%",
                            fontWeight: "bold",
                          }}
                        >
                          {s.email.split("").map((char, i) => (
                            <Text key={i}>{char}</Text>
                          ))}
                        </View>
                      </View>
                      <View style={styles.qrBox}>
                        {s.image && <Image style={styles.studentImage} src={s.image} />}
                        <Image style={styles.qrImage} src={generateEmailQR(s.email)} />
                        <Text style={styles.qrText}>Scan to Email</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}

          <Text style={styles.footer}>Powered by ArafatTech</Text>
        </Page>
      ))}
    </Document>
  );

  const addStudent = () =>
    setStudents((prev) => [
      ...prev,
      { name: "", roll: "", email: "", mobile: "", image: null },
    ]);

  const removeStudent = (index) => setStudents((prev) => prev.filter((_, i) => i !== index));

  const updateStudent = (i, field, value) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  return (
    <div className="min-h-screen p-3 lg:p-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto bg-white dark:bg-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 lg:p-12 space-y-8"
      >
        {/* 💎 PREMIUM HEADER */}
        <div className="text-center mb-12 pt-8">

<div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-400/90 via-pink-400/90 to-cyan-500/90 dark:from-cyan-500/90 dark:via-blue-500/90 dark:to-indigo-500/90 px-10 py-6 rounded-3xl shadow-2xl mb-6 backdrop-blur-md border border-white/80 dark:border-slate-800/50">
  <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg" />
  <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-2xl shadow-slate-900/50">
    Student List Maker
  </h2>
  <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg" />
</div>



          <p className={`font-semibold text-xl tracking-wide ${dark ? "text-slate-300" : "text-slate-600"}`}>
            Arafat-Tech Ltd • Professional Student Documentation System
          </p>
        </div>

        {/* 🎓 COLLEGE HEADER */}
        <section className="group">
          <div className={`flex items-center gap-5 mb-8 p-5 lg:p-10 rounded-3xl backdrop-blur-xl shadow-2xl border transition-all duration-500 hover:shadow-3xl ${
            dark
              ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-emerald-500 hover:shadow-emerald-500/30"
              : "bg-gradient-to-br from-orange-50 via-white to-emerald-50 border-gray-200 hover:border-emerald-400 hover:shadow-emerald-400/40"
          }`}>
            <div className={`w-4 h-16 bg-gradient-to-b from-orange-500 to-emerald-600 rounded-2xl shadow-xl ${dark ? "shadow-emerald-500/50" : "shadow-xl"}`} />
            <div>
              <h3 className="text-3xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
                College Header Settings
              </h3>
              <p className={`text-lg font-medium mt-1 ${dark ? "text-slate-300" : "text-slate-500"}`}>Configure your institution details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-0">
            <PremiumInput
              dark={dark}
              label="College Name"
              placeholder="🏫 Rajshahi College"
              value={headerInfo.collegeName}
              onChange={(e) => setHeaderInfo((prev) => ({ ...prev, collegeName: e.target.value }))}
              icon=""
            />
            <PremiumInput
              dark={dark}
              label="📚Department Name"
              placeholder="e.g., Computer Science & Engineering"
              value={headerInfo.department}
              onChange={(e) => setHeaderInfo((prev) => ({ ...prev, department: e.target.value }))}
              icon=""
            />
            <PremiumInput
              dark={dark}
              label="Session"
              placeholder="📅, 2023-2024"
              value={headerInfo.session}
              onChange={(e) => setHeaderInfo((prev) => ({ ...prev, session: e.target.value }))}
              icon=""
            />
            <PremiumDateInput
              dark={dark}
              label=" 📆Date"
              value={headerInfo.date}
              onChange={(e) => setHeaderInfo((prev) => ({ ...prev, date: e.target.value }))}
              icon=""
            />
          </div>

          {/* 💎 LOGO UPLOAD */}
          <div className={`p-10 mt-5 lg:p-12 rounded-3xl border-2 border-dashed text-center group transition-all duration-700 backdrop-blur-xl shadow-2xl hover:shadow-3xl cursor-pointer relative overflow-hidden ${
            dark
              ? "bg-slate-800/90 border-slate-700 hover:border-emerald-500/80 hover:bg-slate-800"
              : "bg-white border-gray-200 hover:border-emerald-500/80 hover:bg-emerald-50"
          }`}>
            <label className="flex flex-col items-center gap-6 cursor-pointer w-full h-full">
              <div className={`w-20 h-20 bg-gradient-to-br from-orange-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 border-4 border-white group-hover:brightness-110`}>
                <span className="text-2xl">📤</span>
              </div>
              <div>
                <p className={`font-black text-2xl mb-2 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent`}>
                  Upload College Logo
                </p>
                <p className={`text-lg font-semibold ${dark ? "text-slate-300" : "text-slate-500"}`}>
                  PNG, JPG • Max 2MB • 300x100px recommended
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {headerInfo.logo && headerInfo.logo !== defaultLogo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl border-2 border-emerald-400 text-lg"
                >
                  ✔ Logo Selected
                </motion.div>
              )}
            </label>
          </div>
        </section>

        {/* 👥 STUDENT FORMS - FIXED */}
        <section className="space-y-6">
          {students.map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl p-8 lg:p-10 backdrop-blur-xl shadow-2xl border transition-all duration-500 hover:shadow-3xl hover:border-emerald-400/70 ${
                dark
                  ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:shadow-emerald-500/40"
                  : "bg-white border-gray-200 hover:shadow-emerald-400/50"
              }`}
            >
              {/* Header Bar */}
              <div className={`flex items-center justify-between mb-8 p-6 lg:p-8 rounded-3xl backdrop-blur-md shadow-xl ${
                dark
                  ? "bg-slate-700 border border-slate-600"
                  : "bg-gradient-to-r from-orange-500/10 to-emerald-500/10 border border-gray-200"
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 bg-gradient-to-r from-orange-400 to-emerald-500 rounded-full animate-pulse shadow-xl`} />
                  <h3 className={`text-3xl font-black tracking-tight bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-xl`}>
                    Student {index + 1}
                  </h3>
                </div>
                {students.length > 1 && (
                  <motion.button
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ opacity: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeStudent(index);
                    }}
                    className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black px-7 py-4 rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-red-400 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 tracking-wide">✖ Remove</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                )}
              </div>

              {/* Student Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PremiumInput
                  dark={dark}
                  label=" 👤Full Name"
                  placeholder="e.g., John Doe"
                  value={student.name}
                  onChange={(e) => updateStudent(index, "name", e.target.value)}
                  icon=""
                />
                <PremiumInput
                  dark={dark}
                  label=" 🆔Roll Number"
                  placeholder="e.g., 2023001"
                  value={student.roll}
                  onChange={(e) => updateStudent(index, "roll", e.target.value)}
                  icon=""
                />
                <PremiumInput
                  dark={dark}
                  label=" ✉️Email Address"
                  type="email"
                  placeholder="student@university.edu"
                  value={student.email}
                  onChange={(e) => updateStudent(index, "email", e.target.value)}
                  icon=""
                />
                <PremiumInput
                  dark={dark}
                  label="Mobile Number"
                  type="tel"
                  placeholder="📱01XXXXXXXXX"
                  value={student.mobile}
                  onChange={(e) => updateStudent(index, "mobile", e.target.value)}
                  icon=""
                />
              </div>

              {/* ✅ FIXED PHOTO UPLOAD - Works on ALL devices */}
              <div className="mt-12">
                <label className={`block text-lg font-bold mb-6 tracking-wide bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent`}>
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    id={`student-photo-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleStudentImageUpload(index, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <label
                    htmlFor={`student-photo-${index}`}
                    className={`block w-full p-10 lg:p-12 rounded-3xl border-2 border-dashed text-center group transition-all duration-700 backdrop-blur-xl shadow-2xl hover:shadow-3xl cursor-pointer overflow-hidden relative ${
                      dark
                        ? "bg-slate-800 border-slate-700 hover:border-emerald-500/90 hover:bg-slate-800/95"
                        : "bg-white border-gray-200 hover:border-emerald-500/90 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-6 p-4 pointer-events-none">
                      <div className={`w-28 h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-orange-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:brightness-110 transition-all duration-500 border-4 border-white`}>
                        {student.image ? (
                          <span className="text-4xl text-white drop-shadow-lg">✔</span>
                        ) : (
                          <span className="text-4xl">🖼️</span>
                        )}
                      </div>
                      <div>
                        <p className={`font-black text-2xl mb-2 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent`}>
                          {student.image ? "Photo Uploaded!" : "Tap to Upload"}
                        </p>
                        <p className={`text-lg font-semibold ${dark ? "text-slate-300" : "text-slate-500"}`}>
                          PNG, JPG • Max 5MB • Square recommended
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 🚀 ACTION BUTTONS */}
        <div className="flex flex-col lg:flex-row gap-6 pt-16 border-t-4 bg-gradient-to-r from-orange-500/10 via-emerald-500/10 to-blue-500/10 p-3 lg:p-4 rounded-3xl backdrop-blur-2xl border-gray-200 dark:border-slate-700 shadow-2xl">
          <motion.button
            whileHover={{ opacity: 0.9 }}
            whileTap={{ opacity: 0.8 }}
            onClick={addStudent}
            className="group relative flex-1 h-20 lg:h-24 rounded-3xl font-black text-xl lg:text-2xl shadow-2xl overflow-hidden transition-all duration-500 bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-600 hover:from-blue-600 hover:via-emerald-500 hover:to-blue-700 shadow-blue-500/60 hover:shadow-blue-500/80 cursor-pointer border-2 border-transparent hover:border-blue-400"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-4 h-full px-8">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="tracking-wider leading-tight">Add Student</span>
            </span>
          </motion.button>

          <motion.button
            whileHover={{ opacity: 0.9 }}
            whileTap={{ opacity: 0.8 }}
            onClick={() => setShowPreview(true)}
            className="group relative flex-1 h-20 lg:h-24 rounded-3xl font-black text-xl lg:text-2xl shadow-2xl overflow-hidden transition-all duration-500 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-teal-500 hover:to-emerald-700 shadow-emerald-500/70 hover:shadow-emerald-500/90 cursor-pointer border-2 border-transparent hover:border-emerald-400"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-4 h-full px-8">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l-5.5 5.5m0 0L12 21l5.5-5.5m-5.5 0H20" />
              </svg>
              <span className="tracking-wider leading-tight">Review PDF</span>
            </span>
          </motion.button>
        </div>

        <p className={`text-center ${dark ? "text-slate-400" : "text-slate-500"} font-semibold text-lg tracking-wide pt-12`}>
          Professional student lists generated instantly • Powered by Arafat-Tech Ltd
        </p>

        {/* ✅ PDF PREVIEW MODAL */}
    {/* ✅ PREMIUM PDF PREVIEW MODAL - Replace your existing modal with this */}
<AnimatePresence>
  {showPreview && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-11/12 md:w-4/5 h-auto bg-white dark:bg-slate-900 rounded-xl p-4 flex flex-col shadow-2xl border border-gray-200 dark:border-slate-700"
      >
        {/* 💎 Premium Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPreview(false)}
          className="self-end mb-4 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl border-2 border-red-400 transition-all duration-300 text-lg tracking-wide backdrop-blur-md"
        >
          ✕ Close Preview
        </motion.button>
        
        {/* 📱 Responsive PDF Viewer Container */}
        <div
          style={{
            width: "100%",
            height: isMobile ? "80vh" : "70vh",
            overflow: "auto",
            borderRadius: 16,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-4 border-gray-200 dark:border-slate-700"
        >
          <PDFViewer
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              backgroundColor: "white",
              color: "black",
            }}
          >
            <MyDocument />
          </PDFViewer>
        </div>
        
        {/* 🚀 Premium Download Section */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t-2 border-gray-200 dark:border-slate-700">
          <PDFDownloadLink document={<MyDocument />} fileName={`Student-List-${headerInfo.collegeName || 'College'}-${new Date().toISOString().slice(0,10)}.pdf`}>
            {({ loading }) =>
              loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-black rounded-2xl shadow-2xl text-lg tracking-wide animate-pulse"
                >
                  🔄 Preparing PDF...
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-5 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-teal-500 hover:to-emerald-700 text-white font-black rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-emerald-400 transition-all duration-500 overflow-hidden text-xl tracking-wide backdrop-blur-md cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10l-5.5 5.5m0 0L12 21l5.5-5.5m-5.5 0H20" />
                    </svg>
                    Download PDF
                  </span>
                </motion.button>
              )
            }
          </PDFDownloadLink>
          
          {/* 📊 Student Count Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl text-lg"
          >
            {students.filter(s => s.name.trim()).length} Students Ready
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </motion.div>
    </div>
  );
}





