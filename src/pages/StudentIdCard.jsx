import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";

import PremiumDownloadButton from "../component/PremiumDownloadButton"; // Adjust path
import mailimg from "../assets/email.png";
import { FaRegHandPointDown, FaChevronDown } from "react-icons/fa";
import { pdf } from "@react-pdf/renderer";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
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
          className="flex flex-wrap gap-6 sm:gap-8 justify-center mt-8 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/90 dark:bg-gray-900/90"
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
              <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                {picker.label}
              </span>
              <input
                type="color"
                value={picker.value}
                onChange={(e) => picker.setter(e.target.value)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl cursor-pointer border-4 border-white dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function StudentIdCard() {
  const [PDFLib, setPDFLib] = useState(null);
  const [JsBarcode, setJsBarcode] = useState(null);

  // Default colors
  const defaultLabelColor = "#1e3a8a";
  const defaultBorderColor = "#dc2626";
  const defaultHeaderColor = "#1e3a8a";
  const defaultNoteBgColor = "#e0e7ff";
  const defaultIssueBgColor = "#e0e7ff";
  const defaultProfileImage = defaultProfile;
  const defaultWatermark = WatermarkImage;

  // Customization states
  const [labelColor, setLabelColor] = useState(defaultLabelColor);
  const [borderColor, setBorderColor] = useState(defaultBorderColor);
  const [headerColor, setHeaderColor] = useState(defaultHeaderColor);
  const [noteBgColor, setNoteBgColor] = useState(defaultNoteBgColor);
  const [issueBgColor, setIssueBgColor] = useState(defaultIssueBgColor);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const [cards, setCards] = useState([
    {
      name: "",
      roll: "",
      regNo: "",
      dept: "",
      session: "",
      phone: "",
      email: "",
      id: "",
      bloodGroup: "",
      village: "",
      post: "",
      postCode: "",
      thana: "",
      district: "",
      profileImage: defaultProfileImage,
      signatureImage: null,
      issue: "",
      expiry: "",
      watermark: defaultWatermark,
      logo: null,
      organizationName: "",
      organizationEmail: "",
      organizationWebsite: "",
      organizationPhone: "",
    },
  ]);

  // Automatically follow system theme (light/dark)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Initial check
    handleThemeChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Load libraries
  useEffect(() => {
    import("@react-pdf/renderer").then((module) => {
      setPDFLib(module);
      module.Font.registerHyphenationCallback((word) => [word]);
    });
    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-2xl text-orange-500 dark:text-orange-400">
          Loading PDF engine...
        </p>
      </div>
    );

  const { Document, Page, Text, View, StyleSheet, Image } = PDFLib;

  const addCard = () => setCards((prev) => [...prev, { ...prev[0] }]);

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
        roll: "",
        phone: "",
        email: "",
        regNo: "",
        session: "",
        id: "",
        bloodGroup: "",
        village: "",
        post: "",
        postCode: "",
        thana: "",
        district: "",
        profileImage: defaultProfile,
        signatureImage: null,
        issue: "",
        expiry: "",
        watermark: defaultWatermark,
        logo: null,
        organizationName: "",
        organizationEmail: "",
        organizationWebsite: "",
        organizationPhone: "",
        dept: "",
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
    const data = `Name: ${card.name}\nRoll: ${card.roll}\nDept: ${card.dept}\nSession: ${card.session}\nPhone: ${card.phone}\nEmail: ${card.email}\nBlood: ${card.bloodGroup}`;
    JsBarcode(canvas, data, {
      format: "CODE128",
      height: 25,
      displayValue: false,
    });
    return canvas.toDataURL("image/png");
  };

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
      minHeight: 290,
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
      top: 174,
      left: 80,
      transform: "translate(-50%, -50%)",
      width: 100,
      height: 100,
      opacity: 0.14,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 2,
    },
    label: {
      fontSize: 7,
      fontWeight: "800",
      color: labelColor,
      minWidth: 40,
      marginRight: 4,
    },
    value: {
      fontSize: 8,
      fontWeight: "bold",
      color: "#000",
      flexShrink: 1,
    },
    barcodeContainer: {
      marginTop: 4,
      alignSelf: "center",
      paddingHorizontal: 2,
      paddingVertical: 1,
      borderWidth: 0.5,
      borderColor: headerColor,
      borderRadius: 2,
      backgroundColor: "#fff",
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
      backgroundColor: "#f9fafb",
    },
    backTopStrip: {
      position: "absolute",
      top: -2,
      left: -3,
      width: 300,
      height: 22,
      backgroundColor: borderColor,
    },
    backYellowStrip2: {
      position: "absolute",
      bottom: 42,
      left: -8,
      width: 230,
      height: 4,
      backgroundColor: borderColor,
      transform: "rotate(-11deg)",
    },
    backYellowStrip3: {
      position: "absolute",
      bottom: 34,
      left: -8,
      width: 230,
      height: 4,
      backgroundColor: borderColor,
      transform: "rotate(-11deg)",
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
      padding: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flex: 1,
      zIndex: 1,
    },
    backAddressText: {
      fontSize: 7,
      alignSelf: "center",
      textAlign: "left",
      color: labelColor,
      marginTop: 1,
      fontWeight: "600",
    },
    qrBox: { width: 60, height: 60, alignSelf: "center", marginTop: 5 },
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
      width: 85,
      height: 26,
      marginTop: 6,
      marginBottom: 2,
      alignSelf: "center",
    },
    backIssueExpiryContainer: {
      borderRadius: 2,
      paddingVertical: 2,
      paddingHorizontal: 4,
      justifyContent: "center",
      alignItems: "flex-end",
      width: 65,
      height: 22,
    },
    backIssueExpiryText: {
      fontSize: 5,
      color: labelColor,
      fontWeight: "bold",
      textAlign: "right",
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

              <View
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {card.logo && (
                  <Image
                    src={card.logo}
                    style={{ width: 36, height: 36, marginRight: 4 }}
                  />
                )}
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "#ffffff" }}
                >
                  {card.organizationName.trim() || ""}
                </Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.profileImage}
                  src={card.profileImage || defaultProfile}
                />
              </View>

              <Text style={styles.nameText}>{card.name || "Student Name"}</Text>

              <Image src={WatermarkImage} style={styles.watermark} />
              {card.watermark && (
                <Image src={card.watermark} style={styles.watermark} />
              )}

              <View style={styles.infoBox}>
                {[
                  "roll",
                  "dept",
                  "session",
                  "regNo",
                  "phone",
                  "id",
                  "bloodGroup",
                ].map(
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
                <Image
                  style={styles.barcodeImage}
                  src={generateBarcodeBase64(card)}
                />
              </View>

              <View
                style={{ width: "100%", alignItems: "center", marginTop: 4 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={mailimg}
                    style={{ width: 10, height: 10, marginRight: 1 }}
                  />
                  <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                    {card.email || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Back Card */}
            <View style={styles.backCard}>
              <View style={{ padding: 10 }}>
                {card.organizationName && (
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#000",
                        textAlign: "center",
                      }}
                    >
                      {card.organizationName}
                    </Text>
                    <Text style={styles.backAddressText}>
                      {[card.village?.trim(), card.post?.trim()]
                        .filter(Boolean)
                        .join(", ")}
                      {card.postCode && ` - ${card.postCode.trim()}`}
                    </Text>
                    <Text style={styles.backAddressText}>
                      {[card.thana?.trim(), card.district?.trim()]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.backTopStrip} />
              <View style={styles.backYellowStrip2} />
              <View style={styles.backYellowStrip3} />
              <View style={styles.backGreenBottom} />

              <View style={styles.backContent}>
                <View style={styles.qrBox}>
                  <Image
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

                {(card.organizationEmail ||
                  card.organizationWebsite ||
                  card.organizationPhone) && (
                  <View
                    style={{
                      marginTop: 6,
                      width: 200,
                      padding: 2,
                      backgroundColor: borderColor,
                      alignSelf: "center",
                    }}
                  >
                    {card.organizationEmail && (
                      <Text
                        style={{
                          fontSize: 6,
                          color: "#ffffff",
                          fontWeight: "bold",
                          marginLeft: 25,
                        }}
                      >
                        Email: {card.organizationEmail}
                      </Text>
                    )}
                    {card.organizationWebsite && (
                      <Text
                        style={{
                          fontSize: 6,
                          color: "#ffffff",
                          fontWeight: "bold",
                          marginLeft: 25,
                        }}
                      >
                        Website: {card.organizationWebsite}
                      </Text>
                    )}
                    {card.organizationPhone && (
                      <Text
                        style={{
                          fontSize: 6,
                          color: "#ffffff",
                          fontWeight: "bold",
                          marginLeft: 25,
                        }}
                      >
                        Contact: {card.organizationPhone}
                      </Text>
                    )}
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 6,
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    {card.signatureImage && (
                      <Image
                        style={styles.signatureImage}
                        src={card.signatureImage}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 5,
                        color: labelColor,
                        marginTop: 1,
                        textAlign: "center",
                      }}
                    >
                      Principal's Signature
                    </Text>
                  </View>

                  <View style={styles.backIssueExpiryContainer}>
                    <Text style={styles.backIssueExpiryText}>
                      Issue: {card.issue || "N/A"}
                    </Text>
                    <Text style={styles.backIssueExpiryText}>
                      Expiry: {card.expiry || "N/A"}
                    </Text>
                  </View>
                </View>

                <View style={{ position: "absolute", bottom: -4, right: 0 }}>
                  {card.logo && (
                    <Image src={card.logo} style={{ width: 35, height: 35 }} />
                  )}
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
    a.download = "student-id-cards.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-orange-600 dark:text-orange-400 text-center mb-12"
        >
          Student ID Card Generator
        </motion.h2>

        {/* Color Customization */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-10 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-blue-600 dark:text-blue-400 mb-4"
            >
              <FaRegHandPointDown className="text-4xl sm:text-5xl" />
            </motion.div>

            <motion.button
              onClick={() => setShowColorPickers(!showColorPickers)}
              className=" cursor-pointer bg-gradient-to-r  from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full text-lg sm:text-xl shadow-2xl flex items-center gap-4 transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {showColorPickers ? "Hide" : "Customize"} Card Colors
              <motion.span animate={{ rotate: showColorPickers ? 180 : 0 }}>
                <FaChevronDown className="text-2xl" />
              </motion.span>
            </motion.button>

            <ColorPickers
              labelColor={labelColor}
              setLabelColor={setLabelColor}
              borderColor={borderColor}
              setBorderColor={setBorderColor}
              headerColor={headerColor}
              setHeaderColor={setHeaderColor}
              noteBgColor={noteBgColor}
              setNoteBgColor={setNoteBgColor}
              issueBgColor={issueBgColor}
              setIssueBgColor={setIssueBgColor}
              showColorPickers={showColorPickers}
            />
          </div>
        </div>

        {/* Card Forms */}
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p- md:p-6 lg:p-8 mb-12 border border-gray-200 dark:border-gray-700"
          >
            {/* Organization Info */}
            <div className="mb-10 p-3 pt-5 md:p-5 lg:p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-blue-800 dark:text-blue-300">
                Organization Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  "organizationName",
                  "organizationEmail",
                  "organizationWebsite",
                  "organizationPhone",
                ].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {key.replace("organization", "")}
                    </label>
                    <input
                      type={
                        key.includes("Email")
                          ? "email"
                          : key.includes("Website")
                          ? "url"
                          : key.includes("Phone")
                          ? "tel"
                          : "text"
                      }
                      value={card[key] || ""}
                      onChange={(e) => updateCard(idx, key, e.target.value)}
                      placeholder={key.replace("organization", "")}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          updateCard(idx, "logo", reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-3 cursor-pointer rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Watermark
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          updateCard(idx, "watermark", reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-3 cursor-pointer rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-3 md:p-5 lg:p-6 pt-5 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-300 dark:border-green-800">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-800 dark:text-green-300">
                Student Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { key: "name", label: "Name",placeholder:'Enter Name' },
                  { key: "roll", label: "Roll" },
                  { key: "regNo", label: "Reg No" },
                  { key: "dept", label: "Department", list: "departments" },
                  { key: "session", label: "Session", list: "sessions" },
                  { key: "phone", label: "Phone", type: "tel" },
                  { key: "email", label: "Email", type: "email" },
                  {
                    key: "bloodGroup",
                    label: "Blood Group",
                    list: "bloodGroups",
                  },
                  "village",
                  "post",
                  "postCode",
                  "thana",
                  "district",
                  { key: "issue", label: "Issue Date", type: "date" },
                  { key: "expiry", label: "Expiry Date", type: "date" },
                ].map((item) => {
                  if (typeof item === "string") {
                    return (
                      <div key={item}>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {item.charAt(0).toUpperCase() +
                            item.slice(1).replace("Code", " Code")}
                        </label>
                        <input
                          value={card[item] || ""}
                          onChange={(e) =>
                            updateCard(idx, item, e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 transition-all"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={item.key}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {item.label}
                      </label>
                      {item.list ? (
                        <>
                          <input
                            list={item.list}
                            value={card[item.key] || ""}
                            onChange={(e) =>
                              updateCard(idx, item.key, e.target.value)
                            }
                            placeholder={`Select or type ${item.label}`}
                            className="w-full cursor-pointer px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 transition-all"
                          />
                          <datalist id={item.list}>
                            {item.list === "departments" && (
                             <datalist id="departments">
  <option value="Computer Science and Engineering (CSE)" />
  <option value="Electrical and Electronic Engineering (EEE)" />
  <option value="Civil Engineering" />
  <option value="Mechanical Engineering" />
  <option value="Textile Engineering" />
  <option value="Architecture" />
  <option value="Industrial and Production Engineering (IPE)" />
  <option value="Chemical Engineering" />
  <option value="Materials Science and Engineering" />
  <option value="Electronics and Communication Engineering (ECE)" />
  <option value="Information and Communication Technology (ICT)" />
  <option value="Software Engineering" />
  <option value="Biomedical Engineering" />
  <option value="Environmental Engineering" />
  <option value="Aeronautical Engineering" />
  <option value="Automobile Engineering" />
  <option value="Mechatronics Engineering" />
  <option value="Naval Architecture and Marine Engineering" />
  <option value="Food Engineering" />
  <option value="Agricultural Engineering" />
  <option value="Pharmacy" />
  <option value="Business Administration (BBA)" />
  <option value="Accounting" />
  <option value="Finance" />
  <option value="Marketing" />
  <option value="Management" />
  <option value="Economics" />
  <option value="English" />
  <option value="Law" />
  <option value="Sociology" />
  <option value="Psychology" />
  <option value="Public Health" />
  <option value="Nursing" />
  <option value="Physics" />
  <option value="Chemistry" />
  <option value="Mathematics" />
  <option value="Statistics" />
  <option value="Biotechnology" />
  <option value="Microbiology" />
  <option value="Biochemistry" />
  <option value="Genetics" />
  <option value="Zoology" />
  <option value="Botany" />
  <option value="Geography and Environment" />
  <option value="Geological Sciences" />
  <option value="Oceanography" />
  <option value="Fisheries" />
  <option value="Forestry" />
  <option value="Tourism and Hospitality Management" />
  <option value="Journalism and Media Studies" />
  <option value="Film and Television" />
  <option value="Fine Arts" />
  <option value="Music" />
  <option value="Theater and Performance Studies" />
</datalist>
                            )}
                            {item.list === "sessions" && (
                              <datalist id="sessions">
  <option value="2000-2001" />
  <option value="2001-2002" />
  <option value="2002-2003" />
  <option value="2003-2004" />
  <option value="2004-2005" />
  <option value="2005-2006" />
  <option value="2006-2007" />
  <option value="2007-2008" />
  <option value="2008-2009" />
  <option value="2009-2010" />
  <option value="2010-2011" />
  <option value="2011-2012" />
  <option value="2012-2013" />
  <option value="2013-2014" />
  <option value="2014-2015" />
  <option value="2015-2016" />
  <option value="2016-2017" />
  <option value="2017-2018" />
  <option value="2018-2019" />
  <option value="2019-2020" />
  <option value="2020-2021" />
  <option value="2021-2022" />
  <option value="2022-2023" />
  <option value="2023-2024" />
  <option value="2024-2025" />
  <option value="2025-2026" />
  <option value="2026-2027" />
  <option value="2027-2028" />
  <option value="2028-2029" />
  <option value="2029-2030" />
  <option value="2030-2031" />
  <option value="2031-2032" />
  <option value="2032-2033" />
  <option value="2033-2034" />
  <option value="2034-2035" />
  <option value="2035-2036" />
  <option value="2036-2037" />
  <option value="2037-2038" />
  <option value="2038-2039" />
  <option value="2039-2040" />
  <option value="2040-2041" />
  <option value="2041-2042" />
  <option value="2042-2043" />
  <option value="2043-2044" />
  <option value="2044-2045" />
  <option value="2045-2046" />
  <option value="2046-2047" />
  <option value="2047-2048" />
  <option value="2048-2049" />
  <option value="2049-2050" />
</datalist>
                            )}
                            {item.list === "bloodGroups" && (
                             <datalist id="bloodGroups">
    <option value="A+" />
    <option value="A-" />
    <option value="B+" />
    <option value="B-" />
    <option value="O+" />
    <option value="O-" />
    <option value="AB+" />
    <option value="AB-" />
  </datalist>
                            )}
                          </datalist>
                        </>
                      ) : (
                        <input
                          type={item.type || "text"}
                          value={card[item.key] || ""}
                          onChange={(e) =>
                            updateCard(idx, item.key, e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 transition-all"
                        />
                      )}
                    </div>
                  );
                })}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0])
                        updateCard(
                          idx,
                          "profileImage",
                          URL.createObjectURL(e.target.files[0])
                        );
                    }}
                    className="w-full cursor-pointer px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                  />
                </div>

                <div>
                  <label className="block  text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Signature Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0])
                        updateCard(
                          idx,
                          "signatureImage",
                          URL.createObjectURL(e.target.files[0])
                        );
                    }}
                    className="w-full px-4 py-3 cursor-pointer rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <button
                  onClick={() => resetCard(idx)}
                  className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
                >
                  ↻ Reset Card
                </button>
                {cards.length > 1 && (
                  <button
                    onClick={() => removeCard(idx)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
                  >
                    ✖ Remove Card
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 items-center ">
          <button
            onClick={addCard}
            className="bg-gradient-to-r cursor-pointer from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg sm:text-xl py-5 px-12 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all flex-1 max-w-xs"
          >
            ➕ Add New Card
          </button>

          <PremiumDownloadButton
            onDownload={downloadPDF}
            className=" max-w-xs rounded-full"
          >
            📄 Download PDF
          </PremiumDownloadButton>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-10 text-base sm:text-lg">
          Generate professional, printable student ID cards instantly with full
          customization.
        </p>
      </div>
    </div>
  );
}
