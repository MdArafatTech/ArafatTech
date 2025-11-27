// src/pages/ProfessionalIDCardPDF.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultProfile from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";

export default function ProfessionalIDCardPDF() {
  const [PDFLib, setPDFLib] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [JsBarcode, setJsBarcode] = useState(null);

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
    },
  ]);

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
    import("jsbarcode").then((module) => setJsBarcode(() => module.default));
  }, []);

  if (!PDFLib)
    return <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>;

  const { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } = PDFLib;

  const addCard = () => setCards((prev) => [...prev, { ...prev[0] }]);
  const removeCard = (index) => setCards((prev) => prev.filter((_, i) => i !== index));
  const updateCard = (index, field, value) => {
    setCards((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=mailto:${encodeURIComponent(email || "")}`;

  const generateBarcodeBase64 = (card) => {
    if (!JsBarcode) return "";
    const canvas = document.createElement("canvas");
    const data = `Name:${card.name};Role:${card.role};Phone:${card.phone};Email:${card.email};ID:${card.id};Blood:${card.blood};Village:${card.village};Thana:${card.thana};District:${card.district}`;
    JsBarcode(canvas, data, { format: "CODE128", height: 25, displayValue: false });
    return canvas.toDataURL("image/png");
  };

  const styles = StyleSheet.create({
    page: { padding: 10, fontFamily: "Helvetica" },
    cardContainer: { flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", marginBottom: 5 },
  card: {
  width: 180,
  minHeight: 220,
  borderRadius: 12,
  overflow: "hidden",
  marginBottom: 10,
  backgroundColor: "#f9fafb",
  borderTopWidth: 3,       // full width top border
  borderBottomWidth: 3,    // full width bottom border
  borderTopColor: "red",   // top border color
  borderBottomColor: "red",// bottom border color
  borderLeftWidth: 0,      // no full left border
  borderRightWidth: 0,     // no full right border
  padding: 6,
},



    frontHeader: { height: 25, backgroundColor: "#1f2937", flexDirection: "row", alignItems: "center", justifyContent: "center" },
    profileImage: { width: 70, height: 70, borderRadius: 35, marginTop: -15, borderWidth: 2, borderColor: "#fff" },
    infoBox: { padding: 4, alignItems: "flex-start", borderLeftWidth: 3, borderLeftColor: "red", marginLeft: 0 },
    nameText: { fontSize: 14, fontWeight: "bold", color: "#1e40af", textAlign: "center", marginBottom: 4 },
    label: { fontSize: 7, marginTop: 2, color: "#374151" },
    value: { fontSize: 8, fontWeight: "bold", color: "#1f2937" },
    footer: { height: 18, backgroundColor: "#f97316", color: "#fff", fontSize: 6, textAlign: "center", textAlignVertical: "center" },
    backContent: { padding: 6, justifyContent: "center", alignItems: "center", flex: 1 },
    qrBox: { width: 60, height: 60, alignSelf: "center" },
    qrText: { fontSize: 6, textAlign: "center", color: "#1f2937" },
    noteBox: { backgroundColor: "#bae6fd", padding: 6, borderRadius: 8, marginTop: 8 },
    noteText: { fontSize: 8, fontStyle: "italic", textAlign: "center", color: "#1f2937" },
    signatureImage: { width: 100, height: 40, marginTop: 10 },
    addressText: { fontSize: 7, textAlign: "center", color: "#111827", marginTop: 4 },
  });

  const MyDocument = () => (
    <Document>
      {cards.map((card, idx) => (
        <Page key={idx} size="A4" style={styles.page}>
          <View style={styles.cardContainer}>
            {/* Front Side */}
            <View style={styles.card}>
              <View style={styles.frontHeader}></View>
              <View style={{ alignItems: "center" }}>
                <Image style={styles.profileImage} src={card.profileImage} />
              </View>
              <Text style={styles.nameText}>{card.name}</Text>
              <View style={styles.infoBox}>
                <Text style={styles.label}>Role:</Text>
                <Text style={styles.value}>{card.role}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{card.phone}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{card.email}</Text>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>{card.id}</Text>
                <Text style={styles.label}>Blood:</Text>
                <Text style={styles.value}>{card.blood}</Text>
              </View>
              {/* Barcode */}
              <View style={{ marginTop: 5, alignItems: "center" }}>
                <Image style={{ width: 120, height: 25 }} src={generateBarcodeBase64(card)} />
                <Text style={{ fontSize: 5, textAlign: "center", marginTop: 2 }}>Scan to get all info</Text>
              </View>
              <Text style={styles.footer}></Text>
            </View>

            {/* Back Side */}
            <View style={styles.card}>
              <View style={styles.frontHeader}></View>
              <View style={styles.backContent}>
                <View style={styles.qrBox}>
                  <Image style={{ width: 60, height: 60 }} src={generateEmailQR(card.email)} />
                  <Text style={styles.qrText}>Scan to Email</Text>
                </View>

                {/* Note */}
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>"This ID card is property of personal. Please carry it at all times. If you find kindly contact me."</Text>
                </View>

                {/* Signature input */}
                {card.signatureImage && <Image style={styles.signatureImage} src={card.signatureImage} />}
                <Text style={{ fontSize: 7, textAlign: "center", marginTop: 2 }}>Authorized Signature</Text>

                {/* Address */}
                <Text style={styles.addressText}>
                  Village: {card.village}{"\n"}
                  Thana: {card.thana}{"\n"}
                  District: {card.district}
                </Text>
              </View>
              <Text style={styles.footer}></Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <motion.div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">Professional ID Card Generator</h2>

        {cards.map((card, idx) => (
          <motion.div key={idx} className="border border-gray-300 rounded-xl p-4 bg-yellow-50 space-y-2 relative">
            {cards.length > 1 && (
              <button
                onClick={() => removeCard(idx)}
                className="absolute cursor-pointer top-2 right-2 px-2 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                ✖ Remove
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input placeholder="Name" value={card.name} onChange={(e) => updateCard(idx, "name", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Role" value={card.role} onChange={(e) => updateCard(idx, "role", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Phone" value={card.phone} onChange={(e) => updateCard(idx, "phone", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Email" value={card.email} onChange={(e) => updateCard(idx, "email", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="ID" value={card.id} onChange={(e) => updateCard(idx, "id", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Blood" value={card.blood} onChange={(e) => updateCard(idx, "blood", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Village" value={card.village} onChange={(e) => updateCard(idx, "village", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="Thana" value={card.thana} onChange={(e) => updateCard(idx, "thana", e.target.value)} className="border p-2 rounded"/>
              <input placeholder="District" value={card.district} onChange={(e) => updateCard(idx, "district", e.target.value)} className="border p-2 rounded"/>
              <div>
                <label className="block">Profile Image</label>
                <input type="file" accept="image/*" onChange={(e) => updateCard(idx, "profileImage", URL.createObjectURL(e.target.files[0]))} className="border cursor-pointer p-1 rounded w-full"/>
                <label className="block mt-2">Signature Image</label>
                <input type="file" accept="image/*" onChange={(e) => updateCard(idx, "signatureImage", URL.createObjectURL(e.target.files[0]))} className="border cursor-pointer p-1 rounded w-full"/>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex gap-2 justify-center mt-2">
          <motion.button onClick={addCard} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600">+ Add Card</motion.button>
          <motion.button onClick={() => setShowPreview(true)} className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600">Review PDF</motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 mt-20 flex justify-center items-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-xl w-11/12 md:w-4/5 h-4/5 p-4 flex flex-col" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <button onClick={() => setShowPreview(false)} className="self-end text-red-600 font-bold hover:text-red-800">Close ✖</button>
              <div style={{ flex: 1, overflow: "auto", borderRadius: 10 }}>
                <PDFViewer style={{ width: "100%", height: "100%" }}><MyDocument /></PDFViewer>
              </div>
              <div className="flex justify-center mt-4">
                <PDFDownloadLink document={<MyDocument />} fileName="idcards.pdf">
                  {({ loading }) => loading ? "Preparing PDF..." : (<motion.button className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700">Download PDF</motion.button>)}
                </PDFDownloadLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
