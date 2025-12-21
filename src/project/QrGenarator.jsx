import React, { useEffect, useRef, useState, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  { key: "square", label: "Square", icon: "■" },                     // Default, works everywhere
  { key: "rounded", label: "Rounded", icon: "⬤" },                  // Soft rounded square
  { key: "dots", label: "Dots", icon: "•" },                         // Perfect circles
  { key: "extra-rounded", label: "Extra Rounded", icon: "○" },       // Very soft, pill-like
  { key: "circle", label: "Circle", icon: "⭕" },                    // Full circles (qrious, qrcode.react)
  { key: "diamond", label: "Diamond", icon: "◇" },                   // Rotated square / diamond
  { key: "classy", label: "Classy", icon: "✦" },                     // Elegant gradient (qrcode.react)
  { key: "classy-rounded", label: "Classy Rounded", icon: "✦○" },    // Classy + rounded (qrcode.react)
  { key: "horizontal-line", label: "Horizontal Lines", icon: "―" },  // Thin horizontal bars (qrious)
  { key: "vertical-line", label: "Vertical Lines", icon: "│" },      // Thin vertical bars (qrious)
  { key: "star", label: "Star", icon: "✦" },                         // Star shape (some forks + custom)
  { key: "heart", label: "Heart", icon: "♡" },                       // Heart shape (some forks + custom)
];

const ERROR_CORRECTION_OPTIONS = [
  { label: "Low (L) – ~7% damage tolerance", value: "L" },
  { label: "Medium (M) – ~15% damage tolerance", value: "M" },
  { label: "Quartile (Q) – ~25% damage tolerance", value: "Q" },
  { label: "High (H) – ~30% damage tolerance", value: "H" },
  // New: Ultra high reliability (great for printed posters, outdoor signs, etc.)

];

const QR_TYPES = [
  { value: "text", label: "Text", icon: "📄" },
  { value: "url", label: "URL", icon: "🌐" },
  { value: "email", label: "Email", icon: "✉️" },
  { value: "phone", label: "Phone", icon: "📞" },
  { value: "whatsapp", label: "WhatsApp", icon: "💬" },
  { value: "sms", label: "SMS", icon: "📱" },

  { value: "telegram", label: "Telegram", icon: "✈️" },
  { value: "paypal", label: "PayPal", icon: "💳" },
  { value: "bitcoin", label: "Bitcoin", icon: "₿" },
  { value: "wifi", label: "WiFi", icon: "📶" },
  { value: "location", label: "Location", icon: "📍" },
  { value: "event", label: "Event", icon: "📅" },
];

const presets = [
  // Default / Reset style
  {
    name: "Default",
    fg: "#000000",  // Dark on light
    bg: "#FFFFFF",
    style: "square",
    corner: "square",
  },
  // Modern & Popular Styles
  {
    name: "Dark Mode",
    bg: "#b5b8bd",  
    fg: "#1F2937",
    style: "square",
    corner: "square",
  },
  {
    name: "Neon Red",
    fg: "#d60505",
    bg: "#ffffff",  // Pure black BG → light pink FG works
    style: "rounded",
    corner: "rounded",
  },
  {
    name: "Vintage",
    fg: "#2D1B12",
    bg: "#F5E8D3",
    style: "dot",
    corner: "rounded",
  },
  {
    name: "Cyber",
    fg: "#0bcb25",  // Changed to white for pure black BG (scannable)
    bg: "#f2ffeb",
    style: "rounded",
    corner: "rounded",
  },
  {
    name: "Monochrome",
    fg: "#333333",
    bg: "#F9F9F9",
    style: "square",
    corner: "square",
  },
  {
    name: "Classic",
    fg: "#0909d1",  // Dark on black BG? No—swap in generator
    bg: "#fff2f3",  // Fixed: light BG for dark FG
    style: "square",
    corner: "square",
  },
  {
    name: "Purple Luxury",
    fg: "#840297",  // White for dark BG (scannable alternative to gold)
    bg: "#fffeff",
    style: "dot",
    corner: "rounded",
  },
  {
    name: "Pastel Dream",
    fg: "#045776",
    bg: "#F3F8FF",
    style: "rounded",
    corner: "rounded",
  },
  {
    name: "Matrix",
    fg: "#065d40",  // Bright green on black works well
    bg: "#ffffff",
    style: "square",
    corner: "square",
  },
];


function useSystemTheme() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);
    const handler = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return darkMode;
}

function getDefaultQRSize() {
  return window.innerWidth < 768 ? 200 : 300;
}

export default function ProfessionalQRGenerator() {
  const [qrType, setQrType] = useState("url");

  // Input states (same as before)
  const [textValue, setTextValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [whatsappValue, setWhatsappValue] = useState("");
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");

  const [telegramUsername, setTelegramUsername] = useState("");
  const [paypalUsername, setPaypalUsername] = useState("");
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [showWifiPassword, setShowWifiPassword] = useState(false);
  const [locationCoords, setLocationCoords] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");

  // Settings
  const [countryCode, setCountryCode] = useState("880");
  const [size, setSize] = useState(getDefaultQRSize());
  const [margin, setMargin] = useState(4);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pixelStyle, setPixelStyle] = useState("square");
  const [cornerStyle, setCornerStyle] = useState("square");
  const [logo, setLogo] = useState(null);

  const [showAll, setShowAll] = useState(false);

  const qrRef = useRef(null);
  const qrInstance = useRef(null);

const [isOpen, setIsOpen] = useState(false);
const cornerRef = useRef(null);






  const darkMode = useSystemTheme();

  useEffect(() => {
    const handleResize = () => {
      const newSize = getDefaultQRSize();
      if ([200, 300].includes(size)) setSize(newSize);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  const getFormattedData = useCallback(() => {
    const cleanNumber = (num) => num.replace(/[^\d]/g, "");
    const withCountry = (num) => `${countryCode}${cleanNumber(num)}`;

    switch (qrType) {
      case "text":
        return textValue.trim() || " ";
      case "url": {
        const url = urlValue.trim();
        return url ? (url.startsWith("http") ? url : `https://${url}`) : " ";
      }
      case "email":
        return `mailto:${emailTo.trim()}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
      case "phone":
        return `tel:${withCountry(phoneValue)}`;
      case "whatsapp":
        return `https://wa.me/${withCountry(whatsappValue)}`;
      case "sms":
        return `sms:${withCountry(smsPhone)}?body=${encodeURIComponent(
          smsMessage
        )}`;

      case "telegram": {
        const username = telegramUsername.trim().replace(/^@/, "");
        return username ? `tg://resolve?domain=${username}` : " ";
      }
      case "paypal":
        return `https://paypal.me/${paypalUsername.trim()}`;
      case "bitcoin":
        return `bitcoin:${bitcoinAddress.trim()}`;
      case "wifi": {
        const enc = wifiPassword ? "WPA" : "none";
        return `WIFI:T:${enc};S:${wifiSSID};P:${wifiPassword};;`;
      }
      case "location":
        return `geo:${locationCoords.trim()}`;
      case "event":
        return `BEGIN:VEVENT\nSUMMARY:Event\nDTSTART:${eventDateTime.trim()}\nEND:VEVENT`;
      default:
        return " ";
    }
  }, [
    qrType,
    textValue,
    urlValue,
    emailTo,
    emailSubject,
    emailBody,
    phoneValue,
    whatsappValue,
    smsPhone,
    smsMessage,
    telegramUsername,
    paypalUsername,
    bitcoinAddress,
    wifiSSID,
    wifiPassword,
    locationCoords,
    eventDateTime,
    countryCode,
  ]);

  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: size,
      height: size,
      data: getFormattedData(),
      margin,
      image: logo || undefined,
      qrOptions: { errorCorrectionLevel: errorCorrection },
      dotsOptions: { type: pixelStyle, color: fgColor },
      cornersSquareOptions: { type: cornerStyle, color: fgColor },
      cornersDotOptions: { type: "dot", color: fgColor },
      backgroundOptions: { color: bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 10 },
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrInstance.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (!qrInstance.current) return;
    qrInstance.current.update({
      data: getFormattedData(),
      width: size,
      height: size,
      margin,
      image: logo || undefined,
      dotsOptions: { type: pixelStyle, color: fgColor },
      cornersSquareOptions: { type: cornerStyle, color: fgColor },
      backgroundOptions: { color: bgColor },
      qrOptions: { errorCorrectionLevel: errorCorrection },
    });
  }, [
    getFormattedData,
    size,
    margin,
    fgColor,
    bgColor,
    pixelStyle,
    cornerStyle,
    logo,
    errorCorrection,
  ]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setLogo(null);
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const downloadQR = async (format = "png") => {
    if (!qrInstance.current) return;
    const blob = await qrInstance.current.getRawData(format);
    saveAs(blob, `qr-${qrType}.${format}`);
  };

  const renderInputForm = () => {
    const commonInput = (
      label,
      value,
      setValue,
      placeholder,
      type = "text"
    ) => (
      <div>
        <label className="block text-sm font-medium mt-5 mb-1">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full mb-2  p-3 rounded-xl border-2  focus:ring-2 focus:ring-purple-500 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
      </div>
    );

    switch (qrType) {
      case "url":
        return commonInput(
          "Website URL",
          urlValue,
          setUrlValue,
          "https://example.com"
        );
      case "email":
        return (
          <div className="space-y-4">
            {commonInput("To", emailTo, setEmailTo, "recipient@example.com")}

            <div>
              <label className="block text-sm font-medium mb-1">Body</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Your message here..."
                rows={4}
                className={`w-full p-3 rounded-xl border-2 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
          </div>
        );
      case "phone":
      case "whatsapp":
        return (
          <>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className={`w-full max-w-full p-3 rounded-xl border-2 text-sm ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  +{c.code} {c.name}
                </option>
              ))}
            </select>
            {commonInput(
              "Phone Number",
              qrType === "whatsapp" ? whatsappValue : phoneValue,
              qrType === "whatsapp" ? setWhatsappValue : setPhoneValue,
              "01700000000"
            )}
          </>
        );
      case "sms":
        return (
          <>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className={`w-full max-w-full p-3 rounded-xl border-2 text-sm ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  +{c.code} {c.name}
                </option>
              ))}
            </select>
            {commonInput("Phone Number", smsPhone, setSmsPhone, "01700000000")}
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder="Your message here..."
                rows={3}
                className={`w-full p-3 rounded-xl border-2 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
          </>
        );

      // ... (rest of the cases remain the same)
      case "telegram":
        return commonInput(
          "Telegram Username",
          telegramUsername,
          setTelegramUsername,
          "@username or username"
        );
      case "paypal":
        return commonInput(
          "PayPal Username",
          paypalUsername,
          setPaypalUsername,
          "yourpaypalusername"
        );
      case "bitcoin":
        return commonInput(
          "Bitcoin Address",
          bitcoinAddress,
          setBitcoinAddress,
          "bc1q..."
        );
      case "wifi":
        return (
          <div className="space-y-4">
            {commonInput(
              "Network Name (SSID)",
              wifiSSID,
              setWifiSSID,
              "MyWiFi"
            )}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Password (optional)
              </label>
              <input
                type={showWifiPassword ? "text" : "password"}
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="password123"
                className={`w-full p-3 rounded-xl border-2 pr-10 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowWifiPassword(!showWifiPassword)}
                className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
              >
                {showWifiPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        );
      case "location":
        return commonInput(
          "Coordinates (lat,long)",
          locationCoords,
          setLocationCoords,
          "23.8103,90.4125"
        );
      case "event":
        return commonInput(
          "Event Start (YYYYMMDDTHHMMSS)",
          eventDateTime,
          setEventDateTime,
          "20251225T180000"
        );














        t
      default:
        return (
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Enter any text..."
            rows={4}
            className={`w-full p-3 rounded-xl border-2 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 transition-colors duration-700 overflow-x-hidden ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="p-8 rounded-3xl relative bg-gradient-to-br from-slate-900/20 to-slate-800/20 dark:from-slate-50/5 dark:to-slate-100/10 backdrop-blur-xl border-0 overflow-hidden max-w-4xl mx-auto my-8 animate-border-glow">
          <div className="relative z-10 text-center">
            <h1 className="text-4xl lg:text-5xl sm:text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              QR Studio Pro
            </h1>
            <p
              className={`mt-3 text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } font-medium`}
            >
              Create beautiful, customizable QR codes in seconds
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Customize Panel */}
          <div className="lg:col-span-3">
            <div
              className={`rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl border  ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-white/90 border-gray-200"
              }`}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                  🎨
                </span>
                Customize
              </h2>

              {/* QR Type Selection */}
              <div className="mb-10">
                <label className="block text-sm font-semibold uppercase tracking-wide mb-4 text-gray-600 dark:text-gray-300">
                  QR Type
                </label>
                <div className="grid grid-cols-3  gap-3 max-w-full overflow-x-hidden">
                  {" "}
                  {/* Key fixes here */}
                  {QR_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setQrType(type.value)}
                      className={`p-3 cursor-pointer rounded-2xl text-sm font-medium transition-all flex flex-col items-center gap-2 touch-manipulation
          ${
            qrType === type.value
              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105"
              : darkMode
              ? "bg-slate-700 hover:bg-slate-600 text-gray-100"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
                    >
                      <span className="text-3xl">{type.icon}</span>
                      <span className="text-xs">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            {/* Input Form */}
<div className="relative space-y-6 mb-10 rounded-3xl p-4 md:p-6 lg:p-8 overflow-hidden group">
  {/* Animated gradient border */}
  <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 animate-gradient-x">
    <div className="absolute inset-[2px] rounded-[22px] bg-white dark:bg-slate-900"></div>
  </div>

  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-5">
      Enter Details
    </h3>
    {renderInputForm()}
  </div>

  {/* Subtle glow on hover */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
</div>

              {/* Presets */}
              <div className="mb-10">
                <label className="block text-sm font-semibold uppercase tracking-wide mb-4 text-gray-600 dark:text-gray-300">
                  Quick Styles
                </label>
                <div className="relative">
                  <div
                    className={`
      grid grid-cols-2 lg:grid-cols-3 gap-3
      ${!showAll ? "max-md:max-h-[220px] max-md:overflow-hidden" : ""}
    `}
                  >
                    {presets.slice(0, showAll ? presets.length : 5).map((p) => {
                      const isSelected =
                        fgColor === p.fg &&
                        bgColor === p.bg &&
                        pixelStyle === p.style &&
                        cornerStyle === p.corner;

                      return (
                        <button
                          key={p.name}
                          onClick={() => {
                            setFgColor(p.fg);
                            setBgColor(p.bg);
                            setPixelStyle(p.style);
                            setCornerStyle(p.corner);
                          }}
                          className={`
              py-3 px-4 cursor-pointer rounded-2xl font-medium text-sm transition-all duration-200
              flex items-center justify-center text-center
              active:scale-95 touch-manipulation
              ${
                isSelected
                  ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl ring-4 ring-blue-500/40 scale-105"
                  : darkMode
                  ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }
            `}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Show More - ALL DEVICES */}
                  {!showAll && presets.length > 5 && (
                    <button
                      onClick={() => setShowAll(true)}
                      className="mt-4 cursor-pointer w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-medium rounded-2xl transition-all duration-200 active:scale-95"
                    >
                      Show More Styles
                    </button>
                  )}

                  {/* Show Less - ALL DEVICES */}
                  {showAll && presets.length > 5 && (
                    <button
                      onClick={() => setShowAll(false)}
                      className="mt-4 w-full py-3 px-4 bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400 text-white font-medium rounded-2xl transition-all duration-200 active:scale-95"
                    >
                      Show Less
                    </button>
                  )}
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Advanced Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Size: {size}px
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="600"
                      value={size}
                      onChange={(e) => setSize(+e.target.value)}
                      className="w-full h-3 rounded-full accent-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Margin: {margin}px
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="30"
                      value={margin}
                      onChange={(e) => setMargin(+e.target.value)}
                      className="w-full h-3 rounded-full accent-purple-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Foreground Color
                    </label>
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full h-12 rounded-xl cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full h-12 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* ========== PREMIUM DOT STYLE PICKER (only 4 visible, scrollable) ========== */}
  <div className="relative group">
    <label className="block text-xl mt-2 text-center font-bold text-gray-600 dark:text-gray-300 mb-">
      Dot Style
    </label>

    <div className="h-[250px] md:h-[290px] lg:h-[320px] overflow-x-hidden pt-4 pr-2 pl-3 scrollbar-thin scrollbar-thumb-purple-500/60 scrollbar-track-transparent rounded-2xl">
      <div className="grid grid-cols-2 gap-4">
        {PIXEL_STYLES.map((style) => (
          <button
            key={style.key}
            type="button"
            onClick={() => setPixelStyle(style.key)}
            className={`relative cursor-pointer flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 group/card
              ${pixelStyle === style.key
                ? "border-purple-500 bg-purple-500/15 shadow-lg shadow-purple-500/30 scale-105"
                : "border-transparent hover:border-purple-400/50 hover:bg-purple-500/10 hover:scale-105"
              }
              ${darkMode ? "hover:bg-slate-800/50" : "hover:bg-purple-50"}
            `}
          >
            {/* Selected badge */}
            {pixelStyle === style.key && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Icon */}
            <div className="text-4xl mb-3 transition-transform duration-300 group-hover/card:scale-125">
              {style.icon}
            </div>

            {/* Label */}
            <span className={`text-sm font-medium text-center transition-colors ${
              pixelStyle === style.key 
                ? "text-purple-600 dark:text-purple-400" 
                : "text-gray-700 dark:text-gray-300"
            }`}>
              {style.label}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Subtle glow overlay */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  </div>

  {/* ========== CLASSIC CORNER STYLE DROPDOWN (premium style) ========== */}
  <div>
    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
      Corner Style
    </label>




   <div className="relative">
  <select
    value={cornerStyle}
    onChange={(e) => setCornerStyle(e.target.value)}
    className={`w-full cursor-pointer px-5 py-4 rounded-2xl border-2 bg-transparent appearance-none transition-all duration-300
      focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 outline-none text-base font-medium
      ${darkMode 
        ? "bg-slate-800/70 border-slate-700/60 text-slate-100 hover:bg-slate-700/80 hover:border-slate-500/80 hover:shadow-lg hover:shadow-slate-400/30"
        : "bg-white/90 border-gray-200/70 text-gray-900 hover:bg-white/100 hover:border-gray-300/80 hover:shadow-lg hover:shadow-gray-300/40"
      }
    `}
  >
    <option value="square" className="bg-white text-gray-900">Square</option>
    <option value="rounded" className="bg-white text-gray-900">Rounded</option>
    <option value="extra-rounded" className="bg-white text-gray-900">Extra Rounded</option>
    <option value="dot" className="bg-white text-gray-900">Dots</option>
    <option value="circle" className="bg-white text-gray-900">Circle</option>
    <option value="diamond" className="bg-white text-gray-900">Diamond</option>
    <option value="square-rounded" className="bg-white text-gray-900">Square + Rounded</option>
    <option value="classy" className="bg-white text-gray-900">Classy</option>
  </select>
  
  {/* Dynamic Arrow Icon */}
  <svg 
    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 pointer-events-none text-xl transform ${
      darkMode 
        ? "text-slate-400 group-hover:text-slate-200" 
        : "text-gray-400 group-hover:text-gray-600"
    } ${cornerStyle ? 'rotate-0' : 'rotate-180'}`}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    width="20" 
    height="20"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>







  </div>
</div>


                <div>
                  <label className="block text-sm font-medium mb-2">
                    Error Correction
                  </label>
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                    className={`w-full cursor-pointer p-3 rounded-xl ${
                      darkMode ? "bg-slate-700" : "bg-gray-100"
                    }`}
                  >
                    {ERROR_CORRECTION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

              
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-3xl p-3 sm:p-8 shadow-2xl backdrop-blur-xl border ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-white/90 border-gray-200"
              }`}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                  👁️
                </span>
                Live Preview
              </h2>

              <div className="flex justify-center p-8 sm:p-12 rounded-3xl bg-slate-900/20 dark:bg-slate-900/60">
                <div
                  ref={qrRef}
                  className="shadow-2xl rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800"
                />
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <button
                  onClick={() => downloadQR("svg")}
                  className="py-4 cursor-pointer rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition"
                >
                  SVG
                </button>
                <button
                  onClick={() => downloadQR("png")}
                  className="py-4 cursor-pointer rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 transition"
                >
                  PNG
                </button>
                <button
                  onClick={() => downloadQR("jpg")}
                  className="py-4 cursor-pointer rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 transition"
                >
                  JPG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


























