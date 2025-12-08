import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const gradePointMap = {
  "A+": 4.0,
  A: 3.75,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.25,
  D: 2.0,
  F: 0.0,
};

const gradeOptions = Object.keys(gradePointMap);

const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState([
    { name: "Semester 1", courses: [{ name: "", credit: "", grade: "A+" }] },
  ]);
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [roll, setRoll] = useState("");
  const [logo, setLogo] = useState(null);

  const fileInputRef = useRef(null);

  // --- Automatic dark/light mode with smooth transition ---
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { name: `Semester ${semesters.length + 1}`, courses: [{ name: "", credit: "", grade: "A+" }] },
    ]);
  };

  const removeSemester = (semIndex) => {
    setSemesters(semesters.filter((_, i) => i !== semIndex));
  };

  const addCourse = (semIndex) => {
    const updated = [...semesters];
    updated[semIndex].courses.push({ name: "", credit: "", grade: "A+" });
    setSemesters(updated);
  };

  const removeCourse = (semIndex, courseIndex) => {
    const updated = [...semesters];
    updated[semIndex].courses = updated[semIndex].courses.filter((_, i) => i !== courseIndex);
    setSemesters(updated);
  };

  const updateCourse = (semIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const computeSemesterResult = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach((c) => {
      const credit = parseFloat(c.credit);
      const gp = gradePointMap[c.grade];
      if (!isNaN(credit) && credit > 0) {
        totalPoints += gp * credit;
        totalCredits += credit;
      }
    });
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    return { totalPoints: totalPoints.toFixed(2), totalCredits, gpa };
  };

  const computeCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach((sem) => {
      sem.courses.forEach((c) => {
        const credit = parseFloat(c.credit);
        const gp = gradePointMap[c.grade];
        if (!isNaN(credit) && credit > 0) {
          totalPoints += gp * credit;
          totalCredits += credit;
        }
      });
    });
    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    return { totalPoints: totalPoints.toFixed(2), totalCredits, cgpa };
  };

  const { totalPoints, totalCredits, cgpa } = computeCGPA();

  const downloadPdf = async () => {
    const date = new Date().toLocaleDateString();
    const logoUrl = logo || "/logo-nu.png";

    const doc = (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.header}>
            <Image src={logoUrl} style={pdfStyles.logo} />
            <Text style={pdfStyles.title}>National University Bangladesh</Text>
            <Text style={pdfStyles.date}>{date}</Text>
          </View>
          <View style={pdfStyles.userInfoRow}>
            <Text style={pdfStyles.label}>Name: </Text>
            <Text style={pdfStyles.value}>{name || "N/A"}</Text>
            <Text style={pdfStyles.label}>Registration: </Text>
            <Text style={pdfStyles.value}>{reg || "N/A"}</Text>
            <Text style={pdfStyles.label}>Roll: </Text>
            <Text style={pdfStyles.value}>{roll || "N/A"}</Text>
          </View>
          {semesters.map((sem, semIndex) => {
            const { totalPoints, totalCredits, gpa } = computeSemesterResult(sem.courses);
            return (
              <View key={semIndex} style={pdfStyles.section}>
                <Text style={pdfStyles.semesterTitle}>{sem.name}</Text>
                <View style={pdfStyles.tableHeaderRow}>
                  <Text style={pdfStyles.tableHeader}>Subject</Text>
                  <Text style={pdfStyles.tableHeader}>Grade</Text>
                  <Text style={pdfStyles.tableHeader}>Credit</Text>
                  <Text style={pdfStyles.tableHeader}>Point</Text>
                </View>
                {sem.courses.map((c, i) => (
                  <View key={i} style={pdfStyles.row}>
                    <Text style={pdfStyles.cell}>{c.name || "N/A"}</Text>
                    <Text style={pdfStyles.cell}>{c.grade}</Text>
                    <Text style={pdfStyles.cell}>{c.credit || "N/A"}</Text>
                    <Text style={pdfStyles.cell}>
                      {(gradePointMap[c.grade] * parseFloat(c.credit)).toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View style={pdfStyles.resultSection}>
                  <Text style={pdfStyles.resultLabel}>Semester Credits: </Text>
                  <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
                  <Text style={pdfStyles.resultLabel}>Semester Points: </Text>
                  <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
                  <Text style={pdfStyles.resultLabel}>GPA: </Text>
                  <Text style={pdfStyles.resultHighlight}>{gpa}</Text>
                </View>
              </View>
            );
          })}
          <View style={pdfStyles.finalResultSection}>
            <Text style={pdfStyles.finalResultTitle}>Final Result</Text>
            <Text style={pdfStyles.resultLabel}>Total Credits: </Text>
            <Text style={pdfStyles.resultValue}>{totalCredits}</Text>
            <Text style={pdfStyles.resultLabel}>Total Grade Points: </Text>
            <Text style={pdfStyles.resultValue}>{totalPoints}</Text>
            <Text style={pdfStyles.resultLabel}>CGPA: </Text>
            <Text style={pdfStyles.resultHighlight}>{cgpa}</Text>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    saveAs(blob, "National_University_Result_Sheet.pdf");
  };

  return (
    <div style={theme === "dark" ? darkStyles.container : styles.container}>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
       
      </div>

      <h1  style={theme === "dark" ? darkStyles.title : styles.title}>
        Bangladesh Semester GPA / CGPA Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={theme === "dark" ? darkStyles.input : styles.input}
        />
        <input
          type="text"
          placeholder="Registration"
          value={reg}
          onChange={(e) => setReg(e.target.value)}
          style={theme === "dark" ? darkStyles.input : styles.input}
        />
        <input
          type="text"
          placeholder="Roll"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          style={theme === "dark" ? darkStyles.input : styles.input}
        />
      </div>

      <AnimatePresence>
        {semesters.map((sem, semIndex) => {
          const chartData = {
            labels: sem.courses.map((c, i) => c.name || `Course ${i + 1}`),
            datasets: [
              {
                label: "Grade Point",
                data: sem.courses.map((c) => gradePointMap[c.grade]),
                backgroundColor: theme === "dark" ? "#4bc0c0" : "#007bff",
              },
            ],
          };

          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 4 } },
            plugins: {
              legend: {
                labels: {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              },
            },
          };

          const { totalPoints, totalCredits, gpa } = computeSemesterResult(sem.courses);

          return (
            <motion.div
              key={semIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={theme === "dark" ? darkStyles.semester : styles.semester}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>{sem.name}</h2>
                {semesters.length > 1 && (
                  <button
                    onClick={() => removeSemester(semIndex)}
                    style={{ ...styles.removeBtn, backgroundColor: "#6c757d" }}
                  >
                    Remove Semester
                  </button>
                )}
              </div>

              {sem.courses.map((c, courseIndex) => (
                <div key={courseIndex} style={styles.courseRow}>
                  <input
                    type="text"
                    placeholder="Subject Name"
                    value={c.name}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "name", e.target.value)
                    }
                    style={theme === "dark" ? darkStyles.input : styles.input}
                  />
                  <select
                    value={c.grade}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "grade", e.target.value)
                    }
                    style={theme === "dark" ? darkStyles.select : styles.select}
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Credit"
                    value={c.credit}
                    onChange={(e) =>
                      updateCourse(semIndex, courseIndex, "credit", e.target.value)
                    }
                    min="0"
                    step="0.5"
                    style={theme === "dark" ? darkStyles.input : styles.input}
                  />
                  <button
                    onClick={() => removeCourse(semIndex, courseIndex)}
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={() => addCourse(semIndex)} style={styles.button}>
                Add Course
              </button>

              <div style={{ marginTop: "20px", height: "250px" }}>
                <Bar data={chartData} options={chartOptions} />
              </div>

              <div style={styles.semesterResult}>
                <p>
                  <strong>Semester Credits:</strong> {totalCredits}
                </p>
                <p>
                  <strong>Semester Points:</strong> {totalPoints}
                </p>
                <p
                  style={{
                    fontSize: "1.2em",
                    color:
                      gpa >= 3.75
                        ? "#28a745"
                        : gpa >= 3.0
                        ? "#ffc107"
                        : "#dc3545",
                  }}
                >
                  <strong>GPA: {gpa}</strong>
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div style={styles.buttonRow}>
        <button onClick={addSemester} style={styles.button}>
          Add Semester
        </button>
      </div>

      <div
        id="result-card"
        style={theme === "dark" ? darkStyles.resultCard : styles.resultCard}
      >
        <h2>Overall Result</h2>
        <p>
          <strong>Total Credits:</strong> {totalCredits}
        </p>
        <p>
          <strong>Total Grade Points:</strong> {totalPoints}
        </p>
        <p
          style={{
            fontSize: "1.5em",
            color:
              cgpa >= 3.75 ? "#28a745" : cgpa >= 3.0 ? "#ffc107" : "#dc3545",
          }}
        >
          <strong>CGPA: {cgpa}</strong>
        </p>
        <button onClick={downloadPdf} style={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

// --- PDF Styles ---
const pdfStyles = StyleSheet.create({
  page: { padding: 20, fontSize: 11, fontFamily: "Helvetica" },
  header: {
    flexDirection: "col",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "2px solid #007bff",
    paddingBottom: 25,
  },
  logo: { width: 80, height: 80 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
  date: { fontSize: 9, position: "absolute", right: 10, top: 90 },
  userInfoRow: { flexDirection: "row", gap: 10, marginBottom: 10, flexWrap: "wrap" },
  label: { fontSize: 12, fontWeight: "bold", width: "20%" },
  value: { fontSize: 11, width: "30%" },
  section: { marginBottom: 20 },
  semesterTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
  tableHeaderRow: { flexDirection: "row", borderBottom: "1px solid #333" },
  tableHeader: { width: "25%", fontSize: 12, fontWeight: "bold" },
  row: { flexDirection: "row", borderBottom: "1px solid #ccc", paddingVertical: 5 },
  cell: { width: "25%", fontSize: 12 },
  resultSection: { marginTop: 10, padding: 10, backgroundColor: "#f4f4f4", borderRadius: 6 },
  resultLabel: { fontSize: 13, fontWeight: "bold" },
  resultValue: { fontSize: 13 },
  resultHighlight: { fontSize: 14, fontWeight: "bold", color: "#28a745" },
  finalResultSection: { marginTop: 17, padding: 10, backgroundColor: "#e9f7ef", borderRadius: 6 },
  finalResultTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
});

// --- Light & Dark Styles ---
const baseTransition = { transition: "background-color 0.1s, color 0.1s" };
const styles = {
  container: { maxWidth: 900, margin: "auto", padding:15, marginBottom:20, backgroundColor: "#fff", borderRadius: 5, ...baseTransition },
  title: { textAlign: "center", color: "#007bff", fontSize: "27px", fontWeight: "bold", ...baseTransition },
  input: { flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc", ...baseTransition },
  select: { flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc", ...baseTransition },
  removeBtn: { padding: 5, backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: 4, cursor:"pointer", ...baseTransition },
  button: { padding: 10, backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", marginRight: 10, ...baseTransition },
  buttonRow: { textAlign: "center", margin: 20 },
  semester: { marginBottom: 30, padding: 15, backgroundColor: "#f4f4f4", borderRadius: 6, ...baseTransition },
  userInfoRow: { display: "flex", gap: 10, marginBottom: 10 },
  courseRow: { display: "flex", gap: 10, marginBottom: 10 },
  semesterResult: { marginTop: 10 },
  resultCard: { padding: 15, marginTop: 20, backgroundColor: "#e9ecef", borderRadius: 6, ...baseTransition },
};

const darkStyles = {
  container: { ...styles.container, backgroundColor: "#1e1e2f", color: "#fff" },
  title: { ...styles.title, color: "#4bc0c0" },
  input: { ...styles.input, backgroundColor: "#2c2c3e", color: "#fff", border: "1px solid #444" },
  select: { ...styles.select, backgroundColor: "#2c2c3e", color: "#fff", border: "1px solid #444" },
  removeBtn: { ...styles.removeBtn },
  button: { ...styles.button, backgroundColor: "#4bc0c0" },
  semester: { ...styles.semester, backgroundColor: "#2c2c3e" },
  resultCard: { ...styles.resultCard, backgroundColor: "#2c2c3e" },
};

export default CgpaCalculator;



