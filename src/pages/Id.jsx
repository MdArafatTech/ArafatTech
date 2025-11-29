// src/pages/ProfessionalIDCardPDF.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";
import { 
  FaRegHandPointDown, 
  FaChevronDown, 
  
} from "react-icons/fa";






























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
  labelColor, setLabelColor,
  borderColor, setBorderColor,
  headerColor, setHeaderColor,
  noteBgColor, setNoteBgColor,
  issueBgColor, setIssueBgColor,
 
  showColorPickers,
}) {
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






export default function ProfessionalIDCardPDF() {
  const [PDFLib, setPDFLib] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
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
        watermark: defaultWatermark,
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
      padding:4,
      alignItems: "flex-start",
      marginLeft:25,
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

    // infoRow: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   marginBottom: 2,

    // },


infoContainer: {
  alignSelf: "center", // center the whole box horizontally
  width: "60%",        // adjust width as needed
  borderWidth: 1,      // optional: border for testing
  borderColor: "#ccc",
  padding: 5,
  borderRadius: 4,
},

// infoRow: {
//   flexDirection: "row",
//   alignItems: "flex-start",
//   marginBottom: 2,
// },

// label: {
//   fontSize:7,
//   fontWeight: "800",
//   color: "#333",
//   minWidth:45,    // fixed width for all labels
// },

// value: {
//   fontSize: 8,
//   fontWeight: "bold",
//   color: "#000",
//   flex:3,                // take remaining horizontal space
//   lineHeight: 1.2,
//   wordBreak: "break-all", // wrap long text like emails
// },

infoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 2,
},

label: {
  fontSize: 7,
  fontWeight: "800",
  color: labelColor,
  minWidth: 50,
},

value: {
  fontSize: 8,
  fontWeight: "bold",
  color: "#000",
  // For React Native, wrap in a View with flexWrap: "wrap" and maxWidth
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
  borderTopColor: "rgba(255,255,255,0.6)",   // top glow highlight
  borderBottomColor: "rgba(0,0,0,0.3)",      // bottom soft shadow

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
  borderTopColor: "rgba(255,255,255,0.6)",   // glowing upper edge
  borderBottomColor: "rgba(0,0,0,0.3)",      // shadow for depth

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
      alignSelf: "center", // ✅ centers image horizontally
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
            {/* Front */}
            <View style={styles.card}>
              <View style={styles.frontHeader}>
                <View style={[styles.yellowStrip, { top: 122 }]} />
                <View style={[styles.yellowStrip, { top: 130 }]} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.profileImage}
                  src={card.profileImage || defaultProfile}
                />
              </View>
<Text style={styles.nameText}>{card.name}</Text>
              <Image src={WatermarkImage} style={styles.watermark} />
              <Image
                src={card.watermark || defaultWatermark}
                style={styles.watermark}
              />
<View style={styles.infoBox}>
  {["role", "email", "phone", "id", "blood"].map((field) => (
    <View style={styles.infoRow} key={field}>
      <Text style={styles.label}>
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </Text>
      <View
        style={{
          flex: 1, // expand container
          minWidth: 100, 
          flexWrap: field === "role" ? "nowrap" : "wrap", // role stays one line
        }}
      >
        <Text style={styles.value} numberOfLines={0} textBreakStrategy="simple">
          {card[field] || "N/A"}
        </Text>
      </View>
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
                  style={{
                    fontSize: 5,
                    textAlign: "center",
                    marginTop: 2,
                    color: labelColor,
                    alignSelf: "center", // ✅ centers text horizontally
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

  return (
    <div className="min-h-screen  md:p-4 lg:p-6 bg-gray-50">
      <motion.div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl  md:p-3 lg:p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-600">
          Professional ID Card Generator
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
    onClick={() => setShowColorPickers(prev => !prev)}
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
        labelColor={labelColor} setLabelColor={setLabelColor}
        borderColor={borderColor} setBorderColor={setBorderColor}
        headerColor={headerColor} setHeaderColor={setHeaderColor}
        noteBgColor={noteBgColor} setNoteBgColor={setNoteBgColor}
        issueBgColor={issueBgColor} setIssueBgColor={setIssueBgColor}
      
        showColorPickers={showColorPickers}
      />


</div>













        {/* Card Forms */}
        {/* Card Forms */}
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
             className="border border-gray-300 rounded-xl bg-orange-50 text-black space-y-2 relative
               p-2 md:p-4 w-full md:w-auto mx-0"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              {idx !== 0 && (
                <button
                  onClick={() => removeCard(idx)}
                  className="cursor-pointer px-2 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                >
                  ✖
                </button>
              )}
              <button
                onClick={() => resetCard(idx)}
                className="cursor-pointer px-2 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                ↻
              </button>
            </div>

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
                placeholder="Blood Group"
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
                placeholder="Post"
                value={card.post}
                onChange={(e) => updateCard(idx, "post", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Post Code"
                value={card.postCode}
                onChange={(e) => updateCard(idx, "postCode", e.target.value)}
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
                type="date"
                placeholder="Issue Date"
                value={card.issue}
                onChange={(e) => updateCard(idx, "issue", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Expiry Date"
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
              <div style={{ flex: 1, overflow: "auto", borderRadius: 10 }}>
                <PDFViewer style={{ width: "100%", height: "100%" }}>
                  <MyDocument cards={cards} />
                </PDFViewer>
              </div>
              <div className="flex justify-center mt-4">
                <PDFDownloadLink
                  document={<MyDocument cards={cards} />}
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
