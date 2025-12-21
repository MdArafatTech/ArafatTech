import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const Tools = () => {
  // Dark Mode auto-detect + manual toggle
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setDarkMode(e.matches);
    matchMedia.addEventListener("change", handler);
    return () => matchMedia.removeEventListener("change", handler);
  }, []);

  // Calculator State
  const [calcInput, setCalcInput] = useState("");
  const [isScientific, setIsScientific] = useState(true);
  const [isDegreeMode, setIsDegreeMode] = useState(true);

  const handleCalcInput = (val) => setCalcInput((prev) => prev + val);
  const clearCalc = () => setCalcInput("");
  const deleteLastChar = () => setCalcInput((prev) => prev.slice(0, -1));

  const preprocessInput = (input) => {
    let str = input
      .replace(/π/g, "pi")
      .replace(/e/g, "e")
      .replace(/√\(/g, "sqrt(")
      .replace(/∛\(/g, "cbrt(")
      .replace(/²/g, "^2")
      .replace(/³/g, "^3")
      .replace(/x²/g, "^2")
      .replace(/x³/g, "^3");

    if (isDegreeMode) {
      const degToRad = (val) => `(${val} * pi / 180)`;
      str = str.replace(/sin\(([^)]+)\)/g, (_, v) => `sin(${degToRad(v)})`);
      str = str.replace(/cos\(([^)]+)\)/g, (_, v) => `cos(${degToRad(v)})`);
      str = str.replace(/tan\(([^)]+)\)/g, (_, v) => `tan(${degToRad(v)})`);
    }

    return str;
  };

  const calculate = () => {
    try {
      const processed = preprocessInput(calcInput);
      const result = evaluate(processed);
      setCalcInput(
        Number.isFinite(result)
          ? Number.isInteger(result)
            ? result.toString()
            : result.toFixed(8).replace(/\.?0+$/, "")
          : "Error"
      );
    } catch {
      setCalcInput("Error");
    }
  };

const simpleButtons = [
  "C", "DEL", "7", "8", "9",
  "4", "5", "6", "/", "*",
  "1", "2", "3", "+", "-",
  "0", ".", "=",
];

const scientificButtons = [
  // Row 1: Top controls and constants/factorial
  "C", "DEL", "DEG/RAD", "π", "e", "!",
  // Row 2: Powers, roots, reciprocal, general power
  "²", "³", "√", "∛", "1/", "^",
  // Row 3: Trigonometric functions
  "sin(", "cos(", "tan(", "sinh(", "cosh(", "tanh(",
  // Row 4: Inverse trig / logs / exponents
  "asin(", "acos(", "atan(", "log(", "ln(", "e^",
  // Row 5: Parentheses and base-10 power + start of numbers
  "(", ")", "10^", "7", "8", "9",
  // Row 6: Division and multiplication on right
  "/","*", "6", "5", "4",  "-",
  // Row 7: Addition, equals, decimal, and bottom numbers
  "+", ".", "1", "2",  "=","3",
  // Row 8: Zero (often spans multiple columns in UI)
  "0"  // Place this spanning 2-3 columns in your grid layout if needed
];

  const getRealistic3DButtonClasses = (btn) => {
    const base = `
      group relative overflow-hidden font-bold font-mono tracking-wider
      rounded-2xl h-14 sm:h-16 lg:h-18 w-full aspect-square
      shadow-2xl hover:shadow-3xl active:shadow-xl
      active:scale-[0.96] active:translate-y-1
      transition-all duration-150 ease-out
      focus:outline-none focus:ring-4 focus:ring-blue-500/30
      cursor-pointer select-none touch-manipulation
      before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/20 before:to-transparent
      after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/15 after:to-transparent
      border-2 border-black/20 dark:border-white/20
    `;

    const isEquals = btn === "=";
    const isOperator = ["+", "-", "*", "/"].includes(btn);
    const isAction = ["C", "DEL", "DEG/RAD"].includes(btn);
    const isScientific = [
      "sin(", "cos(", "tan(", "asin(", "acos(", "atan(",
      "log(", "ln(", "sinh(", "cosh(", "tanh(", "!", "√", "∛",
      "²", "³", "^", "10^", "e^", "1/", "π", "e"
    ].includes(btn);

    let style = btn === "0" ? " col-span-2 rounded-3xl " : "";

    if (isEquals) {
      style += darkMode
        ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white hover:from-emerald-700 hover:to-emerald-900"
        : "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white hover:from-emerald-600 hover:to-emerald-800";
    } else if (isOperator) {
      style += darkMode
        ? "bg-gradient-to-br from-orange-600 to-red-700 text-white hover:from-orange-700 hover:to-red-800"
        : "bg-gradient-to-br from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700";
    } else if (isAction) {
      style += darkMode
        ? "bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-gray-950"
        : "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 hover:from-gray-400 hover:to-gray-600";
    } else if (isScientific) {
      style += darkMode
        ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800"
        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700";
    } else {
      style += darkMode
        ? "bg-gradient-to-br from-gray-800 to-gray-950 text-gray-100 hover:from-gray-700 hover:to-gray-900"
        : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900 hover:from-gray-200 hover:to-gray-400";
    }

    return `${base} ${style}`;
  };

  // Unit Converter State
  const [unitType, setUnitType] = useState("physics");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [history, setHistory] = useState([]);

  const conversions = {
    physics: {
      length: {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        µm: 1e-6,
        nm: 1e-9,
        mi: 1609.34,
        yd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
        nmi: 1852,
      },
      mass: {
        kg: 1,
        g: 0.001,
        mg: 1e-6,
        µg: 1e-9,
        t: 1000,
        lb: 0.453592,
        oz: 0.0283495,
        st: 6.35029,
      },
      time: {
        s: 1,
        ms: 0.001,
        min: 60,
        h: 3600,
        day: 86400,
        week: 604800,
        month: 2.628e6,
        year: 3.154e7,
      },
      temperature: { C: "C", F: "F", K: "K" },
      volume: {
        m3: 1,
        L: 0.001,
        mL: 1e-6,
        cm3: 1e-6,
        gal: 0.00378541,
        qt: 0.000946353,
        pt: 0.000473176,
        cup: 0.000236588,
      },
      speed: {
        "m/s": 1,
        "km/h": 0.277778,
        mph: 0.44704,
        knot: 0.514444,
        fps: 0.3048,
      },
      area: {
        m2: 1,
        km2: 1e6,
        ha: 10000,
        acre: 4046.86,
        mi2: 2.59e6,
        yd2: 0.836127,
        ft2: 0.092903,
        in2: 0.00064516,
      },
      energy: {
        J: 1,
        kJ: 1000,
        cal: 4.184,
        kcal: 4184,
        Wh: 3600,
        kWh: 3.6e6,
        eV: 1.602e-19,
        erg: 1e-7,
      },
      pressure: {
        Pa: 1,
        kPa: 1000,
        bar: 1e5,
        atm: 101325,
        torr: 133.322,
        psi: 6894.76,
        mmHg: 133.322,
      },
      force: { N: 1, kN: 1000, kgf: 9.80665, lbf: 4.44822, dyne: 0.00001 },
      power: { W: 1, kW: 1000, hp: 745.7, "Btu/h": 0.293071 },
      data: {
        b: 1,
        B: 8,
        KB: 8192,
        MB: 8.388608e6,
        GB: 8.589934592e9,
        TB: 8.796093022208e12,
      },
    },
    chemistry: {
      amount: { mol: 1, mmol: 0.001, µmol: 1e-6, nmol: 1e-9 },
      concentration: {
        M: 1,
        mM: 0.001,
        µM: 1e-6,
        nM: 1e-9,
        "%": 0.01,
        ppm: 1e-6,
        ppb: 1e-9,
      },
      mass: { g: 1, mg: 0.001, µg: 1e-6, ng: 1e-9, kg: 1000 },
      volume: { L: 1, mL: 0.001, µL: 1e-6, cm3: 0.001 },
      pressure: {
        atm: 101325,
        Pa: 1,
        torr: 133.322,
        bar: 1e5,
        psi: 6894.76,
        mmHg: 133.322,
      },
      temperature: { C: "C", K: "K", F: "F" },
      energy: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, eV: 1.602e-19 },
      density: { "g/cm3": 1, "g/mL": 1, "kg/m3": 0.001, "g/L": 0.001 },
      rate: { "mol/(L*s)": 1, "mol/(L*min)": 1 / 60, "mol/(L*h)": 1 / 3600 },
      misc: { F: 96485, eq: 1, amu: 1.660539e-27 },
    },
  };

  const convertUnit = () => {
    if (!unitValue || !fromUnit || !toUnit) return;
    let result;
    const val = parseFloat(unitValue);

    if (category === "temperature") {
      if (fromUnit === "C") {
        if (toUnit === "F") result = (val * 9) / 5 + 32;
        else if (toUnit === "K") result = val + 273.15;
        else result = val;
      } else if (fromUnit === "F") {
        if (toUnit === "C") result = ((val - 32) * 5) / 9;
        else if (toUnit === "K") result = ((val - 32) * 5) / 9 + 273.15;
        else result = val;
      } else if (fromUnit === "K") {
        if (toUnit === "C") result = val - 273.15;
        else if (toUnit === "F") result = ((val - 273.15) * 9) / 5 + 32;
        else result = val;
      }
    } else {
      const factor =
        conversions[unitType][category][fromUnit] /
        conversions[unitType][category][toUnit];
      result = val * factor;
    }

    const finalResult = `${result.toFixed(6).replace(/\.?0+$/, "")} ${toUnit}`;
    setConvertedValue(finalResult);
    setHistory((prev) => [
      ...prev.slice(-5),
      `${unitValue} ${fromUnit} → ${finalResult}`,
    ]);
  };

  const speakResult = () => {
    if (convertedValue && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(`Result is ${convertedValue}`);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto ">
        {/* Calculator */}
        <div
          className={`${
            darkMode ? "bg-gray-900/90" : "bg-white/90"
          } backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50`}
        >
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            🧮 Calculator
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex gap-3">
          
              <button
                onClick={() => setIsScientific(!isScientific)}
                className="px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200"
              >
                {isScientific ? "Simple" : "Scientific"}
              </button>
            </div>
          </div>

        <div
  className={`${
    darkMode ? "bg-gray-800/80" : "bg-gray-100/80"
  } rounded-3xl mb-8 p-6 text-3xl font-mono text-right shadow-inner border border-gray-600/50 dark:border-gray-500/50 backdrop-blur-md
    overflow-x-auto overflow-y-hidden whitespace-nowrap
    scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent`}
>
  <span className="inline-block min-w-full">
    {calcInput || "0"}
  </span>
</div>

          <div
            className={`grid ${
              isScientific ? "grid-cols-5" : "grid-cols-4"
            } gap-3 sm:gap-4`}
          >
            {(isScientific ? scientificButtons : simpleButtons).map((btn, index) => (
              <button
                key={`${btn}-${index}`}
                onClick={() =>
                  btn === "="
                    ? calculate()
                    : btn === "C"
                    ? clearCalc()
                    : btn === "DEL"
                    ? deleteLastChar()
                    : btn === "DEG/RAD"
                    ? setIsDegreeMode(!isDegreeMode)
                    : handleCalcInput(btn)
                }
                className={getRealistic3DButtonClasses(btn)}
              >
                {btn === "DEG/RAD" ? (isDegreeMode ? "DEG" : "RAD") : btn}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Converter */}
        <div
          className={`${
            darkMode ? "bg-gray-900/90" : "bg-white/90"
          } backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50`}
        >
          <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            🔄 Unit Converter
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Type</label>
                <select
                  value={unitType}
                  onChange={(e) => {
                    setUnitType(e.target.value);
                    setCategory(Object.keys(conversions[e.target.value])[0]);
                    setFromUnit("");
                    setToUnit("");
                  }}
                  className={`w-full p-4 rounded-2xl font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                    darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                  } border`}
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setFromUnit("");
                    setToUnit("");
                  }}
                  className={`w-full p-4 rounded-2xl font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all ${
                    darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                  } border`}
                >
                  {Object.keys(conversions[unitType] || {}).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, " $1")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Value</label>
                <input
                  type="number"
                  value={unitValue}
                  onChange={(e) => setUnitValue(e.target.value)}
                  placeholder="0"
                  className={`w-full p-4 rounded-2xl font-mono text-right shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                  } border`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className={`p-4 rounded-2xl font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
                  darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                } border`}
              >
                <option value="">From</option>
                {Object.keys(conversions[unitType][category] || {}).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>

              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className={`p-4 rounded-2xl font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                  darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
                } border`}
              >
                <option value="">To</option>
                {Object.keys(conversions[unitType][category] || {}).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <button
              onClick={convertUnit}
              className="w-full py-5 px-8 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl active:scale-95 transition-all duration-200 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white"
            >
              🔄 Convert
            </button>

            {convertedValue && (
              <div
                className={`p-6 rounded-3xl shadow-2xl backdrop-blur-xl border-2 ${
                  darkMode
                    ? "bg-gradient-to-r from-emerald-900/90 to-green-900/90 text-emerald-100 border-emerald-500/60"
                    : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 border-emerald-400/70"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm opacity-75 mb-2">Result</p>
                    <p className="font-mono font-black text-2xl sm:text-3xl break-all">
                      {convertedValue}
                    </p>
                  </div>
                  <button
                    onClick={speakResult}
                    className={`p-4 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl active:scale-95 transition-all ${
                      darkMode ? "bg-white/20 hover:bg-white/40" : "bg-white/50 hover:bg-white/70"
                    }`}
                    title="Speak result"
                  >
                    🔊
                  </button>
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div
                className={`max-h-64 overflow-y-auto p-4 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-xl ${
                  darkMode ? "bg-gray-800/80 border-gray-700/50" : "bg-white/70 border-gray-200/50"
                } border`}
              >
                <h3 className="font-black text-xl mb-4 bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                  📜 History (last 5)
                </h3>
                <div className="space-y-3">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl text-sm sm:text-base shadow-md ${
                        darkMode ? "bg-gray-700/50" : "bg-white/60"
                      } border-l-4 border-blue-400`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;