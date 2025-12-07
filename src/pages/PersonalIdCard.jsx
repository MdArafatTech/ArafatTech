// src/pages/ProfessionalIDCardPDF.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";
import mailimg from "../assets/email.png";
import { FaRegHandPointDown, FaChevronDown } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: (direction) => {
    switch (direction) {
      case "left": return { x: -50, opacity: 0 };
      case "right": return { x: 50, opacity: 0 };
      case "top": return { y: -50, opacity: 0 };
      case "bottom": return { y: 50, opacity: 0 };
      default: return { opacity: 0 };
    }
  },
  visible: { x: 0, y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

function ColorPickers({ labelColor, setLabelColor, borderColor, setBorderColor, headerColor, setHeaderColor, noteBgColor, setNoteBgColor, issueBgColor, setIssueBgColor, showColorPickers }) {
  const pickers = [
    { label: "Label", value: labelColor, setter: setLabelColor, direction: "top" },
    { label: "Border", value: borderColor, setter: setBorderColor, direction: "bottom" },
    { label: "Header", value: headerColor, setter: setHeaderColor, direction: "left" },
    { label: "Note BG", value: noteBgColor, setter: setNoteBgColor, direction: "right" },
    { label: "Issue/Expiry BG", value: issueBgColor, setter: setIssueBgColor, direction: "top" },
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

export default function PersonalIDCard() {
  const [PDFLib, setPDFLib] = useState(null);
  const [JsBarcode, setJsBarcode] = useState(null);

  // Default colors
  const defaultLabelColor = "#1e3a8a";
  const defaultBorderColor = "#dc2626";
  const defaultHeaderColor = "#1e3a8a";
  const defaultNoteBgColor = "#e0e7ff";
  const defaultIssueBgColor = "#e0e7ff";

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

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => {
      setPDFLib(module);
      module.Font.registerHyphenationCallback((word) => [word]);
    });

    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib) return <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>;

  const { Document, Page, Text, View, StyleSheet, Image, pdf } = PDFLib;

  const addCard = () => setCards((prev) => [...prev, { ...prev[0] }]);
  const removeCard = (index) => setCards((prev) => prev.filter((_, i) => i !== index));
  const updateCard = (index, field, value) => {
    setCards((prev) => { const updated = [...prev]; updated[index][field] = value; return updated; });
  };
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
    `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=mailto:${encodeURIComponent(email || "")}`;

  const generateBarcodeBase64 = (card) => {
    if (!JsBarcode) return "";
    const canvas = document.createElement("canvas");
    const data = `Name: ${card.name}\nRole: ${card.role}\nPhone: ${card.phone}\nEmail: ${card.email}\nID: ${card.id}\nBlood: ${card.blood}\nVillage: ${card.village}\nThana: ${card.thana}\nDistrict: ${card.district}`;
    JsBarcode(canvas, data, { format: "CODE128", height: 25, displayValue: false });
    return canvas.toDataURL("image/png");
  };

  const styles = StyleSheet.create({
    page: { padding: 10, fontFamily: "Helvetica" },
    cardContainer: { flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", marginBottom: 10 },
    card: { width: 180, minHeight: 280, borderRadius: 8, overflow: "hidden", marginBottom: 10, backgroundColor: "#f9fafb", borderColor, borderWidth: 4, padding: 6, position: "relative" },
    frontHeader: { height: 130, width: 350, marginTop: -70, marginLeft: -35, backgroundColor: headerColor, flexDirection: "row", alignItems: "center", justifyContent: "center", transform: "rotate(-15deg)", position: "relative" },
    yellowStrip: { position: "absolute", top: 100, left: 0, width: "100%", height: 4, backgroundColor: borderColor, borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: "#fffff", borderBottomColor: "rgba(0,0,0,0.3)", borderRadius: 1, paddingTop: 0.5 },
    profileImage: { width: "34%", hight: "36%", aspectRatio: 0.85, marginTop: -18, padding: 3, backgroundColor: borderColor },
    infoBox: { padding: 4, alignItems: "flex-start", marginLeft: 25, width: 140, flexDirection: "column" },
    nameText: { fontSize: 11, fontWeight: "bold", color: headerColor, textAlign: "center", marginBottom: 10, marginTop: 2 },
    watermark: { position: "absolute", top: 168, left: 80, transform: "translate(-50%, -50%)", width: 105, height: 105, opacity: 0.14 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
    label: { fontSize: 7, fontWeight: "800", color: labelColor, minWidth: 50 },
    value: { fontSize: 8, fontWeight: "bold", color: "#000" },
    footer: { position: "absolute", bottom: -3, left: -1, right: -1, width: 300, height: 20, backgroundColor: borderColor, color: "#000", fontSize: 6, textAlign: "center", textAlignVertical: "center", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
    barcodeContainer: { marginTop: 5, alignItems: "center", marginLeft: 24, marginRight: 24, borderWidth: 0.5, borderColor: headerColor, borderRadius: 2, backgroundColor: "#fff", padding: 2 },
    barcodeImage: { width: 80, height: 25 },
    backCard: { width: 180, minHeight: 280, borderRadius: 8, overflow: "hidden", marginBottom: 10, borderColor, borderWidth: 4, padding: 6, position: "relative" },
    backTopStrip: { position: "absolute", top: -2, left: -3, width: 300, height: 22, backgroundColor: borderColor, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    backYellowStrip2: { position: "absolute", bottom: 42, left: -8, width: 230, height: 4, backgroundColor: borderColor, transform: "rotate(-11deg)", borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: "rgba(255,255,255,0.6)", borderBottomColor: "rgba(0,0,0,0.3)", borderRadius: 2 },
    backYellowStrip3: { position: "absolute", bottom: 34, left: -8, width: 230, height: 4, backgroundColor: borderColor, transform: "rotate(-11deg)", borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: "rgba(255,255,255,0.6)", borderBottomColor: "rgba(0,0,0,0.3)", borderRadius: 2 },
    backGreenBottom: { position: "absolute", bottom: -40, left: -30, width: 260, height: 80, backgroundColor: headerColor, transform: "rotate(169deg)", zIndex: 1 },
    backContent: { padding: 6, justifyContent: "flex-start", alignItems: "flex-start", flex: 1, zIndex: 1, marginTop: 20 },
    backAddressText: { fontSize: 7, alignSelf: "center", textAlign: "left", color: labelColor, marginTop: 4, fontWeight: "600" },
    qrBox: { width: 60, height: 60, alignSelf: "center", marginTop: 8 },
    qrText: { fontSize: 6, textAlign: "center", color: labelColor },
    noteBox: { backgroundColor: noteBgColor, padding: 4, borderRadius: 7, marginTop: 7 },
    noteText: { fontSize: 6, fontStyle: "italic", textAlign: "center", color: labelColor },
    signatureImage: { width: 90, height: 30, marginTop: 10, marginBottom: 2, alignSelf: "center" },
    backIssueExpiryContainer: { position: "absolute", bottom: 3, right: 0, width: 70, backgroundColor: issueBgColor, borderWidth: 1, borderColor: headerColor, borderRadius: 3, padding: 1, justifyContent: "center", alignItems: "center", flexDirection: "column", zIndex: 10 },
    backIssueExpiryText: { fontSize: 4, color: "#000", textAlign: "center", fontWeight: "bold" },
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
              <View style={{ alignItems: "center" }}>
                <Image style={styles.profileImage} src={card.profileImage || defaultProfile} />
              </View>
              <Text style={styles.nameText}>{card.name}</Text>
              <Image src={card.watermark || WatermarkImage} style={styles.watermark} />
              <View style={styles.infoBox}>
                {["profession", "dob", "phone", "id", "blood"].map((field) => (
                  <View style={styles.infoRow} key={field}>
                    <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</Text>
                    <View style={{ flex: 1, minWidth: 100, flexWrap: "wrap" }}>
                      <Text style={styles.value}>{card[field] || "N/A"}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.barcodeContainer}>
                <Image style={styles.barcodeImage} src={generateBarcodeBase64(card)} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
                <Image src={mailimg} style={{ width: 10, height: 10, marginRight: 4 }} />
                <Text style={{ fontSize: 8, fontWeight: "bold", textAlign: "center" }}>{card.email || "N/A"}</Text>
              </View>
              <Text style={styles.footer}></Text>
            </View>
            {/* Back */}
            <View style={styles.backCard}>
              <View style={styles.backTopStrip}></View>
              <View style={styles.backYellowStrip2} />
              <View style={styles.backYellowStrip3} />
              <View style={styles.backGreenBottom}></View>
              <View style={styles.backContent}>
                <Text style={styles.backAddressText}>
                  {[card.village?.trim(), card.post?.trim()].filter(Boolean).join(", ")}
                  {card.postCode && ` – ${card.postCode.trim()}`}
                </Text>
                <Text style={styles.backAddressText}>
                  {[card.thana?.trim(), card.district?.trim()].filter(Boolean).join(", ")}
                </Text>
                <View style={styles.qrBox}>
                  <Image style={{ width: 60, height: 60 }} src={generateEmailQR(card.email)} />
                  <Text style={styles.qrText}>Scan to Email</Text>
                </View>
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    "This ID card is property of personal. Please carry it at all times. If found, kindly contact me."
                  </Text>
                </View>
                {card.signatureImage && <Image style={styles.signatureImage} src={card.signatureImage} />}
                <Text style={{ fontSize: 5, textAlign: "center", marginTop: 2, color: labelColor, alignSelf: "center" }}>
                  Authorized Signature
                </Text>
                <View style={styles.backIssueExpiryContainer}>
                  <Text style={styles.backIssueExpiryText}>Issue: {card.issue || "N/A"}</Text>
                  <Text style={styles.backIssueExpiryText}>Expiry: {card.expiry || "N/A"}</Text>
                </View>
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
    <div className="min-h-screen md:p-4 lg:p-6 bg-gray-50">
      <motion.div className="max-w-5xl mx-auto  rounded-xl shadow-xl md:p-3 lg:p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">Personal ID Card Generator</h2>

        {/* Color Pickers */}
        <div className="flex flex-col items-center mt-4">
          <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-blue-500 mb-2">
            <FaRegHandPointDown className="text-[30px]" />
          </motion.span>

          <motion.button
            onClick={() => setShowColorPickers((prev) => !prev)}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            whileTap={{ scale: 0.95 }}
          >
            {showColorPickers ? "Hide Color Pickers" : "Show Color Pickers"} <FaChevronDown />
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

        
{/* Card Forms */}
{cards.map((card, idx) => (
  <div
    key={idx}
    className="
      border border-gray-300 dark:border-gray-700 
      rounded-lg p-4 space-y-4 
      bg-white dark:bg-gray-900
      shadow-md transition-all
    "
  >
    {/* Form Title */}
    <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 underline">
      ID Card Form – {idx + 1}
    </h3>

    {/* Form Background Box */}
    <div
      className="
        bg-gray-100 dark:bg-gray-300 
        p-4 rounded-lg shadow-inner
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* FORM INPUT FIELDS */}
        {[
          "name",
          "role",
          "profession",
          "phone",
          "dob",
          "email",
          "id",
          "blood",
          "village",
          "post",
          "postCode",
          "thana",
          "district",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            
            {/* Label */}
            <label className="text-sm font-semibold 
              text-gray-700 dark:text-black mb-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>

            {/* Input Box */}
            <input
              type="text"
              placeholder={`Enter ${field}`}
              value={card[field]}
              onChange={(e) => updateCard(idx, field, e.target.value)}
              className="
                w-full p-2 rounded-md
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100

                border-2 border-gray-400 dark:border-gray-600 
                focus:border-blue-500 dark:focus:border-blue-400
                focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900

                placeholder-gray-400 dark:placeholder-gray-300
                
                transition-all duration-200
              "
            />
          </div>
        ))}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-3">
      <button
        onClick={() => removeCard(idx)}
        className="
          bg-red-500 hover:bg-red-600 
          text-white px-3 py-1 rounded-lg shadow
        "
      >
        Remove
      </button>

      <button
        onClick={() => resetCard(idx)}
        className="
          bg-yellow-500 hover:bg-yellow-600
          text-white px-3 py-1 rounded-lg shadow
        "
      >
        Reset
      </button>
    </div>
  </div>
))}



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
      </motion.div>
    </div>
  );
}
