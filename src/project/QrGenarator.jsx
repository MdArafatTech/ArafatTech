// QrGeneratorAdvanced.jsx
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { Html5Qrcode } from "html5-qrcode";

//-----------------------------------------------------
//   GLOBAL SETTINGS
//-----------------------------------------------------
const defaultSize = 350;

// Many country codes (expanded)
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

export default function QrGeneratorAdvanced() {
  const [darkMode, setDarkMode] = useState(false);

  const [qrType, setQrType] = useState("text");
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("880");
  const [size, setSize] = useState(defaultSize);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const [pixelStyle, setPixelStyle] = useState("square");
  const [cornerStyle, setCornerStyle] = useState("square");

  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(18);

  const [animatePreview, setAnimatePreview] = useState(false);

  const qrRef = useRef(null);
  const qrInstance = useRef(null);

  //-----------------------------------------------------
  // Initialization
  //-----------------------------------------------------
  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: size,
      height: size,
      data: value || " ",
      image: logo || undefined,
      dotsOptions: { type: mapPixel(pixelStyle), color: fgColor },
      cornersSquareOptions: { type: mapPixel(cornerStyle) },
      backgroundOptions: { color: bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: logoSize / 100 },
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrInstance.current.append(qrRef.current);
    }
  }, []);

  //-----------------------------------------------------
  // Update QR Code on changes
  //-----------------------------------------------------
  useEffect(() => {
    if (!qrInstance.current) return;

    qrInstance.current.update({
      data: formatData(value),
      width: size,
      height: size,
      image: logo || undefined,
      dotsOptions: { type: mapPixel(pixelStyle), color: fgColor },
      cornersSquareOptions: { type: mapPixel(cornerStyle) },
      backgroundOptions: { color: bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 5, imageSize: logoSize / 100 },
    });

    if (animatePreview && qrRef.current) qrRef.current.classList.add("qr-anim");
    else qrRef.current.classList.remove("qr-anim");
  }, [value, fgColor, bgColor, pixelStyle, cornerStyle, size, logo, logoSize, animatePreview]);

  //-----------------------------------------------------
  // Helpers
  //-----------------------------------------------------
  function mapPixel(key) {
    if (key === "diamond") return "dots";
    if (key === "hex") return "extra-rounded";
    return key;
  }

  function formatData(text) {
    text = text.trim();

    if (qrType === "url") return text.startsWith("http") ? text : "https://" + text;
    if (qrType === "phone") return `tel:${countryCode}${text}`;
    if (qrType === "whatsapp") return `https://wa.me/${countryCode}${text}`;
    if (qrType === "email") return `mailto:${text}`;

    return text || " ";
  }

  //-----------------------------------------------------
  // Download SVG
  //-----------------------------------------------------
  const downloadSVG = async () => {
    const svg = await qrInstance.current.getRawData("svg");
    saveAs(new Blob([svg], { type: "image/svg+xml" }), "qr.svg");
  };

  //-----------------------------------------------------
  // Download PNG
  //-----------------------------------------------------
  const downloadPNG = async () => {
    const canvas = await html2canvas(qrRef.current, { scale: 3, useCORS: true });
    canvas.toBlob((blob) => saveAs(blob, "qr.png"));
  };

  //-----------------------------------------------------
  // Render UI
  //-----------------------------------------------------
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-4`}>
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Premium QR Studio</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="col-span-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">

            {/* QR TYPE & INPUT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select className="p-2 border rounded" value={qrType} onChange={(e) => setQrType(e.target.value)}>
                <option value="text">Text</option>
                <option value="url">URL</option>
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>

              {(qrType === "phone" || qrType === "whatsapp") && (
                <select className="p-2 border rounded" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name} (+{c.code})</option>
                  ))}
                </select>
              )}

              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter data..."
                className="md:col-span-2 p-2 border rounded"
              />
            </div>

            {/* STYLE CONTROLS */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div>
                <label className="text-sm">Pixel</label>
                <select className="p-2 rounded border w-full" value={pixelStyle} onChange={(e) => setPixelStyle(e.target.value)}>
                  {PIXEL_STYLES.map((p) => (
                    <option key={p.key} value={p.key}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">Corner</label>
                <select className="p-2 rounded border w-full" value={cornerStyle} onChange={(e) => setCornerStyle(e.target.value)}>
                  <option value="square">Square</option>
                  <option value="rounded">Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Size</label>
                <input type="number" value={size} min={200} max={2000} onChange={(e) => setSize(+e.target.value)} className="p-2 border rounded w-full" />
              </div>

              <div>
                <label className="text-sm">FG</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="p-1 h-10 w-full rounded" />
              </div>

              <div>
                <label className="text-sm">BG</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10 w-full rounded" />
              </div>

              <div>
                <label className="text-sm">Logo</label>
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setLogo(reader.result);
                  reader.readAsDataURL(file);
                }} />
              </div>
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="flex gap-3 mt-4">
              <button onClick={downloadPNG} className="px-4 py-2 bg-blue-600 text-white rounded">PNG</button>
              <button onClick={downloadSVG} className="px-4 py-2 bg-green-600 text-white rounded">SVG</button>
            </div>
          </div>

          {/* RIGHT PANEL (PREVIEW) */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div ref={qrRef} className="rounded-lg shadow p-4 bg-white dark:bg-gray-700" />
            </div>

            <label className="mt-3 flex items-center gap-2">
              <input type="checkbox" checked={animatePreview} onChange={(e) => setAnimatePreview(e.target.checked)} />
              Animate QR
            </label>
          </div>
        </div>
      </div>

      {/* QR Animation */}
      <style>{`
        .qr-anim svg { animation: zoom 1.5s infinite; }
        @keyframes zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
