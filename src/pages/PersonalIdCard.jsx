// src/pages/ProfessionalIDCardPDF.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";
import mailimg from "../assets/email.png";
import {
  FaRegHandPointDown,
  FaChevronDown,
  FaCamera,
  FaUpload,
  FaTrash,
} from "react-icons/fa";
import { pdf } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: (direction) => {
    switch (direction) {
      case "left":
        return { x: -50, opacity: 0 };
      case "right":
        return { x: 50, opacity: 0 };
      case "top":
        return { y: -50, opacity: 0 };
      case "bottom":
        return { y: 50, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

function ColorPickers({
  labelColor,
  setLabelColor,
  borderColor,
  setBorderColor,
  headerColor,
  setHeaderColor,
  noteBgColor,
  setNoteBgColor,
  issueBgColor,
  setIssueBgColor,
  showColorPickers,
  isDarkMode,
}) {
  const pickers = [
    {
      label: "Label",
      value: labelColor,
      setter: setLabelColor,
      direction: "top",
    },
    {
      label: "Border",
      value: borderColor,
      setter: setBorderColor,
      direction: "bottom",
    },
    {
      label: "Header",
      value: headerColor,
      setter: setHeaderColor,
      direction: "left",
    },
    {
      label: "Note BG",
      value: noteBgColor,
      setter: setNoteBgColor,
      direction: "right",
    },
    {
      label: "Issue/Expiry BG",
      value: issueBgColor,
      setter: setIssueBgColor,
      direction: "top",
    },
  ];

  return (
    <AnimatePresence>
      {showColorPickers && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`flex flex-wrap gap-8 justify-center mt-8 p-8 rounded-3xl shadow-2xl border backdrop-blur-md transition-all duration-500 ${
            isDarkMode
              ? "bg-gray-800/90 border-gray-700 text-gray-100"
              : "bg-white/90 border-gray-200 text-gray-800"
          }`}
        >
          {pickers.map((picker) => (
            <motion.div
              key={picker.label}
              custom={picker.direction}
              variants={itemVariants}
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base font-semibold">{picker.label}</span>
              <input
                type="color"
                value={picker.value}
                onChange={(e) => picker.setter(e.target.value)}
                className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImageUpload({
  label,
  imagePreview,
  onImageChange,
  onImageRemove,
  isDarkMode,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large (max 5MB)");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image");
      return;
    }
    setError("");
    onImageChange(URL.createObjectURL(file));
  };

  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
        dragActive
          ? "scale-105 shadow-2xl border-blue-500 bg-blue-500/10"
          : "shadow-xl"
      } ${
        isDarkMode
          ? "bg-gray-700/60 border-gray-600 hover:border-blue-400 hover:bg-gray-600/70"
          : "bg-white/80 border-gray-300 hover:border-blue-500 hover:bg-blue-50/80"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {imagePreview && (
        <div className="relative mb-4 rounded-xl overflow-hidden shadow-inner">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onImageRemove();
            }}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all"
          >
            <FaTrash />
          </button>
        </div>
      )}

      <div className="text-center space-y-3">
        <div
          className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg transition-all ${
            isDarkMode
              ? "bg-blue-500/30 text-blue-400"
              : "bg-blue-500/20 text-blue-600"
          }`}
        >
          {imagePreview ? (
            <FaCamera className="text-2xl" />
          ) : (
            <FaUpload className="text-2xl" />
          )}
        </div>
        <div>
          <p
            className={`font-bold text-lg ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {label}
          </p>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Drag & drop or click to upload
          </p>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <p
          className={`text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-500"
          }`}
        >
          PNG, JPG up to 5MB
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}

export default function PersonalIDCard() {
  const [PDFLib, setPDFLib] = useState(null);
  const [JsBarcode, setJsBarcode] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const defaultColors = {
    labelColor: isDarkMode ? "#60a5fa" : "#1e3a8a",
    borderColor: isDarkMode ? "#f87171" : "#dc2626",
    headerColor: isDarkMode ? "#3b82f6" : "#1e3a8a",
    noteBgColor: isDarkMode ? "#1e40af" : "#e0e7ff",
    issueBgColor: isDarkMode ? "#1e40af" : "#e0e7ff",
  };

  const [labelColor, setLabelColor] = useState(defaultColors.labelColor);
  const [borderColor, setBorderColor] = useState(defaultColors.borderColor);
  const [headerColor, setHeaderColor] = useState(defaultColors.headerColor);
  const [noteBgColor, setNoteBgColor] = useState(defaultColors.noteBgColor);
  const [issueBgColor, setIssueBgColor] = useState(defaultColors.issueBgColor);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const [cards, setCards] = useState([
    {
      name: "",
      role: "",
      profession: "",
      phone: "",
      dob: "",
      email: "",
      id: "",
      blood: "",
      village: "",
      post: "",
      postCode: "",
      thana: "",
      district: "",
      profileImage: defaultProfile,
      signatureImage: null,
      issue: "",
      expiry: "",
      watermark: WatermarkImage,
    },
  ]);

  // Update colors when theme changes
  useEffect(() => {
    setLabelColor(defaultColors.labelColor);
    setBorderColor(defaultColors.borderColor);
    setHeaderColor(defaultColors.headerColor);
    setNoteBgColor(defaultColors.noteBgColor);
    setIssueBgColor(defaultColors.issueBgColor);
  }, [isDarkMode]);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <p className="text-2xl text-orange-500">Loading PDF engine...</p>
      </div>
    );

  const { Document, Page, Text, View, Image: PDFImage, StyleSheet } = PDFLib;

  const addCard = () =>
    setCards((prev) => [
      ...prev,
      { ...prev[0], profileImage: defaultProfile, signatureImage: null },
    ]);
  const removeCard = (index) =>
    setCards((prev) => prev.filter((_, i) => i !== index));
  const updateCard = (index, field, value) => {
    setCards((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };
  const resetCard = (index) => {
    setCards((prev) => {
      const updated = [...prev];
      updated[index] = {
        name: "",
        role: "",
        profession: "",
        phone: "",
        dob: "",
        email: "",
        id: "",
        blood: "",
        village: "",
        post: "",
        postCode: "",
        thana: "",
        district: "",
        profileImage: defaultProfile,
        signatureImage: null,
        issue: "",
        expiry: "",
        watermark: WatermarkImage,
      };
      return updated;
    });
  };

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=mailto:${encodeURIComponent(
      email || ""
    )}`;

  const generateBarcodeBase64 = (card) => {
    if (!JsBarcode) return "";
    const canvas = document.createElement("canvas");
    const data = `Name: ${card.name}\nRole: ${card.role}\nPhone: ${card.phone}\nEmail: ${card.email}\nID: ${card.id}\nBlood: ${card.blood}`;
    JsBarcode(canvas, data, {
      format: "CODE128",
      height: 25,
      displayValue: false,
    });
    return canvas.toDataURL("image/png");
  };

  // ORIGINAL PDF STYLES PRESERVED EXACTLY
  const styles = StyleSheet.create({
    page: { padding: 10, fontFamily: "Helvetica" },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    card: {
      width: 180,
      minHeight: 280,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 10,
      backgroundColor: "#f9fafb",
      borderColor: borderColor,
      borderWidth: 4,
      padding: 6,
      position: "relative",
    },
    frontHeader: {
      height: 130,
      width: 350,
      marginTop: -70,
      marginLeft: -35,
      backgroundColor: headerColor,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      transform: "rotate(-15deg)",
      position: "relative",
    },
    yellowStrip: {
      position: "absolute",
      top: 100,
      left: 0,
      width: "100%",
      height: 4,
      backgroundColor: borderColor,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "#fffff",
      borderBottomColor: "rgba(0,0,0,0.3)",
      borderRadius: 1,
      paddingTop: 0.5,
    },
    profileImage: {
      width: "34%",
      aspectRatio: 0.85,
      marginTop: -18,
      padding: 3,
      backgroundColor: borderColor,
    },
    infoBox: {
      padding: 4,
      alignItems: "flex-start",
      marginLeft: 25,
      width: 140,
      flexDirection: "column",
    },
    nameText: {
      fontSize: 11,
      fontWeight: "bold",
      color: headerColor,
      textAlign: "center",
      marginBottom: 10,
      marginTop: 2,
    },
    watermark: {
      position: "absolute",
      top: 168,
      left: 80,
      transform: "translate(-50%, -50%)",
      width: 105,
      height: 105,
      opacity: 0.14,
    },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
    label: { fontSize: 7, fontWeight: "800", color: labelColor, minWidth: 50 },
    value: { fontSize: 8, fontWeight: "bold", color: "#000" },
    footer: {
      position: "absolute",
      bottom: -3,
      left: -1,
      right: -1,
      width: 300,
      height: 20,
      backgroundColor: borderColor,
      color: "#000",
      fontSize: 6,
      textAlign: "center",
      textAlignVertical: "center",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    barcodeContainer: {
      marginTop: 5,
      alignItems: "center",
      marginLeft: 24,
      marginRight: 24,
      borderWidth: 0.5,
      borderColor: headerColor,
      borderRadius: 2,
      backgroundColor: "#fff",
      padding: 2,
    },
    barcodeImage: { width: 80, height: 25 },
    backCard: {
      width: 180,
      minHeight: 280,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 10,
      borderColor: borderColor,
      borderWidth: 4,
      padding: 6,
      position: "relative",
    },
    backTopStrip: {
      position: "absolute",
      top: -2,
      left: -3,
      width: 300,
      height: 22,
      backgroundColor: borderColor,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    backYellowStrip2: {
      position: "absolute",
      bottom: 42,
      left: -8,
      width: 230,
      height: 4,
      backgroundColor: borderColor,
      transform: "rotate(-11deg)",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "rgba(255,255,255,0.6)",
      borderBottomColor: "rgba(0,0,0,0.3)",
      borderRadius: 2,
    },
    backYellowStrip3: {
      position: "absolute",
      bottom: 34,
      left: -8,
      width: 230,
      height: 4,
      backgroundColor: borderColor,
      transform: "rotate(-11deg)",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "rgba(255,255,255,0.6)",
      borderBottomColor: "rgba(0,0,0,0.3)",
      borderRadius: 2,
    },
    backGreenBottom: {
      position: "absolute",
      bottom: -40,
      left: -30,
      width: 260,
      height: 80,
      backgroundColor: headerColor,
      transform: "rotate(169deg)",
      zIndex: 1,
    },
    backContent: {
      padding: 6,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flex: 1,
      zIndex: 1,
      marginTop: 20,
    },
    backAddressText: {
      fontSize: 7,
      alignSelf: "center",
      textAlign: "left",
      color: labelColor,
      marginTop: 4,
      fontWeight: "600",
    },
    qrBox: { width: 60, height: 60, alignSelf: "center", marginTop: 8 },
    qrText: { fontSize: 6, textAlign: "center", color: labelColor },
    noteBox: {
      backgroundColor: noteBgColor,
      padding: 4,
      borderRadius: 7,
      marginTop: 7,
    },
    noteText: {
      fontSize: 6,
      fontStyle: "italic",
      textAlign: "center",
      color: labelColor,
    },
    signatureImage: {
      width: 90,
      height: 30,
      marginTop: 10,
      marginBottom: 2,
      alignSelf: "center",
    },
    backIssueExpiryContainer: {
      position: "absolute",
      bottom: 3,
      right: 0,
      width: 70,
      backgroundColor: issueBgColor,
      borderWidth: 1,
      borderColor: headerColor,
      borderRadius: 3,
      padding: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      zIndex: 10,
    },
    backIssueExpiryText: {
      fontSize: 4,
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  const MyDocument = ({ cards }) => (
    <Document>
      {cards.map((card, idx) => (
        <Page key={idx} size="A4" style={styles.page}>
          <View style={styles.cardContainer}>
            {/* Front Card */}
            <View style={styles.card}>
              <View style={styles.frontHeader}>
                <View style={[styles.yellowStrip, { top: 122 }]} />
                <View style={[styles.yellowStrip, { top: 130 }]} />
              </View>
              <View style={{ alignItems: "center" }}>
                <PDFImage
                  style={styles.profileImage}
                  src={card.profileImage || defaultProfile}
                />
              </View>
              <Text style={styles.nameText}>{card.name || "Name"}</Text>
              <PDFImage
                src={card.watermark || WatermarkImage}
                style={styles.watermark}
              />
              <View style={styles.infoBox}>
                {["profession", "dob", "phone", "id", "blood"].map(
                  (field) =>
                    card[field] && (
                      <View style={styles.infoRow} key={field}>
                        <Text style={styles.label}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </Text>
                        <Text style={styles.value}>{card[field]}</Text>
                      </View>
                    )
                )}
              </View>
              <View style={styles.barcodeContainer}>
                <PDFImage
                  style={styles.barcodeImage}
                  src={generateBarcodeBase64(card)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                <PDFImage
                  src={mailimg}
                  style={{ width: 10, height: 10, marginRight: 4 }}
                />
                <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                  {card.email || "N/A"}
                </Text>
              </View>
              <Text style={styles.footer}></Text>
            </View>

            {/* Back Card */}
            <View style={styles.backCard}>
              <View style={styles.backTopStrip}></View>
              <View style={styles.backYellowStrip2} />
              <View style={styles.backYellowStrip3} />
              <View style={styles.backGreenBottom}></View>
              <View style={styles.backContent}>
                <Text style={styles.backAddressText}>
                  {[card.village?.trim(), card.post?.trim()]
                    .filter(Boolean)
                    .join(", ")}
                  {card.postCode && ` – ${card.postCode.trim()}`}
                </Text>
                <Text style={styles.backAddressText}>
                  {[card.thana?.trim(), card.district?.trim()]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
                <View style={styles.qrBox}>
                  <PDFImage
                    style={{ width: 60, height: 60 }}
                    src={generateEmailQR(card.email)}
                  />
                  <Text style={styles.qrText}>Scan to Email</Text>
                </View>
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    "This ID card is property of personal. Please carry it at
                    all times. If found, kindly contact me."
                  </Text>
                </View>
                {card.signatureImage && (
                  <PDFImage
                    style={styles.signatureImage}
                    src={card.signatureImage}
                  />
                )}
                <Text
                  style={{
                    fontSize: 5,
                    textAlign: "center",
                    marginTop: 2,
                    color: labelColor,
                  }}
                >
                  Authorized Signature
                </Text>
                <View style={styles.backIssueExpiryContainer}>
                  <Text style={styles.backIssueExpiryText}>
                    Issue: {card.issue || "N/A"}
                  </Text>
                  <Text style={styles.backIssueExpiryText}>
                    Expiry: {card.expiry || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );

  const downloadPDF = async () => {
    const blob = await pdf(<MyDocument cards={cards} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "personal-id-cards.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto  sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl shadow-2xl p-4 md:p-6 lg:p-12 backdrop-blur-xl border ${
            isDarkMode
              ? "bg-gray-800/80 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <motion.h2
            className={`text-4xl lg:text-5xl font-extrabold text-center mb-12 ${
              isDarkMode ? "text-blue-400" : "text-indigo-600"
            }`}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Personal ID Card Generator
          </motion.h2>

          {/* Color Customization */}
          <div className="flex flex-col items-center mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              } mb-4`}
            >
              <FaRegHandPointDown className="text-5xl" />
            </motion.div>
            <motion.button
              onClick={() => setShowColorPickers(!showColorPickers)}
              className={`px-10 cursor-pointer py-4 rounded-full font-bold text-white shadow-2xl transition-all ${
                isDarkMode
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showColorPickers ? "Hide" : "Customize"} Colors
              <FaChevronDown className="inline ml-2" />
            </motion.button>
            <ColorPickers
              {...{
                labelColor,
                setLabelColor,
                borderColor,
                setBorderColor,
                headerColor,
                setHeaderColor,
                noteBgColor,
                setNoteBgColor,
                issueBgColor,
                setIssueBgColor,
                showColorPickers,
                isDarkMode,
              }}
            />
          </div>

          {/* Forms */}
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl p-3 md:p-5 lg:p-8 mb-12 shadow-2xl border ${
                isDarkMode
                  ? "bg-gray-700/60 border-gray-600"
                  : "bg-white/90 border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-8 text-center ${
                  isDarkMode ? "text-blue-300" : "text-indigo-700"
                }`}
              >
                Card #{idx + 1}
              </h3>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* Text Inputs */}
                <div className="space-y-6">
                  {[
                    "name",
                    "role",
                    "profession",
                    "phone",
                    "dob",
                    "email",
                    "id",
                    "blood",
                  ].map((field) => (
                    <div key={field}>
                      <label
                        className={`block font-semibold mb-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {field.charAt(0).toUpperCase() +
                          field.slice(1).replace("dob", "Date of Birth")}
                      </label>
                      <input
                        type={
                          field === "dob" || field === "email" ? field : "text"
                        }
                        value={card[field] || ""}
                        onChange={(e) => updateCard(idx, field, e.target.value)}
                        className={`w-full px-5 py-3 rounded-xl border-2 transition-all ${
                          isDarkMode
                            ? "bg-gray-600/50 border-gray-500 text-white focus:border-blue-400"
                            : "bg-white border-gray-300 focus:border-indigo-500"
                        } focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Images & Address */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ImageUpload
                      label="Profile Photo"
                      imagePreview={
                        card.profileImage !== defaultProfile
                          ? card.profileImage
                          : null
                      }
                      onImageChange={(url) =>
                        updateCard(idx, "profileImage", url)
                      }
                      onImageRemove={() =>
                        updateCard(idx, "profileImage", defaultProfile)
                      }
                      isDarkMode={isDarkMode}
                    />
                    <ImageUpload
                      label="Signature"
                      imagePreview={card.signatureImage}
                      onImageChange={(url) =>
                        updateCard(idx, "signatureImage", url)
                      }
                      onImageRemove={() =>
                        updateCard(idx, "signatureImage", null)
                      }
                      isDarkMode={isDarkMode}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      "village",
                      "post",
                      "postCode",
                      "thana",
                      "district",
                      "issue",
                      "expiry",
                    ].map((field) => (
                      <div key={field}>
                        <label
                          className={`block font-semibold mb-2 ${
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {field.charAt(0).toUpperCase() +
                            field.slice(1).replace("Code", " Code")}
                        </label>
                        <input
                          type={
                            field.includes("issue") || field.includes("expiry")
                              ? "date"
                              : "text"
                          }
                          value={card[field] || ""}
                          onChange={(e) =>
                            updateCard(idx, field, e.target.value)
                          }
                          className={`w-full px-5 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode
                              ? "bg-gray-600/50 border-gray-500 text-white focus:border-blue-400"
                              : "bg-white border-gray-300 focus:border-indigo-500"
                          } focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  onClick={() => resetCard(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 cursor-pointer py-3 rounded-xl font-bold ${
                    isDarkMode
                      ? "bg-yellow-600 text-black hover:bg-yellow-500"
                      : "bg-yellow-500 hover:bg-yellow-600 text-black"
                  }`}
                >
                  Reset Card
                </motion.button>
                {cards.length > 1 && (
                  <motion.button
                    onClick={() => removeCard(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white"
                  >
                    Remove Card
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <motion.button
              onClick={addCard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-12 py-5 cursor-pointer rounded-2xl font-bold text-xl shadow-2xl ${
                isDarkMode
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              }`}
            >
              ➕ Add New Card
            </motion.button>

            {/* Download PDF Button with Loading Effect */}

            {/* Download Button with Inline CSS Effects */}
            <motion.button
              onClick={async () => {
                setIsDownloading(true);
                setDownloadSuccess(false);

                try {
                  await downloadPDF(); // Your existing function
                } catch (error) {
                  console.error("PDF generation failed:", error);
                } finally {
                  setIsDownloading(false);
                  setDownloadSuccess(true);
                  setTimeout(() => setDownloadSuccess(false), 3000); // Success visible for 3 seconds
                }
              }}
              disabled={isDownloading}
              whileHover={{ scale: isDownloading ? 1 : 1.08 }}
              whileTap={{ scale: isDownloading ? 1 : 0.95 }}
              style={{
                position: "relative",
                padding: "1.25rem 3rem",
                borderRadius: "1.5rem",
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "white",
                background: isDarkMode
                  ? "linear-gradient(135deg, #ea580c, #dc2626)"
                  : "linear-gradient(135deg, #f97316, #ef4444)",
                border: "none",
                cursor: isDownloading ? "not-allowed" : "pointer",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "all 0.5s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                minWidth: "280px",
              }}
            >
              {/* Shimmer Sweep Effect */}
              {isDownloading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transform: "translateX(-100%)",
                    animation: "shimmer 2s infinite",
                  }}
                />
              )}

              {/* Pulsing Glow Ring */}
              {isDownloading && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    right: "-8px",
                    bottom: "-8px",
                    border: "4px solid rgba(255,255,255,0.5)",
                    borderRadius: "1.8rem",
                    animation: "pulseRing 1.5s infinite",
                  }}
                />
              )}

              {/* Floating Sparkles (Particles) */}
              {isDownloading && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      width: "6px",
                      height: "6px",
                      background: "white",
                      borderRadius: "50%",
                      top: "30%",
                      left: "20%",
                      animation: "sparkle1 2s infinite",
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "8px",
                      height: "8px",
                      background: "white",
                      borderRadius: "50%",
                      top: "60%",
                      right: "25%",
                      animation: "sparkle2 2.5s infinite",
                      opacity: 0.7,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "7px",
                      height: "7px",
                      background: "white",
                      borderRadius: "50%",
                      bottom: "30%",
                      left: "40%",
                      animation: "sparkle3 3s infinite",
                      opacity: 0.9,
                    }}
                  />
                </>
              )}

              {/* Spinner */}
              {isDownloading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "4px solid rgba(255,255,255,0.3)",
                    borderTop: "4px solid white",
                    borderRadius: "50%",
                  }}
                />
              )}

              {/* Success Celebration */}
              {downloadSuccess && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: [0, 1.4, 1], rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  style={{ fontSize: "2.5rem" }}
                >
                  🎉
                </motion.div>
              )}

              {/* Success Checkmark */}
              {downloadSuccess && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  style={{ fontSize: "2rem" }}
                >
                  ✓
                </motion.span>
              )}

              {/* Button Text */}
              <span
                style={{
                  position: "relative",
                  zIndex: 10,
                  fontSize: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {downloadSuccess
                  ? "Downloaded 👍"
                  : isDownloading
                  ? "Generating PDF..."
                  : "📄 Download PDF"}
              </span>

              {/* All Animations Defined Inline */}
              <style jsx>{`
                @keyframes shimmer {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }
                @keyframes pulseRing {
                  0% {
                    transform: scale(1);
                    opacity: 0.4;
                  }
                  50% {
                    transform: scale(1.1);
                    opacity: 0.8;
                  }
                  100% {
                    transform: scale(1);
                    opacity: 0.4;
                  }
                }
                @keyframes sparkle1 {
                  0%,
                  100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.8;
                  }
                  50% {
                    transform: translateY(-20px) translateX(15px);
                    opacity: 1;
                  }
                }
                @keyframes sparkle2 {
                  0%,
                  100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.7;
                  }
                  50% {
                    transform: translateY(-25px) translateX(-20px);
                    opacity: 1;
                  }
                }
                @keyframes sparkle3 {
                  0%,
                  100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.9;
                  }
                  50% {
                    transform: translateY(-30px) translateX(10px);
                    opacity: 1;
                  }
                }
              `}</style>
            </motion.button>
          </div>

          <p
            className={`text-center mt-10 text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Generate beautiful personal ID cards instantly with full
            customization.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
