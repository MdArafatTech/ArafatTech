// import React, { useState, useEffect, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   pdf,
// } from "@react-pdf/renderer";
// import { saveAs } from "file-saver";
// import { motion, AnimatePresence } from "framer-motion";
// import subjectsData from "../data/subjects.json";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const gradePointMap = {
//   "A+": 4.0,
//   A: 3.75,
//   "A-": 3.5,
//   "B+": 3.25,
//   B: 3.0,
//   "B-": 2.75,
//   "C+": 2.5,
//   C: 2.25,
//   D: 2.0,
//   F: 0.0,
// };
// const gradeOptions = Object.keys(gradePointMap);

// const CgpaCalculator = () => {
//   const [semesters, setSemesters] = useState([
//     { name: "Semester 1", courses: [{ name: "", credit: "", grade: "A+" }] },
//   ]);
//   const [theme, setTheme] = useState("light");
//   const [name, setName] = useState("");
//   const [reg, setReg] = useState("");
//   const [roll, setRoll] = useState("");
//   const [logo, setLogo] = useState(null);
//   const [department, setDepartment] = useState("");
//   const [year, setYear] = useState("");
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     setTheme(mediaQuery.matches ? "dark" : "light");
//     const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

//   // --- Department & Year Subjects ---
//   useEffect(() => {
//     if (
//       department &&
//       year &&
//       subjectsData[department] &&
//       subjectsData[department][year]
//     ) {
//       const deptSubjects = subjectsData[department][year].map((s) => ({
//         name: `${s.code} - ${s.name}`,
//         credit: s.credit,
//         grade: "A+",
//       }));
//       setSemesters([{ name: "Semester 1", courses: deptSubjects }]);
//     } else if (!department && !year) {
//       setSemesters([
//         {
//           name: "Semester 1",
//           courses: [{ name: "", credit: "", grade: "A+" }],
//         },
//       ]);
//     }
//   }, [department, year]);

//   const addSemester = () => {
//     setSemesters([
//       ...semesters,
//       {
//         name: `Semester ${semesters.length + 1}`,
//         courses: [{ name: "", credit: "", grade: "A+" }],
//       },
//     ]);
//   };
//   const removeSemester = (semIndex) =>
//     setSemesters(semesters.filter((_, i) => i !== semIndex));
//   const addCourse = (semIndex) => {
//     const updated = [...semesters];
//     updated[semIndex].courses.push({ name: "", credit: "", grade: "A+" });
//     setSemesters(updated);
//   };
//   const removeCourse = (semIndex, courseIndex) => {
//     const updated = [...semesters];
//     updated[semIndex].courses = updated[semIndex].courses.filter(
//       (_, i) => i !== courseIndex
//     );
//     setSemesters(updated);
//   };
//   const updateCourse = (semIndex, courseIndex, field, value) => {
//     const updated = [...semesters];
//     updated[semIndex].courses[courseIndex][field] = value;
//     setSemesters(updated);
//   };
//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setLogo(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const computeSemesterResult = (courses) => {
//     let totalPoints = 0;
//     let totalCredits = 0;
//     courses.forEach((c) => {
//       const credit = parseFloat(c.credit);
//       const gp = gradePointMap[c.grade];
//       if (!isNaN(credit) && credit > 0) {
//         totalPoints += gp * credit;
//         totalCredits += credit;
//       }
//     });
//     const gpa =
//       totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
//     return { totalPoints: totalPoints.toFixed(2), totalCredits, gpa };
//   };

//   const computeCGPA = () => {
//     let totalPoints = 0;
//     let totalCredits = 0;
//     semesters.forEach((sem) => {
//       sem.courses.forEach((c) => {
//         const credit = parseFloat(c.credit);
//         const gp = gradePointMap[c.grade];
//         if (!isNaN(credit) && credit > 0) {
//           totalPoints += gp * credit;
//           totalCredits += credit;
//         }
//       });
//     });
//     const cgpa =
//       totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
//     return { totalPoints: totalPoints.toFixed(2), totalCredits, cgpa };
//   };

//   const { totalPoints, totalCredits, cgpa } = computeCGPA();

//   const downloadPdf = async () => {
//     const date = new Date().toLocaleDateString();
//     const logoUrl = logo || "/logo-nu.png";

//     const doc = (
//       <Document>
//         <Page size="A4" style={pdfStyles.page}>
//           <View style={pdfStyles.header}>
//             <Image src={logoUrl} style={pdfStyles.logo} />
//             <Text style={pdfStyles.title}>National University Bangladesh</Text>
//             <Text style={pdfStyles.date}>{date}</Text>
//           </View>
//           <View style={pdfStyles.userInfoRow}>
//             <Text style={pdfStyles.label}>Name: </Text>
//             <Text style={pdfStyles.value}>{name || "N/A"}</Text>
//             <Text style={pdfStyles.label}>Registration: </Text>
//             <Text style={pdfStyles.value}>{reg || "N/A"}</Text>
//             <Text style={pdfStyles.label}>Roll: </Text>
//             <Text style={pdfStyles.value}>{roll || "N/A"}</Text>
//             <Text style={pdfStyles.label}>Department: </Text>
//             <Text style={pdfStyles.value}>{department || "N/A"}</Text>
//             <Text style={pdfStyles.label}>Year: </Text>
//             <Text style={pdfStyles.value}>{year || "N/A"}</Text>
//           </View>
//           {semesters.map((sem, semIndex) => {
//             const { totalPoints, totalCredits, gpa } = computeSemesterResult(
//               sem.courses
//             );
//             return (
//               <View key={semIndex} style={pdfStyles.section}>
//                 <Text style={pdfStyles.semesterTitle}>{sem.name}</Text>
//                 <View style={pdfStyles.tableHeaderRow}>
//                   <Text style={pdfStyles.tableHeader}>Subject</Text>
//                   <Text style={pdfStyles.tableHeader}>Grade</Text>
//                   <Text style={pdfStyles.tableHeader}>Credit</Text>
//                   <Text style={pdfStyles.tableHeader}>Point</Text>
//                 </View>
//                 {sem.courses.map((c, i) => (
//                   <View key={i} style={pdfStyles.row}>
//                     <Text style={pdfStyles.cell}>{c.name || "N/A"}</Text>
//                     <Text style={pdfStyles.cell}>{c.grade}</Text>
//                     <Text style={pdfStyles.cell}>{c.credit || "N/A"}</Text>
//                     <Text style={pdfStyles.cell}>
//                       {(gradePointMap[c.grade] * parseFloat(c.credit)).toFixed(
//                         2
//                       )}
//                     </Text>
//                   </View>
//                 ))}
//                 <View style={pdfStyles.resultSection}>
//                   <Text style={pdfStyles.resultLabel}>Semester Credits: </Text>
//                   <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
//                   <Text style={pdfStyles.resultLabel}>Semester Points: </Text>
//                   <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
//                   <Text style={pdfStyles.resultLabel}>GPA: </Text>
//                   <Text style={pdfStyles.resultHighlight}>{gpa}</Text>
//                 </View>
//               </View>
//             );
//           })}
//           <View style={pdfStyles.finalResultSection}>
//             <Text style={pdfStyles.finalResultTitle}>Final Result</Text>
//             <Text style={pdfStyles.resultLabel}>Total Credits: </Text>
//             <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
//             <Text style={pdfStyles.resultLabel}>Total Grade Points: </Text>
//             <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
//             <Text style={pdfStyles.resultLabel}>CGPA: </Text>
//             <Text style={pdfStyles.resultHighlight}>{cgpa}</Text>
//           </View>
//         </Page>
//       </Document>
//     );

//     const blob = await pdf(doc).toBlob();
//     saveAs(blob, "National_University_Result_Sheet.pdf");
//   };

//   return (
//     <div style={theme === "dark" ? darkStyles.container : styles.container}>
//       <h1 style={theme === "dark" ? darkStyles.title : styles.title}>
//         Bangladesh Semester GPA / CGPA Calculator
//       </h1>

//       {/* User Info + Department + Year */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5">
//         {/* Name */}
//         <div className="flex flex-col">
//           <label className="mb-1 font-semibold text-sm">Name</label>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={theme === "dark" ? darkStyles.input : styles.input}
//           />
//         </div>

//         {/* Registration */}
//         <div className="flex flex-col">
//           <label className="mb-1 font-semibold text-sm">Registration</label>
//           <input
//             type="text"
//             placeholder="Enter registration"
//             value={reg}
//             onChange={(e) => setReg(e.target.value)}
//             style={theme === "dark" ? darkStyles.input : styles.input}
//           />
//         </div>

//         {/* Roll */}
//         <div className="flex flex-col">
//           <label className="mb-1 font-semibold text-sm">Roll</label>
//           <input
//             type="text"
//             placeholder="Enter roll"
//             value={roll}
//             onChange={(e) => setRoll(e.target.value)}
//             style={theme === "dark" ? darkStyles.input : styles.input}
//           />
//         </div>

//         {/* Department */}
//         <div className="flex flex-col">
//           <label className="mb-1 font-semibold text-sm">Department</label>
//           <select
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//             style={theme === "dark" ? darkStyles.select : styles.select}
//           >
//             <option value="">Select Department</option>
//             {Object.keys(subjectsData).map((dep) => (
//               <option key={dep} value={dep}>
//                 {dep}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Year */}
//         <div className="flex flex-col">
//           <label className="mb-1 font-semibold text-sm">Year</label>
//           <select
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             style={theme === "dark" ? darkStyles.select : styles.select}
//           >
//             <option value="">Select Year</option>
//             <option value="1">1st Year</option>
//             <option value="2">2nd Year</option>
//             <option value="3">3rd Year</option>
//             <option value="4">4th Year</option>
//           </select>
//         </div>
//       </div>

//       <AnimatePresence>
//         {semesters.map((sem, semIndex) => {
//           const chartData = {
//             labels: sem.courses.map((c, i) => c.name || `Course ${i + 1}`),
//             datasets: [
//               {
//                 label: "Grade Point",
//                 data: sem.courses.map((c) => gradePointMap[c.grade]),
//                 backgroundColor: theme === "dark" ? "#4bc0c0" : "#007bff",
//               },
//             ],
//           };
//           const chartOptions = {
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: { y: { beginAtZero: true, max: 4 } },
//             plugins: {
//               legend: { labels: { color: theme === "dark" ? "#fff" : "#000" } },
//             },
//           };
//           const { totalPoints, totalCredits, gpa } = computeSemesterResult(
//             sem.courses
//           );

//           return (
//             <motion.div
//               key={semIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               style={
//                 theme === "dark"
//                   ? responsiveStyles.semesterDark
//                   : responsiveStyles.semester
//               }
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <h2 style={{ flex: "1 1 auto", minWidth: "150px" }}>
//                   {sem.name}
//                 </h2>
//                 {semesters.length > 1 && (
//                   <button
//                     onClick={() => removeSemester(semIndex)}
//                     style={{
//                       ...responsiveStyles.removeBtn,
//                       marginTop: "5px",
//                       backgroundColor: "#6c757d",
//                     }}
//                   >
//                     Remove Semester
//                   </button>
//                 )}
//               </div>
//               {sem.courses.map((c, courseIndex) => (
//                 <div key={courseIndex} style={responsiveStyles.courseRow}>
//                   <input
//                     type="text"
//                     placeholder="Subject Name"
//                     value={c.name}
//                     onChange={(e) =>
//                       updateCourse(
//                         semIndex,
//                         courseIndex,
//                         "name",
//                         e.target.value
//                       )
//                     }
//                     style={responsiveStyles.input}
//                   />
//                   <select
//                     value={c.grade}
//                     onChange={(e) =>
//                       updateCourse(
//                         semIndex,
//                         courseIndex,
//                         "grade",
//                         e.target.value
//                       )
//                     }
//                     style={responsiveStyles.select}
//                   >
//                     {gradeOptions.map((g) => (
//                       <option key={g} value={g}>
//                         {g}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="number"
//                     placeholder="Credit"
//                     value={c.credit}
//                     onChange={(e) =>
//                       updateCourse(
//                         semIndex,
//                         courseIndex,
//                         "credit",
//                         e.target.value
//                       )
//                     }
//                     min="0"
//                     step="0.5"
//                     style={responsiveStyles.input}
//                   />
//                   <button
//                     onClick={() => removeCourse(semIndex, courseIndex)}
//                     style={responsiveStyles.removeBtn}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 onClick={() => addCourse(semIndex)}
//                 style={responsiveStyles.button}
//               >
//                 Add Course
//               </button>
//               <div
//                 style={{ marginTop: "20px", width: "100%", minHeight: "250px" }}
//               >
//                 <Bar data={chartData} options={chartOptions} />
//               </div>
//               <div style={responsiveStyles.semesterResult}>
//                 <p>
//                   <strong>Semester Credits:</strong> {totalCredits}
//                 </p>
//                 <p>
//                   <strong>Semester Points:</strong> {totalPoints}
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "1.2em",
//                     color:
//                       gpa >= 3.75
//                         ? "#28a745"
//                         : gpa >= 3.0
//                         ? "#ffc107"
//                         : "#dc3545",
//                   }}
//                 >
//                   <strong>GPA: {gpa}</strong>
//                 </p>
//               </div>
//             </motion.div>
//           );
//         })}
//       </AnimatePresence>

//       <div style={styles.buttonRow}>
//         <button onClick={addSemester} style={styles.button}>
//           Add Semester
//         </button>
//       </div>

//       <div
//         id="result-card"
//         style={theme === "dark" ? darkStyles.resultCard : styles.resultCard}
//       >
//         <h2>Overall Result</h2>
//         <p>
//           <strong>Total Credits:</strong> {totalCredits}
//         </p>
//         <p>
//           <strong>Total Grade Points:</strong> {totalPoints}
//         </p>
//         <p
//           style={{
//             fontSize: "1.5em",
//             color:
//               cgpa >= 3.75 ? "#28a745" : cgpa >= 3.0 ? "#ffc107" : "#dc3545",
//           }}
//         >
//           <strong>CGPA: {cgpa}</strong>
//         </p>
//         <button onClick={downloadPdf} style={styles.button}>
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- PDF Styles ---
// const pdfStyles = StyleSheet.create({
//   page: { padding: 20, fontSize: 11, fontFamily: "Helvetica" },
//   header: {
//     flexDirection: "col",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//     borderBottom: "2px solid #007bff",
//     paddingBottom: 25,
//   },
//   logo: { width: 80, height: 80 },
//   title: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
//   date: { fontSize: 9, position: "absolute", right: 10, top: 90 },
//   userInfoRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 10,
//     flexWrap: "wrap",
//   },
//   label: { fontSize: 12, fontWeight: "bold", width: "20%" },
//   value: { fontSize: 11, width: "30%" },
//   section: { marginBottom: 20 },
//   semesterTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
//   tableHeaderRow: { flexDirection: "row", borderBottom: "1px solid #333" },
//   tableHeader: { width: "25%", fontSize: 12, fontWeight: "bold" },
//   row: {
//     flexDirection: "row",
//     borderBottom: "1px solid #ccc",
//     paddingVertical: 5,
//   },
//   cell: { width: "25%", fontSize: 12 },
//   resultSection: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#f4f4f4",
//     borderRadius: 6,
//   },
//   resultLabel: { fontSize: 13, fontWeight: "bold" },
//   resultValue: { fontSize: 13 },
//   resultHighlight: { fontSize: 14, fontWeight: "bold", color: "#28a745" },
//   finalResultSection: {
//     marginTop: 17,
//     padding: 10,
//     backgroundColor: "#e9f7ef",
//     borderRadius: 6,
//   },
//   finalResultTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
// });

// // --- Responsive & Theme Styles ---
// const styles = {
//   container: {
//     padding: 18,
//     fontFamily: "Arial, sans-serif",
//     background: "#f9f9f9",
//     minHeight: "100vh",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
    
//   },
//   input: {
//     padding: "8px 10px",
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     width: "100%",
   
//   },
//   select: {
//     padding: "8px 10px",
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     width: "100%",
//   },
//   button: {
//     padding: "8px 15px",
//     borderRadius: 5,
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   buttonRow: { display: "flex", justifyContent: "center", marginTop: 20 },
//   resultCard: {
//     marginTop: 20,
//     padding: 20,
//     borderRadius: 10,
//     background: "#fff",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
// };

// const darkStyles = {
//   ...styles,
//   container: { ...styles.container, background: "#1e1e2f", color: "#fff" },
//   title: { ...styles.title, color: "#fff" },
//   input: {
//     ...styles.input,
//     background: "#333",
//     color: "#fff",
//     border: "1px solid #555",
//   },
//   select: {
//     ...styles.select,
//     background: "#333",
//     color: "#fff",
//     border: "1px solid #555",
//   },
//   resultCard: {
//     ...styles.resultCard,
//     background: "#2e2e3c",
//     color: "#fff",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
//   },
// };

// const responsiveStyles = {
//   semester: {
//     marginBottom: 25,
//     padding: 15,
//     background: "#fff",
//     borderRadius: 8,
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//   },
//   semesterDark: {
//     marginBottom: 25,
//     padding: 15,
//     background: "#2e2e3c",
//     borderRadius: 8,
//     boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
//   },
//   courseRow: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 },
//   input: {
//     padding: "6px 8px",
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     flex: "1 1 120px",
//   },
//   select: {
//     padding: "6px 8px",
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     flex: "1 1 120px",
//   },
//   button: {
//     padding: "6px 10px",
//     borderRadius: 5,
//     border: "none",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   removeBtn: {
//     padding: "4px 8px",
//     borderRadius: 5,
//     border: "none",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   semesterResult: {
//     marginTop: 10,
//     padding: 10,
//     background: "#f4f4f4",
//     borderRadius: 5,
//   },
// };

// export default CgpaCalculator;










import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";
import subjectsData from "../data/subjects.json";
import Select from "react-select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const gradePointMap = {
  "A+": 4.0,
  A: 3.75,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.25,
  D: 2.0,
  F: 0.0,
};
const gradeOptions = Object.keys(gradePointMap);

const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState([
    {
      name: "Semester 1",
      department: "",
      year: "",
      courses: [{ name: "", credit: "", grade: "A+" }],
    },
  ]);
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [roll, setRoll] = useState("");
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const updateCourse = (semIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };


const departmentOptions = Object.keys(subjectsData).map((dep) => ({
  value: dep,
  label: dep,
}));



  const addCourse = (semIndex) => {
    const updated = [...semesters];
    updated[semIndex].courses.push({ name: "", credit: "", grade: "A+" });
    setSemesters(updated);
  };

  const removeCourse = (semIndex, courseIndex) => {
    const updated = [...semesters];
    updated[semIndex].courses = updated[semIndex].courses.filter(
      (_, i) => i !== courseIndex
    );
    setSemesters(updated);
  };

  const removeSemester = (semIndex) =>
    setSemesters(semesters.filter((_, i) => i !== semIndex));

  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        name: `Semester ${semesters.length + 1}`,
        department: "",
        year: "",
        courses: [{ name: "", credit: "", grade: "A+" }],
      },
    ]);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- Update semester department/year & load subjects ---
  const updateSemesterField = (semIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex][field] = value;

    const { department, year } = updated[semIndex];
    if (
      department &&
      year &&
      subjectsData[department] &&
      subjectsData[department][year]
    ) {
      updated[semIndex].courses = subjectsData[department][year].map((s) => ({
        name: `${s.code} - ${s.name}`,
        credit: s.credit,
        grade: "A+",
      }));
    } else if (!department || !year) {
      updated[semIndex].courses = [{ name: "", credit: "", grade: "A+" }];
    }

    setSemesters(updated);
  };

  const computeSemesterResult = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach((c) => {
      const credit = parseFloat(c.credit);
      const gp = gradePointMap[c.grade];
      if (!isNaN(credit) && credit > 0) {
        totalPoints += gp * credit;
        totalCredits += credit;
      }
    });
    const gpa =
      totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    return { totalPoints: totalPoints.toFixed(2), totalCredits, gpa };
  };

  const computeCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach((sem) => {
      sem.courses.forEach((c) => {
        const credit = parseFloat(c.credit);
        const gp = gradePointMap[c.grade];
        if (!isNaN(credit) && credit > 0) {
          totalPoints += gp * credit;
          totalCredits += credit;
        }
      });
    });
    const cgpa =
      totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    return { totalPoints: totalPoints.toFixed(2), totalCredits, cgpa };
  };

  const { totalPoints, totalCredits, cgpa } = computeCGPA();

  const downloadPdf = async () => {
    const date = new Date().toLocaleDateString();
    const logoUrl = logo || "/logo-nu.png";

    const doc = (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.header}>
            <Image src={logoUrl} style={pdfStyles.logo} />
            <Text style={pdfStyles.title}>National University Bangladesh</Text>
            <Text style={pdfStyles.date}>{date}</Text>
          </View>
          <View style={pdfStyles.userInfoRow}>
            <Text style={pdfStyles.label}>Name: </Text>
            <Text style={pdfStyles.value}>{name || "N/A"}</Text>
            <Text style={pdfStyles.label}>Registration: </Text>
            <Text style={pdfStyles.value}>{reg || "N/A"}</Text>
            <Text style={pdfStyles.label}>Roll: </Text>
            <Text style={pdfStyles.value}>{roll || "N/A"}</Text>
          </View>
          {semesters.map((sem, semIndex) => {
            const { totalPoints, totalCredits, gpa } = computeSemesterResult(
              sem.courses
            );
            return (
              <View key={semIndex} style={pdfStyles.section}>
                <Text style={pdfStyles.semesterTitle}>
                  {sem.name} ({sem.department || "N/A"}, Year: {sem.year || "N/A"})
                </Text>
                <View style={pdfStyles.tableHeaderRow}>
                  <Text style={pdfStyles.tableHeader}>Subject</Text>
                  <Text style={pdfStyles.tableHeader}>Grade</Text>
                  <Text style={pdfStyles.tableHeader}>Credit</Text>
                  <Text style={pdfStyles.tableHeader}>Point</Text>
                </View>
                {sem.courses.map((c, i) => (
                  <View key={i} style={pdfStyles.row}>
                    <Text style={pdfStyles.cell}>{c.name || "N/A"}</Text>
                    <Text style={pdfStyles.cell}>{c.grade}</Text>
                    <Text style={pdfStyles.cell}>{c.credit || "N/A"}</Text>
                    <Text style={pdfStyles.cell}>
                      {(gradePointMap[c.grade] * parseFloat(c.credit)).toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View style={pdfStyles.resultSection}>
                  <Text style={pdfStyles.resultLabel}>Semester Credits: </Text>
                  <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
                  <Text style={pdfStyles.resultLabel}>Semester Points: </Text>
                  <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
                  <Text style={pdfStyles.resultLabel}>GPA: </Text>
                  <Text style={pdfStyles.resultHighlight}>{gpa}</Text>
                </View>
              </View>
            );
          })}
          <View style={pdfStyles.finalResultSection}>
            <Text style={pdfStyles.finalResultTitle}>Final Result</Text>
            <Text style={pdfStyles.resultLabel}>Total Credits: </Text>
            <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
            <Text style={pdfStyles.resultLabel}>Total Grade Points: </Text>
            <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
            <Text style={pdfStyles.resultLabel}>CGPA: </Text>
            <Text style={pdfStyles.resultHighlight}>{cgpa}</Text>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    saveAs(blob, "National_University_Result_Sheet.pdf");
  };

  return (
    <div style={theme === "dark" ? darkStyles.container : styles.container}>
      <h1 style={theme === "dark" ? darkStyles.title : styles.title}>
        Bangladesh Semester GPA / CGPA Calculator
      </h1>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={theme === "dark" ? darkStyles.input : styles.input}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Registration</label>
          <input
            type="number"
            placeholder="Enter registration"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            style={theme === "dark" ? darkStyles.input : styles.input}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-sm">Roll</label>
          <input
            type="number"
            placeholder="Enter roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            style={theme === "dark" ? darkStyles.input : styles.input}
          />
        </div>
      </div>

      <AnimatePresence>
        {semesters.map((sem, semIndex) => {
          const chartData = {
            labels: sem.courses.map((c, i) => c.name || `Course ${i + 1}`),
            datasets: [
              {
                label: "Grade Point",
                data: sem.courses.map((c) => gradePointMap[c.grade]),
                backgroundColor: theme === "dark" ? "#4bc0c0" : "#007bff",
              },
            ],
          };
          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 4 } },
            plugins: {
              legend: { labels: { color: theme === "dark" ? "#fff" : "#000" } },
            },
          };
          const { totalPoints, totalCredits, gpa } = computeSemesterResult(
            sem.courses
          );

          return (
            <motion.div
              key={semIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={
                theme === "dark"
                  ? responsiveStyles.semesterDark
                  : responsiveStyles.semester
              }
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ flex: "1 1 auto", minWidth: "150px" }}>
                  {sem.name}
                </h2>
                {semesters.length > 1 && (
                  <button
                    onClick={() => removeSemester(semIndex)}
                    style={{
                      ...responsiveStyles.removeBtn,
                      marginTop: "5px",
                      marginBottom: "8px",
                      backgroundColor: "#6c757d",
                    }}
                  >
                    Remove Semester
                  </button>
                )}
              </div>

              {/* Department & Year per semester */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  }}
>
  {/* Department */}
  <Select
    value={sem.department ? { value: sem.department, label: sem.department } : null}
    onChange={(selected) =>
      updateSemesterField(semIndex, "department", selected?.value || "")
    }
    options={Object.keys(subjectsData).map((dep) => ({ value: dep, label: dep }))}
    styles={{
      container: (provided) => ({ ...provided, flex: "1 1 150px", minWidth: "120px" }),
      control: (provided) => ({
        ...provided,
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        borderColor: theme === "dark" ? "#666" : "#ccc",
        boxShadow: "none",
        "&:hover": { borderColor: "#007bff" },
        minHeight: "35px",
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        maxHeight: "300px",
        overflowY: "auto",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#007bff"
          : state.isFocused
          ? theme === "dark"
            ? "#444"
            : "#f0f0f0"
          : theme === "dark"
          ? "#333"
          : "#fff",
        color: state.isSelected ? "#fff" : theme === "dark" ? "#fff" : "#000",
        cursor: "pointer",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme === "dark" ? "#fff" : "#000",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: theme === "dark" ? "#bbb" : "#666",
      }),
    }}
  />

  {/* Year */}
  <Select
    value={
      sem.year
        ? {
            value: sem.year,
            label:
              sem.year === "1"
                ? "1st Year"
                : sem.year === "2"
                ? "2nd Year"
                : sem.year === "3"
                ? "3rd Year"
                : "4th Year",
          }
        : null
    }
    onChange={(selected) =>
      updateSemesterField(semIndex, "year", selected?.value || "")
    }
    options={[
      { value: "1", label: "1st Year" },
      { value: "2", label: "2nd Year" },
      { value: "3", label: "3rd Year" },
      { value: "4", label: "4th Year" },
    ]}
    styles={{
      container: (provided) => ({ ...provided, flex: "1 1 100px", minWidth: "100px" }),
      control: (provided) => ({
        ...provided,
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        borderColor: theme === "dark" ? "#666" : "#ccc",
        boxShadow: "none",
        "&:hover": { borderColor: "#007bff" },
        minHeight: "35px",
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        maxHeight: "200px",
        overflowY: "auto",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? "#007bff"
          : state.isFocused
          ? theme === "dark"
            ? "#444"
            : "#f0f0f0"
          : theme === "dark"
          ? "#333"
          : "#fff",
        color: state.isSelected ? "#fff" : theme === "dark" ? "#fff" : "#000",
        cursor: "pointer",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme === "dark" ? "#fff" : "#000",
      }),
      placeholder: (provided) => ({
        ...provided,
        color: theme === "dark" ? "#bbb" : "#666",
      }),
    }}
  />
</div>




              {sem.courses.map((c, courseIndex) => (
                <div key={courseIndex} style={responsiveStyles.courseRow}>
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={c.name}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "name", e.target.value)
                    }
                    style={responsiveStyles.input}
                  />
                  <select
                    value={c.grade}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "grade", e.target.value)
                    }
                    style={responsiveStyles.select}
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Credit"
                    value={c.credit}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "credit", e.target.value)
                    }
                    min="0"
                    step="0.5"
                    style={responsiveStyles.input}
                  />
                  <button
                    onClick={() => removeCourse(semIndex, courseIndex)}
                    style={responsiveStyles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={() => addCourse(semIndex)}
                style={responsiveStyles.button}
              >
                Add Course
              </button>

              <div style={{ marginTop: "20px", width: "100%", minHeight: "250px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>

              <div style={responsiveStyles.semesterResult}>
                <p>
                  <strong>Semester Credits:</strong> {totalCredits}
                </p>
                <p>
                  <strong>Semester Points:</strong> {totalPoints}
                </p>
                <p
                  style={{
                    fontSize: "1.2em",
                    color:
                      gpa >= 3.75
                        ? "#28a745"
                        : gpa >= 3.0
                        ? "#ffc107"
                        : "#dc3545",
                  }}
                >
                  <strong>GPA: {gpa}</strong>
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div style={styles.buttonRow}>
        <button onClick={addSemester} style={styles.button}>
          Add Semester
        </button>
      </div>

      <div
        id="result-card"
        style={theme === "dark" ? darkStyles.resultCard : styles.resultCard}
      >
        <h2>Overall Result</h2>
        <p>
          <strong>Total Credits:</strong> {totalCredits}
        </p>
        <p>
          <strong>Total Grade Points:</strong> {totalPoints}
        </p>
        <p
          style={{
            fontSize: "1.5em",
            color:
              cgpa >= 3.75 ? "#28a745" : cgpa >= 3.0 ? "#ffc107" : "#dc3545",
          }}
        >
          <strong>CGPA: {cgpa}</strong>
        </p>
        <button onClick={downloadPdf} style={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

// --- PDF Styles ---
const pdfStyles = StyleSheet.create({
  page: { padding: 20, fontSize: 11, fontFamily: "Helvetica" },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2px solid #007bff",
    paddingBottom: 25,
  },
  logo: { width: 80, height: 80 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
  date: { fontSize: 9, position: "absolute", right: 10, top: 90 },
  userInfoRow: {
    flexDirection: "row",
    gap: 5, // tighter spacing
    marginBottom: 10,
    flexWrap: "wrap",
  },
  label: { fontSize: 11, fontWeight: "bold", width: "18%" },
  value: { fontSize: 11, width: "25%" },
  section: { marginBottom: 20 },
  semesterTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
  
  // Table styles
  tableHeaderRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    borderTop: "1px solid #000",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 10,
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    padding: 4,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  cell: {
    flex: 1,
    fontSize: 10,
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    padding: 4,
    textAlign: "center",
  },

  resultSection: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
    flexWrap: "wrap",
  },
  resultLabel: { fontSize: 10, fontWeight: "bold" },
  resultValue: { fontSize: 10 },
  resultHighlight: { fontSize: 12, fontWeight: "bold" },
  finalResultSection: {
    borderTop: "2px solid #007bff",
    marginTop: 10,
    paddingTop: 10,
  },
  finalResultTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
});


// --- Updated Styles with Darker Borders ---
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "20px", fontSize: "1.8em" },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    border: "2px solid #555", // darker border
    borderRadius: "6px",
    outline: "none",
    transition: "0.3s",
  },
  select: {
    padding: "10px",
    marginBottom: "10px",
    border: "2px solid #555", // darker border
    borderRadius: "6px",
    outline: "none",
    transition: "0.3s",
    backgroundColor: "#fff",
  },
  buttonRow: { display: "flex", justifyContent: "center", marginTop: "20px" },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
  resultCard: {
    padding: "20px",
    marginTop: "20px",
    border: "2px solid #555", // darker border
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};

const darkStyles = {
  ...styles,
  container: { ...styles.container, backgroundColor: "#121212", color: "#fff" },
  input: {
    ...styles.input,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "2px solid #888", // darker for dark mode
  },
  select: {
    ...styles.select,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "2px solid #888", // darker for dark mode
  },
  resultCard: { ...styles.resultCard, backgroundColor: "#1e1e1e", borderColor: "#888" },
};

const responsiveStyles = {
  semester: {
    marginBottom: "40px",
    padding: "15px",
    border: "2px solid #555", // darker border
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  semesterDark: {
    marginBottom: "40px",
    padding: "15px",
    border: "2px solid #888", // darker border for dark mode
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
  },
  courseRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" },
  input: {
    padding: "8px 10px",
    borderRadius: 5,
    border: "1.5px solid #555", // darker border
    flex: "1 1 120px",          // flexible width
    minWidth: "100px",
  },
  select: {
    padding: "8px",
    flex: "1 1 150px",
    border: "2px solid #555", // darker border
    borderRadius: "6px",
  },
  button: {
    padding: "8px 12px",
    marginTop: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  removeBtn: {
    padding: "6px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  semesterResult: { marginTop: "10px" },
};


export default CgpaCalculator;

