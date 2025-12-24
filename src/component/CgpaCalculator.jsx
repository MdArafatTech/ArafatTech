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
// import { FaPlus, FaTrash } from "react-icons/fa6";

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







// const [language, setLanguage] = useState('bn'); // 'en' for English, 'bn' for Bangla












//   // Download states
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     setTheme(mediaQuery.matches ? "dark" : "light");
//     const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const selectStyle = (theme) => ({
//     container: (provided) => ({ ...provided, width: "100%" }),
//     control: (provided, state) => ({
//       ...provided,
//       backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
//       borderColor: state.isFocused
//         ? "#6366f1"
//         : theme === "dark"
//         ? "#374151"
//         : "#d1d5db",
//       borderWidth: "2px",
//       boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.3)" : "none",
//       minHeight: "48px",
//       borderRadius: "12px",
//       "&:hover": { borderColor: "#6366f1" },
//     }),
//     menu: (provided) => ({
//       ...provided,
//       backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
//       borderRadius: "12px",
//       boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//       zIndex: 50,
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#6366f1"
//         : state.isFocused
//         ? theme === "dark"
//           ? "#374151"
//           : "#f3f4f6"
//         : "transparent",
//       color: state.isSelected
//         ? "#fff"
//         : theme === "dark"
//         ? "#f3f4f6"
//         : "#111827",
//       borderRadius: "8px",
//       margin: "4px 8px",
//       cursor: "pointer",
//     }),
//     singleValue: (p) => ({
//       ...p,
//       color: theme === "dark" ? "#f3f4f6" : "#111827",
//     }),
//     placeholder: (p) => ({
//       ...p,
//       color: theme === "dark" ? "#9ca3af" : "#6b7280",
//     }),
//   });

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

//   const updateSemesterField = (semIndex, field, value) => {
//     const updated = [...semesters];
//     updated[semIndex][field] = value;

//     const { department, year } = updated[semIndex];
//     if (department && year && subjectsData[department]?.[year]) {
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

//   const updateCourse = (semIndex, courseIndex, field, value) => {
//     const updated = [...semesters];
//     updated[semIndex].courses[courseIndex][field] = value;
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

//     // Official National University Bangladesh logo (high quality)
//     const nuLogo = "/logo-nu.png"; // Place nu-logo.png in your public/ folder

//     const doc = (
//       <Document>
//         <Page size="A4" style={pdfStyles.page}>
//           <View style={pdfStyles.header}>
//             <View style={pdfStyles.logoContainer}>
//               <Image
//                 src={nuLogo} // Local file - works offline!
//                 style={pdfStyles.logo}
//                 cache={true}
//               />
//             </View>

//             {/* Title and Date */}
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
//                     <Text
//                       style={[
//                         pdfStyles.cell,
//                         { borderRight: "1 solid #1f2937" },
//                       ]}
//                     >
//                       {c.name || "N/A"}
//                     </Text>
//                     <Text
//                       style={[
//                         pdfStyles.cell,
//                         { borderRight: "1 solid #1f2937" },
//                       ]}
//                     >
//                       {c.grade}
//                     </Text>
//                     <Text
//                       style={[
//                         pdfStyles.cell,
//                         { borderRight: "1 solid #1f2937" },
//                       ]}
//                     >
//                       {c.credit || "N/A"}
//                     </Text>
//                     <Text style={pdfStyles.cell}>
//                       {" "}
//                       {/* Last cell: no right border */}
//                       {(
//                         gradePointMap[c.grade] * parseFloat(c.credit || 0)
//                       ).toFixed(2)}
//                     </Text>
//                   </View>
//                 ))}
//                 <View style={pdfStyles.resultSection}>
//                   <Text style={pdfStyles.resultLabel}>Credits: </Text>
//                   <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
//                   <Text style={pdfStyles.resultLabel}>Points: </Text>
//                   <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
//                   <Text style={pdfStyles.resultLabel}>GPA: </Text>
//                   <Text style={pdfStyles.resultHighlight}>{gpa}</Text>
//                 </View>
//               </View>
//             );
//           })}
//           <View style={pdfStyles.pageCenterContainer}>
//             <View style={pdfStyles.pageCenterContainer}>
//               <View style={pdfStyles.finalResultSection}>
//                 <Text style={pdfStyles.finalResultTitle}>Final Result</Text>

//                 <View style={pdfStyles.finalRow}>
//                   <Text style={pdfStyles.finalResultLabel}>
//                     Total Credits:{" "}
//                   </Text>
//                   <Text style={pdfStyles.finalResultValue}>{totalCredits}</Text>
//                 </View>

//                 <View style={pdfStyles.finalRow}>
//                   <Text style={pdfStyles.finalResultLabel}>Total Points: </Text>
//                   <Text style={pdfStyles.finalResultValue}>{totalPoints}</Text>
//                 </View>

//                 <View style={pdfStyles.finalRow}>
//                   <Text style={pdfStyles.finalResultLabel}>CGPA: </Text>
//                   <Text style={pdfStyles.finalResultHighlight}>{cgpa}</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Page>
//       </Document>
//     );

//     const blob = await pdf(doc).toBlob();
//     saveAs(blob, "National_University_Result_Sheet.pdf");
//   };

//   const handleDownloadMorph = async () => {
//     if (isDownloading || isSuccess) return;

//     setIsDownloading(true);
//     setIsSuccess(false);
//     setProgress(0);

//     let currentProgress = 0;
//     const interval = setInterval(() => {
//       currentProgress += 0.08;
//       setProgress(Math.min(currentProgress, 0.95));
//       if (currentProgress >= 0.95) clearInterval(interval);
//     }, 200);

//     try {
//       await downloadPdf();
//       setProgress(1);
//       setIsDownloading(false);
//       setIsSuccess(true);

//       setTimeout(() => {
//         setIsSuccess(false);
//         setProgress(0);
//       }, 3000);
//     } catch (error) {
//       console.error("Download failed:", error);
//       setIsDownloading(false);
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800 dark:text-white">
//           Bangladesh National University GPA/CGPA Calculator
//         </h1>

//         {/* Student Info */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 sm:p-8 mb-12">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//             Student Information
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Registration No.
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter registration"
//                 value={reg}
//                 onChange={(e) => setReg(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Roll No.
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter roll"
//                 value={roll}
//                 onChange={(e) => setRoll(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//               />
//             </div>
//           </div>
//         </div>

//         <AnimatePresence>
//           {semesters.map((sem, semIndex) => {
//             const chartData = {
//               labels: sem.courses.map((c, i) => c.name || `Course ${i + 1}`),
//               datasets: [
//                 {
//                   label: "Grade Point",
//                   data: sem.courses.map((c) => gradePointMap[c.grade]),
//                   backgroundColor: "#6366f1",
//                   borderRadius: 6,
//                 },
//               ],
//             };

//             const chartOptions = {
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: {
//                 y: { beginAtZero: true, max: 4, ticks: { stepSize: 0.5 } },
//               },
//               plugins: { legend: { display: false } },
//             };

//             const {
//               totalPoints: semPoints,
//               totalCredits: semCredits,
//               gpa,
//             } = computeSemesterResult(sem.courses);

//             return (
//               <motion.div
//                 key={semIndex}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12"
//               >
//                 <div className="bg-gradient-to-r  from-indigo-600 to-purple-700 px-6 py-5 flex items-center justify-between">
//                   <h2 className="text-2xl  sm:text-3xl font-bold text-white">
//                     {sem.name}
//                   </h2>
//                   {semesters.length > 1 && (
//                     <button
//                       onClick={() => removeSemester(semIndex)}
//                       className="bg-red-600 cursor-pointer hover:bg-red-700 text-white p-3 rounded-full transition transform hover:scale-110 "
//                     >
//                       <FaTrash className="text-lg" />
//                     </button>
//                   )}
//                 </div>

//                 <div className="p-4 md:p-6 lg:p-8 sm:p-8 space-y-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Department
//                       </label>
//                       <Select
//                         placeholder="Select Department"
//                         value={
//                           sem.department
//                             ? { value: sem.department, label: sem.department }
//                             : null
//                         }
//                         onChange={(selected) =>
//                           updateSemesterField(
//                             semIndex,
//                             "department",
//                             selected?.value || ""
//                           )
//                         }
//                         options={Object.keys(subjectsData).map((dep) => ({
//                           value: dep,
//                           label: dep,
//                         }))}
//                         styles={selectStyle(theme)}
//                         classNamePrefix="react-select"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Year
//                       </label>
//                       <Select
//                         placeholder="Select Year"
//                         value={
//                           sem.year
//                             ? {
//                                 value: sem.year,
//                                 label:
//                                   sem.year === "1"
//                                     ? "1st Year"
//                                     : sem.year === "2"
//                                     ? "2nd Year"
//                                     : sem.year === "3"
//                                     ? "3rd Year"
//                                     : "4th Year",
//                               }
//                             : null
//                         }
//                         onChange={(selected) =>
//                           updateSemesterField(
//                             semIndex,
//                             "year",
//                             selected?.value || ""
//                           )
//                         }
//                         options={[
//                           { value: "1", label: "1st Year" },
//                           { value: "2", label: "2nd Year" },
//                           { value: "3", label: "3rd Year" },
//                           { value: "4", label: "4th Year" },
//                         ]}
//                         styles={selectStyle(theme)}
//                         classNamePrefix="react-select"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-6">






















// {/* Conditional Note Section */}
// {(!sem.department || !sem.year) ? (
//   <div className="mb-6 animate-fade-in">
//     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
//       Courses
//     </h3>

//     <div>
//       <div className="flex items-start gap-4">
//         <div
//           className="relative px-7 py-5 
//             rounded-3xl 
//             bg-gradient-to-br from-purple-50/60 to-indigo-50/60 dark:from-cyan-950/40 dark:to-blue-950/30
//             shadow-xl
//             border-4 border-transparent
//             animate-border-glow-bounce"
//         >
//           <p className="text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
//             <span className="font-semibold text-purple-600 dark:text-purple-400">
//               {language === 'en' ? 'Note:' : 'নোট:'}
//             </span>{" "}
//             {language === 'en'
//               ? "If you don't select dept. & year - Enter subject name, credit & grade."
//               : 'যদি ডিপার্টমেন্ট ও বর্ষ নির্বাচন না করেন - তাহলে বিষয়ের নাম, ক্রেডিট এবং গ্রেড লিখুন।'}
//           </p>
//         </div>
//       </div>

//       {/* Language Toggle Buttons */}
//       <div className="flex gap-3 justify-start mt-5">
//         <button
//           onClick={() => setLanguage('en')}
//           className={`px-5 py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
//             language === 'en'
//               ? 'bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900 shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//           }`}
//         >
//           EN
//         </button>
//         <button
//           onClick={() => setLanguage('bn')}
//           className={`px-5 py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
//             language === 'bn'
//               ? 'bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900 shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//           }`}
//         >
//           বাংলা
//         </button>
//       </div>
//     </div>
//   </div>
// ) : (
//   <div className="mb-6 animate-fade-in">
//     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
//       Courses
//     </h3>

//     <div className="flex flex-col gap-7">
//       {/* Note - Extra Optional Subject */}
//       <div
//         className="relative px-4 py-5 
//           rounded-3xl 
//           bg-gradient-to-br from-purple-50/60 to-indigo-50/60 dark:from-cyan-950/40 dark:to-blue-950/30
//           shadow-xl
//           border-4 border-transparent
//           animate-border-glow-bounce"
//       >
//         <p className="text-sm md:text-base lg:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
//           <span className="font-semibold text-purple-600 dark:text-purple-400">
//             {language === 'en' ? 'Note:' : 'নোট:'}
//           </span>{" "}
//           {language === 'en'
//             ? 'Remove your extra optional subject before calculating CGPA.'
//             : 'সিজিপিএ (CGPA) ক্যালকুলেট করার আগে আপনার অতিরিক্ত ঐচ্ছিক বিষয়টি সরিয়ে নিন।'}
//         </p>
//       </div>

//       {/* Language Toggle Buttons */}
//       <div className="flex gap-3 justify-start">
//         <button
//           onClick={() => setLanguage('en')}
//           className={`px-5 py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
//             language === 'en'
//               ? 'bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900 shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//           }`}
//         >
//           EN
//         </button>
//         <button
//           onClick={() => setLanguage('bn')}
//           className={`px-5 py-2.5 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
//             language === 'bn'
//               ? 'bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900 shadow-md'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
//           }`}
//         >
//           বাংলা
//         </button>
//       </div>
//     </div>
//   </div>
// )}



























//                     {/* Courses List */}
//                     {sem.courses.map((c, courseIndex) => (
//                       <div key={courseIndex} className="space-y-4">
//                         {/* Subject Name */}
//                         <div>
//                           <input
//                             type="text"
//                             placeholder="Subject Name (e.g., ENG-101 - English)"
//                             value={c.name}
//                             onChange={(e) =>
//                               updateCourse(
//                                 semIndex,
//                                 courseIndex,
//                                 "name",
//                                 e.target.value
//                               )
//                             }
//                             className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//                           />
//                         </div>

//                         {/* Grade + Credit */}
//                         <div className="grid grid-cols-2 md:grid-cols-10 md:gap-4 gap-3 items-end">
//                           <div className="md:col-span-4">
//                             <select
//                               value={c.grade}
//                               onChange={(e) =>
//                                 updateCourse(
//                                   semIndex,
//                                   courseIndex,
//                                   "grade",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//                             >
//                               {gradeOptions.map((g) => (
//                                 <option key={g} value={g}>
//                                   {g}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="md:col-span-3">
//                             <input
//                               type="number"
//                               placeholder="Credit"
//                               value={c.credit}
//                               onChange={(e) =>
//                                 updateCourse(
//                                   semIndex,
//                                   courseIndex,
//                                   "credit",
//                                   e.target.value
//                                 )
//                               }
//                               min="0"
//                               step="0.5"
//                               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
//                             />
//                           </div>

//                           {/* Remove Button (Desktop) */}
//                           <div className="md:col-span-3 hidden md:block">
//                             <button
//                               onClick={() =>
//                                 removeCourse(semIndex, courseIndex)
//                               }
//                               className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
//                             >
//                               <FaTrash /> Remove
//                             </button>
//                           </div>
//                         </div>

//                         {/* Remove Button (Mobile) */}
//                         <div className="md:hidden">
//                           <button
//                             onClick={() => removeCourse(semIndex, courseIndex)}
//                             className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
//                           >
//                             <FaTrash /> Remove
//                           </button>
//                         </div>
//                       </div>
//                     ))}








//                     {/* Add Course Button */}
//                     <button
//                       onClick={() => addCourse(semIndex)}
//                       className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition transform hover:scale-105"
//                     >
//                       <FaPlus /> Add Course
//                     </button>
//                   </div>

//                   {/* Rest of your code (Grade Distribution + GPA Card) */}
//                   <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
//                     <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//                       Grade Distribution
//                     </h3>
//                     <div className="h-64 md:h-80">
//                       <Bar data={chartData} options={chartOptions} />
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl  pl-2 md:pl-5 lg:pl-6 p-6 text-white">
//                     <div className="grid grid-cols-3 gap-6 text-center">
//                       <div>
//                         <p className="text-sm md:text-md lg:text-lg opacity-90 mb-1">
//                           Credits
//                         </p>
//                         <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
//                           {semCredits}
//                         </p>
//                       </div>
//                       <div className="">
//                         <p className="text-sm md:text-md lg:text-lg  opacity-90 mb-1">
//                           Points
//                         </p>
//                         <p className="text-2xl md:text-3xl lg:text-4xl  font-bold">
//                           {semPoints}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm md:text-md lg:text-lg  opacity-90 mb-1">
//                           GPA
//                         </p>
//                         <p
//                           className={`text-3xl md:text-4xl lg:text-5xl font-extrabold ${
//                             parseFloat(gpa) >= 3.75
//                               ? "text-green-300"
//                               : parseFloat(gpa) >= 3.0
//                               ? "text-yellow-300"
//                               : "text-red-300"
//                           }`}
//                         >
//                           {gpa}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>

//         <div className="text-center mb-12">
//           <button
//             onClick={addSemester}
//             className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl shadow-xl transition transform hover:scale-105"
//           >
//             <FaPlus /> Add New Semester
//           </button>
//         </div>

//         {/* Final Result + Download Button */}
//         <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 rounded-3xl shadow-2xl p-8 sm:p-12 text-white">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
//             🎓 Final CGPA Result
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
//               <p className="text-lg opacity-90 mb-3">Total Credits</p>
//               <p className="text-5xl font-extrabold">{totalCredits}</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
//               <p className="text-lg opacity-90 mb-3">Total Points</p>
//               <p className="text-5xl font-extrabold">{totalPoints}</p>
//             </div>
//           </div>

//           <div className="text-center mb-16">
//             <p className="text-2xl mb-6 opacity-90">Your Final CGPA</p>
//             <div
//               className={`inline-block px-16 py-10 rounded-3xl font-black text-6xl sm:text-7xl md:text-8xl shadow-2xl ${
//                 parseFloat(cgpa) >= 3.75
//                   ? "bg-gradient-to-r from-green-400 to-teal-500"
//                   : parseFloat(cgpa) >= 3.0
//                   ? "bg-gradient-to-r from-yellow-400 to-orange-500"
//                   : "bg-gradient-to-r from-red-500 to-pink-600"
//               }`}
//             >
//               {cgpa}
//             </div>
//           </div>

//           {/* Premium 3D Download Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={handleDownloadMorph}
//               disabled={isDownloading || isSuccess}
//               className={`
//                 relative cursor-pointer flex items-center justify-center
//                 ${isDownloading || isSuccess ? "w-32 h-32" : "px-12 py-6"}
//                 rounded-full font-bold text-xl
//                 overflow-hidden transition-all duration-700
//                 shadow-2xl
//                 ${
//                   isDownloading || isSuccess
//                     ? "cursor-wait"
//                     : "bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-110 hover:shadow-indigo-500/50"
//                 }
//               `}
//             >
//               {(isDownloading || isSuccess) && (
//                 <>
//                   <style jsx>{`
//                     @keyframes pulseGlow {
//                       0%,
//                       100% {
//                         filter: drop-shadow(0 0 20px rgba(99, 78, 235, 0.8));
//                       }
//                       50% {
//                         filter: drop-shadow(0 0 40px rgba(129, 140, 248, 1));
//                       }
//                     }
//                     .premium-progress {
//                       animation: pulseGlow 2s ease-in-out infinite;
//                     }
//                   `}</style>

//                   <svg
//                     className="absolute inset-0 w-full h-full -rotate-90"
//                     viewBox="0 0 100 100"
//                   >
//                     <defs>
//                       <filter
//                         id="glow"
//                         x="-50%"
//                         y="-50%"
//                         width="200%"
//                         height="200%"
//                       >
//                         <feGaussianBlur stdDeviation="6" result="blur" />
//                         <feOffset dx="0" dy="4" result="offsetBlur" />
//                         <feFlood floodColor="#6366f1" floodOpacity="0.6" />
//                         <feComposite in2="offsetBlur" operator="in" />
//                         <feMerge>
//                           <feMergeNode />
//                           <feMergeNode in="SourceGraphic" />
//                         </feMerge>
//                       </filter>
//                       <linearGradient id="premiumGradient">
//                         <stop offset="0%" stopColor="#c4b5fd" />
//                         <stop offset="40%" stopColor="#818cf8" />
//                         <stop offset="70%" stopColor="#60a5fa" />
//                         <stop offset="100%" stopColor="#a78bfa" />
//                       </linearGradient>
//                     </defs>

//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="44"
//                       fill="none"
//                       stroke="#1e293b"
//                       strokeWidth="8"
//                       opacity="0.4"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="44"
//                       fill="none"
//                       stroke="#e2e8f0"
//                       strokeWidth="10"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="44"
//                       fill="none"
//                       stroke="url(#premiumGradient)"
//                       strokeWidth="12"
//                       strokeDasharray="276.46"
//                       strokeDashoffset={276.46 * (1 - progress)}
//                       strokeLinecap="round"
//                       filter="url(#glow)"
//                       className="premium-progress"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="34"
//                       fill="none"
//                       stroke="rgba(255,255,255,0.3)"
//                       strokeWidth="6"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="18"
//                       fill="rgba(129, 140, 248, 0.15)"
//                     />
//                   </svg>
//                 </>
//               )}

//               <span
//                 className={`relative z-10 flex flex-col items-center gap-2 ${
//                   isDownloading || isSuccess ? "text-white" : ""
//                 }`}
//               >
//                 {!isDownloading && !isSuccess && (
//                   <>
//                     <span className="text-3xl">📄</span>
//                     <span className="text-lg font-bold">Download PDF</span>
//                   </>
//                 )}
//                 {isDownloading && !isSuccess && (
//                   <span className="text-base">
//                     Generating...
//                     <br />
//                     {Math.round(progress * 100)}%
//                   </span>
//                 )}
//                 {isSuccess && (
//                   <span className="text-5xl animate-bounce">✔</span>
//                 )}
//               </span>

//               {isDownloading && (
//                 <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30" />
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="mt-16">
//           <GradingNoteSection />
//         </div>
//       </div>
//     </div>
//   );
// };

// const pdfStyles = StyleSheet.create({
//   page: { padding: 18, fontSize: 10, fontFamily: "Helvetica" },
//   header: {
//     alignItems: "center",
//     marginBottom: 10,
//     paddingBottom: 15,
//     borderBottom: "2 solid #6366f1",
//   },
//   logo: {
//     width: 80,
//     height: 75,
//     marginBottom: 10,
//     objectFit: "contain",
//   },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 7 },
//   date: {
//     fontSize: 10,
//     color: "#666",
//     marginTop: 5,
//     alignSelf: "flex-end", // Places date to the right
//   },

//   userInfoRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 2, // space between different info pairs (e.g., Name → Roll No)
//     marginBottom: 20,
//     fontSize: 12,
//   },
//   label: {
//     fontWeight: "bold",
//   },
//   value: {
//     marginRight: 15, // ← Reduced from 5 → tight gap between label and value
//   },

//   section: { marginBottom: 20 },

//   semesterTitle: {
//     fontSize: 15,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#1e40af",
//   },
//   tableHeaderRow: {
//     flexDirection: "row",
//     backgroundColor: "#f3f4f6",
//     padding: 6,
//     fontWeight: "bold",
//     border: "1 solid #6366f1", // Added right border
//   },

//   tableHeader: { flex: 1, textAlign: "center", fontSize: 10 },
//   row: {
//     flexDirection: "row",

//     borderWidth: 1,
//     borderColor: "#1f2937", // Dark gray (full dark border)
//     borderStyle: "solid",
//   },

//   cell: { flex: 1, textAlign: "center", fontSize: 10, padding: 5 },
//   resultSection: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 15,
//     marginTop: 10,
//   },
//   resultLabel: { fontWeight: "bold" },
//   resultValue: { marginLeft: 5 },
//   resultHighlight: { fontSize: 14, fontWeight: "bold", color: "#1e40af" },

//   pageCenterContainer: {
//     marginTop: -35,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center", // Vertical center
//     alignItems: "center", // Horizontal center
//     padding: "40pt",
//   },
//   finalResultSection: {
//     borderTop: "3 solid #1e40af",
//     padding: 7,
//     backgroundColor: "#f8fafc",
//     width: 200,
//     alignItems: "center",
//     borderRadius: "4",
//   },
//   finalResultTitle: {
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#1e40af",
//     marginBottom: 6,
//   },
//   finalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginBottom: 6,
//   },
//   finalResultLabel: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#1f2937", // dark gray for contrast
//   },
//   finalResultValue: {
//     fontSize: 12,
//     fontWeight: "normal",
//   },
//   finalResultHighlight: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1e40af",
//   },
// });
// export default CgpaCalculator;
















import React, { useState, useEffect } from "react";
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
import { FaPlus, FaTrash } from "react-icons/fa6";

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
      courses: [{ name: "", credit: "", grade: "" }], // grade starts empty
    },
  ]);
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [roll, setRoll] = useState("");
  const [language, setLanguage] = useState("bn");

  // Download states
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const selectStyle = (theme) => ({
    container: (provided) => ({ ...provided, width: "100%" }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
      borderColor: state.isFocused
        ? "#6366f1"
        : theme === "dark"
        ? "#374151"
        : "#d1d5db",
      borderWidth: "2px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.3)" : "none",
      minHeight: "48px",
      borderRadius: "12px",
      "&:hover": { borderColor: "#6366f1" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6366f1"
        : state.isFocused
        ? theme === "dark"
          ? "#374151"
          : "#f3f4f6"
        : "transparent",
      color: state.isSelected
        ? "#fff"
        : theme === "dark"
        ? "#f3f4f6"
        : "#111827",
      borderRadius: "8px",
      margin: "4px 8px",
      cursor: "pointer",
    }),
    singleValue: (p) => ({
      ...p,
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
    placeholder: (p) => ({
      ...p,
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
    }),
  });

  const addCourse = (semIndex) => {
    const updated = [...semesters];
    updated[semIndex].courses.push({ name: "", credit: "", grade: "" }); // empty grade
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
        courses: [{ name: "", credit: "", grade: "" }],
      },
    ]);
  };

  const updateSemesterField = (semIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex][field] = value;

    const { department, year } = updated[semIndex];
    if (department && year && subjectsData[department]?.[year]) {
      updated[semIndex].courses = subjectsData[department][year].map((s) => ({
        name: `${s.code} - ${s.name}`,
        credit: s.credit,
        grade: "", // Important: empty grade even when auto-loaded
      }));
    } else if (!department || !year) {
      updated[semIndex].courses = [{ name: "", credit: "", grade: "" }];
    }
    setSemesters(updated);
  };

  const updateCourse = (semIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };

  // Updated: Only count courses with selected grade AND valid credit
  const computeSemesterResult = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasValidCourse = false;

    courses.forEach((c) => {
      const credit = parseFloat(c.credit);
      if (
        c.grade && // must have a grade selected
        c.grade !== "" &&
        !isNaN(credit) &&
        credit > 0
      ) {
        const gp = gradePointMap[c.grade];
        totalPoints += gp * credit;
        totalCredits += credit;
        hasValidCourse = true;
      }
    });

    if (!hasValidCourse || totalCredits === 0) {
      return { totalPoints: "0.00", totalCredits: 0, gpa: "-" };
    }

    const gpa = (totalPoints / totalCredits).toFixed(2);
    return { totalPoints: totalPoints.toFixed(2), totalCredits, gpa };
  };

  const computeCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasAnyValidCourse = false;

    semesters.forEach((sem) => {
      sem.courses.forEach((c) => {
        const credit = parseFloat(c.credit);
        if (
          c.grade &&
          c.grade !== "" &&
          !isNaN(credit) &&
          credit > 0
        ) {
          const gp = gradePointMap[c.grade];
          totalPoints += gp * credit;
          totalCredits += credit;
          hasAnyValidCourse = true;
        }
      });
    });

    if (!hasAnyValidCourse || totalCredits === 0) {
      return { totalPoints: "0.00", totalCredits: 0, cgpa: "-" };
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    return { totalPoints: totalPoints.toFixed(2), totalCredits, cgpa };
  };

  const { totalPoints, totalCredits, cgpa } = computeCGPA();

  const downloadPdf = async () => {
    const date = new Date().toLocaleDateString();
    const nuLogo = "/logo-nu.png";

    const doc = (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.header}>
            <View style={pdfStyles.logoContainer}>
              <Image src={nuLogo} style={pdfStyles.logo} cache={true} />
            </View>
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
            const { totalPoints: semPoints, totalCredits: semCredits, gpa } =
              computeSemesterResult(sem.courses);

            // Only include semester in PDF if it has valid graded courses
            if (gpa === "-") return null;

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
                {sem.courses
                  .filter((c) => c.grade && c.grade !== "" && parseFloat(c.credit) > 0)
                  .map((c, i) => (
                    <View key={i} style={pdfStyles.row}>
                      <Text style={[pdfStyles.cell, { borderRight: "1 solid #1f2937" }]}>
                        {c.name || "N/A"}
                      </Text>
                      <Text style={[pdfStyles.cell, { borderRight: "1 solid #1f2937" }]}>
                        {c.grade}
                      </Text>
                      <Text style={[pdfStyles.cell, { borderRight: "1 solid #1f2937" }]}>
                        {c.credit || "N/A"}
                      </Text>
                      <Text style={pdfStyles.cell}>
                        {(gradePointMap[c.grade] * parseFloat(c.credit || 0)).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                <View style={pdfStyles.resultSection}>
                  <Text style={pdfStyles.resultLabel}>Credits: </Text>
                  <Text style={pdfStyles.resultValue}>{semCredits}</Text>
                  <Text style={pdfStyles.resultLabel}>Points: </Text>
                  <Text style={pdfStyles.resultValue}>{semPoints}</Text>
                  <Text style={pdfStyles.resultLabel}>GPA: </Text>
                  <Text style={pdfStyles.resultHighlight}>{gpa}</Text>
                </View>
              </View>
            );
          })}

          <View style={pdfStyles.pageCenterContainer}>
            <View style={pdfStyles.finalResultSection}>
              <Text style={pdfStyles.finalResultTitle}>Final Result</Text>
              <View style={pdfStyles.finalRow}>
                <Text style={pdfStyles.finalResultLabel}>Total Credits: </Text>
                <Text style={pdfStyles.finalResultValue}>{totalCredits}</Text>
              </View>
              <View style={pdfStyles.finalRow}>
                <Text style={pdfStyles.finalResultLabel}>Total Points: </Text>
                <Text style={pdfStyles.finalResultValue}>{totalPoints}</Text>
              </View>
              <View style={pdfStyles.finalRow}>
                <Text style={pdfStyles.finalResultLabel}>CGPA: </Text>
                <Text style={pdfStyles.finalResultHighlight}>{cgpa}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    saveAs(blob, "National_University_Result_Sheet.pdf");
  };

  const handleDownloadMorph = async () => {
    if (isDownloading || isSuccess || cgpa === "-") return;

    setIsDownloading(true);
    setIsSuccess(false);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 0.08;
      setProgress(Math.min(currentProgress, 0.95));
      if (currentProgress >= 0.95) clearInterval(interval);
    }, 200);

    try {
      await downloadPdf();
      setProgress(1);
      setIsDownloading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setProgress(0);
      }, 3000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Bangladesh National University GPA/CGPA Calculator
        </h1>

        {/* Student Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 sm:p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Student Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Registration No.
              </label>
              <input
                type="text"
                placeholder="Enter registration"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roll No.
              </label>
              <input
                type="text"
                placeholder="Enter roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {semesters.map((sem, semIndex) => {
            const chartData = {
              labels: sem.courses
                .filter((c) => c.grade && c.grade !== "")
                .map((c, i) => c.name || `Course ${i + 1}`),
              datasets: [
                {
                  label: "Grade Point",
                  data: sem.courses
                    .filter((c) => c.grade && c.grade !== "")
                    .map((c) => gradePointMap[c.grade]),
                  backgroundColor: "#6366f1",
                  borderRadius: 6,
                },
              ],
            };

            const chartOptions = {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, max: 4, ticks: { stepSize: 0.5 } },
              },
              plugins: { legend: { display: false } },
            };

            const { totalPoints: semPoints, totalCredits: semCredits, gpa } =
              computeSemesterResult(sem.courses);

            return (
              <motion.div
                key={semIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-5 flex items-center justify-between">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {sem.name}
                  </h2>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(semIndex)}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white p-3 rounded-full transition transform hover:scale-110"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  )}
                </div>

                <div className="p-4 md:p-6 lg:p-8 sm:p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Department
                      </label>
                      <Select
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
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year
                      </label>
                      <Select
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
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">










                  {/* Improved Note Section with Toggle at Top-Left */}
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
      Courses
    </h3>

<button
  onClick={() => setLanguage(language === "en" ? "bn" : "en")}
className="-mb-3 cursor-pointer"
>
  <span className="text-gray-600 text-xl dark:text-gray-400">🌐</span>

</button>




    {/* Language Toggle Buttons - Top Right (or Left if you prefer) */}
    {/* <div className="flex gap-3">
      <button
        onClick={() => setLanguage("en")}
        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm ${
          language === "en"
            ? "bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("bn")}
        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm ${
          language === "bn"
            ? "bg-purple-600 text-white dark:bg-cyan-400 dark:text-gray-900"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        বাংলা
      </button>
    </div> */}








  </div>




  {/* Note Box */}
 <div className="relative px-2 py-3 rounded-3xl bg-gradient-to-br from-purple-50/60 to-indigo-50/60 dark:from-cyan-950/40 dark:to-blue-950/30 shadow-xl border-4 border-transparent animate-border-glow-bounce overflow-hidden">
  {/* Language Toggle - Top Right Corner */}







  {/* Main Note Content */}
  <div className=""> {/* Adds right padding to prevent text overlap with buttons on small screens */}
    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
      <span className="font-bold text-purple-600 dark:text-purple-400 text-base sm:text-lg">
        {language === "en" ? "Note:" : "নোট:"}
      </span>{" "}
      <span className="font-medium">
        {(!sem.department || !sem.year)
          ? language === "en"
            ? "If you don't select department & year — manually enter subject name, credit, and grade."
            : "যদি ডিপার্টমেন্ট ও বর্ষ নির্বাচন না করেন — তাহলে নিজে বিষয়ের নাম, ক্রেডিট এবং গ্রেড লিখুন।"
          : language === "en"
          ? "Fill your courses carefully. Just put your grade — do not enter anything else if not needed."
          : "আপনার কোর্সগুলো সাবধানে পূরণ করুন। শুধু গ্রেড দিন — অন্য কিছু লাগলে তবেই লিখুন।"}
      </span>















    </p>



    


  </div>





</div>






</div>













                    {/* Courses List */}
                    {sem.courses.map((c, courseIndex) => (
                      <div key={courseIndex} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Subject Name (e.g., ENG-101 - English)"
                            value={c.name}
                            onChange={(e) =>
                              updateCourse(
                                semIndex,
                                courseIndex,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                          />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-10 md:gap-4 gap-3 items-end">
                          <div className="md:col-span-4">
                            <select
                              value={c.grade || ""}
                              onChange={(e) =>
                                updateCourse(
                                  semIndex,
                                  courseIndex,
                                  "grade",
                                  e.target.value
                                )
                              }
                              className="w-full  cursor-pointer px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                            >
                              <option  value="" disabled>
                                Select Grade 
                              </option>
                              {gradeOptions.map((g) => (
                                <option key={g} value={g}>
                                  {g}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="md:col-span-3">
                            <input
                              type="number"
                              placeholder="Credit"
                              value={c.credit}
                              onChange={(e) =>
                                updateCourse(
                                  semIndex,
                                  courseIndex,
                                  "credit",
                                  e.target.value
                                )
                              }
                              min="0"
                              step="0.5"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                            />
                          </div>

                          <div className="md:col-span-3 hidden md:block">
                            <button
                              onClick={() => removeCourse(semIndex, courseIndex)}
                              className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
                            >
                              <FaTrash /> Remove
                            </button>
                          </div>
                        </div>

                        <div className="md:hidden">
                          <button
                            onClick={() => removeCourse(semIndex, courseIndex)}
                            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => addCourse(semIndex)}
                      className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition transform hover:scale-105"
                    >
                      <FaPlus /> Add Course
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      Grade Distribution
                    </h3>
                    <div className="h-64 md:h-80">
                      <Bar data={chartData} options={chartOptions} />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl pl-2 md:pl-5 lg:pl-6 p-6 text-white">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-sm md:text-md lg:text-lg opacity-90 mb-1">
                          Credits
                        </p>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
                          {semCredits}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-md lg:text-lg opacity-90 mb-1">
                          Points
                        </p>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
                          {semPoints}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm md:text-md lg:text-lg opacity-90 mb-1">
                          GPA
                        </p>
                        <p
                          className={`text-3xl md:text-4xl lg:text-5xl font-extrabold ${
                            gpa === "-" ? "text-gray-300" :
                            parseFloat(gpa) >= 3.75 ? "text-green-300" :
                            parseFloat(gpa) >= 3.0 ? "text-yellow-300" :
                            "text-red-300"
                          }`}
                        >
                          {gpa}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className="text-center mb-12">
          <button
            onClick={addSemester}
            className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl shadow-xl transition transform hover:scale-105"
          >
            <FaPlus /> Add New Semester
          </button>
        </div>

        {/* Final Result */}
        <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 rounded-3xl shadow-2xl p-8 sm:p-12 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
            Final CGPA Result
          </h2>

          {cgpa === "-" ? (
            <div className="text-center py-16">
              <p className="text-2xl opacity-80">
                Please select grades for at least one course to calculate CGPA
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
                  <p className="text-lg opacity-90 mb-3">Total Credits</p>
                  <p className="text-5xl font-extrabold">{totalCredits}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center">
                  <p className="text-lg opacity-90 mb-3">Total Points</p>
                  <p className="text-5xl font-extrabold">{totalPoints}</p>
                </div>
              </div>

              <div className="text-center mb-16">
                <p className="text-2xl mb-6 opacity-90">Your Final CGPA</p>
                <div
                  className={`inline-block px-16 py-10 rounded-3xl font-black text-6xl sm:text-7xl md:text-8xl shadow-2xl ${
                    parseFloat(cgpa) >= 3.75
                      ? "bg-gradient-to-r from-green-400 to-teal-500"
                      : parseFloat(cgpa) >= 3.0
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gradient-to-r from-red-500 to-pink-600"
                  }`}
                >
                  {cgpa}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleDownloadMorph}
              disabled={isDownloading || isSuccess || cgpa === "-"}
              className={`
                relative cursor-pointer flex items-center justify-center
                ${isDownloading || isSuccess ? "w-32 h-32" : "px-12 py-6"}
                rounded-full font-bold text-xl
                overflow-hidden transition-all duration-700
                shadow-2xl
                ${
                  isDownloading || isSuccess || cgpa === "-"
                    ? "cursor-not-allowed opacity-70"
                    : "bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-110 hover:shadow-indigo-500/50"
                }
              `}
            >
              {(isDownloading || isSuccess) && (
                <>
                  <style jsx>{`
                    @keyframes pulseGlow {
                      0%, 100% { filter: drop-shadow(0 0 20px rgba(99, 78, 235, 0.8)); }
                      50% { filter: drop-shadow(0 0 40px rgba(129, 140, 248, 1)); }
                    }
                    .premium-progress { animation: pulseGlow 2s ease-in-out infinite; }
                  `}</style>

                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feOffset dx="0" dy="4" result="offsetBlur" />
                        <feFlood floodColor="#6366f1" floodOpacity="0.6" />
                        <feComposite in2="offsetBlur" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient id="premiumGradient">
                        <stop offset="0%" stopColor="#c4b5fd" />
                        <stop offset="40%" stopColor="#818cf8" />
                        <stop offset="70%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>

                    <circle cx="50" cy="50" r="44" fill="none" stroke="#1e293b" strokeWidth="8" opacity="0.4" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="44" fill="none"
                      stroke="url(#premiumGradient)" strokeWidth="12"
                      strokeDasharray="276.46"
                      strokeDashoffset={276.46 * (1 - progress)}
                      strokeLinecap="round"
                      filter="url(#glow)"
                      className="premium-progress"
                    />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="6" />
                    <circle cx="50" cy="50" r="18" fill="rgba(129, 140, 248, 0.15)" />
                  </svg>
                </>
              )}

              <span className={`relative z-10 flex flex-col items-center gap-2 ${isDownloading || isSuccess ? "text-white" : ""}`}>
                {!isDownloading && !isSuccess && (
                  <>
                    <span className="text-3xl">Download PDF</span>
                    <span className="text-lg font-bold">Download PDF</span>
                  </>
                )}
                {isDownloading && !isSuccess && (
                  <span className="text-base">
                    Generating...<br />
                    {Math.round(progress * 100)}%
                  </span>
                )}
                {isSuccess && <span className="text-5xl animate-bounce">✔</span>}
              </span>

              {isDownloading && (
                <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-16">
          <GradingNoteSection />
        </div>
      </div>
    </div>
  );
};

const pdfStyles = StyleSheet.create({
  page: { padding: 18, fontSize: 10, fontFamily: "Helvetica" },
  header: { alignItems: "center", marginBottom: 10, paddingBottom: 15, borderBottom: "2 solid #6366f1" },
  logo: { width: 80, height: 75, marginBottom: 10, objectFit: "contain" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 7 },
  date: { fontSize: 10, color: "#666", marginTop: 5, alignSelf: "flex-end" },
  userInfoRow: { flexDirection: "row", flexWrap: "wrap", gap: 2, marginBottom: 20, fontSize: 12 },
  label: { fontWeight: "bold" },
  value: { marginRight: 15 },
  section: { marginBottom: 20 },
  semesterTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 10, color: "#1e40af" },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f3f4f6", padding: 6, fontWeight: "bold", border: "1 solid #6366f1" },
  tableHeader: { flex: 1, textAlign: "center", fontSize: 10 },
  row: { flexDirection: "row", borderWidth: 1, borderColor: "#1f2937", borderStyle: "solid" },
  cell: { flex: 1, textAlign: "center", fontSize: 10, padding: 5 },
  resultSection: { flexDirection: "row", flexWrap: "wrap", gap: 15, marginTop: 10 },
  resultLabel: { fontWeight: "bold" },
  resultValue: { marginLeft: 5 },
  resultHighlight: { fontSize: 14, fontWeight: "bold", color: "#1e40af" },
  pageCenterContainer: { marginTop: -35, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40pt" },
  finalResultSection: { borderTop: "3 solid #1e40af", padding: 7, backgroundColor: "#f8fafc", width: 200, alignItems: "center", borderRadius: "4" },
  finalResultTitle: { fontSize: 13, fontWeight: "bold", color: "#1e40af", marginBottom: 6 },
  finalRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 6 },
  finalResultLabel: { fontWeight: "bold", fontSize: 12, color: "#1f2937" },
  finalResultValue: { fontSize: 12, fontWeight: "normal" },
  finalResultHighlight: { fontSize: 16, fontWeight: "bold", color: "#1e40af" },
});

export default CgpaCalculator;