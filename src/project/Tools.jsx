import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const Tools = () => {
  // Dark/Light Mode Auto Detect
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(matchMedia.matches);
    const handler = (e) => setDarkMode(e.matches);
    matchMedia.addEventListener("change", handler);
    return () => matchMedia.removeEventListener("change", handler);
  }, []);

  // Calculator
  const [calcInput, setCalcInput] = useState("");
  const [isScientific, setIsScientific] = useState(false);

  const handleCalcInput = (val) => setCalcInput(calcInput + val);
  const clearCalc = () => setCalcInput("");
  const deleteLastChar = () => setCalcInput((prev) => prev.slice(0, -1));

  // FIXED preprocess - No special mathjs imports needed
  const preprocessInput = (input) => {
    let str = input;

    // Replace π and e with numeric values
    str = str.replace(/π/g, "3.14159265359");
    str = str.replace(/e/g, "2.71828182846");

    // Roots
    str = str.replace(/√\(/g, "sqrt(");
    str = str.replace(/∛\(/g, "cbrt(");

    // Powers
    str = str.replace(/(\d+)\^2/g, "($1^2)");
    str = str.replace(/(\d+)\^3/g, "($1^3)");

    // Degree to radian conversion for trig
    const degToRad = (deg) => `(${deg}*pi/180)`;
    str = str.replace(/sin\(([^)]+)\)/g, (_, val) => `sin(${degToRad(val)})`);
    str = str.replace(/cos\(([^)]+)\)/g, (_, val) => `cos(${degToRad(val)})`);
    str = str.replace(/tan\(([^)]+)\)/g, (_, val) => `tan(${degToRad(val)})`);

    return str;
  };

  const calculate = () => {
    try {
      const result = evaluate(preprocessInput(calcInput));
      setCalcInput(result.toString());
    } catch {
      setCalcInput("Error");
    }
  };

  // COMPLETE SCIENTIFIC BUTTONS (5x5 layout for real scientific calculator)
  const simpleButtons = [
    "C",
    "DEL",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
  ];

  const scientificButtons = [
    "sin(",
    "cos(",
    "tan(",
    "(",
    ")",
    "7",
    "8",
    "9",
    "/",
    "C",
    "4",
    "5",
    "6",
    "*",
    "DEL",
    "1",
    "2",
    "3",
    "-",
    "+",
    "0",
    ".",
    "=",
    "π",
    "e",
  ];

  // ULTRA-REALISTIC 3D BUTTONS
  const getRealistic3DButtonClasses = (btn) => {
    const base3DClasses = `
      group relative overflow-hidden font-bold font-mono tracking-wider
      rounded-2xl h-14 sm:h-16 md:h-18 lg:h-20 w-full aspect-square
      shadow-2xl hover:shadow-3xl active:shadow-xl
      active:scale-[0.96] active:translate-y-1
      transition-all duration-150 ease-out
      focus:outline-none focus:ring-4 focus:ring-blue-500/30
      cursor-pointer select-none touch-manipulation
      before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent
      after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/20 after:to-transparent
      border-2 border-black/10 dark:border-white/20
    `;

    const isZero = btn === "0";
    const isEquals = btn === "=";
    const isOperator = ["+", "-", "*", "/", "="].includes(btn);
    const isAction = ["C", "DEL"].includes(btn);
    const isNumber = !isOperator && !isAction && !isZero && btn !== ".";
    const isScientificFn = [
      "sin(",
      "cos(",
      "tan(",
      "asin(",
      "acos(",
      "log(",
      "ln(",
      "√(",
      "(",
      ")",
      "π",
      "e",
    ].includes(btn);

    let buttonStyle = isZero
      ? " col-span-2 rounded-3xl shadow-3xl hover:shadow-4xl "
      : "";

    if (darkMode) {
      if (isEquals)
        buttonStyle +=
          "bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 text-white hover:from-emerald-600 hover:via-emerald-700 hover:to-green-700 shadow-emerald-500/50";
      else if (isOperator)
        buttonStyle +=
          "bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white hover:from-orange-600 hover:via-orange-700 hover:to-red-700 shadow-orange-500/40";
      else if (isAction)
        buttonStyle +=
          "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 shadow-gray-600/40";
      else if (isScientificFn)
        buttonStyle +=
          "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-blue-500/50";
      else if (isNumber)
        buttonStyle +=
          "bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 text-gray-50 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 shadow-gray-600/30 backdrop-blur-sm";
    } else {
      if (isEquals)
        buttonStyle +=
          "bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-500 text-white hover:from-emerald-500 hover:via-emerald-600 hover:to-green-600 shadow-emerald-400/50";
      else if (isOperator)
        buttonStyle +=
          "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-white hover:from-orange-500 hover:via-orange-600 hover:to-red-600 shadow-orange-400/40";
      else if (isAction)
        buttonStyle +=
          "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-900 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 shadow-gray-300/50";
      else if (isScientificFn)
        buttonStyle +=
          "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 text-white hover:from-blue-500 hover:via-indigo-600 hover:to-purple-600 shadow-blue-400/50";
      else if (isNumber)
        buttonStyle +=
          "bg-gradient-to-br from-white/80 via-gray-50 to-gray-100 text-gray-900 hover:from-gray-50 hover:via-white hover:to-gray-50 shadow-white/60 backdrop-blur-sm";
    }

    return `${base3DClasses} ${buttonStyle}`;
  };

  // COMPLETE PHYSICS + CHEMISTRY UNITS
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

    if (category === "temperature") {
      const val = parseFloat(unitValue);
      if (fromUnit === "C") {
        result = toUnit === "F" ? (val * 9) / 5 + 32 : val + 273.15;
      } else if (fromUnit === "F") {
        result =
          toUnit === "C" ? ((val - 32) * 5) / 9 : ((val - 32) * 5) / 9 + 273.15;
      } else {
        // K
        result = toUnit === "C" ? val - 273.15 : ((val - 273.15) * 9) / 5 + 32;
      }
    } else {
      const factor =
        conversions[unitType][category][fromUnit] /
        conversions[unitType][category][toUnit];
      result = parseFloat(unitValue) * factor;
    }

    const finalResult = `${result.toFixed(6)} ${toUnit}`;
    setConvertedValue(finalResult);
    setHistory((prev) => [
      ...prev.slice(-5),
      `${unitValue} ${fromUnit} → ${finalResult}`,
    ]);
  };

  const speakResult = () => {
    if (convertedValue && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Result is ${convertedValue}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-gray-900  via-black to-gray-900"
          : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
      } min-h-screen rounded-2xl py-4 sm:py-6 lg:py-8   lg:px-8 transition-all duration-500`}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center mb-8 sm:mb-12 font-black bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
        🛠️ Tools Hub
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {/* Calculator */}
        <div
          className={`${
            darkMode
              ? "bg-gray-900/95 backdrop-blur-2xl shadow-2xl"
              : "bg-white/95 backdrop-blur-2xl shadow-2xl"
          } p-3 sm:p-6 lg:p-4 rounded-3xl border border-white/30 dark:border-gray-700/50 max-w-sm sm:max-w-md m-2 lg:mx-0`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
              🧮 Calculator
            </h2>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-4 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 border border-blue-400/50"
            >
              {isScientific ? "Simple" : "Scientific"}
            </button>
          </div>

          <div
            className={`
            ${
              darkMode
                ? "bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-black/50 shadow-2xl border border-gray-600/50 backdrop-blur-xl"
                : "bg-gradient-to-r from-white/80 via-gray-50/80 to-gray-100/80 shadow-2xl border border-gray-200/50 backdrop-blur-xl"
            }
            rounded-3xl mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 font-mono text-lg sm:text-2xl lg:text-3xl text-right select-none tracking-widest
          `}
          >
            <span className="block overflow-hidden leading-tight drop-shadow-md break-all sm:break-words whitespace-pre-wrap max-w-full">
              {calcInput || "0"}
            </span>
          </div>

          <div
            className={`grid ${
              isScientific ? "grid-cols-5" : "grid-cols-4"
            } gap-2 sm:gap-3 lg:gap-4`}
          >
            {(isScientific ? scientificButtons : simpleButtons).map(
              (btn, index) => (
                <button
                  key={`${btn}-${index}`}
                  onClick={() =>
                    btn === "="
                      ? calculate()
                      : btn === "C"
                      ? clearCalc()
                      : btn === "DEL"
                      ? deleteLastChar()
                      : handleCalcInput(btn)
                  }
                  className={getRealistic3DButtonClasses(btn)}
                >
                  {btn}
                </button>
              )
            )}
          </div>
        </div>

        {/* Unit Converter */}
        <div
          className={`${
            darkMode
              ? "bg-gray-900/95 backdrop-blur-2xl shadow-2xl"
              : "bg-white/95 backdrop-blur-2xl shadow-2xl"
          } mx-2 p-3 sm:p-8 rounded-3xl border border-white/30 dark:border-gray-700/50`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
            🔄 Unit Converter
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label
                  className={`text-sm font-semibold block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Type
                </label>
                <select
                  value={unitType}
                  onChange={(e) => {
                    setUnitType(e.target.value);
                    setCategory(Object.keys(conversions[e.target.value])[0]);
                    setFromUnit("");
                    setToUnit("");
                  }}
                  className={`w-full p-3 sm:p-4 rounded-2xl font-mono text-base shadow-xl hover:shadow-2xl focus:shadow-2xl focus:outline-none focus:ring-4 ring-blue-500/20 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-800/80 text-white border border-gray-600/50"
                      : "bg-white/70 text-gray-900 border border-gray-300/50"
                  }`}
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  className={`text-sm font-semibold block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setFromUnit("");
                    setToUnit("");
                  }}
                  className={`w-full p-3 sm:p-4 rounded-2xl font-mono text-base shadow-xl hover:shadow-2xl focus:shadow-2xl focus:outline-none focus:ring-4 ring-green-500/20 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-800/80 text-white border border-gray-600/50"
                      : "bg-white/70 text-gray-900 border border-gray-300/50"
                  }`}
                >
                  {Object.keys(conversions[unitType] || {}).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() +
                        cat.slice(1).replace(/([A-Z])/g, " $1")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  className={`text-sm font-semibold block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Value
                </label>
                <input
                  type="number"
                  value={unitValue}
                  onChange={(e) => setUnitValue(e.target.value)}
                  placeholder="0"
                  className={`w-full p-3 sm:p-4 rounded-2xl font-mono text-lg text-right shadow-xl hover:shadow-2xl focus:shadow-2xl focus:outline-none focus:ring-4 ring-indigo-500/20 transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-800/80 text-white border border-gray-600/50"
                      : "bg-white/70 text-gray-900 border border-gray-300/50"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className={`p-4 rounded-2xl font-mono text-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 ring-orange-500/30 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800/80 text-white border-2 border-orange-500/30"
                    : "bg-white/70 text-gray-900 border-2 border-orange-400/50"
                }`}
              >
                <option value="">From</option>
                {Object.keys(conversions[unitType][category] || {}).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className={`p-4 rounded-2xl font-mono text-lg shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 ring-emerald-500/30 transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800/80 text-white border-2 border-emerald-500/30"
                    : "bg-white/70 text-gray-900 border-2 border-emerald-400/50"
                }`}
              >
                <option value="">To</option>
                {Object.keys(conversions[unitType][category] || {}).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={convertUnit}
              className="w-full py-5 px-8 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl active:scale-95 active:shadow-xl transition-all duration-200 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white border-2 border-emerald-400/50"
            >
              🔄 Convert Units
            </button>

            {convertedValue && (
              <div
                className={`p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl border-2 ${
                  darkMode
                    ? "bg-gradient-to-r from-emerald-900/90 to-green-900/90 text-emerald-100 border-emerald-500/60"
                    : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 border-emerald-400/70"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 w-full">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm opacity-75 mb-1 sm:mb-2">Result</p>
                    <p
                      className={`font-mono font-black tracking-wider break-all sm:break-words text-lg sm:text-2xl lg:text-3xl xl:text-4xl max-w-full overflow-hidden`}
                    >
                      {convertedValue}
                    </p>
                  </div>
                  <button
                    onClick={speakResult}
                    className={`p-2 sm:p-3 flex-shrink-0 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 backdrop-blur-sm mt-2 sm:mt-0 ${
                      darkMode
                        ? "bg-white/20 hover:bg-white/40"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    title="🔊 Speak result"
                  >
                    🔊
                  </button>
                </div>
              </div>
            )}

            {history.length > 0 && (
              <div
                className={`max-h-64 overflow-y-auto p-4 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-xl border ${
                  darkMode
                    ? "bg-gray-800/80 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50"
                }`}
              >
                <h3 className="font-black text-lg sm:text-xl mb-4 bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
                  📜 History
                </h3>
                <div className="space-y-2">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-2xl text-sm sm:text-base shadow-md ${
                        darkMode
                          ? "bg-gray-700/50 backdrop-blur-sm"
                          : "bg-white/60 backdrop-blur-sm"
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
