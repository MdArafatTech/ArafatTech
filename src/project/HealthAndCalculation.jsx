














// import React, { useState, useEffect } from "react";
// import emailjs from "emailjs-com";
// import Tools from "./Tools";
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     backgroundColor: "#f9fafb",
//     fontFamily: "Helvetica",
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: "#1f2937",
//     textAlign: "center",
//     borderBottom: "2px solid #3b82f6",
//     paddingBottom: 10,
//   },
//   section: {
//     marginBottom: 15,
//     backgroundColor: "#ffffff",
//     padding: 15,
//     borderRadius: 8,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: "#2563eb",
//     marginBottom: 10,
//     borderBottom: "1px solid #cbd5e1",
//     paddingBottom: 5,
//   },
//   userInfo: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   userInfoItem: {
//     flex: 1,
//     fontSize: 12,
//     color: "#374151",
//     padding: 5,
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: "row",
//     break: "avoid",
//   },
//   tableCol1: {
//     width: "30%",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCol: {
//     width: "70%",
//     borderStyle: "solid",
//     borderColor: "#bfbfbf",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   tableCellHeader: {
//     margin: 5,
//     fontSize: 12,
//     fontWeight: 500,
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 10,
//   },
//   categoryHighlight: {
//     backgroundColor: "#3b82f6",
//     color: "#ffffff",
//     margin: 5,
//     fontSize: 10,
//     fontWeight: 600,
//   },
//   footer: {
//     fontSize: 10,
//     color: "#6b7280",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   flexContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   flexItem: {
//     flex: 1,
//     paddingRight: 10,
//   },
// });

// const PDFReport = ({ bmiResult, healthResult, name, email, age, gender, weight, heightCm }) => {
//   const bmiRanges = [
//     { category: "Underweight", value: "Below 18.5" },
//     { category: "Normal", value: "18.5 – 24.9" },
//     { category: "Overweight", value: "25 – 29.9" },
//     { category: "Obese", value: "30 and above" },
//   ];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.header}>BMI & Health Report for {name}</Text>

//         {/* User Info (Two Columns) */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>User Information</Text>
//           <View style={styles.userInfo}>
//             <Text style={styles.userInfoItem}>Name: {name}</Text>
//             <Text style={styles.userInfoItem}>Email: {email}</Text>
//           </View>
//           <View style={styles.userInfo}>
//             <Text style={styles.userInfoItem}>Age: {age}</Text>
//             <Text style={styles.userInfoItem}>Gender: {gender}</Text>
//           </View>
//           <View style={styles.userInfo}>
//             <Text style={styles.userInfoItem}>Weight: {weight} kg</Text>
//             <Text style={styles.userInfoItem}>Height: {heightCm} cm</Text>
//           </View>
//         </View>

//         {/* BMI Results */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>BMI Results</Text>
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCol1}>
//                 <Text style={styles.tableCellHeader}>BMI</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{bmiResult?.bmi}</Text>
//               </View>
//             </View>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCol1}>
//                 <Text style={styles.tableCellHeader}>Category</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={bmiResult?.category === "Normal" ? styles.categoryHighlight : styles.tableCell}>
//                   {bmiResult?.category}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* Instructions and Range Table Side by Side */}
//           <View style={styles.flexContainer}>
//             <View style={styles.flexItem}>
//               <Text style={styles.tableCell}>Instructions:</Text>
//               {bmiResult?.instruction?.split("•").filter(line => line.trim() !== "").map((line, i) => (
//                 <Text key={i} style={styles.tableCell}>• {line.trim()}</Text>
//               ))}
//             </View>
//             <View style={styles.flexItem}>
//               <View style={styles.table}>
//                 <View style={styles.tableRow}>
//                   <View style={styles.tableCol1}>
//                     <Text style={styles.tableCellHeader}>Category</Text>
//                   </View>
//                   <View style={styles.tableCol}>
//                     <Text style={styles.tableCellHeader}>BMI Value</Text>
//                   </View>
//                 </View>
//                 {bmiRanges.map((r, i) => (
//                   <View key={i} style={styles.tableRow}>
//                     <View style={styles.tableCol1}>
//                       <Text style={bmiResult?.category === r.category ? styles.categoryHighlight : styles.tableCell}>
//                         {r.category}
//                       </Text>
//                     </View>
//                     <View style={styles.tableCol}>
//                       <Text style={bmiResult?.category === r.category ? styles.categoryHighlight : styles.tableCell}>
//                         {r.value}
//                       </Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Health Results */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Health Results</Text>
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCol1}>
//                 <Text style={styles.tableCellHeader}>TDEE</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{healthResult?.tdee} kcal/day</Text>
//               </View>
//             </View>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCol1}>
//                 <Text style={styles.tableCellHeader}>Ideal Weight</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{healthResult?.idealWeight} kg</Text>
//               </View>
//             </View>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCol1}>
//                 <Text style={styles.tableCellHeader}>Water Intake</Text>
//               </View>
//               <View style={styles.tableCol}>
//                 <Text style={styles.tableCell}>{healthResult?.waterIntake} L/day</Text>
//               </View>
//             </View>
//           </View>
//           <Text style={styles.tableCell}>Suggestions:</Text>
//           <Text style={styles.tableCell}>• {healthResult?.weightSuggestion}</Text>
//           <Text style={styles.tableCell}>• {healthResult?.waterSuggestion}</Text>
//         </View>

//         <Text style={styles.footer}>Generated by ArafatTech</Text>
//       </Page>
//     </Document>
//   );
// };

// const HealthAndCalculation = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     setDarkMode(mediaQuery.matches);

//     const handleChange = (e) => setDarkMode(e.matches);
//     mediaQuery.addEventListener("change", handleChange);

//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   // ------------------ BMI & Health Inputs ------------------
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [weight, setWeight] = useState("");
//   const [heightCm, setHeightCm] = useState("");
//   const [heightFt, setHeightFt] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("male");
//   const [activity, setActivity] = useState(1.2);

//   const [bmiResult, setBmiResult] = useState(null);
//   const [healthResult, setHealthResult] = useState(null);

//   // ------------------ Calculate BMI ------------------
//   useEffect(() => {
//     if (name && email && weight && heightCm) {
//       calculateBMI();
//     }
//   }, [heightCm, name, email, weight]);

//   const getBMIInstruction = (bmi) => {
//     if (bmi < 18.5)
//       return `• Increase daily calorie intake with healthy foods  
// • Eat more frequently throughout the day  
// • Add healthy fats like nuts and avocado  
// • Include strength training exercises`;

//     if (bmi < 24.9)
//       return `• Maintain a balanced diet with fruits and vegetables  
// • Exercise at least 30 minutes daily  
// • Drink sufficient water  
// • Monitor your weight monthly`;

//     if (bmi < 29.9)
//       return `• Reduce sugary, fried, and oily foods  
// • Walk 30–60 minutes daily  
// • Increase fiber-rich foods like vegetables  
// • Avoid late-night meals`;

//     return `• Follow a doctor-approved diet plan  
// • Limit fast food and sweetened drinks  
// • Start with light exercise (walking, cycling)  
// • Monitor blood pressure and blood sugar`;
//   };

//   const calculateBMI = () => {
//     if (!name || !email || !heightCm || !weight) {
//       setBmiResult({ error: "Please fill all fields" });
//       return;
//     }

//     const h = heightCm / 100;
//     const bmi = parseFloat((weight / (h * h)).toFixed(2));

//     const category =
//       bmi < 18.5
//         ? "Underweight"
//         : bmi < 24.9
//         ? "Normal"
//         : bmi < 29.9
//         ? "Overweight"
//         : "Obese";

//     setBmiResult({
//       bmi,
//       category,
//       instruction: getBMIInstruction(bmi),
//     });
//   };

//   // ------------------ Health Calculation ------------------
//   const calculateHealth = () => {
//     if (!age || !weight || !heightCm) return;

//     let bmr =
//       gender === "male"
//         ? 10 * weight + 6.25 * heightCm - 5 * age + 5
//         : 10 * weight + 6.25 * heightCm - 5 * age - 161;

//     const tdee = bmr * activity;

//     const heightM = heightCm / 100;
//     const idealWeight = 22 * heightM * heightM;

//     const waterIntake = weight * 35; // ml

//     const weightDiff = weight - idealWeight;
//     let weightSuggestion;
//     if (weightDiff > 2)
//       weightSuggestion =
//         "You are slightly above ideal weight. Consider regular exercise and balanced diet.";
//     else if (weightDiff < -2)
//       weightSuggestion =
//         "You are slightly below ideal weight. Consider a nutrient-rich diet.";
//     else weightSuggestion = "Your weight is within the ideal range.";

//     let waterSuggestion =
//       waterIntake / 1000 < 2
//         ? "Try to drink more water to stay hydrated."
//         : "Your water intake is sufficient.";

//     setHealthResult({
//       tdee: tdee.toFixed(0),
//       idealWeight: idealWeight.toFixed(1),
//       waterIntake: (waterIntake / 1000).toFixed(2),
//       weightSuggestion,
//       waterSuggestion,
//     });
//   };

//   // ------------------ Send Email ------------------
//   const sendEmail = () => {
//     if (!bmiResult?.bmi || !healthResult) {
//       return alert("Calculate both BMI and Health first!");
//     }

//     const colors = {
//       Underweight: { bg: "#3B82F6", text: "#FFFFFF" },
//       Normal: { bg: "#10B981", text: "#FFFFFF" },
//       Overweight: { bg: "#F59E0B", text: "#FFFFFF" },
//       Obese: { bg: "#EF4444", text: "#FFFFFF" },
//     };

//     const bmiInstructionHTML = bmiResult.instruction
//       .trim()
//       .split("•")
//       .filter((line) => line.trim() !== "")
//       .map((line) => `<li>${line.trim()}</li>`)
//       .join("");

//     const healthInstructionHTML = [
//       healthResult.weightSuggestion,
//       healthResult.waterSuggestion,
//     ]
//       .map((line) => `<li>${line}</li>`)
//       .join("");

//     const templateParams = {
//       to_email: email,
//       name: name,
//       bmi: bmiResult.bmi,
//       category: bmiResult.category,
//       categoryColor: colors[bmiResult.category]?.bg || "#10B981",
//       bmi_instruction_list: `<ol>${bmiInstructionHTML}</ol>`,
//       health_instruction_list: `<ol>${healthInstructionHTML}</ol>`,
//       tdee: healthResult.tdee,
//       idealWeight: healthResult.idealWeight,
//       waterIntake: healthResult.waterIntake,
//     };

//     emailjs
//       .send(
//         "service_fel2b38",
//         "template_oso5p1n",
//         templateParams,
//         "-dm5gWB-Fz--QlTIN"
//       )
//       .then(() => alert("Email sent successfully!"))
//       .catch((err) => alert("Email sending failed: " + err.text));
//   };

//   return (
//     <div
//       className={`min-h-screen p-6 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">BMI & Health Calculator</h1>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* ------------------ BMI ------------------ */}
//         <div
//           className={`p-6 rounded-lg shadow-md ${
//             darkMode ? "bg-gray-800" : "bg-white"
//           }`}
//         >
//           <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">
//             BMI Calculator
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`p-2 rounded ${
//                 darkMode ? "bg-gray-700" : "bg-gray-200"
//               }`}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`p-2 rounded ${
//                 darkMode ? "bg-gray-700" : "bg-gray-200"
//               }`}
//             />
//             <input
//               type="number"
//               placeholder="Weight (kg)"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
//             />
//             <input
//               type="number"
//               placeholder="Height (cm)"
//               value={heightCm}
//               onChange={(e) => setHeightCm(e.target.value)}
//               className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
//             />
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 placeholder="Height (ft)"
//                 value={heightFt}
//                 onChange={(e) => setHeightFt(e.target.value)}
//                 className={`p-2 rounded w-full ${
//                   darkMode ? "bg-gray-700" : "bg-gray-200"
//                 }`}
//               />
//               <button
//                 onClick={() => {
//                   if (heightFt) {
//                     const newHeightCm = (Number(heightFt) * 30.48).toFixed(2);
//                     setHeightCm(newHeightCm);
//                     if (name && email && weight) {
//                       calculateBMI();
//                     }
//                   }
//                 }}
//                 className="p-1 text-sm cursor-pointer rounded bg-blue-600 text-white"
//               >
//                 Convert to cm
//               </button>
//             </div>
//           </div>
//           <button
//             onClick={calculateBMI}
//             className="mt-4 w-full bg-blue-600 cursor-pointer py-2 rounded hover:bg-blue-700 text-white"
//           >
//             Calculate BMI
//           </button>

//           {bmiResult?.bmi && (
//             <>
//               <p className="mt-2 font-medium">
//                 BMI: {bmiResult.bmi} ({bmiResult.category})
//               </p>
//               <p className="mt-1 whitespace-pre-line">{bmiResult.instruction}</p>
//             </>
//           )}
//         </div>

//         {/* ------------------ Health ------------------ */}
//         <div
//           className={`p-6 rounded-2xl shadow-lg ${
//             darkMode ? "bg-gray-800" : "bg-white"
//           }`}
//         >
//           <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">
//             Health Calculator
//           </p>
//           <div className="grid grid-cols-2 gap-3 mb-4">
//             <input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="p-2 rounded border"
//             />
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="p-2 rounded bg-gray-500 border"
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Weight (kg)"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="p-2 rounded border col-span-2"
//             />
//             <input
//               type="number"
//               placeholder="Height (cm)"
//               value={heightCm}
//               onChange={(e) => setHeightCm(e.target.value)}
//               className="p-2 rounded border col-span-2"
//             />
//             <select
//               value={activity}
//               onChange={(e) => setActivity(parseFloat(e.target.value))}
//               className={`p-2 rounded border col-span-2 ${
//                 darkMode
//                   ? "text-gray-200 bg-gray-700 border-gray-600"
//                   : "text-gray-800 bg-gray-200 border-gray-300"
//               }`}
//             >
//               <option value={1.2}>Sedentary (little or no exercise)</option>
//               <option value={1.375}>Lightly active (1-3 days/week)</option>
//               <option value={1.55}>Moderately active (3-5 days/week)</option>
//               <option value={1.725}>Very active (6-7 days/week)</option>
//               <option value={1.9}>Extra active (hard exercise daily)</option>
//             </select>
//           </div>
//           <button
//             onClick={calculateHealth}
//             className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition"
//           >
//             Calculate Health
//           </button>

//           {healthResult && (
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="p-4 rounded-2xl shadow-lg bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-bold mb-2">TDEE</h3>
//                 <p className="text-2xl font-semibold">{healthResult.tdee} kcal/day</p>
//               </div>
//               <div className="p-4 rounded-2xl shadow-lg bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-bold mb-2">Ideal Weight</h3>
//                 <p className="text-2xl font-semibold">{healthResult.idealWeight} kg</p>
//               </div>
//               <div className="p-4 rounded-2xl shadow-lg bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-bold mb-2">Water Intake</h3>
//                 <p className="text-2xl font-semibold">{healthResult.waterIntake} L/day</p>
//               </div>
//               <div className="col-span-full mt-4 p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 shadow-lg">
//                 <h4 className="font-bold text-lg mb-2">Suggestions & Review</h4>
//                 <ul className="list-disc list-inside space-y-1">
//                   <li>{healthResult.weightSuggestion}</li>
//                   <li>{healthResult.waterSuggestion}</li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ------------------ Email & PDF Button ------------------ */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center  gap-4 mt-6">
//         <button
//           onClick={sendEmail}
//           className="w-full cursor-pointer bg-green-600 py-2 rounded hover:bg-green-700 text-white"
//         >
//           Send BMI & Health Info to Email
//         </button>
//         {bmiResult?.bmi && healthResult && name && email && age && gender && weight && heightCm ? (
//           <PDFDownloadLink className="btn cursor-pointer btn-accent"
//             document={<PDFReport bmiResult={bmiResult} healthResult={healthResult} name={name} email={email} age={age} gender={gender} weight={weight} heightCm={heightCm} />}
//             fileName="BMI_Health_Report.pdf"
//           >
//             {({ loading }) => (loading ? "Loading..." : "Download PDF Report")}
//           </PDFDownloadLink>
//         ) : (
//           <button disabled className="w-full cursor-not-allowed  bg-red-400 py-2 rounded text-white">
//             Download PDF Report
//           </button>
//         )}
//       </div>

//       {/* ------------------ Tools Section ------------------ */}
//       <div className="tools mt-6">
//         <Tools />
//       </div>
//     </div>
//   );
// };

// export default HealthAndCalculation;







































// HealthAndCalculation.jsx
import React, { useState, useEffect, useMemo } from "react";
import emailjs from "emailjs-com";
import Tools from "./Tools";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Chart.js (Doughnut)
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#f9fafb",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "#1f2937",
    textAlign: "center",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: 10,
  },
  section: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#2563eb",
    marginBottom: 10,
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: 5,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  userInfoItem: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    padding: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    break: "avoid",
  },
  tableCol1: {
    width: "30%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  categoryHighlight: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    margin: 5,
    fontSize: 10,
    fontWeight: 600,
  },
  footer: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  flexItem: {
    flex: 1,
    paddingRight: 10,
  },
});

const PDFReport = ({ bmiResult, healthResult, name, email, age, gender, weight, heightCm }) => {
  const bmiRanges = [
    { category: "Underweight", value: "Below 18.5" },
    { category: "Normal", value: "18.5 – 24.9" },
    { category: "Overweight", value: "25 – 29.9" },
    { category: "Obese", value: "30 and above" },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>BMI & Health Report for {name}</Text>

        {/* User Info (Two Columns) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoItem}>Name: {name}</Text>
            <Text style={styles.userInfoItem}>Email: {email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoItem}>Age: {age}</Text>
            <Text style={styles.userInfoItem}>Gender: {gender}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoItem}>Weight: {weight} kg</Text>
            <Text style={styles.userInfoItem}>Height: {heightCm} cm</Text>
          </View>
        </View>

        {/* BMI Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BMI Results</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>BMI</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{bmiResult?.bmi}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>Category</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={bmiResult?.category === "Normal" ? styles.categoryHighlight : styles.tableCell}>
                  {bmiResult?.category}
                </Text>
              </View>
            </View>
          </View>

          {/* Instructions and Range Table Side by Side */}
          <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.tableCell}>Instructions:</Text>
              {bmiResult?.instruction?.split("•").filter(line => line.trim() !== "").map((line, i) => (
                <Text key={i} style={styles.tableCell}>• {line.trim()}</Text>
              ))}
            </View>
            <View style={styles.flexItem}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCellHeader}>Category</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCellHeader}>BMI Value</Text>
                  </View>
                </View>
                {bmiRanges.map((r, i) => (
                  <View key={i} style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                      <Text style={bmiResult?.category === r.category ? styles.categoryHighlight : styles.tableCell}>
                        {r.category}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={bmiResult?.category === r.category ? styles.categoryHighlight : styles.tableCell}>
                        {r.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Health Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Results</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>TDEE</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{healthResult?.tdee} kcal/day</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>Ideal Weight</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{healthResult?.idealWeight} kg</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>Water Intake</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{healthResult?.waterIntake} L/day</Text>
              </View>
            </View>
          </View>
          <Text style={styles.tableCell}>Suggestions:</Text>
          <Text style={styles.tableCell}>• {healthResult?.weightSuggestion}</Text>
          <Text style={styles.tableCell}>• {healthResult?.waterSuggestion}</Text>
        </View>

        <Text style={styles.footer}>Generated by ArafatTech</Text>
      </Page>
    </Document>
  );
};

const HealthAndCalculation = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ------------------ BMI & Health Inputs ------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);

  const [bmiResult, setBmiResult] = useState(null);
  const [healthResult, setHealthResult] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // Remove automatic calculate on change — user wants explicit Calculate button
  // ------------------ Calculate BMI ------------------
  const getBMIInstruction = (bmi) => {
    if (bmi < 18.5)
      return `• Increase daily calorie intake with healthy foods  
• Eat more frequently throughout the day  
• Add healthy fats like nuts and avocado  
• Include strength training exercises`;

    if (bmi < 24.9)
      return `• Maintain a balanced diet with fruits and vegetables  
• Exercise at least 30 minutes daily  
• Drink sufficient water  
• Monitor your weight monthly`;

    if (bmi < 29.9)
      return `• Reduce sugary, fried, and oily foods  
• Walk 30–60 minutes daily  
• Increase fiber-rich foods like vegetables  
• Avoid late-night meals`;

    return `• Follow a doctor-approved diet plan  
• Limit fast food and sweetened drinks  
• Start with light exercise (walking, cycling)  
• Monitor blood pressure and blood sugar`;
  };

  const calculateBMI = () => {
    // Validate numeric input
    const w = Number(weight);
    const h = Number(heightCm);

    if (!name || !email || !h || !w) {
      setBmiResult({ error: "Please fill all fields" });
      setShowChart(false);
      return;
    }

    const hm = h / 100;
    const bmi = parseFloat((w / (hm * hm)).toFixed(2));

    const category =
      bmi < 18.5
        ? "Underweight"
        : bmi < 24.9
        ? "Normal"
        : bmi < 29.9
        ? "Overweight"
        : "Obese";

    setBmiResult({
      bmi,
      category,
      instruction: getBMIInstruction(bmi),
    });

    // show chart on calculate
    setShowChart(true);
  };

  // ------------------ Health Calculation ------------------
  const calculateHealth = () => {
    if (!age || !weight || !heightCm) return;

    const w = Number(weight);
    const h = Number(heightCm);

    let bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * Number(age) + 5
        : 10 * w + 6.25 * h - 5 * Number(age) - 161;

    const tdee = bmr * activity;

    const heightM = h / 100;
    const idealWeight = 22 * heightM * heightM;

    const waterIntake = w * 35; // ml

    const weightDiff = w - idealWeight;
    let weightSuggestion;
    if (weightDiff > 2)
      weightSuggestion =
        "You are slightly above ideal weight. Consider regular exercise and balanced diet.";
    else if (weightDiff < -2)
      weightSuggestion =
        "You are slightly below ideal weight. Consider a nutrient-rich diet.";
    else weightSuggestion = "Your weight is within the ideal range.";

    let waterSuggestion =
      waterIntake / 1000 < 2
        ? "Try to drink more water to stay hydrated."
        : "Your water intake is sufficient.";

    setHealthResult({
      tdee: tdee.toFixed(0),
      idealWeight: idealWeight.toFixed(1),
      waterIntake: (waterIntake / 1000).toFixed(2),
      weightSuggestion,
      waterSuggestion,
    });
  };

  // ------------------ Send Email ------------------
  const sendEmail = () => {
    if (!bmiResult?.bmi || !healthResult) {
      return alert("Calculate both BMI and Health first!");
    }

    const colors = {
      Underweight: { bg: "#3B82F6", text: "#FFFFFF" },
      Normal: { bg: "#10B981", text: "#FFFFFF" },
      Overweight: { bg: "#F59E0B", text: "#FFFFFF" },
      Obese: { bg: "#EF4444", text: "#FFFFFF" },
    };

    const bmiInstructionHTML = bmiResult.instruction
      .trim()
      .split("•")
      .filter((line) => line.trim() !== "")
      .map((line) => `<li>${line.trim()}</li>`)
      .join("");

    const healthInstructionHTML = [
      healthResult.weightSuggestion,
      healthResult.waterSuggestion,
    ]
      .map((line) => `<li>${line}</li>`)
      .join("");

    const templateParams = {
      to_email: email,
      name: name,
      bmi: bmiResult.bmi,
      category: bmiResult.category,
      categoryColor: colors[bmiResult.category]?.bg || "#10B981",
      bmi_instruction_list: `<ol>${bmiInstructionHTML}</ol>`,
      health_instruction_list: `<ol>${healthInstructionHTML}</ol>`,
      tdee: healthResult.tdee,
      idealWeight: healthResult.idealWeight,
      waterIntake: healthResult.waterIntake,
    };

    emailjs
      .send(
        "service_fel2b38",
        "template_oso5p1n",
        templateParams,
        "-dm5gWB-Fz--QlTIN"
      )
      .then(() => alert("Email sent successfully!"))
      .catch((err) => alert("Email sending failed: " + err.text));
  };

  // Chart data (Doughnut): show BMI portion vs scale (max 40)
  const chartData = useMemo(() => {
    const bmi = bmiResult?.bmi ? Number(bmiResult.bmi) : 0;
    const maxScale = 40;
    const displayBmi = Math.min(bmi, maxScale);
    const remainder = Math.max(0, maxScale - displayBmi);

    const categoryColor =
      bmiResult?.category === "Underweight"
        ? "#3B82F6"
        : bmiResult?.category === "Normal"
        ? "#10B981"
        : bmiResult?.category === "Overweight"
        ? "#F59E0B"
        : "#EF4444";

    return {
      labels: ["BMI", "Remaining"],
      datasets: [
        {
          data: [displayBmi, remainder],
          backgroundColor: [categoryColor, "#e5e7eb"],
          borderWidth: 0,
        },
      ],
    };
  }, [bmiResult]);

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const val = context.raw;
            if (label === "BMI") return `BMI: ${val}`;
            return `${label}: ${val}`;
          },
        },
      },
    },
    cutout: "70%",
  };

  // BMI ranges for UI table
  const bmiRanges = [
    { category: "Underweight", range: "Below 18.5" },
    { category: "Normal", range: "18.5 – 24.9" },
    { category: "Overweight", range: "25 – 29.9" },
    { category: "Obese", range: "30 and above" },
  ];

  // Convert button: only converts ft -> cm, does NOT calculate
  const handleConvert = () => {
    if (!heightFt) return;
    const newHeightCm = (Number(heightFt) * 30.48).toFixed(2);
    setHeightCm(newHeightCm);
    // do NOT call calculateBMI here (user requested)
    // keep showChart as-is (only set when calculate runs)
  };

  return (
    <div
      className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">BMI & Health Calculator</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* BMI */}
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">BMI Calculator</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <input type="number" placeholder="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
            <div className="flex gap-2">
              <input type="number" placeholder="Height (ft)" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className={`p-2 rounded w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
              <button onClick={handleConvert} className="p-1 text-sm cursor-pointer rounded bg-blue-600 text-white">Convert to cm</button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={calculateBMI} className="flex-1 mt-0 w-full bg-blue-600 cursor-pointer py-2 rounded hover:bg-blue-700 text-white">Calculate BMI</button>
            <button onClick={() => { setBmiResult(null); setShowChart(false); }} className="ml-2 mt-0 w-36 btn btn-accent cursor-pointer py-2 rounded text-white">Reset BMI</button>
          </div>

          {bmiResult?.error && <p className="mt-2 text-red-500">{bmiResult.error}</p>}

          {/* BMI Result & Instructions */}
          {bmiResult?.bmi && (
            <>
              <div className="mt-4">
                <p className="mt-2 font-medium">BMI: {bmiResult.bmi} ({bmiResult.category})</p>
                <p className="mt-1 whitespace-pre-line">{bmiResult.instruction}</p>
              </div>

              {/* Chart + Range Table */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900" : "bg-gray-50"} flex flex-col items-center justify-center`}>
                  <div style={{ width: 180, height: 180 }}>
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                  <p className="mt-3 text-sm">BMI: <strong>{bmiResult.bmi}</strong> — {bmiResult.category}</p>
                  <p className="text-xs mt-1 text-gray-500">Scale max: 40</p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm`}>
                  <h4 className="font-semibold mb-2">BMI Ranges</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left pb-2">Category</th>
                        <th className="text-left pb-2">Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bmiRanges.map((r) => {
                        const isActive = bmiResult?.category === r.category;
                        return (
                          <tr key={r.category} className={isActive ? "bg-blue-600 text-white" : ""}>
                            <td className={`py-2 ${isActive ? "font-semibold" : ""}`}>{r.category}</td>
                            <td className={`${isActive ? "font-semibold" : "text-gray-700"}`}>{r.range}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Health */}
        <div className={`p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">Health Calculator</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 rounded border" />
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 rounded bg-gray-300 border">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 rounded border col-span-2" />
            <input type="number" placeholder="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="p-2 rounded border col-span-2" />
            <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className={`p-2 rounded border col-span-2 ${darkMode ? "text-gray-200 bg-gray-700 border-gray-600" : "text-gray-800 bg-gray-200 border-gray-300"}`}>
              <option value={1.2}>Sedentary (little or no exercise)</option>
              <option value={1.375}>Lightly active (1-3 days/week)</option>
              <option value={1.55}>Moderately active (3-5 days/week)</option>
              <option value={1.725}>Very active (6-7 days/week)</option>
              <option value={1.9}>Extra active (hard exercise daily)</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={calculateHealth} className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition">Calculate Health</button>
            <button onClick={() => setHealthResult(null)} className="w-40  btn btn-accent text-white py-2 rounded">Reset</button>
          </div>

          {healthResult && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl shadow-lg bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold mb-2">TDEE</h3>
                <p className="text-2xl font-semibold">{healthResult.tdee} kcal/day</p>
              </div>
              <div className="p-4 rounded-2xl shadow-lg bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold mb-2">Ideal Weight</h3>
                <p className="text-2xl font-semibold">{healthResult.idealWeight} kg</p>
              </div>
              <div className="p-4 rounded-2xl shadow-lg bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold mb-2">Water Intake</h3>
                <p className="text-2xl font-semibold">{healthResult.waterIntake} L/day</p>
              </div>

              <div className="col-span-full mt-4 p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 shadow-lg">
                <h4 className="font-bold text-lg mb-2">Suggestions & Review</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>{healthResult.weightSuggestion}</li>
                  <li>{healthResult.waterSuggestion}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email & PDF */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <button onClick={sendEmail} className="w-full cursor-pointer bg-green-600 py-2 rounded hover:bg-green-700 text-white">Send BMI & Health Info to Email</button>

        {bmiResult?.bmi && healthResult && name && email && age && gender && weight && heightCm ? (
          <PDFDownloadLink
            className="w-full cursor-pointer btn btn-accent"
            document={<PDFReport bmiResult={bmiResult} healthResult={healthResult} name={name} email={email} age={age} gender={gender} weight={weight} heightCm={heightCm} />}
            fileName="BMI_Health_Report.pdf"
          >
            {({ loading }) => (loading ? "Loading..." : "Download PDF Report")}
          </PDFDownloadLink>
        ) : (
          <button disabled className="w-full cursor-not-allowed bg-red-400 py-2 rounded text-white">Download PDF Report</button>
        )}
      </div>

      <div className="tools mt-6">
        <Tools />
      </div>
    </div>
  );
};

export default HealthAndCalculation;
