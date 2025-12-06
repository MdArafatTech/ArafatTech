import React, { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import emailjs from "emailjs-com";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Calculation = () => {
  // ------------------ Dark/Light Mode ------------------
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const listener = (e) => setDarkMode(e.matches);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    return () =>
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
  }, []);

  // ------------------ BMI Calculator ------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const chartRef = useRef(null);

  const getBMIInstruction = (bmi) => {
    if (bmi < 18.5) return "Underweight: Consider a balanced diet to gain healthy weight.";
    if (bmi < 24.9) return "Normal: Keep up your healthy lifestyle!";
    if (bmi < 29.9) return "Overweight: Try regular exercise and a balanced diet.";
    return "Obese: Consult a healthcare professional for guidance.";
  };

  const calculateBMI = () => {
    if (!name || !email || !weight || !height) {
      setBmiResult({ error: "Please fill all fields" });
      return;
    }
    const h = height / 100;
    const bmi = parseFloat((weight / (h * h)).toFixed(2));
    setBmiResult({
      bmi,
      category:
        bmi < 18.5
          ? "Underweight"
          : bmi < 24.9
          ? "Normal"
          : bmi < 29.9
          ? "Overweight"
          : "Obese",
      instruction: getBMIInstruction(bmi),
    });
  };

  const sendEmail = () => {
    if (!bmiResult?.bmi) return alert("Calculate BMI first!");

    const chartBase64 = chartRef.current?.toBase64Image();

    const templateParams = {
      to_email: email,
      name,
      bmi: bmiResult.bmi,
      category: bmiResult.category,
      instruction: bmiResult.instruction,
      chart: chartBase64,
    };

    emailjs
      .send("service_fel2b38", "template_oso5p1n", templateParams, "-dm5gWB-Fz--QlTIN")
      .then(() => alert("Email sent successfully!"))
      .catch((err) => alert("Email sending failed: " + err.text));
  };

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

  // ------------------ Scientific Calculator ------------------
  const [calcInput, setCalcInput] = useState("");

  const handleCalcInput = (val) => setCalcInput(calcInput + val);
  const calculate = () => {
    try {
      setCalcInput(evaluate(calcInput).toString());
    } catch {
      setCalcInput("Error");
    }
  };
  const clearCalc = () => setCalcInput("");

  const calcButtons = [
    "7","8","9","/","sqrt(",
    "4","5","6","*","^",
    "1","2","3","-","0",
    ".","=","+","C","(",
    ")","sin(","cos(","tan(","log(","ln(","exp(","!"
  ];

  const btnStyle = (btn) => {
    if ("0123456789.".includes(btn)) return "bg-gray-300 hover:bg-gray-400 text-black";
    if ("+-*/^".includes(btn)) return "bg-orange-500 hover:bg-orange-600 text-white";
    if (["sin(", "cos(", "tan(", "log(", "ln(", "sqrt(", "exp(", "!", "(", ")"].includes(btn))
      return "bg-blue-500 hover:bg-blue-600 text-white";
    if (btn === "=") return "bg-green-600 hover:bg-green-700 text-white";
    if (btn === "C") return "bg-red-600 hover:bg-red-700 text-white";
  };

  // ------------------ Unit Converter ------------------
  const [unitType, setUnitType] = useState("physics");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");

  const conversions = {
    physics: {
      length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, µm: 1e-6, nm: 1e-9, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254, nmi: 1852 },
      mass: { kg: 1, g: 0.001, mg: 1e-6, t: 1000, lb: 0.453592, oz: 0.0283495, st: 6.35029 },
      time: { s: 1, min: 60, h: 3600, day: 86400, week: 604800, month: 2.628e6, year: 3.154e7 },
      temperature: { C: "C", F: "F", K: "K" },
      volume: { m3: 1, L: 0.001, mL: 1e-6, cm3: 1e-6, gal: 0.00378541, qt: 0.000946353, pt: 0.000473176, cup: 0.000236588 },
      speed: { "m/s": 1, "km/h": 0.277778, "mph": 0.44704, knot: 0.514444 },
      area: { "m2": 1, "km2": 1e6, ha: 10000, acre: 4046.86, mi2: 2.59e6, yd2: 0.836127, ft2: 0.092903, in2: 0.00064516 },
      energy: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3.6e6, eV: 1.602e-19 },
      pressure: { Pa: 1, kPa: 1000, bar: 1e5, atm: 101325, torr: 133.322, psi: 6894.76 },
      force: { N: 1, kgf: 9.80665, lbf: 4.44822 },
      power: { W: 1, kW: 1000, hp: 745.7 },
      data: { b: 1, B: 8, KB: 8192, MB: 8.192e6, GB: 8.192e9, TB: 8.192e12 },
    },
    chemistry: {
      amount: { mol: 1, mmol: 0.001, µmol: 1e-6 },
      concentration: { M: 1, m: 1, N: 1, "%": 0.01, ppm: 1e-6, ppb: 1e-9 },
      mass: { g: 1, mg: 0.001, µg: 1e-6, kg: 1000 },
      volume: { L: 1, mL: 0.001, cm3: 0.001 },
      pressure: { atm: 101325, Pa: 1, torr: 133.322, bar: 1e5, psi: 6894.76 },
      temperature: { C: "C", K: "K", F: "F" },
      energy: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184 },
      density: { "g/cm3": 1, "g/mL": 1, "kg/m3": 0.001 },
      rate: { "mol/(L*s)": 1, "mol/(L*min)": 1/60 },
      misc: { F: 96485, eq: 1, amu: 1 },
    },
  };

  const convertUnit = () => {
    if (!unitValue || !fromUnit || !toUnit) return;
    if (category === "temperature") {
      let val = parseFloat(unitValue), result;
      if (fromUnit === "C") result = toUnit==="F"? val*9/5+32:val+273.15;
      else if (fromUnit==="F") result = toUnit==="C"? (val-32)*5/9:(val-32)*5/9+273.15;
      else result = toUnit==="C"? val-273.15:(val-273.15)*9/5+32;
      setConvertedValue(result.toFixed(4)); return;
    }
    const factor = conversions[unitType][category][fromUnit]/conversions[unitType][category][toUnit];
    setConvertedValue((unitValue*factor).toFixed(6));
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Calculation Tools</h1>
        <button onClick={()=>setDarkMode(!darkMode)} className={`px-4 py-2 rounded ${darkMode?"bg-gray-700":"bg-gray-300"}`}>
          {darkMode?"Light Mode":"Dark Mode"}
        </button>
      </div>

      {/* ================= BMI ================= */}
      <div className={`p-6 rounded-lg shadow-md ${darkMode?"bg-gray-800":"bg-white"} mb-6`}>
        <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`} />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`} />
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={e=>setWeight(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`} />
          <input type="number" placeholder="Height (cm)" value={height} onChange={e=>setHeight(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`} />
        </div>
        <button onClick={calculateBMI} className="mt-4 w-full bg-blue-600 py-2 rounded hover:bg-blue-700 text-white">Calculate BMI</button>
        {bmiResult?.bmi && (
          <>
            <p className="mt-2 font-medium">BMI: {bmiResult.bmi} ({bmiResult.category})</p>
            <p className="mt-1">{bmiResult.instruction}</p>
            <div className="max-w-md mt-4"><Bar ref={chartRef} key={bmiResult.bmi} data={bmiChartData} /></div>
            <button onClick={sendEmail} className="mt-4 w-full bg-green-600 py-2 rounded hover:bg-green-700 text-white">Send Result to Email</button>
          </>
        )}
        {bmiResult?.error && <p className="mt-2 font-medium">{bmiResult.error}</p>}
      </div>

      {/* ================= Scientific Calculator ================= */}
      <div className={`p-4 md:p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
        <h2 className="text-xl font-semibold mb-4">Scientific Calculator</h2>
        <div className={`rounded mb-2 p-3 text-right font-mono text-lg md:text-xl ${darkMode ? "bg-gray-900 text-green-400" : "bg-gray-200 text-black"} shadow-inner`}>
          {calcInput || "0"}
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
          {calcButtons.map((btn) => (
            <button
              key={btn}
              onClick={() =>
                btn === "=" ? calculate() : btn === "C" ? clearCalc() : handleCalcInput(btn)
              }
              className={`p-3 md:p-4 rounded-lg font-bold text-lg md:text-xl ${btnStyle(btn)} transition transform active:scale-95 shadow-md hover:shadow-lg ${darkMode ? "shadow-black/50" : "shadow-gray-400"}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Unit Converter ================= */}
      <div className={`p-6 rounded-lg shadow-md ${darkMode?"bg-gray-800":"bg-white"} mb-6`}>
        <h2 className="text-xl font-semibold mb-4">Unit Converter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={unitType} onChange={e=>{setUnitType(e.target.value); setCategory(Object.keys(conversions[e.target.value])[0]);}} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`}>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`}>
            {Object.keys(conversions[unitType]).map(cat=><option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" placeholder="Value" value={unitValue} onChange={e=>setUnitValue(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <select value={fromUnit} onChange={e=>setFromUnit(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`}>
            {Object.keys(conversions[unitType][category]).map(u=><option key={u} value={u}>{u}</option>)}
          </select>
          <select value={toUnit} onChange={e=>setToUnit(e.target.value)} className={`p-2 rounded ${darkMode?"bg-gray-700":"bg-gray-200"}`}>
            {Object.keys(conversions[unitType][category]).map(u=><option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <button onClick={convertUnit} className="mt-4 w-full bg-green-600 py-2 rounded hover:bg-green-700 text-white">Convert</button>
        {convertedValue && <p className="mt-2 font-medium">Result: {convertedValue}</p>}
      </div>
    </div>
  );
};

export default Calculation;
