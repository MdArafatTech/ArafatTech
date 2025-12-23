import React, { useState, useRef, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Image } from "@react-pdf/renderer";
import html2canvas from "html2canvas-pro";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import defaultProfile from "../assets/defualtimg.png";
import frontBg from "../assets/frontimg.png";
import backBg from "../assets/backimage.jpg";
import emailIcon from "../assets/email.png";

export default function LiveIDCardSideBySidePDF() {
  const [card, setCard] = useState({
    name: "",
    role: "",
    phone: "",
    id: "",
    blood: "",
    email: "",
    village: "",
    post: "",
    postCode: "",
    thana: "",
    district: "",
    issue: "",
    expiry: "",
    profileImage: "",
    signatureImage: "",
  });

  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(match.matches);
    const listener = (e) => setDarkMode(e.matches);
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);

  const inputFields = [
    { name: "name", placeholder: "Full Name" },
    { name: "role", placeholder: "Role" },
    { name: "phone", placeholder: "Phone" },
    { name: "id", placeholder: "NID" },
    { name: "blood", placeholder: "Blood" },
    { name: "email", placeholder: "Email" },
    { name: "village", placeholder: "Village" },
    { name: "post", placeholder: "Post Office" },
    { name: "postCode", placeholder: "Post Code" },
    { name: "thana", placeholder: "Thana" },
    { name: "district", placeholder: "District" },
    { name: "issue", placeholder: "Issue Date" },
    { name: "expiry", placeholder: "Expiry Date" },
  ];

  const fileFields = [
    { name: "profileImage", placeholder: "Upload Profile Image" },
    { name: "signatureImage", placeholder: "Upload Signature" },
  ];

  const handleChange = (e) =>
    setCard({ ...card, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setCard({ ...card, [name]: ev.target.result });
      reader.readAsDataURL(files[0]);
    }
  };

  const capturePreview = async () => {
    if (!frontRef.current || !backRef.current) return;

    const frontCanvas = await html2canvas(frontRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
      willReadFrequently: true,
      width: 350,
      height: 200,
    });
    const backCanvas = await html2canvas(backRef.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
      allowTaint: true,
      willReadFrequently: true,
      width: 350,
      height: 200,
    });

    setFrontImg(frontCanvas.toDataURL("image/png"));
    setBackImg(backCanvas.toDataURL("image/png"));
  };

  const MyDocument = () => (
    <Document>
      {frontImg && backImg && (
        <Page
          size={[320, 400]}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Image
            src={frontImg}
            style={{ width: "100%", height: "auto", marginBottom: 10 }}
          />
          <Image src={backImg} style={{ width: "100%", height: "auto" }} />
        </Page>
      )}
    </Document>
  );

  // ORIGINAL ID CARD PREVIEW STYLES - UNCHANGED
  const previewStyles = {
    container: {
      display: "flex",
      gap: 20,
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
    },
    card: {
      width: 350,
      height: 200,
      borderRadius: 10,
      overflow: "hidden",
      border: "1px solid #444",
      position: "relative",
      backgroundColor: "#ffffff",
      boxSizing: "border-box",
      flexShrink: 0,
      minWidth: 280,
    },
    bgImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      objectFit: "cover",
    },
    frontContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      padding: 10,
      position: "relative",
    },
    profileImage: {
      width: 56,
      height: 58,
    borderRadius:1,
      marginTop: -15,
      marginLeft: 47,
      marginRight: 37,
    },
    nameText: {
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 15,
      marginLeft: -30,
      width: "100%",
      color: "#f3f3f3",
    },
    infoColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: -11,
    },
    label: {
      fontSize: 10,
      fontWeight: "bold",
      width: 60,
      color: "#f3f3f3",
      whiteSpace: "nowrap",
    },
    value: {
      fontSize: 10,
      color: "#000000",
      marginLeft: 5,
      marginBottom: 4,
      padding: "2px 6px",
      backgroundColor: "#f0f6ff",
      border: "1px solid #ccc",
      borderRadius: 1,
      fontWeight: "bold",
      width: 125,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      boxShadow: "1px 1px 0 #999, 2px 2px 0 #888, 2px 3px 0 #777",
    },
    emailRow: {
      display: "flex",
      alignItems: "center",
      color: "#f0f6ff",
      marginTop: 8,
      marginLeft: -25,
      fontSize: 11,
    },
    emailIcon: { width: 13, height: 13, marginRight: 5 },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"
      }`}
    >
      {/* MODERN HEADER */}
      <motion.div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20">
          <motion.div
            className={`inline-flex items-center px-8 py-4 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-blue-500/50 text-white shadow-blue-500/25"
                : "bg-gradient-to-r from-blue-500/90 to-purple-500/90 border-blue-400/50 text-white shadow-blue-400/25"
            }`}
          >
            <motion.h1 className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight">
              Smart Personal ID Card Generator
            </motion.h1>
          </motion.div>

          {/* CLOSE BUTTON */}
          <motion.button
            onClick={() => navigate("/idcardpage")}
            className={`absolute top-8 right-8 p-4 rounded-2xl shadow-2xl transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-700 hover:to-red-800 shadow-red-500/30"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-400/30"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>
        </div>

        {/* MODERN FORM */}
        <motion.section
          className={`max-w-6xl mx-auto mb-20 px-4 ${
            darkMode
              ? "bg-gradient-to-b from-gray-800/50 to-transparent rounded-3xl p-8 backdrop-blur-xl"
              : "bg-gradient-to-b from-white/70 to-transparent rounded-3xl p-8 backdrop-blur-xl"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className={`text-4xl font-black text-center mb-16 ${
              darkMode
                ? "bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl"
                : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent drop-shadow-2xl"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            📝 Enter Card Details
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {inputFields.map((f) => (
              <motion.div
                key={f.name}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label
                  className={`block text-sm font-bold mb-3 tracking-wide ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {f.placeholder}
                </label>
                <input
                  type={
                    f.name === "issue" || f.name === "expiry" ? "date" : "text"
                  }
                  name={f.name}
                  placeholder={f.placeholder}
                  value={card[f.name]}
                  onChange={handleChange}
                  className={`w-full text-sm p-3 md:p-4 lg:p-5 rounded-2xl font-semibold md:text-md lg:text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-xl placeholder:opacity-50 ${
                    darkMode
                      ? "bg-gray-700/70 text-white border border-gray-600 hover:border-blue-500/70 focus:ring-blue-500/40 focus:ring-offset-gray-900 hover:bg-gray-600/80"
                      : "bg-white/80 text-gray-900 border border-gray-200/50 hover:border-blue-400/70 focus:ring-blue-400/40 focus:ring-offset-white hover:bg-white shadow-lg hover:shadow-2xl"
                  }`}
                />
              </motion.div>
            ))}

            {fileFields.map((f) => (
              <motion.div
                key={f.name}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label
                  className={`block text-sm font-bold mb-3 tracking-wide ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {f.placeholder}
                </label>
                <input
                  type="file"
                  name={f.name}
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full p-5 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer file:mr-6 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:font-bold file:transition-all file:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-xl ${
                    darkMode
                      ? "bg-gray-700/70 text-white border border-gray-600 hover:border-blue-500/70 file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white file:hover:from-blue-700 file:hover:to-purple-700 focus:ring-blue-500/40 hover:bg-gray-600/80"
                      : "bg-white/80 text-gray-900 border border-gray-200/50 hover:border-blue-400/70 file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white file:hover:from-blue-600 file:hover:to-purple-600 shadow-lg hover:shadow-2xl focus:ring-blue-400/40"
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ACTION BUTTONS */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={capturePreview}
            className={`px-12 py-6 cursor-pointer rounded-3xl font-bold text-xl shadow-2xl transition-all duration-300 group ${
              darkMode
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/40 hover:shadow-emerald-400/60"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-400/40 hover:shadow-emerald-500/60"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex  items-center gap-3">
              🎨 Prepare PDF Preview
              <motion.div className="w-3 h-3 bg-white/50 rounded-full group-hover:w-8 transition-all duration-300" />
            </span>
          </motion.button>

          {frontImg && backImg && (
            <PDFDownloadLink
              document={<MyDocument />}
              fileName={`ID_Card_${Date.now()}.pdf`}
              className={`px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl transition-all duration-300 text-center ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/40 hover:shadow-blue-400/60"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-400/40 hover:shadow-blue-500/60"
              }`}
              onClick={() => setTimeout(() => window.location.reload(), 1200)}
            >
              {({ loading }) =>
                loading ? (
                  <motion.span className="flex items-center gap-3">
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Generating PDF...
                  </motion.span>
                ) : (
                  "⬇️ Download Professional PDF"
                )
              }
            </PDFDownloadLink>
          )}
        </motion.div>

        {/* PRO TIP */}
        {frontImg && backImg && (
          <motion.div
            className={`max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-500 mb-20 ${
              darkMode
                ? "bg-gray-800/80 border-blue-500/40 text-gray-200"
                : "bg-white/80 border-blue-300/50 text-gray-700"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  💡 Pro Tip
                </h3>
                <p className="text-md md:text-md lg:text-lg leading-relaxed">
                  If download doesn't work first time, try again or clear your
                  browser's download history then download again.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ORIGINAL ID CARD PREVIEW - UNCHANGED */}
        <motion.div
          className="flex flex-col items-center gap-8 px-4 pb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div style={previewStyles.container}>
            {/* Front Card - EXACT SAME */}
            <div ref={frontRef} style={previewStyles.card}>
              <img src={frontBg} alt="Front" style={previewStyles.bgImage} />
              <div style={previewStyles.frontContent}>
                <img
                  src={card.profileImage || defaultProfile}
                  alt="Profile"
                  style={previewStyles.profileImage}
                />
                <div style={previewStyles.infoColumn}>
                  <p
                    style={{
                      ...previewStyles.nameText,
                      textAlign: "center",
                      margin: 5,
                    }}
                  >
                    {card.name}
                  </p>
                  {inputFields.slice(1, 5).map((f) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 2,
                      }}
                      key={f.name}
                    >
                      <div style={previewStyles.label}>{f.placeholder}:</div>
                      <div style={previewStyles.value}>{card[f.name]}</div>
                    </div>
                  ))}
                  <div style={previewStyles.emailRow}>
                    <img src={emailIcon} style={previewStyles.emailIcon} />
                    {card.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Back Card - EXACT SAME */}
            <div ref={backRef} style={previewStyles.card}>
              <img src={backBg} alt="Back" style={previewStyles.bgImage} />
              <div
                style={{
                  padding: 10,
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginTop: -6,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#e6e6e6",
                  }}
                >
                  <p style={{ margin: "10px 0 2px 6px" }}>
                    {[card.village, card.post].filter(Boolean).join(", ")}
                    {card.postCode ? ` - ${card.postCode}` : ""}
                  </p>
                  <p style={{ margin: "0 0 2px 6px" }}>
                    {[card.thana, card.district].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginLeft: 136,
                    marginTop: 57,
                  }}
                >
                  <QRCodeCanvas value={`mailto:${card.email}`} size={60} />
                  <p
                    style={{
                      fontSize: 7,
                      marginTop: 3,
                      color: "#f3f3f3",
                      marginLeft: -130,
                    }}
                  >
                    Scan to Email
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  {card.signatureImage ? (
                    <img
                      src={card.signatureImage}
                      alt="Signature"
                      style={{
                        width: 80,
                        height: 30,
                        marginTop: -20,
                        marginBottom: 9,
                      }}
                    />
                  ) : (
                    <div style={{ width: 70, height: 25 }} />
                  )}
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      fontWeight: "bold",
                      marginTop: -25,
                    }}
                  >
                    <p style={{ marginTop: -70, color: "#f5f5f5" }}>
                      Issue: {card.issue || "N/A"}
                    </p>
                    <p
                      style={{
                        marginTop: -4,
                        fontWeight: "bold",
                        color: "#f5f5f5",
                      }}
                    >
                      Expiry: {card.expiry || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}









































