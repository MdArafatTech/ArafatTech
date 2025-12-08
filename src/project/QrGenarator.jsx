import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";


// Global settings
const defaultSize = 300;
const defaultMargin = 10;

// Country codes (expanded)
const COUNTRY_CODES = [
  { name: "Bangladesh", code: "880" },
  { name: "India", code: "91" },
  { name: "Pakistan", code: "92" },
  { name: "Sri Lanka", code: "94" },
  { name: "Nepal", code: "977" },
  { name: "Bhutan", code: "975" },
  { name: "United States", code: "1" },
  { name: "Canada", code: "1" },
  { name: "United Kingdom", code: "44" },
  { name: "Australia", code: "61" },
  { name: "Germany", code: "49" },
  { name: "France", code: "33" },
  { name: "Spain", code: "34" },
  { name: "Italy", code: "39" },
  { name: "Netherlands", code: "31" },
  { name: "Belgium", code: "32" },
  { name: "Brazil", code: "55" },
  { name: "Egypt", code: "20" },
  { name: "Saudi Arabia", code: "966" },
  { name: "UAE", code: "971" },
  { name: "Turkey", code: "90" },
  { name: "China", code: "86" },
  { name: "Japan", code: "81" },
  { name: "South Korea", code: "82" },
  { name: "Thailand", code: "66" },
  { name: "Vietnam", code: "84" },
];

// Pixel styles
const PIXEL_STYLES = [
  { key: "square", label: "Square" },
  { key: "rounded", label: "Rounded" },
  { key: "dots", label: "Dots" },
  { key: "extra-rounded", label: "Extra Rounded" },
  { key: "diamond", label: "Diamond (CSS Effect)" },
  { key: "hex", label: "Hexagon (CSS Effect)" },
];

// Error correction options
const ERROR_CORRECTION_OPTIONS = [
  { label: "Low (L)", value: "L" },
  { label: "Medium (M)", value: "M" },
  { label: "Quartile (Q)", value: "Q" },
  { label: "High (H)", value: "H" },
];

// Custom hook for system theme detection
function useSystemTheme() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handleChange = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return darkMode;
}

export default function QrGeneratorAdvanced() {
  const [qrType, setQrType] = useState("text");
  const [values, setValues] = useState([""]);
  const [countryCode, setCountryCode] = useState("880");
  const [size, setSize] = useState(defaultSize);
  const [margin, setMargin] = useState(defaultMargin);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pixelStyle, setPixelStyle] = useState("square");
  const [cornerStyle, setCornerStyle] = useState("square");
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(18);
  const [animatePreview, setAnimatePreview] = useState(false);

  const qrRefs = useRef([]);
  const qrInstances = useRef([]);

  const darkMode = useSystemTheme();

  const mapPixel = (key) => {
    if (key === "diamond") return "dots";
    if (key === "hex") return "extra-rounded";
    return key;
  };

  const formatData = (text) => {
    const trimmed = text.trim();
    if (qrType === "url") return trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
    if (qrType === "phone") return `tel:${countryCode}${trimmed}`;
    if (qrType === "whatsapp") return `https://wa.me/${countryCode}${trimmed}`;
    if (qrType === "email") return `mailto:${trimmed}`;
    return trimmed || " ";
  };

  useEffect(() => {
    qrInstances.current = values.map(
      (_, idx) =>
        new QRCodeStyling({
          width: size,
          height: size,
          data: formatData(values[idx]),
          image: logo || undefined,
          dotsOptions: { type: mapPixel(pixelStyle), color: fgColor },
          cornersSquareOptions: { type: mapPixel(cornerStyle) },
          backgroundOptions: { color: bgColor },
          imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: logoSize / 100 },
          margin: margin,
          qrOptions: { errorCorrectionLevel: errorCorrection },
        })
    );

    qrInstances.current.forEach((qr, idx) => {
      if (qrRefs.current[idx]) {
        qrRefs.current[idx].innerHTML = "";
        qr.append(qrRefs.current[idx]);
      }
    });
  }, []);

  useEffect(() => {
    qrInstances.current.forEach((qr, idx) => {
      qr.update({
        data: formatData(values[idx] || ""),
        width: size,
        height: size,
        image: logo || undefined,
        dotsOptions: { type: mapPixel(pixelStyle), color: fgColor },
        cornersSquareOptions: { type: mapPixel(cornerStyle) },
        backgroundOptions: { color: bgColor },
        imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: logoSize / 100 },
        margin: margin,
        qrOptions: { errorCorrectionLevel: errorCorrection },
      });

      if (qrRefs.current[idx]) {
        qrRefs.current[idx].innerHTML = "";
        qr.append(qrRefs.current[idx]);
      }
    });
  }, [values, fgColor, bgColor, pixelStyle, cornerStyle, size, logo, logoSize, margin, errorCorrection]);

  const handleValuesChange = (e) => {
    const input = e.target.value;
    setValues(input.split("\n"));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setLogo(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };


const downloadSVG = async () => {
  if (!qrInstances.current[0]) return;

  try {
    // Get SVG blob from QRCodeStyling
    const blob = await qrInstances.current[0].getRawData("svg");

    // Convert blob → text (SVG XML)
    let svgText = await blob.text();

    // Remove XML declaration if present
    svgText = svgText.replace(/<\?xml.*?\?>\s*/g, "");

    // Create a wrapper to center QR
    const padding = 150;
    const finalWidth = size + padding * 2;
    const finalHeight = size + padding * 2;

    const centeredSVG = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="${finalWidth}"
           height="${finalHeight}"
           viewBox="0 0 ${finalWidth} ${finalHeight}">
        <g transform="translate(${padding}, ${padding})">
          ${svgText}
        </g>
      </svg>
    `;

    // Download final SVG
    const file = new Blob([centeredSVG], { type: "image/svg+xml" });
    saveAs(file, "qr.svg");

  } catch (err) {
    console.error("SVG Download Error:", err);
    alert("❌ QR generator could not produce SVG. Try again.");
  }
};




  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-4 transition-colors`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Premium QR Studio</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
            <div>
              <label className="block font-semibold mb-2">QR Type</label>
              <select
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full p-2 border bg-gray-300 rounded"
              >
                <option value="text">Text</option>
                <option value="url">URL</option>
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div>
              <label className="block  rounded p-1 font-semibold mb-2">
                {qrType === "phone" || qrType === "whatsapp" ? "Phone Numbers (one per line)" : "Input Values (one per line)"}
              </label>
              { (qrType === "phone" || qrType === "whatsapp") && (
                <select
                  className="w-full p-2 bg-blue-300 border rounded mb-2"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{`${c.name} (+${c.code})`}</option>
                  ))}
                </select>
              )}
              <textarea
                rows={values.length > 1 ? Math.min(values.length, 10) : 4}
                onChange={handleValuesChange}
                placeholder="Enter one value per line"
                className="w-full p-3 border rounded font-mono resize-y"
                value={values.join("\n")}
              />
            </div>

         

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold mb-1">Pixel Style</label>
                <select
                  className="w-full p-2 bg-gray-300 border rounded"
                  value={pixelStyle}
                  onChange={(e) => setPixelStyle(e.target.value)}
                >
                  {PIXEL_STYLES.map((p) => (
                    <option key={p.key} value={p.key}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Corner Style</label>
                <select
                  className="w-full p-2 bg-blue-300 border rounded"
                  value={cornerStyle}
                  onChange={(e) => setCornerStyle(e.target.value)}
                >
                  <option value="square ">Square</option>
                  <option value="rounded ">Rounded</option>
                  <option value="extra-rounded ">Extra Rounded</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Size (px)</label>
                <input
                  type="number"
                  min={200}
                  max={2000}
                  value={size}
                  onChange={(e) => setSize(+e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Margin</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={margin}
                  onChange={(e) => setMargin(+e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Error Correction</label>
                <select
                  className="w-full p-2 bg-gray-300 border rounded"
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                >
                  {ERROR_CORRECTION_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Foreground Color</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Background Color</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Logo Size (%)</label>
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={logoSize}
                  onChange={(e) => setLogoSize(+e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Upload Logo</label>
              <input className="btn btn-accent w-full" type="file" accept="image/*" onChange={handleLogoChange} />
              {logo && (
                <div className="mt-3 flex items-center gap-4">
                  <img src={logo} alt="logo preview" className="w-16 h-16 object-contain border rounded" />
                  <button
                    onClick={() => setLogo(null)}
                    className="text-red-500 hover:underline"
                  >
                    Remove Logo
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6 flex flex-col items-center">
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={animatePreview}
                onChange={(e) => setAnimatePreview(e.target.checked)}
              />
              Animate QR Preview
            </label>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
                animatePreview ? "qr-anim" : ""
              }`}
            >
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="flex  justify-center items-center p-2"
                >
                  <div
                    ref={(el) => (qrRefs.current[idx] = el)}
                    className=" w-full rounded-lg shadow bg-white dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
            
              <button
                onClick={downloadSVG}
                className="px-6 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Download SVG
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <details className="group">
            <summary className="font-semibold cursor-pointer">About QR Generator</summary>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              This QR Generator allows you to create custom QR codes with advanced styling options, logo embedding, and multiple input support. The preview updates in real-time as you adjust settings. All QR codes are generated using the QRCodeStyling library and can be downloaded in PNG or SVG format.
            </div>
          </details>
        </div>

        <style jsx>{`
          .qr-anim svg {
            animation: zoom 1.5s infinite;
          }
          @keyframes zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
