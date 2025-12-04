import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";
import mailimg from "../assets/email.png";
import { FaRegHandPointDown, FaChevronDown, FaVoicemail } from "react-icons/fa";
import { pdf } from "@react-pdf/renderer"; // <-- MUST BE HERE

import { Text, View, Image, Font } from "@react-pdf/renderer";

// Disable hyphenation globally
Font.registerHyphenationCallback((word) => [word]);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
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
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
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
          className="flex flex-wrap text-black gap-4 justify-center mt-4 bg-gray-100 p-4 rounded-lg shadow-inner overflow-hidden w-full max-w-3xl"
        >
          {pickers.map((picker) => (
            <motion.div
              key={picker.label}
              custom={picker.direction}
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <label>{picker.label}:</label>
              <input
                type="color"
                value={picker.value}
                onChange={(e) => picker.setter(e.target.value)}
                className="w-7 h-7 border-2 rounded cursor-pointer"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Employee() {
  const [PDFLib, setPDFLib] = useState(null);

  const [JsBarcode, setJsBarcode] = useState(null);

  // Default colors & images
  const defaultLabelColor = "#1e3a8a";
  const defaultBorderColor = "#dc2626";
  const defaultHeaderColor = "#1e3a8a";
  const defaultNoteBgColor = "#e0e7ff";
  const defaultIssueBgColor = "#e0e7ff";

  const defaultProfileImage = defaultProfile;
  const defaultWatermark = WatermarkImage;

  // State for customization
  const [labelColor, setLabelColor] = useState(defaultLabelColor);
  const [borderColor, setBorderColor] = useState(defaultBorderColor);
  const [headerColor, setHeaderColor] = useState(defaultHeaderColor);
  const [noteBgColor, setNoteBgColor] = useState(defaultNoteBgColor);
  const [issueBgColor, setIssueBgColor] = useState(defaultIssueBgColor);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const [cards, setCards] = useState([
    {
      name: "",
      role: "",
      profession: "",
      regNo: "", // ✅ added registration number
      phone: "",

      email: "",

      id: "",
      blood: "",
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
      logo: null, // ✅ college/organization logo
      organizationName: "", // ✅ organization name

      organizationEmail: "",
      organizationWebsite: "",
      organizationPhone: "",
    },
  ]);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => {
      setPDFLib(module);

      // ⭐ IMPORTANT: Disable hyphenation so email text breaks cleanly
      module.Font.registerHyphenationCallback((word) => [word]);
    });

    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib)
    return (
      <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>
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
        role: "",
        phone: "",
        email: "",
        regNo: "", // ✅ add this if missing
        session: "",
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
        watermark: defaultWatermark,
        logo: null, // new
        organizationName: "", // ✅ organization name
        organizationEmail: "",
        organizationWebsite: "",
        organizationPhone: "",
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
    const data = `Name: ${card.name}\nRole: ${card.role}\nPhone: ${card.phone}\nEmail: ${card.email}\nID: ${card.id}\nBlood: ${card.blood}\nVillage: ${card.village}\nThana: ${card.thana}\nDistrict: ${card.district}`;
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

      // soft glow fade
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "#fffff",
      borderBottomColor: "rgba(0,0,0,0.3)",

      // glossy shine line
      borderRadius: 1,
      paddingTop: 0.5,
    },

    profileImage: {
      width: "34%",
      hight: "36%",
      aspectRatio: 0.85,

      marginTop: -18,
      padding: 3,
      backgroundColor: borderColor,
    },

    infoBox: {
      padding: 4,
      alignItems: "flex-start",
      marginLeft: 20,
      width: 140, // limit width so long email wraps
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

    // infoContainer: {
    //   alignSelf: "center", // center the whole box horizontally
    //   width: "60%", // adjust width as needed
    //   borderWidth: 1, // optional: border for testing
    //   borderColor: "#ccc",
    //   padding: 5,
    //   borderRadius: 4,
    // },

    // infoRow: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   marginBottom: 2,
    // },

    // label: {
    //   fontSize: 7,
    //   fontWeight: "800",
    //   color: labelColor,
    //   minWidth: 50,
    // },

    // value: {
    //   fontSize: 8,
    //   fontWeight: "bold",
    //   color: "#000",
    // },




infoContainer: {
  alignSelf: "center", // center the whole box horizontally
  width: "60%", // adjust width as needed
  borderWidth: 1, // optional: border for testing
  borderColor: "#ccc",
  padding: 5,
  borderRadius: 4,
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
  minWidth: 40,       // reduce from 50
  marginRight: 4,     // small spacing instead of large gap
},

value: {
  fontSize: 8,
  fontWeight: "bold",
  color: "#000",
  flexShrink: 1,      // allows text to wrap or shrink if needed
},














































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
      marginTop: 4,

      alignSelf: "center", // Centers the entire container and restricts its width

      paddingHorizontal: 2, // Adds space to the left and right of the barcode
      paddingVertical: 1,

      // REMOVED: marginLeft: 24, and marginRight: 24,

      borderWidth: 0.5,
      borderColor: headerColor,
      borderRadius: 2,
      backgroundColor: "#fff",
    },

    barcodeImage: {
      width: 80, // smaller width
      height: 25, // smaller height for sharp print
    },

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

      // Glow simulation
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "rgba(255,255,255,0.6)", // top glow highlight
      borderBottomColor: "rgba(0,0,0,0.3)", // bottom soft shadow

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

      // Glow simulation
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "rgba(255,255,255,0.6)", // glowing upper edge
      borderBottomColor: "rgba(0,0,0,0.3)", // shadow for depth

      borderRadius: 2,
    },

    backGreenBottom: {
      position: "absolute",
      bottom: -40, // move down to cover extra space created by rotation
      left: -30, // shift left to cover left edge
      width: 260, // extra width to cover diagonal corners
      height: 80, // slightly taller to cover bottom fully
      backgroundColor: headerColor,
      transform: "rotate(169deg)",
      zIndex: 1,
    },

    addressRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginBottom: 2,
      alignSelf: "center",
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

    qrBox: {
      width: 60,
      height: 60,
      alignSelf: "center",
      marginTop: 5,
    },

    qrText: {
      fontSize: 6,
      textAlign: "center",
      color: labelColor,
    },

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
      alignSelf: "center", // ✅ centers image horizontally
    },

    backIssueExpiryContainer: {
      borderRadius: 2,
      paddingVertical: 2,
      paddingHorizontal: 4,
      justifyContent: "center",
      alignItems: "flex-end",
      width: 65,
      height: 22, // ✅ fixed height to prevent wrapping
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
            {/* Front */}
            <View style={styles.card}>
              <View style={styles.frontHeader}>
                <View style={[styles.yellowStrip, { top: 122 }]} />
                <View style={[styles.yellowStrip, { top: 130 }]} />
              </View>

              {/* Front Card Logo + Name at top-left */}
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
                  {card.organizationName && card.organizationName.trim() !== ""
                    ? card.organizationName
                    : ""}
                </Text>
              </View>

              {/* Profile Image */}
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.profileImage}
                  src={card.profileImage || defaultProfile}
                />
              </View>

              {/* Name */}
              <Text style={styles.nameText}>{card.name}</Text>

              {/* Watermark */}
              <Image src={WatermarkImage} style={styles.watermark} />
              <Image
                src={card.watermark || defaultWatermark}
                style={styles.watermark}
              />

              {/* Info Box (without email) */}
              <View style={styles.infoBox}>
                {[
                  "role",
                  "dept",
                  "id",
                  "blood",
                  "profession",
                  "dob",
                  "phone",
                  "id",
                ].map(
                  (field) =>
                    card[field] && ( // only show if value exists
                      <View style={styles.infoRow} key={field}>
                        <Text style={styles.label}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </Text>
                        <View
                          style={{ flex: 1, minWidth: 100, flexWrap: "wrap" }}
                        >
                          <Text style={styles.value}>{card[field]}</Text>
                        </View>
                      </View>
                    )
                )}
              </View>

              {/* Watermark */}
              {card.watermark && (
                <Image src={card.watermark} style={styles.watermark} />
              )}

              {/* Barcode */}
              <View style={styles.barcodeContainer}>
                <Image
                  style={styles.barcodeImage}
                  src={generateBarcodeBase64(card)}
                />

            </View>












              {/* Email below barcode with icon */}

             <View
  style={{
    width: "100%",          // full width of container
    alignItems: "center",   // center children horizontally
    marginTop: 4,
  }}
>
  <View
    style={{
      flexDirection: "row",  // icon + text in a row
      alignItems: "center",  // vertical alignment
      justifyContent: "center", // center the row contents
    }}
  >
    <Image
      src={mailimg}
      style={{ width: 10, height: 10, marginRight: 4 }}
    />
    <Text
      style={{
        fontSize: 8,
        fontWeight: "bold",
        textAlign: "center",
      }}
      wrap
    >
      {card.email || "N/A"}
    </Text>
  </View>
</View>




















              <Text style={styles.footer}></Text>
            </View>

            {/* Back */}
            <View style={styles.backCard}>
              {/* Top: Organization Name + Address */}
              <View style={{ padding: 10 }}>
                {card.organizationName && (
                  <View style={{ marginTop: 4, marginBottom: -3 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#000000",
                        textAlign: "center",
                        marginBottom: 4,
                      }}
                    >
                      {card.organizationName}
                    </Text>

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
                  </View>
                )}
              </View>

              {/* Strips */}
              <View style={styles.backTopStrip}></View>
              <View style={styles.backYellowStrip2} />
              <View style={styles.backYellowStrip3} />
              <View style={styles.backGreenBottom}></View>

              {/* CARD MAIN CONTENT */}
              <View style={styles.backContent}>
                {/* QR */}
                <View style={styles.qrBox}>
                  <Image
                    style={{ width: 60, height: 60 }}
                    src={generateEmailQR(card.email)}
                  />
                  <Text style={styles.qrText}>Scan to Email</Text>
                </View>

                {/* Note */}
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    "This ID card is property of personal. Please carry it at
                    all times. If found, kindly contact me."
                  </Text>
                </View>

                {/* ------------------------------ */}
                {/*   ORGANIZATION CONTACT BOX     */}
                {/* ------------------------------ */}
                {(card.organizationEmail ||
                  card.organizationWebsite ||
                  card.organizationPhone) && (
                  <View
                    style={{
                      marginTop: 6,
                      width: 200,
                      padding: 2,

                      borderColor: borderColor,
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
                          maxWidth: 180,
                          wordBreak: "break-all",
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
                          maxWidth: 180,
                          wordBreak: "break-all",
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
                          maxWidth: 180,
                          wordBreak: "break-all",
                          marginLeft: 25,
                        }}
                      >
                        Contact: {card.organizationPhone}
                      </Text>
                    )}
                  </View>
                )}

                {/* Signature
    {card.signatureImage && (
      <Image style={styles.signatureImage} src={card.signatureImage} />
    )}

    <Text
      style={{
        fontSize: 5,
        textAlign: "center",
        marginTop: 2,
        color: labelColor,
        alignSelf: "center",
      }}
    >
      Authorized Signature
    </Text> */}

                {/* Signature + Issue/Expiry in same row */}
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
                  {/* Signature Left */}
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
                      Authorized Signature
                    </Text>
                  </View>

                  {/* Issue + Expiry Right */}
                  <View style={styles.backIssueExpiryContainer}>
                    <Text style={styles.backIssueExpiryText}>
                      Issue: {card.issue || "N/A"}
                    </Text>
                    <Text style={styles.backIssueExpiryText}>
                      Expiry: {card.expiry || "N/A"}
                    </Text>
                  </View>
                </View>

                {/* Bottom Logo */}
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    right: 0,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {card.logo && (
                    <Image src={card.logo} style={{ width: 35, height: 35 }} />
                  )}
                </View>

                {/* Issue – Expiry */}
                {/* <View style={styles.backIssueExpiryContainer}>
      <Text style={styles.backIssueExpiryText}>
        Issue: {card.issue || "N/A"}
      </Text>
      <Text style={styles.backIssueExpiryText}>
        Expiry: {card.expiry || "N/A"}
      </Text>
    </View> */}
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );

  // Direct download function
  const downloadPDF = async () => {
    const blob = await pdf(<MyDocument cards={cards} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "idcards.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen  md:p-4 lg:p-6 bg-gray-50">
      <motion.div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p- md:p-3 lg:p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Employee ID Card Generator
        </h2>

        {/* Color Pickers */}

        <div className="flex flex-col items-center mt-4">
          {/* Animated Hand Icon */}
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="text-blue-500 mb-2"
          >
            <FaRegHandPointDown className="text-[30px]" />
          </motion.span>

          {/* Show/Hide Settings Button */}

          <motion.button
            onClick={() => setShowColorPickers((prev) => !prev)}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }} // pulse effect
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            whileTap={{ scale: 0.95 }}
          >
            {showColorPickers ? "Hide Settings" : "Show Settings"}
            <motion.span
              animate={{ rotate: showColorPickers ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.span>
          </motion.button>

          {/* Animated Color Picker Panel */}
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

        {/* Card Forms */}
        {/* Card Forms */}
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
      grid grid-cols-1 gap-4 
      border border-gray-300 dark:border-gray-700 
      p-4 rounded-lg shadow 
      bg-white dark:bg-gray-900 
      text-gray-900 dark:text-gray-100
    "
          >
            {/* ---------------- ORGANIZATION SECTION ---------------- */}
            <div
              className="
        border border-blue-400 dark:border-blue-600 
        bg-blue-50 dark:bg-blue-900/40 
        p-3 rounded-lg shadow-sm
      "
            >
              <h2 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
                Organization Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* INPUT STYLES */}
                {[
                  { label: "Organization Name", key: "organizationName" },
                  {
                    label: "Organization Email",
                    key: "organizationEmail",
                    type: "email",
                  },
                  {
                    label: "Organization Website",
                    key: "organizationWebsite",
                    type: "url",
                  },
                  {
                    label: "Contact Number",
                    key: "organizationPhone",
                    type: "tel",
                  },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold mb-1">
                      {item.label}
                    </label>
                    <input
                      type={item.type || "text"}
                      value={card[item.key] || ""}
                      onChange={(e) =>
                        updateCard(idx, item.key, e.target.value)
                      }
                      placeholder={`Enter ${item.label}`}
                      className="
                w-full p-2 rounded-md 
                border-2 border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800 
                placeholder-gray-500 dark:placeholder-gray-300 
                focus:border-blue-600 dark:focus:border-blue-400 
                focus:ring-2 focus:ring-blue-300 
                transition-all
              "
                    />
                  </div>
                ))}

                {/* LOGO UPLOAD */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
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
                    className="
              w-full p-2 rounded-md border-2 
              border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800 cursor-pointer
            "
                  />
                </div>

                {/* WATERMARK UPLOAD */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Watermark Image
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
                    className="
              w-full p-2 rounded-md border-2 
              border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800 cursor-pointer
            "
                  />
                </div>
              </div>
            </div>

            {/* ---------------- USER SECTION ---------------- */}
            <div
              className="
        border border-green-400 dark:border-green-600 
        bg-green-50 dark:bg-green-900/40 
        p-3 rounded-lg shadow-sm
      "
            >
              <h2 className="text-lg font-bold mb-2 text-green-700 dark:text-green-300">
                User Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* NORMAL INPUTS */}
                {[
                  { key: "name", label: "Name" },
                 
                  { key: "id", label: "Id/Code" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold mb-1">
                      {item.label}
                    </label>
                    <input
                      value={card[item.key] || ""}
                      onChange={(e) =>
                        updateCard(idx, item.key, e.target.value)
                      }
                      placeholder={`Enter ${item.label}`}
                      className="
                w-full p-2 rounded-md 
                border-2 border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800
                placeholder-gray-500 dark:placeholder-gray-300 
                focus:border-green-600 dark:focus:border-green-400 
                focus:ring-2 focus:ring-green-300 
                transition-all
              "
                    />
                  </div>
                ))}

<div>
  <label className="block text-sm font-semibold mb-1">
                    Role
                  </label>
                <input
  list="employeeRoles"
  value={card.role}
  onChange={(e) => updateCard(idx, "role", e.target.value)}
  placeholder="Select Role"
         className="
                w-full p-2 rounded-md 
                border-2 border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800
                placeholder-gray-500 dark:placeholder-gray-300 
                focus:border-green-600 dark:focus:border-green-400 
                focus:ring-2 focus:ring-green-300 
                transition-all"
/>
<datalist id="employeeRoles">
  <option value="Teacher" />
  <option value="Lecturer" />
  <option value="Assistant Professor" />
  <option value="Associate Professor" />
  <option value="Professor" />
  <option value="Doctor" />
  <option value="Nurse" />
  <option value="Receptionist" />
  <option value="Software Developer" />
  <option value="IT Support" />
  <option value="HR" />
  <option value="Accountant" />
  <option value="Marketing Executive" />
  {/* add more roles as needed */}
</datalist>




</div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Dept
                  </label>
                  <input
                      list="employeeDepartments" 
                    value={card.dept}
                    onChange={(e) => updateCard(idx, "dept", e.target.value)}
                    placeholder="Select Department"
                    className="
              w-full p-2 rounded-md 
              border-2 border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800
              placeholder-gray-500 dark:placeholder-gray-300 
              focus:border-green-600 dark:focus:border-green-400
              focus:ring-2 focus:ring-green-300
              transition-all
            "
                  />

                  <datalist id="employeeDepartments">
                    <option value="Administration" />
                    <option value="Human Resources (HR)" />
                    <option value="Finance" />
                    <option value="Accounting" />
                    <option value="Marketing" />
                    <option value="Sales" />
                    <option value="Operations" />
                    <option value="Project Management" />
                    <option value="Logistics" />
                    <option value="Procurement" />
                    <option value="Public Relations (PR)" />
                    <option value="Training & Development" />
                    <option value="Health & Safety" />
                    <option value="Maintenance" />

                    <option value="IT Support" />
                    <option value="Software Development" />
                    <option value="Web Development" />
                    <option value="Mobile Development" />
                    <option value="Network Engineering" />
                    <option value="Quality Assurance (QA)" />
                    <option value="Engineering" />
                    <option value="Design" />
                    <option value="Production" />
                    <option value="Laboratory" />

                    <option value="Teacher" />
                    <option value="Lecturer" />
                    <option value="Assistant Professor" />
                    <option value="Associate Professor" />
                    <option value="Professor" />
                    <option value="Researcher" />

                    <option value="Doctor" />
                    <option value="Surgeon" />
                    <option value="Nurse" />
                    <option value="Pharmacist" />
                    <option value="Medical Technician" />
                    <option value="Dentist" />
                    <option value="Public Health Officer" />

                    <option value="Customer Support" />
                    <option value="Receptionist" />
                  </datalist>
                </div>

                {/* SESSION */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Blood
                  </label>
                  <input
                    list="bloodGroups"
                    value={card.blood} // make sure your state key is 'blood'
                    onChange={(e) => updateCard(idx, "blood", e.target.value)}
                    placeholder="Select Blood Group"
                    className="
      w-full p-2 rounded-md 
      border-2 border-gray-400 dark:border-gray-600 
      bg-white dark:bg-gray-800
      placeholder-gray-500 dark:placeholder-gray-300 
      focus:border-green-600 dark:focus:border-green-400
      focus:ring-2 focus:ring-green-300
      transition-all
    "
                  />

                  <datalist id="bloodGroups">
                    <option value="A+" />
                    <option value="A-" />
                    <option value="B+" />
                    <option value="B-" />
                    <option value="AB+" />
                    <option value="AB-" />
                    <option value="O+" />
                    <option value="O-" />
                  </datalist>
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={card.phone}
                    onChange={(e) => updateCard(idx, "phone", e.target.value)}
                    placeholder="Enter Phone"
                    className="
              w-full p-2 rounded-md 
              border-2 border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800
              placeholder-gray-500 dark:placeholder-gray-300 
              focus:border-green-600 dark:focus:border-green-400
              focus:ring-2 focus:ring-green-300
              transition-all
            "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Email
                  </label>
                  <input
                    value={card.email}
                    onChange={(e) => updateCard(idx, "email", e.target.value)}
                    placeholder="Enter Email"
                    className="
              w-full p-2 rounded-md 
              border-2 border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800
              placeholder-gray-500 dark:placeholder-gray-300 
              focus:border-green-600 dark:focus:border-green-400
              focus:ring-2 focus:ring-green-300
              transition-all
            "
                  />
                </div>

                {/* BLOOD GROUP */}
                {/* <div>
                  <label className="block text-sm font-semibold mb-1">
                    Blood Group
                  </label>
                  <input
                    list="bloodGroups"
                    value={card.bloodGroup}
                    onChange={(e) =>
                      updateCard(idx, "bloodGroup", e.target.value)
                    }
                    placeholder="Select Blood Group"
                    className="
              w-full p-2 rounded-md 
              border-2 border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800
              placeholder-gray-500 dark:placeholder-gray-300 
              focus:border-green-600 dark:focus:border-green-400
              focus:ring-2 focus:ring-green-300
              transition-all
            "
                  />

                  <datalist id="bloodGroups">
                    {" "}
                    <option value="A+" /> <option value="A-" />{" "}
                    <option value="B+" /> <option value="B-" />{" "}
                    <option value="AB+" /> <option value="AB-" />{" "}
                    <option value="O+" /> <option value="O-" />{" "}
                    <option value="A1+" /> <option value="A1-" />{" "}
                    <option value="A2+" /> <option value="A2-" />{" "}
                    <option value="A1B+" /> <option value="A1B-" />{" "}
                    <option value="A2B+" /> <option value="A2B-" />{" "}
                    <option value="Bombay Blood Group (Oh)" />{" "}
                    <option value="Chido" /> <option value="Rhesus Negative" />{" "}
                  </datalist>
                </div> */}

                {/* ADDRESS FIELDS */}
                {[
                  { key: "village", label: "Village" },
                  { key: "post", label: "Post" },
                  { key: "postCode", label: "Post Code" },
                  { key: "thana", label: "Thana" },
                  { key: "district", label: "District" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold mb-1">
                      {item.label}
                    </label>
                    <input
                      value={card[item.key] || ""}
                      onChange={(e) =>
                        updateCard(idx, item.key, e.target.value)
                      }
                      placeholder={`Enter ${item.label}`}
                      className="
                w-full p-2 rounded-md 
                border-2 border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800
                placeholder-gray-500 dark:placeholder-gray-300 
                focus:border-green-600 dark:focus:border-green-400
                focus:ring-2 focus:ring-green-300
                transition-all
              "
                    />
                  </div>
                ))}

                {/* DATES */}
                {[
                  { key: "issue", label: "Issue Date", type: "date" },
                  { key: "expiry", label: "Expiry Date", type: "date" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold mb-1">
                      {item.label}
                    </label>
                    <input
                      type={item.type}
                      value={card[item.key] || ""}
                      onChange={(e) =>
                        updateCard(idx, item.key, e.target.value)
                      }
                      className="
                w-full p-2 rounded-md 
                border-2 border-gray-400 dark:border-gray-600 
                bg-white dark:bg-gray-800
                focus:border-green-600 dark:focus:border-green-400
                focus:ring-2 focus:ring-green-300
              "
                    />
                  </div>
                ))}

                {/* PROFILE IMAGE */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateCard(
                        idx,
                        "profileImage",
                        URL.createObjectURL(e.target.files[0])
                      )
                    }
                    className="
              w-full p-2 rounded-md border-2 
              border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800 cursor-pointer
            "
                  />
                </div>

                {/* SIGNATURE IMAGE */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Signature Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateCard(
                        idx,
                        "signatureImage",
                        URL.createObjectURL(e.target.files[0])
                      )
                    }
                    className="
              w-full p-2 rounded-md border-2 
              border-gray-400 dark:border-gray-600 
              bg-white dark:bg-gray-800 cursor-pointer
            "
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => resetCard(idx)}
                  className="
            bg-yellow-500 hover:bg-yellow-600 
            text-white font-semibold py-2 px-4 rounded
            transition-all
          "
                >
                  ↻ Reset
                </button>

                <button
                  type="button"
                  onClick={() => removeCard(idx)}
                  className="
            bg-red-500 hover:bg-red-600 
            text-white font-semibold py-2 px-4 rounded
            transition-all
          "
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={addCard}
          className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg 
             hover:bg-green-600 hover:scale-105 transition-transform transition-colors duration-300"
        >
          Add Card
        </button>

        <button
          onClick={downloadPDF}
          className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-lg 
             hover:bg-orange-600 hover:scale-105 transition-transform transition-colors duration-300"
        >
          Download PDF
        </button>
      </div>
      <p className="text-center text-gray-600 mt-4 text-sm">
        Click "Download PDF Now" to generate and download your Employee ID
        cards instantly.
      </p>
    </div>
  );
}
