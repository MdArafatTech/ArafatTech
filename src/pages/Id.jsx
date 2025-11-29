// src/pages/ProfessionalIDCardPDF.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultProfile from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";

export default function ProfessionalIDCardPDF() {
  const [PDFLib, setPDFLib] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [JsBarcode, setJsBarcode] = useState(null);

  // Color pickers
  const [labelColor, setLabelColor] = useState("#1e3a8a");
  const [borderColor, setBorderColor] = useState("#dc2626");
  const [headerColor, setHeaderColor] = useState("#1e3a8a");
  const [noteBgColor, setNoteBgColor] = useState("#e0e7ff");
  const [issueBgColor, setIssueBgColor] = useState("#e0e7ff");



const resetCard = (index) => {
  setCards((prev) => {
    const updated = [...prev];
    updated[index] = {
      name: "",
      role: "",
      phone: "",
      email: "",
      id: "",
      blood: "",
      village: "",
      thana: "",
      district: "",
      profileImage: defaultProfile,
      signatureImage: null,
      issue: "",
      expiry: "",
    };
    return updated;
  });
};




  const [cards, setCards] = useState([
    {
      name: "",
      role: "",
      phone: "",
      email: "",
      id: "",
      blood: "",
      village: "",
      thana: "",
      district: "",
      profileImage: defaultProfile,
      signatureImage: null,
      issue: "",
      expiry: "",
    },
  ]);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib)
    return (
      <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>
    );

  const {
    PDFViewer,
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
  } = PDFLib;

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

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=mailto:${encodeURIComponent(
      email || ""
    )}`;

 const generateBarcodeBase64 = (card) => {
  if (!JsBarcode) return "";
  const canvas = document.createElement("canvas");

  const data = 
    `Name: ${card.name}\n` +
    `Role: ${card.role}\n` +
    `Phone: ${card.phone}\n` +
    `Email: ${card.email}\n` +
    `ID: ${card.id}\n` +
    `Blood: ${card.blood}\n` +
    `Village: ${card.village}\n` +
    `Thana: ${card.thana}\n` +
    `District: ${card.district}`;

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
      minHeight: 275,
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: 10,
      backgroundColor: "#f9fafb",
      borderColor: borderColor,
      borderWidth:4,
      padding: 6,
      position: "relative",
    },

    frontHeader: {
      height: 130,
      width: 350,
      marginTop: -70,
      marginLeft: -30,
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
      width: "38%",
      hight: "40%",
      aspectRatio: 0.85,
      borderRadius: 7,
      marginTop: -15,
      padding: 3,
      backgroundColor: borderColor,
    },

    infoBox: {
      padding: 4,
      alignItems: "flex-start",
      marginLeft: 0,
    },

    nameText: {
      fontSize: 14,
      fontWeight: "bold",
      color: headerColor,
      textAlign: "center",
      marginBottom: 3,
      marginTop: 2,
    },

    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 2,
    },

    label: {
      fontSize: 9,
      fontWeight: "700",
      color: labelColor,
      minWidth: 50,
    },

    value: {
      fontSize: 8,
      fontWeight: "bold",
      color: "#000",
    },

    footer: {
      position: "absolute",
      bottom: -3,
      left: -1,
      right:-1,
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
  marginLeft: 24, // reduced padding for compact layout
  marginRight: 24,
  borderWidth: 0.5, // thinner border for ID card
  borderColor: headerColor,
  borderRadius: 2,
  backgroundColor: "#fff",
  padding: 2, // small padding to avoid clipping
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
      left: 0,
      width: "100%",
      height: 22,
      backgroundColor: borderColor,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },

    backYellowBottom1: {
      position: "absolute",
      bottom: 17,
      left: -20,
      width: 220,
      height: 6,
      backgroundColor: "#1e3a8a",
      zIndex: 1,
    },
    backYellowBottom2: {
      position: "absolute",
      bottom:42,
      left: -5,
      width: 230,
      height: 4,
      backgroundColor: "#dc2626",
      transform: "rotate(-11deg)",
    },
    backYellowBottom3: {
      position: "absolute",
      bottom: 34,
      left: -5,
      width: 220,
      height: 4,
      backgroundColor: "#dc2626",
      transform: "rotate(-11deg)",
    },

    backGreenBottom: {
      position: "absolute",
      bottom: -25,
      left: -20,
      width: 220,
      height: 65,
      backgroundColor: headerColor,
      transform: "rotate(-11deg)",
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

    qrBox: {
      width: 60,
      height: 60,
      alignSelf: "center",
      marginTop: 8,
    },

    qrText: {
      fontSize: 6,
      textAlign: "center",
      color: labelColor,
    },

    noteBox: {
      backgroundColor: noteBgColor,
      padding: 6,
      borderRadius: 8,
      marginTop: 8,
    },

    noteText: {
      fontSize: 8,
      fontStyle: "italic",
      textAlign: "center",
      color: labelColor,
    },

    signatureImage: {
      width: 90,
      height: 30,
      marginTop: 10,
    },

    backIssueExpiryContainer: {
      position: "absolute",
      bottom: 3,
      right: 0,
      width: 80,
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
      fontSize: 6,
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  const MyDocument = () => (
    <Document>
      {cards.map((card, idx) => (
        <Page key={idx} size="A4" style={styles.page}>
          <View style={styles.cardContainer}>
            {/* Front */}
            <View style={styles.card}>
              <View style={styles.frontHeader}>
                <View style={[styles.yellowStrip, { top: 120 }]} />
                <View style={[styles.yellowStrip, { top: 130 }]} />
              </View>
              <View  style={{ alignItems: "center" }}>
                <Image style={styles.profileImage} src={card.profileImage} />
              </View>
              <Text style={styles.nameText}>{card.name}</Text>
              <View style={styles.infoBox}>
                {["role", "phone", "email", "id", "blood"].map((field) => (
                  <View style={styles.infoRow} key={field}>
                    <Text style={styles.label}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </Text>
                    <Text style={styles.value}>{card[field]}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.barcodeContainer}>
                <Image
                  style={styles.barcodeImage}
                  src={generateBarcodeBase64(card)}
                />
              </View>
              <Text style={styles.footer}></Text>
            </View>

            {/* Back */}
            <View style={styles.backCard}>
              <View style={styles.backTopStrip}></View>
              <View style={styles.backYellowBottom1} />{" "}
              <View style={styles.backYellowBottom2} />{" "}
              <View style={styles.backYellowBottom3} />
              <View style={styles.backGreenBottom}></View>
              <View style={styles.backContent}>
                {["village", "thana", "district"].map((field) => (
                  <View style={styles.addressRow} key={field}>
                    <Text style={styles.label}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </Text>
                    <Text style={styles.value}>{card[field]}</Text>
                  </View>
                ))}
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
                {card.signatureImage && (
                  <Image
                    style={styles.signatureImage}
                    src={card.signatureImage}
                  />
                )}
                <Text
                  style={{ fontSize: 7, textAlign: "center", marginTop: 2 }}
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

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <motion.div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Professional ID Card Generator
        </h2>

        {/* Color Pickers */}
        <div className="flex flex-wrap text-black gap-4 justify-center mt-4">
          <div className="flex items-center gap-2">
            <label>Label:</label>
            <input
              type="color"
              value={labelColor}
              onChange={(e) => setLabelColor(e.target.value)}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Border-Strips:</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Bordar-bg:</label>
            <input
              type="color"
              value={headerColor}
              onChange={(e) => setHeaderColor(e.target.value)}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Note BG:</label>
            <input
              type="color"
              value={noteBgColor}
              onChange={(e) => setNoteBgColor(e.target.value)}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Issue/Expiry BG:</label>
            <input
              type="color"
              value={issueBgColor}
              onChange={(e) => setIssueBgColor(e.target.value)}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Card Forms */}
     {cards.map((card, idx) => (
  <motion.div
    key={idx}
    className="border border-gray-300 rounded-xl p-4 bg-orange-50 text-black space-y-2 relative"
  >
    {/* Top-right buttons */}
    <div className="absolute top-2 right-2 flex gap-2">
      {/* Remove button shows only if not the first card */}
      {idx !== 0 && (
        <button
          onClick={() => removeCard(idx)}
          className="cursor-pointer px-2 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
        >
          ✖ 
        </button>
      )}

      {/* Refresh button always shows */}
      <button
        onClick={() => resetCard(idx)}
        className="cursor-pointer px-2 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
      >
        ↻ 
      </button>
    </div>
    {/* Card inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <input
        placeholder="Name"
        value={card.name}
        onChange={(e) => updateCard(idx, "name", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Role"
        value={card.role}
        onChange={(e) => updateCard(idx, "role", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Phone"
        value={card.phone}
        onChange={(e) => updateCard(idx, "phone", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Email"
        value={card.email}
        onChange={(e) => updateCard(idx, "email", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="ID"
        value={card.id}
        onChange={(e) => updateCard(idx, "id", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Blood"
        value={card.blood}
        onChange={(e) => updateCard(idx, "blood", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Village"
        value={card.village}
        onChange={(e) => updateCard(idx, "village", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Thana"
        value={card.thana}
        onChange={(e) => updateCard(idx, "thana", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="District"
        value={card.district}
        onChange={(e) => updateCard(idx, "district", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Issue"
        type="date"
        value={card.issue}
        onChange={(e) => updateCard(idx, "issue", e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Expiry"
        type="date"
        value={card.expiry}
        onChange={(e) => updateCard(idx, "expiry", e.target.value)}
        className="border p-2 rounded"
      />
      <div>
        <label className="block">Profile Image</label>
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
          className="border cursor-pointer p-1 rounded w-full"
        />
        <label className="block mt-2">Signature Image</label>
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
          className="border cursor-pointer p-1 rounded w-full"
        />
      </div>
    </div>
  </motion.div>
))}


        <div className="flex gap-2 justify-center mt-2">
          <motion.button
            onClick={addCard}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Add Card
          </motion.button>





          <motion.button
            onClick={() => setShowPreview(true)}
            className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Review PDF
          </motion.button>

          
        </div>

        
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 mt-20 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl w-11/12 md:w-4/5 h-4/5 p-4 flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowPreview(false)}
                className="self-end text-red-600 font-bold hover:text-red-800"
              >
                Close ✖
              </button>

              {/* Refresh Button */}



              <div style={{ flex: 1, overflow: "auto", borderRadius: 10 }}>
                <PDFViewer style={{ width: "100%", height: "100%" }}>
                  <MyDocument />
                </PDFViewer>
              </div>
              <div className="flex justify-center mt-4">
                <PDFDownloadLink
                  document={<MyDocument />}
                  fileName="idcards.pdf"
                >
                  {({ loading }) =>
                    loading ? (
                      "Preparing PDF..."
                    ) : (
                      <motion.button className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Download PDF
                      </motion.button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
















