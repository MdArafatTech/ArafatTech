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
  const calculate = () => {
    try {
      setCalcInput(evaluate(calcInput).toString());
    } catch {
      setCalcInput("Error");
    }
  };
  const clearCalc = () => setCalcInput("");
  const deleteLastChar = () => setCalcInput((prev) => prev.slice(0, -1));

  const simpleButtons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "C", "DEL"];
  const scientificButtons = [...simpleButtons, "(", ")", "sqrt(", "^", "sin(", "cos(", "tan(", "log(", "ln(", "exp(", "!"];

  // Unit Converter
  const [unitType, setUnitType] = useState("physics");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [history, setHistory] = useState([]);

  const conversions = {
    physics: {
      length: { m:1, km:1000, cm:0.01, mm:0.001, µm:1e-6, nm:1e-9, mi:1609.34, yd:0.9144, ft:0.3048, in:0.0254, nmi:1852 },
      mass: { kg:1, g:0.001, mg:1e-6, t:1000, lb:0.453592, oz:0.0283495, st:6.35029 },
      time: { s:1, min:60, h:3600, day:86400, week:604800, month:2.628e6, year:3.154e7 },
      temperature: { C:"C", F:"F", K:"K" },
      volume: { m3:1, L:0.001, mL:1e-6, cm3:1e-6, gal:0.00378541, qt:0.000946353, pt:0.000473176, cup:0.000236588 },
      speed: {"m/s":1,"km/h":0.277778,"mph":0.44704,"knot":0.514444},
      area: {"m2":1,"km2":1e6,"ha":10000,"acre":4046.86,"mi2":2.59e6,"yd2":0.836127,"ft2":0.092903,"in2":0.00064516},
      energy: {J:1,kJ:1000,cal:4.184,kcal:4184,Wh:3600,kWh:3.6e6,eV:1.602e-19},
      pressure: {Pa:1,kPa:1000,bar:1e5,atm:101325,torr:133.322,psi:6894.76},
      force: {N:1,kgf:9.80665,lbf:4.44822},
      power: {W:1,kW:1000,hp:745.7},
      data: {b:1,B:8,KB:8192,MB:8.192e6,GB:8.192e9,TB:8.192e12}
    },
    chemistry: {
      amount: { mol:1, mmol:0.001, µmol:1e-6 },
      concentration: { M:1, m:1, N:1, "%":0.01, ppm:1e-6, ppb:1e-9 },
      mass: { g:1, mg:0.001, µg:1e-6, kg:1000 },
      volume: { L:1, mL:0.001, cm3:0.001 },
      pressure: { atm:101325, Pa:1, torr:133.322, bar:1e5, psi:6894.76 },
      temperature: { C:"C", K:"K", F:"F" },
      energy: { J:1, kJ:1000, cal:4.184, kcal:4184 },
      density: {"g/cm3":1,"g/mL":1,"kg/m3":0.001},
      rate: {"mol/(L*s)":1,"mol/(L*min)":1/60},
      misc: { F:96485, eq:1, amu:1 },
    }
  };

  const convertUnit = () => {
    if(!unitValue || !fromUnit || !toUnit) return;
    let result;
    if(category==="temperature"){
      const val=parseFloat(unitValue);
      if(fromUnit==="C") result = toUnit==="F"? val*9/5+32 : val+273.15;
      else if(fromUnit==="F") result = toUnit==="C"? (val-32)*5/9 : (val-32)*5/9+273.15;
      else result = toUnit==="C"? val-273.15 : (val-273.15)*9/5+32;
    } else {
      const factor = conversions[unitType][category][fromUnit]/conversions[unitType][category][toUnit];
      result = unitValue*factor;
    }
    const finalResult = `${result.toFixed(6)} ${toUnit}`;
    setConvertedValue(finalResult);
    setHistory(prev => [...prev, `${unitValue} ${fromUnit} = ${finalResult}`]);
  };

  const speakResult = () => {
    if(!convertedValue) return;
    const utterance = new SpeechSynthesisUtterance(`The result is ${convertedValue}`);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-4 md:p-8 transition-colors duration-500`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calculator */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 md:p-6 rounded-2xl shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Calculator</h2>
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-2 py-1 text-sm md:text-md lg:text-lg bg-blue-600 cursor-pointer text-white rounded-xl shadow hover:bg-blue-700 active:scale-95 transition"
            >
              {isScientific ? "Switch to Simple" : "Switch to Scientific"}
            </button>
          </div>
          <div className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"} rounded mb-4 p-3 text-right font-mono text-xl shadow-inner`}>
            {calcInput || "0"}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
            {(isScientific ? scientificButtons : simpleButtons).map((btn) => {
              let colorClass = "bg-gray-300 text-black";
              if (btn === "=") colorClass = "bg-green-500 text-white";
              else if (btn === "C") colorClass = "bg-red-500 text-white";
              else if (btn === "DEL") colorClass = "bg-yellow-500 text-white";
              else if (["+", "-", "*", "/", "^"].includes(btn)) colorClass = "bg-orange-500 text-white";
              else if (["sin", "cos", "tan", "log", "ln", "sqrt", "exp", "!", "(", ")"].includes(btn))
                colorClass = "bg-blue-500 text-white";

              return (
                <button
                  key={btn}
                  onClick={() =>
                    btn === "="
                      ? calculate()
                      : btn === "C"
                      ? clearCalc()
                      : btn === "DEL"
                      ? deleteLastChar()
                      : handleCalcInput(btn)
                  }
                  className={`p-2 sm:p-3 text-sm sm:text-base ${colorClass} rounded-lg`}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unit Converter */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 md:p-6 rounded-2xl shadow-lg`}>
          <h2 className="text-2xl font-semibold mb-4">Unit Converter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <select value={unitType} onChange={(e)=>{setUnitType(e.target.value); setCategory(Object.keys(conversions[e.target.value])[0]);}} 
              className="p-2 rounded text-gray-800 bg-gray-200">
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="p-2 rounded text-gray-800 bg-gray-200">
              {Object.keys(conversions[unitType]).map(cat=><option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="number" placeholder="Value" value={unitValue} onChange={(e)=>setUnitValue(e.target.value)} className="p-2 text-black rounded bg-gray-200"/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <select value={fromUnit} onChange={(e)=>setFromUnit(e.target.value)} className="p-2 rounded text-gray-800 bg-gray-200">
              <option value="">From</option>
              {Object.keys(conversions[unitType][category]).map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <select value={toUnit} onChange={(e)=>setToUnit(e.target.value)} className="p-2 text-gray-800 rounded bg-gray-200">
              <option value="">To</option>
              {Object.keys(conversions[unitType][category]).map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <button onClick={convertUnit} className="col-span-2 bg-green-500 text-white rounded-xl py-2 shadow hover:bg-green-600 active:scale-95 cursor-pointer transition">
              Convert
            </button>
          </div>
          {convertedValue && (
            <div className="flex justify-between items-center mt-2">
              <p className="font-medium text-lg">Result: {convertedValue}</p>
              <button onClick={speakResult} className="px-2 py-1 bg-blue-500 text-white cursor-pointer rounded shadow hover:bg-blue-600 active:scale-95 transition">
                🔊
              </button>
            </div>
          )}
          {history.length > 0 && (
            <div className="mt-4 p-3 rounded bg-gray-200 dark:bg-gray-700 max-h-48 overflow-y-auto">
              <h3 className="font-semibold mb-2">Overall Conversions</h3>
           <ul className="list-disc list-inside space-y-1 text-sm">
  {history.map((item, index) => <li key={index}>{item}</li>)}
</ul>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
