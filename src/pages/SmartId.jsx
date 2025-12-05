



























import React, { useState, useRef, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Image } from "@react-pdf/renderer";
import html2canvas from "html2canvas-pro";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

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

  // Detect system dark/light mode
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(match.matches);
    const listener = (e) => setDarkMode(e.matches);
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);


   const navigate = useNavigate(); 
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);

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
      borderRadius: 2,
      marginTop: -15,
      marginLeft: 47,
      marginRight: 38,
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
      marginLeft:-25,
      fontSize: 11,
      // fontWeight: "bold",
      //  border: "1px solid #ccc",
      //  backgroundColor: "#f0f6ff",
      // borderRadius:2,
    },
    emailIcon: { width: 13, height: 13, marginRight: 5 },
    input: {
      padding: 10,
      borderRadius: 6,
      border: "1px solid #ccc",
      fontSize: 13,
      width: "100%",
      boxSizing: "border-box",
    },
    formCard: {
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
      color: darkMode ? "#e5e7eb" : "#000000",
      marginBottom: 30,
      width: "100%",
      maxWidth: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
    gridContainer: {
      display: "grid",
      gap: 15,
      width: "100%",
   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // <-- fix here
    },
  };

  return (
       <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: darkMode ? "#111827" : "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // <-- needed for absolute positioning of the close button
      }}
    >
      {/* Close button */}
      <button
         onClick={() => navigate("/idcardpage")}// go back to previous page
        style={{
          position: "absolute",
          top: 70,
          right:300,
          background: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          fontSize:30,
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
       Smart Personal ID Card Generator
      </h1>

      <button
        onClick={capturePreview}
        style={{
          padding: "10px 18px",
          background: "#28a745",
          color: "#fff",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
         Prepare PDF
      </button>

{frontImg && backImg && (
  <>
    <PDFDownloadLink
      document={<MyDocument />}
      fileName={`ID_Card_${Date.now()}.pdf`}
      style={{
        padding: "10px 18px",
        background: "#007bff",
        color: "#fff",
        borderRadius: 6,
        textDecoration: "none",
        display: "block",
        textAlign: "center",
        marginBottom: 10,
      }}
      onClick={() => {
        // Safe mobile refresh — waits for download to complete
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }}
    >
      {({ loading }) =>
        loading ? "Loading document..." : "⬇ Download PDF"
      }
    </PDFDownloadLink>

    {/* Note Section */}
    <div
      style={{
        fontSize: "12px",
        color: "#333",
        background: "#f5f7ff",
        padding: "12px 15px",
        borderRadius: "10px",
        borderLeft: "4px solid #007bff",
        lineHeight: "1.55",
        marginTop: "5px",
        marginBottom: "25px",
      }}
    >
          <strong>Note:</strong> If the download doesn’t work after first download, please
      download again.  
      If it still doesn’t download, delete the previously downloaded file from
      your Chrome browser’s download list and try again.
    </div>
  </>
)}


      {/* Form */}
<div style={previewStyles.formCard}>
  <div style={previewStyles.gridContainer}>
    
    {/* Text Inputs */}
    {inputFields.map((f) => (
      <div key={f.name} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 13, marginBottom: 4, fontWeight: "bold" }}>
          {f.placeholder}
        </label>

<input
  type={
    f.name === "issueDate" || f.name === "expireDate"
      ? "date"
      : "text"
  }
  name={f.name}
  placeholder={f.placeholder}
  value={card[f.name]}
  onChange={handleChange}
  onClick={(e) => {
    if (e.target.showPicker && (f.name === "issueDate" || f.name === "expireDate")) {
      e.target.showPicker(); // Auto-open calendar only for date fields
    }
  }}
  onFocus={(e) => {
    if (e.target.showPicker && (f.name === "issueDate" || f.name === "expireDate")) {
      e.target.showPicker(); // Auto-open on focus only for date fields
    }
  }}
  style={{
    ...previewStyles.input,
    backgroundColor: darkMode ? "#374151" : "#ffffff",
    color: darkMode ? "#e5e7eb" : "#000000",
    border: darkMode ? "1px solid #4b5563" : "1px solid #ccc",
    cursor: "pointer",
  }}
/>




      </div>
    ))}

    {/* Image + Signature Upload Inputs */}
    {fileFields.map((f) => (
      <div key={f.name} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 13, marginBottom: 4, fontWeight: "bold" }}>
          {f.placeholder}
        </label>

        <input
          type="file"
          name={f.name}
          accept="image/*"
          onChange={handleFileChange}
          style={{
            ...previewStyles.input,
            cursor: "pointer",          // ✅ Added
          }}
        />
      </div>
    ))}

  </div>
</div>

      {/* Preview */}
      <div style={previewStyles.container}>
        {/* Front */}
        <div ref={frontRef} style={previewStyles.card}>
          <img src={frontBg} alt="Front" style={previewStyles.bgImage} />
          <div style={previewStyles.frontContent}>
            <img
              src={card.profileImage || defaultProfile}
              alt="Profile"
              style={previewStyles.profileImage}
            />
            <div style={previewStyles.infoColumn}>
              <p style={{ ...previewStyles.nameText, textAlign: "center", margin: 5 }}>
                {card.name}
              </p>
              {inputFields.slice(1, 5).map((f) => (
                <div style={{ display: "flex", flexDirection: "row", marginTop: 2 }} key={f.name}>
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

        {/* Back */}
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
            <div style={{ textAlign: "center", marginLeft: 136, marginTop: 57 }}>
              <QRCodeCanvas value={`mailto:${card.email}`} size={60} />
              <p style={{ fontSize: 7, marginTop: 3,color: "#f3f3f3", marginLeft: -130 }}>Scan to Email</p>
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
                  style={{ width: 80, height: 30, marginTop: -20, marginBottom: 9 }}
                />
              ) : (
                <div style={{ width: 70, height: 25 }} />
              )}
              <div style={{ textAlign: "right", fontSize: 9, fontWeight: "bold", marginTop: -25 }}>
                <p style={{ marginTop: -70, color: "#f5f5f5" }}>Issue: {card.issue || "N/A"}</p>
                <p style={{ marginTop: -4, fontWeight: "bold", color: "#f5f5f5" }}>
                  Expiry: {card.expiry || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



