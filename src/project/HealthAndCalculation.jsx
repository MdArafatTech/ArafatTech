// HealthAndCalculation.jsx
import React, { useState, useEffect, useMemo } from "react";
import emailjs from "emailjs-com";
import Tools from "./Tools";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Chart.js (Doughnut)
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#f9fafb",
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    marginBottom: 15,
    color: "#1f2937",
    textAlign: "center",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: 8,
  },
  section: {
    marginBottom: 12,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#2563eb",
    marginBottom: 8,
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: 4,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  userInfoItem: {
    flex: 1,
    minWidth: "45%",
    fontSize: 11,
    color: "#374151",
    padding: 4,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    break: "avoid",
  },
  tableCol1: {
    width: "35%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "65%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 4,
    fontSize: 11,
    fontWeight: 500,
  },
  tableCell: {
    margin: 4,
    fontSize: 9,
  },
  categoryHighlight: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    margin: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  footer: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 15,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  flexItem: {
    marginBottom: 8,
  },
});

const PDFReport = ({
  bmiResult,
  healthResult,
  name,
  email,
  age,
  gender,
  weight,
  heightCm,
}) => {
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

        {/* User Info (Mobile Responsive) */}
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
                <Text
                  style={
                    bmiResult?.category === "Normal"
                      ? styles.categoryHighlight
                      : styles.tableCell
                  }
                >
                  {bmiResult?.category}
                </Text>
              </View>
            </View>
          </View>

          {/* Instructions and Range Table (Stacked for Mobile) */}
          <View style={styles.flexContainer}>
            <View style={styles.flexItem}>
              <Text style={styles.tableCell}>Instructions:</Text>
              {bmiResult?.instruction
                ?.split("•")
                .filter((line) => line.trim() !== "")
                .map((line, i) => (
                  <Text key={i} style={styles.tableCell}>
                    • {line.trim()}
                  </Text>
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
                      <Text
                        style={
                          bmiResult?.category === r.category
                            ? styles.categoryHighlight
                            : styles.tableCell
                        }
                      >
                        {r.category}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text
                        style={
                          bmiResult?.category === r.category
                            ? styles.categoryHighlight
                            : styles.tableCell
                        }
                      >
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
                <Text style={styles.tableCell}>
                  {healthResult?.tdee} kcal/day
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>Ideal Weight</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {healthResult?.idealWeight} kg
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCellHeader}>Water Intake</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {healthResult?.waterIntake} L/day
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.tableCell}>Suggestions:</Text>
          <Text style={styles.tableCell}>
            • {healthResult?.weightSuggestion}
          </Text>
          <Text style={styles.tableCell}>
            • {healthResult?.waterSuggestion}
          </Text>
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
    const w = Number(weight);
    const h = Number(heightCm);

    // Only validate weight & height
    if (!h || !w) {
      setBmiResult({ error: "Please enter weight and height" });
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
    responsive: true,
    maintainAspectRatio: false,
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

  const isFormComplete = !!(
    bmiResult?.bmi &&
    healthResult &&
    name &&
    email &&
    age &&
    gender &&
    weight &&
    heightCm
  );

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className="p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl 
                bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl 
                transition-all duration-300 max-w-7xl mx-auto"
      >
        <div className="mb-6 text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold
             text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700
             drop-shadow-2xl"
          >
            <span>BMI</span> & Health <span>Calculator</span>
          </h1>
        </div>

        {/* User Info (Mobile First) */}
        <div
          className={`mb-6 p-4 sm:p-6 rounded-2xl border shadow-xl ${
            darkMode
              ? "bg-gray-800/90 border-gray-700/50 backdrop-blur-xl"
              : "bg-white/90 border-gray-200/50 backdrop-blur-xl"
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">
            User Information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className={`mb-2 font-semibold text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                id="fullName"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-cyan-300/50 ${
                  darkMode
                    ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                    : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={`mb-2 font-semibold text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-cyan-300/50 ${
                  darkMode
                    ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                    : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                }`}
              />
            </div>
          </div>

          <div
            className={`mt-4 p-4 rounded-xl border-l-4 shadow-lg ${
              darkMode
                ? "bg-gray-800/80 border-blue-400/50 text-gray-300"
                : "bg-blue-50/80 border-blue-500/50 text-gray-700"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <span className="text-blue-500 text-lg flex-shrink-0">ℹ️</span>
              <p className="text-sm sm:text-base font-medium text-left">
                To{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  download your BMI & health report
                </span>
                , enter your <span className="font-bold">name</span> and{" "}
                <span className="font-bold">email address</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* BMI Calculator - Mobile Full Width */}
          <div
            className={`p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              darkMode
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/90 border-gray-200/50"
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              BMI Calculator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {/* Weight Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="weight"
                  className={`mb-2 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-cyan-300/50 ${
                    darkMode
                      ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                      : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                  }`}
                />
              </div>

              {/* Height in cm */}
              <div className="flex flex-col">
                <label
                  htmlFor="heightCm"
                  className={`mb-2 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Height (cm)
                </label>
                <input
                  id="heightCm"
                  type="number"
                  placeholder="Enter height in cm"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-cyan-300/50 ${
                    darkMode
                      ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                      : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                  }`}
                />
              </div>
            </div>

            {/* Height in ft + Convert Button - Full Width on Mobile */}
            <div className="flex flex-col gap-3 mb-6">
              <label
                htmlFor="heightFt"
                className={`font-semibold text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Height (ft)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="heightFt"
                  type="number"
                  placeholder="Enter height in ft"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className={`flex-1 p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-cyan-300/50 ${
                    darkMode
                      ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                      : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                  }`}
                />
                <button
                  onClick={handleConvert}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base cursor-pointer rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl active:scale-95 transition-all duration-200 shadow-xl border border-blue-400/50 font-semibold flex items-center justify-center whitespace-nowrap"
                >
                  Convert to cm
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={calculateBMI}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer text-base sm:text-lg rounded-2xl hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 font-semibold border border-blue-400/50"
              >
                Calculate BMI
              </button>
              <button
                onClick={() => {
                  setBmiResult(null);
                  setShowChart(false);
                }}
                className="py-4 px-6 rounded-2xl cursor-pointer text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 font-semibold border border-gray-400/50 bg-gradient-to-r from-red-500 to-red-600  hover:from-gray-700 hover:to-gray-800 w-full sm:w-auto"
              >
                Reset BMI
              </button>
            </div>

            {bmiResult?.error && (
              <div className="mt-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-500 text-red-800 dark:text-red-200 text-sm">
                {bmiResult.error}
              </div>
            )}

            {/* BMI Result & Instructions */}
            {bmiResult?.bmi && (
              <>
                <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200/50 dark:border-blue-500/50">
                  <div className="text-center mb-4">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-wider">
                      {bmiResult.bmi}
                    </p>
                    <p className="text-lg sm:text-xl font-bold capitalize text-blue-700 dark:text-blue-300 mt-1">
                      {bmiResult.category}
                    </p>
                  </div>
                  <div className="text-sm sm:text-base whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {bmiResult.instruction}
                  </div>
                </div>

                {/* Chart + Range Table - Mobile Stacked */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div
                    className={`p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center ${
                      darkMode
                        ? "bg-gray-900/80 border border-gray-700/50"
                        : "bg-white/90 border border-gray-200/50"
                    }`}
                  >
                    <div className="w-48 sm:w-52 md:w-64 h-48 sm:h-52 md:h-64 flex-shrink-0">
                      <Doughnut data={chartData} options={chartOptions} />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg sm:text-xl font-bold">
                        BMI: <span className="text-2xl">{bmiResult.bmi}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {bmiResult.category}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Scale max: 40
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 sm:p-6 rounded-2xl shadow-2xl border backdrop-blur-xl ${
                      darkMode
                        ? "bg-gray-900/80 border-gray-700/50"
                        : "bg-white/90 border-gray-200/50"
                    }`}
                  >
                    <h4 className="font-bold text-lg sm:text-xl mb-4 bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
                      BMI Ranges
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 dark:border-gray-600">
                            <th className="text-left pb-3 font-semibold">
                              Category
                            </th>
                            <th className="text-left pb-3 font-semibold pl-4">
                              Range
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bmiRanges.map((r) => {
                            const isActive = bmiResult?.category === r.category;
                            return (
                              <tr
                                key={r.category}
                                className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                  isActive
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                    : ""
                                }`}
                              >
                                <td
                                  className={`py-3 pr-4 font-semibold ${
                                    isActive
                                      ? ""
                                      : "text-gray-900 dark:text-gray-100"
                                  }`}
                                >
                                  {r.category}
                                </td>
                                <td
                                  className={`py-3 ${
                                    isActive
                                      ? "font-semibold"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {r.range}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Health Calculator - Mobile Full Width */}
          <div
            className={`p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              darkMode
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/90 border-gray-200/50"
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Health Calculator
            </h2>

            <div className="space-y-4 mb-6">
              {/* Age & Gender - Mobile Stacked */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="age"
                    className={`mb-2 font-semibold text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-emerald-300/50 ${
                      darkMode
                        ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                        : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="gender"
                    className={`mb-2 font-semibold text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-emerald-300/50 cursor-pointer ${
                      darkMode
                        ? "text-gray-200 bg-gray-700/80 backdrop-blur-sm border-white/20"
                        : "text-gray-800 bg-white/80 backdrop-blur-sm border-gray-200/50"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Weight & Height - Mobile Stacked */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="weight-health"
                    className={`mb-2 font-semibold text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Weight (kg)
                  </label>
                  <input
                    id="weight-health"
                    type="number"
                    placeholder="Enter weight in kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-emerald-300/50 ${
                      darkMode
                        ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                        : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="heightCm-health"
                    className={`mb-2 font-semibold text-sm sm:text-base ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Height (cm)
                  </label>
                  <input
                    id="heightCm-health"
                    type="number"
                    placeholder="Enter height in cm"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-emerald-300/50 ${
                      darkMode
                        ? "bg-gray-700/80 text-white backdrop-blur-sm border-white/20"
                        : "bg-white/80 text-gray-900 backdrop-blur-sm border-gray-200/50"
                    }`}
                  />
                </div>
              </div>

              {/* Activity Level - Full Width */}
              <div className="flex flex-col">
                <label
                  htmlFor="activity"
                  className={`mb-2 font-semibold text-sm sm:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Activity Level
                </label>
                <select
                  id="activity"
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                  className={`p-3 sm:p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:shadow-2xl border border-emerald-300/50 cursor-pointer ${
                    darkMode
                      ? "text-gray-200 bg-gray-700/80 backdrop-blur-sm border-white/20"
                      : "text-gray-800 bg-white/80 backdrop-blur-sm border-gray-200/50"
                  }`}
                >
                  <option value={1.2}>Sedentary (little or no exercise)</option>
                  <option value={1.375}>Lightly active (1-3 days/week)</option>
                  <option value={1.55}>
                    Moderately active (3-5 days/week)
                  </option>
                  <option value={1.725}>Very active (6-7 days/week)</option>
                  <option value={1.9}>
                    Extra active (hard exercise daily)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={calculateHealth}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 cursor-pointer text-base sm:text-lg rounded-2xl hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 font-semibold border border-emerald-400/50"
              >
                Calculate Health
              </button>
              <button
                onClick={() => setHealthResult(null)}
                className="py-4 px-6 rounded-2xl cursor-pointer  text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 font-semibold border border-gray-400/50 bg-gradient-to-r from-red-500 to-red-600 hover:from-gray-700 hover:to-gray-800 w-full sm:w-auto"
              >
                Reset
              </button>
            </div>

            {/* Health Results - Mobile Responsive Cards */}
            {healthResult && (
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white text-center backdrop-blur-xl border border-green-300/50">
                    <h3 className="text-lg font-bold mb-2">TDEE</h3>
                    <p className="text-2xl sm:text-3xl font-black">
                      {healthResult.tdee}
                    </p>
                    <p className="text-sm opacity-90 mt-1">kcal/day</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-center backdrop-blur-xl border border-blue-300/50">
                    <h3 className="text-lg font-bold mb-2">Ideal Weight</h3>
                    <p className="text-2xl sm:text-3xl font-black">
                      {healthResult.idealWeight}
                    </p>
                    <p className="text-sm opacity-90 mt-1">kg</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white text-center backdrop-blur-xl border border-cyan-300/50">
                    <h3 className="text-lg font-bold mb-2">Water Intake</h3>
                    <p className="text-2xl sm:text-3xl font-black">
                      {healthResult.waterIntake}
                    </p>
                    <p className="text-sm opacity-90 mt-1">L/day</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-2xl backdrop-blur-xl border border-yellow-300/50">
                  <h4 className="text-xl font-bold mb-4">
                    Suggestions & Review
                  </h4>
                  <div className="space-y-3 text-lg">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                      <span className="text-2xl mt-0.5">⚖️</span>
                      <p>{healthResult.weightSuggestion}</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                      <span className="text-2xl mt-0.5">💧</span>
                      <p>{healthResult.waterSuggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email & PDF Buttons - Mobile Stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="relative group">
            <button
              onClick={isFormComplete ? sendEmail : undefined}
              disabled={!isFormComplete}
              className={`w-full py-4 px-6 rounded-2xl text-white transition-all duration-200 shadow-2xl hover:shadow-3xl active:scale-95 font-semibold border ${
                isFormComplete
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 cursor-pointer border-emerald-400/50"
                  : "bg-emerald-400/70 cursor-not-allowed opacity-60 border-emerald-300/30"
              }`}
            >
              📧 Send to Email
            </button>

            {!isFormComplete && (
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                <div className="px-4 py-2 text-xs rounded-xl shadow-2xl bg-gradient-to-r from-red-600 to-red-500 text-white whitespace-nowrap">
                  ⚠️ Complete all fields first
                </div>
                <div className="w-3 h-3 bg-red-500 rotate-45 -mt-2 mx-auto"></div>
              </div>
            )}
          </div>

          <div className="relative group">
            {isFormComplete ? (
              <PDFDownloadLink
                className="w-full py-4 px-6 rounded-2xl text-center shadow-2xl hover:shadow-3xl active:scale-95 transition-all duration-200 font-semibold border bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-red-400/50 block no-underline"
                document={
                  <PDFReport
                    bmiResult={bmiResult}
                    healthResult={healthResult}
                    name={name}
                    email={email}
                    age={age}
                    gender={gender}
                    weight={weight}
                    heightCm={heightCm}
                  />
                }
                fileName="BMI_Health_Report.pdf"
              >
                {({ loading }) => (
                  <span>
                    {loading ? "⏳ Preparing PDF..." : "📥 Download PDF Report"}
                  </span>
                )}
              </PDFDownloadLink>
            ) : (
              <button
                disabled
                className="w-full py-4 px-6 rounded-2xl bg-red-400/70 text-white cursor-not-allowed shadow-xl border border-red-300/30 opacity-60 font-semibold"
              >
                📥 Download PDF Report
              </button>
            )}

            {!isFormComplete && (
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                <div className="px-4 py-2 text-xs rounded-xl shadow-2xl bg-gradient-to-r from-red-500 to-red-600 text-white whitespace-nowrap">
                  ⚠️ Complete all fields first
                </div>
                <div className="w-3 h-3 bg-red-500 rotate-45 -mt-2 mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tools Section - Full Width Mobile */}
      <div className="mt-8 mx-1 md:mx-[4%] lg:mx-[6%] sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent text-center">
          🛠️ Useful Tools & Utilities
        </h2>

        <div className="max-w-4xl mx-auto space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-center">
            Explore our comprehensive suite of tools designed to simplify
            calculations, conversions, and professional tasks. Perfect for
            students, professionals, and enthusiasts.
          </p>

          <p className="text-center">
            Includes unit converters, advanced calculators, physics & chemistry
            utilities. Fully optimized for mobile and desktop with instant local
            computation.
          </p>

          <div className="text-center p-4 bg-blue-50/50 dark:bg-blue-900/30 rounded-2xl border border-blue-200/50 dark:border-blue-500/50">
            <span className="font-bold text-blue-700 dark:text-blue-300 text-lg">
              💡
            </span>
            <p className="mt-2 font-semibold">
              All calculations run locally - your privacy is protected!
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Tools />
        </div>
      </div>
    </div>
  );
};

export default HealthAndCalculation;
