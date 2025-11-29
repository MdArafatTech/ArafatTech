// src/components/CardCustomizerLive.jsx
import React, { useState } from "react";
import defaultProfile from "../assets/defualtimg.png";
import WatermarkImage from "../assets/arafattech.png";

export default function CustomizeCard() {
  const [style, setStyle] = useState({
    labelColor: "#1e3a8a",
    borderColor: "#dc2626",
    headerColor: "#1e3a8a",
    noteBgColor: "#e0e7ff",
    issueBgColor: "#e0e7ff",
    fontSize: 10,
    profileSize: 80,
  });

  const [card, setCard] = useState({
    name: "John Doe",
    role: "Developer",
    phone: "0123456789",
    email: "john@example.com",
    id: "123456",
    blood: "O+",
    village: "Village X",
    thana: "Thana Y",
    district: "District Z",
    profileImage: defaultProfile,
    watermark: WatermarkImage,
    issue: "2025-11-01",
    expiry: "2026-11-01",
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-orange-600 text-center">Live ID Card Customizer</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { label: "Label", key: "labelColor" },
          { label: "Border", key: "borderColor" },
          { label: "Header BG", key: "headerColor" },
          { label: "Note BG", key: "noteBgColor" },
          { label: "Issue/Expiry BG", key: "issueBgColor" },
        ].map(({ label, key }) => (
          <div className="flex items-center gap-2" key={key}>
            <label>{label}:</label>
            <input
              type="color"
              value={style[key]}
              onChange={(e) => setStyle((prev) => ({ ...prev, [key]: e.target.value }))}
              className="w-7 h-7 border-2 rounded cursor-pointer"
            />
          </div>
        ))}

        <div className="flex items-center gap-2">
          <label>Font Size:</label>
          <input
            type="number"
            min="6"
            max="20"
            value={style.fontSize}
            onChange={(e) => setStyle((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
            className="border p-1 w-16 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>Profile Size:</label>
          <input
            type="number"
            min="50"
            max="200"
            value={style.profileSize}
            onChange={(e) => setStyle((prev) => ({ ...prev, profileSize: parseInt(e.target.value) }))}
            className="border p-1 w-16 rounded"
          />
        </div>
      </div>

      {/* Card Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.keys(card).filter(k => k !== "profileImage" && k !== "watermark").map((f) => (
          <input
            key={f}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={card[f]}
            onChange={(e) => setCard((prev) => ({ ...prev, [f]: e.target.value }))}
            className="border p-2 rounded"
          />
        ))}
        <div>
          <label className="block">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCard((prev) => ({ ...prev, profileImage: URL.createObjectURL(e.target.files[0]) }))}
            className="border cursor-pointer p-1 rounded w-full"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div
        className="relative mt-6 border rounded-xl p-4 flex flex-col items-center"
        style={{ width: 220, borderColor: style.borderColor, borderWidth: 3 }}
      >
        {/* Header */}
        <div
          className="w-full h-12 mb-2 flex justify-center items-center rounded-t"
          style={{ backgroundColor: style.headerColor }}
        >
          <span className="text-white font-bold">ID CARD</span>
        </div>

        {/* Profile Image */}
        <img
          src={card.profileImage}
          alt="Profile"
          style={{ width: style.profileSize, height: style.profileSize, borderRadius: "50%", marginBottom: 8 }}
        />

        {/* Name & Role */}
        <h3 className="font-bold" style={{ fontSize: style.fontSize }}>{card.name}</h3>
        <p style={{ fontSize: style.fontSize - 2 }}>{card.role}</p>

        {/* Info */}
        <div className="mt-2 space-y-1" style={{ fontSize: style.fontSize - 2 }}>
          {["phone", "email", "id", "blood", "village", "thana", "district"].map((field) => (
            <div key={field} className="flex gap-1">
              <span style={{ color: style.labelColor, fontWeight: "600" }}>{field.charAt(0).toUpperCase()+field.slice(1)}:</span>
              <span>{card[field]}</span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-2 p-2 rounded" style={{ backgroundColor: style.noteBgColor, fontSize: style.fontSize - 3 }}>
          This ID card is personal. Please carry at all times.
        </div>

        {/* Issue/Expiry */}
        <div className="mt-2 flex justify-between w-full p-1 rounded" style={{ backgroundColor: style.issueBgColor, fontSize: style.fontSize - 3 }}>
          <span>Issue: {card.issue}</span>
          <span>Expiry: {card.expiry}</span>
        </div>

        {/* Watermark */}
        <img
          src={card.watermark}
          alt="Watermark"
          className="absolute opacity-20"
          style={{ width: 80, height: 80, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}
