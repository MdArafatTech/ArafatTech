// import React, { useState, useEffect, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import emailjs from "emailjs-com";
// import Tools from "./Tools";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Calculation = () => {
//   // ------------------ Dark/Light Mode ------------------
//   const [darkMode, setDarkMode] = useState(
//     window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//   );

//   useEffect(() => {
//     const listener = (e) => setDarkMode(e.matches);
//     window
//       .matchMedia("(prefers-color-scheme: dark)")
//       .addEventListener("change", listener);
//     return () =>
//       window
//         .matchMedia("(prefers-color-scheme: dark)")
//         .removeEventListener("change", listener);
//   }, []);

//   // ------------------ Inputs ------------------
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [weight, setWeight] = useState("");
//   const [heightCm, setHeightCm] = useState("");

//   const [heightFt, setHeightFt] = useState("");
//   const [heightInch, setHeightInch] = useState("");

//   const [bmiResult, setBmiResult] = useState(null);
//   const chartRef = useRef(null);

//   // ------------------ BMI Instruction ------------------
//   const getBMIInstruction = (bmi) => {
//     if (bmi < 18.5)
//       return `
// • Increase daily calorie intake with healthy foods  
// • Eat more frequently throughout the day  
// • Add healthy fats like nuts and avocado  
// • Include strength training exercises  
// • Drink milkshakes or protein smoothies  
// • Consult a doctor if sudden weight loss occurs`;

//     if (bmi < 24.9)
//       return `
// • Maintain a balanced diet with fruits and vegetables  
// • Exercise at least 30 minutes daily  
// • Drink sufficient water  
// • Monitor your weight monthly  
// • Avoid excessive junk or sugary foods  
// • Maintain consistent sleep routines`;

//     if (bmi < 29.9)
//       return `
// • Reduce sugary, fried, and oily foods  
// • Walk 30–60 minutes daily  
// • Increase fiber-rich foods like vegetables  
// • Avoid late-night meals  
// • Track daily calorie intake  
// • Add a mix of cardio + strength training`;

//     return `
// • Follow a doctor-approved diet plan  
// • Limit fast food and sweetened drinks  
// • Start with light exercise (walking, cycling)  
// • Monitor blood pressure and blood sugar  
// • Reduce carbs slowly and avoid overeating  
// • Consult a healthcare professional regularly`;
//   };

//   // ------------------ Convert ft/in to cm ------------------
//   const convertFtToCm = () => {
//     if (!heightFt && !heightInch) return "";
//     const totalInches = Number(heightFt) * 12 + Number(heightInch || 0);
//     const cm = (totalInches * 2.54).toFixed(2);
//     return cm;
//   };

//   // ------------------ BMI Calculation ------------------
//   const calculateBMI = () => {
//     let finalHeight = heightCm;

//     // If cm empty, convert ft/in
//     if (!heightCm && (heightFt || heightInch)) {
//       finalHeight = convertFtToCm();
//       setHeightCm(finalHeight);
//     }

//     if (!name || !email || !finalHeight || !weight) {
//       setBmiResult({ error: "Please fill all fields" });
//       return;
//     }

//     const h = finalHeight / 100;
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

//   // ------------------ Email Sending ------------------
//   const sendEmail = () => {
//     if (!bmiResult?.bmi) return alert("Calculate BMI first!");

//     const chartBase64 = chartRef.current?.toBase64Image();

//     // Convert bullet instructions into <li> items
//     const instructionHTML = bmiResult.instruction
//       .trim()
//       .split("•")
//       .filter((line) => line.trim() !== "")
//       .map((line) => `<li>${line.trim()}</li>`)
//       .join("");

//     const templateParams = {
//       to_email: email,
//       name,
//       bmi: bmiResult.bmi,
//       category: bmiResult.category,

//       // Send final HTML list (EmailJS will show it)
//       instruction_list: `<ol>${instructionHTML}</ol>`,

//       chart: chartBase64,

//       full_ranges: `
// Underweight: Less than 18.5  
// Normal: 18.5 - 24.9  
// Overweight: 25 - 29.9  
// Obese: 30+  
// Your Category: ${bmiResult.category}
//     `,
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

//   // ------------------ Chart Data ------------------
//   const bmiChartData = {
//     labels: ["Underweight", "Normal", "Overweight", "Obese"],
//     datasets: [
//       {
//         label: "BMI Ranges",
//         data: [18.5, 24.9, 29.9, 35],
//         backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
//       },
//     ],
//   };

//   // ------------------ BMI Range Table ------------------
//   const bmiRanges = [
//     { category: "Underweight", value: "Below 18.5" },
//     { category: "Normal", value: "18.5 – 24.9" },
//     { category: "Overweight", value: "25 – 29.9" },
//     { category: "Obese", value: "30 and above" },
//   ];

//   return (
//     <div
//       className={`min-h-screen p-6 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">BMI Calculator</h1>
//         {/* <button
//           onClick={() => setDarkMode(!darkMode)}
//           className={`px-4 py-2 rounded ${
//             darkMode ? "bg-gray-700" : "bg-gray-300"
//           }`}
//         >
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button> */}
//       </div>

//       {/* ------------------ Input Section ------------------ */}
//       <div
//         className={`p-6 rounded-lg shadow-md ${
//           darkMode ? "bg-gray-800" : "bg-white"
//         } mb-6`}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={`p-2 rounded ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={`p-2 rounded ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           />

//           <input
//             type="number"
//             placeholder="Weight (kg)"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             className={`p-2 rounded ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           />

//           {/* Height in CM */}
//           <input
//             type="number"
//             placeholder="Height (cm)"
//             value={heightCm}
//             onChange={(e) => setHeightCm(e.target.value)}
//             className={`p-2 rounded ${
//               darkMode ? "bg-gray-700" : "bg-gray-200"
//             }`}
//           />

//           {/* Height in ft/in optional */}
//           <div className="flex gap-2">
//             <input
//               type="number"
//               placeholder="Height (ft)"
//               value={heightFt}
//               onChange={(e) => setHeightFt(e.target.value)}
//               className={`p-2 rounded w-full ${
//                 darkMode ? "bg-gray-700" : "bg-gray-200"
//               }`}
//             />

//             <input
//               type="number"
//               placeholder="Inch"
//               value={heightInch}
//               onChange={(e) => setHeightInch(e.target.value)}
//               className={`p-2 rounded w-full ${
//                 darkMode ? "bg-gray-700" : "bg-gray-200"
//               }`}
//             />
//           </div>
//         </div>

//         <button
//           onClick={calculateBMI}
//           className="mt-4 w-full cursor-pointer bg-blue-600 py-2 rounded hover:bg-blue-700 text-white"
//         >
//           Calculate BMI
//         </button>

//         {/* ------------------ Result ------------------ */}
//         {bmiResult?.bmi && (
//           <>
//             <p className="mt-2 font-medium">
//               BMI: {bmiResult.bmi} ({bmiResult.category})
//             </p>

//             <p className="mt-1 whitespace-pre-line">{bmiResult.instruction}</p>

//             {/* ------------------ Chart ------------------ */}
//             <div className="max-w-md mt-4">
//               <Bar ref={chartRef} key={bmiResult.bmi} data={bmiChartData} />
//             </div>

//             {/* ------------------ BMI Range Table ------------------ */}
//             <h2 className="text-xl font-bold mt-6">BMI Range Chart</h2>
//             <table className="w-full mt-3 border rounded overflow-hidden">
//               <thead>
//                 <tr
//                   className={`${
//                     darkMode ? "bg-gray-700" : "bg-gray-300"
//                   } text-left`}
//                 >
//                   <th className="p-2">Category</th>
//                   <th className="p-2">BMI Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bmiRanges.map((r, i) => (
//                   <tr
//                     key={i}
//                     className={`border ${
//                       bmiResult.category === r.category
//                         ? "bg-green-600 text-white"
//                         : darkMode
//                         ? "bg-gray-800"
//                         : "bg-white"
//                     }`}
//                   >
//                     <td className="p-2">{r.category}</td>
//                     <td className="p-2">{r.value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* ------------------ Email Button ------------------ */}
//             <button
//               onClick={sendEmail}
//               className="mt-4 w-full cursor-pointer bg-green-600 py-2 rounded hover:bg-green-700 text-white"
//             >
//               Send Result to Email
//             </button>
//           </>
//         )}

//         {bmiResult?.error && (
//           <p className="mt-2 font-medium text-red-500">{bmiResult.error}</p>
//         )}
//       </div>



// <div className="tools">
//   <Tools></Tools>
// </div>



//     </div>
//   );
// };

// export default Calculation;








import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import emailjs from "emailjs-com";
import Tools from "./Tools";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HealthAndCalculation = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const listener = (e) => setDarkMode(e.matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
  }, []);

  // ------------------ BMI & Health Inputs ------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);

  const [bmiResult, setBmiResult] = useState(null);
  const [healthResult, setHealthResult] = useState(null);

  const chartRef = useRef(null);

  // ------------------ BMI Instruction ------------------
  const getBMIInstruction = (bmi) => {
    if (bmi < 18.5)
      return `• Increase daily calorie intake with healthy foods  
• Eat more frequently throughout the day  
• Add healthy fats like nuts and avocado  
• Include strength training exercises  
• Drink milkshakes or protein smoothies  
• Consult a doctor if sudden weight loss occurs`;

    if (bmi < 24.9)
      return `• Maintain a balanced diet with fruits and vegetables  
• Exercise at least 30 minutes daily  
• Drink sufficient water  
• Monitor your weight monthly  
• Avoid excessive junk or sugary foods  
• Maintain consistent sleep routines`;

    if (bmi < 29.9)
      return `• Reduce sugary, fried, and oily foods  
• Walk 30–60 minutes daily  
• Increase fiber-rich foods like vegetables  
• Avoid late-night meals  
• Track daily calorie intake  
• Add a mix of cardio + strength training`;

    return `• Follow a doctor-approved diet plan  
• Limit fast food and sweetened drinks  
• Start with light exercise (walking, cycling)  
• Monitor blood pressure and blood sugar  
• Reduce carbs slowly and avoid overeating  
• Consult a healthcare professional regularly`;
  };

  // ------------------ Convert ft/in to cm ------------------
  const convertFtToCm = () => {
    if (!heightFt && !heightInch) return "";
    const totalInches = Number(heightFt) * 12 + Number(heightInch || 0);
    return (totalInches * 2.54).toFixed(2);
  };

  // ------------------ BMI Calculation ------------------
  const calculateBMI = () => {
    let finalHeight = heightCm;

    if (!heightCm && (heightFt || heightInch)) {
      finalHeight = convertFtToCm();
      setHeightCm(finalHeight);
    }

    if (!name || !email || !finalHeight || !weight) {
      setBmiResult({ error: "Please fill all fields" });
      return;
    }

    const h = finalHeight / 100;
    const bmi = parseFloat((weight / (h * h)).toFixed(2));

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
  };

  // ------------------ Health Calculation ------------------
  const calculateHealth = () => {
    if (!age || !weight || !heightCm) return;

    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * heightCm - 5 * age + 5
        : 10 * weight + 6.25 * heightCm - 5 * age - 161;

    const tdee = bmr * activity;

    const heightM = heightCm / 100;
    const idealWeight = 22 * heightM * heightM;

    const waterIntake = weight * 35; // ml

    const weightDiff = weight - idealWeight;
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

  // ------------------ BMI Ranges ------------------
  const bmiRanges = [
    { category: "Underweight", value: "Below 18.5" },
    { category: "Normal", value: "18.5 – 24.9" },
    { category: "Overweight", value: "25 – 29.9" },
    { category: "Obese", value: "30 and above" },
  ];

  const bmiChartData = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Ranges",
        data: [18.5, 24.9, 29.9, 35],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

const sendEmail = () => {
  if (!bmiResult?.bmi || !healthResult) {
    return alert("Calculate both BMI and Health first!");
  }

  const chartBase64 = chartRef.current?.toBase64Image();

  // ----------------- BMI Category Colors -----------------
  const colors = {
    Underweight: { bg: "#3B82F6", text: "#FFFFFF" },
    Normal: { bg: "#10B981", text: "#FFFFFF" },
    Overweight: { bg: "#F59E0B", text: "#FFFFFF" },
    Obese: { bg: "#EF4444", text: "#FFFFFF" },
  };

  // ----------------- BMI Instructions HTML -----------------
  const bmiInstructionHTML = bmiResult.instruction
    .trim()
    .split("•")
    .filter((line) => line.trim() !== "")
    .map((line) => `<li>${line.trim()}</li>`)
    .join("");

  // ----------------- Health Instructions HTML -----------------
  const healthInstructionHTML = [
    healthResult.weightSuggestion,
    healthResult.waterSuggestion,
    `Follow your TDEE: ${healthResult.tdee} kcal/day`,
    `Ideal Weight Target: ${healthResult.idealWeight} kg`,
    `Recommended Water Intake: ${healthResult.waterIntake} L/day`
  ]
    .map((line) => `<li>${line}</li>`)
    .join("");

  // ----------------- Prepare Template Params -----------------
  const templateParams = {
    to_email: email,
    name: name,
    bmi: bmiResult.bmi,
    category: bmiResult.category,
    categoryColor: colors[bmiResult.category]?.bg || "#10B981",

    // HTML lists for EmailJS
    bmi_instruction_list: `<ol>${bmiInstructionHTML}</ol>`,
    health_instruction_list: `<ol>${healthInstructionHTML}</ol>`,

    // BMI Table Row Colors
    underweightColor: bmiResult.category === "Underweight" ? colors.Underweight.bg : "#FFFFFF",
    underweightText: bmiResult.category === "Underweight" ? colors.Underweight.text : "#374151",
    normalColor: bmiResult.category === "Normal" ? colors.Normal.bg : "#FFFFFF",
    normalText: bmiResult.category === "Normal" ? colors.Normal.text : "#374151",
    overweightColor: bmiResult.category === "Overweight" ? colors.Overweight.bg : "#FFFFFF",
    overweightText: bmiResult.category === "Overweight" ? colors.Overweight.text : "#374151",
    obeseColor: bmiResult.category === "Obese" ? colors.Obese.bg : "#FFFFFF",
    obeseText: bmiResult.category === "Obese" ? colors.Obese.text : "#374151",

    // Chart Image
    chart: chartBase64,

    // Health Info
    tdee: healthResult.tdee,
    idealWeight: healthResult.idealWeight,
    waterIntake: healthResult.waterIntake,
    weightSuggestion: healthResult.weightSuggestion,
    waterSuggestion: healthResult.waterSuggestion
  };

  // ----------------- Send Email -----------------
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





  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">BMI & Health Calculator</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ------------------ BMI ------------------ */}
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>

          <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">BMI Calculator</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            <input type="number" placeholder="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            <div className="flex gap-2">
              <input type="number" placeholder="Height (ft)" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className={`p-2 rounded w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
              <input type="number" placeholder="Inch" value={heightInch} onChange={(e) => setHeightInch(e.target.value)} className={`p-2 rounded w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            </div>
          </div>
          <button onClick={calculateBMI} className="mt-4 w-full bg-blue-600 cursor-pointer py-2 rounded hover:bg-blue-700 text-white">Calculate BMI</button>

          {bmiResult?.bmi && (
            <>
              <p className="mt-2 font-medium">BMI: {bmiResult.bmi} ({bmiResult.category})</p>
              <p className="mt-1 whitespace-pre-line">{bmiResult.instruction}</p>

              <div className="max-w-md mt-4">
                <Bar ref={chartRef} key={bmiResult.bmi} data={bmiChartData}/>
              </div>

              <h2 className="text-xl font-bold mt-6">BMI Range Chart</h2>
              <table className="w-full mt-3 border rounded overflow-hidden">
                <thead>
                  <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-300"} text-left`}>
                    <th className="p-2">Category</th>
                    <th className="p-2">BMI Value</th>
                  </tr>
                </thead>
                <tbody>
                  {bmiRanges.map((r, i) => (
                    <tr key={i} className={`border ${bmiResult.category === r.category ? "bg-green-600 text-white" : darkMode ? "bg-gray-800" : "bg-white"}`}>
                      <td className="p-2">{r.category}</td>
                      <td className="p-2">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* ------------------ Health ------------------ */}
        <div className={`p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <p className="text-2xl font-bold mb-3 md:text-3xl lg:text-3xl">Health Calculator</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 rounded border"/>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 rounded border">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 rounded border col-span-2"/>
            <input type="number" placeholder="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="p-2 rounded border col-span-2"/>
            <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className={`p-2 rounded border col-span-2 ${darkMode ? "text-gray-200 bg-gray-700 border-gray-600" : "text-gray-800 bg-gray-200 border-gray-300"}`}>
              <option value={1.2}>Sedentary (little or no exercise)</option>
              <option value={1.375}>Lightly active (1-3 days/week)</option>
              <option value={1.55}>Moderately active (3-5 days/week)</option>
              <option value={1.725}>Very active (6-7 days/week)</option>
              <option value={1.9}>Extra active (hard exercise daily)</option>
            </select>
          </div>
          <button onClick={calculateHealth} className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 active:scale-95 transition">Calculate Health</button>

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

      {/* ------------------ Email Button ------------------ */}
      <button
        onClick={sendEmail}
        className="mt-6 w-full cursor-pointer bg-green-600 py-2 rounded hover:bg-green-700 text-white"
      >
        Send BMI & Health Info to Email
      </button>

      {/* ------------------ Tools Section ------------------ */}
      <div className="tools mt-6">
        <Tools />
      </div>
    </div>
  );
};

export default HealthAndCalculation;




