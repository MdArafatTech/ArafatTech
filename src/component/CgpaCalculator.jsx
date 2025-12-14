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
// import Select from "react-select";
// import GradingNoteSection from "../project/GradingNoteSection";
// import { FaSkullCrossbones } from "react-icons/fa6";
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
//     {
//       name: "Semester 1",
//       department: "",
//       year: "",
//       courses: [{ name: "", credit: "", grade: "A+" }],
//     },
//   ]);
//   const [theme, setTheme] = useState("light");
//   const [name, setName] = useState("");
//   const [reg, setReg] = useState("");
//   const [roll, setRoll] = useState("");
//   const [logo, setLogo] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     setTheme(mediaQuery.matches ? "dark" : "light");
//     const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const updateCourse = (semIndex, courseIndex, field, value) => {
//     const updated = [...semesters];
//     updated[semIndex].courses[courseIndex][field] = value;
//     setSemesters(updated);
//   };

//   const selectStyle = (theme) => ({
//     container: (provided) => ({
//       ...provided,
//       width: "100%",
//     }),
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: theme === "dark" ? "#333" : "#fff",
//       borderColor: theme === "dark" ? "#666" : "#ccc",
//       minHeight: "38px",
//       boxShadow: "none",
//       "&:hover": { borderColor: "#007bff" },
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: theme === "dark" ? "#333" : "#fff",
//       color: theme === "dark" ? "#fff" : "#000",
//       maxHeight: "250px",
//       overflowY: "auto",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#007bff"
//         : state.isFocused
//         ? theme === "dark"
//           ? "#444"
//           : "#f0f0f0"
//         : theme === "dark"
//         ? "#333"
//         : "#fff",
//       color: state.isSelected ? "#fff" : theme === "dark" ? "#fff" : "#000",
//       cursor: "pointer",
//     }),
//     singleValue: (p) => ({ ...p, color: theme === "dark" ? "#fff" : "#000" }),
//     placeholder: (p) => ({ ...p, color: theme === "dark" ? "#bbb" : "#666" }),
//   });

//   const departmentOptions = Object.keys(subjectsData).map((dep) => ({
//     value: dep,
//     label: dep,
//   }));

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

//   const removeSemester = (semIndex) =>
//     setSemesters(semesters.filter((_, i) => i !== semIndex));

//   const addSemester = () => {
//     setSemesters([
//       ...semesters,
//       {
//         name: `Semester ${semesters.length + 1}`,
//         department: "",
//         year: "",
//         courses: [{ name: "", credit: "", grade: "A+" }],
//       },
//     ]);
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setLogo(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // --- Update semester department/year & load subjects ---
//   const updateSemesterField = (semIndex, field, value) => {
//     const updated = [...semesters];
//     updated[semIndex][field] = value;

//     const { department, year } = updated[semIndex];
//     if (
//       department &&
//       year &&
//       subjectsData[department] &&
//       subjectsData[department][year]
//     ) {
//       updated[semIndex].courses = subjectsData[department][year].map((s) => ({
//         name: `${s.code} - ${s.name}`,
//         credit: s.credit,
//         grade: "A+",
//       }));
//     } else if (!department || !year) {
//       updated[semIndex].courses = [{ name: "", credit: "", grade: "A+" }];
//     }

//     setSemesters(updated);
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
//           </View>
//           {semesters.map((sem, semIndex) => {
//             const { totalPoints, totalCredits, gpa } = computeSemesterResult(
//               sem.courses
//             );
//             return (
//               <View key={semIndex} style={pdfStyles.section}>
//                 <Text style={pdfStyles.semesterTitle}>
//                   {sem.name} ({sem.department || "N/A"}, Year:{" "}
//                   {sem.year || "N/A"})
//                 </Text>
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
//     <div className="px-1 md:px-[4%] lg:px-[6%]">
//       <div style={theme === "dark" ? darkStyles.container : styles.container}>
//         <h1 style={theme === "dark" ? darkStyles.title : styles.title}>
//           Bangladesh Semester GPA / CGPA Calculator
//         </h1>

//         {/* User Info */}
// <div className=" w-full ml-auto md:ml-[0%] lg:ml-[20%]">

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-3 my-5 ">
//           <div className="flex flex-col">
//             <label className="mb-1 font-semibold text-sm">Name</label>
//             <input
//               className="text-sm md:text-md lg:text-lg"
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={theme === "dark" ? darkStyles.input : styles.input}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 font-semibold text-sm">Registration</label>
//             <input
//               className="text-sm md:text-md lg:text-lg"
//               type="number"
//               placeholder="Enter registration"
//               value={reg}
//               onChange={(e) => setReg(e.target.value)}
//               style={theme === "dark" ? darkStyles.input : styles.input}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-1 font-semibold text-sm">Roll</label>
//             <input
//               className="text-sm md:text-md lg:text-lg"
//               type="number"
//               placeholder="Enter roll"
//               value={roll}
//               onChange={(e) => setRoll(e.target.value)}
//               style={theme === "dark" ? darkStyles.input : styles.input}
//             />
//           </div>
//         </div>
//         </div>

//         <AnimatePresence>
//           {semesters.map((sem, semIndex) => {
//             const chartData = {
//               labels: sem.courses.map((c, i) => c.name || `Course ${i + 1}`),
//               datasets: [
//                 {
//                   label: "Grade Point",
//                   data: sem.courses.map((c) => gradePointMap[c.grade]),
//                   backgroundColor: theme === "dark" ? "#4bc0c0" : "#007bff",
//                 },
//               ],
//             };

//             const chartOptions = {
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: { y: { beginAtZero: true, max: 4 } },
//               plugins: {
//                 legend: {
//                   labels: { color: theme === "dark" ? "#fff" : "#000" },
//                 },
//               },
//             };

//             const { totalPoints, totalCredits, gpa } = computeSemesterResult(
//               sem.courses
//             );

//             return (
//               <motion.div
//                 key={semIndex}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 style={
//                   theme === "dark"
//                     ? responsiveStyles.semesterDark
//                     : responsiveStyles.semester
//                 }
//               >
//                 {/* ---------------- CENTERED SEMESTER TITLE FIX ---------------- */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "flex-end",
//                     position: "relative",
//                     width: "100%",
//                     padding: "20px 0",
//                   }}
//                 >
//                   {/* Center Title */}
//                   <h2
//                     style={{
//                       position: "absolute",
//                       left: "50%",
//                       transform: "translateX(-50%)",
//                       margin: 4,
//                       marginBottom: 23,
//                       fontWeight: "700",
                     
//                       textAlign: "center",
//                     }}
//                     className=" bg-blue-400 p-1 rounded text-sm md:text-md lg:text-lg"
//                   >
//                     {sem.name}
//                   </h2>

//                   {/* Right Remove Button */}
//                   {semesters.length > 1 && (
//                     <button
//                       onClick={() => removeSemester(semIndex)}
//                       style={{
//                         ...responsiveStyles.removeBtn,
//                       }}
//                       className="text-sm md:text-md lg:text-lg -mt-6 -mr-1"
//                     >
//                       <FaSkullCrossbones />
//                     </button>
//                   )}
//                 </div>
//                 {/* -------------------------------------------------------------- */}

//                 {/* Department & Year */}
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "15px",
//                     marginBottom: "15px",
//                   }}
//                 >
//                   {/* Department */}
//                   <div className="flex flex-col" style={{ flex: "1 1 200px" }}>
//                     <label className="mb-1 font-semibold text-sm md:text-md lg:text-lg">
//                       Department
//                     </label>

//                     <Select
//                       className="text-sm md:text-md lg:text-lg"
//                       placeholder="Select Department"
//                       value={
//                         sem.department
//                           ? { value: sem.department, label: sem.department }
//                           : null
//                       }
//                       onChange={(selected) =>
//                         updateSemesterField(
//                           semIndex,
//                           "department",
//                           selected?.value || ""
//                         )
//                       }
//                       options={Object.keys(subjectsData).map((dep) => ({
//                         value: dep,
//                         label: dep,
//                       }))}
//                       styles={selectStyle(theme)}
//                     />
//                   </div>

//                   {/* Year */}
//                   <div className="flex flex-col" style={{ flex: "1 1 200px" }}>
//                     <label className="mb-1 font-semibold text-sm md:text-md lg:text-lg">
//                       Year
//                     </label>

//                     <Select
//                       className="text-sm md:text-md lg:text-lg"
//                       placeholder="Select Year"
//                       value={
//                         sem.year
//                           ? {
//                               value: sem.year,
//                               label:
//                                 sem.year === "1"
//                                   ? "1st Year"
//                                   : sem.year === "2"
//                                   ? "2nd Year"
//                                   : sem.year === "3"
//                                   ? "3rd Year"
//                                   : "4th Year",
//                             }
//                           : null
//                       }
//                       onChange={(selected) =>
//                         updateSemesterField(
//                           semIndex,
//                           "year",
//                           selected?.value || ""
//                         )
//                       }
//                       options={[
//                         { value: "1", label: "1st Year" },
//                         { value: "2", label: "2nd Year" },
//                         { value: "3", label: "3rd Year" },
//                         { value: "4", label: "4th Year" },
//                       ]}
//                       styles={selectStyle(theme)}
//                     />
//                   </div>
//                 </div>

//                 {/* Course Input Instructions */}
//                 <div
//                   style={{
//                     marginBottom: "15px",
//                     padding: "12px",
//                     background: theme === "dark" ? "#1f2937" : "#f3f4f6",
//                     borderRadius: "10px",
//                     border:
//                       theme === "dark"
//                         ? "1px solid #374151"
//                         : "1px solid #e5e7eb",
//                   }}
//                 >
//                   <h3
//                     style={{
//                       marginBottom: "6px",
//                       fontSize: "18px",
//                       fontWeight: "600",
//                       color: theme === "dark" ? "#f9fafb" : "#111827",
//                     }}
//                   >
//                     Subject,Grade,Credit Input Section.
//                   </h3>

//                   <p
//                     style={{
//                       marginBottom: "6px",
//                       fontSize: "14px",
//                       color: theme === "dark" ? "#d1d5db" : "#4b5563",
//                     }}
//                   >
//                     Please fill in each subject below. Select the correct grade
//                     based on the National University grading scale and enter the
//                     credit value.
//                   </p>
//                 </div>

//                 {/* Courses Loop */}
//                 {sem.courses.map((c, courseIndex) => (
//                   <div key={courseIndex} style={responsiveStyles.courseRow}>
//                     <input
//                       className="text-sm md:text-md lg:text-lg"
//                       type="text"
//                       placeholder="Subject Name"
//                       value={c.name}
//                       onChange={(e) =>
//                         updateCourse(
//                           semIndex,
//                           courseIndex,
//                           "name",
//                           e.target.value
//                         )
//                       }
//                       style={responsiveStyles.input}
//                     />

//                     <select
//                       className="text-sm md:text-md lg:text-lg"
//                       value={c.grade}
//                       onChange={(e) =>
//                         updateCourse(
//                           semIndex,
//                           courseIndex,
//                           "grade",
//                           e.target.value
//                         )
//                       }
//                       style={responsiveStyles.select}
//                     >
//                       {gradeOptions.map((g) => (
//                         <option key={g} value={g}>
//                           {g}
//                         </option>
//                       ))}
//                     </select>

//                     <input
//                       className="text-sm md:text-md lg:text-lg"
//                       type="number"
//                       placeholder="Credit"
//                       value={c.credit}
//                       onChange={(e) =>
//                         updateCourse(
//                           semIndex,
//                           courseIndex,
//                           "credit",
//                           e.target.value
//                         )
//                       }
//                       min="0"
//                       step="0.5"
//                       style={responsiveStyles.input}
//                     />

//                     <button
//                       className="text-sm md:text-md lg:text-lg"
//                       onClick={() => removeCourse(semIndex, courseIndex)}
//                       style={responsiveStyles.removeBtn}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}

//                 {/* Add Course Button */}
//                 <button
//                   onClick={() => addCourse(semIndex)}
//                   style={responsiveStyles.button}
//                   className="text-sm md:text-md lg:text-lg"
//                 >
//                   Add Course
//                 </button>

//                 {/* Chart */}
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     width: "100%",
//                     minHeight: "250px",
//                   }}
//                 >
//                   <Bar data={chartData} options={chartOptions} />
//                 </div>

//                 {/* Semester Result */}
//                 <div style={responsiveStyles.semesterResult}>
//                   <p>
//                     <strong>Semester Credits:</strong> {totalCredits}
//                   </p>
//                   <p>
//                     <strong>Semester Points:</strong> {totalPoints}
//                   </p>

//                   <p
//                     style={{
//                       fontSize: "1.2em",
//                       color:
//                         gpa >= 3.75
//                           ? "#28a745"
//                           : gpa >= 3.0
//                           ? "#ffc107"
//                           : "#dc3545",
//                     }}
//                   >
//                     <strong>GPA: {gpa}</strong>
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         <div style={styles.buttonRow}>
//           <button onClick={addSemester} style={styles.button}>
//             Add Semester
//           </button>
//         </div>

//         <div
//           id="result-card"
//           style={theme === "dark" ? darkStyles.resultCard : styles.resultCard}
//         >
//           <h2>Overall Result</h2>
//           <p>
//             <strong>Total Credits:</strong> {totalCredits}
//           </p>
//           <p>
//             <strong>Total Grade Points:</strong> {totalPoints}
//           </p>
//           <p
//             style={{
//               fontSize: "1.5em",
//               color:
//                 cgpa >= 3.75 ? "#28a745" : cgpa >= 3.0 ? "#ffc107" : "#dc3545",
//             }}
//           >
//             <strong>CGPA: {cgpa}</strong>
//           </p>
//           <button onClick={downloadPdf} style={styles.button}>
//             Download PDF
//           </button>
//         </div>

//         <GradingNoteSection></GradingNoteSection>
//       </div>
//     </div>
//   );
// };

// // --- PDF Styles ---
// const pdfStyles = StyleSheet.create({
//   page: { padding: 20, fontSize: 11, fontFamily: "Helvetica" },
//   header: {
//     flexDirection: "column",
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
//     gap: 5, // tighter spacing
//     marginBottom: 10,
//     flexWrap: "wrap",
//   },
//   label: { fontSize: 11, fontWeight: "bold", width: "18%" },
//   value: { fontSize: 11, width: "25%" },
//   section: { marginBottom: 20 },
//   semesterTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },

//   // Table styles
//   tableHeaderRow: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//     borderTop: "1px solid #000",
//   },
//   tableHeader: {
//     flex: 1,
//     fontWeight: "bold",
//     fontSize: 10,
//     borderRight: "1px solid #000",
//     borderLeft: "1px solid #000",
//     padding: 4,
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//   },
//   cell: {
//     flex: 1,
//     fontSize: 10,
//     borderRight: "1px solid #000",
//     borderLeft: "1px solid #000",
//     padding: 4,
//     textAlign: "center",
//   },

//   resultSection: {
//     flexDirection: "row",
//     marginTop: 5,
//     gap: 10,
//     flexWrap: "wrap",
//   },
//   resultLabel: { fontSize: 10, fontWeight: "bold" },
//   resultValue: { fontSize: 10 },
//   resultHighlight: { fontSize: 12, fontWeight: "bold" },
//   finalResultSection: {
//     borderTop: "2px solid #007bff",
//     marginTop: 10,
//     paddingTop: 10,
//   },
//   finalResultTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
// });

// // --- Updated Styles with Darker Borders ---
// const styles = {
//   container: { padding: "20px", fontFamily: "Arial, sans-serif" },
//   title: { textAlign: "center", marginBottom: "20px", fontSize: "1.8em" },
//   input: {
//     padding: "10px",
//     marginBottom: "10px",
//     width: "100%",
//     border: "2px solid #555", // darker border
//     borderRadius: "6px",
//     outline: "none",
//     transition: "0.3s",
//   },
//   select: {
//     padding: "10px",
//     marginBottom: "10px",
//     border: "2px solid #555", // darker border
//     borderRadius: "6px",
//     outline: "none",
//     transition: "0.3s",
//     backgroundColor: "#fff",
//   },
//   buttonRow: { display: "flex", justifyContent: "center", marginTop: "20px" },
//   button: {
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   resultCard: {
//     padding: "20px",
//     marginTop: "20px",
//     border: "2px solid #555", // darker border
//     borderRadius: "8px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//   },
// };

// const darkStyles = {
//   ...styles,
//   container: { ...styles.container, backgroundColor: "#121212", color: "#fff" },
//   input: {
//     ...styles.input,
//     backgroundColor: "#1e1e1e",
//     color: "#fff",
//     border: "2px solid #888", // darker for dark mode
//   },
//   select: {
//     ...styles.select,
//     backgroundColor: "#1e1e1e",
//     color: "#fff",
//     border: "2px solid #888", // darker for dark mode
//   },
//   resultCard: {
//     ...styles.resultCard,
//     backgroundColor: "#1e1e1e",
//     borderColor: "#888",
//   },
// };

// const responsiveStyles = {
//   semester: {
//     marginBottom: "40px",
//     padding: "15px",
//     border: "2px solid #555", // darker border
//     borderRadius: "10px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//   },
//   semesterDark: {
//     marginBottom: "40px",
//     padding: "15px",
//     border: "2px solid #888", // darker border for dark mode
//     borderRadius: "10px",
//     boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
//   },
//   courseRow: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//     marginBottom: "10px",
//   },
//   input: {
//     padding: "8px 10px",
//     borderRadius: 5,
//     border: "1.5px solid #555", // darker border
//     flex: "1 1 120px", // flexible width
//     minWidth: "100px",
//   },
//   select: {
//     padding: "8px",
//     flex: "1 1 50px",
//     border: "2px solid #555", // darker border
//     borderRadius: "6px",
//   },
//   button: {
//     padding: "8px 12px",
//     marginTop: "5px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   removeBtn: {
//     padding: "6px 10px",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   semesterResult: { marginTop: "10px" },
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
import GradingNoteSection from "../project/GradingNoteSection";
import { FaSkullCrossbones } from "react-icons/fa6";
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

  const updateCourse = (semIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };

  const selectStyle = (theme) => ({
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      borderColor: theme === "dark" ? "#666" : "#ccc",
      minHeight: "38px",
      boxShadow: "none",
      "&:hover": { borderColor: "#007bff" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      maxHeight: "250px",
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
    singleValue: (p) => ({ ...p, color: theme === "dark" ? "#fff" : "#000" }),
    placeholder: (p) => ({ ...p, color: theme === "dark" ? "#bbb" : "#666" }),
  });

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
                  {sem.name} ({sem.department || "N/A"}, Year:{" "}
                  {sem.year || "N/A"})
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
                      {(gradePointMap[c.grade] * parseFloat(c.credit)).toFixed(
                        2
                      )}
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
    <div className="px-1 md:px-[4%] lg:px-[6%]">
      <div style={theme === "dark" ? darkStyles.container : styles.container}>
        <h1 style={theme === "dark" ? darkStyles.title : styles.title}>
          Bangladesh Semester GPA / CGPA Calculator
        </h1>

        {/* User Info */}
        <div className=" w-full ml-auto md:ml-[0%] lg:ml-[20%]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-3 my-5 ">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm">Name</label>
              <input
                className="text-sm md:text-md lg:text-lg"
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
                className="text-sm md:text-md lg:text-lg"
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
                className="text-sm md:text-md lg:text-lg"
                type="number"
                placeholder="Enter roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                style={theme === "dark" ? darkStyles.input : styles.input}
              />
            </div>
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
                legend: {
                  labels: { color: theme === "dark" ? "#fff" : "#000" },
                },
              },
            };

            const { totalPoints: semPoints, totalCredits: semCredits, gpa } = computeSemesterResult(
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
                {/* ---------------- CENTERED SEMESTER TITLE FIX ---------------- */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position: "relative",
                    width: "100%",
                    padding: "20px 0",
                  }}
                >
                  {/* Center Title */}
                  <h2
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      margin: 4,
                      marginBottom: 23,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                    className=" bg-blue-400 p-1 rounded text-sm md:text-md lg:text-lg"
                  >
                    {sem.name}
                  </h2>

                  {/* Right Remove Button */}
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(semIndex)}
                      style={{
                        ...responsiveStyles.removeBtn,
                      }}
                      className="text-sm md:text-md lg:text-lg -mt-6 -mr-1"
                    >
                      <FaSkullCrossbones />
                    </button>
                  )}
                </div>
                {/* -------------------------------------------------------------- */}

                {/* Department & Year */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginBottom: "15px",
                  }}
                >
                  {/* Department */}
                  <div className="flex flex-col" style={{ flex: "1 1 200px" }}>
                    <label className="mb-1 font-semibold text-sm md:text-md lg:text-lg">
                      Department
                    </label>

                    <Select
                      className="text-sm md:text-md lg:text-lg"
                      placeholder="Select Department"
                      value={
                        sem.department
                          ? { value: sem.department, label: sem.department }
                          : null
                      }
                      onChange={(selected) =>
                        updateSemesterField(
                          semIndex,
                          "department",
                          selected?.value || ""
                        )
                      }
                      options={Object.keys(subjectsData).map((dep) => ({
                        value: dep,
                        label: dep,
                      }))}
                      styles={selectStyle(theme)}
                    />
                  </div>

                  {/* Year */}
                  <div className="flex flex-col" style={{ flex: "1 1 200px" }}>
                    <label className="mb-1 font-semibold text-sm md:text-md lg:text-lg">
                      Year
                    </label>

                    <Select
                      className="text-sm md:text-md lg:text-lg"
                      placeholder="Select Year"
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
                        updateSemesterField(
                          semIndex,
                          "year",
                          selected?.value || ""
                        )
                      }
                      options={[
                        { value: "1", label: "1st Year" },
                        { value: "2", label: "2nd Year" },
                        { value: "3", label: "3rd Year" },
                        { value: "4", label: "4th Year" },
                      ]}
                      styles={selectStyle(theme)}
                    />
                  </div>
                </div>

                {/* Course Input Instructions */}
                <div
                  style={{
                    marginBottom: "15px",
                    padding: "12px",
                    background: theme === "dark" ? "#1f2937" : "#f3f4f6",
                    borderRadius: "10px",
                    border:
                      theme === "dark"
                        ? "1px solid #374151"
                        : "1px solid #e5e7eb",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "6px",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: theme === "dark" ? "#f9fafb" : "#111827",
                    }}
                  >
                    Subject,Grade,Credit Input Section.
                  </h3>

                  <p
                    style={{
                      marginBottom: "6px",
                      fontSize: "14px",
                      color: theme === "dark" ? "#d1d5db" : "#4b5563",
                    }}
                  >
                    Please fill in each subject below. Select the correct grade
                    based on the National University grading scale and enter the
                    credit value.
                  </p>
                </div>












{sem.courses.map((c, courseIndex) => (
  <div key={courseIndex} className="course-row mb-3">

    {/* Subject */}
    <input
      type="text"
      placeholder="Subject Name"
      value={c.name}
      onChange={(e) =>
        updateCourse(semIndex, courseIndex, "name", e.target.value)
      }
      className="course-subject border border-blue-600 bg-white dark:bg-gray-800 dark:border-blue-400 rounded"
    />

    {/* Credit + GPA */}
    <div className="course-mid">
      <input
   className="border border-blue-600 bg-white dark:bg-gray-800 dark:border-blue-400 rounded"

        type="number"
        placeholder="Credit"
        value={c.credit}
        onChange={(e) =>
          updateCourse(semIndex, courseIndex, "credit", e.target.value)
        }
        min="0"
        step="0.5"
      />

      <select
      className="border border-blue-600 bg-white dark:bg-gray-800 dark:border-blue-400 rounded"
        value={c.grade}
        onChange={(e) =>
          updateCourse(semIndex, courseIndex, "grade", e.target.value)
        }
      >
        {gradeOptions.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>

    {/* Remove */}
    <button
      onClick={() => removeCourse(semIndex, courseIndex)}
      className="course-remove cursor-pointer bg-red-500 rounded-md"
    >
      Remove
    </button>
  </div>
))}



















                {/* Add Course Button */}
                <button
                  onClick={() => addCourse(semIndex)}
                  style={responsiveStyles.button}
                  className="text-sm md:text-md lg:text-lg"
                >
                  Add Course
                </button>

                {/* Chart */}
                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    minHeight: "250px",
                  }}
                >
                  <Bar data={chartData} options={chartOptions} />
                </div>

                
              {/* SEMESTER RESULT - Updated with theme parameter */}
<div style={responsiveStyles.semesterResult}>
  <div style={theme === "dark" ? responsiveStyles.semResultCardDark : responsiveStyles.semResultCard}>
    <p style={responsiveStyles.resultText(theme)}>
      <strong>Semester Credits:</strong> <span style={responsiveStyles.resultValue(theme)}>{semCredits}</span>
    </p>
    <p style={responsiveStyles.resultText(theme)}>
      <strong>Semester Points:</strong> <span style={responsiveStyles.resultValue(theme)}>{semPoints}</span>
    </p>
    <p style={responsiveStyles.resultText(theme)}>
      <strong style={responsiveStyles.gpaLabel(theme)}>GPA:</strong> 
      <span style={{
        ...responsiveStyles.gpaValue(theme),
        color: gpa >= 3.75 ? "#28a745" : gpa >= 3.0 ? "#ffc107" : "#dc3545",
      }}>{gpa}</span>
    </p>
  </div>
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

        {/* NEW STYLED OVERALL RESULT */}
     <div
  id="result-card"
  style={{
    ... (theme === "dark" ? darkStyles.resultCard : styles.resultCard),
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    border: "3px solid transparent",
    backgroundClip: "padding-box",
    position: "relative",
    overflow: "hidden",
    marginTop: "30px",
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
    }
  }}
>
  {/* SHINY OVERALL RESULT CARD */}
  <div style={theme === "dark" ? responsiveStyles.overallResultCardDark : responsiveStyles.overallResultCard}>
    <h2 style={responsiveStyles.overallTitle}>🎓 FINAL RESULT</h2>
    
    {/* STATS ROW */}
    <div style={responsiveStyles.statsRow}>
      <div style={responsiveStyles.statItem(theme)}>
        <span style={responsiveStyles.statLabel(theme)}>📊 Total Credits</span>
        <span style={responsiveStyles.statValue(theme)}>{totalCredits}</span>
      </div>
      <div style={responsiveStyles.statItem(theme)}>
        <span style={responsiveStyles.statLabel(theme)}>⭐ Total Points</span>
        <span style={responsiveStyles.statValue(theme)}>{totalPoints}</span>
      </div>
    </div>

    {/* EPIC CGPA DISPLAY */}
    <div style={responsiveStyles.cgpaContainer}>
      <span style={responsiveStyles.cgpaLabel}>FINAL CGPA:</span>
      <div style={{
        ...responsiveStyles.cgpaBadge,
        background: cgpa >= 3.75 ? "linear-gradient(135deg, #28a745, #20c997)" :
                   cgpa >= 3.0 ? "linear-gradient(135deg, #ffc107, #ff8c00)" :
                   "linear-gradient(135deg, #dc3545, #c82333)",
        boxShadow: cgpa >= 3.75 ? "0 0 30px rgba(40,167,69,0.5)" :
                   cgpa >= 3.0 ? "0 0 30px rgba(255,193,7,0.5)" :
                   "0 0 30px rgba(220,53,69,0.5)",
        animation: "pulse 2s infinite",
      }}>
        <span style={responsiveStyles.cgpaValue}>{cgpa}</span>
      </div>
    </div>
  </div>

  {/* UPGRADED DOWNLOAD SECTION */}
  <div style={responsiveStyles.downloadSection}>
    <button 
      onClick={downloadPdf} 
      style={{
        ...styles.button,
        ...responsiveStyles.downloadBtn,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 8px 25px rgba(102,126,234,0.4)",
        position: "relative",
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          transition: "left 0.5s",
        },
        ":hover::before": {
          left: "100%",
        }
      }}
    >
      📄 Download PDF Result Sheet
    </button>
  </div>
</div>


        <GradingNoteSection></GradingNoteSection>
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
  resultCard: {
    ...styles.resultCard,
    backgroundColor: "#1e1e1e",
    borderColor: "#888",
  },
};

const responsiveStyles = {
  semester: {
    marginBottom: "40px",
    padding: "15px",
    border: "2px solid #555",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  semesterDark: {
    marginBottom: "40px",
    padding: "15px",
    border: "2px solid #888",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
  },
  courseRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  input: {
    padding: "8px 10px",
    borderRadius: 5,
    border: "1.5px solid #555",
    flex: "1 1 120px",
    minWidth: "100px",
  },
  select: {
    padding: "8px",
    flex: "1 1 50px",
    border: "2px solid #555",
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
  semesterResult: { 
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  // NEW STYLES FOR RESULTS
  semResultCard: {
    background: "linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%)",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e3f2fd",
    boxShadow: "0 8px 25px rgba(0,123,255,0.15)",
    marginTop: "15px",
    width: "100%",
  },
  semResultCardDark: {
    background: "linear-gradient(135deg, #2a2a4a 0%, #1e1e3f 100%)",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #4a5a8c",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    marginTop: "15px",
    width: "100%",
  },
  overallResultCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 12px 35px rgba(102,126,234,0.3)",
    marginBottom: "20px",
  },
  overallResultCardDark: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
    marginBottom: "20px",
  },
  overallTitle: {
    color: "#fff",
    fontSize: "1.4em",
    fontWeight: "700",
    marginBottom: "15px",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  // FIXED: All text colors now responsive for light/dark mode
  resultText: (theme) => ({
    color: theme === "dark" ? "#e2e8f0" : "#1e293b",
    fontSize: "1.1em",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  resultValue: (theme) => ({
    fontWeight: "600",
    fontSize: "1.15em",
    color: theme === "dark" ? "#f1f5f9" : "#1e40af",
  }),
  gpaLabel: (theme) => ({
    fontSize: "1.2em",
    fontWeight: "700",
    color: theme === "dark" ? "#cbd5e1" : "#1e293b",
  }),
  gpaValue: (theme) => ({
    fontSize: "1.6em",
    fontWeight: "800",
    marginLeft: "8px",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  }),
  cgpaLabel: {
    fontSize: "1.3em",
    fontWeight: "800",
    color: "#fff",
  },
  cgpaValue: {
    fontSize: "2em",
    fontWeight: "900",
    marginLeft: "12px",
    textShadow: "0 3px 6px rgba(0,0,0,0.4)",
  },
  downloadBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  // UPGRADED RESULT STYLES - ADD THESE
  statsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  statItem: (theme) => ({
    background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)",
    padding: "15px 20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    border: theme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)",
    flex: "1",
    minWidth: "140px",
    textAlign: "center",
  }),
  statLabel: (theme) => ({
    display: "block",
    fontSize: "0.9em",
    color: theme === "dark" ? "#cbd5e1" : "#64748b",
    marginBottom: "5px",
    fontWeight: "500",
  }),
  statValue: (theme) => ({
    fontSize: "1.4em",
    fontWeight: "800",
    color: theme === "dark" ? "#f8fafc" : "#1e293b",
  }),
  cgpaContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  cgpaBadge: {
    padding: "20px 30px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden",
  },
  downloadSection: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "2px solid rgba(255,255,255,0.2)",
  },
  downloadBtn: {
    fontSize: "1.1em",
    fontWeight: "700",
    padding: "14px 30px",
    borderRadius: "50px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
};


export default CgpaCalculator;
















































