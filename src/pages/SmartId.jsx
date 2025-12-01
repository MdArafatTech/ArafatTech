// src/pages/LiveIDCardPDF.jsx
import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { QRCodeCanvas } from "qrcode.react";
import defaultProfile from "../assets/defualtimg.png";
import frontBg from "../assets/frontid.jpg";
import backBg from "../assets/backid.png";

const styles = StyleSheet.create({
  page: { backgroundColor: "#fff", padding: 20 },
  cardContainer: { flexDirection: "column", marginBottom: 20 },
  card: { width: 175, height: 280, padding: 5, position: "relative" },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  infoRow: { flexDirection: "row", marginBottom: 2 },
  label: { fontSize: 7, fontWeight: "bold", color: "#555" },
  value: { fontSize: 7, color: "#000" },
  backCard: { width: 175, height: 280, padding: 5, position: "relative" },
  backAddressText: { fontSize: 7, marginBottom: 2 },
  signatureImage: { width: 60, height: 20, marginTop: 4, alignSelf: "center" },
  backIssueExpiryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  backIssueExpiryText: { fontSize: 6, fontWeight: "bold" },
  bgImageFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  bgImageBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0.3,
  },
});

export default function LiveIDCardPDF() {
  const [card, setCard] = useState({
    name: "",
    profession: "",
    dob: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name" },
    { name: "profession", placeholder: "Profession" },
    { name: "dob", placeholder: "Date of Birth" },
    { name: "phone", placeholder: "Phone" },
    { name: "id", placeholder: "ID Number" },
    { name: "blood", placeholder: "Blood Group" },
    { name: "email", placeholder: "Email" },
    { name: "village", placeholder: "Village" },
    { name: "post", placeholder: "Post Office" },
    { name: "postCode", placeholder: "Post Code" },
    { name: "thana", placeholder: "Thana" },
    { name: "district", placeholder: "District" },
    { name: "issue", placeholder: "Issue Date" },
    { name: "expiry", placeholder: "Expiry Date" },
    { name: "profileImage", placeholder: "Profile Image URL" },
    { name: "signatureImage", placeholder: "Signature Image URL" },
  ];

  const inputStyle = {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "12px",
    width: "100%",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Live ID Card Generator
      </h1>

      {/* Input Fields */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {inputFields.map((input) => (
          <input
            key={input.name}
            type="text"
            name={input.name}
            placeholder={input.placeholder}
            value={card[input.name]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}
      </div>

      {/* Live Preview */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Front */}
        <div
          style={{
            width: 175,
            height: 280,
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "5px",
          }}
        >
          <img
            src={frontBg}
            alt="Front BG"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              opacity: 0.3,
            }}
          />
          <div style={{ position: "relative", fontSize: "9px" }}>
            <img
              src={card.profileImage || defaultProfile}
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                display: "block",
                margin: "5px auto",
              }}
            />
            {inputFields.slice(0, 12).map((f) => (
              <p key={f.name} style={{ fontSize: "9px", margin: "2px 0" }}>
                {f.placeholder}: {card[f.name]}
              </p>
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            width: 175,
            height: 280,
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "5px",
          }}
        >
          <img
            src={backBg}
            alt="Back BG"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              opacity: 0.3,
            }}
          />
          <div style={{ position: "relative", fontSize: "9px" }}>
            <p>
              Address:{" "}
              {[card.village, card.post, card.postCode]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p>{[card.thana, card.district].filter(Boolean).join(", ")}</p>
            <p>Issue: {card.issue}</p>
            <p>Expiry: {card.expiry}</p>

            {/* QR Code */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "4px",
              }}
            >
              <QRCodeCanvas value={`mailto:${card.email}`} size={70} />
              <span style={{ fontSize: "7px" }}>Scan to Email</span>
            </div>

            <img
              src={card.signatureImage}
              alt="Signature"
              style={{
                width: "60px",
                height: "20px",
                display: "block",
                margin: "5px auto",
              }}
            />
            <p style={{ textAlign: "center", fontSize: "8px" }}>
              Authorized Signature
            </p>
          </div>
        </div>
      </div>

      {/* PDF Download */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.cardContainer}>
                  {/* Front */}
                  <View style={styles.card}>
                    <Image src={frontBg} style={styles.bgImageFront} />
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={styles.profileImage}
                        src={card.profileImage || defaultProfile}
                      />
                    </View>
                    <Text style={styles.nameText}>{card.name}</Text>
                    <View style={{ marginTop: 2 }}>
                      {inputFields.slice(0, 12).map((f) => (
                        <View style={styles.infoRow} key={f.name}>
                          <Text style={styles.label}>{f.placeholder}:</Text>
                          <Text style={styles.value}>{card[f.name]}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Back */}
                  <View style={styles.backCard}>
                    <Image src={backBg} style={styles.bgImageBack} />
                    <View style={{ marginTop: 2 }}>
                      <Text style={styles.backAddressText}>
                        {[card.village, card.post, card.postCode]
                          .filter(Boolean)
                          .join(", ")}
                      </Text>
                      <Text style={styles.backAddressText}>
                        {[card.thana, card.district].filter(Boolean).join(", ")}
                      </Text>
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
            </Document>
          }
          fileName="IDCard.pdf"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
