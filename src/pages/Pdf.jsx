





// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import collegeLogo from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";

// export default function PDFGenerator() {
//   const [PDFLib, setPDFLib] = useState(null);
//   const [students, setStudents] = useState([{ name: "", email: "", mobile: "" }]);
//   const [showPreview, setShowPreview] = useState(false);

//   useEffect(() => {
//     import("@react-pdf/renderer").then((module) => setPDFLib(module));
//   }, []);

//   if (!PDFLib) return <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>;

//   const { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } = PDFLib;

//   const generateEmailQR = (email) =>
//     `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=mailto:${email}`;

//   const paginateStudents = () => {
//     const pages = [];
//     for (let i = 0; i < students.length; i += 6) pages.push(students.slice(i, i + 6));
//     return pages;
//   };

//   const styles = StyleSheet.create({
//     page: { padding: 20, fontFamily: "Helvetica" },
//     header: { textAlign: "center", marginBottom: 18 },
//     logo: { width: 70, height: 70, margin: "0 auto" },
//     collegeName: { fontSize: 22, fontWeight: "bold" },
//     department: { fontSize: 15, marginTop: 4 },
//     session: { fontSize: 13, marginTop: 2, color: "#555" },
//     row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
//     studentBox: { width: "48%", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#000", minHeight: 165 },
//     cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//     qrBox: { width: "36%", alignItems: "center" },
//     qrImage: { width: 70, height: 70 },
//     qrText: { fontSize: 9, textAlign: "center", marginTop: 2 },
//     infoBox: { width: "60%", minWidth: 0 },
//     serialNumber: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
//     label: { fontSize: 10, fontWeight: "bold" },
//     value: { fontSize: 14, marginBottom: 3 },
//     emailValue: { fontSize: 13, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//     footer: { position: "absolute", bottom: 10, left: 10, fontSize: 10, color: "#333" },
//   });

//   const MyDocument = () => (
//     <Document>
//       {paginateStudents().map((studentPage, pageIndex) => (
//         <Page style={styles.page} key={pageIndex}>
//           <View style={styles.header}>
//             <Image style={styles.logo} src={collegeLogo} />
//             <Text style={styles.collegeName}>RAJSHAHI COLLEGE</Text>
//             <Text style={styles.department}>DEPARTMENT OF PHYSICS</Text>
//             <Text style={styles.session}>Session: 2023 - 2024</Text>
//           </View>

//           {studentPage
//             .reduce((rows, student, i) => {
//               if (i % 2 === 0) rows.push([student]);
//               else rows[rows.length - 1].push(student);
//               return rows;
//             }, [])
//             .map((pair, rowIndex) => (
//               <View style={styles.row} key={rowIndex}>
//                 {pair.map((s, idx) => (
//                   <View style={styles.studentBox} key={idx}>
//                     <View style={styles.cardRow}>
//                       <View style={styles.qrBox}>
//                         <Image style={styles.qrImage} src={generateEmailQR(s.email)} />
//                         <Text style={styles.qrText}>Scan to Email</Text>
//                       </View>
//                       <View style={styles.infoBox}>
//                         <Text style={styles.serialNumber}>{pageIndex * 6 + rowIndex * 2 + idx + 1}</Text>
//                         <Text style={styles.label}>Name:</Text>
//                         <Text style={styles.value}>{s.name}</Text>
//                         <Text style={styles.label}>Mobile:</Text>
//                         <Text style={styles.value}>{s.mobile}</Text>
//                         <Text style={styles.label}>Email:</Text>
//                         <Text style={styles.emailValue}>{s.email}</Text>
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

//   const addStudent = () => setStudents([...students, { name: "", email: "", mobile: "" }]);
//   const updateStudent = (index, field, value) => {
//     const updated = [...students];
//     updated[index][field] = value;
//     setStudents(updated);
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-orange-600">Student PDF Generator</h2>

//         {students.map((student, index) => (
//   <motion.div
//     key={index}
//     initial={{ opacity: 0, x: -50 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay: index * 0.1 }}
//     className="border border-gray-300 rounded-xl p-4 bg-orange-50 space-y-2"
//   >
//     <h3 className="font-semibold text-orange-700">Student {index + 1}</h3>
//     <input
//       className="w-full border border-black p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
//       placeholder="Name"
//       value={student.name}
//       onChange={(e) => updateStudent(index, "name", e.target.value)}
//     />
//     <input
//       className="w-full border border-black p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
//       placeholder="Email"
//       value={student.email}
//       onChange={(e) => updateStudent(index, "email", e.target.value)}
//     />
//     <input
//       className="w-full border border-black p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
//       placeholder="Mobile"
//       value={student.mobile}
//       onChange={(e) => updateStudent(index, "mobile", e.target.value)}
//     />
//   </motion.div>
// ))}


//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={addStudent}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600"
//           >
//             + Add More Student
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setShowPreview(true)}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600"
//           >
//             Review PDF
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* PDF Preview Modal */}
//       <AnimatePresence>
//         {showPreview && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="w-11/12 md:w-4/5 h-4/5 bg-white rounded-xl p-4 flex flex-col"
//             >
//               <button
//                 onClick={() => setShowPreview(false)}
//                 className="self-end mb-2 text-red-600 font-bold hover:text-red-800"
//               >
//                 Close ✖
//               </button>

//               <PDFViewer style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}>
//                 <MyDocument />
//               </PDFViewer>

//               <div className="mt-4 flex justify-center">
//                 <PDFDownloadLink document={<MyDocument />} fileName="students.pdf">
//                   {({ loading }) =>
//                     loading ? (
//                       <span>Preparing PDF...</span>
//                     ) : (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700"
//                       >
//                         Download PDF
//                       </motion.button>
//                     )
//                   }
//                 </PDFDownloadLink>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import collegeLogo from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";

export default function PDFGenerator() {
  const [PDFLib, setPDFLib] = useState(null);
  const [students, setStudents] = useState([{ name: "", email: "", mobile: "" }]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
  }, []);

  if (!PDFLib) return <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>;

  const { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } = PDFLib;

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=mailto:${email}`;

  const paginateStudents = () => {
    const pages = [];
    for (let i = 0; i < students.length; i += 6) pages.push(students.slice(i, i + 6));
    return pages;
  };

  /* ---------- UPDATED STYLES ---------- */
  const styles = StyleSheet.create({
    page: { padding: 20, fontFamily: "Helvetica" },

    header: { textAlign: "center", marginBottom: 18 },
    logo: { width: 70, height: 70, margin: "0 auto" },
    collegeName: { fontSize: 22, fontWeight: "bold" },
    department: { fontSize: 15, marginTop: 4 },
    session: { fontSize: 13, marginTop: 2, color: "#333" },

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
      minHeight: 180,

      // ✔ Added vertical margin inside card
      gap: 6,
    },

    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },

    // ✔ TEXT LEFT SIDE
    infoBox: {
      width: "60%",
      minWidth: 0,
    },

    // ✔ QR RIGHT SIDE
    qrBox: {
      width: "40%",
      alignItems: "center",
    },

    qrImage: { width: 80, height: 80 },
    qrText: { fontSize: 9, textAlign: "center", marginTop: 3 },

    serialNumber: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },

    label: { fontSize: 10,  marginTop:3 },
    value: { fontSize: 16, marginBottom:2,fontWeight: "bold" },

    emailBottom: {
      fontSize: 16,
      
      textAlign: "left",
      width: "100%",
      fontWeight: "bold",
    },

    footer: {
      position: "absolute",
      bottom: 10,
      left: 10,
      fontSize: 10,
      color: "#333",
    },
  });

  /* ---------- PDF DOCUMENT ---------- */
  const MyDocument = () => (
    <Document>
      {paginateStudents().map((studentPage, pageIndex) => (
        <Page style={styles.page} key={pageIndex}>
          <View style={styles.header}>
            <Image style={styles.logo} src={collegeLogo} />
            <Text style={styles.collegeName}>RAJSHAHI COLLEGE</Text>
            <Text style={styles.department}>DEPARTMENT OF PHYSICS</Text>
            <Text style={styles.session}>Session: 2023 - 2024</Text>
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

                    {/* MAIN CARD SECTION */}
                    <View style={styles.cardRow}>

                      {/* LEFT SIDE → INFO */}
                      <View style={styles.infoBox}>
                        <Text style={styles.serialNumber}>
                          {pageIndex * 6 + rowIndex * 2 + idx + 1}
                        </Text>

                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{s.name}</Text>

                        <Text style={styles.label}>Mobile:</Text>
                        <Text style={styles.value}>{s.mobile}</Text>
                      </View>

                      {/* RIGHT SIDE → QR */}
                      <View style={styles.qrBox}>
                        <Image style={styles.qrImage} src={generateEmailQR(s.email)} />
                        <Text style={styles.qrText}>Scan to Email</Text>
                      </View>
                    </View >
<View style={styles}>
                    {/* Email Bottom Full Width */}
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.emailBottom}>{s.email}</Text>

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

  const addStudent = () => setStudents([...students, { name: "", email: "", mobile: "" }]);
  const updateStudent = (i, field, value) => {
    const updated = [...students];
    updated[i][field] = value;
    setStudents(updated);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600">Student PDF Generator</h2>

        {students.map((student, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-300 rounded-xl p-4 bg-orange-50 space-y-2"
          >
            <h3 className="font-semibold text-orange-700">Student {index + 1}</h3>

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Name"
              value={student.name}
              onChange={(e) => updateStudent(index, "name", e.target.value)}
            />

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Email"
              value={student.email}
              onChange={(e) => updateStudent(index, "email", e.target.value)}
            />

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Mobile"
              value={student.mobile}
              onChange={(e) => updateStudent(index, "mobile", e.target.value)}
            />
          </motion.div>
        ))}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600"
          >
            + Add More Student
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowPreview(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600"
          >
            Review PDF
          </motion.button>
        </div>
      </motion.div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-11/12 md:w-4/5 h-4/5 bg-white rounded-xl p-4 flex flex-col"
            >
              <button
                onClick={() => setShowPreview(false)}
                className="self-end mb-2 text-red-600 font-bold hover:text-red-800"
              >
                Close ✖
              </button>

              <PDFViewer style={{ flex: 1, borderRadius: 10 }}>
                <MyDocument />
              </PDFViewer>

              <div className="mt-4 flex justify-center">
                <PDFDownloadLink document={<MyDocument />} fileName="students.pdf">
                  {({ loading }) =>
                    loading ? (
                      <span>Preparing PDF...</span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700"
                      >
                        Download PDF
                      </motion.button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


