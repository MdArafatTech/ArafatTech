// src/pages/IDCard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultLogo from "../assets/WhatsApp Image 2025-11-26 at 14.48.18_76b00539.jpg";

export default function IDCard() {
  const [PDFLib, setPDFLib] = useState(null);

  const [headerInfo, setHeaderInfo] = useState({
    collegeName: "RAJSHAHI COLLEGE",
    department: "DEPARTMENT OF PHYSICS",
    session: "2023 - 2024",
    date: "",
    logo: defaultLogo,
  });

  const [students, setStudents] = useState([
    { name: "", roll: "", email: "", mobile: "" },
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  useEffect(() => {
    import("@react-pdf/renderer").then((module) => setPDFLib(module));
  }, []);

  if (!PDFLib)
    return <p className="p-6 text-center text-orange-500">Loading PDF engine...</p>;

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

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHeaderInfo((prev) => ({ ...prev, logo: url }));
  };

  const generateEmailQR = (email) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=mailto:${encodeURIComponent(
      email || ""
    )}`;

  const paginateStudents = () => {
    const pages = [];
    for (let i = 0; i < students.length; i += 6) pages.push(students.slice(i, i + 6));
    return pages;
  };

  const styles = StyleSheet.create({
    page: { padding: 20, fontFamily: "Helvetica" },
    header: {
      marginBottom: 12,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderColor: "#000",
    },
    logo: { width: 65, height: 65, marginBottom: 6 },
    collegeName: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    department: { fontSize: 13, textAlign: "center", marginBottom: 2 },
    session: {
      fontSize: 12,
      color: "#1a1a1a",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
    },
    studentBox: {
      width: "48%",
      borderRadius: 10,
      padding: 12,
      borderWidth: 1,
      borderColor: "#000",
      minHeight: 180,
      gap: 6,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    infoBox: { width: "60%", minWidth: 0 },
    qrBox: { width: "40%", alignItems: "center" },
    qrImage: { width: 80, height: 80 },
    qrText: { fontSize: 9, textAlign: "center", marginTop: 3 },
    serialNumber: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
    label: { fontSize: 10, marginTop: 3 },
    value: { fontSize: 14, marginBottom: 2, fontWeight: "bold" },
    emailBottom: {
      fontSize: 16,
      textAlign: "left",
      width: "100%",
      fontWeight: "bold",
    },
    footer: {
      position: "absolute",
      bottom: 10,
      left: 10,
      fontSize: 10,
      color: "#333",
    },
  });

  const MyDocument = () => (
    <Document>
      {paginateStudents().map((studentPage, pageIndex) => (
        <Page style={styles.page} key={pageIndex}>
          <View style={styles.header}>
            <View style={{ alignItems: "center" }}>
              <Image style={styles.logo} src={headerInfo.logo} />
              <Text style={styles.collegeName}>{headerInfo.collegeName}</Text>
              <Text style={styles.department}>{headerInfo.department}</Text>
              <Text style={styles.session}>Session: {headerInfo.session}</Text>
            </View>

            {headerInfo.date ? (
              <View style={{ width: "100%", alignItems: "flex-end", marginTop: 4 }}>
                <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                  Date: {headerInfo.date}
                </Text>
              </View>
            ) : null}
          </View>

          {studentPage
            .reduce((rows, s, i) => {
              if (i % 2 === 0) rows.push([s]);
              else rows[rows.length - 1].push(s);
              return rows;
            }, [])
            .map((pair, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {pair.map((s, idx) => (
                  <View style={styles.studentBox} key={idx}>
                    <View style={styles.cardRow}>
                      <View style={styles.infoBox}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{s.name}</Text>

                        <Text style={styles.label}>Roll:</Text>
                        <Text style={styles.value}>{s.roll}</Text>

                        <Text style={styles.label}>Mobile:</Text>
                        <Text style={styles.value}>{s.mobile}</Text>
                      </View>

                      <View style={styles.qrBox}>
                        <Image style={styles.qrImage} src={generateEmailQR(s.email)} />
                        <Text style={styles.qrText}>Scan to Email</Text>
                      </View>
                    </View>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.emailBottom}>{s.email}</Text>
                  </View>
                ))}
              </View>
            ))}

          <Text style={styles.footer}>Powered by ArafatTech</Text>
        </Page>
      ))}
    </Document>
  );

  const addStudent = () =>
    setStudents((prev) => [
      ...prev,
      { name: "", roll: "", email: "", mobile: "" },
    ]);

  const removeStudent = (index) =>
    setStudents((prev) => prev.filter((_, i) => i !== index));

  const updateStudent = (i, field, value) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600">
          ID Card Generator
        </h2>

        {/* HEADER FORM */}
        <div className="border border-gray-400 rounded-xl p-4 bg-orange-50 text-black space-y-3">
          <h3 className="font-bold text-lg text-orange-700">
            College Header Settings
          </h3>

          <input
            className="w-full border border-black p-2 rounded-md"
            placeholder="College Name"
            value={headerInfo.collegeName}
            onChange={(e) =>
              setHeaderInfo((prev) => ({ ...prev, collegeName: e.target.value }))
            }
          />

          <input
            className="w-full border border-black p-2 rounded-md"
            placeholder="Department Name"
            value={headerInfo.department}
            onChange={(e) =>
              setHeaderInfo((prev) => ({ ...prev, department: e.target.value }))
            }
          />

          <input
            className="w-full border border-black p-2 rounded-md"
            placeholder="Session (2023-2024)"
            value={headerInfo.session}
            onChange={(e) =>
              setHeaderInfo((prev) => ({ ...prev, session: e.target.value }))
            }
          />

          <input
            type="date"
            className="w-full border border-black p-2 rounded-md"
            value={headerInfo.date}
            onChange={(e) =>
              setHeaderInfo((prev) => ({ ...prev, date: e.target.value }))
            }
          />

          <div>
            <p className="font-medium">Upload College Logo:</p>

            <label className="flex items-center gap-2 bg-orange-400 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-orange-700 transition-all w-fit">
              <span className="text-lg">📤</span>
              <span>Choose Logo</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>

            {headerInfo.logo && headerInfo.logo !== defaultLogo && (
              <p className="text-sm mt-1 text-green-700 font-semibold">
                ✔ Logo Selected
              </p>
            )}
          </div>
        </div>

        {/* STUDENT FORMS */}
        {students.map((student, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-300 rounded-xl p-4 bg-orange-50 space-y-2 relative"
          >
            <h3 className="font-semibold text-orange-700">
              Student {index + 1}
            </h3>

            {/* ❌ REMOVE BUTTON */}
            {students.length > 1 && (
              <button
                onClick={() => removeStudent(index)}
                className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
              >
                ✖ Remove
              </button>
            )}

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Name"
              value={student.name}
              onChange={(e) => updateStudent(index, "name", e.target.value)}
            />

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Roll"
              value={student.roll}
              onChange={(e) => updateStudent(index, "roll", e.target.value)}
            />

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Email"
              value={student.email}
              onChange={(e) => updateStudent(index, "email", e.target.value)}
            />

            <input
              className="w-full border border-black p-2 rounded-md text-black"
              placeholder="Mobile"
              value={student.mobile}
              onChange={(e) => updateStudent(index, "mobile", e.target.value)}
            />
          </motion.div>
        ))}

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addStudent}
            className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600"
          >
            + Add More Student
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowPreview(true)}
            className="bg-green-500 text-white px-4 cursor-pointer py-2 rounded-lg font-semibold shadow-md hover:bg-green-600"
          >
            Review PDF
          </motion.button>
        </div>
      </motion.div>

      {/* PDF PREVIEW MODAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 mt-10 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-11/12 md:w-4/5 h-4/5 bg-white rounded-xl p-4 flex flex-col"
            >
              <button
                onClick={() => setShowPreview(false)}
                className="self-end mb-2 text-red-600 cursor-pointer font-bold hover:text-red-800"
              >
                Close ✖
              </button>

              <div
                style={{
                  width: "100%",
                  height: isMobile ? "80vh" : "70vh",
                  overflow: "auto",
                  borderRadius: 10,
                }}
              >
                <PDFViewer
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                  <MyDocument />
                </PDFViewer>
              </div>

              <div className="mt-4 flex justify-center">
                <PDFDownloadLink
                  document={<MyDocument />}
                  fileName="idcards.pdf"
                >
                  {({ loading }) =>
                    loading ? (
                      "Preparing PDF..."
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700"
                      >
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
