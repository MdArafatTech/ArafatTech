import React, { useEffect, useRef, useState, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";

const defaultSize = 300;
const defaultMargin = 10;

const COUNTRY_CODES = [
  { name: "Afghanistan", code: "93" },
  { name: "Albania", code: "355" },
  { name: "Algeria", code: "213" },
  { name: "American Samoa", code: "1-684" },
  { name: "Andorra", code: "376" },
  { name: "Angola", code: "244" },
  { name: "Anguilla", code: "1-264" },
  { name: "Antigua and Barbuda", code: "1-268" },
  { name: "Argentina", code: "54" },
  { name: "Armenia", code: "374" },
  { name: "Australia", code: "61" },
  { name: "Austria", code: "43" },
  { name: "Azerbaijan", code: "994" },
  { name: "Bahamas", code: "1-242" },
  { name: "Bahrain", code: "973" },
  { name: "Bangladesh", code: "880" },
  { name: "Barbados", code: "1-246" },
  { name: "Belarus", code: "375" },
  { name: "Belgium", code: "32" },
  { name: "Belize", code: "501" },
  { name: "Benin", code: "229" },
  { name: "Bhutan", code: "975" },
  { name: "Bolivia", code: "591" },
  { name: "Bosnia and Herzegovina", code: "387" },
  { name: "Botswana", code: "267" },
  { name: "Brazil", code: "55" },
  { name: "Brunei", code: "673" },
  { name: "Bulgaria", code: "359" },
  { name: "Burkina Faso", code: "226" },
  { name: "Burundi", code: "257" },
  { name: "Cambodia", code: "855" },
  { name: "Cameroon", code: "237" },
  { name: "Canada", code: "1" },
  { name: "Cape Verde", code: "238" },
  { name: "Central African Republic", code: "236" },
  { name: "Chad", code: "235" },
  { name: "Chile", code: "56" },
  { name: "China", code: "86" },
  { name: "Colombia", code: "57" },
  { name: "Comoros", code: "269" },
  { name: "Congo", code: "242" },
  { name: "Costa Rica", code: "506" },
  { name: "Croatia", code: "385" },
  { name: "Cuba", code: "53" },
  { name: "Cyprus", code: "357" },
  { name: "Czech Republic", code: "420" },
  { name: "Denmark", code: "45" },
  { name: "Djibouti", code: "253" },
  { name: "Dominica", code: "1-767" },
  { name: "Dominican Republic", code: "1-809" },
  { name: "Ecuador", code: "593" },
  { name: "Egypt", code: "20" },
  { name: "El Salvador", code: "503" },
  { name: "Estonia", code: "372" },
  { name: "Ethiopia", code: "251" },
  { name: "Fiji", code: "679" },
  { name: "Finland", code: "358" },
  { name: "France", code: "33" },
  { name: "Gabon", code: "241" },
  { name: "Gambia", code: "220" },
  { name: "Georgia", code: "995" },
  { name: "Germany", code: "49" },
  { name: "Ghana", code: "233" },
  { name: "Greece", code: "30" },
  { name: "Greenland", code: "299" },
  { name: "Guatemala", code: "502" },
  { name: "Guinea", code: "224" },
  { name: "Guyana", code: "592" },
  { name: "Haiti", code: "509" },
  { name: "Honduras", code: "504" },
  { name: "Hong Kong", code: "852" },
  { name: "Hungary", code: "36" },
  { name: "Iceland", code: "354" },
  { name: "India", code: "91" },
  { name: "Indonesia", code: "62" },
  { name: "Iran", code: "98" },
  { name: "Iraq", code: "964" },
  { name: "Ireland", code: "353" },
  { name: "Israel", code: "972" },
  { name: "Italy", code: "39" },
  { name: "Jamaica", code: "1-876" },
  { name: "Japan", code: "81" },
  { name: "Jordan", code: "962" },
  { name: "Kazakhstan", code: "7" },
  { name: "Kenya", code: "254" },
  { name: "Kuwait", code: "965" },
  { name: "Kyrgyzstan", code: "996" },
  { name: "Laos", code: "856" },
  { name: "Latvia", code: "371" },
  { name: "Lebanon", code: "961" },
  { name: "Liberia", code: "231" },
  { name: "Libya", code: "218" },
  { name: "Lithuania", code: "370" },
  { name: "Luxembourg", code: "352" },
  { name: "Malaysia", code: "60" },
  { name: "Maldives", code: "960" },
  { name: "Mexico", code: "52" },
  { name: "Mongolia", code: "976" },
  { name: "Morocco", code: "212" },
  { name: "Myanmar", code: "95" },
  { name: "Nepal", code: "977" },
  { name: "Netherlands", code: "31" },
  { name: "New Zealand", code: "64" },
  { name: "Nigeria", code: "234" },
  { name: "North Korea", code: "850" },
  { name: "Norway", code: "47" },
  { name: "Oman", code: "968" },
  { name: "Pakistan", code: "92" },
  { name: "Philippines", code: "63" },
  { name: "Poland", code: "48" },
  { name: "Portugal", code: "351" },
  { name: "Qatar", code: "974" },
  { name: "Romania", code: "40" },
  { name: "Russia", code: "7" },
  { name: "Saudi Arabia", code: "966" },
  { name: "Singapore", code: "65" },
  { name: "South Africa", code: "27" },
  { name: "South Korea", code: "82" },
  { name: "Spain", code: "34" },
  { name: "Sri Lanka", code: "94" },
  { name: "Sweden", code: "46" },
  { name: "Switzerland", code: "41" },
  { name: "Thailand", code: "66" },
  { name: "Turkey", code: "90" },
  { name: "UAE", code: "971" },
  { name: "UK", code: "44" },
  { name: "USA", code: "1" },
  { name: "Vietnam", code: "84" },
  { name: "Yemen", code: "967" },
  { name: "Zimbabwe", code: "263" },
];


const PIXEL_STYLES = [
  { key: "square", label: "Square" },
  { key: "rounded", label: "Rounded" },
  { key: "dots", label: "Dots" },
  { key: "extra-rounded", label: "Extra Rounded" },
  { key: "diamond", label: "Diamond" },
  { key: "hex", label: "Hexagon" },
];

const ERROR_CORRECTION_OPTIONS = [
  { label: "Low (L) 7%", value: "L" },
  { label: "Medium (M) 15%", value: "M" },
  { label: "Quartile (Q) 25%", value: "Q" },
  { label: "High (H) 30%", value: "H" },
];

const QR_TYPES = [
  {
    value: "text",
    label: "Plain Text",
    icon: "📄",
    placeholder: "Enter any text or message",
  },
  {
    value: "url",
    label: "Website URL",
    icon: "🌐",
    placeholder: "https://example.com",
  },
  {
    value: "phone",
    label: "Phone Number",
    icon: "📞",
    placeholder: "1234567890",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: "💬",
    placeholder: "1234567890",
  },
  {
    value: "email",
    label: "Email Address",
    icon: "✉️",
    placeholder: "user@example.com",
  },
  { value: "sms", label: "SMS Message", icon: "📱", placeholder: "1234567890" },
  {
    value: "vcard",
    label: "Contact (vCard)",
    icon: "👤",
    placeholder: "John Doe",
  },
  {
    value: "telegram",
    label: "Telegram",
    icon: "✈️",
    placeholder: "@username",
  },
  { value: "paypal", label: "PayPal", icon: "💳", placeholder: "username" },
  {
    value: "bitcoin",
    label: "Bitcoin",
    icon: "₿",
    placeholder: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  },
  {
    value: "wifi",
    label: "WiFi Network",
    icon: "📶",
    placeholder: "NetworkName|password",
  },
  {
    value: "location",
    label: "Location",
    icon: "📍",
    placeholder: "40.7128,-74.0060",
  },
  {
    value: "event",
    label: "Calendar Event",
    icon: "📅",
    placeholder: "20241225T100000",
  },
];

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

export default function ProfessionalQRGenerator() {
  const [qrType, setQrType] = useState("url");
  const [inputValue, setInputValue] = useState("https://example.com");
  const [countryCode, setCountryCode] = useState("880");
  const [size, setSize] = useState(defaultSize);
  const [margin, setMargin] = useState(defaultMargin);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pixelStyle, setPixelStyle] = useState("square");
  const [cornerStyle, setCornerStyle] = useState("square");
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState(20);
  const [animatePreview, setAnimatePreview] = useState(false);
  const [qrQuality, setQrQuality] = useState("standard");

  const qrRefs = useRef([]);
  const qrInstances = useRef([]);

  const darkMode = useSystemTheme();
  const currentQrType = QR_TYPES.find((type) => type.value === qrType);
  const contentPlaceholder = currentQrType
    ? currentQrType.placeholder
    : "Enter content";

  const presets = [
    {
      name: "Modern",
      fg: "#2563eb",
      bg: "#ffffff",
      style: "rounded",
      corner: "extra-rounded",
    },
    {
      name: "Dark",
      fg: "#1f2937",
      bg: "#111827",
      style: "dots",
      corner: "rounded",
    },
    {
      name: "Gradient",
      fg: "#8b5cf6",
      bg: "#f8fafc",
      style: "extra-rounded",
      corner: "rounded",
      quality: "gradient",
    },
    {
      name: "Minimal",
      fg: "#000000",
      bg: "#ffffff",
      style: "square",
      corner: "square",
    },
  ];

  const mapPixel = useCallback((key) => {
    if (key === "diamond") return "dots";
    if (key === "hex") return "extra-rounded";
    return key;
  }, []);

const formatData = useCallback(
  (text) => {
    const trimmed = text.trim();
    const withCountry = (num) => `${countryCode}${num}`;

    switch (qrType) {
      case "url":
        return trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
      case "phone":
        return `tel:${withCountry(trimmed)}`;
      case "whatsapp":
        return `https://wa.me/${withCountry(trimmed)}`;
      case "email":
        return `mailto:${trimmed}`;
      case "sms":
        return `sms:${withCountry(trimmed)}?body=${encodeURIComponent(trimmed)}`;
      case "telegram":
        return `https://t.me/${trimmed}`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${trimmed}\nEND:VCARD`;
      case "paypal":
        return `https://paypal.me/${trimmed}`;
      case "bitcoin":
        return `bitcoin:${trimmed}`;
      case "wifi":
        const [ssid, password = ""] = trimmed.split("|").map((s) => s.trim());
        return `WIFI:S:${ssid};T:WPA;P:${password};;;`;
      case "location":
        return `geo:${trimmed}`;
      case "event":
        return `BEGIN:VEVENT\nSUMMARY:Event\nDTSTART:${trimmed}\nEND:VEVENT`;
      default:
        return trimmed || " ";
    }
  },
  [qrType, countryCode]
);

  // Initialize QR instances
  useEffect(() => {
    qrInstances.current = [
      new QRCodeStyling({
        width: size,
        height: size,
        data: formatData(inputValue),
        image: logo || undefined,
        dotsOptions: {
          type: mapPixel(pixelStyle),
          color: fgColor,
          gradient:
            qrQuality === "gradient"
              ? {
                  type: "linear",
                  rotation: "0deg",
                  colorStops: [
                    { offset: 0, color: fgColor },
                    { offset: 1, color: "#333" },
                  ],
                }
              : undefined,
        },
        cornersSquareOptions: { type: mapPixel(cornerStyle), color: fgColor },
        cornersDotOptions: { type: "dot", color: fgColor },
        backgroundOptions: { color: bgColor },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoSize / 100,
        },
        margin: margin,
        qrOptions: { errorCorrectionLevel: errorCorrection },
      }),
    ];

    if (qrRefs.current[0]) {
      qrRefs.current[0].innerHTML = "";
      qrInstances.current[0].append(qrRefs.current[0]);
    }
  }, []);

  // Update QR instances
  useEffect(() => {
    if (qrInstances.current[0]) {
      qrInstances.current[0].update({
        data: formatData(inputValue),
        width: size,
        height: size,
        image: logo || undefined,
        dotsOptions: {
          type: mapPixel(pixelStyle),
          color: fgColor,
          gradient:
            qrQuality === "gradient"
              ? {
                  type: "linear",
                  rotation: "0deg",
                  colorStops: [
                    { offset: 0, color: fgColor },
                    { offset: 1, color: "#333" },
                  ],
                }
              : undefined,
        },
        cornersSquareOptions: { type: mapPixel(cornerStyle), color: fgColor },
        cornersDotOptions: { type: "dot", color: fgColor },
        backgroundOptions: { color: bgColor },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoSize / 100,
        },
        margin: margin,
        qrOptions: { errorCorrectionLevel: errorCorrection },
      });

      if (qrRefs.current[0]) {
        qrRefs.current[0].innerHTML = "";
        qrInstances.current[0].append(qrRefs.current[0]);
      }
    }
  }, [
    inputValue,
    fgColor,
    bgColor,
    pixelStyle,
    cornerStyle,
    size,
    logo,
    logoSize,
    margin,
    errorCorrection,
    qrType,
    countryCode,
    qrQuality,
    mapPixel,
    formatData,
  ]);

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

  const downloadQR = async (format = "svg") => {
    if (!qrInstances.current[0]) return;
    try {
      const blob = await qrInstances.current[0].getRawData(format);
      const padding = format === "svg" ? 50 : 20;
      const finalSize = size + padding * 2;

      if (format === "svg") {
        let svgText = await blob.text();
        svgText = svgText.replace(/<\?xml.*?\?>\s*/g, "");
        const centeredSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${finalSize}" height="${finalSize}" viewBox="0 0 ${finalSize} ${finalSize}">
            <rect width="100%" height="100%" fill="#ffffff"/>
            <g transform="translate(${padding}, ${padding})">${svgText}</g>
          </svg>
        `;
        saveAs(
          new Blob([centeredSVG], { type: "image/svg+xml" }),
          `professional-qr.${format}`
        );
      } else {
        saveAs(blob, `professional-qr.${format}`);
      }
    } catch (err) {
      console.error("Download Error:", err);
      alert("Download failed. Try different format.");
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-3 p-6 sm:px-8 sm:py-4 rounded-3xl shadow-2xl mb-6 transition-all ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 via-purple-900 to-blue-900 backdrop-blur-xl"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-2xl ${
                darkMode ? "bg-white/20" : "bg-white/20"
              }`}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                QR Studio Pro
              </h1>
              <p className="text-white/90 text-sm sm:text-lg mt-1">
                Professional QR Code Generator
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Controls */}
          <div className="space-y-6 lg:space-y-8">
            <div
              className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
                darkMode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/90 border-gray-200/50"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Design Settings
              </h3>

              {/* QR Type - Mobile Optimized */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
                  QR Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {QR_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setQrType(type.value)}
                      className={`p-3 sm:p-4 rounded-2xl transition-all flex items-center gap-2 sm:gap-3 text-left text-sm font-medium ${
                        qrType === type.value
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl transform scale-105"
                          : darkMode
                          ? "bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-gray-100 hover:shadow-lg"
                          : "bg-white/70 hover:bg-white border border-gray-200/50 hover:shadow-lg text-gray-800"
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 flex-wrap">
                  <span>Content</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                    {currentQrType?.icon} {currentQrType?.label}
                  </span>
                </label>

                {(qrType === "phone" ||
                  qrType === "whatsapp" ||
                  qrType === "sms") && (
                  <select
                    className={`w-full p-3 rounded-2xl border transition-all text-sm font-medium ${
                      darkMode
                        ? "bg-gray-700/80 border-gray-600/50 text-gray-100 focus:ring-2 focus:ring-blue-500/30"
                        : "bg-white/80 border-gray-300/50 focus:ring-2 focus:ring-blue-500/30"
                    }`}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {`${c.name} (+${c.code})`}
                      </option>
                    ))}
                  </select>
                )}

                {qrType === "wifi" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-yellow-50/80 dark:bg-yellow-900/30 border border-yellow-200/50 dark:border-yellow-800/50 rounded-2xl">
                    <div>
                      <label className="block text-xs font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                        Network Name
                      </label>
                      <input
                        type="text"
                        placeholder="MyWiFi"
                        value={inputValue.split("|")[0] || ""}
                        onChange={(e) => {
                          const currentPass = inputValue.split("|")[1] || "";
                          setInputValue(`${e.target.value}|${currentPass}`);
                        }}
                        className={`w-full p-3 border rounded-xl bg-white/80 dark:bg-gray-700/80 text-sm transition-all ${
                          darkMode
                            ? "border-gray-600/50 text-gray-100"
                            : "border-gray-300/50 text-gray-800"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="yourpassword123"
                        value={inputValue.split("|")[1] || ""}
                        onChange={(e) => {
                          const currentSSID = inputValue.split("|")[0] || "";
                          setInputValue(`${currentSSID}|${e.target.value}`);
                        }}
                        className={`w-full p-3 border rounded-xl bg-white/80 dark:bg-gray-700/80 text-sm transition-all ${
                          darkMode
                            ? "border-gray-600/50 text-gray-100"
                            : "border-gray-300/50 text-gray-800"
                        }`}
                      />
                    </div>
                  </div>
                )}

                <textarea
                  rows={qrType === "wifi" ? 3 : 4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={contentPlaceholder}
                  className={`w-full p-4 border-2 rounded-2xl resize-vertical font-mono text-sm transition-all focus:outline-none focus:ring-4 ${
                    darkMode
                      ? "bg-gray-700/80 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:ring-blue-500/30"
                      : "bg-white/80 border-gray-300/50 text-gray-800 placeholder-gray-500 focus:ring-blue-500/30"
                  }`}
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Quick Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setFgColor(preset.fg);
                        setBgColor(preset.bg);
                        setPixelStyle(preset.style);
                        setCornerStyle(preset.corner);
                        if (preset.quality) setQrQuality(preset.quality);
                      }}
                      className={`p-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                        darkMode
                          ? "bg-gray-700/60 hover:bg-gray-600/80 text-gray-100 hover:shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-lg"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls Grid - Fully Responsive */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={size}
                    onChange={(e) => setSize(+e.target.value)}
                    className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Error Correction
                  </label>
                  <select
                    className={`w-full p-3 rounded-xl text-sm transition-all ${
                      darkMode
                        ? "bg-gray-700/80 border-gray-600/50 text-gray-100"
                        : "bg-white/80 border-gray-300/50 text-gray-800"
                    }`}
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                  >
                    {ERROR_CORRECTION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Style
                  </label>
                  <select
                    className={`w-full p-3 rounded-xl text-sm transition-all ${
                      darkMode
                        ? "bg-gray-700/80 border-gray-600/50 text-gray-100"
                        : "bg-white/80 border-gray-300/50 text-gray-800"
                    }`}
                    value={pixelStyle}
                    onChange={(e) => setPixelStyle(e.target.value)}
                  >
                    {PIXEL_STYLES.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Corners
                  </label>
                  <select
                    className={`w-full p-3 rounded-xl text-sm transition-all ${
                      darkMode
                        ? "bg-gray-700/80 border-gray-600/50 text-gray-100"
                        : "bg-white/80 border-gray-300/50 text-gray-800"
                    }`}
                    value={cornerStyle}
                    onChange={(e) => setCornerStyle(e.target.value)}
                  >
                    <option value="square">Square</option>
                    <option value="rounded">Rounded</option>
                    <option value="extra-rounded">Extra Rounded</option>
                    <option value="dot">Dots</option>
                  </select>
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Foreground
                  </label>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full h-12 rounded-2xl border-2 shadow-inner cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Background
                  </label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-12 rounded-2xl border-2 shadow-inner cursor-pointer"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Brand Logo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className={`w-full p-4 border-2 border-dashed rounded-2xl transition-all text-sm font-medium ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600/50 hover:border-blue-400 text-gray-100 file:bg-blue-600/80 file:text-white file:border-0"
                      : "bg-white/50 border-gray-300/50 hover:border-blue-400 text-gray-800 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  }`}
                />
                {logo && (
                  <div className="mt-4 p-4 bg-gray-100/80 dark:bg-gray-700/50 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <img
                        src={logo}
                        alt="Logo preview"
                        className="w-12 h-12 object-contain rounded-xl flex-shrink-0"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="range"
                          min="10"
                          max="30"
                          value={logoSize}
                          onChange={(e) => setLogoSize(+e.target.value)}
                          className="flex-1 h-2 accent-blue-500"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {logoSize}%
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setLogo(null)}
                      className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 mt-2 underline font-medium"
                    >
                      Remove Logo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview & Download */}
          <div className="space-y-6 lg:space-y-8">
            <div
              className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border h-fit transition-all ${
                darkMode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/90 border-gray-200/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                  <svg
                    className="w-8 h-8 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Live Preview
                </h3>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={animatePreview}
                    onChange={(e) => setAnimatePreview(e.target.checked)}
                    className="w-5 h-5 accent-blue-500 rounded"
                  />
                  <span>Animate</span>
                </label>
              </div>

              <div
                className={`p-6 sm:p-8 bg-gradient-to-br rounded-3xl transition-all ${
                  darkMode
                    ? "from-gray-700/50 to-gray-800/50 border border-gray-600/30"
                    : "from-white/70 to-gray-50/70 border border-gray-200/50"
                } ${animatePreview ? "qr-studio-anim" : ""}`}
              >
                <div
                  ref={(el) => (qrRefs.current[0] = el)}
                  className="w-full max-w-xs sm:max-w-sm aspect-square mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-4 sm:p-6 border-4 border-white/70 dark:border-gray-200/50 flex items-center justify-center"
                />
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 sm:mt-12 pt-6 sm:pt-12 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => downloadQR("svg")}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10l-5.5 5.5m0 0L7.5 18M7.5 18l-5.5-5.5M19 10l-5.5 5.5m0 0L18.5 18M18.5 18l5.5-5.5"
                    />
                  </svg>
                  SVG
                </button>
                <button
                  onClick={() => downloadQR("png")}
                  className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-sm"
                >
                  PNG
                </button>
                <button
                  onClick={() => downloadQR("jpg")}
                  className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-sm"
                >
                  JPG
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features - Mobile Responsive */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              title: "✅ WiFi FIXED",
              icon: "📶",
              desc: "Network|Password format - Auto-connects instantly",
            },
            {
              title: "12+ QR Types",
              icon: "🎯",
              desc: "URL, WhatsApp, vCard, Bitcoin, Events & more",
            },
            {
              title: "Print Ready",
              icon: "🖨️",
              desc: "High resolution SVG/PNG/JPG exports",
            },
            {
              title: "Dark Mode",
              icon: "🌙",
              desc: "Perfect on any device & theme",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`text-center p-6 sm:p-8 rounded-3xl backdrop-blur-xl hover:scale-105 transition-all duration-300 group ${
                darkMode
                  ? "bg-gray-800/70 border border-gray-700/50"
                  : "bg-white/80 border border-gray-200/50"
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-4 mx-auto">
                {feature.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .qr-studio-anim svg {
          animation: qrFloat 3s ease-in-out infinite;
        }
        @keyframes qrFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }
        @media (max-width: 640px) {
          .grid-cols-2 {
            grid-template-columns: 1fr 1fr;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
